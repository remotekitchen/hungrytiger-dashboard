import React, { useState } from "react";
import {
  AiFillDelete,
  AiFillEdit,
  AiOutlinePlusCircle,
  AiFillEye,
} from "react-icons/ai";
import { BiCategoryAlt, BiPlus } from "react-icons/bi";
import CategoryModal from "./CategoryModal/CategoryModal";
import { useGetCategoryQuery } from "../../../redux/features/categoryCreation/categoryCreationApi";
import ItemModal from "./ItemModal/ItemModal";
import { useNavigate } from "react-router-dom";
import ItemListModal from "./ItemModal/ItemListModal";
const MenuCard = ({ item }) => {
  const [refetchToggle, setRefetchToggle] = useState(false);
  const { title, id, description, restaurant, company, cuisine_types } = item;
  const navigate = useNavigate();
  // get all menus
  const [categoryId, setCategoryId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isItemListModalOpen, setIsItemListModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsisCategoryModalOpen] = useState(false);
  // modal for creating item
  const handleModalOpen = (id) => {
    setIsModalOpen(true);
    setCategoryId(id);
  };

  // modal for viewing all the items alongside the menu
  const handleItemListModalOpen = (id) => {
    setIsItemListModalOpen(true);
    setRefetchToggle(!refetchToggle);
    setCategoryId(id);
  };
  const {
    data: allCategories,
    isLoading,
    isError,
    error,
  } = useGetCategoryQuery(id);
  let displayableContent;
  if (isLoading) displayableContent = <li>Loading...</li>;
  else if (isError)
    displayableContent = <li>Something went wrong loading the categories</li>;
  else if (allCategories.results.length === 0)
    displayableContent = <option>No category available right now</option>;
  else
    displayableContent = (
      <div className="">
        {allCategories.results.map((category) => (
          <div
            key={category.id}
            className="flex items-center justify-between my-2"
          >
            <li>{category.name}</li>
            <div className="">
              <div className="tooltip mx-2" data-tip="Add An Item">
                <label
                  onClick={() => handleModalOpen(category.id)}
                  htmlFor="itemModal"
                  className="btn common_button_shadow btn-primary text-white btn-sm"
                >
                  Item
                  <BiPlus />
                </label>
              </div>
              <div
                className="tooltip"
                data-tip="View All Items for this category"
              >
                <label
                  onClick={() => handleItemListModalOpen(category.id)}
                  htmlFor={`itemListModal-${item.id}-${category.id}`}
                  className="btn common_button_shadow btn-primary text-white btn-sm "
                >
                  View
                  <AiFillEye />
                </label>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  return (
    <>
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <div className="flex items-center justify-between mb-8">
            <h1 className="card-title text-3xl">{title}</h1>
            {/* <AiFillDelete className="text-error" size={24} /> */}
          </div>
          <div>{displayableContent}</div>
          <div className="card-actions justify-end">
            <div className="tooltip" data-tip="Add A Category">
              <label
                onClick={() => setIsisCategoryModalOpen(true)}
                htmlFor="categoryModal"
                className="btn btn-primary common_button_shadow btn-sm text-white "
              >
                Category
                <BiPlus />
              </label>
            </div>
          </div>
          <button
            name="show-details"
            onClick={() => navigate(`/menus/all-menus/${id}`)}
            className="btn btn-primary btn-sm bg-white text-black hover:bg-primary hover:text-white"
          >
            Show Menu Details
          </button>
        </div>
        <div></div>
      </div>
      {isCategoryModalOpen && (
        <CategoryModal
          setIsisCategoryModalOpen={setIsisCategoryModalOpen}
          isCategoryModalOpen={isCategoryModalOpen}
          menu={id}
          restaurant={restaurant}
        />
      )}
      {isModalOpen && (
        <ItemModal
          setIsModalOpen={setIsModalOpen}
          category={categoryId}
          menu={id}
          restaurant={restaurant}
        />
      )}
      {isItemListModalOpen && (
        <ItemListModal
          refetchToggle={refetchToggle}
          menuId={id}
          categoryId={categoryId}
        />
      )}
    </>
  );
};

export default MenuCard;
