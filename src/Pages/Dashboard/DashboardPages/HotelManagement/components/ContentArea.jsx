import React from "react";
import { useSelector } from "react-redux";
import HotelTable from "./UserManagement/HotelTable";
import UserTable from "./UserManagement/UserTable";

const ContentArea = ({
  section,
  users,
  userSearch,
  onUserSearchChange,
  onEditUser,
  onDeleteUser,
  onAddUser,
  isUsersLoading,
  isUsersError,
  usersError,
  hotels,
  hotelSearch,
  onHotelSearchChange,
  onEditHotel,
  onDeleteHotel,
  onAddHotel,
}) => {
  const { user_info } = useSelector((state) => state.auth);

  // If not hotel admin, block access to users/hotels
  if (
    (section === "users" || section === "hotels") &&
    !user_info?.hotel_admin
  ) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-center">
        <div className="text-2xl font-bold text-red-600 mb-4">
          Please login with admin email to access this page.
        </div>
      </div>
    );
  }

  if (section === "users") {
    return (
      <UserTable
        users={users}
        search={userSearch}
        onSearchChange={onUserSearchChange}
        onEditUser={onEditUser}
        onDeleteUser={onDeleteUser}
        onAddUser={onAddUser}
        isLoading={isUsersLoading}
        isError={isUsersError}
        error={usersError}
      />
    );
  }

  if (section === "hotels") {
    return (
      <HotelTable
        hotels={hotels}
        search={hotelSearch}
        onSearchChange={onHotelSearchChange}
        onEditHotel={onEditHotel}
        onDeleteHotel={onDeleteHotel}
        onAddHotel={onAddHotel}
      />
    );
  }

  return (
    <div className="mt-8 text-gray-500 text-center">
      <p className="text-lg">Select a menu to manage Users or Hotels.</p>
      <p className="text-sm mt-2">Choose from the navigation to get started.</p>
    </div>
  );
};

export default ContentArea;
