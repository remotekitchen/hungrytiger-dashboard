import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loyaltyProgram: {
    name: "",
    description: "",
    restaurant: "",
    menu: "",
  },
  selectedLoyaltyProgram: {
    isEditing: false,
    loyaltyProgramDetails: {
      name: "",
      id: 0,
      description: "",
      selectedMenu: 0,
      selectedRestaurant: 0,
      showInHome: false,
    },
  },
};

const loyaltyProgramSlice = createSlice({
  name: "loyaltyProgram",
  initialState,
  reducers: {
    //reducers will be here
    createdLoyaltyProgram: (state, action) => {
      const { name, description, restaurant, menu } = action.payload.data;
      state.loyaltyProgram.name = name;
      state.loyaltyProgram.description = description;
      state.loyaltyProgram.restaurant = restaurant;
      state.loyaltyProgram.menu = menu;
    },

    selectedLoyaltyProgram: (state, action) => {
      const { isEditing, selectedLoyaltyProgramData } = action.payload;
      state.selectedLoyaltyProgram.isEditing = isEditing;
      state.selectedLoyaltyProgram.loyaltyProgramDetails =
        selectedLoyaltyProgramData;
    },
  },
});
export const { createdLoyaltyProgram, selectedLoyaltyProgram } =
  loyaltyProgramSlice.actions;
export default loyaltyProgramSlice.reducer;
