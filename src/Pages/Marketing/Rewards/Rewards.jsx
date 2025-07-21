import React, { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { FaRegEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import {
  useDeleteRewardsMutation,
  useGetRewardsGroupWithoutPaginationQuery,
} from "../../../redux/features/Rewards/rewardsApi";
import { selectedRewards } from "../../../redux/features/Rewards/rewardsSlice";
import AddRewardsModal from "./AddRewardsModal";
import EditRewardsModal from "./EditRewardsModal";
import UpdatePaymentMethodModal from "./UpdatePaymentMethodModal";

const Rewards = () => {
  const [searchInput, setSearchInput] = useState("");
  const [rewardData, setRewardData] = useState();
  // console.log('🚀 ~ Rewards ~ rewardData:', rewardData);
  // console.log('🚀 ~ Rewards ~ searchInput:', searchInput);
  const [selectedPage, setSelectedPage] = useState(1);
  const [showAddRewardModal, setShowAddRewardModal] = useState(false);
  /* for toggle reward show and hide */
  const [restore, setRestore] = useState(false);
  const [hiddenRewards, setHiddenRewards] = useState({});
  const [deletedRewards, setDeletedRewards] = useState([]);
  const [rewardId, setRewardId] = useState(0);
  const [expandedRewardId, setExpandedRewardId] = useState(null);
  const [expandedDescriptionId, setExpandedDescriptionId] = useState(null);

  const handleNameClick = (id) => {
    setExpandedRewardId(expandedRewardId === id ? null : id);
  };

  const handleDescriptionClick = (id) => {
    setExpandedDescriptionId(expandedDescriptionId === id ? null : id);
  };
  // Function to handle delete
  // const handleDelete = (rewardId) => {
  //   const rewardToDelete = rewardData?.results?.find(
  //     (reward) => reward.id === rewardId
  //   );
  //   setDeletedRewards((prev) => [...prev, rewardToDelete]);
  //   setHiddenRewards((prev) => ({ ...prev, [rewardId]: true }));
  // };

  // Function to handle restore
  const handleRestore = (rewardId) => {
    const rewardToRestore = deletedRewards.find(
      (reward) => reward.id === rewardId
    );
    setDeletedRewards((prev) =>
      prev.filter((reward) => reward.id !== rewardId)
    );
    setHiddenRewards((prev) => ({ ...prev, [rewardId]: false }));
    setRestore((prevRestore) => !prevRestore);
  };

  /* end */

  // const [showAddRewardModal, setShowAddRewardModal] = useState(false);
  const [sRewards, setSRewards] = useState({});
  const dispatch = useDispatch();
  const { selectedRewards: selectedRewardsSelector } = useSelector(
    (state) => state.rewards
  );

  const { isEditing, rewardsDetails } = selectedRewardsSelector;

  // const {
  //   data: rewardData,
  //   isLoading,
  //   isError,
  //   error,
  // } = useGetRewardsGroupQuery(selectedPage);
  // V2 Api for getting rewards group without pagination
  const {
    data: rewardDataWithoutPagination,
    isLoading,
    isError,
    error,
  } = useGetRewardsGroupWithoutPaginationQuery();
  //   console.log(
  //     "🚀 ~ Rewards ~ rewardDataWithoutPagination:",
  //     rewardDataWithoutPagination
  //   );

  useEffect(() => {
    if (rewardDataWithoutPagination) {
      setRewardData(
        rewardDataWithoutPagination?.filter((rewards) =>
          rewards?.name?.toLowerCase().includes(searchInput.toLowerCase())
        )
      );
    }
  }, [rewardDataWithoutPagination, searchInput]);
  // console.log("rewardSRewardData", rewardData?.results);

  const [deleteReward] = useDeleteRewardsMutation();
  // if (isLoading) return <Loading />;

  // const pageArr = createArray(rewardData);

  // Function to handle delete action
  const handleDelete = (rewardId) => {
    // console.log("Reward Id", rewardId);

    Swal.fire({
      title: "Do you want to delete this reward?",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#6c757d",
    }).then((result) => {
      if (result.isConfirmed) {
        const data = {
          deleted: true,
        };
        deleteReward({ rewardId, data });
        // console.log("Deleting reward with ID:", rewardId);
      }
    });
  };

  // Function to handle edit action
  const handleEdit = (rewards) => {
    // console.log("rewards", rewards);
    setSRewards(rewards);

    dispatch(
      selectedRewards({ isEditing: true, selectedRewardsData: rewards })
    );
    setShowAddRewardModal(true);
  };

  // Render Validity based on reward validity type
  const renderValidity = (rewards) => {
    if (rewards?.validity_type === "unlimited") {
      return rewards?.validity_type;
    } else if (rewards?.validity_type === "special_date") {
      return rewards?.validity_date;
    } else if (rewards?.validity_type === "days_after_rewarded") {
      const createdDate = new Date(rewards?.created_date);
      const validityEndDate = new Date(
        createdDate.getTime() + rewards?.validity_days * 24 * 60 * 60 * 1000
      );
      const currentDate = new Date();
      const timeDiff = validityEndDate.getTime() - currentDate.getTime();
      const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));
      if (daysLeft < 0) {
        return "Expired";
      } else {
        return `${daysLeft} days left`;
      }
    } else {
      return "";
    }
  };

  // // console.log("isEditing", isEditing)

  const handleRewardModal = (sRewards) => {
    dispatch(
      selectedRewards({ isEditing: false, selectedRewardsData: sRewards })
    );
    setShowAddRewardModal(true);
  };

  // update paymentMethod status
  const handleUpdatePaymentMethod = (reward) => {
    document.getElementById("my_modal_2").showModal();
    setRewardId(reward);
  };

  // edit reward modal functionality
  const handleEditReward = (reward) => {
    document.getElementById("my_modal_25").showModal();
    setRewardId(reward);
  };

  //   console.log(rewardId, "rewardId");

  return (
    <div className="">
      <h1 className="text-4xl font-bold mt-4">Rewards</h1>
      <div className="flex justify-between items-center my-3">
        <label
          onClick={handleRewardModal}
          htmlFor={
            isEditing
              ? `add_reward_modal_${rewardsDetails.id}`
              : "add_reward_modal_"
          }
          className="btn bg-[#42C2FF] text-white px-4 py-2 rounded-lg"
        >
          + New Reward
        </label>
        <div className="flex items-center mr-5">
          <div className="relative">
            <input
              onChange={(e) => setSearchInput(e.target.value)}
              type="text"
              placeholder="Search..."
              className="border rounded-l-lg p-1 outline-none px-10 w-[250px]"
            />
            <div className=" absolute top-1 right-3">
              <BiSearch className="text-2xl text-[#697077]" />
            </div>
          </div>
        </div>

        {/* This is for later Restoring the reward */}

        {/* <label
          onClick={handleRestore}
          // htmlFor={
          //   isEditing
          //     ? `add_reward_modal_${rewardsDetails.id}`
          //     : "add_reward_modal_"
          // }
          className="btn bg-[#42C2FF] text-white px-4 py-2 rounded-lg"
        >
          Restore
        </label> */}
      </div>
      <div className="border-2 border-gray-200">
        {/* reward heading  */}
        <div>
          <div className="grid grid-cols-7 font-bold bg-gray-200 p-2">
            <span>Reward Name</span>
            <span>Description</span>
            <span>Restaurant</span>
            <span>Number of Rewards </span>
            <span>Validity</span>
            <span>Created Date</span>
            {/* <span>Payment</span> */}
            <span>Action</span>
          </div>
        </div>
        {/* reward details  */}

        <div className="p-3">
          {rewardData
            ?.filter((d) => d?.restaurant) // Filter to only include items with a valid restaurant
            ?.map((rewards) => (
              <div
                className="border-2 rounded mb-1 px-1 bg-gray-200 hover:bg-gray-300"
                key={rewards?.id}
              >
                <div className="grid grid-cols-7">
                  {/* For Name */}
                  <span
                    className="mb-2 cursor-pointer"
                    onClick={() => handleNameClick(rewards?.id)}
                  >
                    {expandedRewardId === rewards?.id ? (
                      rewards?.name
                    ) : rewards?.name?.length > 17 ? (
                      <>
                        {rewards.name.slice(0, 17)}
                        <span className="text-blue-500 font-bold">
                          ...
                        </span>{" "}
                        {/* Blue colored dots */}
                      </>
                    ) : (
                      rewards?.name
                    )}
                  </span>

                  {/* For Description */}
                  <span
                    className="mb-2 cursor-pointer"
                    onClick={() => handleDescriptionClick(rewards?.id)}
                  >
                    {expandedDescriptionId === rewards?.id ? (
                      rewards?.description
                    ) : rewards?.description?.length > 17 ? (
                      <>
                        {rewards.description.slice(0, 17)}
                        <span className="text-blue-500 font-bold">
                          ...
                        </span>{" "}
                        {/* Blue colored dots */}
                      </>
                    ) : (
                      rewards?.description
                    )}
                  </span>
                  <span className="mb-2">{rewards?.restaurant}</span>
                  <span className="mb-2">{rewards?.reward_set?.length}</span>
                  <span className="mb-2">{renderValidity(rewards)}</span>
                  <span className="mb-2">
                    {rewards?.created_date?.slice(0, 10)}
                  </span>
                  {/* only update payment method - delivery/pickup/dine_in  */}
                  {/* <span
            onClick={() => handleUpdatePaymentMethod(rewards)}
            className="mb-2 flex gap-2 items-center"
          >
            <FaRegEdit className="text-2xl ml-5 hover:text-blue-400 cursor-pointer" />
          </span> */}
                  <span className="mb-2 flex items-center">
                    <FaRegEdit
                      onClick={() => handleEditReward(rewards)}
                      className="text-2xl text-[#697077] ml-3 cursor-pointer"
                    />
                    <MdDeleteOutline
                      className="text-2xl text-[#697077] ml-3 cursor-pointer"
                      onClick={() => handleDelete(rewards?.id)}
                    />
                  </span>
                </div>
              </div>
            ))}
        </div>
      </div>

      <div
        className={`w-full flex justify-center items-center bg-white ${
          isLoading || rewardData?.length === 0 ? "h-96" : ""
        }`}
      >
        {isLoading ? (
          <img className="h-36" src="/searching.gif" alt="loading/image" />
        ) : (
          rewardData?.length === 0 && (
            <div>
              <div className="flex flex-col items-center w-full justify-center">
                <img className="h-36" src="/not_found.png" alt="" />
                <h1 className="text-4xl my-3 font-bold text-[#4E5E8C]">
                  SORRY!
                </h1>
              </div>
              <span className="font-medium">
                {" "}
                No results found {searchInput && "on this name"}
              </span>
              {searchInput && (
                <span className="font-semibold px-2 border-2 ml-3 border-gray-500 rounded">
                  {searchInput}
                </span>
              )}
            </div>
          )
        )}
      </div>

      {/* The payment method update modal code */}
      <UpdatePaymentMethodModal rewardIdData={rewardId} />
      {/* Edit reward modal code */}
      <EditRewardsModal rewardIdData={rewardId} />
      {/* <div className="mt-3">
        {!restore
          ? rewardData?.results?.map((rewards) => (
              <div key={rewards?.id}>
                {!hiddenRewards[rewards?.id] && (
                  <div className="grid grid-cols-7">
                    <span className="mb-2">{rewards?.name}</span>
                    <span className="mb-2">{rewards?.description}</span>
                    <span className="mb-2">{rewards?.restaurant}</span>
                    <span className="mb-2">{rewards?.reward_set?.length}</span>
                    <span className="mb-2">{renderValidity(rewards)}</span>
                    <span className="mb-2">
                      {rewards?.created_date.slice(0, 10)}
                    </span>
                    <span className="mb-2 flex items-center">
                      <MdDeleteOutline
                        className="text-xl text-[#697077] ml-3 cursor-pointer"
                        onClick={() => handleDelete(rewards?.id)}
                      />
                    </span>
                  </div>
                )}
              </div>
            ))
          : deletedRewards.length > 0 && (
              <div className="mt-3">
                <h2>Deleted Rewards</h2>
                {deletedRewards.map((reward) => (
                  <div key={reward.id} className="grid grid-cols-7">
                    <span className="mb-2">{reward.name}</span>
                    <span className="mb-2">{reward.description}</span>
                    <span className="mb-2">{reward.restaurant}</span>
                    <span className="mb-2">{reward.reward_set?.length}</span>
                    <span className="mb-2">{renderValidity(reward)}</span>
                    <span className="mb-2">
                      {reward.created_date.slice(0, 10)}
                    </span>
                    <span className="mb-2 flex items-center">
                      <MdSettingsBackupRestore
                        className="text-xl text-[#697077] ml-3 cursor-pointer"
                        onClick={() => handleRestore(reward.id)}
                      />
                    </span>
                  </div>
                ))}
              </div>
            )}
      </div> */}

      {showAddRewardModal && (
        <AddRewardsModal
          sRewards={sRewards}
          isEditing={isEditing}
          rewardsDetails={rewardsDetails}
          showAddRewardModal={showAddRewardModal}
          setShowAddRewardModal={setShowAddRewardModal}
          count={rewardData?.count}
        />
      )}

      {/* pagination  */}
      {/* <div className="w-10/12 mt-10">
        {pageArr && (
          <div className="join flex-wrap">
            {pageArr.map((page) => (
              <button
                onClick={() => {
                  setSelectedPage(page);
                }}
                key={page}
                className={`join-item my-1 btn btn-sm ${
                  selectedPage === page && "btn-active"
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        )}
      </div> */}
    </div>
  );
};

export default Rewards;
