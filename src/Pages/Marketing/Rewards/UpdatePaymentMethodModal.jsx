import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useUpdateRewardGroupMutation } from "../../../redux/features/Rewards/rewardsApi";

const UpdatePaymentMethodModal = ({ rewardIdData }) => {
  // console.log(rewardIdData, "rewardDataddd");

  const [selectedMethods, setSelectedMethods] = useState([]);

  const [updateRewards] = useUpdateRewardGroupMutation();

  const handleCheckboxChange = (method) => {
    setSelectedMethods((prev) => ({
      ...prev,
      [method]: !prev[method],
    }));
  };

  const handleSubmit = async () => {
    const selectedValues = Object.keys(selectedMethods).filter(
      (method) => selectedMethods[method]
    );

    // // console.log("Selected Methods:", selectedValues);

    try {
      await updateRewards({
        id: rewardIdData?.id,
        rewardsItem: {
          applies_for: selectedValues,
        },
      });
      toast.success("Reward updated successfully");
      // Close the modal
      document.getElementById("my_modal_2").close();
    } catch (error) {
      console.error("Failed to update reward", error);
    }
  };

  // set Default value for all checkbox / payment method
  useEffect(() => {
    if (rewardIdData && rewardIdData.applies_for) {
      setSelectedMethods({
        delivery: rewardIdData.applies_for.includes("delivery"),
        pickup: rewardIdData.applies_for.includes("pickup"),
        dine_in: rewardIdData.applies_for.includes("dine_in"),
      });
    }
  }, [rewardIdData]);
  return (
    <dialog id="my_modal_2" className="modal">
      <div className="modal-box w-72">
        <h2 className="text-xl font-bold">Edit Payment Method</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          <label className="flex items-center gap-2 cursor-pointer mb-4">
            <span className="label-text text-lg">Delivery</span>
            <input
              type="checkbox"
              checked={selectedMethods.delivery}
              onChange={() => handleCheckboxChange("delivery")}
              className="checkbox checkbox-primary"
              value="delivery"
            />
          </label>
          <label className="flex items-center gap-3 cursor-pointer mb-4">
            <span className="label-text text-lg">Pickup</span>
            <input
              type="checkbox"
              checked={selectedMethods.pickup}
              onChange={() => handleCheckboxChange("pickup")}
              className="checkbox checkbox-primary"
              value="pickup"
            />
          </label>
          <label className="flex items-center gap-3 cursor-pointer mb-4">
            <span className="label-text text-lg">Dine In</span>
            <input
              type="checkbox"
              checked={selectedMethods.dine_in}
              onChange={() => handleCheckboxChange("dine_in")}
              className="checkbox checkbox-primary"
              value="dine_in"
            />
          </label>
          <button
            className="w-full mt-4 py-2 rounded-xl bg-blue-400"
            onClick={handleSubmit}
          >
            Submit
          </button>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default UpdatePaymentMethodModal;
