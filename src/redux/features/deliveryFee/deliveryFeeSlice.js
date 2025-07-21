import { createSlice } from "@reduxjs/toolkit";

const initialState={
    deliveryFeeObj:
        {
            restaurant: 0,
        delivery_fee: 0, // Convert to a floating-point number
        convenience_fee: 0,   // Convert to a floating-point number
        minimum_order_amount: 0, // Convert to a floating-point number
        discount:0, // Convert to a floating-point number
        tax_rate: 0,         // Convert to a floating-point number
        use_tax: false
        },

}
const deliveryFeeSlice=createSlice(
{   name:"deliveryFeeSlice",
    initialState,
    reducers:{

        deliveryFeeSliceEdit:(state,action)=>{
            const{restaurant,delivery_fee,convenience_fee, 
            minimum_order_amount, // Convert to a floating-point number
            discount, // Convert to a floating-point number
            tax_rate,         // Convert to a floating-point number
            use_tax}=action.payloadd

            state.deliveryFeeObj.restaurant=restaurant,
            state.deliveryFeeObj.convenience_fee=convenience_fee,
            state.deliveryFeeObj.minimum_order_amount=minimum_order_amount,
            state.deliveryFeeObj.discount=discount,
            state.deliveryFeeObj.tax_rate=tax_rate,
            state.deliveryFeeObj.use_tax=use_tax
        }
        
    }                   

})