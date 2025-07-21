import React, { useEffect, useState } from "react";
import { MdAdd } from "react-icons/md";
import Loading from "../../../Components/Loading";
import {
  useGetAllItemsQuery,
  useGetItemsWithoutPaginationQuery,
} from "../../../redux/features/itemCreation/itemCreationApi";
import {
  useGetLocationsQuery,
  useGetRestaurentsQuery,
} from "../../../redux/features/menuCreation/menuCreationApi";
import { useUpdateRewardGroupMutation } from "../../../redux/features/Rewards/rewardsApi";
import RewardAdditionalCondition from "./components/RewardAdditionalCondition/RewardAdditionalCondition";
import RewardBasic from "./components/rewardBasic/RewardBasic";
import RewardCondition from "./components/RewardCondition/RewardCondition";
import RewardSet from "./components/RewardSet/RewardSet";
import Validity from "./components/validity/Validity";

const EditRewardsModal = ({ rewardIdData }) => {
  const [additionalItems, setAdditionalItems] = useState([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [getSearchInput, setGetSearchInput] = useState("");
  const [rewards, setRewards] = useState([]);
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
  // conditions
  const [isDeliverySelected, setIsDeliverySelected] = useState(true);
  const [isPickupSelected, setIsPickupSelected] = useState(true);
  const [isDineInSelected, setIsDineInSelected] = useState(false);

  // selected items
  const [singleMenuItem, setSingleMenuItem] = useState([]);
  // console.log('🚀 ~ EditRewardsModal ~ singleMenuItem:', singleMenuItem);
  const [multipleMenuItem, setMultipleMenuItem] = useState([]);
  const [bogoMenuItem, setBogoMenuItem] = useState([]);
  const [page, setPage] = useState(1);
  // console.log(bogoMenuItem, "bogoMenuItem");
  const [formData, setFormData] = useState({
    // Reward Basic Fields
    name: "",
    description: "",
    restaurant: 0,
    location: 0,
    // Reward Set will be here

    // Reward Condition
    applies_for: [],
    additionalcondition_set: [
      {
        condition_type: "",
        amount: 0,
        start_time: null,
        end_time: null,
        items: [],
      },
    ],
    // Validity types
    validity_type: "",
    validity_days: 0,
    validity_date: "",
  });

  // console.log('🚀 ~ EditRewardsModal ~ rewardIdData:', rewardIdData);
  // console.log('🚀 ~ EditRewardsModal ~ additionalItems:', additionalItems);
  // console.log('🚀 ~ EditRewardsModal ~ formData:', formData);
  // console.log('🚀 ~ rewardsssssssssssssssss:', rewards);

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

  // Get restaurant details query
  const { data: restaurantList } = useGetRestaurentsQuery();

  // Get all location list based on selected restaurant
  const { data: locationList, isLoading: isLocationLoading } =
    useGetLocationsQuery(formData?.restaurant);
  // get all menus list
  const { data: menuItems, isLoading: menuLoading } = useGetAllItemsQuery({
    page,
    restaurantId: formData?.restaurant,
    searchInputValue: getSearchInput,
    locationId: formData?.location,
  });
  const {
    data: getAllItemsData,
    isLoading: itemsLoading,
    refetch,
  } = useGetItemsWithoutPaginationQuery({
    restaurantId: formData?.restaurant,
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

  // update reward group mutation
  const [updateRewardGroup] = useUpdateRewardGroupMutation();

  useEffect(() => {
    if (rewardIdData) {
      setFormData((prevData) => ({
        // Store Previous Data
        ...prevData,
        // Reward Basic Fields
        name: rewardIdData?.name || 0,
        description: rewardIdData?.description || 0,
        restaurant: rewardIdData?.restaurant || 0,
        location: parseInt(rewardIdData?.location) || 0,
        // Reward Set will be there
        // Reward Condition - // payment method
        applies_for: rewardIdData?.applies_for || [],
        // Additional Reward Condition
        additionalcondition_set: rewardIdData?.additionalcondition_set,
        // Validity types
        validity_type: rewardIdData?.validity_type,
        validity_days: rewardIdData?.validity_days,
        validity_date: rewardIdData?.validity_date,
      }));
      // set default reward-set
      // setRewards([
      //   {
      //     rewardType: "",
      //     reward_points_worth: "",
      //     offerTypeForSingleAndMultipleDishes: "",
      //     offerTypeValueForSingleAndMultipleDishes: "",
      //     limitTypeMultiple: "",
      //     minDishValueMultiple: "",
      //     maxDishValueMultiple: "",
      //     maxDishValue: "",
      //     isFreeDelivery: "",
      //     selectedRestarauntId: "",
      //   },
      // ]);
      // Assuming rewardIdData?.reward_set is an array of objects
      const mappedRewards = rewardIdData?.reward_set?.map((data) => ({
        rewardType: data?.reward_type,
        reward_points_worth: data?.reward_points_worth || "",
        offerTypeForSingleAndMultipleDishes: data?.offer_type || "",
        offerTypeValueForSingleAndMultipleDishes: data?.amount || "",
        limitTypeMultiple: data?.limit_type || "",
        minDishValueMultiple: data?.min_dishes || "",
        maxDishValueMultiple: data?.max_dishes || "",
        maxDishValue: data?.max_dishes || "",
        // isFreeDelivery: data?.is_free_delivery || '',
        selectedRestarauntId: data?.restaurant || "",
        bogoType: data?.bogo_type || "",
        items: data?.items || [],
        items_name: data?.item_names || "",
        loyalty_point: data?.reward_points_worth || 0,
        isFreeDelivery: data?.is_free_delivery || 0,
      }));

      // Set the rewards state with the mapped array
      setRewards(mappedRewards);
    }
  }, [rewardIdData]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // reward condition fields
  const handleCheckboxChange = (value) => {
    setFormData((prevData) => {
      const updatedAppliesFor = prevData.applies_for.includes(value)
        ? prevData.applies_for.filter((item) => item !== value)
        : [...prevData.applies_for, value];

      return {
        ...prevData,
        applies_for: updatedAppliesFor,
      };
    });
  };

  // Get additional items for additional condition
  const handleSelectChange = (e) => {
    const { value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      additionalcondition_set: prevData.additionalcondition_set.map(
        (condition, index) =>
          index === 0
            ? {
                ...condition,
                condition_type: value,
                amount: value === "minimum_amount" ? condition.amount : 0,
                start_time:
                  value === "time_of_day" ? condition.start_time : null,
                end_time: value === "time_of_day" ? condition.end_time : null,
                items: [],
              }
            : condition
      ),
    }));
  };

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      additionalcondition_set: prevData.additionalcondition_set.map(
        (condition, index) =>
          index === 0 && condition.condition_type === "specific_item_in_cart"
            ? {
                ...condition,
                items: additionalItems,
              }
            : condition
      ),
    }));
  }, [additionalItems, setFormData]);

  const handleConditionChange = (field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      additionalcondition_set: prevData.additionalcondition_set?.map(
        (condition, index) =>
          index === 0
            ? {
                ...condition,
                [field]: value,
              }
            : condition
      ),
    }));
  };

  // handle reward set changes
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

  // const checkIfItem = (item1 = [], item2 = []) => {
  //   // console.log("singleMenuItem", item1);
  //   // console.log("singleMenuItem2", item2);
  //   if (item1?.length > 0) {
  //     return item1;
  //   } else {
  //     return item2;
  //   }
  // };

  const handleEditReward = async (e) => {
    e.preventDefault();
    const formattedData = {
      reward_set:
        rewards?.map((reward) => ({
          reward_type: reward?.rewardType,
          reward_points_worth:
            reward?.rewardType === "reward_point"
              ? reward?.reward_points_worth
              : 0,
          offer_type: reward?.offerTypeForSingleAndMultipleDishes,
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
          restaurant: formData?.restaurant,
          items:
            reward?.rewardType === "single_dish"
              ? Array.isArray(singleMenuItem) && singleMenuItem.length === 0
                ? reward?.items
                : Array.isArray(singleMenuItem)
                ? singleMenuItem
                : [singleMenuItem]
              : reward?.rewardType === "multiple_dish"
              ? Array.isArray(multipleMenuItem) && multipleMenuItem.length === 0
                ? reward?.items
                : Array.isArray(multipleMenuItem)
                ? multipleMenuItem
                : [multipleMenuItem]
              : reward?.rewardType === "bogo"
              ? Array.isArray(bogoMenuItem) && bogoMenuItem.length === 0
                ? reward?.items
                : Array.isArray(bogoMenuItem)
                ? bogoMenuItem
                : [bogoMenuItem]
              : reward?.items || [],

          // categories: [],
          // delivery_discount: 50,
        })) || [],
      additionalcondition_set: formData?.additionalcondition_set,
      name: formData?.name,
      description: formData?.description,
      applies_for: formData?.applies_for,
      validity_type: formData?.validity_type,
      validity_days: formData?.validity_days,
      validity_date: formData?.validity_date,
      restaurant: formData?.restaurant,
      location: parseInt(formData?.location),
    };

    // console.log("formattedData:", formattedData);

    try {
      const response = await updateRewardGroup({
        id: rewardIdData?.id,
        rewardsItem: formattedData,
      }).unwrap();
      // // console.log(response, "responseeeeeeeeeeeeeee");
      document.getElementById("my_modal_25").close();
      // Handle success
      toast.success("Reward updated successfully!");
    } catch (error) {
      // Handle errors
      if (error.data) {
        toast.error(`Failed to edit reward: ${error.data.detail}`);
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <dialog id="my_modal_25" className="modal">
      {itemsLoading ? (
        <Loading />
      ) : (
        <>
          <div className="modal-box">
            <h1 className="text-2xl mb-6 font-bold font-sans">Edit Reward</h1>
            <form onSubmit={handleEditReward}>
              {/* Reward Basic Input field  */}
              <RewardBasic
                formData={formData}
                handleInputChange={handleInputChange}
                restaurantList={restaurantList}
                locationList={locationList}
                isLocationLoading={isLocationLoading}
              />

              {/* reward-set functionality  */}
              {rewards.map((reward, index) => (
                <RewardSet
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
                  selectedRestarauntId={formData?.restaurant}
                  removeReward={removeReward}
                />
              ))}
              {/* add more reward card button */}
              <div className="mt-5">
                <span
                  onClick={addReward}
                  className="bg-[#42C2FF] p-2 cursor-pointer rounded text-white inline-block"
                >
                  <MdAdd size={26} />
                </span>
              </div>
              {/* Reward condition input field  */}
              <RewardCondition
                formData={formData}
                handleCheckboxChange={handleCheckboxChange}
              />

              {/* Additional Reward Condition Field  */}
              <RewardAdditionalCondition
                page={page}
                setPage={setPage}
                loadItems={getAllItemWithCategory}
                setPromotion={setAdditionalItems}
                setGetSearchInput={setGetSearchInput}
                selectedOption={selectedOption}
                setSelectedOption={setSelectedOption}
                handleSelectChange={handleSelectChange}
                formData={formData}
                handleConditionChange={handleConditionChange}
              />

              {/* Validity option input field  */}
              <Validity
                formData={formData}
                handleInputChange={handleInputChange}
              />
              {/* Save button */}
              <div className="mt-4">
                <button
                  type="submit"
                  className="bg-[#42C2FF] text-white px-4 py-2 rounded-lg"
                >
                  Save changes
                </button>
              </div>
            </form>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </>
      )}
    </dialog>
  );
};

export default EditRewardsModal;
