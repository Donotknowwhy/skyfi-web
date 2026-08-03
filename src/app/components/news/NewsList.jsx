'use client';
import NewsCard from './NewsCard';

const NewsList = ({ news = [], isLoading = false }) => {
  if (isLoading) {
    return (
      <div className="space-y-8">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="flex gap-10 py-10 border-b border-gray-200 animate-pulse">
            <div className="w-[400px] h-[225px] bg-gray-200 rounded-[20px]"></div>
            <div className="flex-1 space-y-4">
              <div className="h-4 bg-gray-200 rounded w-32"></div>
              <div className="h-6 bg-gray-200 rounded w-3/4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!news.length) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">📰</div>
        <h3 className="text-xl font-semibold text-gray-600 mb-2">Không có tin tức nào</h3>
        <p className="text-gray-500">Hiện tại chưa có tin tức nào được đăng tải.</p>
      </div>
    );
  }

  const [mainNews, ...otherNews] = news;

  return (
    <div className="space-y-8">
      {mainNews && (
        <NewsCard
          id={mainNews.display_slug}
          title={mainNews.display_title}
          excerpt={mainNews.display_summary}
          imageUrl={mainNews.featured_image}
          publishDate={mainNews.published_at}
          isMain={true}
        />
      )}

      {otherNews.length > 0 && (
        <div className="space-y-0">
          {otherNews.map((newsItem) => (
            <NewsCard
              key={newsItem.display_slug}
              id={newsItem.display_slug}
              title={newsItem.display_title}
              excerpt={newsItem.display_summary}
              imageUrl={newsItem.featured_image}
              publishDate={newsItem.published_at}
              isMain={false}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default NewsList;