import React from "react";

const TopMenuHeader = () => {
  return (
    <div>
      <form>
        <div className="flex items-center gap-3">
          <select className="select select-bordered select-sm w-auto bg-white">
            <option selected>Top 10 items</option>
            <option>Item One</option>
            <option>Item Two</option>
            <option>Item Three</option>
          </select>
          <select className="select select-bordered select-sm w-auto bg-white">
            <option selected>Price</option>
            <option>$350</option>
            <option>$520</option>
            <option>$875</option>
          </select>
        </div>
      </form>
    </div>
  );
};

export default TopMenuHeader;
