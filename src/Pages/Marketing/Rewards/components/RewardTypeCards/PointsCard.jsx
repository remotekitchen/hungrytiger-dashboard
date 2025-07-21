import React from "react";

const PointsCard = ({
  handleRewardChange,
  index,
  reward,
  setRewards,
  selectedRestarauntId,
}) => {
  return (
    <div className="my-2 px-2">
      <label htmlFor="points">Number Of Points</label>
      <input
        required
        name="reward_points_worth"
        type="number"
        placeholder="Reward Points"
        className="input input-bordered w-full"
        defaultValue={reward?.loyalty_point}
        onChange={(e) =>
          handleRewardChange(
            index,
            "reward_points_worth",
            parseInt(e.target.value)
          )
        }
      />
    </div>
  );
};

export default PointsCard;
