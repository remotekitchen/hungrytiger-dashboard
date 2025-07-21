import React, { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { useUpdateMenuMutation } from "../../../../redux/features/menuCreation/menuCreationApi";

const EditMenuModal = ({
  editMenuModal,
  setEditMenuModal,
  editMenu,
  setEditMenu,
}) => {
  const editMenuRef = useRef();

  const [updateMenu, { isLoading, isError, isSuccess, data }] =
    useUpdateMenuMutation();

  useEffect(() => {
    setEditMenu(editMenu);
  }, [editMenu]);

  const handleEditDataChange = (e) => {
    const { name, value } = e.target;
    setEditMenu({
      ...editMenu,
      [name]: value,
    });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();

    updateMenu({ id: editMenu.id, editMenu });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Menu Edited Successfully");
      setEditMenuModal(false);
    }
  }, [isSuccess]);

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (
        editMenuModal &&
        editMenuRef.current &&
        !editMenuRef.current.contains(e.target)
      ) {
        setEditMenuModal(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [editMenuModal, setEditMenuModal]);
  return (
    <div
      className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  ${
        editMenuModal
          ? "w-full justify-center items-center flex backdrop-blur bg-black/20 h-screen z-10"
          : "z-[-10]"
      }`}
    >
      <div
        ref={editMenuRef}
        className={` transition-all duration-300 ${
          editMenuModal ? "scale-100" : "scale-0"
        }`}
      >
        <div className="p-4  bg-white shadow-md rounded-lg w-[60vh] ">
          <h2 className="text-xl font-bold mb-2 text-center">
            Edit Menu Information
          </h2>
          {/* Form for editing */}
          <form onSubmit={handleEditSubmit}>
            <div className="h-[50vh] overflow-y-scroll">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Menu Name
                </label>
                <input
                  type="text"
                  name="title"
                  value={editMenu?.title || ""}
                  onChange={handleEditDataChange}
                  className="mt-1 p-2 block w-full rounded-md border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Menu Description
                </label>
                <input
                  type="text"
                  name="description"
                  value={editMenu?.description || ""}
                  onChange={handleEditDataChange}
                  className="mt-1 p-2 block w-full rounded-md border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                />
              </div>
              {/* <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Restaurants</span>
                                </label>
                                <select
                                    onChange={handleEditDataChange}
                                    className="select select-bordered w-full"
                                >
                                    {
                                        restaurantList?.results.map((item) => (
                                            <option value={item.id} key={item.id}>
                                                {item?.name}
                                            </option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Locations</span>
                                </label>
                                <select
                                    onChange={handleEditDataChange}
                                    className="select select-bordered w-full"
                                >
                                    {
                                        restaurantList?.results.map((item) => (
                                            <option value={item.id} key={item.id}>
                                                {item?.name}
                                            </option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Categories</span>
                                </label>
                                <select
                                    onChange={handleEditDataChange}
                                    className="select select-bordered w-full"
                                >
                                    {
                                        restaurantList?.results.map((item) => (
                                            <option value={item.id} key={item.id}>
                                                {item?.name}
                                            </option>
                                        ))
                                    }
                                </select>
                            </div> */}
            </div>
            <div className="modal-action">
              <label htmlFor="menuModal">
                <button
                  name="save"
                  className="bg-[#42C2FF] text-white px-4 py-2 rounded-lg mt-2"
                  type="submit"
                >
                  + Edit New Menu
                </button>
              </label>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditMenuModal;
