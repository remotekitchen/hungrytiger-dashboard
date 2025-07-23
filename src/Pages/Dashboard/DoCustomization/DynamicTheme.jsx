import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BsTrash } from "react-icons/bs";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { IoReload } from "react-icons/io5";
import Swal from "sweetalert2";
import {
  useGetLocationsQuery,
  useGetRestaurentsQuery,
} from "../../../redux/features/menuCreation/menuCreationApi";
import { useGetRestaurantDetailsQuery } from "../../../redux/features/restaurentCreation/restaurentCreationApi";
import {
  useCreateThemeMutation,
  useDeleteThemeMutation,
  useGetAllThemesQuery,
  useGetThemesQuery,
  useUpdateThemeMutation,
} from "../../../redux/features/ThemeCreation/themeCreatinApi";
import DynamicPreviewModal from "./DynamicPreviewModal";

const ColorInput = ({ label, name, value, onChange, handleOpenModal }) => (
  <div className="grid grid-cols-12 items-center mb-3">
    <label className="grid col-span-12 md:col-span-8 lg:col-span-8 w-full text-left">
      {label}:
    </label>
    <input
      type="color"
      name={name}
      value={value}
      onChange={onChange}
      className="w-full grid col-span-12 md:col-span-4 lg:col-span-4 border rounded-md"
    />
    <IoIosInformationCircleOutline onClick={() => handleOpenModal(name)} />

    <DynamicPreviewModal modalId={`modal_${name}`} />
  </div>
);

