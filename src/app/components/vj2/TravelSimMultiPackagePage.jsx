"use client";

import {useLocale, useTranslations} from 'next-intl';
import {useEffect, useState} from 'react';
import {useRouter} from '../../../i18n/navigation';
import CheckoutService from '../../services/checkoutService';
import TravelSimService from '../../services/travelsim';
import {useLoad} from '../../utils/load';
import {showModalMess} from '../modals/modalMess';
import {showModalMultiPackageConfirm, showModalVerify} from '../modals/travelSim';
import SkeletonLoader from "@/app/components/travelsim/SkeletonLoader";

import TravelSimMultiPackage from "@/app/components/vj2/TravelSimMultiPackage";
import OrderSummaryTable from "@/app/components/vj2/OrderSummaryTable";
import InfoSimV2 from "@/app/components/travelsim/InfoSimV2";
import useMyEsim from "@/app/hooks/useMyEsim";

export default function TravelSimMultiPackagePage({code, email, validationData = null, hasFreeSim = false, typeCode}) {
    const [packageQuantities, setPackageQuantities] = useState({});
    const [packageOptions, setPackageOptions] = useState([]);
    const [simNumbers, setSimNumbers] = useState([]);
    const [msisdnData, setMsisdnData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showSuccessPage, setShowSuccessPage] = useState(false);
    const {showDevicesEsim} = useMyEsim();

    const t = useTranslations('travelSim');
    const tErrors = useTranslations('travelSim.errors');
    const tSuccess = useTranslations('travelSim.success');
    const tInfo = useTranslations('travelSim.info');
    const tButtons = useTranslations('travelSim.buttons');
    const locale = useLocale();
    const router = useRouter();
    const load = useLoad();

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                setError(null);

                try {
                    const packagesData = await TravelSimService.getPackageByCodeV2(code, {
                        source: 'freemium',
                        locale
                    });

                    if (packagesData && packagesData.length > 0) {
                        let transformedPackages = packagesData.map(pkg => ({
                            packageCode: pkg.code,
                            packageName: pkg.name,
                            dataAmount: `${pkg.data_per_day} GB`,
                            validity: `${pkg.validity} ${t('common.days')}`,
                            price: `${pkg.price.toLocaleString()} VND`,
                            description: Array.isArray(pkg.description) ? pkg.description[0] : pkg.description,
                            en_description: Array.isArray(pkg.en_description) ? pkg.en_description[0] : pkg.en_description,
                            rawPrice: pkg.price,
                            status: pkg.status
                        }));

                        setPackageOptions(transformedPackages);
                    }
                } catch (packageError) {
                    console.warn('Could not fetch packages:', packageError);
                }

            } catch (err) {
                console.error('Error fetching travel sim data:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [code, validationData, hasFreeSim, locale, t]);

    const handleQuantityChange = (packageCode, newQuantity) => {
        setPackageQuantities(prev => ({
            ...prev,
            [packageCode]: newQuantity
        }));
    };

    const getSelectedPackagesDetails = () => {
        return packageOptions
            .filter(pkg => packageQuantities[pkg.packageCode] > 0)
            .map(pkg => ({
                ...pkg,
                quantity: packageQuantities[pkg.packageCode]
            }));
    };

    const calculateTotalPrice = () => {
        let total = 0;
        packageOptions.forEach(pkg => {
            const quantity = packageQuantities[pkg.packageCode] || 0;
            if (quantity > 0) {
                total += pkg.rawPrice * quantity
            }
        });
        return total;
    };

    const getTotalPackageItems = () => {
        return Object.values(packageQuantities).reduce((sum, qty) => sum + (qty || 0), 0);
    };

    const confirmOrder = () => {
        const selectedPkgs = getSelectedPackagesDetails();

        const hasFreePackage = selectedPkgs.some(pkg => pkg.isFree);

        if (hasFreePackage && selectedPkgs.every(pkg => pkg.isFree)) {
            return createOrder(email);
        }
        if (typeCode === 101 && selectedPkgs.length === 0) {
            return handleReceiveGift()
        }
        // Use the new multi-package confirmation modal
        showModalMultiPackageConfirm({
            packagesInfo: selectedPkgs,
            totalPrice: calculateTotalPrice(),
            selectedSimsCount: 0,
            onContinue: createOrder
        });
    }

    const createOrder = async (orderEmail) => {
        try {
            load.open();
            setError(null);

            if (getTotalPackageItems() === 0) {
                throw new Error(tErrors('selectAtLeastOnePackage'));
            }

            const orderItems = [];

            const msisdnItem = msisdnData.find(item => item.msisdn === simNumber);
            console.log(packageOptions)
            packageOptions.forEach((pkg) => {
                const quantity = 1;
                if (quantity > 0) {
                    for (let i = 0; i < quantity; i++) {
                        orderItems.push({
                            msisdn_id: msisdnItem?.msisdn_id || msisdnItem?.id,
                            quantity: packageQuantities[pkg.packageCode],
                            sim_id: msisdnItem?.sim_id || msisdnItem?.id,
                            package_code: pkg.packageCode,
                            pack_price: pkg.rawPrice || 0
                        });
                    }
                }
            });

            const orderData = {
                email: orderEmail || email,
                pnr: code,
                packages: orderItems
            };

            const selectedPkgs = getSelectedPackagesDetails();
            const allFreePackages = selectedPkgs.every(pkg => pkg.isFree);

            if (allFreePackages) {
                const result = await TravelSimService.createOrderV2(orderData, {locale});

                showModalMess({
                    label: tSuccess('title'),
                    message: tSuccess('freeSimSentToEmail'),
                    type: 'success',
                });
                return;
            }

            const result = await TravelSimService.createOrderV2(orderData, {locale});
            const paymentParams = {
                orderNumber: result,
                orderDescription: result,
                paymentMethod: 'GALAXYPAY',
                locale: locale,
                sourceType: ""
            };
            const paymentLink = await CheckoutService.getlinkPayment(paymentParams);
            if (!paymentLink.redirectUrl) {
                throw new Error('Payment link not found');
            }
            router.push(paymentLink.redirectUrl);
        } catch (error) {
            showModalMess({
                label: tErrors('title'),
                message: error.message || tErrors('createOrderError'),
                type: 'error',
            });

            throw error;
        } finally {
            load.close();
        }
    };

    const handleReceiveGift = () => {
        showModalVerify({
            packageInfo: {
                name: t('packages.vietnamEsim'),
                price: t('packages.vietnamEsim'),
            },
            isFree: true,
            onContinue: createReceiveGiftOrder
        })
    }

    const createReceiveGiftOrder = async () => {
        const result = await TravelSimService.giftEsim(email, code);
        if (result.code === 200) {
            setShowSuccessPage(true);
        } else {
            showModalMess({
                label: tErrors('failed'),
                message: result.message || tErrors('generalError'),
                type: 'error',
            })
        }
    }

    // Success Page Component
    const SuccessPage = () => {
        const handleBackToHome = () => {
            window.location.reload()
        };

        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center py-4">
                <div className="bg-white rounded-2xl shadow-lg max-w-2xl w-full mx-4 p-8">
                    <div className="flex flex-col items-center text-center space-y-8">
                        {/* Success Icon */}
                        <div className="relative">
                            <img src="/images/travelsim/Success.png" alt={"success"}/>
                        </div>

                        {/* Title */}
                        <h1 className="text-2xl font-bold text-green-600 font-quicksand">
                            {tSuccess('receivedVietnamEsim')}
                        </h1>

                        {/* Message */}
                        <div className="p-6 max-w-md">
                            <p className="text-gray-700 text-center leading-relaxed">
                                {tSuccess('esimSentMessage')}
                            </p>
                        </div>

                        {/* Back to Home Button */}
                        <button
                            onClick={handleBackToHome}
                            className="bg-orange-400 hover:bg-orange-500 text-white font-semibold py-4 px-8 rounded-lg transition-colors duration-200 min-w-[250px] text-lg"
                        >
                            {tButtons('backToHome')}
                        </button>
                    </div>
                </div>
            </div>
        );
    };

    // Show success page if state is true
    if (showSuccessPage) {
        return <SuccessPage/>;
    }

    if (loading) {
        return <SkeletonLoader/>;
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gray-50 py-4 md:py-8">
                <div className="container mx-auto px-4">
                    <div className="mx-auto max-w-6xl">
                        <div className="flex items-center justify-center h-64">
                            <div
                                className="text-center border bg-white rounded-lg shadow-lg p-6 gap-2 max-w-2xl w-full flex flex-col items-center">
                                <img
                                    src="/assets/modals/sim-not-active-image.png"
                                    alt="SIM Active"
                                    className="w-[87px] h-[87px] object-contain"
                                />
                                <div className="text-lg text-red-700 mb-2 font-semibold">{t('errors.title')}</div>
                                <div className="text-sm text-gray-600">{error}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className=" bg-gray-50 py-4 md:py-8">
            <div className="container mx-auto px-4">
                <div className="mx-auto max-w-6xl">
                    <div className=" mb-6 md:mb-8 text-sm md:text-xl bg-[#FDCD084D] p-2 flex items-center gap-2 rounded-lg">
                        <img src="/images/travelsim/infoIcon.png" alt="" className={"w-[20px] h-[20px]"}/>
                        <div>
                            <p className="text-[#3C3C3C] font-koho">
                                {typeCode === 103 && tInfo('bookingAlreadyGifted')}
                                {typeCode === 100 && tInfo('programNotForRecentRecipients')}
                            </p>
                            <p className="text-[#3C3C3C] font-koho">
                                {t('esimWarning')} <span className={"text-blue-500 underline cursor-pointer font-koho"} onClick={()=>showDevicesEsim()}> {t('here')}</span>
                            </p>
                        </div>
                    </div>

                    {/* Title Section */}
                    {typeCode !== 101 && (
                        <div className="text-center mb-6 md:mb-8 font-koho text-xl">
                            <h1 className="text-2xl md:text-4xl font-semibold text-[#DA1B22] mb-2">
                                {t('title.greeting')}
                            </h1>
                            <p className="text-[#DA1B22]">
                                {t('title.subtitle')}
                            </p>
                        </div>
                    )}
                    {typeCode === 101 && (
                        <div className="mb-6 md:mb-8">
                            <InfoSimV2
                                type={"travel"}
                                simNumbers={simNumbers}
                                selectedSims={[]}
                                onSimSelect={() => {
                                }}
                                onSelectAll={() => {
                                }}
                            />
                        </div>)}

                    {/* Package Selection Section */}
                    <div className="mb-6">
                        <div className="flex gap-4 md:justify-center overflow-scroll scrollbar-hide">
                            {packageOptions.map((pkg) => (
                                <TravelSimMultiPackage
                                    key={pkg.packageCode}
                                    packageName={pkg.packageName}
                                    dataAmount={pkg.dataAmount}
                                    validity={pkg.validity}
                                    price={pkg.price}
                                    description={pkg.description}
                                    rawPrice={pkg.rawPrice}
                                    initialQuantity={packageQuantities[pkg.packageCode] || 0}
                                    onQuantityChange={(quantity) => handleQuantityChange(pkg.packageCode, quantity)}
                                    maxQuantity={10}
                                    isFree={pkg.isFree}
                                    className="!w-[280px] flex-shrink-0"
                                />
                            ))}
                        </div>
                    </div>

                    {/* Order Summary Table */}
                    {(getTotalPackageItems() > 0 || typeCode === 101) && (
                        <div className="mb-8">
                            <OrderSummaryTable
                                selectedPackages={getSelectedPackagesDetails()}
                                onProceedToPayment={confirmOrder}
                                typeCode={typeCode}
                            />
                        </div>
                    )}
                    {/*{typeCode !== 100 && typeCode !== 103 && (*/}
                    {/*    <p className={"mt-2 font-koho font-bold text-xl"}>*/}
                    {/*        {tInfo('freeDataNotice')}*/}
                    {/*    </p>*/}
                    {/*)}*/}
                </div>
            </div>
        </div>
    );
}
