'use client';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';
import { useSupport } from '../provider/ProvideSuport';
import FAQCategory from './FQACategory';

const ContentAll = () => {
  const { FQADataDisplay, searchInFAQ, isShowAll, setIsShowAll } = useSupport();
  const [searchKeyword, setSearchKeyword] = useState('');
  const debouncedSearchKeyword = useDebounce(searchKeyword, 500);

  useEffect(() => {
    searchInFAQ(debouncedSearchKeyword);
  }, [debouncedSearchKeyword]);

  return (
    <div className="min-h-[100dvh] flex flex-col bg-white">
      {/* Header / Top Bar */}
      <div className="sticky top-0 z-10 bg-white">

        {/* Search Bar */}
        <div className="px-4 pb-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="w-5 h-5 text-[#8A8A8A]" />
            </div>
            <input
              type="text"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              placeholder="Tìm kiếm câu hỏi"
              className="w-full pl-10 pr-4 py-2 border border-[#E5E7EB] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#DA2128]"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-4 overflow-y-auto">
        {FQADataDisplay.length > 0 ? (
          FQADataDisplay.map((category, index) => (
            <FAQCategory
              key={index}
              questions={category}

            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
            <p className="text-sm text-[#8A8A8A]">Không tìm thấy kết quả</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentAll;

function useDebounce(value, delay = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [delay, value]);

  return debouncedValue;
}