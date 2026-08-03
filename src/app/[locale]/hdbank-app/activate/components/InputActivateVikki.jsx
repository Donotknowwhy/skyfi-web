"use client";

import { showModalMessHDBank } from "@/app/components/modals/modalMess";
import dkttService from "@/app/services/dkttService";
import { useUserState } from "@/app/stores/user";
import { getCallbackBaseUrl } from "@/app/utils/callbackHelper";
import { useLoad } from "@/app/utils/load";
import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useFormContext } from "react-hook-form";
import useActivateHDBank from "../hook/useActivateHDBank";
import imgData from "../mockData/mockImage";

const InputActivateVikki = () => {
  const t = useTranslations("hdbank.inputActivate");
  const { onPush } = useActivateHDBank();
  const {
    setValue,
    register,
    formState: { errors },
    handleSubmit,
    getValues,
  } = useFormContext();
  const { open, close } = useLoad();
  const data = getValues("data") || {};
  const { userVikki, sessionId } = useUserState();

  const router = useRouter();
  const handleContinue = () => {
    checkSim().then(async (res) => {
      if (!res) return;
      if (res.imsi) {
        setValue("data.imsi", res.imsi);
      }
      await sendMessage(sessionId, res.imsi);
      // onPush('infoActivate');
      // setValue('data', {
      //   ...data,
      //   idNumber: '001198038611',
      //   passport: null,
      //   fullName: 'NGUYỄN THỊ THÚY HƯỜNG',
      //   birthDay: '13/12/1998',
      //   gender: 'Male',
      //   address: 'Thiết Bình Vân Hà, Đông Anh, Hà Nội',
      //   issueDate: '29/03/2024',
      //   issuePlace: 'CỤC TRƯỞNG CỤC CẢNH SÁT QUẢN LÝ HÀNH CHÍNH VỀ TRẬT TỰ XÃ HỘI',
      //   international: 'VNM',
      //   contactPhone: '',
      //   homeTown: 'Vân Hà, Đông Anh, Hà Nội',
      //   city_code: '',
      //   faceMatching: "86",
      //   district_code: '268',
      //   img1: imgData,
      //   img2: imgData,
      //   img3: imgData,
      // });
    });
  };
  const sendMessage = async (sessionId, imsi) => {
    // Call API Update info phone, seri, imsi by sessionId to DKTT
    try {
      open();
      const currentData = getValues("data") || {};
      await dkttService.updateSimInfoHD({
        session_id: sessionId,
        phone: currentData.phone || "",
        seri: currentData.seri || "",
        imsi: imsi || currentData.imsi || "",
      });
      if (typeof window !== "undefined") {
        const message = {
          action: "get_ekyc",
          user_id: userVikki || "",
          session_id: sessionId,
          url_callback: `${getCallbackBaseUrl()}/hdbank-app/activate?page=infoActivate&sessionId=${sessionId}`,
        };
        console.log("message to app ", message);
        if (
          window.ReactNativeWebView &&
          window.ReactNativeWebView.postMessage
        ) {
          window.ReactNativeWebView.postMessage(JSON.stringify(message));
        }
      } else {
        alert(
          "ReactNativeWebView is not available. This page needs to be loaded in a React Native WebView.",
        );
      }
    } catch (error) {
      showModalMessHDBank({
        label: "Thông báo",
        message: error.message || "Lỗi không xác định",
        type: "error",
      });
    } finally {
      close();
    }
  };

  const checkSim = async () => {
    try {
      open();
      const currentData = getValues("data") || {};
      const iccid = (currentData.seri || "").trim();
      const msisdn = (currentData.phone || "").trim();
      const res = await dkttService.checkSim({ iccid, msisdn });
      return res.data;
    } catch (err) {
      showModalMessHDBank({
        label: "Thông báo",
        message: err.message || "Lỗi không xác định",
        type: "error",
      });
      return null;
    } finally {
      close();
    }
  };
  // handle back
  const handleBack = () => {
    router.replace(`/hdbank-app?sessionId=${sessionId}`);
  };

  return (
    <div className="flex flex-col  bg-cover bg-center bg-no-repeat">
      {/* Header */}
      <div className="flex items-center  px-4 mt-4">
        <button
          onClick={handleBack}
          className="w-6 h-6 flex items-center justify-center"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 18L9 12L15 6"
              stroke="#333333"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <h1 className="flex-1 text-center text-base font-semibold text-[#333333]">
          {t("headerTitle")}
        </h1>
        <div className="w-6 h-6" />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-3 px-4 pt-4">
        {/* Title */}
        <h2 className="text-2xl font-semibold text-[rgba(50,52,56,0.88)] tracking-[-0.025em]">
          {t("title")}
        </h2>

        {/* Note */}
        <p className="text-sm text-[rgba(50,52,56,0.88)] leading-5 tracking-[-0.016em]">
          {t("note")}
        </p>

        {/* Phone Number Field (Disabled) */}
        <div className="flex flex-col gap-1">
          <div
            className={`flex items-center gap-2 bg-white rounded-xl px-4 py-2 h-[56px] border ${
              errors.data?.phoneNumber ? "border-red-500" : "border-transparent"
            }`}
          >
            <div className="flex flex-col justify-center flex-1">
              <span className="text-xs text-[#333333]">
                {t("phoneLabel")}{" "}
                <span className="text-red-500 text-sm">*</span>
              </span>
              <input
                type="text"
                {...register("data.phone", {
                  required: t("phoneRequired"),
                  // pattern: { value: /^(070)(\d{7})$/, message: t('phoneInvalid') }
                })}
                placeholder={"0707 123 456"}
                maxLength={12}
                className="flex-1 text-base text-[#333333] placeholder:text-[#A1A1A1] outline-none bg-transparent"
              />
            </div>
          </div>
          {errors.data?.phone && (
            <span className="text-xs text-red-500 px-1">
              {errors.data.phone.message}
            </span>
          )}
        </div>

        {/* Serial Field */}
        <div className="flex flex-col gap-1">
          <div
            className={`flex items-center gap-2 bg-white rounded-xl px-4 py-2 h-[56px] border ${
              errors.data?.serial ? "border-red-500" : "border-transparent"
            }`}
          >
            <div className="flex flex-col justify-center flex-1">
              <div className="flex items-center gap-1">
                <span className="text-xs text-[#333333]">
                  {t("serialLabel")}
                </span>
                <span className="text-sm text-[#ED1B2F]">*</span>
              </div>
              <div className="flex items-center gap-1">
                <input
                  type="text"
                  {...register("data.seri", {
                    required: t("serialRequired"),
                    minLength: {
                      value: 16,
                      message: t("serialInvalid"),
                    },
                  })}
                  placeholder={t("serialPlaceholder")}
                  maxLength={20}
                  className="flex-1 text-base text-[#333333] placeholder:text-[#A1A1A1] outline-none bg-transparent"
                />
              </div>
            </div>
            {/* Scan QR Icon */}
            <button
              onClick={() => setValue("page", "scanQR")}
              className="w-6 h-6 flex items-center justify-center"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 7V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H7"
                  stroke="#333333"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M17 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V7"
                  stroke="#333333"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M21 17V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H17"
                  stroke="#333333"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V17"
                  stroke="#333333"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7 8H10V11H7V8Z"
                  stroke="#333333"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M14 8H17V11H14V8Z"
                  stroke="#333333"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7 14H10V17H7V14Z"
                  stroke="#333333"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M14 14H17V17H14V14Z"
                  stroke="#333333"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </div>
          {errors.data?.seri && (
            <span className="text-xs text-red-500 px-1">
              {errors.data.seri.message}
            </span>
          )}
        </div>
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Bottom Action Bar */}
      <div className="bg-white rounded-t-2xl shadow-[0px_0px_16px_0px_rgba(0,0,0,0.1)] px-4 py-4 pb-8 fixed bottom-0 left-0 right-0">
        <button
          onClick={handleSubmit(handleContinue)}
          className="w-full py-3 px-4 rounded-full text-white font-semibold text-base"
          style={{
            background:
              "linear-gradient(90deg, #DA2128 0.2%, #DA2128 50.07%, #F9A61C 75%, #F9C016 84.97%, #FFDD00 99.93%)",
          }}
        >
          {t("continueButton")}
        </button>
      </div>
    </div>
  );
};

export default InputActivateVikki;
