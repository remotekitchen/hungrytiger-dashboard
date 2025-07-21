import React from "react";
import { useGetCategoryQuery } from "../../redux/features/categoryCreation/categoryCreationApi";
import CategoryCard from "./CategoryCard";

const Categories = () => {
  // get all menus
  const {
    data: allCategories,
    isLoading,
    isError,
    error,
  } = useGetCategoryQuery();
  let displayableContent;
  if (isLoading) displayableContent = <option>Loading...</option>;
  else if (isError)
    displayableContent = (
      <option>Something went wrong loading the menus</option>
    );
  else if (allCategories.results.length === 0)
    displayableContent = <option>No menu available right now</option>;
  else
    displayableContent = (
      <div className="grid grid-cols-3 gap-6">
        {allCategories.results.map((item) => (
          <CategoryCard item={item} key={item.id} />
        ))}
      </div>
    );
  return (
    <div className="min-h-16 ">
      {/* <button className="btn btn-primary text-white btn-sm">Edit Menu</button> */}
      {displayableContent}
    </div>
  );
};

export default Categories;
