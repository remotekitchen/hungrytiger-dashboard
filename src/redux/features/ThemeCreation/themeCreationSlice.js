import { createSlice } from "@reduxjs/toolkit";
const initialState={
    createdTheme:{
        primary_color:"",
        secondary_color:"",
        positive_color:"",
        danger_color:"",
        warning_color:"",
        cart_color:"",
        background_color:"",
        text_color:"",
        stock_color:"",
        disable_color:"",
        restaurant:"",
        location:"",
    }
}

const themeCreationSlice = createSlice({
    name: "themeCration",
    initialState,
    reducer: {
        createdTheme: (state, action) => {
            const {
                primary_color,
                secondary_color,
                positive_color,
                danger_color,
                warning_color,
                cart_color,
                background_color,
                text_color,
                stock_color,
                disable_color,
                restaurant,
                location
            } = action.payload.data;

            state.createdTheme.restaurant=restaurant;
            state.createdTheme.location=location;
            state.createdTheme.primary_color=primary_color;
            state.createdTheme.positive_color=positive_color;
            state.createdTheme.danger_color=danger_color;
            state.createdTheme.warning_color=warning_color;
            state.createdTheme.cart_color=cart_color;
            state.createdTheme.background_color=background_color;
            state.createdTheme.text_color=text_color;
            state.createdTheme.stock_color=stock_color;
            state.createdTheme.disable_color=disable_color;
           
        }

      
    }

})

export const{
    createdTheme
}=themeCreationSlice.actions;

export default themeCreationSlice.reducer;
