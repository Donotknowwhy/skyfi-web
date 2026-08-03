import { mixed, number, object, string } from 'yup';

export const validateCheckout = object().shape({
    customer_name: string()
        .trim()
        .required('Full name is required')
        .min(2, 'Full name must be at least 2 characters')
        .max(50, 'Full name must be at most 50 characters'),
    contact_phone: string().when('isFullEsim', {
        is: false,
        then: (schema) => schema.required('Phone number is required')
            .matches(/^[0-9]{10,11}$/, 'Phone number must be 10 or 11 digits'),
        otherwise: (schema) => schema.notRequired()
    }),

    email: string()
        .email('Invalid email address')
        .required('Email is required'),
    delivery_address: string().when('isFullEsim', {
        is: false,
        then: (schema) => schema.required('Address is required')
            .min(5, 'Address must be at least 5 characters')
            .max(100, 'Address must be at most 100 characters'),
        otherwise: (schema) => schema.notRequired()
    }),

    city_id: number().when('isFullEsim', {
        is: false,
        then: (schema) => schema.required('City is required'),
        otherwise: (schema) => schema.notRequired()
    }),

    district_id: number().when('isFullEsim', {
        is: false,
        then: (schema) => schema.required('District is required'),
        otherwise: (schema) => schema.notRequired()
    }),

    ward_id: number().when('isFullEsim', {
        is: false,
        then: (schema) => schema.required('Ward is required'),
        otherwise: (schema) => schema.notRequired()
    }),

    payment_method: string()
        .required('Payment method is required'),
    hasEsim: mixed().optional(),
    agreeTerms: mixed().optional(),
    agreeTermsPhysical: mixed().optional(),
    agreeTermsEsim: mixed().optional(),
    coupon_code: string().optional(),
    discount_amount: number().optional().default(0)
});

export const validateVikkiCheckout = object().shape({
    customer_name: string()
        .trim()
        .required('Full name is required')
        .min(2, 'Full name must be at least 2 characters')
        .max(50, 'Full name must be at most 50 characters'),
    contact_phone: string().when('isFullEsim', {
        is: false,
        then: (schema) => schema.required('Phone number is required')
            .matches(/^[0-9]{10,11}$/, 'Phone number must be 10 or 11 digits'),
        otherwise: (schema) => schema.notRequired()
    }),

    email: string()
        .email('Invalid email address')
        .required('Email is required'),
    delivery_address: string().when('isFullEsim', {
        is: false,
        then: (schema) => schema.required('Address is required')
            .min(5, 'Address must be at least 5 characters')
            .max(100, 'Address must be at most 100 characters'),
        otherwise: (schema) => schema.notRequired()
    }),

    city_id: number().when('isFullEsim', {
        is: false,
        then: (schema) => schema.required('City is required'),
        otherwise: (schema) => schema.notRequired()
    }),

    district_id: number().when('isFullEsim', {
        is: false,
        then: (schema) => schema.required('District is required'),
        otherwise: (schema) => schema.notRequired()
    }),

    ward_id: number().when('isFullEsim', {
        is: false,
        then: (schema) => schema.required('Ward is required'),
        otherwise: (schema) => schema.notRequired()
    }),

    // payment_method: string()
    //     .required('Payment method is required'),
    hasEsim: mixed().optional(),
    agreeTerms: mixed().optional(),
    agreeTermsPhysical: mixed().optional(),
    agreeTermsEsim: mixed().optional(),
    coupon_code: string().optional(),
    discount_amount: number().optional().default(0)
});

export const validateHDBankCheckout = validateVikkiCheckout;
