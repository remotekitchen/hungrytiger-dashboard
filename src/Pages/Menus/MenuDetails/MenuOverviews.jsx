import React from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Loading from "../../../Components/Loading";
import { useGetMenuDetailsQuery } from "../../../redux/features/menuCreation/menuCreationApi";
import { seeMenuDetails } from "../../../redux/features/menuCreation/menuCreationSlice";
import MenuItemsTableRow from "./MenuItemsTableRow";

const MenuOverviews = () => {
  const { menuId } = useParams();
  const {
    data: menuDetails,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetMenuDetailsQuery(menuId);
  const dispatch = useDispatch();
  // if (isSuccess) // console.log(menuDetails);

  let displayableContent;
  if (isLoading) displayableContent = <Loading />;
  else if (isError) displayableContent = <p>Something went wrong...</p>;
  else if (!isError && menuDetails) {
    dispatch(seeMenuDetails(menuDetails));
    displayableContent = (
      <>
        {menuDetails?.category_set?.length > 0 ? (
          menuDetails?.category_set?.map((category) => {
            const matchingItems = category?.menuitem_set?.filter((item) =>
              menuDetails?.menuitem_set?.find(
                (menuItem) => menuItem?.id === item
              )
            );

            return (
              <div key={category.id} className="">
                <h3 className="text-3xl my-6 ">
                  Category: <span className="font-bold">{category.name}</span>
                </h3>
                {matchingItems?.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="table w-full">
                      <thead>
                        <tr>
                          <th></th>
                          <th>Image</th>
                          <th>Item</th>
                          <th>Description</th>
                          <th>Price</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {matchingItems?.map((itemId) => {
                          const item = menuDetails?.menuitem_set?.find(
                            (menuItem) => menuItem?.id === itemId
                          );

                          return (
                            <MenuItemsTableRow key={item.id} data={item} />
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p>No Item Available</p>
                )}
              </div>
            );
          })
        ) : (
          <p>No Menu Available</p>
        )}
      </>
    );
  }

  return (
    <div className="px-12">
      <h1 className="text-5xl font-bold my-12">{menuDetails?.title}</h1>
      {displayableContent}
    </div>
  );
};

export default MenuOverviews;
