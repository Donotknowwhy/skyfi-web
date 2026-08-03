import { Button } from "@/app/components/ui/Button";
import PackageService from "@/app/services/package";
import { useUserState } from "@/app/stores/user";
import { useModal } from "@/app/utils/modal";
import { useRouter } from "@/i18n/navigation";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";

const schema = yup.object({
  msisdn: yup
    .string()
    .required("phoneRequired")
    .matches(/^[0-9]{10}$/, "phoneInvalid"),
});

const ModalCheckPackage = (props) => {
  const t = useTranslations("modalCheckPackage");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { close, done } = useModal();
  const router = useRouter();
  const { user } = useUserState();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    setError("");

    try {
      const params = {
        msisdn: data.msisdn,
        packageCode: props.package.code,
      };

      const res = await PackageService.checkPackageRegisterHDBank(params);
      if (res.code && res.code == 402) {
        return done({ isNotMoney: true, package: props.package.code });
      }

      if (!res.success && res.code != 200) {
        if (res.code == 201) {
          return done({
            packageCurrent: res.data[0],
            package: props.package,
            msisdn: data.msisdn,
            isPackage: true,
          });
        }
        setError(res.message || "An error occurred");
        return;
      }
      if (!res.data) {
        done({ package: props.package, msisdn: data.msisdn, isPackage: false });
        return;
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      setValue("msisdn", user.msisdn);
      setValue("customer_name", user.full_name);
      setValue("email", user.email);
    }
  }, [user]);

  return (
    <div className="relative bg-white rounded-t-2xl pb-8 w-full">
      {/* Drag Handle (Optional, common in bottom sheets) */}
      <div className="w-full flex justify-center pt-3 pb-1">
        <div className="w-12 h-1.5 bg-gray-200 rounded-full"></div>
      </div>

      {/* Close Button */}
      <div className="absolute top-4 right-4">
        <button
          onClick={close}
          className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        >
          <XMarkIcon className="w-6 h-6 text-gray-500" />
        </button>
      </div>

      <div className=" py-2">
        {/* Title */}
        <h3 className="text-xl font-bold text-center mb-2">{t("title")}</h3>
        <p className="text-center text-gray-500 text-sm mb-6">
          {t("subtitle")}
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              {t("phoneLabel")} <span className="text-red-500">*</span>
            </label>
            <input
              {...register("msisdn")}
              type="tel"
              placeholder={t("phonePlaceholder")}
              className={`w-full px-4 py-3 rounded-xl border ${errors.msisdn ? "border-red-500" : "border-gray-200"} focus:border-[#DA2128] focus:ring-2 focus:ring-red-100 outline-none transition-all`}
              disabled={true}
            />
            {errors.msisdn && (
              <p className="text-red-500 text-xs mt-1">
                {t(errors.msisdn.message)}
              </p>
            )}
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            variant="normal"
            size="lg"
            className="w-full !rounded-xl !py-3 !text-base"
          >
            {isLoading ? "Loading..." : t("continueButton")}
          </Button>
        </form>

        {/* Footer Link */}
        <p className="text-center text-sm text-gray-500 mt-4">
          {t("noSimMessage")
            .split("\n")
            .map((line, index) => {
              if (index === 1) {
                return (
                  <span
                    key={index}
                    className="text-[#DA2128] font-medium hover:underline ml-1"
                    onClick={() => {
                      router.push("/hdbank-app/sim-data");
                      close();
                    }}
                  >
                    {line}
                  </span>
                );
              }
              return <span key={index}>{line}</span>;
            })}
        </p>
      </div>
    </div>
  );
};

export default ModalCheckPackage;
