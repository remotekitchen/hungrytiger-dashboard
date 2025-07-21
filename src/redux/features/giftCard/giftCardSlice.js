import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  giftCard: {
    name: "",
    description: "",
    restaurant: "",
    menu: "",
  },
  selectedGiftCard: {
    isEditing: false,
    giftCardDetails: {
      name: "",
      id: 0,
      description: "",
      selectedMenu: 0,
      selectedRestaurant: 0,
      showInHome: false,
    },
  },
};

const giftCardSlice = createSlice({
  name: "giftCard",
  initialState,
  reducers: {
    //reducers will be here
    createdGiftCard: (state, action) => {
      const { name, description, restaurant, menu } = action.payload.data;
      state.giftCard.name = name;
      state.giftCard.description = description;
      state.giftCard.restaurant = restaurant;
      state.giftCard.menu = menu;
    },

    selectedGiftCard: (state, action) => {
      const { isEditing, selectedGiftCardData } = action.payload;
      state.selectedGiftCard.isEditing = isEditing;
      state.selectedGiftCard.giftCardDetails = selectedGiftCardData;
    },
  },
});

export const { createdGiftCard, selectedGiftCard } = giftCardSlice.actions;
export default giftCardSlice.reducer;
