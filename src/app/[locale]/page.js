"use client"
import Footer from "../components/Footer";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import AttractivePlans from "../components/home/AttractivePlans";
import Discovery from "../components/home/Discovery";
import ListSimHome from "../components/home/ListSimHome";
import MenuBuySim from "../components/home/menuBuySim";
import PackageHome from "../components/home/packageHome";
import {autoInitTracking, trackPageView} from "@/app/utils/trackingHelper";
import React from "react";

export default function Home() {
    React.useEffect(() => {
        // 1. Khởi tạo session khi user vào web (chỉ chạy lần đầu nếu chưa có session)
        // autoInitTracking đã tự động track page view lần đầu
        autoInitTracking();

        // 2. Track page view mỗi lần truy cập trang home
        // Nếu session đã tồn tại, chỉ track page view
        const trackHomePage = async () => {
            const sessionId = sessionStorage.getItem('Skyfi_tracking_session');
            if (sessionId) {
                await trackPageView();
            }
        };
        // Echo log to test
        console.log("Tracking home page view");
        trackHomePage();
    }, []);
  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Header />
      <main className="flex flex-col gap-0 flex-1">
        <HeroSection />
        <MenuBuySim />
        <ListSimHome />
        <PackageHome />
        <Discovery />
      </main>
      <Footer />
    </div>
  );
}
