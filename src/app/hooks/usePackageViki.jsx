"use client";

import ModalNotMoney from "../components/vikki/modals/ModalNotMoney";
import { toast } from "react-toastify";
import {
  showModalMess,
  showModalMessVikki,
} from "../components/modals/modalMess";
import ConfirmChangePackageModal from "../components/vikki/modals/ConfirmChangePackageModal";
import ModalCheckPackage from "../components/vikki/modals/ModalCheckPackage";
import PackDetail from "../components/vikki/modals/PackDetail";
import ModalOTP from "../components/vikki/modals/ModalOTP";
import PackageService from "../services/package";
import { useUserState } from "../stores/user";
import { showActivateSimModal } from "../components/modals/vikki/modalActivateSim";

const { useLoad } = require("../utils/load");
const { modal, useModal } = require("../utils/modal");

// Custom hook for Vikki app that extends the original package logic
const usePackageViki = (onSuccess) => {
  const load = useLoad();
  const { cartId } = useUserState();

  const openCheckPackageModal = (pack) => {
    console.log("cartId", cartId);

    if (!cartId || (cartId && !cartId.startsWith("070"))) {
      return showActivateSimModal();
    }
    modal.sheet({
      render: <ModalCheckPackage package={pack} />,
      boxClassName: "w-full rounded-t-2xl p-0",
      classContainer: "!p-0 !items-end",
      onDone: async (result) => {
        if (result.isNotMoney) {
          openModalNotMoney(result.package);
          return;
        }
        if (result.isPackage) {
          openConfirmChangePackageModal(result);
        } else {
          try {
            const res = await PackageService.sendOtpRegisterPackage({
              msisdn: result.msisdn || result.phoneNumber,
              packageCode: result.packageCode || pack.code,
            });

            if (res.success) {
              openOTPModal(result);
              return;
            }
            showModalMess({
              message: res.message,
              type: "error",
            });
          } catch (error) {
            showModalMess({
              message: error.message || "Failed to send OTP",
              type: "error",
            });
          }
        }
      },
    });
  };

  const openModalNotMoney = (pack) => {
    modal.sheet({
      render: <ModalNotMoney code={pack} />,
      boxClassName: "w-full rounded-t-2xl p-0 bg-transparent shadow-none",
      classContainer: "!p-4 !items-center bg-black/50 backdrop-blur-sm",
      closeButton: false,
    });
  };

  const openConfirmChangePackageModal = (data) => {
    modal.sheet({
      render: <ConfirmChangePackageModal data={data} />,
      boxClassName: "w-full rounded-t-2xl p-0",
      classContainer: "!p-0 !items-end",
      onDone: async (result) => {
        try {
          const res = await PackageService.sendOtpRegisterPackage({
            msisdn: data.msisdn || data.phoneNumber,
            packageCode: data.package?.code || data.packageCode,
          });

          if (res.success) {
            openOTPModal(result);
            return;
          }
          showModalMess({
            message: res.message,
            type: "error",
          });
        } catch (error) {
          showModalMess({
            message: error.message,
            type: "error",
          });
        }
      },
    });
  };

  const openOTPModal = (data) => {
    modal.sheet({
      render: <ModalOTP data={data} />,
      boxClassName: "w-full rounded-t-2xl p-0",
      classContainer: "!p-0 !items-end",
      onDone: (result) => {
        if (result.success) {
          toast.success("Gói cước đã được mua thành công");
        } else {
          openModalNotMoney(result.package);
          
        }
      },
    });
  };

  const openPackDetailModal = (packageData, isBuy) => {
    modal.sheet({
      render: <PackDetail packageData={packageData} isBuy={isBuy} />,
      boxClassName:
        "w-full rounded-t-2xl p-0 h-[100vh] overflow-y-auto bg-[url(/figma-images/background.png)] bg-cover",
      classContainer: "!p-0 !items-end",
      onDone: openCheckPackageModal,
    });
  };

  return {
    openCheckPackageModal,
    openPackDetailModal,
  };
};

export { usePackageViki };
