import React, { useEffect, useRef, useState } from "react";
import { useCustomerSendEmailMutation } from "../../../../redux/features/email/customerEmail";
import {
  useGetLocationsQuery,
  useGetRestaurentsQuery,
} from "../../../../redux/features/menuCreation/menuCreationApi";
import { useGetRewardsGroupQuery } from "../../../../redux/features/Rewards/rewardsApi";
import CustomDropdown from "./CustomDropdown";
const percentageList = [
  5, 10, 15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85, 90, 95,
  100,
];

const CustomerEmail = () => {
  const [restaurant, setRestaurant] = useState("");
  const [location, setLocation] = useState("");

  const [selectedRewardId, setSelectedRewardId] = useState(null);
  const [page, setPage] = useState(1);
  const [rewardOptions, setRewardOptions] = useState([]);
  const [percentage, setPercentage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const dropdownRef = useRef(null);

  const { data: rewardData } = useGetRewardsGroupQuery(page);

  //   const { data, error, isLoading } = useCustomerSendEmailQuery({
  //     restaurantId: restaurant,
  //     rewardId: selectedRewardId,
  //     amount: percentage,
  //     locationId: location,
  //   });

  const [sendEmail, { data, error, isLoading }] =
    useCustomerSendEmailMutation();

  //   console.log("DATA EMAIL", data);

  //   console.log("rewardsData",rewardData)

  //   useEffect(() => {
  //     if (rewardData) {
  //       setRewardOptions((prevOptions) => {
  //         // Create a Set to track unique IDs
  //         const existingIds = new Set(prevOptions.map((reward) => reward.id));

  //         // Filter out duplicates from the new data
  //         const uniqueNewRewards = rewardData.results.filter(
  //           (reward) => !existingIds.has(reward.id)
  //         );

  //         // Combine previous options with unique new rewards
  //         return [...prevOptions, ...uniqueNewRewards];
  //       });

  //       setLoading(false);
  //       setHasMore(!!rewardData.links.next);
  //     }
  //   }, [rewardData]);

  useEffect(() => {
    if (rewardData) {
      setRewardOptions((prevOptions) => {
        // Create a Set to track unique IDs
        const existingIds = new Set(prevOptions.map((reward) => reward.id));

        // Extract the reward_set from rewardData
        const newRewards = rewardData.results.flatMap(
          (result) => result.reward_set
        );

        // Filter out duplicates from the new data
        const uniqueNewRewards = newRewards.filter(
          (reward) => !existingIds.has(reward.id)
        );

        // Combine previous options with unique new rewards
        return [...prevOptions, ...uniqueNewRewards];
      });

      setLoading(false);
      setHasMore(!!rewardData.links?.next);
    }
  }, [rewardData]);

  const loadMoreRewards = () => {
    if (!loading && hasMore) {
      setLoading(true);
      setPage((prevPage) => prevPage + 1);
    }
  };
  //   console.log("rewardData", rewardData);

  const handleSelectReward = (id) => {
    setSelectedRewardId(id);
  };

  const handleSendEmail = () => {
    sendEmail({
      restaurantId: restaurant,
      rewardId: selectedRewardId,
      amount: percentage,
      locationId: location,
    })
      .unwrap()
      .then((response) => {
        // Handle success
        // console.log("Email sent successfully", response);
      })
      .catch((error) => {
        // Handle error
        // console.error("Failed to send email", error);
      });
  };

  const {
    data: restaurantList,
    isLoading: isRestaurantLoading,
    isError: isRestaurantError,
    error: restaurantError,
    isSuccess: isRestaurantSuccess,
  } = useGetRestaurentsQuery();

  // console.log("restaurantList", restaurantList);

  // console.log("RestaurantId", restaurant);

  const {
    data: locationList,
    isSuccess: isLocationSuccess,
    isLoading: isLocationLoading,
    refetch: refetchLocations,
  } = useGetLocationsQuery({ restaurantId: parseInt(restaurant) });

  return (
    <div>
      <h1 className="text-4xl font-bold">Send Email to Customer</h1>

      <div className="flex flex-col justify-start items-start gap-6 mt-6 p-10">
        <div className="flex flex-row justify-center items-center gap-4">
          <h1 className="text-lg font-bold">Select Restaurant</h1>
          <div className="w-64">
            <select
              value={restaurant}
              onChange={(e) => setRestaurant(e.target.value)}
              id="restaurant"
              className="select select-bordered w-full"
            >
              <option value="" disabled>
                Select Restaurant
              </option>
              {restaurantList?.results.map((restaurantItem) => (
                <option key={restaurantItem.id} value={restaurantItem.id}>
                  {restaurantItem.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* locations  */}
        <div className="flex flex-row justify-center items-center gap-9">
          <h1 className="text-lg font-bold">Select Location</h1>
          <div className="form-control w-64">
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="select select-bordered w-full"
            >
              <option value="" disabled>
                Select location
              </option>
              {locationList?.results.map((location) => (
                <option value={location.id} key={location.id}>
                  {location?.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex flex-row justify-center items-center gap-9">
          <h1 className="text-lg font-bold">Choose Reward</h1>
          <CustomDropdown
            options={rewardOptions}
            loading={loading}
            onLoadMore={loadMoreRewards}
            onSelect={handleSelectReward}
            selectedRewardId={selectedRewardId}
          />
        </div>

        {/* amount */}

        <div className="flex flex-row justify-center items-center gap-9">
          <h1 className="text-lg font-bold">Choose Percentage</h1>
          <div className="form-control w-48">
            <select
              value={percentage}
              onChange={(e) => setPercentage(e.target.value)}
              className="select select-bordered w-full"
            >
              <option disabled selected>
                Select Percentage
              </option>
              {percentageList.map((item, index) => (
                <option value={item} key={index}>
                  {item}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button
          onClick={handleSendEmail}
          disabled={isLoading}
          className="bg-primary px-4 py-2 rounded-md"
        >
          {isLoading ? "Sending..." : "Send Email"}
        </button>
      </div>
    </div>
  );
};

export default CustomerEmail;
