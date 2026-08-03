'use client';
import { useLocale } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Footer from '../../components/Footer';
import Header from '../../components/Header';
import NewsList from '../../components/news/NewsList';
import Pagination from '../../components/news/Pagination';
import PopularNews from '../../components/news/PopularNews';
import newsService from '../../services/newsService';

export default function NewsPage() {
  const searchParams = useSearchParams();
  const [news, setNews] = useState([]);
  const [popularNews, setPopularNews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 10;
  const locale = useLocale();

  const fetchNews = async (page = 1) => {
    try {
      setIsLoading(true);
      setError(null);

      const params = {
        page,
        pageSize,
        language:locale
      };

      const response = await newsService.getNewsList(params);

      if (response.success) {
        setNews(response.data || []);
        setTotalPages(Math.ceil((response.totalRecords || 0) / pageSize));
      } else {
        setError(response.message || 'Có lỗi xảy ra khi tải tin tức');
        setNews([]);
      }
    } catch (err) {
      console.error('Error fetching news:', err);
      setError('Không thể tải tin tức. Vui lòng thử lại sau.');
      setNews([]);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchPopularNews = async () => {
    try {
      const response = await newsService.getMostViewedNews({
        language: locale,
        limit: 5,
        days: 366
      });

      if (response.success) {
        setPopularNews(response.data || []);
      }
    } catch (err) {
      console.error('Error fetching popular news:', err);
    }
  };

  useEffect(() => {
    const page = parseInt(searchParams.get('page')) || 1;
    setCurrentPage(page);
    fetchNews(page);
    fetchPopularNews();
  }, [searchParams]);

  const handlePageChange = (page) => {
    setCurrentPage(page);

    const url = new URL(window.location);
    url.searchParams.set('page', page.toString());
    window.history.pushState({}, '', url);

    fetchNews(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-6">
          <div className="py-20">
            {/* Page Title */}
            {/* <div className="mb-12">
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Tin tức</h1>
              <p className="text-lg text-gray-600">
                Cập nhật những tin tức mới nhất về dịch vụ eSIM và công nghệ viễn thông
              </p>
            </div> */}

            {/* Error State */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
                <div className="flex items-center">
                  <div className="text-red-500 mr-3">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-red-800 font-medium">Có lỗi xảy ra</h3>
                    <p className="text-red-700 text-sm mt-1">{error}</p>
                  </div>
                </div>
                <button
                  onClick={() => fetchNews(currentPage)}
                  className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-red-700 transition-colors"
                >
                  Thử lại
                </button>
              </div>
            )}

            {/* Main Content */}
            <div className="flex gap-10 flex-col md:flex-row">
              {/* News List */}
              <div className="flex-1">
                <NewsList news={news} isLoading={isLoading} />

                {/* Pagination */}
                {!isLoading && !error && totalPages > 1 && (
                  <div className="mt-12">
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={handlePageChange}
                    />
                  </div>
                )}
              </div>

              {/* Popular News Sidebar */}
              <PopularNews popularNews={popularNews} />
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
