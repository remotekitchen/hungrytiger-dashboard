import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  membershipCard: {
    name: "",
    description: "",
    restaurant: "",
    menu: "",
  },
  selectedMembershipCard: {
    isEditing: false,
    membershipCardDetails: {
      name: "",
      id: 0,
      description: "",
      selectedMenu: 0,
      selectedRestaurant: 0,
      showInHome: false,
    },
  },
};

const membershipCardSlice = createSlice({
  name: "membershipCard",
  initialState,
  reducers: {
    //reducers will be here
    createdMembershipCard: (state, action) => {
      const { name, description, restaurant, menu } = action.payload.data;
      state.membershipCard.name = name;
      state.membershipCard.description = description;
      state.membershipCard.restaurant = restaurant;
      state.membershipCard.menu = menu;
    },

    selectedMembershipCard: (state, action) => {
      const { isEditing, selectedMembershipCardData } = action.payload;
      state.selectedMembershipCard.isEditing = isEditing;
      state.selectedMembershipCard.membershipCardDetails =
        selectedMembershipCardData;
    },
  },
});

export const { createdMembershipCard, selectedMembershipCard } =
  membershipCardSlice.actions;
export default membershipCardSlice.reducer;