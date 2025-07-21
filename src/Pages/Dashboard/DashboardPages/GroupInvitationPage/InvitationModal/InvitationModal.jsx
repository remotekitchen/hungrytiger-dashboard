import React from "react";
import { useSelector } from "react-redux";

const InvitationModal = ({
  selectedInvitationId,
  restaurantList,
  updateGroupInvitation,
  isUpdateLoading,
}) => {
  const { groupInvitation } = useSelector(
    (state) => state.groupInvitationReducer
  );
  const handleSaveChanges = (e) => {
    e.preventDefault();
    updateGroupInvitation({
      id: selectedInvitationId,
      data: {
        name: e.target.modal_group_name.value,
        restaurant: Number(e.target.modal_restaurant.value),
        platform: e.target.modal_platform.value,
        group_link: e.target.modal_group_link.value,
        is_active: e.target.modal_is_active.checked,
      },
    });
  };

  return (
    <>
      <input
        type="checkbox"
        id={`invitation_modal_${selectedInvitationId}`}
        className="modal-toggle"
      />

      <div className="modal" role="dialog">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Hello!</h3>

          {/* contents here */}
          <form onSubmit={handleSaveChanges}>
            <div>
              <label className="block text-lg font-medium text-gray-700">
                Restaurant*
              </label>
              <select
                id="modal_restaurant"
                //   value={selectedRestaurants}
                //   onChange={handleRestaurantChange}
                className="select select-bordered w-full"
              >
                <option value="">Select Restaurant</option>
                {restaurantList?.map((restaurant) => (
                  <option
                    selected={restaurant.id == groupInvitation.restaurant}
                    key={restaurant.id}
                    value={restaurant.id}
                  >
                    {restaurant.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-lg font-medium text-gray-700">
                Platform*
              </label>
              <select
                id="modal_platform"
                //   value={selectedPlatform}
                //   onChange={handlePlatformChange}
                className="select select-bordered w-full"
                required
              >
                <option value="">Select Platform</option>
                <option
                  selected={
                    groupInvitation.platform.toLowerCase() === "whatsapp"
                  }
                  value="WhatsApp"
                >
                  WhatsApp
                </option>
                <option
                  selected={groupInvitation.platform.toLowerCase() === "wechat"}
                  value="WeChat"
                >
                  WeChat
                </option>
              </select>
            </div>

            <div>
              <label className="block text-lg font-medium text-gray-700">
                Group Name*
              </label>
              <input
                id="modal_group_name"
                type="text"
                className="border border-gray-300 rounded-md p-2 w-full"
                defaultValue={groupInvitation.groupName}
                //   onChange={(e) => setGroupName(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-lg font-medium text-gray-700">
                Link*
              </label>
              <input
                id="modal_group_link"
                type="text"
                className="border border-gray-300 rounded-md p-2 w-full"
                defaultValue={groupInvitation.link}
                //   onChange={(e) => setGroup_Link(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block text-lg font-medium text-gray-700">
                Is Active
              </label>
              <input
                name="modal_is_active"
                type="checkbox"
                defaultChecked={groupInvitation.isActive}
                //   onChange={handleCheckboxChange}
              />
            </div>
            {/* ================ */}

            <button
              disabled={isUpdateLoading}
              type="submit"
              // htmlFor={`invitation_modal_${selectedInvitationId}`}
              className="btn"
            >
              Save changes
            </button>
          </form>
        </div>
        <label
          className="modal-backdrop"
          htmlFor={`invitation_modal_${selectedInvitationId}`}
        >
          Close
        </label>
      </div>
    </>
  );
};

export default InvitationModal;
