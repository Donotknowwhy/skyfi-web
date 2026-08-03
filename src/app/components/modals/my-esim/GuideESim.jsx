'use client';

import { XMarkIcon } from '@heroicons/react/24/outline';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { useModal } from '../../../utils/modal';

const GuideESim = () => {
  const t = useTranslations('my-esim.guideEsim');
  const [activeTab, setActiveTab] = useState('ios');
	const [ activeMethod, setActiveMethod ] = useState( 'qrCode' );
	const { close } = useModal();

  const tabs = [
    { id: 'ios', label: t('tabs.ios') },
    { id: 'android', label: t('tabs.android') }
  ];

  const methods = [
    { id: 'qrCode', label: t('methods.qrCode') },
    { id: 'manual', label: t('methods.manual') }
  ];

  const formatInstructionText = (text) => {
    return text.split('\n\n').map((paragraph, index) => (
      <p key={index} className="mb-4 last:mb-0">
        {paragraph}
      </p>
    ));
  };

  return (
    <div className="  bg-opacity-50 flex items-center justify-center z-50 ">
      <div className="bg-white rounded-xl max-w-4xl w-full  overflow-hidden">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {t('title')}
          </h2>
          <button
            onClick={close}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <XMarkIcon className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto max-h-[calc(90vh-80px)]">
          <div className="">
            {/* Device Tabs */}
            <div className="flex space-x-1 mb-6 bg-gray-100 rounded-lg p-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Method Selection */}
            <div className="flex space-x-1 mb-6 bg-gray-50 rounded-lg p-1">
              {methods.map((method) => (
                <button
                  key={method.id}
                  onClick={() => setActiveMethod(method.id)}
                  className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                    activeMethod === method.id
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {method.label}
                </button>
              ))}
            </div>

            {/* Installation Steps Section */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                  1
                </span>
                {t('sections.installationSteps')}
              </h3>

              <div className="bg-gray-50 rounded-lg p-6">
                <div className="text-gray-700 leading-relaxed">
                  {activeTab === 'ios' ? (
                    activeMethod === 'qrCode' ? (
                      formatInstructionText(t('iosInstructions.installation'))
                    ) : (
                      formatInstructionText(t('iosInstructions.manualInstallation'))
                    )
                  ) : (
                    activeMethod === 'qrCode' ? (
                      formatInstructionText(t('androidInstructions.installation'))
                    ) : (
                      formatInstructionText(t('androidInstructions.manualInstallation'))
                    )
                  )}
                </div>
              </div>
            </div>

            {/* Enable Network Data Section */}
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <span className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-sm font-bold mr-3">
                  2
                </span>
                {t('sections.enableNetwork')}
              </h3>

              <div className="bg-gray-50 rounded-lg p-6">
                <div className="text-gray-700 leading-relaxed">
                  {activeTab === 'ios' ? (
                    formatInstructionText(t('iosInstructions.networkEnable'))
                  ) : (
                    formatInstructionText(t('androidInstructions.networkEnable'))
                  )}
                </div>
              </div>
            </div>

            {/* Important Warning */}
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
              <h4 className="text-amber-800 font-semibold mb-2 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                {t('warning.title')}
              </h4>
              <p className="text-amber-700 leading-relaxed">
                {t('warning.message')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuideESim;
