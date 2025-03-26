"use client";
import { useHydrateUser } from "@/helper/user";
import { useAppDispatch, useAppSelector } from "../../../../../redux/store";
import { useEffect, useState } from "react";
import { getUserOrders } from "../../../../../redux/slices/ordersSlice";
import LoadingPage from "../../loaders/Loader";
import Image from "next/image";
import { format } from "date-fns";
import { Button } from "../../shared/buttons/Button";
import { useRouter } from "next/navigation";

const OrdersPageComp = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [orders, setOrders] = useState<any>([]);
  const { isHydrated, userData } = useHydrateUser() as {
    isHydrated: true;
    userData: any;
  };
  const { data } = useAppSelector((state) => state.orders);

  useEffect(() => {
    if (isHydrated) {
      dispatch(getUserOrders(userData?.user?._id));
    }
  }, [isHydrated]);

  useEffect(() => {
    if (data?.data) {
      const updatedOrders = data?.data.flatMap((order: any) =>
        order?.item.map((item: any) => ({
          ...item,
          orderDate: order?.createdAt,
        }))
      );
      setOrders(updatedOrders);
    }
  }, [data]);

  if (!isHydrated) return <LoadingPage />;

  return (
    <div className="p-5 md:px-10 flex flex-col w-full gap-5">
      <h2 className="text-[2rem] font-semibold text-center mb-5 text-[#222222]">
        All Orders
      </h2>
      {orders.length > 0 ? (
        orders?.map((item: any, index: number) => (
          <div
            className="border-b pb-5 md:px-5 max-w-5xl w-full mx-auto"
            key={index}
          >
            <div className="flex justify-between items-start flex-col sm:flex-row gap-5 w-full">
              <div className="flex gap-5 flex-col sm:flex-row items-start">
                <div className="relative h-[100px] w-[100px] rounded-md overflow-hidden">
                  <Image
                    src={item?.productId?.images[0]}
                    alt={item?.productId?.productName}
                    fill
                  />
                </div>
                <div>
                  <p className="font-medium">{item?.productId?.productName}</p>
                  <p>£ {Number(item?.productId?.price)?.toLocaleString()}</p>
                  <p>Oredered Qty: {item?.quantity}</p>
                  <p>
                    Order Date:{" "}
                    {item?.orderDate &&
                      format(new Date(item?.orderDate), "dd/MM/yyyy")}
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                className="w-48 rounded-full mt-2"
                onClick={() => router.push(`/products/${item?.productId?._id}`)}
              >
                View Product Details
              </Button>
            </div>
          </div>
        ))
      ) : (
        <div>No orders yet</div>
      )}
    </div>
  );
};

export default OrdersPageComp;
