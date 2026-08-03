import { Button } from "@/app/components/ui/Button";
import PackageService from "@/app/services/package";
import { useUserState } from "@/app/stores/user";
import { getCallbackBaseUrl } from "@/app/utils/callbackHelper";
import { ORDER_BRANDS } from "@/app/utils/orderSourceContext";
import { useLoad } from "@/app/utils/load";
import { useModal } from "@/app/utils/modal";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl";
import { showModalMessHDBank } from "../../modals/modalMess";

const ModalNotMoney = ({ code }) => {
  const t = useTranslations("hdbank.modalNotMoney");
  const { close, done } = useModal();
  const { user, sessionId } = useUserState();
  const { open, close: closeLoad } = useLoad();

  const sendMessage = (code) => {
    if (typeof window !== "undefined") {
      const message = {
        action: "payment",
        bill_id: code,
        bill_type: "package",
        url_callback: `${getCallbackBaseUrl()}/hdbank-app?sessionId=${sessionId}&billId=${code}`,
      };
      if (window.ReactNativeWebView && window.ReactNativeWebView.postMessage) {
        console.info("postMessage payload:", message);
        window.ReactNativeWebView.postMessage(JSON.stringify(message));
      }
    } else {
      alert(
        "ReactNativeWebView is not available. This page needs to be loaded in a React Native WebView.",
      );
    }
  };

  const handleDone = async () => {
    try {
      open();
      const params = {
        msisdn: user.msisdn,
        package_code: code,
        customer_name: user.full_name,
        email: user.email,
        brand: ORDER_BRANDS.HDBANK,
      };
      const res = await PackageService.createOrderPackage(params);
      console.log("result: ", res);
      if (res.order_number) {
        sendMessage(res.order_number);
      } else {
        showModalMessHDBank({
          message: res.message,
          type: "error",
        });
      }
      close();
    } finally {
      closeLoad();
    }
  };

  return (
    <div className="relative bg-white rounded-2xl w-full max-w-sm mx-auto flex flex-col items-center text-center">
      {/* Close Button */}
      <button
        onClick={close}
        className="absolute top-0 right-0 text-gray-400 hover:text-gray-600"
      >
        <XMarkIcon className="w-6 h-6" />
      </button>

      {/* Error Icon */}
      <div className="w-16 h-16 rounded-full border-2 border-red-500 flex items-center justify-center mb-4">
        <XMarkIcon className="w-8 h-8 text-red-500" strokeWidth={1.5} />
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-gray-900 mb-2">{t("title")}</h3>

      {/* Message */}
      <p className="text-gray-500 text-sm mb-6  leading-relaxed">
        {t("message")}
      </p>

      {/* Button */}
      <Button onClick={handleDone} className="w-full rounded-full  ">
        {t("button")}
      </Button>
    </div>
  );
};

export default ModalNotMoney;
