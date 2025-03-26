import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export const useHydrateUser = () => {
  const pathname = usePathname();
  const [isHydrated, setIsHydrated] = useState(false);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    if (typeof window !== "undefined") {
      const userDataString = localStorage.getItem("kanma-user");
      const userData = userDataString ? JSON.parse(userDataString) : {};
      setUserData(userData);
      setIsHydrated(true);
    }
  }, [pathname]);

  return { isHydrated, userData };
};
