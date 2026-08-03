import { useTranslations } from "next-intl";
import { useState, useEffect, useRef } from "react";
import { useModal } from "@/app/utils/modal";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import PackageService from "@/app/services/package";
import { Button } from "@/app/components/ui/Button";
import { XMarkIcon } from "@heroicons/react/24/outline";

const schema = yup.object({
  otp: yup
    .string()
    .required("OTP is required")
    .length(6, "OTP must be 6 digits"),
});

const ModalOTP = ({ data }) => {
  const t = useTranslations("modalOTP");
  const { close, done } = useModal();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [resendDisabled, setResendDisabled] = useState(true);
  const [countdown, setCountdown] = useState(60);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const otpValue = watch("otp", "");

  useEffect(() => {
    let timer;
    if (resendDisabled && countdown > 0) {
      timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
    } else if (countdown === 0) {
      setResendDisabled(false);
    }
    return () => clearInterval(timer);
  }, [resendDisabled, countdown]);

  const handleResend = async () => {
    setResendDisabled(true);
    setCountdown(60);
    try {
      await PackageService.sendOtpRegisterPackage({
        msisdn: data.msisdn || data.phoneNumber,
        packageCode: data.package?.code,
      });
    } catch (err) {
      console.error(err);
    }
  };

  const onSubmit = async (formData) => {
    setIsLoading(true);
    setError("");
    try {
      const res = await PackageService.registerPackage({
        msisdn: data.msisdn || data.phoneNumber,
        packageCode: data.package?.code,
        otp: formData.otp,
      });

      console.log("res", res);

      if (res.success) {
        done({ success: true });
        close();
      } else if (res.code === 400) {
        done({ success: false, package: data.package?.code });
        close();
      } else {
        setError(res.message || "Failed to verify OTP");
      }
    } catch (err) {
      setError(err.message || "Failed to verify OTP");
    } finally {
      setIsLoading(false);
    }
  };

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

      <div className=" py-2">
        <h3 className="text-xl font-bold text-center mb-2">Xác thực OTP</h3>
        <p className="text-center text-gray-500 text-sm mb-6">
          Mã OTP đã được gửi đến số điện thoại{" "}
          <strong>{data.msisdn || data.phoneNumber}</strong>
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div className="flex justify-center">
            <input
              {...register("otp")}
              type="text"
              maxLength={6}
              className="w-full text-center text-2xl tracking-[0.5em] font-bold py-3 border-b-2 border-gray-300 focus:border-blue-500 outline-none bg-transparent transition-colors"
              placeholder="••••••"
              autoFocus
            />
          </div>
          {errors.otp && (
            <p className="text-red-500 text-center text-sm">
              {errors.otp.message}
            </p>
          )}
          {error && <p className="text-red-500 text-center text-sm">{error}</p>}

          <div className="text-center">
            <p className="text-sm text-gray-500">
              Bạn không nhận được mã?{" "}
              <button
                type="button"
                onClick={handleResend}
                disabled={resendDisabled}
                className={`font-medium ${resendDisabled ? "text-gray-400" : "text-blue-600 hover:underline"}`}
              >
                Gửi lại {resendDisabled && `(${countdown}s)`}
              </button>
            </p>
          </div>

          <Button
            type="submit"
            disabled={isLoading || otpValue.length < 6}
            variant="normal"
            className="w-full !rounded-full !py-3"
          >
            {isLoading ? "Đang xác thực..." : "Xác nhận"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ModalOTP;
