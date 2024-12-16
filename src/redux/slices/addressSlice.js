import { createSlice } from "@reduxjs/toolkit";

const addressSlice = createSlice({
  name: "address",
  initialState: {
    address: [],
  },
  reducers: {
    setAddress: (state, action) => {
      state.address = action.payload;
    },
    addAddress: (state, action) => {
      const newAddress = action.payload;
      state.address.push(newAddress);
    },
    deleteAddress: (state, action) => {
      const address_id = action.payload;
      state.address = state.address.filter(
        (add) => add.address_id !== address_id
      );
    },
  },
});

export const { setAddress, addAddress, deleteAddress } = addressSlice.actions;
export default addressSlice.reducer;
