export const simPriceTotal = ( sim, simType, packPrice, isVikkiGift = false ) => {
	if (isVikkiGift) {
		return {
			base_price: 0,
			sale_price: 0,
		};
	}
	return {
		base_price: basePriceSim( sim, simType, isVikkiGift ) + packPrice,
		sale_price: priceSim( sim, simType, isVikkiGift ) + packPrice,
	};

};
export const priceSim = ( sim, simType = 'USIM', isVikkiGift = false ) => {
	if (isVikkiGift) return 0;
	return simType === 'USIM' ?
		sim.sale_price + sim.usim_price + sim.network_price :
		sim.sale_price + sim.esim_price + sim.network_price;


};
export const basePriceSim = ( sim, simType = 'USIM', isVikkiGift = false ) => {
	if (isVikkiGift) return 0;
	return simType === 'USIM' ?
		sim.base_price + sim.usim_price + sim.network_price :
		sim.base_price + sim.esim_price + sim.network_price;
};
