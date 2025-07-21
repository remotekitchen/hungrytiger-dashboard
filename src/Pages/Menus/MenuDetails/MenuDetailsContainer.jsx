import React from "react";
import { Outlet, useParams } from "react-router-dom";
import MenuDetailsFilterButton from "../MenuModal/MenuDetailsFilterButton";

const MenuDetailsContainer = () => {
  const { menuId } = useParams();

  //
  const buttonData = [
    { name: "overview", navigate: `/menus/all-menus/${menuId}/overview` },
    { name: "categories", navigate: `/menus/all-menus/${menuId}/categories` },
    { name: "items", navigate: `/menus/all-menus/${menuId}/items` },
    { name: "photos", navigate: `/menus/all-menus/${menuId}/photos` },
    /* {
      name: "modifier groups",
      navigate: `/menus/all-menus/${menuId}/modifier`,
    }, */
  ];

  return (
    <div>
      <div className="px-16 my-12">
        {buttonData.map((data) => (
          <MenuDetailsFilterButton key={Math.random().toString()} data={data} />
        ))}
      </div>
      <Outlet />
    </div>
  );
};

export default MenuDetailsContainer;
