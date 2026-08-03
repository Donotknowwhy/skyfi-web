'use client';

import { modal, useModal } from '@/app/utils/modal';
import { useEffect, useRef, useState } from 'react';

// PDF Viewer Modal Content Component
const PdfViewerContent = ({ pdfBase64, pdfUrl, title = 'Hợp đồng' }) => {
  const { close } = useModal();
  const containerRef = useRef(null);
  const viewerRef = useRef(null);
  const [pdfDoc, setPdfDoc] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [scale, setScale] = useState(1);
  const [loading, setLoading] = useState(true);
  const [containerWidth, setContainerWidth] = useState(0);

  // Get container width for fit-to-width calculation
  useEffect(() => {
    if (!viewerRef.current) return;

    const updateWidth = () => {
      if (viewerRef.current) {
        setContainerWidth(viewerRef.current.clientWidth - 32); // minus padding
      }
    };

    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  // Block pinch-to-zoom on Android (iOS WebView already disables it)
  useEffect(() => {
    const el = viewerRef.current;
    if (!el) return;

    const preventPinchZoom = (e) => {
      if (e.touches && e.touches.length > 1) {
        e.preventDefault();
      }
    };

    el.addEventListener('touchmove', preventPinchZoom, { passive: false });
    return () => el.removeEventListener('touchmove', preventPinchZoom);
  }, []);

  // Load PDF document
  useEffect(() => {
    if (!pdfBase64 && !pdfUrl) return;

    const loadPdf = async () => {
      try {
        setLoading(true);
        // Dynamic import pdfjs-dist legacy build for client-side only
        const pdfjsLib = await import('pdfjs-dist/legacy/build/pdf.mjs');
        // Use unpkg CDN for the worker
        pdfjsLib.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjsLib.version}/legacy/build/pdf.worker.min.mjs`;

        let pdf;
        if (pdfBase64) {
          const pdfData = atob(pdfBase64);
          const pdfArray = new Uint8Array(pdfData.length);
          for (let i = 0; i < pdfData.length; i++) {
            pdfArray[i] = pdfData.charCodeAt(i);
          }
          pdf = await pdfjsLib.getDocument({ data: pdfArray }).promise;
        } else if (pdfUrl) {
          // Fetch the PDF as ArrayBuffer
          const response = await fetch(pdfUrl);
          if (!response.ok) throw new Error('Failed to fetch PDF');
          const arrayBuffer = await response.arrayBuffer();
          pdf = await pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer) }).promise;
        }
        setPdfDoc(pdf);
        setTotalPages(pdf.numPages);
        setLoading(false);
      } catch (error) {
        console.error('Error loading PDF:', error);
        setLoading(false);
      }
    };

    loadPdf();

    return () => {
      setPdfDoc(null);
    };
  }, [pdfBase64, pdfUrl]);

  // Render all pages with fit-to-width
  useEffect(() => {
    if (!pdfDoc || !containerRef.current || containerWidth === 0) return;

    const renderAllPages = async () => {
      const container = containerRef.current;
      container.innerHTML = '';

      for (let pageNum = 1; pageNum <= pdfDoc.numPages; pageNum++) {
        const page = await pdfDoc.getPage(pageNum);

        // Calculate scale to fit width
        const originalViewport = page.getViewport({ scale: 1 });
        const fitScale = (containerWidth / originalViewport.width) * scale;
        const viewport = page.getViewport({ scale: fitScale });

        // Create wrapper for each page
        const pageWrapper = document.createElement('div');
        pageWrapper.className = 'pdf-page-wrapper mb-4 bg-white rounded-lg shadow-md overflow-hidden';

        const canvas = document.createElement('canvas');
        canvas.className = 'block mx-auto';
        const pixelRatio = window.devicePixelRatio || 1;
        canvas.width = viewport.width * pixelRatio;
        canvas.height = viewport.height * pixelRatio;
        // Use actual pixel dimensions to allow zoom to work
        canvas.style.width = `${viewport.width}px`;
        canvas.style.height = `${viewport.height}px`;

        const context = canvas.getContext('2d');
        context.scale(pixelRatio, pixelRatio);
        await page.render({
          canvasContext: context,
          viewport: viewport,
        }).promise;

        pageWrapper.appendChild(canvas);

        // Add page number label
        const pageLabel = document.createElement('div');
        pageLabel.className = 'text-center text-sm text-gray-500 py-2 bg-gray-50 border-t border-gray-200';
        pageLabel.textContent = `Trang ${pageNum} / ${pdfDoc.numPages}`;
        pageWrapper.appendChild(pageLabel);

        container.appendChild(pageWrapper);
      }
    };

    renderAllPages();
  }, [pdfDoc, scale, containerWidth]);

  const handleZoomIn = () => setScale((prev) => Math.min(prev + 0.25, 3));
  const handleZoomOut = () => setScale((prev) => Math.max(prev - 0.25, 0.5));
  const handleFitWidth = () => setScale(1);

  return (
    <div className="flex flex-col h-full overflow-hidden bg-white">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-white rounded-t-2xl shrink-0">
        <h3 className="text-lg font-semibold text-[#333333] truncate">{title}</h3>

        {/* Zoom Controls */}
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={handleZoomOut}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 active:bg-gray-200"
            title="Thu nhỏ"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 12H19" stroke="#333333" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
          <button
            type="button"
            onClick={handleFitWidth}
            className="text-xs text-gray-600 min-w-[45px] text-center px-1 py-1 rounded hover:bg-gray-100"
            title="Vừa màn hình"
          >
            {Math.round(scale * 100)}%
          </button>
          <button
            type="button"
            onClick={handleZoomIn}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 active:bg-gray-200"
            title="Phóng to"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5V19M5 12H19" stroke="#333333" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>

          <div className="w-px h-5 bg-gray-300 mx-1" />

          <button
            type="button"
            onClick={close}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100 active:bg-gray-200"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="#333333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* PDF Viewer */}
      <div ref={viewerRef} className="flex-1 overflow-auto bg-gray-100 p-4">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <div className="flex flex-col items-center gap-3">
              <div className="w-10 h-10 border-4 border-[#DA2128] border-t-transparent rounded-full animate-spin" />
              <span className="text-gray-500">Đang tải PDF...</span>
            </div>
          </div>
        ) : (
          <div ref={containerRef} className=" w-max" />
        )}
      </div>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-gray-200 bg-white flex items-center justify-between rounded-b-2xl shrink-0">
        <span className="text-sm text-gray-500">
          {totalPages > 0 ? `${totalPages} trang` : ''}
        </span>

      </div>
    </div>
  );
};


// Function to open PDF viewer modal
export const showPdfViewerModal = ({ pdfBase64, pdfUrl, title = 'Hợp đồng' }) => {
  modal.open({
    render: <PdfViewerContent pdfBase64={pdfBase64} pdfUrl={pdfUrl} title={title} />,
    closeButton: false,
    boxClassName: 'max-w-4xl !p-0 !rounded-2xl h-[85vh] flex flex-col',
  });
};

export default PdfViewerContent;
