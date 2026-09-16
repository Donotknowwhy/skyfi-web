"use client";

import axios from 'axios';
import { useLocale } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import Footer from '../../../components/Footer';
import Header from '../../../components/Header';

const SELECTED_PACKAGE_KEY = 'bssCheckoutItem';

const formatPrice = (value, currency = 'VND', locale = 'vi') => new Intl.NumberFormat(locale, {
  style: 'currency',
  currency,
  maximumFractionDigits: currency === 'VND' ? 0 : 2,
}).format(Number(value || 0));

export default function BssCheckoutPage() {
  const locale = useLocale();
  const router = useRouter();
  const searchParams = useSearchParams();
  const packageId = searchParams.get('packageId');
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [price, setPrice] = useState(null);
  const [isLoadingPrice, setIsLoadingPrice] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [orderNumber, setOrderNumber] = useState('');
  const idempotencyKeyRef = useRef(null);
  const [form, setForm] = useState({ customer_name: '', contact_phone: '', email: '', agree_terms: false });

  useEffect(() => {
    const storedValue = window.sessionStorage.getItem(SELECTED_PACKAGE_KEY);
    if (!storedValue) {
      setError('Không tìm thấy gói eSIM đã chọn. Vui lòng chọn lại gói.');
      setIsLoadingPrice(false);
      return;
    }

    try {
      const item = JSON.parse(storedValue);
      if (!item?.package_id || String(item.package_id) !== String(packageId)) {
        throw new Error('Selected package mismatch');
      }
      setSelectedPackage(item);

      axios.get(`/api/bss/packages/${item.package_id}/price?quantity=${item.quantity}`)
        .then((response) => {
          if (!response.data?.success) throw new Error(response.data?.message || 'Không thể kiểm tra giá gói.');
          setPrice(response.data.data);
        })
        .catch((requestError) => setError(requestError.response?.data?.message || requestError.message || 'Không thể kiểm tra giá gói.'))
        .finally(() => setIsLoadingPrice(false));
    } catch {
      setError('Dữ liệu gói eSIM không hợp lệ. Vui lòng chọn lại gói.');
      setIsLoadingPrice(false);
    }
  }, [packageId]);

  const updateField = (event) => {
    const { name, value, checked, type } = event.target;
    setForm((current) => ({ ...current, [name]: type === 'checkbox' ? checked : value }));
  };

  const submitOrder = async (event) => {
    event.preventDefault();
    if (!selectedPackage || !price || isSubmitting) return;
    if (!form.agree_terms) {
      setError('Vui lòng đồng ý với điều khoản trước khi thanh toán.');
      return;
    }

    const orderInput = {
      customer_name: form.customer_name,
      contact_phone: form.contact_phone,
      email: form.email,
      items: [{ package_id: selectedPackage.package_id, quantity: selectedPackage.quantity }],
    };
    const payloadFingerprint = JSON.stringify(orderInput);
    if (!idempotencyKeyRef.current || idempotencyKeyRef.current.payloadFingerprint !== payloadFingerprint) {
      idempotencyKeyRef.current = { key: crypto.randomUUID(), payloadFingerprint };
    }

    setError('');
    setIsSubmitting(true);

    try {
      const response = await axios.post('/api/bss/orders', orderInput, {
        headers: { 'Idempotency-Key': idempotencyKeyRef.current.key },
      });
      const order = response.data?.data;
      if (!response.data?.success || !order?.order_number) {
        throw new Error(response.data?.message || 'Không thể tạo đơn hàng.');
      }

      window.sessionStorage.setItem('bssLastOrderNumber', order.order_number);
      setOrderNumber(order.order_number);
      if (order.payment_url) {
        window.location.assign(order.payment_url);
        return;
      }
      setError('Đơn đã được tạo nhưng chưa có liên kết thanh toán. Vui lòng thử lại thanh toán hoặc liên hệ hỗ trợ.');
    } catch (requestError) {
      setError(requestError.response?.data?.message || requestError.message || 'Không thể tạo đơn hàng.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const amount = price?.total_price ?? price?.unit_price;
  const currency = price?.currency || selectedPackage?.currency || 'VND';

  return (
    <div className="flex min-h-screen flex-col bg-[#f7f7f7]">
      <Header />
      <main className="container flex-1 py-10 md:py-16">
        <button type="button" onClick={() => router.back()} className="mb-6 text-sm font-medium text-[#333] hover:text-[#ed1b2f]">← Quay lại chọn gói</button>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">
          <form onSubmit={submitOrder} className="rounded-2xl bg-white p-6 shadow-sm md:p-8">
            <h1 className="text-2xl font-bold text-[#333]">Thanh toán eSIM</h1>
            <p className="mt-2 text-sm text-[#666]">Thông tin eSIM sẽ được gửi đến email của bạn sau khi thanh toán thành công.</p>
            <div className="mt-7 grid gap-5">
              <label className="grid gap-2 text-sm font-medium text-[#333]">Họ và tên
                <input required name="customer_name" value={form.customer_name} onChange={updateField} className="rounded-lg border border-[#ddd] px-4 py-3 outline-none focus:border-[#ed1b2f]" />
              </label>
              <label className="grid gap-2 text-sm font-medium text-[#333]">Số điện thoại
                <input required type="tel" name="contact_phone" value={form.contact_phone} onChange={updateField} className="rounded-lg border border-[#ddd] px-4 py-3 outline-none focus:border-[#ed1b2f]" />
              </label>
              <label className="grid gap-2 text-sm font-medium text-[#333]">Email nhận eSIM
                <input required type="email" name="email" value={form.email} onChange={updateField} className="rounded-lg border border-[#ddd] px-4 py-3 outline-none focus:border-[#ed1b2f]" />
              </label>
              <label className="flex items-start gap-3 text-sm text-[#555]">
                <input required type="checkbox" name="agree_terms" checked={form.agree_terms} onChange={updateField} className="mt-1" />
                Tôi đồng ý với điều khoản giao dịch eSIM.
              </label>
            </div>
            {error && <p className="mt-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}{orderNumber && <> Mã đơn: <strong>{orderNumber}</strong>.</>}</p>}
            <button type="submit" disabled={isLoadingPrice || !price || isSubmitting} className="mt-7 w-full rounded-lg bg-[#ed1b2f] px-5 py-3 font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50">
              {isSubmitting ? 'Đang tạo đơn...' : 'Tạo đơn và thanh toán'}
            </button>
          </form>
          <aside className="h-fit rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-lg font-bold text-[#333]">Đơn hàng của bạn</h2>
            {selectedPackage && <div className="mt-5 border-b border-[#eee] pb-5">
              <p className="font-semibold text-[#333]">{selectedPackage.name}</p>
              <p className="mt-2 text-sm text-[#666]">{selectedPackage.quantity} gói · {selectedPackage.validity_days || '—'} ngày</p>
            </div>}
            <div className="mt-5 flex items-center justify-between text-[#333]"><span>Tổng thanh toán</span><strong className="text-xl text-[#ed1b2f]">{isLoadingPrice ? 'Đang kiểm tra giá...' : formatPrice(amount, currency, locale)}</strong></div>
            <p className="mt-3 text-xs leading-5 text-[#777]">Giá được BSS xác nhận lại ngay trước khi tạo đơn.</p>
          </aside>
        </div>
      </main>
      <Footer />
    </div>
  );
}
