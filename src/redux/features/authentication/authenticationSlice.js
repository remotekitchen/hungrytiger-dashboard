import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: undefined,
  user_info: {},
};

const authenticationSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    //reducers will be here
    userLoggedIn: (state, action) => {
      // // console.log(action.payload);
      state.token = action.payload.token;
      state.user_info = action.payload.user;
    },
    userLoggedOut: (state) => {
      state.token = undefined;
      state.user_info = undefined;
    },
  },
});
export const { userLoggedIn, userLoggedOut } = authenticationSlice.actions;
export default authenticationSlice.reducer;
