import React, { useEffect, useRef, useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";

const DatePicker = ({
  setStartDate,
  setEndDate,
  setDaySelect,
  daySelect,
  startDate,
  endDate,
  range,
}) => {
  const [value, setValue] = useState({
    startDate: startDate,
    endDate: endDate,
  });
  // console.log("🚀 ~ value-------:", value);

  const datepickerRef = useRef(null); // Ref for accessing Datepicker component

  const handleValueChange = (newValue) => {
    setValue(newValue);
    setStartDate(newValue.startDate);
    setEndDate(newValue.endDate);
    setDaySelect(0);
  };

  useEffect(() => {
    if (daySelect) {
      // Reset startDate and endDate in the state
      setValue({
        startDate: "",
        endDate: "",
      });

      // Reset Datepicker component's internal state
      if (datepickerRef.current) {
        datepickerRef.current.clearDate();
      }
    }
  }, [daySelect]);

  return (
    <div className="">
      <Datepicker
        inputClassName="px-2 py-2 bg-white rounded-md "
        toggleClassName="absolute bg-sky-300 rounded-r-lg text-white right-0 h-full px-3 text-gray-400 focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed"
        placeholder={"Select Date"}
        primaryColor={"blue"}
        value={value}
        onChange={handleValueChange}
        displayFormat={"DD/MM/YYYY"}
        popoverDirection="down"
        showShortcuts={true}
      />
    </div>
  );
};

export default DatePicker;
