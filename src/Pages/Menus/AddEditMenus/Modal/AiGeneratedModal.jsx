import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoCheckmarkDoneSharp } from "react-icons/io5";
import { VscSyncIgnored } from "react-icons/vsc";
import demoImage from "../../../../assets/demo.png";
import {
  useGetItemsWithoutPaginationQuery,
  useUpdateItemMutation,
} from "../../../../redux/features/itemCreation/itemCreationApi";
import { useGetRestaurentsQuery } from "../../../../redux/features/menuCreation/menuCreationApi";
import AiGeneratedImage from "../components/AiGeneratedImage";

const AiGeneratedModal = ({
  selectedImage,
  setSelectedImage,
  itemImage,
  setItemImage,
  itemName,
  setItemName,
}) => {
  const [selectedImageUrl, setSelectedImageUrl] = useState("");
  // console.log(selectedImageUrl, "selectedImageUrl___");
  const [restaurant, setRestaurant] = useState(0);
  const [nextItems, setNextItems] = useState(0);
  const [currentItemId, setCurrentItemId] = useState(null);
  const [filteredItems, setFilteredItems] = useState([]);
  const { data: restaurantList } = useGetRestaurentsQuery();
  // for original image selection
  const [selectedImages, setSelectedImages] = useState([]);
  const [originalImageFile, setOriginalImageFile] = useState([]);
  const itemImages = [];
  const originalImage = [];

  const {
    data: itemsWithoutPagination,
    isLoading,
    refetch,
  } = useGetItemsWithoutPaginationQuery({
    restaurantId: restaurant,
  });
  // console.log(itemsWithoutPagination, "itemsWithoutPagination_modal");
  // select default restaurant
  useEffect(() => {
    if (restaurantList?.results?.length) {
      setRestaurant(restaurantList.results[0].id);
    }
  }, [restaurantList]);

  // Update item functionality
  const [
    updateItem,
    {
      isLoading: updatedItemLoading,
      isError: updatedItemError,
      isSuccess: isUpdatedItemSuccess,
    },
  ] = useUpdateItemMutation();

  //   filter data
  useEffect(() => {
    if (itemsWithoutPagination?.length > 0) {
      const filteredData = itemsWithoutPagination.filter((data) => {
        const hasInvalidOriginalImage =
          (!data.images || data.images.length === 0) && // Check if images array is empty or undefined
          (!data.original_image || // Check if original_image object exists
            !data.original_image.working_url || // Check if working_url is valid
            !data.original_image.remote_url) && // Check if remote_url is valid
          !data.local_url; // Check if local_url exists
        return hasInvalidOriginalImage;
      });

      setFilteredItems(filteredData);
    }
  }, [itemsWithoutPagination, isUpdatedItemSuccess]);

  //   set currentItem Id to the state
  // Update the current item's id when nextItems index changes
  useEffect(() => {
    if (filteredItems?.[nextItems]) {
      setCurrentItemId(filteredItems[nextItems]?.id);
    }
  }, [nextItems, filteredItems]);
  // set default ai generated image url
  useEffect(() => {
    if (selectedImage) {
      setSelectedImageUrl(selectedImage);
    }
  }, [selectedImage, selectedImageUrl]);

  //   set nextItems
  const handleIgnore = () => {
    setNextItems((prev) => prev + 1);
  };

  // Handle image selection
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

  // Handle submit function for update ai-generated image
  const handleItemSubmission = (e) => {
    e.preventDefault();
    let formData = new FormData();

    // Append the item name if available
    if (itemName) {
      formData.append("name", itemName);
    }

    // Append item images if they exist
    if (itemImages && itemImages.length > 0) {
      formData.append("image_files", itemImages);
    }

    // Append selected image URL if available
    if (selectedImageUrl) {
      formData.append("remote_url", selectedImageUrl);
      formData.append("original_image.remote_url", selectedImageUrl);
      formData.append("original_image", { remote_url: selectedImageUrl });
    }

    // Append original image file if available
    if (originalImage) {
      formData.append("original_image_file", originalImage);
    }

    // Append all selected images
    for (let i = 0; i < selectedImages.length; i++) {
      formData.append("image_files", selectedImages[i]);
    }

    // Append original image files if available
    for (let i = 0; i < originalImageFile.length; i++) {
      formData.append("original_image_file", originalImageFile[i]);
    }

    // Update item with the current form data
    updateItem({ id: currentItemId, item: formData })
      .then(() => {
        const response = {
          id: currentItemId,
          item: formData,
        };
        // Handle the success response here if needed
        toast.success("Update Image Successfully");
        setNextItems((prev) => prev + 1);
      })
      .catch((error) => {
        console.error("An error occurred:", error);
        // toast.error("An error occurred");
      });

    refetch();
  };

  return (
    <dialog id="my_modal_001" className="modal">
      <div className="modal-box overflow-x-hidden">
        <form onSubmit={handleItemSubmission}>
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-600">
              Generate Image with AI for{" "}
              <span className="bg-gray-500 px-2 rounded text-white">
                {filteredItems?.length}
              </span>{" "}
              items
            </h2>
            {/* <form method="dialog">
              <button className="text-lg font-bold bg-red-200 rounded-full w-7 h-7 flex items-center justify-center cursor-pointer">
                ✕
              </button>
            </form> */}
          </div>

          <div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Item Name</span>
              </label>
              <input
                required
                name="itemName"
                type="text"
                placeholder="Item Name"
                className="input input-bordered w-full"
                value={filteredItems?.[nextItems]?.name || ""}
              />
            </div>

            {/* Image Upload Section */}
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
                style={{ minHeight: "150px" }}
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

            {/* Ai-Generated Image Section */}

            <AiGeneratedImage
              filteredItems={filteredItems}
              nextItems={nextItems}
              selectedImage={selectedImage}
              setSelectedImage={setSelectedImage}
              itemName={itemName}
            />

            {/* <AiImageGenerationV2 /> */}

            <div>
              <p className="mt-5">Selected Image Preview</p>
              <div className="mt-3 flex gap-3">
                <img
                  className="w-32 h-28"
                  src={selectedImageUrl ? selectedImageUrl : demoImage}
                  alt="item/image"
                />
              </div>
            </div>

            {/* Add image with URL */}
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
          </div>
          <div className="my-5 w-full flex items-center justify-center">
            <div className="flex items-center gap-2">
              <button
                name="save"
                type="submit"
                className="px-5 py-2 rounded bg-green-200 flex items-center gap-2"
              >
                Confirm{" "}
                <span>
                  <IoCheckmarkDoneSharp />
                </span>
              </button>
              <span
                onClick={handleIgnore}
                className="px-5 py-2 rounded bg-red-200  flex items-center gap-2 cursor-pointer"
              >
                <span>
                  <VscSyncIgnored />
                </span>{" "}
                Ignore
              </span>
            </div>
          </div>
        </form>
      </div>

      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default AiGeneratedModal;
