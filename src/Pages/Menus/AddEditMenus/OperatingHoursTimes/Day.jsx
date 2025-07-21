import React, { useContext } from "react";
import { OPERTAING_HOURS_CONTEXT } from "../MenuDayRange";
import TimeSlot from "./TimeSlot";

const Day = ({
  dayData,
  operatingHours,
  selectedOperatingHours,
  setSelectedOperatingHours,
}) => {
  const { handleDayClick, isDaySelected } = useContext(OPERTAING_HOURS_CONTEXT);
  // Check if the day is present in the operatingHours array
  const isDayInOperatingHours = operatingHours.some(
    (hour) => hour.day_index === dayData.value
  );
  const isSelectedByDefault =
    isDayInOperatingHours || isDaySelected(dayData.value);

  const defaultTimes = isDayInOperatingHours
    ? operatingHours.find((hour) => hour.day_index === dayData.value)
        .opening_hour
    : [
        {
          start_time: "00:00",
          end_time: "00:00",
          is_delete: false,
        },
      ];
  return (
    <tr>
      <td className="px-4 py-2">
        <label
          onClick={() => handleDayClick(dayData.value)}
          className={`cursor-pointer transition-all p-1 hover:shadow-md rounded-lg py-3 px-3 ${
            isSelectedByDefault
              ? "bg-[#B8E8FE] text-[#21272A]"
              : "text-[#42C2FF]"
          }`}
          htmlFor="dayName"
        >
          {dayData.label}
        </label>
        <input
          type="text"
          id="dayName"
          className="hidden"
          value={dayData.value}
        />
      </td>
      <td>
        <TimeSlot
          dayData={dayData}
          selectedOperatingHours={selectedOperatingHours}
          setSelectedOperatingHours={setSelectedOperatingHours}
          times={defaultTimes}
        />
      </td>
    </tr>
  );
};

export default Day;
