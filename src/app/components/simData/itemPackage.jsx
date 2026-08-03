'use client';
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useController } from "react-hook-form";
import { usePackage } from "../../hooks/usePackage";
import { toCurrency } from "../../utils/format";

const ItemPackage = ({ pack, control, name, packSelect }) => {
    const t = useTranslations('simData.itemPackage');
    const { openPackDetailModal } = usePackage();

    const [descriptionDetail, setDescriptionDetail] = useState([])

    const {
        field: { value, onChange, onBlur, ref },
        fieldState: { error }
    } = useController({ control, name });

    const onSelectPackage = () => {
        // Prevent deselection - always require a package to be selected
        if (pack.code !== value) {
            onChange(pack.code);
        }
    };

    // useEffect(() => {
    //     if (pack && pack.description_detail) {
    //         // setDescriptionDetail(JSON.parse(pack.description_detail))
    //     }
    // }, pack)

    return (
        <div

            onClick={() => onSelectPackage()}
            className={`bg-white rounded-[12px] flex flex-col  border ${packSelect.code === pack.code ? 'border-2 border-primary' : 'border-[#F1F1F1]'} shadow-[0px_2px_4px_0px_rgba(0,0,0,0.02),0px_1px_6px_-1px_rgba(0,0,0,0.05),0px_1px_2px_0px_rgba(0,0,0,0.12)] w-[332px] flex flex-col justify-center gap-[8px] p-[20px_16px] relative cursor-pointer`}
        >
            <div className="absolute top-[10px] right-[10px] ">
                <div
                    className={`w-[20px] h-[20px] bg-white rounded-full ${packSelect.code === pack.code ? 'border-[1.5px] border-[#FFAA00]' : 'border border-[#333]'} flex items-center justify-center`}>
                    {packSelect.code === pack.code &&
                        <div className="w-[10px] h-[10px] rounded-full bg-[#FFAA00]"></div>}
                </div>
            </div>
            <div className=" flex flex-col gap-2 p-4 pt-0 rounded-md border-b border-[#F1F1F1] pb-2">
                <div className="flex flex-row items-center gap-3 ">
                    <div
                        className="font-inter font-semibold md:text-lg text-[#333]">{pack.name}</div>
                    {pack.discount_percent && pack.discount_percent > 0 ? (
                        <div className={" text-[0.75rem] p-1 bg-[#ED1B2F] text-white rounded flex gap-1 items-center"}>
                            <img src="/images/checkout/discountTag.png" alt="discountTag" className={"w-[14px] h-[14px]"} />
                            {pack.discount_percent + "%" || ""}</div>
                    ) : null}

                </div>
                <div className="flex flex-row items-center gap-1 ">
                    <Image src={'/assets/home/iconData.png'} alt={pack.name} width={30} height={30} />
                    <div
                        className="font-inter text-[14px] text-[#5C5C5C] ml-[8px] font-bold"> Data: {pack.data_per_day}GB/{t('day')}</div>
                </div>
                {pack.free_call_minute > 0 && <div className="flex flex-row items-center gap-1 ">
                    <Image src={'/images/simdata/iconPhone.png'} alt={pack.name} width={30} height={30} />
                    <div
                        className="font-inter text-[14px] text-[#5C5C5C] ml-[8px] font-bold">{t('free_call_minute', { minute: pack.free_call_minute })}</div>
                </div>}
            </div>
            {pack && (
                <div className="flex flex-col gap-2 p-4 rounded-md pb-2">
                    <ul className="list-disc list-inside text-gray-700 space-y-1">
                        {descriptionDetail.map((item, index) =>
                            <li key={index} className="text-base leading-relaxed"> {item}</li>)}
                    </ul>
                    <button
                        className="text-blue-500 underline mt-2 font-semibold text-sm text-start w-fit  hover:text-blue-800"
                        onClick={() => openPackDetailModal(pack)}>{t('detail')}</button>
                </div>
            )}


            <div className="w-full h-[1px] bg-[#F1F1F1] my-1"></div>
            <div className="flex flex-row items-start mt-auto gap-[4px]">
                <div className="flex flex-col">
                    <span
                        className={`font-inter font-semibold ${pack.code === packSelect.code ? 'text-[16px] text-[#333]' : 'text-[16px] text-[#ED1B2F]'}`}>{toCurrency(pack.sale_price)} </span>
                    {pack.price > pack.sale_price && (
                        <span
                            className="font-inter text-[12px] line-through text-[#A1A1A1]">{toCurrency(pack.price)} </span>
                    )}
                </div>
                <span className="font-inter text-[14px] text-[#5C5C5C]">/ {pack.validity_day} {t('day')}</span>
            </div>
        </div>
    );
};

export default ItemPackage;



