import { useTranslations } from 'next-intl';
import { useRef } from 'react';
import { Controller, useFormContext, useWatch } from 'react-hook-form';
import Select from 'react-select';
import { useCities, useDistricts, useWards } from '../../hooks/useAddress';
import InputField from '../form/inputField';

const ShippingAddress = ( { fields, isHidden = false } ) => {
	const t = useTranslations( 'checkout' );
	const { control, setValue, resetField ,formState: { errors } } = useFormContext();
	const [ cityId, districtId, wardId, address ] = useWatch( {
		name: fields,
		control
	} );

	const provinces = useCities();
	const districts = useDistricts( cityId );
	const wards = useWards( districtId );


	const cityRef = useRef( null );
	const districtsRef = useRef( null );
	const wardsRef = useRef( null );

	const styleSelect = {
		option: ( base, state ) => ( {
			...base,
			color: 'rgb(24, 24, 24)',
			backgroundColor: state.isSelected ? 'rgb(241, 241, 242)' : 'white',
			borderRadius: '8px',
			padding: '10px 16px',
			':hover': {
				background: 'rgb(241, 241, 242)'
			}
		} ),
		control: ( base, props ) => ( {
			...base,
			padding: '2px 8px',
			borderRadius: '0.5rem'
		} ),
		container: ( base, props ) => ( {
			...base,
			marginTop: 12
		} )
	};

	const getValue = ( id, options ) => {
		return options.find( ( option ) => option.id == id ) ?? {};
	};

	if ( isHidden ) return null;

	return (
		<div className="bg-white rounded-[12px] p-[24px] mb-[24px]">
			<h2 className="font-inter font-semibold text-[22px] leading-[1.2em] text-[#333] mb-[16px]">{ t( 'shippingAddress.title' ) }</h2>

			<div className="flex flex-col gap-[16px]">
				{/* Province/City */ }
				<Controller control={ control } name={ fields[ 0 ] } render={
					( { field: { value, onChange, ...field } } ) => (
						<div className="flex flex-col gap-[4px]">
							<label className="flex font-inter text-[12px] text-[#333]">
								{ t( 'shippingAddress.province' ) } <span className="text-[#E60A32] font-bold">*</span>
							</label>
							<Select
								{ ...field }
								ref={ cityRef }
								styles={ styleSelect }
								placeholder={ t( 'shippingAddress.provincePlaceholder' ) }
								options={ provinces }
								value={ getValue( value, provinces ) }
								onChange={ ( selectedOption ) => {
									if ( selectedOption ) {
										onChange( selectedOption.id );
										resetField( fields[ 1 ] );
										resetField( fields[ 2 ] );
										resetField( fields[ 3 ] );

										districtsRef.current.focus();
										districtsRef.current.openMenu();

									}
								} }
							/>


							{ errors[ fields[ 0 ] ]?.message && <div className="text-xs text-[#E60A32]">{ errors[ fields[ 0 ] ]?.message }</div> }
						</div>
					)
				} />


				{/* Location Selectors Row */ }
				<div className="grid grid-cols-1 md:grid-cols-2 gap-[12px]">
					{/* District */ }

					<Controller control={ control } name={ fields[ 1 ] } render={
						( { field: { value, onChange, ...field } } ) => (
							<div className="flex flex-col gap-[4px]">
								<label className="flex font-inter text-[12px] text-[#333]">
									{ t( 'shippingAddress.district' ) } <span className="text-[#E60A32] font-bold">*</span>
								</label>
								<div className="relative">
									<Select
										{ ...field }
										ref={ districtsRef }
										styles={ styleSelect }
										placeholder={ t( 'shippingAddress.districtPlaceholder' ) }
										options={ districts }
										value={ getValue( value, districts ) }
										onChange={ ( selectedOption ) => {
											if ( selectedOption ) {
												onChange( selectedOption.id );
												resetField( fields[ 2 ] );
												resetField( fields[ 3 ] );
												wardsRef.current.focus();
												wardsRef.current.openMenu();

											}
										} }
									/>
								</div>
								{ errors[ fields[ 1 ] ]?.message && <div className="text-xs text-[#E60A32]">{ errors[ fields[ 1 ] ]?.message }</div> }
							</div> ) } />

					{/* Ward */ }
					<Controller control={ control } name={ fields[ 2 ] } render={
						( { field: { value, onChange, ...field } } ) => (
							<div className="flex flex-col gap-[4px]">
								<label className="flex font-inter text-[12px] text-[#333]">
									{ t( 'shippingAddress.ward' ) } <span className="text-[#E60A32] font-bold">*</span>
								</label>
								<Select
									{ ...field }
									ref={ wardsRef }
									styles={ styleSelect }
									placeholder={ t( 'shippingAddress.wardPlaceholder' ) }
									options={ wards }
									value={ getValue( value, wards ) }
									onChange={ ( selectedOption ) => {
										if ( selectedOption ) {
											onChange( selectedOption.id );
											resetField( fields[ 3 ] );


										}
									} }
								/>
								{ errors[ fields[ 2 ] ]?.message && <div className="text-xs text-[#E60A32]">{ errors[ fields[ 2 ] ]?.message }</div> }
							</div>
						) } />
				</div>

				{/* Address */ }
				<div className="flex flex-col gap-[4px]">
					<label className="flex font-inter text-[12px] text-[#333]">
						{ t( 'shippingAddress.address' ) } <span className="text-[#E60A32] font-bold">*</span>
					</label>
					<InputField control={ control } name={ fields[ 3 ] } placeholder={ t( 'shippingAddress.addressPlaceholder' ) } />
				</div>
			</div>
		</div>
	);
};

export default ShippingAddress;
