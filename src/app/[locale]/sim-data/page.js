"use client";

import {useTranslations} from 'next-intl';
import Image from "next/image";
import {useRouter, useSearchParams} from "next/navigation";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import Footer from '../../components/Footer';
import Button from '../../components/form/button';
import InputRadio from '../../components/form/inputRadio';
import Header from '../../components/Header';
import {showModalMess} from '../../components/modals/modalMess';
import {showModalChangeSim} from '../../components/modals/simdata/modalChangeSim';
import ItemPackage from "../../components/simData/itemPackage";
import Step from '../../components/simData/step';
import useMyEsim from '../../hooks/useMyEsim';
import SimDataService from '../../services/simDataService';
import {useUserActions, useUserState} from '../../stores/user';
import {basePriceSim, priceSim, simPriceTotal} from '../../utils/calculate';
import {convertSimAddToCart, convertSims, formatPhoneNumber, toCurrency} from '../../utils/format';
import {useLoad} from '../../utils/load';
import {trackBeginCheckout, trackProductView, trackProductListView, trackAddToCart, trackPageView} from "@/app/utils/trackingHelper";

export default function SimDataPage() {
    const t = useTranslations('simData');
    const tCommon = useTranslations('common');
    const router = useRouter();
    const [listPackage, setListPackage] = useState([]);
    const [packSelect, setPackSelect] = useState({});

    const {addToCart, setIsCartOpen, setSims} = useUserActions();
    const {simHome} = useUserState();
    const searchParams = useSearchParams();
    const mssisdn = searchParams.get('mssisdn');
    const {showDevicesEsim} = useMyEsim();


    const method = useForm({
        defaultValues: {
            pack_code: '', // Will be set to SF79 when available
        },
        mode: 'onChange'
    });
    const load = useLoad();

    useEffect(() => {
        getSimRandom();
    }, [mssisdn]);

    useEffect(() => {
        trackPageView({ page_title: 'Sim Data - Chọn gói cước' });
    }, []);


    const getSimRandom = async () => {
        if (mssisdn && mssisdn == simHome?.msisdn) {
            method.reset({
                ...simHome,
                sim_type: 'ESIM'
            });
            return;
        }
        try {
            load.open();
            const res = await SimDataService.getSimRandom();
            const {packages, ...data} = res;

            method.reset({
                ...data,
                sim_type: 'ESIM'
            });
            setListPackage(packages || []);

        } catch (error) {
            console.error('Error fetching random sim data:', error);
            showModalMess({
                label: 'Thông báo',
                message: 'Không thể tải thông tin SIM. Vui lòng thử lại.',
                type: 'error',
            });
        } finally {
            load.close();
        }
    };

    const packageCodeSelect = method.watch('pack_code');
    const simTypeSelect = method.watch('sim_type');
    const phone = method.watch('msisdn');
    const sim = method.watch();

    const getListPackage = async () => {
        if (!phone) return;
        try {
            load.open();
            const res = await SimDataService.getPackageSim(phone);
            setListPackage(res?.packages || []); // Ensure we always have an array
        } catch (error) {
            console.error('Error fetching list package:', error);
            showModalMess({
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
        // if (mssisdn && mssisdn == simHome?.msisdn) return;
        getListPackage();
    }, [phone]);

    useEffect(() => {
        if (listPackage.length > 0) {
            const vikkiPackage = listPackage.find(pack => pack.vikki_event && pack.is_default === 1);
            const defaultPackage = listPackage.find(pack => pack.is_default === 1);
            if (vikkiPackage) {
                method.setValue('pack_code', vikkiPackage.code);
            } else if (defaultPackage) {
                method.setValue('pack_code', defaultPackage.code);
            } else {
                method.setValue('pack_code', listPackage[0].code);
            }
            trackProductListView({
                item_list_name: 'Sim Data Packages',
                item_count: listPackage.length,
                filters: { msisdn: phone },
            });
        }
    }, [listPackage]);

    useEffect(() => {
        const selectedPackage = listPackage.find((pack) => pack.code === packageCodeSelect);

        if (!selectedPackage) {
            setPackSelect({});
            method.setValue('pack_price', 0);
            return;
        }

        setPackSelect(selectedPackage);
        method.setValue('pack_price', selectedPackage.sale_price);

        trackProductView({
            product_id: selectedPackage.id,
            product_name: selectedPackage.name || selectedPackage.code,
            product_category: 'SimData',
            product_price: selectedPackage.sale_price,
            product_sku: selectedPackage.code,
            currency: 'VND',
        }, {
            funnel_name: 'esim_purchase',
            funnel_step: 1,
            funnel_step_name: 'Product View',
            event_params: { msisdn: phone },
        });
    }, [packageCodeSelect, listPackage]);

    const changeSim = (data) => {
        method.reset({
            ...sim,
            ...data
        });
    };


    const validatePackageSelection = () => {
        if (listPackage.length === 0) {
            showModalMess({
                label: 'Thông báo',
                message: 'Không có gói cước nào khả dụng. Vui lòng thử số khác.',
                type: 'error',
            });
            return false;
        }

        if (!packageCodeSelect) {
            showModalMess({
                label: 'Thông báo',
                message: 'Vui lòng chọn gói cước trước khi tiếp tục.',
                type: 'error',
            });
            return false;
        }

        return true;
    };

    const onCheckout = (data) => {
        if (!validatePackageSelection()) return;
        data.product_id = packSelect.id;
        const convertedSims=convertSims(data)
        trackBeginCheckout({
            cart_total: convertedSims.total_price,
            currency: 'VND',
            items: [
                convertedSims
            ],
            coupon_code: undefined
        });
        setSims([convertSims(data)]);
        router.push('/checkout/payment');
    };

    const onAddToCart = async (data) => {
        if (!validatePackageSelection()) return;

        trackAddToCart({
            product_id: packSelect.id,
            product_name: packSelect.name || packSelect.code,
            product_category: 'SimData',
            product_price: packSelect.sale_price,
            product_quantity: 1,
            product_sku: packSelect.code,
            currency: 'VND',
        }, {
            event_params: { msisdn: phone, button_location: 'sim_data_page', added_from: 'add_to_cart_button' },
        });

        data.product_id = packSelect.id;
        const result = await addToCart(convertSimAddToCart(data));
        console.log('result', result);

        if (result === 'MAX_QUANTITY') {
            showModalMess({
                label: tCommon("notification"),
                message: tCommon("maxQuantity", {quantity: 50}),
                type: 'error',
            });
        } else {
            setIsCartOpen(true);
        }
    };


    return (
        <div className=" flex flex-col bg-[#F5F5F5]">
            <Header/>
            <Step/>
            <main className="   bg-[#F5F5F5] container max-w-[1230px]  ">

                {/* Title */}
                <div className=" mb-[20px] hidden sm:flex flex-row items-center">
                    <h1 className="font-inter font-semibold mt-4 text-2xl sm:text-[28px] text-[#333]">{t('title')}</h1>
                </div>

                {/* Block: node 440-18099 - Chọn số thuê bao */}
                <section className=" mb-[20px] flex md:items-center justify-between gap-[12px] mt-4 sm:mt-0 ">
                    {/* Icon left */}
                    <div className="flex items-center  gap-2 md:gap-4">
                        <div
                            className="flex items-center justify-center bg-[#ED1B2F] rounded-[12px] w-8 h-8  md:w-[54px] md:h-[54px]">
                            <Image src="/images/simdata/iconsim.png" alt="icon" width={54} height={54}
                                   className="object-cover w-full h-full"/>
                        </div>

                        {/* Content */}
                        <div className="flex flex-col flex-1 gap-[0px]">
                            <span
                                className="font-inter text-sm md:text-base text-[#5C5C5C]">{t('simSection.numberLabel')}</span>
                            <div className="flex flex-row items-center gap-[4px]">
                                <span
                                    className="font-inter font-semibold text-lg md:text-[22px] text-[#333]">{formatPhoneNumber(method.getValues('msisdn') ?? '')}</span>
                            </div>
                        </div>
                    </div>

                    {/* Button */}
                    <button
                        className="flex  items-center justify-center gap-[8px] px-2 md:px-[16px] py-[8px] rounded-[8px] border border-[#E69818] bg-white"
                        onClick={() =>
                            showModalChangeSim({
                                onChange: changeSim
                            })
                        }>
                        <span
                            className="font-inter font-semibold text-sm sm:text-[16px] text-[#E69818]">{t('simSection.selectButton')}</span>
                    </button>
                </section>

                {/* Block: node 440-18109 - Loại SIM */}
                <section className=" mb-[20px] flex flex-col gap-[4px] ">
                    <div className="flex flex-row md:flex-row md:items-center justify-between gap-[4px] w-full">
                        <div className="flex flex-row gap-[20px]">
                            <InputRadio control={method.control} name="sim_type" value="ESIM" label={'eSIM'}
                                        checked={simTypeSelect == 'ESIM'}/>
                            <InputRadio control={method.control} name="sim_type" value="USIM"
                                        label={t('simSection.physicalSim')} checked={simTypeSelect == 'USIM'}/>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-[4px]">
                            <span
                                className="font-inter font-semibold text-[16px] leading-[1.5em] sm:text-right text-[#ED1B2F]">{toCurrency(priceSim(sim, simTypeSelect))}</span>
                            {basePriceSim(sim, simTypeSelect) > priceSim(sim, simTypeSelect) && <span
                                className="font-inter font-medium text-[12px] leading-[1.5em] sm:text-right line-through text-[#A1A1A1]">{toCurrency(basePriceSim(sim, simTypeSelect))}</span>}
                        </div>
                    </div>
                    <div className={"flex justify-between"}>
                        <p className="font-inter text-[12px] leading-[1.5em] text-[#5C5C5C]">{simTypeSelect == 'USIM' ? t('simSection.deliveryNoteUSIM') : t('simSection.deliveryNoteESIM')}
                        </p>
                        <p className="font-inter text-[12px] leading-[1.5em] text-[#5C5C5C]">{t('simSection.includeFee')}</p>
                    </div>
                    {simTypeSelect == 'ESIM' && <div onClick={showDevicesEsim}
                                                     className='cursor-pointer text-blue-400 font-bold text-sm '>{t('simSection.deviceCompatibility')}</div>}

                </section>

                {/* Block: node 440-18116 - Gói cước */}
                <section className=" mb-[20px] flex flex-col ">
                    <div className="flex flex-row items-center gap-2 mb-4">
                        <h3 className="font-inter font-semibold text-lg text-[#333]">{t('choosePackage')}</h3>
                        <span className="text-[#ED1B2F] text-sm">*</span>
                        {/* Package count */}
                        <span className="text-sm text-[#5C5C5C]">({listPackage.length} gói)</span>
                    </div>

                    {/* No packages available message */}
                    {listPackage.length === 0 && (
                        <div className="mb-4 p-4 bg-[#F8F9FA] border border-[#E9ECEF] rounded-lg text-center">
              <span className="text-[#6C757D] text-sm">
                Không có gói cước nào khả dụng cho số này. Vui lòng thử số khác.
              </span>
                        </div>
                    )}

                    {/* Package validation message */}
                    {listPackage.length > 0 && !packageCodeSelect && (
                        <div className="mb-4 p-3 bg-[#FFF3CD] border border-[#FFEAA7] rounded-lg">
              <span className="text-[#856404] text-sm font-medium">
                Vui lòng chọn một gói cước để tiếp tục
              </span>
                        </div>
                    )}

                    <div className="flex flex-row flex-wrap gap-5 justify-center">
                        {listPackage.map((pack) => (
                            <ItemPackage key={pack.code} pack={pack} control={method.control} name={'pack_code'}
                                         packSelect={packSelect}/>
                        ))}
                    </div>
                </section>

                {/* Block: node 440-18123 - Tổng đơn hàng */}
                <section

                    className=" mb-[40px] flex flex-wrap bg-secondary justify-center md:items-center md:gap-[24px]  px-[30px] py-[20px] relative rounded-xl overflow-hidden">
                    <div className='flex  gap-4 items-center flex-1 basis-[300px] '>

                        {/* Gói cước */}
                        <div
                            className="relative z-10 h-[69px] hidden rounded-[12px] md:flex flex-col items-start justify-center">
                            <span
                                className="font-inter font-medium text-[16px] leading-[1.5em] text-left text-white">{t('totalSection.sim')}</span>
                            <span
                                className="font-inter font-bold text-[20px] leading-[1.2em] text-center text-white">{toCurrency(priceSim(sim, simTypeSelect))} </span>
                        </div>
                        {/* Toán tử + */}
                        <span
                            className="relative z-10 font-inter hidden md:block font-semibold text-[18px] leading-[1.44em] text-center text-white">+</span>

                        {/* Gói cước */}
                        <div
                            className="relative z-10 h-[69px] rounded-[12px] hidden  md:flex flex-col items-start  w-max justify-center">
                            <span
                                className="font-inter font-medium text-[16px] leading-[1.5em] whitespace-nowrap text-left text-white">{t('totalSection.plan')}</span>
                            <span
                                className="font-inter font-bold text-[20px] leading-[1.2em] text-center text-white">{toCurrency(packSelect.sale_price)} </span>
                        </div>

                        {/* Toán tử = */}
                        <span
                            className="relative z-10 font-inter hidden md:block font-semibold text-[18px] leading-[1.44em] text-center text-white">=</span>

                        {/* Tổng đơn hàng */}
                        <div
                            className="relative z-10 md:h-[69px]  rounded-[12px] flex w-full  md:flex-col items-start justify-between md:justify-center">
                            <span
                                className="font-inter font-medium text-[16px] leading-[1.5em] text-left text-white">{t('totalSection.title')}</span>
                            <span className="font-inter font-bold text-[20px] leading-[1.2em] text-center text-white">
                {toCurrency(simPriceTotal(sim, simTypeSelect, packSelect.sale_price ?? 0).sale_price)}
              </span>
                        </div>
                    </div>
                    {/* Buttons */}
                    <div className=" flex flex-row  basis-[400px] md:min-w-[300px] flex-1 lg:flex-none gap-[20px] ">
                        <Button
                            label={t('totalSection.addToCartButton')}
                            typeButton='outline'
                            className={`flex-1 lg:flex-none ${(!packageCodeSelect || listPackage.length === 0) ? 'opacity-60 cursor-not-allowed' : ''}`}
                            onClick={method.handleSubmit(onAddToCart)}
                            disabled={!packageCodeSelect || listPackage.length === 0}
                        />

                        <Button
                            label={t('totalSection.buyNowButton')}
                            className={`flex-1 lg:flex-none ${(!packageCodeSelect || listPackage.length === 0) ? 'opacity-60 cursor-not-allowed' : ''}`}
                            onClick={method.handleSubmit(onCheckout)}
                            disabled={!packageCodeSelect || listPackage.length === 0}
                        />
                    </div>


                </section>

            </main>
            <Footer/>
        </div>
    );
}
