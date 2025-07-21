import React, { useEffect, useRef, useState } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { RiDeleteBin5Line } from "react-icons/ri";

const days = [
  { id: 1, name: "Monday" },
  { id: 2, name: "Tuesday" },
  { id: 3, name: "Wednesday" },
  { id: 4, name: "Thursday" },
  { id: 5, name: "Friday" },
  { id: 6, name: "Saturday" },
  { id: 7, name: "Sunday" },
];

const Operatingopening_hours = () => {
  const [timeSlots, setTimeSlots] = useState(
    days.map((day) => ({
      id: day.id,
      name: day.name,
      closing_hours: [
        {
          startTime: "",
          endTime: "",
        },
      ],
      is_closed: false,
      isDropdownOpen: false,
    }))
  );

  const handleAddTimeSlot = (dayId) => {
    const updatedTimeSlots = [...timeSlots];
    const index = updatedTimeSlots.findIndex((slot) => slot.id === dayId);
    updatedTimeSlots[index].closing_hours.push({ startTime: "", endTime: "" });
    setTimeSlots(updatedTimeSlots);
  };

  const handleDeleteTimeSlot = (dayId, hourIndex) => {
    const updatedTimeSlots = [...timeSlots];
    const index = updatedTimeSlots.findIndex((slot) => slot.id === dayId);
    updatedTimeSlots[index].closing_hours.splice(hourIndex, 1);
    setTimeSlots(updatedTimeSlots);
  };

  const handleStartTimeChange = (dayId, hourIndex, event) => {
    const updatedTimeSlots = [...timeSlots];
    const index = updatedTimeSlots.findIndex((slot) => slot.id === dayId);
    updatedTimeSlots[index].closing_hours[hourIndex].startTime =
      event.target.value;
    setTimeSlots(updatedTimeSlots);
  };

  const handleEndTimeChange = (dayId, hourIndex, event) => {
    const updatedTimeSlots = [...timeSlots];
    const index = updatedTimeSlots.findIndex((slot) => slot.id === dayId);
    updatedTimeSlots[index].closing_hours[hourIndex].endTime =
      event.target.value;
    setTimeSlots(updatedTimeSlots);
  };

  const handleToggleDropdown = (dayId) => {
    const updatedTimeSlots = [...timeSlots];
    const index = updatedTimeSlots.findIndex((slot) => slot.id === dayId);
    updatedTimeSlots[index].isDropdownOpen =
      !updatedTimeSlots[index].isDropdownOpen;
    setTimeSlots(updatedTimeSlots);
  };

  const handleToggleTime = (dayId) => {
    const updatedTimeSlots = [...timeSlots];
    const index = updatedTimeSlots.findIndex((slot) => slot.id === dayId);
    updatedTimeSlots[index].is_closed = !updatedTimeSlots[index].is_closed;
    setTimeSlots(updatedTimeSlots);
  };

  return (
    <div>
      <h1 className="text-3xl text-center font-bold mt-2">Operating Hours</h1>
      <div className="flex justify-between px-4">
        <select className="px-4 mt-4 p-1 text-2xl">
          <option disabled defaultValue="">
            Select
          </option>
          <option value="menu">Menu</option>
          <option value="item">Item</option>
        </select>
        <button className="px-4 mt-4 p-1 text-lg bg-gray-700 rounded-lg text-white">
          Save
        </button>
      </div>

      {timeSlots.map((day) => (
        <div key={day.id}>
          <div className="border p-4 rounded-lg shadow-md mt-4">
            <div className="flex justify-between items-center px-4">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="toggle"
                  defaultChecked
                  onChange={() => handleToggleTime(day.id)}
                />
                <span className="text-sm font-semibold ml-3">{day.name}</span>
              </div>
              <div className="flex items-center gap-3 relative px-4">
                <div className="relative">
                  {!day.is_closed ? (
                    day.closing_hours.map((hour, hourIndex) => (
                      <div
                        key={hourIndex}
                        className="flex space-x-2 items-center"
                      >
                        <input
                          type="time"
                          placeholder="Start Time"
                          value={hour.startTime}
                          onChange={(e) =>
                            handleStartTimeChange(day.id, hourIndex, e)
                          }
                          className="border rounded px-2 py-1"
                        />
                        <input
                          type="time"
                          placeholder="End Time"
                          value={hour.endTime}
                          onChange={(e) =>
                            handleEndTimeChange(day.id, hourIndex, e)
                          }
                          className="border rounded px-2 py-1"
                        />
                        <button
                          className="p-1 rounded"
                          onClick={() =>
                            handleDeleteTimeSlot(day.id, hourIndex)
                          }
                        >
                          <RiDeleteBin5Line className="text-xl" />
                        </button>
                      </div>
                    ))
                  ) : (
                    <h1 className="text-gray-800">Closed</h1>
                  )}
                  {!day.is_closed && (
                    <div className="absolute right-0 top-0">
                      {day.isDropdownOpen && (
                        <div className="absolute right-10">
                          <ul className="bg-white border border-gray-200 shadow-md rounded py-1 px-2">
                            <li
                              onClick={() => handleAddTimeSlot(day.id)}
                              className="cursor-pointer w-32"
                            >
                              + Add hours
                            </li>
                          </ul>
                        </div>
                      )}
                      <button
                        className="p-2 rounded-full bg-gray-300 hover:bg-gray-400"
                        onClick={() => handleToggleDropdown(day.id)}
                      >
                        <BiDotsVerticalRounded />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Operatingopening_hours;
