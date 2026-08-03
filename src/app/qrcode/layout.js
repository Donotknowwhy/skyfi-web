import '../globals.css';

export const metadata = {
  title: 'QR Code',
  description: 'QR Code Information',
};

export default function QRLayout({ children }) {
  return (
      <div className="bg-gray-50">
        {children}
      </div>
  );
}
