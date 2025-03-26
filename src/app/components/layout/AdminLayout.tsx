import { FC } from "react";

import AdminSideBar from "./AdminSidebar";
import AdminNavBar from "./AdminNavBar";

interface Props {
  children: React.ReactNode;
}

const AdminLayout: FC<Props> = ({ children }: Props) => {
  return (
    <main>
      <div className="fixed h-[11vh] w-full top-0 left-0 z-50">
        <AdminNavBar />
      </div>
      <div className="fixed h-[89vh] bg-nafcLightGreyBg  w-1/6 left-0 bottom-0 ">
        <AdminSideBar />
      </div>
      <div className="fixed h-[89vh] w-5/6 bottom-0 right-0 overflow-auto border-t-2 border-jsPrimary100">
        {children}
      </div>
    </main>
  );
};

export default AdminLayout;
