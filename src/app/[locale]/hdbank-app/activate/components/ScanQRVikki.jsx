'use client';

import { showModalMessHDBank } from '@/app/components/modals/modalMess';
import dkttService from '@/app/services/dkttService';
import { useLoad } from '@/app/utils/load';
import { Scanner } from '@yudiel/react-qr-scanner';
import { useTranslations } from 'next-intl';
import { useCallback, useRef, useState } from 'react';
import { useFormContext } from 'react-hook-form';

const ScanQRVikki = () => {
  const t = useTranslations('hdbank.scanQR');
  const [error, setError] = useState(null);
  const [isScanning, setIsScanning] = useState(true);
  const fileInputRef = useRef(null);
  const { setValue } = useFormContext();
  const { open, close } = useLoad();

  const handleScan = useCallback((result) => {
    if (result && result.length > 0) {
      console.log(result);
      open();
      getInfoByCode(result[0].rawValue).then((res) => {
        if (res) {
          setIsScanning(false);
          setValue('page', 'inputActivate');
          setValue('data.seri', res.iccid);
          setValue('data.phone', res.msisdn);
          setValue('data.imsi', res.imsi);
        }
      }).finally(() => {
        close();
      });

    }
  }, []);
  const getInfoByCode = async (qrCode) => {
    try {
      const res = await dkttService.getInfoByCode(qrCode);
      return res;
    } catch (err) {
      showModalMessHDBank({
        label: 'Thông báo',
        message: err.message || 'Lỗi không xác định',
        type: 'error',
      });
      return null;
    }
  }

  const handleError = useCallback((err) => {
    console.error('QR Scanner error:', err);
    setError(t('cameraError'));
  }, [t]);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    open();
    setError(null);

    try {
      const img = new Image();
      const reader = new FileReader();

      reader.onload = (e) => {
        img.src = e.target?.result;
        img.onload = async () => {
          let barcodeData = null;
          try {
            const barcodeDetector = new BarcodeDetector({
              formats: ['qr_code', 'ean_13', 'ean_8', 'code_128', 'code_39', 'code_93', 'codabar', 'upc_a', 'upc_e', 'itf', 'data_matrix']
            });
            const barcodes = await barcodeDetector.detect(img);
            if (barcodes && barcodes.length > 0) {
              barcodeData = barcodes[0].rawValue;
              console.log('Barcode found (BarcodeDetector):', barcodeData, 'format:', barcodes[0].format);
            }
          } catch (err) {
            console.log('BarcodeDetector failed', err);
          }
          if (barcodeData) {
            // Process the barcode/QR code
            try {
              const res = await dkttService.getInfoByCode(barcodeData);
              if (res) {
                setIsScanning(false);
                setValue('page', 'inputActivate');
                setValue('data.seri', res.iccid);
                setValue('data.phone', res.msisdn);
                setValue('data.imsi', res.imsi);
              }
            } catch (err) {
              showModalMessHDBank({
                label: 'Thông báo',
                message: err.message || 'Lỗi không xác định',
                type: 'error',
              });
            }
          } else {
            showModalMessHDBank({
              label: 'Thông báo',
              message: 'Không tìm thấy mã QR/Barcode trong ảnh. Vui lòng thử lại với ảnh khác.',
              type: 'error',
            });
          }
          close();
        };

        img.onerror = () => {
          showModalMessHDBank({
            label: 'Thông báo',
            message: 'Không thể đọc file ảnh. Vui lòng thử lại.',
            type: 'error',
          });
          close();
        };
      };

      reader.onerror = () => {
        showModalMessHDBank({
          label: 'Thông báo',
          message: 'Không thể đọc file. Vui lòng thử lại.',
          type: 'error',
        });
        close();
      };

      reader.readAsDataURL(file);
    } catch (err) {
      console.error('Error processing uploaded image:', err);
      showModalMessHDBank({
        label: 'Thông báo',
        message: 'Lỗi xử lý ảnh. Vui lòng thử lại.',
        type: 'error',
      });
      close();
    }

    // Reset file input
    event.target.value = '';
  };

  return (
    <div className="flex flex-col h-[100dvh] bg-[#3D3D3D] relative">
      {/* Close button */}
      <div className="absolute top-14 right-4 z-30">
        <button
          onClick={() => setValue('page', 'inputActivate')}
          className="w-10 h-10 flex items-center justify-center"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 pt-[50px] px-6">
        {/* Title */}
        <h1 className="text-xl font-bold text-white text-center mb-8">
          {t('title')}
        </h1>

        {/* Scanner Area */}
        <div className="relative w-full aspect-[339/380] max-w-[339px] mx-auto rounded-xl overflow-hidden bg-white">
          {/* QR Reader */}
          {isScanning && (
            <Scanner
              onScan={handleScan}
              onError={handleError}
              constraints={{ facingMode: 'environment' }}
              scanDelay={300}
              styles={{
                container: {
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                },
                video: {
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                },
              }}
              components={{
                audio: false,
                finder: false,
              }}
            />
          )}

          {/* Corner indicators */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-white rounded-tl-xl" />
            <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-white rounded-tr-xl" />
            <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-white rounded-bl-xl" />
            <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-white rounded-br-xl" />
          </div>

          {/* Error message */}
          {error && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <p className="text-white text-sm px-4 py-2 bg-red-500/90 rounded-lg">
                {error}
              </p>
            </div>
          )}
        </div>

        {/* Instructions text */}
        <div className="mt-6 px-4">
          <p className="text-sm text-white text-center leading-6">
            {t('physicalSimNote')}
            <br />
            {t('esimNote')}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col items-center gap-3 mt-8 mb-8">
          {/* Upload QR Button */}
          <button
            onClick={handleUploadClick}
            className="py-3 px-8 rounded-full text-white font-semibold text-base flex items-center justify-center gap-2"
            style={{
              background: 'linear-gradient(90deg, #DA2128 0.2%, #DA2128 50.07%, #F9A61C 75%, #F9C016 84.97%, #FFDD00 99.93%)',
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M17 8L12 3L7 8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M12 3V15" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {t('uploadQR')}
          </button>

          {/* Hidden file input */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />

          {/* Input Serial Button */}
          <button
            onClick={() => setValue('page', 'inputActivate')}
            className="py-3 px-8 rounded-full text-white font-semibold text-base"
            style={{
              background: 'linear-gradient(90deg, #DA2128 0.2%, #DA2128 50.07%, #F9A61C 75%, #F9C016 84.97%, #FFDD00 99.93%)',
            }}
          >
            {t('inputSerial')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScanQRVikki;
