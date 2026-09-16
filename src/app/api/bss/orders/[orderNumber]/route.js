import { NextResponse } from 'next/server';
import { bssFetch, isBssAuthError } from '../../_lib/bss-auth';

export const dynamic = 'force-dynamic';

export async function GET(_request, { params }) {
  const { orderNumber } = await params;
  if (!orderNumber) {
    return NextResponse.json({ success: false, message: 'BSS API is not configured or order is missing.' }, { status: 400 });
  }

  try {
    const response = await bssFetch(
      `/api/bss/app/v2/public/orders/${encodeURIComponent(orderNumber)}`,
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
