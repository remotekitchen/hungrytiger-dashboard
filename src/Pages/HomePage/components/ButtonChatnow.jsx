import React from "react";
import { NavLink } from "react-router-dom";

const ButtonChatnow = () => {
  return (
    <NavLink
      className="btn glass btn-lg  text-black bg-yellow-400  font-bold text-xl hover:text-black hover:bg-sky-500"
      to="/getademo"
    >
      Book Demo
    </NavLink>
  );
};
export default ButtonChatnow;
