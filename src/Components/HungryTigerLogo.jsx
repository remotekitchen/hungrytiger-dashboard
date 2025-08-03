import React from "react";

const HungryTigerLogo = ({ className = "", size = "default" }) => {
  const sizeClasses = {
    small: "text-lg",
    default: "text-2xl",
    large: "text-3xl",
  };

  return (
    <div className={`font-bold text-black ${className}`}>
      <div className={`${sizeClasses[size]} font-extrabold`}>HungryTiger</div>
      <div className="text-sm font-normal">Eat like a millionaire</div>
    </div>
  );
};

export default HungryTigerLogo;
