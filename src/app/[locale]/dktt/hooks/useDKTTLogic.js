import {useRef, useState, useCallback, useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {videoCallSchema} from '@/app/schema/videoCallSchema';
import dkttService from "@/app/services/dkttService";
import {CARD_TYPE} from "@/app/[locale]/dktt/components/PhotoCapture";
import {formatImageForApi, getEkycMessage, getFaceMatchingMessage, isAtLeast14YearsOld} from "@/app/utils/ekyc";
import moment from 'moment';
import {toast} from "react-toastify";
import {useLocale} from "next-intl";

const FACING_MODE_USER = 'user';
const FACING_MODE_ENVIRONMENT = 'environment';

export const useDKTTLogic = (id = null) => {
    const webcamRef = useRef(null);
    const signatureRef = useRef(null);
    const mediaRecorderRef = useRef(null);

    const [currentStep, setCurrentStep] = useState(3);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [currentImageType, setCurrentImageType] = useState(CARD_TYPE.FRONT_CARD);
    const registrationId = useRef("")
    const [capturedImages, setCapturedImages] = useState({
        avatar: null,
        frontCard: null,
        backCard: null
    });
    const [recordedVideo, setRecordedVideo] = useState(null);
    const [recordedVideoData, setRecordedVideoData] = useState(null);
    const [recordedVideoLink, setRecordedVideoLink] = useState(null);
    const [signatureData, setSignatureData] = useState(null);
    const [isRecording, setIsRecording] = useState(false);
    const [recordingTime, setRecordingTime] = useState(0);
    const recordingTimeRef = useRef(0);
    const timerRef = useRef(null);
    const isRecordingRef = useRef(false);
    const [cameraError, setCameraError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isCardProcessing, setIsCardProcessing] = useState(false);
    const [hasPermission, setHasPermission] = useState(null);
    const [selectedCardType, setSelectedCardType] = useState('cccd');
    const [registerForm, setRegisterForm] = useState('');
    const [videoQuality, setVideoQuality] = useState('medium'); // Thêm state cho chất lượng video
    const locale = useLocale();

    const [registrationType, setRegistrationType] = useState("")
    const [simType, setSimType] = useState("")
    const [infoReviewData, setInfoReviewData] = useState(null)
    const [formDataChanged, setFormDataChanged] = useState(false)
    const [isSubmittingRegistration, setIsSubmittingRegistration] = useState(false)
    const [isSubmitSuccess, setIsSubmitSuccess] = useState(false)

    const formMethods = useForm({
        resolver: yupResolver(videoCallSchema),
        defaultValues: {
            call_id: "",
            phone: "",
            card_type: "",
            seri: "",
            id_number: "",
            full_name: "",
            birth_day: "",
            gender: "",
            address: "",
            issue_date: "",
            issue_place: "",
            image1: "",
            image2: "",
            image3: "",
            image4: "",
            contact_phone: "",
            strProvince: "",
            strDistrict: "",
            strPrecinct: "",
            imsi: "",
            city_code: "",
            nationality: "",
            faceScore: "",
            package: ""
        }
    });

    useEffect(() => {
        if (locale === "en") {
            setSelectedCardType("passport")
        }
    }, [])

    const formData = formMethods.watch()
    useEffect(() => {
        console.log(formData)
    }, [formData])

    // Cleanup timer khi component unmount
    useEffect(() => {
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, []);

    useEffect(() => {
        if (id) {
            dkttService.checkRegistrationLink(id).then(res => {
                if (!res?.success && res?.code === 400) {
                    toast.error(res?.message)
                    return
                }
                formMethods.setValue("phone", res.selectedPhone)
                formMethods.setValue("package", res.package)
                registrationId.current = res.id
                setRegistrationType(res.registrationType)
                setSimType(res.simType)
            })
        }
    }, [id]);

    const getVideoConstraints = useCallback(() => {
        return {
            facingMode: currentImageType === 'avatar' ? FACING_MODE_USER : FACING_MODE_ENVIRONMENT,
            width: {ideal: 1920},
            height: {ideal: 1080}
        };
    }, [currentImageType]);

    // Format video tương thích iOS
    const getOptimalVideoFormat = useCallback(() => {
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

        if (isIOS) {
            return 'video/mp4';
        }

        const formats = ['video/webm;codecs=vp9', 'video/webm', 'video/mp4'];
        return formats.find(format => MediaRecorder.isTypeSupported(format)) || 'video/webm';
    }, []);

    // Lấy cài đặt video dựa trên chất lượng được chọn
    const getVideoQualitySettings = useCallback((quality) => {
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

        const settings = {
            low: {
                video: {
                    facingMode: FACING_MODE_USER,
                    width: {ideal: 480},
                    height: {ideal: 360},
                    frameRate: {ideal: isIOS ? 15 : 10}  // iOS cần frameRate cao hơn
                },
                audio: {
                    sampleRate: 16000,
                    channelCount: 1
                },
                recording: {
                    videoBitsPerSecond: isIOS ? 300000 : 250000, // iOS cần bitrate cao hơn
                }
            },
            medium: {
                video: {
                    facingMode: FACING_MODE_USER,
                    width: {ideal: 640},
                    height: {ideal: 480},
                    frameRate: {ideal: isIOS ? 24 : 15}
                },
                audio: {
                    sampleRate: 22050,
                    channelCount: 1
                },
                recording: {
                    videoBitsPerSecond: isIOS ? 600000 : 500000,
                }
            },
            high: {
                video: {
                    facingMode: FACING_MODE_USER,
                    width: {ideal: 1280},
                    height: {ideal: 720},
                    frameRate: {ideal: isIOS ? 30 : 24}
                },
                audio: {
                    sampleRate: 44100,
                    channelCount: 2
                },
                recording: {
                    videoBitsPerSecond: isIOS ? 1200000 : 1000000,
                }
            }
        };

        return settings[quality] || settings.medium;
    }, []);

    // Kiểm tra quyền truy cập camera
    const checkCameraPermission = useCallback(async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: getVideoConstraints()
            });

            stream.getTracks().forEach(track => track.stop());
            setHasPermission(true);
            setCameraError(null);
            return true;
        } catch (error) {
            console.error('Lỗi quyền camera:', error);
            setHasPermission(false);

            if (error.name === 'NotAllowedError') {
                setCameraError('Quyền truy cập camera bị từ chối. Vui lòng cho phép truy cập camera trong trình duyệt.');
            } else if (error.name === 'NotFoundError') {
                setCameraError('Không tìm thấy camera. Vui lòng kiểm tra camera của thiết bị.');
            } else if (error.name === 'NotSupportedError') {
                setCameraError('Trình duyệt không hỗ trợ camera hoặc không sử dụng HTTPS.');
            } else {
                setCameraError('Lỗi khởi tạo camera: ' + error.message);
            }
            return false;
        }
    }, [getVideoConstraints]);

    const handleImageClick = async (imageType) => {
        setIsLoading(true);
        setCurrentImageType(imageType);

        const hasAccess = await checkCameraPermission();
        if (hasAccess) {
            setIsPopupOpen(true);
        } else {
            toast.error('Không thể truy cập camera. Vui lòng kiểm tra quyền truy cập camera!');
        }
        setIsLoading(false);
    };

    // Hàm cắt ảnh theo khung hướng dẫn
    const cropImageByFrame = (imageSrc, imageType) => {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => {
                try {
                    const canvas = document.createElement('canvas');
                    const ctx = canvas.getContext('2d');

                    if (imageType === CARD_TYPE.FACE) {
                        // Cắt ảnh avatar thành hình vuông
                        const minDimension = Math.min(img.width, img.height);
                        const cropSize = minDimension * 0.8;

                        canvas.width = cropSize;
                        canvas.height = cropSize;

                        const centerX = img.width / 2;
                        const centerY = img.height / 2;
                        const halfCropSize = cropSize / 2;

                        // Vẽ ảnh đã cắt vào vùng vuông
                        ctx.drawImage(
                            img,
                            centerX - halfCropSize,
                            centerY - halfCropSize,
                            cropSize,
                            cropSize,
                            0,
                            0,
                            cropSize,
                            cropSize
                        );
                    } else if (imageType === CARD_TYPE.FRONT_CARD || imageType === CARD_TYPE.BACK_CARD) {
                        // Cắt ảnh thẻ theo khung chữ nhật
                        // Khung có width 86% và height 30% của màn hình, đặt ở giữa
                        // Vùng mờ: top 35%, bottom 35%, left 7%, right 7%
                        const frameWidthPercent = 0.86;
                        const frameHeightPercent = 0.33;

                        const frameWidth = img.width * frameWidthPercent;
                        const frameHeight = img.height * frameHeightPercent;
                        const frameX = (img.width - frameWidth) / 2;
                        const frameY = (img.height - frameHeight) / 2;

                        canvas.width = frameWidth;
                        canvas.height = frameHeight;

                        // Vẽ ảnh đã cắt theo khung chữ nhật
                        ctx.drawImage(
                            img,
                            frameX, // source x
                            frameY, // source y
                            frameWidth, // source width
                            frameHeight, // source height
                            0, // dest x
                            0, // dest y
                            frameWidth, // dest width
                            frameHeight  // dest height
                        );
                    } else {
                        // Nếu không phải loại ảnh hỗ trợ, trả về ảnh gốc
                        canvas.width = img.width;
                        canvas.height = img.height;
                        ctx.drawImage(img, 0, 0);
                    }

                    // Chuyển canvas thành base64 với chất lượng cao
                    const croppedImageSrc = canvas.toDataURL('image/jpeg', 0.95);
                    resolve(croppedImageSrc);
                } catch (error) {
                    console.error('Lỗi khi cắt ảnh:', error);
                    // Trả về ảnh gốc nếu có lỗi
                    resolve(imageSrc);
                }
            };

            img.onerror = () => {
                console.error('Lỗi khi load ảnh để cắt');
                reject(new Error('Không thể load ảnh để cắt'));
            };

            img.src = imageSrc;
        });
    };

    const capturePhoto = async () => {
        try {
            const imageSrc = webcamRef.current?.getScreenshot();
            if (imageSrc) {
                // Cắt ảnh theo khung hướng dẫn
                const croppedImageSrc = await cropImageByFrame(imageSrc, currentImageType);

                // Xóa ảnh theo quy tắc trước khi cập nhật ảnh mới
                if (currentImageType === CARD_TYPE.FRONT_CARD) {
                    // Khi chụp ảnh mặt trước, xóa ảnh mặt sau và chân dung
                    setCapturedImages(prev => ({
                        ...prev,
                        [currentImageType]: croppedImageSrc,
                        backCard: null,
                        avatar: null
                    }));
                } else if (currentImageType === CARD_TYPE.BACK_CARD) {
                    // Khi chụp ảnh mặt sau, xóa ảnh chân dung
                    setCapturedImages(prev => ({
                        ...prev,
                        [currentImageType]: croppedImageSrc,
                        avatar: null
                    }));
                } else {
                    // Với các loại ảnh khác (avatar), cập nhật bình thường
                    setCapturedImages(prev => ({
                        ...prev,
                        [currentImageType]: croppedImageSrc
                    }));
                }

                await handleImageChange(currentImageType, croppedImageSrc)
                setIsPopupOpen(false);
            } else {
                toast.error('Không thể chụp ảnh. Camera chưa sẵn sàng. Vui lòng thử lại!');
            }
        } catch (error) {
            console.error('Lỗi chụp ảnh:', error);
            toast.error('Có lỗi xảy ra khi chụp ảnh. Vui lòng thử lại!');
        }
    };

    // Hàm kiểm tra thời gian hết hạn
    const checkExpiredDate = (expiredDate) => {
        if (!expiredDate) return false;

        // Parse với format DD/MM/YYYY từ API
        const expiredMoment = moment(expiredDate, 'DD/MM/YYYY');
        const currentMoment = moment();

        return currentMoment.isAfter(expiredMoment);
    };

    const handleImageChange = async (currentImageType, images) => {
        if (currentImageType === CARD_TYPE.FRONT_CARD && capturedImages.backCard === null) {
            try {
                setIsCardProcessing(true);
                const response = await dkttService.getInfoCardFront(formatImageForApi(images));
                if (response?.code && response?.code !== 200) {
                    setCapturedImages({
                        ...capturedImages,
                        frontCard: null
                    })
                    toast.error(getEkycMessage(response?.code) || response?.message)
                    return
                }
                if (response?.card_type === "cmt_9" || response?.card_type === "cmt_12" || response?.card_type === null) {
                    setCapturedImages({
                        ...capturedImages,
                        frontCard: null
                    })
                    toast.error(`Giấy tờ không hợp lệ. Vui lòng dùng căn cước công dân gắn chip`)
                    return
                }

                if (selectedCardType === "passport") {
                    if (response?.card_type === "cccd" || response?.card_type === "new_chip" || response?.card_type === "cmt_12" || response?.card_type === "cmt_9") {
                        setCapturedImages({
                            ...capturedImages,
                            frontCard: null
                        })
                        toast.error(`Không dùng CCCD cho hộ chiếu`)
                        return
                    }

                    // Kiểm tra hết hạn cho passport
                    if (response?.expired_date && checkExpiredDate(response.expired_date)) {
                        setCapturedImages({
                            ...capturedImages,
                            frontCard: null
                        })
                        toast.error(`Hộ chiếu đã hết hạn`)
                        return
                    }
                    if (response?.country_code && response?.country_code==='VNM') {
                        setCapturedImages({
                            ...capturedImages,
                            frontCard: null
                        })
                        toast.error(`Không dùng hộ chiếu Việt Nam`)
                        return
                    }

                    const checkRegisterResponse = await dkttService.checkNumberSimRegistered({id_number: response.idnumber})
                    if (checkRegisterResponse.success && checkRegisterResponse.data.value <= checkRegisterResponse.data.valueBlock) {
                        mapCardDataToForm(response);
                    } else {
                        toast.error(`Số giấy tờ đã đăng ký ${checkRegisterResponse.data.valueBlock} số thuê bao`)
                    }
                }
                else {
                    if (response?.result?.card_type === "passport") {
                        setCapturedImages({
                            ...capturedImages,
                            frontCard: null
                        })
                        toast.error(`Không dùng hộ chiếu cho CCCD`)
                        return
                    }
                    // Kiểm tra hết hạn cho CCCD
                    if (response?.expired_date && checkExpiredDate(response.expired_date)) {
                        setCapturedImages({
                            ...capturedImages,
                            frontCard: null
                        })
                        toast.error(`CCCD đã hết hạn`)
                        return
                    }
                    if (response?.dob && !isAtLeast14YearsOld(response.dob)) {
                        setCapturedImages({
                            ...capturedImages,
                            frontCard: null
                        })
                        toast.error(`Vui lòng sử dụng giấy tờ trên 14 tuổi!`)
                        return
                    }

                    const checkRegisterResponse = await dkttService.checkNumberSimRegistered({id_number: response.idnumber})
                    if (checkRegisterResponse.success && checkRegisterResponse.data.value < checkRegisterResponse.data.valueBlock) {
                        mapCardDataToForm(response);
                    } else {
                        setCapturedImages({
                            ...capturedImages,
                            frontCard: null
                        })
                        toast.error(`Số giấy tờ đã đăng ký ${checkRegisterResponse.data.valueBlock} số thuê bao`)
                        return
                    }
                }

            } catch (error) {
                console.error('Lỗi khi nhận diện thẻ:', error);
                setCapturedImages({
                    ...capturedImages,
                    frontCard: null
                })
                toast.error('Có lỗi xảy ra khi nhận diện thông tin thẻ. Vui lòng thử lại!');
            } finally {
                setIsCardProcessing(false);
            }
        }
        if (currentImageType === CARD_TYPE.BACK_CARD && capturedImages.frontCard) {
            try {
                setIsCardProcessing(true);
                const response = await dkttService.getInfoCardBoth(formatImageForApi(capturedImages.frontCard), formatImageForApi(images));
                if (response?.code && response?.code !== 0) {
                    setCapturedImages({
                        ...capturedImages,
                        backCard: null
                    })
                    toast.error(getEkycMessage(response?.code) || response?.message)
                    return
                }
                mapCardDataToForm(response);

            } catch (error) {
                console.error('Lỗi khi nhận diện thẻ:', error);
                setCapturedImages({
                    ...capturedImages,
                    backCard: null
                })
                toast.error('Có lỗi xảy ra khi nhận diện thông tin thẻ. Vui lòng thử lại!');
            } finally {
                setIsCardProcessing(false);
            }
        }
        if (currentImageType === CARD_TYPE.FACE && capturedImages.frontCard) {
            try {
                setIsCardProcessing(true);
                const response = await dkttService.faceMatching(formatImageForApi(capturedImages.frontCard), formatImageForApi(images));
                if (response?.code && response?.code !== 0) {
                    setCapturedImages({
                        ...capturedImages,
                        face: null
                    })
                    toast.error(getFaceMatchingMessage(response?.code) || response?.message)
                    return
                }
                if (response.face_score) {
                    formMethods.setValue("faceScore", response.face_score)
                    if (response.face_score < 60) {
                        toast.error("Guơng mặt không giống nhau")
                        setCapturedImages({
                            ...capturedImages,
                            face: null
                        })
                        return
                    }
                }

            } catch (error) {
                console.error('Lỗi khi nhận diện thẻ:', error);
                setCapturedImages({
                    ...capturedImages,
                    avatar: null
                })
                toast.error('Có lỗi xảy ra khi nhận diện thông tin thẻ. Vui lòng thử lại!');
            } finally {
                setIsCardProcessing(false);
            }
        }
    };

    // Function để map dữ liệu từ API response vào form
    const mapCardDataToForm = (cardData) => {
        try {
            // Tạo object chứa tất cả các giá trị cần update
            const formUpdates = {};

            // Map tên
            if (cardData.name) {
                formUpdates.full_name = cardData.name;
            }

            // Map số CCCD/CMND
            if (cardData.idnumber) {
                formUpdates.id_number = cardData.idnumber;
            }
            // Map số CCCD/CMND
            if (cardData.nationality) {
                formUpdates.nationality = cardData.nationality;
                if(cardData.nationality==='D<<'){
                    formUpdates.nationality = 'GERMANY'
                }
            }

            // Map ngày sinh
            if (cardData.dob) {
                formUpdates.birth_day = cardData.dob;
            }

            // Map ngày cấp
            if (cardData.issue_date) {
                formUpdates.issue_date = cardData.issue_date;
            }

            // Map nơi cấp
            if (cardData.issued_place) {
                const issued_place = [
                    {value: "BCA", label: "Bộ công an"},
                    {value: "CCC", label: "Cục Trưởng Cục Cảnh sát Quản lý hành chính về trật tự xã hội"},
                    {value: "CCD", label: "Cục Trưởng Cục Cảnh sát ĐKQL cư trú và DLQG về dân cư"},
                    {value: "CXN", label: "Cục quản lý xuất nhập cảnh"},
                ].find(item => item.label.toLocaleUpperCase() === cardData.issued_place)?.value;
                if (issued_place) {
                    formUpdates.issue_place = issued_place;
                } else {
                    if (cardData?.front_card_type === "cccd") {
                        formUpdates.issue_place = "CCC"
                    }
                    if (cardData?.front_card_type === "new_chip") {
                        formUpdates.issue_place = "BCA"
                    }
                    if (cardData?.front_card_type === "passport") {
                        formUpdates.issue_place = cardData.nationality
                        if(cardData.nationality==='D<<'){
                            formUpdates.issue_place = 'DEU'
                        }
                    }
                }
            }

            // Map giới tính
            if (cardData.gender) {
                formUpdates.gender = cardData.gender === "Nữ" ? "female" : "male";
            }

            // Map địa chỉ thường trú
            if (cardData.address) {
                formUpdates.address = cardData.address;
            }

            // Map các thông tin địa chỉ chi tiết
            if (cardData.address_detail?.city?.city_code) {
                formUpdates.strProvince = cardData.address_detail.city.city_code;
            }

            if (cardData.address_detail?.district?.district_code) {
                formUpdates.strDistrict = cardData.address_detail.district.district_code;
            }

            if (cardData.address_detail?.ward?.ward_code) {
                formUpdates.strPrecinct = cardData.address_detail.ward.ward_code;
            }

            // Map loại thẻ
            if (cardData.card_type) {
                formUpdates.card_type = cardData.card_type;
            }

            // Lấy giá trị hiện tại của form và merge với dữ liệu mới
            const currentValues = formMethods.getValues();
            const mergedValues = {...currentValues, ...formUpdates};

            // Reset form với dữ liệu đã merge (chỉ gọi setValue một lần)
            formMethods.reset(mergedValues);

            console.log('Đã cập nhật thông tin từ thẻ vào form thành công');

        } catch (error) {
            console.error('Lỗi khi map dữ liệu:', error);
        }
    };

    const handleFileUpload = async (imageType, imageData) => {
        try {
            setIsLoading(true);

            // Cắt ảnh theo khung hướng dẫn khi upload file
            const croppedImageData = imageData

            // Xóa ảnh theo quy tắc
            if (imageType === CARD_TYPE.FRONT_CARD) {
                // Khi upload ảnh mặt trước, xóa ảnh mặt sau và chân dung
                setCapturedImages(prev => ({
                    ...prev,
                    [imageType]: croppedImageData,
                    backCard: null,
                    avatar: null
                }));
            } else if (imageType === CARD_TYPE.BACK_CARD) {
                // Khi upload ảnh mặt sau, xóa ảnh chân dung
                setCapturedImages(prev => ({
                    ...prev,
                    [imageType]: croppedImageData,
                    avatar: null
                }));
            } else {
                // Với các loại ảnh khác (avatar), cập nhật bình thường
                setCapturedImages(prev => ({
                    ...prev,
                    [imageType]: croppedImageData
                }));
            }

            // Gọi xử lý ảnh giống như khi chụp
            await handleImageChange(imageType, croppedImageData);
        } catch (error) {
            console.error('Lỗi khi xử lý ảnh:', error);
            toast.error('Có lỗi xảy ra khi xử lý ảnh. Vui lòng thử lại!');
        } finally {
            setIsLoading(false);
        }
    };

    const onUserMedia = () => {
        console.log('Camera đã sẵn sàng');
        setCameraError(null);
    };

    const onUserMediaError = (error) => {
        console.error('Lỗi camera:', error);
        if (error.name === 'NotAllowedError') {
            setCameraError('Quyền truy cập camera bị từ chối. Vui lòng làm mới trang và cho phép truy cập camera.');
        } else if (error.name === 'NotFoundError') {
            setCameraError('Không tìm thấy camera. Vui lòng kiểm tra kết nối camera của thiết bị.');
        } else {
            setCameraError('Lỗi khởi tạo camera. Vui lòng thử lại sau.');
        }
    };

    const startRecording = async () => {
        try {
            setIsRecording(true);
            isRecordingRef.current = true;
            setRecordingTime(0);
            recordingTimeRef.current = 0;

            const qualitySettings = getVideoQualitySettings(videoQuality);
            const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

            const stream = await navigator.mediaDevices.getUserMedia({
                video: qualitySettings.video,
                audio: qualitySettings.audio
            });

            if (webcamRef.current) {
                webcamRef.current.srcObject = stream;
            }

            const optimalMimeType = getOptimalVideoFormat();
            let mediaRecorder;

            try {
                mediaRecorder = new MediaRecorder(stream, {mimeType: optimalMimeType});
            } catch (error) {
                mediaRecorder = new MediaRecorder(stream);
            }

            mediaRecorderRef.current = mediaRecorder;

            const chunks = [];
            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    setRecordedVideoData(event.data)
                    chunks.push(event.data);
                }
            };

            mediaRecorder.onstop = () => {
                const blobType = isIOS ? 'video/mp4' : optimalMimeType;
                const blob = new Blob(chunks, {type: blobType});
                const videoUrl = URL.createObjectURL(blob);
                setRecordedVideo(videoUrl);
                stream.getTracks().forEach(track => track.stop());
            };

            mediaRecorder.start();

            timerRef.current = setInterval(() => {
                recordingTimeRef.current += 1;
                setRecordingTime(recordingTimeRef.current);
                if (recordingTimeRef.current >= 30) {
                    stopRecording();
                }
            }, 1000);

        } catch (error) {
            setIsRecording(false);
            isRecordingRef.current = false;
            toast.error('Không thể bắt đầu quay video. Vui lòng kiểm tra quyền truy cập camera!');
        }
    };

    const saveRecording = async () => {
        try {
            setIsLoading(true)
            const payload = new FormData();
            payload.append("files", recordedVideoData);
            payload.append("id", "0");
            const response = await dkttService.saveVideo(payload)
            setRecordedVideoLink(response.result)
            setIsLoading(false)
            toast.success('Lưu video thành công!');
        } catch (error) {
            setIsLoading(false)
            console.error('Lỗi khi lưu video:', error);
            toast.error('Có lỗi xảy ra khi lưu video. Vui lòng thử lại!');
        }
    }
    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecordingRef.current) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
            isRecordingRef.current = false;
            setRecordingTime(0);
            recordingTimeRef.current = 0;
            if (timerRef.current) {
                clearInterval(timerRef.current);
                timerRef.current = null;
            }
        }
    };

    const retakeVideo = () => {
        // Cleanup video URL để tránh memory leak
        if (recordedVideo) {
            URL.revokeObjectURL(recordedVideo);
        }

        setRecordedVideo(null);
        setRecordedVideoData(null);
        setRecordedVideoLink(null);
        setRecordingTime(0);
        recordingTimeRef.current = 0;
        setIsRecording(false);
        isRecordingRef.current = false;

        if (timerRef.current) {
            clearInterval(timerRef.current);
            timerRef.current = null;
        }
    };
    useEffect(() => {
        if (recordedVideoData) {
            saveRecording()
        }
    }, [recordedVideoData]);
    const clearSignature = () => {
        if (signatureRef.current) {
            signatureRef.current.clear();
            setSignatureData(null);
        }
    };

    const retakePhoto = (imageType) => {
        setCapturedImages(prev => ({
            ...prev,
            [imageType]: null
        }));
    };

    const isStepComplete = (step) => {
        const formValues = formMethods.getValues();
        switch (step) {
            case 3:
                return selectedCardType !== '' && formValues.phone;
            case 4:
                return capturedImages.frontCard;
            case 5:
                return selectedCardType === 'passport' ? true : capturedImages.backCard;
            case 6:
                return capturedImages.avatar;
            case 7:
                return formValues.phone &&
                    formValues.id_number &&
                    formValues.full_name &&
                    formValues.birth_day &&
                    formValues.address &&
                    formValues.issue_place &&
                    formValues.issue_date;
            case 8:
                return signatureData;
            case 9:
                return true;
            default:
                return false;
        }
    };

    const handleNextStep = async () => {
        if (currentStep === 3) {
            // Reset images
            setCapturedImages({frontCard: null, backCard: null, avatar: null})

            // Set initial state
            setCurrentImageType(CARD_TYPE.FRONT_CARD)
            setCurrentStep(4)
        }
        // Nếu là bước 7 (InfoReview) chuyển sang bước 8 (Signature), cần validate form
        if (currentStep === 7) {
            try {
                // Validate toàn bộ form sử dụng schema
                const formValues = formMethods.getValues();
                await videoCallSchema.validate(formValues, {abortEarly: false});

                // Validation thành công, cho phép chuyển bước
                setCurrentStep(8);

            } catch (validationError) {
                console.error('Lỗi validation:', validationError);

                if (validationError.inner && validationError.inner.length > 0) {
                    // Hiển thị lỗi đầu tiên
                    const firstError = validationError.inner[0];
                    toast.error(firstError.message || 'Vui lòng kiểm tra lại thông tin đã nhập');

                    // Set errors vào form để hiển thị trên UI
                    const errors = {};
                    validationError.inner.forEach(error => {
                        if (error.path) {
                            errors[error.path] = {message: error.message};
                        }
                    });
                    formMethods.setError('root', {
                        type: 'validation',
                        message: 'Có lỗi trong form'
                    });

                } else {
                    toast.error('Vui lòng kiểm tra lại thông tin đã nhập');
                }
                return;
            }
        } else {
            // Các bước khác giữ nguyên logic cũ
            if (isStepComplete(currentStep)) {
                if (currentStep < 9) {
                    if (currentStep === 4 && selectedCardType === 'passport') {
                        setCurrentStep(6);
                    } else {
                        setCurrentStep(currentStep + 1);
                    }
                } else {
                    toast.success('Hoàn thành đăng ký thành công!');
                }
            }
        }
    };

    const handlePrevStep = () => {
        if (currentStep > 3) {
            if (currentStep === 6 && selectedCardType === 'passport') {
                setCurrentStep(4);
            } else {
                setCurrentStep(currentStep - 1);
            }
        }
    };

    const onSubmit = async (data) => {
        try {
            const param = {
                registrationId: registrationId.current,
                fullName: data.full_name || "",
                idNumber: data.id_number || "",
                idType: data.card_type || "",
                birthDay: data.birth_day || "",
                gender: data.gender,
                issueDate: data.issue_date || "",
                issuePlace: data.issue_place || "",
                provinceCode: data.strProvince || null,
                districtCode: data.strDistrict || null,
                precinctCode: data.strPrecinct || null,
                address: data.address || "",
                nationality: data.nationality || "",
                faceScore: data.faceScore || "",
                img1: formatImageForApi(capturedImages.frontCard) || "",
                img2: formatImageForApi(capturedImages.backCard) || formatImageForApi(capturedImages.frontCard) || "",
                img3: formatImageForApi(capturedImages.avatar) || "",
                img4: formatImageForApi(signatureData),
                videoLink: recordedVideoLink || ""
            };
            setIsSubmittingRegistration(true)
            const response = await dkttService.saveRegistrationInfo(param);
            setIsSubmittingRegistration(false)
            if (response.success) {
                setIsSubmitSuccess(true)
                setCurrentStep(10)
                toast.success("Đăng ký thông tin thành công")
            } else {
                toast.error(response.message || "Đăng ký thất bại")
            }
        } catch (error) {
            console.error('Lỗi khi lưu thông tin:', error);
            setIsSubmittingRegistration(false)
            toast.error(error.message || 'Có lỗi xảy ra khi đăng ký. Vui lòng thử lại!');
        }
    };
    const getForm = async () => {
        const data = formData
        try {
            const param = {
                phone: data.phone,
                registrationId: registrationId.current,
                fullName: data.full_name || "",
                idNumber: data.id_number || "",
                idType: data.card_type || "",
                birthDay: data.birth_day || "",
                gender: data.gender === "female" ? "Nữ" : "Nam",
                issueDate: data.issue_date || "",
                issuePlace: data.issue_place || "",
                provinceCode: data.strProvince || "",
                districtCode: data.strDistrict || "",
                precinctCode: data.strPrecinct || "",
                address: data.address || "",
                nationality: data.nationality || "",
                faceScore: data.faceScore || "",
                img1: "",
                img2: "",
                img3: "",
                img4: formatImageForApi(signatureData),
                videoLink: recordedVideoLink || ""
            };
            setIsSubmittingRegistration(true)
            const response = await dkttService.getForm(param);
            setIsSubmittingRegistration(false)
            if (response.success) {
                setRegisterForm(response.data)
            } else {
                toast.error(response.message || "Đăng ký thất bại")
            }
        } catch (error) {
            console.error('Lỗi khi lưu thông tin:', error);
            setIsSubmittingRegistration(false)
            toast.error(error.message || 'Có lỗi xảy ra khi đăng ký. Vui lòng thử lại!');
        }
    };

    return {
        // Refs
        webcamRef,
        signatureRef,
        mediaRecorderRef,

        // State
        currentStep,
        isPopupOpen,
        setIsPopupOpen,
        currentImageType,
        capturedImages,
        recordedVideo,
        recordedVideoLink,
        signatureData,
        setSignatureData,
        isRecording,
        recordingTime,
        cameraError,
        setCameraError,
        isLoading,
        isCardProcessing,
        hasPermission,
        selectedCardType,
        setSelectedCardType,
        videoQuality,
        setVideoQuality,
        simType,
        registrationType,
        infoReviewData,
        formDataChanged,
        isSubmittingRegistration,
        isSubmitSuccess,

        // Form methods
        ...formMethods,
        formData,

        // Actions
        checkCameraPermission,
        handleImageClick,
        capturePhoto,
        cropImageByFrame,
        onUserMedia,
        onUserMediaError,
        startRecording,
        saveRecording,
        stopRecording,
        retakeVideo,
        clearSignature,
        retakePhoto,
        handleFileUpload,
        getVideoConstraints,
        getOptimalVideoFormat,
        getVideoQualitySettings,
        isStepComplete,
        handleNextStep,
        handlePrevStep,
        onSubmit,
        mapCardDataToForm,
        getForm,
        registerForm
    };
};
