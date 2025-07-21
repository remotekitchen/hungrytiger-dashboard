import { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import {
  useChangeAvailabilityOfItemMutation,
  useGetSingleItemQuery,
} from "../../../../redux/features/itemCreation/itemCreationApi";
import {
  useGetAllMenuQuery,
  useGetLocationsQuery,
  useGetRestaurentsQuery,
} from "../../../../redux/features/menuCreation/menuCreationApi";
import ItemAvailabilityTableRow from "./ItemAvailabilityTableRow";

const ItemAvailability = () => {
  const [searchInput, setSearchInput] = useState("");
  const [items, setItems] = useState();
  const [selectedRestaurant, setSelectedRestaurant] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");

  // created by adnan
  const [selectedMenu, setSelectedMenu] = useState("");
  const [menuItemId, setMenuItemId] = useState("");
  const [today, setToday] = useState(false);
  const [itemsId, setItemsId] = useState([]);

  const handleSelectionOfMenuItems = (itemId) => {
    setItemsId((prevItems) => {
      if (!prevItems.includes(itemId)) {
        return [...prevItems, itemId];
      } else {
        return prevItems.filter((item) => item !== itemId);
      }
    });
  };

  const [
    changeAvailabilityOfItem,
    {
      isLoading: isAvailabilityOfItemLoading,
      isError: isAvailabilityOfItemError,
      isSuccess: isAvailabilityOfItemSuccess,
    },
  ] = useChangeAvailabilityOfItemMutation();

  // to get the all restaurants
  const {
    data: restaurentList,
    isLoading: restaurantListLoading,
    isError: isRestaurantListError,
    error: restaurantListError,
  } = useGetRestaurentsQuery();
  // UseEffect to set default value if there's only one restaurant
  useEffect(() => {
    if (restaurentList?.results?.length === 1) {
      setSelectedRestaurant(restaurentList.results[0].id);
    }
  }, [restaurentList]);

  // Generate options for the select element
  let optionContent;
  if (restaurantListLoading) {
    optionContent = <option>Loading...</option>;
  } else if (isRestaurantListError) {
    optionContent = (
      <option>Something went wrong loading the restaurant</option>
    );
  } else if (restaurentList.results.length === 0) {
    optionContent = <option>No restaurant available right now</option>;
  } else {
    optionContent = restaurentList.results.map((item) => (
      <option value={item.id} key={item.id}>
        {item?.name}
      </option>
    ));
  }
  // to get the locations for that restaurant
  const {
    data: locationList,
    isLoading: isLocationLoading,
    isError: isLocationError,
    error: locationError,
  } = useGetLocationsQuery(selectedRestaurant);

  // UseEffect to set default value if there's only one location
  useEffect(() => {
    if (locationList?.results?.length === 1) {
      setSelectedLocation(locationList?.results[0].id);
    }
  }, [locationList]);

  let optionLocationContent;
  if (isLocationLoading) optionLocationContent = <option>Loading...</option>;
  else if (isLocationError)
    optionLocationContent = (
      <option>Something went wrong loading the locations</option>
    );
  else if (locationList.results.length === 0)
    optionLocationContent = <option>No location available right now</option>;
  else {
    optionLocationContent = locationList.results.map((item) => (
      <>
        <option value={item.id} key={item.id}>
          {item.name}
        </option>
      </>
    ));
  }

  // to get all the menus for that restaurant
  const [skipGetAllMenu, setSkipGetAllMenu] = useState(true);
  useEffect(() => {
    if (selectedRestaurant && selectedLocation) {
      setSkipGetAllMenu(false);
    } else {
      setSkipGetAllMenu(true);
    }
  }, [selectedLocation, selectedRestaurant]);

  const {
    data: getAllMenus,
    isLoading: allMenuLoading,
    isSuccess: allMenuSuccess,
    isError: isAllMenuError,
    error: menuError,
  } = useGetAllMenuQuery(
    { locations: selectedLocation },
    {
      skip: skipGetAllMenu,
    }
  );

  // UseEffect to set default value if there's only one menu
  useEffect(() => {
    if (
      selectedRestaurant &&
      selectedLocation &&
      getAllMenus?.results?.length > 0
    ) {
      setSelectedMenu(getAllMenus.results[0].id);
    }
  }, [getAllMenus, selectedLocation, selectedRestaurant]);

  // !selectedRestaurant || !selectedLocation

  /* Created */
  const menuId = selectedMenu;

  // console.log("menuId",menuId)

  const { data: getSingleMenu, isLoading } = useGetSingleItemQuery({
    id: menuId,
  });
  const menu_name = getSingleMenu?.title;

  useEffect(() => {
    if (getSingleMenu) {
      setItems(
        getSingleMenu?.menuitem_set?.filter((item) =>
          item?.name?.toLowerCase().includes(searchInput.toLowerCase())
        )
      );
    }
  }, [getSingleMenu, searchInput]);

  /* end */

  let optionMenuContent;
  if (isLocationLoading) optionMenuContent = <option>Loading...</option>;
  else if (isLocationError)
    optionMenuContent = (
      <option>Something went wrong loading the locations</option>
    );
  else if (locationList.results.length === 0)
    optionMenuContent = <option>No location available right now</option>;
  else {
    optionMenuContent = getAllMenus?.results.map((item) => (
      <option value={item.id} key={item.id}>
        {item.title}
      </option>
    ));
  }

  /* end by adnan */

  // skip query

  let displayableContent;
  if (allMenuLoading && !isAllMenuError) {
    displayableContent = (
      <div className="w-full h-full flex justify-center items-center">
        <p>Please choose the options</p>
      </div>
    );
  } else if (isAllMenuError && !allMenuSuccess) {
    displayableContent = <p>Something went wrong...</p>;
  } else if (
    !isAllMenuError &&
    allMenuSuccess &&
    getAllMenus.results.length === 0
  ) {
    displayableContent = (
      <>
        <p>No menus or items available for this location/restaurant</p>
      </>
    );
  } else if (
    !isAllMenuError &&
    allMenuSuccess &&
    getAllMenus.results.length > 0
  ) {
    displayableContent = (
      <>
        <div>
          <div className="flex items-center justify-between px-5">
            <h1 className="text-3xl font-semibold mb-8">{menu_name}</h1>
            <div className="flex items-center">
              <div className="relative">
                <input
                  name="items"
                  onChange={(e) => setSearchInput(e?.target?.value)}
                  type="text"
                  placeholder="Search..."
                  className="border rounded-lg p-1 outline-none px-3 py-2 w-[250px]"
                />
                <div className="absolute top-3 right-3">
                  <BiSearch className="text-2xl text-[#697077]" />
                </div>
              </div>
            </div>
          </div>
          <table className="table w-full">
            <thead>
              <tr>
                <th>Item Name</th>
                <th>Price</th>
                <th>Availability</th>
                <th>Available Today</th>
                <th>In Stock</th>
                <th>Availability Duration</th>
              </tr>
            </thead>
            <tbody>
              {items &&
                items?.map((item) => (
                  <ItemAvailabilityTableRow key={item.id} item={item} />
                ))}
            </tbody>
          </table>
          <div
            className={`w-full flex justify-center items-center bg-white ${
              isLoading || items?.length === 0 ? "h-96" : "0"
            }`}
          >
            {isLoading ? (
              <img className="h-36" src="/searching.gif" alt="loading/image" />
            ) : (
              items?.length === 0 && (
                <div>
                  <div className="flex flex-col items-center w-full justify-center">
                    <img className="h-36" src="/not_found.png" alt="" />
                    <h1 className="text-4xl my-3 font-bold text-[#4E5E8C]">
                      SORRY!
                    </h1>
                  </div>
                  <span className="font-medium">
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
        </div>
      </>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-4xl font-bold text-gray-600">Item Availability</h1>
      {/* items table */}

      <div className="my-7">
        {/* restaurant and location selection */}
        <div className="flex items-center">
          <select
            value={selectedRestaurant}
            onChange={(e) => setSelectedRestaurant(e.target.value)}
            className="select select-bordered w-full max-w-xs"
          >
            <option disabled value="">
              Select a restaurant
            </option>
            {optionContent}
          </select>

          <select
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="select select-bordered w-full max-w-xs ms-2"
            disabled={!selectedRestaurant}
          >
            <option>Select Location</option>
            {optionLocationContent}
          </select>

          <select
            onChange={(e) => setSelectedMenu(e.target.value)}
            className="select select-bordered w-full max-w-xs ms-2"
            disabled={!selectedRestaurant || !selectedLocation}
          >
            <option disabled>Choose your Menu</option>
            {optionMenuContent}
          </select>
        </div>
        <div className="overflow-x-auto my-6" style={{ maxWidth: "100%" }}>
          {/* ================ */}
          {displayableContent}
        </div>
      </div>
    </div>
  );
};

export default ItemAvailability;
