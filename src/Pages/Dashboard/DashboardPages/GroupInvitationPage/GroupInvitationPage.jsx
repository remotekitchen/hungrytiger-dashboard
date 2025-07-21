import React, { useEffect, useState } from "react";
import { useGetRestaurentsQuery } from "../../../../redux/features/menuCreation/menuCreationApi";
import {
  useCreateGroupInvitationMutation,
  useGetGroupInvitationQuery,
  useDeleteGroupInvitationMutation,
  useUpdateGroupInvitationMutation,
} from "../../../../redux/features/groupInvitation/groupInvitationApi";
import toast from "react-hot-toast";
import InvitationModal from "./InvitationModal/InvitationModal";
import { useDispatch } from "react-redux";
import { selectedGroupInvitation } from "../../../../redux/features/groupInvitation/groupInvitationSlice";

const GroupInvitationPage = () => {
  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [groupName, setGroupName] = useState("");
  const [selectedInvitationId, setSelectedInvitationId] = useState("");
  const [group_link, setGroup_Link] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [selectedRestaurants, setSelectedRestaurants] = useState("");
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const {
    data: restaurantList,
    isLoading: isRestaurantLoading,
    isError: isRestaurantError,
    error: restaurantError,
  } = useGetRestaurentsQuery();

  const {
    data: getGroupInvitation,
    isLoading: isGroupInvitationLoading,
    isError: isGroupInvitationError,
    error: groupInvitationError,
  } = useGetGroupInvitationQuery();


  const [
    deleteGroupInvitation,
    { isLoading: isDeleteLoading, isError: isDeleteError, error: deleteError },
  ] = useDeleteGroupInvitationMutation();

  const [
    createGroupInvitation,
    {
      isSuccess: isCreateGroupInvitationSuccess,
      isError: isGroupInvitationCreateError,
    },
  ] = useCreateGroupInvitationMutation();

  const handleRestaurantChange = (e) => {
    const selectedRestaurantId = e.target.value;
    setSelectedRestaurants(selectedRestaurantId);
  };

  const handlePlatformChange = (e) => {
    setSelectedPlatform(e.target.value);
  };

  const handleCheckboxChange = (e) => {
    setIsActive(e.target.checked);
  };

  const filteredGroupInvitations = getGroupInvitation?.results.filter((item) =>
    restaurantList?.results?.some(
      (restaurant) => restaurant.id === item.restaurant
    )
  );

  const handleSubmission = async () => {
    if (!selectedRestaurants.length) {
      toast.error("Please select at least one restaurant.");
      return;
    }

    try {
      await createGroupInvitation({
        restaurant: selectedRestaurants,
        platform: selectedPlatform,
        name: groupName,
        group_link: group_link,
        is_active: isActive,
      });
      toast.success("Group invitation created successfully");
    } catch (error) {
      toast.error("Error creating group invitation");
    }

    setSelectedRestaurants("");
    setSelectedPlatform("");
    setGroupName("");
    setGroup_Link("");
    setIsActive(true);
  };

  const dispatch = useDispatch();
  // updated invitation data
  const [
    updateGroupInvitation,
    {
      isLoading: isUpdateLoading,
      isError: isUpdateError,
      error: updateError,
      isSuccess: isUpdateSuccess,
    },
  ] = useUpdateGroupInvitationMutation();
  const handleEdit = (index, invitationId, invitationData) => {
    setShowUpdateModal(true);
    setSelectedInvitationId(invitationId);
    dispatch(selectedGroupInvitation(invitationData));
    // Implement your edit logic here
  };

  const handleDelete = async (id) => {
    //delete group invitation using id

    try {
      await deleteGroupInvitation(id);
      toast.success("Group invitation deleted successfully");
    } catch (error) {
      toast.error("Error deleting group invitation");
    }
  };

  useEffect(() => {
    if (isUpdateError) {
      setShowUpdateModal(true);
    }
    if (!isUpdateError && isUpdateSuccess) {
      setShowUpdateModal(false);
    }
  }, [isUpdateError, isUpdateSuccess]);
  return (
    <div className="p-5">
      <h1 className="text-4xl font-bold mb-7">Add WhatsApp / We chat</h1>
      <h2 className="text-2xl font-bold">Group Information</h2>

      <div className="mt-4 w-1/2 py-4">
        <div>
          <label className="block text-lg font-medium text-gray-700">
            Restaurant*
          </label>
          <select
            id="restaurant"
            value={selectedRestaurants}
            onChange={handleRestaurantChange}
            className="select select-bordered w-full"
          >
            <option value="">Select Restaurant</option>
            {restaurantList?.results.map((restaurant) => (
              <option key={restaurant.id} value={restaurant.id}>
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
            id="platform"
            value={selectedPlatform}
            onChange={handlePlatformChange}
            className="select select-bordered w-full"
            required
          >
            <option value="">Select Platform</option>
            <option value="WhatsApp">WhatsApp</option>
            <option value="WeChat">WeChat</option>
          </select>
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-700">
            Group Name*
          </label>
          <input
            type="text"
            className="border border-gray-300 rounded-md p-2 w-full"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-700">
            Link*
          </label>
          <input
            type="text"
            className="border border-gray-300 rounded-md p-2 w-full"
            value={group_link}
            onChange={(e) => setGroup_Link(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-700">
            Is Active
          </label>
          <input
            type="checkbox"
            checked={isActive}
            onChange={handleCheckboxChange}
          />
        </div>

        <div>
          <button
            className="mt-4 bg-[#42C2FF] text-white font-bold py-2 px-4 rounded"
            onClick={handleSubmission}
          >
            Save
          </button>
        </div>
      </div>

      <div className="overflow-x-auto my-6" style={{ maxWidth: "100%" }}>
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Restaurant</th>
              <th className="py-2 px-4 border-b">Platform</th>
              <th className="py-2 px-4 border-b">Group Name</th>
              <th className="py-2 px-4 border-b">Link</th>
              <th className="py-2 px-4 border-b">Is Active</th>

              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {filteredGroupInvitations?.map((item, index) => (
              <tr key={index}>
                {
                  <td>
                    {
                      restaurantList?.results?.find(
                        (restaurant) => restaurant.id == item.restaurant
                      )?.name
                    }
                  </td>
                }

                <td className="py-2 px-4 border-b">{item.platform}</td>
                <td className="py-2 px-4 border-b">{item.name}</td>
                <td className="py-2 px-4 border-b">{item.group_link}</td>
                <td className="py-2 px-4 border-b">
                  {item.is_active ? (
                    <span className="text-green-500">Active</span>
                  ) : (
                    <span className="text-red-500">Inactive</span>
                  )}
                </td>

                <td className="py-2 px-4 border-b">
                  <label
                    onClick={() => handleEdit(index, item.id, item)}
                    htmlFor={`invitation_modal_${item.id}`}
                    className="bg-yellow-500 text-white font-bold py-1 px-2 rounded mr-2"
                  >
                    Edit
                  </label>

                  <button
                    className="bg-red-500 text-white font-bold py-1 px-2 rounded"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {showUpdateModal && (
        <InvitationModal
          isUpdateLoading={isUpdateLoading}
          selectedInvitationId={selectedInvitationId}
          restaurantList={restaurantList?.results}
          updateGroupInvitation={updateGroupInvitation}
        />
      )}
    </div>
  );
};

export default GroupInvitationPage;
