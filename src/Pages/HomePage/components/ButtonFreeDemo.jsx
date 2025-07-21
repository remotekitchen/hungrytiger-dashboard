import React from "react";
import { NavLink } from "react-router-dom";

const ButtonFreeDemo = () => {
  return (
    <NavLink
      className="btn glass btn-lg  font-bold text-xl bg-yellow-500 hover:text-black hover:bg-sky-700"
      to="/getademo"  
    >
      Get a Free Demo
    </NavLink>
  );
};

export default ButtonFreeDemo;
