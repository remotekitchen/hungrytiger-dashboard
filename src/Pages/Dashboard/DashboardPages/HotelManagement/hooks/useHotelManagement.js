import { useEffect, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";

import {
  useAddHotelMutation,
  useAddHotelOwnerAccountMutation,
  useDeleteHotelMutation,
  useDeleteHotelOwnerMutation,
  useGetHotelOwnersQuery,
  useGetHotelsQuery,
  useUpdateHotelMutation,
  useUpdateHotelOwnerMutation,
} from "../../../../../redux/features/hotel/hotelApi";

export const useHotelManagement = () => {
  // API hooks
  const [addHotelOwnerAccount] = useAddHotelOwnerAccountMutation();
  const {
    data: hotelOwnersData,
    refetch,
    isLoading: isUsersLoading,
    isError: isUsersError,
    error: usersError,
  } = useGetHotelOwnersQuery();
  const [deleteHotelOwner] = useDeleteHotelOwnerMutation();
  const [updateHotelOwner] = useUpdateHotelOwnerMutation();

  // Hotel API hooks
  const {
    data: hotelsData,
    refetch: refetchHotels,
    isLoading: isHotelsLoading,
    isError: isHotelsError,
    error: hotelsError,
  } = useGetHotelsQuery();
  const [addHotel] = useAddHotelMutation();
  const [deleteHotel] = useDeleteHotelMutation();
  const [updateHotel] = useUpdateHotelMutation();

  // User management state
  const [userSearch, setUserSearch] = useState("");
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Hotel management state (local, for demo)
  const [hotels, setHotels] = useState([
    { hotelName: "Grand Plaza", hotelOwner: "John Doe" },
    { hotelName: "Seaside Resort", hotelOwner: "Jane Smith" },
    { hotelName: "Mountain Inn", hotelOwner: "Emily Davis" },
  ]);
  const [hotelSearch, setHotelSearch] = useState("");
  const [showAddHotelModal, setShowAddHotelModal] = useState(false);
  const [showEditHotelModal, setShowEditHotelModal] = useState(false);
  const [selectedHotel, setSelectedHotel] = useState(null);

  // Log hotel owners from API
  useEffect(() => {
    if (hotelOwnersData) {
      // console.log("Hotel Owners from API:", hotelOwnersData);
    }
  }, [hotelOwnersData]);

  // Filtered users from API
  const filteredUsers = useMemo(() => {
    const owners = Array.isArray(hotelOwnersData?.data)
      ? hotelOwnersData.data
      : Array.isArray(hotelOwnersData)
        ? hotelOwnersData
        : [];
    return owners.filter((user) => {
      const search = userSearch.toLowerCase();
      const name = `${user.first_name || ""} ${user.last_name || ""}`.trim();
      return (
        name.toLowerCase().includes(search) ||
        (user.company_name &&
          user.company_name.toLowerCase().includes(search)) ||
        (user.email && user.email.toLowerCase().includes(search))
      );
    });
  }, [hotelOwnersData, userSearch]);

  useEffect(() => {
    // console.log("Filtered users updated:", filteredUsers);
  }, [filteredUsers]);

  // Filtered hotels from API
  const filteredHotels = useMemo(() => {
    const hotelsArr = Array.isArray(hotelsData?.results)
      ? hotelsData.results
      : Array.isArray(hotelsData)
        ? hotelsData
        : [];

    return hotelsArr.filter((hotel) => {
      const hotelName = hotel.name || hotel.hotelName || "";
      let ownerName = "";

      // Owner could be an object
      if (hotel.owner && typeof hotel.owner === "object" && hotel.owner.name) {
        ownerName = hotel.owner.name;
      }
      // Owner could be an ID string
      else if (hotel.owner && typeof hotel.owner === "string") {
        const ownerOption = [
          { id: 9562, name: "Nazmul Hasan" },
          { id: 9563, name: "John Doe" },
          { id: 9564, name: "Jane Smith" },
        ].find((o) => String(o.id) === hotel.owner);
        ownerName = ownerOption ? ownerOption.name : hotel.owner;
      }
      // Owner fallback
      else if (hotel.hotelOwner) {
        ownerName = hotel.hotelOwner;
      }

      return (
        hotelName.toLowerCase().includes(hotelSearch.toLowerCase()) ||
        ownerName.toLowerCase().includes(hotelSearch.toLowerCase())
      );
    });
  }, [hotelsData, hotelSearch]);

  // User management handlers
  const handleAddUser = async (userData) => {
    try {
      await addHotelOwnerAccount({
        email: userData.email,
        password: userData.password,
      }).unwrap();
      refetch();
      setShowAddUserModal(false);
    } catch (error) {
      console.error("Failed to add hotel owner:", error);
    }
  };

  const handleEditUser = (user) => {
    setSelectedUser(user);
    setShowEditUserModal(true);
  };

  const handleUpdateUser = async (userData) => {
    if (!selectedUser) return;
    try {
      await updateHotelOwner({
        id: selectedUser.id,
        hotelOwnerDetails: userData,
      }).unwrap();
      refetch();
      setShowEditUserModal(false);
    } catch (error) {
      console.error("Failed to update hotel owner:", error?.data);
      toast.error("Something went wrong...");
    }
  };

  const handleDeleteUser = async (user) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Delete hotel owner ${user.email}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });
    if (result.isConfirmed) {
      try {
        await deleteHotelOwner(user.id).unwrap();
        refetch();
        Swal.fire("Deleted!", "Hotel owner has been deleted.", "success");
      } catch (error) {
        Swal.fire("Error!", "Failed to delete hotel owner.", "error");
      }
    }
  };

  const handleCloseUserModals = () => {
    setShowAddUserModal(false);
    setShowEditUserModal(false);
    setSelectedUser(null);
  };

  // Hotel management handlers (API)
  const handleAddHotel = async (hotelData) => {
    try {
      await addHotel(hotelData).unwrap();
      refetchHotels();
      setShowAddHotelModal(false);
      toast.success("Hotel created successfully!");
    } catch (error) {
      toast.error("Failed to create hotel");
      console.error("Failed to add hotel:", error);
    }
  };

  const handleEditHotel = (hotel) => {
    setSelectedHotel(hotel);
    setShowEditHotelModal(true);
  };

  const handleUpdateHotel = async (hotelData) => {
    if (!selectedHotel) return;
    try {
      await updateHotel({
        id: selectedHotel.id,
        hotelOwnerDetails: hotelData,
      }).unwrap();
      refetchHotels();
      setShowEditHotelModal(false);
      toast.success("Hotel updated successfully!");
    } catch (error) {
      toast.error("Failed to update hotel");
      console.error("Failed to update hotel:", error);
    }
  };

  const handleDeleteHotel = async (hotel) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Delete hotel ${hotel.name || hotel.hotelName}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });
    if (result.isConfirmed) {
      try {
        await deleteHotel(hotel.id).unwrap();
        refetchHotels();
        Swal.fire("Deleted!", "Hotel has been deleted.", "success");
      } catch (error) {
        Swal.fire("Error!", "Failed to delete hotel.", "error");
      }
    }
  };

  const handleCloseHotelModals = () => {
    setShowAddHotelModal(false);
    setShowEditHotelModal(false);
    setSelectedHotel(null);
  };

  return {
    // User state
    users: filteredUsers,
    userSearch,
    showAddUserModal,
    showEditUserModal,
    selectedUser,
    isUsersLoading,
    isUsersError,
    usersError,

    // Hotel state
    hotels: filteredHotels,
    hotelSearch,
    showAddHotelModal,
    showEditHotelModal,
    selectedHotel,
    isHotelsLoading,
    isHotelsError,
    hotelsError,

    // User handlers
    setUserSearch,
    setShowAddUserModal,
    setShowEditUserModal,
    handleAddUser,
    handleEditUser,
    handleUpdateUser,
    handleDeleteUser,
    handleCloseUserModals,

    // Hotel handlers
    setHotelSearch,
    setShowAddHotelModal,
    setShowEditHotelModal,
    handleAddHotel,
    handleEditHotel,
    handleUpdateHotel,
    handleDeleteHotel,
    handleCloseHotelModals,
  };
};
