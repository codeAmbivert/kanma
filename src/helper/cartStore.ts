import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { create } from "zustand";

interface CartItemProp {
  _id: string;
  productName: string;
  price: number;
  images: string[];
  stockQty: string;
  quantity: number;
  seller: string;
}

interface CartStore {
  cartItems: CartItemProp[];
  totalQuantity: number;
  updateCartItem: (
    item: CartItemProp,
    action: "add" | "remove" | "increase" | "decrease"
  ) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartStore>((set) => ({
  cartItems: [],
  totalQuantity: 0,

  updateCartItem: (item, action) =>
    set((state) => {
      let updatedCartItems = [...state.cartItems];

      const existingItemIndex = updatedCartItems.findIndex(
        (cartItem) => cartItem._id === item._id
      );

      if (existingItemIndex !== -1) {
        const existingItem = updatedCartItems[existingItemIndex];

        if (action === "add") {
          updatedCartItems[existingItemIndex] = {
            ...existingItem,
            quantity: existingItem.quantity + item.quantity,
          };
        } else if (action === "increase") {
          updatedCartItems[existingItemIndex] = {
            ...existingItem,
            quantity: existingItem.quantity + 1,
          };
        } else if (action === "decrease") {
          const newQuantity = Math.max(existingItem.quantity - 1, 1);
          updatedCartItems[existingItemIndex] = {
            ...existingItem,
            quantity: newQuantity,
          };
        } else if (action === "remove") {
          updatedCartItems = updatedCartItems.filter(
            (cartItem) => cartItem._id !== item._id
          );
        }
      } else if (action === "add") {
        updatedCartItems.push(item);
      }

      const newTotalQuantity = updatedCartItems.reduce<number>(
        (acc, curr) => acc + curr.quantity,
        0
      );

      if (typeof window !== "undefined") {
        localStorage.setItem("kanma-cart", JSON.stringify(updatedCartItems));
      }

      return { cartItems: updatedCartItems, totalQuantity: newTotalQuantity };
    }),

  clearCart: () =>
    set(() => {
      // Clear cart items and total quantity
      if (typeof window !== "undefined") {
        localStorage.removeItem("kanma-cart");
      }
      return { cartItems: [], totalQuantity: 0 };
    }),
}));

export const useHydrateCartStore = () => {
  const pathname = usePathname();
  const [isHydrated, setIsHydrated] = useState(false);
  const { cartItems, totalQuantity, updateCartItem, clearCart } =
    useCartStore();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedCartItems = localStorage.getItem("kanma-cart");
      if (savedCartItems) {
        const parsedCartItems: CartItemProp[] = JSON.parse(savedCartItems);
        const initialTotalQuantity = parsedCartItems.reduce<number>(
          (acc, curr) => acc + curr.quantity,
          0
        );

        useCartStore.setState({
          cartItems: parsedCartItems,
          totalQuantity: initialTotalQuantity,
        });
      }
      setIsHydrated(true);
    }
  }, [pathname]);

  return { cartItems, totalQuantity, updateCartItem, isHydrated, clearCart };
};
