import React from "react";

const BlogsFilter = ({ selectedBtn, setSelectedBtn }) => {
  const btnFilterArr = [
    "All",
    "Experience",
    "Mobile Apps",
    "Online Ordering",
    "Restaurant Data",
    "Restaurant Marketing",
    "Restaurant News",
  ];
  return (
<div>
  <div className="flex flex-wrap items-center justify-center my-2">
    {btnFilterArr.map((item, i) => (
      <button
        name={item}
        key={i}
        className={`btn min-w-[60px] sm:min-w-[80px] rounded-full my-1 mx-1 
        ${selectedBtn === item 
          ? "btn-primary text-white" 
          : "bg-white hover:bg-white hover:border-primary border-primary text-primary"
        }`}
      >
        {item}
      </button>
    ))}
  </div>
</div>

  );
};

export default BlogsFilter;
