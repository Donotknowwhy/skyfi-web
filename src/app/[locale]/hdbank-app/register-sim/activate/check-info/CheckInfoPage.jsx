"use client";

import { useRouter } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import RegisterNavBar from "@/app/[locale]/hdbank-app/register-sim/components/RegisterNavBar";
import SessionExpired from "@/app/components/hdbank/SessionExpired";
import { showModalMessHDBank } from "@/app/components/modals/modalMess";
import authService from "@/app/services/auth";
import dkttService from "@/app/services/dkttService";
import { useUserActions, useUserState } from "@/app/stores/user";
import { getCallbackBaseUrl } from "@/app/utils/callbackHelper";
import { useLoad } from "@/app/utils/load";

// Format date from yyyy-mm-dd to dd/mm/yyyy
const formatDateToDDMMYYYY = (dateString) => {
  if (!dateString) return "";

  try {
    if (
      typeof dateString === "string" &&
      /^\d{4}-\d{2}-\d{2}/.test(dateString)
    ) {
      const datePart = dateString.split("T")[0];
      const [year, month, day] = datePart.split("-");
      return `${day}/${month}/${year}`;
    }

    const date = new Date(dateString);
    if (!isNaN(date.getTime())) {
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    }

    return dateString;
  } catch (error) {
    console.error("Error formatting date:", error);
    return dateString;
  }
};

// API returns gender as M/F — display as Nam/Nữ
const formatGender = (gender) => {
  if (!gender) return "";
  const g = String(gender).trim().toUpperCase();
  if (g === "M" || g === "MALE") return "Nam";
  if (g === "F" || g === "FEMALE") return "Nữ";
  return gender;
};

// Display phone per design: 0707 123 456
const formatPhoneDisplay = (phone) => {
  if (!phone) return "";
  const digits = String(phone).replace(/\D/g, "");
  if (digits.length === 10) {
    return `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7)}`;
  }
  return phone;
};

// eKYC data without NFC sod cannot register via this flow — direct to the SkyFi app
const showDownloadSkyFiModal = (onClose) =>
  showModalMessHDBank({
    label: "Thông báo",
    message:
      "Thông tin định danh của bạn chưa có dữ liệu NFC (SOD). Vui lòng tải ứng dụng SkyFi để tiến hành đăng ký thông tin thuê bao.",
    type: "info",
    labelConfirm: "Đóng",
    onConfirm: onClose,
  });

const ScanIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#5C5C5C" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 7V5a2 2 0 012-2h2M17 3h2a2 2 0 012 2v2M21 17v2a2 2 0 01-2 2h-2M7 21H5a2 2 0 01-2-2v-2" />
    <path d="M7 12h10" />
  </svg>
);

// Read-only registration field (label above, value below)
const ReadField = ({ label, value }) => (
  <div>
    <p className="text-sm text-[#A1A1A1]">{label}</p>
    <p className="mt-1 text-base font-medium text-[#1C1C1E]">{value}</p>
  </div>
);

