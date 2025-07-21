import React, { useState } from "react";
import toast from "react-hot-toast";
import { useGetRewardsGroupQuery } from "../../../redux/features/Rewards/rewardsApi";
import { useCreateRewardPointOfferMutation } from "../../../redux/features/loyaltyRewardPointOffer/loyaltyRewardPointOfferApi";
import { useGetAllRestaurantQuery } from "../../../redux/features/restaurentCreation/restaurentCreationApi";
import SingleModifierSelect from "../../Menus/AddEditMenus/Modal/SingleModifierSelect";

const RewardPointForm = ({ onSubmit, closeModal }) => {
  const [page, setPage] = useState(1);
  const [items, setItems] = useState([]);
  const [getSearchInput, setGetSearchInput] = useState("");
  const [restaurant, setRestaurant] = useState("");
  const [points, setPoints] = useState("");
  const [rewardGroupError, setRewardGroupError] = useState("");
  const { data: allRestaurant } = useGetAllRestaurantQuery();

  const { data: rewardData } = useGetRewardsGroupQuery(page);
  const [createRewardPointOfferMutation, { isLoading: isSubmitting }] =
    useCreateRewardPointOfferMutation();

  const handlePointsChange = (event) => {
    const inputValue = event.target.value;
    // Validate if the input value is a valid number
    if (!isNaN(inputValue) || inputValue === "") {
      setPoints(inputValue);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate if items is empty
    if (items.length === 0) {
      setRewardGroupError("Reward group is required");
      return;
    }

    const formattedData = {
      points_required: parseFloat(points),
      restaurant: parseInt(restaurant),
      reward_group: parseInt(items),
    };
    try {
      const { data } = await createRewardPointOfferMutation(
        formattedData
      ).unwrap();
      // console.log("Reward Point Offer created:", data);
      onSubmit();
      closeModal();
      setPoints("");
      setRestaurant("");
      setItems([]);
      toast.success("Reward Group Created Successfully");
    } catch (error) {
      console.error("Failed to create reward point offer:", error);
      //   toast.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} method="dialog">
      <label htmlFor="restaurant" className="text-sm text-left">
        Restaurant
      </label>
      <select
        id="restaurant"
        required
        name="restaurant"
        value={restaurant}
        onChange={(e) => setRestaurant(e.target.value)}
        className="select select-bordered w-full"
      >
        <option disabled value="">
          Select Restaurant
        </option>
        {allRestaurant?.results?.map((restaurant) => (
          <option key={restaurant.id} value={restaurant.id}>
            {restaurant.name}
          </option>
        ))}
      </select>
      <div className="mt-5">
        <label htmlFor="rewardGroup" className="text-sm text-left">
          Reward Group
        </label>
      </div>

      <SingleModifierSelect
        page={page}
        setPage={setPage}
        loadItems={rewardData}
        setPromotion={setItems}
        getSearchInput={getSearchInput}
        setGetSearchInput={setGetSearchInput}
      />

      {rewardGroupError && (
        <p className="text-red-500 text-sm pb-3 pt-1">{rewardGroupError}</p>
      )}

      <div className="mt-5">
        <label htmlFor="pointsRequired" className="text-sm text-left">
          Points Required
        </label>
      </div>
      <input
        required
        name="points"
        id="pointsRequired"
        className="input w-full"
        type="number"
        placeholder="Enter points required"
        value={points}
        onChange={handlePointsChange}
      />
      <button
        type="submit"
        className="btn btn-primary w-full mt-4"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Submitting..." : "Submit"}
      </button>
    </form>
  );
};

export default RewardPointForm;
