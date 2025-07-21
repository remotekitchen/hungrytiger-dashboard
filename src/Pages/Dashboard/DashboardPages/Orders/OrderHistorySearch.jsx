import React from "react";
import { BiSearch } from "react-icons/bi";

const OrderHistorySearch = () => {
  return (
    <div className="relative ">
      <input
        type="text"
        placeholder="Search..."
        className="border rounded-l-lg outline-none px-10 py-2 w-[250px]"
      />
      <div className=" absolute top-1 right-3">
        <BiSearch className="text-2xl text-[#697077]" />
      </div>
    </div>
  );
};

export default OrderHistorySearch;
