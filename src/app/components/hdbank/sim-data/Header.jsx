'use client';

import { ChevronLeftIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';

const Header = ({ title, onBack,className }) => {
  const router = useRouter();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      router.back();
    }
  };

  return (
    <div className={`bg-white sticky top-0 z-50 shadow-[0px_1px_0px_0px_#E5E5E5] ${className}`}>
        <div className="flex items-center justify-between px-4 py-3">
            <button onClick={handleBack} className="p-1 -ml-1">
                <ChevronLeftIcon className="w-6 h-6 text-[#1C1C1E]" />
            </button>
            <h1 className="text-[17px] font-semibold text-[#1C1C1E]">{title}</h1>
            <div className="w-6 h-6" /> {/* Placeholder for symmetry */}
        </div>
    </div>
  );
};

export default Header;
