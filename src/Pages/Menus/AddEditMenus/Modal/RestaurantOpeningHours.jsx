// OpeningHours.jsx
const RestaurantOpeningHours = ({
  selectedDaysAndTimes,
  isDaySelected,
  handleDayClick,
  handleTimeChange,
  handleTimeAdd,
  handleTimeRemove,
}) => {
  const daysOfWeek = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  return (
    <div className="form-control w-full">
      <h6 className="label">Operating hours</h6>
      <div className="border border-cyan-300 py-3 w-full">
        {daysOfWeek.map((day) => (
          <div
            key={day}
            className="w-full grid grid-cols-3 justify-items-center"
          >
            <div>
              <div
                onClick={() => handleDayClick(day)}
                className={`cursor-pointer my-2 rounded hover:shadow-md px-10 py-2 transition-all ${
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
              <div className="flex my-2">
                <input
                  required
                  disabled={!isDaySelected(day)}
                  type="time"
                  id="startTime"
                  value={selectedDaysAndTimes[day]?.startTime || ""}
                  onChange={(e) =>
                    handleTimeChange(day, "startTime", e.target.value)
                  }
                  className={`border border-gray-300 me-1 rounded-lg px-2 py-1 outline-none ${
                    !isDaySelected(day) && "cursor-not-allowed"
                  }`}
                />
                <input
                  required
                  disabled={!isDaySelected(day)}
                  type="time"
                  id="endTime"
                  value={selectedDaysAndTimes[day]?.endTime || ""}
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
                        handleTimeChange(
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
                        handleTimeChange(day, "endTime", e.target.value, index)
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
        ))}
      </div>
    </div>
  );
};

export default RestaurantOpeningHours;
