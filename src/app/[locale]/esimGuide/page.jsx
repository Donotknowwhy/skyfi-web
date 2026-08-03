'use client';

import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import {useState} from "react";
import {useTranslations} from 'next-intl';

export default function EsimGuide() {
    const [activeTab, setActiveTab] = useState('ios');
    const [setupMethod, setSetupMethod] = useState('qr');
    const t = useTranslations('esimGuide');

    const getCurrentSteps = () => {
        if (activeTab === 'ios') {
            if (setupMethod === 'qr') {
                return {
                    installation: t.raw('ios.qr.installation'),
                    dataSetup: t.raw('ios.qr.dataSetup')
                };
            } else {
                return {
                    installation: t.raw('ios.manual'),
                    dataSetup: t.raw('ios.qr.dataSetup')
                };
            }
        } else {
            if (setupMethod === 'qr') {
                return {
                    installation: t.raw('android.qr.installation'),
                    dataSetup: t.raw('android.qr.dataSetup')
                };
            } else {
                return {
                    installation: t.raw('android.manual'),
                    dataSetup: t.raw('android.qr.dataSetup')
                };
            }
        }
    };

    const steps = getCurrentSteps();

    return(
        <div className="bg-gray-100 min-h-screen ">
            <Header />
            <div className="min-h-screen bg-gray-50 p-4">
                <div className="max-w-4xl mx-auto">
                    {/* Header */}
                    <div className="bg-white rounded-lg shadow-sm mb-6">
                        <div className="flex items-center justify-between p-4 border-b">
                            <h1 className="text-xl font-semibold text-gray-900">{t('title')}</h1>
                        </div>

                        {/* Tabs */}
                        <div className="flex border-b">
                            <button
                                className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                                    activeTab === 'ios'
                                        ? 'border-orange-500 text-orange-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700'
                                }`}
                                onClick={() => setActiveTab('ios')}
                            >
                                {t('iosDevice')}
                            </button>
                            <button
                                className={`px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                                    activeTab === 'android'
                                        ? 'border-orange-500 text-orange-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700'
                                }`}
                                onClick={() => setActiveTab('android')}
                            >
                                {t('androidDevice')}
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                            {/* Setup Method Selection */}
                            <div className="mb-8">
                                <h2 className="text-lg font-semibold text-gray-900 mb-4">{t('setupMethodSelection')}</h2>
                                <div className="flex space-x-4">
                                    <button
                                        className={`px-6 py-3 rounded-lg border-2 font-medium transition-colors ${
                                            setupMethod === 'qr'
                                                ? 'border-orange-500 bg-orange-50 text-orange-600'
                                                : 'border-gray-300 text-gray-700 hover:border-gray-400'
                                        }`}
                                        onClick={() => setSetupMethod('qr')}
                                    >
                                        {t('qrCode')}
                                    </button>
                                    <button
                                        className={`px-6 py-3 rounded-lg border-2 font-medium transition-colors ${
                                            setupMethod === 'manual'
                                                ? 'border-orange-500 bg-orange-50 text-orange-600'
                                                : 'border-gray-300 text-gray-700 hover:border-gray-400'
                                        }`}
                                        onClick={() => setSetupMethod('manual')}
                                    >
                                        {t('manual')}
                                    </button>
                                </div>
                            </div>

                            {/* Installation Steps */}
                            <div className="mb-8">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4">1. {t('installationSteps')}</h3>
                                <div className="space-y-4">
                                    {steps.installation.map((step, index) => (
                                        <div key={index} className="flex items-start space-x-3">
                    <span className="flex-shrink-0 w-6 h-6 bg-orange-100 text-orange-600 rounded-full text-sm font-medium flex items-center justify-center">
                      {index + 1}
                    </span>
                                            <p className="text-gray-700 leading-relaxed">{step}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Data Setup Steps */}
                            {steps.dataSetup && (
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 mb-4">2. {t('dataSetupSteps')}</h3>
                                    <div className="space-y-4">
                                        {steps.dataSetup.map((step, index) => (
                                            <div key={index} className="flex items-start space-x-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-orange-100 text-orange-600 rounded-full text-sm font-medium flex items-center justify-center">
                        {index + 1}
                      </span>
                                                <p className="text-gray-700 leading-relaxed">{step}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}
