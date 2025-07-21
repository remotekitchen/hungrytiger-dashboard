import React from "react";
import { useParams } from "react-router-dom";
import { getPlurality } from "../../../../core/utils";
import { useGetCategoryQuery } from "../../../../redux/features/categoryCreation/categoryCreationApi";

const MenuCategories = () => {
  const { menuId } = useParams();

  // const [categories, setCategories] = useState([]);
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
              <tr key={item?.id}>
                <th>
                  <input type="checkbox" className="checkbox" />
                </th>
                <td>{item.name}</td>
                <td>
                  {item.menu.length} menu{getPlurality(item.menu.length)}
                </td>
                <td>
                  {item.menuitem_cnt} item{getPlurality(item.menuitem_cnt)}
                </td>
                <td>
                  {item.locations.length} location
                  {getPlurality(item.locations.length)}
                </td>
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

export default MenuCategories;
