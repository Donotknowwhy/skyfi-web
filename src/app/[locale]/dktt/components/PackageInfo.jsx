import React from 'react';
import {useTranslations} from "next-intl";

const PackageInfo = ({registrationType,simType,watch}) => {
    const phone=watch("phone")
    const packageInfo=watch("package")
    const t=useTranslations("packageInfo")
    const tSim=useTranslations("simData")

    // Hàm format số điện thoại theo định dạng 0770 123 123
    const formatPhoneNumber = (phoneNumber) => {
        if (!phoneNumber) return '';

        // Loại bỏ tất cả ký tự không phải số
        const cleanNumber = phoneNumber.toString().replace(/\D/g, '');

        // Format theo pattern 0770 123 123
        if (cleanNumber.length === 10) {
            return cleanNumber.replace(/(\d{4})(\d{3})(\d{3})/, '$1 $2 $3');
        }

        // Nếu không đúng 10 số, trả về số gốc
        return phoneNumber;
    }
    return (
        <div className="bg-red-500 text-white rounded-xl p-4 mb-8 text-left">
            <div className="mb-2">
                <span className="text-sm">{t("selectedNumber")} </span>
                <span className="font-bold">{formatPhoneNumber(phone)}</span>
            </div>
            <div className="mb-2">
                <span className="text-sm">{t("formType")} </span>
                <span className="font-bold">{t("chooseNewNumber")}</span>
            </div>
            <div className="mb-2">
                <span className="text-sm">{t("selectedSimType")} </span>
                <span className="font-bold">{simType==="physical"?tSim("simSection.physicalSim"):"ESIM"}</span>
            </div>
            <div>
                <span className="text-sm">{t("packagePromotion")} </span>
                <span className="font-bold">{packageInfo}</span>
            </div>
        </div>
    );
};

export default PackageInfo;
