'use client'

import {useLocale} from "next-intl";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { useState, useEffect } from "react";
import * as pdfjsLib from 'pdfjs-dist';
import {trackPageView} from "@/app/utils/trackingHelper";

const SampleContract = () => {
    const locale = useLocale();
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedPdf, setSelectedPdf] = useState('');
    const [pdfDocument, setPdfDocument] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        trackPageView().catch(err => console.error('Track page view error:', err));
    }, []);

    // Translations object
    const translations = {
        vi: {
            title: "Hợp đồng mẫu",
            documentList: "Danh mục tài liệu",
            documents: {
                1: "BẢN XÁC NHẬN THÔNG TIN THUÊ BAO ĐĂNG KÝ DỊCH VỤ VIỄN THÔNG DI ĐỘNG MẶT ĐẤT 1",
                2: "HỢP ĐỒNG CUNG CẤP VÀ SỬ DỤNG DỊCH VỤ VIỄN THÔNG DI ĐỘNG MẶT ĐẤT (HÌNH THỨC THANH TOÁN TRẢ TRƯỚC)1",
                3: "BIỂU MẪU 01 - DANH SÁCH THUÊ BAO ĐĂNG KÝ SỬ DỤNG DỊCH VỤ VIỄN THÔNG DI ĐỘNG MẶT ĐẤT, HÌNH THỨC THÀNH TOÁN TRẢ TRƯỚC1",
                4: "BIỂU MẪU 02 - DANH SÁCH CÁ NHÂN SỬ DỤNG SỐ THUÊ BAO THUỘC TỔ CHỨC1",
                5: "BIÊN BẢN CHUYỂN QUYỀN SỬ DỤNG DỊCH VỤ VIỄN THÔNG DI ĐỘNG MẶT ĐẤT HÌNH THỨC THANH TOÁN TRẢ TRƯỚC1"
            },
            pdfViewer: "Xem tài liệu PDF",
            loading: "Đang tải PDF...",
            previousPage: "Trang trước",
            nextPage: "Trang sau",
            pageInfo: "Trang",
            of: "của",
            errorLoadPdf: "Không thể tải file PDF. Vui lòng thử lại.",
            errorRenderPage: "Lỗi khi render trang PDF:"
        },
        en: {
            title: "Sample Contract",
            documentList: "Document List",
            documents: {
                1: "SUBSCRIBER INFORMATION CONFIRMATION FOR TERRESTRIAL MOBILE TELECOMMUNICATION SERVICE REGISTRATION 1",
                2: "CONTRACT FOR PROVISION AND USE OF TERRESTRIAL MOBILE TELECOMMUNICATION SERVICE (PREPAID PAYMENT METHOD)1",
                3: "FORM 01 - LIST OF SUBSCRIBERS REGISTERING FOR TERRESTRIAL MOBILE TELECOMMUNICATION SERVICE, PREPAID PAYMENT METHOD1",
                4: "FORM 02 - LIST OF INDIVIDUALS USING SUBSCRIBER NUMBERS BELONGING TO ORGANIZATIONS1",
                5: "MINUTES OF TRANSFER OF USAGE RIGHTS FOR TERRESTRIAL MOBILE TELECOMMUNICATION SERVICE PREPAID PAYMENT METHOD1"
            },
            pdfViewer: "View PDF Document",
            loading: "Loading PDF...",
            previousPage: "Previous",
            nextPage: "Next",
            pageInfo: "Page",
            of: "of",
            errorLoadPdf: "Unable to load PDF file. Please try again.",
            errorRenderPage: "Error rendering PDF page:"
        }
    };

    // Get current language translations
    const t = translations[locale] || translations.vi;

    // Mapping files PDF tương ứng với từng mục
    const pdfFiles = {
        1: 'BAN_XAC_NHAN_THONG_TIN_THUE_BAO.pdf',
        2: 'HOP_DONG_CUNG_CAP_VA_SU_DUNG_DICH_VU.pdf',
        3: 'BIEU_MAU_01_DANH_SACH_THUE_BAO_KH_CA_NHAN_TU_THUE_BAO_THU_4_TRO.pdf',
        4: 'BIEU_MAU_02_DANH_SACH_CA_NHAN_DUOC_GIAO_SU_DUNG_SO_THUE_BAO_KH.pdf',
        5: 'BIEN_BAN_CHUYEN_QUYEN_SU_DUNG.pdf'
    };

    useEffect(() => {
        // Setup PDF.js worker — bundle locally instead of relying on a CDN.
        // pdfjs-dist v5 ships the worker as an ES module (.mjs); the bundler
        // resolves this URL to a local asset.
        pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
            'pdfjs-dist/build/pdf.worker.min.mjs',
            import.meta.url
        ).toString();

    }, []);

    const openPdfPopup = async (itemNumber) => {
        const pdfPath = `/assets/document/sample-contract/${pdfFiles[itemNumber]}`;

        try {
            setLoading(true);
            setSelectedPdf(pdfPath);
            setIsPopupOpen(true);
            setCurrentPage(1);

            const loadingTask = pdfjsLib.getDocument(pdfPath);
            const pdf = await loadingTask.promise;
            setPdfDocument(pdf);
            setTotalPages(pdf.numPages);
            setLoading(false);
        } catch (error) {
            console.error(t.errorRenderPage, error);
            alert(t.errorLoadPdf);
            setLoading(false);
            setIsPopupOpen(false);
        }
    };

    const renderPdfPage = async (pageNumber) => {
        if (!pdfDocument) return;

        try {
            const page = await pdfDocument.getPage(pageNumber);
            const canvas = document.getElementById('pdf-canvas');
            const context = canvas.getContext('2d');

            const viewport = page.getViewport({ scale: 1.5 });
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            const renderContext = {
                canvasContext: context,
                viewport: viewport
            };

            await page.render(renderContext).promise;
        } catch (error) {
            console.error(t.errorRenderPage, error);
        }
    };

    useEffect(() => {
        if (pdfDocument && isPopupOpen) {
            renderPdfPage(currentPage);
        }
    }, [pdfDocument, currentPage, isPopupOpen]);

    const closePopup = () => {
        setIsPopupOpen(false);
        setPdfDocument(null);
        setSelectedPdf('');
        setCurrentPage(1);
        setTotalPages(0);
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <div className="flex flex-col min-h-screen font-koho">
            <Header/>
            <main className="">
                <div
                    className="w-full h-[55px] md:h-[340px] flex items-center relative bg-[#ED1B2F] bg-center text-white rounded-b-3xl">
                    <img src="/assets/policy_header.png" alt="" className={"w-1/6 sm:w-fit"}/>
                    <h1 className="font-bold text-[24px] md:text-[70px] leading-[1.2em] z-10 text-center px-4">
                        {t.title}
                    </h1>
                </div>
                <div className={"container md:p-32 font-semibold font-inter my-4"}>
                    <p>{t.documentList}</p>
                    <p className={"cursor-pointer my-2 hover:text-blue-600 transition-colors"}
                       onClick={() => openPdfPopup(1)}>
                        1. {t.documents[1]}
                    </p>
                    <p className={"cursor-pointer my-2 hover:text-blue-600 transition-colors"}
                       onClick={() => openPdfPopup(2)}>
                        2. {t.documents[2]}
                    </p>
                    <p className={"cursor-pointer my-2 hover:text-blue-600 transition-colors"}
                       onClick={() => openPdfPopup(3)}>
                        3. {t.documents[3]}
                    </p>
                    <p className={"cursor-pointer my-2 hover:text-blue-600 transition-colors"}
                       onClick={() => openPdfPopup(4)}>
                        4. {t.documents[4]}
                    </p>
                    <p className={"cursor-pointer my-2 hover:text-blue-600 transition-colors"}
                       onClick={() => openPdfPopup(5)}>
                        5. {t.documents[5]}
                    </p>
                </div>
            </main>
            <Footer/>

            {/* PDF Popup */}
            {isPopupOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg max-w-4xl max-h-[95vh] w-full mx-4 overflow-hidden">
                        {/* Header */}
                        <div className="flex items-center justify-between p-4 border-b">
                            <h3 className="text-lg font-semibold">{t.pdfViewer}</h3>
                            <button
                                onClick={closePopup}
                                className="text-gray-500 hover:text-gray-700 text-2xl"
                            >
                                ×
                            </button>
                        </div>

                        {/* PDF Viewer */}
                        <div className="p-4">
                            {loading ? (
                                <div className="flex items-center justify-center h-96">
                                    <div className="text-center">
                                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
                                        <p className="mt-4">{t.loading}</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="text-center">
                                    <canvas
                                        id="pdf-canvas"
                                        className="border max-w-full max-h-[75vh] mx-auto"
                                    ></canvas>

                                    {/* Navigation Controls */}
                                    {totalPages > 0 && (
                                        <div className="flex items-center justify-center mt-4 space-x-4">
                                            <button
                                                onClick={goToPreviousPage}
                                                disabled={currentPage <= 1}
                                                className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-600"
                                            >
                                                {t.previousPage}
                                            </button>
                                            <span className="px-4 py-2">
                                                {t.pageInfo} {currentPage} {t.of} {totalPages}
                                            </span>
                                            <button
                                                onClick={goToNextPage}
                                                disabled={currentPage >= totalPages}
                                                className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed hover:bg-blue-600"
                                            >
                                                {t.nextPage}
                                            </button>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SampleContract
