"use client";

import { useRouter } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import SignatureCanvas from "react-signature-canvas";
import { showModalMessHDBank } from "@/app/components/modals/modalMess";
import { showModalIframeHDBank } from "@/app/components/modals/hdbank/ModalIframeHDBank";
import { showPdfViewerModal } from "@/app/components/modals/hdbank/modalPdfViewer";
import dkttService from "@/app/services/dkttService";
import { useUserState } from "@/app/stores/user";
import { base64ToHex } from "@/app/utils/encoding";
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

const Checkbox = ({ checked, onToggle }) => (
  <button
    type="button"
    onClick={onToggle}
    className={`mt-0.5 flex h-[22px] w-[22px] flex-shrink-0 items-center justify-center rounded-[6px] border-2 transition-colors ${
      checked ? "border-[#DA2128] bg-[#DA2128]" : "border-[#F9A61C] bg-white"
    }`}
    aria-checked={checked}
    role="checkbox"
  >
    {checked && (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5">
        <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    )}
  </button>
);

const TermRow = ({ checked, onToggle, children }) => (
  <div className="flex items-start gap-3">
    <Checkbox checked={checked} onToggle={onToggle} />
    <p className="flex-1 text-sm leading-5 text-[#1C1C1E]">{children}</p>
  </div>
);

const TERM_KEYS = ["term2", "term3", "term4"];

