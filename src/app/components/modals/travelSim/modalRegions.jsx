"use client";

import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { get } from '../../../services/api/base';
import { modal, useModal } from '../../../utils/modal';

export default function ModalRegions({
    onSelectRegion,
    className = ""
}) {
    const t = useTranslations('travelSim.modalRegions');
    const { close } = useModal();
    const [regions, setRegions] = useState([]);
    const [filteredRegions, setFilteredRegions] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch regions data
    useEffect(() => {
        const fetchRegions = async () => {
            try {
                setLoading(true);
                const response = await get('/app/get-regions-by-type/v2/COUNTRY');

                if (response.success && response.data) {
                    const responseNew = response.data.filter(region => region.avaiable_skyboss);
                    setRegions(responseNew);
                    setFilteredRegions(responseNew);
                } else {
                    setError(response.message || 'Failed to fetch regions');
                }
            } catch (err) {
                setError(err.message || 'Network error occurred');
                console.error('Error fetching regions:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchRegions();
    }, []);

    // Filter regions based on search term
    useEffect(() => {
        if (!searchTerm.trim()) {
            setFilteredRegions(regions);
        } else {
            const filtered = regions.filter(region =>
                region.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredRegions(filtered);
        }
    }, [searchTerm, regions]);

    const handleSelectRegion = (region) => {
        if (onSelectRegion) {
            onSelectRegion(region);
        }
        close();
    };

    return (
        <div className={clsx("bg-white", className)}>
            {/* Header */}
            <div className="flex items-center  gap-2  py-4 ">
                <h2 className="flex-1 text-[22px] font-semibold text-[#333333] leading-[1.2] ">
                    {t('title')}
                </h2>
                <button
                    onClick={close}
                    className="w-5 h-5 flex items-center justify-center hover:bg-gray-100 rounded transition-colors"
                >
                    <svg
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M1 1L9 9M9 1L1 9"
                            stroke="#333333"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </button>
            </div>

            {/* Content */}
            <div className="flex flex-col items-center gap-2 px-4 pb-0">
                {/* Search Input */}
                <div className="flex items-center gap-2 w-full px-2 py-0 my-4 border border-[#DDDDDD] rounded-lg h-10">
                    <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="flex-shrink-0"
                    >
                        <path
                            d="M6.5 11.5C9.26142 11.5 11.5 9.26142 11.5 6.5C11.5 3.73858 9.26142 1.5 6.5 1.5C3.73858 1.5 1.5 3.73858 1.5 6.5C1.5 9.26142 3.73858 11.5 6.5 11.5Z"
                            stroke="#C4C4C4"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <path
                            d="M12.5 12.5L10.5 10.5"
                            stroke="#C4C4C4"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                    <input
                        type="text"
                        placeholder={t('searchPlaceholder')}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="flex-1 text-sm text-[#333333] placeholder-[#A1A1A1] border-none outline-none bg-transparent"
                    />
                </div>

                {/* Regions List */}
                <div className="w-full max-h-[400px] overflow-y-auto">
                    {loading ? (
                        <div className="flex items-center justify-center py-8">
                            <div className="text-sm text-[#A1A1A1]">{t('loading')}</div>
                        </div>
                    ) : error ? (
                        <div className="flex items-center justify-center py-8">
                            <div className="text-sm text-red-500">{error}</div>
                        </div>
                    ) : filteredRegions.length === 0 ? (
                        <div className="flex items-center justify-center py-8">
                            <div className="text-sm text-[#A1A1A1]">{t('noResults')}</div>
                        </div>
                    ) : (
                        <div className="space-y-0">
                            {filteredRegions.map((region, index) => (
                                <div
                                    key={region.id}
                                    onClick={() => handleSelectRegion(region)}
                                    className={clsx(
                                        "flex items-center gap-2 py-3 cursor-pointer hover:bg-gray-50 transition-colors",
                                        index < filteredRegions.length - 1 && "border-b border-[#F1F1F1]"
                                    )}
                                >
                                    {/* Flag */}
                                    <div className="w-[41.49px] h-[29.65px] rounded border border-[#F1F1F1] overflow-hidden flex-shrink-0">
                                        {region.icon ? (
                                            <img
                                                src={region.icon}
                                                alt={`${region.name} flag`}
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    e.target.style.display = 'none';
                                                    e.target.nextSibling.style.display = 'flex';
                                                }}
                                            />
                                        ) : null}
                                        <div
                                            className="w-full h-full bg-gray-200 flex items-center justify-center text-xs text-gray-500"
                                            style={{ display: region.icon ? 'none' : 'flex' }}
                                        >
                                            {region.iso_code || region.code}
                                        </div>
                                    </div>

                                    {/* Country Name */}
                                    <div className="flex-1 text-sm font-semibold text-[#333333] leading-[1.5]">
                                        {region.name}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export const showModalRegions = ({
    onSelectRegion,
    onClose
}) => {
    modal.open({
        render: (
            <ModalRegions
                onSelectRegion={onSelectRegion}
            />
        ),
        onClose: onClose,
        closeButton: false,
        boxClassName: 'max-w-[741px]',
    });
};
