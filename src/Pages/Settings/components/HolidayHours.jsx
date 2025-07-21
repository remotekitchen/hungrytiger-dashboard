import React, { useState } from "react";

const HolidayHours = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    selectedDate: "",
    closedAllDay: false,
  });

  const handleAddClick = () => {
    setEvents([...events, newEvent]);
    setNewEvent({ selectedDate: "", closedAllDay: false });
  };

  const handleSaveClick = (index) => {
    // // console.log('Saved event:', events[index]);
  };

  const handleCloseClick = (index) => {
    const updatedEvents = [...events];
    updatedEvents.splice(index, 1);
    setEvents(updatedEvents);
  };

  const handleDateChange = (index, value) => {
    const updatedEvents = [...events];
    updatedEvents[index].selectedDate = value;
    setEvents(updatedEvents);
  };

  const handleCheckboxChange = (index) => {
    const updatedEvents = [...events];
    updatedEvents[index].closedAllDay = !updatedEvents[index].closedAllDay;
    setEvents(updatedEvents);
  };
  return (
    <div>
      <h1 className="text-3xl">Holiday Hours</h1>
      <p>
        Add a date and indicate if your store is closed all day. If you’re
        staying open, you can shorten or extend your hours.
      </p>

      <div className="p-4">
        <div className="flex justify-between mb-4">
          <button
            className="bg-green-500 text-white rounded-lg p-2 px-4 hover:bg-green-600"
            onClick={handleAddClick}
          >
            + Add
          </button>
          <button
            className="bg-blue-500 text-white rounded-lg p-2 px-4 hover:bg-blue-600"
            onClick={() => handleSaveClick(events.length - 1)}
            disabled={events.length === 0}
          >
            Save
          </button>
        </div>
        {events.map((event, index) => (
          <div key={index} className="border p-4 rounded-lg shadow-md mt-4">
            <div className="flex justify-between items-center ">
              <div>
                <input
                  type="date"
                  value={event.selectedDate}
                  onChange={(e) => handleDateChange(index, e.target.value)}
                  className="border rounded px-2 py-1"
                />
              </div>
              <div>
                <input
                  className="mr-2"
                  type="checkbox"
                  checked={event.closedAllDay}
                  onChange={() => handleCheckboxChange(index)}
                />
                <label>Closed all day</label>
              </div>
              <div>
                <button
                  className="bg-red-500 text-white rounded-lg p-2 px-4 hover:bg-red-600"
                  onClick={() => handleCloseClick(index)}
                >
                  X
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HolidayHours;
