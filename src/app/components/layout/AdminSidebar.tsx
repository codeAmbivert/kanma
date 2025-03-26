"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiUsers } from "react-icons/fi";
import { LuLayoutGrid } from "react-icons/lu";
import { useRouter } from "next/navigation";
import { IoMdCheckboxOutline } from "react-icons/io";
import { PiSignOutBold } from "react-icons/pi";

const AdminSideBar = () => {
  const pathname = usePathname();
  const router = useRouter();
  return (
    <aside className="h-full w-full border-r-2 border-t-2 border-jsPrimary100 p-5">
      <div className="flex flex-col gap-20 my-5 items-center text-nafcGrayText h-full ">
        <nav className="flex flex-col gap-6 text-lg w-full h-full">
          <Link
            href="/admin/rooms"
            className={`flex items-center text-sm gap-4 p-2 rounded-md transition-colors duration-200 ${
              pathname.includes("/admin/rooms")
                ? "bg-yellow-50 text-jsPrimary100 font-semibold border border-yellow-500"
                : "hover:bg-yellow-50"
            }`}
          >
            <LuLayoutGrid size={25} />
            <p>Rooms</p>
          </Link>
          <Link
            href="/admin/users"
            className={`flex items-center text-sm gap-4 p-2 rounded-md transition-colors duration-200 ${
              pathname.includes("/admin/users")
                ? "bg-yellow-50 text-jsPrimary100 font-semibold border border-yellow-500"
                : "hover:bg-yellow-50"
            }`}
          >
            <FiUsers size={25} />
            <p>Users</p>
          </Link>
          <Link
            href="/admin/bookings"
            className={`flex items-center text-sm gap-4 p-2 rounded-md transition-colors duration-200 ${
              pathname.includes("/admin/bookings")
                ? "bg-yellow-50 text-jsPrimary100 font-semibold border border-yellow-500"
                : "hover:bg-yellow-50"
            }`}
          >
            <IoMdCheckboxOutline size={25} />
            <p>Bookings</p>
          </Link>

          <div
            className=" flex items-center text-sm gap-4 cursor-pointer p-3 bg-blue rounded-lg mt-auto mb-5"
            onClick={() => {
              localStorage.removeItem("nafc-admin");
              router.push("/admin");
            }}
          >
            <PiSignOutBold size={25} />
            Logout
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default AdminSideBar;
