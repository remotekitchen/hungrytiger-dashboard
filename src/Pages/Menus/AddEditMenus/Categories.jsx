import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiEdit, BiSearch } from "react-icons/bi";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { MdDeleteOutline, MdDragIndicator } from "react-icons/md";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../../Components/Loading";
import { createArray } from "../../../core/utils";
import {
  useDeleteCategoryMutation,
  useGetAllCategoryQuery,
} from "../../../redux/features/categoryCreation/categoryCreationApi";
import { selectedCategory } from "../../../redux/features/categoryCreation/categoryCreationSlice";
import { useUpdateCategoryListOrderMutation } from "../../../redux/features/dynamicSorting/dynamicCategorySorting";
import CategoryWiseItems from "./CategoryWiseItems.jsx";
import AddCategoryModal from "./Modal/AddCategoryModal";
import EditCategoryModal from "./Modal/EditCategoryModal";

const Categories = (activeSection) => {
  //   console.log(activeSection, "activeSection");
  const [searchInput, setSearchInput] = useState("");
  const [addCategoryModal, setAddCategoryModal] = useState(false);
  const [editCategoryModal, setEditCategoryModal] = useState(false);
  const [categoryItem, setCategoryItem] = useState(""); // Correctly initialize state here
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [selectedPage, setSelectedPage] = useState(1);
  const [items, setItems] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [index, setIndex] = useState(2);
  const [expandedItems, setExpandedItems] = useState({});
  const [draggedItem, setDraggedItem] = useState(null);
  const [draggedOverItem, setDraggedOverItem] = useState(null);
  const [expandedCategory, setExpandedCategory] = useState(null);

  const dispatch = useDispatch();
  const handleCategoryEdit = (item) => {
    setShowAddCategoryModal(true);
    dispatch(selectedCategory({ isEditing: true, selectedCategoryData: item }));
  };

  const [deleteCategory, { isSuccess }] = useDeleteCategoryMutation();
  const [updateCategoryListOrder] = useUpdateCategoryListOrderMutation();

  useEffect(() => {
    if (isSuccess) toast.success("Successfully deleted a Category");
  }, [isSuccess]);

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("auth")).token;
        let baseUrl = import.meta.env.VITE_API_ROOT;
        const response = await axios.get(
          `${baseUrl}api/food/v1/category/?page=1`,
          {
            headers: {
              Authorization: `token ${token}`,
            },
          }
        );
        setItems(response.data.results); // Assuming 'results' contains the array of items
      } catch (err) {
        // console.log(err);
      }
    };

    fetchInitialData();
  }, []);

  const fetchMoreData = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("auth")).token;
      let baseUrl = import.meta.env.VITE_API_ROOT;
      const response = await axios.get(
        `${baseUrl}api/food/v1/category/?page=${index}`,
        {
          headers: {
            Authorization: `token ${token}`,
          },
        }
      );
      setItems((prevItems) => [...prevItems, ...response.data.results]); // Assuming 'results' contains the array of items
      setHasMore(response.data.results.length > 0);
      setIndex((prevIndex) => prevIndex + 1);
    } catch (err) {
      // console.log(err);
    }
  };

  const {
    data: allCategory,
    isLoading,
    isError,
    error,
  } = useGetAllCategoryQuery({ selectedPage, searchInput });

  const { selectedCategory: selectedCategorySelector } = useSelector(
    (state) => state.categoryCreation
  );
  const { isEditing, categoryDetails } = selectedCategorySelector;
  if (isLoading) return <Loading />;

  const pageArr = createArray(allCategory);

  const handleDragStart = (index) => {
    // console.log('Drag started:', index);
    setDraggedItem(index);
  };

  const handleDragEnter = (index) => {
    // console.log('Drag entered:', index);
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
        await updateCategoryListOrder({ id: updatedCategory.id, data });
        toast.success("Category order updated successfully");
      } catch (error) {
        toast.error("Failed to update category order");
      }
    }

    setDraggedItem(null);
    setDraggedOverItem(null);
  };

  // Function to toggle the expansion of an item
  // const toggleItemExpansion = (index) => {
  // 	setExpandedItems((prev) => ({
  // 		...prev,
  // 		[index]: !prev[index], // Toggle the current item's expansion state
  // 	}));
  // };

  // console.log(items, 'items');

  const formattedCategories = items.map((item) => ({
    id: item.id,
    name: item.name,
    menuItemSet: item.menuitem_set,
  }));

  const handleCategoryClick = (categoryId) => {
    setExpandedCategory(categoryId);
  };

  // console.log(
  // 	expandedCategory,
  // 	items.map((item) => item.id),
  // 	'expandedCategory'
  // );

  return (
    <div>
      <div className="flex justify-between items-center mt-3">
        <label
          onClick={() => {
            setShowAddCategoryModal(true);
          }}
          htmlFor={
            isEditing
              ? `add_category_modal_${categoryDetails.id}`
              : "add_category_modal"
          }
          className="btn bg-[#42C2FF] text-white px-4 py-2 rounded-lg"
        >
          + New Category
        </label>
        <div className="flex items-center">
          <div className="relative">
            <input
              name="category"
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
          <div>
            <tr className="bg-[#DDE1E6] w-full grid grid-cols-4">
              <th className="py-2 px-3 text-left">Category Name</th>
              <th className="py-2 px-3 text-left">Menus</th>
              <th className="py-2 px-3 text-left">Items</th>
              <th className="py-2 px-3 text-right ">Action</th>
            </tr>
          </div>
        </thead>
        <tbody className="space-y-2 mb-2">
          <InfiniteScroll
            dataLength={items.length}
            next={fetchMoreData}
            hasMore={hasMore}
            as="table"
          >
            {items &&
              items?.map((item, index) => (
                <details
                  onClick={() => handleCategoryClick(item.id)}
                  className="collapse w-full space-y-2"
                  key={item.id}
                >
                  <summary className="collapse-title bg-gray-200 cursor-pointer my-2 rounded-none">
                    <tr
                      className="w-full grid grid-cols-4 ml-2"
                      draggable
                      onDragStart={() => handleDragStart(index)}
                      onDragEnter={() => handleDragEnter(index)}
                      onDragEnd={handleDragEnd}
                    >
                      <td className="py-2 px-3 flex items-center gap-2">
                        <span>
                          <MdDragIndicator className="text-2xl" />
                        </span>
                        <span>{item.name}</span>
                      </td>
                      <td className="py-2 px-3">{item.menu_name}</td>
                      <td className="py-2 px-3">{item.menuitem_cnt}</td>
                      <td className="flex items-center justify-end py-2 px-3">
                        <div className="flex items-center">
                          <label
                            onClick={() => handleCategoryEdit(item)}
                            htmlFor={
                              isEditing
                                ? `add_category_modal_${item.id}`
                                : "add_category_modal"
                            }
                          >
                            <BiEdit className="text-xl text-[#697077] cursor-pointer" />
                          </label>
                          <MdDeleteOutline
                            onClick={() => deleteCategory(item.id)}
                            className="text-xl text-[#697077] ml-3 cursor-pointer"
                          />
                          {expandedCategory === item.id ? (
                            <IoIosArrowUp
                              onClick={() => setExpandedCategory("")}
                              className="text-2xl ml-3 cursor-pointer"
                            />
                          ) : (
                            <IoIosArrowDown
                              onClick={() => handleCategoryClick(item.id)}
                              className="text-2xl ml-3 cursor-pointer"
                            />
                          )}
                        </div>
                      </td>
                    </tr>
                  </summary>
                  <div className="collapse-content">
                    {expandedCategory === item.id && (
                      <CategoryWiseItems
                        activeSection={activeSection}
                        categories={formattedCategories}
                        expandedCategory={expandedCategory}
                      />
                    )}
                  </div>
                </details>
              ))}
          </InfiniteScroll>
        </tbody>
      </table>
      {showAddCategoryModal && (
        <AddCategoryModal
          isEditing={isEditing}
          categoryDetails={categoryDetails}
          addCategoryModal={addCategoryModal}
          setAddCategoryModal={setAddCategoryModal}
          setShowAddCategoryModal={setShowAddCategoryModal}
          categoryItem={categoryItem}
          setCategoryItem={setCategoryItem}
        />
      )}
      <EditCategoryModal
        editCategoryModal={editCategoryModal}
        setEditCategoryModal={setEditCategoryModal}
        categoryItem={categoryItem}
        setCategoryItem={setCategoryItem} // Ensure this prop is passed correctly
      />
    </div>
  );
};

export default Categories;
