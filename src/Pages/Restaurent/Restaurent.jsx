import React, { useState } from "react";
import Loading from "../../Components/Loading";
import { useGetAllRestaurantQuery } from "../../redux/features/restaurentCreation/restaurentCreationApi";
import RestaurentCard from "./RestaurentCard";
import RestaurentModal from "./RestaurentModal";

const Restaurent = () => {
  // get all menus
  const {
    data: allRestaurant,
    isLoading,
    isError,
    error,
  } = useGetAllRestaurantQuery();
  const [isRestaurantModalOpen, setIsRestaurantModalOpen] = useState(false);
  // // console.log(isRestaurantModalOpen);
  let displayableContent;
  if (isLoading) displayableContent = <Loading />;
  else if (isError)
    displayableContent = (
      <>
        <option>Something went wrong loading the menus</option>
      </>
    );
  else if (allRestaurant.results.length === 0)
    displayableContent = <option>No restaurent available right now</option>;
  else
    displayableContent = (
      <div className="grid grid-cols-2 gap-6">
        {allRestaurant.results.map((item) => (
          <RestaurentCard item={item} key={item.id} />
        ))}
      </div>
    );
  return (
    <div className="mx-6 my-5">
      <h1 className="text-5xl font-bold text-center">Restaurant</h1>
      <div className="flex justify-end">
        <label
          onClick={() => setIsRestaurantModalOpen(true)}
          htmlFor={`restaurentModal`}
          className="btn btn-primary common_button_shadow text-white btn-sm"
        >
          {" "}
          + Add Restaurent
        </label>
      </div>
      <div className="my-16">{displayableContent}</div>
      {isRestaurantModalOpen && (
        <RestaurentModal setIsRestaurantModalOpen={setIsRestaurantModalOpen} />
      )}
    </div>
  );
};

export default Restaurent;
