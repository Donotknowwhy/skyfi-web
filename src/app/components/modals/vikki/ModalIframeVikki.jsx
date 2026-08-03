'use client';

import { modal, useModal } from '@/app/utils/modal';
import React, { useState } from 'react';

const IframeContent = ({ url, title }) => {
    const { close } = useModal();
    const [loading, setLoading] = useState(true);

    return (
        <div className="flex flex-col h-[85vh] bg-white rounded-2xl overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-white shrink-0">
                <h3 className="text-lg font-semibold text-[#333333] truncate flex-1">{title}</h3>

                <button
                    type="button"
                    onClick={close}
                    className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 active:bg-gray-200 ml-2"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 6L6 18M6 6L18 18" stroke="#333333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </div>

            {/* Iframe Content */}
            <div className="flex-1 relative w-full h-full bg-gray-50">
                {loading && (
                    <div className="absolute inset-0 flex items-center justify-center z-0">
                        <div className="w-10 h-10 border-4 border-[#D2008C] border-t-transparent rounded-full animate-spin" />
                    </div>
                )}
                <iframe
                    src={url}
                    className="w-full h-full border-0 absolute inset-0 z-10 bg-transparent"
                    onLoad={() => setLoading(false)}
                    title={title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
            </div>
        </div>
    );
};

export const showModalIframeVikki = ({ url, title }) => {
    modal.open({
        render: <IframeContent url={url} title={title} />,
        closeButton: false,
        boxClassName: 'max-w-4xl w-full !p-0 !rounded-2xl',
    });
};

export default IframeContent;
