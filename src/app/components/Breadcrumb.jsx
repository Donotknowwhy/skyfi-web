"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

const Breadcrumb = ({ items }) => {
  const params = useParams();
  const { locale } = params;

  return (
    <nav className="bg-white py-4 border-b border-gray-200">
      <div className="container mx-auto px-4">
        <ol className="flex items-center space-x-2 text-sm">
          <li>
            <Link href={`/${locale}`} className="text-gray-500 hover:text-[#ED1B2F] transition-colors">
              Trang chủ
            </Link>
          </li>
          {items.map((item, index) => (
            <li key={index} className="flex items-center space-x-2">
              <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              {item.href ? (
                <Link href={item.href} className="text-gray-500 hover:text-[#ED1B2F] transition-colors">
                  {item.label}
                </Link>
              ) : (
                <span className="text-[#ED1B2F] font-medium">{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumb;
