import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  modifierGroup: {
    name: "",
    description: "",
    restaurant: "",
    menu: "",
  },
  selectedModifierGroup: {
    isEditing: false,
    modifierGroupDetails: {
      name: "",
      id: 0,
      description: "",
      selectedMenu: 0,
      selectedRestaurant: 0,
      showInHome: false,
    },
  },
};

const modifierGroupSlice = createSlice({
  name: "modifierGroup",
  initialState,
  reducers: {
    //reducers will be here
    createdModifierGroup: (state, action) => {
      const { name, description, restaurant, menu } = action.payload.data;
      state.modifierGroup.name = name;
      state.modifierGroup.description = description;
      state.modifierGroup.restaurant = restaurant;
      state.modifierGroup.menu = menu;
    },

    selectedModifierGroup: (state, action) => {
      const { isEditing, selectedModifierGroupData } = action.payload;
      state.selectedModifierGroup.isEditing = isEditing;
      state.selectedModifierGroup.modifierGroupDetails =
        selectedModifierGroupData;
    },
  },
});

export const { createdModifierGroup, selectedModifierGroup } = modifierGroupSlice.actions;
export default modifierGroupSlice.reducer;
