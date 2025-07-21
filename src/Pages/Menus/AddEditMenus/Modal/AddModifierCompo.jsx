import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useCreateModifierGroupFromExcelMutation } from "../../../../redux/features/modifierGroup/modifierGroupApi";

const AddModifierComponent = ({
  setAddFromExcel,
  getRestaurentsData,
  locationList,
  selectedRestaurant,
  setSelectedRestaurant,
  setShowModifierGroup,
}) => {
  // // console.log("🚀 ~ selectedRestaurant:", selectedRestaurant);
  const [selectedLocation, setSelectedLocation] = useState([]);
  //   // console.log("🚀 ~ selectedLocation:", selectedLocation);
  /* for modifiers: remove after pr */
  const [modifierFile, setModifierFile] = useState("");
  // // console.log("🚀 ~ modifierFile:", modifierFile);
  const handleModifierFileChange = (e) => {
    if (e.target.files) {
      setModifierFile(e.target.files[0]);
    }
  };

  /* appi */
  const [
    createModifierGroupFromExcel,
    {
      isLoading: isModifierGroupAddLoading,
      isError: isModifierGroupAddingError,
      isSuccess: isModifierGroupAddingSuccess,
    },
  ] = useCreateModifierGroupFromExcelMutation();

  const handleModifierGroupUpload = async () => {
    /* 
  {
  "menu_file": null,
  "restaurant": null,
  "locations": [],
  "name": ""
}
  */

    if (!modifierFile || !selectedRestaurant || !selectedLocation) return;
    let formData = new FormData();
    formData.append("modifiers_file", modifierFile);
    formData.append("restaurant", parseInt(selectedRestaurant));
    formData.append("location", parseInt(selectedLocation));
    // selectedLocation.forEach((location, index) => {
    //   formData.append(`locations[${index}]`, parseInt(location));
    // });

    // // console.log(formData.entries());
    createModifierGroupFromExcel(formData);
  };
  useEffect(() => {
    if (isModifierGroupAddingSuccess) {
      toast.success("Added Modifiers from Excel");
      // close modal
      setShowModifierGroup(false);
    } else if (isModifierGroupAddingError) {
      toast.error("Something went wrong. Please try again later!");
    }
  }, [isModifierGroupAddingSuccess, isModifierGroupAddingError]);

  /* ============================== */

  return (
    <div className="py-12">
      <h3 className="text-2xl text-center font-bold">Create menu from excel</h3>
      <div className="flex">
        <div className="w-full">
          <div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Restaurant</span>
              </label>
              <select
                onChange={(e) => {
                  setSelectedRestaurant(e.target.value);
                }}
                className="select select-bordered w-full"
              >
                <option disabled selected>
                  Select
                </option>
                {getRestaurentsData?.results?.map((item) => (
                  <option value={item.id} key={item.id}>
                    {item?.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Locations</span>
              </label>
              <select
                onChange={(e) => {
                  setSelectedLocation(e.target.value);
                }}
                className="select select-bordered w-full"
              >
                <option disabled selected>
                  Select location
                </option>
                {locationList?.results?.map((item) => (
                  <option value={item.id} key={item.id}>
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
                onChange={handleModifierFileChange}
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
                // disabled={}
                onClick={handleModifierGroupUpload}
                className="btn bg-[#42C2FF] text-white hover:bg-white hover:text-[#42C2FF]"
              >
                Create Modifier
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddModifierComponent;
