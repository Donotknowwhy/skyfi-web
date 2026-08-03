'use client';

import { useState } from 'react';
import { modal, useModal } from '../../utils/modal';

const ModalConsentHDBank = ({
	message = 'Đồng ý cho HDBank chia sẻ thông tin họ và tên khách hàng, số điện thoại và email của tôi cho SkyFi và chuyển/điều hướng đến nền tảng của SkyFi để kích hoạt SIM',
	noteTitle = 'Lưu ý:',
	note = 'Nếu không đồng ý và xác nhận chia sẻ dữ liệu, bạn cần thực hiện các bước EKYC từ đầu để kích hoạt SIM',
	labelConfirm = 'Xác nhận',
	labelDismiss = 'Đóng',
}) => {
	const { close, done } = useModal();
	const [checked, setChecked] = useState(false);

	return (
		<div className="bg-white rounded-2xl p-2">
			{/* Consent row */}
			<div className="flex items-start gap-3">
				<button
					type="button"
					onClick={() => setChecked((v) => !v)}
					className={`mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md border transition-colors ${
						checked ? 'border-[#DA2128] bg-[#DA2128]' : 'border-neutral-300 bg-white'
					}`}
					aria-checked={checked}
					role="checkbox"
				>
					{checked && (
						<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M5 12.5L10 17.5L19 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
						</svg>
					)}
				</button>
				<p className="text-[15px] font-medium leading-6 text-neutral-900">{message}</p>
			</div>

			{/* Note */}
			<div className="mt-5 flex items-start gap-3">
				<svg className="mt-0.5 h-7 w-7 flex-shrink-0" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<circle cx="12" cy="12" r="9.25" stroke="#F9A61C" strokeWidth="1.5" />
					<path d="M12 11V16.5" stroke="#F9A61C" strokeWidth="1.5" strokeLinecap="round" />
					<circle cx="12" cy="7.75" r="1" fill="#F9A61C" />
				</svg>
				<div>
					<p className="text-[15px] font-bold leading-6 text-neutral-900">{noteTitle}</p>
					<p className="text-[15px] leading-6 text-neutral-500">{note}</p>
				</div>
			</div>

			{/* Buttons */}
			<div className="mt-6 flex items-center justify-center gap-4">
				<button
					type="button"
					onClick={close}
					className="flex-1 rounded-full border border-neutral-200 py-3 text-base font-bold text-neutral-900"
				>
					{labelDismiss}
				</button>
				<button
					type="button"
					onClick={() => checked && done()}
					disabled={!checked}
					className={`flex-1 rounded-full py-3 text-base font-bold text-white transition-opacity ${
						checked ? 'hover:opacity-90' : 'cursor-not-allowed opacity-50'
					}`}
					style={{
						background: 'linear-gradient(90deg, #DA2128 0.2%, #DA2128 50.07%, #F9A61C 75%, #F9C016 84.97%, #FFDD00 99.93%)',
					}}
				>
					{labelConfirm}
				</button>
			</div>
		</div>
	);
};

export const showModalConsentHDBank = ({
	message,
	noteTitle,
	note,
	labelConfirm,
	labelDismiss,
	onConfirm,
	onDismiss,
} = {}) => {
	modal.open({
		render: (
			<ModalConsentHDBank
				message={message}
				noteTitle={noteTitle}
				note={note}
				labelConfirm={labelConfirm}
				labelDismiss={labelDismiss}
			/>
		),
		onClose: onDismiss,
		onDone: onConfirm,
		closeButton: false,
		boxClassName: ' max-w-md',
	});
};

export default ModalConsentHDBank;
