import React from "react";
import { Button } from "../buttons/Button";
import { usePathname, useRouter } from "next/navigation";

const VendorMenuModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: (state: boolean) => void;
}) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleClose = () => {
    onClose && onClose(false);
  };

  return (
    <div>
      {isOpen && (
        <div
          onClick={handleClose}
          className="fixed bottom-0 left-0 w-full z-[100] h-[100vh] bg-transparent bg-opacity-20"
        />
      )}
      <div
        className={` fixed bottom-0 left-0 h-[100vh] z-[100] border-r-2 border-black transition-all duration-500 max-w-[20rem] w-full bg-white pt-[85px] ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col justify-center items-center gap-3 pt-[130px] px-10">
          <Button
            className={`w-full rounded-full`}
            variant={pathname.includes("products") ? "default" : "outline"}
            onClick={() => router.push("/vendor/products")}
          >
            Products
          </Button>
          <Button
            className={`w-full rounded-full`}
            variant={pathname.includes("orders") ? "default" : "outline"}
            onClick={() => router.push("/vendor/orders")}
          >
            Orders
          </Button>
          <Button
            className={`w-full rounded-full`}
            variant={pathname.includes("categories") ? "default" : "outline"}
            onClick={() => router.push("/vendor/categories")}
          >
            Categories
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VendorMenuModal;
