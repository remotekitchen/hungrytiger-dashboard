import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useGetAllCategoryQuery } from "../../../../redux/features/categoryCreation/categoryCreationApi";
import {
  useCreateMenuFromExcelMutation,
  useCreateMenuMutation,
  useGetLocationsQuery,
  useGetRestaurentsQuery,
  useUpdateMenuMutation,
} from "../../../../redux/features/menuCreation/menuCreationApi";
import {
  menuCreationOptions,
  selectedMenu,
} from "../../../../redux/features/menuCreation/menuCreationSlice";
import AddMenuCompo from "./AddMenuCompo";
import AddMenuFromExcel from "./AddMenuFromExcel";

const AddMenuModal = ({ setShowMenuModal, setAddMenuModal }) => {
  const dispatch = useDispatch();
  const [selectedRestaurant, setSelectedRestaurant] = useState("");

  const [
    updateMenu,
    {
      isLoading: isUpdateMenuLoading,
      isError: isUpdateMenuError,
      isSuccess: isUpdateMenuSuccess,
    },
  ] = useUpdateMenuMutation();
  const { selectedMenu: selectedMenuSelector } = useSelector(
    (state) => state.menuCreation
  );
  const { isEditing, menuDetails } = selectedMenuSelector;
  // // console.log("🚀 ~ menuDetailssdfasdfsadf:", menuDetails);

  const [name, setName] = useState("");
  const [description, setDescription] = useState(""); // Separate state for description
  const [selectedRestaurants, setSelectedRestaurants] = useState("");
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]); // Add selectedCategories state
  const [selectedRestaurantId, setSelectedRestaurantId] = useState();
  const [addFromExcel, setAddFromExcel] = useState(false);
  const [selectedDaysAndTimes, setSelectedDaysAndTimes] = useState({});
  const [inflation, setInflation] = useState(0);
  // // console.log("🚀 ~ selectedDaysAndTimes:", selectedDaysAndTimes);

  useEffect(() => {
    // Reset form fields when switching between "Add" and "Edit" modes
    if (isEditing) {
      setName(menuDetails?.title || "");
      setDescription(menuDetails?.description || "");
      setSelectedRestaurantId(menuDetails?.restaurant || 0);
      setSelectedLocations(menuDetails?.locations || []);
      setInflation(menuDetails?.inflation_percent || 0);

      // Convert day abbreviations to full names with capital letters
      const convertDayName = (dayAbbreviation) => {
        const daysMapping = {
          sun: "Sunday",
          mon: "Monday",
          tue: "Tuesday",
          wed: "Wednesday",
          thu: "Thursday",
          fri: "Friday",
          sat: "Saturday",
        };
        return daysMapping[dayAbbreviation.toLowerCase()] || dayAbbreviation;
      };

      // Create dynamic object for setSelectedDaysAndTimes
      const dynamicDaysAndTimes = {};
      menuDetails.opening_hours.forEach((item) => {
        const dayName = convertDayName(item.day_index);
        dynamicDaysAndTimes[dayName] = {};
        item.opening_hour.forEach((hour, index) => {
          const startTime = hour.start_time || "00:00";
          const endTime = hour.end_time || "00:00";
          if (index === 0) {
            dynamicDaysAndTimes[dayName].startTime = startTime;
            dynamicDaysAndTimes[dayName].endTime = endTime;
          } else {
            if (!dynamicDaysAndTimes[dayName].additionalTimes) {
              dynamicDaysAndTimes[dayName].additionalTimes = [];
            }
            dynamicDaysAndTimes[dayName].additionalTimes.push({
              startTime,
              endTime,
            });
          }
        });
      });

      setSelectedDaysAndTimes(dynamicDaysAndTimes);
    } else {
      setName("");
      setDescription("");
      setSelectedRestaurantId(null);
      setSelectedLocations();
      // Reset selectedDaysAndTimes when not in edit mode
      setSelectedDaysAndTimes({});
      setInflation(0);
    }
  }, [isEditing, menuDetails]);

  const {
    data: allCategory,
    isLoading,
    isError,
    error,
  } = useGetAllCategoryQuery();

  // get all the restaurants
  const {
    data: restaurantList,
    isLoading: isRestaurantLoading,
    isError: isRestaurantError,
    error: restaurantError,
  } = useGetRestaurentsQuery();

  const [
    createMenuFromExcel,
    {
      menuCreationFromExcel,
      isSuccess: menuCreationFromExcelSuccess,
      isLoading: menuCreationFromExcelLoading,
      isError: menuCreationFromExcelIsError,
      error: menuCreationFromExcelError,
    },
  ] = useCreateMenuFromExcelMutation();
  // get all location list
  const {
    data: locationList,
    isSuccess: isLocationSuccess,
    isLoading: isLocationLoading,
  } = useGetLocationsQuery({ restaurantId: parseInt(selectedRestaurantId) });

  const handleRestaurantChange = (e) => {
    const selectedId = e.target.value;
    setSelectedRestaurants([...selectedRestaurants, selectedId]);

    // Update the selected restaurant ID
    setSelectedRestaurantId(selectedId);
  };
  const handleLocationChange = (e) => {
    const selectedLocationId = e.target.value;
    // Check if the location is already selected
    if (selectedLocations.includes(selectedLocationId)) {
      // Location is already selected, remove it from the array
      setSelectedLocations(
        selectedLocations.filter((id) => id !== selectedLocationId)
      );
    } else {
      // Location is not selected, add it to the array
      setSelectedLocations([...selectedLocations, selectedLocationId]);
    }
  };

  const handleCategoryChange = (e) => {
    const selectedCategoryId = e.target.value;
    setSelectedCategories([...selectedCategories, selectedCategoryId]);
  };

  const [
    createMenu,
    {
      data,
      isSuccess: menuCreationSuccess,
      isLoading: menuCreationLoading,
      isError: menuCreationIsError,
      error: menuCreationError,
    },
  ] = useCreateMenuMutation();
  // opening hours
  // todo: have to add default value for selection too
  // todo: operating hours selection --> done
  // todo: user can't select 3pm to 2pm. they should select, 3pm to 4pm instead

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  // this function here will take selected day as its parameter and check whether this day is exist in previously selected days or not. if it exists, it will remove it from the list. if it doesn't exist, it will append it to the list with previously selected days

  const handleDayClick = (day) => {
    setSelectedDaysAndTimes((prevSelectedDays) => {
      if (prevSelectedDays[day]) {
        const updatedSelectedDays = { ...prevSelectedDays };
        delete updatedSelectedDays[day];
        return updatedSelectedDays;
      } else {
        return {
          ...prevSelectedDays,
          [day]: {
            startTime: "",
            endTime: "",
          },
        };
      }
    });
  };
  const handleTimeChange = (day, field, value) => {
    setSelectedDaysAndTimes((prevSelectedDays) => ({
      ...prevSelectedDays,
      [day]: {
        ...prevSelectedDays[day],
        [field]: value,
      },
    }));
  };

  const isDaySelected = (day) => !!selectedDaysAndTimes[day];

  /////////! DO NOT REMOVE THIS CODE ////////////

  // const handleCreateMenu = async () => {
  //   const opening_hours = [];
  //   for (const day of daysOfWeek) {
  //     if (isDaySelected(day)) {
  //       const additionalTimes =
  //         selectedDaysAndTimes[day]?.additionalTimes || [];

  //       const dayData = {
  //         day_index: day.toLowerCase().slice(0, 3),
  //         is_close: false,
  //         opening_hour: [
  //           {
  //             start_time: selectedDaysAndTimes[day]?.startTime || "",
  //             end_time: selectedDaysAndTimes[day]?.endTime || "",
  //             is_delete: false,
  //           },
  //           ...additionalTimes.map((time) => ({
  //             start_time: time.startTime || "",
  //             end_time: time.endTime || "",
  //             is_delete: false,
  //           })),
  //         ],
  //       };
  //       opening_hours.push(dayData);
  //     }
  //   }

  // old one - will be update with the upper commented code
  const handleCreateMenu = async () => {
    const opening_hours = [];
    for (const day of daysOfWeek) {
      if (isDaySelected(day)) {
        const additionalTimes =
          selectedDaysAndTimes[day]?.additionalTimes || [];

        const dayData = {
          day_index: day.toLowerCase().slice(0, 3),
          is_close: false,
          opening_hour: [
            {
              start_time: selectedDaysAndTimes[day]?.startTime || "",
              end_time: selectedDaysAndTimes[day]?.endTime || "",
              is_delete: false,
            },
            ...additionalTimes.map((time) => ({
              start_time: time.startTime || "",
              end_time: time.endTime || "",
              is_delete: false,
            })),
          ],
        };

        opening_hours.push(dayData);
      }
    }

    // // console.log(selectedLocations, "selectedLocations");
    const menuCreationObj = {
      title: name,
      description: description,
      restaurant: selectedRestaurantId,
      // categories: selectedCategories,
      opening_hours: opening_hours,
      locations: selectedLocations,
      inflation_percent: parseFloat(inflation),
    };

    // // console.log("Menu Createeeeeeeeeeeeeeeeee::::::", menuCreationObj);

    if (!isEditing) {
      dispatch(menuCreationOptions({ locations: selectedLocations }));
      createMenu(menuCreationObj);
      // // console.log(menuCreationObj);
      setAddMenuModal(false);
    } else if (isEditing) {
      // todo: have to uncomment this line
      updateMenu({ id: menuDetails.id, editMenu: menuCreationObj });
      setAddMenuModal(false);
      // // console.log(menuCreationObj);
    }
  };

  // old one - will be update with first one

  useEffect(() => {
    if (menuCreationSuccess) {
      dispatch(selectedMenu({ isEditing: false, selectedMenuData: {} }));
      toast.success("Successfully added a new menu");
      setShowMenuModal(false);
    }
    if (menuCreationIsError) {
      toast.error("Something went wrong with the menu creation.");
    }
  }, [menuCreationSuccess, menuCreationIsError]);
  useEffect(() => {
    if (isUpdateMenuSuccess) {
      dispatch(selectedMenu({ isEditing: false, selectedMenuData: {} }));
      toast.success("Successfully updated the menu");
      setShowMenuModal(false);
    }
    if (isUpdateMenuError) {
      dispatch(selectedMenu({ isEditing: false, selectedMenuData: {} }));
      toast.error("Something went wrong with updating the menu.");
    }
  }, [isUpdateMenuError, isUpdateMenuSuccess]);
  // handling whcih component to show upon clicking on add menu from excel sheet
  let optionContent;
  if (isRestaurantLoading) optionContent = <option>Loading...</option>;
  else if (isRestaurantError && !isRestaurantLoading && !isRestaurantLoading)
    optionContent = (
      <option>Something went wrong loading the restaurent</option>
    );
  else if (restaurantList.results.length === 0)
    optionContent = <option>No restaurent available right now</option>;
  else
    optionContent = restaurantList.results.map((item) => (
      <option value={item.id} key={item.id}>
        {item?.name}
      </option>
    ));

  // // console.log(selectedDaysAndTimes);

  return (
    <>
      <input
        type="checkbox"
        id={isEditing ? `add_menu_modal_${menuDetails.id}` : "add_menu_modal"}
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-bold">
              {isEditing ? "Edit" : "Add New"} Menu
            </h3>
            {!isEditing && (
              <label
                onClick={() => setAddFromExcel(!addFromExcel)}
                className="bg-[#42C2FF] text-white px-4 py-2 rounded-lg cursor-pointer"
              >
                {addFromExcel
                  ? "+ Add Menu, Manually"
                  : "+ Add Menu From Excel"}
              </label>
            )}
          </div>
          {!addFromExcel ? (
            <AddMenuCompo
              isEditing={isEditing}
              menuDetails={menuDetails}
              menuCreationLoading={menuCreationLoading}
              setName={setName}
              setDescription={setDescription}
              handleRestaurantChange={handleRestaurantChange}
              restaurantList={restaurantList}
              handleLocationChange={handleLocationChange}
              isLocationLoading={isLocationLoading}
              locationList={locationList}
              selectedLocations={selectedLocations}
              handleCategoryChange={handleCategoryChange}
              allCategory={allCategory}
              handleCreateMenu={handleCreateMenu}
              name={name}
              description={description}
              selectedRestaurantId={selectedRestaurantId}
              category={selectedCategories}
              locations={selectedLocations}
              isDaySelected={isDaySelected}
              handleDayClick={handleDayClick}
              daysOfWeek={daysOfWeek}
              handleTimeChange={handleTimeChange}
              selectedDaysAndTimes={selectedDaysAndTimes}
              setSelectedDaysAndTimes={setSelectedDaysAndTimes}
              inflation={inflation}
              setInflation={setInflation}
            />
          ) : (
            <AddMenuFromExcel
              setShowMenuModal={setShowMenuModal}
              menuCreationFromExcelSuccess={menuCreationFromExcelSuccess}
              menuCreationFromExcelIsError={menuCreationFromExcelIsError}
              setAddFromExcel={setAddFromExcel}
              name={name}
              setName={setName}
              setSelectedRestaurant={setSelectedRestaurant}
              optionContent={optionContent}
              createMenuFromExcel={createMenuFromExcel}
              menuCreationFromExcelLoading={menuCreationFromExcelLoading}
              selectedRestaurant={selectedRestaurant}
            />
          )}
        </div>
        <label
          onClick={() =>
            dispatch(selectedMenu({ isEditing: false, selectedMenuData: {} }))
          }
          className="modal-backdrop"
          htmlFor={
            isEditing ? `add_menu_modal_${menuDetails.id}` : "add_menu_modal"
          }
        >
          Close
        </label>
      </div>
    </>
  );
};

export default AddMenuModal;
