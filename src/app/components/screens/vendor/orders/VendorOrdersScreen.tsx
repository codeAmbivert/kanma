import React from "react";
import VendorOrdersTable from "./VendorOrdersTable";

const VendorOrdersScreen = () => {
  return (
    <div className="px-5 md:px-10 pb-10">
      <div className="max-w-[1400px] w-full mx-auto text-black">
        <VendorOrdersTable/>
      </div>
    </div>
  );
};

export default VendorOrdersScreen;
