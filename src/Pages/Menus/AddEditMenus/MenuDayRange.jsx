import React, { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useMenuOperatingHoursMutation } from "../../../redux/features/menuCreation/menuCreationApi";
import Day from "./OperatingHoursTimes/Day";
export const OPERTAING_HOURS_CONTEXT = createContext(null);

const DaysOfWeek = [
  { label: "Sunday", value: "sun" },
  { label: "Monday", value: "mon" },
  { label: "Tuesday", value: "tue" },
  { label: "Wednesday", value: "wed" },
  { label: "Thursday", value: "thu" },
  { label: "Friday", value: "fri" },
  { label: "Saturday", value: "Saturday" },
];

function MenuDayRange({ menuId, operatingHours, allMenus }) {
  const [menuOperatingHours, { isLoading, isError, isSuccess }] =
    useMenuOperatingHoursMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Successfully added operating hour(s) ");
    } else if (isError) {
      toast.error("Error adding operating hour(s)");
    }
  }, [isSuccess, isError]);
  // ==================================================
  // !updated day and time selection
  const [selectedDaysAndTimes, setSelectedDaysAndTimes] = useState({});
  const [selectedOperatingHours, setSelectedOperatingHours] = useState({});

  // this function here will take selected day as its parameter and check whether this day is exist in previously selected days or not. if it exists, it will remove it from the list. if it doesn't exist, it will append it to the list with previously selected days

  const handleDayClick = (day) => {
    setSelectedOperatingHours((prevSelectedOperatingHours) => {
      if (prevSelectedOperatingHours[day]) {
        // If the day is already selected, remove it
        const updatedSelectedOperatingHours = { ...prevSelectedOperatingHours };
        delete updatedSelectedOperatingHours[day];
        return updatedSelectedOperatingHours;
      } else {
        // If the day is not selected, add it with default times
        return {
          ...prevSelectedOperatingHours,
          [day]: {
            is_close: true, // You can set this default value as needed
            times: [
              {
                start_time: "00:00",
                end_time: "00:00",
                is_delete: false,
              },
            ],
          },
        };
      }
    });
  };

  const isDaySelected = (day) => !!selectedOperatingHours[day];

  const handleSaveChanges = () => {
    const openingHours = [];

    // Iterate through the selectedOperatingHours to create the request body
    for (const day in selectedOperatingHours) {
      openingHours.push({
        day_index: day,
        ...selectedOperatingHours[day],
      });
    }

    // console.log({ opening_hour: openingHours });

    // Send the API request with the openingHours data
    menuOperatingHours({
      menuId,
      operatingHours: { opening_hour: openingHours },
    });
  };

  return (
    <div>
      {/* updated operating hours UI */}

      {/* ========================================================== */}

      <div className="overflow-x-auto h-[70vh] overflow-auto">
        <table className="table">
          <thead>
            <tr>
              <th className="text-center text-lg">Day</th>
              <th className="text-center text-lg">Time Slots</th>
              {/* <th className="text-center text-lg">Actions</th> */}
            </tr>
          </thead>
          <OPERTAING_HOURS_CONTEXT.Provider
            value={{ handleDayClick, isDaySelected }}
          >
            <tbody className="">
              {operatingHours &&
                DaysOfWeek.map((dayData) => (
                  <Day
                    key={dayData.id}
                    dayData={dayData}
                    operatingHours={operatingHours}
                    selectedOperatingHours={selectedOperatingHours}
                    setSelectedOperatingHours={setSelectedOperatingHours}
                  />
                ))}
            </tbody>
          </OPERTAING_HOURS_CONTEXT.Provider>
        </table>
      </div>
      <button
        className="btn block ms-auto bg-[#42C2FF] text-white px-4 py-2 rounded-lg"
        onClick={handleSaveChanges}
      >
        Save Operating Hours
      </button>
    </div>
  );
}

export default MenuDayRange;
