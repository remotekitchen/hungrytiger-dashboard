import React from "react";

const RFMHeader = () => {
  return (
    <div className="flex justify-between items-center p-5">
      <div>
        <h2 className="font-roboto text-3xl font-bold">Menu Performance</h2>
      </div>
      <div>
        {/* select category  */}
        <form>
          <div className="flex items-center gap-3">
            <select className="select select-bordered select-sm w-auto bg-white">
              <option selected>All Restaurant & Stores</option>
              <option>Restaurant One</option>
              <option>Restaurant One</option>
              <option>Restaurant Three</option>
            </select>
            <select className="select select-bordered select-sm w-auto bg-white">
              <option selected>All Channels</option>
              <option>Channel One</option>
              <option>Channel Two</option>
            </select>
            <select className="select select-bordered select-sm w-auto bg-white">
              <option selected>Sort By Day</option>
              <option>Monday</option>
              <option>Tuesday</option>
              <option>Wednesday</option>
              <option>Thursday</option>
              <option>Friday</option>
            </select>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RFMHeader;
