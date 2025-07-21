// Components/Modals/ConfirmDeleteModal.js
import React, { useState } from "react";

const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm, getPass }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (password === getPass) {
      onConfirm(); // Proceed to delete
      setPassword("");
      setError("");
      onClose();
    } else {
      setError("Incorrect password. Please try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-semibold mb-4">Confirm Delete</h2>
        <input
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError("");
          }}
          className="input input-bordered w-full"
        />
        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        <div className="mt-4 flex justify-end gap-3">
          <button className="btn btn-outline" onClick={onClose}>
            Cancel
          </button>
          <button className="btn btn-error text-white" onClick={handleSubmit}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
