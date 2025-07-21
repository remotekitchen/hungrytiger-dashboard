import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useGetRewardsGroupQuery } from "../../../redux/features/Rewards/rewardsApi";
import {
  useGetLoyaltyRewardQuery,
  useUpdateLoyaltyRewardMutation,
} from "../../../redux/features/loyaltyReward/loyaltyReward";
import SingleRewardInfinity from "../FissionCampaign/SingleRewardInfinity";

const UpdateRewardLevel = ({
  restaurant,
  rewardId,
  rewardPoint,
  isEditing,
  filteredReward,
  closeModal,
}) => {
  // console.log("🚀 ~ filteredReward---from edit modal:", filteredReward);
  const [rewardMin, setRewardMin] = useState(0);
  const [rewardMax, setRewardMax] = useState(0);
  const [rewards, setRewards] = useState([
    { reward_group: "", points_required: 0, restaurant: 0 },
  ]);
  const [rewardLevel, setRewardLevel] = useState(0);
  const [getLevelError, setGetLevelError] = useState("");
  const [page, setPage] = useState(1);
  const [singleReward, setSingleReward] = useState([]);
  const { data: rewardData } = useGetRewardsGroupQuery(page);
  const { data: rewardPoints } = useGetLoyaltyRewardQuery({
    page: page,
    restaurantId: restaurant,
  });

  const [updateLoyaltyReward] = useUpdateLoyaltyRewardMutation();

  useEffect(() => {
    if (restaurant) {
      setRewards((prevRewards) =>
        prevRewards.map((reward) => ({
          ...reward,
          restaurant: +restaurant,
        }))
      );
    }
  }, [restaurant]);

  useEffect(() => {
    if (filteredReward) {
      setRewardMin(filteredReward?.min_points);
      setRewardMax(filteredReward?.max_points);
      setRewardLevel(filteredReward?.reward_level);
      if (filteredReward?.reward_manages?.length > 0) {
        setRewards(filteredReward?.reward_manages);
      } else if (filteredReward?.reward_manages?.length < 1) {
        setRewards([{ reward_group: "", points_required: 0, restaurant: 0 }]);
      }
    }
  }, [rewardId, filteredReward]);

  const handleAddReward = () => {
    setRewards([
      ...rewards,
      { reward_group: "", points_required: 0, restaurant: +restaurant || 0 },
    ]);
  };

  const handleRemoveReward = (index) => {
    const updatedRewards = rewards.filter((_, i) => i !== index);
    setRewards(updatedRewards);
  };

  const handleInputChange = (index, field, value) => {
    const newPrizes = [...rewards];
    newPrizes[index][field] = value;
    setRewards(newPrizes);
  };

  const handleRewardRangeChange = (e) => {
    const { name, value } = e.target;
    if (name === "rewardMin") {
      setRewardMin(value);
    } else if (name === "rewardMax") {
      setRewardMax(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formattedData = {
      reward_manages: rewards || [],
      min_points: +rewardMin || 0,
      max_points: +rewardMax || 0,
      logo: null,
      background_image: null,
      restaurant: parseInt(restaurant) || 0,
      reward_level: parseInt(rewardLevel) || 0,
    };

    // const isRewardLevelExist = rewardPoints?.results?.find(
    //   (r) => r.reward_level == rewardLevel
    // );

    // if (isRewardLevelExist) {
    //   toast.error("This reward level is already created");
    //   setGetLevelError("This reward level is already created");
    //   return;
    // }

    const result = await updateLoyaltyReward({
      id: rewardId,
      data: formattedData,
    }).unwrap();
    toast.success("Loyalty reward updated successfully");
    // console.log("Loyalty reward updated successfully:", result);
    closeModal();
  };

  // // console.log("rewards",rewards)

  return (
    <form onSubmit={handleSubmit}>
      <h3 className="font-bold text-2xl mb-3">Edit Reward Point</h3>
      <div className="px-3">
        <div className="mb-3">
          <h4 className="font-bold">Set Reward Level</h4>
          <input
            type="number"
            name="rewardLevel"
            value={rewardLevel}
            onChange={(e) => setRewardLevel(e.target.value)}
            className="input input-bordered w-1/4"
            placeholder="Set-Point"
          />
          <p className="text-red-500">{getLevelError}</p>
        </div>
        <div>
          <p className="font-bold">Reward Range:</p>
          <div className="flex gap-2 items-center">
            <input
              type="number"
              name="rewardMin"
              value={rewardMin}
              onChange={handleRewardRangeChange}
              className="input input-bordered w-1/4"
              placeholder="Min Point"
            />
            <span>to</span>
            <input
              type="number"
              name="rewardMax"
              value={rewardMax}
              onChange={handleRewardRangeChange}
              className="input input-bordered w-1/4"
              placeholder="Max Point"
              min={parseInt(rewardMin) + 1}
            />
          </div>
        </div>
        <div className="mt-4">
          <p className="font-bold">Rewards:</p>
          {rewards.map((reward, index) => (
            <div key={index} className="mt-4">
              <div className="flex justify-between items-center">
                <p className="font-bold">Reward {index + 1}</p>
                {rewards?.length > 1 && index !== 0 && (
                  <span
                    onClick={() => handleRemoveReward(index)}
                    className="cursor-pointer p-2 rounded bg-gray-200"
                  >
                    X
                  </span>
                )}
              </div>

              <span className="px-2 py-1 mt-2 inline-block bg-pink-100 rounded-xl">
                {reward?.reward_group_details?.name
                  ? reward?.reward_group_details?.name
                  : ""}
              </span>

              <SingleRewardInfinity
                page={page}
                setPage={setPage}
                loadItems={rewardData}
                isMultiSelect={false}
                index={index}
                setPromotion={setSingleReward}
                handlePrizeSelect={handleInputChange}
              />

              <div className="mt-2">
                <input
                  type="number"
                  name="points_required"
                  value={reward.points_required}
                  onChange={(e) =>
                    handleInputChange(
                      index,
                      "points_required",
                      parseInt(e.target.value)
                    )
                  }
                  className="input input-bordered w-1/2"
                  placeholder="Redeem Points"
                />
              </div>
              <div className="mt-2">
                {index === rewards.length - 1 && (
                  <button
                    type="button"
                    onClick={handleAddReward}
                    className="btn btn-primary"
                  >
                    Add More Reward
                  </button>
                )}
                {index !== rewards.length - 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveReward(index)}
                    className="btn btn-danger"
                  >
                    Remove
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 flex justify-end">
          <button type="submit" className="btn btn-success">
            Save
          </button>
        </div>
      </div>
    </form>
  );
};

export default UpdateRewardLevel;
