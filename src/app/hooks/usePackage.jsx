"use client";

import { toast } from "react-toastify";
import { useRouter } from "../../i18n/navigation";
import { useLocale } from "next-intl";
import { showModalMess } from "../components/modals/modalMess";
import ConfirmChangePackageModal from "../components/modals/package/ConfirmChangePackageModal";
import ModalCheckPackage from "../components/modals/package/ModalCheckPackage";
import PackDetail from "../components/modals/package/PackDetail";

import ModalOTP from "../components/modals/package/ModalOTP";
import PackageService from "../services/package";
import CheckoutService from "../services/checkoutService";
import {
	ORDER_BRANDS,
	applyPackageOrderSource,
	applyPaymentSourceType,
} from "../utils/orderSourceContext";


const { useLoad } = require( "../utils/load" );
const { modal, useModal } = require( "../utils/modal" );



const usePackage = ( onSuccess ) => {
	const load = useLoad();
	const router = useRouter();
	const locale = useLocale();

	const openCheckPackageModal = ( pack ) => {
		modal.open( {
			render: <ModalCheckPackage package={ pack } />,
			boxClassName: 'max-w-lg',
			onDone: async ( result ) => {
				if ( result.isPackage ) {
					openConfirmChangePackageModal( result );
				} else {
					console.log( 'sendOtpRegisterPackage result:' );
					try {
						load.open();
						const res = await PackageService.sendOtpRegisterPackage( {
							msisdn: result.msisdn || result.phoneNumber,
							packageCode: result.packageCode || pack.code
						} );

						if ( res.success ) {
							openOTPModal( result );
							return;
						}
						showModalMess( {
							message: res.message,
							type: 'error'
						} );
					} catch ( error ) {
						showModalMess( {
							message: error.message || 'Failed to send OTP',
							type: 'error'
						} );
					} finally {
						load.close();
					}
				}
			}
		} );
	};

	const openConfirmChangePackageModal = ( data ) => {

		modal.open( {
			render: <ConfirmChangePackageModal
				data={ data }
			/>,
			boxClassName: 'max-w-lg',
			onDone: async ( result ) => {
				// Bank payment flow
				if ( data.isBank ) {
					try {
						load.open();
						const order = await CheckoutService.createOrderPackage( applyPackageOrderSource( ORDER_BRANDS.WEB, {
							msisdn: data.msisdn,
							package_code: data.package?.code,
							customer_name: data.customerName,
							email: '',
							payment_method: data.paymentMethod,
						} ) );

						if ( !order || !order.order_number ) {
							showModalMess( {
								message: order?.message || 'Tạo đơn hàng thất bại',
								type: 'error'
							} );
							return;
						}

						const paymentLink = await CheckoutService.getlinkPayment( applyPaymentSourceType( ORDER_BRANDS.WEB, {
							orderNumber: order.order_number,
							orderDescription: 'Order description ' + order.order_number,
							paymentMethod: data.paymentMethod,
							locale,
						} ) );

						if ( !paymentLink?.redirectUrl ) {
							showModalMess( {
								message: 'Không lấy được liên kết thanh toán',
								type: 'error'
							} );
							return;
						}

						router.push( paymentLink.redirectUrl );
					} catch ( error ) {
						showModalMess( {
							message: error.message || 'Đã có lỗi xảy ra',
							type: 'error'
						} );
					} finally {
						load.close();
					}
					return;
				}

				// Main account flow — Send OTP before opening OTP modal
				try {
					load.open();
					const res = await PackageService.sendOtpRegisterPackage( {
						msisdn: data.msisdn || data.phoneNumber,
						packageCode: data.package?.code || data.packageCode
					} );

					if ( res.success ) {
						openOTPModal( result );
						return
					}
					showModalMess( {
						message: res.message,
						type: 'error'
					} );
				} catch ( error ) {
					showModalMess( {
						message: error.message,
						type: 'error'
					} );
				} finally {
					load.close();
				}
			}
		} );
	};
	const openOTPModal = ( data ) => {

		modal.open( {
			render: <ModalOTP data={ data } />,
			boxClassName: 'max-w-md',
			onDone: ( result ) => {
				if ( result.success  ) {
					toast.success( 'Gói cước đã được mua thành công' );
				}
			}
		} );
	};

	const openPackDetailModal = (packageData, isBuy) => {
		modal.open({
			render: <PackDetail packageData={packageData} isBuy={isBuy} />,
			boxClassName: 'max-w-3xl',
			onDone: openCheckPackageModal
		});
	};

	return {
		openCheckPackageModal,
		openPackDetailModal,
	};
};


export { usePackage };

