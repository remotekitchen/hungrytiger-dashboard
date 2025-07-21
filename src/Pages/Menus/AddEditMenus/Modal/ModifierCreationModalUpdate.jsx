import React, { forwardRef, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useCreateItemMutation } from "../../../../redux/features/itemCreation/itemCreationApi";
import { useGetRestaurentsQuery } from "../../../../redux/features/menuCreation/menuCreationApi";

const ModifierCreationModalUpdate = forwardRef((props, ref) => {
  const [formData, setFormData] = useState({
    restaurant: 0,
    name: "",
    price: "",
  });

  const [createItem] = useCreateItemMutation();

  // to get the all restaurants
  const {
    data: restaurantList,
    isLoading: restaurantListLoading,
    isError: isRestaurantListError,
    error: restaurantListError,
  } = useGetRestaurentsQuery();
  // console.log(
  //   "🚀 ~ ModifierCreationModalUpdate ~ restaurantList_formData:",
  //   formData
  // );
  let optionContent;
  if (restaurantListLoading) optionContent = <option>Loading...</option>;
  else if (isRestaurantListError)
    optionContent = (
      <option>Something went wrong loading the restaurant</option>
    );
  else if (restaurantList.results.length === 0)
    optionContent = <option>No restaurant available right now</option>;
  else
    optionContent = restaurantList.results.map((item) => (
      <option value={item.id} key={item.id}>
        {item?.name}
      </option>
    ));

  // set default restaurant value
  useEffect(() => {
    if (restaurantList?.results) {
      restaurantList?.results?.map((r) =>
        setFormData({
          restaurant: r?.id,
        })
      );
    }
  }, [restaurantList]);

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
        base_price: parseInt(formData.price) || 0,
        restaurant: formData?.restaurant || 0,
      };

      // Wait for the item creation to complete
      await createItem(formattedData);

      // Show toast message on successful creation
      toast.success("Modifier created successfully");

      // Close the modal
      document.getElementById("my_modal_2").close();
    } catch (error) {
      // Handle any errors if necessary
      console.error("Error creating item:", error);
      toast.error("Failed to create modifier item");
    }
  };

  return (
    <dialog id="my_modal_2" className="modal" ref={ref}>
      <div className="modal-box p-10">
        <h3 className="text-xl font-bold mb-5">Create a new modifier</h3>
        <div className="flex flex-col gap-2">
          <label className="form-control w-full mb-2">
            <span className="label-text pb-2">Select Restaurant</span>
            <select
              className="select select-bordered w-full max-w-xs"
              name="restaurant"
              value={formData.restaurant}
              onChange={handleChange}
            >
              <option value="">Select Restaurant</option>
              {optionContent}
            </select>
          </label>
        </div>
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
            onClick={() => document.getElementById("my_modal_2").close()}
            className="cursor-pointer border border-[#42C2FF] bg-transparent text-[#42C2FF] px-4 py-2 rounded-lg mt-4 grid col-span-4 items-center gap-2 w-full "
          >
            Cancel
          </span>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button type="button" onClick={() => ref.current.close()}>
          {props.closeText || "close"}
        </button>
      </form>
    </dialog>
  );
});

export default ModifierCreationModalUpdate;
