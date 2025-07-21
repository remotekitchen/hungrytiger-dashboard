import React from "react";
import { RiDeleteBin5Line } from "react-icons/ri";
import BogoTypeContainer from "../RewardTypeCards/BogoTypeContainer";
import CouponContainer from "../RewardTypeCards/CouponContainer";
import MultipleDishCard from "../RewardTypeCards/MultipleDishCard";
import MultipleOfferTypeContainer from "../RewardTypeCards/MultipleOfferTypeContainer";
import PointsCard from "../RewardTypeCards/PointsCard";
import SingleAndMultipleOfferTypeInput from "../RewardTypeCards/SingleAndMultipleOfferTypeInput";
import SingleDishCard from "../RewardTypeCards/SingleDishCard";

const RewardSet = ({
  index,
  reward,
  setRewards,
  handleRewardChange,
  freeMealTypes,
  setFreeMealTypes,
  limitType,
  setLimitType,
  minDishValue,
  setMinDishValue,
  maxDishValue,
  setMaxDishValue,
  minDishValueMultiple,
  setMinDishValueMultiple,
  maxDishValueMultiple,
  setMaxDishValueMultiple,
  singleOfferType,
  setSingleOfferType,
  singleMenuItem,
  setSingleMenuItem,
  setMultipleMenuItem,
  setBogoMenuItem,
  page,
  setPage,
  menuItems,
  setGetSearchInput,
  getSearchInput,
  selectedRestarauntId,
  limitTypeMultiple,
  setLimitTypeMultiple,
  removeReward,
}) => {
  // console.log('🚀 ~ reward:', reward);
  // console.log(reward?.rewardType, 'rewardType');
  return (
    <div className="border-2 px-3 py-2 border-[#C1C7CD] rounded-md my-3 min-h-[40px]">
      {/* reward */}
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-lg">Reward {index + 1}</h2>
        <span
          onClick={() => removeReward(index)}
          className="p-2 text-lg bg-red-200 rounded-full cursor-pointer text-red-600"
        >
          <RiDeleteBin5Line />
        </span>
      </div>
      <div className="form-control w-full">
        <label className="label" htmlFor="reward">
          <span className="label-text">Select Reward</span>
        </label>
        <select
          name={`rewardType${index}`}
          id={`rewardType${index}`}
          className="select select-bordered w-full"
          value={reward?.rewardType}
          onChange={(e) =>
            handleRewardChange(index, "rewardType", e.target.value)
          }
        >
          <option selected disabled>
            Select Reward Type
          </option>
          <option value="single_dish" name="single_dish">
            Single Dish
          </option>
          {/* <option value="multiple_dish" name="multiple_dish">
        Multiple Dish
      </option> */}
          <option value="bogo" name="bogo">
            Bogo
          </option>
          <option value="coupon" name="coupon">
            Coupon
          </option>
          <option value="reward_point" name="reward_point">
            Loyalty Point
          </option>
        </select>
      </div>
      {/* section, based on reward selectoin */}
      <div>
        {reward.rewardType === "single_dish" && (
          <SingleDishCard
            handleRewardChange={handleRewardChange}
            index={index}
            reward={reward}
            setRewards={setRewards}
            setSingleMenuItem={setSingleMenuItem}
            singleMenuItem={singleMenuItem}
            page={page}
            setPage={setPage}
            menuItems={menuItems}
            setGetSearchInput={setGetSearchInput}
            getSearchInput={getSearchInput}
            selectedRestarauntId={selectedRestarauntId}
            rewardType={reward.rewardType}
          />
        )}
        {reward.rewardType === "multiple_dish" && (
          <MultipleDishCard
            handleRewardChange={handleRewardChange}
            index={index}
            reward={reward}
            setMultipleMenuItem={setMultipleMenuItem}
            page={page}
            setPage={setPage}
            menuItems={menuItems}
            setGetSearchInput={setGetSearchInput}
            getSearchInput={getSearchInput}
            selectedRestarauntId={selectedRestarauntId}
          />
        )}
        {reward.rewardType === "bogo" && (
          <BogoTypeContainer
            handleRewardChange={handleRewardChange}
            index={index}
            reward={reward}
            setBogoMenuItem={setBogoMenuItem}
            page={page}
            setPage={setPage}
            menuItems={menuItems}
            setGetSearchInput={setGetSearchInput}
            getSearchInput={getSearchInput}
            selectedRestarauntId={selectedRestarauntId}
          />
        )}
        {reward.rewardType === "coupon" && (
          <CouponContainer
            index={index}
            reward={reward}
            handleRewardChange={handleRewardChange}
            freeMealTypes={freeMealTypes}
            setFreeMealTypes={setFreeMealTypes}
            limitType={limitType}
            setLimitType={setLimitType}
            minDishValue={minDishValue}
            setMinDishValue={setMinDishValue}
            maxDishValue={maxDishValue}
            setMaxDishValue={setMaxDishValue}
          />
        )}

        {reward.rewardType === "reward_point" && (
          <PointsCard
            handleRewardChange={handleRewardChange}
            index={index}
            reward={reward}
            setRewards={setRewards}
            selectedRestarauntId={selectedRestarauntId}
          />
        )}

        {reward.rewardType === "multiple_dish" && (
          <MultipleOfferTypeContainer
            index={index}
            reward={reward}
            handleRewardChange={handleRewardChange}
            freeMealTypes={freeMealTypes}
            setFreeMealTypes={setFreeMealTypes}
            limitTypeMultiple={limitTypeMultiple}
            setLimitTypeMultiple={setLimitTypeMultiple}
            minDishValueMultiple={minDishValueMultiple}
            setMinDishValueMultiple={setMinDishValueMultiple}
            maxDishValueMultiple={maxDishValueMultiple}
            setMaxDishValueMultiple={setMaxDishValueMultiple}
          />
        )}
      </div>

      {/* offer type input will be available only if it is single or multiple dish */}
      <div>
        {(reward.rewardType === "single_dish" ||
          reward.rewardType === "multiple_dish" ||
          reward.rewardType === "bogo" ||
          (reward.rewardType === "single_dish" &&
            reward.rewardType === "coupon")) && (
          <SingleAndMultipleOfferTypeInput
            reward={reward}
            handleRewardChange={handleRewardChange}
            index={index}
            singleOfferType={singleOfferType}
            setSingleOfferType={setSingleOfferType}
            freeMealTypes={freeMealTypes}
            setFreeMealTypes={setFreeMealTypes}
          />
        )}
      </div>
    </div>
  );
};

export default RewardSet;
