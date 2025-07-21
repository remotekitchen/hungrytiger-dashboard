import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { useSelector } from "react-redux";
import { useUpdatePaymentDetailsMutation } from "../../../redux/features/payment/paymentApi";

const PaymentAccountEditModal = ({ visible, setVisible, editItem }) => {
  const editref = useRef(null);

  const auth = useSelector((state) => state.auth);

  const [editedData, setEditedData] = useState({});

  useEffect(() => {
    setEditedData(editItem);
  }, [editItem]);

  const [updateItem, { isLoading, isError, isSuccess, data }] =
    useUpdatePaymentDetailsMutation();

  // Handle changes to the edited data
  const handleEditDataChange = (e) => {
    const { name, value } = e.target;
    setEditedData({
      ...editedData,
      [name]: value,
    });
  };

  // Handle form submission for editing
  const handleEditSubmit = (e) => {
    e.preventDefault();

    updateItem({ id: editItem.id, editedData });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Bank Account Edited Successfully");
      setVisible(false);
    }
  }, [isSuccess]);

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (visible && editref.current && !editref.current.contains(e.target)) {
        setVisible(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [visible, setVisible]);

  return (
    <div
      className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  ${
        visible
          ? "w-full justify-center items-center flex backdrop-blur bg-black/20 h-screen z-10"
          : "z-[-10]"
      }`}
    >
      <div
        ref={editref}
        className={` transition-all duration-300 ${
          visible ? "scale-100" : "scale-0"
        }`}
      >
        <div className="p-4  bg-white shadow-md rounded-lg w-[60vh]">
          <h2 className="text-xl font-bold mb-2 text-center">
            Edit Account Holder Information
          </h2>
          {/* Form for editing */}
          <form onSubmit={handleEditSubmit}>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Account Holder Name
              </label>
              <input
                type="text"
                name="account_holder_name"
                value={editedData?.account_holder_name || ""}
                onChange={handleEditDataChange}
                className="mt-1 p-2 block w-full rounded-md border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Account Number
              </label>
              <input
                type="text"
                name="account_number"
                value={editedData?.account_number || ""}
                onChange={handleEditDataChange}
                className="mt-1 p-2 block w-full rounded-md border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Country
              </label>
              <input
                type="text"
                name="country"
                value={editedData?.country || ""}
                onChange={handleEditDataChange}
                className="mt-1 p-2 block w-full rounded-md border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
              />
            </div>

            <div className="text-center">
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 w-full"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentAccountEditModal;
