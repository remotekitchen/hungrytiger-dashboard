import React, { useState } from "react";
import toast from "react-hot-toast";
import { IoMdClose } from "react-icons/io";
import { MdOutlineFileUpload } from "react-icons/md";
import RestaurantOpeningHours from "../Modal/RestaurantOpeningHours";

const RestaurantCreationForm = ({
  handlePreferenceChange,
  isEditing,
  restaurantName,
  setRestaurantName,
  restaurantEmail,
  setRestaurantEmail,
  restaurantPhone,
  setRestaurantPhone,
  isUpdateRestaurantLoading,
  isLoading,
  createRestaurant,
  updateItem,
  restaurantDetails,
  rewardPointEquivalent,
  setRewardPointEquivalent,
  bagPrice,
  setBagPrice,
  orderMethods,
  setOrderMethods,
  paymentMethods,
  setPaymentMethods,
  paymentMethodsForPickup,
  setPaymentMethodsForPickup,
  stripeFee,
  setStripeFee,
  isStoreClose,
  setIsStoreClose,
  selectedDaysAndTimes,
  isDaySelected,
  handleDayClick,
  handleTimeChange,
  handleTimeAdd,
  handleTimeRemove,
  daysOfWeek,
  dualPrice,
  setDualPrice,
  scheduleOrder,
  setScheduleOrder,
  logo,
  handleLogoChange,
  setLogo,
  previewLogo,
}) => {
  // console.log(paymentMethodsForPickup, 'OrderMethodsss_pikckup');
  const [isDragging, setIsDragging] = useState(false);

  console.log(orderMethods, "orderMethoddd");
  console.log(paymentMethods, "paymentMethodsdd");

  // console.log('🚀 ~ restaurantDetails:', restaurantDetails);
  const handleOrderMethodChange = (e) => {
    const { value, checked } = e.target;
    setOrderMethods((prev) =>
      checked ? [...prev, value] : prev.filter((method) => method !== value)
    );
  };

  const handlePaymentMethodChange = (e) => {
    const { value, checked } = e.target;
    setPaymentMethods((prev) =>
      checked ? [...prev, value] : prev.filter((method) => method !== value)
    );
  };
  const handlePaymentMethodForPickupChange = (e) => {
    const { value, checked } = e.target;
    setPaymentMethodsForPickup((prev) =>
      checked ? [...prev, value] : prev.filter((method) => method !== value)
    );
  };

  const handleStripeFeeChange = (e) => {
    setStripeFee(e.target.name === "yes");
  };

  const handleRestaurantSubmission = async (e) => {
    e.preventDefault();

    // if (!logo) {
    // 	toast.error('Please upload a logo.');
    // 	return;
    // }

    // Validate opening hours
    const isAnyDaySelected = daysOfWeek.some((day) => isDaySelected(day));

    if (!isAnyDaySelected) {
      toast.error("Please select at least 1 opening hours..");
      return;
    }

    // const form = new FormData();
    // form.append("name", restaurantName);
    // form.append("email", restaurantEmail);
    // form.append("phone", restaurantPhone);

    // Handle opening_hours
    const opening_hours = [];
    for (const day in selectedDaysAndTimes) {
      if (Object.hasOwnProperty.call(selectedDaysAndTimes, day)) {
        const additionalTimes =
          selectedDaysAndTimes[day]?.additionalTimes || [];
        opening_hours.push({
          day_index: day,
          opening_hour: [
            {
              start_time: selectedDaysAndTimes[day]?.startTime || "",
              end_time: selectedDaysAndTimes[day]?.endTime || "",
            },
            ...additionalTimes.map((time) => ({
              start_time: time.startTime || "",
              end_time: time.endTime || "",
            })),
          ],
        });
      }
    }

    console.log(logo, "logo");

    // const formData = {
    // 	name: restaurantName,
    // 	email: restaurantEmail,
    // 	logo: logo,
    // 	reward_point_equivalent: rewardPointEquivalent,
    // 	bag_price: bagPrice,
    // 	order_methods: orderMethods,
    // 	payment_methods: paymentMethods,
    // 	payment_methods_pickup: paymentMethodsForPickup,
    // 	stripe_fee: stripeFee,
    // 	is_store_close: isStoreClose,
    // 	opening_hours: opening_hours,
    // 	use_delivery_inflation: dualPrice,
    // 	accept_scheduled_order: scheduleOrder,
    // };

    const formData = new FormData();
    formData.append("name", restaurantName);
    formData.append("email", restaurantEmail);
    if (logo instanceof File) {
      formData.append("logo", logo); // Add logo only if it's a file
    }
    formData.append("reward_point_equivalent", rewardPointEquivalent);
    formData.append("bag_price", bagPrice);
    orderMethods.forEach((method) => formData.append("order_methods", method));
    paymentMethods.forEach((method) =>
      formData.append("payment_methods", method)
    );
    paymentMethodsForPickup.forEach((method) =>
      formData.append("payment_methods_pickup", method)
    );
    // formData.append("order_methods", orderMethods);
    // formData.append("payment_method", paymentMethods);
    // formData.append("payment_methods_pickup", paymentMethodsForPickup);
    formData.append("stripe_fee", stripeFee);
    formData.append("is_store_close", isStoreClose);
    formData.append("opening_hours", opening_hours);
    formData.append("use_delivery_inflation", dualPrice);
    formData.append("accept_scheduled_order", scheduleOrder);

    // console.log('🚀 ~ handleRestaurantSubmission ~ formData:', formData);

    // Uncomment below lines to enable the form submission
    if (isEditing) {
      updateItem({ id: restaurantDetails.id, editRestaurant: formData });
    } else {
      createRestaurant(formData);
    }
  };

  const handleRemoveLogo = () => {
    setLogo(null);
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleLogoChange(file);
    }
  };

  console.log(logo, "logo");

  return (
    <>
      <form onSubmit={handleRestaurantSubmission} encType="multipart/form-data">
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Restaurant Name</span>
          </label>
          <input
            required
            name="restaurantName"
            type="text"
            placeholder="Restaurant Name"
            value={restaurantName}
            onChange={(e) => setRestaurantName(e.target.value)}
            className="input input-bordered w-full"
          />
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input
            required
            value={restaurantEmail}
            onChange={(e) => setRestaurantEmail(e.target.value)}
            name="email"
            type="text"
            placeholder="Email"
            className="input input-bordered w-full"
          />
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Reward Point Equivalent</span>
          </label>
          <input
            required
            name="reward_point_equivalent"
            type="number"
            placeholder="1"
            value={rewardPointEquivalent}
            onChange={(e) => setRewardPointEquivalent(e.target.value)}
            className="input input-bordered w-full"
          />
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Bag Price</span>
          </label>
          <input
            required
            name="bagPrice"
            type="number"
            placeholder="$2.00"
            value={bagPrice}
            onChange={(e) => setBagPrice(e.target.value)}
            className="input input-bordered w-full"
          />
        </div>
        <div className="w-full max-w-md mx-auto p-6">
          <div className="space-y-2">
            <label
              htmlFor="logo-upload"
              className="block text-sm font-medium text-gray-700"
            >
              Logo of restaurant
            </label>
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="logo-upload"
                className={`flex flex-col items-center justify-center w-full h-64 border-2 ${
                  isDragging ? "border-blue-500" : "border-gray-300"
                } border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-200 relative overflow-hidden`}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                {logo ? (
                  <div className="absolute inset-0 w-full h-full">
                    <img
                      src={previewLogo || logo}
                      alt="Logo preview"
                      className="w-full h-full object-contain"
                    />
                    <button
                      onClick={handleRemoveLogo}
                      className="absolute top-2 right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors duration-200"
                      title="Remove logo"
                    >
                      <IoMdClose className="w-5 h-5" />
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <MdOutlineFileUpload className="w-10 h-10 mb-3 text-gray-400" />
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500">
                      SVG, PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                  </div>
                )}
                <input
                  id="logo-upload"
                  name="logo"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleLogoChange}
                />
              </label>
            </div>
          </div>
        </div>
        <div className="form-control w-full mt-2 py-2">
          <label className="label">
            <span className="label-text font-bold">Order Methods</span>
          </label>
          <div className="flex items-center space-x-4">
            {["delivery", "restaurant_delivery", "pickup", "dine_in"].map(
              (method) => (
                <label key={method} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name={method}
                    value={method}
                    checked={orderMethods.includes(method)}
                    onChange={handleOrderMethodChange}
                    className="checkbox checkbox-primary"
                  />
                  <span>{method}</span>
                </label>
              )
            )}
          </div>
        </div>
        <div className="form-control w-full mt-2 py-2">
          <label className="label">
            <span className="label-text font-bold">Payment Methods</span>
          </label>
          <div className="flex items-center space-x-4">
            {["stripe", "card", "paypal", "cash", "wallet"].map((method) => (
              <label key={method} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name={method}
                  value={method}
                  checked={paymentMethods.includes(method)}
                  onChange={handlePaymentMethodChange}
                  className="checkbox checkbox-primary"
                />
                <span>{method}</span>
              </label>
            ))}
          </div>
        </div>
        {/* enable/disable payment method  */}
        <div className="form-control w-full mt-2 py-2">
          <label className="label">
            <span className="label-text font-bold">
              Payment Methods For Pickup
            </span>
          </label>
          <div className="flex items-center space-x-4">
            {["stripe", "paypal", "cash", "card", "wallet"].map(
              (methodForPickup) => (
                <label
                  key={methodForPickup}
                  className="flex items-center space-x-2"
                >
                  <input
                    type="checkbox"
                    name={methodForPickup}
                    value={methodForPickup}
                    checked={paymentMethodsForPickup.includes(methodForPickup)}
                    onChange={handlePaymentMethodForPickupChange}
                    className="checkbox checkbox-primary"
                  />
                  <span>{methodForPickup}</span>
                </label>
              )
            )}
          </div>
        </div>
        {isEditing && (
          <div className="form-control w-full mt-2 py-2">
            <label className="label">
              <span className="label-text font-bold">Store Status</span>
            </label>
            <div className="flex items-center space-x-4">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="storeStatus"
                  checked={isStoreClose}
                  onChange={(e) => setIsStoreClose(e.target.checked)}
                  className="checkbox checkbox-primary"
                />
                <span>{isStoreClose ? "Open" : "Close"}</span>
              </label>
            </div>
          </div>
        )}
        <div className="form-control w-full mt-2 py-2">
          <label className="label">
            <span className="label-text font-bold">
              Do you want to add Stripe fee?
            </span>
          </label>
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="yes"
                checked={stripeFee}
                onChange={handleStripeFeeChange}
                className="checkbox checkbox-primary"
              />
              <span>Yes</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="no"
                checked={!stripeFee}
                onChange={handleStripeFeeChange}
                className="checkbox checkbox-primary"
              />
              <span>No</span>
            </label>
          </div>
        </div>
        {/* Dual Price  */}
        <div className="form-control w-full mt-2 py-2">
          <label className="label">
            <span className="label-text font-bold">Accept Dual Price</span>
          </label>
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="yes"
                checked={dualPrice}
                onChange={() => setDualPrice(!dualPrice)}
                className="checkbox checkbox-primary"
              />
              <span>Yes</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="no"
                checked={!dualPrice}
                onChange={() => setDualPrice(!dualPrice)}
                className="checkbox checkbox-primary"
              />
              <span>No</span>
            </label>
          </div>
        </div>
        <div className="form-control w-full mt-2 py-2">
          <label className="label">
            <span className="label-text font-bold">Accept Scheduled Order</span>
          </label>
          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="yes"
                checked={scheduleOrder}
                onChange={() => setScheduleOrder(!scheduleOrder)}
                className="checkbox checkbox-primary"
              />
              <span>Yes</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="no"
                checked={!scheduleOrder}
                onChange={() => setScheduleOrder(!scheduleOrder)}
                className="checkbox checkbox-primary"
              />
              <span>No</span>
            </label>
          </div>
        </div>
        {/* opening hour */}
        <RestaurantOpeningHours
          selectedDaysAndTimes={selectedDaysAndTimes}
          isDaySelected={isDaySelected}
          handleDayClick={handleDayClick}
          handleTimeChange={handleTimeChange}
          handleTimeAdd={handleTimeAdd}
          handleTimeRemove={handleTimeRemove}
        />
        {/* end hour */}

        <div className="modal-action">
          <label htmlFor="categoryModal">
            <button
              disabled={isUpdateRestaurantLoading || isLoading}
              name="save"
              className="bg-[#42C2FF] text-white px-4 py-2 rounded-lg mt-2"
              type="submit"
            >
              {isEditing ? "Save changes" : "+ Add New Restaurant"}
            </button>
          </label>
        </div>
      </form>
    </>
  );
};

export default RestaurantCreationForm;
