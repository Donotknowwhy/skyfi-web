"use client";

import { showModalCartHDBank } from "@/app/components/modals/hdbank/ModalCartHDBank";
import { showModalMessHDBank } from "@/app/components/modals/modalMess";
import { ButtonHD } from "@/app/components/ui/ButtonHD";
import { showModalChangeSimHDBank } from "@/app/components/hdbank-v2/modals/showModalChangeSimHDBank";
import Header from "@/app/components/hdbank-v2/sim-data/Header";
import PackageItem from "@/app/components/hdbank-v2/sim-data/PackageItem";
import Tooltip from "@/app/components/hdbank-v2/Tooltip";
import useMyEsim from "@/app/hooks/useMyEsim";
import SimDataService from "@/app/services/simDataService";
import { useUserActions, useUserState } from "@/app/stores/user";
import { basePriceSim, priceSim, simPriceTotal } from "@/app/utils/calculate";
import {
  convertSimAddToCart,
  convertSims,
  formatPhoneNumber,
  toCurrency,
} from "@/app/utils/format";
import { useLoad } from "@/app/utils/load";
import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import HDBankEventBanner from "@/app/components/hdbank-v2/sim-data/HDBankEventBanner";
import { useForm } from "react-hook-form";

const SimDataPage = () => {
  const t = useTranslations("hdbank.simData");
  const tTravelEsim = useTranslations("hdbank.travelEsim");
  const router = useRouter();
  const searchParams = useSearchParams();
  const mssisdn = searchParams.get("mssisdn");
  const [listPackage, setListPackage] = useState([]);
  const [packSelect, setPackSelect] = useState({});
  const { addToCart, setIsCartOpen, setSims } = useUserActions();
  const { simHome, cartItems } = useUserState();
  const { showDevicesEsimHDBank } = useMyEsim();
  const [isVikki_event, setIsVikki_event] = useState(false);
  const [isVikki_popup, setIsVikki_popup] = useState(false);
  const [checkPackageCode, setCheckPackageCode] = useState(false);
  const [count, setCount] = useState({
    count: 0,
    total: 0,
  });

  const load = useLoad();

  const method = useForm({
    defaultValues: {
      pack_code: "",
      sim_type: "ESIM",
    },
    mode: "onChange",
  });

  const packageCodeSelect = method.watch("pack_code");
  const simTypeSelect = method.watch("sim_type");
  const phone = method.watch("msisdn");
  const displayPackages = useMemo(() => {
    if (isVikki_event) return listPackage;
    return listPackage.filter((pack) => pack.code != "VJ71");
  }, [listPackage, isVikki_event]);

  const sim = method.watch();
  const isVikkiGift = packSelect?.vikki_event === true;

  useEffect(() => {
    getSimRandom();
  }, [mssisdn]);

  useEffect(() => {
    checkVj71Promotion();
  }, []);

  const checkVj71Promotion = async () => {
    try {
      const res = await SimDataService.checkVj71Promotion();
      console.log("res", res);
      setCheckPackageCode(res.used);
    } catch (error) {
      console.error("Error fetching random sim data:", error);
    }
  };

  const getSimRandom = async () => {
    if (mssisdn && mssisdn == simHome?.msisdn) {
      method.reset({
        ...simHome,
        sim_type: "ESIM",
      });
      return;
    }
    try {
      load.open();
      const res = await SimDataService.getSimRandom();
      const { packages, ...data } = res;

      method.reset({
        ...data,
        sim_type: "ESIM",
      });
      setListPackage((packages || []).reverse());
    } catch (error) {
      console.error("Error fetching random sim data:", error);
      showModalMessHDBank({
        label: t("notify"), // 'Thông báo'
        message: "Không thể tải thông tin SIM. Vui lòng thử lại.",
        type: "error",
      });
    } finally {
      load.close();
    }
  };

  const getListPackage = async () => {
    if (!phone) return;
    try {
      load.open();
      const res = await SimDataService.getPackageSim(phone, simTypeSelect);
      console.log("res packages", res);
      const packages = res?.packages || [];

      setListPackage(packages.reverse());
      setIsVikki_event(res?.extra?.vikki_event);
      setIsVikki_popup(res?.extra?.vikki_popup);
      setCount({
        count: res?.extra?.count,
        total: res?.extra?.total,
      });
    } catch (error) {
      console.error("Error fetching list package:", error);
      setListPackage([]);
    } finally {
      load.close();
    }
  };

  useEffect(() => {
    getListPackage();
  }, [phone, simTypeSelect]);

  useEffect(() => {
    if (displayPackages.length > 0) {
      const vikkiPackage = displayPackages.find(
        (pack) => pack.vikki_event && pack.is_default === 1,
      );
      const defaultPackage = displayPackages.find(
        (pack) => pack.is_default === 1,
      );
      if (vikkiPackage) {
        method.setValue("pack_code", vikkiPackage.code);
      } else if (defaultPackage) {
        method.setValue("pack_code", defaultPackage.code);
      } else {
        method.setValue("pack_code", displayPackages[0].code);
      }
    }
  }, [displayPackages]);

  useEffect(() => {
    const selectedPackage = listPackage.find(
      (pack) => pack.code === packageCodeSelect,
    );

    if (!selectedPackage) {
      setPackSelect({});
      method.setValue("pack_price", 0);
      return;
    }

    if (selectedPackage) {
      setPackSelect(selectedPackage);
      method.setValue("pack_price", selectedPackage.sale_price);
    }
  }, [packageCodeSelect, listPackage]);

  const changeSim = (data) => {
    method.reset({
      ...sim,
      ...data,
    });
  };

  const validatePackageSelection = () => {
    if (displayPackages.length === 0) {
      showModalMessHDBank({
        label: t("notify"),
        message: t("noPackageAvailable"),
        type: "error",
      });
      return false;
    }
    //check list cart item has package code equal VJ71 and user select package code equal VJ71
    const checkPackageCode = cartItems.some(
      (item) => item.pack_code === "VJ71",
    );

    // if (
    //   checkPackageCode &&
    //   packageCodeSelect === "VJ71" &&
    //   packSelect.sale_price <= 0
    // ) {
    //   showModalMessHDBank({
    //     label: t("notify"),
    //     message: t("packageCodeEqualVJ71"),
    //     type: "error",
    //   });
    //   return false;
    // }

    if (!packageCodeSelect) {
      showModalMessHDBank({
        label: t("notify"),
        message: t("selectPackageRequired"),
        type: "error",
      });
      return false;
    }

    return true;
  };

  const onCheckout = (data) => {
    if (!validatePackageSelection()) return;
    setSims([convertSims(data, isVikkiGift)]);
    router.push("/hdbank-app-v2/checkout/payment");
  };

  const handleSelectPackage = (pack) => {
    method.setValue("pack_code", pack.code);
  };
  const onAddToCart = async (data) => {
    if (!validatePackageSelection()) return;

    const result = await addToCart(convertSimAddToCart(data));
    console.log("result", result);

    if (result === "MAX_QUANTITY") {
      showModalMessHDBank({
        label: t("notify"),
        message: t("maxQuantity"),
        type: "error",
      });
    }
    return showModalCartHDBank();
  };

  return (
    <div
      className="bg-[#F2F2F7] min-h-screen flex flex-col"
    >
      <Header title={t("title")} isBack={false} />
      {/* <StepIndicator currentStep={1} /> */}

      <main className="flex-1 p-4 space-y-4 pb-48">
        {/* Grouped Sim Info and Sim Type */}
        <div className="bg-white rounded-[16px] p-4 shadow-[0px_2px_8px_0px_rgba(0,0,0,0.04)]">
          {/* Sim Info Section */}
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-3 ">
              <div
                  className="flex h-10 w-10 items-center justify-center bg-cover bg-center"
                  style={{ backgroundImage: "url(/images/hdbank/network-bg.png)" }}
              >
                <svg width="32" height="32" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                      d="M32 10.0715V29.9277H26.8775V10.0715H32ZM20.5853 14.8519V29.9277H25.7078V14.8519H20.5853ZM14.2922 19.6332V29.9286H19.4147V19.6332H14.2922ZM8 24.4135V29.9277H13.1225V24.4135H8Z"
                      fill="white"
                  />
                </svg>
              </div>
              <div>
                <h3 className="text-[15px]  text-[#1C1C1E]">{t("myNumber")}</h3>
                <p className="text-[17px] font-bold text-[#1C1C1E]">
                  {formatPhoneNumber(method.getValues("msisdn") ?? "")}
                </p>
              </div>
            </div>
            <button
              onClick={() => showModalChangeSimHDBank({ onChange: changeSim })}
              className="text-[#DA2128] text-[13px]    font-bold"
            >
              {t("selectOther")}
            </button>
          </div>

          <div className="h-[1px] bg-[#F2F2F7] w-full mb-4"></div>

          {/* Sim Type Section */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-4">
                {/* Physical SIM Radio */}
                <label
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => method.setValue("sim_type", "USIM")}
                >
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center ${simTypeSelect === "USIM" ? "border-[#DA2128]" : "border-[#A1A1A1]"}`}
                  >
                    {simTypeSelect === "USIM" && (
                      <div className="w-2.5 h-2.5 bg-[#DA2128] rounded-full" />
                    )}
                  </div>
                  <span className="text-sm font-medium text-[#333333]">
                    {t("physicalSim")}
                  </span>
                </label>

                {/* eSIM Radio */}
                <label
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => method.setValue("sim_type", "ESIM")}
                >
                  <div
                    className={`w-5 h-5 rounded-full border flex items-center justify-center ${simTypeSelect === "ESIM" ? "border-[#DA2128]" : "border-[#A1A1A1]"}`}
                  >
                    {simTypeSelect === "ESIM" && (
                      <div className="w-2.5 h-2.5 bg-[#DA2128] rounded-full" />
                    )}
                  </div>
                  <span className="text-sm font-medium text-[#333333]">
                    {t("esim")}
                  </span>
                </label>
              </div>

              <div className="flex items-start gap-1">
                <div className="flex flex-col  ">
                  <span className="font-inter font-semibold text-[16px] leading-[1.5em] sm:text-right ">
                    {toCurrency(priceSim(sim, simTypeSelect, isVikkiGift))}
                  </span>
                  {basePriceSim(sim, simTypeSelect) >
                    priceSim(sim, simTypeSelect) && (
                    <span className="font-inter font-medium text-[12px] leading-[1.5em] sm:text-right line-through text-[#A1A1A1]">
                      {toCurrency(basePriceSim(sim, simTypeSelect))}
                    </span>
                  )}
                </div>
                {/* Info Icon */}
                <Tooltip content={t("priceInfo")} className="!w-[350px]">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10 18.3333C14.6024 18.3333 18.3333 14.6024 18.3333 10C18.3333 5.39763 14.6024 1.66667 10 1.66667C5.39763 1.66667 1.66667 5.39763 1.66667 10C1.66667 14.6024 5.39763 18.3333 10 18.3333Z"
                      stroke="#DA2128"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10 6.66667V10.8333"
                      stroke="#DA2128"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M10 13.3333H10.0083"
                      stroke="#DA2128"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </Tooltip>
              </div>
            </div>
            {simTypeSelect !== "ESIM" ? (
              <p className="text-[12px] text-[#5C5C5C] font-normal">
                {t("notePhysical")}
              </p>
            ) : (
              <p className="text-[13px] text-[#0C0C0E] leading-5">
                {tTravelEsim("note")}
                <button
                  onClick={showDevicesEsimHDBank}
                  className="text-[#DA2128] font-medium hover:underline focus:outline-none"
                >
                  {tTravelEsim("viewDevices")}
                </button>
              </p>
            )}
          </div>
        </div>

        {/* Package Selection */}
        <div className="flex flex-col gap-3">
          {!isVikki_event && isVikki_popup && <HDBankEventBanner />}
          {displayPackages.length === 0 ? (
            <div className="p-4 text-center text-gray-500 bg-white rounded-[16px]">
              {t("noPackage")}
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3">
              {displayPackages
                ?.sort((a, b) => a.index - b.index)
                .map((pack) => (
                  <PackageItem
                    key={pack.code}
                    pack={pack}
                    isSelected={pack.code === packageCodeSelect}
                    onSelect={handleSelectPackage}
                    count={count.count}
                    total={count.total}
                  />
                ))}
            </div>
          )}
        </div>
      </main>

      {/* Fixed Bottom Action */}
      <div className="fixed bottom-0 left-0 right-0 bg-white rounded-t-[16px] p-4 pb-8 z-40 shadow-[0px_-4px_10px_0px_rgba(0,0,0,0.05)]">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-medium text-[#333333]">
            {t("total")}
          </span>
          <span className="text-[18px] font-bold text-[#333333]">
            {toCurrency(
              simPriceTotal(
                sim,
                simTypeSelect,
                packSelect.sale_price ?? 0,
                isVikkiGift,
              ).sale_price,
            )}
          </span>
        </div>
        <div className="flex gap-3">
          <ButtonHD
            variant="outline"
            className="flex-1 !rounded-full !border-[#E5E5E5] !text-[#0E0E0F] font-semibold text-sm"
            onClick={method.handleSubmit(onAddToCart)}
            disabled={!packageCodeSelect || displayPackages.length === 0}
          >
            {t("addToCart")}
          </ButtonHD>
          <ButtonHD
            variant="normal"
            className="flex-1 !rounded-full font-semibold text-sm   "
            onClick={method.handleSubmit(onCheckout)}
            disabled={!packageCodeSelect || displayPackages.length === 0}
          >
            {t("pay")}
          </ButtonHD>
        </div>
      </div>
    </div>
  );
};

export default SimDataPage;
