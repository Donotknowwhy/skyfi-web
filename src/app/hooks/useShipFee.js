import { useEffect, useState } from "react";
import CheckoutService from "../services/checkoutService";
import { showModalMess } from "../components/modals/modalMess";

export const useShipFee = (params) => {
	const [shipFee, setShipFee] = useState({});


	const getShipFee = async (params) => {
		if (!params.hasPhysicalSim) {
			setShipFee({});
			return;
		}
		if (
			!params.city_id ||
			!params.district_id ||
			!params.ward_id ||
			!params.delivery_address
		) {
			setShipFee({});
			return;
		}

		try {
			const res = await CheckoutService.getFeeShipping(params);
			if (res) {
				setShipFee(res);
			}
			else {
				showModalMess({
					label: 'Thông báo',
					type: 'error',
					message: res?.message || 'Không thể tính phí vận chuyển',
					labelConfirm: 'Đóng',

				})
				setShipFee({});
			}

		} catch (err) {
			console.log('Error fetching shipping fee:', err.message);
			setShipFee({});
		}
	};


	useEffect(() => {
		getShipFee(params);
	}, [params.city_id, params.district_id, params.ward_id, params.delivery_address, params.hasPhysicalSim]);

	return shipFee ?? {};
};
