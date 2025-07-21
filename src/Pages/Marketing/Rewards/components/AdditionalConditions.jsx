import React from "react";
import MultiCustomSelect from "../../../../Components/MultiCustomSelect";

const AdditionalConditions = ({
  renderAdditionalComponents,
  setSelectedAdditionalCondition,
  selectedAdditionalCondition,
  timeOfDayStartTime,
  setTimeOfDayStartTime,
  timeOfDayEndTime,
  setTimeOfDayEndTime,
  itemInCartOrTimeOfDay,
  setItemInCartOrTimeOfDay,
  setAdditionalItems,
  menuItems,
  page,
  setPage,
  setGetSearchInput,
}) => {
  return (
    <div>
      <div className="form-control w-full">
        <label className="label" htmlFor="additional_info">
          <span className="label-text">Please select an option</span>
        </label>
        <select
          name="additional_info"
          required
          id="additional_info"
          onChange={(e) => setSelectedAdditionalCondition(e.target.value)}
          className="select select-bordered w-full"
        >
          <option selected disabled>
            Please select an option (Time of day, Specific item in cart, Minimum
            order amount)
          </option>

          <option
            selected={selectedAdditionalCondition === "minimum_amount"}
            value="minimum_amount"
            name="minimum_amount"
          >
            Minimum order amount
          </option>
          <option
            selected={selectedAdditionalCondition === "time_of_day"}
            value="time_of_day"
            name="time_of_day"
          >
            Time of Day
          </option>
          <option
            selected={selectedAdditionalCondition === "specific_item_in_cart"}
            value="specific_item_in_cart"
            name="specific_item_in_cart"
          >
            Specific item in cart
          </option>
        </select>

        {/* if specific item in a cart  */}
        {selectedAdditionalCondition === "specific_item_in_cart" && (
          <div className="my-3 w-4/5">
            <MultiCustomSelect
              page={page}
              setPage={setPage}
              loadItems={menuItems}
              setPromotion={setAdditionalItems}
              setGetSearchInput={setGetSearchInput}
            ></MultiCustomSelect>
          </div>
        )}

        {/* if minimum order amount  */}
        {selectedAdditionalCondition === "minimum_amount" && (
          <div className="flex items-center my-3">
            <input
              type="number"
              placeholder="50"
              className="input input-bordered me-2 w-36"
              value={itemInCartOrTimeOfDay}
              onChange={(e) => setItemInCartOrTimeOfDay(e.target.value)}
            />
            <span>$</span>
          </div>
        )}

        {/* if time of the day  */}
        {selectedAdditionalCondition === "time_of_day" && (
          <div className="flex items-center my-3 gap-3">
            <input
              value={timeOfDayStartTime}
              onChange={(e) => setTimeOfDayStartTime(e.target.value)}
              type="time"
              className="input input-bordered me-2 w-36"
            />
            <input
              value={timeOfDayEndTime}
              onChange={(e) => setTimeOfDayEndTime(e.target.value)}
              type="time"
              className="input input-bordered me-2 w-36"
            />
          </div>
        )}
      </div>
      {/* below cards will be dynamic based on what the user has selected in above code */}
      {/* if it is minimum order amount */}
      {renderAdditionalComponents}
    </div>
  );
};

export default AdditionalConditions;
