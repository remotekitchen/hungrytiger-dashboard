import React, { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import {
  useCreateDeliveryFeeMutation,
  useEditDeliveryFeeMutation,
  useGetDeliveryFeesQuery,
} from "../../../redux/features/deliveryFee/deliveryFeeAssociation";
import { useGetAllRestaurantQuery } from "../../../redux/features/restaurentCreation/restaurentCreationApi";
import DynamicTheme from "./DynamicTheme";
import Maintenance from "./Maintenance";
import PhoneManagement from "./PhoneManagement";

const DoCustomization = () => {
  const [activeMenu, setActiveMenu] = useState("theme");
  const { data: allRestaurant } = useGetAllRestaurantQuery();
  const [formData, setFormData] = useState({
    restaurant: "",
    tax_rate: "",
    use_tax: false,
    alcoholic_tax_rate: "",
  });

  const { data: getDeliveryFees } = useGetDeliveryFeesQuery({
    restaurantId: parseInt(formData?.restaurant) || "",
  });

  const [
    createDeliveryFee,
    {
      isLoading: isCreateLoading,
      isError: isCreateError,
      isSuccess: isCreateSuccess,
      error: createError,
    },
  ] = useCreateDeliveryFeeMutation();

  const [
    editDeliveryFee,
    {
      isLoading: isEditLoading,
      isError: isEditError,
      isSuccess: isEditSuccess,
      error: editError,
    },
  ] = useEditDeliveryFeeMutation();

  useEffect(() => {
    if (allRestaurant?.results?.length > 0) {
      setFormData((prev) => ({
        ...prev,
        restaurant: allRestaurant.results[0].id,
      }));
    }
  }, [allRestaurant]);

  useEffect(() => {
    if (getDeliveryFees) {
      setFormData({
        restaurant: getDeliveryFees.restaurant,
        tax_rate: getDeliveryFees.tax_rate,
        use_tax: getDeliveryFees.use_tax,
        alcoholic_tax_rate: getDeliveryFees.alcoholic_tax_rate,
      });
    } else {
      setFormData({
        restaurant: "",
        tax_rate: "",
        use_tax: "",
        alcoholic_tax_rate: "",
      });
    }
  }, [getDeliveryFees]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    let newValue;

    if (type === "checkbox") {
      newValue = checked;
    } else if (type === "number") {
      newValue = parseFloat(value);
    } else if (name === "restaurant") {
      newValue = parseInt(value, 10);
    } else {
      newValue = value;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (
        getDeliveryFees &&
        formData.restaurant === getDeliveryFees.restaurant
      ) {
        // Edit existing delivery fee
        await editDeliveryFee({
          id: getDeliveryFees?.id,
          item: formData,
        }).unwrap();
        // console.log("Tax Fee Updated Successfully", formData);
      } else {
        // Create new delivery fee
        await createDeliveryFee(formData).unwrap();
        // console.log("Tax Fee Created Successfully", formData);
      }
    } catch (err) {
      console.error("Failed to save tax fee: ", err);
    }
  };

  const isLoading = isCreateLoading || isEditLoading;
  const isError = isCreateError || isEditError;
  const isSuccess = isCreateSuccess || isEditSuccess;
  const error = createError || editError;

  return (
    <section className="w-full h-full my-10 px-5">
      {/* top */}
      <div>
        <h1 className="text-3xl font-bold">DO Customization</h1>
        <div className="flex justify-between items-center my-3">
          <div className="flex items-center gap-5">
            <p
              onClick={() => setActiveMenu("theme")}
              className={`text-xl font-medium cursor-pointer text-[#0000009a] ${
                activeMenu === "theme" ? "border-b-2 border-blue-400" : ""
              }`}
            >
              Theme
            </p>
            <p
              onClick={() => setActiveMenu("maintenance")}
              className={`text-xl font-medium cursor-pointer text-[#0000009a] ${
                activeMenu === "maintenance" ? "border-b-2 border-blue-400" : ""
              }`}
            >
              Maintenance
            </p>
            <p
              onClick={() => setActiveMenu("tax")}
              className={`text-xl font-medium cursor-pointer text-[#0000009a] ${
                activeMenu === "tax" ? "border-b-2 border-blue-400" : ""
              }`}
            >
              Tax
            </p>
            <p
              onClick={() => setActiveMenu("phone")}
              className={`text-xl font-medium cursor-pointer text-[#0000009a] ${
                activeMenu === "phone" ? "border-b-2 border-blue-400" : ""
              }`}
            >
              Phone Number Management
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center justify-center gap-3 px-5 py-2 rounded-xl border-2 border-blue-400 text-blue-400 cursor-pointer">
              <span>
                <FaEye className="text-xl" />
              </span>
              <span>View Online</span>
            </button>
            <button className="flex items-center justify-center gap-3 px-5 py-2 rounded-xl bg-red-500 text-white cursor-pointer">
              Cancel Changes
            </button>
            <button className="flex items-center justify-center gap-3 px-5 py-2 rounded-xl bg-blue-500 text-white cursor-pointer">
              Publish Changes
            </button>
          </div>
        </div>
      </div>
      <hr />
      {/* tax component  */}
      {activeMenu === "tax" && (
        <form className="w-full mt-10" onSubmit={handleSubmit}>
          <label className="form-control w-full max-w-xs">
            <select
              className="select select-bordered w-96"
              name="restaurant"
              value={formData.restaurant}
              onChange={handleChange}
            >
              <option value="">Select Restaurant</option>
              {allRestaurant?.results?.map((res) => (
                <option key={res.id} value={res.id}>
                  {res.name}
                </option>
              ))}
            </select>
          </label>

          {/* TAX Rate  */}
          <label className="form-control w-full max-w-xs mt-5">
            <div className="label">
              <span className="label-text">Tax Rate</span>
            </div>
            <input
              type="number"
              name="tax_rate"
              placeholder="Tax Rate"
              className="input input-bordered w-96"
              value={formData?.tax_rate}
              onChange={handleChange}
            />
          </label>

          {/* Alcoholic TAX Rate  */}
          <label className="form-control w-full max-w-xs mt-5">
            <div className="label">
              <span className="label-text">Alcoholic Tax Rate</span>
            </div>
            <input
              type="number"
              name="alcoholic_tax_rate"
              placeholder="Alcoholic Tax Rate"
              className="input input-bordered w-96"
              value={formData.alcoholic_tax_rate}
              onChange={handleChange}
            />
          </label>

          {/* Use-Tax  */}
          <div className="form-control w-96 mt-3">
            <label className="cursor-pointer flex items-center gap-4">
              <span className="label-text">Use Tax</span>
              <input
                type="checkbox"
                name="use_tax"
                checked={formData.use_tax}
                onChange={handleChange}
                className="checkbox checkbox-primary"
              />
            </label>
          </div>

          {/* Submit button  */}
          <button
            type="submit"
            className="btn btn-info w-96 mt-3"
            disabled={isLoading}
          >
            {isLoading
              ? "Saving..."
              : getDeliveryFees &&
                formData.restaurant === getDeliveryFees.restaurant
              ? "Update"
              : "Create"}
          </button>

          {isSuccess && (
            <p className="mt-3 text-green-500">
              Tax fee{" "}
              {getDeliveryFees &&
              formData.restaurant === getDeliveryFees.restaurant
                ? "updated"
                : "created"}{" "}
              successfully!
            </p>
          )}
          {isError && (
            <p className="mt-3 text-red-500">
              {error?.data?.restaurant ||
                `Failed to ${
                  getDeliveryFees &&
                  formData.restaurant === getDeliveryFees.restaurant
                    ? "update"
                    : "create"
                } tax fee`}
            </p>
          )}
        </form>
      )}

      {/* Maintenance */}
      {activeMenu === "maintenance" && <Maintenance />}

      {/* Dynamic-Theme */}
      {activeMenu === "theme" && <DynamicTheme />}

      {/* Dynamic-Theme */}
      {activeMenu === "phone" && <PhoneManagement />}
    </section>
  );
};

export default DoCustomization;
