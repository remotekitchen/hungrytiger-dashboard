import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useAddRewardsGroupMutation } from "../../../redux/features/Rewards/rewardsApi";
import {
  useGetAllItemsQuery,
  useGetItemsWithoutPaginationQuery,
} from "../../../redux/features/itemCreation/itemCreationApi";
import {
  useGetLocationsQuery,
  useGetRestaurentsQuery,
} from "../../../redux/features/menuCreation/menuCreationApi";
import RewardCard from "./components/RewardCard";
import RewardValidity from "./components/RewardValidity";
import RewardsCondition from "./components/RewardsCondition";
import SpecificItemsInCart from "./components/SpecificItemsInCart";

const AddCategoryModal = ({
  isEditing,
  rewardsDetails,
  showAddRewardModal,
  setShowAddRewardModal,
  sRewards,
  count,
}) => {
  // reward states
  const [rewardName, setRewardName] = useState();
  const [locationId, setLocationId] = useState();

  // // console.log("🚀 ~ locationIddddddddddd:", locationId);
  const [rewardDescription, setRewardDescription] = useState("");
  const [selectedRestarauntId, setSelectedRestarauntId] = useState(0);
  const [getSearchInput, setGetSearchInput] = useState("");

  // // console.log("🚀 ~ selectedRestarauntId:", selectedRestarauntId);
  const [page, setPage] = useState(1);

  const { data: menuItems, isLoading: menuLoading } = useGetAllItemsQuery({
    page,
    restaurantId: selectedRestarauntId,
    searchInputValue: getSearchInput,
    locationId: locationId,
  });
  const {
    data: getAllItemsData,
    isLoading: itemsLoading,
    refetch,
  } = useGetItemsWithoutPaginationQuery({
    restaurantId: selectedRestarauntId,
  });

  const [getAllItemWithCategory, setGetAllItemWithCategory] = useState([]);

  useEffect(() => {
    if (getAllItemsData) {
      setGetAllItemWithCategory(
        getAllItemsData
          .filter((item) => item?.category?.length)
          .filter((item) =>
            item?.name?.toLowerCase().includes(getSearchInput.toLowerCase())
          )
      );
    }
  }, [getAllItemsData, getSearchInput]);

  // // console.log("menu ITems",menuItems)

  // useEffect(() => {
  // // console.log("🚀 ~ menuItemssssssssssssssss:", menuItems);
  //   // Trigger API call
  //   refetch();
  //   // setPage(1);
  // }, [selectedRestarauntId, refetch, menuItems]);

  // // console.log("🚀 ~ Menu-Itemsss::::::", menuItems);
  // specific item or time
  const [itemInCartOrTimeOfDay, setItemInCartOrTimeOfDay] = useState(0);
  // if time of the day
  const [timeOfDayStartTime, setTimeOfDayStartTime] = useState();
  const [timeOfDayEndTime, setTimeOfDayEndTime] = useState();
  // free meal
  const [freeMealTypes, setFreeMealTypes] = useState();
  // single offerType
  const [singleOfferType, setSingleOfferType] = useState();
  // limit type for coupon select
  const [limitType, setLimitType] = useState("");
  // min & max dish value for coupon select
  const [minDishValue, setMinDishValue] = useState();
  const [maxDishValue, setMaxDishValue] = useState();
  // limit type for multiple offer type
  const [limitTypeMultiple, setLimitTypeMultiple] = useState("");
  // min & max dish value for multiple offer type select
  const [minDishValueMultiple, setMinDishValueMultiple] = useState();
  const [maxDishValueMultiple, setMaxDishValueMultiple] = useState();
  // additional conditions
  const [selectedAdditionalCondition, setSelectedAdditionalCondition] =
    useState("minimum_amount");
  // // console.log(selectedAdditionalCondition);
  const [offerTypeValue, setOfferTypeValue] = useState();
  // validity
  const [validitySelection, setValiditySelection] = useState("");
  const [validityDaySelection, setValidityDaySelection] = useState(0);
  // unlimited --> no condition.
  const [validitySelectionValue, setValiditySelectionValue] = useState(null);

  // initial state value --> updated
  const initialRewardState = {
    rewardType: "single_dish",
    rewardDescription: "",
    selectedRestarauntId: 0,
    selectRewardType: "",
    isFreeDelivery: false,
    bogoType: "",
    selectDishesForBogo: [],
    offerTypeValueForSingleAndMultipleDishes: 0,
    applicableConditions: [""],
    additionalCondition: "",
    additionalConditionValue: "",
    itemInCartOrTimeOfDay: "",
    itemsInCart: [],
    timeOfDayStartTime: "",
    timeOfDayEndTime: "",
    validitySelection: "",
    validitySelectionValue: "",
    selectedSingleDish: "",
    selectedMultipleDish: [],
  };

  // Create a state variable to manage the array of rewards
  const [rewards, setRewards] = useState([]);
  // console.log("🚀 ~ rewardsssssssssssssssss:", rewards);
  // conditions
  const [isDeliverySelected, setIsDeliverySelected] = useState(true);
  const [isPickupSelected, setIsPickupSelected] = useState(true);
  const [isDineInSelected, setIsDineInSelected] = useState(false);

  // selected items
  const [singleMenuItem, setSingleMenuItem] = useState([]);
  const [multipleMenuItem, setMultipleMenuItem] = useState([]);
  const [bogoMenuItem, setBogoMenuItem] = useState([]);
  const [additionalItems, setAdditionalItems] = useState([]);

  // get restaurant details Query
  const { data: restaurantList } = useGetRestaurentsQuery();

  // Create reward-group
  const [createRewardGroup] = useAddRewardsGroupMutation();

  // get all location list
  const {
    data: locationList,
    isSuccess: isLocationSuccess,
    isLoading: isLocationLoading,
  } = useGetLocationsQuery(selectedRestarauntId);

  // // console.log("locationList",locationList)

  /* Default fields and state adnan*/
  useEffect(() => {
    if (restaurantList?.results?.length > 0) {
      setSelectedRestarauntId(restaurantList.results[0].id);
      setLocationId(locationList?.results[0]?.id);
    }
  }, [restaurantList, locationList]);
  /* end */

  // initial condition state

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "rewardName") {
      setRewardName(value);
    } else if (name === "rewardDescription") {
      setRewardDescription(value);
    } else if (name === "selectedRestarauntId") {
      setSelectedRestarauntId(value);
    } else if (name === "selectedLocationId") {
      setLocationId(value);
    }
  };

  // Function to handle changes in the form elements of a specific reward
  const handleRewardChange = (index, field, value) => {
    const updatedRewards = [...rewards];
    // updatedRewards[index][field] = value;
    if (
      field === "selectedMultipleDish" &&
      updatedRewards[index].rewardType === "multiple_dish"
    ) {
      // Append the value to the selectedMultipleDish array
      updatedRewards[index][field] = [...updatedRewards[index][field], value];
    } else if (
      field === "selectDishesForBogo" &&
      updatedRewards[index].rewardType === "bogo"
    ) {
      updatedRewards[index][field] = [...updatedRewards[index][field], value];
    } else {
      // Update other fields normally
      updatedRewards[index][field] = value;
    }
    setRewards(updatedRewards);
  };

  // add a new reward to the array
  const addReward = () => {
    setRewards([...rewards, { ...initialRewardState }]);
  };

  // remove reward
  const removeReward = (indexToRemove) => {
    setRewards(rewards.filter((_, index) => index !== indexToRemove));
  };
  // show reward automaticaly when modal is open adnan
  useEffect(() => {
    if (showAddRewardModal) {
      setRewards([{ ...initialRewardState }]);
    } else {
      setRewards([]);
    }
  }, [selectedRestarauntId, showAddRewardModal]);
  // Function to get the selected values in an array
  const getSelectedApplicableValues = () => {
    const selectedValues = ["delivery", "pickup"];
    if (isDeliverySelected) {
      selectedValues.push("delivery");
    }
    if (isPickupSelected) {
      selectedValues.push("pickup");
    }
    if (isDineInSelected) {
      selectedValues.push("dine_in");
    }
    return selectedValues;
  };

  const { selectedRewards: selectedRewardsSelector } = useSelector(
    (state) => state.rewards
  );

  useEffect(() => {
    if (sRewards && isEditing) {
      setRewardName(sRewards?.name);
      setRewardDescription(sRewards.description);
      setRewards(sRewards?.reward_set);
      setSelectedRestarauntId(sRewards?.restaurant);
      setIsDeliverySelected(sRewards?.applies_for?.includes("delivery"));
      setIsPickupSelected(sRewards?.applies_for?.includes("pickup"));
      setIsDineInSelected(sRewards?.applies_for?.includes("dine_in"));
      setValiditySelection(sRewards?.validity_type);
      if (sRewards?.additionalcondition_set) {
        setSelectedAdditionalCondition(
          sRewards?.additionalcondition_set[0]?.condition_type
        );
        setItemInCartOrTimeOfDay(sRewards?.additionalcondition_set[0]?.amount);
      }
    } else {
      {
        setRewardName(`Free Dish ${count + 1}`);
        setRewardDescription(`${count + 1}`);
        setRewards([]);
        setSelectedRestarauntId("");
        setIsDeliverySelected(sRewards?.applies_for?.includes("delivery"));
        setIsPickupSelected(sRewards?.applies_for?.includes("pickup"));
        setIsDineInSelected(sRewards?.applies_for?.includes("dine_in"));
        setValiditySelection("unlimited");
        if (sRewards?.additionalcondition_set) {
          setSelectedAdditionalCondition("");
          setItemInCartOrTimeOfDay("");
        }
      }
    }
  }, [sRewards, isEditing]);

  // console.log(bogoMenuItem, 'bogoMenuIteminAdd');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Demo Data Structure
    const formattedData = {
      reward_set:
        rewards?.map((reward) => ({
          reward_type: reward?.rewardType,
          reward_points_worth:
            reward?.rewardType === "reward_point"
              ? reward?.reward_points_worth
              : 0,
          offer_type: reward?.offerTypeForSingleAndMultipleDishes,
          bogo_type:
            reward?.rewardType === "bogo" ? reward?.bogoType : "any_dish",
          // bogoType
          // offer_type: "percentage",
          amount:
            parseInt(reward?.offerTypeValueForSingleAndMultipleDishes) || 0,
          // limit_type: limitType,
          limit_type:
            reward?.rewardType === "multiple_dish"
              ? limitTypeMultiple
              : reward?.rewardType === "bogo"
              ? undefined
              : reward?.rewardType === "single_dish"
              ? undefined
              : undefined,
          // limit_type: "one_dish",
          // min_dishes: parseInt(minDishValue) || 0,
          min_dishes:
            reward?.rewardType === "multiple_dish"
              ? limitTypeMultiple === "limited"
                ? parseInt(minDishValueMultiple)
                : 0
              : reward?.rewardType === "coupon"
              ? limitType === "limited"
                ? parseInt(minDishValue)
                : 0
              : 0,
          max_dishes:
            reward?.rewardType === "multiple_dish"
              ? limitTypeMultiple === "limited"
                ? parseInt(maxDishValueMultiple)
                : 0
              : reward?.rewardType === "coupon"
              ? limitType === "limited"
                ? parseInt(maxDishValue)
                : 0
              : 0,
          is_free_delivery: reward?.isFreeDelivery,
          restaurant: parseInt(selectedRestarauntId),
          items:
            reward?.rewardType === "single_dish"
              ? [singleMenuItem]
              : reward?.rewardType === "multiple_dish"
              ? multipleMenuItem
              : reward?.rewardType === "bogo"
              ? bogoMenuItem
              : [],
          categories: [],
          // delivery_discount: 50,
        })) || [],
      additionalcondition_set: [
        {
          condition_type: selectedAdditionalCondition,
          amount: parseInt(itemInCartOrTimeOfDay) || 0,
          start_time: timeOfDayStartTime || null,
          end_time: timeOfDayEndTime || null,
          items: additionalItems,
        },
      ],
      name: rewardName,
      description: rewardDescription,
      applies_for: getSelectedApplicableValues(),
      validity_type: validitySelection,
      validity_days: parseInt(validityDaySelection) || 0,
      validity_date: validitySelectionValue,
      restaurant: parseInt(selectedRestarauntId),
      location: parseInt(locationId),
    };

    // Perform the Post request using createRewardGroup into the try catch method and after successful post request showing toast alert message

    // console.log(formattedData, "ForamttedeDataaaa");

    try {
      const response = await createRewardGroup(formattedData).unwrap();
      setShowAddRewardModal(!showAddRewardModal);
      // Handle success
      toast.success("Reward group created successfully!");
    } catch (error) {
      // Handle errors
      // Show an error message based on the error type
      if (error.data) {
        toast.error(`Failed to create reward group: ${error.data.detail}`);
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  // // console.log(rewards, "from state");

  const renderAdditionalComponents = () => {
    switch (selectedAdditionalCondition) {
      case "minimum_order_amount":
        return (
          <div className="flex items-center my-3">
            <input
              required
              name="offer_type_value"
              type="text"
              placeholder="Percentage Discount"
              className="input input-bordered me-2"
              value={offerTypeValue}
              onChange={(e) => setOfferTypeValue(e.target.value)}
            />
            $ / %
          </div>
        );
      case "specific_item":
        return <SpecificItemsInCart />;
      case "time_of_day":
        return (
          <div className="flex items-center my-4 space-x-1">
            <input
              required
              name="start_time"
              type="time"
              className="input input-bordered"
            />
            <span>-</span>
            <input
              required
              name="end_time"
              type="time"
              className="input input-bordered me-2"
            />
          </div>
        );
      default:
        return null; // Return null for no selection or unknown selection
    }
  };
  // // console.log(getSelectedApplicableValues());
  // // console.log("allRewards>", allRewards);

  return (
    <>
      <input
        type="checkbox"
        id={
          isEditing
            ? `add_reward_modal_${rewardsDetails.id}`
            : "add_reward_modal_"
        }
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box">
          <h1 className="text-2xl mb-6 font-bold font-sans">
            {isEditing ? "Edit" : "Add A"} Reward
          </h1>
          <form onSubmit={handleSubmit}>
            <div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Reward Name</span>
                </label>
                <input
                  required
                  name="rewardName"
                  type="text"
                  placeholder="Reward Name"
                  className="input input-bordered w-full"
                  value={rewardName}
                  onChange={handleInputChange}
                />
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Reward Description</span>
                </label>
                <textarea
                  required
                  className="textarea textarea-bordered"
                  placeholder="Description"
                  name="rewardDescription"
                  value={rewardDescription}
                  onChange={handleInputChange}
                ></textarea>
              </div>
              {/* select res */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Select Restaurant</span>
                </label>
                <select
                  id="restaurant"
                  required
                  className="select select-bordered w-full"
                  name="selectedRestarauntId"
                  value={selectedRestarauntId}
                  onChange={handleInputChange}
                  defaultValue=""
                >
                  <option value="" disabled selected>
                    Select Restaurant
                  </option>
                  {/* <option value="kfc">KFC</option>
                  <option value="sultans_dine">Sultans Dine</option>
                  <option value="mcdonald">McDonald</option> */}
                  {restaurantList?.results?.map((item) => (
                    <option key={item?.id} value={item?.id}>
                      {item?.name}
                    </option>
                  ))}
                </select>
              </div>
              {/* select location */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Select Location</span>
                </label>
                <select
                  id="location"
                  required
                  className="select select-bordered w-full"
                  name="selectedLocationId"
                  // value={selectedRestarauntId}
                  onChange={handleInputChange}
                  defaultValue={selectedRestarauntId}
                  disabled={selectedRestarauntId === 0}
                >
                  <option value="" disabled selected>
                    Select Location
                  </option>
                  {locationList?.results.map((item) => (
                    <option value={item.id} key={item.id}>
                      {item?.name}
                    </option>
                  ))}
                </select>
              </div>
              {/* =================== */}
              {/* each reward card */}
              {rewards.map((reward, index) => (
                <RewardCard
                  isEditing={isEditing}
                  reward={reward}
                  setRewards={setRewards}
                  index={index}
                  handleRewardChange={handleRewardChange}
                  key={index}
                  setFreeMealTypes={setFreeMealTypes}
                  freeMealTypes={freeMealTypes}
                  limitType={limitType}
                  setLimitType={setLimitType}
                  limitTypeMultiple={limitTypeMultiple}
                  setLimitTypeMultiple={setLimitTypeMultiple}
                  minDishValue={minDishValue}
                  setMinDishValue={setMinDishValue}
                  maxDishValue={maxDishValue}
                  setMaxDishValue={setMaxDishValue}
                  minDishValueMultiple={minDishValueMultiple}
                  setMinDishValueMultiple={setMinDishValueMultiple}
                  maxDishValueMultiple={maxDishValueMultiple}
                  setMaxDishValueMultiple={setMaxDishValueMultiple}
                  setSingleOfferType={setSingleOfferType}
                  singleOfferType={singleOfferType}
                  singleMenuItem={singleMenuItem}
                  setSingleMenuItem={setSingleMenuItem}
                  setMultipleMenuItem={setMultipleMenuItem}
                  setBogoMenuItem={setBogoMenuItem}
                  page={page}
                  setPage={setPage}
                  menuItems={getAllItemWithCategory}
                  setGetSearchInput={setGetSearchInput}
                  getSearchInput={getSearchInput}
                  selectedRestarauntId={selectedRestarauntId}
                  removeReward={removeReward}
                  isLoading={itemsLoading}
                />
              ))}
              {/* add more reward card button */}
              <div className="mt-5">
                <span
                  onClick={addReward}
                  className="bg-[#42C2FF] px-5 py-1 cursor-pointer rounded text-white text-4xl"
                >
                  +
                </span>
              </div>

              {/* conditions */}
              <div>
                <RewardsCondition
                  setIsDeliverySelected={setIsDeliverySelected}
                  setIsPickupSelected={setIsPickupSelected}
                  setIsDineInSelected={setIsDineInSelected}
                  isDineInSelected={isDineInSelected}
                  isDeliverySelected={isDeliverySelected}
                  isPickupSelected={isPickupSelected}
                  renderAdditionalComponents={renderAdditionalComponents}
                  setSelectedAdditionalCondition={
                    setSelectedAdditionalCondition
                  }
                  selectedAdditionalCondition={selectedAdditionalCondition}
                  itemInCartOrTimeOfDay={itemInCartOrTimeOfDay}
                  setItemInCartOrTimeOfDay={setItemInCartOrTimeOfDay}
                  timeOfDayStartTime={timeOfDayStartTime}
                  setTimeOfDayStartTime={setTimeOfDayStartTime}
                  timeOfDayEndTime={timeOfDayEndTime}
                  setTimeOfDayEndTime={setTimeOfDayEndTime}
                  setAdditionalItems={setAdditionalItems}
                  menuItems={getAllItemWithCategory}
                  page={page}
                  setPage={setPage}
                  setGetSearchInput={setGetSearchInput}
                />
              </div>
              {/* validity */}
              <div>
                <RewardValidity
                  isEditing={isEditing}
                  validitySelection={validitySelection}
                  setValiditySelection={setValiditySelection}
                  validitySelectionValue={validitySelectionValue}
                  setValiditySelectionValue={setValiditySelectionValue}
                  setValidityDaySelection={setValidityDaySelection}
                />
              </div>
              {/* =================== */}
              {/* save button */}
              <div className="modal-action">
                <label htmlFor="add_category_modal">
                  <button
                    name="save"
                    className="bg-[#42C2FF] text-white px-4 py-2 rounded-lg mt-2"
                    type="submit"
                  >
                    {isEditing ? "Save changes" : "+ Add New Reward"}
                  </button>
                </label>
              </div>
            </div>
          </form>
        </div>
        <label
          className="modal-backdrop"
          htmlFor={
            isEditing
              ? `add_reward_modal_${rewardsDetails.id}`
              : "add_reward_modal_"
          }
        >
          Close
        </label>
      </div>
    </>
  );
};

export default AddCategoryModal;
