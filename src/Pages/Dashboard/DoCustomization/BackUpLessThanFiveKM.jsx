import React, { useState } from "react";

const LessThanFiveKM = () => {
  const [selectedRange, setSelectedRange] = useState("");
  const [customRanges, setCustomRanges] = useState([]);
  const [newRange, setNewRange] = useState("");
  const [showCustomInput, setShowCustomInput] = useState(false);
  // console.log("🚀 ~ LessThanFiveKM ~ showCustomInput:", showCustomInput);

  const predefinedRanges = [
    "$10-$20",
    "$20-$30",
    "$30-$40",
    "$40-$50",
    "$50-$60",
  ];

  const handleRangeChange = (event) => {
    setSelectedRange(event.target.value);
    setShowCustomInput(event.target.value === "custom");
  };

  const handleNewRangeChange = (event) => {
    setNewRange(event.target.value);
  };

  const handleAddCustomRange = () => {
    if (newRange.trim() !== "") {
      setCustomRanges([...customRanges, newRange.trim()]);
      setNewRange("");
      setSelectedRange("");
      setShowCustomInput(false);
    }
  };

  return (
    <div className="my-3">
      <h3 className="font-bold pb-3">In Less Than 5 Km</h3>
      <hr />
      <div className="mt-3">
        <span className="font-bold py-2 inline-block">Original Dish Price</span>
        {/* range */}
        <div className="flex flex-col space-y-4">
          <div>
            {!showCustomInput && (
              <select
                id="range"
                value={selectedRange}
                onChange={handleRangeChange}
                className="mt-1 block w-36 h-10 text-center rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                {predefinedRanges.map((range) => (
                  <option key={range} value={range}>
                    {range}
                  </option>
                ))}
                {customRanges.map((range) => (
                  <option key={range} value={range}>
                    {range}
                  </option>
                ))}
                <option value="custom">Custom Range</option>
              </select>
            )}
            {/* custom select */}
            {showCustomInput && (
              <div className="flex items-center space-x-2 w-36">
                <input
                  type="text"
                  value={newRange}
                  onChange={handleNewRangeChange}
                  placeholder="Enter custom range"
                  className="block w-full h-10 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                <button
                  onClick={handleAddCustomRange}
                  className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-2 py-1 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Add
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessThanFiveKM;
