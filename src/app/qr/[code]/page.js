'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import moment from 'moment';
import axios from "axios";

// Set Vietnamese locale for moment
moment.locale('vi');

export default function QRCodePage() {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [qrImage,setQrImage]=useState(null);

  useEffect(() => {
    const fetchQRData = async () => {
      try {
        setLoading(true);

       const res =await axios.get(process.env.NEXT_PUBLIC_API_BASE_URL+"/tool/qr_code/"+params.code)
          if(res.data.result.data){
              setQrImage(res.data.result.data)
          }
          else {
              setError(res.data.message)
          }
        setLoading(false);


      } catch (err) {
        setError('Không thể tải dữ liệu QR code');
        setLoading(false);
      }
    };

    if (params.code) {
      fetchQRData();
    }
  }, [params.code]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Đang tải...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Có lỗi xảy ra</h1>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6">
          {/* Header */}

          {/* Content */}
            <div className="flex justify-center items-center h-screen bg-gray-50">
                <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-sm">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Mã QR của bạn</h2>
                    <div className="w-64 h-64 mx-auto border border-gray-200 rounded-lg overflow-hidden flex items-center justify-center p-2">
                        {qrImage ?(<img
                            src={"data:image/png;base64,"+ qrImage}
                            alt="Mã QR"
                            className="w-full h-full object-contain"
                        />):(
                            <p>{error}</p>
                        )}

                    </div>
                    <p className="text-gray-600 mt-6 text-sm">Quét mã để truy cập nội dung.</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
