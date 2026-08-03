import { Button } from "@/app/components/ui/Button";
import { useModal } from "@/app/utils/modal";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useTranslations } from "next-intl";

const ConfirmChangePackageModal = ({ data }) => {
  const t = useTranslations("confirmChangePackageModal");
  const { close, done } = useModal();
  const packageCurrent = data?.packageCurrent;
  const phoneNumber = data?.msisdn || "";
  const currentPackage = packageCurrent?.packageName || "";
  const remainingDays = packageCurrent?.toDate || "";

  return (
    <div className="relative bg-white rounded-t-2xl pb-8 w-full">
      {/* Close Button */}
      <div className="absolute top-0 right-0">
        <button
          onClick={close}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <XMarkIcon className="w-6 h-6 text-gray-500" />
        </button>
      </div>

      <div className=" pt-2">
        <h3 className="text-xl font-bold text-center mb-4">{t("title")}</h3>

        <p className="text-center text-gray-600 text-base mb-8 leading-relaxed">
          {t("description", {
            phoneNumber: phoneNumber,
            currentPackage: currentPackage,
            remainingDays: remainingDays,
          })}
        </p>

        <div className="flex gap-4">
          <Button
            variant="outline"
            className="flex-1 !rounded-full !border-gray-300 !text-gray-700 hover:!bg-gray-50"
            onClick={close}
          >
            {t("cancelButton")}
          </Button>
          <Button
            variant="normal"
            className="flex-1 !rounded-full"
            onClick={() =>
              done({ packageCurrent, package: data.package ?? {}, phoneNumber })
            }
          >
            {t("confirmButton")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmChangePackageModal;
