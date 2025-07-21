import React from "react";
import { FaEdit, FaSearch, FaTrash } from "react-icons/fa";

const ownerOptions = [
  { id: 9562, name: "Nazmul Hasan" },
  { id: 9563, name: "John Doe" },
  { id: 9564, name: "Jane Smith" },
];

const HotelTable = ({
  hotels,
  search,
  onSearchChange,
  onEditHotel,
  onDeleteHotel,
  onAddHotel,
}) => {
  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <div className="relative w-full max-w-xs">
          <input
            type="text"
            placeholder="Search by hotel name or owner..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="border rounded-lg py-2 pl-10 pr-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
        <button
          className="px-6 py-2 rounded-lg bg-green-500 text-white font-semibold shadow ml-4 hover:bg-green-600 transition-colors"
          onClick={onAddHotel}
        >
          Add Hotel
        </button>
      </div>
      <div className="overflow-x-auto bg-white rounded-lg shadow p-4">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 text-left font-semibold">Hotel Name</th>
              <th className="py-2 px-4 text-left font-semibold">Hotel Owner</th>
              <th className="py-2 px-4 text-center font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {hotels.length === 0 ? (
              <tr>
                <td colSpan={3} className="text-center py-4 text-gray-400">
                  No hotels found.
                </td>
              </tr>
            ) : (
              hotels.map((hotel, idx) => {
                // Use 'name' for hotel name, fallback to hotelName
                const hotelName = hotel.name || hotel.hotelName || "";
                // Resolve owner name from owner id or object, fallback to hotelOwner
                let ownerName = "";
                if (
                  hotel.owner &&
                  typeof hotel.owner === "object" &&
                  hotel.owner.name
                ) {
                  ownerName = hotel.owner.name;
                } else if (hotel.owner && typeof hotel.owner === "string") {
                  const ownerOption = ownerOptions.find(
                    (o) => String(o.id) === hotel.owner
                  );
                  ownerName = ownerOption ? ownerOption.name : hotel.owner;
                } else if (hotel.hotelOwner) {
                  ownerName = hotel.hotelOwner;
                }
                return (
                  <tr key={idx} className="border-b hover:bg-gray-50">
                    <td className="py-2 px-4">{hotelName}</td>
                    <td className="py-2 px-4">{ownerName}</td>
                    <td className="py-2 px-4 flex justify-center gap-2">
                      <button
                        className="text-blue-500 hover:text-blue-700 transition-colors"
                        title="Edit"
                        onClick={() => onEditHotel(hotel)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="text-red-500 hover:text-red-700 transition-colors"
                        title="Delete"
                        onClick={() => onDeleteHotel(hotel)}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default HotelTable;
