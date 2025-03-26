"use client";
import Layout from "./components/layout/UserLayout";
import { TypeAnimation } from "react-type-animation";
import { useEffect, useState } from "react";
import Image from "next/image";
import LoadingPage from "./components/loaders/Loader";
import ProductCard from "./components/shared/productCard/ProductCard";
import { useHydrateCartStore } from "@/helper/cartStore";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { getAllProducts } from "../../redux/slices/productsSlice";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [products, setProducts] = useState([]);
  const { updateCartItem, isHydrated } = useHydrateCartStore();
  const { data } = useAppSelector((state) => state.products);

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  useEffect(() => {
    if (data?.data && data?.data?.length > 0) {
      const allData = data?.data.map((product: any) => ({
        ...product,
        quantity: 1,
      }));
      setProducts(allData);
    }
  }, [data]);
  console.log(data);

  if (!isHydrated) return <LoadingPage />;

  return (
    <Layout>
      <section
        id="home"
        className="w-full h-fit relative group overflow-hidden"
      >
        <div className="w-full elative rounded-2xl overflow-hidden h-[40vh]">
          <Image
            src="/images/heroImg.jpg"
            alt="bg-mg"
            layout="fill"
            objectFit="cover"
          />
          <div className="bg-black bg-opacity-40 absolute top-0 left-0 h-full w-full" />
        </div>

        <div className="absolute inset-0 flex justify-center items-center p-10">
          <div className="text-white text-center">
            <h1 className="text-2xl font-bold">
              <TypeAnimation
                sequence={[
                  "Welcome to Kanma computer store",
                  1000,
                  "All the gadgets you need",
                  1000,
                ]}
                wrapper="span"
                speed={50}
                style={{ fontSize: "1.5em", display: "inline-block" }}
                repeat={Infinity}
              />
            </h1>
            <p className="mt-2">
              A wide array of computers and accessories at affordable prices
            </p>
            <button
              onClick={() => router.push("/products")}
              className="py-2 px-6 rounded-lg bg-white text-black mt-5 hover:text-white hover:bg-gray-300 "
            >
              Shop Now
            </button>
          </div>
        </div>
      </section>

      <section
        id="rooms"
        className="flex flex-col items-start max-w-7xl mx-auto p-5 pt-16"
      >
        <div className="w-full">
          <h2 className="text-[2rem] font-semibold text-center mb-4 text-[#222222]">
            Featured Products
          </h2>
        </div>

        <div className="w-full flex justify-center items-center h-full flex-wrap gap-10 pt-4 mx-auto">
          {products && products.length > 0 ? products.map((item: any) => {
            return (
              <div key={item?._id}>
                <ProductCard
                  data={item}
                  onClick={() =>
                    item?.stockQty > 0 && updateCartItem(item, "add")
                  }
                />
              </div>
            );
          }) : (
            <div className="w-full h-full flex justify-center items-center">
              <p>No products available yet</p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
