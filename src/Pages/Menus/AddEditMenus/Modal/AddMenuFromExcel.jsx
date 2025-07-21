import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useGetLocationsQuery } from "../../../../redux/features/menuCreation/menuCreationApi";

const AddMenuFromExcel = ({
  setShowMenuModal,
  name,
  setName,
  setSelectedRestaurant,
  optionContent,
  createMenuFromExcel,
  selectedRestaurant,
  setAddFromExcel,
  menuCreationFromExcelLoading,
  menuCreationFromExcelIsError,
  menuCreationFromExcelSuccess,
}) => {
  const [selectedLocation, setSelectedLocation] = useState([]);
  const {
    data: locationList,
    isSuccess: isLocationSuccess,
    isLoading: isLocationLoading,
  } = useGetLocationsQuery(selectedRestaurant);

  const [file, setFile] = useState("");
  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };
  const handleMenuUpload = async () => {
    /* 
    {
    "menu_file": null,
    "restaurant": null,
    "locations": [],
    "name": ""
}
    */

    if (!name || !file || !selectedRestaurant || !selectedLocation) return;
    let formData = new FormData();
    formData.append("menu_file", file);
    formData.append("restaurant", selectedRestaurant);
    formData.append("name", name);
    // formData.append("locations", [selectedLocation]);
    selectedLocation.forEach((location, index) => {
      formData.append(`locations[${index}]`, location);
    });

    // // console.log(formData.entries());
    createMenuFromExcel(formData);
    // todo: have to check whether it is properly adding the items or not
  };
  useEffect(() => {
    if (menuCreationFromExcelSuccess) {
      toast.success("Added Menu from Excel");
      setShowMenuModal(false);
    } else if (menuCreationFromExcelIsError) {
      toast.error("Something went wrong. Please try again later!");
    }
  }, [menuCreationFromExcelIsError, menuCreationFromExcelSuccess]);

  return (
    <div className="py-12">
      <h3 className="text-2xl text-center font-bold">Create menu from excel</h3>
      <div className="flex">
        <div className="w-full">
          <div>
            <div className="form-control ">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
              />
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Restaurant</span>
              </label>
              <select
                onChange={(e) => setSelectedRestaurant(e.target.value)}
                className="select select-bordered w-full"
              >
                <option disabled selected>
                  Select
                </option>
                {optionContent}
              </select>
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Locations</span>
              </label>
              <select
                onChange={(e) => {
                  setSelectedLocation([e.target.value]);
                }}
                className="select select-bordered w-full"
              >
                <option disabled selected>
                  Select location
                </option>
                {locationList?.results.map((item) => (
                  <option
                    value={item.id}
                    key={item.id}
                    // selected={selectedLocations.includes(item.id)}
                  >
                    {item?.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Excel file</span>
              </label>
              <input
                type="file"
                onChange={handleFileChange}
                className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem]  font-normal  transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-primary hover:file:text-white focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
              />
            </div>
          </div>

          <div className="flex items-center justify-end mt-24">
            <div>
              <button
                name="cancel"
                onClick={() => setAddFromExcel(false)}
                className="btn mx-2 hover:text-white bg-white hover:bg-[#42C2FF] text-black"
              >
                Cancel
              </button>
              <button
                name="continue"
                disabled={menuCreationFromExcelLoading}
                onClick={handleMenuUpload}
                className="btn bg-[#42C2FF] text-white hover:bg-white hover:text-[#42C2FF]"
              >
                {menuCreationFromExcelLoading ? "Loading..." : "Continue"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMenuFromExcel;
