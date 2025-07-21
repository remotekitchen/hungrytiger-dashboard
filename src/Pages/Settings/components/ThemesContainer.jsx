import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  useGetLocationsQuery,
  useGetRestaurentsQuery,
} from "../../../redux/features/menuCreation/menuCreationApi";
import {
  useDeleteThemeMutation,
  useGetThemesQuery,
  useUpdateThemeMutation,
} from "../../../redux/features/ThemeCreation/themeCreatinApi";
import Theme from "./Theme";

const ThemesContainer = () => {
  const [isEdit, setIsEdit] = useState("");
  const [renderedComponent, setRenderedComponent] = useState(null);

  const [formData, setFormData] = useState({
    restaurant: "",
    location: "",
  });

  const handleCreateButtonClick = () => {
    setIsEdit(false);
    setRenderedComponent(
      <Theme
        isEdit={false}
        restaurant={formData?.restaurant}
        location={formData?.location}
        setRenderedComponent={setRenderedComponent}
      />
    );
  };

  const handleEditButtonClick = () => {
    setIsEdit(true);
    setRenderedComponent(
      <Theme
        isEdit={true}
        restaurant={formData?.restaurant}
        location={formData?.location}
        setRenderedComponent={setRenderedComponent}
      />
    );
  };

  const [selectedRestaurant, setSelectedRestaurant] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const handleChange = async (e) => {
    const { name, value } = e.target;
    await setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  /* update */
  const [
    updateTheme,
    {
      isLoading: updateLoadinig,
      isError: updateError,
      isSuccess: updatedSuccess,
    },
  ] = useUpdateThemeMutation();
  const [
    deleteTheme,
    {
      isLoading: deleteThemeLoading,
      isError: deleteThemeError,
      isSuccess: deleteThemeSuccess,
    },
  ] = useDeleteThemeMutation();
  useEffect(() => {
    if (deleteThemeSuccess) {
      toast.success("Theme deleted successfully.");
    }
  }, [deleteThemeSuccess]);
  // console.log(formData, "theme list");
  const handleDefault = (id) => {
    const data = {
      is_active: true,
      restaurant: formData.restaurant,
      location: formData.location,
    };
    updateTheme({ data, id });
  };
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
        <option value={item.id} key={item.id}>
          {item.name}
        </option>
      </>
    ));
  }
  const {
    data: themelist,
    isLoading: isThemeListLoading,
    isError: isThemeListError,
  } = useGetThemesQuery({
    restaurant: formData.restaurant,
    location: formData.location,
  });

  let themeContent;

  if (formData.location == "" || formData.restaurant == "") {
    themeContent = (
      <h3 className="text-2xl font-semibold text-center my-6">
        Please select restaurant and location from Dropdown
      </h3>
    );
  }

  if (themelist && formData.location != "" && formData.restaurant != "") {
    if (themelist.length === 0) {
      themeContent = (
        <h3 className="text-2xl font-semibold text-center my-6">
          {" "}
          No Theme is created for this restaurant
        </h3>
      );
    } else {
      themeContent = (
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th> Primary Color</th>
                <th>Secondary Color</th>
                <th>Positive Color</th>
                <th>Danger Color</th>
                <th>Danger Color</th>
                <th>Warning Color</th>
                <th>Card Color</th>
                <th>Background Color</th>
                <th>Text Color</th>
                <th>Stock Color</th>
                <th>Disable Color</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {themelist.map((theme) => (
                <tr key={theme.id}>
                  <td>
                    <button
                      onClick={() => handleDefault(theme.id)}
                      className={`btn btn-sm whitespace-nowrap ${
                        theme.is_active && "btn-success"
                      }`}
                      disabled={theme.is_active}
                    >
                      {theme.is_active ? "Default" : "Make Default"}
                    </button>
                  </td>
                  <td>
                    <span>{theme.primary_color}</span>{" "}
                    <div
                      style={{ backgroundColor: theme.primary_color }}
                      className={`h-3 w-3 rounded-full`}
                    ></div>
                  </td>
                  <td>
                    <span>{theme.secondary_color}</span>{" "}
                    <div
                      style={{ backgroundColor: theme.secondary_color }}
                      className={`h-3 w-3 rounded-full`}
                    />
                  </td>
                  <td>
                    <span>{theme.positive_color}</span>{" "}
                    <div
                      style={{ backgroundColor: theme.positive_color }}
                      className={`h-3 w-3 rounded-full`}
                    />
                  </td>
                  <td>
                    <span>{theme.danger_color}</span>{" "}
                    <div
                      style={{ backgroundColor: theme.danger_color }}
                      className={`h-3 w-3 rounded-full`}
                    />
                  </td>
                  <td>
                    <span>{theme.warning_color}</span>{" "}
                    <div
                      style={{ backgroundColor: theme.warning_color }}
                      className={`h-3 w-3 rounded-full`}
                    />
                  </td>
                  <td>
                    <span>{theme.warning_color}</span>{" "}
                    <div
                      style={{ backgroundColor: theme.warning_color }}
                      className={`h-3 w-3 rounded-full`}
                    />
                  </td>
                  <td>
                    <span>{theme.cart_color}</span>{" "}
                    <div
                      style={{ backgroundColor: theme.cart_color }}
                      className={`h-3 w-3 rounded-full`}
                    />
                  </td>
                  <td>
                    <span>{theme.background_color}</span>{" "}
                    <div
                      style={{ backgroundColor: theme.background_color }}
                      className={`h-3 w-3 rounded-full`}
                    />
                  </td>
                  <td>
                    <span>{theme.text_color}</span>{" "}
                    <div
                      style={{ backgroundColor: theme.text_color }}
                      className={`h-3 w-3 rounded-full`}
                    />
                  </td>
                  <td>
                    <span>{theme.stock_color}</span>{" "}
                    <div
                      style={{ backgroundColor: theme.stock_color }}
                      className={`h-3 w-3 rounded-full`}
                    />
                  </td>
                  <td>
                    <span>{theme.disable_color}</span>{" "}
                    <div
                      style={{ backgroundColor: theme.disable_color }}
                      className={`h-3 w-3 rounded-full`}
                    />
                  </td>
                  <td className="flex items-center gap-2">
                    <button
                      onClick={handleEditButtonClick}
                      className="btn bg-blue-600 text-white btn-sm w-16"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteTheme(theme.id)}
                      className="btn bg-red-600 text-white btn-sm w-16"
                      disabled={deleteThemeLoading}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {renderedComponent}
        </div>
      );
    }
  }
  return (
    <div className="w-[80%]">
      <>
        {renderedComponent ? (
          renderedComponent
        ) : (
          <>
            {/* create theme */}
            <div className="flex items-center justify-between mb-12">
              <h3 className="text-3xl font-bold my-5">All Themes</h3>

              <button
                onClick={handleCreateButtonClick}
                className="bg-gradient-to-r from-sky-500 to-sky-600 text-white rounded-full px-12 py-3 hover:from-sky-600 hover:to-sky-700 transition-colors focus:outline-none shadow hover:shadow-md"
              >
                Create theme
              </button>
            </div>
            {/* all themes */}
            <div>
              <div className="mr-3 mb-3 flex items-center">
                <select
                  // onChange={(e) => setSelectedRestaurant(e.target.value)}
                  onChange={handleChange}
                  name="restaurant"
                  className="select select-bordered w-full max-w-xs"
                >
                  <option value="">Select a restaurant</option>
                  {optionContent}
                </select>

                <select
                  name="location"
                  onChange={handleChange}
                  className="select select-bordered w-full max-w-xs ms-2"
                  disabled={!formData.restaurant}
                >
                  <option value="">Select Location</option>
                  {optionLocationContent}
                </select>
              </div>

              {themeContent}
            </div>
          </>
        )}
      </>
    </div>
  );
};

export default ThemesContainer;