const CheckInfoPage = () => {
  const t = useTranslations("hdbank.registerSim.activate");
  const router = useRouter();
  const searchParams = useSearchParams();
  const { open, close } = useLoad();
  const {
    setToken,
    logoutVikki,
    setUserVikki,
    setSessionIdState,
    setUser,
    setPhoneDktts,
    convertPhoneFormat,
  } = useUserActions();
  const { sessionId, userVikki } = useUserState();
  const [error, setError] = useState(null);
  // eKYC data without NFC sod cannot register via this flow — must use the SkyFi app
  const [missingSod, setMissingSod] = useState(false);
  // Bước 2 (page=infoActivate): app đã eKYC xong và callback về — lúc này mới gọi API lấy thông tin
  const isInfoStep = searchParams.get("page") === "infoActivate";

  const [sub, setSub] = useState({
    phone: "",
    serial: "",
    fullName: "",
    gender: "",
    idNumber: "",
    dob: "",
    issueDate: "",
    expiryDate: "",
    issuePlace: "",
    permanentAddress: "",
    currentAddress: "",
  });
  const [phone, setPhone] = useState("");
  const [serial, setSerial] = useState("");
  const [currentAddress, setCurrentAddress] = useState("");
  const [inputErrors, setInputErrors] = useState({});

  useEffect(() => {
    handleLoginWithSession();
  }, [searchParams]);

  const handleLoginWithSession = async () => {
    open();
    const sessionIdFromUrl = searchParams.get("sessionId");
    const currentSessionId = sessionIdFromUrl || sessionId;

    if (!currentSessionId) {
      console.log("No sessionId found, logging out user");
      logoutVikki();
      close();
      return;
    }

    // Lưu sessionId từ URL vào context nếu có
    if (sessionIdFromUrl) {
      setSessionIdState(sessionIdFromUrl);
    }

    try {
      const response = await authService.loginWithSession(currentSessionId);
      let giftPhone = "";

      if (response.success) {
        // Save token to localStorage
        if (response.data?.token) {
          let listPhone = [response.data.phone, ...response.data.phone_dktts];
          listPhone = listPhone
            .filter((e) => e.startsWith("070") || e.startsWith("8470"))
            .map((e) => convertPhoneFormat(e));
          setToken(
            response.data.token,
            listPhone[0] ? listPhone[0] : response.data.phone,
          );
          setUserVikki(response.data.user_id || "");
          setUser(response.data);
          setPhoneDktts(listPhone);
        }

        // Số thuê bao cần kích hoạt: first received gift number
        giftPhone = convertPhoneFormat(response.data?.received_gifts?.[0] || "");
        if (giftPhone) {
          setSub((prev) => ({ ...prev, phone: formatPhoneDisplay(giftPhone) }));
          setPhone((prev) => prev || giftPhone);
        }
      } else {
        throw new Error(response.message || "Failed to login with session");
      }

      // Chỉ gọi API lấy thông tin sau khi app eKYC xong và callback về (page=infoActivate)
      if (searchParams.get("page") === "infoActivate") {
        await fetchSessionData(currentSessionId, giftPhone);
      }
    } catch (err) {
      console.error("Login with session error:", err);
      setError(err.message);
    } finally {
      close();
    }
  };

  // Fetch eKYC session data and SIM info from sessionId
  const fetchSessionData = async (currentSessionId, giftPhone = "") => {
    try {
      const [ekycData, simInfo] = await Promise.all([
        dkttService.getEkycSessionHD(currentSessionId),
        dkttService.getSimInfoHD(currentSessionId),
      ]);

      // Số thuê bao cần kích hoạt: gift number from login > sim_info.phone
      const activatePhone = giftPhone || simInfo?.phone || "";

      if (!ekycData?.chip_raw?.sod) {
        setMissingSod(true);
        showDownloadSkyFiModal(() => router.push("/hdbank-app"));
      }

      setSub((prev) => ({
        ...prev,
        ...(ekycData && {
          gender: formatGender(ekycData.customer_gender),
          idNumber: ekycData.id_number || "",
          dob: formatDateToDDMMYYYY(ekycData.birthday) || "",
          issueDate: formatDateToDDMMYYYY(ekycData.issue_date) || "",
          expiryDate: formatDateToDDMMYYYY(ekycData.exp_date) || "",
          issuePlace: ekycData.issue_by || "",
          permanentAddress: ekycData.address || "",
          currentAddress: ekycData.address || "",
        }),
        fullName: ekycData?.customer_name || simInfo?.customer_name || prev.fullName,
        phone: activatePhone ? formatPhoneDisplay(activatePhone) : prev.phone,
        serial: simInfo?.seri || prev.serial,
      }));

      if (simInfo?.seri) setSerial(simInfo.seri);
      if (ekycData?.address) setCurrentAddress(ekycData.address);
    } catch (err) {
      console.error("Failed to fetch session data:", err);
    }
  };

  // Bước nhập: kiểm tra SIM, cập nhật phone/seri/imsi rồi postMessage cho app eKYC,
  // app sẽ callback về trang này với page=infoActivate
  const handleSubmitSim = async () => {
    const msisdn = phone.replace(/\D/g, "");
    const iccid = serial.trim();
    const errs = {};
    if (!msisdn) errs.phone = "Vui lòng nhập số thuê bao";
    if (!iccid) errs.serial = "Vui lòng nhập số seri SIM";
    setInputErrors(errs);
    if (Object.keys(errs).length) return;

    const currentSessionId = searchParams.get("sessionId") || sessionId;
    try {
      open();
      const res = await dkttService.checkSim({ iccid, msisdn });
      await dkttService.updateSimInfoHD({
        session_id: currentSessionId,
        phone: msisdn,
        seri: iccid,
        imsi: res?.data?.imsi || "",
      });
      if (typeof window !== "undefined") {
        const message = {
          action: "get_ekyc",
          user_id: userVikki || "",
          session_id: currentSessionId,
          url_callback: `${getCallbackBaseUrl()}/hdbank-app/register-sim/activate/check-info?page=infoActivate&sessionId=${currentSessionId}`,
        };
        console.log("message to app ", message);
        if (
          window.ReactNativeWebView &&
          window.ReactNativeWebView.postMessage
        ) {
          window.ReactNativeWebView.postMessage(JSON.stringify(message));
        } else {
          alert(
            "ReactNativeWebView is not available. This page needs to be loaded in a React Native WebView.",
          );
        }
      }
    } catch (err) {
      showModalMessHDBank({
        label: "Thông báo",
        message: err.message || "Lỗi không xác định",
        type: "error",
      });
    } finally {
      close();
    }
  };

  // Pass activation phone + seri (and sessionId) to the sign screen
  const handleContinue = () => {
    if (missingSod) {
      showDownloadSkyFiModal(() => router.push("/hdbank-app"));
      return;
    }
    const params = new URLSearchParams();
    const currentSessionId = searchParams.get("sessionId") || sessionId;
    if (currentSessionId) params.set("sessionId", currentSessionId);
    const rawPhone = sub.phone.replace(/\D/g, "");
    if (rawPhone) params.set("phone", rawPhone);
    if (serial) params.set("seri", serial);
    router.push(
      `/hdbank-app/register-sim/activate/sign?${params.toString()}`,
    );
  };

  if (error) {
    return (
      <SessionExpired
        error={error}
        onRetry={() => {
          setError(null);
          handleLoginWithSession();
        }}
      />
    );
  }

  return (
    <div className="min-h-[100dvh] flex flex-col bg-[#F5F5F5]">
      <RegisterNavBar title="Kiểm tra thông tin SIM" />
      <main className="flex-1 space-y-3 p-4 pb-32">
        {/* SIM information */}
        <section className="rounded-2xl bg-white p-4">
          <h2 className="text-lg font-bold text-[#1C1C1E]">{t("simInfo.title")}</h2>
          <p className="mt-2 text-sm leading-5 text-[#5C5C5C]">
            {t("simInfo.note")}
          </p>

          {isInfoStep ? (
            <div className="mt-4">
              <p className="text-sm text-[#A1A1A1]">
                {t("simInfo.phoneLabel")} <span className="text-[#DA2128]">*</span>
              </p>
              <p className="mt-1 text-[17px] font-medium text-[#1C1C1E]">{sub.phone}</p>
            </div>
          ) : (
            <div className="mt-4">
              <div
                className={`flex items-center gap-2 rounded-2xl border px-4 py-2.5 ${
                  inputErrors.phone ? "border-[#DA2128]" : "border-[#E5E5E5]"
                }`}
              >
                <div className="flex-1">
                  <label className="block text-sm text-[#A1A1A1]">
                    {t("simInfo.phoneLabel")} <span className="text-[#DA2128]">*</span>
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="0707 123 456"
                    maxLength={12}
                    className="w-full border-0 bg-transparent p-0 text-[17px] text-[#1C1C1E] placeholder:text-[#A1A1A1] outline-none"
                  />
                </div>
              </div>
              {inputErrors.phone && (
                <p className="mt-1 px-1 text-xs text-[#DA2128]">{inputErrors.phone}</p>
              )}
            </div>
          )}

          <div className="mt-4">
            <div
              className={`flex items-center gap-2 rounded-2xl border px-4 py-2.5 ${
                inputErrors.serial ? "border-[#DA2128]" : "border-[#E5E5E5]"
              }`}
            >
              <div className="flex-1">
                <label className="block text-sm text-[#A1A1A1]">
                  {t("simInfo.serialLabel")} <span className="text-[#DA2128]">*</span>
                </label>
                <input
                  value={serial}
                  onChange={(e) => setSerial(e.target.value)}
                  maxLength={20}
                  className="w-full border-0 bg-transparent p-0 text-[17px] text-[#1C1C1E] outline-none"
                />
              </div>
            </div>
            {inputErrors.serial && (
              <p className="mt-1 px-1 text-xs text-[#DA2128]">{inputErrors.serial}</p>
            )}
          </div>
        </section>

        {/* Registration information — only after the app finished eKYC and called back */}
        {isInfoStep && (
        <section className="space-y-4 rounded-2xl bg-white p-4">
          <div>
            <h2 className="text-lg font-bold text-[#1C1C1E]">{t("register.title")}</h2>
            <p className="mt-1 text-sm leading-5 text-[#5C5C5C]">
              {t("register.subtitle")}
            </p>
          </div>

          <ReadField label={t("register.fullName")} value={sub.fullName} />
          <ReadField label={t("register.gender")} value={sub.gender} />
          <ReadField label={t("register.idNumber")} value={sub.idNumber} />
          <ReadField label={t("register.dob")} value={sub.dob} />

          <div className="flex gap-8">
            <ReadField label={t("register.issueDate")} value={sub.issueDate} />
            <ReadField label={t("register.expiryDate")} value={sub.expiryDate} />
          </div>

          <ReadField label={t("register.issuePlace")} value={sub.issuePlace} />
          <ReadField label={t("register.permanentAddress")} value={sub.permanentAddress} />

          <div className="rounded-2xl border border-[#E5E5E5] px-4 py-2.5">
            <label className="block text-sm text-[#A1A1A1]">
              {t("register.currentAddress")}
            </label>
            <input
              value={currentAddress}
              onChange={(e) => setCurrentAddress(e.target.value)}
              className="w-full border-0 bg-transparent p-0 text-base text-[#1C1C1E] outline-none"
            />
          </div>
        </section>
        )}
      </main>

      {/* Fixed bottom action */}
      <div className="fixed bottom-0 left-0 right-0 z-40 bg-white px-4 pb-8 pt-4 shadow-[0px_-4px_10px_0px_rgba(0,0,0,0.05)]">
        <button
          type="button"
          onClick={isInfoStep ? handleContinue : handleSubmitSim}
          className="w-full rounded-2xl py-4 text-center text-lg font-semibold text-[#5A3B00]"
          style={{ background: "linear-gradient(90deg, #FBD200 0%, #F9A61C 100%)" }}
        >
          {t("continue")}
        </button>
      </div>
    </div>
  );
};

export default CheckInfoPage;
