import React from "react";

const RewardValidity = ({
  isEditing,
  validitySelection,
  setValiditySelection,
  validitySelectionValue,
  setValiditySelectionValue,
  setValidityDaySelection,
}) => {
  // console.log("validitySelection",validitySelection)
  // console.log("isEditing",isEditing)
  return (
    <div>
      <div className="form-control w-full">
        <label className="label" htmlFor="validity">
          <span className="label-text">Validity</span>
        </label>
        <select
          name="validity"
          id="validity"
          className="select select-bordered w-full"
          value={validitySelection}
          onChange={(e) => setValiditySelection(e.target.value)}
        >
          <option selected disabled>
            Select Validity Type
          </option>
          <option value="unlimited">Unlimited</option>
          <option value="days_after_rewarded">Days after awarded</option>
          <option value="special_date">Specific date</option>
          {/* items data will be here from the api */}
        </select>
      </div>
      {/* ===== */}
      {/* below input fields will be changed based on the selection of the above selection values */}
      {/* If it is days after awarded */}
      {validitySelection === "days_after_rewarded" && (
        <div className="flex items-center my-3">
          <input
            required
            name="days_after_awarded_value"
            type="text"
            placeholder="Days after rewarded"
            className="input input-bordered me-2"
            value={validitySelectionValue}
            onChange={(e) => setValidityDaySelection(e.target.value)}
          />
          Days
        </div>
      )}

      {/* If it is specific date */}
      {validitySelection === "special_date" && (
        <input
          required
          name="specific_date_value"
          type="date"
          placeholder="Specific date"
          className="input input-bordered me-2 my-3"
          value={validitySelectionValue}
          onChange={(e) => setValiditySelectionValue(e.target.value)}
        />
      )}
      {/* if it is unlimited, no need to show any input fields here */}
    </div>
  );
};

export default RewardValidity;
