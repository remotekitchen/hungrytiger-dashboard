import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { BiEdit, BiSearch } from "react-icons/bi";
import { FaPlay, FaRegStopCircle, FaRegUserCircle } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import {
  useDeleteItemMutation,
  useGetItemsWithoutPaginationQuery,
  useUpdateItemMutation,
} from "../../../../redux/features/itemCreation/itemCreationApi";
import {
  useGetAllMenuQuery,
  useGetRestaurentsQuery,
} from "../../../../redux/features/menuCreation/menuCreationApi";
import AddItemModal from "../Modal/AddItemModal";
import EditItemModal from "../Modal/EditItemModal";
import ModifierCreationModalUpdate from "../Modal/ModifierCreationModalUpdate";

const Modifiers = ({ activeSection }) => {
  const [searchInput, setSearchInput] = useState("");
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [editItem, setEditItem] = useState(false);
  const [items, setItems] = useState([]);
  const [restaurant, setRestaurant] = useState(0);
  const [menu, setMenu] = useState(0);
  const [isDataRefetching, setIsDataRefetching] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  console.log(selectedImage, "selectedImage_From_Modifiers");
  const { selectedItemForEdit: selectedItemForEditSelector } = useSelector(
    (state) => state.itemCreation
  );
  const [isEditing, setIsEditing] = useState(false);
  const [itemDetails, setItemDetails] = useState();
  const dispatch = useDispatch();
  const [deletingItemId, setDeletingItemId] = useState(null);
  const [itemName, setItemName] = useState("");
  const [itemImage, setItemImage] = useState("");

  const {
    data: itemsWithoutPagination,
    isLoading,
    refetch,
  } = useGetItemsWithoutPaginationQuery({
    restaurantId: restaurant,
    // menuId: menu,
  });
  // Restaurant API
  const { data: restaurantList } = useGetRestaurentsQuery();
  // menus
  const { data: allMenus } = useGetAllMenuQuery({ restaurantId: restaurant });

  // console.log("🚀 ~ ItemsWithoutPagination ~ allMenus:", allMenus);

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
          .filter((item) => !item?.category?.length)
          .filter((item) =>
            item?.name?.toLowerCase().includes(searchInput.toLowerCase())
          )
      );
    }
  }, [itemsWithoutPagination, searchInput]);

  const [updateItem] = useUpdateItemMutation();
  const [deleteItem] = useDeleteItemMutation();

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

  const handleDelete = async (itemId) => {
    setDeletingItemId(itemId);
    try {
      await deleteItem(parseInt(itemId));
    } catch (error) {
      console.error("Failed to delete the item:", error);
    } finally {
      setDeletingItemId(null);
      toast.success("Item deleted successfully");
      refetch(); // Refetch data after deletion
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
            onClick={openModal}
            className="btn bg-[#42C2FF] text-white px-4 py-2 rounded-lg"
          >
            + Add Modifier
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

          <ModifierCreationModalUpdate ref={modalRef} closeText="close">
            Press ESC key or click outside to close
          </ModifierCreationModalUpdate>
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
          <tr className="bg-[#DDE1E6] w-full grid grid-cols-4 items-center">
            <th className="py-2 px-3 text-left">Item Name</th>
            <th className="py-2 px-3 text-start">Price</th>
            <th className="py-2 px-3 text-left">PST</th>
            <th className="py-2 px-3 text-center">Action</th>
          </tr>
        </thead>
        <tbody className="w-full">
          {items && items.length > 0 ? (
            items.map((item, index) => (
              <tr
                key={item.id}
                className="grid grid-cols-4 items-center text-left bg-gray-300 my-1 cursor-move"
              >
                <td className="py-2 px-3 text-left">
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
                      {/* editable field */}
                      <div className="">
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
                {/* editable field */}
                <td className="py-2 px-3">{item?.base_price}</td>
                <td className="py-2 px-3">
                  <input
                    type="checkbox"
                    checked={item?.is_alcoholic}
                    onChange={() => handleCheckboxChange(item)}
                    className="checkbox checkbox-accent"
                  />
                </td>
                <td className="text-right">
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
            <tr>
              {/* <td
                colSpan="4"
                className="py-4 text-lg md:text-3xl lg:md:text-3xl font-bold pl-5"
              >
                {isLoading || isDataRefetching ? (
                  "Loading..."
                ) : (
                  <>
                    No results found {searchInput && "on this name"}
                    {searchInput && (
                      <span className="font-semibold px-2 border-2 ml-3 border-gray-500 rounded">
                        {searchInput}
                      </span>
                    )}
                  </>
                )}
              </td> */}
            </tr>
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
                {" "}
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
          itemName={itemName}
          setItemName={setItemName}
          itemImage={itemImage}
          setItemImage={setItemImage}
          selectedImage={selectedImage}
          setSelectedImage={setSelectedImage}
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

export default Modifiers;
