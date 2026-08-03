"use client";

import { useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import { useCities, useDistricts, useWards } from "@/app/hooks/useAddress";

// Normalize Vietnamese text for case/diacritic-insensitive search.
const normalize = (s = "") =>
  s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d");

const SearchIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#A1A1A1" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="7" />
    <path d="M21 21l-4-4" />
  </svg>
);

const CheckIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#DA2128" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 13l4 4L19 7" />
  </svg>
);

// Full-screen overlay that drills through city -> district -> ward and returns
// the selected trio via onSelect.
const ShippingAddressModal = ({ onClose, onSelect, value }) => {
  const t = useTranslations("hdbank.registerSim.info.picker");

  const [step, setStep] = useState("city"); // city | district | ward
  const [city, setCity] = useState(value?.city ?? null);
  const [district, setDistrict] = useState(value?.district ?? null);
  const [query, setQuery] = useState("");

  const cities = useCities();
  const districts = useDistricts(city?.id);
  const wards = useWards(district?.id);

  const config = {
    city: { list: cities, header: t("provinceHeader"), selected: city },
    district: { list: districts, header: t("districtHeader"), selected: district },
    ward: { list: wards, header: t("wardHeader"), selected: value?.ward },
  }[step];

  const filtered = useMemo(() => {
    const q = normalize(query.trim());
    if (!q) return config.list;
    return config.list.filter((item) => normalize(item.name).includes(q));
  }, [config.list, query]);

  const handleBack = () => {
    setQuery("");
    if (step === "ward") setStep("district");
    else if (step === "district") setStep("city");
    else onClose();
  };

  const handleReset = () => {
    setCity(null);
    setDistrict(null);
    setQuery("");
    setStep("city");
  };

  const handleSelect = (item) => {
    setQuery("");
    if (step === "city") {
      setCity(item);
      setDistrict(null);
      setStep("district");
    } else if (step === "district") {
      setDistrict(item);
      setStep("ward");
    } else {
      onSelect({ city, district, ward: item });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-white">
      {/* Header */}
      <div className="flex items-center gap-3 px-4 pb-3 pt-12">
        <button type="button" onClick={handleBack} aria-label="back" className="p-1">
          {step === "city" ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1C1C1E" strokeWidth="2" strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#1C1C1E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          )}
        </button>
        <h2 className="flex-1 text-center text-[18px] font-bold text-[#1C1C1E]">
          {t("title")}
        </h2>
        <span className="w-6" />
      </div>

      {/* Selected-area breadcrumb */}
      {step !== "city" && (
        <div className="px-5 pb-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-[#A1A1A1]">{t("selectedArea")}</span>
            <button
              type="button"
              onClick={handleReset}
              className="text-sm font-semibold text-[#DA2128]"
            >
              {t("reset")}
            </button>
          </div>
          <div className="mt-2 space-y-1">
            {city && (
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-[#A1A1A1]" />
                <span className="text-base font-medium text-[#1C1C1E]">{city.name}</span>
              </div>
            )}
            {step === "ward" && district && (
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-[#A1A1A1]" />
                <span className="text-base font-medium text-[#1C1C1E]">{district.name}</span>
              </div>
            )}
            <div className="flex items-center gap-3">
              <span className="flex h-4 w-4 items-center justify-center rounded-full border-2 border-[#DA2128]">
                <span className="h-2 w-2 rounded-full bg-[#DA2128]" />
              </span>
              <span className="text-base font-medium text-[#DA2128]">
                {step === "district" ? t("chooseDistrict") : t("chooseWard")}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Search */}
      <div className="px-4 pb-3">
        <div className="flex items-center gap-2 rounded-2xl border border-[#E5E5E5] px-4 py-3">
          <SearchIcon />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t("search")}
            className="w-full border-0 bg-transparent p-0 text-base text-[#1C1C1E] outline-none placeholder:text-[#A1A1A1]"
          />
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto">
        <p className="bg-[#F2F2F2] px-5 py-2 text-sm text-[#A1A1A1]">{config.header}</p>
        {filtered.map((item) => {
          const isSelected = config.selected?.id === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleSelect(item)}
              className="flex w-full items-center justify-between border-b border-[#F1F1F1] px-5 py-4 text-left"
            >
              <span className="text-base text-[#1C1C1E]">{item.name}</span>
              {isSelected && <CheckIcon />}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ShippingAddressModal;
