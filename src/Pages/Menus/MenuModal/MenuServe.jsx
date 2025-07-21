import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  useCreateMenuMutation,
  useGetLocationsQuery,
} from "../../../redux/features/menuCreation/menuCreationApi";
import { menuCreationOptions } from "../../../redux/features/menuCreation/menuCreationSlice";

const MenuServe = () => {
  const navigate = useNavigate();
  const { menuCreation } = useSelector((state) => state.menuCreation);
  const {
    data: locationList,
    isLoading,
    isError,
    error,
  } = useGetLocationsQuery(menuCreation.restaurant);
  const [optionsArr, setOptionsArr] = useState([]);
  const [
    createMenu,
    {
      data,
      isLoading: menuCreationLoading,
      isError: menuCreationIsError,
      error: menuCreationError,
    },
  ] = useCreateMenuMutation();
  const dispatch = useDispatch();
  const handleOptionsArr = (e) => {
    const { value, checked } = e.target;

    setOptionsArr((prevState) => {
      if (checked) {
        if (prevState.includes(value)) {
          return prevState.filter((option) => option !== value); // Remove value from array
        } else {
          return [...prevState, value]; // Add value to array
        }
      } else {
        return prevState.filter((option) => option !== value); // Remove value from array
      }
    });
  };
  let optionContent;
  if (isLoading) optionContent = <option>Loading...</option>;
  else if (isError)
    optionContent = <option>Something went wrong loading the locations</option>;
  else if (locationList.results.length === 0)
    optionContent = <option>No location available right now</option>;
  else
    optionContent = locationList.results.map((item) => (
      <>
        <div className="form-control">
          <label className="label cursor-pointer">
            <span className="label-text">{item.name}</span>
            <input
              onClick={handleOptionsArr}
              value={item.id}
              type="checkbox"
              className="checkbox"
            />
          </label>
        </div>
      </>
    ));
  // handle create menu button
  const menuCreationObj = {
    title: menuCreation.title,
    description: "test description",
    restaurant: parseInt(menuCreation.restaurant),
    cuisine_types: [],
    opening_hours: [],
    locations: optionsArr,
  };
  const handleCreateMenu = async () => {
    dispatch(menuCreationOptions({ locations: optionsArr }));
    await createMenu(menuCreationObj);
  };
  useEffect(() => {
    if (data && !isLoading) {
      // navigate(`/menus/all-menus`);
      navigate(`/dashboard/add-edit-menus`);
      // // console.log(data);
    }
  }, [data, isLoading, navigate]);
  return (
    <div className="w-1/3 mx-auto my-16">
      <div>
        <h3 className="text-xl font-semiboldbold text-center">
          Choose where you would like to serve this menu!
        </h3>
        <h5 className=" text-gray-400 text-center">
          Select the location you want to serve
        </h5>
      </div>
      <div className="flex justify-between my-6">
        <div className="form-control me-2">
          <label className="label cursor-pointer">
            <span className="label-text me-2">Select All</span>
            <input type="checkbox" className="checkbox" />
          </label>
        </div>
        <div className="form-control">
          <div className="input-group">
            <input
              type="text"
              placeholder="Search…"
              className="input input-bordered"
            />
            <button
              name="menu-serve"
              className="btn btn-primary text-white btn-square"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className="border-2 rounded-md p-1">{optionContent}</div>

      <div className="flex items-center justify-end mt-24">
        <div>
          <button
            name="cancel"
            className="btn btn-primary mx-2 btn-sm hover:text-white bg-white border-2 text-black"
          >
            Cancel
          </button>
          <button
            name="create-menu"
            onClick={handleCreateMenu}
            className="btn btn-primary text-white btn-sm"
          >
            Create Menu
          </button>
        </div>
      </div>
    </div>
  );
};

export default MenuServe;
