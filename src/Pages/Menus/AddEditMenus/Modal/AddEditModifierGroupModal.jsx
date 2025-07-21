import React, { useEffect, useState } from "react";
import { useGetAllItemsQuery } from "../../../../redux/features/itemCreation/itemCreationApi";
import {
  useGetAllMenuQuery,
  useGetLocationsQuery,
  useGetRestaurentsQuery,
} from "../../../../redux/features/menuCreation/menuCreationApi";
import {
  useAddModifierGroupMutation,
  useUpdateModifierGroupMutation,
} from "../../../../redux/features/modifierGroup/modifierGroupApi";
import AddItemsModifierModal from "./AddItemsModifierModal";
import AddModifierComponent from "./AddModifierCompo";
import AddModifierItemSelect from "./AddModifieritemSelect";
import AddModifierUsedBySelect from "./AddModiifierUsedBySelect";

const AddEditModifierGroupModal = ({
  isEditing,
  modifierGroupDetails,
  modifierItems,
  showModifierGroup,
  setShowModifierGroup,
}) => {
  // console.log(modifierItems, 'modifierItems.id');
  const modifierGroupId = modifierItems?.id;
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    requirement_status: "",
    menu: 0,
    locations: 0,
    restaurant: 0,
    limit_type: 0,
    used_by: [],
  });

  const [addModifierGroup] = useAddModifierGroupMutation();
  const [updateModifierGroup] = useUpdateModifierGroupMutation();
  const [items, setItems] = useState([]);
  const [usedBy, setUsedBy] = useState([]);
  const [addFromExcel, setAddFromExcel] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addModifierModal, setAddModifierModal] = useState(false);
  const { data: getRestaurentsData } = useGetRestaurentsQuery();
  // console.log("🚀 ~ getRestaurentsData:", getRestaurentsData?.results);
  const [getSearchInput, setGetSearchInput] = useState("");
  const [page, setPage] = useState(1);
  const { data: getAllItemsData } = useGetAllItemsQuery({
    page,
    restaurantId: parseInt(formData?.restaurant),
    searchInputValue: getSearchInput,
    refetchOnMountOrArgChange: true,
  });

  const {
    data: allMenus,
    isLoading: menuLoading,
    isError: isMenuError,
    error: menuError,
  } = useGetAllMenuQuery({ restaurant: formData?.restaurant });

  // // console.log("formDataaaaaaaaaaaaaa3333333", parseInt(formData?.restaurant));

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "used_by") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: [value],
      }));
    } else if (name === "restaurant") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: [value],
      }));
    } else if (name === "locations") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: [value],
      }));
    } else if (name === "menu") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: [value],
      }));
    } else if (name === "limit_type") {
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
  const {
    data: locationList,
    isSuccess: isLocationSuccess,
    isLoading: isLocationLoading,
  } = useGetLocationsQuery({ restaurantId: formData?.restaurant });
  // // console.log("locationsssssssssss", formData?.locations);

  useEffect(() => {
    // Check if there's exactly one restaurant
    if (getRestaurentsData?.results?.length === 1) {
      const restaurantData = getRestaurentsData?.results[0];
      // default location
      let locationData = null;
      if (locationList?.results?.length === 1) {
        locationData = locationList.results[0];
      }
      // default menu set
      let menuData = null;
      if (allMenus?.results?.length === 1) {
        menuData = allMenus?.results[0];
      }
      // Set the default values if only one restaurant exists
      setFormData((prevState) => ({
        ...prevState,
        restaurant: restaurantData?.id,
        locations: locationData?.id,
        menu: menuData?.id,
      }));
    }
  }, [getRestaurentsData, locationList, allMenus]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formatedData = {
      name: formData?.name || "",
      description: formData?.description || "",
      requirement_status: formData?.requirement_status || "",
      locations: [parseInt(formData?.locations)] || [],
      menu: parseInt(formData?.menu) || 0,
      restaurant: parseInt(formData?.restaurant) || 0,
      modifier_items: items,
      // item_limit: itemsLimit,
      item_limit: parseInt(formData?.limit_type),
      used_by: usedBy,
    };
    // console.log('formatedData', formatedData);

    // const mutationFunction = editMode ? addModifierGroup : updateModifierGroup;

    addModifierGroup(formatedData)
      .unwrap()
      .then((result) => {
        setShowModifierGroup((prev) => !prev);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  // ========= Modifier
  const [selectedRestaurant, setSelectedRestaurant] = useState();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // console.log(formData, 'formData');

  return (
    <>
      <input
        type="checkbox"
        id={
          isEditing
            ? `add_modifier_modal_${modifierItems?.id}`
            : "add_modifier_modal_"
        }
        className="modal-toggle"
      />

      {/* <div className="modal"> */}
      <div className={`modal ${!showModifierGroup ? "hidden" : ""}`}>
        <div className="modal-box">
          <div className="flex justify-between items-center">
            <h1 className="text-xl mb-6 font-bold font-sans">
              {isEditing ? "Edit" : "Add"} Modifier Group
            </h1>
            {!addFromExcel ? (
              <label
                onClick={() => setAddFromExcel(!addFromExcel)}
                className="bg-[#42C2FF] text-white px-4 py-2 rounded-lg cursor-pointer"
              >
                + Add Modifier From Excel
              </label>
            ) : (
              <label
                onClick={() => setAddFromExcel(!addFromExcel)}
                className="bg-[#42C2FF] text-white px-4 py-2 rounded-lg cursor-pointer"
              >
                + Add Modifier Manually
              </label>
            )}
          </div>
          {!addFromExcel ? (
            <form onSubmit={handleSubmit}>
              <h1 className="font-bold mb-2">Modifier Group Name</h1>

              {/* Modifier Name */}
              <label>
                <input
                  placeholder="item name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  className="border border-[#DDE1E6] rounded-lg w-full p-2"
                />
              </label>
              <h1 className="font-bold mb-2">Modifier Group Description</h1>
              <label>
                <input
                  placeholder="item description"
                  name="description"
                  type="text"
                  value={formData.description}
                  onChange={handleChange}
                  className="border border-[#DDE1E6] rounded-lg w-full p-2"
                />
              </label>
              <h1 className="my-4 font-bold">Restaurant</h1>

              {/* Restaurant Name */}
              <label>
                <select
                  name="restaurant"
                  id="restaurant"
                  value={formData.restaurant}
                  onChange={handleChange}
                  className="border border-[#DDE1E6] rounded-lg w-full p-2"
                >
                  <option>Select Restaurant</option>
                  {getRestaurentsData?.results?.map((restaurant) => (
                    <option key={restaurant.id} value={restaurant.id}>
                      {restaurant.name}
                    </option>
                  ))}
                </select>
              </label>

              {/* locations  */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Locations</span>
                </label>
                <select
                  name="locations"
                  onChange={handleChange}
                  className="select select-bordered w-full"
                  value={formData?.locations}
                >
                  <option disabled selected>
                    Select location
                  </option>
                  {locationList?.results.map((item) => (
                    <option value={item.id} key={item.id}>
                      {item?.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* select menu  */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Select Menu</span>
                </label>
                <select
                  name="menu"
                  onChange={handleChange}
                  value={formData?.menu}
                  className="select select-bordered w-full"
                >
                  <option selected>Select Menu</option>
                  {allMenus?.results?.map((menu) => (
                    <option key={menu.id} value={menu.id}>
                      {menu.title}
                    </option>
                  ))}
                </select>
              </div>

              <h1 className="my-4 font-bold">Modifier Type</h1>

              {/* Modifier type */}
              <label>
                <div className="flex items-center mb-4">
                  <input
                    id="default-radio-1"
                    type="radio"
                    value="Required"
                    name="requirement_status"
                    className="w-4 h-4 text-[#42C2FF]"
                    onChange={handleChange}
                    checked={formData.requirement_status === "Required"}
                  />
                  <label htmlFor="default-radio-1" className="ml-2 font-medium">
                    Required
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    id="default-radio-2"
                    type="radio"
                    value="Optional"
                    name="requirement_status"
                    className="w-4 h-4 text-[#42C2FF]"
                    onChange={handleChange}
                    checked={formData.requirement_status === "Optional"}
                  />
                  <label htmlFor="default-radio-2" className="ml-2 font-medium">
                    Optional
                  </label>
                </div>
              </label>
              <h1 className="my-4 font-bold">Set modifier limit type</h1>
              {/* Set limit type and not going in the form */}
              {/* <label>
                <select
                  name=""
                  id=""
                  className="border border-[#DDE1E6] rounded-lg w-full p-2"
                >
                  <option selected>Up to a maximum number</option>
                </select>
              </label> */}

              <input
                placeholder="Limit type"
                name="limit_type"
                type="number"
                // value=""
                onChange={handleChange}
                className="border border-[#DDE1E6] rounded-lg w-full p-2"
              />
              {/* NOTE: remove this commit test commit for deployment */}
              {/* modifier limit type  */}
              {/* <div>
                <h1 className="font-bold mb-2">Set modifier Limit</h1>
                <label>
                  <input
                    placeholder="limit"
                    type="text"
                    name="used_by"
                    value={formData.used_by}
                    onChange={handleChange}
                    className="border border-[#DDE1E6] rounded-lg w-full p-2"
                  />
                </label>
              </div> */}
              <p className="my-4 font-medium">Modifier Items</p>

              {/* Modifier Items Name */}
              {/* <label>
              <select
                name="modifier_items"
                id="modifier_items"
                className="border border-[#DDE1E6] rounded-lg w-full p-2 mt-2"
                onChange={handleChange}
                value={formData.modifier_items}
              >
                <option selected>Add Items as options</option>
                {getAllItemsData?.results?.map((item, index) => (
                  <option
                    key={index}
                    value={item.id}
                    selected={modifierGroupDetails?.items === item.id}
                  >
                    {item.name}
                  </option>
                ))}
              </select>
            </label> */}

              {/* infinity for select items  */}

              <div className="w-full grid grid-cols-12 justify-between items-center gap-3">
                <AddModifierItemSelect
                  page={page}
                  setPage={setPage}
                  loadItems={getAllItemsData}
                  setModifierItems={setItems}
                  getSearchInput={getSearchInput}
                  selectedRestarauntId={formData?.restaurant}
                  setGetSearchInput={setGetSearchInput}
                />
                {/* <AddItemsModifierModal /> */}
                <AddItemsModifierModal
                  selectedRestaurant={parseInt(formData?.restaurant)}
                />
              </div>

              <h1 className="my-4 font-bold">
                Items using this Modifier Group
              </h1>

              {/* Modifier menu Name */}

              {/* Modifier Menu id needed in the Form*/}

              {/* <label>
                <select
                  name="menu"
                  id="menu"
                  className="border border-[#DDE1E6] rounded-lg w-full p-2 mt-2"
                  onChange={handleChange}
                  value={formData.menu}
                >
                  <option value="" disabled>
                    Select Menu
                  </option>
                  {getAllItemsData?.results?.map((item, index) => (
                    <option key={index} value={item.menu}>
                      {item.menu_name}
                    </option>
                  ))}
                </select>
              </label> */}

              <AddModifierUsedBySelect
                page={page}
                setPage={setPage}
                loadItems={getAllItemsData}
                setUsedBy={setUsedBy}
                getSearchInput={getSearchInput}
                selectedRestarauntId={formData?.restaurant}
                setGetSearchInput={setGetSearchInput}
              />

              <button
                type="submit"
                className="bg-[#42C2FF] text-white px-4 py-2 rounded-lg mt-4 flex items-center gap-2"
              >
                {isEditing ? "Save Changes" : " + Add New Modifier Group"}
              </button>
            </form>
          ) : (
            <AddModifierComponent
              getRestaurentsData={getRestaurentsData}
              setAddFromExcel={setAddFromExcel}
              locationList={locationList}
              selectedRestaurant={selectedRestaurant}
              setSelectedRestaurant={setSelectedRestaurant}
              setShowModifierGroup={setShowModifierGroup}
            />
          )}
        </div>
        <label
          onClick={() => {
            false;
          }}
          className="modal-backdrop"
          htmlFor={
            isEditing
              ? `add_modifier_modal_${modifierItems?.id}`
              : "add_modifier_modal_"
          }
        >
          Close
        </label>
      </div>
    </>
  );
};

export default AddEditModifierGroupModal;
