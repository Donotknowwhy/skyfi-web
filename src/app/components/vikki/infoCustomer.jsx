'use client';

import { useFormContext, useWatch } from 'react-hook-form';

const InfoCustomer = () => {
    const { control, register, formState: { errors } } = useFormContext();

    const isSim = useWatch( { control, name: 'dataSim.isSim' } );



    return (
        <div className="flex flex-col gap-4 w-full mt-4 bg-white p-4 shadow-md rounded-lg">
            {/* Section Title */ }

            <h3 className="text-lg font-semibold text-[#333333] font-inter">
                Thông tin liên lạc
            </h3>

            <p className="text-xs text-[#5C5C5C] font-inter leading-relaxed">
                Chúng tôi sẽ liên hệ và gửi thông tin đến bạn qua thông tin liên hệ dưới đây
            </p>



            {/* Email Input */ }
            <div className="flex flex-col gap-2 border rounded-xl px-4 py-3">
                <label className="text-sm font-medium text-[#333333] font-inter">
                    Email <span className="text-red-500">*</span>
                </label>
                <input
                    type="email"
                    { ...register( 'data.email', {
                        required: 'Vui lòng nhập email',
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Email không đúng định dạng'
                        }
                    } ) }
                    placeholder="Nhập địa chỉ email"
                    className={ `w-full text-sm font-inter placeholder-[#A1A1A1] focus:outline-none focus:ring-2 focus:ring-[#0000EA] focus:border-transparent transition-all ${ errors.email ? 'border-red-500' : 'border-[#E5E5E5]'
                        }` }
                />
            </div>
                { errors.data?.email && (
                    <span className="text-xs text-red-500 font-inter">{ errors.data.email.message }</span>
                ) }

            {/* Phone Number Input */ }
            { isSim == '0' && <div className="flex flex-col gap-2 border rounded-xl px-4 py-3">
                <label className="text-sm font-medium text-[#333333] font-inter">
                    Số điện thoại <span className="text-red-500">*</span>
                </label>
                <input
                    type="tel"
                    { ...register( 'data.phoneNumber', {
                        required: 'Vui lòng nhập số điện thoại',
                        pattern: {
                            value: /^[0-9]{10,11}$/,
                            message: 'Số điện thoại phải có 10-11 chữ số'
                        }
                    } ) }
                    placeholder="Nhập số điện thoại"
                    className={ `w-full text-sm font-inter placeholder-[#A1A1A1] focus:outline-none focus:ring-2 focus:ring-[#0000EA] focus:border-transparent transition-all ${ errors.phoneNumber ? 'border-red-500' : 'border-[#E5E5E5]'
                        }` }
                />
            </div> }
                { errors.data?.phoneNumber && (
                    <span className="text-xs text-red-500 font-inter">{ errors.data.phoneNumber.message }</span>
            ) }

                {/* Full Name Input */ }
            <div className="flex flex-col gap-2 border rounded-xl px-4 py-3">
                <label className="text-sm font-medium text-[#333333] font-inter ">
                    Họ và tên
                    {/* <span className="text-red-500">*</span> */}
                </label>
                <input
                    type="text"
                    { ...register( 'data.fullName', {
                        // required: 'Vui lòng nhập họ và tên',
                        minLength: { value: 2, message: 'Họ và tên phải có ít nhất 2 ký tự' }
                    } ) }
                    placeholder="Nhập họ và tên"
                    className={ `w-full   text-sm font-inter placeholder-[#A1A1A1] focus:outline-none focus:ring-2 focus:ring-[#0000EA] focus:border-transparent transition-all ${ errors.fullName ? 'border-red-500' : 'border-[#E5E5E5]'
                        }` }
                />
            </div>
            { errors.data?.fullName && (
                <span className="text-xs text-red-500 font-inter">{ errors.data.fullName.message }</span>
            ) }


        </div>
    );
};

export default InfoCustomer;
