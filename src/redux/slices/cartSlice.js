import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
    cartItemCount: 0,
    subTotal: 0,
  },
  reducers: {
    setCart: (state, action) => {
      state.cartItems = action.payload;
      state.cartItemCount = action.payload.length;
      state.subTotal = action.payload.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },
    addItem: (state, action) => {
      const newItem = action.payload;
    },
    deleteItem: (state, action) => {
      const itemId = action.payload;
      state.cartItems = state.cartItems.filter(
        (item) => item.cart_id !== itemId
      );

      state.cartItemCount = state.cartItems.length;
      state.subTotal = state.cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },
    updateQty: (state, action) => {
      const { cart_id, newQuantity } = action.payload;
      const item = state.cartItems.find((item) => item.cart_id === cart_id);
      if (item) {
        item.quantity = newQuantity;
        state.subTotal = state.cartItems.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
      }
    },
    addDescription: (state, action) => {
      const { cart_id, itemDescription } = action.payload;
      const item = state.cartItems.find((item) => item.cart_id === cart_id);
      if (item) {
        item.description = itemDescription;
      }
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.cartItemCount = 0;
      state.subTotal = 0;
    },
  },
});

export const {
  setCart,
  addItem,
  deleteItem,
  updateQty,
  clearCart,
  addDescription,
} = cartSlice.actions;
export default cartSlice.reducer;
