import { Button as ButtonVikki } from '@/app/components/ui/Button';
import { modal, useModal } from '../../utils/modal';

// Example import for showModalSimNotActive
// import { showModalSimNotActive } from './travelSim/modalSimNotAcctive';

const ModalMess = ({ message, label, labelConfirm = 'OK', labelDismiss, type = 'info', icon }) => {
	const { close, done } = useModal();
	const getIconByType = () => {
		switch (type) {
			case 'success':
				return (
					<div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
						<svg className="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
						</svg>
					</div>
				);
			case 'error':
				return (
					<div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
						<svg className="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
						</svg>
					</div>
				);
			case 'warning':
				return (
					<div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100">
						<svg className="h-6 w-6 text-yellow-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
						</svg>
					</div>
				);
			default:
				return (
					<div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
						<svg className="h-6 w-6 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
						</svg>
					</div>
				);
		}
	};

	return (
		<div className="bg-white rounded-lg p-6 max-w-md mx-auto text-center">
			{icon ? <img src={icon} alt="icon" className="mx-auto mb-4 h-20 w-20" /> : getIconByType()}
			<h2 className="text-lg font-semibold mt-4 mb-2 text-gray-900">{label}</h2>
			<p className="text-gray-500 mb-6">{message}</p>

			<div className="flex justify-center gap-4">
				{labelDismiss && (
					<ButtonVikki
						onClick={close}
						variant={'outline'}
						className="flex-1 border border-[#F9A51A] text-[#F9A51A]"

					>
						{labelDismiss}
					</ButtonVikki>
				)}
				{labelConfirm && (
					<ButtonVikki
						label={labelConfirm}
						onClick={done}
						className=" bg-gradient-to-r from-[#F9A51A] to-[#FFDD00] hover:opacity-90 w-full !text-neutral-800 font-bold flex-1"
					>
						{labelConfirm}
					</ButtonVikki>)}
			</div>
		</div>
	);
};


export const showModalMess = ({ message, label, labelConfirm = 'OK', labelDismiss, onConfirm, onDismiss, type = 'info', icon }) => {
	modal.open({
		render:
			<ModalMess
				message={message}
				label={label}
				labelConfirm={labelConfirm}
				labelDismiss={labelDismiss}
				onConfirm={onConfirm}
				onDismiss={onDismiss}
				type={type}
				icon={icon}
			/>
		,
		onClose: onDismiss,
		onDone: onConfirm,
		closeButton: false,
		boxClassName: ' max-w-md',
	});
};




const ModalMessVikki = ({ message, label, labelConfirm = 'OK', labelDismiss, type = 'info', icon }) => {
	const { close, done } = useModal();
	const getIconByType = () => {
		switch (type) {
			case 'success':
				return (
					<div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
						<svg className="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
						</svg>
					</div>
				);
			case 'error':
				return (
					<div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
						<svg className="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
						</svg>
					</div>
				);
			case 'warning':
				return (
					<div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100">
						<svg className="h-6 w-6 text-yellow-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
						</svg>
					</div>
				);
			default:
				return (
					<div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
						<svg className="h-6 w-6 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
						</svg>
					</div>
				);
		}
	};

	return (
		<div className="bg-white rounded-lg p-6 max-w-md mx-auto text-center">
			{icon ? <img src={icon} alt="icon" className="mx-auto mb-4 h-20 w-20" /> : getIconByType()}
			<h2 className="text-lg font-semibold mt-4 mb-2 text-gray-900">{label}</h2>
			<p className="text-gray-500 mb-6">{message}</p>

			<div className="flex justify-center gap-4">
				{labelDismiss && (
					<ButtonVikki
						onClick={close}
						variant='outline'
						className="hover:bg-gray-100 w-full flex-1 font-bold "
					>{labelDismiss}</ButtonVikki>
				)}
				{labelConfirm && (
					<ButtonVikki
						onClick={done}
						className="btn hover:opacity-90 w-full  btnvikki py-3 rounded-full  font-bold flex-1"
					>{labelConfirm}</ButtonVikki>)}
			</div>
		</div>
	);
};


export const showModalMessVikki = ({ message, label, labelConfirm = 'OK', labelDismiss, onConfirm, onDismiss, type = 'info', icon }) => {
	modal.open({
		render:
			<ModalMessVikki
				message={message}
				label={label}
				labelConfirm={labelConfirm}
				labelDismiss={labelDismiss}
				onConfirm={onConfirm}
				onDismiss={onDismiss}
				type={type}
				icon={icon}
			/>
		,
		onClose: onDismiss,
		onDone: onConfirm,
		closeButton: false,
		boxClassName: ' max-w-md',
	});
};

const ModalMessHDBank = ({ message, label, labelConfirm = 'OK', labelDismiss, type = 'info', icon }) => {
	const { close, done } = useModal();
	const getIconByType = () => {
		switch (type) {
			case 'success':
				return (
					<div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
						<svg className="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
						</svg>
					</div>
				);
			case 'error':
				return (
					<div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
						<svg className="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
						</svg>
					</div>
				);
			case 'warning':
				return (
					<div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-yellow-100">
						<svg className="h-6 w-6 text-yellow-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
						</svg>
					</div>
				);
			default:
				return (
					<div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
						<svg className="h-6 w-6 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
							<path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" />
						</svg>
					</div>
				);
		}
	};

	return (
		<div className="bg-white rounded-lg p-6 max-w-md mx-auto text-center">
			{icon ? <img src={icon} alt="icon" className="mx-auto mb-4 h-20 w-20" /> : getIconByType()}
			<h2 className="text-lg font-semibold mt-4 mb-2 text-gray-900">{label}</h2>
			<p className="text-gray-500 mb-6">{message}</p>

			<div className="flex justify-center gap-4">
				{labelDismiss && (
					<ButtonVikki
						onClick={close}
						variant='outline'
						className="hover:bg-gray-100 w-full flex-1 font-bold "
					>{labelDismiss}</ButtonVikki>
				)}
				{labelConfirm && (
					<ButtonVikki
						onClick={done}
						className="hover:opacity-90 w-full py-3 rounded-full text-white font-bold flex-1"
						style={{
							background: 'linear-gradient(90deg, #DA2128 0.2%, #DA2128 50.07%, #F9A61C 75%, #F9C016 84.97%, #FFDD00 99.93%)',
						}}
					>{labelConfirm}</ButtonVikki>)}
			</div>
		</div>
	);
};

export const showModalMessHDBank = ({ message, label, labelConfirm = 'OK', labelDismiss, onConfirm, onDismiss, type = 'info', icon }) => {
	modal.open({
		render:
			<ModalMessHDBank
				message={message}
				label={label}
				labelConfirm={labelConfirm}
				labelDismiss={labelDismiss}
				onConfirm={onConfirm}
				onDismiss={onDismiss}
				type={type}
				icon={icon}
			/>
		,
		onClose: onDismiss,
		onDone: onConfirm,
		closeButton: false,
		boxClassName: ' max-w-md',
	});
};

// Example usage of showModalSimNotActive:
/*
import { showModalSimNotActive } from './travelSim/modalSimNotAcctive';

showModalSimNotActive({
	simData: [
		{
			id: '1',
			phoneNumber: '0707 123 456',
			packageInfo: 'Gói SF90T/5 GB - 10 ngày'
		}
	],
	onClose: () => console.log('Modal closed')
});
*/
