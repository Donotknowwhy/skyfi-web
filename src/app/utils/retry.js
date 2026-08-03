"use client";

export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Run an async fn and retry while `shouldRetry(result)` is true.
 *
 * Designed for webview screens where data-fetching effects fire immediately
 * after `login-with-session`, before the backend has finished binding the
 * session to the subscriber. The first response can come back empty/failed;
 * a few bounded retries pick up the data once it has propagated, so the user
 * no longer has to exit and re-enter the webview.
 *
 * @param {(attempt:number) => Promise<any>} fn
 * @param {Object} options
 * @param {(result:any, attempt:number) => boolean} options.shouldRetry - retry when true
 * @param {() => boolean} [options.shouldAbort] - stop early (e.g. component unmounted)
 * @param {number} [options.maxAttempts=3]
 * @param {number} [options.delayMs=1000] - linear backoff (delayMs * attempt)
 * @returns {Promise<any>} the last result
 */
export const retryUntil = async (
  fn,
  { shouldRetry, shouldAbort, maxAttempts = 3, delayMs = 1000 } = {},
) => {
  let result;
  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    if (shouldAbort?.()) return result;
    result = await fn(attempt);
    if (shouldAbort?.()) return result;
    if (!shouldRetry?.(result, attempt)) return result;
    if (attempt < maxAttempts - 1) await sleep(delayMs * (attempt + 1));
  }
  return result;
};
