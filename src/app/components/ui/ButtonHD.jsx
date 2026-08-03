import React from 'react';
import { tv } from 'tailwind-variants';

const button = tv({
  base: 'flex items-center justify-center gap-2 rounded-full transition-all duration-300 font-semibold cursor-pointer',
  variants: {
    variant: {
      normal: 'text-white shadow-[0px_4px_16px_rgba(218,33,40,0.2)] hover:shadow-[0px_4px_16px_rgba(218,33,40,0.28)] hover:-translate-y-0.5 bg-[linear-gradient(90deg,#DA2128_0.2%,#DA2128_50.07%,#F9A61C_75%,#F9C016_84.97%,#FFDD00_99.93%)]',
      outline: 'bg-transparent border border-[#DA2128] text-[#DA2128] hover:bg-[#DA2128]/5',
    },
    size: {
      sm: 'px-4 py-2 text-sm',
      md: 'px-4 py-3 text-base',
      lg: 'px-6 py-4 text-lg',
    },
  },
  defaultVariants: {
    variant: 'normal',
    size: 'md',
  },
});

export const ButtonHD = ({ className, variant, size, children, ...props }) => {
  return (
    <button className={button({ variant, size, className })} {...props}>
      {children}
    </button>
  );
};

export { ButtonHD as Button };
