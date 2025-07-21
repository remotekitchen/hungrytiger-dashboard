import { Outlet } from "react-router-dom";
import AuthOverlayModal from "./Authentication/AuthOverlay/AuthOverlayModal";
import { useSelector } from "react-redux";
import Navbar from "../Components/Navbar";
import ChatPopUp from "./Chats/ChatPopUp";
import ChatModal from "./Chats/ChatModal/ChatModal";
import NavbarNew from "../Components/NavbarNew";
import AboutUs from "./AboutUs/AboutUs";
import Getintouch from "./Contactus/GetintouchDigitalMenu";
import CustomerSupport from "./Contactus/Customersupport";

const Main = () => {
  const { showModal } = useSelector((state) => state.modalReducer);
  return (
    <div className="">
      {showModal && <AuthOverlayModal />}
      {/* <Navbar /> */}
      <NavbarNew />
      <ChatModal />
      <Outlet />
      {/* <ChatPopUp /> */}
    </div>
  );
};

export default Main;
