import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./Slices/authSlice"
import VisitReducer from "./Slices/visitSlice";

export default configureStore({
  reducer: {
       auth: AuthReducer,
        visit: VisitReducer,
  },
});