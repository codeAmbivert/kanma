"use client";
import { Button } from "../../../shared/buttons/Button";
import { useRouter } from "next/navigation";
import VendorProductsTable from "./VendorProductsTable";

const VendorProductsScreen = () => {
  const router = useRouter();
  return (
    <div className="pt-20 px-5 md:px-10 pb-10">
      <div className="max-w-[1400px] w-full mx-auto text-black">
        <div className="flex justify-end mt-3">
          <Button
            onClick={() => router.push("/vendor/create-product")}
            className="w-[130px]"
          >
            Create product
          </Button>
        </div>
        <div>
          <VendorProductsTable />
        </div>
      </div>
    </div>
  );
};

export default VendorProductsScreen;
