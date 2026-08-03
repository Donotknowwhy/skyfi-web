'use client';

import React, { useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Footer from "@/app/components/Footer";
import Header from "@/app/components/Header";
import SignatureCanvas from "react-signature-canvas";
import signChangeSimService from "@/app/services/signChangeSimService";
import {toast} from "react-toastify";
import Modal, {modal,useModal} from "@/app/utils/modal";

export default function CustomerSignaturePage() {
    const params = useParams();
    const router = useRouter();
    const signatureRef = useRef(null);
    const [isLoading, setIsLoading] = useState(false);
    const [signatureData,setSignatureData ]=useState("")
    const { locale, id, msisdn } = params;
    const [changeSimForm,setChangeSimForm]=useState("")

    const handleViewDocument = async () => {
        if(signatureRef.current.isEmpty()){
            toast.error("Vui lòng ký trước khi xem phiếu")
            return
        }
        setIsLoading(true);
        try {
            const res = await signChangeSimService.getChangeSimForm(id, msisdn, signatureRef.current.toDataURL().replace("data:image/png;base64,", ""));
            setChangeSimForm(res.data);
            modal.open({
                render: (
                    <div>
                        <img src={res.data} alt=""/>
                    </div>
                ),
                onClose: useModal.close,
                closeButton: true,
                boxClassName: 'max-w-[580px]',
            });
        }
        catch (error) {
            toast.error("Lỗi khi xem phiếu")
        }
        finally {
            setIsLoading(false);
        }
    };

    const handleConfirm = async () => {
        if (!signatureRef.current) {
            alert('Vui lòng ký tên trước khi xác nhận');
            return;
        }
        if(signatureRef.current.isEmpty()){
            toast.error("Vui lòng ký tên trước khi xác nhận")
            return
        }
        const signatureData = signatureRef.current.toDataURL();
        if (!changeSimForm) {
            alert('Vui lòng xem phiếu trước khi xác nhận');
            return;
        }
        setIsLoading(true);
        const res= await signChangeSimService.updateChangeSimForm(id,msisdn,signatureData.replace("data:image/png;base64,", ""),changeSimForm);
          if (res.success){
              toast.success(res.message||"Xác nhận thành công")
          }
          else {
              toast.error(res.message||"Xác nhận thất bại")
          }


        try {
        } catch (error) {
            alert('Có lỗi xảy ra, vui lòng thử lại');
        } finally {
            setIsLoading(false);
        }
    };

    const handleClearSignature = () => {
        if (signatureRef.current) {
            signatureRef.current.clear();
        }
    };

    return (
        <div className="flex flex-col min-h-screen font-koho">
            <Header/>
                {/* Main Content */}
                <div className="bg-white rounded-lg shadow-sm p-6">
                    <div className="mb-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-2">
                            Vui lòng ký tên để xác nhận thông tin
                        </h2>
                        <p className="text-gray-600 text-sm">
                            Khách hàng vui lòng xem kỹ thông tin trong phiếu và ký tên xác nhận bên dưới
                        </p>
                    </div>

                    {/* Signature Capture Area */}
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 mb-6 bg-gray-50">
                        <div className="text-center mb-4">
                            <h3 className="text-lg font-medium text-gray-900 mb-2">
                                Khu vực ký tên
                            </h3>
                            <p className="text-gray-600 text-sm">
                                Vui lòng ký tên trong khung bên dưới
                            </p>
                        </div>

                        <div className="flex justify-center">
                            <SignatureCanvas
                                ref={signatureRef}
                                canvasProps={{
                                    width: 300,
                                    height: 300,
                                    className: 'border'
                                }}
                                backgroundColor="rgba(255,255,255,1)"
                                penColor="blue"
                                onEnd={() => {
                                    if (signatureRef.current && !signatureRef.current.isEmpty()) {
                                        const signatureDataUrl = signatureRef.current.toDataURL();
                                        setSignatureData(signatureDataUrl);
                                    }
                                }}
                            />
                        </div>
                        <div className="flex justify-center mt-2">
                            <buttons
                                onClick={handleClearSignature}
                                className="flex-1 bg-red-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-red-700 transition-colors duration-200 flex items-center justify-center max-w-48 cursor-pointer"
                            >
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                                Xóa chữ ký
                            </buttons>
                        </div>
                    </div>

                    {/* Confirm Button */}
                    <div className="flex justify-center gap-2">
                        <button
                            onClick={handleViewDocument}
                            className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center max-w-[200px]"
                        >
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Đang xử lý...
                                </>
                            ) : (
                                <>
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    Xem phiếu
                                </>
                            )}
                        </button>

                        <button
                            onClick={handleConfirm}
                            disabled={isLoading}
                            className="bg-green-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center min-w-[200px]"
                        >
                            {isLoading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Đang xử lý...
                                </>
                            ) : (
                                <>
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                    Xác nhận
                                </>
                            )}
                        </button>
                    </div>
                </div>
              <Footer/>
        </div>
    );
}
