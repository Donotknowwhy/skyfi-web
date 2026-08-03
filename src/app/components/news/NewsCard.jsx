'use client';
import Image from 'next/image';
import Link from 'next/link';

const NewsCard = ({
  id,
  title,
  excerpt,
  imageUrl,
  publishDate,
  isMain = false
}) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  if (isMain) {
    return (
      <Link href={`/news/${id}`} className="block group">
        <article className="flex flex-col gap-5">
          <div className="relative w-full aspect-[16/9] rounded-[20px] overflow-hidden bg-gray-200">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={title}
                fill
                className="object-cover group-hover:scale-105 w-full transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                <span className="text-gray-400 text-6xl">📰</span>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="stroke-gray-400">
                <path d="M6.667 1.667v3.333M13.333 1.667v3.333M2.5 8.333h15M4.167 3.333h11.666c.92 0 1.667.747 1.667 1.667v11.667c0 .92-.747 1.667-1.667 1.667H4.167c-.92 0-1.667-.747-1.667-1.667V5c0-.92.747-1.667 1.667-1.667z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>{formatDate(publishDate)}</span>
            </div>

            <h2 className="text-2xl font-semibold text-gray-800 leading-tight group-hover:text-orange-600 transition-colors">
              {title}
            </h2>

            <p className="text-gray-600 leading-relaxed line-clamp-3">
              {excerpt}
            </p>
          </div>
        </article>
      </Link>
    );
  }

  return (
    <Link href={`/news/${id}`} className="block group">
      <article className="flex flex-col md:flex-row gap-10 py-10 border-b border-gray-200 last:border-b-0">
        <div className="relative  aspect-[16/9] h-[225px] rounded-[20px] overflow-hidden bg-gray-200 flex-shrink-0">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="400px"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400 text-4xl">📰</span>
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

          <h3 className="text-xl font-semibold text-gray-800 leading-tight group-hover:text-orange-600 transition-colors">
            {title}
          </h3>

          <p className="text-gray-600 leading-relaxed line-clamp-3">
            {excerpt}
          </p>
        </div>
      </article>
    </Link>
  );
};

export default NewsCard;