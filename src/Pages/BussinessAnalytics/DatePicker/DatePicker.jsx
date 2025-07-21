import React from "react";
import Datepicker from "react-tailwindcss-datepicker";

const DatePicker = ({ value, setValue }) => {
  const handleValueChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <div className="">
      <Datepicker
        inputClassName="px-2 py-2 bg-white rounded-md"
        toggleClassName="absolute bg-sky-300 rounded-r-lg text-white right-0 h-full px-3 text-gray-400 focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed"
        placeholder={"Last Year"}
        primaryColor={"sky"}
        value={value}
        onChange={handleValueChange}
        displayFormat={"DD/MM/YYYY"}
      />
    </div>
  );
};

export default DatePicker;
