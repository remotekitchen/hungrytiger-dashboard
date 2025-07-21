import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import CollapseMenu from "./CollapseMenu";
import { sidebarCollapseMenus } from "./CollapseMenuConstant";

const Dashboard = () => {
  // const { pathname } = useLocation();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isLanguageOpen, setLanguageOpen] = useState(false);

  const fullUrl = window.location.href;
  const isremokitchen = fullUrl.includes("remokitchen");

  const filteredMenus = sidebarCollapseMenus
    .map((menu) => {
      // Check if the current menu is "Marketing"
      if (menu.menuName === "Marketing") {
        return {
          ...menu,
          subMenus: menu.subMenus.filter(
            (subMenu) =>
              !(isremokitchen && subMenu.subMenuName === "Fission Campaigns") // Hide only for remotekitchen
          ),
        };
      }
      // Return other menus without changes
      return menu;
    })
    .filter((menu) => !isremokitchen || menu.menuName !== "Communication");

  console.log(filteredMenus, "filteredMenus");
  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const toggleLanguage = () => {
    setLanguageOpen(!isLanguageOpen);
  };
  const sideNavs = (
    <>
      {/*  <li>
        <Link
          className={`text-gray-500 my-2 font-bold`}
          to="/dashboard/overviews"
        >
          <CgMenuGridO size={25} />
          Overview
        </Link>
      </li>
      <li>
        <Link


          className={`text-gray-500 my-2 font-bold ${styles.dashboardLink} ${
            (pathname.includes("dashboard/menus") ||

              pathname === "/dashboard") &&
            styles.dashboardLink_active
          }`}
          to="/dashboard/menus"
        >
          <MdFastfood size={20} />
          Menu
        </Link>
      </li>
      <li>
        <Link
          className={`text-gray-500 my-2 font-bold ${styles.dashboardLink} ${
            pathname.includes("dashboard/restaurent") &&
            styles.dashboardLink_active
          }`}
          to="/dashboard/restaurent"
        >
          <BiRestaurant size={20} />
          Restaurents
        </Link>
      </li> */}
      {/* expandable menus */}
      {filteredMenus.map((menus) => (
        <CollapseMenu
          menus={menus}
          key={Math.random().toString() * 191919119}
        />
      ))}
    </>
  );
  return (
    <>
      <div className="drawer drawer-mobile">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* <!-- Page content here --> */}
          <Outlet />
          <label
            htmlFor="my-drawer-2"
            className="btn text-white btn-primary drawer-button lg:hidden"
          >
            Open Dashboard
          </label>
        </div>
        <div className=" overflow-y-scroll">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <ul className="menu p-6 pb-32 px-8 w-80 bg-[#fffdfda6] text-base-content z-10">
            {/* <!-- Sidebar content here --> */}
            {sideNavs}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
