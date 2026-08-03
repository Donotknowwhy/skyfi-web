import Image from 'next/image';
import { useFormContext, useWatch } from 'react-hook-form';
import { useUserActions } from '@/app/stores/user';
import { toCurrency } from '@/app/utils/format';
import { useTranslations } from 'next-intl';

const ListProduct = () => {
	const t = useTranslations('vikki.cart');

	const { control } = useFormContext();
	const [sims] = useWatch({
		name: ['items'],
		control
	});
	return (
		<>
			<h3 className="font-inter font-bold text-[18px] leading-[24px] text-[#1C1C1E] mb-[12px]">{t('productHeader')}</h3>

			{/* Products List */}
			<div className="flex flex-col gap-4 pb-[50px]">
				{/* SIM Product */}
				{sims?.map((item, index) => (
					<ItemSimCheckout key={index} item={item} t={t} />
				))}
			</div>
		</>
	);
};

export default ListProduct;


export const ItemSimCheckout = ({ item, isDelete = false, t }) => {
	const { removeItem } = useUserActions();

	return (
		<div className="flex items-start gap-[12px] py-[8px]">
			{item.icon ? <img src={item.icon} alt={item.product_name} width={40} height={40} className="object-cover rounded-full w-[40px] h-[40px]" /> : (
				<div className="w-[40px] h-[40px] rounded-full flex items-center justify-center border border-[#E5E5E5] bg-[#F9FAFB]">
					<Image src="/images/simdata/iconsim.png" alt="SIM Icon" width={24} height={24} className="object-cover w-[24px] h-[24px]" />
				</div>)}
			<div className="flex-1">
				<div className="font-inter text-[16px] font-semibold text-[#1C1C1E]">{item.product_name}</div>
				{item.sim_type != 'ESIM_TRAVEL' && <div className="font-inter text-[14px] text-[#5C5C5C]">{item.sim_type === "USIM" ? t('physicalSim') : item.sim_type} </div>}
				<div className="font-inter text-[14px] text-[#5C5C5C]">{item.sim_type == 'ESIM_TRAVEL' ? item.pack_code : ''}</div>
				<div className="font-inter text-[14px] text-[#5C5C5C]">{item.sim_type == 'ESIM_TRAVEL' ? `${t('quantity')}: ` + item.quantity : item.pack_code ? `${t('package')}: ` + item.pack_code : ''}</div>
			</div>
			<div className="flex flex-col items-end">
				{item.sim_type != 'ESIM_TRAVEL' && item.total_base_price > item.total_price && <span className="font-inter text-[12px] text-[#8A8A8A] line-through">{toCurrency(item.total_base_price)}</span>}

				<span className="font-inter font-bold text-[16px] text-[#1C1C1E]">{toCurrency(item.total_price)}</span>
			</div>
			{/* Delete icon */}
			{isDelete && <button
				className="focus:outline-none w-[20px] h-[20px]"
				onClick={(e) => {
					e.preventDefault();
					e.stopPropagation();
					removeItem(item.id);
				}}
			>
				<Image src="/assets/trash-icon.svg" width={24} height={24} alt="Xóa" className='w-full h-full object-contain' />
			</button>}
		</div>
	);

};
