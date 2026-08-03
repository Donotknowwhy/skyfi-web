import * as yup from "yup";

export const videoCallSchema = yup.object().shape({
    call_id: yup.string()
        .nullable(),
    phone: yup.string()
        .required('Số thuê bao là bắt buộc'),
    seri: yup.string()
        .nullable(),
    card_type: yup.string().nullable(),
    id_number: yup.string()
        .nullable()
        .required('Số giấy tờ là bắt buộc'),
    full_name: yup.string()
        .nullable()
        .required('Họ và tên là bắt buộc'),
    birth_day: yup.string()
        .required('Ngày sinh là bắt buộc'),
    gender: yup.string()
        .nullable(),
    address: yup.string()
        .required('Nơi thường trú là bắt buộc'),
    current_address: yup.string()
        .nullable(),
    issue_date: yup.string()
        .required('Ngày cấp là bắt buộc'),
    issue_place: yup.string()
        .required('Nơi cấp là bắt buộc'),
    expiry_date: yup.string()
        .nullable(),
    image1: yup.string()
        .nullable(),
    image2: yup.string()
        .nullable(),
    image3: yup.string()
        .nullable(),
    image4: yup.string()
        .nullable(),
    contact_phone: yup.string()
        .nullable(),
    strProvince: yup.string().typeError("Vui lòng chọn Tỉnh/Thành phố")
        .nullable(),
    strDistrict: yup.string().typeError("Vui lòng chọn Quận/Huyện")
        .nullable(),
    strPrecinct: yup.string().typeError("Vui lòng chọn Phường/Xã")
        .nullable(),
    imsi: yup.string()
        .nullable(),
    city_code: yup.string().nullable(),
    nationality: yup.string().nullable(),
    package: yup.string().nullable(),
    faceScore: yup.number().nullable().transform(value => (isNaN(value) ? null : value)),
});
