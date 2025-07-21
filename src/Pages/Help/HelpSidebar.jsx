import React from 'react'
const helpData = [
    { id: 1, name: "Customer Support" },
    { id: 2, name: "FAQ" },
        
  ];

const HelpSidebar = ({value, onClick}) => {
  return (
    <aside className="h-[70vh] overflow-y-scroll w-[240px]">
    <ul className="list-none flex flex-col gap-2 capitalize m-0">
      {helpData.map((item) => (
        <li
          onClick={() => onClick(item?.name)}
          className={` ${
            value === item?.name ? "bg-[#42C2FF] text-white rounded-lg" : ""
          } transition-all duration-300 h-12  flex justify-start items-center px-8 cursor-pointer hover:bg-[#42C2FF] hover:rounded-lg`}
          key={item?.id}
        >
          {item?.name}
        </li>
      ))}
    </ul>
  </aside>
  )
}

export default HelpSidebar
  