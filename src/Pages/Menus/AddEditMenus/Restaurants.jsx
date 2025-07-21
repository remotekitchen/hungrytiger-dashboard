import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { BiEdit, BiSearch } from "react-icons/bi";
import { MdDeleteOutline } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Loading from "../../../Components/Loading";
import {
  useDeleteRestaurantMutation,
  useGetAllRestaurantQuery,
} from "../../../redux/features/restaurentCreation/restaurentCreationApi";
import LocationCreationModalUpdate from "../../Restaurent/RestaurantOverview/LocationCreationModalUpdate";
import EditRestaurantModal from "./Modal/EditRestaurantModal";
import RestaurantModal from "./Modal/RestaurantModal";

import Swal from "sweetalert2";
import { selectedRestaurant } from "../../../redux/features/restaurentCreation/restaurentCreationSlice";

const Restaurants = () => {
  const [showAddRestaurantModal, setShowAddRestaurantModal] = useState(false);
  const [editRestaurant, setEditRestaurant] = useState({});
  const [visible, setVisible] = useState(false);
  const [addLocation, setAddLocation] = useState(false);
  const [locations, setLocations] = useState("");
  const dispatch = useDispatch();
  const handleLocation = (id) => {
    setAddLocation(true);
    setLocations(id);
  };

  const securityPassForDeleteRestauratn = import.meta.env
    .VITE_DELETE_RESTAURANT_PASS;

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to delete this restaurant?",
      icon: "warning",
      html: `
        <p>Please enter the security password to proceed:</p>
        <input 
          type="password" 
          id="securityPassword" 
          class="swal2-input" 
          placeholder="Enter password" 
          autocomplete="new-password" 
          autocorrect="off" 
          autocapitalize="off" 
          spellcheck="false"
        />
        <p id="passwordError" style="color: red; display: none;">Security password is incorrect.</p>
      `,
      showCancelButton: true, // Ensures the Cancel button is always visible
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete this Restaurant!",
      cancelButtonText: "Cancel",
      didOpen: () => {
        const passwordField = document.getElementById("securityPassword");
        const confirmButton = document.querySelector(".swal2-confirm");
        const passwordError = document.getElementById("passwordError");

        // Initially disable the delete button
        confirmButton.disabled = true;

        // Enable/disable the delete button based on input
        passwordField.addEventListener("input", () => {
          confirmButton.disabled = passwordField.value.trim() === "";
          passwordError.style.display = "none"; // Hide error when user starts typing
        });
      },
      preConfirm: () => {
        return new Promise((resolve, reject) => {
          const enteredPassword =
            document.getElementById("securityPassword").value;
          const passwordError = document.getElementById("passwordError");

          if (!enteredPassword) {
            passwordError.style.display = "block";
            passwordError.innerText = "Password cannot be empty!";
            return false;
          }

          if (enteredPassword !== securityPassForDeleteRestauratn) {
            passwordError.style.display = "block";
            passwordError.innerText = "Security password is incorrect.";
            return false;
          }

          resolve(true);
        });
      },
      allowOutsideClick: () => !Swal.isLoading(), // Ensures clicking outside does not disable buttons
      allowEscapeKey: true, // Allows users to close with Escape key
    }).then((result) => {
      if (result.isConfirmed) {
        deleteRestaurant(id);
        Swal.fire("Deleted!", "The restaurant has been deleted.", "success");
      }
    });
  };

  const {
    data: allRestaurant, // todo need to extra property proper location data
    isLoading,
    isError,
    error,
  } = useGetAllRestaurantQuery();

  const { selectedRestaurant: selectedRestaurantFromSelector } = useSelector(
    (state) => state.restaurentCreation
  );
  const { isEditing, restaurantDetails } = selectedRestaurantFromSelector;

  const [deleteRestaurant, { isSuccess }] = useDeleteRestaurantMutation();

  useEffect(() => {
    if (isSuccess) toast.success("Successfully deleted a restaurant");
  }, [isSuccess]);

  const handleEdit = (item) => {
    setShowAddRestaurantModal(true);
    dispatch(
      selectedRestaurant({ isEditing: true, selectedRestaurantData: item })
    );
  };

  let displayableContent;
  if (isLoading) displayableContent = <Loading />;
  else if (isError)
    displayableContent = (
      <>
        <option>Something went wrong loading the menus</option>
      </>
    );
  else if (allRestaurant.results.length === 0)
    displayableContent = <option>No restaurent available right now</option>;
  else
    displayableContent = (
      <>
        {allRestaurant.results.map((item) => (
          <tr key={item.id}>
            <td className="py-2 px-3 ">{item.name}</td>
            <td className="py-2 px-3 ">
              <Link
                to={`/restaurant/${item.id}`}
                className="text-blue-500 underline"
              >
                view
              </Link>
            </td>
            <td className="py-2 px-3 ">{item.menu_cnt}</td>
            <td className="py-2 px-3 ">{item.category_cnt}</td>
            <td className="py-2 px-3 ">{item.item_cnt}</td>
            <td className="flex items-center py-2 px-3">
              <label
                onClick={() => handleEdit(item)}
                htmlFor={
                  isEditing
                    ? `add_restaurant_modal_${item.id}`
                    : "add_restaurant_modal"
                }
              >
                <BiEdit className="text-xl text-[#697077 cursor-pointer" />
              </label>

              <MdDeleteOutline
                // onClick={() => {
                //   Swal.fire({
                //     title: "Are you sure?",
                //     text: "Do you really want to delete this restaurant?",
                //     icon: "warning",
                //     showCancelButton: true,
                //     confirmButtonColor: "#d33",
                //     cancelButtonColor: "#3085d6",
                //     confirmButtonText: "Yes, delete this Restaurant!",
                //     cancelButtonText: "Cancel",
                //   }).then((result) => {
                //     if (result.isConfirmed) {
                //       deleteRestaurant(item.id);
                //       Swal.fire(
                //         "Deleted!",
                //         "The restaurant has been deleted.",
                //         "success"
                //       );
                //     }
                //   });
                // }}
                onClick={() => handleDelete(item.id)}
                className="text-xl text-[#697077] ml-3 cursor-pointer"
              />
              <button
                onClick={() => handleLocation(item.id)}
                className="text-xl text-[#697077] ml-3 cursor-pointer"
              >
                Add Location
              </button>
            </td>
          </tr>
        ))}
      </>
    );
  return (
    <div>
      <div className="flex justify-between items-center mt-3">
        <label
          onClick={() => setShowAddRestaurantModal(true)}
          htmlFor={
            isEditing
              ? `add_restaurant_modal_${restaurantDetails.id}`
              : "add_restaurant_modal"
          }
          className="btn bg-[#42C2FF] text-white px-4 py-2 rounded-lg"
        >
          + New Restaurant
        </label>

        <div className="flex items-center">
          <div className="relative">
            <input
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
          <tr className="bg-[#DDE1E6]">
            <th className="py-2 px-3  text-left">Restaurant Name</th>
            <th className="py-2 px-3  text-left">Locations</th>
            <th className="py-2 px-3  text-left">Menus</th>
            <th className="py-2 px-3  text-left">Categories</th>
            <th className="py-2 px-3  text-left">Items</th>
            <th className="py-2 px-3  text-left">Action</th>
          </tr>
        </thead>
        <tbody>{displayableContent}</tbody>
      </table>
      {showAddRestaurantModal && (
        <RestaurantModal
          selectedRestaurant={selectedRestaurant}
          showAddRestaurantModal={showAddRestaurantModal}
          setShowAddRestaurantModal={setShowAddRestaurantModal}
        />
      )}
      <EditRestaurantModal
        visible={visible}
        setVisible={setVisible}
        editRestaurant={editRestaurant}
        setEditRestaurant={setEditRestaurant}
      />
      <LocationCreationModalUpdate
        addLocation={addLocation}
        setAddLocation={setAddLocation}
        locations={locations}
        setLocations={setLocations}
      />
    </div>
  );
};

export default Restaurants;
