import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useFormContext, useWatch } from 'react-hook-form';
import { useUserActions } from '../../stores/user';
import { toCurrency } from '../../utils/format';
const ListProduct = () => {
	const t = useTranslations( 'checkout' );
	const { control } = useFormContext();
	const [ sims ] = useWatch( {
		name: [ 'items' ],
		control
	} );
	return (
		<>
			<h3 className="font-inter font-semibold text-[18px] leading-[1.44em] text-[#333] mb-[8px]">{ t( 'orderSummary.products' ) }</h3>

			{/* Products List */ }
			<div>
				{/* SIM Product */ }
				{ sims?.map( ( item, index ) => (
					<ItemSimCheckout key={ index } item={ item } />
				) ) }
			</div>
		</>
	);
};

export default ListProduct;


export const ItemSimCheckout = ( { item, isDelete = false } ) => {
	console.log( 'item', item );

	const tData = useTranslations( 'simData' );
	 const {removeItem} = useUserActions();


	return (
		<div className="flex items-center gap-[12px] py-[8px]">
			{ item.icon ? <img src={ item.icon } alt={ item.product_name } width={ 40 } height={ 40 } className="object-cover rounded-full w-[40px] h-[40px]" /> : (
				<div className="w-[40px] h-[40px] rounded-full flex items-center justify-center border border-[#DDDDDD]">
			<Image src="/images/simdata/iconsim.png" alt="SIM Icon" width={ 24 } height={ 24 } className="object-cover w-[24px] h-[24px]" />
				</div> ) }
			<div className="flex-1">
				<div className="font-inter text-[14px] font-bold text-[#333]">{ item.product_name }</div>
				{ item.sim_type != 'ESIM_TRAVEL' && <div className="font-inter text-[14px] text-[#333]">{ item.sim_type==="USIM"? tData( 'simSection.physicalSim' ) :item.sim_type } </div> }
				<div className="font-inter text-[14px] text-[#333]">{ item.sim_type == 'ESIM_TRAVEL' ? item.pack_code :'' }</div>
				<div className="font-inter text-[14px] text-[#333]">{ item.sim_type == 'ESIM_TRAVEL' ? `${tData( 'quantity' )}: ` + item.quantity : item.pack_code ? `${tData( 'package' )}: ` + item.pack_code : '' }</div>
			</div>
			<div className="flex flex-col items-end">
				{ item.sim_type != 'ESIM_TRAVEL' && item.total_base_price > item.total_price && <span className="font-inter text-[14px] text-[#A1A1A1] line-through">{ toCurrency( item.total_base_price ) }</span> }

				<span className="font-inter font-medium text-[16px] text-[#333]">{ toCurrency( item.total_price ) }</span>
			</div>
			{/* Delete icon */ }
			{ isDelete && <button
				className="focus:outline-none w-[20px] h-[20px]"
				onClick={ (e) => {
					e.preventDefault();
					e.stopPropagation();
					removeItem( item.id );
				} }
			>
				<Image src="/assets/trash-icon.svg" width={ 24 } height={ 24 } alt="Xóa" className='w-full h-full object-contain' />
			</button> }
		</div>
	);

};
