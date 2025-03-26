"use client";
import NavLink from "./NavLink";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { PiShoppingCartSimple, PiSignOutBold } from "react-icons/pi";
import { LuUser } from "react-icons/lu";
import { Logo } from "../../../../../public/icons/iconsExport";
import { useHydrateUser } from "@/helper/user";
import { Button } from "../buttons/Button";
import { HiMiniListBullet } from "react-icons/hi2";
import { CgClose } from "react-icons/cg";
import MenuModal from "./MobileMenu";
import { useHydrateCartStore } from "@/helper/cartStore";
import VendorMenuModal from "./VendorMenuModal";

const navItems = [
  // { text: "Home", route: "/"
  { text: "Products", route: "/products" },
  // { text: "Categories", route: "/categories" },
  // { text: "About", route: "about" },
];

// Create a component to render the navigation items
const Navigation = () => (
  <nav className="flex flex-col lg:flex-row items-center justify-center gap-16">
    {navItems.map(({ text, route }, index) => (
      <div key={index}>
        <div>
          <NavLink href={route}>{text}</NavLink>
        </div>
      </div>
    ))}
  </nav>
);

const NavBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [openUser, setOpenUser] = useState(false);
  const [openMobileMenu, setOpenMobileMenu] = useState(false);
  const [openVendorMenu, setOpenVendorMenu] = useState(false);
  const { isHydrated, userData } = useHydrateUser();
  const { totalQuantity, isHydrated: isCartHydrated } = useHydrateCartStore();

  const handleSignOut = () => {
    localStorage.removeItem("kanma-user");
    window.location.replace("/");
  };

  return (
    <>
      <div className="w-full gap-2 fixed top-0 left-0 bg-white z-[200] flex justify-between items-center py-4 px-5 md:px-12 border-b-2 border-jsPrimary100">
        <div className="flex items-center gap-5">
          {pathname.includes("vendor") && (
            <div className="cursor-pointer text-black">
              {openVendorMenu ? (
                <CgClose size={20} onClick={() => setOpenVendorMenu(false)} />
              ) : (
                <HiMiniListBullet
                  size={20}
                  onClick={() => setOpenVendorMenu(true)}
                />
              )}
            </div>
          )}
          <NavLink href="/">
            <Logo height={40} width={150} />
          </NavLink>
        </div>

        {!pathname.includes("vendor") && (
          <div className="lg:flex hidden items-center">
            <Navigation />
            {isHydrated && Object.keys(userData).length > 0 && (
              <NavLink href="/orders" className="ml-16">Orders</NavLink>
            )}
          </div>
        )}

        <div className="flex gap-5 items-center text-black">
          {!pathname.includes("vendor") && (
            <Link
              href="/cart"
              className="relative p-2 rounded-lg hover:bg-gray-50 cursor-pointer"
            >
              <PiShoppingCartSimple size={20} />
              {isCartHydrated && totalQuantity > 0 && (
                <div className="absolute top-0 right-0 rounded-full text-xs h-5 w-5 bg-red-600 border border-black text-white flex justify-center items-center">
                  {totalQuantity}
                </div>
              )}
            </Link>
          )}

          {isHydrated && Object.keys(userData).length > 0 ? (
            <div
              className="p-2 rounded-lg hover:bg-gray-50 cursor-pointer relative"
              onClick={() => setOpenUser(true)}
            >
              <LuUser size={20} />
              {openUser && (
                <div className="absolute top-full right-0 border-2 border-black rounded-md p-1 bg-white w-60">
                  <p
                    className="p-3 hover:bg-gray-200 font-medium flex gap-2"
                    onClick={handleSignOut}
                  >
                    Logout <PiSignOutBold size={20} />
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="hidden lg:flex gap-5 items-center">
              <Button
                variant="outline"
                className="w-[90px]"
                onClick={() => router.push("/sign-in")}
              >
                Sign in
              </Button>
              <Button
                className="w-[90px]"
                onClick={() => router.push("/sign-up")}
              >
                Sign up
              </Button>
            </div>
          )}

          <div className="lg:hidden">
            {openMobileMenu ? (
              <CgClose size={20} onClick={() => setOpenMobileMenu(false)} />
            ) : (
              <HiMiniListBullet
                size={20}
                onClick={() => setOpenMobileMenu(true)}
              />
            )}
          </div>
        </div>
      </div>
      <MenuModal isOpen={openMobileMenu} onClose={setOpenMobileMenu} />
      <VendorMenuModal isOpen={openVendorMenu} onClose={setOpenVendorMenu} />
    </>
  );
};

export default NavBar;
