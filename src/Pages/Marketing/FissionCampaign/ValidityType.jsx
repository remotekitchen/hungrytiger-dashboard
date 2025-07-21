import React from "react";

const ValidityType = ({ setSelectedDays, selectedDays }) => {
  const toggleDay = (index) => {
    if (selectedDays.includes(index)) {
      setSelectedDays(
        selectedDays.filter((day) => day !== index).sort((a, b) => a - b)
      );
    } else {
      setSelectedDays([...selectedDays, index].sort((a, b) => a - b));
    }
  };

  return (
    <div className="my-5 w-full flex justify-between items-center gap-2">
      {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
        <span
          key={index}
          className={`cursor-pointer w-14 h-14 inline-flex items-center justify-center border-2 rounded ${
            selectedDays.includes(index)
              ? "border-red-300 text-red-300"
              : "border-gray-300 text-gray-500"
          }`}
          onClick={() => toggleDay(index)}
        >
          {day}
        </span>
      ))}
    </div>
  );
};

export default ValidityType;
