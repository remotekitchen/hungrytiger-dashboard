import React, { useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../../../Components/Loading";
import { useGetRestaurantDetailsQuery } from "../../../redux/features/restaurentCreation/restaurentCreationApi";
import LocationCreationModalUpdate from "./LocationCreationModalUpdate";
import LocationRow from "./LocationRow";
import RestaurantImageCreationModal from "./RestaurantImageCreationModal";

const RestaurantOverview = () => {
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const { id } = useParams();
  const [addLocation, setAddLocation] = useState(false);
  const [location, setLocation] = useState("");

  const handleLocation = (id) => {
    setAddLocation(true);
    setLocation(id);
  };

  const {
    data: restaurantDetails,
    isLoading,
    isError,
    isSuccess,
  } = useGetRestaurantDetailsQuery(id);

  const {
    name,
    avatar_image,
    banner_image,
    created_date,
    locations,
    opening_hours,
    owner,
    uid,
    slug,
  } = restaurantDetails || {};
  let displayableContent;
  if (isLoading) {
    displayableContent = <Loading />;
  } else if (!isError && isSuccess) {
    displayableContent = (
      <div className="px-16">
        <div className="mb-12">
          {/* name */}
          <h3 className="text-4xl my-4 capitalize font-bold">{name}</h3>
          {/* creation */}
          <p className="text-gray-500">{created_date}</p>
        </div>
        {/* all the locations */}
        <div>
          <div className="flex flex-col items-end mb-8">
            {/* <label
              className="border-2 rounded-md px-2 py-1 font-semibold hover:shadow-md transition-all cursor-pointer"
              htmlFor="restaurantImagesModal"
              onClick={() => setModalOpen(!modalOpen)}
            >
              + Add Images for this restaurant
            </label> */}
            <label
              className="border-2 rounded-md px-2 py-1 font-semibold hover:shadow-md transition-all cursor-pointer"
              htmlFor="locationModal"
              onClick={() => handleLocation(id)}
            >
              + Add a Location for this restaurant
            </label>
          </div>
          <div>
            {locations.map((data) => (
              <LocationRow restaurantSlug={slug} data={data} key={data.id} />
            ))}
          </div>
        </div>
      </div>
    );
  } else if (isError && !isSuccess) {
    displayableContent = <p>Something went wrong loading restaurant details</p>;
  }

  return (
    <div>
      {/* images */}
      <div className="bg-[url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80')] bg-cover bg-center h-80 relative">
        <div className="w-full h-full backdrop-brightness-50">
          <div className="absolute left-5 bottom-0">
            <div className="avatar">
              <div className="w-24 rounded-full">
                <img
                  alt="our platform"
                  src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* other contents */}
      <div>{displayableContent}</div>
      {/* <LocationCreationModal restaurantId={id} /> */}
      <LocationCreationModalUpdate
        addLocation={addLocation}
        setAddLocation={setAddLocation}
        locations={location}
        setLocations={setLocation}
        isEdit={false}
      />

      {modalOpen && (
        <RestaurantImageCreationModal
          setModalOpen={setModalOpen}
          modalOpen={modalOpen}
        />
      )}
    </div>
  );
};

export default RestaurantOverview;
