import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { BiEdit, BiSearch } from "react-icons/bi";
import { FaPlay, FaRegStopCircle, FaRegUserCircle } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch } from "react-redux";
import Loading from "../../../Components/Loading";
import {
  useDeleteItemMutation,
  useGetItemsWithoutPaginationQuery,
  useUpdateItemMutation,
} from "../../../redux/features/itemCreation/itemCreationApi";
import { useGetRestaurentsQuery } from "../../../redux/features/menuCreation/menuCreationApi";
import AddItemModal from "./Modal/AddItemModal";
import EditItemModal from "./Modal/EditItemModal";
import ModifierCreationModal from "./Modal/ModifierCreationModal";

const CategoryWiseItems = ({ categories, expandedCategory, activeSection }) => {
  // console.log(activeSection, 'activeSection in menu');
  const [searchInput, setSearchInput] = useState("");
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [editItem, setEditItem] = useState(false);
  const [items, setItems] = useState([]);
  const [isDataRefetching, setIsDataRefetching] = useState(false);
  const [itemDescription, setItemDescription] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [itemDetails, setItemDetails] = useState(null);
  const [deletingItemId, setDeletingItemId] = useState(null);
  // Track which category is expanded
  const [expandedItems, setExpandedItems] = useState({}); // Track which item descriptions are expanded
  const [restaurant, setRestaurant] = useState(0);

  const dispatch = useDispatch();

  const { data: restaurantList } = useGetRestaurentsQuery();

  const {
    data: itemsWithoutPagination,
    isLoading,
    refetch,
  } = useGetItemsWithoutPaginationQuery({
    restaurantId: restaurant,
  });

  useEffect(() => {
    if (restaurantList?.results?.length) {
      setRestaurant(restaurantList.results[0].id);
    }
  }, [restaurantList]);

  useEffect(() => {
    if (itemsWithoutPagination) {
      setItems(
        itemsWithoutPagination
          .filter((item) => item?.category?.length > 0)
          .filter((item) =>
            item?.name?.toLowerCase().includes(searchInput.toLowerCase())
          )
      );
    }
  }, [itemsWithoutPagination, searchInput]);

  const [updateItem] = useUpdateItemMutation();
  const [deleteItem, { isLoading: isDeleteLoading }] = useDeleteItemMutation();

  useEffect(() => {
    if (itemDetails) {
      setShowAddItemModal(true);
    }
  }, [itemDetails]);

  const handleItemEdit = (item) => {
    setShowAddItemModal(true);
    setTimeout(() => {
      setIsEditing(true);
      setItemDetails(item);
    }, 100);
  };

  // console.log(itemDetails, 'CategorywiseItems');

  const handleDelete = async (itemId) => {
    setDeletingItemId(itemId);
    try {
      await deleteItem(parseInt(itemId));
      toast.success("Item deleted successfully");
    } catch (error) {
      console.error("Failed to delete the item:", error);
    } finally {
      setDeletingItemId(null);
    }
  };

  const handleCheckboxChange = (item) => {
    setItems((prevItems) =>
      prevItems.map((prevItem) =>
        prevItem.id === item.id
          ? { ...prevItem, is_alcoholic: !prevItem.is_alcoholic }
          : prevItem
      )
    );

    updateItem({
      id: item.id,
      item: { is_alcoholic: !item.is_alcoholic },
    })
      .unwrap()
      .then(() => {
        toast.success(`Updated ${item.name} successfully`);
      })
      .catch(() => {
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

  const handleUpdateDescription = (id, description) => {
    setIsDataRefetching(true);
    updateItem({
      id: id,
      item: { description: description },
    })
      .unwrap()
      .then(() => {
        toast.success(`Updated description successfully`);
        setIsDataRefetching(false);
      })
      .catch(() => {
        toast.error(`Failed to update description`);
        setIsDataRefetching(false);
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

  const handleUpdatePrice = (id, price) => {
    setIsDataRefetching(true);
    updateItem({
      id: id,
      item: { base_price: price },
    })
      .unwrap()
      .then(() => {
        toast.success(`Updated price successfully`);
        setIsDataRefetching(false);
      })
      .catch(() => {
        toast.error(`Failed to update price`);
        setIsDataRefetching(false);
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

  const handlePlayPauseToggle = async (item) => {
    try {
      setItems((prevItems) =>
        prevItems.map((prevItem) =>
          prevItem.id === item.id
            ? { ...prevItem, disabled: !prevItem.disabled }
            : prevItem
        )
      );

      await updateItem({
        id: item?.id,
        item: { disabled: !item.disabled },
      }).unwrap();

      toast.success("Status Updated");
    } catch (error) {
      console.error("Failed to update the item: ", error);

      setItems((prevItems) =>
        prevItems.map((prevItem) =>
          prevItem.id === item.id
            ? { ...prevItem, disabled: item.disabled }
            : prevItem
        )
      );
    }
  };

  const modalRef = useRef(null);

  const openModal = () => {
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  };

  const toggleDescription = (itemId) => {
    setExpandedItems((prevExpandedItems) => ({
      ...prevExpandedItems,
      [itemId]: !prevExpandedItems[itemId],
    }));
  };

  // console.log(items, 'CategorywiseItems');

  return (
    <div>
      <div className="flex justify-between items-center mt-3">
        <div className="flex gap-2 items-center">
          <label
            onClick={() => {
              setShowAddItemModal(true);
              setIsEditing(false);
            }}
            htmlFor={
              isEditing ? `add_item_modal_${itemDetails?.id}` : "add_item_modal"
            }
            className="btn bg-[#42C2FF] text-white px-4 py-2 rounded-lg"
          >
            + New Item
          </label>
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
            <div className="absolute top-1 right-3">
              <BiSearch className="text-2xl text-[#697077]" />
            </div>
          </div>
        </div>
      </div>

      {categories.map((category) => (
        <div key={category.id} className="my-2">
          {expandedCategory === category.id && (
            <div className="p-2">
              {isLoading ? (
                <Loading />
              ) : (
                <table className="min-w-full  border border-gray-300 my-6">
                  <thead>
                    <tr className="bg-[#DDE1E6] w-full grid grid-cols-12 items-center">
                      <th className="py-2 px-3 text-left col-span-3">
                        Item Name
                      </th>
                      <th className="py-2 px-3 text-left col-span-2">
                        Description
                      </th>
                      <th className="py-2 px-3 text-left col-span-1">Menus</th>
                      <th className="py-2 px-3 text-center col-span-2">
                        Categories
                      </th>
                      <th className="py-2 px-3 text-start col-span-1">Price</th>
                      <th className="py-2 px-3 text-left col-span-1">PST</th>
                      <th className="py-2 px-3 text-center col-span-2">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {items
                      .filter((item) => category.menuItemSet?.includes(item.id))
                      .map((item) => (
                        <tr
                          key={item.id}
                          className="grid grid-cols-12 items-center text-left bg-gray-300 my-1"
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
                            {expandedItems[item.id]
                              ? item?.description
                              : `${item?.description?.slice(0, 30)}`}
                            {item?.description?.length > 30 && (
                              <button
                                onClick={() => toggleDescription(item.id)}
                                className="text-blue-500 ml-2 underline"
                              >
                                {expandedItems[item.id]
                                  ? "...see less"
                                  : "see more"}
                              </button>
                            )}
                          </td>
                          <td className="py-2 px-3 text-left col-span-1">
                            {item.menu_name}
                          </td>
                          <td className="py-2 px-3 text-center col-span-2">
                            {item.category_names}
                          </td>
                          <td className="py-2 px-3 col-span-1">
                            {item?.base_price}
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

                              {parseInt(deletingItemId) ===
                                parseInt(item?.id) || isLoading ? (
                                <button className="btn">
                                  <span className="loading loading-spinner"></span>
                                </button>
                              ) : (
                                <MdDeleteOutline
                                  onClick={() => handleDelete(item?.id)}
                                  className="text-xl text-[#697077] ml-3 cursor-pointer"
                                />
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              )}
            </div>
          )}
        </div>
      ))}

      {showAddItemModal && (
        <AddItemModal
          isEditing={isEditing}
          itemDetails={itemDetails}
          showAddItemModal={showAddItemModal}
          setShowAddItemModal={setShowAddItemModal}
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

export default CategoryWiseItems;
