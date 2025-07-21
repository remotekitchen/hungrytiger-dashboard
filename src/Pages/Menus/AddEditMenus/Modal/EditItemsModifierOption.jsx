import React, { useState } from "react";
import toast from "react-hot-toast";
import { useCreateItemMutation } from "../../../../redux/features/itemCreation/itemCreationApi";

const EditItemsModifierOption = ({ selectedRestaurant }) => {
  const [isFormItems, setIsFormItems] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
  });

  const [createItem, { isSuccess: modifierSuccess }] = useCreateItemMutation();

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
      // toast.success("Modifier created successfully");
      toast.success("Modifier created successfully", {
        style: {
          zIndex: 999999999999999999999999999999,
        },
      });
      setIsFormItems(!isFormItems);
    } catch (error) {
      // Handle any errors if necessary
      console.error("Error creating item:", error);
      toast.error("Failed to create modifier item");
    }
  };

  return (
    <div className=" mb-5">
      <span
        onClick={() => setIsFormItems(!isFormItems)}
        className="bg-[#42C2FF] cursor-pointer text-white px-4 py-2 rounded-lg mt-4"
      >
        Add Modifier Items
      </span>

      {isFormItems && (
        <div className="border-2 border-gray-300 p-2 mt-5 rounded-lg">
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
              className="cursor-pointer bg-transparent border-2 border-[#42C2FF] hover:bg-[#42C2FF] text-black text-center transition-all duration-300 hover:text-white px-4 py-2 rounded-lg mt-4 grid col-span-4 items-center gap-2 w-full "
            >
              Save Changes
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditItemsModifierOption;
