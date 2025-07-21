import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  groupOrdering: {
    name: "",
    restaurant: "",
    location: "",
    promotion: "",
  },
  selectedGroupOrdering: {
    isEditing: false,
    groupOrderingDetails: {
      name: "",
      id: 0,
      restaurant: "",
      location: "",
      promotion: "",
    },
  },
};

const groupOrderingSlice = createSlice({
  name: "groupOrdering",
  initialState,
  reducers: {
    //reducers will be here
    groupOrdering: (state, action) => {
      const { name, restaurant, location, promotion } = action.payload.data;
      state.groupOrdering.name = name;
      state.groupOrdering.restaurant = restaurant;
      state.groupOrdering.location = location;
      state.groupOrdering.promotion = promotion;
    },

    selectedGroupOrdering: (state, action) => {
      const { isEditing, selectedGroupOrderingData } = action.payload;
      state.selectedGroupOrdering.isEditing = isEditing;
      state.selectedGroupOrdering.groupOrderingDetails = selectedGroupOrderingData;
    },
  },
});

export const { groupOrdering, selectedGroupOrdering } = groupOrderingSlice.actions;
export default groupOrderingSlice.reducer;
