import React from "react";
import SingleDishCardInfinity from "./SingleDishCardInfinity";

const SingleDishCard = ({
  handleRewardChange,
  index,
  reward,
  setRewards,
  setSingleMenuItem,
  singleMenuItem,
  page,
  setPage,
  menuItems,
  setGetSearchInput,
  getSearchInput,
  selectedRestarauntId,
  rewardType,
  isLoading,
}) => {
  return (
    <div className="form-control w-full">
      <label className="label" htmlFor={`selectedSingleDish${index}`}>
        <span className="label-text">Select Dish</span>
      </label>

      {/* <select
        onChange={(e) => setSingleMenuItem(e?.target?.value)}
        value={singleMenuItem}
        name={`selectedSingleDish${index}`}
        id={`selectedSingleDish${index}`}
        className="select select-bordered w-full"
      >
        <option value="" disabled>
          Select Dish
        </option>
        {menuItems?.results.map((menuItem) => (
          <option key={menuItem.id} value={menuItem.id}>
            {menuItem.name.length > 50
              ? `${menuItem.name.slice(0, 50)}...`
              : menuItem.name}
          </option>
        ))}
      </select> */}

      <SingleDishCardInfinity
        page={page}
        isLoading={isLoading}
        setPage={setPage}
        loadItems={menuItems}
        setPromotion={setSingleMenuItem}
        isMultiSelect={false}
        setGetSearchInput={setGetSearchInput}
        getSearchInput={getSearchInput}
        selectedRestarauntId={selectedRestarauntId}
        reward={reward?.items?.map((item) => item)}
      />
    </div>
  );
};

export default SingleDishCard;
