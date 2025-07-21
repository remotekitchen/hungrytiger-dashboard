import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  spendXSaveY: {
    name: "",
    restaurant: "",
    location: "",
    promotion: "",
  },
  selectedSpendXSaveY: {
    isEditing: false,
    spendXSaveYDetails: {
      name: "",
      id: 0,
      restaurant: "",
      location: "",
      promotion: "",
    },
  },
};

const spendxsaveySlice = createSlice({
  name: "spendxsavey",
  initialState,
  reducers: {
    //reducers will be here
    spendXSaveY: (state, action) => {
      const { name, restaurant, location, promotion } = action.payload.data;
      state.spendXSaveY.name = name;
      state.spendXSaveY.restaurant = restaurant;
      state.spendXSaveY.location = location;
      state.spendXSaveY.promotion = promotion;
    },

    selectedSpendXSaveY: (state, action) => {
      const { isEditing, selectedSpendXSaveYData } = action.payload;
      state.selectedSpendXSaveY.isEditing = isEditing;
      state.selectedSpendXSaveY.spendXSaveYDetails = selectedSpendXSaveYData;
    },
  },
});
export const { spendXSaveY, selectedSpendXSaveY } = spendxsaveySlice.actions;
export default spendxsaveySlice.reducer;
