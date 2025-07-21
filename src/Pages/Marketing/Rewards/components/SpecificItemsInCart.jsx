import React from "react";

const SpecificItemsInCart = () => {
  return (
    <div className="form-control w-full">
      <label className="label" htmlFor="dish_in_additional_conditions">
        <span className="label-text">Select Dish</span>
      </label>
      <select
        name="dish_in_additional_conditions"
        id="dish_in_additional_conditions"
        className="select select-bordered w-full"
      >
        <option selected disabled>
          Select Dish
        </option>
        <option name="single_dish">Dish name</option>
        {/* items data will be here from the api */}
        {/* it will be a multi select from react select */}
      </select>
    </div>
  );
};

export default SpecificItemsInCart;
