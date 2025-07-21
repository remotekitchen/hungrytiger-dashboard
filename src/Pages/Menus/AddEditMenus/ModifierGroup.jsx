import React, { useEffect, useState } from "react";
import { BiEdit, BiSearch } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";
import { useSelector } from "react-redux";
// Created by Adnan
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useGetAllItemsQuery } from "../../../redux/features/itemCreation/itemCreationApi";
import {
  useGetAllMenuQuery,
  useGetLocationsQuery,
} from "../../../redux/features/menuCreation/menuCreationApi";
import {
  useDeleteModifierGroupMutation,
  useGetModifierGroupWithoutPaginationQuery,
} from "../../../redux/features/modifierGroup/modifierGroupApi";
import { useGetAllRestaurantQuery } from "../../../redux/features/restaurentCreation/restaurentCreationApi";
import AddEditModifierGroupModal from "./Modal/AddEditModifierGroupModal";
import EditModifierModal from "./Modal/EditModifierModal";

const ModifierGroup = () => {
  const [getModifiers, setGetModifiers] = useState();
  const [searchInput, setSearchInput] = useState("");
  // console.log("🚀 ~ ModifierGroup ~ searchInput:", searchInput);
  const [menuId, setMenuId] = useState(false);
  const [showModifierGroup, setShowModifierGroup] = useState(false);
  // console.log("🚀 ~ ModifierGroup ~ showModifierGroup:", showModifierGroup);

  const [showIsEditModifierGroup, setShowIsEditModifierGroup] = useState(false);
  // console.log(
  // 	'🚀 ~ ModifierGroup ~ showIsEditModifierGroup-2:',
  // 	showIsEditModifierGroup
  // );
  const [selectedPage, setSelectedPage] = useState(1);
  const [menuName, setMenuName] = useState("");
  const [restaurant, setRestaurant] = useState("");
  const [location, setLocation] = useState("");
  // console.log(location, 'location');
  const [modifierItems, setModifierItems] = useState({});
  // // console.log("🚀 ~ ModifierGroup ~ restaurantttttt:", parseInt(restaurant));
  // // console.log("🚀 ~ ModifierGroup ~ locationdddddd:", parseInt(location));
  const { data: getAllItemsData } = useGetAllItemsQuery(1);

  // const menuIds = getAllItemsData?.results.map((item) => item.menu);
  // // console.log(menuIds);
  const {
    data: locationList,
    isSuccess: isLocationSuccess,
    isLoading: isLocationLoading,
    refetch: refetchLocations,
  } = useGetLocationsQuery({ restaurantId: parseInt(restaurant) });

  const {
    data: allRestaurant, // todo need to extra property proper location data
  } = useGetAllRestaurantQuery();

  const {
    data: allMenus,
    isLoading: menuLoading,
    isError: isMenuError,
    error: menuError,
  } = useGetAllMenuQuery({ restaurant });

  // // console.log("🚀 ~ locationList:", locationList?.results);
  // // console.log("🚀 ~ allMenus:", allMenus?.results);

  useEffect(() => {
    if (allRestaurant?.results && allRestaurant.results.length > 0) {
      const firstRestaurant = allRestaurant.results[0];
      setRestaurant(firstRestaurant.id);
    }
  }, [allRestaurant]);

  useEffect(() => {
    if (allMenus?.results && allMenus.results.length > 0) {
      const firstMenu = allMenus.results[0];
      setMenuName(firstMenu.id);
    }
  }, [allMenus]);

  useEffect(() => {
    if (locationList?.results && locationList?.results.length > 0) {
      const firstLocation = locationList.results[0];
      setLocation(firstLocation?.id);
    }
  }, [locationList]);

  // V1 API for GET ModifierGroup
  // const {
  //   data: allModifierGroups,
  //   isLoading,
  //   isError,
  //   error,
  // } = useGetModifierGroupQuery({
  //   page: selectedPage,
  //   restaurantId: restaurant,
  //   menuIds: menuName,
  //   locationId: location,
  // });
  // V2 API for GET ModifierGroup
  const {
    data: ModifierGroupsWithoutPagination,
    isLoading,
    isError,
    error,
  } = useGetModifierGroupWithoutPaginationQuery({
    restaurantId: restaurant,
    menuIds: menuName,
    locationId: location,
  });

  // console.log(
  //   ModifierGroupsWithoutPagination,
  //   "allModifierGroups_withoutPagination"
  // );
  // console.log(allModifierGroups, "allModifierGroups");

  useEffect(() => {
    if (ModifierGroupsWithoutPagination) {
      setGetModifiers(
        ModifierGroupsWithoutPagination.filter((modifier) =>
          modifier?.name?.toLowerCase().includes(searchInput.toLowerCase())
        )
      );
    }
  }, [ModifierGroupsWithoutPagination, searchInput]);

  useEffect(() => {
    if (restaurant) {
      refetchLocations();
    }
  }, [restaurant, refetchLocations]);

  const [deleteModifierGroup, { isSuccess }] = useDeleteModifierGroupMutation();

  useEffect(() => {
    if (isSuccess) toast.success("Successfully deleted a Modifier Group");
    // // console.log(showModifierGroup);
  }, [isSuccess]);

  const { selectedModifierGroup: selectedModifierGroupSelector } = useSelector(
    (state) => state.modifierGroup
  );
  const { isEditing, modifierGroupDetails } = selectedModifierGroupSelector;

  const handleModifierEdit = (item) => {
    setModifierItems(item);
    setShowModifierGroup(false);
    // setShowIsEditModifierGroup(true);
    document.getElementById("my_modal_3").showModal();
  };
  // const handleModifierEdit = (item) => {
  //   setShowModifierGroup(true);
  // };
  // if (isLoading) return <Loading />;
  // const pageArr = allModifierGroups ? createArray(allModifierGroups) : [];

  return (
    <div>
      <div className="flex justify-between items-center mt-3">
        <div className="flex items-center gap-3">
          <label
            onClick={() => setShowModifierGroup(true)}
            htmlFor={
              isEditing
                ? `add_modifier_modal_${modifierGroupDetails.id}`
                : "add_modifier_modal_"
            }
            className="btn bg-[#42C2FF] text-white px-4 py-2 rounded-lg"
          >
            + New Modifier Group
          </label>

          <div className="form-control w-full">
            <select
              className="select select-bordered w-full"
              name="restaurant"
              value={restaurant}
              onChange={(e) => setRestaurant(e.target.value)}
            >
              <option selected>Select Restaurant</option>
              {allRestaurant?.results?.map((restaurant) => (
                <option key={restaurant.id} value={restaurant.id}>
                  {restaurant.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-control w-full">
            <select
              className="select select-bordered w-full"
              name="menu"
              value={menuName}
              // Assign the state value to the select element
              onChange={(e) => {
                setMenuName(e.target.value);
                // setMenuName(e.target.id);
              }}
            >
              <option selected>Select Menu</option>
              {allMenus?.results?.map((menu) => (
                <option key={menu.id} value={menu.id}>
                  {menu.title}
                </option>
              ))}
            </select>
          </div>

          {/* locations  */}
          <div className="form-control w-full">
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="select select-bordered w-full"
            >
              <option selected>Select location</option>
              {locationList?.results.map((item) => (
                <option value={item.id} key={item.id}>
                  {item?.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-control w-full h-full mb-2">
            {restaurant === 0 || location === 0 ? (
              <div
                className="tooltip tooltip-error"
                data-tip="Select Restaurant & Location"
              >
                <span className="text-white px-4 py-2 rounded-lg mt-2 flex items-center gap-2 bg-gray-500 cursor-not-allowed">
                  Export to excel
                </span>
              </div>
            ) : (
              <Link
                to={`${
                  import.meta.env.VITE_API_ROOT
                }api/food/v1/modifier-export/?restaurant=${restaurant}&location=${location}`}
                className="text-white px-4 py-2 rounded-lg mt-2 flex items-center gap-2 bg-[#42C2FF] cursor-pointer"
                download
              >
                Export to excel
              </Link>
            )}
          </div>
        </div>

        {/* <label
          onClick={toggleModal}
          htmlFor={
            isEditing
              ? `add_modifier_modal_${modifierGroupDetails.id}`
              : "add_modifier_modal_"
          }
          className="btn bg-[#42C2FF] text-white px-4 py-2 rounded-lg"
        >
          + New Modifier Group
        </label> */}
        <div className="flex items-center ml-2">
          <div className="relative">
            <input
              onChange={(e) => setSearchInput(e.target.value)}
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
      <table className="min-w-full border-collapse border border-gray-300 my-6 ">
        <thead>
          <tr className="bg-[#DDE1E6]">
            <th className="py-2 px-3  text-left">Modifier Group Name</th>
            <th className="py-2 px-3  text-left">Description</th>
            <th className="py-2 px-3  text-left">Requirement Type</th>
            <th className="py-2 px-3  text-left">Contains</th>
            <th className="py-2 px-3  text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {getModifiers?.map((item) => (
            <tr key={item.id}>
              <td className="py-2 px-3 ">{item.name}</td>
              <td className="py-2 px-3 ">{item.description}</td>
              <td className="py-2 px-3 ">{item.requirement_status}</td>
              <td className="py-2 px-3 ">{item.contains}</td>
              <td className="flex items-center py-2 px-3">
                <label
                  onClick={() => handleModifierEdit(item)}
                  htmlFor={
                    isEditing
                      ? `add_modifier_modal_${item.id}`
                      : "add_modifier_modal_"
                  }
                >
                  <BiEdit className="text-xl text-[#697077 cursor-pointer" />
                </label>
                <dialog id="my_modal_3" className="modal">
                  <div className="modal-box">
                    <EditModifierModal
                      modifierGroupDetails={modifierGroupDetails}
                      setShowModifierGroup={setShowModifierGroup}
                      modifierItems={modifierItems}
                      restaurant={restaurant}
                      menuName={menuName}
                      locationId={location}
                    />
                  </div>
                  <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                  </form>
                </dialog>

                <MdDeleteOutline
                  onClick={() => deleteModifierGroup(item.id)}
                  className="text-xl text-[#697077] ml-3 cursor-pointer"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div
        className={`w-full flex justify-center items-center bg-white ${
          isLoading || getModifiers?.length === 0 ? "h-96" : ""
        }`}
      >
        {isLoading ? (
          <img className="h-36" src="/searching.gif" alt="loading/image" />
        ) : (
          getModifiers?.length === 0 && (
            <div>
              <div className="flex flex-col items-center w-full justify-center">
                <img className="h-36" src="/not_found.png" alt="" />
                <h1 className="text-4xl my-3 font-bold text-[#4E5E8C]">
                  SORRY!
                </h1>
              </div>
              <span className="font-medium">
                {" "}
                No results found {searchInput && "on this name"}
              </span>
              {searchInput && (
                <span className="font-semibold px-2 border-2 ml-3 border-gray-500 rounded">
                  {searchInput}
                </span>
              )}
            </div>
          )
        )}
      </div>

      {/* <div className="w-10/12">
        {pageArr && (
          <div className="join flex-wrap">
            {pageArr.map((page) => (
              <button
                onClick={() => {
                  setSelectedPage(page);
                }}
                key={page}
                className={`join-item my-1 btn btn-sm ${
                  selectedPage === page && "btn-active"
                }`}
              >
                {page}
              </button>
            ))}
          </div>
        )}
      </div> */}

      {/* <AddModifierGroupModal  */}
      <AddEditModifierGroupModal
        isEditing={isEditing}
        modifierGroupDetails={modifierGroupDetails}
        showModifierGroup={showModifierGroup}
        setShowModifierGroup={setShowModifierGroup}
        showIsEditModifierGroup={showIsEditModifierGroup}
        setShowIsEditModifierGroup={setShowIsEditModifierGroup}
        modifierItems={modifierItems}
        setModifierItems={setModifierItems}
      />
    </div>
  );
};

export default ModifierGroup;
