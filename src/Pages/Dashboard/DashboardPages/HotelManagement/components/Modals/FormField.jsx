import React from "react";

const FormField = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  error,
  required = false,
  placeholder = "",
  className = "",
}) => {
  return (
    <div className={`mb-4 ${className}`}>
      <label className="block mb-1 font-semibold">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type={type}
        name={name}
        className={`border rounded-lg py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-200 transition-colors ${
          error ? "border-red-500" : "border-gray-300"
        }`}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
      />
      {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
    </div>
  );
};

export default FormField;
