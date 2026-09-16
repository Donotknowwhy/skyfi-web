"use client";

import axios from 'axios';
import { useEffect, useMemo, useState } from 'react';

const MAX_QUANTITY = 50;

const formatPrice = (value, currency = 'VND', locale = 'vi') => new Intl.NumberFormat(locale, {
  style: 'currency',
  currency,
  maximumFractionDigits: currency === 'VND' ? 0 : 2,
}).format(Number(value || 0));

const normalizeBackendOption = (option) => {
  if (option && typeof option === 'object') {
    const amount = option.data_amount ?? option.amount ?? option.value ?? option.data;
    const unit = option.data_unit ?? option.unit ?? '';
    if (amount != null) {
      return {
        key: `${amount}-${unit}`.toUpperCase(),
        label: Number(amount) === 0 ? 'Unlimited' : `${amount}${unit ? ` ${unit}` : ''}`,
      };
    }
  }
  const value = String(option || '').trim();
  if (!value) return null;
  return /unlimited/i.test(value)
    ? { key: 'UNLIMITED', label: 'Không giới hạn' }
    : { key: value.toUpperCase().replace(/\s+/g, '-'), label: value };
};

const orderDataOptions = (options) => [...options].sort((left, right) => {
  if (left.key === 'UNLIMITED') return 1;
  if (right.key === 'UNLIMITED') return -1;
  return Number.parseFloat(left.key) - Number.parseFloat(right.key);
});

const getCountryFlagUrl = (country) => {
  const isoCode = String(country.iso_code || country.code || '').trim().toLowerCase();
  return isoCode ? `https://flagcdn.com/w160/${isoCode}.png` : null;
};

