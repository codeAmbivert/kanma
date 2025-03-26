"use client";
import { useHydrateCartStore } from "@/helper/cartStore";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../../redux/store";
import { getAllProducts } from "../../../../../redux/slices/productsSlice";
import LoadingPage from "../../loaders/Loader";
import ProductCard from "../../shared/productCard/ProductCard";

const ProductsScreen = () => {
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

  if (!isHydrated) return <LoadingPage />;
  return (
    <div>
      <div className="w-full">
        <h2 className="text-[2rem] font-semibold text-center mb-4 text-[#222222]">
          All Products
        </h2>
      </div>

      <div className="w-full flex justify-center items-center h-full flex-wrap gap-10 pt-4 mx-auto">
        {products && products.length > 0 ? (
          products.map((item: any) => {
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
          })
        ) : (
          <div className="text-center text-[#222222] text-lg font-semibold">
            No products available yet
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsScreen;
