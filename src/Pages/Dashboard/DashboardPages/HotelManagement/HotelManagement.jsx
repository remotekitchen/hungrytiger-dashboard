import React from "react";
import { useParams } from "react-router-dom";
import { ContentArea, ModalContainer } from "./components";
import { useHotelManagement } from "./hooks/useHotelManagement";

const HotelManagement = () => {
  const { section } = useParams();

  const {
    // User state
    users,
    userSearch,
    showAddUserModal,
    showEditUserModal,
    selectedUser,

    // Hotel state
    hotels,
    hotelSearch,
    showAddHotelModal,
    showEditHotelModal,
    selectedHotel,

    // User handlers
    setUserSearch,
    setShowAddUserModal,
    handleAddUser,
    handleEditUser,
    handleUpdateUser,
    handleDeleteUser,
    handleCloseUserModals,

    // Hotel handlers
    setHotelSearch,
    setShowAddHotelModal,
    handleAddHotel,
    handleEditHotel,
    handleUpdateHotel,
    handleDeleteHotel,
    handleCloseHotelModals,
  } = useHotelManagement();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Hotel Management</h1>

      {/* Modal Container */}
      <ModalContainer
        // User modals
        showAddUserModal={showAddUserModal}
        showEditUserModal={showEditUserModal}
        selectedUser={selectedUser}
        onCloseUserModals={handleCloseUserModals}
        onAddUser={handleAddUser}
        onUpdateUser={handleUpdateUser}
        // Hotel modals
        showAddHotelModal={showAddHotelModal}
        showEditHotelModal={showEditHotelModal}
        selectedHotel={selectedHotel}
        onCloseHotelModals={handleCloseHotelModals}
        onAddHotel={handleAddHotel}
        onUpdateHotel={handleUpdateHotel}
      />

      {/* Content Area */}
      <ContentArea
        section={section}
        users={users}
        userSearch={userSearch}
        onUserSearchChange={setUserSearch}
        onEditUser={handleEditUser}
        onDeleteUser={handleDeleteUser}
        onAddUser={() => setShowAddUserModal(true)}
        hotels={hotels}
        hotelSearch={hotelSearch}
        onHotelSearchChange={setHotelSearch}
        onEditHotel={handleEditHotel}
        onDeleteHotel={handleDeleteHotel}
        onAddHotel={() => setShowAddHotelModal(true)}
      />
    </div>
  );
};

export default HotelManagement;
