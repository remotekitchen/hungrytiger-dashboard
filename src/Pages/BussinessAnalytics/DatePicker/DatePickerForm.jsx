import React from "react";
import DatePicker from "./DatePicker";

const DatePickerForm = ({
  selectedRestaurant,
  setSelectedRestaurant,
  daySelect,
  setDaySelect,
  orderMethod,
  setOrderMethod,
  allRestaurant,
  value,
  setValue,
}) => {
  const handleSubmit = (event) => {
    event.preventDefault();
  };
  return (
    <div className="flex  ">
      <form
        className="w-full flex items-center flex-row justify-center gap-2"
        onSubmit={handleSubmit}
      >
        <div className="px-2 py-2 bg-transparent rounded-md ">
          <select
            className="select select-bordered w-full"
            name="restaurant"
            value={selectedRestaurant}
            onChange={(e) => setSelectedRestaurant(parseFloat(e.target.value))}
          >
            <option disabled selected value={0}>
              Select Restaurant
            </option>
            {allRestaurant?.results?.map((res) => (
              <option key={res.id} value={res.id}>
                {res.name}
              </option>
            ))}
          </select>
        </div>

        <div className="px-2 py-2 bg-transparent rounded-md ">
          <select
            className="select select-bordered w-full"
            id="order_method"
            name="order_method"
            value={orderMethod}
            onChange={(e) => setOrderMethod(e?.target?.value)}
          >
            <option value="" disabled>
              Select Channels
            </option>
            <option value="">All</option>
            <option value="delivery">Delivery</option>
            <option value="pickup">Pickup</option>
          </select>
        </div>

        <div className="px-2 py-2 bg-transparent rounded-md ">
          <select
            className="select select-bordered w-full"
            id="day-select"
            name="day-select"
            value={daySelect}
            onChange={(e) => setDaySelect(e?.target?.value)}
          >
            <option value="" disabled>
              Select Days
            </option>
            <option value="today">Today</option>
            <option value="yesterday">Yesterday</option>
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
          </select>
        </div>

        <DatePicker value={value} setValue={setValue} />

        {/* <input type="submit" value="Submit" /> */}
      </form>
    </div>
  );
};

export default DatePickerForm;
