import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  showModal: false,
  showAddRewardModal: false,
};

export const showModalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    showModal: (state, action) => {
      state.showModal = action.payload;
    },
    openAddRewardModal(state) {
      state.showAddRewardModal = true;
    },
    closeAddRewardModal(state) {
      state.showAddRewardModal = false;
    },
  },
});


export const { showModal,openAddRewardModal, closeAddRewardModal } = showModalSlice.actions;

export default showModalSlice.reducer;
