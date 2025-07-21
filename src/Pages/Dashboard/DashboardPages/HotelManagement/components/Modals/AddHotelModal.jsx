import React, { useState } from "react";
import { useGetHotelOwnersQuery } from "../../../../../../redux/features/hotel/hotelApi";
import BaseModal from "./BaseModal";
import CheckboxField from "./CheckboxField";
import FormField from "./FormField";

const initialFormData = {
  owner: "",
  name: "",
  city: "",
  address: "",
  postal_code: "",
  country: "",
  latitude: "",
  longitude: "",
  location_coordinates: "",
  description: "",
  phone: "",
  email: "",
  website: "",
  base_price_per_night: "",
  currency: "",
  tax_rate: "",
  review_score: "",
  review_count: "",
  staff_rating: "",
  facilities_rating: "",
  cleanliness_rating: "",
  comfort_rating: "",
  value_for_money_rating: "",
  location_rating: "",
  distance_from_center: "",
  star_rating: "",
  is_active: false,
  prepayment_required: false,
  is_recommended: false,
  is_new_listing: false,
  is_promoted: false,
  has_parking: false,
  has_airport_shuttle: false,
  has_room_service: false,
  has_non_smoking_rooms: false,
  has_family_rooms: false,
  has_air_conditioning: false,
  has_dining_area: false,
  has_fireplace: false,
  has_balcony: false,
  has_garden: false,
  has_private_bathroom: false,
  has_safety_deposit_box: false,
  has_tv: false,
  has_flat_screen_tv: false,
  has_internet: false,
  has_free_wifi: false,
  has_mosquito_net: false,
  has_fan: false,
  has_ironing_facilities: false,
  has_desk: false,
  has_seating_area: false,
  has_24h_front_desk: false,
  has_wake_up_service: false,
  has_swimming_pool: false,
  has_fitness_center: false,
  has_spa: false,
  has_restaurant: false,
  has_bar: false,
  has_business_center: false,
  has_conference_facilities: false,
  has_elevator: false,
  has_heating: false,
  has_baggage_storage: false,
  speaks_english: false,
  speaks_hindi: false,
  speaks_bengali: false,
  is_ground_floor: false,
};

