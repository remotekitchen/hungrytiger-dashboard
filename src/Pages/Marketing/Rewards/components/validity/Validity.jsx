import React from "react";

const Validity = ({ formData, handleInputChange }) => {
  const handleValidityTypeChange = (e) => {
    const { value } = e.target;
    handleInputChange({ target: { name: "validity_type", value } });

    // Reset the other fields based on the selected validity type
    if (value === "unlimited") {
      handleInputChange({ target: { name: "validity_days", value: "" } });
      handleInputChange({ target: { name: "validity_date", value: "" } });
    } else if (value === "days_after_rewarded") {
      handleInputChange({ target: { name: "validity_days", value: "" } });
      handleInputChange({ target: { name: "validity_date", value: "" } });
    } else if (value === "special_date") {
      handleInputChange({ target: { name: "validity_days", value: "" } });
    }
  };

  return (
    <div>
      <div className="form-control w-full">
        <label className="label" htmlFor="validity">
          <span className="label-text">Validity</span>
        </label>
        <select
          name="validity_type"
          id="validity"
          className="select select-bordered w-full"
          value={formData?.validity_type}
          onChange={handleValidityTypeChange}
        >
          <option disabled value="">
            Select Validity Type
          </option>
          <option value="unlimited">Unlimited</option>
          <option value="days_after_rewarded">Days after awarded</option>
          <option value="special_date">Specific date</option>
        </select>
      </div>

      {formData?.validity_type === "days_after_rewarded" && (
        <div className="flex items-center my-3">
          <input
            required
            name="validity_days"
            type="number"
            placeholder="Days after rewarded"
            className="input input-bordered me-2"
            value={formData?.validity_days || ""}
            onChange={handleInputChange}
          />
          Days
        </div>
      )}

      {formData?.validity_type === "special_date" && (
        <input
          required
          name="validity_date"
          type="date"
          className="input input-bordered me-2 my-3"
          value={formData?.validity_date || ""}
          onChange={handleInputChange}
        />
      )}
    </div>
  );
};

export default Validity;
