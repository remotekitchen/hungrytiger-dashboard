import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { BiEdit, BiSearch } from "react-icons/bi";
import { FaPlay, FaRegStopCircle, FaRegUserCircle } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateItemsListOrderMutation } from "../../../redux/features/dynamicSorting/dynamicItemsSorting";
import {
  useDeleteItemMutation,
  useGetAllItemsQuery,
  useGetItemsQuery,
  useGetItemsWithoutPaginationQuery,
  useUpdateItemMutation,
} from "../../../redux/features/itemCreation/itemCreationApi";
import { selectedItemForEdit } from "../../../redux/features/itemCreation/itemCreationSlice";
import AddItemModal from "./Modal/AddItemModal";
import EditItemModal from "./Modal/EditItemModal";
import ModifierCreationModal from "./Modal/ModifierCreationModal";

const Items = ({ handleSection, activeSection }) => {
  const [searchInput, setSearchInput] = useState();
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  // console.log("🚀 ~ Items ~ showAddItemModal:", showAddItemModal);
  const [editItem, setEditItem] = useState(false);
  // const [item, setItem] = useState("");
  const [selectedPage, setSelectedPage] = useState(1);
  const [items, setItems] = useState([]);
  // console.log("🚀 ~ Items ~ itemssssssssssss------get:", items);
  const [hasMore, setHasMore] = useState(true);
  const [index, setIndex] = useState(2);
  const [draggedItem, setDraggedItem] = useState(null);
  const [draggedOverItem, setDraggedOverItem] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [itemDescription, setItemDescription] = useState("");
  const [itemPrice, setItemPrice] = useState();
  const [isPaused, setIsPaused] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);
  const { selectedItemForEdit: selectedItemForEditSelector } = useSelector(
    (state) => state.itemCreation
  );
  const { isEditing, itemDetails } = selectedItemForEditSelector;
  console.log(itemDetails, "item-detailssssssssss");
  const dispatch = useDispatch();

  const handleItemEdit = (item) => {
    setShowAddItemModal(true);

    setTimeout(() => {
      dispatch(
        selectedItemForEdit({ isEditing: true, selectedItemData: item })
      );
    }, 0);
  };

  const { data: itemList } = useGetItemsQuery();

  const { data: allItemsList, refetch } = useGetAllItemsQuery();
  const {
    data: itemsWithoutPagination,
    isLoading: itemsWithoutPaginationIsLoading,
  } = useGetItemsWithoutPaginationQuery();
  // console.log("🚀 ~ Items ~ itemsWithoutPagination:", itemsWithoutPagination);

  useEffect(() => {
    refetch();
  }, [isEditing, reloadKey, refetch, itemList]);

  const [
    updateItem,
    {
      isLoading: isUpdateItemLoading,
      isSuccess: isUpdateItemSuccess,
      isError: isUpdateItemError,
    },
  ] = useUpdateItemMutation();

  const [success, setSuccess] = useState(false);

  const [updateItemsListOrder] = useUpdateItemsListOrderMutation();
  const [deleteItem, { isSuccess }] = useDeleteItemMutation();

  useEffect(() => {
    if (isSuccess) toast.success("Successfully deleted a Item");
  }, [isSuccess]);

  useEffect(() => {
    const fetchInitialData = async () => {
      setIsLoading(true); // Start loading
      try {
        const token = JSON.parse(localStorage.getItem("auth")).token;
        const baseUrl = import.meta.env.VITE_API_ROOT;
        let url = `${baseUrl}api/food/v1/menu-item/?page=1&page_size=15`;

        // Conditionally append search query if searchInput has value
        if (searchInput) {
          url += `&search=${searchInput}`;
        }

        const response = await axios.get(url, {
          headers: {
            Authorization: `token ${token}`,
          },
        });

        setItems(response.data.results);
        setHasMore(response.data.results.length > 0);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false); // End loading
      }
    };

    fetchInitialData();
  }, [searchInput, itemList, allItemsList, success, isSuccess]);

  const fetchMoreData = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("auth")).token;
      const baseUrl = import.meta.env.VITE_API_ROOT;
      const url = `${baseUrl}api/food/v1/menu-item/?page=${index}&page_size=15`;

      const response = await axios.get(url, {
        headers: {
          Authorization: `token ${token}`,
        },
      });

      setItems((prevItems) => [...prevItems, ...response.data.results]);
      setHasMore(response.data.results.length > 0);
      setIndex((prevIndex) => prevIndex + 1);
    } catch (err) {
      console.error(err);
    }
  };

  // this is the old method

  // const handleCheckboxChange = (item) => {
  //   updateItem({
  //     id: item.id,
  //     item: { is_alcoholic: !item.is_alcoholic },
  //   })
  //     .unwrap()
  //     .then(() => {
  //       toast.success(`Updated ${item.name} successfully`);
  //     })
  //     .catch((error) => {
  //       toast.error(`Failed to update ${item.name}`);
  //     });
  // };

  // Do the same thing with optimize way

  const handleCheckboxChange = (item) => {
    // Optimistically update the UI state
    setItems((prevItems) =>
      prevItems.map((prevItem) =>
        prevItem.id === item.id
          ? { ...prevItem, is_alcoholic: !prevItem.is_alcoholic }
          : prevItem
      )
    );

    // Perform the mutation to update the item on the server
    updateItem({
      id: item.id,
      item: { is_alcoholic: !item.is_alcoholic },
    })
      .unwrap()
      .then(() => {
        toast.success(`Updated ${item.name} successfully`);
      })
      .catch((error) => {
        // Revert the optimistic update if the mutation fails
        setItems((prevItems) =>
          prevItems.map((prevItem) =>
            prevItem.id === item.id
              ? { ...prevItem, is_alcoholic: item.is_alcoholic }
              : prevItem
          )
        );
        toast.error(`Failed to update ${item.name}`);
      });
  };

  //   handle update description
  const handleUpdateDescription = (id, description) => {
    updateItem({
      id: id,
      item: { description: description },
    })
      .unwrap()
      .then(() => {
        toast.success(`Updated description successfully`);
      })
      .catch((error) => {
        toast.error(`Failed to update description`);
      });
  };

  const handleKeyDown = (e, id, description) => {
    if (e.key === "Enter") {
      handleUpdateDescription(id, description);
    }
  };

  const handleChange = (e, id) => {
    setItemDescription(e.target.value);
  };

  //   handle update item price
  const handleUpdatePrice = (id, price) => {
    updateItem({
      id: id,
      item: { base_price: price },
    })
      .unwrap()
      .then(() => {
        toast.success(`Updated price successfully`);
      })
      .catch((error) => {
        toast.error(`Failed to update price`);
      });
  };

  const handlePriceKeyDown = (e, id, price) => {
    if (e.key === "Enter") {
      handleUpdatePrice(id, price);
    }
  };

  const handlePriceChange = (e, id) => {
    setItemPrice(e.target.value);
  };

  const handleDragStart = (index) => {
    // console.log("Drag started:", index);
    setDraggedItem(index);
  };

  const handleDragEnter = (index) => {
    // console.log("Drag entered:", index);
    setDraggedOverItem(index);
  };

  const handleDragEnd = async () => {
    if (draggedItem !== null && draggedOverItem !== null) {
      const newList = [...items];
      const draggedItemContent = newList[draggedItem];
      newList.splice(draggedItem, 1);
      newList.splice(draggedOverItem, 0, draggedItemContent);
      setItems(newList);

      const updatedCategory = newList[draggedOverItem];
      const data = { showing: draggedOverItem };

      try {
        await updateItemsListOrder({ id: updatedCategory.id, data });
        toast.success("Category order updated successfully");
      } catch (error) {
        toast.error("Failed to update category order");
      }
    }

    setDraggedItem(null);
    setDraggedOverItem(null);
  };

  // const handlePlayPauseToggle = async (item) => {
  //   try {
  //     await updateItem({
  //       id: item?.id,
  //       item: { disabled: !item.disabled },
  //     }).unwrap();
  //     toast.success("Status Updated");
  //   } catch (error) {
  //     console.error("Failed to update the BOGO item: ", error);
  //   }
  // };
  const handlePlayPauseToggle = async (item) => {
    try {
      // Optimistically update the UI state
      setItems((prevItems) =>
        prevItems.map((prevItem) =>
          prevItem.id === item.id
            ? { ...prevItem, disabled: !prevItem.disabled }
            : prevItem
        )
      );

      // Call the mutation to update the item
      await updateItem({
        id: item?.id,
        item: { disabled: !item.disabled },
      }).unwrap();

      toast.success("Status Updated");
    } catch (error) {
      console.error("Failed to update the item: ", error);

      // Revert the optimistic update if the mutation fails
      setItems((prevItems) =>
        prevItems.map((prevItem) =>
          prevItem.id === item.id
            ? { ...prevItem, disabled: item.disabled }
            : prevItem
        )
      );
    }
  };

  // modal for modifier creations
  const modalRef = useRef(null);

  const openModal = () => {
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mt-3">
        <div className="flex gap-2 items-center">
          <label
            onClick={() => setShowAddItemModal(true)}
            htmlFor={
              isEditing ? `add_item_modal_${itemDetails.id}` : "add_item_modal"
            }
            className="btn bg-[#42C2FF] text-white px-4 py-2 rounded-lg"
          >
            + New Item
          </label>
          {/* add modifier  */}
          {/* <label
            onClick={openModal}
            className="btn bg-[#42C2FF] text-white px-4 py-2 rounded-lg"
          >
            + Add Modifier
          </label> */}

          {/* Modal */}
          <ModifierCreationModal ref={modalRef} closeText="close">
            Press ESC key or click outside to close
          </ModifierCreationModal>
        </div>
        <div className="flex items-center">
          <div className="relative">
            <input
              name="items"
              onChange={(e) => setSearchInput(e?.target?.value)}
              type="text"
              placeholder="Search..."
              className="border rounded-l-lg p-1 outline-none px-10 w-[250px]"
            />
            <div className=" absolute top-1 right-3">
              <BiSearch className="text-2xl text-[#697077]" />
            </div>
          </div>
        </div>
      </div>
      <table className="min-w-full border-collapse border border-gray-300 my-6 ">
        <thead>
          <tr className="bg-[#DDE1E6] w-full grid grid-cols-12 items-center">
            <th className="py-2 px-3  text-left col-span-3">Item Name</th>
            <th className="py-2 px-3  text-left col-span-2">Description</th>
            <th className="py-2 px-3  text-left col-span-1">Menus</th>
            <th className="py-2 px-3  text-center col-span-2">Categories</th>
            <th className="py-2 px-3  text-start col-span-1">Price</th>
            <th className="py-2 px-3  text-left col-span-1">PST</th>
            <th className="py-2 px-3  text-center col-span-2">Action</th>
          </tr>
        </thead>
        <div className="w-full">
          <tbody className="w-full">
            {items &&
            items.filter((item) => item?.category?.length > 0).length > 0 ? (
              <InfiniteScroll
                dataLength={items?.length}
                next={fetchMoreData}
                hasMore={hasMore}
                as="table"
              >
                {items
                  .filter((item) => item?.category?.length > 0)
                  ?.map((item, index) => (
                    <tr
                      key={item.id}
                      className={`grid grid-cols-12 items-center text-left bg-gray-300 my-1 cursor-move`}
                      draggable
                      onDragStart={() => handleDragStart(index)}
                      onDragEnter={() => handleDragEnter(index)}
                      onDragEnd={handleDragEnd}
                    >
                      <td className="py-2 px-3 text-left col-span-3">
                        {item?.original_image?.local_url ||
                        item?.original_image?.working_url ? (
                          <div className="grid grid-cols-2 relative">
                            <img
                              className="w-16 h-16 rounded-full m-auto"
                              src={
                                item?.original_image?.local_url ||
                                item?.original_image?.working_url
                              }
                              alt="item/images"
                            />
                            <div className="flex items-center justify-center">
                              <p>{item?.name}</p>
                            </div>
                            {item?.category?.length > 0 ? (
                              <span className="absolute top-0 -left-3 text-sm z-50 px-2 py-[1px] bg-blue-300 rounded-xl">
                                Dish
                              </span>
                            ) : (
                              <span className="absolute top-0 -left-3 text-sm z-50 px-2 py-[1px] bg-red-300 rounded-xl">
                                Modifiers
                              </span>
                            )}
                          </div>
                        ) : (
                          <div className="grid grid-cols-2 relative">
                            <div className="w-full h-full">
                              <FaRegUserCircle className="w-16 h-16 rounded-full m-auto text-gray-300 p-2 bg-gray-200" />
                            </div>
                            <div className="flex items-center justify-center">
                              <p>{item?.name}</p>
                            </div>
                            {item?.category?.length > 0 ? (
                              <span className="absolute top-0 -left-3 text-sm z-50 px-2 py-[1px] bg-blue-300 rounded-xl">
                                Dish
                              </span>
                            ) : (
                              <span className="absolute top-0 -left-3 text-sm z-50 px-2 py-[1px] bg-red-300 rounded-xl">
                                Modifiers
                              </span>
                            )}
                          </div>
                        )}
                      </td>
                      <td className="py-2 px-3 text-left col-span-2">
                        <textarea
                          className="bg-transparent"
                          defaultValue={item.description}
                          placeholder="Type description..."
                          type="text"
                          onChange={(e) => handleChange(e, item?.id)}
                          onKeyDown={(e) =>
                            handleKeyDown(e, item?.id, itemDescription)
                          }
                        />
                      </td>
                      <td className="py-2 px-3 text-left col-span-1">
                        {item.menu_name}
                      </td>
                      <td className="py-2 px-3 text-center col-span-2">
                        {item.category_names}
                      </td>
                      <td className="py-2 px-3 col-span-1">
                        <input
                          className="bg-transparent text-center w-[50px]"
                          defaultValue={item?.base_price}
                          type="number"
                          onChange={(e) => handlePriceChange(e, item?.id)}
                          onKeyDown={(e) =>
                            handlePriceKeyDown(e, item?.id, itemPrice)
                          }
                        />
                      </td>
                      <td className="py-2 px-3 text-center col-span-1">
                        <input
                          type="checkbox"
                          checked={item?.is_alcoholic}
                          onChange={() => handleCheckboxChange(item)}
                          className="checkbox checkbox-accent"
                        />
                      </td>
                      <td className="text-right col-span-2">
                        <div className="flex items-center justify-center gap-2">
                          <label
                            onClick={() => handlePlayPauseToggle(item)}
                            className="bg-[#42C2FF] text-white px-2 py-2 rounded-lg flex items-center gap-2 cursor-pointer"
                          >
                            {!item?.disabled ? (
                              <FaRegStopCircle className="text-2xl cursor-pointer" />
                            ) : (
                              <FaPlay className="text-2xl cursor-pointer" />
                            )}
                          </label>

                          <label
                            onClick={() => handleItemEdit(item)}
                            htmlFor={
                              isEditing
                                ? `add_item_modal_${item.id}`
                                : "add_item_modal"
                            }
                          >
                            <BiEdit className="text-xl text-[#697077 cursor-pointer" />
                          </label>

                          <MdDeleteOutline
                            onClick={() => deleteItem(item.id)}
                            className="text-xl text-[#697077] ml-3 cursor-pointer"
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
              </InfiniteScroll>
            ) : (
              <div className="w-full py-4 text-4xl font-bold pl-5">
                {isLoading ? "Loading..." : <h1>No results found.</h1>}
              </div>
            )}
          </tbody>
        </div>
      </table>
      {showAddItemModal && (
        <AddItemModal
          isEditing={isEditing}
          itemDetails={itemDetails}
          showAddItemModal={showAddItemModal}
          setShowAddItemModal={setShowAddItemModal}
          setSuccess={setSuccess}
          success={success}
          activeSection={activeSection}
        />
      )}
      <EditItemModal
        editItem={editItem}
        setEditItem={setEditItem}
        item={items}
        setItem={setItems}
      />
    </div>
  );
};

export default Items;
