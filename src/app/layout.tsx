import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "../../src/app/globals.css";
import "react-toastify/dist/ReactToastify.css";
import ReduxProvider from "../../redux/ReduxProvider";
import { ToastContainer } from "react-toastify";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kanma",
  description: "Online computer store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={montserrat.className}>
        <ToastContainer />
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}
