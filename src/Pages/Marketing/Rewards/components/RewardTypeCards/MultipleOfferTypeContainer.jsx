import React from "react";

const MultipleOfferTypeContainer = ({
  index,
  reward,
  handleRewardChange,
  freeMealTypes,
  setFreeMealTypes,
  limitType,
  setLimitType,
  minDishValueMultiple,
  setMinDishValueMultiple,
  maxDishValueMultiple,
  setMaxDishValueMultiple,
  limitTypeMultiple,
  setLimitTypeMultiple,
}) => {
  //   // console.log(minDishValue, maxDishValue);

  const handleMinDishValueChange = (e) => {
    const value = parseInt(e.target.value);
    if (
      !isNaN(value) &&
      value >= 0 &&
      (isNaN(maxDishValueMultiple) || value <= maxDishValueMultiple)
    ) {
      setMinDishValueMultiple(value);
    }
  };

  const handleMaxDishValueChange = (e) => {
    const value = parseInt(e.target.value);
    if (
      !isNaN(value) &&
      value >= 0 &&
      (isNaN(minDishValueMultiple) || value >= minDishValueMultiple)
    ) {
      setMaxDishValueMultiple(value);
    }
  };

  //   // console.log(limitType);

  return (
    <div className="my-3">
      <div className="form-control w-full">
        <label className="label" htmlFor="offer_type">
          <span className="label-text">Offer Type</span>
        </label>
        <select
          onChange={(e) =>
            handleRewardChange(
              index,
              "offerTypeForSingleAndMultipleDishes",
              e.target.value
            )
          }
          // value={reward.offerTypeForSingleAndMultipleDishes}
          name={`offerTypeForSingleAndMultipleDishes${index}`}
          className="select select-bordered w-full"
        >
          <option selected disabled>
            Offer Type
          </option>
          <option value="free" name="free">
            Free Meal
          </option>
          <option value="flat" name="flat">
            Flat Discount
          </option>
          <option value="percentage" name="percentage">
            Percentage Discount
          </option>
          {/* items data will be here from the api */}
        </select>
      </div>
      {/* ===== */}
      {reward.offerTypeForSingleAndMultipleDishes !== "free" && (
        <div className="flex items-center my-3">
          <input
            onChange={(e) =>
              handleRewardChange(
                index,
                "offerTypeValueForSingleAndMultipleDishes",
                e.target.value
              )
            }
            value={reward.offerTypeValueForSingleAndMultipleDishes}
            name={`offerTypeValueForSingleAndMultipleDishes${index}`}
            type="text"
            placeholder="Percentage Discount"
            className="input input-bordered me-2"
          />
          {reward.offerTypeForSingleAndMultipleDishes === "flat" ? "$" : "%"}
        </div>
      )}

      {/* limit type */}
      <label htmlFor="limitTypeMultiple">Select Limit Type</label>
      <select
        name={`limit${index}`}
        id="limitTypeMultiple"
        className="select select-bordered w-full mt-2"
        onChange={(e) => setLimitTypeMultiple(e.target.value)}
      >
        <option selected disabled>
          Select Limit Type
        </option>
        <option value="one_dish" name="one_dish">
          One Dish
        </option>
        <option value="limited" name="limited">
          Limited
        </option>
      </select>

      {/* conditional fields  */}
      {limitTypeMultiple === "limited" && (
        <div className="flex items-center gap-2 mt-3">
          <input
            className="input input-bordered w-20 bg-[#F2F4F8]"
            type="number"
            name="minDishValue"
            value={minDishValueMultiple}
            onChange={(e) => setMinDishValueMultiple(e.target.value)}
          />
          <span>-</span>
          <input
            className="input input-bordered w-20 bg-[#F2F4F8]"
            type="number"
            name="maxDishValue"
            value={maxDishValueMultiple}
            onChange={(e) => setMaxDishValueMultiple(e.target.value)}
          />
        </div>
      )}
    </div>
  );
};

export default MultipleOfferTypeContainer;
