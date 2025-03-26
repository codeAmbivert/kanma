"use client";
import { useHydrateCartStore } from "@/helper/cartStore";
import { useRouter } from "next/navigation";
import LoadingPage from "../../loaders/Loader";
import { FaArrowLeftLong, FaRegCircleCheck } from "react-icons/fa6";
import InputField from "../../shared/input-fields/InputFields";
import { PiMapPin } from "react-icons/pi";
import { FaRegCreditCard } from "react-icons/fa";
import { BsCash } from "react-icons/bs";
import { useState } from "react";
import Image from "next/image";
import { Button } from "../../shared/buttons/Button";
import { useAppDispatch } from "../../../../../redux/store";
import { createOrder } from "../../../../../redux/slices/productsSlice";
import { toast } from "react-toastify";
import { useHydrateUser } from "@/helper/user";

interface UserData {
  user: {
    _id: string;
    email: string;
  };
}

const CheckoutScreen = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const { isHydrated, cartItems, clearCart } =
    useHydrateCartStore();
  const { userData } = useHydrateUser() as {
    userData: UserData;
    isHydrated: boolean;
  };
  const [payby, setPayby] = useState("card");
  const [delivery_address, setDeliveryAddress] = useState("");
  const [deliveryFee, setDeliveryFee] = useState(0);
  const total = cartItems
    ?.reduce((acc, item) => acc + item.price * item.quantity, 0)
    ?.toFixed(2);

  const handleSubmit = () => {
    if (!userData.user) {
      toast.error("Please login to continue");
      router.push("/sign-in");
      return;
    }
    if (!delivery_address) {
      toast.error("Please enter your delivery address");
      return;
    }

    setLoading(true);
    const payload = {
      userId: userData?.user?._id,
      email: userData?.user?.email,
      paymentMethod: payby,
      shippingAddress: delivery_address,
      item: cartItems.map((item) => ({
        vendorId: item.seller,
        productId: item?._id,
        quantity: item?.quantity,
        unitPrice: item?.price,
      })),
    };
    console.log({ payload });

    dispatch(createOrder(payload))
      .unwrap()
      .then((res) => {
        // toast.success("Order placed successfully");
        clearCart();
        setDeliveryAddress("");
        setSuccess(true);
      })
      .catch((err) => toast.error(err?.message))
      .finally(() => setLoading(false));
  };

  if (!isHydrated) return <LoadingPage />;
  if (success)
    return (
      <div className=" flex flex-col justify-center items-center gap-10 py-10">
        <FaRegCircleCheck size={100} className="text-green-500" />
        <h1 className="font-semibold text-2xl">Order placed successfully</h1>
        <Button onClick={() => router.push("/")} className="w-1/2">
          Continue Shopping
        </Button>
      </div>
    );

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

        <p className="text-2xl font-semibold my-6">Checkout</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="flex w-full flex-col gap-5">
            <div className="w-full">
              <InputField
                label="Delivery Address"
                name="delivery_address"
                value={delivery_address}
                onChange={(e) => {
                  const value = (e.target as HTMLInputElement).value;
                  setDeliveryAddress(value);
                }}
                startIcon={<PiMapPin size={20} />}
              />
            </div>

            <div>
              <p className="font-semibold mb-1">Payment method</p>
              <div className="flex gap-5 text-sm">
                <div
                  className={`max-w-xs w-full border p-3 rounded-lg cursor-pointer mb-1 ${
                    payby === "card" && "border-black"
                  }`}
                  onClick={() => setPayby("card")}
                >
                  <FaRegCreditCard size={20} />
                  Pay by Debit/Credit Card
                </div>
                <div
                  className={`max-w-xs w-full border p-3 rounded-lg cursor-pointer mb-1 ${
                    payby === "cash" && "border-black"
                  }`}
                  onClick={() => setPayby("cash_on_delivery")}
                >
                  <BsCash size={20} />
                  Cash on Delivery
                </div>
              </div>
            </div>
          </div>

          <div>
            {cartItems?.length > 0 && (
              <div>
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
                          <p className="font-medium">
                            £ {Number(item?.price)?.toLocaleString()}
                          </p>
                          <p>Qty: {item?.quantity}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="w-full border rounded-md h-fit mt-5">
                  <p className="p-2 font-medium">ORDER SUMMARY</p>
                  <div className="p-3 flex items-center justify-between border-y">
                    <p>Subtotal</p>
                    <p>£ {Number(total)?.toLocaleString()}</p>
                  </div>
                  <div className="p-3 flex items-center justify-between border-y">
                    <p>Delivery Fee</p>
                    <p>£ {Number(deliveryFee)?.toLocaleString()}</p>
                  </div>
                  <div className="p-3 flex items-center justify-between border-y">
                    <p>Total</p>
                    <p>
                      £{" "}
                      {Number(
                        Number(deliveryFee) + Number(total)
                      )?.toLocaleString()}
                    </p>
                  </div>
                  <div className="p-2 flex flex-col gap-3">
                    <Button
                      loading={loading}
                      className="w-full"
                      onClick={handleSubmit}
                    >
                      {payby === "card" ? "Pay" : "Confirm order"}
                    </Button>
                    <Button
                      className="w-full border-red-600 bg-transparent text-red-600 hover:bg-red-600 hover:text-white"
                      onClick={() => {
                        clearCart();
                        window.location.replace("/");
                      }}
                    >
                      Cancel Order
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutScreen;
