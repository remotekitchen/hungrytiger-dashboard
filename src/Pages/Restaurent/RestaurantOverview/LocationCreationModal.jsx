import React, { useEffect } from "react";

import { toast } from "react-hot-toast";
import { useCreateLocationMutation } from "../../../redux/features/locationCreation/locationCreationApi";

const LocationCreationModal = ({ restaurantId }) => {
  const [createLocation, { isLoading, isError, isSuccess, data }] =
    useCreateLocationMutation();
  const handleLocationSubmission = async (e) => {
    e.preventDefault();
    const locationObj = {
      name: e.target.locationName.value,
      opening_hours: [],
      details: e.target.locationDetails.value,
      restaurant: restaurantId,
    };
    await createLocation(locationObj);
  };
  useEffect(() => {
    if (isSuccess) toast.success("Successfully created a new location");
  }, [isSuccess]);
  return (
    <>
      {/* <dialog id="locationModal" className="modal-box">
        <button
          onClick={() => window.locationModal.close()}
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
        >
          ✕
        </button>
        <div className="">
          <label className="modal-box relative" htmlFor="">
            <form onSubmit={handleLocationSubmission}>
              <h1 className="text-2xl mb-6 font-bold font-sans">
                Add A Location
              </h1>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Location Name</span>
                </label>
                <input
                  name="locationName"
                  type="text"
                  placeholder="Location Name"
                  className="input input-bordered w-full"
                />
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Opening Hours</span>
                </label>
                <input
                  name="openingHours"
                  type="text"
                  placeholder="Opening Hours"
                  className="input input-bordered w-full"
                />
              </div>

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Details</span>
                </label>
                <textarea
                  className="textarea textarea-bordered"
                  placeholder="Details"
                  name="locationDetails"
                ></textarea>
              </div>
              <div className="modal-action">
                <button
                  disabled={isLoading}
                  className="btn btn-primary text-white"
                  type="submit"
                >
                  Save
                </button>
              </div>
            </form>
          </label>
        </div>
      </dialog> */}
      <input type="checkbox" id="locationModal" className="modal-toggle" />
      <label htmlFor="locationModal" className="modal cursor-pointer">
        <label className="modal-box relative">
          {/* form  */}
          <form onSubmit={handleLocationSubmission}>
            <h1 className="text-2xl mb-6 font-bold font-sans">
              Add A Location
            </h1>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Location Name</span>
              </label>
              <input
                name="locationName"
                type="text"
                placeholder="Location Name"
                className="input input-bordered w-full"
              />
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Opening Hours</span>
              </label>
              <input
                name="openingHours"
                type="text"
                placeholder="Opening Hours"
                className="input input-bordered w-full"
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Details</span>
              </label>
              <textarea
                className="textarea textarea-bordered"
                placeholder="Details"
                name="locationDetails"
              ></textarea>
            </div>
            <div className="modal-action">
              <button
                name="save"
                disabled={isLoading}
                className="btn btn-primary text-white"
                type="submit"
              >
                Save
              </button>
            </div>
          </form>
        </label>
      </label>
    </>
  );
};

export default LocationCreationModal;
