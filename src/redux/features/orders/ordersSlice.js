import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedOrder: {},
};

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    selectedOrder: (state, action) => {
      state.selectedOrder = action.payload;
    },
  },
});
export const { selectedOrder } = ordersSlice.actions;
export default ordersSlice.reducer;
