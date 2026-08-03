"use client";

import { Dialog, Transition } from '@headlessui/react';
import { useTranslations } from 'next-intl';
import { Fragment, useState } from 'react';

const CountriesPopup = ({ isOpen, onClose, countries = [] }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const t  = useTranslations();

    // Sử dụng title từ props hoặc fallback về translation
    const displayTitle =  t('countries.title');

    // Lọc countries theo từ khóa tìm kiếm
    const filteredCountries = countries.filter(country =>
        country.code?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        country.country_code?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleClose = (e) => {
        setSearchTerm(''); // Reset search khi đóng popup
        onClose();
    };

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={handleClose}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
                         onClick={(e) => e.stopPropagation()}/>
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel 
                                className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden"
                                onClick={(e) => e.stopPropagation()}
                            >
                                {/* Header */}
                                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                                    <h2 className="text-xl font-semibold text-gray-800">{displayTitle}</h2>
                                    <button
                                        onClick={handleClose}
                                        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                        aria-label={t('countries.closeAriaLabel')}
                                    >
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M18 6L6 18" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M6 6L18 18" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </button>
                                </div>

                                {/* Search Box */}
                                <div className="p-6 border-b border-gray-100">
                                    <div className="relative">
                                        <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9.16667 15.8333C12.8486 15.8333 15.8333 12.8486 15.8333 9.16667C15.8333 5.48477 12.8486 2.5 9.16667 2.5C5.48477 2.5 2.5 5.48477 2.5 9.16667C2.5 12.8486 5.48477 15.8333 9.16667 15.8333Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M17.5 17.5L13.875 13.875" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                        <input
                                            type="text"
                                            placeholder={t('countries.searchPlaceholder')}
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                        />
                                    </div>
                                </div>

                                {/* Countries List */}
                                <div className="p-6 overflow-y-auto max-h-96">
                                    {filteredCountries.length > 0 ? (
                                        <div className="space-y-2">
                                            {filteredCountries.map((country, index) => (
                                                <div
                                                    key={`${country.name}-${index}`}
                                                    className="flex items-center p-3 border border-gray-200 rounded-lg hover:shadow-md hover:border-blue-300 hover:bg-blue-50 transition-all cursor-pointer group"
                                                >
                                                    <div className="w-12 h-8 mr-3 overflow-hidden rounded flex-shrink-0">
                                                        {country.image ? (
                                                            <img
                                                                src={country.image}
                                                                alt={t('countries.flagAlt', { country: country.name })}
                                                                width={48}
                                                                height={32}
                                                                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                                                            />
                                                        ) : (
                                                            <div className="w-full h-full bg-gray-200 rounded flex items-center justify-center">
                                                                <span className="text-gray-400 text-xs">{country.name}</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="flex-1 min-w-0">
                                                        <div className="text-left font-medium text-gray-700 group-hover:text-blue-600 transition-colors truncate">
                                                            {country.name}
                                                        </div>
                                                        {/*<div className="text-sm text-gray-500">*/}
                                                        {/*    {country.country_code}*/}
                                                        {/*</div>*/}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-8">
                                            <div className="text-gray-400 mb-2">
                                                <svg className="mx-auto" width="48" height="48" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M9.16667 15.8333C12.8486 15.8333 15.8333 12.8486 15.8333 9.16667C15.8333 5.48477 12.8486 2.5 9.16667 2.5C5.48477 2.5 2.5 5.48477 2.5 9.16667C2.5 12.8486 5.48477 15.8333 9.16667 15.8333Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path d="M17.5 17.5L13.875 13.875" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </div>
                                            <p className="text-gray-500">{t('countries.noResults')}</p>
                                        </div>
                                    )}
                                </div>

                                {/* Footer */}
                                <div className="p-6 border-t border-gray-100 bg-gray-50">
                                    <div className="flex items-center justify-between text-sm text-gray-600">
                                        <span>{t('countries.totalCount', { count: filteredCountries.length })}</span>
                                        <button
                                            onClick={handleClose}
                                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                                        >
                                            {t('countries.close')}
                                        </button>
                                    </div>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default CountriesPopup;
