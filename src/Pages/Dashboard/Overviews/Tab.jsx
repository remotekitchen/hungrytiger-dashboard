import React from "react";

const Tab = ({ tabData, selectedTab, onTabClick }) => {
  return (
    <div className="">
      <div className="tabs">
        {tabData.map((data, index) => (
          <li
            key={index}
            onClick={() => onTabClick(data.name)}
            className={`tab text-xl tab-lifted ${
              selectedTab === data.name && "tab-active"
            }`}
          >
            {data.name}
          </li>
        ))}
      </div>
    </div>
  );
};

export default Tab;
