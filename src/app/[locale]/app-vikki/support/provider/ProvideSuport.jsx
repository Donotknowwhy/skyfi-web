import { useLocale } from "next-intl";
import { createContext, useContext, useEffect, useState } from "react";
import { FAQ_DATA } from "./faqData";

const SupportContext = createContext();

export const useSupport = () => {
    return useContext(SupportContext);
}

const getFAQDataForLocale = (locale) => FAQ_DATA[locale] || FAQ_DATA.vi;

export const ProvideSupport = ({ children }) => {
    const locale = useLocale();
    const [FAQData, setFAQData] = useState(() => getFAQDataForLocale(locale));
    const [FQADataDisplay, setFQADataDisplay] = useState(() => getFAQDataForLocale(locale));
    const [isShowAll, setIsShowAll] = useState(false);

    useEffect(() => {
        const data = getFAQDataForLocale(locale);
        setFAQData(data);
        setFQADataDisplay(data);
    }, [locale]);

    useEffect(() => {
        if (!isShowAll) {
            setFQADataDisplay(FAQData.slice(0, 3));
        }
    }, [isShowAll]);

    const searchInFAQ = (keyword) => {
        if (!keyword) {
            setFQADataDisplay(FAQData);
            return;
        }

        const lowerKeyword = keyword.toLowerCase();
        const filteredData = FAQData.filter(category =>
            category.display_title.toLowerCase().includes(lowerKeyword) ||
            category.display_content.toLowerCase().includes(lowerKeyword)
        );

        setFQADataDisplay(filteredData);
    }




    return (
        <SupportContext.Provider value={{ FQADataDisplay, isShowAll, setIsShowAll, searchInFAQ }}>
            {children}
        </SupportContext.Provider>
    );
}