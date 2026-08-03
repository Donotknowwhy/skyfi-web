'use client';

import { useEffect, useRef, useState } from 'react';

export default function Tooltip({ children, content, position = 'bottom', className = '', figmaLink = '' }) {
  const [isVisible, setIsVisible] = useState(false);
  const tooltipRef = useRef(null);

  const toggleTooltip = () => {
    setIsVisible(!isVisible);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target)) {
        setIsVisible(false);
      }
    };

    if (isVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isVisible]);

  const positionClasses = {
    top: 'bottom-full mb-2',
    bottom: 'top-full mt-2',
    left: 'right-full mr-2',
    right: 'left-full ml-2',
  };

  // Add tooltip arrow
  const tooltipArrowClasses = {
    top: 'after:content-[""] after:absolute after:top-full after:left-1/2 after:-ml-2 after:border-8 after:border-transparent after:border-t-white',
    bottom: 'after:content-[""] after:absolute after:bottom-full after:left-1/2 after:-ml-2 after:border-8 after:border-transparent after:border-b-white',
    left: 'after:content-[""] after:absolute after:top-1/2 after:left-full after:-mt-2 after:border-8 after:border-transparent after:border-l-white',
    right: 'after:content-[""] after:absolute after:top-1/2 after:right-full after:-mt-2 after:border-8 after:border-transparent after:border-r-white',
  };

  return (
    <div className="relative inline-block" ref={tooltipRef}>
      <div onClick={toggleTooltip} className="cursor-pointer">
        {children}
      </div>

      {isVisible && (
        <div className={`absolute z-50 w-[280px] p-4 bg-white rounded-md shadow-lg border border-[#ECECEC]
          ${positionClasses[position]} ${tooltipArrowClasses[position]} ${className}`}
          style={{ boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.08)' }}
        >
          {content}
          {figmaLink && process.env.NODE_ENV === 'development' && (
            <div className="text-xs text-gray-400 mt-2 pt-2 border-t">
              <a href={figmaLink} target="_blank" rel="noopener noreferrer" className="hover:underline">
                Figma Reference
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
