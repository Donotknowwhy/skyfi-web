import "react-toastify/dist/ReactToastify.css";
import ZoomLock from "@/app/components/vikki/ZoomLock";

export const metadata = {
    title: 'Vikki',
    description: 'Vikki Information Page',
};

export const viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
};

export default function VikkiLayout({ children }) {
    return (
        <div
            className="min-h-[100dvh] relative font-vikki"
            id="app-vikki"
            style={{
                background: 'linear-gradient(0deg, #FFFFFF 0%, #FFFDFC 20%, #FEF8F4 40%, #FCF1EE 60%, #F3E8F4 80%, #E8E5FA 100%)',
                touchAction: 'pan-x pan-y', // Prevents pinch-to-zoom but allows scrolling
            }}
        >
            <ZoomLock />
            <div className="mx-auto w-full">
                {children}
            </div>
        </div>
    );
}
