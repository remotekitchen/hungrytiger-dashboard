import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetRestaurentsQuery } from "../../../redux/features/menuCreation/menuCreationApi";
import { useDispatch } from "react-redux";
import { menuCreationOptions } from "../../../redux/features/menuCreation/menuCreationSlice";

const MenuSetup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // states for restaurent and name
  const [name, setName] = useState("");
  const [selectedRestaurant, setSelectedRestaurant] = useState("");
  // get all the restaurents
  const {
    data: restaurentList,
    isLoading,
    isError,
    error,
  } = useGetRestaurentsQuery();
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

  // handle next
  const handleNextFromMenuSetup = () => {
    dispatch(
      menuCreationOptions({ restaurant: selectedRestaurant, title: name })
    );
    navigate("/menus/serve");
  };
  return (
    <div className="py-12">
      <h3 className="text-2xl text-center font-bold">Menu Setup</h3>
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
                onClick={handleNextFromMenuSetup}
                className="btn btn-primary text-white btn-sm"
              >
                Continue
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuSetup;
