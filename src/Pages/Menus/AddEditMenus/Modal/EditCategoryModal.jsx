import React, { useEffect, useRef } from 'react'
import { useUpdateCategoryMutation } from '../../../../redux/features/categoryCreation/categoryCreationApi';
import toast from 'react-hot-toast';

const EditCategoryModal = ({
    editCategoryModal,
    setEditCategoryModal,
    categoryItem,
    setCategoryItem
}) => {
    const editCategoryRef = useRef();

    useEffect(() => {
        setCategoryItem(categoryItem)
    }, [categoryItem]);

    const handleEditDataChange = (e) => {
        const { name, value } = e.target;
        setCategoryItem({
            ...categoryItem,
            [name]: value,
        });
    };

    const [updateCategory, { isLoading, isError, isSuccess, data }] =
    useUpdateCategoryMutation();

    const handleEditSubmit = (e) => {
        e.preventDefault();

        updateCategory({
            id: categoryItem.id,
            categoryItem
        });
    };

    useEffect(() => {
        if (isSuccess) toast.success("Successfully Update a Category");
        setEditCategoryModal(false);
    }, [isSuccess]);

    useEffect(() => {
        const checkIfClickedOutside = (e) => {
            if (
                editCategoryModal &&
                editCategoryRef.current &&
                !editCategoryRef.current.contains(e.target)
            ) {
                setEditCategoryModal(false);
            }
        };

        document.addEventListener("mousedown", checkIfClickedOutside);

        return () => {
            // Cleanup the event listener
            document.removeEventListener("mousedown", checkIfClickedOutside);
        };
    }, [editCategoryModal, setEditCategoryModal]);
    return (
        <div
            className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  ${editCategoryModal
                ? "w-full justify-center items-center flex backdrop-blur bg-black/20 h-screen z-10"
                : "z-[-10]"
                }`}>
            <div
                ref={editCategoryRef}
                className={` transition-all duration-300 ${editCategoryModal ? "scale-100" : "scale-0"
                    }`}>
                <div className='p-4  bg-white shadow-md rounded-lg w-[60vh] '>
                    <form onSubmit={handleEditSubmit}>
                        <h1 className="text-2xl mb-6 font-bold font-sans">
                            Edit A Category
                        </h1>
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Category Name</span>
                            </label>
                            <input
                                name="name"
                                type="text"
                                value={categoryItem?.name || ""}
                                onChange={handleEditDataChange}
                                placeholder="Category Name"
                                className="input input-bordered w-full"
                            />
                        </div>

                        {/* <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Description</span>
                            </label>
                            <textarea
                                className="textarea textarea-bordered"
                                placeholder="Description"
                                name="categoryDescription"
                            ></textarea>
                        </div> */}
                        <div className="modal-action">
                            <label htmlFor="categoryModal">
                                <button
                                    name="save"
                                    className="bg-[#42C2FF] text-white px-4 py-2 rounded-lg mt-2"
                                    type="submit"
                                >
                                    + Edit New Category
                                </button>
                            </label>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditCategoryModal