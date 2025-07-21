import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdDeleteForever, MdEdit } from "react-icons/md";
import { useGetItemsWithoutPaginationQuery } from "../../../../redux/features/itemCreation/itemCreationApi";
import {
  useGetAllMenuQuery,
  useGetLocationsQuery,
  useGetRestaurentsQuery,
} from "../../../../redux/features/menuCreation/menuCreationApi";
import {
  useAddModifierGroupMutation,
  useDeleteModifierItemsMutation,
  useDeleteModifierUsedByItemsMutation,
  useGetModifierGroupByIdQuery,
  useGetModifierGroupQuery,
  useUpdateModifierGroupMutation,
  useUpdateModifierItemMutation,
} from "../../../../redux/features/modifierGroup/modifierGroupApi";
import AddModifierComponent from "./AddModifierCompo";
import EditItemsModifierOption from "./EditItemsModifierOption";
import EditModifierUsedBySelect from "./EditModifierUsedbySelect";
import SingleModifierSelect from "./SingleModifierSelect";
const EditModifierModal = ({
  modifierGroupDetails,
  setShowModifierGroup,
  modifierItems,
  restaurant,
  menuName,
  locationId,
}) => {
  const [selectedPage, setSelectedPage] = useState(1);
  const modifierGroupId = modifierItems?.id;

  // // console.log(modifierGroupId, 'modifierGroupId');

  const [
    updateModifierItem,
    {
      isLoading: updatedItemLoading,
      isError: updatedItemError,
      isSuccess: isUpdatedItemSuccess,
      data,
    },
  ] = useUpdateModifierItemMutation();

  const [editingItemId, setEditingItemId] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [editedPrice, setEditedPrice] = useState("");

  const handleEditClick = (item) => {
    setEditingItemId(item.id);
    setEditedName(item?.menu_item.name);
    setEditedPrice(item?.menu_item.base_price);
  };

  const handleSaveEdit = async (itemId) => {
    const updatedItem = {
      name: editedName,
      base_price: parseFloat(editedPrice),
    };

    await updateModifierItem({ id: itemId, item: updatedItem });
    setEditingItemId(null); // Exit edit mode after saving
  };

  const {
    data: allModifierGroups,
    isLoading,
    isError,
    error,
  } = useGetModifierGroupQuery({
    page: selectedPage,
    restaurantId: restaurant,
    menuIds: menuName,
    locationId: locationId,
  });

  const {
    data: getModifierGroupById,
    isLoading: modifierGroupByIdLoading,
    isError: modifierGroupByIdIsError,
    error: modifierGroupByIdError,
  } = useGetModifierGroupByIdQuery(modifierGroupId);

  // console.log(
  // 	'getModifierGroupById',
  // 	getModifierGroupById?.modifiergrouporder_set?.map((i) => i)
  // );

  const filteredModifiers = allModifierGroups?.results?.filter(
    (group) => group.id === modifierGroupId
  );

  // console.log(filteredModifiers, 'filteredModifiers');

  const [
    deleteModifierItems,
    {
      isLoading: deleteModifierItemsLoading,
      isSuccess: deleteModifierItemsSuccess,
      isError: deleteModifierItemsIsError,
      error: deleteModifierItemsError,
    },
  ] = useDeleteModifierItemsMutation();

  const [
    deleteModifierUsedByItems,
    {
      isLoading: deleteModifierUsedByItemsLoading,
      isSuccess: deleteModifierUsedByItemsSuccess,
      isError: deleteModifierUsedByItemsIsError,
      error: deleteModifierUsedByItemsError,
    },
  ] = useDeleteModifierUsedByItemsMutation();

  const handleDeleteModifierItem = async (id) => {
    try {
      await deleteModifierItems(id).unwrap();
      toast.success("Modifier Item deleted successfully");
    } catch (error) {
      console.error("Error:", error);
      toast.error(error?.data?.detail || "Failed to delete modifier item");
    }
  };

  const handleDeleteModifierUsedByItem = async (id) => {
    try {
      await deleteModifierUsedByItems(id).unwrap();
      toast.success("Modifier Item deleted successfully");
    } catch (error) {
      console.error("Error:", error);
      toast.error(error?.data?.detail || "Failed to delete modifier item");
    }
  };

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

  useEffect(() => {
    if (modifierItems) {
      setFormData({
        name: modifierItems.name || "",
        description: modifierItems.description || "",
        requirement_status: modifierItems.requirement_status || "",
        menu: modifierItems.menu || 0,
        locations:
          Array.isArray(modifierItems.locations) &&
          modifierItems.locations.length > 0
            ? modifierItems.locations[0]
            : 0,
        restaurant: parseInt(modifierItems?.restaurant) || 0,
        limit_type: parseInt(modifierItems.item_limit) || 0,
      });
    }
  }, [modifierItems]);
  const [addModifierGroup] = useAddModifierGroupMutation();
  const [updateModifierGroup, { isSuccess: modifierSuccess }] =
    useUpdateModifierGroupMutation();
  const [items, setItems] = useState([]);
  // console.log('🚀 ~ items:', items);
  const [itemsLimit, setItemsLimit] = useState([]);
  const [addFromExcel, setAddFromExcel] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addModifierModal, setAddModifierModal] = useState(false);
  const { data: getRestaurentsData } = useGetRestaurentsQuery();
  const [getSearchInput, setGetSearchInput] = useState("");
  const [page, setPage] = useState(1);

  const {
    data: getAllItemsData,
    isLoading: itemsLoading,
    refetch,
  } = useGetItemsWithoutPaginationQuery({
    restaurantId: restaurant,
  });

  const [getAllItemsDataWithoutCategory, setGetAllItemsDataWithoutCategory] =
    useState([]);
  console.log(getAllItemsDataWithoutCategory, "itemsWithoutCategory");
  const [
    getAllItemsDatWithoutModifierItems,
    setGetAllItemsDataWithoutModifierItems,
  ] = useState([]);

  useEffect(() => {
    if (getAllItemsData) {
      setGetAllItemsDataWithoutCategory(
        getAllItemsData
          .filter((item) => !item?.category?.length)
          .filter((item) =>
            item?.name?.toLowerCase().includes(getSearchInput.toLowerCase())
          )
      );
      setGetAllItemsDataWithoutModifierItems(
        getAllItemsData
          .filter((item) => item?.category?.length)
          .filter((item) =>
            item?.name?.toLowerCase().includes(getSearchInput.toLowerCase())
          )
      );
    }
  }, [getAllItemsData, getSearchInput]);

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
    } else if (type === "description") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  // // console.log("locationsssssssssss", formData?.locations);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare the initial formatted data object
    const formatedData = {
      name: formData?.name || "",
      description: formData?.description || "",
      requirement_status: formData?.requirement_status || "",
      locations: [parseInt(formData?.locations)] || [],
      menu: parseInt(formData?.menu) || 0,
      restaurant: parseInt(formData?.restaurant) || 0,
      modifier_items: items,
      item_limit: parseInt(formData?.limit_type),
      used_by: itemsLimit || [],
    };

    // console.log(formData, 'formData');

    // Filter out empty or null/undefined fields
    const cleanedData = Object.fromEntries(
      Object.entries(formatedData).filter(
        ([key, value]) =>
          // value !== NaN &&
          value !== null &&
          value !== undefined &&
          !(Array.isArray(value) && value.length === 0)
      )
    );

    // console.log(cleanedData, 'cleaned data');

    updateModifierGroup({
      id: modifierItems?.id,
      modifierGroupItem: cleanedData,
    })
      .unwrap()
      .then((result) => {
        toast.success("Modifier group updated successfully!");
        document.getElementById("my_modal_3").close();
      })
      .catch((error) => {
        console.error("Error:", error);
        toast.error(error?.data?.detail);
      });
    // // console.log(cleanedData, "cleaned data");
    document.getElementById("my_modal_3").close();
  };

  // ========= Modifier
  const [selectedRestaurant, setSelectedRestaurant] = useState();
  const {
    data: locationList,
    isSuccess: isLocationSuccess,
    isLoading: isLocationLoading,
  } = useGetLocationsQuery({ restaurantId: formData?.restaurant });

  // console.log(formData, 'formData');

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {/* <div className="modal"> */}
      <div className="">
        <div className="">
          <div className="flex justify-between items-center">
            <h1 className="text-xl mb-6 font-bold font-sans">
              Edit Modifier Group
            </h1>
            {/* {!addFromExcel ? (
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
            )} */}
          </div>
          {!addFromExcel ? (
            <form onSubmit={handleSubmit}>
              <h1 className="font-bold mb-2">Modifier Group Name</h1>
              {/* Modifier Name */}
              <label>
                <input
                  required
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
              {/* Restaurent Name */}
              <label>
                <select
                  name="restaurant"
                  id="restaurant"
                  value={formData?.restaurant}
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
                  <option disabled selected>
                    Select Menu
                  </option>
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
                    checked={
                      formData.requirement_status.toLowerCase() ===
                      "required".toLowerCase()
                    }
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
                    checked={
                      formData.requirement_status?.toLowerCase() ===
                      "Optional".toLowerCase()
                    }
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
                value={formData?.limit_type}
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
              {/* infinity for select items & drag & drop modifier  */}
              {/* Add items modifier group  */}
              <div>
                <EditItemsModifierOption
                  selectedRestaurant={parseInt(formData?.restaurant)}
                />
                {filteredModifiers?.map((group) =>
                  group?.modifiers_item_list?.map((item) => (
                    <div
                      key={item.id}
                      className="p-2 rounded-xl bg-gray-200 m-1 flex items-center justify-between"
                    >
                      <div className="flex gap-2">
                        {editingItemId === item.id ? (
                          <>
                            <input
                              type="text"
                              value={editedName}
                              onChange={(e) => setEditedName(e.target.value)}
                              className="input input-bordered input-sm"
                            />
                            <input
                              type="number"
                              value={editedPrice}
                              onChange={(e) => setEditedPrice(e.target.value)}
                              className="input input-bordered input-sm w-28"
                            />
                            <button
                              className="btn btn-sm btn-success"
                              onClick={() => handleSaveEdit(item.menu_item.id)}
                              disabled={updatedItemLoading}
                            >
                              Save
                            </button>
                          </>
                        ) : (
                          <>
                            <p>{item?.menu_item.name}</p>
                            <span className="px-1 bg-blue-300 rounded-lg text-white text-sm">
                              ${item?.menu_item.base_price}
                            </span>
                          </>
                        )}
                      </div>

                      {!editingItemId && (
                        <div className="flex gap-2">
                          <MdEdit
                            onClick={() => handleEditClick(item)}
                            className="cursor-pointer text-blue-500"
                            size={28}
                          />
                          <MdDeleteForever
                            onClick={() => handleDeleteModifierItem(item.id)}
                            className={`cursor-pointer text-red-500 ${
                              updatedItemLoading
                                ? "opacity-50 cursor-not-allowed"
                                : ""
                            }`}
                            size={28}
                            disabled={updatedItemLoading}
                          />
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
              <div className="w-full">
                <SingleModifierSelect
                  loadItems={getAllItemsDataWithoutCategory}
                  setPromotion={setItems}
                  getSearchInput={getSearchInput}
                  selectedRestarauntId={formData?.restaurant}
                  setGetSearchInput={setGetSearchInput}
                  modifierGroupId={modifierGroupId}
                ></SingleModifierSelect>

                {/* <AddItemsModifierModal /> */}
                {/* <AddItemsModifierModal
                  selectedRestaurant={parseInt(formData?.restaurant)}
                /> */}
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

              {/* selected modifier  */}
              {getModifierGroupById?.modifiergrouporder_set?.map((item) => (
                <div
                  key={item?.menu_details.id}
                  className="p-2 rounded-xl bg-gray-200 m-1 flex items-center justify-between"
                >
                  <div className="flex gap-2">
                    <p>{item?.menu_details.name}</p>
                    <span className="px-2 bg-blue-300 rounded-lg text-white py-[1px] ml-2">
                      ${item?.menu_details.price}
                    </span>
                  </div>
                  <MdDeleteForever
                    onClick={() => handleDeleteModifierUsedByItem(item?.id)}
                    className={`cursor-pointer text-red-500 ${
                      deleteModifierItemsLoading
                        ? "opacity-50 cursor-not-allowed"
                        : ""
                    }`}
                    size={28}
                    disabled={deleteModifierItemsLoading}
                  />
                </div>
              ))}
              <EditModifierUsedBySelect
                loadItems={getAllItemsDatWithoutModifierItems}
                setPromotion={setItemsLimit}
                getSearchInput={getSearchInput}
                selectedRestarauntId={formData?.restaurant}
                setGetSearchInput={setGetSearchInput}
                modifierGroupId={modifierGroupId}
              />
              <button
                type="submit"
                className="bg-[#42C2FF] text-white px-4 py-2 rounded-lg mt-4 flex items-center gap-2"
              >
                Save Changes
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
          htmlFor="edit_modifier_group"
        >
          Close
        </label>
      </div>
    </>
  );
};

export default EditModifierModal;
