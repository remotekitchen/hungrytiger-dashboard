import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedPlatform: "",
};

export const platformSlice = createSlice({
  name: "platformSlice",
  initialState,
  reducers: {
    selectedPlatform: (state, action) => {
      state.selectedPlatform = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { selectedPlatform } = platformSlice.actions;

export default platformSlice.reducer;
