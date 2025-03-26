"use client";
import { useParams, usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useAppDispatch, useAppSelector } from "../../../../../redux/store";
import { getSingleProduct } from "../../../../../redux/slices/productsSlice";
import { useHydrateUser } from "@/helper/user";
import LoadingPage from "../../loaders/Loader";
import Image from "next/image";
import { FaMinus, FaPlus } from "react-icons/fa";
import { Button } from "../../shared/buttons/Button";
import { useHydrateCartStore } from "@/helper/cartStore";

interface UserData {
  user: {
    role: string;
  };
}

const SingleProductScreen = () => {
  const router = useRouter();
  const pathame = usePathname();
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { userData } = useHydrateUser() as {
    userData: UserData;
    isHydrated: boolean;
  };
  const { isHydrated, updateCartItem } = useHydrateCartStore();
  const [mainImgLink, setMainImgLink] = useState("");
  const [product, setProduct] = useState<any>({});
  const { data } = useAppSelector((state) => state.products);

  useEffect(() => {
    if (typeof window !== "undefined") {
      dispatch(getSingleProduct(id as string));
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (data?.data?.images) {
        setProduct({ ...data?.data, quantity: 1 });
        setMainImgLink(data?.data?.images[0]);
      }
    }
  }, [data?.data]);

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

        <div className="grid grid-cols-1 md:grid-cols-2 pt-10 gap-20">
          <div className="p-5 w-full">
            <div className="relative h-[300px] w-full">
              <Image
                src={mainImgLink}
                alt="product"
                fill
                className="h-full w-full object-contain rounded-3xl"
              />
            </div>
            <div className="flex items-center justify-center gap-5 pt-5">
              {data?.data?.images &&
                data?.data?.images?.map((img: string) => (
                  <div className="rounded-xl cursor-pointer relative overflow-hidden h-[50px] w-[50px] sm:h-[100px] sm:w-[100px]">
                    <Image
                      src={img}
                      alt="img"
                      fill
                      onClick={() => setMainImgLink(img)}
                    />
                  </div>
                ))}
            </div>
          </div>
          <div className="p-5 w-full border-2 border-black rounded-3xl flex flex-col gap-5">
            <h2 className="text-xl font-medium">{product?.productName}</h2>
            <p className="">
              <span className="font-medium">Price:</span> £{" "}
              {Number(product?.price)?.toLocaleString()}
            </p>
            <p className="">
              <span className="font-medium">In Stock:</span> {product?.stockQty}
            </p>
            <p>
              <span className="font-medium">Description:</span>{" "}
              {product?.description}
            </p>

            {userData?.user?.role !== "seller" && (
              <div className="">
                <p className="font-medium mb-1">Quantity:</p>
                <div className="flex items-center mt-3 mb-10">
                  <Button
                    className="h-8 w-8 rounded-full"
                    onClick={() =>
                      product?.quantity > 1 &&
                      setProduct((prev: any) => ({
                        ...prev,
                        quantity: prev.quantity - 1,
                      }))
                    }
                  >
                    <FaMinus size={10} />
                  </Button>
                  <p className="w-11 text-center">{product?.quantity}</p>
                  <Button
                    className="h-8 w-8 rounded-full"
                    onClick={() =>
                      product?.stockQty > 0 &&
                      product?.quantity < product?.stockQty &&
                      setProduct((prev: any) => ({
                        ...prev,
                        quantity: prev.quantity + 1,
                      }))
                    }
                  >
                    <FaPlus size={10} />
                  </Button>
                </div>
                <Button
                  className="w-full"
                  onClick={() => updateCartItem(product, "add")}
                >
                  Add to cart
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProductScreen;
