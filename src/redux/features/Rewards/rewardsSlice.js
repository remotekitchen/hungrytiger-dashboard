import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  rewards: {
    name: "",
    restaurant: "",
    location: "",
    promotion: "",
  },
  selectedRewards: {
    isEditing: false,
    rewardsDetails: {
      name: "",
      id: 0,
      restaurant: "",
      location: "",
      promotion: "",
    },
  },
  options: {}, /* added by adnan */
};

const rewardsSlice = createSlice({
  name: "rewards",
  initialState,
  reducers: {
    //reducers will be here
    rewards: (state, action) => {
      const { name, restaurant, location, promotion } = action.payload.data;
      state.rewards.name = name;
      state.rewards.restaurant = restaurant;
      state.rewards.location = location;
      state.rewards.promotion = promotion;
    },

    selectedRewards: (state, action) => {
      const { isEditing, selectedRewardsData } = action.payload;
      state.selectedRewards.isEditing = isEditing;
      state.selectedRewards.rewardsDetails = selectedRewardsData;
    },

    // setSelectedRewardOption: (state, action) => {
    //   state.option = action.payload;
    // },

    /* disabled by adnan top code */

    setSelectedRewardOption: (state, action) => {
      const { index, selectedOption } = action.payload;
      state.options[index] = selectedOption; 
    },
    clearSelectedOption: (state) => {
      state.option = null;
    },
  },
});
export const { rewards, selectedRewards, setSelectedRewardOption, clearSelectedOption } = rewardsSlice.actions;
export default rewardsSlice.reducer;
