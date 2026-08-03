import "react-toastify/dist/ReactToastify.css";
import ZoomLock from "@/app/components/hdbank/ZoomLock";

export const metadata = {
    title: 'HDBank',
    description: 'HDBank App',
};

export const viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
};

export default function HDBankLayout({ children }) {
    return (
        <div
            className="min-h-[100dvh] relative font-hdbank"
            id="hdbank-app"
            style={{
                background: '#FFFFFF',
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
