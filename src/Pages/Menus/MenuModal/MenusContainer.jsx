import React from "react";
import MenuDetailsFilterButton from "./MenuDetailsFilterButton";
import AllMenus from "./AllMenus";
import { Outlet } from "react-router-dom";

const MenuContainer = () => {
  return (
    <div className="px-16 my-12">
      {/*  */}

      {/*  */}
      <Outlet />
    </div>
  );
};

export default MenuContainer;