const DynamicTheme = () => {
  const [key, setKey] = useState(0);
  const [selectedRestaurant, setSelectedRestaurant] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [orderUrl, setOrderUrl] = useState("");
  const [recommendedRestaurant, setRecommendedRestaurant] = useState("");
  // console.log(
  //   "🚀 ~ DynamicTheme ~ recommendedRestaurant:",
  //   recommendedRestaurant
  // );

  const [colors, setColors] = useState({
    background_color: "#eeeeee",
    button_bg_color: "#f7dda0",
    button_hover_bg_color: "#ffa1f6",
    button_hover_text_color: "#000000",
    button_text_color: "#ffffff",
    card_color: "#ffffff",
    danger_color: "#ff0000",
    disable_color: "#e8e8e8",
    positive_color: "#00ff22",
    primary_color: "#ffa1f6",
    secondary_color: "#f7dda0",
    stock_color: "#000000",
    text_color: "#000000",
    warning_color: "#ffe600",
    id: "",
    restaurant: "",
    location: "",
  });

  const handleReload = () => {
    setKey((prevKey) => prevKey + 1);
  };

  const handleOpenModal = (name) => {
    const modalId = `modal_${name}`;
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.showModal();
    }
  };
  // Restaurant API
  const {
    data: restaurentList,
    isLoading: restaurantListLoading,
    isError: isRestaurantListError,
    error: restaurantListError,
  } = useGetRestaurentsQuery();

  // location API
  const {
    data: locationList,
    isLoading: isLocationLoading,
    isError: isLocationError,
    error: locationError,
  } = useGetLocationsQuery(selectedRestaurant);

  // Theme List API Based on Restaurant and Location
  const {
    data: themelist,
    isLoading: isThemeListLoading,
    isError: isThemeListError,
  } = useGetThemesQuery({
    restaurant: selectedRestaurant,
    location: selectedLocation,
  });
  // Theme List for all restaurant
  const { data: allThemes } = useGetAllThemesQuery();
  // console.log("🚀 ~ DynamicTheme ~ allThemes:", allThemes);

  const {
    data: restaurantDetails,
    isLoading,
    isError,
    isSuccess,
  } = useGetRestaurantDetailsQuery(parseInt(selectedRestaurant));
  // Delete theme API
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

  // // console.log("🚀 ~ DynamicTheme ~ restaurantDetails:", restaurantDetails);
  // useEffect to set default value for location and restaurant
  useEffect(() => {
    if (restaurentList?.results && restaurentList.results.length > 0) {
      setSelectedRestaurant(restaurentList.results[0].id);
      setRecommendedRestaurant(restaurentList.results[0].id);
    }
  }, [restaurentList]);

  // set default value for location
  useEffect(() => {
    if (locationList?.results && locationList.results.length > 0) {
      setSelectedLocation(locationList.results[0].id);
    }
  }, [locationList]);

  // useEffect for set OrderUrl
  useEffect(() => {
    if (restaurantDetails?.id === parseInt(selectedRestaurant)) {
      const restaurantSlug = restaurantDetails?.slug;

      const location = restaurantDetails?.locations?.find(
        (data) => data?.id === parseInt(selectedLocation)
      );

      if (location) {
        const locationSlug = location?.slug;
        setOrderUrl(`${restaurantSlug}/${locationSlug}`);
      } else {
        setOrderUrl("");
      }
    }
  }, [selectedRestaurant, selectedLocation, restaurantDetails]);

  // // console.log("OrderUrl:", orderUrl);

  // useEffect for Setting up default value for selected restaurant

  useEffect(() => {
    // // console.log("allThemes:", allThemes);
    // // console.log("recommendedRestaurant-Inside:", recommendedRestaurant);

    if (recommendedRestaurant && Array.isArray(allThemes)) {
      allThemes.forEach((rec, index) => {
        // console.log(`allThemes[${index}]:`, rec);
      });

      const foundRestaurant = allThemes?.find(
        (res) => parseInt(res.restaurant) == parseInt(recommendedRestaurant)
      );

      // console.log("foundRestaurant:", foundRestaurant);

      if (foundRestaurant) {
        setColors((prevState) => ({
          background_color: foundRestaurant.background_color || "#000000",
          button_bg_color: foundRestaurant.button_bg_color || "#000000",
          button_hover_bg_color:
            foundRestaurant.button_hover_bg_color || "#000000",
          button_hover_text_color:
            foundRestaurant.button_hover_text_color || "#000000",
          button_text_color: foundRestaurant.button_text_color || "#000000",
          card_color: foundRestaurant.card_color || "#000000",
          danger_color: foundRestaurant.danger_color || "#000000",
          disable_color: foundRestaurant.disable_color || "#000000",
          positive_color: foundRestaurant.positive_color || "#000000",
          primary_color: foundRestaurant.primary_color || "#000000",
          secondary_color: foundRestaurant.secondary_color || "#000000",
          stock_color: foundRestaurant.stock_color || "#000000",
          text_color: foundRestaurant.text_color || "#000000",
          warning_color: foundRestaurant.warning_color || "#000000",
          // Retaining previous values for id, restaurant, and location
          id: prevState.id,
          restaurant: prevState.restaurant,
          location: prevState.location,
        }));
      }
    }
  }, [allThemes, recommendedRestaurant]);

  // Create Theme API
  const [
    createTheme,
    { data, isSuccess: isSuccessCreateTheme, isError: isErrorThemeCreation },
  ] = useCreateThemeMutation();

  // Update Theme API
  const [
    updateTheme,
    { isSuccess: isSuccessUpdateTheme, isError: isErrorUpdateTheme },
  ] = useUpdateThemeMutation();

  // set default value for all input fields
  useEffect(() => {
    if (themelist && themelist.length > 0) {
      const theme = themelist[0];
      setColors({
        background_color: theme.background_color,
        button_bg_color: theme.button_bg_color,
        button_hover_bg_color: theme.button_hover_bg_color,
        button_hover_text_color: theme.button_hover_text_color,
        button_text_color: theme.button_text_color,
        card_color: theme.card_color,
        danger_color: theme.danger_color,
        disable_color: theme.disable_color,
        positive_color: theme.positive_color,
        primary_color: theme.primary_color,
        secondary_color: theme.secondary_color,
        stock_color: theme.stock_color,
        text_color: theme.text_color,
        warning_color: theme.warning_color,
        id: theme?.id,
        restaurant: selectedRestaurant || "",
        location: selectedLocation || "",
      });
    }
  }, [themelist, selectedRestaurant, selectedLocation]);

  const recommendedRestaurants = [
    { restaurant: "Lee's House Restaurant: Style - Chinese Red", id: "83" },
    { restaurant: "Ginger Indian Cuisine: Style - Indian Orange", id: "114" },
    { restaurant: "CHJ Bistro: Style - Gold And Black", id: "110" },
    { restaurant: "Bubble World: Style - Chinese Orange", id: "107" },
    { restaurant: "Bombay: Style - Canadian White", id: "122" },
  ];

  const recommendedColors = {
    "Lee's House Restaurant: Style - Chinese Red": {
      background_color: "#ff5733",
      button_bg_color: "#33ff57",
      button_hover_bg_color: "#5733ff",
      button_hover_text_color: "#ff33a8",
      button_text_color: "#a833ff",
      card_color: "#33a8ff",
      danger_color: "#ff3357",
      disable_color: "#57ff33",
      positive_color: "#a8ff33",
      primary_color: "#3357ff",
      secondary_color: "#ff33a8",
      stock_color: "#a8ff33",
      text_color: "#33a8ff",
      warning_color: "#57ff33",
    },
    "Ginger Indian Cuisine: Style - Indian Orange": {
      background_color: "#33ff57",
      button_bg_color: "#ff0000",
      button_hover_bg_color: "#F7DDA0",
      button_hover_text_color: "#008475",
      button_text_color: "#00e60f",
      card_color: "#fe6e28",
      danger_color: "#ff0000",
      disable_color: "#bfbfbf",
      positive_color: "#00e60f",
      primary_color: "#fe6e28",
      secondary_color: "#fbefe3",
      stock_color: "#ffffff",
      text_color: "#000000",
      warning_color: "#fbff00",
    },
    "CHJ Bistro: Style - Gold And Black": {
      background_color: "#34495e",
      button_bg_color: "#e74c3c",
      button_hover_bg_color: "#f39c12",
      button_hover_text_color: "#8e44ad",
      button_text_color: "#27ae60",
      card_color: "#2c3e50",
      danger_color: "#d35400",
      disable_color: "#1abc9c",
      positive_color: "#e67e22",
      primary_color: "#16a085",
      secondary_color: "#2980b9",
      stock_color: "#9b59b6",
      text_color: "#3498db",
      warning_color: "#c0392b",
    },
    "Bubble World: Style - Chinese Orange": {
      background_color: "#8e44ad",
      button_bg_color: "#2ecc71",
      button_hover_bg_color: "#f39c12",
      button_hover_text_color: "#e74c3c",
      button_text_color: "#34495e",
      card_color: "#3498db",
      danger_color: "#1abc9c",
      disable_color: "#9b59b6",
      positive_color: "#16a085",
      primary_color: "#27ae60",
      secondary_color: "#2980b9",
      stock_color: "#d35400",
      text_color: "#e67e22",
      warning_color: "#c0392b",
    },
    "Bombay: Style - Canadian White": {
      background_color: "#e74c3c",
      button_bg_color: "#8e44ad",
      button_hover_bg_color: "#2ecc71",
      button_hover_text_color: "#f39c12",
      button_text_color: "#34495e",
      card_color: "#3498db",
      danger_color: "#1abc9c",
      disable_color: "#9b59b6",
      positive_color: "#16a085",
      primary_color: "#27ae60",
      secondary_color: "#2980b9",
      stock_color: "#d35400",
      text_color: "#e67e22",
      warning_color: "#c0392b",
    },
  };

  const handleChange = (e) => {
    setColors({ ...colors, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    // Clone the colors object to avoid mutating the original state
    const newColors = { ...colors };
    // console.log("🚀 ~ handleSave ~ newColors:", newColors);

    // Check if restaurant and location are empty and set default values
    if (!newColors.restaurant) {
      newColors.restaurant = selectedRestaurant;
    }
    if (!newColors.location) {
      newColors.location = selectedLocation;
    }

    if (themelist?.length > 0) {
      // Update theme with all fields including id
      updateTheme({ data: colors, id: newColors.id });
      toast.success("Theme saved successfully");
    } else {
      // Remove id field when creating a new theme
      const { id, ...createColors } = newColors;
      createTheme(createColors);
      toast.success("Theme created successfully");
    }

    // Update key to trigger re-render or any other necessary action
    setKey((prevKey) => prevKey + 1);

    // Log the saved colors for debugging purposes
    // console.log("Saved colors:", newColors);
  };

  // console.log("🚀 ~ DynamicTheme ~ colors:", colors);

  const handleDelete = () => {
    // Logic to delete changes
    // console.log("Deleted colors");
    setColors({
      background_color: "#000000",
      button_bg_color: "#000000",
      button_hover_bg_color: "#000000",
      button_hover_text_color: "#000000",
      button_text_color: "#000000",
      card_color: "#000000",
      danger_color: "#000000",
      disable_color: "#000000",
      positive_color: "#000000",
      primary_color: "#000000",
      secondary_color: "#000000",
      stock_color: "#000000",
      text_color: "#000000",
      warning_color: "#000000",
      id: colors.id,
      restaurant: colors.restaurant,
      location: colors.location,
    });
  };

  const applyRecommendedColors = (restaurant) => {
    setColors((prevColors) => ({
      ...prevColors,
      ...recommendedColors[restaurant],
    }));
  };

  // console area
  // console.log(
  //   "🚀 ~ DynamicTheme ~ selectedRestaurant-List:",
  //   selectedRestaurant
  // );
  // console.log("🚀 ~ DynamicTheme ~ selectedLocation-List:", selectedLocation);
  // // console.log("🚀 ~ DynamicTheme ~ restaurentList:", restaurentList?.results);
  // // console.log("🚀 ~ DynamicTheme ~ locationList:", locationList);
  // console.log("🚀 ~ DynamicTheme ~ themelist:", themelist);
  // console.log("🚀 ~ DynamicTheme ~ colors:", colors);
  // console.log(
  // "🚀 ~ DynamicTheme ~ recommended:",
  // parseInt(recommendedRestaurant)
  // );
  // // console.log("🚀 ~ DynamicTheme ~ allThemes:", allThemes);

  // const getRecommendedRestaurant = allThemes?.find((rec) =>
  //   console.log(parseInt(rec.restaurant) === parseInt(recommendedRestaurant))
  // );

  // console.log("recommendedRestaurant:", getRecommendedRestaurant);

  const filteredKeys = Object.keys(colors).filter(
    (key) => !["id", "restaurant", "location"].includes(key)
  );
  // console.log("🚀 ~ DynamicTheme ~ filteredKeys:", filteredKeys);

  // Function to get dynamic URL part based on selectedRestaurant
  // const getDynamicUrlPart = (selectedRestaurant) => {
  //   const urlMap = {
  //     83: "lees-house-restaurant-782c15ff/3994-shelbourne-street-victoria-namer-v8n-3e2-1c72dd04",
  //     85: "famous-wok-33470d52/200-burrard-street-vancouver-bc-v6c-canada-10b558ee",
  //     84: "dy-nukorean-station-bde52e5d/4000-no-3-road-unit-3315-richmond-bc-v6x-0j8-canada-9e1fe208",
  //     114: "ginger-indian-cuisine-31966a52/9100-blundell-rd-490-richmond-bc-v6y-3x9-3f241a48",
  //     110: "chj-bistro-b1b36b64/12240-second-ave240-richmond-bc-48eaaec9",
  //     107: "the-bubble-world-c9f6798f/10090-152-st-137-surrey-bc-v3r-8x8-88a0965d601",
  //     122: "bombay-kitchen-and-bar-on-denman-88f64d95/denman-st-vancouver-bc-v6g-2m7-a84d74b3",
  //     87: "hui-lau-shan-ad857eb5/6533-buswell-st-richmond-bc-v6y-3b5-0bdf02c1",
  //     86: "jadoo-kamloops-fab16b59/555-columbia-street-west-kamloops-british-columbia-v2c-1k7-canada-ec474c36",
  //     101: "coral-court-c14ef1f2/137-2nd-st-e-north-vancouver-bc-v7l1c2-canada-49e9934a",
  //     105: "veggie-valley-foods-ltd-vegan-fried-chickun-73bbdd7c/5932-fraser-st-97b8025b",
  //     106: "paragon-pizza-c24d9880/6942-victoria-drive-b9a41d6c",
  //     113: "ajiya-sushi-675b3650/1822-west-4th-ave-vancouver-canada-a7f044ba",
  //     111: "mala-boy-ddfa7bec/160-mccaul-st-toronto-on-m5t-1w4-a9f741ef",
  //     109: "tandoori-kona-1a4a72a7/11700-cambie-rd-170-richmond-bc-v6x-1l5-e7942e93",
  //     117: "famous-dosa-indian-grill-thalapkatti-biryani-house-aa1d1317/1625-kingsway-vancouver-bc-v5n-2s2-33bc553b",
  //     115: "tandoori-king-434ceb09/11911-bridgeport-rd-101-richmond-bc-v6x-1t5-9560705b",
  //     116: "haoyijia-7a3b8fb7/4151-hazelbridge-way-3270-richmond-bc-v6x-4j7-f4af64da",
  //     121: "bombay-masala-restaurant-3c13bb08/4473-w-10th-ave-vancouver-bc-v6r-2h8-8f0d6341",
  //     123: "bombay-kitchen-bar-commercial-dr-76269602/1018-commercial-dr-vancouver-bc-v5l-3w9-bb23add8",
  //     124: "the-main-08b3f955/4210-main-st-vancouver-bc-v5v-3p9-73b38bf9",
  //     125: "sector-7-kitchen-bar-fe3b6be3/9371-no-5-rd-unit-10-richmond-bc-v7a-4e1-a8ff958b",
  //     128: "aye-sushi-cafe-abe0cb9a/4572-w-10th-ave-vancouver-bc-v6r-2j1-444fe88d",
  //     127: "green-indian-restaurant-21ab0920/12565-88-ave-112-surrey-bc-v3w-3j7-bb17a8b9",
  //     120: "ay-chihuahua-9728b090/2767-commercial-dr-vancouver-bc-v5n-4c5-eaefaa11",
  //     126: "gold-train-express-01478b46/4530-w-10th-ave-vancouver-bc-v6r2j1-2e24d005",
  //     129: "aloha-hawaiian-grill-9aabb4e2/3900-bayview-st-110-richmond-bc-v7e-4r7-c622b582",
  //     130: "the-kitchen-3f1ebf4a/2620-sasamat-st-vancouver-bc-v6r-4a8-canada-ca79c1e1",
  //     131: "pearl-castle-cafe-4aada2a5/continental-centre-1128-3779-sexsmith-rd-richmond-c37d78a6",
  //     150: "sun-mongolian-bbq-6be1a481/2564-shaughnessy-st-port-coquitlam-bc-v3c-3g4-canada-387dd9f8",
  //     147: "nice-tea-20fa29a4/4558-kingsway-burnaby-bc-v5h-2b1-26413ead",
  //     143: "mabuhay-supermarket-and-garden-produce-0065ee77/3369-kingsway-1-vancouver-bc-v5r-5k6-5536333a",
  //     140: "kiyo-sushi-e9250d7d/11590-cambie-rd-110-richmond-bc-v6x-3z5-4cd3b78c",
  //     139: "yuan-hainanese-chicken-589c2830/4500-kingsway-burnaby-bc-v5h-2a9-canada-899af687",
  //     145: "thai-box-e9f82cf9/thai-box-37efa8d4",
  //     146: "szechuan-house-11e2e3e6/szechuan-house-e5166e4b",
  //     148: "shine-valley-lamb-soup-4ef87635/1103-3779-sexsmith-rd-richmond-bc-v6x-3z9-a59aa57a",
  //     142: "xin-pai-zibo-bbq-06f0d422/8580-alexandra-rd-1185-1190-richmond-bc-v6x-4b3-1807c584",
  //     151: "hululu-41752e54/2184-w-41st-ave-unit-2-vancouver-bc-v6m-1z1-canada-f4e444ee",
  //     152: "satya-asha-b4cfc006/12818-72-ave-6-surrey-bc-v3w-2m9-05c1dcfe",
  //   };

  //   return urlMap[selectedRestaurant] || "";
  // };
  // Get base URL from environment variable
  const baseUrl = import.meta.env.VITE_API_ROOT;

  // Function to determine the subdomain based on the base URL
  const getSubdomain = (baseUrl) => {
    if (baseUrl === "http://api.hungry-tiger.com/") {
      return "order";
    } else if (baseUrl === "https://test.api.chatchefs.com/") {
      return "dev";
    } else {
      return ""; // Default case if baseUrl doesn't match the known values
    }
  };

  // Determine subdomain and dynamic URL part
  const subdomain = getSubdomain(baseUrl);
  // const dynamicUrlPart = getDynamicUrlPart(selectedRestaurant);
  // console.log(
  //   "🚀 ~ DynamicTheme ~ dynamicUrlPart-restaurant:",
  //   selectedRestaurant
  // );
  // // console.log("🚀 ~ DynamicTheme ~ dynamicUrlPart:", dynamicUrlPart);

  // Construct the full URL
  // const srcUrl = `https://${subdomain}.chatchefs.com/${dynamicUrlPart}/menu`;
  const srcUrl = `https://${subdomain}.chatchefs.com/${orderUrl}/menu`;

  // console.log("🚀 ~ DynamicTheme ~ srcUrl:", srcUrl);
  return (
    <section className="px-2 md:px-5 lg:px-5 py-5">
      <div className="my-3 flex items-center gap-3">
        <div>
          <h3 className="py-2 font-bold">Restaurant</h3>
          <select
            className="select select-bordered"
            name="restaurant"
            value={selectedRestaurant}
            onChange={(e) => setSelectedRestaurant(parseFloat(e.target.value))}
          >
            <option selected>Select Restaurant</option>
            {restaurentList?.results?.map((res) => (
              <option key={res.id} value={res.id}>
                {res.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <h3 className="py-2 font-bold">Location</h3>
          <select
            className="select select-bordered"
            name="location"
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(parseFloat(e.target.value))}
          >
            <option selected>Select Location</option>
            {locationList?.results?.map((res) => (
              <option key={res.id} value={res.id}>
                {res.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-3">
        <div>
          <h2 className="font-bold">Color Setup</h2>
          {/* color input  */}
          <div className="w-full grid-cols-1 grid md:grid-cols-2 lg:grid-cols-2 whitespace-nowrap gap-2">
            {filteredKeys.map((key) => (
              <ColorInput
                key={key}
                label={key.replace(/_/g, " ")}
                name={key}
                value={colors[key]}
                onChange={handleChange}
                handleOpenModal={handleOpenModal}
              />
            ))}
          </div>
          {/* handle save/delete button */}
          <div className="flex items-center my-5 gap-2">
            <button className="btn btn-primary text-white" onClick={handleSave}>
              {themelist?.length > 0 ? "Save Changes" : "Create Theme"}
            </button>
            <button
              onClick={() => {
                Swal.fire({
                  title: "Are you sure?",
                  text: "You won't be able to revert this!",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Yes, delete it!",
                }).then((result) => {
                  if (result.isConfirmed) {
                    deleteTheme(colors?.id);
                  }
                });
              }}
              className="btn btn-error text-white"
            >
              {deleteThemeLoading ? (
                <span className="loading loading-spinner loading-md"></span>
              ) : (
                <BsTrash className="text-xl" />
              )}
            </button>
          </div>

          {/* Recommended restaurant colors */}
          <div>
            <h2 className="text-center font-bold text-2xl text-[#000000b9]">
              Apply Recommended Colors
            </h2>
            {/* {Object.keys(recommendedColors).map((restaurant) => (
              <p
                key={restaurant}
                className="px-2 py-4 bg-primary text-white w-2/3 my-4 rounded-lg font-medium cursor-pointer"
                onClick={() => applyRecommendedColors(restaurant)}
              >
                {restaurant}
              </p>
            ))} */}
            {recommendedRestaurants?.map((data) => (
              <p
                key={data?.id}
                className="px-2 py-4 bg-primary text-white w-2/3 my-4 rounded-lg font-medium cursor-pointer"
                onClick={() => {
                  // console.log("Dataaaaaaaaa", data);
                  setRecommendedRestaurant(data?.id);
                }}
              >
                {data?.restaurant}
              </p>
            ))}
          </div>
        </div>
        {/* preview component */}
        <div className="w-[100%] h-[650px] border-2 border-gray-500 border-opacity-30 bg-gray-300">
          <div className="flex justify-end my-2">
            <button
              onClick={handleReload}
              className="bg-gray-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center gap-2"
            >
              Reload <IoReload className="text-lg" />
            </button>
          </div>
          <div className="h-[70vh] overflow-hidden">
            <iframe
              key={key}
              src={srcUrl}
              className="w-full h-full"
              style={{ overflow: "auto" }}
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DynamicTheme;
