import { Button } from '@/app/components/ui/Button';
import SimDataService from '@/app/services/simDataService';
import { basePriceSim, priceSim } from '@/app/utils/calculate';
import { formatPhoneNumber, toCurrency } from '@/app/utils/format';
import { useLoad } from '@/app/utils/load';
import { useModal } from '@/app/utils/modal';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { InputSearchNumberVikki } from '../../form/inputSreachNumber';

const ModalChangeSimViki = ({ onChange }) => {
    const t = useTranslations('vikki.modalChangeSim');
    const { close, done } = useModal();
    const [sims, setSims] = useState([]);

    const [selectedSim, setSelectedSim] = useState(null);
    const [isListSim, setIsListSim] = useState(false);
    const { open, close: closeLoad } = useLoad();

    useEffect(() => {
        getListSim();
    }, []);

    const getListSim = async (query) => {
        try {
            open();
            const res = await SimDataService.searchSim(
                {
                    filters: {
                        search: query ? '070' + (query || '') : '',
                    },
                    page: 1,
                    pageSize: 20
                }
            );
            setSims((data) => {
                if (res.length <= 0) {
                    return data;
                }
                return res;
            });
            setIsListSim(res.length > 0);
        } catch (error) {
            console.error('Error fetching sim data:', error);
        } finally {
            closeLoad();
        }
    };


    const handleSearch = (query) => {
        getListSim(query);
    };

    const handleConfirm = () => {
        if (selectedSim) {
            onChange(selectedSim);
            close();
        }
    };

    return (
        <div className="relative bg-white rounded-t-[24px] w-full h-[90vh] flex flex-col">


            {/* Header */}
            <div className="px-4 py-2 flex items-center justify-between shrink-0 relative">
                <button onClick={close} className="p-2 -ml-2 relative z-10">
                    <XMarkIcon className="w-6 h-6 text-gray-500" />
                </button>
                <h3 className="text-[18px] font-semibold text-[#1C1C1E] absolute left-1/2 -translate-x-1/2 w-full text-center">{t('title')}</h3>
            </div>

            {/* Search Input */}
            <InputSearchNumberVikki onSearch={handleSearch} prefix={t('searchPrefix')} number={7} searchHint={t('searchHint')} />

            {!isListSim && (
                <div className="w-full text-center text-neutral-500 flex flex-col items-center mb-6">
                    <Image src="/images/simdata/no_search.svg" alt="No data" width={50} height={50} className="w-20 h-20 mb-2" />
                    <p className="text-sm">{t('noResultsMessage')}</p>
                </div>
            )}

            {/* Sim List */}
            <div className="flex-1 overflow-y-auto  py-2 space-y-3">


                {
                    sims.map((sim) => (
                        <div
                            key={sim.msisdn}
                            onClick={() => setSelectedSim(sim)}
                            className={`p-4 rounded-[12px] border flex items-center justify-between cursor-pointer transition-all ${selectedSim?.msisdn === sim.msisdn ? 'border-[#0000EA] bg-white shadow-sm' : 'border-[#F1F1F1] bg-white'}`}
                        >
                            <div className="flex flex-col">
                                <span className="text-[20px] font-semibold text-[#333]">{formatPhoneNumber(sim.msisdn)}</span>
                                <div className="flex items-baseline gap-2">
                                    <span className="text-[16px] font-medium text-[#333]">{toCurrency(priceSim(sim))}</span>
                                    {basePriceSim(sim) > priceSim(sim) && (
                                        <span className="text-[14px] text-[#8A8A8A] line-through">{toCurrency(basePriceSim(sim))}</span>
                                    )}
                                </div>
                            </div>
                            <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${selectedSim?.msisdn === sim.msisdn ? 'border-[#0000EA] bg-[#0000EA]' : 'border-[#A1A1A1] bg-white'}`}>
                                {selectedSim?.msisdn === sim.msisdn && (
                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10 3L4.5 8.5L2 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                )}
                            </div>
                        </div>
                    ))
                }
            </div>

            {/* Bottom Action */}
            <div className="border-t border-[#F1F1F1] shrink-0 bg-white pb-12">
                <Button
                    onClick={handleConfirm}
                    disabled={!selectedSim}
                    className='w-full '
                >
                    {t('confirmButton')}
                </Button>
            </div>
        </div>
    );
};

export default ModalChangeSimViki;
