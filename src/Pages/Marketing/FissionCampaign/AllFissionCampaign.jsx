import React, { useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { FiSave } from "react-icons/fi";
const AllFissionCampaign = ({
  restaurantList,
  allCampaigns,
  setRestaurantIdAllcampaign,
  restaurantIdAllcampaign,
}) => {
  // edit data
  const [editingPrizeId, setEditingPrizeId] = useState(null);
  const toggleEditMode = (prizeId) => {
    setEditingPrizeId(editingPrizeId === prizeId ? null : prizeId);
  };
  const [editedValues, setEditedValues] = useState({});
  const handleFieldChange = (prizeId, fieldName, value) => {
    setEditedValues({
      ...editedValues,
      [prizeId]: {
        ...editedValues[prizeId],
        [fieldName]: value,
      },
    });
  };

  const saveChanges = (prizeId) => {
    const savedData = editedValues[prizeId];

    // Format the data as required
    const formattedData = {
      id: prizeId,
      prize_name: savedData?.prize_name || "",
      amount: savedData?.amount || 0,
      probability: savedData?.probability || 0,
    };

    setEditingPrizeId(null);
    // Other actions after save...
  };
  return (
    <div className="border lg:w-3/4 p-5 bg-white shadow-lg rounded-md mt-6 mb-12 h-[500px] overflow-auto">
      <h1 className="text-2xl font-bold mb-4">All Campaigns</h1>
      <div className="my-6">
        <label className="block text-lg font-medium text-gray-700">
          Restaurant*
        </label>
        <select
          onChange={(e) => setRestaurantIdAllcampaign(e.target.value)}
          id="restaurant"
          className="select select-bordered w-full"
        >
          <option selected disabled>
            Select Restaurant
          </option>
          {restaurantList?.results.map((restaurant) => (
            <option key={restaurant.id} value={restaurant.id}>
              {restaurant.name}
            </option>
          ))}
        </select>
      </div>
      {allCampaigns?.map((prize, index) => (
        <div key={index}>
          <div>
            <div className="flex items-center my-3">
              <h1 className="text-xl font-bold capitalize">
                {prize?.prize_details[0]?.prize_name}
              </h1>
              <div>
                {editingPrizeId === prize.id ? (
                  <button
                    onClick={() => saveChanges(prize.id)}
                    className="btn bg-white mx-2 btn-sm"
                  >
                    <FiSave />
                  </button>
                ) : (
                  <button
                    onClick={() => toggleEditMode(prize.id)}
                    className="btn bg-white mx-2 btn-sm"
                  >
                    <FaPencilAlt />
                  </button>
                )}
              </div>
            </div>
            {/* Render select and input elements here, each bound to prize[index] */}
            {/* Example for select element */}
            <div className="flex gap-4">
              <select
                disabled={editingPrizeId !== prize.id}
                name="prize_name"
                className="border border-[rgb(221,225,230)] rounded-lg w-full p-2"
                defaultValue={prize?.prize_details[0]?.prize_name}
                onChange={(e) =>
                  handleFieldChange(prize.id, "prize_name", e.target.value)
                }
              >
                <option
                  selected={prize?.prize_details[0]?.prize_name === "bogo"}
                  value="bogo"
                >
                  Bogo
                </option>
                <option
                  selected={
                    prize?.prize_details[0]?.prize_name === "percentage"
                  }
                  value="percentage"
                >
                  Percentage
                </option>
                <option
                  selected={prize?.prize_details[0]?.prize_name === "fixed"}
                  value="fixed"
                >
                  Fixed
                </option>
              </select>
              <div>
                <input
                  disabled={editingPrizeId !== prize.id}
                  name="amount"
                  defaultValue={prize?.prize_details[0]?.amount}
                  onChange={(e) =>
                    handleFieldChange(prize.id, "amount", e.target.value)
                  }
                  type="text"
                  className="border border-[#DDE1E6] rounded-lg w-full p-2"
                  placeholder="Amount"
                />
              </div>
            </div>
          </div>

          <div className="flex gap-4 mt-5 items-center py-4">
            <label className="text-md font-bold mb-2">Probability</label>
            <input
              disabled={editingPrizeId !== prize.id}
              name="probability"
              defaultValue={prize?.prize_details[0]?.probability}
              onChange={(e) =>
                handleFieldChange(prize.id, "probability", e.target.value)
              }
              type="text"
              className="border border-[#DDE1E6] rounded-lg p-2"
              placeholder="Percentage %"
            />
            <span>%</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AllFissionCampaign;
