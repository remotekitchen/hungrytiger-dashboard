import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  groupInvitation: {
    restaurant: "",
    platform: "",
    groupName: "",
    link: "",
    isActive: true,
  },
};

const groupInvitationSlice = createSlice({
  name: "groupInvitation",
  initialState,
  reducers: {
    selectedGroupInvitation: (state, action) => {
      // console.log(action.payload);
      const { restaurant, platform, name, group_link, is_active } =
        action.payload;
      state.groupInvitation.restaurant = restaurant;
      state.groupInvitation.platform = platform;
      state.groupInvitation.groupName = name;
      state.groupInvitation.link = group_link;
      state.groupInvitation.isActive = is_active;
    },
  },
});

export const { selectedGroupInvitation } = groupInvitationSlice.actions;

export default groupInvitationSlice.reducer;
