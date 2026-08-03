"use client";
import subscriberService from "@/app/services/subscriber";
import { useUserState } from "@/app/stores/user";
import { useEffect, useState } from "react";
import LoggedInCard from "./LoggedInCard";
import NotLoggedInCard from "./NotLoggedInCard";

const getPackagePriority = (pkg) => {
  const packageType = String(pkg?.intenational_package || "").toUpperCase();
  if (packageType === "INLAND") return 0;
  if (packageType === "ROAMING") return 1;
  return 2;
};

const SimStatusCard = () => {
  const { isLoggedIn, cartId } = useUserState();
  const [mainPackages, setMainPackages] = useState([]);
  const [subPackages, setSubPackages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch current package when logged in
  useEffect(() => {
    const fetchCurrentPackage = async () => {
      if (!isLoggedIn || !cartId) {
        setIsLoading(false);
        return;
      }
      setIsLoading(true);
      if (!cartId.startsWith("070")) {
        setIsLoading(false);
        return;
      }
      try {
        const response = await subscriberService.getCurrentPackage(cartId);
        if (response.success && response.data) {
          const filteredMain = response.data
            .filter((pkg) => pkg.is_main == 1)
            .sort((a, b) => getPackagePriority(a) - getPackagePriority(b));
          const filteredSub = response.data.filter((pkg) => pkg.is_main == 0);
          setMainPackages(filteredMain);
          setSubPackages(filteredSub);
        }
      } catch (error) {
        console.error("Error fetching current package:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCurrentPackage();
  }, [isLoggedIn, cartId]);

  if (isLoggedIn && cartId.startsWith("070")) {
    return (
      <LoggedInCard
        mainPackages={mainPackages}
        subPackages={subPackages}
        isLoading={isLoading}
      />
    );
  }
  return <NotLoggedInCard />;
};

export default SimStatusCard;
