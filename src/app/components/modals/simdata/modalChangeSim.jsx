'use client';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import SimDataService from '../../../services/simDataService';
import { isMobile } from '../../../utils/device';
import { formatPhoneNumber, toCurrency } from '../../../utils/format';
import { useLoad } from '../../../utils/load';
import { modal, useModal } from '../../../utils/modal';
import Button from '../../form/button';
import InputSearchNumber from '../../form/inputSreachNumber';

const ModalChangeSim = () => {
  const t = useTranslations( 'phoneNumberModal' );
  const { done, close: closeModal } = useModal();
  const [ listSim, setListSim ] = useState( [] );
  const [ selectedSim, setSelectedSim ] = useState( null );
  const [isListSim, setIsListSim] = useState(false);
  const { open, close } = useLoad();


  const getListSim = async ( query ) => {
    try {
      open();
      const res = await SimDataService.searchSim(
        {
          filters: {
            search: query ? '070' + ( query || '' ) : '',
          },
          page: 1,
          pageSize: 20
        }
      );
      setListSim( ( data ) => {
        if ( res.length <= 0 ) {
          return data;
        }
        return res;
     } );
      setIsListSim(res.length > 0);
    } catch ( error ) {
      console.error( 'Error fetching sim data:', error );
    } finally {
      close();
    }
  };



  useEffect( () => {
    getListSim();
  }, [] );

  const handleSearch = ( query ) => {
    getListSim( query );
  };


  const handleSimSelect = ( id ) => {
    setSelectedSim( id );
  };

  const handleConfirm = () => {

    if ( selectedSim ) {
      const selected = listSim.find( sim => sim.msisdn_id === selectedSim );
      done( selected );
    }
  };

  return (

    <div
      className="bg-white rounded-xl w-full  overflow-hidden flex flex-col"
    >
      {/* Header with close button */ }
      <div className="flex justify-end p-3 sm:p-4 md:p-5">
        <button onClick={ closeModal } className="hover:opacity-70 transition-opacity p-1">
          <Image src="/assets/x-close.svg" alt="Close" width={ 20 } height={ 20 } className="w-5 h-5 md:w-6 md:h-6" />
        </button>
      </div>
      {/* Modal content */ }
      <div className=" sm:px-6 md:px-10 pb-6 md:pb-10 flex flex-col items-center">
        {/* Title */ }
        <div className="w-full mb-3 sm:mb-4 md:mb-5">
          <h2 className="text-xl md:text-2xl font-semibold text-neutral-900">{ t( 'title' ) }</h2>
        </div>
        {/* Search section */ }
        <InputSearchNumber onSearch={ handleSearch } prefix='x' number={7} />

        {/* No results message */ }
        { !isListSim  && (
          <div className="w-full text-center text-neutral-500 flex flex-col items-center mb-6">
           <Image src="/images/simdata/no_search.svg" alt="No data" width={ 50 } height={ 50 } className="w-20 h-20 mb-2" />
            <p className="text-sm">{ t( 'noResults' ) }</p>
          </div>
        ) }

        {/* SIM options list */ }
        <div className="w-full flex flex-col gap-3 md:gap-4 overflow-y-auto max-h-[250px] sm:max-h-[350px] md:max-h-[450px] pr-1 sm:pr-2">
          { listSim.map( ( sim ) => (
            <SimOption
              key={ sim.msisdn_id }
              sim={ sim }
              isSelected={ selectedSim === sim.msisdn_id }
              onSelect={ handleSimSelect }
            />
          ) ) }
        </div>

        {/* Confirm button */ }
        <Button  label={t('confirmButton')} onClick={handleConfirm} disabled={!selectedSim} />

      </div>
    </div>

  );
};

export default ModalChangeSim;

export const showModalChangeSim = ( { onChange } ) => {

  modal.open( {
    render: <ModalChangeSim />,
    onClose: onChange,
    onDone: onChange,
    closeButton: false,
    boxClassName: 'xl:max-w-3xl lg:max-w-2xl',
    typeModal: isMobile() ? 'sheet' : 'default',


  } );
};


const SimOption = ( { sim, isSelected, onSelect } ) => {
  const base_price = sim.base_price;
  const sale_price = sim.sale_price;
  return (
    <div

      className={ clsx( 'border rounded-xl p-3 sm:p-4 relative cursor-pointer shadow-sm', {
        'border-primary': isSelected,
        'border-[#F1F1F1]': !isSelected,
      } ) }
      onClick={ () => onSelect( sim.msisdn_id ) }
    >
      <h3 className="text-lg sm:text-xl font-semibold text-neutral-800 pr-8">{ formatPhoneNumber(sim.msisdn) }</h3>
      <hr className="my-1 border-[#F1F1F1]" />
      <div className="flex items-center">
        {  sale_price < base_price ? (
          <>
            <span className="text-[10px] sm:text-xs text-[#A1A1A1] line-through mr-1">{toCurrency( base_price )}</span>
            <span className="text-sm sm:text-base font-medium text-[#ED1B2F]">{ toCurrency( sale_price ) }</span>
          </>
        ) : (
          <span className="text-sm sm:text-base font-medium text-gray-600">{ toCurrency( sale_price ) }</span>
        ) }
      </div>
      <div className="absolute right-3 sm:right-4 top-3 sm:top-4">
        { isSelected ? (
          <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border border-primary flex items-center justify-center">
            <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-primary"></div>
          </div>
        ) : (
          <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border border-gray-600"></div>
        ) }
      </div>
    </div>
  );
};
