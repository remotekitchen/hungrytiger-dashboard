import { useContext } from "react";
import { OPERTAING_HOURS_CONTEXT } from "../MenuDayRange";

const TimeEntry = ({
  time,
  dayData,
  selectedOperatingHours,
  setSelectedOperatingHours,
  index, // Add index as a prop
}) => {
  const { isDaySelected } = useContext(OPERTAING_HOURS_CONTEXT);

  const handleStartTimeChange = (newStartTime) => {
    setSelectedOperatingHours((prevSelectedOperatingHours) => {
      const updatedOperatingHours = { ...prevSelectedOperatingHours };
      updatedOperatingHours[dayData.value].times[index].start_time =
        newStartTime;
      return updatedOperatingHours;
    });
  };

  const handleEndTimeChange = (newEndTime) => {
    setSelectedOperatingHours((prevSelectedOperatingHours) => {
      const updatedOperatingHours = { ...prevSelectedOperatingHours };
      updatedOperatingHours[dayData.value].times[index].end_time = newEndTime;
      return updatedOperatingHours;
    });
  };
  return (
    <div className="flex justify-around mb-2">
      <div>
        <input
          onChange={(e) => handleStartTimeChange(e.target.value)}
          defaultValue={time.start_time} // Set the default value here
          disabled={!isDaySelected(dayData.value)}
          type="time"
          id="startTime"
          placeholder="Type here"
          className="input input-bordered w-full max-w-xs"
        />
      </div>
      <div>
        <input
          onChange={(e) => handleEndTimeChange(e.target.value)}
          defaultValue={time.end_time} // Set the default value here
          disabled={!isDaySelected(dayData.value)}
          type="time"
          id="endTime"
          className="input input-bordered w-full max-w-xs"
        />
      </div>
      <button
        className="btn bg-[#DA1E28] hover:bg-[#da1e27da] text-center text-white text-2xl py-0"
        onClick={() => {
          /* handle delete time */
        }}
      >
        -
      </button>
    </div>
  );
};

export default TimeEntry;
