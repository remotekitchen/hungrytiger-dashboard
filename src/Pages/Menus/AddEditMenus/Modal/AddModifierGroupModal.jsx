import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useGetAllItemsQuery } from "../../../../redux/features/itemCreation/itemCreationApi";
import { useGetRestaurentsQuery } from "../../../../redux/features/menuCreation/menuCreationApi";

const AddModifierGroupModal = ({
  isEditing,
  modifierGroupDetails,
  selectedModifierGroupSelector,
}) => {
  const dispatch = useDispatch();

  const {
    data: restaurantList,
    isLoading: isRestaurantLoading,
    isError: isRestaurantError,
    error: restaurantError,
  } = useGetRestaurentsQuery();

  // // console.log(restaurantList);

  const { data: allItems, isLoading, isError, error } = useGetAllItemsQuery(1);

  // // console.log(allItems);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    requirement_status: "",
    menu: "",
    restaurant: "",
    modifier_items: [],
    used_by: [],
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "used_by") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: [value],
      }));
    } else if (type === "radio") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: checked ? value : "",
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // const mutationFunction = editMode ? addModifierGroup : updateModifierGroup;

    // addModifierGroup(formData)
    //   .unwrap()
    //   .then((result) => {
    //     setShowModifierGroup((prev) => !prev);
    //   })
    //   .catch((error) => {
    //     console.error("Error:", error);
    //   });
  };

  // console.log(formData);
  return (
    <>
      <input
        type="checkbox"
        id={
          isEditing
            ? `add_modifier_modal_${modifierGroupDetails.id}`
            : "add_modifier_modal_"
        }
        className="modal-toggle"
      />

      <div className="modal">
        <div className="modal-box">
          <h1 className="text-2xl mb-6 font-bold font-sans">
            {isEditing ? "Edit" : "Add"} Modifier Group
          </h1>
          <form onSubmit={handleSubmit}>
            <h1 className="font-bold mb-2">Modifier Group Name</h1>
            <label>
              <input
                name="name"
                placeholder="item name"
                type="text"
                className="border border-[#DDE1E6] rounded-lg w-full p-2"
                onChange={handleChange}
              />
            </label>
            <h1 className="font-bold mb-2">Modifier Group Description</h1>
            <label>
              <input
                placeholder="item description"
                type="text"
                className="border border-[#DDE1E6] rounded-lg w-full p-2"
              />
            </label>
            <h1 className="my-4 font-bold">Restaurant</h1>

            <label>
              <select
                // onChange={handleRestaurantChange}
                name="restaurant"
                id=""
                className="border border-[#DDE1E6] rounded-lg w-full p-2"
              >
                <option selected>Select Restaurant</option>
                {restaurantList?.results?.map((item, index) => (
                  <option
                    key={index}
                    value={item.id}
                    selected={modifierGroupDetails?.restaurant === item.id}
                  >
                    {item.name}
                  </option>
                ))}
              </select>
            </label>
            <h1 className="my-4 font-bold">Modifier Type</h1>
            <label>
              <div className="flex items-center mb-4">
                <input
                  id="default-radio-1"
                  type="radio"
                  value="all"
                  name="default-radio"
                  className="w-4 h-4 text-[#42C2FF]"
                  // onChange={handleOptionChange}
                  // checked={selectedOption === "all"}
                />
                <label htmlFor="default-radio-1" className="ml-2 font-medium">
                  Required
                </label>
              </div>

              <div className="flex items-center">
                <input
                  id="default-radio-2"
                  type="radio"
                  value="members"
                  name="default-radio"
                  className="w-4 h-4 text-[#42C2FF]"
                  // onChange={handleOptionChange}
                  // checked={selectedOption === "members"}
                />
                <label htmlFor="default-radio-2" className="ml-2 font-medium">
                  Optional
                </label>
              </div>
            </label>
            <h1 className="my-4 font-bold">Set modifier limit type</h1>
            <label>
              <select
                name=""
                id=""
                className="border border-[#DDE1E6] rounded-lg w-full p-2"
              >
                <option selected>Up to a maximum number</option>
              </select>
            </label>
            <h1 className="font-bold mb-2">Set modifier Limit</h1>
            <label>
              <input
                placeholder="limit"
                type="text"
                className="border border-[#DDE1E6] rounded-lg w-full p-2"
              />
            </label>
            <h1 className="my-4 font-bold">Items using this Modifier Group</h1>
            <label>
              <select
                name="items"
                id=""
                className="border border-[#DDE1E6] rounded-lg w-full p-2 mt-2"
              >
                <option selected>Select item</option>
                {allItems?.results?.map((item, index) => (
                  <option
                    key={index}
                    value={item.id}
                    selected={modifierGroupDetails?.items === item.id}
                  >
                    {item.name}
                  </option>
                ))}
              </select>
            </label>
            <button
              type="submit"
              className={`bg-[#42C2FF] text-white px-4 py-2 rounded-lg mt-4 flex items-center gap-2`}
            >
              {isEditing ? "Save Changes" : " + Add New Modifier Group"}
            </button>
          </form>
        </div>
        <label
          onClick={() =>
            dispatch(
              selectedModifierGroup({
                isEditing: false,
                selectedItemData: {},
              })
            )
          }
          className="modal-backdrop"
          htmlFor={
            isEditing
              ? `add_modifier_modal_${modifierGroupDetails.id}`
              : "add_modifier_modal_"
          }
        >
          Close
        </label>
      </div>
    </>
  );
};

export default AddModifierGroupModal;
