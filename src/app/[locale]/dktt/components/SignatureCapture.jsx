import {useLocale, useTranslations} from "next-intl";
import * as pdfjsLib from 'pdfjs-dist';
import { useEffect, useRef, useState } from 'react';
import SignatureCanvas from 'react-signature-canvas';

// Cấu hình worker cho pdfjs
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js`;

const SignatureCapture = ({signatureRef, setSignatureData, clearSignature, getForm, registerForm}) => {
    const [isAgreed, setIsAgreed] = useState(false);
    const [isLoadingForm, setIsLoadingForm] = useState(false);
    const [showFormPopup, setShowFormPopup] = useState(false);
    const [pdfDoc, setPdfDoc] = useState(null);
    const [numPages, setNumPages] = useState(0);
    const [scale, setScale] = useState(1.2);
    const [isLoadingPdf, setIsLoadingPdf] = useState(false);
    const [renderedPages, setRenderedPages] = useState([]);
    const [showTerms, setShowTerms] = useState(false);
    const [showDataProtectionPolicy, setShowDataProtectionPolicy] = useState(false);
    const [showPdfPopup, setShowPdfPopup] = useState(false);
    const [pdfDocStatic, setPdfDocStatic] = useState(null);
    const [numPagesStatic, setNumPagesStatic] = useState(0);
    const [renderedPagesStatic, setRenderedPagesStatic] = useState([]);
    const [isLoadingPdfStatic, setIsLoadingPdfStatic] = useState(false);
    const containerRef = useRef(null);
    const t = useTranslations("dktt.signatureCapture");
    const locale = useLocale();

    const handleGetForm = async () => {
        setIsLoadingForm(true);
        try {
            await getForm();
            setShowFormPopup(true);
        } catch (error) {
            console.error('Lỗi khi tải phiếu:', error);
        } finally {
            setIsLoadingForm(false);
        }
    };

    const closePopup = () => {
        setShowFormPopup(false);
        setScale(1.2);
        setPdfDoc(null);
        setRenderedPages([]);
    };

    // Load PDF khi popup mở và có registerForm
    useEffect(() => {
        if (showFormPopup && registerForm) {
            loadPDF();
        }
    }, [showFormPopup, registerForm]);

    // Render tất cả trang khi có thay đổi scale
    useEffect(() => {
        if (pdfDoc && numPages > 0) {
            renderAllPages();
        }
    }, [pdfDoc, scale]);

    // Render tất cả trang cho PDF tĩnh
    useEffect(() => {
        if (pdfDocStatic && numPagesStatic > 0) {
            renderAllPagesStatic();
        }
    }, [pdfDocStatic]);

    // Load PDF khi mở popup PDF tĩnh
    useEffect(() => {
        if (showPdfPopup) {
            loadStaticPDF();
        }
    }, [showPdfPopup]);

    const loadPDF = async () => {
        setIsLoadingPdf(true);
        setRenderedPages([]);
        try {
            // Chuyển base64 thành Uint8Array
            const binaryString = atob(registerForm);
            const bytes = new Uint8Array(binaryString.length);
            for (let i = 0; i < binaryString.length; i++) {
                bytes[i] = binaryString.charCodeAt(i);
            }

            const pdf = await pdfjsLib.getDocument({data: bytes}).promise;
            setPdfDoc(pdf);
            setNumPages(pdf.numPages);
            console.log('PDF đã tải thành công với', pdf.numPages, 'trang');
        } catch (error) {
            console.error('Lỗi khi tải PDF:', error);
            alert(t("popup.errorLoadPdf"));
        } finally {
            setIsLoadingPdf(false);
        }
    };

    const renderAllPages = async () => {
        if (!pdfDoc) return;

        const pages = [];

        for (let pageNum = 1; pageNum <= numPages; pageNum++) {
            try {
                const page = await pdfDoc.getPage(pageNum);
                const viewport = page.getViewport({scale});

                // Tạo canvas cho từng trang
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = viewport.width;
                canvas.height = viewport.height;

                const renderContext = {
                    canvasContext: ctx,
                    viewport: viewport,
                };

                await page.render(renderContext).promise;

                // Chuyển canvas thành data URL
                const imageData = canvas.toDataURL('image/png');

                pages.push({
                    pageNumber: pageNum,
                    imageData: imageData,
                    width: viewport.width,
                    height: viewport.height
                });

            } catch (error) {
                console.error(`Lỗi khi render trang ${pageNum}:`, error);
            }
        }

        setRenderedPages(pages);
    };

    const loadStaticPDF = async () => {
        setIsLoadingPdfStatic(true);
        setRenderedPagesStatic([]);
        try {
            // Load PDF từ public folder
            const response = await fetch('/assets/document/dktt/GT_Chap_thuan_xu_ly_du_lieu_ca_nhan.pdf');
            const arrayBuffer = await response.arrayBuffer();
            const uint8Array = new Uint8Array(arrayBuffer);

            const pdf = await pdfjsLib.getDocument({data: uint8Array}).promise;
            setPdfDocStatic(pdf);
            setNumPagesStatic(pdf.numPages);
            console.log('PDF tĩnh đã tải thành công với', pdf.numPages, 'trang');
        } catch (error) {
            console.error('Lỗi khi tải PDF tĩnh:', error);
            alert('Không thể tải file PDF. Vui lòng thử lại.');
        } finally {
            setIsLoadingPdfStatic(false);
        }
    };

    const renderAllPagesStatic = async () => {
        if (!pdfDocStatic) return;

        const pages = [];

        for (let pageNum = 1; pageNum <= numPagesStatic; pageNum++) {
            try {
                const page = await pdfDocStatic.getPage(pageNum);
                const viewport = page.getViewport({scale: 1.2});

                // Tạo canvas cho từng trang
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = viewport.width;
                canvas.height = viewport.height;

                const renderContext = {
                    canvasContext: ctx,
                    viewport: viewport,
                };

                await page.render(renderContext).promise;

                // Chuyển canvas thành data URL
                const imageData = canvas.toDataURL('image/png');

                pages.push({
                    pageNumber: pageNum,
                    imageData: imageData,
                    width: viewport.width,
                    height: viewport.height
                });

            } catch (error) {
                console.error(`Lỗi khi render trang tĩnh ${pageNum}:`, error);
            }
        }

        setRenderedPagesStatic(pages);
    };

    const closePdfPopup = () => {
        setShowPdfPopup(false);
        setPdfDocStatic(null);
        setRenderedPagesStatic([]);
    };
    useEffect(() => {
        if (!isAgreed) {
            setSignatureData(null)
        }
    }, [isAgreed]);


    return (
        <div className="px-6 pb-6">
            <h2 className="text-2xl font-bold text-black mb-6">{t("title")}</h2>

            {/* Terms and Conditions */}
            <div className="mb-6">
                <div className="flex items-start mb-4">
                    <input
                        type="checkbox"
                        id="agreement"
                        checked={isAgreed}
                        onChange={(e) => setIsAgreed(e.target.checked)}
                        className="mt-1 mr-3 w-5 h-5 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                    />
                    <label htmlFor="agreement" className="text-gray-800 font-medium">
                        {t("agreement.label")}
                    </label>
                </div>

                {/* Nút xem thêm/ẩn bớt điều khoản */}
                <div className="ml-8 mb-4">
                    <button
                        onClick={() => setShowTerms(!showTerms)}
                        className="text-blue-500 hover:text-blue-700 text-sm font-medium underline"
                    >
                        {!showTerms ? t("showTerms") :t("hideTerms")}
                    </button>
                </div>

                {/* Chi tiết điều khoản - chỉ hiển thị khi showTerms = true */}
                {showTerms && (
                    <div className="space-y-4 text-gray-600 text-sm ml-8">
                        <div className="flex items-start">
                            <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <p>{t("agreement.condition1")}</p>
                        </div>

                        <div className="flex items-start">
                            <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <p>{t("agreement.condition2")}</p>
                        </div>
                        <div className="flex items-start">
                            <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <p>{t("agreement.condition4")} <span className={"text-yellow-500 underline cursor-pointer"}
                                                                 onClick={()=>setShowDataProtectionPolicy(true)}
                            >{t("agreement.link1")}</span></p>
                        </div>

                        <div className="flex items-start">
                            <div className="w-2 h-2 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                            <p>{t("agreement.condition3")}
                                <span className={"text-yellow-500 underline cursor-pointer"}
                                      onClick={() => setShowPdfPopup(true)}
                            >{t("agreement.link2")}</span> {t("agreement.below")}</p>
                        </div>
                    </div>
                )}
            </div>

            <div className="mb-6">
                <p className="text-gray-600 text-sm">
                    {t("instructions.text")}{' '}
                    <button
                        className="text-blue-500 underline disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={handleGetForm}
                        disabled={isLoadingForm}
                    >
                        {isLoadingForm ? t("instructions.loadingText") : t("instructions.linkText")}
                    </button>
                </p>
                {!isAgreed && (
                    <p className="text-red-500 text-sm mt-2">
                        {t("warnings.agreeFirst")}
                    </p>
                )}
            </div>

            {/* Signature Section */}
            <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center text-red-500">
                        <span className="font-medium">{t("signature.title")}</span>
                        {!isAgreed && (
                            <span className="text-gray-400 text-sm ml-2">{t("signature.needAgreement")}</span>
                        )}
                    </div>
                </div>

                {/* Signature Canvas */}
                <div
                    className={`border-2 rounded-xl p-1 ${isAgreed ? 'border-gray-300 bg-white' : 'border-gray-200 bg-gray-100'}`}
                    style={{height: '220px'}}>
                    {isAgreed ? (
                        <SignatureCanvas
                            ref={signatureRef}
                            canvasProps={{
                                width: 300,
                                height: 180,
                                className: 'signature-canvas rounded-xl w-full'
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
                    ) : (
                        <div className="flex items-center justify-center h-full text-gray-400">
                            <div className="text-center">
                                <p className="text-sm">{t("signature.placeholder.line1")}</p>
                                <p className="text-sm">{t("signature.placeholder.line2")}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Action buttons */}
            <div className="space-y-4">
                <button
                    onClick={clearSignature}
                    disabled={!isAgreed}
                    className="w-full py-3 bg-gray-200 text-gray-600 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {t("signature.clearButton")}
                </button>
            </div>

            {/* Form Popup với PDF cuộn */}
            {showFormPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-5xl max-h-[90vh] w-full flex flex-col overflow-hidden">
                        {/* Header cố định */}
                        <div
                            className="flex items-center justify-between p-4 border-b bg-white relative z-10 flex-shrink-0">
                            <h3 className="text-lg font-semibold text-gray-700">
                                {t("popup.title")}
                                {numPages > 0 && (
                                    <span className="text-sm text-gray-500 ml-2">
                                        {t("popup.pages", {count: numPages})}
                                    </span>
                                )}
                            </h3>
                            <button
                                onClick={closePopup}
                                className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 text-2xl font-bold w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                                style={{zIndex: 100}}
                            >
                                ×
                            </button>
                        </div>

                        {/* PDF Container với scroll */}
                        <div
                            ref={containerRef}
                            className="overflow-auto flex-1 bg-gray-100 p-4"
                        >
                            {isLoadingPdf ? (
                                <div className="flex items-center justify-center h-64">
                                    <div className="text-center">
                                        <div
                                            className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
                                        <p className="text-gray-500">{t("popup.loadingPdf")}</p>
                                    </div>
                                </div>
                            ) : registerForm ? (
                                <div className="space-y-4">
                                    {renderedPages.length === 0 && pdfDoc ? (
                                        <div className="flex items-center justify-center h-64">
                                            <div className="text-center">
                                                <div className="animate-pulse flex space-x-4">
                                                    <div className="rounded bg-gray-300 h-4 w-4"></div>
                                                    <div className="flex-1 space-y-2 py-1">
                                                        <div className="h-4 bg-gray-300 rounded"></div>
                                                    </div>
                                                </div>
                                                <p className="text-gray-500 mt-2">{t("popup.renderingPages")}</p>
                                            </div>
                                        </div>
                                    ) : (
                                        renderedPages.map((page) => (
                                            <div key={page.pageNumber} className="text-center">
                                                <div className="mb-2">
                                                    <span
                                                        className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                                                        {t("popup.pageNumber", {number: page.pageNumber})}
                                                    </span>
                                                </div>
                                                <img
                                                    src={page.imageData}
                                                    alt={t("popup.pageNumber", {number: page.pageNumber})}
                                                    className="shadow-lg border border-gray-300 bg-white mx-auto max-w-full h-auto"
                                                    style={{maxWidth: '100%'}}
                                                />
                                            </div>
                                        ))
                                    )}
                                </div>
                            ) : (
                                <div className="flex items-center justify-center h-64">
                                    <p className="text-center text-gray-500">{t("popup.noData")}</p>
                                </div>
                            )}
                        </div>

                        {/* Footer cố định */}
                        <div className="p-4 border-t bg-gray-50 flex-shrink-0">
                            <button
                                onClick={closePopup}
                                className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                            >
                                {t("popup.closeButton")}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* PDF Popup để hiển thị file tĩnh */}
            {showPdfPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-lg max-w-5xl max-h-[90vh] w-full flex flex-col overflow-hidden">
                        {/* Header cố định */}
                        <div
                            className="flex items-center justify-between p-4 border-b bg-white relative z-10 flex-shrink-0">
                            <h3 className="text-lg font-semibold text-gray-700">
                                Giấy tờ chấp thuận xử lý dữ liệu cá nhân
                                {numPagesStatic > 0 && (
                                    <span className="text-sm text-gray-500 ml-2">
                                        {t("popup.pages", {count: numPagesStatic})}
                                    </span>
                                )}
                            </h3>
                            <button
                                onClick={closePdfPopup}
                                className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 text-2xl font-bold w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                                style={{zIndex: 100}}
                            >
                                ×
                            </button>
                        </div>

                        {/* PDF Container với scroll */}
                        <div className="overflow-auto flex-1 bg-gray-100 p-4">
                            {isLoadingPdfStatic ? (
                                <div className="flex items-center justify-center h-64">
                                    <div className="text-center">
                                        <div
                                            className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
                                        <p className="text-gray-500">{t("popup.loadingPdf")}</p>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {renderedPagesStatic.length === 0 && pdfDocStatic ? (
                                        <div className="flex items-center justify-center h-64">
                                            <div className="text-center">
                                                <div className="animate-pulse flex space-x-4">
                                                    <div className="rounded bg-gray-300 h-4 w-4"></div>
                                                    <div className="flex-1 space-y-2 py-1">
                                                        <div className="h-4 bg-gray-300 rounded"></div>
                                                    </div>
                                                </div>
                                                <p className="text-gray-500 mt-2">{t("popup.renderingPages")}</p>
                                            </div>
                                        </div>
                                    ) : (
                                        renderedPagesStatic.map((page) => (
                                            <div key={page.pageNumber} className="text-center">
                                                <div className="mb-2">
                                                    <span
                                                        className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                                                        {t("popup.pageNumber", {number: page.pageNumber})}
                                                    </span>
                                                </div>
                                                <img
                                                    src={page.imageData}
                                                    alt={t("popup.pageNumber", {number: page.pageNumber})}
                                                    className="shadow-lg border border-gray-300 bg-white mx-auto max-w-full h-auto"
                                                    style={{maxWidth: '100%'}}
                                                />
                                            </div>
                                        ))
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Footer cố định */}
                        <div className="p-4 border-t bg-gray-50 flex-shrink-0">
                            <button
                                onClick={closePdfPopup}
                                className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                            >
                                {t("popup.closeButton")}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {showDataProtectionPolicy && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 flex-col">
                    <div
                        className="flex items-center justify-end p-4 border-b bg-white relative z-10 w-full">
                        <button
                            onClick={()=>setShowDataProtectionPolicy(false)}
                            className="text-gray-500 hover:text-gray-700 hover:bg-gray-100 text-2xl font-bold w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                            style={{zIndex: 100}}
                        >
                            ×
                        </button>
                    </div>
                    <iframe src={`/${locale}/personal-data-protection-policy?src=app`} className="w-full h-full"></iframe>
                </div>
            )}
        </div>
    );
};

export default SignatureCapture;
