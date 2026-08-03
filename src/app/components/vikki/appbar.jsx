"use client";

/**
 * AppBar component for the Vikki interface
 *
 * @component
 * @param {Object} props - Component props
 * @param {string} [props.title="Vikki"] - Title to display in the app bar
 * @param {boolean} [props.showBackButton=false] - Whether to show the back button
 * @param {Function} [props.onBackClick] - Custom back button click handler
 * @param {React.ReactNode} [props.rightAction] - Right side action component
 * @param {string} [props.className] - Additional CSS classes
 * @param {boolean} [props.showLogo=true] - Whether to show the logo when title is "Vikki"
 * @param {boolean} [props.showDesktopMenu=false] - Whether to show desktop navigation menu
 */

import clsx from 'clsx';
import { useRouter } from "next/navigation";
import React from 'react';



const AppBar = ({
  title = "Vikki",
  showBackButton = false,
  onBackClick,
  rightAction,
  className,
  showLogo = true,
  showDesktopMenu = false,
  ...props
}) => {
  const router = useRouter();


  // Close mobile menu when screen size changes to desktop


  const handleBackClick = () => {
    if (onBackClick) {
      onBackClick();
    } else {
      router.back();
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navigateHome = () => {
    router.push('/');
  };

  return (
    <header
      className={clsx(
        "w-full flex  z-50 items-center justify-between mb-4",
        className
      )}
      style={{ fontFamily: 'Inter' }}
      {...props}
    >
      {/* Left Side - Back button or Menu button */}
      <div className="flex items-center">
        {showBackButton ? (
          <button
            onClick={handleBackClick}
            className=" hover:bg-gray-100 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95"
            aria-label="Go back"
          >
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        ) : (
          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-xl transition-all duration-200 hover:scale-105 active:scale-95"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>
        )}
      </div>

      {/* Center - Title/Logo and Desktop Menu */}
      <div className="flex-1 flex items-center justify-center lg:justify-start lg:ml-4">
        {title ? (
          <h1 className="text-lg font-semibold text-gray-900 truncate text-center w-full ">
            {title}
          </h1>
        ) : null}

        {/* Desktop Menu - Only show if showDesktopMenu is true */}
        {showDesktopMenu && (
          <nav className="hidden lg:flex items-center ml-8 space-x-6">
            {menuItems.map((item) => (
              <button
                key={item.label}
                onClick={() => router.push(item.href)}
                className="text-gray-700 hover:text-primary font-medium text-sm transition-all duration-200 relative group px-2 py-1 rounded-lg hover:bg-primary/5"
                style={{ fontFamily: 'Inter' }}
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
          </nav>
        )}
      </div>

      {/* Right Side - Action buttons */}
      <div className="flex items-center">
        {rightAction || (
          <div className="w-10 h-10" /> /* Placeholder for symmetry */
        )}
      </div>


    </header>
  );
};

export default AppBar;
