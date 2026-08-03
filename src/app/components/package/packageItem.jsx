import { useTranslations } from "next-intl";
import Image from "next/image";
import { usePackage } from "../../hooks/usePackage";
import { toCurrency } from "../../utils/format";
import Button from "../form/button";


const PackageItem = ( {
  pack
} ) => {

  const { openCheckPackageModal, openPackDetailModal } = usePackage();
  const t = useTranslations( 'simData.itemPackage' );


  const getCycleText = ( cycle ) => {
    switch ( cycle ) {
      case 'D': return 'ngày';
      case 'W': return 'tuần';
      case 'M': return 'tháng';
      default: return 'tháng';
    }
  };

  // Helper function to get data display
  const getDataDisplay = ( pack ) => {
    if ( pack.data_per_day ) {
      return `${ pack.data_per_day }GB/ngày`;
    } else if ( pack.data_per_month ) {
      return `${ pack.data_per_month }GB/tháng`;
    }
    return 'Unlimited';
  };



  return (
    <div
      className={ `bg-white rounded-[12px] flex-1 basis-[280px] max-w-[332px]  border border-[#F1F1F1] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.02),0px_1px_6px_-1px_rgba(0,0,0,0.05),0px_1px_2px_0px_rgba(0,0,0,0.12)]  flex flex-col justify-center gap-[8px] p-[20px_16px] relative cursor-pointer` }
    >

      <div className=" flex flex-col gap-2 border-b border-[#F1F1F1] pb-2">
        <div className="font-inter font-semibold text-[22px] text-[#333]">{ pack.name } - { pack.validity_day } { t( 'day' ) }</div>
        <div className="flex flex-row items-center gap-1 ">
          <Image src={ '/assets/home/iconData.png' } alt={ pack.name } width={ 30 } height={ 30 } />
          <div className="font-inter text-[14px] text-[#5C5C5C] ml-[8px]">Data: <span className="font-bold">{ pack.data_per_day!==0?pack.data_per_day:pack.data_per_month }GB/{pack.data_per_day!==0?'':pack.validity_day }  {t( 'day' ) }</span></div>
        </div>
      </div>
      <div className="flex flex-col gap-2 mt-auto">

        { pack.description?.map( ( feature, index ) => (
          <div key={ index } className="flex flex-row items-center  gap-[8px] w-full">

            <svg width="16" height="16" className="w-[16px] h-[16px]" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13.3332 4L5.99984 11.3333L2.6665 8" stroke="currentColor" className="text-primary" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <span className={ `font-inter flex-1 text-[14px] text-[#5C5C5C]` } dangerouslySetInnerHTML={ { __html: feature } } />
          </div>
        ) ) }
      </div>
      <button className="text-blue-500 underline mt-4 font-semibold text-start  hover:text-blue-800" onClick={ () => openPackDetailModal( pack, true ) } >{ t( 'detail' ) }</button>
      <div className="w-full h-[1px] bg-[#F1F1F1] my-1"></div>
      <div className="flex   items-center justify-between gap-[4px]">
        <div className="flex ">
          <div className="flex flex-col">
            <span className={ `font-inter font-semibold text-[16px] text-[#ED1B2F]` }>{ toCurrency( pack.sale_price ) } </span>
            { pack.price > pack.sale_price && (
              <span className="font-inter text-[12px] line-through text-[#A1A1A1]">{ toCurrency( pack.price ) } </span>
            ) }
          </div>
          <span className="font-inter text-[14px] text-[#5C5C5C]">/ { pack.validity_day } { t( 'day' ) }</span>
        </div>
        <Button
          className="max-w-fit !px-4 !py-2"
          onClick={ () => openCheckPackageModal( pack ) }
          label={ t( 'register' ) }
        />

      </div>
    </div>
  );
};

export default PackageItem;
