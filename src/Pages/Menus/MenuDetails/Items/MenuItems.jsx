import React from "react";
import { useGetCategoryQuery } from "../../../../redux/features/categoryCreation/categoryCreationApi";
import { useParams } from "react-router-dom";

const MenuItems = () => {
  const { menuId } = useParams();
  const {
    data: categories,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetCategoryQuery(menuId);
  let displayableContent;
  if (isLoading) displayableContent = <p>Loading...</p>;
  else if (isError) displayableContent = <p>Something went wrong...</p>;
  else if (!isError && categories)
    displayableContent = (
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th className="w-4/5">Category name</th>
              <th>Appears in</th>
              <th>Contains</th>
              <th>Locations</th>
            </tr>
          </thead>
          <tbody>
            {categories.results.map((item) => (
              <tr>
                <th>
                  <input type="checkbox" className="checkbox" />
                </th>
                <td>{item.name}</td>
                <td></td>
                <td></td>
                <td>{item.locations.length} location</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  return (
    <>
      <div className="px-12">{displayableContent}</div>
    </>
  );
};

export default MenuItems;
