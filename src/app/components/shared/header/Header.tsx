import Image from "next/image";
import logo from "/public/images/Logo.png";
import Link from "next/link";
const Header = () => {
  return (
    <main className="">
      <header className="bg-white fixed top-0 left-0 z-[100] w-full">
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:block">
            <Link href="/" className="text-black">
              <Image src={logo} alt="logo" className="h-16 w-auto" />
            </Link>
          </div>
          <div className="lg:hidden flex">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>
          <div className="hidden lg:flex gap-x-12">
            <button
              type="button"
              className="flex items-center gap-x-1  font-semibold leading-6 text-gray-900 py-2 px-4 rounded-full hover:text-white hover:bg-[#C8A008]"
              aria-expanded="false"
            >
              Product
              <svg
                className="h-5 w-5 flex-none text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>

            <Link
              href="#"
              className=" font-semibold leading-6 text-gray-900 py-2 px-4 rounded-full hover:text-white hover:bg-[#C8A008]"
            >
              Features
            </Link>
            <Link
              href="#"
              className=" font-semibold leading-6 text-gray-900 py-2 px-4 rounded-full hover:text-white hover:bg-[#C8A008]"
            >
              Marketplace
            </Link>
            <Link
              href="#"
              className=" font-semibold leading-6 text-gray-900 py-2 px-4 rounded-full hover:text-white hover:bg-[#C8A008]"
            >
              Company
            </Link>
          </div>
          <div className="hidden lg:block text-gray-900 py-2 px-4 rounded-full hover:text-white hover:bg-[#C8A008]">
            <Link href="#" className=" font-semibold leading-6">
              Log in <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </nav>
      </header>
    </main>
  );
};

export default Header;
