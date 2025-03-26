"use client";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect} from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useAppDispatch, useAppSelector } from "../../../../../../redux/store";
import { useHydrateUser } from "@/helper/user";
import { useHydrateCartStore } from "@/helper/cartStore";
import { getSingleOrder } from "../../../../../../redux/slices/productsSlice";
import LoadingPage from "@/app/components/loaders/Loader";

interface UserData {
  user: {
    role: string;
  };
}

const SingleOrdersScreen = () => {
  const router = useRouter();
  // const pathame = usePathname();
  const { id } = useParams();
  const dispatch = useAppDispatch();
  // const { userData } = useHydrateUser() as {
  //   userData: UserData;
  //   isHydrated: boolean;
  // };
  const { isHydrated } = useHydrateCartStore();
  const { data } = useAppSelector((state) => state.products);

  useEffect(() => {
    if (typeof window !== "undefined") {
      dispatch(getSingleOrder(id as string));
    }
  }, []);

  console.log(data?.data);

  if (!isHydrated) return <LoadingPage />;
  return (
    <div className="pt-5 px-5 md:px-10">
      <div className="max-w-[1400px] w-full mx-auto text-black">
        <div
          className="flex gap-3 items-center cursor-pointer w-fit"
          onClick={() => router.back()}
        >
          <FaArrowLeftLong size={20} />
          <p>Back</p>
        </div>

        <div className="p-5 w-full border-2 border-black rounded-3xl flex flex-col gap-5 mt-4">
          <p className="">
            <span className="font-medium">Buyer Email:</span>{" "}
            {data?.data?.email}
          </p>
          <p className="">
            <span className="font-medium">Total Price:</span> £{" "}
            {Number(data?.data?.total_price)?.toLocaleString()}
          </p>
          <p className="capitalize">
            <span className="font-medium">Payment Method:</span>{" "}
            {data?.data?.paymentMethod}
          </p>
          <p>
            <span className="font-medium capitalize">Shipping Address:</span>{" "}
            {data?.data?.shippingAddress}
          </p>

          {/* <p className="text-lg font-semibold">Items</p> */}
          {data?.data?.item &&
            data?.data?.item?.map((item: any, i: number) => (
              <div key={i} className="relative h-[100px] w-full mt-5">
                <p className="text-lg font-semibold mb-3">Item {i + 1}</p>
                <p className="mb-3">Product Id: {item?.productId}</p>
                <p className="mb-3">Quantity: {item?.quantity}</p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default SingleOrdersScreen;
