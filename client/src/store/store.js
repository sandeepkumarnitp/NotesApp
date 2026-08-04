import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slice/user/user.slice.js";
import noteReducer from "./slice/note/note.slice.js";

export const store = configureStore({
  reducer: { userReducer, noteReducer },
});
