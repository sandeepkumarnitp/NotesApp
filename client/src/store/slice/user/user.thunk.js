import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../utility/axiosInstance";

export const loginUserThunk = createAsyncThunk(
  "login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/user/login", {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      console.log("loggin thunk giving error ");
      return rejectWithValue(error);
    }
  },
);

export const signupUserThunk = createAsyncThunk(
  "signup",
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/user/signup", {
        name,
        email,
        password,
      });
      return response.data;
    } catch (error) {
      console.log("signup thunk giving error ");
      return rejectWithValue(error);
    }
  },
);

export const getUserProfileThunk = createAsyncThunk(
  "getProfile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/user/get-profile");
      return response.data;
    } catch (error) {
      console.log("get profile thunk giving error ");
      return rejectWithValue(error);
    }
  },
);

export const logoutUserThunk = createAsyncThunk(
  "logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post("/user/logout");
      return response.data;
    } catch (error) {
      console.log("logout thunk giving error ");
      return rejectWithValue(error);
    }
  },
);
