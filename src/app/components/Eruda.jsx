"use client";

import { useEffect } from "react";

export default function Eruda() {
  useEffect(() => {
    console.log("log eruda", process.env.NODE_ENV);
    const isVikkiPath = typeof window !== "undefined" && window.location.pathname.includes("app-vikki");

    // Only load eruda in development mode or when NEXT_PUBLIC_IS_DEV_TOOL is true AND it's a Vikki path
    if (
      isVikkiPath &&
      (
        process.env.NEXT_PUBLIC_IS_DEV_TOOL === "true")
    ) {
      import("eruda").then((eruda) => {
        eruda.default.init();
      });
    }
  }, []);

  return null;
}
