"use client";


import { toCurrency } from '@/app/utils/format';
import { useFormContext, useWatch } from 'react-hook-form';
import { priceSim } from '../../utils/calculate';



export default function TotalSummary( { className = '' } ) {
    const { control } = useFormContext();

    const data = useWatch( { control, name: 'dataSim' } );
    const isSim = useWatch( { control, name: 'dataSim.isSim' } );
    const simTypeSelect = isSim === '1' ? 'ESIM' : 'USIM';

    console.log('data', data);

    const items = [
        {
            id: 1,
            label: 'Bộ hòa mạng',
            value: data?.msisdn,
            originalPrice: priceSim( data, simTypeSelect ),
            price:0,
            type: 'network_package'
        },
        {
            id: 3,
            label: 'Gói cước',
            value: data?.package || '',
            originalPrice: data?.packagePrice ||0 ,
            price: 0,
            // originalPrice: sale_price,
            // discount: sale_price ? `Tiết kiệm ${toCurrency(sale_price - (packagePrice || 0))}` : null,
            type: 'plan'
        },
        isSim === '0' ? {
            id: 2,
            label: 'Phí vận chuyển',
            value: '',
            price: 25000,
        } : null
    ];

    let totalPrice = items.reduce( ( total, item ) => total + ( item?.originalPrice || 0 ), 0 );

    return (
        <div className={ `bg-white rounded-xl p-4 mt-4 ${ className } ` }>
            {/* Header */ }
            <div className="mb-4">
                <h3 className="text-lg font-semibold text-[#333333] leading-[1.44]">
                    Quà tặng của bạn
                </h3>
            </div>

            {/* Items List */ }
            <div className="space-y-1.5">
                { items.map( ( item ) => {
                    if ( !item ) return null;
                    return (
                        <div key={ item.id } className="flex justify-between items-end py-2 border-b border-[#F1F1F1] last:border-b-0">
                            {/* Left side - Label and Value */ }
                            <div className="flex  gap-1 flex-1">
                                <span className="text-sm text-[#333333] font-normal flex-1">
                                    { item.label }
                                </span>
                                <span className="text-sm text-[#333333] font-medium flex-1">
                                    { item.value }
                                </span>
                            </div>

                            {/* Right side - Price */ }
                            <div className="flex flex-col items-end gap-1">
                                { item.originalPrice && item.originalPrice > item.price  ? (
                                    <span className="text-sm text-[#8C8C8C] font-medium line-through">
                                        { toCurrency( item.originalPrice ) }
                                    </span>
                                ) : null }
                                <span className="text-sm text-[#333333] font-medium">
                                    { toCurrency( item.price ) }
                                </span>
                            </div>
                        </div>
                    );
                } ) }

                {/* Promotional Section */ }
                <div className="flex justify-between items-center py-1">
                    <div className="bg-[#F0F0F0] px-2.5 py-2 rounded-md">
                        <span className="text-sm font-bold text-[#FF8A00]">
                            VIKKI SkyFi 100%
                        </span>
                    </div>
                    <span className="text-sm text-[#8C8C8C] font-medium line-through">
                        { toCurrency( totalPrice ) }
                    </span>
                </div>

                {/* Total Row */ }
                <div className="flex justify-between items-center pt-4">
                    <span className="text-base font-bold text-[#333333]">
                        Tổng cộng
                    </span>
                    <span className="text-lg font-semibold text-[#0000FF]">
                        { toCurrency( isSim === '0' ? 25000 : 0 ) }
                    </span>
                </div>
            </div>
        </div>
    );
}
