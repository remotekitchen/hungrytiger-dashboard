import React, { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { useUpdateLocationDirectOrderMutation } from "../../../redux/features/locationCreation/locationCreationApi";
import LocationCreationModalUpdate from "./LocationCreationModalUpdate";

const baseUrl = import.meta.env.VITE_API_ROOT;

const LocationRow = ({ data, restaurantSlug }) => {
  // console.log("🚀 ~ LocationRow ~ restaurantSlug:", restaurantSlug);
  // console.log("🚀 ~ LocationRow-data:", data);
  const [modalOpen, setModalOpen] = useState(false);
  const [addLocation, setAddLocation] = useState(false);
  const [getLocation, setLocation] = useState("");

  const location = useLocation();
  const fullUrl = `${window.location.origin}${location.pathname}${location.search}${location.hash}`;

  // State to store the value
  const [store, setStore] = useState("chatchef");

  useEffect(() => {
    if (fullUrl.includes("techchef")) {
      setStore("techchef");
    } else if (fullUrl.includes("chatchef")) {
      setStore("chatchef");
    }
  }, [fullUrl]);

  const {
    id,
    opening_hours,
    uid,
    slug,
    name,
    details,
    direct_order,
    restaurant,
    use_third_party_do,
    third_party_do,
  } = data || {};
  // console.log("🚀 ~ LocationRow roooooooooooott:", id);
  const [updateLocationDirectOrder, { isLoading, isError, isSuccess }] =
    useUpdateLocationDirectOrderMutation();
  const handlePublishLocation = () => {
    updateLocationDirectOrder({ id, restaurant, direct_order });
  };

  const handleLocation = (id) => {
    setAddLocation(true);
    setLocation(id);
  };

  const orderUrl = `https://order.${
    store === "techchef" ? "techchefs.ca" : "chatchefs.com"
  }/${restaurantSlug}/${slug}`;

  const dynamicOrderUrl =
    baseUrl === "https://test.api.chatchefs.com/"
      ? orderUrl.replace("order.", "dev.")
      : orderUrl;

  return (
    <>
      <div className="flex justify-between">
        <div>
          <h4 className="font-bold capitalize my-1 mb-2 text-xl flex items-center gap-2">
            {name}{" "}
            <span
              className={`text-sm ${
                direct_order
                  ? "bg-green-200 text-green-600"
                  : "bg-red-200 text-red-600"
              } rounded-md px-2 py-1`}
            >
              {direct_order ? "Published" : "Unpublished"}
            </span>
            <label
              className="border-2 rounded-md px-2 py-1 font-semibold hover:shadow-md transition-all cursor-pointer"
              htmlFor="locationModal"
              onClick={() => handleLocation(id)}
            >
              <FaRegEdit />
            </label>
          </h4>{" "}
          <p className="font-semibold mb-4">{details}</p>
          {direct_order && (
            <div>
              <div>
                <p className="font-bold ">DO Link:</p>
                <a
                  // href={`https://order.${
                  //   store === "techchef" ? "techchefs.ca" : "chatchefs.com"
                  // }/${restaurantSlug}/${slug}`}
                  href={dynamicOrderUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mb-5 underline text-blue-500"
                >
                  {/* https://order.
              {store === "techchef" ? "techchefs.ca" : "chatchefs.com"}/
              {restaurantSlug}/{slug} */}
                  {dynamicOrderUrl}
                </a>
              </div>
              {use_third_party_do && (
                <div className="mt-3">
                  <p className="font-bold">Third Party DO Link:</p>
                  <a
                    href={third_party_do}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline mt-5"
                  >
                    <p>{third_party_do}</p>
                  </a>
                </div>
              )}
            </div>
          )}
        </div>

        <div>
          <button
            name="publish-unpublish"
            disabled={isLoading}
            onClick={handlePublishLocation}
            className="border-2 rounded-md px-2 py-1 font-semibold hover:shadow-md transition-all"
          >
            {direct_order ? "Unpublish" : "Publish"}
          </button>
        </div>
      </div>
      <LocationCreationModalUpdate
        addLocation={addLocation}
        setAddLocation={setAddLocation}
        locations={getLocation}
        setLocations={setLocation}
        isEdit={true}
        locationData={data}
        locationId={getLocation}
      />
      <hr className="mb-6" />
    </>
  );
};

export default LocationRow;
