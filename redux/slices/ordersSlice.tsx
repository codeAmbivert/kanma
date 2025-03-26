// import { API_TOKEN, API_URL } from "@/helpers/constant";
import { API_URL } from "@/helper/constants";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// interface createProductProp {
//   id: string;
//   payload: FormData;
// }

// interface CreateOrderProp {
//   id: string;
//   payload: any;
// }

export const getUserOrders = createAsyncThunk(
  "prd-ord/orders/user",
  async (id: string) => {
    try {
      const response = await axios.get(`${API_URL}/prd-ord/orders/user/${id}`);
      return response?.data;
    } catch (error) {
      const axiosError = error as any;
      if (axiosError?.response?.data?.message) {
        throw new Error(axiosError?.response?.data?.message);
      } else if (axiosError?.message) {
        throw new Error(axiosError?.error);
      } else {
        throw new Error("An error occurred, please try again later");
      }
    }
  }
);

interface State {
  data: any;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null | undefined;
}

const initialState: State = {
  data: null,
  status: "idle",
  error: null,
};

const orders = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(getUserOrders.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getUserOrders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(getUserOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default orders.reducer;
