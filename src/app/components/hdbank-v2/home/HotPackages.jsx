import { Button } from "@/app/components/ui/Button";
import { usePackageHDBank } from "@/app/hooks/usePackageHDBank";
import homeService from "@/app/services/homeService";
import { useUserActions, useUserState } from "@/app/stores/user";
import { toCurrency } from "@/app/utils/format";
import { Link } from "@/i18n/navigation";
import clsx from "clsx";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

import PackageCard from "../PackageCard";

const HotPackages = () => {
  const t = useTranslations("hdbank.home.hotPackages");
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const { openCheckPackageModal } = usePackageHDBank();

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await homeService.getPackageHome();
        if (res && res.data) {
          setPackages(res.data);
        }
      } catch (error) {
        console.error("Error fetching packages", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPackages();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1.1,
    variableWidth: true,
    slidesToScroll: 1,
    arrows: false,
    className: "slider variable-width",
  };

  if (loading) {
    return (
      <div className="w-full flex justify-center py-10">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#ED1B2F]"></div>
      </div>
    );
  }

  return (
    <div className="w-full mb-12" id="hot-packages">
      <div className="flex justify-between items-center mb-4 px-1">
        <h3 className="text-[#0E0E0F] text-[18px] font-bold leading-[24px]">
          {t("title")}
        </h3>
        <Link
          href="/hdbank-app-v2/package"
          className="text-[#DA2128] text-[14px] font-bold leading-[20px]"
        >
          {t("explore")}
        </Link>
      </div>

      <Slider {...settings} className="packSliderPackage">
        {packages.map((pkg, index) => (
          <PackageCard
            key={pkg.id || index}
            pack={pkg}
            className="mr-2 h-full min-w-[320px] border border-[#F1F1F1] shadow-[0px_2px_4px_0px_#00000005]"
          />
        ))}
      </Slider>
    </div>
  );
};

export default HotPackages;
