import { ReactNode } from "react";
import NavBar from "../shared/navigations/NavBar";
import Footer from "../shared/navigations/footer";

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <div>
      <NavBar />
      <main className="mt-[5.5rem]">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
