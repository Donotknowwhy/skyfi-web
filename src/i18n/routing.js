import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en', 'vi','ko','zh-TW','zh-CN','ja','th','ru'],

  // Used when no locale matches
  defaultLocale: 'vi'
});
