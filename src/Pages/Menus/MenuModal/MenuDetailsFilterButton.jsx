import React, { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

const MenuDetailsFilterButton = ({ data }) => {
  const { name, navigate } = data || {};
  const { pathname } = useLocation();
  const [buttonContent, setButtonContent] = useState("");
  const handleMenuDetailsButtonClick = (e) => {
    setButtonContent(e.target.innerText);
  };
  return (
    <NavLink
      className={({ isActive, isPending }) =>
        isPending
          ? "pending"
          : isActive
          ? "bg-primary btn btn-sm mx-2 capitalize text-white hover:text-white hover:bg-primary border-none "
          : "btn btn-sm mx-2 capitalize text-black bg-white hover:text-white hover:bg-primary border-none"
      }
      to={navigate}
    >
      <button
        name={name}
        onClick={handleMenuDetailsButtonClick}
        className={`"
        }`}
      >
        {name}
      </button>
    </NavLink>
  );
};

export default MenuDetailsFilterButton;
