import 'server-only';

const TOKEN_REFRESH_BUFFER_MS = 60 * 1000;

class BssAuthError extends Error {
  constructor(message, status = 502) {
    super(message);
    this.name = 'BssAuthError';
    this.status = status;
  }
}

let credentials = {
  accessToken: null,
  refreshToken: null,
  expiresAt: 0,
};
let pendingAuthentication = null;

const getConfig = () => {
  const baseUrl = process.env.BSS_API_BASE_URL?.replace(/\/$/, '');
  const username = process.env.BSS_PARTNER_USERNAME;
  const password = process.env.BSS_PARTNER_PASSWORD;

  if (!baseUrl || !username || !password) {
    throw new BssAuthError('BSS authentication is not configured.', 503);
  }

  return { baseUrl, username, password };
};

const decodeJwtExpiry = (token) => {
  try {
    const payload = token.split('.')[1];
    if (!payload) return 0;
    const decoded = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'));
    return Number.isFinite(decoded.exp) ? decoded.exp * 1000 : 0;
  } catch {
    return 0;
  }
};

const getTokenData = (payload, previousRefreshToken = null) => {
  const data = payload?.data || payload || {};
  const accessToken = data.token || data.accessToken || data.access_token;
  const refreshToken = data.refreshToken || data.refresh_token || previousRefreshToken;
  const expiresInHours = Number(data.expiresInHours ?? data.expires_in_hours);
  const expiresAt = Number.isFinite(expiresInHours) && expiresInHours > 0
    ? Date.now() + (expiresInHours * 60 * 60 * 1000)
    : decodeJwtExpiry(accessToken || '');

  if (!accessToken || !refreshToken || !expiresAt) {
    throw new BssAuthError('BSS authentication returned an invalid token response.');
  }

  return { accessToken, refreshToken, expiresAt };
};

const requestToken = async (path, body, previousRefreshToken = null) => {
  const { baseUrl } = getConfig();
  let response;

  try {
    response = await fetch(`${baseUrl}${path}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      cache: 'no-store',
    });
  } catch {
    throw new BssAuthError('Unable to reach BSS authentication service.');
  }

  const payload = await response.json().catch(() => null);
  if (!response.ok || !payload?.success) {
    throw new BssAuthError('BSS authentication failed.');
  }

  return getTokenData(payload, previousRefreshToken);
};

const login = async () => {
  const { username, password } = getConfig();
  return requestToken('/api/v1/auth/login', { username, password });
};

const refresh = async () => requestToken(
  '/api/v1/auth/refresh',
  { refreshToken: credentials.refreshToken },
  credentials.refreshToken,
);

const tokenIsUsable = () => (
  Boolean(credentials.accessToken) && credentials.expiresAt > Date.now() + TOKEN_REFRESH_BUFFER_MS
);

const refreshOrLogin = async (forceRefresh = false) => {
  if (!forceRefresh && tokenIsUsable()) return credentials.accessToken;

  if (credentials.refreshToken) {
    try {
      credentials = await refresh();
      return credentials.accessToken;
    } catch (error) {
      if (!(error instanceof BssAuthError)) throw error;
    }
  }

  credentials = await login();
  return credentials.accessToken;
};

export const getBssAccessToken = async ({ forceRefresh = false } = {}) => {
  if (!forceRefresh && tokenIsUsable()) return credentials.accessToken;

  if (!pendingAuthentication) {
    pendingAuthentication = refreshOrLogin(forceRefresh).finally(() => {
      pendingAuthentication = null;
    });
  }

  return pendingAuthentication;
};

const withAuthorization = (init, accessToken) => {
  const headers = new Headers(init.headers);
  headers.set('Authorization', `Bearer ${accessToken}`);
  return { ...init, headers };
};

export const bssFetch = async (path, init = {}) => {
  const { baseUrl } = getConfig();
  const request = async (accessToken) => fetch(
    `${baseUrl}${path}`,
    withAuthorization(init, accessToken),
  );

  let response = await request(await getBssAccessToken());
  if (response.status !== 401) return response;

  credentials.accessToken = null;
  credentials.expiresAt = 0;
  response = await request(await getBssAccessToken({ forceRefresh: true }));
  return response;
};

export const isBssAuthError = (error) => error instanceof BssAuthError;
