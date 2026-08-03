import React, {useEffect, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import InputField from '@/app/components/form/inputField';
import InputRadio from '@/app/components/form/inputRadio';
import DatePicker from '@/app/components/ui/DatePicker';
import moment from 'moment';
import Select from "react-select";
import { useTranslations } from 'next-intl';

const InfoReview = ({ capturedImages,setValue,watch ,control}) => {
    const t = useTranslations('dktt.infoReview');

    return (
        <div className="text-center px-6">
            <div className="w-24 h-24 mx-auto rounded-full mb-6 overflow-hidden">
                {capturedImages.avatar ? (
                    <img
                        src={capturedImages.avatar}
                        alt="Avatar"
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full bg-blue-400"></div>
                )}
            </div>

            <h2 className="text-xl font-bold text-black mb-8">{t('title')}</h2>

            <div className="space-y-4 text-left">
                {/* Họ và tên */}
                <InputField
                    label={t('fields.fullName.label')}
                    name="full_name"
                    control={control}
                    placeholder={t('fields.fullName.placeholder')}
                    required
                />

                {/* Giới tính */}
                <div className="flex flex-col gap-[4px]">
                    <label className="flex font-inter text-[12px] text-[#333]">
                        {t('fields.gender.label')} <span className="text-[#E60A32] font-bold">*</span>
                    </label>
                    <div className="flex gap-6">
                        <InputRadio
                            id="gender-male"
                            name="gender"
                            control={control}
                            label={t('fields.gender.male')}
                            value="male"
                            checked={watch('gender') === 'male'}
                        />
                        <InputRadio
                            id="gender-female"
                            name="gender"
                            control={control}
                            label={t('fields.gender.female')}
                            value="female"
                            checked={watch('gender') === 'female'}
                        />
                    </div>
                </div>

                {/* Số Căn cước công dân */}
                <InputField
                    label={t('fields.idNumber.label')}
                    name="id_number"
                    control={control}
                    placeholder={t('fields.idNumber.placeholder')}
                    maxLength={12}
                    required
                />

                {/* Ngày sinh */}
                <div className="flex flex-col gap-[4px]">
                    <label className="flex font-inter text-[12px] text-[#333]">
                        {t('fields.birthDate.label')} <span className="text-[#E60A32] font-bold">*</span>
                    </label>
                    <DatePicker
                        value={watch('birth_day')}
                        onChange={(date) => setValue('birth_day', moment(date).format('DD/MM/YYYY'))}
                        placeholder={t('fields.birthDate.placeholder')}
                    />
                </div>

                {/* Ngày cấp và Ngày hết hạn */}
                <div className="flex gap-4">
                    <div className="flex-1">
                        <div className="flex flex-col gap-[4px]">
                            <label className="flex font-inter text-[12px] text-[#333]">
                                {t('fields.issueDate.label')} <span className="text-[#E60A32] font-bold">*</span>
                            </label>
                            <DatePicker
                                value={watch('issue_date')}
                                onChange={(date) => setValue('issue_date', moment(date).format('DD/MM/YYYY'))}
                                placeholder={t('fields.issueDate.placeholder')}
                            />
                        </div>
                    </div>
                </div>
                <label className="flex font-inter text-[12px] text-[#333]">
                     {t('fields.issuePlace.label')} <span className="text-[#E60A32] font-bold">*</span>
                </label>
                <Controller
                    name="issue_place"
                    control={control}
                    render={({ field }) => {
                        const options = [
                            { value: "BCA", label: t('fields.issuePlace.options.BCA') },
                            { value: "CCC", label: t('fields.issuePlace.options.CCC') },
                            { value: "CCD", label: t('fields.issuePlace.options.CCD') },
                            { value: "CXN", label: t('fields.issuePlace.options.CXN') },
                        ];

                        return (
                            <Select
                                id="issue_place"
                                label={t('fields.issuePlace.label')}
                                options={options}
                                value={options.find(option => option.value === field.value) || null}
                                onChange={(selectedOption) => {
                                    field.onChange(selectedOption ? selectedOption.value : '');
                                }}
                                placeholder={t('fields.issuePlace.placeholder')}
                                className={"!mt-1"}
                                required
                                menuPlacement={"top"}
                            />
                        );
                    }}
                />

                {/* Nơi thường trú */}
                <InputField
                    label={t('fields.address.label')}
                    name="address"
                    control={control}
                    placeholder={t('fields.address.placeholder')}
                    required
                />
            </div>
        </div>
    );
};

export default InfoReview;
