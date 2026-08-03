'use client';
import { useState } from 'react';

const Pagination = ({ 
  currentPage = 1, 
  totalPages = 1, 
  onPageChange = () => {},
  maxVisiblePages = 5 
}) => {
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  const getVisiblePages = () => {
    const pages = [];
    const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  const visiblePages = getVisiblePages();
  const showLeftDots = visiblePages[0] > 2;
  const showRightDots = visiblePages[visiblePages.length - 1] < totalPages - 1;

  return (
    <div className="flex justify-center items-center gap-3 py-2">
      {/* Previous Button */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`w-8 h-8 rounded-[10px] flex items-center justify-center transition-colors ${
          currentPage === 1
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
        }`}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path 
            d="M12.5 15L7.5 10L12.5 5" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* First page */}
      {visiblePages[0] > 1 && (
        <>
          <button
            onClick={() => handlePageChange(1)}
            className="w-8 h-8 rounded-[10px] flex items-center justify-center text-sm font-medium text-gray-600 hover:bg-gray-50 border border-gray-200 transition-colors"
          >
            1
          </button>
          {showLeftDots && (
            <span className="flex items-center justify-center w-8 h-8 text-gray-400">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="4" cy="10" r="1.5" fill="currentColor"/>
                <circle cx="10" cy="10" r="1.5" fill="currentColor"/>
                <circle cx="16" cy="10" r="1.5" fill="currentColor"/>
              </svg>
            </span>
          )}
        </>
      )}

      {/* Visible page numbers */}
      {visiblePages.map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={`w-8 h-8 rounded-[10px] flex items-center justify-center text-sm font-medium transition-colors ${
            page === currentPage
              ? 'bg-orange-500 text-white'
              : 'text-gray-600 hover:bg-gray-50 border border-gray-200'
          }`}
        >
          {page}
        </button>
      ))}

      {/* Last page */}
      {visiblePages[visiblePages.length - 1] < totalPages && (
        <>
          {showRightDots && (
            <span className="flex items-center justify-center w-8 h-8 text-gray-400">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="4" cy="10" r="1.5" fill="currentColor"/>
                <circle cx="10" cy="10" r="1.5" fill="currentColor"/>
                <circle cx="16" cy="10" r="1.5" fill="currentColor"/>
              </svg>
            </span>
          )}
          <button
            onClick={() => handlePageChange(totalPages)}
            className="w-8 h-8 rounded-[10px] flex items-center justify-center text-sm font-medium text-gray-600 hover:bg-gray-50 border border-gray-200 transition-colors"
          >
            {totalPages}
          </button>
        </>
      )}

      {/* Next Button */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`w-8 h-8 rounded-[10px] flex items-center justify-center transition-colors ${
          currentPage === totalPages
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
        }`}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path 
            d="M7.5 15L12.5 10L7.5 5" 
            stroke="currentColor" 
            strokeWidth="1.5" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
};

export default Pagination;