'use client';
import InfoSim from '@/app/components/vikki/infoSim';
import ListPackage from '@/app/components/vikki/ListPackage';
import { useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { showModalMessVikki } from '../../components/modals/modalMess';
import { ShippingNote, WarningNote } from '../../components/vikki/note';
import VikkiService from '../../services/vikkiService';
import { useLoad } from '../../utils/load';

export const PageSim = () => {
	const load = useLoad();
	const method = useFormContext();

	const phone = useWatch({ control: method.control, name: 'dataSim.msisdn' });


	const getSimRandom = async () => {

		try {
			load.open();
			const res = await VikkiService.getSimRandom();
			const { packages, ...data } = res;
			method.setValue('dataSim', { ...data, isSim: '1' });


		} catch (error) {
			console.error('Error fetching random sim data:', error);
			showModalMessVikki({
				label: 'Thông báo',
				message: 'Không thể tải thông tin SIM. Vui lòng thử lại.',
				type: 'error',
			});
		}
		finally {
			load.close();
		}
	};

	const getListPackage = async () => {
		if (!phone) return;
		try {
			load.open();
			const res = await VikkiService.getPackageSim(phone);
			method.setValue('listPackage', res || []);
			const vikkiPackage = res?.find((pkg) => pkg.vikki_event && pkg.is_default === 1);
			const defaultPackage = res?.find((pkg) => pkg.is_default === 1);
			if (vikkiPackage) {
				method.setValue('dataSim.package', vikkiPackage.code);
				method.setValue('dataSim.packagePrice', vikkiPackage.sale_price);
			} else if (defaultPackage) {
				method.setValue('dataSim.package', defaultPackage.code);
				method.setValue('dataSim.packagePrice', defaultPackage.sale_price);
			}

		} catch (error) {
			console.error('Error fetching list package:', error);
			showModalMessVikki({
				label: 'Thông báo',
				message: 'Không thể tải danh sách gói cước. Vui lòng thử lại.',
				type: 'error',
			});
			setListPackage([]);
		} finally {
			load.close();
		}
	};


	useEffect(() => {
		getSimRandom();
	}, []);

	useEffect(() => {
		getListPackage();
	}, [phone]);
	return (
		<div>
			<InfoSim />
			<ListPackage />

			<ShippingNote className={"mt-4"}>
				SIM sẽ được gửi tới bạn sau khi hồ sơ được duyệt thành công (từ 15/10 đến 20/10)
			</ShippingNote>

			<WarningNote className={"mt-4"}>
				Khi kích hoạt, số thuê bao bạn chọn sẽ được liên kết vào tài khoản Vikki để nhận OTP và tin nhắn CSKH của Vikki Bank
			</WarningNote>
		</div>
	);
};
