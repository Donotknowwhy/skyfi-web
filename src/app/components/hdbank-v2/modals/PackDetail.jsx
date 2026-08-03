"use client";

import { Button } from "@/app/components/ui/Button";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl";
import { toCurrency } from "../../../utils/format";
import { useModal } from "../../../utils/modal";
import { useUserActions } from "@/app/stores/user";

const PackDetail = (props) => {
  const t = useTranslations("packDetail");

  const { close } = useModal();
  const { packageData, isBuy } = props;

  const { done } = useModal();
  const { checkLogin } = useUserActions();

  const handleBuy = (data) => {
    checkLogin(() => done(data));
  };

  return (
    <div className=" rounded-t-2xl w-full relative pb-8 h-full flex flex-col">
      {/* Close button */}
      <div className="absolute top-0 left-0 z-10">
        <button
          onClick={close}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.5 19L8.5 12L15.5 5"
              stroke="#333333"
              stroke-width="1.75"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </button>
      </div>
      {/* Title */}
      <div className="text-center">
        <h2 className="text-xl font-bold text-gray-900">{t("title")}</h2>
      </div>

      {/* Content - Scrollable Area */}
      <div className=" pt-4 pb-4 overflow-y-auto flex-grow">
        {/* Package Name */}
        <div className="mb-6">
          <p className="text-sm text-gray-500 mb-1">{t("packageLabel")}</p>

          <h3 className="text-xl font-bold text-[#DA2128]">
            {packageData.name} - {packageData.validity_day} {t("validity")}
          </h3>
        </div>

        {/* Benefits List */}
        <div className="grid grid-cols-3 gap-4 mb-8 bg-gray-50 rounded-xl">
          {/* Data Benefit */}
          <div className="flex flex-col items-center gap-2 p-3 bg-gray-50 rounded-xl">
            <div className="w-12 h-12  rounded-full flex items-center justify-center text-red-600">
              <svg
                width="42"
                height="42"
                viewBox="0 0 42 42"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="42" height="42" rx="12" fill="#DA2128" />
                <path
                  d="M21 19C21 18.4477 20.5523 18 20 18C19.4477 18 19 18.4477 19 19V24.1707C17.8348 24.5825 17 25.6938 17 27C17 28.6569 18.3431 30 20 30C21.6569 30 23 28.6569 23 27C23 25.6938 22.1652 24.5825 21 24.1707V19Z"
                  fill="white"
                />
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M20 14C15.5817 14 12 17.5817 12 22C12 22.5523 11.5523 23 11 23C10.4477 23 10 22.5523 10 22C10 16.4772 14.4772 12 20 12C25.5228 12 30 16.4772 30 22C30 22.5523 29.5523 23 29 23C28.4477 23 28 22.5523 28 22C28 17.5817 24.4183 14 20 14Z"
                  fill="white"
                />
              </svg>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500 mb-0.5">{t("free")}</p>
              <p className="text-sm font-bold text-[#DA2128] leading-tight">
                {packageData.data_per_day
                  ? `${packageData.data_per_day}${t("dataPerDay")}`
                  : packageData.data_per_month
                    ? `${packageData.data_per_month}GB/tháng`
                    : "—"}
              </p>
            </div>
          </div>

          {/* SMS Benefit */}
          <div className="flex flex-col items-center gap-2 p-3 bg-gray-50 rounded-xl">
            <div className="w-12 h-12 bg-red-50 rounded-full flex items-center justify-center text-[#DA2128]">
              <svg
                width="42"
                height="42"
                viewBox="0 0 42 42"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="42" height="42" rx="12" fill="#DA2128" />
                <path
                  d="M18.2799 10.8228C19.7371 10.7259 21.2602 10.7257 22.7203 10.8228C27.2869 11.1263 30.9106 14.8127 31.2086 19.4224C31.2644 20.2848 31.2644 21.1771 31.2086 22.0396C30.9107 26.6493 27.287 30.3356 22.7203 30.6392C21.2602 30.7362 19.7371 30.736 18.2799 30.6392C17.715 30.6016 17.0996 30.4676 16.5582 30.2446C16.3205 30.1467 16.1588 30.0809 16.0406 30.0376C15.9593 30.0935 15.8512 30.1726 15.694 30.2886C14.9015 30.8729 13.9008 31.2831 12.4811 31.2485L12.4352 31.2466C12.1614 31.24 11.8695 31.2331 11.6315 31.187C11.3448 31.1315 10.9902 30.9932 10.7682 30.6147C10.5266 30.2029 10.6227 29.7864 10.7164 29.5239C10.8049 29.2763 10.9592 28.9857 11.1158 28.689L11.1373 28.6479C11.6034 27.7646 11.733 27.0425 11.484 26.561C10.6517 25.3046 9.90257 23.7559 9.79163 22.0396C9.73589 21.1771 9.73589 20.2848 9.79163 19.4224C10.0896 14.8127 13.7133 11.1263 18.2799 10.8228ZM16.4996 20.0005C15.9475 20.0007 15.4996 20.4483 15.4996 21.0005C15.4998 21.5525 15.9476 22.0003 16.4996 22.0005H16.5094C17.0614 22.0003 17.5092 21.5525 17.5094 21.0005C17.5094 20.4483 17.0615 20.0007 16.5094 20.0005H16.4996ZM20.4957 20.0005C19.9434 20.0005 19.4957 20.4482 19.4957 21.0005C19.4959 21.5526 19.9435 22.0005 20.4957 22.0005H20.5045C21.0567 22.0005 21.5044 21.5526 21.5045 21.0005C21.5045 20.4482 21.0568 20.0005 20.5045 20.0005H20.4957ZM24.4908 20.0005C23.9386 20.0006 23.4908 20.4483 23.4908 21.0005C23.491 21.5526 23.9387 22.0004 24.4908 22.0005H24.4996C25.0518 22.0005 25.4995 21.5526 25.4996 21.0005C25.4996 20.4482 25.0519 20.0005 24.4996 20.0005H24.4908Z"
                  fill="white"
                />
              </svg>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500 mb-0.5">{t("free")}</p>
              <p className="text-sm font-bold text-[#DA2128] leading-tight">
                {packageData.free_sms} {t("sms")}
              </p>
            </div>
          </div>

          {/* Minutes Benefit */}
          <div className="flex flex-col items-center gap-2 p-3 bg-gray-50 rounded-xl">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
              <svg
                width="42"
                height="42"
                viewBox="0 0 42 42"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="42" height="42" rx="12" fill="#DA2128" />
                <path
                  d="M14.5082 9.7508C15.1032 9.87378 15.5771 10.2736 15.8715 10.8017L16.8093 12.4843C17.1548 13.104 17.4455 13.6255 17.6354 14.0789C17.8368 14.5598 17.9564 15.0341 17.9017 15.5584C17.847 16.0827 17.6321 16.5221 17.3359 16.9511C17.0565 17.3555 16.6645 17.8058 16.1986 18.341L14.8199 19.9245C14.5729 20.2083 14.4494 20.3502 14.4381 20.5276C14.4268 20.7049 14.528 20.8564 14.7305 21.1593C16.4563 23.7414 18.7822 26.0681 21.3663 27.7953C21.6693 27.9978 21.8207 28.099 21.9981 28.0878C22.1754 28.0765 22.3173 27.9529 22.6011 27.7059L24.1848 26.3271C24.7199 25.8613 25.1702 25.4692 25.5746 25.1899C26.0037 24.8936 26.443 24.6787 26.9674 24.624C27.4917 24.5694 27.9659 24.689 28.4468 24.8904C28.9002 25.0802 29.4217 25.3709 30.0413 25.7163L31.724 26.6543C32.2522 26.9487 32.652 27.4226 32.7749 28.0176C32.8992 28.6188 32.7159 29.2231 32.3111 29.7198C30.8422 31.522 28.4889 32.6695 26.0201 32.1715C24.5026 31.8653 23.0053 31.3553 21.1944 30.3168C17.5557 28.23 14.2933 24.9658 12.209 21.3314C11.1704 19.5204 10.6604 18.0232 10.3543 16.5056C9.85627 14.0368 11.0037 11.6835 12.8059 10.2147C13.3026 9.80983 13.9069 9.62653 14.5082 9.7508Z"
                  fill="white"
                />
              </svg>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500 mb-0.5">{t("free")}</p>
              <p className="text-sm font-bold text-[#DA2128] leading-tight">
                {packageData.free_call_minute} {t("minutes")}
              </p>
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div
          className="mb-6  rounded-xl overflow-hidden bg-gray-50 py-4 "
          id="package-description"
        >
          {/* <h4 className="font-semibold mb-2 text-gray-800">{t('descriptionLabel')}</h4> */}
          <div
            dangerouslySetInnerHTML={{ __html: packageData.brief }}
            className="text-sm  space-y-1 "
          />
        </div>
      </div>

      {/* Fixed Bottom Action Area */}
      <div className="px-2 pt-4  shrink-0 bg-white rounded-xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-bold  text-[#DA2128]">
                {toCurrency(packageData.sale_price)}{" "}
                <span className="text-xs text-gray-400">
                  / {packageData.validity_day} {t("validity")}
                </span>
              </span>
              {packageData.base_price > packageData.sale_price && (
                <span className="text-sm text-gray-400 line-through">
                  {toCurrency(packageData.base_price)}
                </span>
              )}
            </div>
          </div>
          {isBuy && (
            <Button
              onClick={() => handleBuy(packageData)}
              variant="normal"
              className=" !px-4"
            >
              {t("register")}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PackDetail;
