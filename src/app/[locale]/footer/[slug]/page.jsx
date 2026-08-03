'use client';
import Footer from '@/app/components/Footer';
import Header from '@/app/components/Header';
import PopularNews from '@/app/components/news/PopularNews';
import newsService from '@/app/services/newsService';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import './style.css'
import homeService from "@/app/services/homeService";
export default function NewsDetailPage() {
  const params = useParams();
  const [newsDetail, setNewsDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [ error, setError ] = useState( null );
  const locale  = useLocale();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(locale, {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  const fetchNewsDetail = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await homeService.getFooterNewsDetail(params.slug, locale);

      if (response.success) {
        setNewsDetail(response.data);
      } else {
        setError(response.message || 'Không tìm thấy tin tức');
      }
    } catch (err) {
      console.error('Error fetching news detail:', err);
      setError('Không thể tải tin tức. Vui lòng thử lại sau.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (params.slug) {
      fetchNewsDetail()
    }
  }, [params.slug,locale]);

  if (isLoading) {
    return (
      <div className="bg-white min-h-screen">
          <Header />
        <div className="max-w-[1728px] mx-auto px-4 md:px-6">
          <div className="flex flex-col lg:flex-row justify-center gap-6 lg:gap-10 py-8 md:py-20">
            <div className="flex-1 max-w-full lg:max-w-[921px] animate-pulse">
              <div className="h-6 md:h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-32 mb-4 md:mb-5"></div>
              <div className="w-full aspect-[16/9] md:aspect-[921/518] bg-gray-200 rounded-xl md:rounded-[20px] mb-4 md:mb-5"></div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>
            <div className="hidden lg:block lg:w-[441px]">
              <div className="h-6 bg-gray-200 rounded w-1/2 mb-6"></div>
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="flex gap-5 py-2">
                    <div className="w-[200px] h-[112px] bg-gray-200 rounded-[12px]"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-3 bg-gray-200 rounded w-1/3"></div>
                      <div className="h-4 bg-gray-200 rounded"></div>
                      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white min-h-screen">
        <div className="max-w-[1728px] mx-auto px-4 md:px-6 py-8 md:py-20">
          <div className="text-center">
            <div className="text-6xl mb-4">📰</div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-4">Không tìm thấy tin tức</h1>
            <p className="text-gray-600 mb-8">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  // Mock content structure based on Figma design
  const mockContent = [
    {
      type: 'section',
      title: '1.Soft Opening - Ra mắt dịch vụ eSIM SkyFi:',
      content: `Ngày 6/6/2024, SkyFi hợp tác cùng Vietjet Air, chính thức cho ra mắt dịch vụ eSIM quốc tế & mở bán trên Web/App của Vietjet Air.

Với sự kết hợp này, SkyFi & Vietjet Air mong muốn mang lại một trải nghiệm khác biệt & nâng cấp sự tiện lợi cho khách hàng trên hành trình bay, tiết kiệm được rất nhiều thời gian, công sức & chi phí khi có thể mua 2 trong 1.

Khách hàng có thể vừa mua vé máy bay vừa mua eSIM phục vụ cho quá trình kết nối Internet (ngay khi tới quốc gia đích đến). Sau khi mua eSIM, quý khách sẽ nhận được email hướng dẫn kích hoạt eSIM ngay trên điện thoại, không cần lo tìm quầy bán SIM vật lý.`,
      font: 'serif'
    },
    {
      type: 'section',
      title: '2.Lợi ích của việc sử dụng eSIM SkyFi với khách du lịch quốc tế:',
      content: `Với công nghệ eSIM quốc tế & App quản lý hiện đại, SkyFi mạng lại nhiều lợi ích cho khách hàng trên hành trình du lịch quốc tế:

Mua nhanh & Kích hoạt tiện lợi: Du khách có thể mua online trước khi khởi hành & kích hoạt kết nối mạng ngay trên di động.

Kết nối mạng mọi lúc mọi nơi: eSIM SkyFi có độ phủ sóng lên tới 200+ quốc gia trên thế giới.

Lựa chọn gói cước linh hoạt: SkyFi có các gói cước đa dạng về dung lượng từ 1GB tới 100GB với thời hạn hiệu lực từ 7 ngày tới 180 ngày.

Sử dụng nhiều eSIM & chuyển đổi giữa các nhà mạng: Có thể chuyển đổi giữa các nhà cung cấp mạng di động mà không cần thay thẻ SIM, chỉ cần kích hoạt gói eSIM mới trực tiếp trên điện thoại.

Giảm chi phí sử dụng data: Tránh được khoản phí chuyển vùng đắt đỏ của nhà mạng gốc. Bạn có thể mua các gói dữ liệu của SkyFi với giá rẻ hơn.

Bảo mật thông tin: eSIM được mã hóa và bảo mật tốt hơn so với SIM vật lý, giúp giảm nguy cơ bị đánh cắp thông tin cá nhân.

Bảo vệ môi trường: Sử dụng eSIM góp phần giảm thiểu lượng rác thải điện tử đến từ thẻ SIM cứng thông thường.

Quản lý qua ứng dụng: SkyFi có ứng dụng riêng để khách hàng có thể quản lý & theo dõi eSIM & gói cước dữ liệu đang sử dụng, có thể mua thêm gói cước ngay trên App.

Với rất nhiều tiện lợi kể trên, du khách du lịch quốc tế đều nên sở hữu một chiếc eSIM SkyFi và gói cước thích hợp để kết nối Internet tốc độ cao trong xuyên suốt chuyến hành trình của mình.`,
      font: 'koho-bold'
    },
    {
      type: 'section',
      title: '3.Mua eSIM SkyFi trên Web/App Vietjet như thế nào?',
      content: `Nếu bạn đang băn khoăn về cách mua eSIM SkyFi cho hành trình du lịch của mình, hãy theo dõi các bước dưới đây nhé:

Bước 1: Truy cập App Vietjet Air hoặc website: https://www.vietjetair.com/

Bước 2: Mua vé máy bay (Chọn điểm khởi hành & điểm đến -> Chọn ngày bay -> Chọn chuyến bay -> Nhập thông tin cá nhân -> Nhấn "Đi tiếp")

Bước 3: Mua eSIM & gói cước (Nhấn "Chọn eSIM SkyFi" -> Chọn gói cước data -> Thanh toán)

Bước 4: Nhận email xác nhận đơn hàng & hướng dẫn kích hoạt eSIM trên điện thoại

Hy vọng bài viết sẽ giúp bạn chọn mua eSIM thành công trên Web/App của Vietjet Air & tận hưởng trọn vẹn chuyến du lịch của mình!

Mọi thắc mắc xin vui lòng liên hệ với SkyFi qua Hotline 1900 1886 hoặc Email customercare@skyfi.vn`,
      font: 'koho'
    }
  ];

  return (
    <div className="bg-white min-h-screen">
      <Header />
      <div className="max-w-[1728px] mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row justify-center gap-6 lg:gap-10 py-8 md:py-20">
          {/* Main Article Content */}
          <article className="flex-1 max-w-full ">
            <div className="flex flex-col gap-4 md:gap-5">
              {/* Title */}
              <h1 className="text-[28px] font-semibold leading-[1.286] text-[#333333] font-['Inter']">
                {newsDetail?.display_title || 'Chính thức ra mắt eSIM du lịch trên web/app VietJet Air'}
              </h1>

              {/* Date */}
              <div className="flex items-center gap-1">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path
                    d="M6.667 1.667v3.333M13.333 1.667v3.333M2.5 8.333h15M4.167 3.333h11.666c.92 0 1.667.747 1.667 1.667v11.667c0 .92-.747 1.667-1.667 1.667H4.167c-.92 0-1.667-.747-1.667-1.667V5c0-.92.747-1.667 1.667-1.667z"
                    stroke="#A1A1A1"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-sm font-medium text-[#8A8A8A] font-['Inter']">
                  {formatDate(newsDetail?.published_at || '2024-06-03')}
                </span>
              </div>

              {/* Featured Image */}
              {/*<div className="relative w-full aspect-[16/9] md:aspect-[921/518] rounded-xl md:rounded-[20px] overflow-hidden bg-gray-200">*/}
              {/*  {newsDetail?.featured_image ? (*/}
              {/*    <Image*/}
              {/*      src={newsDetail.featured_image}*/}
              {/*      alt={newsDetail.title}*/}
              {/*      fill*/}
              {/*      className="object-cover"*/}
              {/*      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 921px"*/}
              {/*      priority*/}
              {/*    />*/}
              {/*  ) : (*/}
              {/*    <div className="w-full h-full bg-gray-200 flex items-center justify-center">*/}
              {/*      <span className="text-gray-400 text-6xl">📰</span>*/}
              {/*    </div>*/}
              {/*  )}*/}
              {/*</div>*/}

              {/* Article Content Sections */}
              <div className="space-y-5" dangerouslySetInnerHTML={{ __html: newsDetail?.display_content || '' }}/>


            </div>
          </article>
        </div>
      </div>
      <Footer />

    </div>
  );
}
