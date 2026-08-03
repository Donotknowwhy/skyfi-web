'use client';

import { useEffect } from 'react';

/**
 * Component to lock browser zoom (prevents Ctrl+scroll, Ctrl++/-, pinch-to-zoom)
 * This component doesn't render anything, it just adds event listeners
 */
const ZoomLock = () => {
    useEffect(() => {
        // Prevent Ctrl + scroll wheel zoom
        const handleWheel = (e) => {
            if (e.ctrlKey) {
                e.preventDefault();
            }
        };

        // Prevent Ctrl + Plus/Minus keyboard zoom
        const handleKeyDown = (e) => {
            if ((e.ctrlKey || e.metaKey) && (e.key === '+' || e.key === '-' || e.key === '=' || e.key === '0')) {
                e.preventDefault();
            }
        };

        // Prevent pinch-to-zoom on touch devices
        const handleTouchMove = (e) => {
            if (e.touches.length > 1) {
                e.preventDefault();
            }
        };

        // Prevent double-tap zoom on touch devices
        let lastTouchEnd = 0;
        const handleTouchEnd = (e) => {
            const now = Date.now();
            if (now - lastTouchEnd <= 300) {
                e.preventDefault();
            }
            lastTouchEnd = now;
        };

        // Add event listeners with passive: false to allow preventDefault
        document.addEventListener('wheel', handleWheel, { passive: false });
        document.addEventListener('keydown', handleKeyDown);
        document.addEventListener('touchmove', handleTouchMove, { passive: false });
        document.addEventListener('touchend', handleTouchEnd);

        // Cleanup listeners on unmount
        return () => {
            document.removeEventListener('wheel', handleWheel);
            document.removeEventListener('keydown', handleKeyDown);
            document.removeEventListener('touchmove', handleTouchMove);
            document.removeEventListener('touchend', handleTouchEnd);
        };
    }, []);

    return null; // This component doesn't render anything
};

export default ZoomLock;
