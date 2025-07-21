import React, { useEffect } from "react";
import { useCreateRestaurantMutation } from "../../redux/features/restaurentCreation/restaurentCreationApi";
import { toast } from "react-hot-toast";

const RestaurentModal = ({ setIsRestaurantModalOpen }) => {
  const [createRestaurant, { isLoading, isError, isSuccess, data }] =
    useCreateRestaurantMutation();
  const handleCategorySubmission = async (e) => {
    e.preventDefault();
    const restaurantObj = {
      name: e.target.restaurentName.value,
      opening_hours: [],
      location: e.target.location.value,
    };
    await createRestaurant(restaurantObj);
    setIsRestaurantModalOpen(false);
  };
  useEffect(() => {
    if (isSuccess) toast.success("Successfully created a new restaurant");
  }, [isSuccess]);
  return (
    <>
      <input type="checkbox" id="restaurentModal" className="modal-toggle" />
      <label htmlFor="restaurentModal" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          {/* form  */}
          <form onSubmit={handleCategorySubmission}>
            <h1 className="text-2xl mb-6 font-bold font-sans">
              Create A Restaurent
            </h1>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                required
                name="restaurentName"
                type="text"
                placeholder="Restaurent Name"
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
                <span className="label-text">Location</span>
              </label>
              <input
                name="location"
                type="text"
                placeholder="Location"
                className="input input-bordered w-full"
              />
            </div>

            <div className="modal-action">
              <label htmlFor="categoryModal">
                <button
                  name="save"
                  className="btn btn-primary text-white"
                  type="submit"
                >
                  Save
                </button>
              </label>
            </div>
          </form>
        </label>
      </label>
    </>
  );
};

export default RestaurentModal;
