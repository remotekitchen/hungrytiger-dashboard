import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useUpdateItemMutation } from "../../../redux/features/itemCreation/itemCreationApi";

const EditItemForm = ({ setIsEditItemModalOpen }) => {
  const { selecteditem } = useSelector((state) => state.itemCreation);
  const {
    name,
    description,
    base_price: itemPrice,
    images,
    id,
  } = selecteditem || {};
  const [updateItem, { isLoading, isError, isSuccess, data }] =
    useUpdateItemMutation();
  // update the item
  const handleItemUpdate = (e) => {
    e.preventDefault();
    const itemFormData = {
      name: e.target.name.value,
      description: e.target.description.value,
      remote_url: e.target.remote_url.value,
      base_price: e.target.base_price.value,
    };
    updateItem({ id, itemFormData });
  };
  useEffect(() => {
    if (isSuccess) setIsEditItemModalOpen(false);
  }, [isSuccess, setIsEditItemModalOpen]);
  return (
    <div>
      <h3 className="text-xl font-bold">Item Info</h3>
      <form onSubmit={handleItemUpdate}>
        {/* name */}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Name</span>
          </label>
          <input
            name="name"
            defaultValue={name}
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-md"
          />
        </div>
        {/* description */}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <textarea
            name="description"
            defaultValue={description}
            className="textarea textarea-bordered max-w-md"
            placeholder="Description"
          ></textarea>
        </div>
        {/* price */}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Price</span>
          </label>
          <input
            name="base_price"
            defaultValue={itemPrice}
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-md"
          />
        </div>
        {/* images */}
        <div className="form-control w-full">
          {/* show images here */}
          <div className="">
            {images?.map((item) => (
              <>
                <div className="avatar mx-1 mt-6">
                  <div className="w-24 rounded-xl">
                    <img src={item?.remote_url} />
                  </div>
                </div>
              </>
            ))}
          </div>
          <label className="label">
            <span className="label-text">Image URL</span>
          </label>
          <input
            name="remote_url"
            type="text"
            placeholder="Type here"
            className="input input-bordered w-full max-w-md"
          />
        </div>
        <button
          name="save"
          className="btn btn-primary btn-md my-8 text-white px-8"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default EditItemForm;
