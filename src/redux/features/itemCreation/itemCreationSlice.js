import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  createditem: {
    name: "",
    description: "",
    base_price: 0,
    menu: 0,
    restaurant: 0,
    images: [],
    category: [],
  },
  selecteditem: {
    name: "",
    description: "",
    base_price: 0,
    menu: 0,
    restaurant: 0,
    images: [],
    category: [],
  },
  selectedItemForEdit: {
    isEditing: false,
    itemDetails: {
      id: 0,
      name: "",
      selectedCategory: "",
      basePrice: 0,
      description: "",
      selectedMenu: 0,
      selectedRestaurant: 0,
      showInHome: false,
    },
  },
};

const itemCreationSlice = createSlice({
  name: "itemCreation",
  initialState,
  reducers: {
    //reducers will be here

    createditem: (state, action) => {
      const {
        name,
        description,
        base_price,
        category,
        restaurant,
        menu,
        images,
      } = action.payload.data;
      state.createditem.name = name;
      state.createditem.description = description;
      state.createditem.base_price = base_price;
      state.createditem.menu = menu;
      state.createditem.category = category;
      state.createditem.restaurant = restaurant;
      state.createditem.images = images;
    },
    selecteditem: (state, action) => {
      const {
        name,
        description,
        base_price,
        category,
        restaurant,
        menu,
        images,
        id,
      } = action.payload;
      state.selecteditem.name = name;
      state.selecteditem.id = id;
      state.selecteditem.description = description;
      state.selecteditem.base_price = base_price;
      state.selecteditem.menu = menu;
      state.selecteditem.category = category;
      state.selecteditem.restaurant = restaurant;
      state.selecteditem.images = images;
    },

    selectedItemForEdit: (state, action) => {
      const { isEditing, selectedItemData } = action.payload;
      state.selectedItemForEdit.isEditing = isEditing;
      state.selectedItemForEdit.itemDetails = selectedItemData;
    },
  },
});
export const { createditem, selecteditem, selectedItemForEdit } =
  itemCreationSlice.actions;
export default itemCreationSlice.reducer;
