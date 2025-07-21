import React, { useContext } from "react";
import { FiArrowLeft } from "react-icons/fi";
import { useSelector } from "react-redux";
import { showModal } from "../../redux/features/modal/modalSlice.js";
import { useDispatch } from "react-redux";
import doordash from "../../assets/platform_logos/Doordash.webp";
import skipthedishes from "../../assets/platform_logos/skip-the-dishes.webp";
import ubereats from "../../assets/platform_logos/uber_eats.webp";
import hungrypanda from "../../assets/platform_logos/hungrypanda.webp";

const SelectPlatform = () => {
  const dispatch = useDispatch();
  const { selectedPlatform } = useSelector((state) => state.selectedPlatform);
  let itemData = {
    logo: null,
    name: "",
  };

  if (selectedPlatform === "doordash") {
    itemData.logo = doordash;
    itemData.name = "doordash";
  } else if (selectedPlatform === "skip the dishes") {
    itemData.logo = skipthedishes;
    itemData.name = "skip the dishes";
  } else if (selectedPlatform === "uber eats") {
    itemData.logo = ubereats;
    itemData.name = "uber eats";
  } else if (selectedPlatform === "hungrypanda") {
    itemData.logo = hungrypanda;
    itemData.name = "hungrypanda";
  }
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* Left Column */}
      <div className="flex flex-col justify-center items-center bg-gray-100 text-gray-700 p-8 md:w-1/2">
        <img
          src={
            itemData.logo
              ? itemData.logo
              : "https://pnggrid.com/wp-content/uploads/2021/05/Transparent-Doordash-Logo-2048x235.png"
          } // Replace with the path to your logo image
          alt="Logo"
          className="w-1/2 h-auto mb-2"
        />
        <h2 className="font-bold mb-4 text-center text-lg">
          <span className="text-lg">Enter the login you use for your</span>
          <br />
          <span className="capitalize">{itemData.name}</span> merchant portal
        </h2>
        <form className="w-full max-w-sm">
          <div className="mb-4">
            <label htmlFor="email" className="text-lg">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full bg-gray-200 border border-gray-300 px-3 py-2 rounded-sm"
              placeholder="Enter your email"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="text-lg">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full bg-gray-200 border border-gray-300 px-3 py-2 rounded-sm"
              placeholder="Enter your password"
            />
          </div>
          <button
            name="signin"
            type="submit"
            className="w-full bg-green-500 text-white py-2 px-4 rounded-sm hover:bg-green-600 transition-colors duration-300"
          >
            Sign In
          </button>
        </form>
      </div>

      {/* Right Column */}
      <div className="relative bg-primary text-white p-8 md:w-1/2 flex flex-col justify-center items-center">
        <h3 className="text-2xl font-bold mb-4 text-center">
          Platform Information
        </h3>
        <p className="text-sm text-center">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
          consectetur risus non massa lobortis, sit amet tristique leo cursus.
          Donec volutpat lacinia velit id feugiat. Vestibulum ante ipsum primis
          in faucibus orci luctus et ultrices posuere cubilia Curae; Donec
          eleifend leo ac ligula posuere, in vestibulum leo viverra. Duis
          faucibus lacinia varius. Suspendisse at velit et sem eleifend
          convallis nec vel quam.
        </p>
        <label
          onClick={() => dispatch(showModal(true))}
          htmlFor="authOverlay"
          className="cursor-pointer bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-full absolute top-0 right-0 m-4"
        >
          <FiArrowLeft />
        </label>
        {/* <label htmlFor="authOverlay" className="btn btn-primary text-white">
          open modal
        </label> */}
      </div>
    </div>
  );
};

export default SelectPlatform;
