import React from "react";

const RewardBasic = ({
  formData,
  handleInputChange,
  restaurantList,
  locationList,
  isLocationLoading,
}) => {
  const { name, description, restaurant, location } = formData;
  // console.log("🚀 ~ location:", location);
  return (
    <>
      <div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Reward Name</span>
          </label>
          <input
            required
            name="name"
            type="text"
            placeholder="Reward Name"
            className="input input-bordered w-full"
            value={name}
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
            name="description"
            value={description}
            onChange={handleInputChange}
          />
        </div>

        {/* Select Restaurant */}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Select Restaurant</span>
          </label>
          <select
            id="restaurant"
            required
            className="select select-bordered w-full"
            name="restaurant"
            value={restaurant}
            onChange={handleInputChange}
          >
            <option value="" disabled>
              Select Restaurant
            </option>
            {restaurantList?.results?.map((item) => (
              <option key={item?.id} value={item?.id}>
                {item?.name}
              </option>
            ))}
          </select>
        </div>

        {/* Select Location */}
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text">Select Location</span>
          </label>
          <select
            id="location"
            required
            className="select select-bordered w-full"
            name="location"
            value={location}
            onChange={handleInputChange}
            disabled={isLocationLoading || !locationList?.results?.length}
          >
            <option value="" disabled>
              Select Location
            </option>
            {locationList?.results?.map((item) => (
              <option key={item?.id} value={item?.id}>
                {item?.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
};

export default RewardBasic;
