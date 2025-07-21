import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  createdRestaurent: {
    name: "",
    opening_hours: [],
    location: "",
  },
  selectedRestaurant: {
    isEditing: false,
    restaurantDetails: {
      name: "",
      id: 0,
    },
  },
};

const restaurentCreationSlice = createSlice({
  name: "restaurentCreation",
  initialState,
  reducers: {
    restaurentCreationOptions: (state, action) => {
      const { title, description, restaurant, cuisine_types, locations } =
        action.payload;

      state.createdRestaurent.restaurentCreation.title =
        title !== undefined ? title : state.restaurentCreation.title;
      state.createdRestaurent.restaurentCreation.description =
        description !== undefined ? description : state.description;
      state.createdRestaurent.restaurentCreation.restaurant =
        restaurant !== undefined
          ? restaurant
          : (state.createdRestaurent.restaurentCreation.cuisine_types =
              cuisine_types !== undefined
                ? cuisine_types
                : state.createdRestaurent.restaurentCreation.cuisine_types);
      state.createdRestaurent.restaurentCreation.locations =
        locations !== undefined
          ? locations
          : state.createdRestaurent.restaurentCreation.locations;
    },
    selectedRestaurant: (state, action) => {
      const { isEditing, selectedRestaurantData } = action.payload;
      state.selectedRestaurant.isEditing = isEditing;
      state.selectedRestaurant.restaurantDetails = selectedRestaurantData;
    },
  },
});
export const {
  restaurentCreationOptions,
  createdrestaurent,
  selectedRestaurant,
} = restaurentCreationSlice.actions;
export default restaurentCreationSlice.reducer;
