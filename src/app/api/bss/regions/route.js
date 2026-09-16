import { NextResponse } from 'next/server';
import { bssFetch, isBssAuthError } from '../_lib/bss-auth';

const ALLOWED_TYPES = new Set(['COUNTRY', 'REGION', 'GLOBAL']);

export const dynamic = 'force-dynamic';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const type = (searchParams.get('type') || 'COUNTRY').toUpperCase();

  if (!ALLOWED_TYPES.has(type)) {
    return NextResponse.json(
      { success: false, message: 'Unsupported region type.' },
      { status: 400 },
    );
  }

  const channel = process.env.BSS_CHANNEL || 'BSS';

  try {
    const query = new URLSearchParams({ type, channel });
    const response = await bssFetch(
      `/api/bss/app/v2/public/regions?${query.toString()}`,
      { cache: 'no-store' },
    );
    const payload = await response.json().catch(() => null);
    return NextResponse.json(
      payload || { success: false, message: 'Invalid response from BSS API.' },
      { status: response.status },
    );
  } catch (error) {
    if (isBssAuthError(error)) {
      return NextResponse.json({ success: false, message: error.message }, { status: error.status });
    }
    return NextResponse.json(
      { success: false, message: 'Unable to reach BSS API.' },
      { status: 502 },
    );
  }
}
