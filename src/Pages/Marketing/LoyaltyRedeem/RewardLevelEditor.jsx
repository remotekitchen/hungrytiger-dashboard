import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGetRewardsGroupQuery } from "../../../redux/features/Rewards/rewardsApi";
import SingleRewardInfinity from "../FissionCampaign/SingleRewardInfinity";
const RewardLevelEditor = ({
  rewardMin,
  setRewardMin,
  rewardMax,
  setRewardMax,
  rewards,
  setRewards,
  handleSubmit,
  restaurant,
  defaultValue,
  rewardLevel,
  setRewardLevel,
  getLevelError,
  isEditing,
}) => {
  const [page, setPage] = useState(1);

  /* Add new Reward adnan*/
  const [showAddRewardModal, setShowAddRewardModal] = useState(false);
  const [foundRewards, setFoundRewards] = useState([]);
  const [rewardStates, setRewardStates] = useState(
    rewards.map(() => ({
      applySevenPercent: false,
      customPoints: false,
    }))
  );
  const [itemPrice, setItemPrice] = useState([]);

  const { selectedRewards: selectedRewardsSelector } = useSelector(
    (state) => state.rewards
  );

  const { isRewardsEditing, rewardsDetails } = selectedRewardsSelector;

  /* end */

  const { data: rewardData } = useGetRewardsGroupQuery(page);

  // console.log("rewardData",rewardData)

  /* Reward points required should be automatic item base_price * 10 */
  const selectedOption = useSelector((state) => state.rewards.options);

  // // console.log("selectedOptionReward", selectedOption);

  // // console.log("rewardData", rewardData);

  useEffect(() => {
    if (restaurant && rewardData) {
      setRewards((prevRewards) => {
        return prevRewards.map((reward, index) => {
          let updatedReward = { ...reward };

          // Update the restaurant if it's provided
          updatedReward.restaurant = +restaurant;

          // Ensure selectedOption is an array and access the correct option for this reward
          const currentOption = selectedOption[index];

          if (currentOption) {
            // Find the selected reward in the rewardData results
            const foundReward = rewardData?.results?.find(
              (r) => r?.id === currentOption?.id
            );

            const foundRewardBasePrice =
              foundReward?.reward_set[0]?.item_details[0]?.base_price;

            // Store each reward's price separately in an array
            setItemPrice((prevPrices) => {
              const newPrices = [...prevPrices];
              newPrices[index] = foundRewardBasePrice || 0;
              return newPrices;
            });

            // Store each foundReward in an array based on index
            setFoundRewards((prevRewards) => {
              const newFoundRewards = [...prevRewards];
              newFoundRewards[index] = foundReward || null;
              return newFoundRewards;
            });

            if (foundRewardBasePrice && !rewardStates[index]?.customPoints) {
              let calculatedPrice;

              if (rewardStates[index]?.applySevenPercent) {
                // Calculate using the 7% logic
                calculatedPrice = foundRewardBasePrice / 0.07;
              } else {
                // Default calculation (base price * 10)
                calculatedPrice = foundRewardBasePrice * 10;
              }

              updatedReward.points_required = parseInt(calculatedPrice);
            }
          } else {
            updatedReward.points_required = 0;
          }

          return updatedReward;
        });
      });
    }
  }, [restaurant, selectedOption, rewardData, setRewards, rewardStates]);

  // // console.log("rewards", rewards);
  // // console.log("foundRewards", foundRewards);
  // // console.log("itemBasePrice", itemPrice);
  // // console.log("rewardState",rewardStates)

  // const handleApplyCalculation = (calculationType) => {
  //   if (calculationType === "default") {
  //     setApplySevenPercent(false);
  //     setCustomPoints(false);
  //   } else if (calculationType === "sevenPercent") {
  //     setApplySevenPercent(true);
  //     setCustomPoints(false);
  //   } else if (calculationType === "custom") {
  //     setCustomPoints(true);
  //     setApplySevenPercent(false);
  //   }
  // };

  const handleApplyCalculation = (index, type) => {
    setRewardStates((prevStates) =>
      prevStates.map((state, i) => {
        if (i === index) {
          if (type === "default") {
            return { applySevenPercent: false, customPoints: false };
          } else if (type === "sevenPercent") {
            return { applySevenPercent: true, customPoints: false };
          } else if (type === "custom") {
            return { applySevenPercent: false, customPoints: true };
          }
        }
        return state;
      })
    );
  };

  /* end */

  // const handleAddReward = () => {
  //   setRewards([
  //     ...rewards,
  //     { reward_group: "", points_required: 0, restaurant: +restaurant || 0 },
  //   ]);
  // };

  const handleAddReward = () => {
    setRewards((prevRewards) => {
      const updatedRewards = [
        ...prevRewards,
        { reward_group: "", points_required: 0, restaurant: +restaurant || 0 },
      ];

      // Update rewardStates to match the new length of rewards
      setRewardStates((prevStates) => [
        ...prevStates,
        { applySevenPercent: false, customPoints: false },
      ]);

      return updatedRewards;
    });
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

  /* reward points change automaticaly with reward level change */
  useEffect(() => {
    // Automatically update rewardMin and rewardMax based on rewardLevel
    const level = parseInt(rewardLevel);

    switch (level) {
      case 1:
        setRewardMin(1);
        setRewardMax(100);
        break;
      case 2:
        setRewardMin(201);
        setRewardMax(501);
        break;
      case 3:
        setRewardMin(502);
        setRewardMax(1500);
        break;
      case 4:
        setRewardMin(1501);
        setRewardMax(2500);
        break;
      case 5:
        setRewardMin(2501);
        setRewardMax(3500);
        break;
      case 6:
        setRewardMin(3501);
        setRewardMax(4500);
        break;
      case 7:
        setRewardMin(4501);
        setRewardMax(5500);
        break;
      default:
        setRewardMin("");
        setRewardMax("");
        break;
    }
  }, [rewardLevel, setRewardMin, setRewardMax]);

  // // console.log("rewardMin",rewardMin)
  // // console.log("rewardMax",rewardMax)
  /* end */

  const [singleReward, setSingleReward] = useState([]);
  // // console.log("🚀 ~ singleReward:", singleReward);
  // // console.log("🚀 ~ rewards", rewards);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleAddRewardClick = () => {
    navigate("/dashboard/rewards");
    setShowAddRewardModal(true);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full h-screen">
      <h3 className="font-bold text-2xl mb-3">Add Reward Point</h3>
      <div className="px-3">
        <div className="mb-3">
          <h4 className="font-bold">Set Reward Level</h4>
          <input
            type="number"
            name="rewardMin"
            defaultValue={rewardLevel}
            onChange={(e) => setRewardLevel(e.target.value)}
            className="input input-bordered w-1/4"
            placeholder="Set-Point"
          />
          <p className="text-red-500">{getLevelError}</p>
        </div>
        <div>
          <p className="font-bold">Reward Points Range:</p>
          <div className="flex gap-2 items-center">
            <input
              type="number"
              name="rewardMin"
              // defaultValue={defaultValue?.min_points}
              value={rewardMin}
              onChange={handleRewardRangeChange}
              className="input input-bordered w-1/4"
              placeholder="Min Point"
            />
            <span>to</span>
            <input
              type="number"
              name="rewardMax"
              // defaultValue={defaultValue?.max_points}
              value={rewardMax}
              onChange={handleRewardRangeChange}
              className="input input-bordered w-1/4"
              placeholder="Max Point"
              min={parseInt(rewardMin) + 1}
            />
          </div>
        </div>
        <div className="mt-4">
          {/* <p className="font-bold">Rewards</p> */}

          {/* end */}
          {rewards.map((reward, index) => (
            <div key={index} className="mt-4">
              <div className="flex justify-between items-center">
                <p className="font-bold">Reward {index + 1}</p>
                {rewards?.length > 1 && index != 0 && (
                  <span
                    onClick={() => handleRemoveReward(index)}
                    className="cursor-pointer p-2 rounded bg-gray-200"
                  >
                    X
                  </span>
                )}
              </div>

              <div className="">
                <SingleRewardInfinity
                  page={page}
                  setPage={setPage}
                  loadItems={rewardData}
                  isMultiSelect={false}
                  index={index}
                  setPromotion={setSingleReward}
                  handlePrizeSelect={handleInputChange}
                  restaurantId={restaurant}
                />
                <h1 className="text-center mt-2">
                  {foundRewards[index] ? (
                    `${foundRewards[index].name} Price : ${itemPrice[index]}`
                  ) : (
                    <></>
                  )}
                </h1>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <label
                  className={`btn mt-4 tracking-wide ${
                    rewardStates[index]?.applySevenPercent
                      ? "btn-gray"
                      : rewardStates[index]?.customPoints
                      ? "btn-gray"
                      : "btn-primary"
                  }`}
                  onClick={() => handleApplyCalculation(index, "default")}
                >
                  Default 10% Inflated Price
                </label>

                <label
                  className={`btn mt-4 tracking-wide ${
                    rewardStates[index]?.applySevenPercent
                      ? "btn-primary"
                      : rewardStates[index]?.customPoints
                      ? "btn-gray"
                      : "btn-gray"
                  }`}
                  onClick={() => handleApplyCalculation(index, "sevenPercent")}
                >
                  Apply 7% Inflated Price
                </label>

                <label
                  className={`btn mt-4 tracking-wide ${
                    rewardStates[index]?.customPoints
                      ? "btn-primary"
                      : "btn-gray"
                  }`}
                  onClick={() => handleApplyCalculation(index, "custom")}
                >
                  Custom Points
                </label>
              </div>

              <div className="mt-2">
                <h3>Redeem Points</h3>
                <input
                  type="number"
                  name="points_required"
                  value={reward?.points_required}
                  onChange={(e) =>
                    handleInputChange(
                      index,
                      "points_required",
                      parseInt(e.target.value)
                    )(e)
                  }
                  className="input input-bordered w-1/2"
                  placeholder="Redeem Points"
                  disabled={!rewardStates[index]?.customPoints}
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

export default RewardLevelEditor;
