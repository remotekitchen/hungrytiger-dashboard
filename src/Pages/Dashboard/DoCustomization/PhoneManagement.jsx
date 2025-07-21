import React from "react";
import toast from "react-hot-toast";
import { useGetRestaurantPhoneManagementQuery } from "../../../redux/features/PhoneManagement/phoneManagementApi";
import { useGetRestaurentsQuery } from "../../../redux/features/menuCreation/menuCreationApi";
import { useUpdateRestaurantMutation } from "../../../redux/features/restaurentCreation/restaurentCreationApi";

const PhoneManagement = () => {
  const { data: getPhoneManagement } = useGetRestaurantPhoneManagementQuery();

  const {
    data: restaurantList,
    isLoading: restaurantListLoading,
    isError: isRestaurantListError,
  } = useGetRestaurentsQuery();

  const [updateRestaurant] = useUpdateRestaurantMutation();

  const handleCheckboxChange = async (id, currentValue) => {
    if (currentValue) {
      toast.success("Phone Call Rejected");
    } else {
      toast.success("Phone Call Accepted");
    }
    try {
      await updateRestaurant({
        id,
        editRestaurant: {
          receive_call_for_order: !currentValue,
        },
      });
      // console.log("Updated successfully");
    } catch (error) {
      // console.error("Error updating restaurant:", error);
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-bold mt-3">Restaurant Phone Management</h1>

      <div className="grid grid-cols-1 my-10">
        <div>
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr className="bg-base-200">
                  <th>Restaurant Name</th>
                  <th>Contact Number</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ...(getPhoneManagement?.enabled || []),
                  ...(getPhoneManagement?.disabled || []),
                ]
                  // Filter the data by matching the restaurant ID
                  .filter(
                    (data) => data?.id === restaurantList?.results?.[0]?.id
                  )
                  .map((data) => (
                    <tr key={data?.id}>
                      <td>{data?.name}</td>
                      <td>{data?.phone ? `+${data?.phone}` : "No Contact"}</td>
                      <td>
                        <input
                          type="checkbox"
                          checked={data?.receive_call_for_order}
                          onChange={() =>
                            handleCheckboxChange(
                              data?.id,
                              data?.receive_call_for_order
                            )
                          }
                          className="checkbox"
                        />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhoneManagement;
