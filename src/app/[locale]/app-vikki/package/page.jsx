"use client";

/**
 * Vikki Package Page
 * 
 * This page displays data packages for the Vikki app with a modern, gradient design.
 * Based on Figma design: https://www.figma.com/design/T5KtFWNBThZe8wKq0vDVZk/SKYFI---VIKKI?node-id=359-112127
 * 
 * Features:
 * - Filter by package type (All, Daily, Monthly)
 * - Displays packages in card format with discount badges
 * - Gradient background matching Vikki branding
 * - Mobile-optimized design with responsive layout
 * - Uses existing package service API logic from main package page
 * 
 * Components:
 * - PackageCard: Custom card component for Vikki design
 */

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm, useWatch } from 'react-hook-form';



import PackageCard from '@/app/components/vikki/PackageCard';
import PackageService from '../../../services/package';
import { useUser } from '../../../stores/user';
import { useLoad } from '../../../utils/load';


export default function VikkiPackagePage() {
	const t = useTranslations('vikki.package');
	const router = useRouter();
	const { addToCart, setIsCartOpen } = useUser();

	const [filteredPackages, setFilteredPackages] = useState([]);
	const [selectedPackage, setSelectedPackage] = useState(null);

	// React Hook Form setup
	const { control, handleSubmit, setValue, watch, reset, register } = useForm({
		defaultValues: {
			search: '',
			is_main: 1,
			cycle: '',
			packageType: 'all'
		}
	});

	// Watch form values for real-time filtering
	const formValues = useWatch({ control });

	const [pagination, setPagination] = useState({
		page: 1,
		pageSize: 100,
		total: 0,
		totalPages: 0
	});
	const [loading, setLoading] = useState(false);

	const load = useLoad();

	// Function to fetch packages from API
	const getPackages = async (pageNum = 1, customFilters = null) => {
		setLoading(true);
		load.open();

		try {
			const filters = customFilters || {
				search: formValues.search,
				cycle: formValues.cycle
			};

			const params = {
				page: pageNum,
				pageSize: pagination.pageSize,
				filters: filters
			};

			const response = await PackageService.getPackages(params);

			if (response && response.data && response.data.length > 0) {
				setFilteredPackages(response.data);
				setPagination(prev => ({
					...prev,
					page: pageNum,
					total: response.totalRecords || 0,
					totalPages: Math.ceil((response.totalRecords || 0) / pagination.pageSize)
				}));
			} else {
				setFilteredPackages([]);
			}
		} catch (error) {
			console.error('Error loading packages:', error);
			setFilteredPackages([]);
		} finally {
			setLoading(false);
			load.close();
		}
	};

	// Handle filter changes
	const handleFilterChange = (key, value) => {
		setValue(key, value);

		// Reset to page 1 when filters change
		setPagination(prev => ({ ...prev, page: 1 }));

		// Fetch new data with updated filters
		const newFilters = {
			search: key === 'search' ? value : formValues.search,
			cycle: key === 'cycle' ? value : formValues.cycle
		};
		getPackages(1, newFilters);
	};

	// Handle package type filter (for UI only)
	const handlePackageTypeChange = (packageType) => {
		setValue('packageType', packageType);

		// Map packageType to cycle for API
		let cycle = '';
		switch (packageType) {
			case 'daily':
				cycle = 'D';
				break;
			case 'monthly':
				cycle = 'M';
				break;
			default:
				cycle = '';
		}

		handleFilterChange('cycle', cycle);
	};

	useEffect(() => {
		getPackages(1);
	}, []);

	return (
		<div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 bg-cover bg-center " style={{
			backgroundImage: `url(/figma-images/background.png)`,
		}}>
			{/* Navigation Bar */}
			<div className="sticky top-0 z-50">
				<div className="flex items-center justify-between px-4 py-3">
					<button
						onClick={() => router.back()}
						className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
					>
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
						</svg>
					</button>
					<h1 className="text-lg font-semibold text-gray-900">{t('title')}</h1>
					<div className="w-10"></div>
				</div>
			</div>

			{/* Filter Tags */}
			<div className="px-4 py-4">
				<div className="flex gap-3 overflow-x-auto no-scrollbar">
					<button
						onClick={() => handlePackageTypeChange('all')}
						className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${formValues.packageType === 'all'
							? 'bg-white text-gray-900 border-2 border-gray-900 shadow-sm'
							: 'bg-white text-gray-600 border border-gray-300 hover:border-gray-400'
							}`}
					>
						{t('filterAll')}
					</button>
					<button
						onClick={() => handlePackageTypeChange('daily')}
						className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${formValues.packageType === 'daily'
							? 'bg-white text-gray-900 border-2 border-gray-900 shadow-sm'
							: 'bg-white text-gray-600 border border-gray-300 hover:border-gray-400'
							}`}
					>
						{t('filterDaily')}
					</button>
					<button
						onClick={() => handlePackageTypeChange('monthly')}
						className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${formValues.packageType === 'monthly'
							? 'bg-white text-gray-900 border-2 border-gray-900 shadow-sm'
							: 'bg-white text-gray-600 border border-gray-300 hover:border-gray-400'
							}`}
					>
						{t('filterMonthly')}
					</button>
				</div>
			</div>

			{/* Package Grid */}
			<div className="px-4 pb-6">
				{load.loading ? (
					<div className="text-center py-12">
						<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
						<p className="mt-4 text-gray-600">{t('loading')}</p>
					</div>
				) : filteredPackages.length === 0 ? (
					<div className="text-center py-12">
						<div className="text-6xl mb-4">📦</div>
						<h3 className="text-xl font-semibold text-gray-800 mb-2">{t('noPackages')}</h3>
						<p className="text-gray-600 mb-4">{t('changeFilter')}</p>
						<button
							onClick={() => {
								reset();
								getPackages(1);
							}}
							className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-semibold hover:shadow-lg transition-all"
						>
							{t('clearFilter')}
						</button>
					</div>
				) : (
					<div className="grid grid-cols-1 gap-4">
						{filteredPackages.map((pkg, index) => (
							<PackageCard
								pack={pkg}
								key={pkg.code}
								isHighlighted={index === 0}
							/>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
