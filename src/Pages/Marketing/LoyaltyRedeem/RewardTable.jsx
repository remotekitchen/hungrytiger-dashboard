import React from "react";
import { BiEdit } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";
import UpdateRewardLevel from "./UpdateRewardLevel";

const RewardTable = ({
  rewardPoint,
  handleDeleteReward,
  restaurant,
  getRewardId,
  setGetRewardId,
  isEditing,
  setIsEditing,
  filteredReward,
}) => {
  const openModal = (id) => {
    document.getElementById("my_modal_6").showModal();
    setGetRewardId(id);
    setIsEditing(true);
  };

  const closeModal = () => {
    document.getElementById("my_modal_6").close();
    setIsEditing(false);
  };

  return (
    <>
      <tbody className="font-medium">
        <tr>
          <td>
            {rewardPoint?.reward_level
              ? rewardPoint?.reward_level
              : "Unknown Reward Level"}
          </td>
          <td>{`${rewardPoint?.min_points} - ${rewardPoint?.max_points}`}</td>
          <td>{rewardPoint?.reward_manages?.length}</td>
          <td>{rewardPoint?.created_date?.slice(0, 10)}</td>
          <td>
            <span className="mb-2 flex items-center cursor-pointer">
              <BiEdit
                onClick={() => openModal(rewardPoint?.id)}
                className="text-xl text-[#697077] cursor-pointer"
              />
              <MdDeleteOutline
                onClick={() => handleDeleteReward(rewardPoint?.id)}
                className="text-xl text-[#697077] ml-3 cursor-pointer"
              />
            </span>
          </td>
        </tr>
      </tbody>

      <dialog id="my_modal_6" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={closeModal}
            >
              ✕
            </button>
          </form>

          <UpdateRewardLevel
            restaurant={restaurant}
            rewardId={getRewardId}
            rewardPoint={rewardPoint}
            isEditing={isEditing}
            filteredReward={filteredReward}
            closeModal={closeModal}
          />
        </div>
      </dialog>
    </>
  );
};

export default RewardTable;
