import { NextResponse } from 'next/server';
import { bssFetch, isBssAuthError } from '../_lib/bss-auth';

export const dynamic = 'force-dynamic';

const normalizeItems = (items) => (Array.isArray(items) ? items : []).map((item) => ({
  package_id: Number(item?.package_id),
  quantity: Number(item?.quantity),
}));

export async function POST(request) {
  const body = await request.json().catch(() => null);
  const customerName = String(body?.customer_name || '').trim();
  const contactPhone = String(body?.contact_phone || '').trim();
  const email = String(body?.email || '').trim();
  const items = normalizeItems(body?.items);

  if (!customerName || !contactPhone || !/^\S+@\S+\.\S+$/.test(email) || !items.length ||
      items.some((item) => !Number.isInteger(item.package_id) || item.package_id <= 0 ||
        !Number.isInteger(item.quantity) || item.quantity <= 0)) {
    return NextResponse.json({ success: false, message: 'Invalid checkout information.' }, { status: 400 });
  }

  const idempotencyKey = request.headers.get('idempotency-key') || crypto.randomUUID();
  const orderPayload = {
    channel: process.env.BSS_CHANNEL || 'BSS',
    payment_method: 'GALAXYPAY',
    customer_name: customerName,
    contact_phone: contactPhone,
    email,
    touchpoint: 'WEB_PORTAL',
    source: 'vietnam-homepage',
    segment: 'RETAIL',
    delivery_address: null,
    shipping_amount: 0,
    items,
  };

  try {
    const response = await bssFetch('/api/bss/app/v2/public/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Idempotency-Key': idempotencyKey,
      },
      body: JSON.stringify(orderPayload),
      cache: 'no-store',
    });
    const payload = await response.json().catch(() => null);
    const result = NextResponse.json(
      payload || { success: false, message: 'Invalid response from BSS API.' },
      { status: response.status },
    );
    result.headers.set('Idempotency-Key', idempotencyKey);
    return result;
  } catch (error) {
    if (isBssAuthError(error)) {
      return NextResponse.json({ success: false, message: error.message }, { status: error.status });
    }
    return NextResponse.json({ success: false, message: 'Unable to reach BSS API.' }, { status: 502 });
  }
}
