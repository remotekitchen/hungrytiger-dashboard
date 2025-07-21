import React from "react";

const RestaurantnList = ({name}) => {
  return (
    <>
      <div className="form-control justify-start">
        <label className="label cursor-pointer p-1 justify-start">
          <span className="label-text me-1">{name}</span>
          <input type="checkbox" className="checkbox checkbox-success" />
        </label>
      </div>
      <hr className="me-4 my-1" />
    </>
  );
};

export default RestaurantnList;
