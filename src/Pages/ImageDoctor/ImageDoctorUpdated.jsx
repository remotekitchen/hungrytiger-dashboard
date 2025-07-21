import React, { useState } from "react";

const ImageDoctorUpdated = () => {
  const [excelUrl, setExcelUrl] = useState("");
  const [excelName, setExcelName] = useState("");
  const handleExcelFormSubmission = (e) => {
    const excelObj = {
      excelUrl: e.target.excelUrl.value,
      excelName: e.target.excelName.value,
    };
  };
  return (
    <>
      <div className="grid grid-cols-2">
        <div className="border-2">
          {/* excel uploading section starts here */}
          <form onSubmit={handleExcelFormSubmission} className="">
            <h1 className="text-2xl text-center mt-2">Read excel</h1>
            <div className="mb-2 flex flex-col items-center">
              <input
                id=""
                name="excelUrl"
                type="text"
                className="input input-bordered w-full max-w-xs my-2"
                placeholder="Excel url"
              />
              <input
                id="excel-name"
                type="text"
                name="excelName"
                className="input input-bordered w-full max-w-xs my-2"
                placeholder="Excel name"
              />
              <button id="" className="btn btn-primary text-white my-2">
                Read
              </button>
            </div>
          </form>
          {/* excel uploading section ends here */}
        </div>
        <div className=" border-2">
          {/* image generating section starts here */}
          <form className="">
            <h1 className="text-2xl text-center mt-2">Read excel</h1>
            <div className="mb-2 flex flex-col items-center">
              <input
                id=""
                type="text"
                className="input input-bordered w-full max-w-xs my-2"
                placeholder="Excel url"
              />
              <input
                id="excel-name"
                type="text"
                className="input input-bordered w-full max-w-xs my-2"
                placeholder="Excel name"
              />
              <button id="" className="btn btn-primary text-white my-2">
                Read
              </button>
            </div>
          </form>
          {/* image generating section ends here */}
        </div>
      </div>
    </>
  );
};

export default ImageDoctorUpdated;