const AddHotelModal = ({ show, onClose, onSubmit }) => {
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const { data: hotelOwners } = useGetHotelOwnersQuery();
  const validateForm = () => {
    const newErrors = {};
    [
      "owner",
      "name",
      "city",
      "address",
      "postal_code",
      "country",
      "latitude",
      "longitude",
      "location_coordinates",
      "description",
      "phone",
      "email",
      "website",
      "base_price_per_night",
      "currency",
      "tax_rate",
      "review_score",
      "review_count",
      "staff_rating",
      "facilities_rating",
      "cleanliness_rating",
      "comfort_rating",
      "value_for_money_rating",
      "location_rating",
      "distance_from_center",
      "star_rating",
    ].forEach((field) => {
      if (!formData[field])
        newErrors[field] = `${field.replace(/_/g, " ")} is required.`;
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    // Format data as per JSON
    const dataToSubmit = { ...formData };
    dataToSubmit.owner = Number(dataToSubmit.owner);
    ["review_count"].forEach(
      (f) => (dataToSubmit[f] = dataToSubmit[f] ? Number(dataToSubmit[f]) : 0)
    );
    [
      "latitude",
      "longitude",
      "base_price_per_night",
      "tax_rate",
      "review_score",
      "staff_rating",
      "facilities_rating",
      "cleanliness_rating",
      "comfort_rating",
      "value_for_money_rating",
      "location_rating",
      "distance_from_center",
      "star_rating",
    ].forEach((f) => {
      if (dataToSubmit[f] !== "") dataToSubmit[f] = String(dataToSubmit[f]);
    });
    console.log(dataToSubmit);
    if (onSubmit) onSubmit(dataToSubmit);
    handleClose();
  };

  const handleClose = () => {
    setFormData(initialFormData);
    setErrors({});
    onClose();
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <BaseModal show={show} onClose={handleClose} title="Create Hotel">
      <form
        onSubmit={handleSubmit}
        className="overflow-y-auto max-h-[70vh] pr-2"
      >
        {/* Owner Dropdown */}
        <div className="mb-4">
          <label className="block mb-1 font-semibold">
            Owner<span className="text-red-500 ml-1">*</span>
          </label>
          <select
            name="owner"
            value={formData.owner}
            onChange={handleChange}
            className={`border rounded-lg py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-200 transition-colors ${
              errors.owner ? "border-red-500" : "border-gray-300"
            }`}
            required
          >
            <option value="">Select Owner</option>
            {hotelOwners?.map((owner) => (
              <option key={owner.id} value={owner.id}>
                {owner.email}
              </option>
            ))}
          </select>
          {errors.owner && (
            <div className="text-red-500 text-sm mt-1">{errors.owner}</div>
          )}
        </div>
        {/* Text Fields */}
        <FormField
          label="Hotel Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={errors.name}
          required
        />
        {errors.name && (
          <div className="text-red-500 text-sm mt-1">{errors.name}</div>
        )}
        <FormField
          label="City"
          name="city"
          value={formData.city}
          onChange={handleChange}
        />
        {errors.city && (
          <div className="text-red-500 text-sm mt-1">{errors.city}</div>
        )}
        <FormField
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          error={errors.address}
          required
        />
        {errors.address && (
          <div className="text-red-500 text-sm mt-1">{errors.address}</div>
        )}
        <FormField
          label="Postal Code"
          name="postal_code"
          value={formData.postal_code}
          onChange={handleChange}
        />
        {errors.postal_code && (
          <div className="text-red-500 text-sm mt-1">{errors.postal_code}</div>
        )}
        <FormField
          label="Country"
          name="country"
          value={formData.country}
          onChange={handleChange}
        />
        {errors.country && (
          <div className="text-red-500 text-sm mt-1">{errors.country}</div>
        )}
        <FormField
          label="Latitude"
          name="latitude"
          value={formData.latitude}
          onChange={handleChange}
        />
        {errors.latitude && (
          <div className="text-red-500 text-sm mt-1">{errors.latitude}</div>
        )}
        <FormField
          label="Longitude"
          name="longitude"
          value={formData.longitude}
          onChange={handleChange}
        />
        {errors.longitude && (
          <div className="text-red-500 text-sm mt-1">{errors.longitude}</div>
        )}
        <FormField
          label="Location Coordinates"
          name="location_coordinates"
          value={formData.location_coordinates}
          onChange={handleChange}
        />
        {errors.location_coordinates && (
          <div className="text-red-500 text-sm mt-1">
            {errors.location_coordinates}
          </div>
        )}
        <FormField
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
        {errors.description && (
          <div className="text-red-500 text-sm mt-1">{errors.description}</div>
        )}
        <FormField
          label="Phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          error={errors.phone}
          required
        />
        {errors.phone && (
          <div className="text-red-500 text-sm mt-1">{errors.phone}</div>
        )}
        <FormField
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          required
        />
        {errors.email && (
          <div className="text-red-500 text-sm mt-1">{errors.email}</div>
        )}
        <FormField
          label="Website"
          name="website"
          value={formData.website}
          onChange={handleChange}
        />
        {errors.website && (
          <div className="text-red-500 text-sm mt-1">{errors.website}</div>
        )}
        <FormField
          label="Base Price Per Night"
          name="base_price_per_night"
          type="number"
          value={formData.base_price_per_night}
          onChange={handleChange}
        />
        {errors.base_price_per_night && (
          <div className="text-red-500 text-sm mt-1">
            {errors.base_price_per_night}
          </div>
        )}
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Currency</label>
          <select
            name="currency"
            value={formData.currency}
            onChange={handleChange}
            className="border rounded-lg py-2 px-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-200 transition-colors"
            required
          >
            <option value="">Select Currency</option>
            <option value="BDT">BDT</option>
          </select>
        </div>
        {errors.currency && (
          <div className="text-red-500 text-sm mt-1">{errors.currency}</div>
        )}
        <FormField
          label="Tax Rate"
          name="tax_rate"
          type="number"
          value={formData.tax_rate}
          onChange={handleChange}
        />
        {errors.tax_rate && (
          <div className="text-red-500 text-sm mt-1">{errors.tax_rate}</div>
        )}
        <FormField
          label="Review Score"
          name="review_score"
          value={formData.review_score}
          onChange={handleChange}
        />
        {errors.review_score && (
          <div className="text-red-500 text-sm mt-1">{errors.review_score}</div>
        )}
        <FormField
          label="Review Count"
          name="review_count"
          value={formData.review_count}
          onChange={handleChange}
        />
        {errors.review_count && (
          <div className="text-red-500 text-sm mt-1">{errors.review_count}</div>
        )}
        <FormField
          label="Staff Rating"
          name="staff_rating"
          value={formData.staff_rating}
          onChange={handleChange}
        />
        {errors.staff_rating && (
          <div className="text-red-500 text-sm mt-1">{errors.staff_rating}</div>
        )}
        <FormField
          label="Facilities Rating"
          name="facilities_rating"
          value={formData.facilities_rating}
          onChange={handleChange}
        />
        {errors.facilities_rating && (
          <div className="text-red-500 text-sm mt-1">
            {errors.facilities_rating}
          </div>
        )}
        <FormField
          label="Cleanliness Rating"
          name="cleanliness_rating"
          value={formData.cleanliness_rating}
          onChange={handleChange}
        />
        {errors.cleanliness_rating && (
          <div className="text-red-500 text-sm mt-1">
            {errors.cleanliness_rating}
          </div>
        )}
        <FormField
          label="Comfort Rating"
          name="comfort_rating"
          value={formData.comfort_rating}
          onChange={handleChange}
        />
        {errors.comfort_rating && (
          <div className="text-red-500 text-sm mt-1">
            {errors.comfort_rating}
          </div>
        )}
        <FormField
          label="Value for Money Rating"
          name="value_for_money_rating"
          value={formData.value_for_money_rating}
          onChange={handleChange}
        />
        {errors.value_for_money_rating && (
          <div className="text-red-500 text-sm mt-1">
            {errors.value_for_money_rating}
          </div>
        )}
        <FormField
          label="Location Rating"
          name="location_rating"
          value={formData.location_rating}
          onChange={handleChange}
        />
        {errors.location_rating && (
          <div className="text-red-500 text-sm mt-1">
            {errors.location_rating}
          </div>
        )}
        <FormField
          label="Distance from Center"
          name="distance_from_center"
          value={formData.distance_from_center}
          onChange={handleChange}
        />
        {errors.distance_from_center && (
          <div className="text-red-500 text-sm mt-1">
            {errors.distance_from_center}
          </div>
        )}
        <FormField
          label="Star Rating"
          name="star_rating"
          value={formData.star_rating}
          onChange={handleChange}
        />
        {errors.star_rating && (
          <div className="text-red-500 text-sm mt-1">{errors.star_rating}</div>
        )}
        {/* Boolean Fields */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          {[
            ["is_active", "Active"],
            ["prepayment_required", "Prepayment Required"],
            ["is_recommended", "Recommended"],
            ["is_new_listing", "New Listing"],
            ["is_promoted", "Promoted"],
            ["has_parking", "Parking"],
            ["has_airport_shuttle", "Airport Shuttle"],
            ["has_room_service", "Room Service"],
            ["has_non_smoking_rooms", "Non-smoking Rooms"],
            ["has_family_rooms", "Family Rooms"],
            ["has_air_conditioning", "Air Conditioning"],
            ["has_dining_area", "Dining Area"],
            ["has_fireplace", "Fireplace"],
            ["has_balcony", "Balcony"],
            ["has_garden", "Garden"],
            ["has_private_bathroom", "Private Bathroom"],
            ["has_safety_deposit_box", "Safety Deposit Box"],
            ["has_tv", "TV"],
            ["has_flat_screen_tv", "Flat Screen TV"],
            ["has_internet", "Internet"],
            ["has_free_wifi", "Free WiFi"],
            ["has_mosquito_net", "Mosquito Net"],
            ["has_fan", "Fan"],
            ["has_ironing_facilities", "Ironing Facilities"],
            ["has_desk", "Desk"],
            ["has_seating_area", "Seating Area"],
            ["has_24h_front_desk", "24h Front Desk"],
            ["has_wake_up_service", "Wake Up Service"],
            ["has_swimming_pool", "Swimming Pool"],
            ["has_fitness_center", "Fitness Center"],
            ["has_spa", "Spa"],
            ["has_restaurant", "Restaurant"],
            ["has_bar", "Bar"],
            ["has_business_center", "Business Center"],
            ["has_conference_facilities", "Conference Facilities"],
            ["has_elevator", "Elevator"],
            ["has_heating", "Heating"],
            ["has_baggage_storage", "Baggage Storage"],
            ["speaks_english", "Speaks English"],
            ["speaks_hindi", "Speaks Hindi"],
            ["speaks_bengali", "Speaks Bengali"],
            ["is_ground_floor", "Ground Floor"],
          ].map(([key, label]) => (
            <CheckboxField
              key={key}
              label={label}
              name={key}
              checked={formData[key]}
              onChange={handleChange}
            />
          ))}
        </div>
        <button
          type="submit"
          className="w-full py-2 rounded-lg bg-blue-600 text-white font-semibold shadow hover:bg-blue-700 transition-colors"
        >
          Save Hotel
        </button>
      </form>
    </BaseModal>
  );
};

export default AddHotelModal;
