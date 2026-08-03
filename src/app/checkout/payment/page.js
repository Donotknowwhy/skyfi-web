"use client"

import { redirect } from 'next/navigation';

export default function CheckoutRedirect() {
  // Get the default locale or use 'vi'
  const defaultLocale = 'vi';
  redirect(`/${defaultLocale}/checkout/payment`);
} 