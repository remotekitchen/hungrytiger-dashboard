import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  useCreateSettingsMutation,
  useGetAutoReplyReviewQuery,
  useUpdateAutoReplyReviewMutation,
} from "../../../redux/features/AutoReplyReview/autoReplyReviewApi";
import RestaurantLocationSelector from "./RestaurantLocationSelector";

const AutoReplySettings = () => {
  const [activeNav, setActiveNav] = useState("autoReply");
  const [selectedTab, setSelectedTab] = useState("bad"); // Default to bad reviews
  const [autoReplyEnabled, setAutoReplyEnabled] = useState(true);
  const [voucherAmount, setVoucherAmount] = useState(0); // Voucher for bad reviews
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);

  // Fetch existing settings
  const {
    data: settings,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetAutoReplyReviewQuery(
    { restaurantId: selectedRestaurant, locationId: selectedLocation },
    {
      skip: !selectedRestaurant || !selectedLocation,
    }
  );

  // Mutations
  const [updateSettings, { isLoading: isUpdating }] =
    useUpdateAutoReplyReviewMutation();
  const [createSettings, { isLoading: isCreating }] =
    useCreateSettingsMutation();

  // Populate state with fetched data
  useEffect(() => {
    if (settings) {
      setAutoReplyEnabled(
        selectedTab === "bad"
          ? settings.auto_reply_to_bad_comments ?? false
          : settings.auto_reply_to_good_comments ?? false
      );
      setVoucherAmount(settings.voucher_amount || 0);
    }
  }, [settings, selectedTab]);

  // Refetch settings when restaurant or location changes
  useEffect(() => {
    if (selectedRestaurant && selectedLocation) {
      refetch();
    }
  }, [selectedRestaurant, selectedLocation, refetch]);

  // Handle save or add new settings
  const handleSaveChanges = async () => {
    if (!selectedRestaurant || !selectedLocation) {
      toast.error("Please select both a restaurant and a location.");
      return;
    }

    const requestBody = {
      restaurant: selectedRestaurant,
      location: selectedLocation,
      auto_reply_to_good_comments:
        selectedTab === "good" ? autoReplyEnabled : false,
      auto_reply_to_bad_comments:
        selectedTab === "bad" ? autoReplyEnabled : false,
      voucher_amount: selectedTab === "bad" ? voucherAmount : 0, // Include voucher only for bad reviews
    };

    try {
      if (isError && error?.data?.detail === "Settings not found.") {
        // Create new settings if none exist
        await createSettings(requestBody).unwrap();
        toast.success("Auto-reply system enabled successfully!");
      } else {
        // Update existing settings
        await updateSettings({
          restaurantId: selectedRestaurant,
          locationId: selectedLocation,
          ...requestBody,
        }).unwrap();
        toast.success("Settings updated successfully!");
      }
    } catch (err) {
      toast.error("Failed to save settings. Please try again.");
    }
  };

  if (isLoading) return <div>Loading settings...</div>;

  if (isError && error?.data?.detail === "Settings not found.") {
    return (
      <div className="flex justify-center items-center mt-10 bg-gray-100">
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-6xl">
          <RestaurantLocationSelector
            selectedRestaurant={selectedRestaurant}
            selectedLocation={selectedLocation}
            setSelectedRestaurant={setSelectedRestaurant}
            setSelectedLocation={setSelectedLocation}
          />
          <p className="text-red-500 mt-6">
            No settings found for the selected restaurant and location. Please
            enable the auto-reply system.
          </p>
          <button
            className="btn btn-primary mt-4"
            onClick={handleSaveChanges}
            aria-label="Enable Auto Reply"
            disabled={isCreating}
          >
            {isCreating ? "Enabling..." : "Enable Auto Reply System"}
          </button>
        </div>
      </div>
    );
  }

  if (isError) return <div>Error loading settings. Please try again.</div>;

  return (
    <div className="flex justify-center items-center mt-10 bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-6xl">
        {/* Restaurant & Location Selector */}
        <RestaurantLocationSelector
          selectedRestaurant={selectedRestaurant}
          selectedLocation={selectedLocation}
          setSelectedRestaurant={setSelectedRestaurant}
          setSelectedLocation={setSelectedLocation}
        />

        {/* Render content only when both restaurant and location are selected */}
        {selectedRestaurant && selectedLocation ? (
          <>
            {/* Navigation Tabs */}
            <div className="flex mb-6 border-b gap-7">
              <button
                className={`text-lg pb-2 ${
                  activeNav === "autoReply"
                    ? "border-b-2 border-blue-500 font-bold"
                    : "text-gray-500"
                }`}
                onClick={() => setActiveNav("autoReply")}
              >
                Auto Reply
              </button>
              <button
                className={`text-lg pb-2 ${
                  activeNav === "coupon"
                    ? "border-b-2 border-blue-500 font-bold"
                    : "text-gray-500"
                }`}
                onClick={() => setActiveNav("coupon")}
              >
                Auto providing coupon based on comments
              </button>
            </div>

            {/* Tab Content */}
            <div>
              <div className="mb-4 flex gap-3">
                <button
                  className={`btn ${
                    selectedTab === "bad"
                      ? "btn-primary"
                      : "btn-outline border-primary hover:btn-primary"
                  }`}
                  onClick={() => setSelectedTab("bad")}
                  aria-label="Auto reply for bad comments"
                >
                  Auto reply for bad comments
                </button>
                <button
                  className={`btn ${
                    selectedTab === "good"
                      ? "btn-primary"
                      : "btn-outline border-primary hover:btn-primary"
                  }`}
                  onClick={() => setSelectedTab("good")}
                  aria-label="Auto reply for good comments"
                >
                  Auto reply for good comments
                </button>
              </div>

              <div className="space-y-5">
                <p className="font-medium">Enable Auto Reply?</p>
                <div className="flex gap-4 mt-2">
                  <label className="cursor-pointer flex items-center justify-center">
                    <input
                      type="radio"
                      name="autoReply"
                      className="radio radio-primary"
                      checked={autoReplyEnabled}
                      onChange={() => setAutoReplyEnabled(true)}
                    />
                    <span className="ml-2">Yes</span>
                  </label>
                  <label className="cursor-pointer flex items-center justify-center">
                    <input
                      type="radio"
                      name="autoReply"
                      className="radio radio-primary"
                      checked={!autoReplyEnabled}
                      onChange={() => setAutoReplyEnabled(false)}
                    />
                    <span className="ml-2">No</span>
                  </label>
                </div>

                {/* Show voucher field only for bad comments */}
                {selectedTab === "bad" && (
                  <div className="flex gap-2 items-center">
                    <label htmlFor="voucherAmount" className="font-medium">
                      Voucher Amount:
                    </label>
                    <input
                      id="voucherAmount"
                      type="number"
                      value={voucherAmount}
                      onChange={(e) => setVoucherAmount(Number(e.target.value))}
                      className="input input-primary mt-2"
                      placeholder="Enter voucher amount"
                    />
                  </div>
                )}

                {selectedTab === "bad" ? (
                  <div className="mt-4">
                    <p className="font-medium">Auto Reply for Bad Comments:</p>
                    <p className="text-sm text-gray-600">
                      Negative feedback will trigger an automatic response to
                      apologise to the customer and offer assistance.
                    </p>
                  </div>
                ) : (
                  <div>
                    <p className="font-medium">Auto Reply for Good Comments:</p>
                    <p className="text-sm text-gray-600">
                      Positive feedback will trigger an automatic response to
                      thank the customer.
                    </p>
                  </div>
                )}
              </div>

              {/* Save Changes Button */}
              <button
                className="btn btn-primary mt-4"
                onClick={handleSaveChanges}
                disabled={isUpdating || isCreating}
                aria-label="Save Changes"
              >
                {isUpdating || isCreating ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </>
        ) : (
          <p className="text-gray-600 mt-4">
            Please select a restaurant and location to view settings.
          </p>
        )}
      </div>
    </div>
  );
};

export default AutoReplySettings;
