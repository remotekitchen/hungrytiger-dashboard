import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    birthdayGift: {
        name: "",
        description: "",
        restaurant: "",
        menu: "",
    },
    selectedBirthdayGift: {
        isEditing: false,
        birthdayGiftDetails: {
        name: "",
        id: 0,
        description: "",
        selectedMenu: 0,
        selectedRestaurant: 0,
        showInHome: false,
        },
    },
    };

const birthdayGiftSlice = createSlice({
    name: "birthdayGift",
    initialState,
    reducers: {
        //reducers will be here
        createdBirthdayGift: (state, action) => {
            const { name, description, restaurant, menu } = action.payload.data;
            state.birthdayGift.name = name;
            state.birthdayGift.description = description;
            state.birthdayGift.restaurant = restaurant;
            state.birthdayGift.menu = menu;
        },

        selectedBirthdayGift: (state, action) => {
            const { isEditing, selectedBirthdayGiftData } = action.payload;
            state.selectedBirthdayGift.isEditing = isEditing;
            state.selectedBirthdayGift.birthdayGiftDetails =
            selectedBirthdayGiftData;
        },
    },
});

export const { createdBirthdayGift, selectedBirthdayGift } = birthdayGiftSlice.actions;
export default birthdayGiftSlice.reducer;

