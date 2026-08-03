'use client';

import { useEffect, useRef, useState } from 'react';

const Tooltip = ({ children, content, className = '' }) => {
    const [isOpen, setIsOpen] = useState(false);
    const tooltipRef = useRef(null);
    const triggerRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                tooltipRef.current &&
                !tooltipRef.current.contains(event.target) &&
                triggerRef.current &&
                !triggerRef.current.contains(event.target)
            ) {
                setIsOpen(false);
            }
        };

        const handleScroll = () => {
            setIsOpen(false);
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            window.addEventListener('scroll', handleScroll, true);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            window.removeEventListener('scroll', handleScroll, true);
        };
    }, [isOpen]);

    const handleToggle = (e) => {
        e.stopPropagation();
        setIsOpen(!isOpen);
    };

    return (
        <div className="relative inline-block">
            <div ref={triggerRef} onClick={handleToggle} className="cursor-pointer">
                {children}
            </div>
            
            {isOpen && (
                <div
                    ref={tooltipRef}
                    className={`absolute z-50 right-0 mt-2 w-full bg-white rounded-[12px] shadow-[0px_4px_16px_0px_rgba(0,0,0,0.12)] p-3 ${className}`}
                >
                    {/* Arrow */}
                    <div className="absolute -top-2 right-3 w-4 h-4  bg-white rotate-45 "></div>
                    
                    {/* Content */}
                    <div className="relative z-10 bg-white rounded-[12px]">
                        <p className="text-[13px] text-[#1C1C1E] leading-[18px] font-normal">
                            {content}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Tooltip;
