import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Eruda from "./components/Eruda";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "SkyFi",
  description: "SkyFi là nhà cung cấp dịch vụ eSIM (4G, 5G) tốc độ cao toàn cầu, kết nối với các tiện ích: hàng không, ăn uống, vui chơi, giải trí, mua sắm...",
};

export default function RootLayout({ children }) {
  return (
    <html lang="vn">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-HBXX8BHMEV"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-HBXX8BHMEV');
          `}
        </Script>
        <Eruda />
        {children}
      </body>
    </html>
  );
}
