import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  menuCreation: {
    title: "",
    description: "",
    restaurant: "",
    cuisine_types: [],
    locations: [],
    opening_hours: [],
  },
  createdMenu: {
    title: "",
    description: "",
    restaurant: "",
    cuisine_types: [],
    locations: [],
    opening_hours: [],
  },
  menuDetails: {},
  selectedMenu: {
    isEditing: false,
    menuDetails: {},
  },
};

const menuCreationSlice = createSlice({
  name: "menuCreation",
  initialState,
  reducers: {
    menuCreationOptions: (state, action) => {
      const { title, description, restaurant, cuisine_types, locations } =
        action.payload;

      state.menuCreation.title =
        title !== undefined ? title : state.menuCreation.title;
      state.menuCreation.description =
        description !== undefined ? description : state.description;
      state.menuCreation.restaurant =
        restaurant !== undefined ? restaurant : state.menuCreation.restaurant;
      state.menuCreation.cuisine_types =
        cuisine_types !== undefined
          ? cuisine_types
          : state.menuCreation.cuisine_types;
      state.menuCreation.locations =
        locations !== undefined ? locations : state.menuCreation.locations;
    },
    createdMenu: (state, action) => {
      const { title, description, restaurant, cuisine_types, locations } =
        action.payload.data;
      state.createdMenu.title = title;
      state.createdMenu.description = description;
      state.createdMenu.restaurant = restaurant;
      state.createdMenu.cuisine_types = cuisine_types;
      state.createdMenu.locations = locations;
      state.createdMenu.opening_hours = "opening_hours";
    },
    seeMenuDetails: (state, action) => {
      state.menuDetails = action.payload;
    },
    selectedMenu: (state, action) => {
      const { isEditing, selectedMenuData } = action.payload;
      state.selectedMenu.isEditing = isEditing;
      state.selectedMenu.menuDetails = selectedMenuData;
    },
  },
});
export const {
  menuCreationOptions,
  createdMenu,
  seeMenuDetails,
  selectedMenu,
} = menuCreationSlice.actions;
export default menuCreationSlice.reducer;