export default function BssPackageSelector({ country, dataOptions, validityDaysOptions, locale, onBuyNow, onFilterPackages }) {
  const [selectedDataKey, setSelectedDataKey] = useState('');
  const [selectedDays, setSelectedDays] = useState('');
  const [selectedPackageId, setSelectedPackageId] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(null);
  const [priceError, setPriceError] = useState('');
  const [isLoadingPrice, setIsLoadingPrice] = useState(false);
  const [suggestedPackages, setSuggestedPackages] = useState([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const [suggestionsError, setSuggestionsError] = useState('');

  const dataChoices = useMemo(() => {
    const byKey = new Map(dataOptions.map(normalizeBackendOption).filter(Boolean).map((option) => [option.key, option]));
    return orderDataOptions([...byKey.values()]);
  }, [dataOptions]);

  const validityChoices = useMemo(() => {
    return [...new Set(validityDaysOptions.map(Number).filter(Number.isFinite))].sort((left, right) => left - right);
  }, [validityDaysOptions]);
  const selectedPackage = useMemo(
    () => suggestedPackages.find((pkg) => String(pkg.package_id) === String(selectedPackageId)) || null,
    [suggestedPackages, selectedPackageId],
  );

  useEffect(() => {
    if (dataChoices.length && !dataChoices.some((option) => option.key === selectedDataKey)) {
      setSelectedDataKey(dataChoices[0].key);
    }
  }, [dataChoices, selectedDataKey]);

  useEffect(() => {
    if (!selectedDays && validityChoices.length) {
      setSelectedDays(String(validityChoices[0]));
    }
  }, [selectedDays, validityChoices]);

  useEffect(() => {
    setSelectedPackageId('');
    setQuantity(1);
  }, [selectedDataKey, selectedDays]);

  useEffect(() => {
    if (!selectedDataKey || !selectedDays) {
      setSuggestedPackages([]);
      setSuggestionsError('');
      return undefined;
    }

    let current = true;
    setIsLoadingSuggestions(true);
    setSuggestionsError('');
    onFilterPackages(selectedDataKey, Number(selectedDays))
      .then((responsePackages) => {
        if (!current) return;
        setSuggestedPackages(responsePackages);
      })
      .catch((error) => {
        if (!current) return;
        setSuggestionsError(error.response?.data?.message || error.message || 'Không thể tải gói phù hợp.');
        setSuggestedPackages([]);
      })
      .finally(() => {
        if (current) setIsLoadingSuggestions(false);
      });
    return () => { current = false; };
  }, [onFilterPackages, selectedDataKey, selectedDays]);

  useEffect(() => {
    if (!selectedPackage) {
      setPrice(null);
      setPriceError('');
      return;
    }

    let current = true;
    setIsLoadingPrice(true);
    setPriceError('');
    axios.get(`/api/bss/packages/${selectedPackage.package_id}/price?quantity=${quantity}`)
      .then((response) => {
        if (!response.data?.success) throw new Error(response.data?.message || 'Không thể kiểm tra giá gói.');
        if (current) setPrice(response.data.data);
      })
      .catch((error) => {
        if (current) setPriceError(error.response?.data?.message || error.message || 'Không thể kiểm tra giá gói.');
      })
      .finally(() => {
        if (current) setIsLoadingPrice(false);
      });
    return () => { current = false; };
  }, [quantity, selectedPackage]);

  const updateQuantity = (delta) => setQuantity((current) => Math.min(MAX_QUANTITY, Math.max(1, current + delta)));
  const displayTotal = price?.total_price ?? (selectedPackage ? Number(selectedPackage.selling_price) * quantity : 0);
  const currency = price?.currency || selectedPackage?.currency || 'VND';

  return (
    <section className="rounded-2xl bg-white p-5 shadow-[0_6px_24px_rgba(0,0,0,0.06)] md:p-7">
      <div className="grid gap-7 lg:grid-cols-[minmax(260px,360px)_minmax(0,1fr)]">
        <div className="max-h-[700px] overflow-hidden rounded-2xl bg-[#f6f6f6]">
          <img
            src={getCountryFlagUrl(country) || '/assets/travel-esim-banner.png'}
            alt={`eSIM ${country.name}`}
            className="h-full max-h-[700px] min-h-[260px] w-full object-cover"
          />
        </div>

        <div>
          <p className="text-sm font-medium text-[#666]">Thiết lập gói eSIM cho {country.name}</p>
          <h2 className="mt-1 text-2xl font-bold text-[#333]">Chọn gói phù hợp với chuyến đi</h2>

          <fieldset className="mt-7">
            <legend className="text-base font-bold text-[#333]">Dung lượng</legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {dataChoices.map((option) => (
                <button
                  key={option.key}
                  type="button"
                  onClick={() => setSelectedDataKey(option.key)}
                  className={`min-w-20 rounded-lg border px-4 py-2 text-sm font-semibold transition-colors ${
                    selectedDataKey === option.key
                      ? 'border-[#faa61a] bg-[#faa61a] text-white'
                      : 'border-[#e0e0e0] bg-white text-[#333] hover:border-[#faa61a]'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
            {!dataChoices.length && <p className="mt-3 text-sm text-[#777]">Chưa có dung lượng khả dụng.</p>}
          </fieldset>

          <fieldset className="mt-7">
            <legend className="text-base font-bold text-[#333]">Ngày sử dụng</legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {validityChoices.map((days) => (
                <button
                  key={days}
                  type="button"
                  onClick={() => setSelectedDays(String(days))}
                  className={`min-w-14 rounded-lg border px-4 py-2 text-sm font-semibold transition-colors ${
                    selectedDays === String(days)
                      ? 'border-[#faa61a] bg-[#faa61a] text-white'
                      : 'border-[#e0e0e0] bg-white text-[#333] hover:border-[#faa61a]'
                  }`}
                >
                  {days} ngày
                </button>
              ))}
            </div>
            {!validityChoices.length && <p className="mt-3 text-sm text-[#777]">Chưa có ngày sử dụng khả dụng.</p>}
          </fieldset>

          <div className="mt-8 border-t border-[#eee] pt-6">
            <h3 className="text-base font-bold text-[#333]">Gợi ý gói eSIM</h3>
            {!selectedDataKey || !selectedDays ? (
              <p className="mt-3 text-sm text-[#777]">Đang chọn dung lượng và ngày sử dụng mặc định.</p>
            ) : isLoadingSuggestions ? (
              <p className="mt-3 text-sm text-[#777]">Đang tìm gói phù hợp...</p>
            ) : suggestionsError ? (
              <p className="mt-3 text-sm text-red-600">{suggestionsError}</p>
            ) : suggestedPackages.length ? (
              <div className="mt-3 grid max-h-[420px] gap-3 overflow-y-auto pr-1 sm:grid-cols-2">
                {suggestedPackages.map((pkg) => {
                  const isSelected = String(pkg.package_id) === String(selectedPackageId);
                  return (
                    <button
                      key={pkg.package_id}
                      type="button"
                      onClick={() => setSelectedPackageId(String(pkg.package_id))}
                      className={`rounded-xl border p-4 text-left transition-colors ${
                        isSelected ? 'border-[#faa61a] bg-[#fff8ed] ring-1 ring-[#faa61a]' : 'border-[#e5e5e5] bg-white hover:border-[#faa61a]'
                      }`}
                    >
                      <p className="font-semibold text-[#333]">{pkg.name}</p>
                      <p className="mt-2 text-sm text-[#666]">{pkg.provider_name || 'eSIM'} · {pkg.package_type === 'TOP_UP' ? 'Nạp thêm' : 'eSIM mới'}</p>
                      <p className="mt-3 font-bold text-[#faa61a]">{formatPrice(pkg.selling_price, pkg.currency, locale)}</p>
                    </button>
                  );
                })}
              </div>
            ) : (
              <p className="mt-3 text-sm text-[#777]">Chưa có gói phù hợp với lựa chọn này.</p>
            )}
          </div>

          {selectedPackage && (
            <div className="mt-6 rounded-xl bg-[#fafafa] p-4">
              <div className="flex items-center justify-between gap-4">
                <span className="font-semibold text-[#333]">Số lượng gói</span>
                <div className="flex items-center gap-3 rounded-lg bg-white px-2 py-1 shadow-sm">
                  <button type="button" onClick={() => updateQuantity(-1)} disabled={quantity === 1} className="h-8 w-8 rounded-full text-lg text-[#555] disabled:text-[#bbb]" aria-label="Giảm số lượng">−</button>
                  <span className="w-8 text-center font-semibold text-[#333]">{quantity}</span>
                  <button type="button" onClick={() => updateQuantity(1)} disabled={quantity === MAX_QUANTITY} className="h-8 w-8 rounded-full bg-[#faa61a] text-lg text-white disabled:opacity-50" aria-label="Tăng số lượng">+</button>
                </div>
              </div>
              <div className="mt-5 flex items-end justify-between gap-4 border-t border-[#e8e8e8] pt-4">
                <div><p className="text-sm text-[#666]">Tổng thanh toán</p><p className="mt-1 text-xs text-[#888]">Giá được xác nhận lại trước khi thanh toán.</p></div>
                <strong className="text-xl text-[#faa61a]">{isLoadingPrice ? 'Đang tính giá...' : formatPrice(displayTotal, currency, locale)}</strong>
              </div>
              {priceError && <p className="mt-3 text-sm text-red-600">{priceError}</p>}
              <button
                type="button"
                onClick={() => onBuyNow(selectedPackage, quantity)}
                disabled={isLoadingPrice || Boolean(priceError)}
                className="mt-5 w-full rounded-lg bg-[#faa61a] px-5 py-3 font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Mua ngay
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
