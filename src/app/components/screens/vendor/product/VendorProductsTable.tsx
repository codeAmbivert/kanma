import React from "react";
import ReusableTable from "../../../shared/ReusableTable";
import { API_URL } from "@/helper/constants";
import { useHydrateUser } from "@/helper/user";

interface UserData {
  user: {
    _id: string;
    // firstName: string;
    // lastName: string;
    // email: string;
    // status: string,
    // role: string,
  };
  // token: string
}

const VendorProductsTable = () => {
  const { userData } = useHydrateUser() as {
    userData: UserData;
    isHydrated: boolean;
  };

  const tableHeaders = [
    { id: "productName", label: "Product Name" },
    { id: "productId", label: "Product ID" },
    { id: "price", label: "Price" },
    { id: "stockQty", label: "Stock Quantity" },
  ];

  const dataTransformer = (data: any) => {
    return data?.map((item: any) => ({
      id: item?._id,
      productName: <div className="">{item?.productName}</div>,
      productId: <div className="">{item?.productId}</div>,
      price: (
        <div className="whitespace-nowrap">
          £ {Number(item?.price)?.toLocaleString()}
        </div>
      ),
      stockQty: (
        <div className="">{Number(item?.stockQty)?.toLocaleString()}</div>
      ),
    }));
  };

  const apiEndpoint = `${
    userData?.user?._id
      ? `${API_URL}/prd-ord/products/${userData?.user?._id}`
      : ""
  }`;

  return (
    <div>
      <ReusableTable
        headers={tableHeaders}
        apiEndpoint={apiEndpoint}
        tableName="Products"
        dataTransformer={dataTransformer}
        onRowClick="/products"
      />
    </div>
  );
};

export default VendorProductsTable;
