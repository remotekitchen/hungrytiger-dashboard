import React, { useEffect } from "react";
import { useGetItemsQuery } from "../../../../redux/features/itemCreation/itemCreationApi";

const ItemListModal = ({ menuId, categoryId, refetchToggle }) => {
  const {
    data: allItems,
    isLoading,
    isError,
    error,
    isSuccess,
    refetch,
  } = useGetItemsQuery({ menuId, categoryId });

  useEffect(() => {
    if (refetchToggle) {
      refetch();
    }
  }, [refetchToggle, refetch]);

  let displayableContent;

  if (isLoading || !allItems) {
    displayableContent = <li>Loading...</li>;
  } else if (isError) {
    displayableContent = <li>Something went wrong loading the items</li>;
  } else if (allItems.results.length > 0) {
    displayableContent = (
      <div className="">
        {allItems.results.map((item) => {
          return (
            <div key={item.id} className="flex items-center justify-between">
              <li>{item.name}</li>
            </div>
          );
        })}
      </div>
    );
  } else {
    displayableContent = <div className="">No items available</div>;
  }
  // // console.log(allItems);

  return (
    <>
      <input
        type="checkbox"
        id={`itemListModal-${menuId}-${categoryId}`}
        className="modal-toggle"
      />
      <label
        htmlFor={`itemListModal-${menuId}-${categoryId}`}
        className="modal cursor-pointer"
      >
        <label className="modal-box relative" htmlFor="">
          {/* form  */}
          <div>{displayableContent}</div>
          {/* {allItems &&
						allItems.results.map((item) => {
							return (
								<div key={item.id} className='flex items-center justify-between'>
									<li>{item.name}</li>
								</div>
							);
						})} */}
        </label>
      </label>
    </>
  );
};

export default ItemListModal;
