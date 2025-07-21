import React, { useState } from "react";
import RewardCard from "./components/RewardCard";
import RewardValidity from "./components/RewardValidity";
import RewardsCondition from "./components/RewardsCondition";

const InitialCompo = ({
  setShowAddCategoryModal,
  isEditing,
  rewardsDetails,
}) => {
  // reward states
  const [rewardName, setRewardName] = useState("");
  const [rewardDescription, setRewardDescription] = useState("");
  const [selectedRestarauntId, setSelectedRestarauntId] = useState(0);
  const [selectRewardType, setSelectedRewardType] = useState("");
  const [isFreeDelivery, setIsFreeDelivery] = useState(false);
  // reward type === bogo
  const [bogoType, setBogoType] = useState(""); // any dish, selected category, selected dishes
  // if it is any dish there is no need to set below states
  const [selectDishesForBogo, setSelectDishesForBogo] = useState([]);

  // reward type === single dish
  // reward type === multiple dish
  const [
    offerTypeForSingleAndMultipleDishes,
    setOfferTypeForSingleAndMultipleDishes,
  ] = useState(""); //free, free discount, flat discount
  // offer type value if not free discount
  const [
    offerTypeValueForSingleAndMultipleDishes,
    setOfferTypeValueForSingleAndMultipeDishes,
  ] = useState("");

  const [applicableConditions, setApplicableConditions] = useState([""]);

  // additional conditions
  const [additionalCondition, setAdditionalCondition] = useState("");
  const [additionalConditionValue, setAdditionalConditionValue] = useState("");

  // specific item or time
  const [itemInCartOrTimeOfDay, setItemInCartOrTimeOfDay] = useState("");
  //  if item in cart
  const [itemsInCart, setItemsInCart] = useState([]);
  // if time of the day
  const [timeOfDayStartTime, setTimeOfDayStartTime] = useState("");
  const [timeOfDayEndTime, setTimeOfDayEndTime] = useState("");

  // validity
  const [validitySelection, setValiditySelection] = useState("");
  // unlimited --> no condition.
  const [validitySelectionValue, setValiditySelectionValue] = useState("");

  // functions
  const rewardConditionsBySelectedRewardType = () => {};
  // ==============

  return (
    <>
      <input
        type="checkbox"
        id={
          isEditing
            ? `add_reward_modal_${rewardsDetails.id}`
            : "add_reward_modal_"
        }
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box">
          <h1 className="text-2xl mb-6 font-bold font-sans">
            {isEditing ? "Edit" : "Add A"} Reward
          </h1>
          <div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Reward Name</span>
              </label>
              <input
                required
                name="rewardName"
                type="text"
                placeholder="Reward Name"
                className="input input-bordered w-full"
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Reward Description</span>
              </label>
              <textarea
                required
                className="textarea textarea-bordered"
                placeholder="Description"
                name="rewardDescription"
              ></textarea>
            </div>
            {/* select res */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Select Restaurant</span>
              </label>
              <select
                id="restaurant"
                name="restaurant"
                required
                className="select select-bordered w-full"
              >
                <option value="" selected disabled>
                  Select Restaurant
                </option>
                {/* <option>Rest Name</option> */}
              </select>
            </div>
            {/* =================== */}
            <div className="border-2 px-3 py-2 border-[#C1C7CD] rounded-md my-3 min-h-[40px]">
              {/* each reward card */}
              <RewardCard />
            </div>
            {/* add more reward card button */}
            <div>
              <button className="bg-[#42C2FF] text-white px-4 py-1 rounded-lg mt-4 flex items-center text-4xl gap-2">
                +
              </button>
            </div>

            {/* conditions */}
            <div>
              <RewardsCondition />
            </div>
            {/* validity */}
            <div>
              <RewardValidity />
            </div>
            {/* =================== */}
            {/* save button */}
            <div className="modal-action">
              <label htmlFor="add_category_modal">
                <button
                  name="save"
                  className="bg-[#42C2FF] text-white px-4 py-2 rounded-lg mt-2"
                  type="submit"
                  value="Submit"
                >
                  {isEditing ? "Save changes" : "+ Add New Reward"}
                </button>
              </label>
            </div>
          </div>
        </div>
        <label
          className="modal-backdrop"
          htmlFor={
            isEditing
              ? `add_reward_modal_${rewardsDetails.id}`
              : "add_reward_modal_"
          }
        >
          Close
        </label>
      </div>
    </>
  );
};

export default InitialCompo;
