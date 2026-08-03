'use client';

import MyESimService from '@/app/services/myEsimService';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useModal } from '../../../utils/modal';

const DevicesEsim = ({showHeader=true}) => {
    const { close } = useModal();
    const locale = useLocale();
    const t = useTranslations( 'devicesEsim' );
    const [ searchTerm, setSearchTerm ] = useState( '' );
    const [ expandedBrands, setExpandedBrands ] = useState( {} );
    const [ brandModels, setBrandModels ] = useState( [] );

    const fetchBrandModels = async () => {
        try {
            const data = await MyESimService.getBrandModels();

            if ( !data || data.length === 0 ) {
                setExpandedBrands( deviceBrands );
                return;
            }
            setBrandModels( data.map( brand => ( {
                name: brand.brand,

                models: brand.devices.map( model => model.name ),
                notes: {
                    vi: [ brand.note_vi ] || [],
                    en: [ brand.note ] || []
                }
            } ) ) );

        } catch ( error ) {
            console.error( "Error fetching brand models:", error );
        }
    };

    useEffect( () => {
        fetchBrandModels();
        // Initialize expanded brands based on deviceBrands
    }, [] );
    // Device brands and their models
    const deviceBrands = [
        {
            name: 'Apple',
            models: [ "iPhone 16", "iPhone 16e", "iPhone 16 Plus", "iPhone 16 Pro", "iPhone 16 Pro Max",
                'iPhone 15 Pro Max', 'iPhone 15 Pro', 'iPhone 15 Plus', 'iPhone 15',
                'iPhone 14 Pro Max', 'iPhone 14 Pro', 'iPhone 14 Plus', 'iPhone 14',
                'iPhone 13 Pro Max', 'iPhone 13 Pro', 'iPhone 13', 'iPhone 13 mini',
                'iPhone 12 Pro Max', 'iPhone 12 Pro', 'iPhone 12', 'iPhone 12 mini',
                'iPhone SE (3rd generation)', 'iPhone 11 Pro Max', 'iPhone 11 Pro', 'iPhone 11',
                'iPhone XS Max', 'iPhone XS', 'iPhone XR', "iPad (from 7th generation)", "iPad Air (from 3rd generation)",
                "iPad Pro, 11-inch (from 1st generation)", "iPad Pro 12.9-inch (from 3rd generation)", "iPad Mini (from 5th generation)",
                'iPad Pro (6th generation)', 'iPad Pro (5th generation)', 'iPad Air (5th generation)',
                'iPad Air (4th generation)', 'iPad (10th generation)', 'iPad mini (6th generation)'
            ],
            notes: {
                vi: [ "Các thiết bị Apple sau đây KHÔNG có khả năng eSIM:",
                    "- Các thiết bị iPhone từ Trung Quốc Đại lục",
                    "- Các thiết bị iPhone từ Hồng Kông và Ma Cao (ngoại trừ iPhone 13 Mini, iPhone 12 Mini, iPhone SE 2020 và iPhone XS)",
                    "- Chỉ các thiết bị iPad có tính năng Wi-Fi + Cellular mới được hỗ trợ" ],
                en: [ "The following Apple devices DO NOT have eSIM capability:",
                    "- iPhone devices from Mainland China",
                    "- iPhone devices from Hong Kong and Macao (except for the iPhone 13 Mini, iPhone 12 Mini, iPhone SE 2020, and iPhone XS)",
                    "- Only iPad devices with Wi-Fi + Cellular features are supported" ]
            }
        },
        {
            name: 'Samsung',
            models: [
                "Galaxy S25", "Galaxy S25 Edge", "Galaxy S25+", "Galaxy S25 Slim", "Galaxy S25 Ultra",
                'Galaxy S24 Ultra', 'Galaxy S24+', 'Galaxy S24', "Galaxy S24 FE",
                'Galaxy S23 Ultra', 'Galaxy S23+', 'Galaxy S23', 'Galaxy S23 FE', "Galaxy S23 5G",
                'Galaxy S22 Ultra', 'Galaxy S22+', 'Galaxy S22', "Galaxy S22 5G", "Galaxy S22+ 5G", "Galaxy S22 Ultra 5G",
                'Galaxy S21 Ultra 5G', 'Galaxy S21+ 5G', 'Galaxy S21 5G', 'Galaxy S21 FE 5G', "Galaxy Note 20", "Galaxy Note 20 Ultra",
                'Galaxy Note20 Ultra 5G', 'Galaxy Note20 5G', "Galaxy S20", "Galaxy S20 5G", "Galaxy S20+",
                "Galaxy S20+ 5G", "Galaxy S20 Ultra", "Galaxy S20 Ultra 5G",
                'Galaxy Z Fold5', 'Galaxy Z Fold4', 'Galaxy Z Fold3 5G', 'Galaxy Z Fold2 5G',
                'Galaxy Z Flip5', 'Galaxy Z Flip4', 'Galaxy Z Flip3 5G', 'Galaxy Z Flip 5G',
                'Galaxy A54 5G', 'Galaxy A34 5G', 'Galaxy A14 5G', "Galaxy A56", "Galaxy A55 5G", "Galaxy A36", "Galaxy A35 5G",
                "Galaxy A23 5G", "Galaxy XCover7 Pro", "Galaxy Z Flip", "Galaxy Z Flip6", "Galaxy Z Fold", "Galaxy Z Fold 3",
                "Galaxy Z Fold 6", "Galaxy Fold"
            ],
            notes: {
                vi: [ "Các thiết bị Samsung Galaxy sau đây KHÔNG có khả năng eSIM:",
                    "- Tất cả các thiết bị Galaxy có nguồn gốc từ Trung Quốc, Hồng Kông và Đài Loan.",
                    "- Tất cả các mẫu Galaxy FE \"Fan Edition\", ngoại trừ Galaxy S23 FE và S24 FE",
                    "- Các mẫu Galaxy S20, S21* và Note 20 Ultra của Hoa Kỳ.",
                    "- Hầu hết các thiết bị Samsung Galaxy được mua tại Hàn Quốc không hỗ trợ eSIM, ngoại trừ các biến thể Galaxy S24, S23, Z Fold 5, Z Fold 4, Z Flip 5, Z Flip 4 và A54 5G."
                ],
                en: [ "The following Samsung Galaxy devices DO NOT have eSIM capability:",
                    "- All Galaxy devices originating from China, Hong Kong, and Taiwan.",
                    "- All Galaxy FE \"Fan Edition\" models, except the Galaxy S23 FE and S24 FE",
                    "- USA models of the Galaxy S20, S21*, and Note 20 Ultra.",
                    "- Most Samsung Galaxy devices purchased in South Korea do not support eSIMs, except for the Galaxy S24, S23, Z Fold 5, Z Fold 4, Z Flip 5, Z Flip 4, and A54 5G variants." ]
            }
        },
        {
            name: 'Google Pixel',
            models: [ "Pixel 9", "Pixel 9a", "Pixel 9 Pro", "Pixel 9 Pro XL", "Pixel 9 Pro Fold",
                'Pixel 8 Pro', 'Pixel 8', 'Pixel 8a', 'Pixel 7a', 'Pixel 7 Pro', 'Pixel 7',
                'Pixel 6a', 'Pixel 6 Pro', 'Pixel 6', 'Pixel 5a 5G', 'Pixel 5', "Pixel 5a",
                'Pixel 4a 5G', 'Pixel 4a', 'Pixel 4 XL', 'Pixel 4',
                'Pixel 3a XL', 'Pixel 3a', 'Pixel 3 XL', 'Pixel 3', "Pixel 2", "Pixel 2 XL", "Pixel Fold"
            ],
            notes: {
                vi: [ "Các thiết bị Google Pixel sau đây KHÔNG có khả năng eSIM",
                    "- Các mẫu Pixel 3 có nguồn gốc từ Úc, Đài Loan và Nhật Bản, và những mẫu được mua kèm dịch vụ từ các nhà mạng của Hoa Kỳ hoặc Canada ngoài Sprint và Google Fi.",
                    "- Các mẫu Pixel 3a được mua ở Đông Nam Á và có dịch vụ Verizon",
                ],
                en: [ "The following Google Pixel devices DO NOT have eSIM capability",
                    "- Pixel 3 models originating from Australia, Taiwan, and Japan, and those purchased with service from US or Canadian carriers other than Sprint and Google Fi.",
                    "- Pixel 3a models purchased in South East Asia and with Verizon service",
                ]
            }
        },
        {
            name: 'XIAOMI',
            models: [ "Xiaomi 15", "Xiaomi 15 Ultra", "Xiaomi 14 Pro", "Xiaomi 14T", "Xiaomi 14T Pro",
                "Xiaomi Poco X7", "Redmi Note 14 Pro", "Redmi Note 14 Pro 5G", "Redmi Note 14 Pro+", "Redmi Note 14 Pro+ 5G",
                "Redmi Note 11 Pro 5G",
                'Xiaomi 14 Ultra', 'Xiaomi 14', 'Xiaomi 13T Pro', 'Xiaomi 13T',
                'Xiaomi 13 Pro', 'Xiaomi 13', 'Xiaomi 13 Lite', 'Xiaomi 12T Pro',
                'Xiaomi 12T', 'Xiaomi 12 Pro', 'Xiaomi 12', 'Xiaomi 12 Lite',
                'Xiaomi 11T Pro', 'Xiaomi 11T', 'Xiaomi Mi 11', 'Xiaomi Mi 11 Lite',
                'Redmi Note 13 Pro+', 'Redmi Note 13 Pro', 'Redmi Note 13',
                'Redmi Note 12 Pro+', 'Redmi Note 12 Pro', 'Redmi Note 12'
            ],
            notes: {
                vi: [ "Khả năng tương thích eSIM có thể khác nhau tùy thuộc vào quốc gia/khu vực và nhà mạng. Vui lòng liên hệ với nhà mạng hoặc nhà sản xuất thiết bị của bạn để xác nhận rằng thiết bị của bạn có hỗ trợ eSIM." ],
                en: [ "eSIM availability may vary depending on country/region and carrier. Please contact your carrier or device manufacturer to confirm that your device is eSIM-capable." ]
            }
        },
        {
            name: 'Huawei',
            models: [ "Huawei P40 Pro+",
                'P60 Pro', 'P60', 'P50 Pro', 'P50', 'P40 Pro', 'P40',
                'Mate 60 Pro+', 'Mate 60 Pro', 'Mate 60', 'Mate 50 Pro', 'Mate 50',
                'Mate 40 Pro', 'Mate 40', 'Nova 11 Pro', 'Nova 11', 'Nova 10 Pro', 'Nova 10'
            ],
            notes: {
                vi: [ "Các thiết bị HUAWEI sau đây KHÔNG có khả năng eSIM:",
                    "- Huawei P40 Pro+",
                    "- Tất cả các thiết bị Huawei được mua tại Trung Quốc đều không có khả năng eSIM" ],
                en: [ "The following HUAWEI devices DO NOT have eSIM capability:",
                    "- Huawei P40 Pro+",
                    "- All Huawei devices purchased in China are not eSIM capable" ]
            }
        },
        {
            name: 'ONEPLUS',
            models: [ "OnePlus 13", "OnePlus 13R", "OnePlus Open",
                'OnePlus 12', 'OnePlus 11', 'OnePlus 10 Pro', 'OnePlus 10T',
                'OnePlus 9 Pro', 'OnePlus 9', 'OnePlus 8T', 'OnePlus 8 Pro', 'OnePlus 8',
                'OnePlus Nord 3', 'OnePlus Nord 2T', 'OnePlus Nord CE 3', 'OnePlus Nord CE 2'
            ],
            notes: {
                vi: [ "Hỗ trợ eSIM chỉ khả dụng ở một số khu vực nhất định. Vui lòng liên hệ với nhà mạng hoặc nhà sản xuất thiết bị của bạn để xác nhận rằng thiết bị OnePlus của bạn có khả năng eSIM." ],
                en: [ "eSIM support is only available in certain regions. Please contact your carrier or device manufacturer to confirm that your OnePlus device is eSIM-capable." ]
            }
        },
        {
            name: 'OPPO',
            models: [ "Find N2 Flip", "Find N5", "Find X8 Pro", "Find X8", "Find X3 Pro", "Find X3", "Reno14", "Reno14 Pro",
                "Watch X2 Mini",
                'Find X7 Ultra', 'Find X7', 'Find X6 Pro', 'Find X6',
                'Find X5 Pro', 'Find X5', 'Reno 11 Pro', 'Reno 11',
                'Reno 10 Pro+', 'Reno 10 Pro', 'Reno 10', 'Reno 8 Pro', 'Reno 8'
            ],
            notes: {
                vi: [ "Hỗ trợ eSIM chỉ khả dụng ở Nhật Bản và một số khu vực nhất định. Vui lòng liên hệ với nhà mạng hoặc nhà sản xuất thiết bị của bạn để xác nhận rằng thiết bị Oppo của bạn có khả năng eSIM." ],
                en: [ "eSIM support is only available in Japan and certain regions. Please contact your carrier or device manufacturer to confirm that your Oppo device is eSIM-capable" ]
            }
        },
        {
            name: 'MOTOROLA',
            models: [ "Moto G34", "Moto G35", "Moto G54", "Moto G54 Power", "Moto G55", "Moto G75", "Moto G85", "Moto G86",
                "Moto G (2025)", "Moto G (2024)", "Moto G Power (2024)", "Moto G Stylus 5G", "Edge Fusion", "Edge 60",
                "Egde 60 Pro", "Edge 60 Fusion", "Edge 60 Stylus", "Edge 50", "Edge 50 Fusion", "Edge 50 Pro", "Edge 50 Neo",
                "Edge 50 Ultra", "Edge 40 Neo", 'Edge 40 Pro', 'Edge 40', 'Edge 30 Ultra', 'Edge 30 Pro', 'Edge 30',
                'Razr 40 Ultra', 'Razr 40', 'Razr (2022)', 'Moto G73', 'Moto G53', "Edge+", "Razr (2025)", "Razr+ (2025)", "Razr Ultra (2025)",
                "Razr 50", "Razr 50 Ultra", "Razr 60", "Razr 2024", "Razr+ 2024", "Razr 2019", "Razr 5G", "ThinkPhone 25"
            ],
            notes: {
                vi: [ "Hỗ trợ eSIM chỉ khả dụng ở một số khu vực nhất định. Vui lòng liên hệ với nhà mạng hoặc nhà sản xuất thiết bị của bạn để xác nhận rằng thiết bị Motorola của bạn có khả năng eSIM." ],
                en: [ "eSIM support is only available in certain regions. Please contact your carrier or device manufacturer to confirm that your Motorola device is eSIM-capable" ]
            }
        },
        {
            name: 'NOKIA',
            models: [
                'XR21', "X30", 'X30 5G', "G60", 'G60 5G', 'G50', 'G21', 'G11',
                'C31', 'C21 Plus', 'C21', 'T21', 'T20'
            ],
            notes: {
                vi: [ "Khả năng tương thích eSIM có thể khác nhau tùy thuộc vào quốc gia/khu vực và nhà mạng. Vui lòng liên hệ với nhà mạng hoặc nhà sản xuất thiết bị của bạn để xác nhận rằng thiết bị Nokia của bạn có khả năng eSIM." ],
                en: [ "eSIM availability may vary depending on country/region and carrier. Please contact your carrier or device manufacturer to confirm that your Nokia device is eSIM-capable." ]
            }
        },
        {
            name: 'HAMMER',
            models: [
                "Explorer PRO", "Blade 3", "Blade 5G", "myPhone NOW eSIM", "myPhone Hammer Construction"
            ],
            notes: {
                vi: [ "Hỗ trợ eSIM chỉ khả dụng ở một số khu vực nhất định. Vui lòng liên hệ với nhà mạng hoặc nhà sản xuất thiết bị của bạn để xác nhận rằng thiết bị Hammer của bạn có khả năng eSIM." ],
                en: [ "eSIM support is only available in certain regions. Please contact your carrier or device manufacturer to confirm that your Hammer device is eSIM-capable." ]
            }
        },
        {
            name: 'HONOR',
            models: [
                "HONOR 90", "HONOR 200", "HONOR 200 Pro", "HONOR 400 Lite", "HONOR 400", "HONOR 400 Pro", "Magic7 Pro",
                "Magic7 Lite", "Magic6 Pro", "Magic6 Pro RSR", "Magic Vs3", "Magic V2", "Magic V3", "Magic5 Pro", "Magic4 Pro"
            ],
            notes: {
                vi: [ "Hỗ trợ eSIM chỉ khả dụng ở một số khu vực nhất định. Vui lòng liên hệ với nhà mạng hoặc nhà sản xuất thiết bị của bạn để xác nhận rằng thiết bị Honor của bạn có khả năng eSIM." ],
                en: [ "eSIM support is only available in certain regions. Please contact your carrier or device manufacturer to confirm that your Honor device is eSIM-capable." ]
            }
        },
        {
            name: 'RAKUTEN',
            models: [
                "Rakuten Big", "Rakuten Big S", "Rakuten Mini", "Rakuten Hand", "Rakuten Hand 5G"
            ],
            notes: {
                vi: [ "Hỗ trợ eSIM chỉ khả dụng ở Nhật Bản và một số khu vực nhất định. Vui lòng liên hệ với nhà mạng hoặc nhà sản xuất thiết bị của bạn để xác nhận rằng thiết bị Rakuten của bạn có khả năng eSIM." ],
                en: [ "eSIM support is only available in Japan and certain regions. Please contact your carrier or device manufacturer to confirm that your Rakuten device is eSIM-capable." ]
            }
        },
        {
            name: 'SHARP',
            models: [
                "AQUOS sense9", "AQUOS sense8", "AQUOS sense7", "AQUOS sense7 plus", "AQUOS R10", "AQUOS R9 Pro", "AQUOS R9",
                "AQUOS R8 pro", "AQUOS R8", "AQUOS R8s pro", "AQUOS wish", "AQUOS zero6"
            ],
            notes: {
                vi: [ "Hỗ trợ eSIM chỉ khả dụng ở Nhật Bản và một số khu vực nhất định. Vui lòng liên hệ với nhà mạng hoặc nhà sản xuất thiết bị của bạn để xác nhận rằng thiết bị Sharp của bạn có khả năng eSIM." ],
                en: [ "eSIM support is only available in Japan and certain regions. Please contact your carrier or device manufacturer to confirm that your Sharp device is eSIM-capable." ]
            }
        },
        {
            name: 'SONY',
            models: [
                "Xperia 1 IV", "Xperia 1 V", "Xperia 1 VI", "Xperia 1 VII", "Xperia 5 IV", "Xperia 5 V", "Xperia 10 III Lite",
                "Xperia 10 IV*", "Xperia 10 V", "Xperia 10 VI"
            ],
            notes: {
                vi: [ "Khả năng tương thích eSIM có thể khác nhau tùy thuộc vào quốc gia/khu vực và nhà mạng. Vui lòng liên hệ với nhà mạng hoặc nhà sản xuất thiết bị của bạn để xác nhận rằng thiết bị Xperia của bạn có khả năng eSIM.",
                    "Hỗ trợ eSIM trên Sony Xperia 10 IV chỉ khả dụng ở Châu Âu. Vui lòng liên hệ với nhà mạng hoặc nhà sản xuất thiết bị của bạn để xác nhận rằng thiết bị Sony Xperia 10 IV của bạn có khả năng eSIM." ],
                en: [ "eSIM availability may vary depending on country/region and carrier. Please contact your carrier or device manufacturer to confirm that your Xperia device is eSIM-capable.",
                    "Sony Xperia 10 IV eSIM support is only available in Europe. Please contact your carrier or device manufacturer to confirm that your Sony Xperia 10 IV device is eSIM-capable." ]
            }
        },
        {
            name: 'TCL',
            models: [
                "60", "60 XE NxtPaper", "50 5G", "50 NxtPaper", "50 Pro NxtPaper", "40 XL"
            ],
            notes: {
                vi: [ "Khả năng tương thích eSIM có thể khác nhau tùy thuộc vào quốc gia/khu vực và nhà mạng. Vui lòng liên hệ với nhà mạng hoặc nhà sản xuất thiết bị của bạn để xác nhận rằng thiết bị Xperia của bạn có khả năng eSIM." ],
                en: [ "eSIM availability may vary depending on country/region and carrier. Please contact your carrier or device manufacturer to confirm that your Xperia device is eSIM-capable." ]
            }
        },
        {
            name: 'T-Mobile',
            models: [
                "Revvl 7", "Revvl 7 Pro"
            ],
            notes: {
                vi: [ "Khả năng tương thích eSIM có thể khác nhau tùy thuộc vào quốc gia/khu vực và nhà mạng. Vui lòng liên hệ với nhà mạng hoặc nhà sản xuất thiết bị của bạn để xác nhận rằng thiết bị Xperia của bạn có khả năng eSIM." ],
                en: [ "eSIM availability may vary depending on country/region and carrier. Please contact your carrier or device manufacturer to confirm that your Xperia device is eSIM-capable." ]
            }
        },
        {
            name: 'VIVO',
            models: [
                "X200 Pro", "X200", "X200 FE", "X200s", "X100 Pro", "X90 Pro*", "V29 (Europe and Latin America)*",
                "V29 Lite 5G (Europe)*", "V40", "V40 Lite (Europe)*", "V50", "Watch 5"
            ],
            notes: {
                vi: [ "Khả năng tương thích eSIM có thể khác nhau tùy thuộc vào quốc gia/khu vực và nhà mạng. Vui lòng liên hệ với nhà mạng hoặc nhà sản xuất thiết bị của bạn để xác nhận rằng thiết bị Vivo của bạn có khả năng eSIM." ],
                en: [ "eSIM availability may vary depending on country/region and carrier. Please contact your carrier or device manufacturer to confirm that your Vivo device is eSIM-capable" ]
            }
        },
        {
            name: 'ACER',
            models: [
                "Acer Swift 3", "Acer Swift 7", "Acer TravelMate P2", "Acer TravelMate Spin P4", "Acer TravelMate P6"
            ]
        },
        {
            name: 'ASUS',
            models: [
                "ASUS Mini Transformer T103HAF", "ASUS NovaGo TP370QL", "ASUS Vivobook Flip 14 TP401NA"
            ]
        },
        {
            name: 'DELL',
            models: [
                "Dell Latitude 7440", "Dell Latitude 7210 2-in-1", "Dell Latitude 9410", "Dell Latitude 7310",
                "Dell Latitude 7410", "Dell Latitude 9510", "Dell Latitude 5410", "Dell Latitude 5411", "Dell Latitude 5511"
            ]
        },
        {
            name: 'HP',
            models: [
                "HP Elitebook G5", "HP Probook G5", "HP Zbook G5", "HP Spectre Folio 13"
            ]
        },
        {
            name: 'LENOVO',
            models: [
                "ThinkPad X1 Titanium Yoga 2 in 1", "ThinkPad X1 Carbon Gen 9", "ThinkPad X1 Fold", "ThinkPad X1 Nano",
                "ThinkPad X12 Detachable", "Lenovo Flex 5G", "Lenovo Yoga C630", "Lenovo Miix 630", "Lenovo Yoga 520",
                "Lenovo Yoga 720 (2-in-1 models)"
            ]
        },
        {
            name: 'SURFACE',
            models: [
                "Surface Pro 9", "Surface Go 3", "Surface Pro X", "Surface Duo 2", "Surface Duo"
            ]
        },
        {
            name: 'OTHERS',
            models: [
                "Fairphone 4", "Fairphone 5", "Gemini PDA 4G+Wi-Fi", "Nothing Phone (3a) Pro", "Nuu Mobile X5",
                "Realme 14 Pro+", "ASUS Zenfone 12 Ultra", "ZTE nubia Flip2", "alcatel V3 Ultra"
            ],
            notes: {
                vi: [ "Surface: Mọi thiết bị bị khóa bởi AT&T sẽ không hỗ trợ eSIM. Nếu thiết bị của bạn được mua thông qua nhà mạng khác, nhà mạng đó có thể đã vô hiệu hóa khả năng eSIM trong Surface Duo." ],
                en: [ "Surface: Any AT&T-locked devices will not support eSIMs. If your device was purchased through another carrier, the carrier may have disabled eSIM capability in the Surface Duo." ]
            }
        },
    ];

    // Filter devices based on search term
    const filteredBrands = brandModels.map( brand => ( {
        ...brand,
        models: brand.models.filter( model =>
            model.toLowerCase().includes( searchTerm.toLowerCase() ) ||
            brand.name.toLowerCase().includes( searchTerm.toLowerCase() )
        )
    } ) ).filter( brand => brand.models.length > 0 );

    const toggleBrand = ( brandName ) => {
        setExpandedBrands( prev => ( {
            ...prev,
            [ brandName ]: !prev[ brandName ]
        } ) );
    };

    return (
        <div className="bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl max-w-[740px] w-full h-[800px] overflow-hidden">
                {/* Header with close button */ }
                {showHeader&&(
                    <div className="flex justify-end items-center p-5 pb-0">
                    <button
                        onClick={ close }
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <Image
                            src="/assets/x-close.svg"
                            alt={ t( 'closeButton' ) }
                            width={ 24 }
                            height={ 24 }
                            className="w-6 h-6"
                        />
                    </button>
                </div>)}


                {/* Main Content */ }
                <div className="h-[720px] flex flex-col">
                    {/* Title */ }
                    <div className="mb-5">
                        <h2 className="text-[28px] font-semibold text-[#333333] leading-[1.286]">
                            { t( 'title' ) }
                        </h2>
                    </div>

                    {/* Notice */ }
                    <div className="mb-5">
                        <p className="text-sm text-[#333333] leading-[1.429]">
                            { t( 'notice' ) }
                        </p>
                    </div>

                    {/* Search Input */ }
                    <div className="px-1 mb-2">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Image
                                    src="/assets/search-icon.svg"
                                    alt={ t( 'searchIcon' ) }
                                    width={ 20 }
                                    height={ 20 }
                                    className="w-5 h-5 text-[#5C5C5C]"
                                />
                            </div>
                            <input
                                type="search"
                                value={ searchTerm }
                                onChange={ ( e ) => setSearchTerm( e.target.value ) }
                                placeholder={ t( 'searchPlaceholder' ) }
                                className="w-full pl-10 pr-3 py-3 border border-[#DDDDDD] rounded-xl text-base placeholder-[#A1A1A1] focus:outline-none focus:ring-1 focus:ring-blue-500 "
                            />
                        </div>
                    </div>

                    {/* Device List */ }
                    <div className="flex-1 overflow-y-auto">
                        <div className="space-y-0">
                            { filteredBrands.map( ( brand, index ) => (
                                <div key={ brand.name } className="border-b border-[#F1F1F1] last:border-b-0">
                                    <button
                                        onClick={ () => toggleBrand( brand.name ) }
                                        className="w-full flex items-center justify-between px-3 py-3 hover:bg-gray-50 transition-colors text-left"
                                    >
                                        <span className="text-base font-medium text-[#333333]">
                                            { brand.name }
                                        </span>
                                        <Image
                                            src="/assets/chevron-down.svg"
                                            alt={ t( 'expandIcon' ) }
                                            width={ 24 }
                                            height={ 24 }
                                            className={ `w-6 h-6 transition-transform duration-200 ${ expandedBrands[ brand.name ] ? 'rotate-180' : ''
                                                }` }
                                        />
                                    </button>

                                    {/* Expandable model list */ }
                                    { expandedBrands[ brand.name ] && (
                                        <div className="px-6 pb-4">
                                            <div className="grid grid-cols-1 gap-2">
                                                { brand.models.map( ( model ) => (
                                                    <div
                                                        key={ model }
                                                        className="py-2 px-3 text-sm text-[#666666] hover:bg-gray-50 rounded-md transition-colors"
                                                    >
                                                        { model }
                                                    </div>
                                                ) ) }
                                            </div>
                                            { brand.notes && (
                                                <div className="grid grid-cols-1 gap-2">
                                                    {brand.notes[locale] ? (
                                                        brand.notes[locale].map((note) => (
                                                            <div
                                                                key={note}
                                                                className="py-2 px-3 text-sm text-[#666666] hover:bg-gray-50 rounded-md transition-colors"
                                                            >
                                                                {note}
                                                            </div>
                                                        ))
                                                    ) : (
                                                        brand.notes['en'].map((note) => (
                                                            <div
                                                                key={note}
                                                                className="py-2 px-3 text-sm text-[#666666] hover:bg-gray-50 rounded-md transition-colors"
                                                            >
                                                                {note}
                                                            </div>
                                                        ))
                                                    )}

                                                </div>
                                            ) }

                                        </div>
                                    ) }
                                </div>
                            ) ) }

                            { filteredBrands.length === 0 && searchTerm && (
                                <div className="text-center py-8 text-gray-500">
                                    <p>{ t( 'noResults', { searchTerm } ) }</p>
                                </div>
                            ) }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DevicesEsim;


export const DevicesEsimVikki = () => {
    const { close } = useModal();
    const locale = useLocale();
    const t = useTranslations('devicesEsim');
    const [ searchTerm, setSearchTerm ] = useState( '' );
    const [ expandedBrands, setExpandedBrands ] = useState( {} );
    const [ brandModels, setBrandModels ] = useState( [] );

    const fetchBrandModels = async () => {
        try {
            const data = await MyESimService.getBrandModels();

            if ( !data || data.length === 0 ) {
                setExpandedBrands( deviceBrands );
                return;
            }
            setBrandModels( data.map( brand => ( {
                name: brand.brand,

                models: brand.devices.map( model => model.name ),
                notes: {
                    vi: [ brand.note_vi ] || [],
                    en: [ brand.note ] || []
                }
            } ) ) );

        } catch ( error ) {
            console.error( "Error fetching brand models:", error );
        }
    };

    useEffect( () => {
        fetchBrandModels();
        // Initialize expanded brands based on deviceBrands
    }, [] );
    // Device brands and their models
    const deviceBrands = [
        {
            name: 'Apple',
            models: [ "iPhone 16", "iPhone 16e", "iPhone 16 Plus", "iPhone 16 Pro", "iPhone 16 Pro Max",
                'iPhone 15 Pro Max', 'iPhone 15 Pro', 'iPhone 15 Plus', 'iPhone 15',
                'iPhone 14 Pro Max', 'iPhone 14 Pro', 'iPhone 14 Plus', 'iPhone 14',
                'iPhone 13 Pro Max', 'iPhone 13 Pro', 'iPhone 13', 'iPhone 13 mini',
                'iPhone 12 Pro Max', 'iPhone 12 Pro', 'iPhone 12', 'iPhone 12 mini',
                'iPhone SE (3rd generation)', 'iPhone 11 Pro Max', 'iPhone 11 Pro', 'iPhone 11',
                'iPhone XS Max', 'iPhone XS', 'iPhone XR', "iPad (from 7th generation)", "iPad Air (from 3rd generation)",
                "iPad Pro, 11-inch (from 1st generation)", "iPad Pro 12.9-inch (from 3rd generation)", "iPad Mini (from 5th generation)",
                'iPad Pro (6th generation)', 'iPad Pro (5th generation)', 'iPad Air (5th generation)',
                'iPad Air (4th generation)', 'iPad (10th generation)', 'iPad mini (6th generation)'
            ],
            notes: {
                vi: [ "Các thiết bị Apple sau đây KHÔNG có khả năng eSIM:",
                    "- Các thiết bị iPhone từ Trung Quốc Đại lục",
                    "- Các thiết bị iPhone từ Hồng Kông và Ma Cao (ngoại trừ iPhone 13 Mini, iPhone 12 Mini, iPhone SE 2020 và iPhone XS)",
                    "- Chỉ các thiết bị iPad có tính năng Wi-Fi + Cellular mới được hỗ trợ" ],
                en: [ "The following Apple devices DO NOT have eSIM capability:",
                    "- iPhone devices from Mainland China",
                    "- iPhone devices from Hong Kong and Macao (except for the iPhone 13 Mini, iPhone 12 Mini, iPhone SE 2020, and iPhone XS)",
                    "- Only iPad devices with Wi-Fi + Cellular features are supported" ]
            }
        },
        {
            name: 'Samsung',
            models: [
                "Galaxy S25", "Galaxy S25 Edge", "Galaxy S25+", "Galaxy S25 Slim", "Galaxy S25 Ultra",
                'Galaxy S24 Ultra', 'Galaxy S24+', 'Galaxy S24', "Galaxy S24 FE",
                'Galaxy S23 Ultra', 'Galaxy S23+', 'Galaxy S23', 'Galaxy S23 FE', "Galaxy S23 5G",
                'Galaxy S22 Ultra', 'Galaxy S22+', 'Galaxy S22', "Galaxy S22 5G", "Galaxy S22+ 5G", "Galaxy S22 Ultra 5G",
                'Galaxy S21 Ultra 5G', 'Galaxy S21+ 5G', 'Galaxy S21 5G', 'Galaxy S21 FE 5G', "Galaxy Note 20", "Galaxy Note 20 Ultra",
                'Galaxy Note20 Ultra 5G', 'Galaxy Note20 5G', "Galaxy S20", "Galaxy S20 5G", "Galaxy S20+",
                "Galaxy S20+ 5G", "Galaxy S20 Ultra", "Galaxy S20 Ultra 5G",
                'Galaxy Z Fold5', 'Galaxy Z Fold4', 'Galaxy Z Fold3 5G', 'Galaxy Z Fold2 5G',
                'Galaxy Z Flip5', 'Galaxy Z Flip4', 'Galaxy Z Flip3 5G', 'Galaxy Z Flip 5G',
                'Galaxy A54 5G', 'Galaxy A34 5G', 'Galaxy A14 5G', "Galaxy A56", "Galaxy A55 5G", "Galaxy A36", "Galaxy A35 5G",
                "Galaxy A23 5G", "Galaxy XCover7 Pro", "Galaxy Z Flip", "Galaxy Z Flip6", "Galaxy Z Fold", "Galaxy Z Fold 3",
                "Galaxy Z Fold 6", "Galaxy Fold"
            ],
            notes: {
                vi: [ "Các thiết bị Samsung Galaxy sau đây KHÔNG có khả năng eSIM:",
                    "- Tất cả các thiết bị Galaxy có nguồn gốc từ Trung Quốc, Hồng Kông và Đài Loan.",
                    "- Tất cả các mẫu Galaxy FE \"Fan Edition\", ngoại trừ Galaxy S23 FE và S24 FE",
                    "- Các mẫu Galaxy S20, S21* và Note 20 Ultra của Hoa Kỳ.",
                    "- Hầu hết các thiết bị Samsung Galaxy được mua tại Hàn Quốc không hỗ trợ eSIM, ngoại trừ các biến thể Galaxy S24, S23, Z Fold 5, Z Fold 4, Z Flip 5, Z Flip 4 và A54 5G."
                ],
                en: [ "The following Samsung Galaxy devices DO NOT have eSIM capability:",
                    "- All Galaxy devices originating from China, Hong Kong, and Taiwan.",
                    "- All Galaxy FE \"Fan Edition\" models, except the Galaxy S23 FE and S24 FE",
                    "- USA models of the Galaxy S20, S21*, and Note 20 Ultra.",
                    "- Most Samsung Galaxy devices purchased in South Korea do not support eSIMs, except for the Galaxy S24, S23, Z Fold 5, Z Fold 4, Z Flip 5, Z Flip 4, and A54 5G variants." ]
            }
        },
        {
            name: 'Google Pixel',
            models: [ "Pixel 9", "Pixel 9a", "Pixel 9 Pro", "Pixel 9 Pro XL", "Pixel 9 Pro Fold",
                'Pixel 8 Pro', 'Pixel 8', 'Pixel 8a', 'Pixel 7a', 'Pixel 7 Pro', 'Pixel 7',
                'Pixel 6a', 'Pixel 6 Pro', 'Pixel 6', 'Pixel 5a 5G', 'Pixel 5', "Pixel 5a",
                'Pixel 4a 5G', 'Pixel 4a', 'Pixel 4 XL', 'Pixel 4',
                'Pixel 3a XL', 'Pixel 3a', 'Pixel 3 XL', 'Pixel 3', "Pixel 2", "Pixel 2 XL", "Pixel Fold"
            ],
            notes: {
                vi: [ "Các thiết bị Google Pixel sau đây KHÔNG có khả năng eSIM",
                    "- Các mẫu Pixel 3 có nguồn gốc từ Úc, Đài Loan và Nhật Bản, và những mẫu được mua kèm dịch vụ từ các nhà mạng của Hoa Kỳ hoặc Canada ngoài Sprint và Google Fi.",
                    "- Các mẫu Pixel 3a được mua ở Đông Nam Á và có dịch vụ Verizon",
                ],
                en: [ "The following Google Pixel devices DO NOT have eSIM capability",
                    "- Pixel 3 models originating from Australia, Taiwan, and Japan, and those purchased with service from US or Canadian carriers other than Sprint and Google Fi.",
                    "- Pixel 3a models purchased in South East Asia and with Verizon service",
                ]
            }
        },
        {
            name: 'XIAOMI',
            models: [ "Xiaomi 15", "Xiaomi 15 Ultra", "Xiaomi 14 Pro", "Xiaomi 14T", "Xiaomi 14T Pro",
                "Xiaomi Poco X7", "Redmi Note 14 Pro", "Redmi Note 14 Pro 5G", "Redmi Note 14 Pro+", "Redmi Note 14 Pro+ 5G",
                "Redmi Note 11 Pro 5G",
                'Xiaomi 14 Ultra', 'Xiaomi 14', 'Xiaomi 13T Pro', 'Xiaomi 13T',
                'Xiaomi 13 Pro', 'Xiaomi 13', 'Xiaomi 13 Lite', 'Xiaomi 12T Pro',
                'Xiaomi 12T', 'Xiaomi 12 Pro', 'Xiaomi 12', 'Xiaomi 12 Lite',
                'Xiaomi 11T Pro', 'Xiaomi 11T', 'Xiaomi Mi 11', 'Xiaomi Mi 11 Lite',
                'Redmi Note 13 Pro+', 'Redmi Note 13 Pro', 'Redmi Note 13',
                'Redmi Note 12 Pro+', 'Redmi Note 12 Pro', 'Redmi Note 12'
            ],
            notes: {
                vi: [ "Khả năng tương thích eSIM có thể khác nhau tùy thuộc vào quốc gia/khu vực và nhà mạng. Vui lòng liên hệ với nhà mạng hoặc nhà sản xuất thiết bị của bạn để xác nhận rằng thiết bị của bạn có hỗ trợ eSIM." ],
                en: [ "eSIM availability may vary depending on country/region and carrier. Please contact your carrier or device manufacturer to confirm that your device is eSIM-capable." ]
            }
        },
        {
            name: 'Huawei',
            models: [ "Huawei P40 Pro+",
                'P60 Pro', 'P60', 'P50 Pro', 'P50', 'P40 Pro', 'P40',
                'Mate 60 Pro+', 'Mate 60 Pro', 'Mate 60', 'Mate 50 Pro', 'Mate 50',
                'Mate 40 Pro', 'Mate 40', 'Nova 11 Pro', 'Nova 11', 'Nova 10 Pro', 'Nova 10'
            ],
            notes: {
                vi: [ "Các thiết bị HUAWEI sau đây KHÔNG có khả năng eSIM:",
                    "- Huawei P40 Pro+",
                    "- Tất cả các thiết bị Huawei được mua tại Trung Quốc đều không có khả năng eSIM" ],
                en: [ "The following HUAWEI devices DO NOT have eSIM capability:",
                    "- Huawei P40 Pro+",
                    "- All Huawei devices purchased in China are not eSIM capable" ]
            }
        },
        {
            name: 'ONEPLUS',
            models: [ "OnePlus 13", "OnePlus 13R", "OnePlus Open",
                'OnePlus 12', 'OnePlus 11', 'OnePlus 10 Pro', 'OnePlus 10T',
                'OnePlus 9 Pro', 'OnePlus 9', 'OnePlus 8T', 'OnePlus 8 Pro', 'OnePlus 8',
                'OnePlus Nord 3', 'OnePlus Nord 2T', 'OnePlus Nord CE 3', 'OnePlus Nord CE 2'
            ],
            notes: {
                vi: [ "Hỗ trợ eSIM chỉ khả dụng ở một số khu vực nhất định. Vui lòng liên hệ với nhà mạng hoặc nhà sản xuất thiết bị của bạn để xác nhận rằng thiết bị OnePlus của bạn có khả năng eSIM." ],
                en: [ "eSIM support is only available in certain regions. Please contact your carrier or device manufacturer to confirm that your OnePlus device is eSIM-capable." ]
            }
        },
        {
            name: 'OPPO',
            models: [ "Find N2 Flip", "Find N5", "Find X8 Pro", "Find X8", "Find X3 Pro", "Find X3", "Reno14", "Reno14 Pro",
                "Watch X2 Mini",
                'Find X7 Ultra', 'Find X7', 'Find X6 Pro', 'Find X6',
                'Find X5 Pro', 'Find X5', 'Reno 11 Pro', 'Reno 11',
                'Reno 10 Pro+', 'Reno 10 Pro', 'Reno 10', 'Reno 8 Pro', 'Reno 8'
            ],
            notes: {
                vi: [ "Hỗ trợ eSIM chỉ khả dụng ở Nhật Bản và một số khu vực nhất định. Vui lòng liên hệ với nhà mạng hoặc nhà sản xuất thiết bị của bạn để xác nhận rằng thiết bị Oppo của bạn có khả năng eSIM." ],
                en: [ "eSIM support is only available in Japan and certain regions. Please contact your carrier or device manufacturer to confirm that your Oppo device is eSIM-capable" ]
            }
        },
        {
            name: 'MOTOROLA',
            models: [ "Moto G34", "Moto G35", "Moto G54", "Moto G54 Power", "Moto G55", "Moto G75", "Moto G85", "Moto G86",
                "Moto G (2025)", "Moto G (2024)", "Moto G Power (2024)", "Moto G Stylus 5G", "Edge Fusion", "Edge 60",
                "Egde 60 Pro", "Edge 60 Fusion", "Edge 60 Stylus", "Edge 50", "Edge 50 Fusion", "Edge 50 Pro", "Edge 50 Neo",
                "Edge 50 Ultra", "Edge 40 Neo", 'Edge 40 Pro', 'Edge 40', 'Edge 30 Ultra', 'Edge 30 Pro', 'Edge 30',
                'Razr 40 Ultra', 'Razr 40', 'Razr (2022)', 'Moto G73', 'Moto G53', "Edge+", "Razr (2025)", "Razr+ (2025)", "Razr Ultra (2025)",
                "Razr 50", "Razr 50 Ultra", "Razr 60", "Razr 2024", "Razr+ 2024", "Razr 2019", "Razr 5G", "ThinkPhone 25"
            ],
            notes: {
                vi: [ "Hỗ trợ eSIM chỉ khả dụng ở một số khu vực nhất định. Vui lòng liên hệ với nhà mạng hoặc nhà sản xuất thiết bị của bạn để xác nhận rằng thiết bị Motorola của bạn có khả năng eSIM." ],
                en: [ "eSIM support is only available in certain regions. Please contact your carrier or device manufacturer to confirm that your Motorola device is eSIM-capable" ]
            }
        },
        {
            name: 'NOKIA',
            models: [
                'XR21', "X30", 'X30 5G', "G60", 'G60 5G', 'G50', 'G21', 'G11',
                'C31', 'C21 Plus', 'C21', 'T21', 'T20'
            ],
            notes: {
                vi: [ "Khả năng tương thích eSIM có thể khác nhau tùy thuộc vào quốc gia/khu vực và nhà mạng. Vui lòng liên hệ với nhà mạng hoặc nhà sản xuất thiết bị của bạn để xác nhận rằng thiết bị Nokia của bạn có khả năng eSIM." ],
                en: [ "eSIM availability may vary depending on country/region and carrier. Please contact your carrier or device manufacturer to confirm that your Nokia device is eSIM-capable." ]
            }
        },
        {
            name: 'HAMMER',
            models: [
                "Explorer PRO", "Blade 3", "Blade 5G", "myPhone NOW eSIM", "myPhone Hammer Construction"
            ],
            notes: {
                vi: [ "Hỗ trợ eSIM chỉ khả dụng ở một số khu vực nhất định. Vui lòng liên hệ với nhà mạng hoặc nhà sản xuất thiết bị của bạn để xác nhận rằng thiết bị Hammer của bạn có khả năng eSIM." ],
                en: [ "eSIM support is only available in certain regions. Please contact your carrier or device manufacturer to confirm that your Hammer device is eSIM-capable." ]
            }
        },
        {
            name: 'HONOR',
            models: [
                "HONOR 90", "HONOR 200", "HONOR 200 Pro", "HONOR 400 Lite", "HONOR 400", "HONOR 400 Pro", "Magic7 Pro",
                "Magic7 Lite", "Magic6 Pro", "Magic6 Pro RSR", "Magic Vs3", "Magic V2", "Magic V3", "Magic5 Pro", "Magic4 Pro"
            ],
            notes: {
                vi: [ "Hỗ trợ eSIM chỉ khả dụng ở một số khu vực nhất định. Vui lòng liên hệ với nhà mạng hoặc nhà sản xuất thiết bị của bạn để xác nhận rằng thiết bị Honor của bạn có khả năng eSIM." ],
                en: [ "eSIM support is only available in certain regions. Please contact your carrier or device manufacturer to confirm that your Honor device is eSIM-capable." ]
            }
        },
        {
            name: 'RAKUTEN',
            models: [
                "Rakuten Big", "Rakuten Big S", "Rakuten Mini", "Rakuten Hand", "Rakuten Hand 5G"
            ],
            notes: {
                vi: [ "Hỗ trợ eSIM chỉ khả dụng ở Nhật Bản và một số khu vực nhất định. Vui lòng liên hệ với nhà mạng hoặc nhà sản xuất thiết bị của bạn để xác nhận rằng thiết bị Rakuten của bạn có khả năng eSIM." ],
                en: [ "eSIM support is only available in Japan and certain regions. Please contact your carrier or device manufacturer to confirm that your Rakuten device is eSIM-capable." ]
            }
        },
        {
            name: 'SHARP',
            models: [
                "AQUOS sense9", "AQUOS sense8", "AQUOS sense7", "AQUOS sense7 plus", "AQUOS R10", "AQUOS R9 Pro", "AQUOS R9",
                "AQUOS R8 pro", "AQUOS R8", "AQUOS R8s pro", "AQUOS wish", "AQUOS zero6"
            ],
            notes: {
                vi: [ "Hỗ trợ eSIM chỉ khả dụng ở Nhật Bản và một số khu vực nhất định. Vui lòng liên hệ với nhà mạng hoặc nhà sản xuất thiết bị của bạn để xác nhận rằng thiết bị Sharp của bạn có khả năng eSIM." ],
                en: [ "eSIM support is only available in Japan and certain regions. Please contact your carrier or device manufacturer to confirm that your Sharp device is eSIM-capable." ]
            }
        },
        {
            name: 'SONY',
            models: [
                "Xperia 1 IV", "Xperia 1 V", "Xperia 1 VI", "Xperia 1 VII", "Xperia 5 IV", "Xperia 5 V", "Xperia 10 III Lite",
                "Xperia 10 IV*", "Xperia 10 V", "Xperia 10 VI"
            ],
            notes: {
                vi: [ "Khả năng tương thích eSIM có thể khác nhau tùy thuộc vào quốc gia/khu vực và nhà mạng. Vui lòng liên hệ với nhà mạng hoặc nhà sản xuất thiết bị của bạn để xác nhận rằng thiết bị Xperia của bạn có khả năng eSIM.",
                    "Hỗ trợ eSIM trên Sony Xperia 10 IV chỉ khả dụng ở Châu Âu. Vui lòng liên hệ với nhà mạng hoặc nhà sản xuất thiết bị của bạn để xác nhận rằng thiết bị Sony Xperia 10 IV của bạn có khả năng eSIM." ],
                en: [ "eSIM availability may vary depending on country/region and carrier. Please contact your carrier or device manufacturer to confirm that your Xperia device is eSIM-capable.",
                    "Sony Xperia 10 IV eSIM support is only available in Europe. Please contact your carrier or device manufacturer to confirm that your Sony Xperia 10 IV device is eSIM-capable." ]
            }
        },
        {
            name: 'TCL',
            models: [
                "60", "60 XE NxtPaper", "50 5G", "50 NxtPaper", "50 Pro NxtPaper", "40 XL"
            ],
            notes: {
                vi: [ "Khả năng tương thích eSIM có thể khác nhau tùy thuộc vào quốc gia/khu vực và nhà mạng. Vui lòng liên hệ với nhà mạng hoặc nhà sản xuất thiết bị của bạn để xác nhận rằng thiết bị Xperia của bạn có khả năng eSIM." ],
                en: [ "eSIM availability may vary depending on country/region and carrier. Please contact your carrier or device manufacturer to confirm that your Xperia device is eSIM-capable." ]
            }
        },
        {
            name: 'T-Mobile',
            models: [
                "Revvl 7", "Revvl 7 Pro"
            ],
            notes: {
                vi: [ "Khả năng tương thích eSIM có thể khác nhau tùy thuộc vào quốc gia/khu vực và nhà mạng. Vui lòng liên hệ với nhà mạng hoặc nhà sản xuất thiết bị của bạn để xác nhận rằng thiết bị Xperia của bạn có khả năng eSIM." ],
                en: [ "eSIM availability may vary depending on country/region and carrier. Please contact your carrier or device manufacturer to confirm that your Xperia device is eSIM-capable." ]
            }
        },
        {
            name: 'VIVO',
            models: [
                "X200 Pro", "X200", "X200 FE", "X200s", "X100 Pro", "X90 Pro*", "V29 (Europe and Latin America)*",
                "V29 Lite 5G (Europe)*", "V40", "V40 Lite (Europe)*", "V50", "Watch 5"
            ],
            notes: {
                vi: [ "Khả năng tương thích eSIM có thể khác nhau tùy thuộc vào quốc gia/khu vực và nhà mạng. Vui lòng liên hệ với nhà mạng hoặc nhà sản xuất thiết bị của bạn để xác nhận rằng thiết bị Vivo của bạn có khả năng eSIM." ],
                en: [ "eSIM availability may vary depending on country/region and carrier. Please contact your carrier or device manufacturer to confirm that your Vivo device is eSIM-capable" ]
            }
        },
        {
            name: 'ACER',
            models: [
                "Acer Swift 3", "Acer Swift 7", "Acer TravelMate P2", "Acer TravelMate Spin P4", "Acer TravelMate P6"
            ]
        },
        {
            name: 'ASUS',
            models: [
                "ASUS Mini Transformer T103HAF", "ASUS NovaGo TP370QL", "ASUS Vivobook Flip 14 TP401NA"
            ]
        },
        {
            name: 'DELL',
            models: [
                "Dell Latitude 7440", "Dell Latitude 7210 2-in-1", "Dell Latitude 9410", "Dell Latitude 7310",
                "Dell Latitude 7410", "Dell Latitude 9510", "Dell Latitude 5410", "Dell Latitude 5411", "Dell Latitude 5511"
            ]
        },
        {
            name: 'HP',
            models: [
                "HP Elitebook G5", "HP Probook G5", "HP Zbook G5", "HP Spectre Folio 13"
            ]
        },
        {
            name: 'LENOVO',
            models: [
                "ThinkPad X1 Titanium Yoga 2 in 1", "ThinkPad X1 Carbon Gen 9", "ThinkPad X1 Fold", "ThinkPad X1 Nano",
                "ThinkPad X12 Detachable", "Lenovo Flex 5G", "Lenovo Yoga C630", "Lenovo Miix 630", "Lenovo Yoga 520",
                "Lenovo Yoga 720 (2-in-1 models)"
            ]
        },
        {
            name: 'SURFACE',
            models: [
                "Surface Pro 9", "Surface Go 3", "Surface Pro X", "Surface Duo 2", "Surface Duo"
            ]
        },
        {
            name: 'OTHERS',
            models: [
                "Fairphone 4", "Fairphone 5", "Gemini PDA 4G+Wi-Fi", "Nothing Phone (3a) Pro", "Nuu Mobile X5",
                "Realme 14 Pro+", "ASUS Zenfone 12 Ultra", "ZTE nubia Flip2", "alcatel V3 Ultra"
            ],
            notes: {
                vi: [ "Surface: Mọi thiết bị bị khóa bởi AT&T sẽ không hỗ trợ eSIM. Nếu thiết bị của bạn được mua thông qua nhà mạng khác, nhà mạng đó có thể đã vô hiệu hóa khả năng eSIM trong Surface Duo." ],
                en: [ "Surface: Any AT&T-locked devices will not support eSIMs. If your device was purchased through another carrier, the carrier may have disabled eSIM capability in the Surface Duo." ]
            }
        },
    ];

    // Filter devices based on search term
    const filteredBrands = brandModels.map( brand => ( {
        ...brand,
        models: brand.models.filter( model =>
            model.toLowerCase().includes( searchTerm.toLowerCase() ) ||
            brand.name.toLowerCase().includes( searchTerm.toLowerCase() )
        )
    } ) ).filter( brand => brand.models.length > 0 );

    const toggleBrand = ( brandName ) => {
        setExpandedBrands( prev => ( {
            ...prev,
            [ brandName ]: !prev[ brandName ]
        } ) );
    };

    return (
        <div className="bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl max-w-[740px] w-full h-[800px] overflow-hidden">
                {/* Header with close button */ }
                <div className="flex  items-center ">
                      <h2 className="text-lg font-semibold text-[#333333] leading-[1.286] flex-1">
                            {t('title')}
                        </h2>
                    <button
                        onClick={ close }
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        <Image
                            src="/assets/x-close.svg"
                            alt={ t('closeButton') }
                            width={ 24 }
                            height={ 24 }
                            className="w-4 h-4"
                        />
                    </button>
                </div>

                {/* Main Content */ }
                <div className="h-[720px] flex flex-col">


                    {/* Notice */ }
                    <div className="mb-5">
                        <p className="text-sm text-[#333333] leading-[1.429]">
                           {t('notice')}
                        </p>
                    </div>

                    {/* Search Input */ }
                    <div className="mb-2">
                        <div className="relative p-1">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Image
                                    src="/assets/search-icon.svg"
                                    alt={ t('searchIcon') }
                                    width={ 20 }
                                    height={ 20 }
                                    className="w-5 h-5 text-[#5C5C5C]"
                                />
                            </div>
                            <input
                                type="text"
                                value={ searchTerm }
                                onChange={ ( e ) => setSearchTerm( e.target.value ) }
                                placeholder={ t('searchPlaceholder') }
                                className="w-full pl-10 pr-3 py-3 border border-[#DDDDDD] rounded-xl text-base placeholder-[#A1A1A1] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                    </div>

                    {/* Device List */ }
                    <div className="flex-1 overflow-y-auto">
                        <div className="space-y-0">
                            { filteredBrands.map( ( brand, index ) => (
                                <div key={ brand.name } className="border-b border-[#F1F1F1] last:border-b-0">
                                    <button
                                        onClick={ () => toggleBrand( brand.name ) }
                                        className="w-full flex items-center justify-between px-3 py-3 hover:bg-gray-50 transition-colors text-left"
                                    >
                                        <span className="text-base font-medium text-[#333333]">
                                            { brand.name }
                                        </span>
                                        <Image
                                            src="/assets/chevron-down.svg"
                                            alt={ t('expandIcon') }
                                            width={ 24 }
                                            height={ 24 }
                                            className={ `w-6 h-6 transition-transform duration-200 ${ expandedBrands[ brand.name ] ? 'rotate-180' : ''
                                                }` }
                                        />
                                    </button>

                                    {/* Expandable model list */ }
                                    { expandedBrands[ brand.name ] && (
                                        <div className="px-6 pb-4">
                                            <div className="grid grid-cols-1 gap-2">
                                                { brand.models.map( ( model ) => (
                                                    <div
                                                        key={ model }
                                                        className="py-2 px-3 text-sm text-[#666666] hover:bg-gray-50 rounded-md transition-colors"
                                                    >
                                                        { model }
                                                    </div>
                                                ) ) }
                                            </div>
                                            { brand.notes && (
                                                <div className="grid grid-cols-1 gap-2">
                                                    {brand.notes[locale] ? (
                                                        brand.notes[locale].map((note) => (
                                                            <div
                                                                key={note}
                                                                className="py-2 px-3 text-sm text-[#666666] hover:bg-gray-50 rounded-md transition-colors"
                                                            >
                                                                {note}
                                                            </div>
                                                        ))
                                                    ) : (
                                                        brand.notes['en'].map((note) => (
                                                            <div
                                                                key={note}
                                                                className="py-2 px-3 text-sm text-[#666666] hover:bg-gray-50 rounded-md transition-colors"
                                                            >
                                                                {note}
                                                            </div>
                                                        ))
                                                    )}
                                                </div>
                                            ) }

                                        </div>
                                    ) }
                                </div>
                            ) ) }

                            { filteredBrands.length === 0 && searchTerm && (
                                <div className="text-center py-8 text-gray-500">
                                  <p>{t('noResults', { searchTerm })}</p>
                                </div>
                            ) }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
