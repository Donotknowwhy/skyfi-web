import React from 'react';
import { tv } from 'tailwind-variants';

const button = tv({
  base: 'flex items-center justify-center gap-2.5 rounded-lg min-h-[44px] transition-all duration-300 font-semibold cursor-pointer',
  variants: {
    variant: {
      normal: 'text-[#00000080] bg-[linear-gradient(180deg,#FFDE01_0%,#FAA71A_100%)] hover:opacity-90',
      outline: 'bg-transparent border border-[#FAA71A] text-[#00000080] hover:bg-[#FAA71A]/5',
    },
    size: {
      sm: 'px-4 py-2 text-sm',
      md: 'px-4 py-[15px] text-base',
      lg: 'px-6 py-4 text-lg',
    },
  },
  defaultVariants: {
    variant: 'normal',
    size: 'md',
  },
});

export const ButtonHDV1 = ({ className, variant, size, children, ...props }) => {
  return (
    <button className={button({ variant, size, className })} {...props}>
      {children}
    </button>
  );
};

export { ButtonHDV1 as Button };
