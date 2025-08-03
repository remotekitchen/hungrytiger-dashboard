import { useEffect, useRef, useState } from "react";
// import Image1 from "./src/Pages/Homepage/HomePageImages/ChatChef3dlogo.png";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Image1 from "../Pages/HomePage/HomePageImages/Chatchef3dlogo.webp";
import Image2 from "../Pages/HomePage/HomePageImages/techchef_logo.png";
import { userLoggedIn } from "../redux/features/authentication/authenticationSlice";
import HungryTigerLogo from "./HungryTigerLogo";

import { BsFillPersonFill } from "react-icons/bs";

const navigation = [
  // { title: "Home", path: "/home" },
  // { title: "Products", path: "javascript:void(0)" },
  // { title: "Dashboard", path: "/dashboard" },
  // { title: "Why ChatChef", path: "javascript:void(0)" },
  // { title: "Pricing", path: "/pricing" },
  // { title: "Blogs & News", path: "/blogs" },
  // { title: "About Us", path: "/about-us" },
  // { title: "Blogs & News", path: "/blogs" },
];
const NavbarNew = () => {
  const [state, setState] = useState(false);
  const navRef = useRef();
  const auth = useSelector((state) => state.auth);

  //
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/signin");
    localStorage.removeItem("auth");
    dispatch(userLoggedIn({ token: undefined, user_info: {} }));
  };

  const location = useLocation();
  const fullUrl = `${window.location.origin}${location.pathname}${location.search}${location.hash}`;

  // State to store the value
  const [store, setStore] = useState("hungrytiger");

  useEffect(() => {
    if (fullUrl.includes("techchef")) {
      setStore("techchef");
    } else if (fullUrl.includes("chatchef")) {
      setStore("chatchef");
    } else if (fullUrl.includes("remokitchen")) {
      setStore("remokitchen");
    } else if (fullUrl.includes("hungrytiger")) {
      setStore("hungrytiger");
    } else {
      setStore("hungrytiger"); // Default to HungryTiger
    }
  }, [fullUrl]);

  return (
    <nav
      ref={navRef}
      className="bg-gradient-to-r from-yellow-400 to-orange-500 w-full top-0 z-20"
    >
      <div className="items-center px-4 max-w-screen-xl mx-auto md:px-8 lg:flex">
        <div className="flex items-center justify-between py-3 lg:py-4 lg:block">
          {store === "chatchef" && (
            <Link to={auth.token ? "/dashboard/dashboard-overviews" : "/"}>
              <img src={Image1} width={70} height={70} alt="chatchef - logo" />
            </Link>
          )}
          {store === "techchef" && (
            <Link to={auth.token ? "/dashboard/dashboard-overviews" : "/"}>
              <img src={Image2} width={70} height={70} alt="techchef - logo" />
            </Link>
          )}
          {store === "remokitchen" && (
            <Link to={auth.token ? "/dashboard/dashboard-overviews" : "/"}>
              <h1 className="text-2xl font-extrabold">Remote Kitchen</h1>
            </Link>
          )}
          {store === "hungrytiger" && (
            <Link to={auth.token ? "/dashboard/dashboard-overviews" : "/"}>
              <HungryTigerLogo size="large" className="text-white" />
            </Link>
          )}

          <div className="lg:hidden">
            <button
              name="swap-button"
              className="text-sgray-700 outline-none p-2 rounded-md focus:border-gray-400 focus:border"
              onClick={() => setState(!state)}
            >
              {state ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 8h16M4 16h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
        <div
          className={`flex-1 justify-between items-center flex-row-reverse lg:overflow-visible lg:flex lg:pb-0 lg:pr-0 lg:h-auto ${
            state ? "h-screen pb-20 overflow-auto pr-4" : "hidden"
          }`}
        >
          <div>
            <ul className="flex items-center flex-col-reverse space-x-0 lg:space-x-6 lg:flex-row">
              {auth?.token ? (
                <div className="dropdown dropdown-end mx-2">
                  <label
                    tabIndex={0}
                    className="btn btn-ghost btn-circle avatar"
                  >
                    <div className="w-12 rounded-full  bg-green-600 shadow-green-100 shadow-xl ">
                      <div className="avatar pt-2">
                        <BsFillPersonFill size={30} color="white" />
                      </div>
                    </div>
                  </label>
                  <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
                  >
                    <li>
                      <Link
                        to="/settings"
                        onClick={() => setState(false)}
                        className="justify-between"
                      >
                        Settings
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/help"
                        onClick={() => setState(false)}
                        className="justify-between"
                      >
                        Help
                      </Link>
                    </li>
                    <li onClick={handleLogout}>
                      <p>Logout</p>
                    </li>
                  </ul>
                </div>
              ) : (
                <>
                  <li className="mt-4 lg:mt-0">
                    <Link
                      to="/signin"
                      onClick={() => setState(false)}
                      className="py-3 px-4 text-center text-white bg-orange-500 hover:bg-orange-600 rounded-md shadow block lg:inline"
                    >
                      Login
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
          {!auth.token && (
            <div className="flex-1">
              <ul className="justify-end pr-10 items-center space-y-8 lg:flex lg:space-x-6 lg:space-y-0">
                {navigation.map((item, idx) => {
                  if (item.title === "Dashboard" && !auth?.token) {
                    // Skip rendering the "Dashboard" link if the user is not authenticated
                    return null;
                  }
                  return (
                    <li
                      key={idx}
                      className="text-gray-600 hover:text-orange-500"
                    >
                      <Link onClick={() => setState(false)} to={item.path}>
                        {item.title}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default NavbarNew;
