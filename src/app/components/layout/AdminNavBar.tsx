"use client";

// import Logo from "../../../../../public/images/Logo.png";
import Logo from "../../../../public/images/Logo.png";
import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";
import NavLink from "../shared/navigations/NavLink";

// const navItems = [
//   // { text: "Home", route: "/" },
//   { text: " Home", route: "/" },
//   { text: "FAQs", route: "/faq" },
// ];

// Create a component to render the navigation items
// const Navigation = () => (
//   <nav className="flex justify-center gap-16">
//     {navItems.map(({ text, route }, index) => (
//       <div key={index}>
//         <div>
//           <NavLink href={route}>{text}</NavLink>
//         </div>
//       </div>
//     ))}
//   </nav>
// );

const AdminNavBar = () => {
  // const router = useRouter();
  // const [navOpen, setNavOpen] = useState(false);
  // const [userData, setUserData] = useState(false);
  // const [openUserDropDown, setOpenUserDropDown] = useState(false);

  // useEffect(() => {
  //   const userDataString = localStorage.getItem("userData");
  //   const userData = userDataString ? JSON.parse(userDataString) : null;
  //   userData && setUserData(true);
  // }, []);

  // const handleSignOut = () => {
  //   setUserData(false);
  //   localStorage.removeItem("userData");
  // };

  return (
    <div className="gap-2 w-full bg-white flex justify-between items-center py-4 px-5 md:px-12 ">
      <NavLink href="/admin/rooms">
        <Image src={Logo} alt="logo" className="h-14 w-auto" />
      </NavLink>
    </div>
  );
};

export default AdminNavBar;
