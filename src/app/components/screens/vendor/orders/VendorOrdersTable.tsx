"use client";
import ReusableTable from "@/app/components/shared/ReusableTable";
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

const VendorOrdersTable = () => {
  const { userData } = useHydrateUser() as {
    userData: UserData;
    isHydrated: boolean;
  };
  const tableHeaders = [
    { id: "buyerEmail", label: "Buyer Email" },
    { id: "orderId", label: "Order Id" },
    { id: "totalPrice", label: "Total Price" },
    { id: "paymentMethod", label: "Payement Method" },
    { id: "shippingAddress", label: "Shipping Address" },
    // { id: "quantity", label: "Quantity Requested" },
  ];

  const dataTransformer = (data: any) => {
    console.log("apidata", data);
    return data?.map((item: any) => ({
      id: item?._id,
      buyerEmail: <div className="whitespace-nowrap max-sm:max-w-[110px] max-sm:overflow-hidden max-sm:text-ellipsis">{item?.email}</div>,
      orderId: (
        <div className="whitespace-nowrap max-w-[100px] overflow-hidden text-ellipsis">
          {item?.orderId}
        </div>
      ),
      totalPrice: (
        <div className="whitespace-nowrap">
          £ {Number(item?.total_price)?.toLocaleString()}
        </div>
      ),
      paymentMethod: <div className="capitalize">{item?.paymentMethod}</div>,
      shippingAddress: (
        <div className="whitespace-nowrap max-w-[100px] overflow-hidden text-ellipsis">
          {item?.shippingAddress}
        </div>
      ),
    }));
  };

  const apiEndpoint = `${
    userData?.user?._id
      ? `${API_URL}/prd-ord/orders/vendor/${userData?.user?._id}`
      : ""
  }`;

  return (
    <div>
      <ReusableTable
        headers={tableHeaders}
        apiEndpoint={apiEndpoint}
        tableName="Products"
        dataTransformer={dataTransformer}
        onRowClick="/vendor/orders"
      />
    </div>
  );
};

export default VendorOrdersTable;
