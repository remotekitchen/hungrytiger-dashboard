/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  useAddFissionCampaignMutation,
  useGetFissionCampaignsQuery,
  useGetFissionCampaignsRestaurantLogoQuery,
  useUpdateFissionCampaignMutation,
  useUpdateFissionCampaignRestaurantLogoMutation,
} from "../../../redux/features/fissionCampaign/fissionCampaignApi";
import { useGetRestaurentsQuery } from "../../../redux/features/menuCreation/menuCreationApi";
import AddFissionCampaign from "./AddFissionCampaign";
import AutomaticDecission from "./AutomaticDecission";
import FissionCampaignImage from "./FissionCampaignImage";
import ValidityType from "./ValidityType";
const FissionCampaigns = () => {
  const [restaurantIdAllcampaign, setRestaurantIdAllcampaign] = useState("");
  const [bannerImage, setBannerImage] = useState();
  // all restaurants
  const {
    data: restaurantList,
    isLoading: isRestaurantLoading,
    isError: isRestaurantError,
    error: restaurantError,
    isSuccess: isRestaurantSuccess,
  } = useGetRestaurentsQuery();

  const [
    useUpdateFissionCampaignRestaurantLogo,
    { isLoading, isSuccess, isError },
  ] = useUpdateFissionCampaignRestaurantLogoMutation();

  const {
    data: allFissionCampaignsRestaurantLogo,
    isLoading: isgetCampaignRestaurantLogoLoading,
    isError: isgetCampaignRestaurantLogoError,
    error: getCampaignRestaurantLogoError,
    isSuccess: isGetFissionCampaignsRestaurantLogoSuccess,
  } = useGetFissionCampaignsRestaurantLogoQuery(restaurantIdAllcampaign);

  // all campaigns
  // all campaigns
  // all campaigns
  const {
    data: allFissionCampaigns,
    isLoading: isgetCampaignLoading,
    isError: isgetCampaignError,
    error: getCampaignError,
    isSuccess: isGetFissionCampaignsSuccess,
  } = useGetFissionCampaignsQuery(restaurantIdAllcampaign);
  // // console.log(
  //   "🚀 ~ FissionCampaigns ~ allFissionCampaigns:",
  //   allFissionCampaigns?.results
  // );

  // const handleButtonClick = (e) => {
  //   e.preventDefault();
  //   if (restaurantIdAllcampaign) {
  //     const formData = new FormData();
  //     if (e.target.bannerImage.files[0]) {
  //       formData.append("banner_image.local_url", e.target.bannerImage.files[0]);
  //     } else if (bannerImage instanceof File) {
  //       // Use the file directly if it's already a File object
  //       formData.append("banner_image.local_url", bannerImage);
  //     } else if (typeof bannerImage === "string") {
  //       // If 'bannerImage' is a URL, fetch and convert to Blob
  //       fetch(bannerImage)
  //         .then((response) => response.blob())
  //         .then((blob) => form.append("banner_image.local_url", blob));
  //     }
  //     useUpdateFissionCampaignRestaurantLogo({
  //       restaurantId: restaurantIdAllcampaign,
  //       data: formData,
  //     });
  //   } else {
  //     toast.error("Please select a restaurant first");
  //   }
  // };
  const bannerImageRef = useRef();
  const handleButtonClick = (e) => {
    e.preventDefault();

    if (restaurantIdAllcampaign) {
      const formData = new FormData();

      if (bannerImageRef.current.files[0]) {
        formData.append(
          "banner_image.local_url",
          bannerImageRef.current.files[0]
        );
      } else if (bannerImage instanceof File) {
        // Use the file directly if it's already a File object
        formData.append("banner_image.local_url", bannerImage);
      } else if (typeof bannerImage === "string") {
        // If 'bannerImage' is a URL, fetch and convert to Blob
        fetch(bannerImage)
          .then((response) => response.blob())
          .then((blob) => formData.append("banner_image.local_url", blob));
      }

      useUpdateFissionCampaignRestaurantLogo({
        restaurantId: restaurantIdAllcampaign,
        data: formData,
      });
    } else {
      toast.error("Please select a restaurant first");
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Successfully updated restaurant logo");
    }
    if (isError) {
      toast.error("Something went wrong with updating restaurant logo");
    }
  }, [isSuccess, isError]);

  const [isAutomatic, setIsAutomatic] = useState(false);
  const [selectedRestaurant, setSelectedRestaurant] = useState("");
  const [prizes, setPrizes] = useState([
    {
      reward_group: "",
      probability: 0,
    },
  ]);

  const [duration, setDuration] = useState([]);
  // // console.log("🚀 ~ FissionCampaigns ~ duration:", duration?.start_date);
  const [availability, setAvailability] = useState("");

  const [validity_type, setValidityType] = useState("");
  const [selectedDays, setSelectedDays] = useState([]);
  // console.log('🚀 ~ FissionCampaigns ~ selectedDays:', selectedDays);
  // // console.log("🚀 ~ FissionCampaigns ~ validity_type:", validity_type);

  // // console.log("🚀 ~ Duration ~ :", duration);
  // // console.log("🚀 ~ Availability ~ :", availability);
  // // console.log("🚀 ~ Prizeeee ~ prizes:", prizes);

  const toggleDecision = () => {
    setIsAutomatic(!isAutomatic);
  };
  const extractPrizeDetails = (inputData) => {
    if (inputData?.length > 0) {
      return inputData[0]?.prize_details?.map((prize) => ({
        reward_group: prize.reward_group,
        probability: prize.probability,
      }));
    } else {
      return [];
    }
  };

  // useEffect(() => {
  //   if (isGetFissionCampaignsSuccess) {
  //     const newPrizes = extractPrizeDetails(allFissionCampaigns?.results);
  //     setPrizes(newPrizes);

  //     // Find availability based on condition
  //     // if (allFissionCampaigns?.results) {
  //     //   const foundFissionData = allFissionCampaigns.results.find(
  //     //     (fissionData) => fissionData.restaurant === restaurantIdAllcampaign
  //     //   );
  //     //   if (foundFissionData) {
  //     //     setAvailability(foundFissionData.availability);
  //     //   }
  //     // }
  //     // setAvailability("after_sign_up");

  //     const foundFissionData = allFissionCampaigns.results.find(
  //       (fissionData) => fissionData.restaurant
  //     );

  //     // if (foundFissionData?.restaurant === restaurantIdAllcampaign) {
  //     //   setAvailability(foundFissionData?.availability);
  //     // }
  //     setAvailability(foundFissionData?.availability);
  //     if (
  //       foundFissionData?.availability === undefined ||
  //       foundFissionData?.availability === ""
  //     ) {
  //       setAvailability();
  //     }

  //     setDuration({
  //       start_date: foundFissionData?.durations[0]?.start_date?.slice(0, 16),
  //       end_date: foundFissionData?.durations[0]?.end_date?.slice(0, 16),
  //     });
  //   }
  // }, [
  //   isGetFissionCampaignsSuccess,
  //   allFissionCampaigns,
  //   restaurantIdAllcampaign,
  // ]);
  const handleInputChange = (index, field, value) => {
    const newPrizes = [...prizes];
    newPrizes[index][field] = value;
    setPrizes(newPrizes);
  };
  const addNewPrize = () => {
    const newPrizes = [...prizes, { reward_group: "", probability: 0 }];
    setPrizes(newPrizes);
  };
  //add fission campaign api call
  const [
    addFissionCampaign,
    {
      isLoading: addCampaignLoading,
      isError: addCampaignError,
      isSuccess: addCampaignSuccess,
    },
  ] = useAddFissionCampaignMutation();
  const [
    updateFissionCampaign,
    {
      isLoading: updateCampaignLoading,
      isError: updateCampaignError,
      isSuccess: updateCampaignSuccess,
    },
  ] = useUpdateFissionCampaignMutation();

  const formattedData = {
    prize_details: prizes || [],
    availability: availability || "",
    restaurant: parseInt(restaurantIdAllcampaign) || null,
    color: "#ffffff",
    validity_type: validity_type,
    weekdays: validity_type === "repeating" ? selectedDays : [],
    durations: validity_type === "time_limit" ? [duration] : [],
  };
  // // console.log(
  //   "🚀 ~ FissionCampaigns ~ formattedDataaaaaaaaaaaaaaaaaa:",
  //   formattedData
  // );

  const navigate = useNavigate();

  // const handleAddFissionCampaign = () => {
  //   // add fission campaign if there is no fission campaign
  //   if (allFissionCampaigns?.results.length === 0) {
  //     addFissionCampaign(formattedData);
  //     // addFissionCampaign({
  //     //   data: formattedData,
  //     //   restaurant: restaurantIdAllcampaign,
  //     //   // restaurant: selectedRestaurant,
  //     // });
  //     navigate("/dashboard/fission-campaigns");
  //   } else {
  //     // update the first fission campaign
  //     updateFissionCampaign({
  //       data: formattedData,
  //       campaignId: allFissionCampaigns?.results[0]?.id,
  //     });
  //     navigate("/dashboard/fission-campaigns");
  //   }
  // };

  const handleAddFissionCampaign = () => {
    addFissionCampaign(formattedData);
    setTimeout(() => {
      toast.success("Fission campaign created successfully!");
    }, 1000);
    navigate("/dashboard/fission-campaigns");
  };

  useEffect(() => {
    if (addCampaignSuccess) {
      toast.success("Added campaign successfully");
    }
    if (addCampaignError) {
      toast.error("Something went wrong with adding campaign");
    }
    if (updateCampaignSuccess) {
      toast.success("Updated campaign successfully");
    }
    if (updateCampaignError) {
      toast.error("Something went wrong with updating campaign");
    }
  }, [
    addCampaignSuccess,
    addCampaignError,
    updateCampaignSuccess,
    updateCampaignError,
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDuration((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="p-5">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold mb-4">Fission Campaigns</h1>
        <div className="flex gap-4">
          <button className="border border-[#43A048] text-[#43A048] font-medium px-14 py-2 rounded-lg mt-4 flex items-center gap-2">
            Active
          </button>
          <button className="border border-[#42C2FF] text-[#42C2FF] font-medium px-14 py-2 rounded-lg mt-4 flex items-center gap-2">
            Cancel
          </button>
          <button
            onClick={handleAddFissionCampaign}
            disabled={addCampaignLoading || !restaurantIdAllcampaign}
            className={`bg-[#42C2FF] text-white px-14 py-2 rounded-lg mt-4 flex items-center gap-2 font-medium ${
              !restaurantIdAllcampaign ? "cursor-not-allowed" : "pointer"
            }`}
          >
            Add
          </button>
        </div>
      </div>
      {/* all campaigns */}
      <div>
        <p className="font-bold text-xl mb-4">Lucky Flip System</p>
        <div className="flex items-center justify-between mx-12">
          <div className="mb-4">
            {/* <button
              className={`mr-4 ${
                isAutomatic
                  ? "bg-[#42C2FF] text-white"
                  : "border border-[#42C2FF] text-[#42C2FF]"
              }  py-2 px-4 rounded`}
              // onClick={toggleDecision}
            >
              Automatic Decision
            </button> */}
            <button
              className={`${
                !isAutomatic
                  ? "bg-[#42C2FF] text-white"
                  : "border border-[#42C2FF] text-[#42C2FF]"
              }  py-2 px-4 rounded`}
              // onClick={toggleDecision}
            >
              Manual Decision
            </button>
          </div>

          <div className="flex flex-col">
            {restaurantIdAllcampaign ? (
              <input
                type="file"
                className="file-input file-input-bordered w-[300px]"
                ref={bannerImageRef}
              />
            ) : (
              ""
            )}
            <button
              className="bg-[#42C2FF] text-white py-2 px-4 rounded"
              onClick={handleButtonClick}
            >
              Upload Your Restaurant Logo
            </button>

            {restaurantIdAllcampaign && (
              <img
                src={
                  allFissionCampaignsRestaurantLogo?.banner_image?.local_url
                    ? allFissionCampaignsRestaurantLogo?.banner_image?.local_url
                    : ""
                }
                alt=""
                className="w-[80px] h-[80px]"
              />
            )}

            <button
              className={`${"bg-[#42C2FF] text-white py-2 rounded my-2"}`}
            >
              Select Color
            </button>
          </div>
        </div>

        <div className="flex justify-between mx-12">
          {isAutomatic ? (
            <AutomaticDecission />
          ) : (
            <div>
              <div className="my-6">
                <label className="block text-lg font-medium text-gray-700">
                  Restaurant*
                </label>
                <select
                  onChange={(e) => setRestaurantIdAllcampaign(e.target.value)}
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

              <div className="mb-3">
                {/* select availability  */}
                <div className="my-6">
                  <label className="block text-lg font-medium text-gray-700">
                    Select Condition
                  </label>
                  <select
                    onChange={(e) => setAvailability(e.target.value)}
                    id="availability"
                    className="select select-bordered w-full"
                    // value={availability}
                  >
                    <option selected disabled>
                      Select Condition
                    </option>
                    <option value="after_every_order">After Every Order</option>
                    <option value="once_every_user">Once Every User</option>
                    <option value="after_sign_up">After Sign Up</option>
                    <option value="after_joins_group">After Joins Group</option>
                  </select>
                </div>

                {/* select validity Type */}
                <div className="my-6">
                  <label className="block text-lg font-medium text-gray-700">
                    Select Validity Type
                  </label>
                  <select
                    onChange={(e) => setValidityType(e.target.value)}
                    id="validityType"
                    className="select select-bordered w-full"
                    // value={availability}
                  >
                    <option selected disabled>
                      Select Validity Type
                    </option>
                    <option value="repeating">Repeating</option>
                    <option value="time_limit">Time Limit</option>
                  </select>
                </div>

                {/* repeating value  */}
                {validity_type === "repeating" && (
                  <ValidityType
                    selectedDays={selectedDays}
                    setSelectedDays={setSelectedDays}
                  />
                )}

                {/* set duration  */}
                {validity_type === "time_limit" && (
                  <div>
                    <label
                      htmlFor="duration"
                      className="block text-lg font-medium text-gray-700"
                    >
                      Set Duration
                    </label>
                    <div className="flex items-center gap-2 w-full">
                      <div className="pt-4">
                        <label
                          htmlFor="start_date"
                          className="block text-lg font-medium text-gray-700"
                        >
                          Start Date
                        </label>
                        <input
                          type="datetime-local"
                          id="start_date"
                          name="start_date"
                          // value={duration?.start_date}
                          onChange={handleChange}
                          className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="end_date"
                          className="block text-lg font-medium text-gray-700 mt-4"
                        >
                          End Date
                        </label>
                        <input
                          type="datetime-local"
                          id="end_date"
                          name="end_date"
                          // value={duration?.end_date}
                          onChange={handleChange}
                          className="mt-1 w-full p-2 border border-gray-300 rounded-md"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* ================ */}
              <AddFissionCampaign
                allCampaigns={allFissionCampaigns?.results}
                selectedRestaurant={selectedRestaurant}
                setSelectedRestaurant={setSelectedRestaurant}
                restaurantList={restaurantList}
                prizes={prizes}
                handlePrizeSelect={handleInputChange}
                setPrizes={setPrizes}
                addNewPrize={addNewPrize}
                handleAddFissionCampaign={handleAddFissionCampaign}
                addCampaignLoading={addCampaignLoading}
              />
              {/* add more or save prizes */}
              <button
                onClick={addNewPrize}
                className="bg-[#42C2FF] text-white px-4 py-2 rounded-lg mt-4 flex items-center gap-2"
              >
                + Add More Prize
              </button>
            </div>
          )}
          {/* image preview */}
          <div>
            <FissionCampaignImage />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FissionCampaigns;
