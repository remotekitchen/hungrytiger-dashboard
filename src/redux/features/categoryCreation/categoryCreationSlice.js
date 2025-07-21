import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  createdCategory: {
    name: "",
    description: "",
    restaurant: "",
    menu: "",
  },
  selectedCategory: {
    isEditing: false,
    categoryDetails: {
      name: "",
      id: 0,
      description: "",
      selectedMenu: 0,
      selectedRestaurant: 0,
      showInHome: false,
    },
  },
};

const categoryCreationSlice = createSlice({
  name: "categoryCreation",
  initialState,
  reducers: {
    //reducers will be here
    createdCategory: (state, action) => {
      const { name, description, restaurant, menu } = action.payload.data;
      state.createdCategory.name = name;
      state.createdCategory.description = description;
      state.createdCategory.restaurant = restaurant;
      state.createdCategory.menu = menu;
    },

    selectedCategory: (state, action) => {
      const { isEditing, selectedCategoryData } = action.payload;
      state.selectedCategory.isEditing = isEditing;
      state.selectedCategory.categoryDetails = selectedCategoryData;
    },
    setSelectedCategoryOption: (state, action) => {
      state.option = action.payload;
    }
  },
});
export const { createdCategory, selectedCategory, setSelectedCategoryOption } =
  categoryCreationSlice.actions;
export default categoryCreationSlice.reducer;
