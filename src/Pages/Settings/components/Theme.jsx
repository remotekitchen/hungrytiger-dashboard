import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  useGetLocationsQuery,
  useGetRestaurentsQuery,
} from "../../../redux/features/menuCreation/menuCreationApi";
import {
  useCreateThemeMutation,
  useGetThemesQuery,
  useUpdateThemeMutation,
} from "../../../redux/features/ThemeCreation/themeCreatinApi";

const ThemeForm = ({ setRenderedComponent, isEdit, restaurant, location }) => {
  // // console.log("🚀 ~ ThemeForm ~ isEdit from theme component:", isEdit);
  const [formData, setFormData] = useState({
    id: "",
    restaurant: "",
    location: "",
    background_color: "",
    cart_color: "",
    danger_color: "",
    disable_color: "",
    positive_color: "",
    primary_color: "",
    secondary_color: "",
    stock_color: "",
    text_color: "",
    warning_color: "",
  });

  useEffect(() => {
    if (restaurant) {
      setFormData({ restaurant: restaurant });
    } else if (location) {
      setFormData({ location: location });
    }
  }, [restaurant, location]);

  // console.log("FormData:", formData);

  //#region Calling API of Theme
  // let [ThemeContent,setThemeContent]=useState(null);
  const [
    createTheme,
    { data, isSuccess: isSuccessCreateTheme, isError: isErrorThemeCreation },
  ] = useCreateThemeMutation();

  const [
    updateTheme,
    { isSuccess: isSuccessUpdateTheme, isError: isErrorUpdateTheme },
  ] = useUpdateThemeMutation();

  const {
    data: themelist,
    isLoading: isThemeListLoading,
    isError: isThemeListError,
  } = useGetThemesQuery({
    restaurant: formData?.restaurant,
    location: formData?.location,
  });

  useEffect(() => {
    if (isEdit && themelist?.length > 0) {
      const themeData = themelist[0];
      setFormData({
        id: themeData.id || "",
        restaurant: themeData.restaurant || "",
        location: themeData.location || "",
        background_color: themeData.background_color || "",
        cart_color: themeData.cart_color || "",
        danger_color: themeData.danger_color || "",
        disable_color: themeData.disable_color || "",
        positive_color: themeData.positive_color || "",
        primary_color: themeData.primary_color || "",
        secondary_color: themeData.secondary_color || "",
        stock_color: themeData.stock_color || "",
        text_color: themeData.text_color || "",
        warning_color: themeData.warning_color || "",
      });
    }
  }, [isEdit, themelist]);

  let ThemeContent;

  if (formData.location == "" || formData.restaurant == "") {
    ThemeContent = (
      <div className="overflow-x-auto mt-3">
        <table className="table-auto min-w-full divide-y divide-gray-200">
          <caption className="bg-yellow-500  text-blue-800 text-lg mb-2">
            Please select restaurant and location from Dropdown
          </caption>
        </table>
      </div>
    );
  }

  //#endregion

  const handleChange = async (e) => {
    const { name, value } = e.target;
    await setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  //#region handle submit
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // console.log(formData);
  //   createTheme(formData);
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEdit) {
      updateTheme({ data: formData, id: formData?.id });
      toast.success("Theme Updated");
    } else {
      createTheme(formData);
    }
  };

  useEffect(() => {
    if (isSuccessCreateTheme) {
      toast.success("Theme Saved");
      setRenderedComponent("");
    }
    if (isErrorThemeCreation) {
      toast.error("Something is wrong");
    }
  }, [isSuccessCreateTheme, isErrorThemeCreation]);

  const [selectedRestaurant, setSelectedRestaurant] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  //#region Get restaurant and location Dropdown
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
  //#endregion
  // to get all the menus for that restaurant

  return (
    <>
      <button
        onClick={() => setRenderedComponent("")}
        className="bg-gradient-to-r from-sky-500 to-sky-600 text-white rounded-full px-12 py-3 hover:from-sky-600 hover:to-sky-700 transition-colors focus:outline-none shadow hover:shadow-md mb-6"
      >
        {"<<"} Go Back
      </button>
      <div className="flex flex-col md:flex-row  mb-3">
        <div className="container w-1/2">
          <form onSubmit={handleSubmit}>
            <div className="mr-3 mb-3 flex items-center">
              <select
                // onChange={(e) => setSelectedRestaurant(e.target.value)}
                onChange={handleChange}
                name="restaurant"
                value={formData?.restaurant}
                className="select select-bordered w-full max-w-xs"
              >
                <option value="">Select a restaurant</option>
                {optionContent}
              </select>

              <select
                name="location"
                onChange={handleChange}
                className="select select-bordered w-full max-w-xs ms-2"
                value={formData?.location}
                disabled={!formData.restaurant}
              >
                <option value="">Select Location</option>
                {optionLocationContent}
              </select>
            </div>

            <div className="flex flex-col md:flex-row items-center mb-3">
              <label className="md:w-1/4 text-left">Primary Color:</label>

              <input
                type="color"
                name="primary_color"
                value={formData.primary_color}
                onChange={handleChange}
                className="md:w-1/4 border rounded-md"
              />
            </div>
            <div className="flex flex-col md:flex-row items-center mb-3">
              <label className="md:w-1/4 text-left">Secondary Color:</label>

              <input
                type="color"
                name="secondary_color"
                value={formData.secondary_color}
                onChange={handleChange}
                className="md:w-1/4 border rounded-md"
              />
            </div>
            <div className="flex flex-col md:flex-row items-center mb-3">
              <label className="md:w-1/4 text-left">Positive Color :</label>

              <input
                type="color"
                name="positive_color"
                value={formData.positive_color}
                onChange={handleChange}
                className="md:w-1/4 border rounded-md"
              />
            </div>
            <div className="flex flex-col md:flex-row items-center mb-3">
              <label className="md:w-1/4 text-left">Danger Color :</label>

              <input
                type="color"
                name="danger_color"
                value={formData.danger_color}
                onChange={handleChange}
                className="md:w-1/4 border rounded-md"
              />
            </div>
            <div className="flex flex-col md:flex-row items-center mb-3">
              <label className="md:w-1/4 text-left">Warning Color :</label>

              <input
                type="color"
                name="warning_color"
                value={formData.warning_color}
                onChange={handleChange}
                className="md:w-1/4 border rounded-md"
              />
            </div>
            <div className="flex flex-col md:flex-row items-center mb-3">
              <label className="md:w-1/4 text-left">Cart Color :</label>

              <input
                type="color"
                name="cart_color"
                value={formData.cart_color}
                onChange={handleChange}
                className="md:w-1/4 border rounded-md"
              />
            </div>
            <div className="flex flex-col md:flex-row items-center mb-3">
              <label className="md:w-1/4 text-left">Background Color :</label>

              <input
                type="color"
                name="background_color"
                value={formData.background_color}
                onChange={handleChange}
                className="md:w-1/4 border rounded-md"
              />
            </div>
            <div className="flex flex-col md:flex-row items-center mb-3">
              <label className="md:w-1/4 text-left">Text Color :</label>

              <input
                type="color"
                name="text_color"
                value={formData.text_color}
                onChange={handleChange}
                className="md:w-1/4 border rounded-md"
              />
            </div>
            <div className="flex flex-col md:flex-row items-center mb-3">
              <label className="md:w-1/4 text-left">Stock Color :</label>

              <input
                type="color"
                name="stock_color"
                value={formData.stock_color}
                onChange={handleChange}
                className="md:w-1/4 border rounded-md"
              />
            </div>
            <div className="flex flex-col md:flex-row items-center mb-3">
              <label className="md:w-1/4 text-left">Disable Color:</label>

              <input
                type="color"
                name="disable_color"
                value={formData.disable_color}
                onChange={handleChange}
                className="md:w-1/4 border rounded-md"
              />
            </div>

            <div className="flex flex-col md:flex-row items-center mb-3">
              <div className="md:w-1/4 text-left"></div>
              <button
                type="submit"
                className="border border-blue-500 hover:border-green-700 text-blue-500 hover:text-green-500 font-bold py-2 px-4 rounded-md"
              >
                {isEdit ? "Save" : "Create"}
              </button>
            </div>
          </form>
        </div>
        <div className="container w-1/2 border border-blue-500 ">
          <h1 className="mb-10 text-3xl font-bold text-[#42C2FF] text-center">
            Preview
          </h1>
        </div>
      </div>

      {/* <div className="flex flex-col md:flex-row  mb-3">
        <div className="container">{ThemeContent}</div>
      </div> */}
    </>
  );
};

export default ThemeForm;
