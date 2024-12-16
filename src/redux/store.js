import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";
import serviceReducer from "./slices/serviceSlice";
import categoryReducer from "./slices/categorySlice";
import cartReducer from "./slices/cartSlice";
import shippingReducer from "./slices/shippingSlice";
import addressReducer from "./slices/addressSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    service: serviceReducer,
    category: categoryReducer,
    cart: cartReducer,
    shipping: shippingReducer,
    address: addressReducer,
  },
});

export default store;
