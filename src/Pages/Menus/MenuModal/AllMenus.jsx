import React from "react";
import { useGetAllMenuQuery } from "../../../redux/features/menuCreation/menuCreationApi";
import MenuCard from "./MenuCard";

const AllMenus = () => {
  // get all menus
  const { data: allMenus, isLoading, isError, error } = useGetAllMenuQuery();
  // // console.log(allMenus);
  let displayableContent;
  if (isLoading) displayableContent = <option>Loading...</option>;
  else if (isError)
    displayableContent = (
      <option>Something went wrong loading the menus</option>
    );
  else if (allMenus.results.length === 0)
    displayableContent = <option>No menu available right now</option>;
  else
    displayableContent = (
      <div className="grid grid-cols-3 gap-6">
        {allMenus.results.map((item) => (
          <MenuCard item={item} key={item.id} />
        ))}
      </div>
    );
  return (
    <div className="min-h-16 px-16 my-12">
      <div className="flex justify-between items-center">
        <div className="flex my-8">
          <div className="form-control w-full me-6">
            <select className="select select-bordered w-full max-w-xs">
              <option disabled selected>
                Select Item
              </option>
              <option>Han Solo</option>
              <option>Greedo</option>
            </select>
          </div>

          <div className="form-control w-full">
            <select className="select select-bordered w-full max-w-xs">
              <option disabled selected>
                Select Location
              </option>
              <option>Han Solo</option>
              <option>Greedo</option>
            </select>
          </div>
        </div>
        <div className="w-96">
          <div className="form-control w-full ">
            <input
              type="text"
              placeholder="Type here"
              className="input input-bordered w-full max-w-xs"
            />
          </div>
        </div>
      </div>
      {/* <button className="btn btn-primary text-white btn-sm">Edit Menu</button> */}
      {displayableContent}
    </div>
  );
};

export default AllMenus;
