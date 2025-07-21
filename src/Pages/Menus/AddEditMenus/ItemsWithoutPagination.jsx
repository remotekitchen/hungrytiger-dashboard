import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { BiEdit, BiSearch } from "react-icons/bi";
import { FaPlay, FaRegStopCircle, FaRegUserCircle } from "react-icons/fa";
import { IoSparkles } from "react-icons/io5";
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useUpdateItemsListOrderMutation } from "../../../redux/features/dynamicSorting/dynamicItemsSorting";
import {
  useDeleteItemMutation,
  useGetItemsWithoutPaginationQuery,
  useUpdateItemMutation,
} from "../../../redux/features/itemCreation/itemCreationApi";
import {
  useGetAllMenuQuery,
  useGetRestaurentsQuery,
} from "../../../redux/features/menuCreation/menuCreationApi";
import AddItemModal from "./Modal/AddItemModal";
import AiGeneratedModal from "./Modal/AiGeneratedModal";
import EditItemModal from "./Modal/EditItemModal";
import ModifierCreationModal from "./Modal/ModifierCreationModal";

const ItemsWithoutPagination = ({ handleSection, activeSection }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [itemName, setItemName] = useState("");
  const [itemImage, setItemImage] = useState("");
  const [searchInput, setSearchInput] = useState("");
  // console.log("🚀 ~ ItemsWithoutPagination ~ searchInput:", searchInput);
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [editItem, setEditItem] = useState(false);
  const [items, setItems] = useState([]);
  const [isDataRefetching, setIsDataRefetching] = useState(false); // New state to handle refetching
  const [itemDescription, setItemDescription] = useState("");
  const [itemPrice, setItemPrice] = useState("");
  const [restaurant, setRestaurant] = useState(0);
  const [menu, setMenu] = useState(0);
  // console.log("🚀 ~ ItemsWithoutPagination ~ restaurant:", restaurant);
  const { selectedItemForEdit: selectedItemForEditSelector } = useSelector(
    (state) => state.itemCreation
  );
  //   const { isEditing, itemDetails } = selectedItemForEditSelector;
  const [isEditing, setIsEditing] = useState(false);
  const [itemDetails, setItemDetails] = useState();
  // console.log("🚀 ~ ItemsWithoutPagination ~ itemDetails:", itemDetails);
  const dispatch = useDispatch();
  const [deletingItemId, setDeletingItemId] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  // Restaurant API
  const { data: restaurantList } = useGetRestaurentsQuery();
  // menus
  const { data: allMenus } = useGetAllMenuQuery({ restaurantId: restaurant });

  const {
    data: itemsWithoutPagination,
    isLoading,
    refetch,
  } = useGetItemsWithoutPaginationQuery({
    restaurantId: restaurant,
    menuId: parseInt(menu),
  });

  // console.log(itemsWithoutPagination, "itemsWithoutPagination");

  // select default restaurant
  useEffect(() => {
    if (restaurantList?.results?.length) {
      setRestaurant(restaurantList.results[0].id);
    }
  }, [restaurantList]);

  // select default menu
  useEffect(() => {
    if (allMenus?.results?.length) {
      setMenu(allMenus.results[0].id);
    }
  }, [allMenus]);

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
  const [updateItemsListOrder] = useUpdateItemsListOrderMutation();
  const [deleteItem, { isLoading: isDeleteLoading }] = useDeleteItemMutation();

  useEffect(() => {
    if (itemDetails) {
      setShowAddItemModal(true);
    }
  }, [itemDetails]);

  const handleItemEdit = (item) => {
    console.log("🚀 ~ itemDetails_new", item);
    setShowAddItemModal(true);
    setTimeout(() => {
      setIsEditing(true);
      setItemDetails(item);
    }, 100);
    dispatch(selectedItemForEdit({ isEditing: true, selectedItemData: item }));
  };

  const handleDelete = async (itemId) => {
    setDeletingItemId(itemId);
    try {
      await deleteItem(parseInt(itemId));
    } catch (error) {
      console.error("Failed to delete the item:", error);
    } finally {
      setDeletingItemId(null);
      toast.success("Item deleted successfully");
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
    setIsDataRefetching(true); // Indicate that data is refetching
    updateItem({
      id: id,
      item: { description: description },
    })
      .unwrap()
      .then(() => {
        toast.success(`Updated description successfully`);
        setIsDataRefetching(false); // Data refetching completed
      })
      .catch(() => {
        toast.error(`Failed to update description`);
        setIsDataRefetching(false); // Data refetching completed
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
    setIsDataRefetching(true); // Indicate that data is refetching
    updateItem({
      id: id,
      item: { base_price: price },
    })
      .unwrap()
      .then(() => {
        toast.success(`Updated price successfully`);
        setIsDataRefetching(false); // Data refetching completed
      })
      .catch(() => {
        toast.error(`Failed to update price`);
        setIsDataRefetching(false); // Data refetching completed
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

  // const handleDragStart = (index) => {
  // 	setDraggedItem(index);
  // };

  // const handleDragEnter = (index) => {
  // 	setDraggedOverItem(index);
  // };

  // const handleDragEnd = async () => {
  // 	if (draggedItem !== null && draggedOverItem !== null) {
  // 		const newList = [...items];
  // 		const draggedItemContent = newList[draggedItem];
  // 		newList.splice(draggedItem, 1);
  // 		newList.splice(draggedOverItem, 0, draggedItemContent);
  // 		setItems(newList);

  // 		const updatedCategory = newList[draggedOverItem];
  // 		const data = { showing: draggedOverItem };

  // 		try {
  // 			await updateItemsListOrder({ id: updatedCategory.id, data });
  // 			toast.success('Category order updated successfully');
  // 		} catch (error) {
  // 			toast.error('Failed to update category order');
  // 		}
  // 	}

  // 	// setDraggedItem(null);
  // 	// setDraggedOverItem(null);
  // };

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
          {/* select restaurant  */}
          <div className="px-2 py-2 bg-transparent rounded-md w-48">
            <select
              className="select select-bordered w-full"
              name="restaurant"
              value={restaurant}
              onChange={(e) => setRestaurant(parseFloat(e.target.value))}
            >
              <option selected value={0}>
                Select Restaurant
              </option>
              {restaurantList?.results?.map((res) => (
                <option key={res.id} value={res.id}>
                  {res.name}
                </option>
              ))}
            </select>
          </div>
          {/* select menu  */}
          <div className="form-control w-48">
            <select
              className="select select-bordered w-full"
              name="menu"
              value={menu}
              // Assign the state value to the select element
              onChange={(e) => {
                setMenu(e.target.value);
                // setMenuName(e.target.id);
              }}
            >
              <option selected>Select Menu</option>
              {allMenus?.results?.map((menu) => (
                <option key={menu.id} value={menu.id}>
                  {menu.title}
                </option>
              ))}
            </select>
          </div>
          {/* set ai-generated image for empty items */}
          <div
            onClick={() => document.getElementById("my_modal_001").showModal()}
            className="px-5 py-3 rounded bg-gray-300 flex items-center gap-2 cursor-pointer"
          >
            <span>
              <IoSparkles className="text-gray-500" />
            </span>{" "}
            Ai Generate Image
          </div>

          {/* <AiImageGenerationV2 /> */}

          <AiGeneratedModal
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
            itemImage={itemImage}
            setItemImage={setItemImage}
            itemName={itemName}
            setItemName={setItemName}
          />

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
      <table className="min-w-full border-collapse border border-gray-300 my-6">
        <thead>
          <tr className="bg-[#DDE1E6] w-full grid grid-cols-12 items-center">
            <th className="py-2 px-3 text-left col-span-3">Item Name</th>
            <th className="py-2 px-3 text-left col-span-2">Description</th>
            <th className="py-2 px-3 text-left col-span-1">Menus</th>
            <th className="py-2 px-3 text-center col-span-2">Categories</th>
            <th className="py-2 px-3 text-start col-span-1">Price</th>
            <th className="py-2 px-3 text-left col-span-1">PST</th>
            <th className="py-2 px-3 text-center col-span-2">Action</th>
          </tr>
        </thead>
        <tbody className="w-full">
          {items && items.length > 0 ? (
            items.map((item, index) => (
              <tr
                key={item.id}
                className="grid grid-cols-12 items-center text-left bg-gray-300 my-1"
                // draggable
                // onDragStart={() => handleDragStart(index)}
                // onDragEnter={() => handleDragEnter(index)}
                // onDragEnd={handleDragEnd}
              >
                <td className="py-2 px-3 text-left col-span-3">
                  {item?.original_image?.local_url ||
                  item?.original_image?.working_url ||
                  item?.images?.[0]?.local_url ||
                  item?.images?.[0]?.working_url ? (
                    <div className="grid grid-cols-2 relative">
                      <img
                        className="w-16 h-16 rounded-full object-cover m-auto"
                        src={
                          item?.original_image?.local_url ||
                          item?.original_image?.working_url ||
                          item?.images?.[0]?.local_url ||
                          item?.images?.[0]?.working_url
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
                  {isExpanded
                    ? item?.description
                    : `${item?.description?.slice(0, 30)}`}
                  {item?.description?.length > 30 && (
                    <button
                      onClick={toggleDescription}
                      className="text-blue-500 ml-2 underline"
                    >
                      {isExpanded ? "...see less" : "see more"}
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
                  {/* <input
                    className="bg-transparent text-center w-[50px]"
                    defaultValue={item?.base_price}
                    type="number"
                    onChange={(e) => handlePriceChange(e, item?.id)}
                    onKeyDown={(e) =>
                      handlePriceKeyDown(e, item?.id, itemPrice)
                    }
                  /> */}
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

                    {parseInt(deletingItemId) === parseInt(item?.id) ||
                    isLoading ? (
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
            ))
          ) : (
            // <tr>
            //   <td
            //     colSpan="4"
            //     className="py-4 text-lg md:text-3xl lg:md:text-3xl font-bold pl-5"
            //   >
            //     {isLoading || isDataRefetching ? (
            //       <div>Hello Loading</div>
            //     ) : (
            //       <>
            //         No results found {searchInput && "on this name"}
            //         {searchInput && (
            //           <span className="font-semibold px-2 border-2 ml-3 border-gray-500 rounded">
            //             {searchInput}
            //           </span>
            //         )}
            //       </>
            //     )}
            //   </td>
            // </tr>
            <tr></tr>
          )}
        </tbody>
      </table>
      <div
        className={`w-full flex justify-center items-center bg-white ${
          items.length === 0 ? "h-96" : ""
        }`}
      >
        {isLoading || isDataRefetching ? (
          <img className="h-36" src="/searching.gif" alt="loading/image" />
        ) : (
          items.length === 0 && (
            <div>
              <div className="flex flex-col items-center w-full justify-center">
                <img className="h-36" src="/not_found.png" alt="" />
                <h1 className="text-4xl my-3 font-bold text-[#4E5E8C]">
                  SORRY!
                </h1>
              </div>
              <span className="font-medium">
                No results found {searchInput && "on this name"}
              </span>
              {searchInput && (
                <span className="font-semibold px-2 border-2 ml-3 border-gray-500 rounded">
                  {searchInput}
                </span>
              )}
            </div>
          )
        )}
      </div>

      {showAddItemModal && (
        <AddItemModal
          isEditing={isEditing}
          itemDetails={itemDetails}
          showAddItemModal={showAddItemModal}
          setShowAddItemModal={setShowAddItemModal}
          activeSection={activeSection}
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
          itemImage={itemImage}
          setItemImage={setItemImage}
          itemName={itemName}
          setItemName={setItemName}
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

export default ItemsWithoutPagination;
