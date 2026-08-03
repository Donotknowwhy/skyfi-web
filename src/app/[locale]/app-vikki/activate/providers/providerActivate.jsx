"use client";

import dkttService from "@/app/services/dkttService";
import { createContext, useState } from "react";
import { useForm } from "react-hook-form";

const ActivateContext = createContext(null);

const ActivateProvider = ({ children }) => {
  const method = useForm({
    defaultValues: {
      page: "scanQR",
      data: null,
      backPage: "",
    },
    mode: "onChange",
  });

  const { watch, setValue, getValues } = method;
  const [backPage, setBackPage] = useState([]);
  const _page = watch("page");

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

  const getContact = async () => {
    try {
      const { img1, img2, img3, ...data } = getValues("data");
      if (!data || !data.phone) return null;
      const res = await dkttService.getContact(data);
      return res.data;
    } catch (err) {
      console.error("Error fetching contact info:", err);
      return null;
    }
  };

  return (
    <ActivateContext.Provider
      value={{
        method,
        onBack,
        onPush,
        getContact,
      }}
    >
      {children}
    </ActivateContext.Provider>
  );
};
export { ActivateContext, ActivateProvider };
