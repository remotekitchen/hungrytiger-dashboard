import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import {
  useCreateLocationMutation,
  useGetLocationQuery,
  useUpdateLocationMutation,
} from "../../../redux/features/locationCreation/locationCreationApi";

const LocationCreationModalUpdate = ({
  addLocation,
  setAddLocation,
  locations,
  setLocations,
  isEdit,
  locationData,
  locationId,
}) => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const { data: getLocation } = useGetLocationQuery();
  // // console.log("🚀 ~ getLocationsssssssss:", getLocation?.results);

  // // console.log("Location-Id:", locationId);
  const { id } = useParams();

  const addLocationRef = useRef();

  const [address, setAddress] = useState({
    streetNumber: "",
    streetName: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    phone: "",
    use_third_party_do: false,
    third_party_do: "",
  });

  // console.log("Addresss", address);

  const onChangeHandler = (e) => {
    const { name, type, checked, value } = e.target;
    const newValue = type === "checkbox" ? checked : value;
    setAddress((prevState) => ({
      ...prevState,
      [name]: newValue,
    }));
  };

  const concatedAddress = (address) => {
    const { city, state, streetName, streetNumber, zip, country } = address;
    const concatenatedAddress = `${streetNumber} ${streetName} ${city} ${state} ${zip} ${country}`;
    return concatenatedAddress;
  };

  const concatenatedAddress = concatedAddress(address);

  const [createLocation, { isLoading, isError, isSuccess, data }] =
    useCreateLocationMutation();

  const [
    updateLocation,
    { isLoading: isUpdating, isError: updateError, isSuccess: updateSuccess },
  ] = useUpdateLocationMutation();

  const handleLocationSubmission = async (e) => {
    e.preventDefault();
    const locationObj = {
      name: e.target.locationName.value,
      opening_hours: [],
      details: concatenatedAddress,
      restaurant: id,
      address: {
        country: address?.country,
        state: address?.state,
        city: address?.city,
        street_number: address?.streetNumber,
        street_name: address?.streetName,
        zip: address?.zip,
      },
      phone: e.target.phone.value,
      use_third_party_do: address.use_third_party_do,
      third_party_do: address.third_party_do || "",
    };
    // await createLocation(locationObj);
    if (isEdit) {
      // If it's an edit, update the location
      await updateLocation({ locationId: locationId, data: locationObj });
      setAddLocation(false);
      toast.success("Location updated");
    } else {
      // If it's not an edit, create a new location
      await createLocation(locationObj);
    }
  };
  useEffect(() => {
    if (isSuccess) toast.success("Successfully created a new location");
    setAddLocation(false);
  }, [isSuccess]);

  // default value
  useEffect(() => {
    if (isEdit && getLocation) {
      const matchedLocation = getLocation.results.find(
        (result) => parseInt(result.id) === parseInt(locationId)
      );

      // console.log(matchedLocation?.use_third_party_do, "Matched location");

      if (matchedLocation && matchedLocation?.address !== null) {
        setName(matchedLocation.name || "");
        setPhone(matchedLocation.phone || "");
        setAddress({
          streetNumber: matchedLocation.address.street_number || "",
          streetName: matchedLocation.address.street_name || "",
          city: matchedLocation.address.city || "",
          state: matchedLocation.address.state || "",
          zip: matchedLocation.address.zip || "",
          country: matchedLocation.address.country || "",
          use_third_party_do: matchedLocation?.use_third_party_do,
          third_party_do: matchedLocation?.third_party_do || "",
        });
      }
    }
  }, [isEdit, getLocation, id, locationId]);

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (
        addLocation &&
        addLocationRef.current &&
        !addLocationRef.current.contains(e.target)
      ) {
        setAddLocation(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [addLocation, setAddLocation]);
  return (
    <div
      className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  ${
        addLocation
          ? "w-full justify-center items-center flex backdrop-blur bg-black/20 h-screen z-10"
          : "z-[-10]"
      }`}
    >
      <div
        ref={addLocationRef}
        className={` transition-all duration-300 ${
          addLocation ? "scale-100" : "scale-0"
        }`}
      >
        <div className="p-4  bg-white shadow-md rounded-lg w-[80vh] ">
          <form onSubmit={handleLocationSubmission}>
            <h1 className="text-2xl mb-6 font-bold font-sans">
              {isEdit ? "Update Location" : "Add Location"}
            </h1>
            <div className="h-[40vh] overflow-y-scroll">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Location Name</span>
                </label>
                <input
                  name="locationName"
                  type="text"
                  defaultValue={name}
                  placeholder="Location Name"
                  className="input input-bordered w-full"
                />
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Phone Number</span>
                </label>
                <input
                  name="phone"
                  type="text"
                  defaultValue={phone}
                  onChange={onChangeHandler}
                  placeholder="Phone Number"
                  className="input input-bordered w-full"
                />
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Street Number</span>
                </label>
                <input
                  name="streetNumber"
                  type="text"
                  value={address.streetNumber}
                  onChange={onChangeHandler}
                  placeholder="Street Number"
                  className="input input-bordered w-full"
                />
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Street Name</span>
                </label>
                <input
                  name="streetName"
                  type="text"
                  value={address.streetName}
                  onChange={onChangeHandler}
                  placeholder="Street Name"
                  className="input input-bordered w-full"
                />
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">City</span>
                </label>
                <input
                  name="city"
                  type="text"
                  value={address.city}
                  onChange={onChangeHandler}
                  placeholder="City"
                  className="input input-bordered w-full"
                />
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">State</span>
                </label>
                <input
                  name="state"
                  type="text"
                  value={address.state}
                  onChange={onChangeHandler}
                  placeholder="State"
                  className="input input-bordered w-full"
                />
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Zip</span>
                </label>
                <input
                  name="zip"
                  type="text"
                  value={address.zip}
                  onChange={onChangeHandler}
                  placeholder="Zip"
                  className="input input-bordered w-full"
                />
              </div>
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Country</span>
                </label>
                <input
                  name="country"
                  type="text"
                  value={address?.country}
                  onChange={onChangeHandler}
                  placeholder="Country"
                  className="input input-bordered w-full"
                />
              </div>
              <div className="mt-2">
                <label className="label cursor-pointer">
                  <div className="flex items-center gap-4">
                    <span className="">Use third party link?</span>
                    <input
                      type="checkbox"
                      name="use_third_party_do"
                      checked={address?.use_third_party_do}
                      onChange={onChangeHandler}
                      className="checkbox checkbox-primary"
                    />
                  </div>
                </label>
              </div>

              {address?.use_third_party_do && (
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Third Party Link</span>
                  </label>
                  <input
                    name="third_party_do"
                    type="text"
                    defaultValue={address?.third_party_do}
                    onChange={onChangeHandler}
                    placeholder="Enter third party link"
                    className="input input-bordered w-full"
                  />
                </div>
              )}

              {/* <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Details</span>
                                </label>
                                <textarea
                                    className="textarea textarea-bordered"
                                    placeholder="Details"
                                    name="locationDetails"
                                ></textarea>
                            </div> */}
            </div>
            <div className="modal-action">
              <button
                name="save"
                disabled={isLoading}
                className="bg-[#42C2FF] text-white px-4 py-2 rounded-lg mt-2"
                type="submit"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LocationCreationModalUpdate;
