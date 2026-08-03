"use client";

import faqService from "@/app/services/faqService";
import { useLocale } from "next-intl";
import { useEffect, useState } from "react";

// Red circular "?" icon shown on the left of each FAQ row (matches design)
const QuestionMarkIcon = () => (
  <span className="flex-shrink-0 w-6 h-6 rounded-full border-[1.5px] border-[#DA2128] flex items-center justify-center">
    <span className="text-[#DA2128] text-sm font-bold leading-none">?</span>
  </span>
);

const FAQItem = ({ question, isOpen, onToggle }) => (
  <div className="border-b border-[#F1F1F1] last:border-b-0">
    <button
      type="button"
      onClick={onToggle}
      className="w-full flex items-center gap-3 py-4 text-left"
    >
      <QuestionMarkIcon />
      <span className="flex-1 text-base text-[#0E0E0F] leading-snug">
        {question.display_title}
      </span>
      <svg
        className={`w-5 h-5 text-[#9CA3AF] flex-shrink-0 transition-transform duration-200 ${
          isOpen ? "rotate-180" : ""
        }`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M19 9l-7 7-7-7"
        />
      </svg>
    </button>

    <div
      className={`overflow-hidden transition-all duration-300 ease-in-out ${
        isOpen ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"
      }`}
    >
      <div className="mb-4 rounded-2xl bg-[#F5F5F5] px-4 py-3 text-sm leading-6 text-[#5C5C5C] whitespace-pre-line">
        {question.display_content}
      </div>
    </div>
  </div>
);

const RegisterFAQ = ({ title }) => {
  const locale = useLocale();
  const [questions, setQuestions] = useState([]);
  const [openIndex, setOpenIndex] = useState(null);

  useEffect(() => {
    let mounted = true;
    const fetchFAQs = async () => {
      const res = await faqService.getFAQs(locale);
      if (mounted && res?.success && Array.isArray(res.data)) {
        setQuestions(res.data);
      }
    };
    fetchFAQs();
    return () => {
      mounted = false;
    };
  }, [locale]);

  if (questions.length === 0) return null;

  return (
    <div className="rounded-2xl border border-[#F1F1F1] bg-white px-4 py-2 shadow-sm">
      <h2 className="py-3 text-lg font-bold text-[#464646]">{title}</h2>
      <div className="max-h-[360px] overflow-y-auto">
        {questions.map((question, index) => (
          <FAQItem
            key={question.id ?? index}
            question={question}
            isOpen={openIndex === index}
            onToggle={() => setOpenIndex(openIndex === index ? null : index)}
          />
        ))}
      </div>
    </div>
  );
};

export default RegisterFAQ;
