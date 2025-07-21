import dayjs from "dayjs";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { BsFillInfoCircleFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import bogoImg from "../../../assets/campaign/bogo.png";
import {
  useAddBogoMutation,
  useUpdateBogoMutation,
} from "../../../redux/features/bogo/bogoApi";
import { selectedBogo } from "../../../redux/features/bogo/bogoSlice";
import { useGetItemsWithoutPaginationQuery } from "../../../redux/features/itemCreation/itemCreationApi";
import {
  useGetAllMenuQuery,
  useGetLocationsQuery,
  useGetRestaurentsQuery,
} from "../../../redux/features/menuCreation/menuCreationApi";
import MultipleItemsSelectCampaign from "../../Menus/AddEditMenus/Modal/MultipleItemsSelectCampaign";

const AddBogoModal = ({ isEditing, bogoDetails, addBogo, setAddBogo }) => {
  const [menu, setMenu] = useState();
  // console.log("🚀 ~ AddBogoModal ~ menu:", menu);
  const [items, setItems] = useState([]);
  const [getItems, setGetItems] = useState([]);
  const [promotion, setPromotion] = useState([]);
  const [inflatedItems, setInflatedItems] = useState([]);
  console.log("🚀 ~ AddBogoModal ~ inflatedItems:", inflatedItems);
  const [inflatedPercent, setInflatedPercent] = useState(0);
  console.log("🚀 ~ AddBogoModal ~ inflatedPercent:", inflatedPercent);

  // console.log("🚀 ~ AddBogoModal ~ inflatedItems:", inflatedItems);
  console.log("🚀 ~ AddBogoModal ~ bogoDetails_menu:", bogoDetails);
  // console.log("🚀 ~ AddBogoModal ~ getItems:", getItems);
  // console.log("🚀 ~ AddBogoModal ~ bogoDetails:", bogoDetails?.items);
  // console.log("🚀 ~ AddBogoModal ~ itemsssssssssssdfd:", items);
  // console.log("🚀 ~ AddBogoModal ~ items--------Update:", items);

  const extractDate = (isoString) => {
    const dateObject = new Date(isoString);
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    const dayMonthYearArray = dateObject
      .toLocaleDateString(undefined, options)
      .split("/");
    const formattedDate = `${dayMonthYearArray[2]}-${dayMonthYearArray[0]}-${dayMonthYearArray[1]}`;
    return formattedDate;
  };

  // const extractDate = (isoString) => {
  //   const dateObject = new Date(isoString);
  //   const options = { day: "2-digit", month: "2-digit", year: "numeric" };

  //   const dayMonthYearArray = dateObject
  //     .toLocaleDateString(undefined, options)
  //     .split("/");
  //   const formattedDate = `${dayMonthYearArray[2]}-${dayMonthYearArray[0]}-${dayMonthYearArray[1]}`;

  //   return formattedDate;
  // };

  const startDate = extractDate(
    bogoDetails?.durations?.map((item) => item.start_date)
  );
  const endDate = extractDate(
    bogoDetails?.durations?.map((item) => item.end_date)
  );

  const addPromotionRef = useRef();
  const [selectedRestaurants, setSelectedRestaurants] = useState("");
  const [selectedLocations, setSelectedLocations] = useState("");
  const [selectedRestaurantId, setSelectedRestaurantId] = useState();
  const [promotionName, setPromotionName] = useState("");
  const [selectedOption, setSelectedOption] = useState("members"); // State to track the selected option
  const [getSearchInput, setGetSearchInput] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  // const [dateRanges, setDateRanges] = useState([
  //   { start_date: "", end_date: "" },
  // ]);

  console.log(selectedRestaurantId, "selectedRestaurantId....");

  /* 30 days and unlimited date picker select adnan*/
  const [dateRanges, setDateRanges] = useState([
    {
      start_date: dayjs().format("YYYY-MM-DD"),
      end_date: dayjs().add(30, "day").format("YYYY-MM-DD"),
    },
  ]);

  const handleDateChange = (index, key, value) => {
    const newDateRanges = [...dateRanges];
    newDateRanges[index][key] = value;
    setDateRanges(newDateRanges);
  };

  // Handle remove date range
  const handleRemove = (index) => {
    const newDateRanges = dateRanges.filter((_, i) => i !== index);
    setDateRanges(newDateRanges);
  };

  // Set date range to today to 30 days later
  const handleSet30Days = () => {
    const today = dayjs().format("YYYY-MM-DD");
    const thirtyDaysLater = dayjs().add(30, "day").format("YYYY-MM-DD");
    setDateRanges([{ start_date: today, end_date: thirtyDaysLater }]);
  };

  // Set date range to today to unlimited
  const handleSetUnlimited = () => {
    const today = dayjs().format("YYYY-MM-DD");
    const distantFuture = "2099-12-31"; // A date far in the future to represent unlimited
    setDateRanges([{ start_date: today, end_date: distantFuture }]);
  };

  /* end */

  const handleAddMore = (e) => {
    e.preventDefault();
    setDateRanges([...dateRanges, { start_date: "", end_date: "" }]);
  };
  const [selectedOfferType, setSelectedOfferType] = useState("SpecificItem"); // Add state for selected offer type

  // const handleDateChange = (index, field, value) => {
  //   const updatedDateRanges = [...dateRanges];
  //   updatedDateRanges[index][field] = value;
  //   setDateRanges(updatedDateRanges);
  // };
  // const handleRemove = (index) => {
  //   const updatedDateRanges = [...dateRanges];
  //   updatedDateRanges.splice(index, 1);
  //   setDateRanges(updatedDateRanges);
  // };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value); // Update the selected option when a radio button is clicked
  };

  const handleOfferTypeChange = (event) => {
    setSelectedOfferType(event.target.value); // Update the selected offer type
  };

  const [page, setPage] = useState(1);

  useEffect(() => {
    if (isEditing) {
      setIsChecked(true);
      setPromotionName(bogoDetails.name || "");
      setSelectedRestaurantId(bogoDetails.restaurant || 0);
      setSelectedLocations(bogoDetails.location || "");
      setPromotion(bogoDetails.items || []);
      setSelectedOption(bogoDetails.audience || "");
      setInflatedPercent(bogoDetails?.inflate_percent);
      setMenu(bogoDetails?.menu);
      // setDateRanges([
      //   {
      //     start_date: startDate,
      //     end_date: endDate,
      //   },
      // ]);
      const formattedDurations = bogoDetails.durations.map((item) => ({
        start_date: extractDate(item.start_date),
        end_date: extractDate(item.end_date),
      }));
      setDateRanges(formattedDurations);
    } else {
      setIsChecked(false);
      setPromotionName("");
      setSelectedRestaurantId(0);
      setSelectedLocations("");
      setPromotion([]);
      setSelectedOption("members");
      setDateRanges([{ start_date: "", end_date: "" }]);
      setInflatedPercent();
      setMenu();
    }
  }, [isEditing, bogoDetails]);

  const {
    data: itemsWithoutPagination,
    isLoading: isItemsLoading,
    // isError,
    // error,
  } = useGetItemsWithoutPaginationQuery({
    restaurantId: selectedRestaurantId,
    menuId: parseInt(menu),
  });

  const {
    data: allMenus,
    isLoading: menuLoading,
    isError: isMenuError,
    error: menuError,
  } = useGetAllMenuQuery({ restaurantId: selectedRestaurantId });

  // set default menu
  useEffect(() => {
    if (
      !bogoDetails?.menu &&
      allMenus &&
      allMenus.results &&
      allMenus.results.length > 0
    ) {
      setMenu(allMenus.results[0].id);
    }
  }, [allMenus]);

  useEffect(() => {
    if (itemsWithoutPagination) {
      setGetItems(
        itemsWithoutPagination
          .filter((item) => item?.category?.length > 0)
          .filter((item) =>
            item?.name?.toLowerCase().includes(getSearchInput.toLowerCase())
          )
      );
      setInflatedItems(
        itemsWithoutPagination?.filter((item) => items?.includes(item?.id))
      );
    }
  }, [itemsWithoutPagination]);

  // inflated items
  useEffect(() => {
    if (itemsWithoutPagination) {
      setInflatedItems(
        itemsWithoutPagination?.filter((item) => items?.includes(item?.id))
      );
    }
  }, [items]);

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const dispatch = useDispatch();

  const {
    data: restaurantList,
    isLoading: isRestaurantLoading,
    isError: isRestaurantError,
    error: restaurantError,
  } = useGetRestaurentsQuery();

  const handleRestaurantChange = (e) => {
    const selectedId = parseInt(e.target.value);
    setSelectedRestaurants([...selectedRestaurants, selectedId]);

    // Update the selected restaurant ID
    setSelectedRestaurantId(selectedId);
  };

  const { data: locationList, isSuccess: isLocationSuccess } =
    useGetLocationsQuery(selectedRestaurantId);

  const handleLocationChange = (e) => {
    const selectedLocationId = parseInt(e.target.value);
    setSelectedLocations(selectedLocationId);
  };

  const handleItemChange = (e) => {
    const selectedItemId = e.target.value;
    setPromotion([selectedItemId]);
  };

  const [createBogo, { isSuccess, isErr }] = useAddBogoMutation();

  const [
    updateBogoData,
    { isSuccess: isUpdateSuccess, isError: isUpdateError },
  ] = useUpdateBogoMutation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!promotionName) {
      toast.error("Please enter a promotion name");
      return;
    }
    if (!selectedRestaurantId) {
      toast.error("Please select a restaurant");
      return;
    }
    if (!selectedLocations) {
      toast.error("Please select a location");
      return;
    }
    if (!promotion) {
      toast.error("Please select an item");
      return;
    }
    if (!selectedOption) {
      toast.error("Please select an audience");
      return;
    }
    if (!dateRanges[0].start_date) {
      toast.error("Please select a start date");
      return;
    }
    if (!dateRanges[0].end_date) {
      toast.error("Please select an end date");
      return;
    }

    // Construct the Bogo Data without inflate_percent when isEditing is true
    const bogoData = {
      name: promotionName || "",
      restaurant: selectedRestaurantId || 0,
      location: selectedLocations || 0,
      items: items || [],
      audience: selectedOption || "",
      offerType: selectedOfferType || "",
      durations: dateRanges || [],
      menu: parseInt(menu) || 0,
      ...(isEditing ? {} : { inflate_percent: parseInt(inflatedPercent) || 0 }),
    };

    // Filter out empty or undefined fields, but keep 'items' even if it's empty
    const filteredBogoData = Object.fromEntries(
      Object.entries(bogoData).filter(
        ([key, value]) =>
          key === "items" ||
          (value !== undefined && value !== null && value.length !== 0)
      )
    );

    // Call the appropriate function based on isEditing
    if (isEditing) {
      updateBogoData({
        id: bogoDetails.id,
        bogoItem: filteredBogoData,
      });
    } else {
      createBogo(filteredBogoData);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(selectedBogo({ isEditing: false, bogoDetails: {} }));
      setAddBogo(false);
      toast.success("Successfully created a Bogo promotion");
    }
    if (isErr) {
      toast.error("Something went wrong");
    }
    if (isUpdateSuccess) {
      dispatch(selectedBogo({ isEditing: false, bogoDetails: {} }));
      setAddBogo(false);
      toast.success("Successfully updated the Bogo promotion");
    }
    if (isUpdateError) {
      toast.error("Something went wrong");
    }
  }, [isSuccess, isErr, isUpdateSuccess, isUpdateError]);

  /* default restaurant set */
  // useEffect(() => {
  //   if (restaurantList?.results?.length > 0) {
  //     setSelectedRestaurantId(restaurantList?.results[0].id);
  //   }
  // }, [restaurantList, locationList]);
  useEffect(() => {
    if (!isEditing && restaurantList?.results?.length > 0) {
      setSelectedRestaurantId(restaurantList?.results[0].id);
      setSelectedLocations(locationList?.results[0]?.id);
    }
  }, [isEditing, restaurantList]);

  // // console.log("locationList",locationList)

  // // console.log("seletedResId", selectedRestaurantId);

  // // console.log("selectedLocationId",selectedLocations)

  /* end */

  // Existing bogo items
  const itemNamesString = bogoDetails?.item_names || "";

  const itemNamesArray = itemNamesString.split(",");

  return (
    <>
      <button onClick={handleNextPage}>next</button>
      <input
        type="checkbox"
        id={isEditing ? `add_bogo_${bogoDetails.id}` : "add_bogo_"}
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box w-11/12 max-w-2xl">
          <h1 className="text-2xl mb-6 font-bold font-sans">
            {isEditing ? "Edit" : "Add A"} Bogo
          </h1>
          <div className="flex justify-between gap-4">
            <div className="w-[50%]">
              <form onSubmit={handleSubmit}>
                <div>
                  <h1 className="font-bold mb-2">Promotion Name</h1>
                  <label>
                    <span className="mb-1">Set a Name for your promotion.</span>
                    <input
                      value={promotionName}
                      onChange={(e) => setPromotionName(e.target.value)}
                      type="text"
                      className="border border-[#DDE1E6] rounded-lg w-full p-2"
                    />
                  </label>
                </div>

                <div>
                  <h1 className="my-4 font-bold">Restaurant</h1>
                  <label>
                    <span className="mb-1">
                      Select the restaurant and it’s location this offer.
                    </span>
                    <select
                      onChange={handleRestaurantChange}
                      name="restaurant"
                      value={selectedRestaurantId}
                      id="restaurant"
                      className="border border-[#DDE1E6] rounded-lg w-full p-2"
                    >
                      <option value="">Select Restaurant</option>
                      {restaurantList?.results?.map((item, index) => (
                        <option key={index} value={item?.id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                    <select
                      onChange={handleLocationChange}
                      name="location"
                      id="location"
                      value={selectedLocations}
                      className="border border-[#DDE1E6] rounded-lg w-full p-2 mt-2"
                    >
                      <option selected>Select Location</option>
                      {locationList?.results?.map((item, index) => (
                        <option key={index} value={item.id}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                <div>
                  <h1 className="my-4 font-bold">Promotion</h1>
                  <label>
                    <span className="mb-1">Select the type of offer.</span>
                    <select
                      value={selectedOfferType}
                      onChange={handleOfferTypeChange}
                      className="border border-[#DDE1E6] mb-4 block w-full px-2 py-2 rounded"
                    >
                      <option value="">Select an Offer Type</option>
                      <option value="SpecificItem">Specific Items</option>
                      {/* <option value="SpecificCategories">
                        Specific Categories
                      </option> */}
                    </select>
                  </label>
                </div>

                {/* menu select field  */}
                <div className="form-control w-full">
                  <label>
                    <span className="mb-1">Select Menu</span>
                    <select
                      className="select select-bordered w-full"
                      name="menu"
                      value={menu}
                      onChange={(e) => {
                        setMenu(e.target.value);
                      }}
                    >
                      <option selected>Select Menu</option>
                      {allMenus?.results?.map((menu) => (
                        <option key={menu.id} value={menu.id}>
                          {menu.title}
                        </option>
                      ))}
                    </select>
                  </label>
                </div>

                <div>
                  <p className>Choose to include in this campaign</p>
                  {/* show existing value for bogo  */}
                  <MultipleItemsSelectCampaign
                    loadItems={getItems}
                    setPromotion={setItems}
                    getSearchInput={getSearchInput}
                    setGetSearchInput={setGetSearchInput}
                    bogoDetails={bogoDetails}
                    isLoading={isItemsLoading}
                  />
                </div>

                <div>
                  <h1 className="my-4 font-bold">Audience</h1>
                  <label>
                    <span className="">
                      Select which customers will see your offer.
                    </span>

                    <div className="flex items-center mb-4">
                      <input
                        id="default-radio-1"
                        type="radio"
                        value="all"
                        name="default-radio"
                        className="w-4 h-4 text-[#42C2FF]"
                        onChange={handleOptionChange}
                        checked={selectedOption === "all"}
                      />
                      <label
                        htmlFor="default-radio-1"
                        className="ml-2 font-medium"
                      >
                        All customers
                      </label>
                    </div>

                    <div className="flex items-center">
                      <input
                        id="default-radio-2"
                        type="radio"
                        value="members"
                        name="default-radio"
                        className="w-4 h-4 text-[#42C2FF]"
                        onChange={handleOptionChange}
                        checked={selectedOption === "members"}
                      />
                      <label
                        htmlFor="default-radio-2"
                        className="ml-2 font-medium"
                      >
                        Members Only
                      </label>
                    </div>
                  </label>
                </div>

                <div>
                  <h1 className="my-4 font-bold">Duration</h1>
                  <label>
                    <span>Select the dates your offer will run for.</span>
                    {/* {dateRanges?.map((dateRange, index) => (
                      <div className="flex" key={index}>
                        <input
                          type="date"
                          className="border border-[#DDE1E6] rounded-lg w-full p-2 mt-2 mr-4"
                          value={dateRange?.start_date}
                          onChange={(e) =>
                            handleDateChange(
                              index,
                              "start_date",
                              e.target.value
                            )
                          }
                        />
                        <input
                          type="date"
                          className="border border-[#DDE1E6] rounded-lg w-full p-2 mt-2"
                          value={dateRange?.end_date}
                          onChange={(e) =>
                            handleDateChange(index, "end_date", e.target.value)
                          }
                        />
                        {index > 0 && ( // Only show Remove button for extra date fields
                          <button
                            type="button"
                            className="text-red-500 ml-2"
                            onClick={() => handleRemove(index)}
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    ))} */}

                    {/*dateRanges adnan */}
                    {dateRanges.map((dateRange, index) => (
                      <div className="flex" key={index}>
                        <input
                          type="date"
                          className="border border-[#DDE1E6] rounded-lg w-full p-2 mt-2 mr-4"
                          value={dateRange.start_date}
                          onChange={(e) =>
                            handleDateChange(
                              index,
                              "start_date",
                              e.target.value
                            )
                          }
                        />
                        <input
                          type="date"
                          className="border border-[#DDE1E6] rounded-lg w-full p-2 mt-2"
                          value={dateRange.end_date}
                          onChange={(e) =>
                            handleDateChange(index, "end_date", e.target.value)
                          }
                        />
                        {index > 0 && (
                          <button
                            type="button"
                            className="text-red-500 ml-2 static z-50"
                            onClick={() => handleRemove(index)}
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    ))}
                    <div className="flex flex-row justify-start items-center gap-6">
                      <span
                        onClick={handleSet30Days}
                        className="bg-[#42C2FF] text-white px-4 py-2 rounded-lg mt-4 flex items-center gap-2"
                      >
                        30 days
                      </span>
                      <span
                        onClick={handleSetUnlimited}
                        className="bg-[#42C2FF] text-white px-4 py-2 rounded-lg mt-4 flex items-center gap-2"
                      >
                        Unlimited
                      </span>
                    </div>
                    <button
                      onClick={handleAddMore}
                      className="bg-[#42C2FF] text-white px-4 py-2 rounded-lg mt-4 flex items-center gap-2"
                    >
                      + Add More
                    </button>
                  </label>
                </div>

                {!isEditing && (
                  <div className="flex my-4">
                    <input
                      type="checkbox"
                      className="mr-3 text-[#42C2FF]"
                      onClick={handleCheckboxChange}
                    />
                    <label className="text-[#42C2FF]">
                      I agree to the Terms and Conditions
                    </label>
                  </div>
                )}
                {isEditing ? (
                  <button
                    title={isItemsLoading ? "Wait for load items..." : ""}
                    type="submit"
                    className={`bg-[#42C2FF] text-white px-4 py-2 rounded-lg mt-4 flex items-center gap-2 ${
                      !isItemsLoading
                        ? ""
                        : "disabled:opacity-50 cursor-not-allowed"
                    }`}
                    disabled={isItemsLoading}
                  >
                    Save Changes
                  </button>
                ) : (
                  <button
                    type="submit"
                    className={`bg-[#42C2FF] text-white px-4 py-2 rounded-lg mt-4 flex items-center gap-2 ${
                      isChecked || !isItemsLoading
                        ? ""
                        : "disabled:opacity-50 cursor-not-allowed"
                    }`}
                    disabled={!isChecked || isUpdateSuccess}
                  >
                    + Create this Promotion
                  </button>
                )}
              </form>
            </div>
            <div className="w-[50%]">
              <h1 className="font-bold mb-2">Offer Preview</h1>
              <div className="relative">
                <img
                  src={bogoImg}
                  alt=""
                  className="w-80 h-41 object-cover rounded relative"
                />
                <p className=" absolute top-0 left-1 text-white capitalize -mt-[2px] tracking-tighter">
                  {promotionName}
                </p>
                <p className=" absolute right-1 bottom-0 text-white capitalize tracking-tighter">
                  Buy 1 Get 1
                </p>
              </div>
              {/* Inflation section  */}
              <div>
                <div className="mt-5">
                  <h4 className="font-medium mb-2">Add Inflation</h4>
                  <div
                    className={inflatedItems?.length <= 0 ? "tooltip" : ""}
                    data-tip={
                      inflatedItems?.length <= 0 ? "Select Items First" : null
                    }
                  >
                    <label className="input input-bordered flex items-center gap-2">
                      <span className="text-gray-500 font-bold">%</span>
                      <input
                        title={
                          isEditing
                            ? "You Can't Edit Inflation"
                            : "Add Items First"
                        }
                        disabled={inflatedItems?.length <= 0 || isEditing}
                        onChange={(e) => setInflatedPercent(e?.target?.value)}
                        // defaultValue={inflatedPercent}
                        value={inflatedPercent}
                        type="number"
                        className="grow text-left pl-3"
                        placeholder="Inflation percent..."
                      />
                    </label>
                  </div>
                </div>
                {/* inflation details  */}
                <div className="overflow-x-auto mt-5 border-2 border-gray-200">
                  <table className="table-auto w-full">
                    {/* head */}
                    <thead className="bg-gray-300 font-bold">
                      <tr>
                        <th className="border-r-2 border-gray-200">Items</th>
                        <th>Inflated Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {isItemsLoading ? (
                        // Show "Loading..." while data is being loaded
                        <tr>
                          <td colSpan="2">
                            <h3 className="text-center">Loading...</h3>
                          </td>
                        </tr>
                      ) : inflatedItems?.length > 0 ? (
                        // Render items if they exist
                        inflatedItems.map((item) => (
                          <tr
                            key={item?.id}
                            className="border-2 border-gray-300"
                          >
                            <td className="border-r-2 border-gray-300">
                              {item?.name}
                            </td>
                            <td className="flex items-center gap-1">
                              <span className="font-bold">$</span>
                              {(
                                item?.base_price *
                                (1 + inflatedPercent / 100)
                              ).toFixed(2)}

                              <div
                                className="tooltip tooltip-left"
                                data-tip={`Base_Price: $${item?.base_price}`}
                              >
                                <span>
                                  <BsFillInfoCircleFill className="text-gray-400 cursor-pointer tooltip" />
                                </span>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        // Show "No results found" if there are no items
                        <tr>
                          <td colSpan="2">
                            <h3 className="text-center">No results found</h3>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <label
          onClick={() => {
            // setAddBogo(false);
            dispatch(selectedBogo({ isEditing: false, bogoData: {} }));
          }}
          className="modal-backdrop"
          htmlFor={isEditing ? `add_bogo_${bogoDetails.id}` : "add_bogo_"}
        >
          Close
        </label>
      </div>
    </>
  );
};

export default AddBogoModal;
