import React from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa"; // Importing the arrow icon from react-icons

const CardsHome = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h2 className="font-bold text-center text-2xl sm:text-2xl xl:text-3xl 2xl:text-5xl mt-8">
        Everything you need to succeed
      </h2>
      <div className="flex justify-center items-center mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* First Card */}
          <div
            onClick={() => navigate("/order-management")}
            className="card w-96 bg-sky-200 h-120 rounded-lg shadow-md p-4 transition-transform transform hover:scale-105 hover:shadow-lg"
          >
            <div className="card-body">
              <h2 className="card-title text-5xl font-semibold mb-4">
                Order Management
              </h2>
              <p className="text-gray-700 mb-6 text-3xl">
                Simplify your ordering process through user-friendly websites,
                apps, kiosks, and even directly from your tables.
              </p>
              <FaArrowRight className="text-gray-500" size={28} />
            </div>
          </div>

          {/* Second Card */}
          <div
            onClick={() => navigate("/boost-your-sale")}
            className="card w-96 bg-sky-200 h-120 rounded-lg shadow-md p-4 transition-transform transform hover:scale-105 hover:shadow-lg"
          >
            <div className="card-body">
              <h2 className="card-title text-5xl font-semibold mb-4">
                Boost Your Sales
              </h2>
              <p className="text-gray-700  text-3xl mb-6">
                Use built-in tools to get more customers and keep them coming
                back.
              </p>
              <FaArrowRight className="text-gray-500" size={28} />
            </div>
          </div>

          {/* Third Card */}
          <div
            onClick={() => navigate("/hassle-free-delivery")}
            className="card w-96 bg-sky-200 h-120 rounded-lg shadow-md p-4 transition-transform transform hover:scale-105 hover:shadow-lg"
          >
            <div className="card-body">
              <h2 className="card-title text-5xl font-semibold mb-4">
                Hassle-Free Delivery
              </h2>
              <p className="text-gray-700 text-3xl mb-6">
                We help you set up quick commission-free delivery.
              </p>
              <FaArrowRight className="text-gray-500" size={28} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardsHome;
