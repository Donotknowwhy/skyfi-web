"use client";

import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { Link } from '../../i18n/navigation';
import { useUserActions } from '../stores/user';

const UserDropdown = ({ isOpen, closeDropdown, userButtonRef, onMouseEnter }) => {
  const t = useTranslations();
  const locale = useLocale();
  const dropdownRef = useRef(null);
  const router = useRouter();
  const { logout } = useUserActions();

  useEffect(() => {
    // Handle click outside to close dropdown
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        userButtonRef.current &&
        !userButtonRef.current.contains(event.target)
      ) {
        closeDropdown();
      }
    };

    // Handle escape key
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        closeDropdown();
      }
    };

    // Add event listeners when dropdown is open
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
    }

    // Cleanup
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen, closeDropdown, userButtonRef]);

  const handleLogout = () => {
    logout();
    closeDropdown();
    router.push(`/${locale}`);
  };

  const handleMyESim = () => {
    closeDropdown();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <>
      {/* Invisible bridge to prevent hover gaps */}
      <div
        className="absolute top-full right-0 w-48 h-2 z-40"
        onMouseEnter={onMouseEnter}

      />

      <div
        ref={dropdownRef}
        className="absolute top-full right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
        style={{ fontFamily: 'Inter' }}
        onMouseEnter={onMouseEnter}

      >
      <div className="py-2">
        {/* My eSIM */}
        <Link
          href="/my-eSim"
          onClick={handleMyESim}
          className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <svg
            className="w-4 h-4 mr-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          {t('common.myEssim')}
        </Link>

        {/* Divider */}
        <div className="border-t border-gray-100 my-1" />

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <svg
            className="w-4 h-4 mr-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          {t('common.logout') || 'Logout'}
        </button>
      </div>
    </div>
    </>
  );
};

export default UserDropdown;
