"use client";

import {useTranslations} from 'next-intl';
import {useRouter} from 'next/navigation';
import {useEffect, useState} from 'react';
import {useForm, useWatch} from 'react-hook-form';

import Footer from '../../components/Footer';
import Header from '../../components/Header';
import PackageItem from '../../components/package/packageItem';
import PackageService from '../../services/package';
import {useUser} from '../../stores/user';
import {useLoad} from '../../utils/load';

// Tab constants
const TAB_DOMESTIC = 'domestic';
const TAB_ROAMING = 'roaming';

// Package type constants
const TYPE_NORMAL = 'NORMAL';
const TYPE_RM = 'RM';
const TYPE_CBNV = 'CBNV';

export default function PackagePage() {
    const t = useTranslations('package');
    const router = useRouter();
    const {addToCart, setIsCartOpen} = useUser();

    const [filteredPackages, setFilteredPackages] = useState([]);
    const [mainTab, setMainTab] = useState(TAB_DOMESTIC);

    // React Hook Form setup
    const {control, setValue, reset} = useForm({
        defaultValues: {
            search: '',
            cycle: 'M',
            packageType: 'monthly',
            type: TYPE_NORMAL
        }
    });

    // Watch form values for real-time filtering
    const formValues = useWatch({control});

    const [pagination, setPagination] = useState({
        page: 1,
        pageSize: 8,
        total: 0,
        totalPages: 0
    });

    const load = useLoad();

    // Function to fetch packages from API
    const getPackages = async (pageNum = 1, customFilters = null) => {
        load.open();

        try {
            const filters = customFilters || {
                search: formValues.search,
                cycle: formValues.cycle,
                type: formValues.type
            };

            const params = {
                page: pageNum,
                pageSize: pagination.pageSize,
                filters: {...filters, is_main: filters.cycle === 'D' ? 0 : 1}
            };

            const response = await PackageService.getPackages(params);

            if (response && response.data && response.data.length > 0) {
                setFilteredPackages(response.data);
                setPagination(prev => ({
                    ...prev,
                    page: pageNum,
                    total: response.totalRecords,
                    totalPages: Math.ceil(response.totalRecords / prev.pageSize)
                }));
            } else {
                setFilteredPackages([]);
                setPagination(prev => ({...prev, page: 1, total: 0, totalPages: 0}));
            }
        } catch (error) {
            console.error('Error loading packages:', error);
            setFilteredPackages([]);
        } finally {
            load.close();
        }
    };

    // Handle domestic sub-type filter change
    const handleDomesticTypeChange = (packageType) => {
        let cycle = '';
        let type = TYPE_NORMAL;

        switch (packageType) {
            case 'monthly':
                cycle = 'M';
                type = TYPE_NORMAL;
                break;
            case 'daily':
                cycle = 'D';
                type = TYPE_NORMAL;
                break;
            case 'cbnv':
                cycle = '';
                type = TYPE_CBNV;
                break;
            default:
                cycle = '';
                type = TYPE_NORMAL;
        }

        setValue('packageType', packageType);
        setValue('cycle', cycle);
        setValue('type', type);
        setPagination(prev => ({...prev, page: 1}));
        getPackages(1, {search: formValues.search, cycle, type});
    };

    // Handle roaming cycle filter change
    const handleRoamingCycleChange = (cycle) => {
        setValue('cycle', cycle);
        setPagination(prev => ({...prev, page: 1}));
        getPackages(1, {search: formValues.search, cycle, type: TYPE_RM});
    };

    // Handle main tab switch
    const handleTabChange = (tab) => {
        setMainTab(tab);
        setPagination(prev => ({...prev, page: 1}));

        if (tab === TAB_DOMESTIC) {
            setValue('packageType', 'monthly');
            setValue('cycle', 'M');
            setValue('type', TYPE_NORMAL);
            getPackages(1, {search: '', cycle: 'M', type: TYPE_NORMAL});
        } else {
            setValue('packageType', 'all');
            setValue('cycle', '');
            setValue('type', TYPE_RM);
            getPackages(1, {search: '', cycle: '', type: TYPE_RM});
        }
        setValue('search', '');
    };

    useEffect(() => {
        getPackages(1, {search: '', cycle: 'M', type: TYPE_NORMAL});
    }, []);

    const filterBtnClass = (active) =>
        `px-3 md:px-4 py-2 rounded-full text-xs md:text-sm font-medium transition-colors ${active   
            ? 'bg-error-100 text-error-600 border border-error-600'
            : 'bg-white text-neutral-800 border border-neutral-300 hover:bg-neutral-50'
        }`;

    const handlePageChange = (page) => {
        if (page < 1 || page > pagination.totalPages || page === pagination.page) return;
        window.scrollTo({top: 0, behavior: 'smooth'});
        getPackages(page);
    };

    const getPageNumbers = () => {
        const {page, totalPages} = pagination;
        if (totalPages <= 7) return Array.from({length: totalPages}, (_, i) => i + 1);
        const pages = [];
        if (page <= 4) {
            pages.push(1, 2, 3, 4, 5, '...', totalPages);
        } else if (page >= totalPages - 3) {
            pages.push(1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
        } else {
            pages.push(1, '...', page - 1, page, page + 1, '...', totalPages);
        }
        return pages;
    };

    return (
        <div className="min-h-screen bg-white">
            <Header/>
            {/* Main Content Section */}
            <div className="container mx-auto px-4 md:px-20 py-10 md:py-20">
                {/* Title Section */}
                <div className="mb-6 md:mb-7">
                    <h1 className="text-2xl md:text-3xl font-semibold text-neutral-800 mb-0">
                        {t('title')}
                    </h1>
                </div>

                {/* Main Tabs */}
                <div className="mb-6">
                    <div className="flex border-b border-neutral-200">
                        <button
                            onClick={() => handleTabChange(TAB_DOMESTIC)}
                            className={`px-6 py-3 text-sm md:text-base font-semibold transition-colors border-b-2 -mb-px ${mainTab === TAB_DOMESTIC
                                ? 'border-error-600 text-error-600'
                                : 'border-transparent text-neutral-500 hover:text-neutral-700'
                            }`}
                        >
                            {t('tabs.domestic')}
                        </button>
                        <button
                            onClick={() => handleTabChange(TAB_ROAMING)}
                            className={`px-6 py-3 text-sm md:text-base font-semibold transition-colors border-b-2 -mb-px ${mainTab === TAB_ROAMING
                                ? 'border-error-600 text-error-600'
                                : 'border-transparent text-neutral-500 hover:text-neutral-700'
                            }`}
                        >
                            {t('tabs.roaming')}
                        </button>
                    </div>
                </div>

                {/* Sub-filters */}
                <div className="mb-8">
                    <div className="flex justify-center mb-4">
                        {mainTab === TAB_DOMESTIC ? (
                            <div className="flex flex-wrap gap-2 md:gap-3 justify-center">
                                <button
                                    onClick={() => handleDomesticTypeChange('monthly')}
                                    className={filterBtnClass(formValues.packageType === 'monthly')}
                                >
                                    {t('selectType.monthly')}
                                </button>
                                <button
                                    onClick={() => handleDomesticTypeChange('daily')}
                                    className={filterBtnClass(formValues.packageType === 'daily')}
                                >
                                    {t('selectType.daily')}
                                </button>
                                <button
                                    onClick={() => handleDomesticTypeChange('cbnv')}
                                    className={filterBtnClass(formValues.packageType === 'cbnv')}
                                >
                                    {t('selectType.cbnv')}
                                </button>
                            </div>
                        ) : null
                            // (
                            // <div className="flex flex-wrap gap-2 md:gap-3 justify-center">
                            //     <button
                            //         onClick={() => handleRoamingCycleChange('')}
                            //         className={filterBtnClass(formValues.cycle === '')}
                            //     >
                            //         {t('selectType.all')}
                            //     </button>
                            //     <button
                            //         onClick={() => handleRoamingCycleChange('M')}
                            //         className={filterBtnClass(formValues.cycle === 'M')}
                            //     >
                            //         {t('selectType.monthly')}
                            //     </button>
                            //     <button
                            //         onClick={() => handleRoamingCycleChange('D')}
                            //         className={filterBtnClass(formValues.cycle === 'D')}
                            //     >
                            //         {t('selectType.daily')}
                            //     </button>
                            // </div>
                        // )
                        }
                    </div>
                </div>

                {/* Package Grid */}
                {load.loading ? (
                    <div className="text-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                        <p className="mt-4 text-neutral-600">{t('loadingPackages')}</p>
                    </div>
                ) : filteredPackages.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">📦</div>
                        <h3 className="text-xl font-semibold text-neutral-800 mb-2">{t('notFound.title')}</h3>
                        <p className="text-neutral-600 mb-4">{t('notFound.description')}</p>
                        <button
                            onClick={() => {
                                reset();
                                handleTabChange(TAB_DOMESTIC);
                            }}
                            className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-warning-400 transition-colors"
                        >
                            {t('clearFilter')}
                        </button>
                    </div>
                ) : (
                    <>
                        <div className="flex justify-center">
                            <div className="mb-[20px] flex flex-row flex-wrap gap-5 justify-center md:justify-start">
                                {filteredPackages.map((pkg) => (
                                    <PackageItem
                                        pack={pkg}
                                        key={pkg.code}
                                    />
                                ))}
                            </div>
                        </div>
                        {pagination.totalPages > 1 && (
                            <div className="flex flex-col items-center gap-3 mt-4 mb-8">
                                <div className="flex items-center gap-1">
                                    <button
                                        onClick={() => handlePageChange(pagination.page - 1)}
                                        disabled={pagination.page === 1}
                                        className="flex items-center justify-center w-9 h-9 rounded-lg border border-neutral-300 text-neutral-600 hover:bg-neutral-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                                        aria-label="Previous page"
                                    >
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                            <path d="M10 12L6 8l4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </button>

                                    {getPageNumbers().map((p, idx) =>
                                        p === '...' ? (
                                            <span key={`ellipsis-${idx}`} className="flex items-center justify-center w-9 h-9 text-neutral-400 text-sm">
                                                ...
                                            </span>
                                        ) : (
                                            <button
                                                key={p}
                                                onClick={() => handlePageChange(p)}
                                                className={`flex items-center justify-center w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
                                                    p === pagination.page
                                                        ? 'bg-error-600 text-white border border-error-600'
                                                        : 'border border-neutral-300 text-neutral-700 hover:bg-neutral-50'
                                                }`}
                                            >
                                                {p}
                                            </button>
                                        )
                                    )}

                                    <button
                                        onClick={() => handlePageChange(pagination.page + 1)}
                                        disabled={pagination.page === pagination.totalPages}
                                        className="flex items-center justify-center w-9 h-9 rounded-lg border border-neutral-300 text-neutral-600 hover:bg-neutral-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                                        aria-label="Next page"
                                    >
                                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                            <path d="M6 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    </button>
                                </div>
                                <p className="text-xs text-neutral-500">
                                    {t('pagination.showing', {
                                        from: (pagination.page - 1) * pagination.pageSize + 1,
                                        to: Math.min(pagination.page * pagination.pageSize, pagination.total),
                                        total: pagination.total
                                    })}
                                </p>
                            </div>
                        )}
                    </>
                )}

            </div>
            <Footer/>
        </div>
    );
}
