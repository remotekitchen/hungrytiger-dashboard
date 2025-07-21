import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiEdit, BiSearch } from "react-icons/bi";
import { MdDeleteOutline, MdDragIndicator } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../Components/Loading";
import { createArray } from "../../../core/utils";
import { useUpdateMenuListOrderMutation } from "../../../redux/features/dynamicSorting/dynamicSortingApi";
import {
  useDeleteMenuMutation,
  useGetAllMenuQuery,
  useGetLocationsQuery,
  useGetRestaurentsQuery,
} from "../../../redux/features/menuCreation/menuCreationApi";
import { selectedMenu } from "../../../redux/features/menuCreation/menuCreationSlice";
import { useUpdateMenuInflationMutation } from "../../../redux/features/menuInflation/menuInflationApi";
import {
  useGetStoreStatusQuery,
  useUpdateStoreStatusMutation,
} from "../../../redux/features/storeOpenClose/storeOpenClose";
import ConfirmDeleteModal from "../../Marketing/Modal/ConfirmDeleteModal";
import AddMenuModal from "./Modal/AddMenuModal";
import EditMenuModal from "./Modal/EditMenuModal";

const Menu = () => {
  const [addMenuModal, setAddMenuModal] = useState(false);
  const [isToggled, setIsToggled] = useState(false);
  const [editMenuModal, setEditMenuModal] = useState(false);
  const [editMenu, setEditMenu] = useState("");
  const [selectedPage, setSelectedPage] = useState(1);
  const [showMenuModal, setShowMenuModal] = useState(false);
  const [draggedItem, setDraggedItem] = useState(null);
  const [draggedOverItem, setDraggedOverItem] = useState(null);
  const [menus, setMenus] = useState([]);
  const [restaurant, setRestaurant] = useState(0);
  const [location, setLocation] = useState(0);
  const [menuInflation, setMenuInflation] = useState(0);

  const [deleteId, setDeleteId] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [getPass] = useState("ninadoit");

  const { selectedMenu: selectedMenuFromSelector } = useSelector(
    (state) => state.menuCreation
  );

  const { isEditing, menuDetails } = selectedMenuFromSelector;
  const {
    data: allMenus,
    isLoading,
    isError,
    error,
  } = useGetAllMenuQuery({
    restaurantId: restaurant,
    locationId: location,
    page: selectedPage,
    page_size: 20,
  });
  const {
    data: restaurantList,
    isLoading: isRestaurantLoading,
    isError: isRestaurantError,
    error: restaurantError,
    isSuccess: isRestaurantSuccess,
  } = useGetRestaurentsQuery();

  // useEffect to update menuInflation whenever restaurantList changes
  useEffect(() => {
    if (restaurantList?.results?.[0]?.inflation_percent !== undefined) {
      setMenuInflation(restaurantList.results[0].inflation_percent);
    }
  }, [restaurantList]);

  const { data: storeStatus, isLoading: isStoreStatusLoading } =
    useGetStoreStatusQuery({
      id: parseInt(location),
    });

  const {
    data: locationList,
    isSuccess: isLocationSuccess,
    isLoading: isLocationLoading,
    refetch: refetchLocations,
  } = useGetLocationsQuery({ restaurantId: parseInt(restaurant) });

  const [updateStoreStatus] = useUpdateStoreStatusMutation();
  const [updateMenuInflation] = useUpdateMenuInflationMutation();

  useEffect(() => {
    if (storeStatus) {
      setIsToggled(!storeStatus.is_location_closed);
    }
  }, [storeStatus]);

  useEffect(() => {
    if (restaurantList?.results.length > 0) {
      setRestaurant(restaurantList.results[0].id);
    }
  }, [restaurantList]);

  useEffect(() => {
    if (locationList?.results.length > 0) {
      setLocation(locationList.results[0].id);
    }
  }, [locationList]);

  const dispatch = useDispatch();
  const handleEditMenu = (item) => {
    setShowMenuModal(true);
    dispatch(selectedMenu({ isEditing: true, selectedMenuData: item }));
  };

  const [deleteMenu, { isSuccess }] = useDeleteMenuMutation();
  const [updateMenuListOrder] = useUpdateMenuListOrderMutation();

  useEffect(() => {
    if (isSuccess) toast.success("Successfully deleted a menu");
  }, [isSuccess]);

  useEffect(() => {
    if (allMenus) {
      setMenus(allMenus.results);
    }
  }, [allMenus]);

  if (isLoading) return <Loading />;

  const pageArr = createArray(allMenus);

  const handleDragStart = (index) => {
    setDraggedItem(index);
  };

  const handleDragEnter = (index) => {
    setDraggedOverItem(index);
  };

  const handleDragEnd = async () => {
    if (draggedItem !== null && draggedOverItem !== null) {
      const newList = [...menus];
      const draggedItemContent = newList[draggedItem];
      newList.splice(draggedItem, 1);
      newList.splice(draggedOverItem, 0, draggedItemContent);
      setMenus(newList);

      const updatedMenu = newList[draggedOverItem];
      const data = { showing: draggedOverItem };

      try {
        await updateMenuListOrder({ id: updatedMenu.id, data });
        toast.success("Menu order updated successfully");
      } catch (error) {
        toast.error("Failed to update menu order");
      }
    }

    setDraggedItem(null);
    setDraggedOverItem(null);
  };

  // handle toggle for store Close/Open menu

  const handleToggle = async () => {
    const newStatus = !isToggled;
    setIsToggled(newStatus); // Optimistically update the UI
    const statusMessage = newStatus ? "Store is Open" : "Store is Closed";

    try {
      // Perform the API call
      await updateStoreStatus({
        locationId: parseInt(location),
        storeStatus: {
          is_location_closed: !newStatus, // Reverse the status
        },
      }).unwrap();

      toast.success(statusMessage);
    } catch (error) {
      // Revert the toggle state on failure
      setIsToggled(!newStatus);
      toast.error("Failed to update store status. Please try again.");
    }
  };

  // Handle MenuInflation
  const handleMenuInflation = async () => {
    const menuInflationData = {
      inflation_percent: parseInt(menuInflation),
    };

    try {
      const response = await updateMenuInflation({
        restaurantId: restaurant,
        inflationData: menuInflationData,
      }).unwrap();
      toast.success("Menu Inflation Updated");
      document.getElementById("menu_inflation_modal").close();
    } catch (error) {
      toast.error("Failed to update inflation");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mt-3">
        <div className="flex items-center gap-3">
          <label
            onClick={() => setShowMenuModal(true)}
            htmlFor={
              isEditing ? `add_menu_modal_${menuDetails.id}` : "add_menu_modal"
            }
            className="btn bg-[#42C2FF] text-white px-4 py-2 rounded-lg"
          >
            {" "}
            + New Menu
          </label>
          {/* add inflation modal open button */}
          <div>
            <button
              onClick={() =>
                document.getElementById("menu_inflation_modal").showModal()
              }
              className="btn bg-[#42C2FF] text-white px-4 py-2 rounded-lg"
            >
              {menuInflation ? "Edit Menu Inflation" : "Add Menu Inflation"}
            </button>
          </div>
          {/* menu inflation Modal  */}
          <dialog
            id="menu_inflation_modal"
            className="modal"
            onClick={(e) => e.target.close()}
          >
            <div className="modal-box" onClick={(e) => e.stopPropagation()}>
              <form method="dialog">
                {/* if there is a button in form, it will close the modal */}
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 bg-gray-300">
                  ✕
                </button>
              </form>
              <div>
                <label>
                  <h1 className="font-bold text-gray-500 pl-1 pb-1">
                    Add Menu Inflation
                  </h1>
                  <input
                    type="text"
                    placeholder="Type here"
                    className="input input-bordered w-full"
                    defaultValue={menuInflation}
                    onChange={(e) => setMenuInflation(e.target.value)}
                    required
                  />
                </label>
                <div className="flex justify-end items-center my-3">
                  <button
                    onClick={() => handleMenuInflation()}
                    className="btn bg-[#42C2FF] text-white px-4 py-2 rounded-lg"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </dialog>
          <div className="w-48">
            <select
              value={restaurant}
              onChange={(e) => setRestaurant(e.target.value)}
              id="restaurant"
              className="select select-bordered w-full"
            >
              <option selected disabled>
                Select Restaurant
              </option>
              {restaurantList?.results.map((restaurant) => (
                <option key={restaurant.id} value={restaurant.id}>
                  {restaurant.name}
                </option>
              ))}
            </select>
          </div>
          {/* locations  */}
          <div className="form-control w-48">
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="select select-bordered w-full"
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
          {/* Store Close/Opening feature  */}
          <div className="flex items-center flex-col">
            <h5 className="text-center pb-2 font-bold text-[#00000094]">
              Store Status
            </h5>
            <label for="switcher" class="flex justify-center cursor-pointer">
              <div class="relative flex justify-between w-[340px] h-[32px]">
                <input
                  checked={isToggled}
                  onChange={handleToggle}
                  id="switcher"
                  type="checkbox"
                  class="hidden peer"
                />
                <span class="text-center flex-grow relative z-20 self-center transition text-white peer-checked:text-black border-2 border-gray-300 rounded-full h-full flex items-center justify-center text-sm mx-1">
                  Close
                </span>
                <span class="border-2 border-gray-300 h-full rounded-full flex items-center justify-center flex-grow relative z-20 self-center transition peer-checked:text-white text-sm mx-1">
                  Open
                </span>
                <span
                  class={`absolute z-10 ${
                    isToggled ? "bg-[#42C2FF]" : "bg-red-500"
                  } h-[28px] w-[160px] rounded-full transition-all top-[2px] left-[2px] peer-checked:left-[calc(100%-162px)]`}
                ></span>
              </div>
            </label>
          </div>
        </div>

        <div className="flex items-center">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="border rounded-l-lg p-1 outline-none px-10 w-[250px]"
            />
            <div className=" absolute top-1 right-3">
              <BiSearch className="text-2xl text-[#697077]" />
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="overflow-x-auto mt-3">
          {menus.map((item, index) => (
            <div
              key={item.id}
              id={`menu-item-${index}`}
              className="collapse collapse-arrow my-2 bg-gray-200 cursor-move"
              draggable={restaurant > 0 && location > 0}
              onDragStart={() => handleDragStart(index)}
              onDragEnter={() => handleDragEnter(index)}
              onDragEnd={handleDragEnd}
            >
              <input type="radio" name="my-accordion-2" />
              <div className="collapse-title text-xl font-medium flex items-center justify-between">
                <h3 className="flex items-center gap-2">
                  <span>
                    <MdDragIndicator className="text-2xl" />
                  </span>{" "}
                  <span>{item.title}</span>
                </h3>
                {item?.opening_hours[0]?.day_index && (
                  <h4 className="text-base uppercase">{`${
                    item?.opening_hours[0]?.day_index
                  } - ${
                    item?.opening_hours[item?.opening_hours?.length - 1]
                      ?.day_index
                  } 
                `}</h4>
                )}
                <div className="flex items-center gap-2 z-40">
                  <label
                    htmlFor={
                      isEditing ? `add_menu_modal_${item.id}` : "add_menu_modal"
                    }
                  >
                    <BiEdit
                      onClick={() => handleEditMenu(item)}
                      className="text-xl text-[#697077] ml-3 cursor-pointer"
                    />
                  </label>
                  {/* <MdDeleteOutline
                  
                    onClick={() => deleteMenu(item.id)}
                    className="text-xl text-[#697077] ml-3 cursor-pointer"
                  /> */}
                  <MdDeleteOutline
                    onClick={() => {
                      setDeleteId(item.id);
                      setShowConfirmModal(true);
                    }}
                    className="text-xl text-[#697077] ml-3 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {showMenuModal && (
        <AddMenuModal
          editMenu={editMenu}
          setEditMenu={setEditMenu}
          setShowMenuModal={setShowMenuModal}
          addMenuModal={addMenuModal}
          setAddMenuModal={setAddMenuModal}
        />
      )}
      <ConfirmDeleteModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={() => deleteMenu(deleteId)}
        getPass={getPass}
      />
      <EditMenuModal
        editMenuModal={editMenuModal}
        setEditMenuModal={setEditMenuModal}
        editMenu={editMenu}
        setEditMenu={setEditMenu}
      />
    </div>
  );
};

export default Menu;
