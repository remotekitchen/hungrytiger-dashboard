import React from "react";

const CheckboxField = ({ label, name, checked, onChange, className = "" }) => {
  return (
    <label className={`flex items-center gap-2 cursor-pointer ${className}`}>
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
      />
      <span className="text-sm">{label}</span>
    </label>
  );
};

export default CheckboxField;
