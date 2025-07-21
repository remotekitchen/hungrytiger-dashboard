import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    voucher: {
        name: "",
        restaurant: "",
        location: "",
        promotion: "",
    },
    selectedVoucher: {
        isEditing: false,
        voucherDetails: {
            name: "",
            id: 0,
            restaurant: "",
            location: "",
            promotion: "",
        },
    },

};

const voucherSlice = createSlice({
    name: "voucher",
    initialState,
    reducers: {
        //reducers will be here
        voucher: (state, action) => {
            const { name, restaurant, location, promotion } = action.payload.data;
            state.voucher.name = name;
            state.voucher.restaurant = restaurant;
            state.voucher.location = location;
            state.voucher.promotion = promotion;
        },

        selectedVoucher: (state, action) => {
            const { isEditing, selectedVoucherData } = action.payload;
            state.selectedVoucher.isEditing = isEditing;
            state.selectedVoucher.voucherDetails = selectedVoucherData;
        },
    },
});

export const { voucher, selectedVoucher } = voucherSlice.actions;
export default voucherSlice.reducer;

     