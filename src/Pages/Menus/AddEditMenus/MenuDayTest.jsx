import React, { useState } from "react";

const DaysOfWeek = [
  { label: "Sunday", value: "sun" },
  { label: "Monday", value: "mon" },
  { label: "Tuesday", value: "tue" },
  { label: "Wednesday", value: "wed" },
  { label: "Thursday", value: "thu" },
  { label: "Friday", value: "fri" },
  { label: "Saturday", value: "sat" },
];

function MenuDayTest({ menuId }) {
  const [selectedDays, setSelectedDays] = useState([]);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleDayClick = (day) => {
    if (!selectedDays.includes(day)) {
      // If the day is not in the selected days array, add it
      setSelectedDays([...selectedDays, day]);
    } else {
      // If the day is already in the selected days array, remove it
      setSelectedDays(
        selectedDays.filter((selectedDay) => selectedDay !== day)
      );
    }
  };

  const isDaySelected = (day) => selectedDays.includes(day);

  const handleStartTimeChange = (e) => {
    setStartTime(e.target.value);
  };

  const handleEndTimeChange = (e) => {
    setEndTime(e.target.value);
  };

  const handleSaveChanges = () => {
    // Generate opening hours for the selected days
    const openingHours = selectedDays.map((day) => ({
      day_index: day,
      is_close: false, // You can set this to false by default
      times: [
        {
          start_time: startTime,
          end_time: endTime,
          is_delete: false,
        },
      ],
    }));

    // Send the openingHours array as needed in your request
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          {DaysOfWeek.map((day) => (
            <div
              key={day.value}
              onClick={() => handleDayClick(day.value)}
              className={`cursor-pointer mx-2 ${
                isDaySelected(day.value) ? "font-bold" : ""
              }`}
            >
              {day.label}
            </div>
          ))}
        </div>
      </div>
      <label htmlFor="startTime">Start Time:</label>
      <input
        type="time"
        id="startTime"
        value={startTime}
        onChange={handleStartTimeChange}
        className="border border-gray-300 rounded-lg px-2 py-1 outline-none"
      />
      <label htmlFor="endTime">End Time:</label>
      <input
        type="time"
        id="endTime"
        value={endTime}
        onChange={handleEndTimeChange}
        className="border border-gray-300 rounded-lg px-2 py-1 outline-none"
      />
      <button
        className="btn bg-[#42C2FF] text-white px-4 py-2 rounded-lg hover:bg-[#3aa8db7b] block ms-auto my-2"
        onClick={handleSaveChanges}
      >
        Save Changes
      </button>
    </div>
  );
}

export default MenuDayTest;
