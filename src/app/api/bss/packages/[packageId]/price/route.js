import { NextResponse } from 'next/server';
import { bssFetch, isBssAuthError } from '../../../_lib/bss-auth';

export const dynamic = 'force-dynamic';

export async function GET(request, { params }) {
  const { packageId } = await params;
  const { searchParams } = new URL(request.url);
  const quantity = Number(searchParams.get('quantity') || 1);

  if (!Number.isInteger(Number(packageId)) || Number(packageId) <= 0 ||
      !Number.isInteger(quantity) || quantity <= 0) {
    return NextResponse.json({ success: false, message: 'Invalid package id or quantity.' }, { status: 400 });
  }

  const query = new URLSearchParams({
    channel: process.env.BSS_CHANNEL || 'BSS',
    quantity: String(quantity),
  });

  try {
    const response = await bssFetch(
      `/api/bss/app/v2/public/packages/${encodeURIComponent(packageId)}/price?${query}`,
      { cache: 'no-store' },
    );
    const payload = await response.json().catch(() => null);
    return NextResponse.json(payload || { success: false, message: 'Invalid response from BSS API.' }, { status: response.status });
  } catch (error) {
    if (isBssAuthError(error)) {
      return NextResponse.json({ success: false, message: error.message }, { status: error.status });
    }
    return NextResponse.json({ success: false, message: 'Unable to reach BSS API.' }, { status: 502 });
  }
}
