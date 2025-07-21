import React from "react";
import { useCreateCategoryMutation } from "../../../../redux/features/categoryCreation/categoryCreationApi";

const CategoryModal = ({ menu, restaurant, setIsisCategoryModalOpen }) => {
  const [createCategory, { isLoading, isError, error, isSuccess }] =
    useCreateCategoryMutation();
  const handleCategorySubmission = (e) => {
    e.preventDefault();
    const categoryObj = {
      name: e.target.categoryName.value,
      description: e.target.categoryDescription.value,
      menu: menu,
      restaurant: restaurant,
    };
    createCategory(categoryObj);
  };
  if (isSuccess) setIsisCategoryModalOpen(false);
  return (
    <>
      <input type="checkbox" id="categoryModal" className="modal-toggle" />
      <label htmlFor="categoryModal" className="modal cursor-pointer">
        <label className="modal-box relative" htmlFor="">
          {/* form  */}
          <form onSubmit={handleCategorySubmission}>
            <h1 className="text-2xl mb-6 font-bold font-sans">
              Add A Category
            </h1>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Category Name</span>
              </label>
              <input
                name="categoryName"
                type="text"
                placeholder="Category Name"
                className="input input-bordered w-full"
              />
            </div>

            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Description</span>
              </label>
              <textarea
                className="textarea textarea-bordered"
                placeholder="Description"
                name="categoryDescription"
              ></textarea>
            </div>
            <div className="modal-action">
              <label htmlFor="categoryModal">
                <button
                  name="save"
                  className="btn btn-primary text-white"
                  type="submit"
                >
                  Save
                </button>
              </label>
            </div>
          </form>
        </label>
      </label>
    </>
  );
};

export default CategoryModal;
