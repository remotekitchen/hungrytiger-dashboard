import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { MdEdit } from "react-icons/md";
import { useSelector } from "react-redux";
import {
  useGetAccountDetailsQuery,
  useUpdateAccountDetailsMutation,
} from "../../../redux/features/Account/accountApi";
import ResetPasswordModal from "../Modal/ResetPasswordModal";

const Accounts = () => {
  const [isEditing, setIsEditing] = useState(false);
  const auth = useSelector((state) => state.auth);
  const [visible, setVisible] = useState(false);

  // Fetch user info using RTK Query
  const { data: accountDetails } = useGetAccountDetailsQuery();
  // fetch updated user info
  const [updateInfo, { isSuccess, isError, isLoading }] =
    useUpdateAccountDetailsMutation();

  // Define state variables for user details
  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    // Update state with user data when the data is available
    if (accountDetails) {
      setUserData(accountDetails);
    }
  }, [accountDetails]);

  const handleClosed = () => {
    setVisible(false);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    // Reset user data to the original data fetched from the API
    setUserData(accountDetails);
  };

  const handleUpdateClick = (e) => {
    e.preventDefault();
    try {
      setIsEditing(false);
      // Call the mutation function to update user info
      const updatedData = updateInfo({ ...userData }).unwrap();
      // // console.log(updatedData)
      if (updatedData) {
        toast.success("Basic Information Updated successfully");
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update basic information");
    }
  };

  return (
    <div>
      <h1 className="text-3xl">Basic information</h1>
      <div className="">
        {/* <div>
                    <img className='h-16 w-16 rounded-full' src='https://www.w3schools.com/howto/img_avatar.png' alt='avatar' />
                </div> */}
        <div>
          <button
            className={`border border-black rounded flex items-center gap-3 px-3 py-1 my-2 ${
              isEditing ? " cursor-not-allowed" : ""
            }`}
            onClick={handleEditClick}
          >
            <MdEdit />
            Edit
          </button>
          <h2>First Name</h2>
          {isEditing ? (
            <input
              type="text"
              value={userData.first_name}
              onChange={(e) =>
                setUserData({ ...userData, first_name: e.target.value })
              }
              className={`px-3 py-2 border rounded`}
            />
          ) : (
            <p className={`px-3 py-2`}>{userData.first_name}</p>
          )}
          <h2>Last Name</h2>
          {isEditing ? (
            <input
              type="text"
              value={userData.last_name}
              onChange={(e) =>
                setUserData({ ...userData, last_name: e.target.value })
              }
              className={`px-3 py-2 border rounded`}
            />
          ) : (
            <p className={`px-3 py-2`}>{userData.last_name}</p>
          )}
          <h2>Email Address</h2>
          {isEditing ? (
            <input
              type="email"
              value={userData.email}
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
              className={`px-3 py-2 border rounded`}
            />
          ) : (
            <p className={`px-3 py-2`}>{userData.email}</p>
          )}
          <h2>Phone Number</h2>
          {isEditing ? (
            <input
              type="tel"
              value={userData.phone}
              onChange={(e) =>
                setUserData({ ...userData, phone: e.target.value })
              }
              className={`px-3 py-2 border rounded`}
            />
          ) : (
            <p className={`px-3 py-2`}>{userData.phone}</p>
          )}
          <div className="flex gap-2 mt-4">
            {isEditing && (
              <>
                <button
                  className={`border shadow rounded flex items-center gap-3 px-3 py-1`}
                  onClick={handleCancelClick}
                >
                  Cancel
                </button>
                <button
                  className={`border shadow rounded flex items-center gap-3 px-3 py-1`}
                  onClick={handleUpdateClick}
                >
                  Update
                </button>
              </>
            )}
          </div>

          <div className="mt-4">
            <h3 className="text-2xl mt-2">Password & Security</h3>

            <button
              onClick={() => setVisible(true)}
              className="text-sm text-blue-700 mt-2"
            >
              Change password
            </button>
          </div>
        </div>
        <ResetPasswordModal
          handleClosed={handleClosed}
          visible={visible}
          setVisible={setVisible}
        />
      </div>
    </div>
  );
};

export default Accounts;
