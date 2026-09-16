"use client";

import axios from 'axios';
import { useLocale } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import Footer from '../../../../components/Footer';
import Header from '../../../../components/Header';

export default function BssOrderResultPage() {
  const locale = useLocale();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const orderNumber = searchParams.get('orderNumber') || searchParams.get('order_number');

  const loadOrder = useCallback(async () => {
    const orderCode = orderNumber || window.sessionStorage.getItem('bssLastOrderNumber');
    if (!orderCode) {
      setError('Không tìm thấy mã đơn hàng.');
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    setError('');
    try {
      const response = await axios.get(`/api/bss/orders/${encodeURIComponent(orderCode)}`);
      if (!response.data?.success) throw new Error(response.data?.message || 'Không thể kiểm tra đơn hàng.');
      setOrder(response.data.data?.order || null);
    } catch (requestError) {
      setError(requestError.response?.data?.message || requestError.message || 'Không thể kiểm tra đơn hàng.');
    } finally {
      setIsLoading(false);
    }
  }, [orderNumber]);

  useEffect(() => { loadOrder(); }, [loadOrder]);

  const isPaid = ['PAID', 'COMPLETED'].includes(order?.status);
  return (
    <div className="flex min-h-screen flex-col bg-[#f7f7f7]">
      <Header />
      <main className="container flex-1 py-12 md:py-20">
        <div className="mx-auto max-w-xl rounded-2xl bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-bold text-[#333]">{isPaid ? 'Thanh toán thành công' : 'Trạng thái đơn hàng'}</h1>
          {isLoading && <p className="mt-5 text-[#666]">Đang kiểm tra trạng thái đơn...</p>}
          {error && <p className="mt-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
          {order && <div className="mt-6 space-y-2 text-left text-sm text-[#555]">
            <p><strong>Mã đơn:</strong> {order.order_number}</p>
            <p><strong>Trạng thái:</strong> {order.status}</p>
            <p><strong>Thanh toán:</strong> {order.payment_status}</p>
            <p><strong>Tổng tiền:</strong> {new Intl.NumberFormat(locale, { style: 'currency', currency: order.currency || 'VND', maximumFractionDigits: order.currency === 'VND' ? 0 : 2 }).format(Number(order.total_amount || 0))}</p>
          </div>}
          <div className="mt-7 flex justify-center gap-3">
            <button type="button" onClick={loadOrder} className="rounded-lg border border-[#ed1b2f] px-4 py-2 font-medium text-[#ed1b2f]">Kiểm tra lại</button>
            <button type="button" onClick={() => router.push(`/${locale}/travel-esim`)} className="rounded-lg bg-[#ed1b2f] px-4 py-2 font-medium text-white">Mua eSIM khác</button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
