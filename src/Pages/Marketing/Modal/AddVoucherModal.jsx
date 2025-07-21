import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import voucherImg from "../../../assets/campaign/voucher.png";
import {
  useGetRewardsGroupWithoutPaginationQuery,
  useGetRewardsListQuery,
} from "../../../redux/features/Rewards/rewardsApi";
import {
  useAddVoucherMutation,
  useUpdateVoucherMutation,
} from "../../../redux/features/Voucher/voucherApi";
import { selectedVoucher } from "../../../redux/features/Voucher/voucherSlice";
import {
  useGetLocationsQuery,
  useGetRestaurentsQuery,
} from "../../../redux/features/menuCreation/menuCreationApi";
import MultipleVoucherSelectCampaign from "../../Menus/AddEditMenus/Modal/MultipleVoucherSelectCampaign";

const AddVoucherModal = ({
  isEditing,
  voucherDetails,
  addVoucher,
  setAddVoucher,
}) => {
  // // console.log("Voucher Details: ", voucherDetails);
  const extractDate = (isoString) => {
    const dateObject = new Date(isoString);
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };

    const dayMonthYearArray = dateObject
      .toLocaleDateString(undefined, options)
      .split("/");
    const formattedDate = `${dayMonthYearArray[2]}-${dayMonthYearArray[0]}-${dayMonthYearArray[1]}`;

    return formattedDate;
  };

  const [voucherName, setVoucherName] = useState("");
  const [availableTo, setAvailableTo] = useState("");
  // // console.log("🚀 ~ availableTo:", availableTo);
  const [voucherCode, setVoucherCode] = useState("");
  const [selectedRestaurants, setSelectedRestaurants] = useState("");
  const [selectedLocations, setSelectedLocations] = useState("");
  const [selectedRestaurantId, setSelectedRestaurantId] = useState();
  const [selectedOption, setSelectedOption] = useState("");
  const [dateRanges, setDateRanges] = useState([
    { start_date: "", end_date: "" },
  ]);
  const [percentage, setPercentage] = useState(0);
  const [minimumSpend, setMinimumSpend] = useState(0);
  const [maximumRedeemValue, setMaximumRedeemValue] = useState(0);
  const [getReward, setGetReward] = useState();
  // console.log("🚀 ~ getReward:", getReward);
  const [getItems, setGetItems] = useState([]);
  // // console.log("🚀 ~ getReward============:",  getReward);
  const [getSearchInput, setGetSearchInput] = useState("");
  const [page, setPage] = useState(1);

  const dispatch = useDispatch();

  useEffect(() => {
    setPage(1);
  }, [selectedRestaurantId]);

  // Helper function to format date strings to YYYY-MM-DD
  const formatDateString = (dateString) => {
    return new Date(dateString).toISOString().split("T")[0];
  };

  useEffect(() => {
    if (isEditing) {
      // console.log("Editing voucher:", voucherDetails);
      setVoucherName(voucherDetails?.name || "");
      setVoucherCode(voucherDetails?.voucher_code || "");
      setSelectedRestaurantId(voucherDetails?.restaurant || "");
      setSelectedLocations(voucherDetails?.location || "");
      setSelectedOption(voucherDetails?.audience || "");
      setDateRanges(
        voucherDetails.durations.map((duration) => ({
          start_date: formatDateString(duration.start_date),
          end_date: formatDateString(duration.end_date),
        }))
      );
      setPercentage(voucherDetails?.amount || "");
      setMinimumSpend(voucherDetails?.minimum_spend || "");
      setMaximumRedeemValue(voucherDetails?.max_redeem_value || "");
      setAvailableTo(voucherDetails?.available_to || "all");
    } else {
      setVoucherName("");
      setVoucherCode("");
      setSelectedRestaurants("");
      setSelectedLocations("");
      setSelectedOption("");
      setDateRanges([{ start_date: "", end_date: "" }]);
      setPercentage("");
      setMinimumSpend("");
      setMaximumRedeemValue("");
      setAvailableTo("all");
    }
  }, [isEditing, voucherDetails]);

  const handlePercentageChange = (e) => {
    setPercentage(e.target.value);
  };

  const handleMinimumSpendChange = (e) => {
    setMinimumSpend(e.target.value);
  };

  const handleMaximumRedeemValueChange = (e) => {
    setMaximumRedeemValue(e.target.value);
  };

  const handleAddMore = (e) => {
    e.preventDefault();
    setDateRanges([...dateRanges, { start_date: "", end_date: "" }]);
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value); // Update the selected option when a radio button is clicked
  };

  const handleDateChange = (index, field, value) => {
    setDateRanges((prevDateRanges) => {
      const updatedDateRanges = [...prevDateRanges];
      updatedDateRanges[index] = {
        ...updatedDateRanges[index], // Spread to avoid mutation
        [field]: value, // Update the field
      };
      return updatedDateRanges;
    });
  };

  const handleRemove = (index) => {
    setDateRanges((prevDateRanges) => {
      return prevDateRanges.filter((_, i) => i !== index); // Return a new array without the item at `index`
    });
  };

  const {
    data: restaurantList,
    isLoading: isRestaurantLoading,
    isError: isRestaurantError,
    error: restaurantError,
  } = useGetRestaurentsQuery();

  const { data: rewardData } = useGetRewardsListQuery({
    page,
    restaurantId: selectedRestaurantId,
  });

  // console.log("rewardData----------", rewardData?.results);
  // // console.log("restaurant----------", selectedRestaurantId);

  const handleRestaurantChange = (e) => {
    const selectedId = e.target.value;
    setSelectedRestaurants([...selectedRestaurants, selectedId]);

    // Update the selected restaurant ID
    setSelectedRestaurantId(selectedId);
  };

  const { data: locationList, isSuccess: isLocationSuccess } =
    useGetLocationsQuery(selectedRestaurantId);

  const { data: rewardDataWithoutPagination, isLoading: isRewardsLoading } =
    useGetRewardsGroupWithoutPaginationQuery();
  // console.log("🚀 ~ rewardDataWithoutPagination:", rewardDataWithoutPagination);s
  const [createVoucher, { isSuccess, isError }] = useAddVoucherMutation();
  const handleLocationChange = (e) => {
    const selectedLocationId = e.target.value;
    setSelectedLocations(selectedLocationId);
  };
  const [
    updateVoucherData,
    {
      isSuccess: isUpdateVoucherSuccess,
      isLoading: isUpdateVoucherLoading,
      isError: isUpdateVoucherError,
    },
  ] = useUpdateVoucherMutation();

  useEffect(() => {
    if (rewardDataWithoutPagination) {
      setGetItems(
        rewardDataWithoutPagination.filter((item) =>
          item?.name?.toLowerCase().includes(getSearchInput.toLowerCase())
        )
      );
    }
  }, [rewardDataWithoutPagination]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!voucherName) {
      toast.error("Please enter voucher name");
      return;
    }
    if (!voucherCode) {
      toast.error("Please enter voucher code");
      return;
    }
    if (!selectedRestaurantId) {
      toast.error("Please select restaurant");
      return;
    }
    if (!selectedLocations) {
      toast.error("Please select location");
      return;
    }
    // if (!percentage) {
    //   toast.error("Please select amount");
    //   return;
    // }
    // if (!minimumSpend) {
    //   toast.error("Please select minimum spend");
    //   return;
    // }
    // if (!maximumRedeemValue) {
    //   toast.error("Please select maximum redeem value");
    //   return;
    // }
    if (!selectedOption) {
      toast.error("Please select audience");
      return;
    }
    // if (!dateRanges[0].start_date) {
    //   toast.error("Please select start date");
    //   return;
    // }
    // if (!dateRanges[0].end_date) {
    //   toast.error("Please select end date");
    //   return;
    // }

    const voucherData = {
      name: voucherName,
      voucher_code: voucherCode,
      restaurant: parseInt(selectedRestaurantId),
      location: parseInt(selectedLocations),
      available_to: availableTo,
      audience: selectedOption,
      durations: dateRanges,
      reward: getReward,
      ...(percentage && { amount: parseInt(percentage) }),
      ...(minimumSpend && { minimum_spend: parseInt(minimumSpend) }),
      ...(maximumRedeemValue && {
        max_redeem_value: parseInt(maximumRedeemValue),
      }),
    };

    // Log the voucher data to the console
    // // console.log("Voucher Data:", voucherData);

    if (isEditing) {
      updateVoucherData({
        id: voucherDetails.id,
        voucherItem: voucherData,
      });
    } else {
      createVoucher(voucherData);
    }
    // createVoucher(voucherData);
    // setAddVoucher(false);
    // toast.success("Voucher Created Successfully");
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(selectedVoucher({ isEditing: false, selectedVoucherData: {} }));
      setAddVoucher(false);
      toast.success("Voucher Created Successfully");
    }
    if (isError) {
      toast.error("Something went wrong");
    }
    if (isUpdateVoucherSuccess) {
      dispatch(selectedVoucher({ isEditing: false, selectedVoucherData: {} }));
      setAddVoucher(false);
      toast.success("Voucher Updated Successfully");
    }
    if (isUpdateVoucherError) {
      toast.error("Something went wrong");
    }
  }, [isSuccess, isError, isUpdateVoucherSuccess, isUpdateVoucherError]);

  return (
    <>
      <input
        type="checkbox"
        id={isEditing ? `add_voucher_${voucherDetails.id}` : "add_voucher_"}
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box w-11/12 max-w-2xl">
          <h1 className="text-2xl mb-6 font-bold font-sans">
            {isEditing ? "Edit" : "Add A"} Voucher
          </h1>
          <div className="flex justify-between gap-4">
            <div className="w-[50%]">
              <form onSubmit={handleSubmit}>
                <h1 className="font-bold mb-2">Voucher Name</h1>
                <label>
                  <span className="mb-1">Set a Name for your Voucher.</span>
                  <input
                    value={voucherName}
                    onChange={(e) => setVoucherName(e.target.value)}
                    type="text"
                    className="border border-[#DDE1E6] rounded-lg w-full p-2"
                  />
                </label>

                <h1 className="my-4 font-bold">Restaurant</h1>
                <label>
                  <span className="mb-1">
                    Select the restaurant and it’s location this offer.
                  </span>
                  <select
                    onChange={handleRestaurantChange}
                    name="restaurant"
                    id=""
                    className="border border-[#DDE1E6] rounded-lg w-full p-2"
                  >
                    <option selected>Select Restaurant</option>
                    {restaurantList?.results?.map((item, index) => (
                      <option
                        key={index}
                        value={item.id}
                        selected={voucherDetails?.restaurant === item.id}
                      >
                        {item.name}
                      </option>
                    ))}
                  </select>
                  <select
                    onChange={handleLocationChange}
                    name="location"
                    id=""
                    className="border border-[#DDE1E6] rounded-lg w-full p-2 mt-2"
                  >
                    <option selected>Select Location</option>
                    {locationList?.results?.map((item, index) => (
                      <option
                        key={index}
                        value={item.id}
                        selected={voucherDetails?.location === item.id}
                      >
                        {item.name}
                      </option>
                    ))}
                  </select>
                </label>

                <h1 className="my-4 font-bold">Available To</h1>
                <label>
                  <select
                    onChange={(e) => setAvailableTo(e.target.value)}
                    name="available_to"
                    value={availableTo}
                    id="available_to"
                    className="border border-[#DDE1E6] rounded-lg w-full p-2"
                  >
                    <option selected value="all">
                      All
                    </option>
                    <option value="members">Members</option>
                    <option value="first_order">First Order</option>
                    <option value="second_order">Second Order</option>
                    <option value="third_order">Third Order</option>
                  </select>
                </label>
                <h1 className="my-4 font-bold">Amount</h1>
                <div className="flex items-center">
                  <input
                    placeholder="Select percentage amount"
                    name="percentage"
                    id="percentage"
                    className="border border-[#DDE1E6] rounded-lg w-full p-2"
                    onChange={handlePercentageChange}
                    value={percentage}
                  />
                  <span>%</span>
                </div>
                <h1 className="my-4 font-bold">Minimum Spend</h1>
                <label>
                  <input
                    placeholder="Select minimum spend value"
                    name="minimumSpend"
                    id="minimumSpend"
                    className="border border-[#DDE1E6] rounded-lg w-full p-2"
                    onChange={handleMinimumSpendChange}
                    value={minimumSpend}
                  />
                </label>
                <h1 className="my-4 font-bold">
                  Maximum redeem value (optional)
                </h1>
                <label>
                  <input
                    name="maximumRedeemValue"
                    id="maximumRedeemValue"
                    placeholder="Select maximum redeem value"
                    className="border border-[#DDE1E6] rounded-lg w-full p-2"
                    onChange={handleMaximumRedeemValueChange}
                    value={maximumRedeemValue}
                  />
                </label>

                <div className="mt-3">
                  <label className="font-bold" htmlFor="select-reward">
                    Select Reward
                  </label>
                  <MultipleVoucherSelectCampaign
                    loadItems={getItems}
                    setPromotion={setGetReward}
                    getSearchInput={getSearchInput}
                    setGetSearchInput={setGetSearchInput}
                    voucherDetails={voucherDetails}
                    isLoading={isRewardsLoading}
                  />
                </div>

                <h1 className="my-4 font-bold">Audience</h1>
                <label>
                  <span className="">
                    Select which customers will see your offer.
                  </span>
                  <div className="flex items-center mb-4">
                    <input
                      id="default-radio-1"
                      type="radio"
                      value="all"
                      name="default-radio"
                      className="w-4 h-4 text-[#42C2FF]"
                      onChange={handleOptionChange}
                      checked={selectedOption === "all"}
                    />
                    <label
                      htmlFor="default-radio-1"
                      className="ml-2 font-medium"
                    >
                      All customers
                    </label>
                  </div>

                  <div className="flex items-center">
                    <input
                      id="default-radio-2"
                      type="radio"
                      value="members"
                      name="default-radio"
                      className="w-4 h-4 text-[#42C2FF]"
                      onChange={handleOptionChange}
                      checked={selectedOption === "members"}
                    />
                    <label
                      htmlFor="default-radio-2"
                      className="ml-2 font-medium"
                    >
                      Members Only
                    </label>
                  </div>
                </label>
                <h1 className="my-4 font-bold">Duration</h1>
                <label>
                  <span>Select the dates your offer will run for.</span>
                  {dateRanges.map((dateRange, index) => (
                    <div className="flex items-center" key={index}>
                      <input
                        type="date"
                        className="border border-[#DDE1E6] rounded-lg w-full p-2 mt-2 mr-4"
                        value={dateRange.start_date}
                        onChange={(e) =>
                          handleDateChange(index, "start_date", e.target.value)
                        }
                      />
                      <input
                        type="date"
                        className={`border border-[#DDE1E6] rounded-lg w-full p-2 mt-2 ${
                          dateRange.end_date === "2099-12-31"
                            ? "bg-gray-200"
                            : ""
                        }`}
                        value={
                          dateRange.end_date === "2099-12-31"
                            ? "2099-12-31"
                            : dateRange.end_date
                        }
                        disabled={dateRange.end_date === "2099-12-31"}
                        onChange={(e) =>
                          handleDateChange(index, "end_date", e.target.value)
                        }
                      />
                      {/* unlimited date set */}
                      <div className="flex items-center mt-2 ml-4 static z-[100000]">
                        <input
                          className="cursor-pointer"
                          type="checkbox"
                          checked={dateRange.end_date === "2099-12-31"} // Check if end_date is set to '2099-12-31'
                          onChange={(e) => {
                            const isUnlimited = e.target.checked;
                            const today = new Date()
                              .toISOString()
                              .split("T")[0]; // Get today's date in 'YYYY-MM-DD' format

                            // Update both start_date and end_date if the checkbox is checked
                            handleDateChange(
                              index,
                              "end_date",
                              isUnlimited ? "2099-12-31" : ""
                            );

                            // Auto-set start_date to today if it is empty and "Unlimited" is selected
                            if (isUnlimited && !dateRange.start_date) {
                              handleDateChange(index, "start_date", today);
                            }
                          }}
                        />
                        <label className="ml-2">Unlimited</label>
                      </div>
                    </div>
                  ))}

                  <button
                    onClick={handleAddMore}
                    className="bg-[#42C2FF] text-white px-4 py-2 rounded-lg mt-4 flex items-center gap-2"
                  >
                    + Add More
                  </button>
                </label>
                <button
                  type="submit"
                  className={`bg-[#42C2FF] text-white px-4 py-2 rounded-lg mt-4 flex items-center gap-2`}
                >
                  {isEditing ? "Save changes" : "+ Add New Voucher"}
                </button>
              </form>
            </div>
            <div className="w-[50%]">
              <h1 className="font-bold mb-2">Offer Preview</h1>
              <div className="relative">
                <img
                  src={voucherImg}
                  alt=""
                  className="w-80 h-41 object-cover rounded relative"
                />
                <p className=" absolute top-0 left-1 text-white capitalize -mt-[2px] tracking-tighter">
                  {voucherName}
                </p>
                <p className=" absolute right-1 bottom-0 text-white tracking-tighter">
                  Use Code {percentage}% Off
                </p>
              </div>

              <h1 className="font-bold mb-2">Voucher Code</h1>
              <label>
                <span className="mb-1">Set a Name for your Voucher Code.</span>
                <input
                  value={voucherCode}
                  onChange={(e) => setVoucherCode(e.target.value)}
                  type="text"
                  className="border border-[#DDE1E6] rounded-lg w-full p-2"
                />
              </label>
            </div>
          </div>
        </div>
        <label
          onClick={() => {
            // setShowAddNewPromotionModal(false);
            dispatch(
              selectedVoucher({
                isEditing: false,
                selectedVoucherData: {},
              })
            );
          }}
          className="modal-backdrop"
          htmlFor={
            isEditing ? `add_voucher_${voucherDetails.id}` : "add_voucher_"
          }
        >
          Close
        </label>
      </div>
    </>
  );
};

export default AddVoucherModal;
