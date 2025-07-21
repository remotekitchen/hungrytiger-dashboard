import { createSlice } from "@reduxjs/toolkit";

const initialState={
   bogo:{
       name:"",
       restaurant:"",
       location:"",
       promotion:"",
   },
    selectedBogo:{
         isEditing:false,
         bogoDetails:{
              name:"",
              id:0,
              restaurant:"",
              location:"",
              promotion:"",
         },
    },

};

const bogoSlice=createSlice({
    name:"bogo",
    initialState,
    reducers:{
        //reducers will be here
        bogo:(state,action)=>{
            const {name,restaurant,location,promotion}=action.payload.data;
            state.bogo.name=name;
            state.bogo.restaurant=restaurant;
            state.bogo.location=location;
            state.bogo.promotion=promotion;
        },

        selectedBogo:(state,action)=>{
            const {isEditing,selectedBogoData}=action.payload;
            state.selectedBogo.isEditing=isEditing;
            state.selectedBogo.bogoDetails=selectedBogoData;
        },
    },
});

export const {bogo,selectedBogo}=bogoSlice.actions;
export default bogoSlice.reducer;

