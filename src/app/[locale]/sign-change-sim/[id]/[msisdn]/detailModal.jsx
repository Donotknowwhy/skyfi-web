'use client'
import React from 'react';
import Button from "@/app/components/form/button"; /* InfoRow component for displaying field data */
const InfoRow = ({label, value}) => (<div className="flex items-start space-x-3 py-2">
    <div className="flex-1 min-w-0">
        <div className="text-sm font-medium text-gray-500 mb-1">{label}</div>
        <div className="text-base text-gray-900 break-words">{value ||
            <span className="text-gray-400 italic">Chưa có thông tin</span>}</div>
    </div>
</div>);/* Card component for sections */
const Card = ({title, children, className = ""}) => (
    <div className={`bg-white rounded-lg border border-gray-200 shadow-sm ${className}`}>
        <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center space-x-2"><h3
                className="text-lg font-semibold text-gray-900">{title}</h3>
            </div>
        </div>
        <div className="p-6">{children}</div>
    </div>);/* Image display component */
const ImageDisplay = ({label, imageUrl, altText}) => (<div className="border rounded-lg p-3 bg-gray-50">
    <div className="text-sm font-medium text-gray-700 mb-2">{label}</div>
    {imageUrl ? (<div className="relative">
            <img className="w-full h-40 object-cover rounded"
                 src={`data:image/png;base64,${imageUrl}`}
                 alt={altText}/>
            <div
                className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-all duration-200 rounded cursor-pointer"
                // onClick={() => window.open(`data:image/png;base64,${imageUrl}`, '_blank')}
            ></div>
        </div>) :
        (<div className="w-full h-40 bg-gray-200 rounded flex items-center justify-center">
            <span
                className="text-gray-400 text-sm">Không có ảnh</span>
        </div>)}
</div>);
const toImageSrc = (imageData) => {
    if (!imageData) return null;
    if (typeof imageData === 'string') return imageData;
    if (imageData.base64) return `data:image/jpeg;base64,${imageData.base64}`;
    return null;
};
export default function DetailModal({data}) {
    const customerData = data?.data || data;
    const formatDate = (dateString) => {
        if (!dateString) return null;
        try {
            return new Date(dateString).toLocaleDateString('vi-VN');
        } catch {
            return dateString;
        }
    };
    const handleSaveAuthorizationImage = () => {
        window.open(data.rep_authorization_image_url, '_blank');
    }
    const formatGender = (gender) => gender || 'Không xác định';
    return (
        <div className="space-y-6 p-1">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Chi tiết hồ sơ khách hàng doanh
                    nghiệp</h2>
            </div>
            {/* Thông tin doanh nghiệp */}
            <Card title="Thông tin doanh nghiệp">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InfoRow label="Tên doanh nghiệp" value={customerData.company_name}/>
                    <InfoRow label="Mã số doanh nghiệp" value={customerData.company_code}/>
                    <InfoRow label="Số điện thoại công ty" value={customerData.company_phone}/>
                    <InfoRow label="Ngày hoạt động" value={formatDate(customerData.company_active_date)}/>
                </div>
            </Card>
            {customerData.signature && (
                <Card title="Chữ ký hiện tại">
                    <div className="grid grid-cols-1 gap-6">
                        <img src={customerData.signature} alt=""/>
                    </div>
                </Card>
            )}

            {/* Thông tin chủ doanh nghiệp */}
            <Card title="Thông tin chủ doanh nghiệp">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <InfoRow label="Họ và tên" value={customerData.owner_full_name}/>
                    <InfoRow label="Số giấy tờ" value={customerData.owner_id_number}/>
                    <InfoRow label="Ngày cấp" value={formatDate(customerData.owner_id_issue_date)}/>
                    {/*<InfoRow label="Nơi cấp" value={customerData.owner_id_issue_place}/>*/}
                    <InfoRow label="Ngày sinh" value={formatDate(customerData.owner_date_of_birth)}/>
                    <InfoRow label="Giới tính" value={formatGender(customerData.owner_gender)}/>
                    <InfoRow label="Quốc tịch" value={customerData.owner_nationality}/>
                </div>
                {/* Ảnh giấy tờ chủ doanh nghiệp */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <ImageDisplay label="CMND/CCCD (mặt trước)" imageUrl={toImageSrc(customerData.owner_front_id_image)}
                                  altText="CMND/CCCD mặt trước - Chủ doanh nghiệp"/>
                    <ImageDisplay label="CMND/CCCD (mặt sau)" imageUrl={toImageSrc(customerData.owner_back_id_image)}
                                  altText="CMND/CCCD mặt sau - Chủ doanh nghiệp"/>
                    <ImageDisplay label="Chân dung" imageUrl={toImageSrc(customerData.owner_portrait_image)}
                                  altText="Chân dung - Chủ doanh nghiệp"/></div>
            </Card>{/* Thông tin đại diện doanh nghiệp */}<Card title="Thông tin đại diện doanh nghiệp">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <InfoRow label="Họ và tên"
                         value={customerData.rep_full_name}/>
                <InfoRow
                    label="Số giấy tờ" value={customerData.rep_id_number}/>
                <InfoRow label="Ngày cấp"
                         value={formatDate(customerData.rep_id_issue_date)}/>
                {/*<InfoRow*/}
                {/*    label="Nơi cấp" value={customerData.rep_id_issue_place}/>*/}
                <InfoRow label="Ngày sinh"
                         value={formatDate(customerData.rep_date_of_birth)}/>
                <InfoRow
                    label="Giới tính" value={formatGender(customerData.rep_gender)}/>
                <InfoRow label="Quốc tịch"
                         value={customerData.rep_nationality}/>
            </div>
            {/* Thông tin ủy quyền */}
            <div className="border-t pt-6 mb-6">
                <h4
                    className="text-lg font-medium text-gray-900 mb-4 flex items-center">Thông tin ủy quyền</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <InfoRow label="Số giấy ủy quyền"
                             value={customerData.rep_authorization_number}/>
                    <InfoRow
                        label="Ngày bắt đầu" value={formatDate(customerData.rep_authorization_start_date)}/>
                    <InfoRow
                        label="Ngày kết thúc" value={formatDate(customerData.rep_authorization_end_date)}/>
                </div>
            </div>
            {/* Ảnh giấy tờ đại diện */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <ImageDisplay label="CMND/CCCD (mặt trước)"
                              imageUrl={toImageSrc(customerData.rep_front_id_image)}
                              altText="CMND/CCCD mặt trước - Đại diện"/>
                <ImageDisplay
                    label="CMND/CCCD (mặt sau)" imageUrl={toImageSrc(customerData.rep_back_id_image)}
                    altText="CMND/CCCD mặt sau - Đại diện"/>
                <ImageDisplay label="Chân dung"
                              imageUrl={toImageSrc(customerData.rep_portrait_image)}
                              altText="Chân dung - Đại diện"/>
                {/*<ImageDisplay*/}
                {/*    label="Giấy ủy quyền"*/}
                {/*    imageUrl={toImageSrc(customerData.rep_authorization_image) || customerData.rep_authorization_image_url}*/}
                {/*    altText="Giấy ủy quyền"/>*/}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <Button onClick={() => {
                    handleSaveAuthorizationImage()
                }} label={"Tải ảnh giấy ủy quyền"}></Button>
            </div>
        </Card>
            {/* Thông tin chủ thuê bao */}
            <Card title="Thông tin chủ thuê bao">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <InfoRow label="Họ và tên"
                             value={customerData.subscriber_owner_full_name}/>
                    <InfoRow
                        label="Số giấy tờ" value={customerData.subscriber_owner_id_number}/>
                    <InfoRow label="Ngày cấp"
                             value={formatDate(customerData.subscriber_owner_id_issue_date)}/>
                    {/*<InfoRow*/}
                    {/*    label="Nơi cấp" value={customerData.subscriber_owner_id_issue_place}/>*/}
                    <InfoRow label="Ngày sinh"
                             value={formatDate(customerData.subscriber_owner_date_of_birth)}/>
                    <InfoRow
                        label="Giới tính" value={formatGender(customerData.subscriber_owner_gender)}/>
                    <InfoRow label="Quốc tịch"
                             value={customerData.subscriber_owner_nationality}/>
                    {/*<InfoRow*/}
                    {/*    label="Số điện thoại liên hệ" value={customerData.contact_phone}/>*/}
                </div>
                {/* Ảnh giấy tờ chủ thuê bao */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <ImageDisplay label="CMND/CCCD (mặt trước)"
                                  imageUrl={toImageSrc(customerData.subscriber_owner_front_id_image)}
                                  altText="CMND/CCCD mặt trước - Chủ thuê bao"/>
                    <ImageDisplay
                        label="CMND/CCCD (mặt sau)" imageUrl={toImageSrc(customerData.subscriber_owner_back_id_image)}
                        altText="CMND/CCCD mặt sau - Chủ thuê bao"/>
                    <ImageDisplay label="Chân dung"
                                  imageUrl={toImageSrc(customerData.subscriber_owner_portrait_image)}
                                  altText="Chân dung - Chủ thuê bao"/>
                </div>
            </Card>
        </div>);
}
