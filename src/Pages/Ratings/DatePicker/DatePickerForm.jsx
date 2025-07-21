import  { useState } from "react";
import DatePicker from "./DatePicker";

const DatePickerForm = ({startDate,endDate,setStartDate,setEndDate}) => {
 
  return (
    <div className="flex items-baseline w-1/2 h-20 ">
      
        <DatePicker startDate={startDate} endDate={endDate} setStartDate={setStartDate} setEndDate={setEndDate}/>

        {/* <div className="px-6 py-2 bg-transparent rounded-md ">
          <select
            className="bg-transparent outline-none text-md text-[#697077] font-semibold"
            id="field2"
            name="field2"
            value={field2}
            onChange={handleField2Change}
          >
            <option value="optionA">All Restrurent and Stores</option>
          </select>
        </div> */}

        {/* <input type="submit" value="Submit" /> */}
      
    </div>
  );
};

export default DatePickerForm;
