/* eslint-disable no-undef */
import { useEffect, useRef, useState } from "react";
import {
  useCreateRestaurantMutation,
  useUpdateRestaurantMutation,
} from "../../../redux/features/restaurentCreation/restaurentCreationApi";
import { useDispatch, useSelector } from "react-redux";

const RestaurantImageCreationModal = ({ setModalOpen, modalOpen }) => {
  const modalRef = useRef();
  const [createRestaurant, { isLoading, isError, isSuccess, data }] =
    useCreateRestaurantMutation();
  const [
    updateItem,
    {
      isLoading: isUpdateRestaurantLoading,
      isError: isUpdateRestaurantError,
      isSuccess: isUpdateRestaurantSuccess,
    },
  ] = useUpdateRestaurantMutation();
  const { selectedRestaurant: selectedRestaurantFromSelector } = useSelector(
    (state) => state.restaurentCreation
  );
  const { isEditing, restaurantDetails } = selectedRestaurantFromSelector;
  const [avatarImage, setAvatarImage] = useState();
  const [bannerImage, setBannerImage] = useState();
  //   handle restaurant image upload
  const handleImagesUpload = (e) => {
    e.preventDefault();

    const form = new FormData();

    if (e.target.avatarImage.files[0]) {
      form.append("avatar_image.local_url", e.target.avatarImage.files[0]);
    } else if (avatarImage instanceof File) {
      // Use the file directly if it's already a File object
      form.append("avatar_image.local_url", avatarImage);
    } else if (typeof avatarImage === "string") {
      // If 'avatarImage' is a URL, fetch and convert to Blob
      fetch(avatarImage)
        .then((response) => response.blob())
        .then((blob) => form.append("avatar_image.local_url", blob));
    }
    if (e.target.bannerImage.files[0]) {
      form.append("banner_image.local_url", e.target.bannerImage.files[0]);
    } else if (bannerImage instanceof File) {
      // Use the file directly if it's already a File object
      form.append("banner_image.local_url", bannerImage);
    } else if (typeof bannerImage === "string") {
      // If 'bannerImage' is a URL, fetch and convert to Blob
      fetch(bannerImage).then((response) => response.blob());
      console
        .log("blob", blob)
        .then((blob) => form.append("banner_image.local_url", blob));
    }

    updateItem(form);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        modalOpen &&
        modalRef.current &&
        !modalRef.current.contains(event.target)
      ) {
        setModalOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [modalOpen, setModalOpen]);

  return (
    <div className="w-full fixed z-10 inset-0 overflow-y-auto flex items-center justify-center">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div
        ref={modalRef}
        className="bg-white rounded-lg p-8 z-20 relative max-w-lg w-full"
      >
        <form onSubmit={handleImagesUpload}>
          <div className="form-control w-full">
            {/* image with file */}
            <label className="label">
              <span className="label-text">Avatar Image</span>
            </label>
            {avatarImage ? (
              <img
                src={restaurantDetails?.avatar_image?.local_url}
                alt="avatar"
                className="h-[80px] w-[80px] rounded mb-2"
              />
            ) : null}
            <input
              onChange={(e) => setAvatarImage(e.target.files[0])}
              name="avatarImage"
              type="file"
              className="file-input file-input-bordered"
              required
            />
          </div>
          <div className="form-control w-full">
            {/* image with file */}
            <label className="label">
              <span className="label-text">Banner Image</span>
            </label>
            {bannerImage ? (
              <img
                src={restaurantDetails?.banner_image?.local_url}
                alt="banner"
                className="h-[80px] w-[80px] rounded mb-2"
              />
            ) : null}
            <input
              onChange={(e) => setBannerImage(e.target.files[0])}
              name="bannerImage"
              type="file"
              className="file-input file-input-bordered"
              required
            />
          </div>
          {/* <button onClick={() => setModalOpen(!modalOpen)}>Close modal</button> */}
          <div className="modal-action">
            <label htmlFor="categoryModal">
              <button
                name="save"
                className="bg-[#42C2FF] text-white px-4 py-2 rounded-lg mt-2"
                type="submit"
              >
                Save
              </button>
              <button
                name="save"
                className="ml-2 bg-[#42C2FF] text-white px-4 py-2 rounded-lg mt-2"
                onClick={() => setModalOpen(!modalOpen)}
              >
                Close
              </button>
            </label>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RestaurantImageCreationModal;
