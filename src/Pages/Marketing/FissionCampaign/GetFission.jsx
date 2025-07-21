import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetFissionCampaignsQuery } from "../../../redux/features/fissionCampaign/fissionCampaignApi";
import { useGetRestaurentsQuery } from "../../../redux/features/menuCreation/menuCreationApi";
import RewardTable from "./RewardTable";

const GetFission = () => {
  const [restaurantIdAllcampaign, setRestaurantIdAllcampaign] = useState("");
  const {
    data: restaurantList,
    isLoading: isRestaurantLoading,
    isError: isRestaurantError,
    error: restaurantError,
    isSuccess: isRestaurantSuccess,
  } = useGetRestaurentsQuery();

  const {
    data: allFissionCampaigns,
    isLoading: isgetCampaignLoading,
    isError: isgetCampaignError,
    error: getCampaignError,
    isSuccess: isGetFissionCampaignsSuccess,
  } = useGetFissionCampaignsQuery(restaurantIdAllcampaign);

  const navigate = useNavigate();

  return (
    <section className="px-3 py-10">
      <div>
        <h1 className="text-4xl font-bold mb-4">Lucky Flip</h1>

        <div className="mt-10 flex items-center gap-2">
          {/* add new lucky flip  */}
          <button
            onClick={() => navigate("/dashboard/create-fission-campaigns")}
            className="px-5 py-2 text-white rounded bg-[#42C2FF] flex items-center gap-2 text-xl"
          >
            <span className="flex items-center font-bold">+</span>{" "}
            <span className="flex items-center">Add New Lucky Flip</span>
          </button>
          {/* select restaurant  */}
          <select
            onChange={(e) => setRestaurantIdAllcampaign(e.target.value)}
            id="restaurant"
            className="select select-bordered"
          >
            <option value="">All Restaurant</option>
            {restaurantList?.results.map((restaurant) => (
              <option key={restaurant.id} value={restaurant.id}>
                {restaurant.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* reward table  */}
      <div>
        <RewardTable
          allFissionCampaigns={allFissionCampaigns}
          isgetCampaignLoading={isgetCampaignLoading}
        />
      </div>
    </section>
  );
};

export default GetFission;
