import { createSlice } from "@reduxjs/toolkit";
import {
  getUserProfileThunk,
  loginUserThunk,
  logoutUserThunk,
  signupUserThunk,
} from "./user.thunk";

const initialState = {
  screenLoading: true,
  buttonLoading: false,
  isAuthenticated: localStorage.getItem("isAuthenticated") || false,
  userProfile: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //** login user thunk */
    builder
      .addCase(loginUserThunk.pending, (state, action) => {
        state.isAuthenticated = false;
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.screenLoading = false;
        localStorage.setItem("isAuthenticated", true);
        state.userProfile = action.payload?.response?.user;
      })
      .addCase(loginUserThunk.rejected, (state) => {
        state.isAuthenticated = false;
      });

    //** signup user thunk */
    builder
      .addCase(signupUserThunk.pending, (state, action) => {
        state.isAuthenticated = false;
      })
      .addCase(signupUserThunk.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.screenLoading = false;
        localStorage.setItem("isAuthenticated", true);
        state.userProfile = action.payload?.response?.newUser;
      })
      .addCase(signupUserThunk.rejected, (state) => {
        state.isAuthenticated = false;
      });

    //** get profile user thunk */
    builder
      .addCase(getUserProfileThunk.pending, (state, action) => {
        // state.isAuthenticated = false;
      })
      .addCase(getUserProfileThunk.fulfilled, (state, action) => {
        state.userProfile = action?.payload?.responseData;
        state.screenLoading = false;
      })
      .addCase(getUserProfileThunk.rejected, (state) => {
        state.isAuthenticated = false;
      });

    //** logout user thunk */
    builder
      .addCase(logoutUserThunk.pending, (state, action) => {
        state.isAuthenticated = false;
      })
      .addCase(logoutUserThunk.fulfilled, (state, action) => {
        state.isAuthenticated = false;
        state.screenLoading = true;
        localStorage.clear();
        state.userProfile = null;
      })
      .addCase(logoutUserThunk.rejected, (state) => {
        state.isAuthenticated = false;
      });
  },
});

// Action creators are generated for each case reducer function
export const {} = userSlice.actions; //synchronous function

export default userSlice.reducer;
