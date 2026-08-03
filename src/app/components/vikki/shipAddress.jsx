'use client';

/**
 * ShipAddress component for the Vikki interface
 *
 * @component
 * @param {Function} [props.onSelect] - Custom back button click handler
 * @param {number} [props.initialCityId] - Initial city ID to restore
 * @param {number} [props.initialDistrictId] - Initial district ID to restore
 * @param {number} [props.initialWardId] - Initial ward ID to restore
 *
 */

import { useCities, useDistricts, useWards } from '@/app/hooks/useAddress';
import { modal } from '@/app/utils/modal';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import AddressSelectionModal from './modals/AddressSelectionModal';

const ShipAddress = ({ onSelect, initialCityId, initialDistrictId, initialWardId }) => {
	const t = useTranslations('vikki.shipAddress');
	const [selectedAddress, setSelectedAddress] = useState(null);

	// Load address data for restoration
	const cities = useCities();
	const districts = useDistricts(initialCityId);
	const wards = useWards(initialDistrictId);

	// Restore selected address from initial values
	useEffect(() => {
		if (initialCityId && initialDistrictId && initialWardId &&
			cities.length > 0 && districts.length > 0 && wards.length > 0) {
			const city = cities.find(c => c.id === initialCityId);
			const district = districts.find(d => d.id === initialDistrictId);
			const ward = wards.find(w => w.id === initialWardId);

			if (city && district && ward) {
				setSelectedAddress({ city, district, ward });
			}
		}
	}, [initialCityId, initialDistrictId, initialWardId, cities, districts, wards]);

	// Handle address selection from modal
	const handleAddressSelect = (address) => {
		setSelectedAddress(address);
		onSelect?.(address);
		console.log('Selected address:', address);

	};

	// Handle opening address selection modal
	const handleOpenAddressModal = () => {
		modal.open({
			render: <AddressSelectionModal />,
			boxClassName: '!p-2 -mx-4',
			classContainer: '!p-0 relative top-10',
			onDone: handleAddressSelect
		});
	};

	// Format address display text
	const getAddressDisplayText = () => {
		if (!selectedAddress) {
			return t('placeholder');
		}

		const { city, district, ward } = selectedAddress;
		return `${ward?.name}, ${district?.name}, ${city?.name}`;
	};

	return (
		<div className="flex flex-col gap-1 w-full border rounded-xl px-3 py-2 border-[#F1F1F1] relative">
			{/* Label */}
			<div className="flex items-center gap-1">
				<span className="text-xs text-[#333333] font-inter font-normal">
					{t('label')}
				</span>
				<span className="text-sm text-[#ED1B2F] font-inter">
					*
				</span>
			</div>

			{/* Address Input Field */}
			<button
				type="button"
				onClick={handleOpenAddressModal}
				className="flex items-center justify-between w-full  bg-white   rounded-xl hover:border-[#D2008C] transition-colors"
			>
				<span className={`text-base text-start font-inter pr-4 ${selectedAddress ? 'text-[#333333]' : 'text-[#A1A1A1]'
					}`}>
					{getAddressDisplayText()}
				</span>

				{/* Chevron Down Icon */}

			</button>
			<div className='absolute top-1/2 -translate-y-1/2 right-2'>
				<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path d="M6 9L12 15L18 9" stroke="#D2008C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
				</svg>
			</div>
		</div>
	);
};

export default ShipAddress;