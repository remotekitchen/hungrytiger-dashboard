import React from "react";

const AddMenuCompo = ({
  setName,
  setDescription,
  handleRestaurantChange,
  restaurantList,
  handleLocationChange,
  locationList,
  handleCreateMenu,
  menuCreationLoading,
  isEditing,
  isDaySelected,
  name,
  description,
  handleDayClick,
  daysOfWeek,
  handleTimeChange,
  selectedDaysAndTimes,
  setSelectedDaysAndTimes,
  selectedRestaurantId,
  selectedLocations,
  inflation,
  setInflation,
}) => {
  // // console.log("🚀 ~ inflation:---------", parseFloat(inflation));
  const handleTimeAdd = (day) => {
    setSelectedDaysAndTimes((prevSelectedDays) => ({
      ...prevSelectedDays,
      [day]: {
        ...prevSelectedDays[day],
        additionalTimes: [
          ...(prevSelectedDays[day]?.additionalTimes || []),
          { startTime: "", endTime: "" },
        ],
      },
    }));
  };

  const handleTimeRemove = (day, index) => {
    setSelectedDaysAndTimes((prevSelectedDays) => {
      const updatedSelectedDays = { ...prevSelectedDays };
      updatedSelectedDays[day].additionalTimes.splice(index, 1);
      return updatedSelectedDays;
    });
  };

  const handleAdditionalTimeChange = (day, field, value, index) => {
    setSelectedDaysAndTimes((prevSelectedDays) => ({
      ...prevSelectedDays,
      [day]: {
        ...prevSelectedDays[day],
        additionalTimes: prevSelectedDays[day]?.additionalTimes.map((time, i) =>
          i === index ? { ...time, [field]: value } : { ...time }
        ),
      },
    }));
  };

  return (
    <>
      <div className="flex mb-12 justify-center items-between h-[40vh] overflow-y-scroll">
        <div className="w-full">
          <div className="form-control ">
            <label className="label">
              <span className="label-text">Menu Name</span>
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full"
            />
          </div>
          <div className="form-control ">
            <label className="label">
              <span className="label-text">Menu Description</span>
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              type="text"
              placeholder="Type here"
              className="textarea textarea-bordered w-full"
            />
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Restaurants</span>
            </label>
            <select
              onChange={handleRestaurantChange}
              className="select select-bordered w-full"
              value={selectedRestaurantId}
            >
              <option disabled selected>
                Select restaurant
              </option>
              {restaurantList?.results.map((item) => (
                <option value={item.id} key={item.id}>
                  {item?.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Locations</span>
            </label>
            <select
              onChange={handleLocationChange}
              className="select select-bordered w-full"
              value={selectedLocations}
            >
              <option disabled selected>
                Select location
              </option>
              {locationList?.results.map((item) => (
                <option value={item.id} key={item.id}>
                  {item?.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-control ">
            <label className="label">
              <span className="label-text">Inflation</span>
            </label>
            <input
              value={inflation}
              onChange={(e) => setInflation(e.target.value)}
              type="number"
              placeholder="Add Inflation"
              className="input input-bordered w-full"
            />
          </div>

          {/* Operating hours */}
          <div className="form-control w-full">
            <h6 className="label">Operating hours</h6>
            <div className="border border-cyan-300 py-3">
              {daysOfWeek.map((day) => (
                <div key={day}>
                  <div className="grid grid-cols-3 justify-items-center">
                    <div>
                      <div
                        onClick={() => handleDayClick(day)}
                        className={`cursor-pointer my-2 hover:shadow-md px-10 py-2 transition-all ${
                          isDaySelected(day)
                            ? "bg-[#42C2FF] text-white"
                            : "text-[#42C2FF]"
                        }`}
                        key={day}
                      >
                        {day}
                      </div>
                    </div>
                    <div className="grid col-span-2">
                      <div className="flex my-2 items-center">
                        {/* start time  */}
                        <input
                          disabled={!isDaySelected(day)}
                          type="time"
                          id="startTime"
                          defaultValue={
                            selectedDaysAndTimes[day]?.startTime || ""
                          }
                          onChange={(e) =>
                            handleTimeChange(day, "startTime", e.target.value)
                          }
                          className={`border border-gray-300 me-1 rounded-lg px-2 py-1 outline-none ${
                            !isDaySelected(day) && "cursor-not-allowed"
                          }`}
                        />
                        {/* end time  */}
                        <input
                          disabled={!isDaySelected(day)}
                          type="time"
                          id="endTime"
                          defaultValue={
                            selectedDaysAndTimes[day]?.endTime || ""
                          }
                          onChange={(e) =>
                            handleTimeChange(day, "endTime", e.target.value)
                          }
                          className={`border border-gray-300 rounded-lg px-2 py-1 outline-none ${
                            !isDaySelected(day) && "cursor-not-allowed"
                          }`}
                        />
                        <div>
                          <span
                            onClick={() => handleTimeAdd(day)}
                            className={`w-[30px] h-[30px] text-white inline-flex justify-center items-center cursor-pointer text-xl bg-[#42C2FF] rounded ml-2 ${
                              !isDaySelected(day) && "opacity-0"
                            }`}
                          >
                            +
                          </span>
                        </div>
                      </div>

                      {/* Render additional time inputs */}
                      {selectedDaysAndTimes[day]?.additionalTimes?.map(
                        (time, index) => (
                          <div className="flex mb-2" key={index}>
                            <input
                              required
                              disabled={!isDaySelected(day)}
                              type="time"
                              value={time?.startTime || ""}
                              onChange={(e) =>
                                handleAdditionalTimeChange(
                                  day,
                                  "startTime",
                                  e.target.value,
                                  index
                                )
                              }
                              className={`border border-gray-300 me-1 rounded-lg px-2 py-1 outline-none ${
                                !isDaySelected(day) && "cursor-not-allowed"
                              }`}
                            />
                            <input
                              required
                              disabled={!isDaySelected(day)}
                              type="time"
                              value={time?.endTime || ""}
                              onChange={(e) =>
                                handleAdditionalTimeChange(
                                  day,
                                  "endTime",
                                  e.target.value,
                                  index
                                )
                              }
                              className={`border border-gray-300 rounded-lg px-2 py-1 outline-none ${
                                !isDaySelected(day) && "cursor-not-allowed"
                              }`}
                            />
                            <div
                              onClick={() => handleTimeRemove(day, index)}
                              className="w-[30px] h-[30px] text-white flex justify-center items-center cursor-pointer text-xl bg-red-500 rounded ml-2"
                            >
                              -
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-3">
        <button
          name="continue"
          disabled={menuCreationLoading}
          onClick={handleCreateMenu}
          className="bg-[#42C2FF] text-white px-4 py-2 rounded-lg mt-2"
        >
          {menuCreationLoading
            ? "Loading..."
            : isEditing
            ? "Save changes"
            : "+ Add New Menu"}
        </button>
      </div>
    </>
  );
};

export default AddMenuCompo;
