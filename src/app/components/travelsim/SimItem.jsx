"use client";

import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { toCurrency } from '../../utils/format';
import { showModalRegions } from '../modals/travelSim/modalRegions';



export default function SimItem( {
    title = "SIM du lịch 55 quốc gia",
    subtitle = "chi tiết Xem tại đây",
    initialQuantity = 1,
    minQuantity = 1,
    maxQuantity = 10,
    showFreeTag = true,
    freeTagText,
    onQuantityChange = () => {},
    className = "",
    disabled = false
} ) {
    const [ quantity, setQuantity ] = useState( initialQuantity );
    const t = useTranslations( 'travelSim.simItem' );

    const displayFreeText = freeTagText || t( 'free' );

    const handleDecrease = () => {
        if ( quantity > minQuantity && !disabled ) {
            const newQuantity = quantity - 1;
            setQuantity( newQuantity );
            onQuantityChange( newQuantity );
        }
    };


    const convertSubtitle = ( subtitle ) => {
        return subtitle.split( '\n' ).map( ( line, index ) => (
            <span key={ index } className="block">
                { line.split( '#' ).map( ( part, i ) => (
                    <span key={ i } className={ i === 0 ? '' : 'text-primary' } onClick={ showModalRegions }>
                        { part }
                    </span>
                ) ) }
            </span>
        ) );
    };

    useEffect( () => {
        setQuantity( initialQuantity );
    }, [ initialQuantity ] );

    const handleIncrease = () => {
        if ( quantity < maxQuantity && !disabled ) {
            const newQuantity = quantity + 1;
            setQuantity( newQuantity );
            onQuantityChange( newQuantity );
        }
    };

    return (
        <div className={ clsx(
            "flex flex-row items-start md:items-center gap-3 md:gap-3 py-2",
            className
        ) }>
            {/* Mobile: SIM Icon and Product Info Row */ }
            <div className="flex items-center gap-3 w-full md:flex-1">
                {/* SIM Icon Container */ }
                <div className="hidden md:block flex-shrink-0">
                    <div className="w-[54px] h-[54px] bg-[#E4262B] rounded-xl flex items-center justify-center relative overflow-hidden">
                        <Image src="/images/simdata/iconsim.png" alt="icon" width={ 54 } height={ 54 } className="object-cover w-full h-full" />
                    </div>
                </div>

                {/* Product Info Section */ }
                <div className="flex-1 md:max-w-[400px]">
                    <div className="text-sm md:text-base font-semibold md:font-normal text-[#333333] leading-6">
                        { title }
                    </div>
                    <div className=" hidden md:block text-sm md:text-base font-normal text-[#333333] leading-6">
                        { convertSubtitle( subtitle ) }
                    </div>
                </div>
            </div>

            {/* Mobile: Quantity and Price Row / Desktop: Inline */ }
            <div className="flex-1 items-center justify-between w-full md:flex-1  gap-4">
                {/* Quantity Selector Section */ }
                <div className="flex items-center">

                    <div className="flex items-center gap-2">
                        {/* Decrease Button */ }
                        <button
                            onClick={ handleDecrease }
                            disabled={ quantity <= minQuantity || disabled }
                            className={ clsx(
                                "w-6 h-6 md:w-8 md:h-8 rounded-full border-[1.5px] flex items-center justify-center transition-colors",
                                quantity <= minQuantity || disabled
                                    ? "border-[#DDDDDD] text-[#DDDDDD] cursor-not-allowed"
                                    : "bg-primary text-white hover:border-primary hover:text-primary border-primary"
                            ) }
                            aria-label={ t( 'decrease' ) }
                        >
                            <MinusIcon className="w-4 h-4" />
                        </button>

                        {/* Quantity Display */ }
                        <div className="w-8 text-center">
                            <span className="text-base font-semibold text-[#333333]">
                                { quantity }
                            </span>
                        </div>

                        {/* Increase Button */ }
                        <button
                            onClick={ handleIncrease }
                            disabled={ quantity >= maxQuantity || disabled }
                            className={ clsx(
                                "w-6 h-6 md:w-8 md:h-8 rounded-full border-[1.5px] flex items-center justify-center transition-colors",
                                quantity >= maxQuantity || disabled
                                    ? "border-[#DDDDDD] text-[#DDDDDD] cursor-not-allowed"
                                    : "bg-primary text-white hover:border-primary border-primary hover:text-primary"
                            ) }
                            aria-label={ t( 'increase' ) }
                        >
                            <PlusIcon className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Price/Free Tag Section */ }
            </div>
                <div className="flex-1 items-center hidden md:flex  ">
                    { quantity == 0 ? (
                        <span className="text-sm md:text-base font-semibold text-[#333333] leading-6">
                            { displayFreeText }
                        </span>
                    ) : (
                        <span className="text-sm md:text-base font-semibold text-[#333333] leading-6">
                            { toCurrency( 70_000 * ( quantity ) ) }
                        </span>
                    ) }
                </div>
        </div>
    );
}
