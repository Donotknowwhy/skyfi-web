'use client';

import { useCities, useDistricts, useWards } from '@/app/hooks/useAddress';
import { useModal } from '@/app/utils/modal';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

const AddressSelectionModal = () => {
	const t = useTranslations('vikki.addressModal');
	const { close, done } = useModal();
	const [step, setStep] = useState(1); // 1: City, 2: District, 3: Ward
	const [searchQuery, setSearchQuery] = useState('');
	const [selectedCity, setSelectedCity] = useState(null);
	const [selectedDistrict, setSelectedDistrict] = useState(null);
	const [selectedWard, setSelectedWard] = useState(null);

	const cities = useCities();
	const districts = useDistricts(selectedCity?.id);
	const wards = useWards(selectedDistrict?.id);

	// Filter items based on search query
	const getFilteredItems = () => {
		let items = [];
		if (step === 1) {
			items = cities;
		} else if (step === 2) {
			items = districts;
		} else if (step === 3) {
			items = wards;
		}

		if (searchQuery.trim() === '') return items;

		return items.filter(item =>
			item.name.toLowerCase().includes(searchQuery.toLowerCase())
		);
	};

	const filteredItems = getFilteredItems();

	const handleItemSelect = (item) => {
		if (step === 1) {
			setSelectedCity(item);
			setStep(2);
			setSearchQuery('');
		} else if (step === 2) {
			setSelectedDistrict(item);
			setStep(3);
			setSearchQuery('');
		} else if (step === 3) {
			setSelectedWard(item);
			// Complete selection
			const completeAddress = {
				city: selectedCity,
				district: selectedDistrict,
				ward: item
			};

			done(completeAddress);
		}
	};

	const handleReset = () => {
		setSelectedCity(null);
		setSelectedDistrict(null);
		setSelectedWard(null);
		setStep(1);
		setSearchQuery('');
	};

	const handleBack = () => {
		if (step === 2) {
			setSelectedDistrict(null);
			setStep(1);
		} else if (step === 3) {
			setSelectedWard(null);
			setStep(2);
		}
		setSearchQuery('');
	};

	const getStepTitle = () => {
		if (step === 1) return t('city');
		if (step === 2) return t('district');
		if (step === 3) return t('ward');
	};

	const getSelectedText = () => {
		if (step === 1) return t('selectCity');
		if (step === 2) return t('selectDistrict');
		if (step === 3) return t('selectWard');
	};

	return (
		<div className="w-full bg-white rounded-t-2xl max-h-[90vh] flex flex-col">
			{/* Header */}
			<div className="flex items-center justify-between py-2">
				{/* Close/Back button */}
				<button
					onClick={step > 1 ? handleBack : close}
					className="p-3 hover:bg-gray-100 rounded-full transition-colors"
				>
					{step > 1 ? (
						// Back arrow
						<svg width="25" height="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M19 12H5M12 19L5 12L12 5" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
						</svg>
					) : (
						// Close X
						<svg width="25" height="25" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M10.5 3.5L3.5 10.5M3.5 3.5L10.5 10.5" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
						</svg>
					)}
				</button>

				{/* Title */}
				<h3 className="text-lg font-semibold text-[#333333] font-inter text-center flex-1">
					{t('title')}
				</h3>

				{/* Spacer */}
				<div className="w-11"></div>
			</div>

			{/* Breadcrumb Section */}
			<div className="px-4 pb-4">
				<div className="flex items-center justify-between mb-4">
					<span className="text-sm text-[#8A8A8A] font-inter">
						{t('selectedArea')}
					</span>
					<button
						onClick={handleReset}
						className="text-sm text-[#D2008C] font-semibold hover:underline"
					>
						{t('reset')}
					</button>
				</div>

				{/* Steps */}
				<div className="flex flex-col space-y-2">
					{/* City Step */}
					<div className="flex items-center space-x-4">
						<div className="flex items-center space-x-2">
							<div className={`w-2 h-2 rounded-full ${selectedCity ? 'bg-[#0000EA]' : 'bg-gray-300'}`}></div>
							{selectedCity && step > 1 && (
								<div className="w-0 h-6 border-l border-[#0000EA]"></div>
							)}
						</div>
						<span className={`text-sm font-inter ${selectedCity ? 'text-[#222222] font-medium' : 'text-[#D2008C]'}`}>
							{selectedCity ? selectedCity.name : t('selectCity')}
						</span>
					</div>

					{/* District Step */}
					{selectedCity && (
						<div className="flex items-center space-x-4">
							<div className="flex items-center space-x-2">
								<div className={`w-2 h-2 rounded-full ${selectedDistrict ? 'bg-[#0000EA]' : step === 2 ? 'border-2 border-[#0000EA] bg-white' : 'bg-gray-300'}`}></div>
								{selectedDistrict && step > 2 && (
									<div className="w-0 h-6 border-l border-[#0000EA]"></div>
								)}
							</div>
							<span className={`text-sm font-inter ${selectedDistrict ? 'text-[#222222] font-medium' : 'text-[#D2008C]'}`}>
								{selectedDistrict ? selectedDistrict.name : t('selectDistrict')}
							</span>
						</div>
					)}

					{/* Ward Step */}
					{selectedDistrict && (
						<div className="flex items-center space-x-4">
							<div className="flex items-center space-x-2">
								<div className={`w-2 h-2 rounded-full ${selectedWard ? 'bg-[#0000EA]' : step === 3 ? 'border-2 border-[#0000EA] bg-white' : 'bg-gray-300'}`}></div>
							</div>
							<span className={`text-sm font-inter ${selectedWard ? 'text-[#222222] font-medium' : 'text-[#D2008C]'}`}>
								{selectedWard ? selectedWard.name : t('selectWard')}
							</span>
						</div>
					)}
				</div>
			</div>

			{/* Search Bar */}
			<div className="px-4 pb-4">
				<div className="relative">
					<div className="flex items-center bg-white border border-[#DDDDDD] rounded-xl px-3 py-3">
						<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
							<circle cx="11" cy="11" r="8" stroke="#5C5C5C" strokeWidth="1.5" />
							<path d="21 21L16.65 16.65" stroke="#5C5C5C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
						</svg>
						<input
							type="text"
							placeholder="Tìm kiếm"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className="flex-1 outline-none text-base text-[#333333] placeholder-[#A1A1A1] font-inter"
						/>
					</div>
				</div>
			</div>

			{/* Section Title */}
			<div className="px-4 py-2 bg-[#F5F5F5]">
				<span className="text-sm font-medium text-[#8A8A8A] font-inter">
					{getStepTitle()}
				</span>
			</div>

			{/* Content List */}
			<div className="flex-1 overflow-y-auto min-h-0">
				{filteredItems.map((item) => (
					<button
						key={item.id}
						onClick={() => handleItemSelect(item)}
						className="w-full px-4 py-3 text-left border-b border-[#F1F1F1] hover:bg-gray-50 transition-colors"
					>
						<span className="text-base text-[#333333] font-inter">
							{item.name}
						</span>
					</button>
				))}

				{filteredItems.length === 0 && searchQuery && (
					<div className="px-4 py-8 text-center">
						<span className="text-[#A1A1A1] font-inter">
							{t('noResults')}
						</span>
					</div>
				)}
			</div>

			{/* Bottom Button */}
			<div className="p-4 bg-white border-t border-[#F1F1F1]">
				{/* <button
					onClick={() => selectedWard && handleItemSelect(selectedWard)}
					disabled={!selectedWard}
					className={`w-full py-3 px-6 rounded-lg font-semibold font-inter transition-colors ${
						selectedWard
							? 'bg-[#0000EA] text-white hover:bg-[#0000CC]'
							: 'bg-gray-300 text-[#A1A1A1] cursor-not-allowed'
					}`}
				>
					{t('confirm')}
				</button> */}

				{/* Home Indicator */}
				<div className="flex justify-center mt-3">
					<div className="w-35 h-1.5 bg-black rounded-full"></div>
				</div>
			</div>
		</div>
	);
};

export default AddressSelectionModal;