import { NextResponse } from 'next/server';
import { bssFetch, isBssAuthError } from '../../_lib/bss-auth';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const regionId = searchParams.get('region_id');
  if (regionId && (!/^\d+$/.test(regionId) || Number(regionId) <= 0)) {
    return NextResponse.json({ success: false, message: 'Invalid region_id.' }, { status: 400 });
  }

  const query = new URLSearchParams({ channel: process.env.BSS_CHANNEL || 'BSS' });
  if (regionId) query.set('region_id', regionId);

  try {
    const response = await bssFetch(
      `/api/bss/app/v2/public/packages/data-options?${query.toString()}`,
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
    return NextResponse.json({ success: false, message: 'Unable to reach BSS API.' }, { status: 502 });
  }
}
