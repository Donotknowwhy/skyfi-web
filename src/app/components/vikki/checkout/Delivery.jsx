'use client';

import { useTranslations } from 'next-intl';
import { useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import ShipAddress from '../shipAddress';

const Delivery = () => {
    const { register, formState: { errors }, setValue, control } = useFormContext();
    const t = useTranslations('vikki.checkout.delivery');

    // Watch current form values to pass as initial values
    const [cityId, districtId, wardId] = useWatch({
        name: ['city_id', 'district_id', 'ward_id'],
        control
    });

    useEffect( () => {
        register( 'city_id', { required: true } );
        register( 'district_id', { required: true } );
        register( 'ward_id', { required: true } );
    }, [ register ] );

    return (
        <div className="bg-white rounded-[16px] p-4 shadow-[0px_2px_8px_0px_rgba(0,0,0,0.04)] mb-4">
            <h3 className="text-[18px] font-bold text-[#1C1C1E] font-inter mb-4">
                {t('title')}
            </h3>

            <div className="flex flex-col gap-4">
                <div>
                    <ShipAddress
                        initialCityId={cityId}
                        initialDistrictId={districtId}
                        initialWardId={wardId}
                        onSelect={ ( address ) => {
                            setValue( 'city_id', address?.city?.id );
                            setValue( 'district_id', address?.district?.id );
                            setValue( 'ward_id', address?.ward?.id );
                        } }
                    />
                    { ( errors.city_id || errors.district_id || errors.ward_id ) && (
                        <span className="text-xs text-red-500 font-inter mt-1  ">{t('selectAddressError')}</span>
                    ) }
                </div>

                <div className="flex flex-col gap-1 border rounded-xl px-4 py-3">
                    <label className="text-xs text-[#333333] font-inter font-normal font-semibold">
                        {t('detailedAddressLabel')} <span className="text-[#ED1B2F]">*</span>
                    </label>
                    <input
                        type="text"
                        { ...register( 'delivery_address', {
                            required: t('addressRequired'),
                            minLength: { value: 10, message: t('addressMinLength') }
                        } ) }
                        placeholder={t('addressPlaceholder')}
                        className={ `w-full text-[16px] font-inter text-[#333] focus:outline-none focus:border-[#0057FF] transition-all ${ errors.delivery_address ? 'border-red-500' : 'border-[#DDDDDD]' }` }
                    />
                    { errors.delivery_address && (
                        <span className="text-xs text-red-500 font-inter mt-1">{ errors.delivery_address.message }</span>
                    ) }
                </div>
            </div>
        </div>
    );
};

export default Delivery;
