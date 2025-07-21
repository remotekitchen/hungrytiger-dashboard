import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  useCreateMenuFromExcelMutation,
  useGetRestaurentsQuery,
} from "../../../../redux/features/menuCreation/menuCreationApi";

const CreateMenuExcel = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // states for restaurent and name
  const [file, setFile] = useState<File>();
  const [name, setName] = useState("");
  const [selectedRestaurant, setSelectedRestaurant] = useState("");
  // get all the restaurents
  const {
    data: restaurentList,
    isLoading,
    isError,
    error,
  } = useGetRestaurentsQuery();
  const [
    createMenuFromExcel,
    {
      data,
      isLoading: menuCreationLoading,
      isError: menuCreationIsError,
      error: menuCreationError,
    },
  ] = useCreateMenuFromExcelMutation();
  let optionContent;
  if (isLoading) optionContent = <option>Loading...</option>;
  else if (isError)
    optionContent = (
      <option>Something went wrong loading the restaurent</option>
    );
  else if (restaurentList.results.length === 0)
    optionContent = <option>No restaurent available right now</option>;
  else
    optionContent = restaurentList.results.map((item) => (
      <option value={item.id} key={item.id}>
        {item?.name}
      </option>
    ));
  const handleFileChange = (e) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };
  useEffect(() => {
    if (data && !isLoading) {
      //
    }
  }, [data, isLoading, navigate]);
  // handle next
  const handleMenuUpload = async () => {
    if (!name || !file || !selectedRestaurant) return;
    let formData = new FormData();
    formData.append("menu_file", file);
    formData.append("restaurant", selectedRestaurant);
    formData.append("name", name);
    for (let i of formData.entries()) // console.log(i);
      await createMenuFromExcel(formData);
  };
  return (
    <>
      <div className="py-12">
        <h3 className="text-2xl text-center font-bold">
          Create menu from excel
        </h3>
        <div className="flex justify-center items-between ">
          <div className="w-1/4  ">
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
                  <span className="label-text">Restaurent</span>
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
                  onClick={() => navigate(-1)}
                  className="btn btn-primary mx-2 btn-sm hover:text-white bg-white border-2 text-black"
                >
                  Cancel
                </button>
                <button
                  name="continue"
                  onClick={handleMenuUpload}
                  className="btn btn-primary btn-sm text-white"
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateMenuExcel;
