'use client';

import { useState } from "react";

const FAQCategory = ({ questions, isShowDefault = false }) => {
  const [isShow, setIsShow] = useState(isShowDefault);
  return (
    <div className=" bg-neutral-100 p-4  rounded-[16px] mb-4">
      <button
        onClick={() => setIsShow(!isShow)}
        className="w-full flex justify-between items-center "
      >
        <h2 className=" font-semibold text-[#333333]">{questions.display_title}</h2>
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10.2204 13.23L14.0476 9.08593C14.2864 8.82734 14.1417 8.33301 13.8271 8.33301H6.17272C5.85819 8.33301 5.71343 8.82734 5.95224 9.08593L9.77944 13.23C9.90631 13.3674 10.0935 13.3674 10.2204 13.23Z" fill="#181818" />
        </svg>

      </button>
      {isShow && (
        <div className="mt-4 text-sm text-[#666666] leading-6 whitespace-pre-line border-t pt-4">
          {questions.display_content}
        </div>
      )}
    </div>
  );
};
export default FAQCategory;