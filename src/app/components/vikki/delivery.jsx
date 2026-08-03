'use client';

import { useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import ShipAddress from './shipAddress';

const Delivery = () => {
    const { control, register, formState: { errors }, setValue } = useFormContext();


    const isSim = useWatch( { control, name: 'dataSim.isSim' } );

    if ( isSim == '1' ) return null;

    useEffect( () => {
        register( 'data.city', { value: '', required: true } );
        register( 'data.district', { value: '', required: true } );
        register( 'data.ward', { value: '', required: true } );
    }, [ register ] );

    return (
        <div className="flex flex-col gap-6 w-full mt-4">


            {/* Delivery Address Section */ }
            <div className="bg-white p-4 shadow-md rounded-lg">
                <h3 className="text-lg font-semibold text-[#333333] font-inter mb-2">
                    Địa chỉ nhận SIM
                </h3>

                <div className="space-y-4">

                    <ShipAddress onSelect={ ( address ) => {
                        setValue( 'data.city', address?.city?.id );
                        setValue( 'data.district', address?.district?.id );
                        setValue( 'data.ward', address?.ward?.id );
                    } } />
                    { ( errors.data?.city || errors.data?.district || errors.data?.ward ) && (
                        <span className="text-xs text-red-500 font-inter">Vui lòng chọn địa chỉ nhận SIM</span>
                    ) }

                    <div className="flex flex-col gap-2 border rounded-xl px-4 py-3">
                        <label className="text-sm font-medium text-[#333333] font-inter">
                            Địa chỉ chi tiết <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            { ...register( 'data.deliveryAddress', {
                                required: 'Vui lòng nhập địa chỉ giao hàng',
                                minLength: { value: 10, message: 'Địa chỉ phải có ít nhất 10 ký tự' }
                            } ) }
                            placeholder="Số nhà, tên đường, tòa nhà..."
                            className={ `w-full text-sm font-inter placeholder-[#A1A1A1] focus:outline-none focus:ring-2 focus:ring-[#0000EA] focus:border-transparent transition-all ${ errors.data?.deliveryAddress ? 'border-red-500' : 'border-[#E5E5E5]' }` }
                        />
                    </div>
                        { errors.data?.deliveryAddress && (
                            <span className="text-xs text-red-500 font-inter">{ errors.data.deliveryAddress.message }</span>
                        ) }


                </div>
            </div>
        </div>
    );
};

export default Delivery;
