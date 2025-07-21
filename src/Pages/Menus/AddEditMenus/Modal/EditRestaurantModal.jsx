import React, { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { useUpdateRestaurantMutation } from "../../../../redux/features/restaurentCreation/restaurentCreationApi";

const EditRestaurantModal = ({
  editRestaurant,
  setEditRestaurant,
  visible,
  setVisible,
}) => {
  // // console.log(editRestaurant)
  const editRef = useRef();

  const [updateItem, { isLoading, isError, isSuccess, data }] =
    useUpdateRestaurantMutation();

  useEffect(() => {
    setEditRestaurant(editRestaurant);
  }, [editRestaurant]);

  const handleEditDataChange = (e) => {
    const { name, value } = e.target;
    setEditRestaurant({
      ...editRestaurant,
      [name]: value,
    });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();

    updateItem({ id: editRestaurant.id, editRestaurant });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Restaurant Edited Successfully");
      setVisible(false);
    }
    if (isError) {
      //   // console.log(isError);
    }
  }, [isSuccess]);

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (visible && editRef.current && !editRef.current.contains(e.target)) {
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
        ref={editRef}
        className={` transition-all duration-300 ${
          visible ? "scale-100" : "scale-0"
        }`}
      >
        <div className="p-4  bg-white shadow-md rounded-lg w-[60vh]">
          <h2 className="text-xl font-bold mb-2 text-center">
            Edit Restautant Information
          </h2>
          {/* Form for editing */}
          <form onSubmit={handleEditSubmit}>
            <div className="h-[50vh] overflow-y-scroll">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Restaurant Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={editRestaurant?.name || ""}
                  onChange={handleEditDataChange}
                  className="mt-1 p-2 block w-full rounded-md border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              {/* <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">
                                    Restaurant Description
                                </label>
                                <input
                                    type="text"
                                    name="address"
                                    value={editRestaurant?.address || ""}
                                    onChange={handleEditDataChange}
                                    className="mt-1 p-2 block w-full rounded-md border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                            <h1>Locations</h1> */}
            </div>

            <div className="flex justify-between items-center">
              {/* <button className="bg-[#42C2FF] text-white px-4 py-2 rounded-lg mt-2">
                             + Add Another Location
                            </button> */}
              <button
                type="submit"
                className="bg-[#42C2FF] text-white px-4 py-2 rounded-lg mt-2"
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

export default EditRestaurantModal;
