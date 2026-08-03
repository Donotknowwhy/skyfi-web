'use client';
import Image from 'next/image';
import Link from 'next/link';

const PopularNewsItem = ({ id, title, publishDate, imageUrl }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <Link href={`/news/${id}`} className="block group">
      <article className="flex gap-5 py-2">
        <div className="relative  h-[112.5px] aspect-video rounded-[12px] overflow-hidden bg-gray-200 flex-shrink-0">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="200px"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400 text-2xl">📰</span>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-3 flex-1">
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="stroke-gray-400">
              <path d="M6.667 1.667v3.333M13.333 1.667v3.333M2.5 8.333h15M4.167 3.333h11.666c.92 0 1.667.747 1.667 1.667v11.667c0 .92-.747 1.667-1.667 1.667H4.167c-.92 0-1.667-.747-1.667-1.667V5c0-.92.747-1.667 1.667-1.667z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span>{formatDate(publishDate)}</span>
          </div>

          <h4 className="text-base font-semibold text-gray-800 leading-tight group-hover:text-orange-600 transition-colors line-clamp-2">
            {title}
          </h4>
        </div>
      </article>
    </Link>
  );
};

const PopularNews = ({ popularNews = [] }) => {
  return (
    <aside className=" w-full md:w-[441px] flex-shrink-0">
      <div className="sticky top-24">
        <div className="flex items-center gap-2 mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Phổ biến nhất</h2>
        </div>

        <div className="space-y-4">
          {popularNews.map((news, index) => (
            <PopularNewsItem
              key={news.id || index}
              id={news.display_slug}
              title={news.display_title}
              publishDate={news.published_at}
              imageUrl={news.featured_image}
            />
          ))}
        </div>
      </div>
    </aside>
  );
};

export default PopularNews;