import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import userAuthReducer from "./slices/userAuthSlice";
import productsReducer from "./slices/productsSlice";
import ordersReducer from "./slices/ordersSlice";

export const store = configureStore({
  reducer: {
    userAuth: userAuthReducer,
    products: productsReducer,
    orders: ordersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Create typed hooks
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
