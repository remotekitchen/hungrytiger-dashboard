import React, { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import SingleCustomSelect from "../../../../Components/SingleCustomSelect";
import demoImage from "../../../../assets/demo.png";
import {
  useGetCategoryQuery,
  useGetMoreCategoryQuery,
} from "../../../../redux/features/categoryCreation/categoryCreationApi";
import {
  useCreateItemMutation,
  useDeleteModifierItemMutation,
  useGetAllItemsQuery,
  useGetItemDetailsQuery,
  useUpdateItemMutation,
} from "../../../../redux/features/itemCreation/itemCreationApi";
import { selectedItemForEdit } from "../../../../redux/features/itemCreation/itemCreationSlice";
import { useGetAllMenuQuery } from "../../../../redux/features/menuCreation/menuCreationApi";
import { useGetModifierGroupQuery } from "../../../../redux/features/modifierGroup/modifierGroupApi";
import { useGetAllRestaurantQuery } from "../../../../redux/features/restaurentCreation/restaurentCreationApi";
import EditItemModifierGroupSelect from "../../../Marketing/Rewards/components/RewardTypeCards/EditItemModifierGroupSelect";
import AiGeneratedImage from "../components/AiGeneratedImage";
import ModifierList from "./ModifierList";

const AddItemModal = ({
  setShowAddItemModal,
  isEditing,
  itemDetails,
  // setSuccess,
  // success,
  activeSection,
  selectedImage,
  setSelectedImage,
  itemImage,
  setItemImage,
  setItemName,
  itemName,
}) => {
  const isModifier = itemDetails?.category?.length > 0 ? false : true;
  const [postedImageUrl, setPostedImageUrl] = useState("");
  const [imageAddingOption, setImageAddingOption] = useState("from_url");
  const [descriptionText, setDescriptionText] = useState("");
  const [menuName, setMenuName] = useState("");
  const [restaurant, setRestaurant] = useState();
  // // console.log("🚀 ~ AddItemModal ~ restauransssssssssssssssssst:", restaurant);
  const [category, setCategory] = useState();
  // console.log("🚀 ~  ~ categoryyyyyyyyyyyyyyy:", category);
  const [categoryname, setCategoryName] = useState("");
  const [basePrice, setBasePrice] = useState("");
  const [showCatDropDown, setShowCatDropDown] = useState(false);
  const [items, setItems] = useState([]);
  // console.log("🚀 ~ AddItemModal ~ itemImage:", itemImage);
  const [getSearchInput, setGetSearchInput] = useState("");
  // // console.log("🚀 ~ ~ getSearchInputtttttttttttt:", getSearchInput);
  const [hasMore, setHasMore] = useState(true);
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const [multipleModifierGroup, setMultipleModifierGroup] = useState([]);
  // console.log(
  //   "🚀 ~ AddItemModal ~ multipleModifierGroup:",
  //   multipleModifierGroup
  // );
  const { data: allCategory, isError } = useGetCategoryQuery({
    id: menuName,
    page: page,
    restaurantId: restaurant,
    searchInput: getSearchInput,
  });
  // console.log("menuName:", allCategory);
  // // console.log("allCategory", allCategory);
  const {
    data: moreCategory,
    isMoreLoading,
    isMoreError,
    moreCategoryerror,
  } = useGetMoreCategoryQuery({
    id: menuName,
    page,
    restaurantId: restaurant,
    searchInput: getSearchInput,
  });

  // // console.log("moreCategory", moreCategory);
  const {
    data: allRestaurant, // todo need to extra property proper location data
  } = useGetAllRestaurantQuery();

  // modifier group
  const {
    data: modifierGroup, // todo need to extra property proper location data
  } = useGetModifierGroupQuery({
    page: page,
    restaurantId: restaurant,
    menuIds: menuName,
    // locationId: 56,
  });
  // // console.log("ModifierGroup-----", modifierGroup);

  const [
    createItem,
    {
      data: createdItemData,
      isLoading: isCreateItemLoading,
      isError: isCreateItemError,
      error: createItemError,
      isSuccess: isCreateItemSuccess,
    },
  ] = useCreateItemMutation();

  // get single Items details
  const { data: singleItem } = useGetItemDetailsQuery({
    itemId: itemDetails?.id,
  });
  // console.log("🚀 ~ itemDetails-newwwww:", singleItem);

  const [
    updateItem,
    {
      isLoading: updatedItemLoading,
      isError: updatedItemError,
      isSuccess: isUpdatedItemSuccess,
      data,
      refetch,
    },
  ] = useUpdateItemMutation();

  const [deleteModifierItem, { isSuccess: deleteModifierSuccess }] =
    useDeleteModifierItemMutation();

  // console.log(updatedItemError, "isErrorssss");

  // menus
  const {
    data: allMenus,
    isLoading: menuLoading,
    isError: isMenuError,
    error: menuError,
  } = useGetAllMenuQuery({ restaurant });
  // console.log("🚀 ~ AddItemModal ~ allMenus:", allMenus);

  const { data: getAllItemsData } = useGetAllItemsQuery({
    page,
    searchInputValue: getSearchInput,
    refetchOnMountOrArgChange: true,
  });

  // handle image selections
  const [selectedImages, setSelectedImages] = useState([]); // For local images
  // console.log("🚀 ~ AddItemModal ~ selectedImages:", selectedImages);
  const [selectedImageUrl, setSelectedImageUrl] = useState("");
  // console.log("🚀 ~ AddItemModal ~ selectedImageUrl:", selectedImageUrl);

  // for original image selection
  const [originalImageFile, setOriginalImageFile] = useState([]);
  const itemImages = [];
  const originalImage = [];

  const handleImageSelection = (e) => {
    const files = Array.from(e.target.files);
    setSelectedImages([...selectedImages, ...files]);
  };
  const handleOriginalImageSelection = (e) => {
    const files = Array.from(e.target.files);
    //!DO NOT REMOVE THIS LINE
    // setOriginalImageFile([...originalImageFile, ...files]);
    setOriginalImageFile(files);
  };

  // Handle image pasting from clipboard
  const handlePaste = (e) => {
    const clipboardItems = e.clipboardData.items;

    // Loop through clipboard items to find the first image
    for (let i = 0; i < clipboardItems.length; i++) {
      const item = clipboardItems[i];
      if (item.type.startsWith("image/")) {
        const blob = item.getAsFile(); // Get the image as a file
        setOriginalImageFile([blob]); // Set only one pasted image
        break; // Exit the loop after finding the first image
      }
    }
  };

  // Handle drag and drop for image files
  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files); // Get dropped files
    const imageFiles = files.filter((file) => file.type.startsWith("image/")); // Only allow image files
    if (imageFiles.length > 0) {
      setOriginalImageFile(imageFiles); // Set dropped image files
    }
  };

  // Prevent default behavior to allow drop
  const handleDragOver = (e) => {
    e.preventDefault(); // Prevent default to allow the drop
  };
  // item editing
  useEffect(() => {
    // Reset form fields when switching between "Add" and "Edit" modes
    // // console.log(itemDetails, "item detailsatrsgfsfffffffffffffffg");
    if (isEditing) {
      setItemName(singleItem?.name || "");
      setDescriptionText(singleItem?.description || "");
      setMenuName(singleItem?.menu || "");
      setRestaurant(singleItem?.restaurant || 0);
      setCategory(singleItem?.category || 0);
      setBasePrice(singleItem?.base_price || "");
      setSelectedImageUrl(selectedImage);
      setItemImage(
        singleItem?.original_image?.local_url ||
          singleItem?.original_image?.working_url
      );
    } else {
      setItemName("");
      setBasePrice();
      setDescriptionText("");
      // setMenuName("");
      setMenuName(
        allMenus?.results?.length === 1 || allMenus?.results?.length === "1"
          ? allMenus.results[0].id
          : 0
      );
      setRestaurant(
        allRestaurant?.results?.length === 1 ||
          allRestaurant?.results?.length === "1"
          ? allRestaurant.results[0].id
          : 0
      );
      setCategory(0);
      setCategory("");
      setItemImage();
    }
  }, [isEditing, itemDetails, singleItem, selectedImage]);

  const handleItemSubmission = (e) => {
    e.preventDefault();
    let formData = new FormData();

    // Conditionally append fields only if they have values and when not editing
    if (!isEditing || (isEditing && e?.target?.menu?.value)) {
      formData.append("menu", e?.target?.menu?.value);
    }
    if (!isEditing || (isEditing && e?.target?.restaurant?.value)) {
      formData.append("restaurant", e?.target?.restaurant?.value);
    }
    if (!isEditing || (isEditing && itemName)) {
      formData.append("name", itemName);
    }
    if (!isEditing || (isEditing && descriptionText)) {
      formData.append("description", descriptionText);
    }
    if (!isEditing || (isEditing && basePrice)) {
      formData.append("base_price", basePrice);
    }
    if (!isEditing || (isEditing && basePrice)) {
      const numericBasePrice = parseFloat(basePrice);
      const increasedPrice = numericBasePrice + numericBasePrice * 0.1;
      formData.append("virtual_price", increasedPrice.toFixed(2));
    }

    // if (!isEditing || (isEditing && category)) {
    //   formData.append("category", category ? category : null);
    // }
    // console.log(category, "get-----");
    if (Array.isArray(category) && category.length > 0) {
      category.forEach((cat) => {
        formData.append("category", cat); // Append each number separately
      });
    } else if (typeof category === "number") {
      formData.append("category", category); // Append single number as is
    }

    // Image-related fields (unchanged)
    if (multipleModifierGroup && multipleModifierGroup.length > 0) {
      formData.append("modifiers", JSON.stringify(multipleModifierGroup));
    }

    // console.log(JSON.stringify(multipleModifierGroup), "multipleModifierGroup");

    if (itemImages && itemImages.length > 0) {
      formData.append("image_files", itemImages);
    }

    if (selectedImageUrl) {
      formData.append("remote_url", selectedImageUrl);
      formData.append("original_image.remote_url", selectedImageUrl);
      formData.append("original_image", { remote_url: selectedImageUrl });
    }

    if (originalImage) {
      formData.append("original_image_file", originalImage);
    }

    const formDataForImgUrl = {
      menu: e?.target?.menu?.value,
      restaurant: e.target.restaurant.value,
      name: itemName,
      description: descriptionText,
      base_price: basePrice,
      category: [category],
    };

    const rawJson = JSON.stringify(formDataForImgUrl);

    for (let i = 0; i < selectedImages.length; i++) {
      formData.append("image_files", selectedImages[i]);
    }
    for (let i = 0; i < originalImageFile.length; i++) {
      formData.append("original_image_file", originalImageFile[i]);
    }

    if (isEditing) {
      updateItem({ id: singleItem?.id, item: formData })
        .then(() => {
          // setSuccess(!success);
          // console.log("Success");
          // console resopnse
          const response = {
            id: singleItem?.id,
            item: formData,
          };

          // console.log(response, "responseinEdit");
          // console.log(formData, "formData");
        })
        .catch((error) => {
          console.error("An error occurred:", error);
        });
      refetch();
    } else {
      formData.append("is_available", true);
      formData.append("is_available_today", true);
      createItem(formData)
        .then(() => {
          // setSuccess(!success);
          // console.log("success");
        })
        .catch((error) => {
          console.error("An error occurred:", error);
        });
    }
  };

  useEffect(() => {
    if (isCreateItemSuccess) {
      // dispatch(selectedItemForEdit({ isEditing: false, selectedItemData: {} }));
      toast.success("Item added successfully");
      setShowAddItemModal(false);
    }
    if (isUpdatedItemSuccess) {
      // dispatch(selectedItemForEdit({ isEditing: false, selectedItemData: {} }));
      toast.success("Item updated successfully");
      setShowAddItemModal(false);
    }
  }, [isCreateItemSuccess, isUpdatedItemSuccess]);

  const [totalCategories, setTotalCategories] = useState([]);
  // console.log("🚀 ~ AddItemModal ~ totalCategories:", totalCategories);
  // const fetchCategories = () => {
  //   if (allCategory?.results?.length > 0) {
  //     setTotalCategories((prev) => [...prev, ...allCategory.results]);
  //   }
  //   if (totalCategories?.length >= allCategory?.count) {
  //     setHasMore(false);
  //   }
  // };

  // // console.log(totalCategories, "totalCategories");

  useEffect(() => {
    if (allCategory?.results?.length > 0) {
      setTotalCategories((prev) => [...prev, ...allCategory.results]);
    }
    if (totalCategories?.length >= allCategory?.count) {
      setHasMore(false);
    }
  }, [moreCategory, allCategory]);

  const handleLoadMore = () => {
    if (hasMore) {
      setPage((currentPage) => currentPage + 1);
    }
  };

  let categoryDisplayableItems;
  if (!isError && allCategory?.length > 0) {
    categoryDisplayableItems = allCategory?.map((category) => (
      /*  <option key={category.id} value={category.id}>
        {category.name}
      </option> */
      <option key={category.id} value={category.id}>
        {category.name}
      </option>
    ));
  } else if (isError) {
    categoryDisplayableItems = <>something went wrong for categories</>;
  }

  // handleUpdate item image
  const handleUpdateImage = (item) => {
    Swal.fire({
      title: "Are you sure?",
      // text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        updateItem({
          id: item.id,
          item: {
            original_image: {},
          },
        })
          .unwrap()
          .then(() => {
            Swal.fire(
              "Deleted!",
              `Image for ${item.name} has been deleted.`,
              "success"
            );
          })
          .catch((error) => {
            Swal.fire(
              "Failed!",
              `Failed to update image for ${item.name}.`,
              "error"
            );
          });
      }
    });
  };

  // Function for Ai-Generated Image (Comp: AiGeneratedModal)
  const inputRef = useRef(null);

  const fetchImageFromUnsplash = async () => {
    if (!inputRef.current || inputRef.current.value === "") {
      alert("Please enter a prompt to search for an image.");
      return;
    }

    const accessKey = "mshrvMVBdJo7fgq1mOxpMBM0DAvwcKTT_Xdgcs4d9U0";

    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${inputRef.current.value}&client_id=${accessKey}&per_page=20`
      );
      // &per_page=6

      const data = await response.json();

      if (response.ok && data.results.length > 0) {
        setImageUrl(data.results); // Fetching small size image URL
      } else {
        alert("No images found. Try another search.");
      }
    } catch (error) {
      console.error("Error fetching image:", error);
      alert("An error occurred while fetching the image. Please try again.");
    }
  };

  return (
    <>
      <input
        type="checkbox"
        id={isEditing ? `add_item_modal_${singleItem?.id}` : "add_item_modal"}
        className="modal-toggle"
      />
      <div className="modal">
        <div className="modal-box">
          <h1 className="text-2xl mb-6 font-bold font-sans">
            {isEditing ? "Edit" : "Add"}{" "}
            {activeSection === "items" ||
            activeSection.activeSection === "categories"
              ? "Item"
              : "Modifier"}
          </h1>
          <form onSubmit={handleItemSubmission}>
            <div className="h-[50vh] overflow-y-scroll">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Select Restaurant</span>
                </label>
                <select
                  className="select select-bordered w-full"
                  name="restaurant"
                  value={restaurant}
                  onChange={(e) => setRestaurant(e.target.value)}
                >
                  <option value="" selected>
                    Select Restaurant
                  </option>
                  {allRestaurant?.results?.map((restaurant) => (
                    <option key={restaurant.id} value={restaurant.id}>
                      {restaurant.name}
                    </option>
                  ))}
                </select>
              </div>

              {(activeSection.activeSection === "categories" ||
                activeSection === "items") && (
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Select Menu</span>
                  </label>
                  <select
                    className="select select-bordered w-full"
                    name="menu"
                    value={menuName}
                    // Assign the state value to the select element
                    onChange={(e) => {
                      setMenuName(e.target.value);
                      setTotalCategories([]);
                      setHasMore(true);
                      // setMenuName(e.target.id);
                    }}
                  >
                    <option value="" selected>
                      Select Menu
                    </option>
                    {allMenus?.results?.map((menu) => (
                      <option key={menu.id} value={menu.id}>
                        {menu.title}
                      </option>
                    ))}
                  </select>
                </div>
              )}
              {(activeSection.activeSection === "categories" ||
                activeSection === "items") && (
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Select Category</span>
                  </label>
                  {/* {isEditing && (
									<div>
										<span className='px-2 py-[1px] bg-blue-200 rounded-xl my-1'>
											{itemDetails?.category_names}
										</span>
									</div>
								)} */}
                  <SingleCustomSelect
                    page={page}
                    setPage={setPage}
                    loadItems={allCategory?.results}
                    setPromotion={setCategory}
                    setGetSearchInput={setGetSearchInput}
                    getSearchInput={getSearchInput}
                    restaurant={restaurant}
                    category={singleItem?.category}
                  />
                </div>
              )}
              {/* ! NOTE -  NEED TO USE THIS CODE LATER */}
              {/* modifier group  */}
              {/* <div className="form-control w-full mt-3">
                <label className="label">
                  <span className="label-text">Modifier Group</span>
                </label>
                <SingleModifierSelect
                  page={page}
                  setPage={setPage}
                  loadItems={getAllItemsData}
                  setPromotion={setItems}
                  getSearchInput={getSearchInput}
                  // selectedRestarauntId={selectedRestarauntId}
                  setGetSearchInput={setGetSearchInput}
                ></SingleModifierSelect>
              </div> */}
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Item Name</span>
                </label>
                <input
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  required
                  name="itemName"
                  type="text"
                  placeholder="item Name"
                  className="input input-bordered w-full"
                />
              </div>
              {/* <div className="mt-5">
                <h3 className="text-xl"></h3>
              </div> */}
              {/* ================================ Image Upload part =============================== */}
              {/* item original image */}
              {(activeSection.activeSection === "categories" ||
                activeSection === "items") && (
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Original Image</span>
                  </label>

                  {/* Styled box for pasting and drag-and-drop */}
                  <div
                    className="border-dashed border-2 text-lg font-bold border-gray-400 bg-gray-100 px-1 py-2 rounded-md mb-4"
                    onPaste={handlePaste}
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                    style={{ minHeight: "200px" }}
                  >
                    {/* File input for uploading image */}
                    <input
                      onChange={handleOriginalImageSelection}
                      type="file"
                      className="file-input file-input-bordered w-full"
                    />
                    {!originalImageFile.length > 0 && (
                      <div className="text-center mt-8">
                        <p className="text-gray-600">
                          Paste or drag and drop your image here
                        </p>
                        <p className="text-gray-600">Or choose file</p>
                      </div>
                    )}
                    {originalImageFile.length > 0 && (
                      <div className="text-center mt-8">
                        {originalImageFile.map((file, index) => (
                          <span
                            className="px-2 mt-2 rounded border-2 border-gray-300"
                            key={index}
                          >
                            {file.name}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Ai-Generated Image  */}
              {activeSection.activeSection === "categories" ||
                (activeSection === "items" && (
                  <AiGeneratedImage
                    selectedImage={selectedImage}
                    setSelectedImage={setSelectedImage}
                    itemName={itemName}
                    inputRef={inputRef}
                    fetchImageFromUnsplash={fetchImageFromUnsplash}
                    isEditing={isEditing}
                  />
                ))}

              {/* item image / edit modal  */}
              {activeSection.activeSection === "categories" ||
                (activeSection === "items" && (
                  <p className="mt-5">Selected Image Preview</p>
                ))}
              {(activeSection.activeSection === "categories" ||
                activeSection === "items") && (
                <div>
                  {itemImage ? (
                    <div className="mt-3 flex gap-3 w-full">
                      <div className="w-4/12 relative">
                        <img
                          className="w-32 h-28 relative"
                          src={itemImage}
                          alt="item/image"
                        />
                        <span
                          onClick={() => handleUpdateImage(singleItem)}
                          className="absolute top-3 right-3 p-1 bg-cyan-300 rounded-3xl text-white cursor-pointer"
                        >
                          <RiDeleteBin6Line className="text-2xl" />
                        </span>
                      </div>

                      <div className="w-8/12 flex flex-col">
                        <span className="flex">
                          {singleItem?.original_image?.local_url ||
                            singleItem?.original_image?.working_url}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-3 flex gap-3">
                      {/* Check for selectedImage first, if not found, show demoImage */}
                      <img
                        className="w-32 h-28"
                        src={selectedImage ? selectedImage : demoImage}
                        alt="item/image"
                      />
                      <div>
                        {originalImageFile[0]?.name && (
                          <p>
                            <span className="font-bold">Name:</span>{" "}
                            {originalImageFile[0]?.name}
                          </p>
                        )}
                        {originalImageFile[0]?.type && (
                          <p>
                            <span className="font-bold">Type:</span>{" "}
                            {originalImageFile[0]?.type}
                          </p>
                        )}
                        {originalImageFile[0]?.size && (
                          <p>
                            <span className="font-bold">Size:</span>{" "}
                            {parseInt(originalImageFile[0]?.size / 1024)} kb
                          </p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
              {/* ================================ Image Upload part =============================== */}
              {/* Add image with URL */}
              {(activeSection.activeSection === "categories" ||
                activeSection === "items") && (
                <div className="form-control w-full mt-3">
                  <label className="label">
                    <span className="label-text">Item Image URL</span>
                  </label>
                  <input
                    onChange={(e) => setSelectedImageUrl(e.target.value)}
                    name="itemImage"
                    type="text"
                    placeholder="place your image url here"
                    className="input input-bordered w-full"
                    value={selectedImageUrl}
                  />
                </div>
              )}

              {/* ========================== */}
              {/* Import the image select and crop component here  */}
              {/* <div className="my-10">
                <h1>Upload Image with Drag n Drop</h1>
                <ImgCropDnD />
              </div> */}
              {/* ========================== */}

              {/* Modifier group  */}
              {(activeSection.activeSection === "categories" ||
                activeSection === "items") && (
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Modifier Group</span>
                  </label>
                  {/* {itemDetails?.modifiergrouporder_set?.map((m) => (
                  <p key={m?.id} className="rounded-xl px-3 py-1 bg-gray-300">
                    {m?.name}
                  </p>
                ))} */}
                  <ModifierList
                    itemDetails={itemDetails}
                    deleteModifierItem={deleteModifierItem}
                  />
                  <EditItemModifierGroupSelect
                    page={page}
                    setPage={setPage}
                    loadItems={modifierGroup}
                    setPromotion={setMultipleModifierGroup}
                    isMultiSelect={true}
                    setGetSearchInput={setGetSearchInput}
                    selectedRestarauntId={restaurant}
                    menuName={menuName}
                    getSearchInput={getSearchInput}
                    category={category}
                    restaurant={restaurant}
                    modifiers={singleItem?.modifiergrouporder_set}
                    deleteModifierSuccess={deleteModifierSuccess}
                    id={singleItem?.id}
                  ></EditItemModifierGroupSelect>
                </div>
              )}

              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Base Price</span>
                </label>
                <input
                  onChange={(e) => setBasePrice(e.target.value)}
                  defaultValue={basePrice}
                  required
                  name="base_price"
                  type="text"
                  min={0}
                  placeholder="0.00 $"
                  className="input input-bordered w-full"
                />
              </div>
              {(activeSection.activeSection === "categories" ||
                activeSection === "items") && (
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Description</span>
                  </label>
                  <textarea
                    value={descriptionText} // Assign the state value to the input element
                    onChange={(e) => setDescriptionText(e.target.value)}
                    className="textarea textarea-bordered"
                    placeholder="Description"
                    name="itemDescription"
                  ></textarea>
                </div>
              )}
            </div>
            <div className="modal-action">
              <label htmlFor="add_item_modal">
                <button
                  name="save"
                  className="bg-[#42C2FF] text-white px-4 py-2 rounded-lg mt-2"
                  type="submit"
                >
                  {isEditing ? "Save changes" : "+ Add New Item"}
                </button>
              </label>
            </div>
          </form>
        </div>
        <label
          onClick={() =>
            dispatch(
              selectedItemForEdit({
                isEditing: false,
                selectedItemData: {},
              })
            )
          }
          className="modal-backdrop"
          htmlFor={
            isEditing ? `add_item_modal_${singleItem?.id}` : "add_item_modal"
          }
        >
          Close
        </label>
      </div>
    </>
  );
};

export default AddItemModal;
