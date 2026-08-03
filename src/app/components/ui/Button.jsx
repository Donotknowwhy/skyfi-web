"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import { tv } from 'tailwind-variants';
import { ButtonHD } from './ButtonHD';
import { ButtonHDV1 } from './ButtonHDV1';

const button = tv({
  base: 'flex items-center justify-center gap-2 rounded-full transition-all duration-300 font-semibold cursor-pointer ',
  variants: {
    variant: {
      normal: 'text-white shadow-[0px_4px_16px_rgba(44,78,255,0.12)] hover:shadow-[0px_4px_16px_rgba(44,78,255,0.24)] hover:-translate-y-0.5 bg-[linear-gradient(88.19deg,#2C4EFF_-4.19%,#0000FF_12.9%,#6100FF_48.11%,#DA0191_74.13%,#FF8A00_89.99%,#FFB907_99.38%)]',
      outline: 'bg-transparent border border-[#2C4EFF] text-[#2C4EFF] hover:bg-[#2C4EFF]/5',
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

export const Button = ({ className, variant, size, children, ...props }) => {
  const pathname = usePathname() || '';

  if (pathname.includes('/hdbank-app-v2')) {
    return (
      <ButtonHD className={className} variant={variant} size={size} {...props}>
        {children}
      </ButtonHD>
    );
  }

  if (pathname.includes('/hdbank-app')) {
    return (
      <ButtonHDV1 className={className} variant={variant} size={size} {...props}>
        {children}
      </ButtonHDV1>
    );
  }

  return (
    <button className={button({ variant, size, className })} {...props}>
      {children}
    </button>
  );
};
