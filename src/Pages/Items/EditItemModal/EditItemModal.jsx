import React from "react";
import EditItemForm from "./EditItemForm";

const EditItemModal = ({ itemId, setIsEditItemModalOpen }) => {
  return (
    <>
      <input
        type="checkbox"
        id={`editItemModal-${itemId}`}
        className="modal-toggle"
      />
      <label
        htmlFor={`editItemModal-${itemId}`}
        className="modal cursor-pointer"
      >
        <label
          className="modal-box relative w-11/12 max-w-full p-0 rounded-lg h-full"
          htmlFor=""
        >
          {/* form  */}
          <div className="p-8">
            <div className="flex justify-between">
              <h1 className="text-3xl mb-6 font-bold font-sans">Edit Item</h1>
              <div>
                <button
                  name="cancel"
                  onClick={() => setIsEditItemModalOpen(false)}
                  className="btn bg-white  btn-sm mx-2 text-primary hover:bg-base-100 border-primary"
                >
                  Cancel
                </button>
                {/*  <button className="btn btn-primary btn-sm mx-2 text-white">
                  Save
                </button> */}
              </div>
            </div>
            <div className="form-control w-full">
              {/* item edit main body */}
              <EditItemForm setIsEditItemModalOpen={setIsEditItemModalOpen} />
            </div>
          </div>
        </label>
      </label>
    </>
  );
};

export default EditItemModal;
