import React, { useState } from "react";
import toast from "react-hot-toast";
import { useCreateItemMutation } from "../../../../redux/features/itemCreation/itemCreationApi";

const AddItemsModifierModal = ({ selectedRestaurant }) => {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
  });

  const [createItem] = useCreateItemMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCreateModifier = async () => {
    try {
      const formattedData = {
        name: formData.name || "",
        base_price: parseFloat(formData.price) || 0,
        restaurant: selectedRestaurant || 0,
      };

      // Wait for the item creation to complete
      await createItem(formattedData);

      // Show toast message on successful creation
      toast.success("Modifier created successfully");

      // Close the modal
      document.getElementById("my_modal_20").close();
    } catch (error) {
      // Handle any errors if necessary
      console.error("Error creating item:", error);
      toast.error("Failed to create modifier item");
    }
  };

  return (
    <>
      <button
        disabled={selectedRestaurant === 0}
        className={`${
          selectedRestaurant === 0
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-[#42C2FF] cursor-pointer"
        } text-white py-2 rounded-lg mt-4 grid col-span-4 items-center gap-2 w-full text-sm whitespace-nowrap`}
        onClick={() => document.getElementById("my_modal_20").showModal()}
      >
        Add Modifier Items
      </button>
      <dialog id="my_modal_20" className="modal">
        <div className="modal-box p-10">
          <h3 className="text-xl font-bold mb-5">Create a new modifier</h3>
          <div className="flex flex-col gap-2">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Modifier Name"
              className="input input-bordered w-full"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="price">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="Price"
              className="input input-bordered w-full"
            />
          </div>

          <div className="flex gap-3">
            <span
              onClick={handleCreateModifier}
              className="cursor-pointer bg-[#42C2FF] text-white px-4 py-2 rounded-lg mt-4 grid col-span-4 items-center gap-2 w-full "
            >
              Save Changes
            </span>
            <span
              onClick={() => document.getElementById("my_modal_20").close()}
              className="cursor-pointer border border-[#42C2FF] bg-transparent text-[#42C2FF] px-4 py-2 rounded-lg mt-4 grid col-span-4 items-center gap-2 w-full "
            >
              Cancel
            </span>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop"></form>
      </dialog>
    </>
  );
};

export default AddItemsModifierModal;
