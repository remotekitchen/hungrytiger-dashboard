import { useState } from "react";
import { toast } from "react-hot-toast";
import {
  useAvailabilityDurationMutation,
  useChangeAvailabilityOfItemMutation,
} from "../../../../redux/features/itemCreation/itemCreationApi";

const ItemAvailabilityTableRow = ({ item }) => {
  const [todayChecked, setTodayChecked] = useState(item.is_available_today);
  const [indefiniteChecked, setIndefiniteChecked] = useState(item.is_available);
  const [timeRange, setTimeRange] = useState({
    startTime: "",
    endTime: "",
  });

  const [
    changeAvailabilityOfItem,
    {
      isLoading: isAvailabilityOfItemLoading,
      isError: isAvailabilityOfItemError,
      isSuccess: isAvailabilityOfItemSuccess,
    },
  ] = useChangeAvailabilityOfItemMutation();

  const [availabilityDuration, { isLoading, isError, isSuccess }] =
    useAvailabilityDurationMutation();

  // Update the availability for "today"
  const handleTodayChange = async (e) => {
    const isCheckedToday = e.target.checked;
    setTodayChecked((prev) => isCheckedToday);

    try {
      await changeAvailabilityOfItem({
        itemId: [item.id],
        today: isCheckedToday,
        // indefinite: indefiniteChecked,
      });
    } catch (error) {
      console.error("Failed to update availability", error);
    }
  };

  // Update the availability for "indefinite"
  const handleIndefiniteChange = async (e) => {
    const isCheckedIndefinite = e.target.checked;
    setIndefiniteChecked((prev) => isCheckedIndefinite);

    try {
      await changeAvailabilityOfItem({
        itemId: [item.id],
        // today: todayChecked, // Pass the latest value of todayChecked
        indefinite: isCheckedIndefinite,
      });
    } catch (error) {
      console.error("Failed to update availability", error);
    }
  };

  // handle time range
  const handleTimeChange = (e) => {
    const { name, value } = e.target;
    setTimeRange((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // handle submit time schedule
  // Handle the save button click
  const handleSave = async () => {
    try {
      // Call the mutation API
      const response = await availabilityDuration({
        itemId: item?.id,
        startTime: timeRange.startTime,
        endTime: timeRange.endTime,
      });
      toast.success("Availability updated successfully!");
    } catch (error) {
      console.error("Failed to update availability duration", error);
    }
  };
  return (
    <tr>
      <td>
        <p className="font-bold">{item?.name}</p>
      </td>
      <td>
        <p className="font-bold">{item?.base_price}</p>
      </td>
      <td>
        {item?.is_available ? (
          <div className="badge badge-success badge-lg">Available</div>
        ) : (
          <div className="badge badge-error badge-lg">Unavailable</div>
        )}
      </td>
      <td>
        {/* Checkbox for today's availability */}
        <input
          type="checkbox"
          checked={todayChecked}
          onChange={handleTodayChange}
          className="toggle"
        />
      </td>
      <td>
        {/* Checkbox for indefinite availability */}

        <input
          checked={indefiniteChecked}
          onChange={handleIndefiniteChange}
          type="checkbox"
          className="toggle"
        />
      </td>
      <td>
        <div className="flex gap-2 justify-center">
          <input
            type="time"
            className="input input-bordered w-[140px]"
            name="startTime"
            defaultValue={
              item?.available_start_time
                ? item?.available_start_time
                : timeRange.startTime
            }
            onChange={handleTimeChange}
          />
          <input
            type="time"
            className="input input-bordered w-[140px]"
            name="endTime"
            defaultValue={
              item?.available_end_time
                ? item?.available_end_time
                : timeRange.endTime
            }
            onChange={handleTimeChange}
          />
          <button
            onClick={handleSave}
            className="w-[100px] rounded-lg text-white bg-blue-500"
          >
            Save
          </button>
        </div>
      </td>
    </tr>
  );
};

export default ItemAvailabilityTableRow;
