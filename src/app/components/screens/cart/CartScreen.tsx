"use client";
import { FaArrowLeftLong, FaRegTrashCan } from "react-icons/fa6";
import { useHydrateCartStore } from "@/helper/cartStore";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "../../shared/buttons/Button";
import { FaMinus, FaPlus } from "react-icons/fa";
import LoadingPage from "../../loaders/Loader";
import { useState } from "react";

const   CartScreen = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { isHydrated, cartItems, updateCartItem } = useHydrateCartStore();
  const total = cartItems
    ?.reduce((acc, item) => acc + item.price * item.quantity, 0)
    ?.toFixed(2);

  if (!isHydrated) return <LoadingPage />;
  return (
    <div className="p-5 md:p-10">
      <div className="max-w-[1400px] w-full mx-auto text-black">
        <div
          className="flex gap-3 items-center cursor-pointer w-fit"
          onClick={() => router.back()}
        >
          <FaArrowLeftLong size={20} />
          <p>Back</p>
        </div>

        <p className="text-2xl font-semibold my-6">
          Cart {cartItems && `(${cartItems?.length})`}
        </p>

        <div className="flex gap-10 w-full">
          {isHydrated && cartItems?.length > 0 ? (
            <div className="w-full flex flex-col md:flex-row gap-10">
              <div className="w-full">
                {cartItems?.map((item, index) => (
                  <div className="border-t py-5 md:px-5 w-full" key={index}>
                    <div className="flex justify-between items-start gap-5">
                      <div className="flex gap-5 items-start">
                        <div className="relative h-[100px] w-[100px] rounded-md overflow-hidden">
                          <Image
                            src={item?.images[0]}
                            alt={item?.productName}
                            fill
                          />
                        </div>
                        <div>
                          <p className="font-medium">{item?.productName}</p>
                          <p>£ {Number(item?.price)?.toLocaleString()}</p>
                          <div className="flex items-center mt-3">
                            <Button
                              className="h-8 w-8 rounded-full"
                              onClick={() => updateCartItem(item, "decrease")}
                            >
                              <FaMinus size={10} />
                            </Button>
                            <p className="w-11 text-center">{item?.quantity}</p>
                            <Button
                              className="h-8 w-8 rounded-full"
                              onClick={() =>
                                Number(item?.quantity) <
                                  Number(item?.stockQty) &&
                                updateCartItem(item, "increase")
                              }
                            >
                              <FaPlus size={10} />
                            </Button>
                          </div>
                        </div>
                      </div>
                      <FaRegTrashCan
                        size={20}
                        className="text-red-600 cursor-pointer"
                        onClick={() => updateCartItem(item, "remove")}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <div className="max-w-[350px] w-full border rounded-md h-fit">
                <p className="p-2 font-medium">CART SUMMARY</p>
                <div className="p-3 flex items-center justify-between border-y">
                  <p>Subtotal</p>
                  <p>£ {Number(total)?.toLocaleString()}</p>
                </div>
                <div className="p-2">
                  <Button
                    className="w-full"
                    loading={loading}
                    onClick={() => {
                      setLoading(true);
                      router.push("/checkout");
                    }}
                  >
                    Checkout (£ {Number(total)?.toLocaleString()})
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <p>Your cart is empty</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartScreen;
