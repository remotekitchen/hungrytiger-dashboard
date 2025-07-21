import React from "react";
import { useCreateItemMutation } from "../../../../redux/features/itemCreation/itemCreationApi";

const ItemModal = ({ menu, restaurant, category, setIsModalOpen }) => {
  const [
    createItem,
    { data: createdItemDat, isLoading, isError, error, isSuccess },
  ] = useCreateItemMutation();
  const handleItemSubmission = async (e) => {
    e.preventDefault();
    const itemObj = {
      name: e.target.itemName.value,
      description: e.target.itemDescription.value,
      menu: menu,
      restaurant: restaurant,
      base_price: parseInt(e.target.basePrice.value),
      original_image: [{ remote_url: e.target.itemImage.value }],
      category: [category],
    };
    await createItem(itemObj);
    setIsModalOpen(false);
  };
  // if (isSuccess) // console.log(createdItemDat);
  return (
    <>
      <input type="checkbox" id="itemModal" className="modal-toggle" />
      <label htmlFor="itemModal" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          {/* form  */}
          <form onSubmit={handleItemSubmission}>
            <h1 className="text-2xl mb-6 font-bold font-sans">Add An Item</h1>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Item Name</span>
              </label>
              <input
                name="itemName"
                type="text"
                placeholder="item Name"
                className="input input-bordered w-full"
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Item Image</span>
              </label>
              <input
                name="itemImage"
                type="text"
                placeholder="place your image url here"
                className="input input-bordered w-full"
              />
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Base Price</span>
              </label>
              <input
                name="basePrice"
                type="number"
                min={0}
                placeholder="0.00 $"
                className="input input-bordered w-full"
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <textarea
                className="textarea textarea-bordered"
                placeholder="Description"
                name="itemDescription"
              ></textarea>
            </div>
            <div className="modal-action">
              <label htmlFor="itemModal">
                <button
                  name="save"
                  className="btn btn-primary text-white"
                  type="submit"
                >
                  Save
                </button>
              </label>
            </div>
          </form>
        </label>
      </label>
    </>
  );
};

export default ItemModal;
