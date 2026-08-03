"use client";

import { showModalMessHDBank } from "@/app/components/modals/modalMess";
import dkttService from "@/app/services/dkttService";
import {
  ORDER_BRANDS,
  applyActivateVideoSource,
} from "@/app/utils/orderSourceContext";
import { useTranslations } from "next-intl";
import { createContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { io } from "socket.io-client";
import { getSocketUrl } from "@/app/utils/callbackHelper";
import { useRouter } from "@/i18n/navigation";
import { useUserState } from "@/app/stores/user";

const socket = io(getSocketUrl(), {
  transports: ["websocket"],
});

const ActivateContext = createContext(null);

const ActivateProvider = ({ children }) => {
  const t = useTranslations("hdbank.activateProvider.notifications");

  const method = useForm({
    defaultValues: {
      page: "scanQR",
      data: null,
      typeVideoCall: "start", // calling | rescore | onGoing
      tellerId: "",
      jitsiData: {},
      backPage: "",
    },
    mode: "onChange",
  });

  const [paramTime, setParamTime] = useState({});
  const { watch, setValue, getValues } = method;
  const [backPage, setBackPage] = useState([]);
  const typeVideoCall = watch("typeVideoCall");
  const tellerId = watch("tellerId");
  const phone = watch("data.phone");
  const _page = watch("page");
  const jitsiData = watch("jitsiData");
  const router = useRouter();
  const { sessionId } = useUserState();

  const onBack = () => {
    if (backPage.length > 0) {
      const newBackPage = backPage.slice(0, -1);
      setBackPage(newBackPage);
      setValue("page", backPage[backPage.length - 1]);
    } else {
      setValue("page", "inputActivate");
    }
  };
  const onPush = (page) => {
    setBackPage([...backPage, _page]);
    setTimeout(() => {
      setValue("page", page);
    }, 100);
  };
  const getTimeNow = () => {
    return new Date().toISOString();
  };
  const clientStart = (data) => {
    const newData = {
      ...data,
      roomType: "Jitsi",
    };
    socket.emit("client-start-call", newData);
  };

  const stopCall = () => {
    setParamTime((timeData) => {
      timeData["stopCall"] = getTimeNow();
      timeData["type"] = 1;
      return timeData;
    });
    socket.emit("client-stop-call", { id: tellerId });
    setValue("typeVideoCall", "start");
    setValue("jitsiData", {});
  };

  const checkVideoCall = (phoneNumber) => {
    // TODO: Implement video call check logic
    console.log("Checking video call for phone:", phoneNumber);
  };

  const _eventAdminStopCall = () => {
    setValue("typeVideoCall", "start");
    setValue("jitsiData", {});
    checkVideoCall(phone);
    setParamTime((timeData) => {
      timeData["stopCall"] = getTimeNow();
      timeData["type"] = 2;
      return timeData;
    });
  };

  const _eventCallAlreadyProcessing = (...data) => {
    setValue("typeVideoCall", "start");
    setValue("jitsiData", {});

    return showModalMessHDBank({
      title: t("title"),
      message: data[0]?.message,
    });
  };

  const _eventRegisterResult = (data) => {
    if (data.isSuccess) {
      return showModalMessHDBank({
        title: t("title"),
        message: t("registerSuccess"),
        labelConfirm: t("goHome"),
        onConfirm: () => {
          setValue("page", "inputActivate");
          router.push(`/hdbank-app-v2?sessionId=${sessionId}`);
        },
      });
    }
    showModalMessHDBank({
      title: t("title"),
      message: t("registerFailed"),
      type: "error",
    });
  };

  const _onStartVideoCall = (data) => {
    setValue("typeVideoCall", "onGoing");
    setValue("tellerId", data.id);
    setParamTime((timeData) => {
      timeData["connected"] = getTimeNow();
      timeData["room_id"] = data.roomId;
      return timeData;
    });

    setValue("jitsiData", {
      roomName: data.roomId,
      token: data.token,
      appId: data.id,
    });
  };

  const _noFreeTeller = (data) => {
    stopCall();
    return showModalMessHDBank({
      title: t("title"),
      message: t("noFreeTeller"),
      type: "error",
      labelConfirm: t("recordVideo"),
      onConfirm: () => {
        setValue("typeVideoCall", "rescore");
      },
      labelDismiss: t("close"),
    });
  };

  const _connectingTeller = (data) => {
    setValue("typeVideoCall", "calling");
  };

  const _eventAdminRequestSign = (data) => {
    console.log("Admin request sign:", data);
    // TODO: Handle admin request sign event
  };

  const _eventAdminRejectClientRegistration = (data) => {
    showModalMessHDBank({
      title: t("title"),
      message: t("rejectedRegistration"),
      type: "error",
    });
  };

  const _adminStartRecording = (data) => {
    stopCall();

    return showModalMessHDBank({
      title: t("title"),
      message: t("noFreeTeller"),
      type: "error",
      labelConfirm: t("recordVideo"),
      onConfirm: () => {
        setValue("typeVideoCall", "rescore");
      },
      labelDismiss: t("close"),
    });
  };

  useEffect(() => {
    socket.on("admin-stop-call", _eventAdminStopCall);
    socket.on("call-already-processing", _eventCallAlreadyProcessing);
    socket.on("register-result", _eventRegisterResult);
    socket.on("start-call", _onStartVideoCall);
    socket.on("no-free-teller", _noFreeTeller);
    socket.on("connecting-free-teller", _connectingTeller);
    socket.on("admin-refuse-call", _eventAdminStopCall);
    socket.on("admin-request-sign", _eventAdminRequestSign);
    socket.on(
      "admin-reject-client-registration",
      _eventAdminRejectClientRegistration,
    );
    socket.on("admin-start-recording", _adminStartRecording);
    setParamTime((timeData) => {
      timeData["startCall"] = getTimeNow();
      return timeData;
    });

    return () => {
      socket.off("admin-stop-call", _eventAdminStopCall);
      socket.off("register-result", _eventRegisterResult);
      socket.off("call-already-processing", _eventCallAlreadyProcessing);
      socket.off("start-call", _onStartVideoCall);
      socket.off("no-free-teller", _noFreeTeller);
      socket.off("connecting-free-teller", _connectingTeller);
      socket.off("admin-refuse-call", _eventAdminStopCall);
      socket.off("admin-request-sign", _eventAdminRequestSign);
      socket.off(
        "admin-reject-client-registration",
        _eventAdminRejectClientRegistration,
      );
      socket.off("admin-start-recording", _adminStartRecording);
    };
  }, [socket]);

  const getContact = async () => {
    try {
      const { img1, img2, img3, ...data } = getValues("data");
      console.log("data-->", data);
      if (!data || !data.phone) return null;
      const res = await dkttService.getContact(data);
      return res.data;
    } catch (err) {
      console.error("Error fetching contact info:", err);
      return null;
    }
  };
  const saveLogVideoCall = async () => {
    try {
      const data = getValues("data");
      console.log("saveLog --> ", data);

      if (!data || !data.phone) {
        console.error("Invalid data for saveLogVideoCall:", data);
        return null;
      }

      // Add videoSource to the request body
      const requestBody = applyActivateVideoSource(ORDER_BRANDS.HDBANK, data);

      const res = await dkttService.saveLogVideoCall(requestBody);
      console.log("saveLogVideoCall response --> ", res);

      // Validate API response
      if (!res || !res.data) {
        console.error("Invalid API response:", res);
        return null;
      }

      // Validate that result.id exists and is valid
      if (!res.data.id) {
        console.error("Missing or invalid call_id in response:", res.data);
        return null;
      }

      const callId = res.data.id;
      if (typeof callId !== "string" || callId.trim().length === 0) {
        console.error("Invalid call_id format:", callId);
        return null;
      }

      console.log("Valid call_id received:", callId);
      return res.data;
    } catch (err) {
      console.error("Error saving video call log:", err);
      return null;
    }
  };

  return (
    <ActivateContext.Provider
      value={{
        method,
        clientStart,
        stopCall,
        typeVideoCall,
        phone,
        jitsiData,
        paramTime,
        onBack,
        onPush,
        getContact,
        saveLogVideoCall,
      }}
    >
      {children}
    </ActivateContext.Provider>
  );
};
export { ActivateContext, ActivateProvider };

//     idNumber: '001198038611',
//     passport: null,
//     fullName: 'NGUYỄN THỊ THÚY HƯỜNG,
//     birthDay: '13/12/1998',
//     gender: 'Male',
//     address: 'Thiết Bình Vân Hà, Đông Anh, Hà Nội',
//     issueDate: '29/03/2024',
//     issuePlace: 'CỤC TRƯỞNG CỤC CẢNH SÁT QUẢN LÝ HÀNH CHÍNH VỀ TRẬT TỰ XÃ HỘI',
//     international: 'VNM';
//     contactPhone: '';
//     homeTown: 'Vân Hà, Đông Anh, Hà Nội';
//     city_code: '';
//     faceMatching: "86";
//     district_code: '268',
