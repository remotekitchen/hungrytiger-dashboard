import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import spendXsaveY from "../../../assets/campaign/spendXsaveY.png";
import {
  useAddSpendXSaveYMutation,
  useGetSpendXSaveYPromoOptionsQuery,
  useUpdateSpendXSaveYMutation,
} from "../../../redux/features/SpendXSaveY/spendxsaveyApi";
import { selectedSpendXSaveY } from "../../../redux/features/SpendXSaveY/spendxsaveySlice";
import {
  useGetLocationsQuery,
  useGetRestaurentsQuery,
} from "../../../redux/features/menuCreation/menuCreationApi";

const AddNewPromotionModal = ({
  setAddNewPromotionModal,
  isEditing,
  spendXSaveYDetails,
}) => {
  // State to manage spend and save fields dynamically
  const [spendSaveFields, setSpendSaveFields] = useState([
    { spend: 0, save: 0 },
  ]);
  // console.log("spendXSaveYDetails", spendXSaveYDetails);

  // Function to add more spend and save fields
  const handleAddMoreSpendSave = () => {
    setSpendSaveFields([...spendSaveFields, { spend: "", save: "" }]);
  };

  // Function to handle changes in spend and save fields
  const handleSpendSaveChange = (index, field, value) => {
    const updatedSpendSaveFields = [...spendSaveFields];
    updatedSpendSaveFields[index][field] = value;
    setSpendSaveFields(updatedSpendSaveFields);
  };

  // Function to remove spend and save fields
  const handleRemoveSpendSave = (index) => {
    const updatedSpendSaveFields = [...spendSaveFields];
    updatedSpendSaveFields.splice(index, 1);
    setSpendSaveFields(updatedSpendSaveFields);
  };

  const [discountType, setDiscountType] = useState("flat");

  const handleDiscountTypeChange = (event) => {
    setDiscountType(event.target.value);
  };

  const [promotion, setPromotion] = useState("");
  const [selectedRestaurants, setSelectedRestaurants] = useState("");
  const [selectedLocations, setSelectedLocations] = useState("");
  const [selectedRestaurantId, setSelectedRestaurantId] = useState();
  const [promotionName, setPromotionName] = useState("");
  const [selectedOption, setSelectedOption] = useState(""); // State to track the selected option
  const [isChecked, setIsChecked] = useState(false);
  const [dateRanges, setDateRanges] = useState([
    { start_date: "", end_date: "" },
  ]);

  useEffect(() => {
    // Reset form fields when switching between "Add" and "Edit" modes
    if (isEditing) {
      setPromotionName(spendXSaveYDetails?.name || "");
      setSelectedRestaurantId(spendXSaveYDetails?.restaurant || "");
      setSelectedLocations(spendXSaveYDetails?.location || "");
      setPromotion(spendXSaveYDetails?.promo_option || "");
      setDateRanges(
        spendXSaveYDetails.durations.map((duration) => ({
          start_date: duration.start_date.split("T")[0],
          end_date: duration.end_date.split("T")[0],
        }))
      );
      setSpendSaveFields(
        spendXSaveYDetails?.spendxsavey_set?.map((p) => ({
          spend: p?.min_spend,
          save: p?.save_amount,
        }))
      );
      setSelectedOption(spendXSaveYDetails?.audience || "");
      setIsChecked(true);
    } else {
      setPromotionName("");
      setSelectedRestaurants("");
      setSelectedLocations("");
      setPromotion("");
      setDateRanges([{ start_date: "", end_date: "" }]);
      setSpendSaveFields([{ spend: 0, save: 0 }]);
      setSelectedOption("");
      setIsChecked(false);
    }
  }, [isEditing, spendXSaveYDetails]);

  const handleAddMore = (e) => {
    e.preventDefault();
    setDateRanges([...dateRanges, { start_date: "", end_date: "" }]);
  };

  const handleDateChange = (index, field, value) => {
    const updatedDateRanges = [...dateRanges];
    updatedDateRanges[index][field] = value;
    setDateRanges(updatedDateRanges);
  };
  const handleRemove = (index) => {
    const updatedDateRanges = [...dateRanges];
    updatedDateRanges.splice(index, 1);
    setDateRanges(updatedDateRanges);
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value); // Update the selected option when a radio button is clicked
  };

  const { data: spendxsaveyPromoOption } = useGetSpendXSaveYPromoOptionsQuery();

  const [createSpendXSaveY, { isSuccess, isError }] =
    useAddSpendXSaveYMutation();
  const [
    updateSpendXSaveY,
    {
      isLoading: spendxsaveyUpdateLoading,
      isError: spendxsaveyUpdateError,
      isSuccess: spendxsaveyUpdateSuccess,
    },
  ] = useUpdateSpendXSaveYMutation();

  const dispatch = useDispatch();

  const {
    data: restaurantList,
    isLoading: isRestaurantLoading,
    isError: isRestaurantError,
    error: restaurantError,
  } = useGetRestaurentsQuery();

  const handleRestaurantChange = (e) => {
    const selectedId = e.target.value;
    setSelectedRestaurants([...selectedRestaurants, selectedId]);

    // Update the selected restaurant ID
    setSelectedRestaurantId(selectedId);
  };

  const { data: locationList, isSuccess: isLocationSuccess } =
    useGetLocationsQuery(selectedRestaurantId);

  const handleLocationChange = (e) => {
    const selectedLocationId = e.target.value;
    setSelectedLocations(selectedLocationId);
  };

  const handlePromotion = (e) => {
    const selectedPromotionId = e.target.value;
    setPromotion(selectedPromotionId);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!promotionName) {
      toast.error("Please enter promotion name");
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
    // if (!promotion) {
    //   toast.error("Please select promotion");
    //   return;
    // }
    if (!selectedOption) {
      toast.error("Please select audience");
      return;
    }
    if (!dateRanges[0].start_date) {
      toast.error("Please select start date");
      return;
    }
    if (!dateRanges[0].end_date) {
      toast.error("Please select end date");
      return;
    }

    const spendxsaveyData = {
      name: promotionName,
      restaurant: Number(selectedRestaurantId),
      location: Number(selectedLocations), // assuming selectedLocations is a single value
      spendxsavey_set: spendSaveFields.map((data) => ({
        durations: dateRanges,
        name: promotionName,
        audience: selectedOption,
        min_spend: Number(data?.spend ?? 0),
        save_amount: Number(data?.save ?? 0),
        restaurant: Number(selectedRestaurantId),
        location: Number(selectedLocations), // assuming selectedLocations is a single value
      })),
      durations: dateRanges,
      audience: selectedOption,
    };

    // // console.log("🚀 ~ handleSubmit ~ spendxsaveyData:", spendxsaveyData);

    if (isEditing) {
      updateSpendXSaveY({
        id: spendXSaveYDetails.id,
        spendxsaveyItem: spendxsaveyData,
      });
    } else {
      createSpendXSaveY(spendxsaveyData);
    }
    // setShowAddNewPromotionModal(false);
    // toast.success("Promotion Created Successfully");
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(
        selectedSpendXSaveY({
          isEditing: false,
          selectedSpendXSaveYData: {},
        })
      );
      toast.success("Promotion Created Successfully");
      setAddNewPromotionModal(false);
    }
    if (isError) {
      toast.error("Something went wrong");
    }
    if (spendxsaveyUpdateSuccess) {
      dispatch(
        selectedSpendXSaveY({
          isEditing: false,
          selectedSpendXSaveYData: {},
        })
      );
      toast.success("Promotion Updated Successfully");
      setAddNewPromotionModal(false);
    }
    if (spendxsaveyUpdateError) {
      toast.error("Something went wrong");
    }
  }, [isSuccess, isError, spendxsaveyUpdateSuccess, spendxsaveyUpdateError]);

  return (
    <>
      <input
        type="checkbox"
        id={
          isEditing
            ? `add_spendxsavey_modal_${spendXSaveYDetails.id}`
            : "add_spendxsavey_modal_"
        }
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box w-11/12 max-w-2xl">
          <h1 className="text-2xl mb-6 font-bold font-sans">
            {isEditing ? "Edit" : "Add A"} Promotion
          </h1>
          <div className="flex justify-between gap-4">
            <div className="w-[80%] border">
              <form onSubmit={handleSubmit}>
                <h1 className="font-bold mb-2">Promotion Name</h1>
                <label>
                  <span className="mb-1">Set a Name for your promotion.</span>
                  <input
                    value={promotionName}
                    onChange={(e) => setPromotionName(e.target.value)}
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
                        selected={spendXSaveYDetails?.restaurant === item.id}
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
                        selected={spendXSaveYDetails?.location === item.id}
                      >
                        {item.name}
                      </option>
                    ))}
                  </select>
                </label>
                <h1 className="my-1 font-bold">Promotion Settings</h1>
                {/* !DO NOT REMOVE THIS LINE  */}
                {/* <div className="flex flex-col">
                  <label className="block text-sm font-medium mb-1">
                    Discount Type
                  </label>
                  <select
                    onChange={handleDiscountTypeChange}
                    value={discountType}
                    className="select select-bordered w-full"
                  >
                    <option value="flat">Flat Discount</option>
                    <option value="percentage">Percentage Discount</option>
                  </select>
                </div> */}
                <label>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Set the Spend Value and Save Value
                    </label>

                    {spendSaveFields.map((field, index) => (
                      <div key={index} className="flex gap-3 mb-3 items-center">
                        <input
                          type="number"
                          placeholder="Spend"
                          value={field.spend}
                          onChange={(e) =>
                            handleSpendSaveChange(
                              index,
                              "spend",
                              e.target.value
                            )
                          }
                          className="input input-bordered w-1/3"
                        />
                        <input
                          type="number"
                          placeholder="Save"
                          value={field.save}
                          onChange={(e) =>
                            handleSpendSaveChange(index, "save", e.target.value)
                          }
                          className="input input-bordered w-1/3"
                        />
                        {discountType === "percentage" && (
                          <input
                            type="number"
                            placeholder="Limit"
                            value={field.limit}
                            onChange={(e) =>
                              handleSpendSaveChange(
                                index,
                                "limit",
                                e.target.value
                              )
                            }
                            className="input input-bordered w-1/3"
                          />
                        )}
                        {index > 0 && ( // Render remove button for additional fields
                          <button
                            type="button"
                            onClick={() => handleRemoveSpendSave(index)}
                            className="btn btn-error btn-sm"
                          >
                            Remove
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  <span
                    onClick={handleAddMoreSpendSave}
                    className="bg-[#42C2FF] text-white px-4 py-2 rounded-lg mt-4"
                  >
                    + Add More options
                  </span>
                </label>
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
                  {dateRanges?.map((dateRange, index) => (
                    <div className="flex" key={index}>
                      <input
                        type="date"
                        className="border border-[#DDE1E6] rounded-lg w-full p-2 mt-2 mr-4"
                        value={dateRange?.start_date}
                        onChange={(e) =>
                          handleDateChange(index, "start_date", e.target.value)
                        }
                      />
                      <input
                        type="date"
                        className="border border-[#DDE1E6] rounded-lg w-full p-2 mt-2"
                        value={dateRange?.end_date}
                        onChange={(e) =>
                          handleDateChange(index, "end_date", e.target.value)
                        }
                      />
                      {index > 0 && ( // Only show Remove button for extra date fields
                        <button
                          type="button"
                          className="text-red-500 ml-2 "
                          onClick={() => handleRemove(index)}
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    onClick={handleAddMore}
                    className="bg-[#42C2FF] text-white px-4 py-2 rounded-lg mt-4 flex items-center gap-2"
                  >
                    + Add More
                  </button>
                </label>
                {!isEditing && (
                  <div className="flex my-4">
                    <input
                      type="checkbox"
                      className="mr-3 text-[#42C2FF]"
                      onClick={handleCheckboxChange}
                    />
                    <label className="text-[#42C2FF]">
                      I agree to the Terms and Conditions
                    </label>
                  </div>
                )}
                <button
                  type="submit"
                  className={`bg-[#42C2FF] text-white px-4 py-2 rounded-lg mt-4 flex items-center gap-2 ${
                    isChecked ? "" : "disabled:opacity-50 cursor-not-allowed"
                  }`}
                  disabled={
                    !isChecked ||
                    spendxsaveyUpdateLoading ||
                    spendxsaveyUpdateSuccess
                  }
                >
                  {isEditing ? "Save Changes" : " + Create this Promotion"}
                </button>
              </form>
            </div>
            <div className="w-[50%] ">
              <h1 className="font-bold mb-2">Offer Preview</h1>
              <div className="relative">
                <img
                  src={spendXsaveY}
                  alt=""
                  className="w-80 h-41 object-cover rounded relative"
                />
                <p className=" absolute top-0 left-1 text-white capitalize -mt-[2px] tracking-tighter">
                  {promotionName}
                </p>
                <p className=" absolute right-1 bottom-0 text-white capitalize tracking-tighter">
                  {spendXSaveYDetails.promo_option_detail?.name}
                </p>
              </div>
            </div>
          </div>
        </div>
        <label
          onClick={() => {
            // setShowAddNewPromotionModal(false);
            dispatch(
              selectedSpendXSaveY({
                isEditing: false,
                selectedSpendXSaveYData: {},
              })
            );
          }}
          className="modal-backdrop"
          htmlFor={
            isEditing
              ? `add_spendxsavey_modal_${spendXSaveYDetails.id}`
              : "add_spendxsavey_modal_"
          }
        >
          Close
        </label>
      </div>
    </>
  );
};

export default AddNewPromotionModal;
