import React from "react";
import TimeEntry from "./TimeEntry";

const TimeSlot = ({
  // times,
  onAdd,
  onRemove,
  isSelectedByDefault,
  dayData,
  selectedOperatingHours,
  setSelectedOperatingHours,
  times,
}) => {
  /*  const times = [
    {
      start_time: "12.30",
      end_time: "12.30",
    },
  ]; */
  return (
    <div>
      {times?.map((time, index) => (
        <TimeEntry
          isSelectedByDefault={isSelectedByDefault}
          selectedOperatingHours={selectedOperatingHours}
          setSelectedOperatingHours={setSelectedOperatingHours}
          dayData={dayData}
          key={index}
          time={time}
          index={index}
        />
      ))}
    </div>
  );
};

export default TimeSlot;
