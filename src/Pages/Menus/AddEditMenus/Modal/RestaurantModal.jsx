import React, { useEffect, useState } from "react";

import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  useCreateRestaurantMutation,
  useUpdateRestaurantMutation,
} from "../../../../redux/features/restaurentCreation/restaurentCreationApi";
import { selectedRestaurant } from "../../../../redux/features/restaurentCreation/restaurentCreationSlice";
import RestaurantCreationForm from "../components/RestaurantCreationForm";

const RestaurantModal = ({ setShowAddRestaurantModal }) => {
  const [createRestaurant, { isLoading, isError, isSuccess, data }] =
    useCreateRestaurantMutation();
  const [selectedPreferences, setSelectedPreferences] = useState([]);

  const handlePreferenceChange = (event) => {
    const { value } = event.target;
    if (selectedPreferences.includes(value)) {
      setSelectedPreferences(
        selectedPreferences.filter((pref) => pref !== value)
      );
    } else {
      setSelectedPreferences([...selectedPreferences, value]);
    }
  };

  const [
    updateItem,
    {
      isLoading: isUpdateRestaurantLoading,
      isError: isUpdateRestaurantError,
      isSuccess: isUpdateRestaurantSuccess,
    },
  ] = useUpdateRestaurantMutation();
  const dispatch = useDispatch();
  const { selectedRestaurant: selectedRestaurantFromSelector } = useSelector(
    (state) => state.restaurentCreation
  );
  const { isEditing, restaurantDetails } = selectedRestaurantFromSelector;
  const [restaurantName, setRestaurantName] = useState("");
  const [restaurantEmail, setRestaurantEmail] = useState("");
  const [restaurantPhone, setRestaurantPhone] = useState("");
  const [rewardPointEquivalent, setRewardPointEquivalent] = useState(1); // Default value is 1
  const [bagPrice, setBagPrice] = useState(0);
  const [orderMethods, setOrderMethods] = useState([]);
  // console.log("🚀 ~ RestaurantModal ~ orderMethods:", orderMethods);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [paymentMethodsForPickup, setPaymentMethodsForPickup] = useState([]);
  // console.log(
  //   "🚀 ~ RestaurantModal ~ paymentMethodsForPickup:",
  //   paymentMethodsForPickup
  // );
  const [stripeFee, setStripeFee] = useState(false);
  const [dualPrice, setDualPrice] = useState(false);
  const [scheduleOrder, setScheduleOrder] = useState(false);
  const [isStoreClose, setIsStoreClose] = useState(false); // Default value is false
  const [selectedDaysAndTimes, setSelectedDaysAndTimes] = useState([]);
  const [logo, setLogo] = useState(null);
  const [previewLogo, setPreviewLogo] = useState(null);
  const daysOfWeek = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  const [dualPricePercentage, setDualPricePercentage] = useState(0);

  const handleLogoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewLogo(reader.result); // Set the base64 data URL for preview
        setLogo(file); // Set the file object
      };
      reader.readAsDataURL(file); // Read file as a data URL
    }
  };

  useEffect(() => {
    // Reset form fields when switching between "Add" and "Edit" modes
    if (isEditing) {
      // // console.log("edit mode");
      setRestaurantName(restaurantDetails.name || "");
      setRestaurantEmail(restaurantDetails.email || "");
      setBagPrice(restaurantDetails?.bag_price || 0);
      setRewardPointEquivalent(restaurantDetails?.reward_point_equivalent || 1);
      setIsStoreClose(restaurantDetails?.is_store_close || false);
      setStripeFee(restaurantDetails?.stripe_fee || false);
      setDualPrice(restaurantDetails?.use_delivery_inflation || false);
      setScheduleOrder(restaurantDetails?.accept_scheduled_order || false);
      setOrderMethods(restaurantDetails?.order_methods || []);
      setPaymentMethods(restaurantDetails?.payment_methods || []);
      setDualPricePercentage(restaurantDetails?.inflation_percent);
      setPaymentMethodsForPickup(
        restaurantDetails?.payment_methods_pickup || []
      );
      setLogo(restaurantDetails?.logo || null);

      const updatedSelectedDaysAndTimes = {};
      restaurantDetails.opening_hours.forEach((day) => {
        const { day_index, opening_hour } = day;

        if (opening_hour.length > 0) {
          const additionalTimes = opening_hour.slice(1).map((time) => ({
            startTime: time.start_time || "",
            endTime: time.end_time || "",
          }));

          updatedSelectedDaysAndTimes[day_index] = {
            startTime: opening_hour[0].start_time || "",
            endTime: opening_hour[0].end_time || "",
            additionalTimes: additionalTimes,
          };
        } else {
          updatedSelectedDaysAndTimes[day_index] = {
            startTime: "",
            endTime: "",
            additionalTimes: "",
          };
        }
      });

      setSelectedDaysAndTimes(updatedSelectedDaysAndTimes);
    } else {
      // // console.log("new add");
      setRestaurantName("");
      setRestaurantEmail("");
      setBagPrice(0);
      setRewardPointEquivalent(1);
      setIsStoreClose(false);
      setStripeFee(false);
      setOrderMethods([]);
      setPaymentMethods([]);
      setPaymentMethodsForPickup([]);
      setSelectedDaysAndTimes([]);
      setLogo(null);
      setDualPricePercentage(0);
    }
  }, [isEditing, restaurantDetails]);

  const handleDayClick = (day) => {
    setSelectedDaysAndTimes((prevSelectedDays) => {
      if (prevSelectedDays[day]) {
        const updatedSelectedDays = { ...prevSelectedDays };
        delete updatedSelectedDays[day];
        return updatedSelectedDays;
      } else {
        return {
          ...prevSelectedDays,
          [day]: {
            startTime: "",
            endTime: "",
          },
        };
      }
    });
  };
  const handleTimeChange = (day, field, value, index) => {
    if (index === undefined) {
      // Update main time
      setSelectedDaysAndTimes((prevSelectedDays) => ({
        ...prevSelectedDays,
        [day]: {
          ...prevSelectedDays[day],
          [field]: value,
        },
      }));
    } else {
      // Update additional times
      setSelectedDaysAndTimes((prevSelectedDays) => ({
        ...prevSelectedDays,
        [day]: {
          ...prevSelectedDays[day],
          additionalTimes: prevSelectedDays[day]?.additionalTimes.map(
            (time, i) =>
              i === index ? { ...time, [field]: value } : { ...time }
          ),
        },
      }));
    }
  };

  const isDaySelected = (day) => !!selectedDaysAndTimes[day];

  // end

  const handleTimeAdd = (day) => {
    setSelectedDaysAndTimes((prevSelectedDays) => ({
      ...prevSelectedDays,
      [day]: {
        ...prevSelectedDays[day],
        additionalTimes: [
          ...(prevSelectedDays[day]?.additionalTimes || []),
          { startTime: "", endTime: "" },
        ],
      },
    }));
  };

  const handleTimeRemove = (day, index) => {
    setSelectedDaysAndTimes((prevSelectedDays) => {
      const updatedSelectedDays = { ...prevSelectedDays };
      updatedSelectedDays[day].additionalTimes.splice(index, 1);
      return updatedSelectedDays;
    });
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch(
        selectedRestaurant({
          isEditing: false,
          selectedRestaurantData: {},
        })
      );
      toast.success("Successfully created a new restaurant");
      setShowAddRestaurantModal(false);
    } else if (isError) {
      dispatch(
        selectedRestaurant({
          isEditing: false,
          selectedRestaurantData: {},
        })
      );
      toast.error("Error creating a new restaurant");
    }
  }, [isSuccess, isError]);

  useEffect(() => {
    if (isUpdateRestaurantSuccess) {
      dispatch(
        selectedRestaurant({
          isEditing: false,
          selectedRestaurantData: {},
        })
      );

      toast.success("Successfully updated the restaurant");
      setShowAddRestaurantModal(false);
    } else if (isUpdateRestaurantError)
      toast.error("Error updating the restaurant");
  }, [isUpdateRestaurantError, isUpdateRestaurantSuccess]);

  return (
    <>
      <input
        type="checkbox"
        id={
          isEditing
            ? `add_restaurant_modal_${restaurantDetails.id}`
            : "add_restaurant_modal"
        }
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box">
          <h1 className="text-2xl mb-6 font-bold font-sans">
            {isEditing ? "Edit" : "Add"} Restaurant
          </h1>

          {/* form  */}
          <RestaurantCreationForm
            handleDayClick={handleDayClick}
            handlePreferenceChange={handlePreferenceChange}
            isEditing={isEditing}
            restaurantName={restaurantName}
            setRestaurantName={setRestaurantName}
            restaurantEmail={restaurantEmail}
            setRestaurantEmail={setRestaurantEmail}
            restaurantPhone={restaurantPhone}
            setRestaurantPhone={setRestaurantPhone}
            selectedPreferences={selectedPreferences}
            isUpdateRestaurantLoading={isUpdateRestaurantLoading}
            isLoading={isLoading}
            handleTimeAdd={handleTimeAdd}
            handleTimeRemove={handleTimeRemove}
            handleTimeChange={handleTimeChange}
            isDaySelected={isDaySelected}
            selectedDaysAndTimes={selectedDaysAndTimes}
            daysOfWeek={daysOfWeek}
            updateItem={updateItem}
            createRestaurant={createRestaurant}
            restaurantDetails={restaurantDetails}
            rewardPointEquivalent={rewardPointEquivalent}
            setRewardPointEquivalent={setRewardPointEquivalent}
            bagPrice={bagPrice}
            setBagPrice={setBagPrice}
            orderMethods={orderMethods}
            setOrderMethods={setOrderMethods}
            paymentMethods={paymentMethods}
            setPaymentMethods={setPaymentMethods}
            paymentMethodsForPickup={paymentMethodsForPickup}
            setPaymentMethodsForPickup={setPaymentMethodsForPickup}
            stripeFee={stripeFee}
            setStripeFee={setStripeFee}
            isStoreClose={isStoreClose}
            setIsStoreClose={setIsStoreClose}
            dualPrice={dualPrice}
            setDualPrice={setDualPrice}
            scheduleOrder={scheduleOrder}
            setScheduleOrder={setScheduleOrder}
            handleLogoChange={handleLogoChange}
            logo={logo}
            setLogo={setLogo}
            previewLogo={previewLogo}
            dualPricePercentage={dualPricePercentage}
            setDualPricePercentage={setDualPricePercentage}
          />
        </div>
        <label
          onClick={() =>
            dispatch(
              selectedRestaurant({
                isEditing: false,
                selectedRestaurantData: {},
              })
            )
          }
          className="modal-backdrop"
          htmlFor={
            isEditing
              ? `add_restaurant_modal_${restaurantDetails.id}`
              : "add_restaurant_modal"
          }
        >
          Close
        </label>
      </div>
    </>
  );
};

export default RestaurantModal;
