import React from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { BiCategoryAlt } from "react-icons/bi";
import { useGetCategoryQuery } from "../../redux/features/categoryCreation/categoryCreationApi";

const CategoryCard = () => {
  // get all menus
  const {
    data: allCategories,
    isLoading,
    isError,
    error,
  } = useGetCategoryQuery();
  let displayableContent;
  if (isLoading) displayableContent = <li>Loading...</li>;
  else if (isError)
    displayableContent = <li>Something went wrong loading the menus</li>;
  else if (allCategories.results.length === 0)
    displayableContent = <option>No menu available right now</option>;
  else
    displayableContent = (
      <ul className="grid grid-cols-3 gap-6">
        {allCategories.results.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    );
  return (
    <>
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="flex justify-between">
            <h1 className="card-title">{"title"}</h1>
          </div>
          {/* <p>{description}</p> */}
          <div>{displayableContent}</div>
          <div className="card-actions justify-end">
            <div className="tooltip" data-tip="Add An Item">
              <button
                name="icon"
                className="btn btn-primary text-white  btn-sm"
              >
                <AiOutlinePlusCircle />
              </button>
            </div>
            <div className="tooltip" data-tip="Add A Category">
              <label
                htmlFor="categoryModal"
                className="btn btn-primary text-white  btn-sm bg-white text-black hover:bg-black hover:text-white"
              >
                <BiCategoryAlt />
              </label>
            </div>
          </div>
        </div>
      </div>
      {/* <CategoryModal menu={id} restaurant={restaurant} /> */}
    </>
  );
};

export default CategoryCard;
