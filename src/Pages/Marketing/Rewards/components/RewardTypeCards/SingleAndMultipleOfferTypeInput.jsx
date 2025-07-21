import React from "react";

const SingleAndMultipleOfferTypeInput = ({
  handleRewardChange,
  index,
  reward,
  singleOfferType,
  setSingleOfferType,
  freeMealTypes,
  setFreeMealTypes,
}) => {
  return (
    <div>
      {reward?.rewardType === "single_dish" && (
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
            value={reward.offerTypeForSingleAndMultipleDishes || "free"}
            name={`offerTypeForSingleAndMultipleDishes${index}`}
            className="select select-bordered w-full"
          >
            <option selected disabled>
              Offer Type
            </option>
            <option value="free" name="free">
              Free
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
      )}
      {/* ===== */}
      {reward.offerTypeForSingleAndMultipleDishes !== "free" &&
        reward?.rewardType === "single_dish" && (
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
      {/* free delivery  */}
      <div className="form-control ">
        <label className="label cursor-pointe items-center space-x-2 justify-start">
          <input
            onChange={(e) =>
              handleRewardChange(index, "isFreeDelivery", e.target.checked)
            }
            checked={reward.isFreeDelivery}
            name={`isFreeDelivery${index}`}
            type="checkbox"
            className="checkbox checkbox-primary"
          />
          <span className="label-text my-0">Free Delivery</span>
        </label>
      </div>
    </div>
  );
};

export default SingleAndMultipleOfferTypeInput;
