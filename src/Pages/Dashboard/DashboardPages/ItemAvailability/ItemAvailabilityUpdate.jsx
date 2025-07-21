import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";
import { availabilityData } from "../../../../data/data";

const ItemAvailabilityUpdate = () => {
  const [activeSection, setActiveSection] = useState("all");
  const [activeItem, setActiveItem] = useState("change-for-both");

  const handleSectionClick = (section) => {
    setActiveSection(section);
  };

  const handleItemClick = (item) => {
    setActiveItem(item);
  };

  return (
    <div className="p-5">
      <h1 className="text-4xl font-bold mb-2">Item Availability</h1>
      <div className="flex gap-4  mb-7">
        <div
          className={`cursor-pointer ${
            activeItem === "change-for-both" ? "text-black" : "text-gray-500"
          }`}
          onClick={() => handleItemClick("change-for-both")}
        >
          Change for both
        </div>
        <div
          className={`cursor-pointer ${
            activeItem === "online-ordering" ? "text-black" : "text-gray-500"
          }`}
          onClick={() => handleItemClick("online-ordering")}
        >
          Online Ordering
        </div>
        <div
          className={`cursor-pointer ${
            activeItem === "digital-menu" ? "text-black" : "text-gray-500"
          }`}
          onClick={() => handleItemClick("digital-menu")}
        >
          Digital Menu
        </div>
      </div>
      <div className="flex justify-between items-center  h-12 border-b border-b-[#DDE1E6]">
        <div className="flex gap-4">
          <div
            className={`cursor-pointer ${
              activeSection === "all"
                ? "text-[#12516F] border-b-2 border-b-[#12516F]"
                : "text-black"
            }`}
            onClick={() => handleSectionClick("all")}
          >
            All
          </div>
          <div
            className={`cursor-pointer ${
              activeSection === "available"
                ? "text-[#12516F] border-b-2 border-b-[#12516F]"
                : "text-black"
            }`}
            onClick={() => handleSectionClick("available")}
          >
            Available
          </div>
          <div
            className={`cursor-pointer ${
              activeSection === "unavailable"
                ? "text-[#12516F] border-b-2 border-b-[#12516F]"
                : "text-black"
            }`}
            onClick={() => handleSectionClick("unavailable")}
          >
            Unavailable
          </div>
        </div>
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
      <div className="overflow-x-auto mt-4">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead className="bg-gray-200">
            <tr className="text-left">
              <th className="p-2">
                <input type="checkbox" />
              </th>
              <th className="p-2">Item Name</th>
              <th className="p-2">Category</th>
              <th className="p-2">Price</th>
              <th className="p-2">Availability</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {availabilityData.map((item, index) => (
              <tr key={index}>
                <td className="p-2">
                  <input type="checkbox" />
                </td>
                <td className="p-2">{item.itemName}</td>
                <td className="p-2">{item.category}</td>
                <td className="p-2">{item.price}</td>
                <td className="p-2">{item.availability}</td>
                <td className="p-2">
                  <button className="bg-[#42C2FF] text-white px-4 py-2 rounded-lg mt-4">
                    Change Availability
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end">
        <button className="bg-[#42C2FF] text-white px-4 py-2 rounded-lg mt-4">
          Unavailable indefinitely
        </button>
        <button className="bg-[#42C2FF] text-white px-4 py-2 rounded-lg mt-4 ml-4">
          Unavailable today
        </button>
        <button className="bg-[#42C2FF] text-white px-4 py-2 rounded-lg mt-4 ml-4">
          Available
        </button>
      </div>
    </div>
  );
};

export default ItemAvailabilityUpdate;
