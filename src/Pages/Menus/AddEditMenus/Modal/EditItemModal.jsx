import React, { useEffect, useRef } from "react";
import toast from "react-hot-toast";
import { useUpdateItemMutation } from "../../../../redux/features/itemCreation/itemCreationApi";

const EditItemModal = ({ editItem, setEditItem, item, setItem }) => {
  // // console.log("🚀 ~ EditItemModal ~ item------------:", item);
  const editItemsRef = useRef();

  useEffect(() => {
    setItem(item);
  }, [item]);

  const handleEditDataChange = (e) => {
    const { name, value } = e.target;
    setItem({
      ...item,
      [name]: value,
    });
  };

  const [updateItem, { isLoading, isError, isSuccess, data }] =
    useUpdateItemMutation();
  // update the item
  const handleItemUpdate = (e) => {
    e.preventDefault();

    updateItem({ id: item.id, item });
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("item Edited Successfully");
      setEditItem(false);
    }
    if (isError) {
      // // console.log(isError)
    }
  }, [isSuccess]);

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (
        editItem &&
        editItemsRef.current &&
        !editItemsRef.current.contains(e.target)
      ) {
        setEditItem(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [editItem, setEditItem]);
  return (
    <div
      className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  ${
        editItem
          ? "w-full justify-center items-center flex backdrop-blur bg-black/20 h-screen z-10"
          : "z-[-10]"
      }`}
    >
      <div
        ref={editItemsRef}
        className={` transition-all duration-300 ${
          editItem ? "scale-100" : "scale-0"
        }`}
      >
        <div className="p-4  bg-white shadow-md rounded-lg w-[60vh] ">
          <form onSubmit={handleItemUpdate}>
            <h1 className="text-2xl mb-6 font-bold font-sans">Edit An Item</h1>
            <div className="h-[40vh] overflow-y-scroll">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Item Name</span>
                </label>
                <input
                  placeholder="item Name"
                  className="input input-bordered w-full"
                  type="text"
                  name="name"
                  value={item?.name || ""}
                  onChange={handleEditDataChange}
                />
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Item Image</span>
                </label>
                <input
                  name="remote_url"
                  value={item?.original_image?.remote_url || ""}
                  type="text"
                  placeholder="place your image url here"
                  className="input input-bordered w-full"
                  onChange={handleEditDataChange}
                />
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Base Price</span>
                </label>
                <input
                  name="base_price"
                  value={item?.base_price || ""}
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full"
                  onChange={handleEditDataChange}
                />
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Description</span>
                </label>
                <textarea
                  className="textarea textarea-bordered"
                  placeholder="Description"
                  name="description"
                  value={item?.description || ""}
                  onChange={handleEditDataChange}
                ></textarea>
              </div>
            </div>
            <div className="modal-action">
              <label htmlFor="itemModal">
                <button
                  name="save"
                  className="bg-[#42C2FF] text-white px-4 py-2 rounded-lg mt-2"
                  type="submit"
                >
                  + Edit New Item
                </button>
              </label>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditItemModal;
