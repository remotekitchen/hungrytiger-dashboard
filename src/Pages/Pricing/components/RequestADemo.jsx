import React from "react";
import { NavLink } from "react-router-dom";

const RequestADemo = () => {
  return (
    <NavLink
      className="btn glass btn-lg text-white font-bold text-xl bg-sky-400 hover:text-black hover:bg-sky-200"
      to="/getademo"
    >
      Request A Demo
    </NavLink>
  );
};

export default RequestADemo;
