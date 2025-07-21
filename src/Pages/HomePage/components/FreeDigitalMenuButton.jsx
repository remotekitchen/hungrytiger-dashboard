import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const FreeDigitalMenuButton = () => {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const interval = setInterval(() => {
      setScale(prevScale => (prevScale === 1 ? 1.1 : 1));
    }, 500); // Change the interval time to make the animation faster or slower

    return () => clearInterval(interval);
  }, []);

  const buttonStyle = {
    transform: `scale(${scale})`,
    transition: "transform 0.5s ease",
    boxShadow: "0px 4px 6px, 0px 1px 3px",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    // background: "linear-gradient(to bottom, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.7))",
    // color: "white",
    textShadow: "0px 1px 1px rgba(0, 0, 0, 0.2)"
  };

  return (
    <NavLink
      style={buttonStyle}
      className="btn glass btn-lg font-bold text-xl  bg-yellow-500 text-black  hover:bg-sky-500"
      to="/getademo"
    >
      Book a Free Demo
    </NavLink>
  );
};

export default FreeDigitalMenuButton;
