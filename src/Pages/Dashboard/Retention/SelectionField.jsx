import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { useGetLocationsQuery } from "../../../redux/features/menuCreation/menuCreationApi";
import { useGetAllRestaurantQuery } from "../../../redux/features/restaurentCreation/restaurentCreationApi";

const SelectionField = () => {
  const [searchInput, setSearchInput] = useState("");
  const [selectedRestaurant, setSelectedRestaurant] = useState();
  const [location, setLocation] = useState(0);
  const { data: allRestaurant } = useGetAllRestaurantQuery();
  const {
    data: locationList,
    isSuccess: isLocationSuccess,
    isLoading: isLocationLoading,
    refetch: refetchLocations,
  } = useGetLocationsQuery({ restaurantId: parseInt(selectedRestaurant) });

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        {/* restaurant field  */}
        <div className="py-2 bg-transparent rounded-md w-52">
          <select
            className="select select-bordered w-full"
            name="restaurant"
            value={selectedRestaurant}
            onChange={(e) => setSelectedRestaurant(parseFloat(e.target.value))}
          >
            <option disabled selected value={0}>
              Select Restaurant
            </option>
            {allRestaurant?.results?.map((res) => (
              <option key={res.id} value={res.id}>
                {res.name}
              </option>
            ))}
          </select>
        </div>
        {/* location field  */}
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
        {/* date picker field  */}
        <div className="form-control w-48">
          <input
            className="py-2 px-2 w-48 rounded-xl bg-[#F3F4F6] border border-gray-300"
            type="date"
            name=""
            id=""
          />
        </div>
      </div>
      {/* search field  */}
      <div className="flex items-center">
        <div className="relative">
          <input
            name="items"
            onChange={(e) => setSearchInput(e?.target?.value)}
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
  );
};

export default SelectionField;
