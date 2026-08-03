'use client';
import Steps from '@/app/components/vikki/steps';
import ModalProvider from '@/app/utils/modal';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { FormProvider, useForm, useFormContext, useWatch } from 'react-hook-form';
import { showModalMessVikki } from '../components/modals/modalMess';
import AppBar from '../components/vikki/appbar';
import useMyEsim from '../hooks/useMyEsim';
import VikkiService from '../services/vikkiService';
import { convertDataSimCheckoutVikki, convertSimVikki } from '../utils/format';
import { LoadProvider, useLoad } from '../utils/load';
import PageContent from './pageVikki/pageContent';

const BottomButton = () => {
	const method = useFormContext();
	const router = useRouter();
	const load = useLoad();
	const { showDevicesEsimVikki } = useMyEsim();
	const step = useWatch({
		control: method.control,
		name: 'step'
	});
	const dataSim = useWatch({ control: method.control, name: 'dataSim' });
	const handleNext = async (dataForm) => {
		const { dataSim, data } = dataForm;

		try {
			switch (step) {
				case 0:
					if (!dataSim || !dataSim.package) throw new Error('Vui lòng chọn gói cước');
					method.setValue('step', 1);
					break;
				case 1:
					load.open();
					const sim = convertSimVikki(dataSim);
					const param = convertDataSimCheckoutVikki(data, sim);
					const res = await VikkiService.createOrder(param);
					if (res && !res.success) {
						throw new Error(res.message || 'Đăng ký không thành công. Vui lòng thử lại.');
					}

					router.push(`/vikki/result?type=${dataSim.isSim}`);

					break;
				default:
					break;
			}
		} catch (error) {
			showModalMessVikki({
				label: 'Thông báo',
				message: error.message || 'Đã có lỗi xảy ra. Vui lòng thử lại.',
				type: 'error',
			});
		}
		finally {
			load.close();
		}
	};

	return (
		<div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 z-50">
			<div className="max-w-md mx-auto">
				{dataSim.isSim == 1 && step == 1 && (
					<div className="flex items-center gap-2 mb-2">
						<input
							type="checkbox"
							id="compatible"
							{...method.register("dataSim.compatible", {
								required: 'Vui lòng xác nhận thiết bị tương thích với eSIM',
							})}
							className="w-5 h-5 border border-gray-400 rounded bg-white focus:ring-2 focus:ring-blue-500"
						/>
						<label
							htmlFor="compatible"
							className="text-sm text-gray-800 font-normal"
						>
							Thiết bị của tôi là <span className="font-semibold text-[#D2008C]" onClick={showDevicesEsimVikki}>tương thích với eSIM</span>
						</label>
					</div>
				)}
				{method.formState.errors.dataSim?.compatible && (
					<span className="text-xs text-red-500 font-inter">{method.formState.errors.dataSim.compatible.message}</span>
				)}
				<button
					onClick={method.handleSubmit(handleNext)}
					className="w-full mt-2  btnvikki py-3 rounded-full text-white font-semibold text-base transition-all hover:scale-[1.02] active:scale-[0.98]"
				>
					Tiếp theo
				</button>
			</div>
		</div>
	);
};

export default function VikkiClient({ token }) {
	const router = useRouter();

	const method = useForm({
		defaultValues: {
			step: 0,
			data: {},
			dataSim: {},
			listPackage: [],
		}
	});

	const getData = async () => {
		if (!token) {
			router.push('/vikki');
			return;
		}
		try {
			localStorage.setItem('token', token || '');
			const res = await VikkiService.getDataByToken(token);
			if (res) {
				method.setValue('data.email', res.email);
				method.setValue('data.phoneNumber', res.phoneNumber);
				method.setValue('data.fullName', res.fullName);
			} else {
				router.push('/vikki');
			}


		} catch (error) {
			router.push('/vikki');
		}
	};

	const step = useWatch({
		control: method.control,
		name: 'step'
	});


	const title = {
		0: 'Nhận quà tặng/Chọn số',
		1: 'Nhận quà tặng/Địa chỉ',
		2: 'Đăng ký',
	};
	useEffect(() => {
		getData();
	}, [token]);

	return (
		<FormProvider {...method}>
			<LoadProvider>
				<div className='min-h-screen pb-24'>
					<AppBar
						title={title[step]}
						showBackButton
						onBackClick={() => method.setValue('step', Math.max(0, step - 1))}
					/>
					<Steps steps={[
						{ step: 1, title: 'Chọn số' },
						{ step: 2, title: 'Địa chỉ nhận' },
						{ step: 3, title: 'Đăng ký' },
					]} currentStep={step} />
					<PageContent />
					<BottomButton />

				</div>
				<ModalProvider />
			</LoadProvider>
		</FormProvider>
	);
}
