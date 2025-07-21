import React, { useEffect, useState } from "react";
import Loading from "../../../../../Components/Loading";
// import { useGetOrdersQuery } from "../../../../redux/features/orders/ordersApi";
import { useChangeAvailabilityOfItemMutation } from "../../../../../redux/features/itemCreation/itemCreationApi";
import {
  useGetAllMenuQuery,
  useGetLocationsQuery,
  useGetRestaurentsQuery,
} from "../../../../../redux/features/menuCreation/menuCreationApi";
import ItemAvailabilityTableRow from "../../ItemAvailability/ItemAvailabilityTableRow";

const OrderItemAvailability = () => {
  const [selectedRestaurant, setSelectedRestaurant] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  // to handle the items availability
  // state for get selected items
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
  // make available and unavailable
  const [
    changeAvailabilityOfItem,
    {
      isLoading: isAvailabilityOfItemLoading,
      isError: isAvailabilityOfItemError,
      isSuccess: isAvailabilityOfItemSuccess,
      data: availabilityOfItemData,
    },
  ] = useChangeAvailabilityOfItemMutation();
  if (isAvailabilityOfItemLoading) {
    //
  } else if (isAvailabilityOfItemSuccess) {
    //
  } else if (isAvailabilityOfItemError) {
    //
  }
  // to get the all restaurants
  const {
    data: restaurentList,
    isLoading: restaurantListLoading,
    isError: isRestaurantListError,
    error: restaurantListError,
  } = useGetRestaurentsQuery();
  let optionContent;
  if (restaurantListLoading) optionContent = <option>Loading...</option>;
  else if (isRestaurantListError)
    optionContent = (
      <option>Something went wrong loading the restaurent</option>
    );
  else if (restaurentList.results.length === 0)
    optionContent = <option>No restaurent available right now</option>;
  else
    optionContent = restaurentList.results.map((item) => (
      <option value={item.id} key={item.id}>
        {item?.name}
      </option>
    ));
  // to get the locations for that restaurant
  const {
    data: locationList,
    isLoading: isLocationLoading,
    isError: isLocationError,
    error: locationError,
  } = useGetLocationsQuery(selectedRestaurant);
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
        <option value={item.id}>{item.name}</option>
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
    // } = useGetAllMenuQuery({ location: selectedLocation });
  } = useGetAllMenuQuery(
    { locations: selectedLocation },
    {
      skip: skipGetAllMenu,
    }
  );
  // skip query

  let displayableContent;
  if (allMenuLoading && !isAllMenuError) {
    displayableContent = <Loading />;
  } else if (isAllMenuError && !allMenuSuccess) {
    displayableContent = <p>Something went wrong...</p>;
  } else if (
    !isAllMenuError &&
    allMenuSuccess &&
    getAllMenus.results.length === 0
  ) {
    displayableContent = (
      <>
        <p>No menus or items avaialble for this location/restaurant</p>
      </>
    );
  } else if (
    !isAllMenuError &&
    allMenuSuccess &&
    getAllMenus.results.length > 0
  ) {
    displayableContent = (
      <>
        {getAllMenus?.results?.map((menu, menuIndex) => (
          <div key={menuIndex}>
            {menu?.category_set?.map((category, catIndex) => {
              const itemsInCategory = category?.menuitem_set?.map((itemId) =>
                menu.menuitem_set?.find((item) => item.id === itemId)
              );

              return (
                <div key={catIndex}>
                  <h2 className="text-4xl">
                    {
                      category.name /* Assuming the category has a 'name' field */
                    }
                  </h2>
                  <table className="table w-full">
                    <thead>
                      <tr>
                        <th>select</th>
                        <th>Item Name</th>
                        <th>Price</th>
                        <th>Availability</th>
                      </tr>
                    </thead>
                    <tbody>
                      {itemsInCategory.map((item, itemIndex) => (
                        <>
                          <ItemAvailabilityTableRow
                            onSelectAndUnselectItem={handleSelectionOfMenuItems}
                            item={item}
                          />
                        </>
                      ))}
                    </tbody>
                  </table>
                </div>
              );
            })}
          </div>
        ))}
      </>
    );

    //test
  }

  return (
    <div className="">
      <div className="my-4">
        {/* restaurant and location selection */}
        <div className="flex items-center">
          <select
            onChange={(e) => setSelectedRestaurant(e.target.value)}
            className="select select-bordered w-48 max-w-xs"
          >
            <option disabled selected>
              Select restaurant
            </option>
            {optionContent}
          </select>

          <select
            onChange={(e) => setSelectedLocation(e.target.value)}
            className="select select-bordered w-48 max-w-xs ms-2"
          >
            <option>Location</option>
            {optionLocationContent}
          </select>

          {/* availability */}
          {itemsId.length > 0 && (
            <div className="ms-2">
              <button
                onClick={() =>
                  changeAvailabilityOfItem({ itemsId, selectedLocation })
                }
                className="btn btn-primary text-white common_button_shadow"
              >
                Change Availablility ( {itemsId.length} Item(s) )
              </button>
            </div>
          )}
        </div>
        <div className="overflow-x-auto my-6" style={{ maxWidth: "100%" }}>
          {/* ================ */}
          {displayableContent}
        </div>
      </div>
    </div>
  );
};

export default OrderItemAvailability;
