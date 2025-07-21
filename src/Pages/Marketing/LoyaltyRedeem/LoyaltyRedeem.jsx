import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { createArray } from "../../../core/utils";
import {
  useAddLoyaltyRewardMutation,
  useDeleteLoyaltyRewardMutation,
  useGetLoyaltyRewardQuery,
  useUpdateLoyaltyRewardMutation,
} from "../../../redux/features/loyaltyReward/loyaltyReward";
import {
  useGetAllRestaurantQuery,
  useGetRestaurantDetailsQuery,
  useUpdateRestaurantMutation,
} from "../../../redux/features/restaurentCreation/restaurentCreationApi";
import RewardLevelEditor from "./RewardLevelEditor";
import RewardTable from "./RewardTable";

const LoyaltyRedeem = () => {
  const [restaurant, setRestaurant] = useState(0);
  const [page, setPage] = useState(1);
  const [dollarValues, setDollarValues] = useState();
  // // console.log("🚀 ~ LoyaltyRedeem ~ dollarValues:", dollarValues);
  const [rewardMin, setRewardMin] = useState("");
  const [rewardMax, setRewardMax] = useState("");
  const [rewardLevel, setRewardLevel] = useState();
  // // console.log("🚀 ~ LoyaltyRedeem ~ rewardLevel:", rewardLevel);
  const [getLevelError, setGetLevelError] = useState("");
  const [rewards, setRewards] = useState([
    { reward_group: 0, points_required: 0, restaurant: 0 },
  ]);
  // // console.log("🚀 ~ reward group ~ reward-groupppppppppp:", rewards);
  const [getRewardId, setGetRewardId] = useState();
  // // console.log("🚀 ~ LoyaltyRedeem ~ getRewardId:", getRewardId);
  const [isEditing, setIsEditing] = useState(false);
  // // console.log("Reward", rewards);

  const [updateRestaurant] = useUpdateRestaurantMutation();
  const { data: getRestaurant } = useGetRestaurantDetailsQuery(restaurant);

  const handleSaveDollarValue = async () => {
    try {
      await updateRestaurant({
        id: restaurant,
        editRestaurant: {
          reward_point_equivalent: dollarValues,
        },
      });
      toast.success("Reward point equivalent updated successfully");
    } catch (error) {
      toast.error("Failed to update reward point equivalent");
      console.error("Failed to update reward point equivalent:", error);
    }
  };

  useEffect(() => {
    if (getRestaurant?.reward_point_equivalent !== undefined) {
      setDollarValues(getRestaurant.reward_point_equivalent);
    }
  }, [getRestaurant]);

  const [selectedItems, setSelectedItems] = useState();
  const [isModalOpen, setIsModalOpen] = useState(false);

  // // console.log("🚀 ~ LoyaltyRedeem ~ Selected- items iddddddd:", selectedItems);
  // // console.log("🚀 ~ LoyaltyRedeem ~ isEditing:", isEditing);

  const [defaultValue, setDefaultValue] = useState({
    reward_manages: [],
    min_points: 0,
    max_points: 0,
    logo: null,
    background_image: null,
    restaurant: 0,
    reward_level: 1,
  });

  const { data: rewardPoints } = useGetLoyaltyRewardQuery({
    page: page,
    restaurantId: restaurant,
  });

  // // console.log("Reward-----Points", rewardPoints?.results);

  const { data: allRestaurant } = useGetAllRestaurantQuery();
  const [addLoyaltyReward] = useAddLoyaltyRewardMutation();
  const [updateLoyaltyReward] = useUpdateLoyaltyRewardMutation();
  const [deleteReward] = useDeleteLoyaltyRewardMutation();

  const modalRef = useRef(null);

  useEffect(() => {
    if (allRestaurant?.results && allRestaurant.results.length > 0) {
      setRestaurant(allRestaurant.results[0].id);
    }
  }, [allRestaurant]);

  useEffect(() => {
    // setIsEditing(!!selectedItems && isModalOpen);
    if (selectedItems && isModalOpen) {
      setIsEditing(true);
    } else {
      setIsEditing(false);
    }
  }, [selectedItems, isModalOpen]);

  useEffect(() => {
    if (isEditing) {
      const selectedReward = rewardPoints?.results?.find(
        (reward) => reward.id === selectedItems
      );

      // // console.log("Selected-reward-inside", selectedReward);

      if (selectedReward) {
        setDefaultValue({
          reward_manages: selectedReward.reward_manages || [],
          min_points: selectedReward.min_points || 0,
          max_points: selectedReward.max_points || 0,
          logo: selectedReward.logo || null,
          background_image: selectedReward.background_image || null,
          restaurant: selectedReward.restaurant || 0,
          reward_level: selectedReward.reward_level || 1,
        });
        setRewards(selectedReward.reward_manages);
      }
    } else {
      setDefaultValue({
        reward_manages: [],
        min_points: 0,
        max_points: 0,
        logo: null,
        background_image: null,
        restaurant: 0,
        reward_level: 1,
      });
    }
  }, [isEditing, selectedItems, rewardPoints]);

  const handleAddRewardPoint = () => {
    setIsModalOpen(true);
    modalRef.current.showModal();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    modalRef.current.close();
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

    // // console.log("dataaaa---from create modal", formattedData);

    try {
      // Check if rewardLevel is already created
      const isRewardExist = rewardPoints?.results?.find(
        (r) => r.reward_level == rewardLevel
      );

      if (isRewardExist) {
        toast.error("This reward level is already created");
        setGetLevelError("This reward level is already created");
        return;
      }

      // if (isEditing) {
      //   // If editing, call the update mutation
      //   const result = await updateLoyaltyReward({
      //     id: selectedItems,
      //     data: formattedData,
      //   }).unwrap();
      //   toast.success("Loyalty reward updated successfully");
      //   // console.log("Loyalty reward updated successfully:", result);
      // } else {
      //   // If not editing, call the add mutation
      //   const result = await addLoyaltyReward(formattedData).unwrap();
      //   toast.success("Loyalty reward created successfully");
      //   // console.log("Loyalty reward created successfully:", result);
      // }
      const result = await addLoyaltyReward(formattedData).unwrap();
      toast.success("Loyalty reward created successfully");
      // // console.log("Loyalty reward created successfully:", result);

      handleCloseModal();
    } catch (error) {
      toast.error("Failed to save loyalty reward");
      console.error("Failed to save loyalty reward:", error);
    }
  };

  // const handleSaveDollarValue = () => {
  //   setDollarValues((prev) => ({
  //     ...prev,
  //     [restaurant]: dollarValues[restaurant],
  //   }));
  // };

  const handleDollarValueChange = (e) => {
    const value = e.target.value;
    setDollarValues((prev) => ({
      ...prev,
      [restaurant]: value,
    }));
  };

  const handleDeleteReward = async (id) => {
    try {
      await deleteReward(id).unwrap();
      toast.success("Loyalty reward deleted successfully");
      // // console.log("Loyalty reward deleted successfully");
      // Optionally, you can reset the selected item or perform any other necessary actions here
    } catch (error) {
      toast.error("Failed to delete loyalty reward");
      console.error("Failed to delete loyalty reward:", error);
    }
  };

  // filter selected reward and get the first object
  const [filteredReward] =
    rewardPoints?.results?.filter((reward) => reward?.id === getRewardId) || [];

  // // console.log("🚀 ~ LoyaltyRedeem ~ filteredRewards:", filteredReward);
  const pageArr = rewardPoints?.results ? createArray(rewardPoints) : [];

  return (
    <section className="px-3 py-10">
      <div>
        <h1 className="text-4xl font-bold mb-4">Loyalty Point Rewards</h1>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
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
          </div>
          {restaurant && (
            <div className="flex items-center gap-2">
              <span>$1=</span>
              <input
                onChange={(e) => setDollarValues(e?.target?.value)}
                type="text"
                value={dollarValues}
                className="input input-bordered w-20"
              />
              <button
                onClick={handleSaveDollarValue}
                className="btn btn-primary"
              >
                Save
              </button>
            </div>
          )}
        </div>
      </div>
      {/* Modal */}
      <dialog ref={modalRef} className="modal" id="my_modal_3">
        <div className="modal-box">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={handleCloseModal}
          >
            ✕
          </button>
          <div className="pb-4">
            <RewardLevelEditor
              handleSubmit={handleSubmit}
              closeModal={handleCloseModal}
              rewardMin={rewardMin}
              setRewardMin={setRewardMin}
              rewardMax={rewardMax}
              setRewardMax={setRewardMax}
              rewards={rewards}
              setRewards={setRewards}
              restaurant={restaurant}
              defaultValue={defaultValue}
              rewardLevel={rewardLevel}
              setRewardLevel={setRewardLevel}
              getLevelError={getLevelError}
              isEditing={isEditing}
            />
          </div>
        </div>
      </dialog>

      {/* Reward table */}
      <div>
        <div className="mt-5">
          <div className="overflow-x-auto">
            <table className="table">
              {/* Table head */}
              <thead>
                <tr className="font-bold text-sm text-black">
                  <th>Level</th>
                  <th>Point Range</th>
                  <th>Number Of Rewards</th>
                  <th>Created Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              {/* table body */}
              {rewardPoints?.results?.map((rewardPoint) => (
                <RewardTable
                  setSelectedItems={setSelectedItems}
                  handleAddRewardPoint={handleAddRewardPoint}
                  rewardPoint={rewardPoint}
                  key={rewardPoint?.id}
                  handleDeleteReward={handleDeleteReward}
                  handleSubmit={handleSubmit}
                  closeModal={handleCloseModal}
                  rewardMin={rewardMin}
                  setRewardMin={setRewardMin}
                  rewardMax={rewardMax}
                  setRewardMax={setRewardMax}
                  rewards={rewards}
                  setRewards={setRewards}
                  restaurant={restaurant}
                  defaultValue={defaultValue}
                  rewardLevel={rewardLevel}
                  setRewardLevel={setRewardLevel}
                  getLevelError={getLevelError}
                  isEditing={isEditing}
                  setIsEditing={setIsEditing}
                  getRewardId={getRewardId}
                  setGetRewardId={setGetRewardId}
                  filteredReward={filteredReward}
                />
              ))}
            </table>
          </div>
        </div>
      </div>
      {/* pagination  */}
      <div className="w-10/12 mt-10">
        {pageArr && (
          <div className="join flex-wrap">
            {pageArr.map((getPage) => (
              <button
                onClick={() => {
                  setPage(getPage);
                }}
                key={getPage}
                className={`join-item my-1 btn btn-sm ${
                  page === getPage && "btn-active"
                }`}
              >
                {getPage}
              </button>
            ))}
          </div>
        )}
      </div>
      {/* Add Reward Point Button */}
      <div className="mt-10 flex justify-between items-center">
        <button
          disabled={!restaurant}
          onClick={handleAddRewardPoint}
          className={`btn btn-primary ${
            !restaurant ? "cursor-not-allowed" : "cursor-pointer"
          } `}
        >
          <span className="font-bold">+</span> <span>Add New Level</span>
        </button>
      </div>
    </section>
  );
};

export default LoyaltyRedeem;
