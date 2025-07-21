import React from "react";

const RowComponent = ({
  inputFields,
  setInputFields,
  handleAddFields,
  handleRemoveFields,
}) => {
  return (
    <div className="grid grid-cols-12 gap-2 my-2">
      <div className="w-full h-full grid col-span-11 border border-gray-500 p-1 rounded border-opacity-10">
        {/* Original Dish  */}
        <div className="mt-3">
          <span className="font-bold py-2 inline-block">
            Original Dish Price
          </span>
          <div className="flex items-center flex-wrap gap-2">
            {inputFields.map((inputField, index) => (
              <input
                disabled
                key={index}
                type="text"
                value={inputField.originalDish}
                className="w-32 h-10 rounded bg-[#d7d9e0a8] shadow-2xl text-center"
              />
            ))}
          </div>
        </div>
        {/* inflation  */}
        <div className="mt-3">
          <span className="font-bold py-2 inline-block">Inflation %</span>
          <div className="flex items-center flex-wrap gap-2">
            {inputFields.map((inputField, index) => (
              <input
                key={index}
                type="text"
                value={inputField.inflation}
                onChange={(e) => {
                  const updatedInputFields = [...inputFields];
                  updatedInputFields[index].inflation = e.target.value;
                  setInputFields(updatedInputFields);
                }}
                className="w-32 h-10 rounded bg-[#d7d9e0a8] shadow-2xl text-center"
              />
            ))}
          </div>
        </div>
      </div>

      {/* add / remove button  */}
      <div className="grid col-span-1 items-center justify-center w-full h-full">
        <div className="flex flex-col gap-3">
          <button
            className="px-3 py-1 rounded bg-[#43C2FE] text-white"
            onClick={handleAddFields}
          >
            Add
          </button>
          {inputFields.length > 1 && (
            <button
              className="px-3 py-1 rounded bg-red-500 text-white"
              onClick={() => handleRemoveFields(inputFields.length - 1)}
            >
              Remove
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RowComponent;
