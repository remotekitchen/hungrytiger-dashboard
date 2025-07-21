import React from "react";
import { useNavigate } from "react-router-dom";

const Banner = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-[url('https://images.unsplash.com/photo-1609427468793-2f0e77c388a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1032&q=80')] h-[50rem] min-h-16 bg-no-repeat bg-cover bg-center flex items-center">
      <div className="w-full h-full flex  justify-center items-center backdrop-brightness-50">
        {/* bg content */}
        <div className="mx-40 text-white">
          <h6 className="text-2xl font-semibold text-gray-500">
            Featured Post
          </h6>
          <h1 className="text-7xl font-bold ">
            Ghost Kitchens: The Digital Revolution of Dining
          </h1>
          <button
            name="read"
            onClick={() => navigate(`/blogs/ghost-kitchens`)}
            className="btn btn-primary text-white my-8 font-bold rounded-full"
          >
            Read About It
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;