const SignPage = () => {
  const t = useTranslations("hdbank.registerSim.activate.sign");
  const tActivate = useTranslations("hdbank.registerSim.activate");
  const router = useRouter();
  const searchParams = useSearchParams();
  const { sessionId } = useUserState();
  const { open, close } = useLoad();

  const [terms, setTerms] = useState(TERM_KEYS.map(() => false));
  const [detailOpen, setDetailOpen] = useState(false);
  const [detailTerm, setDetailTerm] = useState(false);
  const [signed, setSigned] = useState(false);
  const sigCanvas = useRef(null);
  const signatureRef = useRef("");

  // Cache contract payload built from sessionId so repeated views don't refetch
  const contactDataRef = useRef(null);
  // Raw session responses, kept for the registration call (needs ekyc images)
  const rawSessionDataRef = useRef(null);
  // Contract (get_img4_app) response cached with the signature it was built
  // from, so handleContinue reuses the fetch from showContactInfo
  const contractResRef = useRef(null);

  const handleClearSignature = () => {
    sigCanvas.current?.clear();
    signatureRef.current = "";
    setSigned(false);
  };

  const handleEndSignature = () => {
    if (sigCanvas.current && !sigCanvas.current.isEmpty()) {
      signatureRef.current = sigCanvas.current.toDataURL();
      setSigned(true);
    }
  };

  const toggleTerm = (i) =>
    setTerms((prev) => prev.map((v, idx) => (idx === i ? !v : v)));

  const canContinue = terms.every(Boolean) && signed;

  // Prefill contract data as soon as the page loads
  useEffect(() => {
    buildContactData().catch((err) =>
      console.error("Failed to prefill contact data:", err),
    );
  }, []);

  // Build getContact payload from eKYC session + SIM info (same shape as Vikki form data)
  const buildContactData = async () => {
    if (contactDataRef.current) return contactDataRef.current;

    const currentSessionId = searchParams.get("sessionId") || sessionId;
    if (!currentSessionId) return null;

    const [ekycData, simInfo] = await Promise.all([
      dkttService.getEkycSessionHD(currentSessionId),
      dkttService.getSimInfoHD(currentSessionId),
    ]);

    if (!ekycData && !simInfo) return null;

    rawSessionDataRef.current = { ekycData, simInfo };

    const data = {
      fullName: ekycData?.customer_name || simInfo?.customer_name || "",
      ...(ekycData && {
        gender: ekycData.customer_gender || "",
        idNumber: ekycData.id_number || "",
        birthDay: formatDateToDDMMYYYY(ekycData.birthday) || "",
        issueDate: formatDateToDDMMYYYY(ekycData.issue_date) || "",
        expiryDate: formatDateToDDMMYYYY(ekycData.exp_date) || "",
        issuePlace: ekycData.issue_by || "",
        homeTown: ekycData.address || "",
        address: ekycData.address || "",
        sob: base64ToHex(ekycData?.chip_raw?.sod || ""),
        card_type: "CCCD",
        international: "VNM",
        face_matching: "88",
        expired_at: ekycData.expired_at || ekycData.exp_date || "",
      }),
      // Phone + seri passed from the check-info screen take priority
      seri: searchParams.get("seri") || simInfo?.seri || "",
      phone:
        searchParams.get("phone") ||
        simInfo?.phone ||
        simInfo?.customer_phone ||
        "",
      imsi: simInfo?.imsi || "",
    };

    contactDataRef.current = data;
    return data;
  };

  // Fetch and show the contract/request forms PDF, like SignActivateVikki's showContactInfo
  const showContactInfo = async () => {
    try {
      open();
      // Use whatever data is available — don't require seri/phone to be filled
      const data = await buildContactData();
      if (!data) {
        return showModalMessHDBank({
          label: "Thông báo",
          message: "Không tìm thấy thông tin phiếu.",
          type: "error",
        });
      }

      // Attach signature as img4 when already signed, like the Vikki payload
      const payload = signatureRef.current
        ? { ...data, img4: signatureRef.current.replace(/^data:image\/png;base64,/, "") }
        : data;
      const res = await dkttService.getContact(payload);
      if (res?.success && res?.data) {
        contractResRef.current = { signature: signatureRef.current, res };
      }
      const contact = res?.data;
      if (contact) {
        // Remove data:application/pdf;base64, prefix if present
        const base64Data = contact.replace(/^data:application\/pdf;base64,/, "");
        showPdfViewerModal({ pdfBase64: base64Data });
      } else {
        showModalMessHDBank({
          label: "Thông báo",
          message: "Không tìm thấy thông tin phiếu.",
          type: "info",
        });
      }
    } catch (error) {
      console.error("Error fetching contact info:", error);
      showModalMessHDBank({
        label: "Thông báo",
        message: "Không thể tải thông tin phiếu. Vui lòng thử lại.",
        type: "error",
      });
    } finally {
      close();
    }
  };

  // Bold document names become tappable: consent document opens the policy
  // iframe, the other forms open the contract PDF (like SignActivateVikki)
  const richForTerm = (key) => ({
    b: (chunks) => (
      <button
        type="button"
        onClick={
          key === "term4"
            ? () =>
                showModalIframeHDBank({
                  url: "/personal-data-protection-policy?src=app",
                })
            : showContactInfo
        }
        className="font-semibold text-[#DA2128] underline text-left"
      >
        {chunks}
      </button>
    ),
  });

  // Submit registration via /app/register-msisdn-nfc — nfcData comes from the
  // eKYC session (chip_raw), then pass the activation info to the result screen
  const handleContinue = async () => {
    if (!canContinue) return;

    try {
      open();
      const data = await buildContactData();
      if (!data) {
        return showModalMessHDBank({
          label: "Thông báo",
          message: "Không tìm thấy thông tin đăng ký.",
          type: "error",
        });
      }

      // img4 carries the contract base64 and mahd comes from the
      // get_img4_app response; reuse the contract already fetched via
      // showContactInfo unless the signature changed since then
      let contractRes;
      if (contractResRef.current?.signature === signatureRef.current) {
        contractRes = contractResRef.current.res;
      } else {
        contractRes = await dkttService.getContact({
          ...data,
          img4:
            signatureRef.current.replace(/^data:image\/png;base64,/, "") || "",
        });
        if (contractRes?.success && contractRes?.data) {
          contractResRef.current = {
            signature: signatureRef.current,
            res: contractRes,
          };
        }
      }
      if (!contractRes?.success || !contractRes?.data) {
        return showModalMessHDBank({
          label: "Thông báo",
          message:
            contractRes?.message ||
            "Không thể tạo hợp đồng. Vui lòng thử lại.",
          type: "error",
        });
      }
      const contractBase64 = contractRes.data.replace(
        /^data:application\/pdf;base64,/,
        "",
      );

      const { ekycData } = rawSessionDataRef.current || {};
      const chipRaw = ekycData?.chip_raw || {};
      const param = {
        face_enroll: {
          faceImages: [ekycData?.img_portrait || ""],
          personId: data.idNumber || "",
          transId: ekycData?.trans_id || ekycData?.transId || chipRaw.transId || "",
          nfcData: {
            com: chipRaw.com || "",
            sod: chipRaw.sod || "",
            dg15: chipRaw.dg15 || "",
          },
        },
        strIsdn: data.phone || "",
        strSerial: data.seri || "",
        strImsi: data.imsi || "",
        strSubName: data.fullName || "",
        strBirthday: data.birthDay || "",
        strSex: data.gender || "",
        card_type: data.card_type || "",
        strIdNo: data.idNumber || "",
        strIdIssueDate: data.issueDate || "",
        strIdIssuePlace: data.issuePlace || "",
        strProvince: ekycData?.province || "",
        strDistrict: ekycData?.district || "",
        strPrecinct: ekycData?.precinct || "",
        strAddress: data.address || "",
        mahd: contractRes.extra?.mahd || "",
        img1: ekycData?.img_front || "",
        img2: ekycData?.img_back || ekycData?.img_front || "",
        img3: ekycData?.img_portrait || "",
        img4: contractBase64,
      };

      const response = await dkttService.registerMsisdnNfc(param);

      if (response?.success) {
        const params = new URLSearchParams();
        if (data.phone) params.set("phone", data.phone);
        if (data.seri) params.set("seri", data.seri);
        router.push(
          `/hdbank-app/register-sim/activate/success?${params.toString()}`,
        );
      } else {
        showModalMessHDBank({
          label: "Thông báo",
          message: response?.message || "Đăng ký thất bại. Vui lòng thử lại.",
          type: "error",
        });
      }
    } catch (error) {
      console.error("Error submitting registration:", error);
      showModalMessHDBank({
        label: "Thông báo",
        message: "Có lỗi xảy ra khi đăng ký. Vui lòng thử lại.",
        type: "error",
      });
    } finally {
      close();
    }
  };

  return (
    <div className="min-h-[100dvh] flex flex-col bg-white">
      <main className="flex-1 space-y-4 p-4 pb-32">
        <h1 className="text-lg font-bold text-[#1C1C1E]">{t("instruction")}</h1>

        {/* Policy terms */}
        <div className="space-y-3">
          {TERM_KEYS.map((key, i) => (
            <TermRow key={key} checked={terms[i]} onToggle={() => toggleTerm(i)}>
              {t.rich(key, richForTerm(key))}
            </TermRow>
          ))}
        </div>

        {/* Detail toggle */}
        <button
          type="button"
          onClick={() => setDetailOpen((s) => !s)}
          className="flex items-center gap-1 text-base font-semibold text-[#DA2128]"
        >
          {t("detail")}
          <svg
            className={`h-4 w-4 transition-transform ${detailOpen ? "rotate-180" : ""}`}
            fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {detailOpen && (
          <div className="space-y-3 rounded-2xl bg-[#F7F7F7] p-4">
            <p className="text-sm leading-5 text-[#5C5C5C]">{t("detailContent")}</p>
            <ul className="list-disc space-y-2 pl-5 text-sm leading-5 text-[#5C5C5C]">
              <li>{t("detailContent2")}</li>
            </ul>
            <div className="flex items-start gap-3 rounded-xl bg-[#FBE9EA] p-3">
              <Checkbox checked={detailTerm} onToggle={() => setDetailTerm((s) => !s)} />
              <p className="flex-1 text-sm leading-5 text-[#1C1C1E]">{t("detailTerm")}</p>
            </div>
          </div>
        )}

        {/* Signature */}
        <div className="rounded-2xl bg-[#F7F7F7] p-4">
          <div className="flex items-center gap-2">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#DA2128" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 21c3-1 4-3 6-7s3-8 5-8 1 4-1 8-2 6 0 6 3-2 4-3" />
            </svg>
            <h2 className="text-base font-bold text-[#1C1C1E]">{t("signatureTitle")}</h2>
          </div>
          <p className="mt-2 text-sm leading-5 text-[#5C5C5C]">{t("signatureDesc")}</p>

          {/* Signature canvas, like SignActivateVikki */}
          <div className="relative mt-3 h-[280px] w-full rounded-2xl border border-[#E5E5E5] bg-white">
            <SignatureCanvas
              ref={sigCanvas}
              penColor="blue"
              canvasProps={{
                className: "w-full h-full rounded-2xl",
                style: { width: "100%", height: "100%" },
              }}
              onEnd={handleEndSignature}
            />

            {!signed && (
              <span className="pointer-events-none absolute inset-0 flex items-center justify-center text-sm font-semibold text-[#A1A1A1]">
                {t("signHint")}*
              </span>
            )}

            {/* Clear button */}
            {signed && (
              <button
                type="button"
                onClick={handleClearSignature}
                className="absolute top-2 right-2 rounded-full bg-gray-100 px-3 py-1 text-xs text-gray-500 hover:bg-gray-200"
              >
                Ký lại
              </button>
            )}
          </div>
        </div>
      </main>

      {/* Fixed bottom actions */}
      <div className="fixed bottom-0 left-0 right-0 z-40 flex gap-3 bg-white px-4 pb-8 pt-4 shadow-[0px_-4px_10px_0px_rgba(0,0,0,0.05)]">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex-1 rounded-2xl bg-[#EDEDED] py-4 text-center text-lg font-semibold text-[#1C1C1E]"
        >
          {t("back")}
        </button>
        <button
          type="button"
          onClick={handleContinue}
          disabled={!canContinue}
          className={`flex-1 rounded-2xl py-4 text-center text-lg font-semibold transition-colors ${
            canContinue ? "text-[#5A3B00]" : "bg-[#EDEDED] text-[#9CA3AF]"
          }`}
          style={
            canContinue
              ? { background: "linear-gradient(90deg, #FBD200 0%, #F9A61C 100%)" }
              : undefined
          }
        >
          {tActivate("continue")}
        </button>
      </div>
    </div>
  );
};

export default SignPage;
