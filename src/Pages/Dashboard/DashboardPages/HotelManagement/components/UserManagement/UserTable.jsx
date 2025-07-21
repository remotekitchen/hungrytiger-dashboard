import React from "react";
import { FaEdit, FaSearch, FaTrash } from "react-icons/fa";

const UserTable = ({
  users,
  search,
  onSearchChange,
  onEditUser,
  onDeleteUser,
  onAddUser,
  isLoading,
  isError,
  error,
}) => {
  if (isLoading) {
    return (
      <div className="py-8 text-center text-gray-500">Loading users...</div>
    );
  }
  if (isError) {
    return (
      <div className="py-8 text-center text-red-500">
        {error?.data?.message || "Failed to load users."}
      </div>
    );
  }
  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <div className="relative w-full max-w-xs">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="border rounded-lg py-2 pl-10 pr-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
        <button
          className="px-6 py-2 rounded-lg bg-green-500 text-white font-semibold shadow ml-4 hover:bg-green-600 transition-colors"
          onClick={onAddUser}
        >
          Add User
        </button>
      </div>
      <div className="overflow-x-auto bg-white rounded-lg shadow p-4">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 text-left font-semibold">Name</th>
              <th className="py-2 px-4 text-left font-semibold">Email</th>
              <th className="py-2 px-4 text-center font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan={3} className="text-center py-4 text-gray-400">
                  No users found.
                </td>
              </tr>
            ) : (
              users.map((user, idx) => (
                <tr key={idx} className="border-b hover:bg-gray-50">
                  <td className="py-2 px-4">
                    {user.first_name || user.last_name
                      ? `${user.first_name || ""} ${
                          user.last_name || ""
                        }`.trim()
                      : user.company_name || user.email}
                  </td>
                  <td className="py-2 px-4">{user.email}</td>
                  <td className="py-2 px-4 flex justify-center gap-2">
                    <button
                      className="text-blue-500 hover:text-blue-700 transition-colors"
                      title="Edit"
                      onClick={() => onEditUser(user)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700 transition-colors"
                      title="Delete"
                      onClick={() => onDeleteUser(user)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UserTable;
