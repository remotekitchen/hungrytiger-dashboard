import React from "react";
import AddHotelModal from "./Modals/AddHotelModal";
import AddUserModal from "./Modals/AddUserModal";
import EditHotelModal from "./Modals/EditHotelModal";
import EditUserModal from "./Modals/EditUserModal";

const ModalContainer = ({
  // User modals
  showAddUserModal,
  showEditUserModal,
  selectedUser,
  onCloseUserModals,
  onAddUser,
  onUpdateUser,

  // Hotel modals
  showAddHotelModal,
  showEditHotelModal,
  selectedHotel,
  onCloseHotelModals,
  onAddHotel,
  onUpdateHotel,
}) => {
  return (
    <>
      {/* User Modals */}
      <AddUserModal
        show={showAddUserModal}
        onClose={onCloseUserModals}
        onSubmit={onAddUser}
      />

      <EditUserModal
        show={showEditUserModal}
        onClose={onCloseUserModals}
        userData={selectedUser}
        onSubmit={onUpdateUser}
      />

      {/* Hotel Modals */}
      <AddHotelModal
        show={showAddHotelModal}
        onClose={onCloseHotelModals}
        onSubmit={onAddHotel}
      />

      <EditHotelModal
        show={showEditHotelModal}
        onClose={onCloseHotelModals}
        hotelData={selectedHotel}
        onSubmit={onUpdateHotel}
      />
    </>
  );
};

export default ModalContainer;
