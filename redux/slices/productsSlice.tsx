// import { API_TOKEN, API_URL } from "@/helpers/constant";
import { API_URL } from "@/helper/constants";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface createProductProp {
  id: string;
  payload: FormData;
}

// interface CreateOrderProp {
//   id: string;
//   payload: any;
// }

export const createProduct = createAsyncThunk(
  "prd-ord/create",
  async ({ id, payload }: createProductProp) => {
    try {
      const response = await axios.post(
        `${API_URL}/prd-ord/create/${id}`,
        payload
      );
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

export const getAllProducts = createAsyncThunk("prd-ord/all", async () => {
  try {
    const response = await axios.get(`${API_URL}/prd-ord/all`);
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
});

export const getSingleProduct = createAsyncThunk(
  "prd-ord/all",
  async (id: string) => {
    try {
      const response = await axios.get(`${API_URL}/prd-ord/${id}`);
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

export const getSingleOrder = createAsyncThunk(
  "prd-ord/orders",
  async (id: string) => {
    try {
      const response = await axios.get(`${API_URL}/prd-ord/orders/${id}`);
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

export const createOrder = createAsyncThunk(
  "prd-ord/create-order",
  async (payload: any) => {
    try {
      const response = await axios.post(
        `${API_URL}/prd-ord/create-order`,
        payload
      );
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

const products = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getAllProducts.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(getSingleOrder.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getSingleOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(getSingleOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default products.reducer;
