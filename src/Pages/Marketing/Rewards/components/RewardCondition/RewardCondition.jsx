import React from "react";

const RewardCondition = ({ formData, handleCheckboxChange }) => {
  const { applies_for } = formData;

  return (
    <div className="my-4">
      <h2 className="font-bold">Conditions</h2>
      <h6>Applies for:</h6>
      <div className="form-control">
        <label className="label cursor-pointer items-center space-x-2 justify-start">
          <input
            type="checkbox"
            className="checkbox checkbox-primary"
            checked={applies_for.includes("delivery")}
            onChange={() => handleCheckboxChange("delivery")}
          />
          <span className="label-text my-0">Delivery</span>
        </label>
      </div>
      <div className="form-control">
        <label className="label cursor-pointer items-center space-x-2 justify-start">
          <input
            type="checkbox"
            className="checkbox checkbox-primary"
            checked={applies_for.includes("pickup")}
            onChange={() => handleCheckboxChange("pickup")}
          />
          <span className="label-text my-0">Pickup</span>
        </label>
      </div>
      <div className="form-control">
        <label className="label cursor-pointer items-center space-x-2 justify-start">
          <input
            type="checkbox"
            className="checkbox checkbox-primary"
            checked={applies_for.includes("dine_in")}
            onChange={() => handleCheckboxChange("dine_in")}
          />
          <span className="label-text my-0">Dine-in</span>
        </label>
      </div>
    </div>
  );
};

export default RewardCondition;
