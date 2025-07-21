import React from "react";

const BaseModal = ({
  show,
  onClose,
  title,
  children,
  maxWidth = "max-w-md",
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div
        className={`bg-white rounded-lg shadow-lg p-8 w-full ${maxWidth} relative`}
      >
        <button
          className="absolute top-2 right-3 text-2xl text-gray-400 hover:text-gray-600 transition-colors"
          onClick={onClose}
          aria-label="Close"
        >
          &times;
        </button>
        <h2 className="text-xl font-bold text-center mb-6">{title}</h2>
        {children}
      </div>
    </div>
  );
};

export default BaseModal;
