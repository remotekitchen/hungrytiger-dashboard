import React, { useState } from "react";
import Categories from "./Categories";
import ItemsWithoutPagination from "./ItemsWithoutPagination";
import Menu from "./Menu";
import ModifierGroup from "./ModifierGroup";
import Modifiers from "./Modifiers/Modifiers";
import Overview from "./Overview";
import Restaurants from "./Restaurants";

const AddEditMenus = () => {
  const [activeSection, setActiveSection] = useState("overview");

  const handleSectionClick = (section) => {
    setActiveSection(section);
  };

  return (
    <div className="p-5">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold mb-7">Add/Edit Menus</h1>
        {/* <div className="flex gap-3">
          <button className="bg-[#42C2FF] text-white px-4 py-2 rounded-lg">
            Online Menu
          </button>
          <button className="border border-[#42C2FF] text-[#42C2FF] px-4 py-2 rounded-lg">
            Restaurant Menu
          </button>
        </div> */}
      </div>
      <div className="flex justify-between items-center  h-12 border-b border-b-[#DDE1E6]">
        <div className="flex gap-4">
          <div
            className={`cursor-pointer ${
              activeSection === "overview"
                ? "text-[#12516F] border-b-2 border-b-[#12516F]"
                : "text-black"
            }`}
            onClick={() => handleSectionClick("overview")}
          >
            Overview
          </div>
          <div
            className={`cursor-pointer ${
              activeSection === "restaurants"
                ? "text-[#12516F] border-b-2 border-b-[#12516F]"
                : "text-black"
            }`}
            onClick={() => handleSectionClick("restaurants")}
          >
            Restaurants
          </div>
          <div
            className={`cursor-pointer ${
              activeSection === "menus"
                ? "text-[#12516F] border-b-2 border-b-[#12516F]"
                : "text-black"
            }`}
            onClick={() => handleSectionClick("menus")}
          >
            Menus
          </div>
          <div
            className={`cursor-pointer ${
              activeSection === "categories"
                ? "text-[#12516F] border-b-2 border-b-[#12516F]"
                : "text-black"
            }`}
            onClick={() => handleSectionClick("categories")}
          >
            Categories
          </div>
          <div
            className={`cursor-pointer ${
              activeSection === "items"
                ? "text-[#12516F] border-b-2 border-b-[#12516F]"
                : "text-black"
            }`}
            onClick={() => handleSectionClick("items")}
          >
            Items
          </div>
          {/* !DO NOT REMOVE THIS CODE, I WILL USE IT LATER  */}
          {/* <div
            className={`cursor-pointer ${
              activeSection === "Modifier"
                ? "text-[#12516F] border-b-2 border-b-[#12516F]"
                : "text-black"
            }`}
            onClick={() => handleSectionClick("Modifier")}
          >
            Modifiers
          </div> */}
          <div
            className={`cursor-pointer ${
              activeSection === "Modifier groups"
                ? "text-[#12516F] border-b-2 border-b-[#12516F]"
                : "text-black"
            }`}
            onClick={() => handleSectionClick("Modifier groups")}
          >
            Modifier groups
          </div>
          <div
            className={`cursor-pointer ${
              activeSection === "Modifier"
                ? "text-[#12516F] border-b-2 border-b-[#12516F]"
                : "text-black"
            }`}
            onClick={() => handleSectionClick("Modifier")}
          >
            Modifier Items
          </div>
        </div>
        <div className="flex items-center gap-3">
          {/* <div className="text-[#42C2FF]">Published</div>
          <div>
                        <button className='bg-[#DA1E28] text-white px-4 py-2 rounded-lg'>Cancel Changes</button>
                    </div>
          <div>
            <button className="bg-[#42C2FF] text-white px-4 py-2 rounded-lg">
              Publish Changes
            </button>
          </div>
          <div className="text-[#42C2FF] flex items-center gap-1">
            <AiOutlineEye className="text-xl" />
            <span>View Online</span>
          </div> */}
          <button
            onClick={() => window.print()}
            className="btn btn-sm btn-primary text-white block ms-auto my-3"
          >
            Print
          </button>
        </div>
      </div>
      {activeSection === "overview" && <Overview />}
      {activeSection === "restaurants" && <Restaurants />}
      {activeSection === "menus" && <Menu />}
      {activeSection === "categories" && (
        <Categories activeSection={activeSection} />
      )}
      {/* {activeSection === "items" && <Items activeSection={activeSection} />} */}
      {activeSection === "items" && (
        <ItemsWithoutPagination activeSection={activeSection} />
      )}
      {activeSection === "Modifier groups" && <ModifierGroup />}
      {activeSection === "Modifier" && (
        <Modifiers activeSection={activeSection} />
      )}
    </div>
  );
};

export default AddEditMenus;
