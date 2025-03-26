// import { API_TOKEN, API_URL } from "@/helpers/constant";
import { API_URL } from "@/helper/constants";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface signUpProp {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: string;
}

interface signInProp {
  email: string;
  password: string;
}

export const userSignUp = createAsyncThunk(
  "users/create",
  async (payload: signUpProp) => {
    try {
      const response = await axios.post(`${API_URL}/users/create`, payload);
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

export const userSignIn = createAsyncThunk(
  "auth/login",
  async (payload: signInProp) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, payload);
      return response?.data;
    } catch (error) {
      const axiosError = error as any;
      console.log("resp", axiosError?.response);
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

const userAuth = createSlice({
  name: "userAuth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userSignUp.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(userSignUp.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(userSignUp.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default userAuth.reducer;
