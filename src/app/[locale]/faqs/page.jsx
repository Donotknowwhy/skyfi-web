"use client";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import {useLocale} from "next-intl";
import {useEffect, useMemo, useState} from "react";
import faqService from "@/app/services/faqService";

const FAQs = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [expandedItems, setExpandedItems] = useState(new Set());
    const locale = useLocale();
    const [questions,setQuestions]=useState([]);
    // Translations object
    const translations = {
        vi: {
            title: "Câu hỏi thường gặp",
            searchPlaceholder: "Tìm kiếm câu hỏi thường gặp...",
            resultCount: "Hiển thị",
            questions: "câu hỏi",
            collapseAll: "Thu gọn tất cả",
            expandAll: "Mở rộng tất cả",
            noResultsTitle: "Không tìm thấy câu hỏi nào",
            noResultsDesc: "Thử tìm kiếm với từ khóa khác hoặc liên hệ hỗ trợ",
            clearSearch: "Xóa tìm kiếm"
        },
        en: {
            title: "Frequently Asked Questions",
            searchPlaceholder: "Search frequently asked questions...",
            resultCount: "Showing",
            questions: "questions",
            collapseAll: "Collapse All",
            expandAll: "Expand All",
            noResultsTitle: "No questions found",
            noResultsDesc: "Try searching with different keywords or contact support",
            clearSearch: "Clear Search"
        }
    };

    // Get current translations
    const t = translations[locale] || translations.vi;

    const getFAQs = async () => {
        const res = await faqService.getFAQs(locale);
        setQuestions(res.data);
    };

    useEffect(() => {
        getFAQs();
    },[])

    // Filter questions based on search term
    const filteredQuestions = useMemo(() => {
        if (!searchTerm.trim()) return questions;

        return questions.filter(question =>
            question.display_title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            question.display_content.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [searchTerm, locale,questions]);

    // Toggle accordion item
    const toggleItem = (index) => {
        const newExpandedItems = new Set(expandedItems);
        if (newExpandedItems.has(index)) {
            newExpandedItems.delete(index);
        } else {
            newExpandedItems.add(index);
        }
        setExpandedItems(newExpandedItems);
    };

    // Toggle all items
    const toggleAll = () => {
        if (expandedItems.size === filteredQuestions.length) {
            setExpandedItems(new Set());
        } else {
            setExpandedItems(new Set(filteredQuestions.map((_, index) => index)));
        }
    };

    // Clear search
    const clearSearch = () => {
        setSearchTerm('');
        setExpandedItems(new Set());
    };

    return (
        <div className="flex flex-col min-h-screen font-koho">
            <Header />

            {/* Content Section */}
            <div className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
                {/* Search and Controls */}
                <div className="mb-8 space-y-4">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder={t.searchPlaceholder}
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-700"
                        />
                        {searchTerm && (
                            <button
                                onClick={clearSearch}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xl"
                            >
                                ×
                            </button>
                        )}
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                            {!searchTerm && (
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            )}
                        </div>
                    </div>

                    {/* Results count and controls */}
                    <div className="flex justify-between items-center">
                        <p className="text-gray-600">
                            {t.resultCount} {filteredQuestions.length} / {questions.length} {t.questions}
                        </p>
                        <button
                            onClick={toggleAll}
                            className="px-4 py-2 text-sm font-medium text-red-600 border border-red-600 rounded-lg hover:bg-red-50 transition-colors duration-200"
                        >
                            {expandedItems.size === filteredQuestions.length ? t.collapseAll : t.expandAll}
                        </button>
                    </div>
                </div>

                {/* FAQ Items */}
                {filteredQuestions.length === 0 ? (
                    <div className="text-center py-12">
                        <div className="text-gray-400 mb-4">
                            <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.562M15 6.306a7.962 7.962 0 00-6 0M3 20a20.966 20.966 0 0018 0" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-600 mb-2">{t.noResultsTitle}</h3>
                        <p className="text-gray-500 mb-4">{t.noResultsDesc}</p>
                        <button
                            onClick={clearSearch}
                            className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200"
                        >
                            {t.clearSearch}
                        </button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {filteredQuestions.map((question, index) => (
                            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                                <button
                                    onClick={() => toggleItem(index)}
                                    className="w-full px-6 py-4 text-left hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:bg-gray-50"
                                >
                                    <div className="flex justify-between items-start">
                                        <h3 className="font-medium text-gray-800 pr-4 leading-relaxed">
                                            {question.display_title}
                                        </h3>
                                        <div className="flex-shrink-0 ml-2">
                                            <svg
                                                className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                                                    expandedItems.has(index) ? 'rotate-180' : ''
                                                }`}
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </div>
                                </button>

                                <div className={`transition-all duration-300 ease-in-out ${
                                    expandedItems.has(index)
                                        ? 'max-h-[1000px] opacity-100'
                                        : 'max-h-0 opacity-0'
                                } overflow-hidden`}>
                                    <div className="px-6 pb-4 border-t border-gray-100">
                                        <div className="pt-4 text-gray-700 leading-relaxed whitespace-pre-line">
                                            {question.display_content}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
};

export default FAQs;
