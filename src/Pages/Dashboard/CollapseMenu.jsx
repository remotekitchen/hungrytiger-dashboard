import React, { useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";
import styles from "../Dashboard/Dashboard.module.css";

const CollapseMenu = ({ menus }) => {
  const { menuName, subMenus, menuIcon } = menus;
  const { pathname } = useLocation();
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleCollapse = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    // Keep the submenu expanded if the current path includes any submenu link
    const anySubMenuActive = subMenus.some((subMenu) =>
      pathname.includes(subMenu.subMenuLink)
    );
    if (anySubMenuActive) {
      setIsExpanded(true);
    }
  }, [pathname, subMenus]);

  return (
    <div className="collapse collapse-arrow text-gray-500 my-2 font-bold">
      <div
        className={`font-medium rounded-lg my-3 cursor-pointer flex justify-between items-center`}
        onClick={toggleCollapse}
      >
        <div className="flex items-center">
          {menuIcon}
          <p className="ms-3 font-bold">{menuName}</p>
        </div>
        <div>
          <IoIosArrowDown
            className={`text-2xl ${isExpanded ? "rotate-180" : ""}`}
          />
        </div>
      </div>
      {isExpanded && (
        <div className="px-0 bg-gray-100">
          <ul>
            {subMenus.map((subMenu) => (
              <li key={subMenu.subMenuLink}>
                <Link
                  className={`text-gray-500 my-2 font-bold ${
                    styles.dashboardLink
                  } ${
                    pathname.includes(`dashboard${subMenu.subMenuLink}`) &&
                    styles.dashboardLink_active
                  }`}
                  to={`/dashboard${subMenu.subMenuLink}`}
                >
                  {subMenu.subMenuIcon}
                  {subMenu.subMenuName}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CollapseMenu;
