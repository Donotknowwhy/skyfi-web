"use client";

import { useSearchParams } from "next/navigation";
import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";

import { ButtonHD } from "@/app/components/ui/ButtonHD";
import Header from "@/app/components/hdbank/sim-data/Header";
import CheckoutService from "@/app/services/checkoutService";
import { toCurrency } from "@/app/utils/format";
import { useLoad } from "@/app/utils/load";
import { useUserState } from "@/app/stores/user";

export default function ResultPage() {
  const t = useTranslations("hdbank.checkout.result");
  const searchParams = useSearchParams();
  const orderId = searchParams.get("orderId");
  const router = useRouter();
  const { open, close } = useLoad();
  const { sessionId } = useUserState();
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderId) return;

      try {
        open();
        const res = await CheckoutService.getOrder(orderId);
        if (res && res.order) {
          setOrder(res.order);
        } else {
          setError(t("notFound")); // 'Không tìm thấy đơn hàng'
        }
      } catch (err) {
        console.error(err);
        setError("Có lỗi xảy ra khi tải thông tin đơn hàng"); // Should I translate this? I'll leave it for now or find a common error message
      } finally {
        close();
      }
    };

    fetchOrder();
  }, [orderId]);

  const isSuccess =
    order && order.status !== "CREATED" && order.status !== "CANCEL";

  if (!orderId) {
    return (
      <div className="bg-[#F2F2F7] min-h-screen flex flex-col">
        <Header title={t("title")} />
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <p>{t("notFound")}</p>
          <ButtonHD
            onClick={() =>
              router.push(
                sessionId ? `/hdbank-app?sessionId=${sessionId}` : "/hdbank-app",
              )
            }
            className="mt-4"
          >
            {t("homeButton")}
          </ButtonHD>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#FFF6F6] to-[#F2F2F7]">
      <Header title={t("title")} />
      <main className="flex-1 flex flex-col items-center justify-center px-2 py-6">
        {order && (
          <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md flex flex-col items-center text-center">
            <div className="w-16 h-16 mb-2 flex items-center justify-center mx-auto">
              {isSuccess ? (
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
                  <svg
                    className="w-10 h-10 text-green-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              ) : (
                <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
                  <svg
                    className="w-10 h-10 text-red-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div>
              )}
            </div>
            <h2
              className={`text-lg font-semibold ${isSuccess ? "text-green-600" : "text-red-500"} mb-1`}
            >
              {isSuccess ? t("success") : t("failure")}
            </h2>
            {order && (
              <div className="text-3xl font-bold text-gray-900 mb-1">
                -{toCurrency(order.total_amount)}{" "}
                <span className="text-base font-medium text-gray-500">VND</span>
              </div>
            )}
            {order && (
              <div className="text-sm text-gray-500 mb-4">
                {order.created_at}
              </div>
            )}
            <div className="w-full text-left text-sm divide-y divide-gray-100 bg-white rounded-xl">
              {order && (
                <>
                  <div className="flex justify-between py-2">
                    <span className="text-gray-500">{t("orderCode")}</span>
                    <span className="font-semibold text-gray-900">
                      {order.order_code}
                    </span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-gray-500">{t("customer")}</span>
                    <span className="font-semibold text-gray-900">
                      {order.customer_name || "-"}
                    </span>
                  </div>
                  {/* <div className="flex justify-between py-2">
                                    <span className="text-gray-500">{t('paymentFrom')}</span>
                                    <span className="font-semibold text-gray-900">{order.payment_method || '-'}</span>
                                </div> */}
                  <div className="flex justify-between py-2">
                    <span className="text-gray-500">{t("service")}</span>
                    <span className="font-semibold text-gray-900">
                      {order.service_name || "-"}
                    </span>
                  </div>
                  <div className="flex justify-between py-2">
                    <span className="text-gray-500">{t("provider")}</span>
                    <span className="font-semibold text-gray-900">SkyFi</span>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </main>
      <div className="p-4 bg-transparent mt-auto w-full flex justify-center">
        <ButtonHD
          onClick={() =>
            router.push(
              sessionId ? `/hdbank-app?sessionId=${sessionId}` : "/hdbank-app",
            )
          }
          className="w-full "
          variant="normal"
        >
          {t("homeButton")}
        </ButtonHD>
      </div>
    </div>
  );
}
