import React from "react";
import { VscLink } from "react-icons/vsc";

const AutomaticDecission = () => {
  return (
    <div>
      <div className="flex gap-2 px-4">
        <VscLink className="text-2xl" />
        <p className="text-[#42C2FF]">
          See full calculation of our automatic decision making
        </p>
      </div>
      <div className="flex gap-4">
        <button className="bg-[#42C2FF] text-white px-4 py-2 rounded-lg mt-4 flex items-center gap-2">
          Save
        </button>
        <button className="bg-[#42C2FF] text-white px-4 py-2 rounded-lg mt-4 flex items-center gap-2">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AutomaticDecission;
