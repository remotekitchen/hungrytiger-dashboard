import { useEffect, useRef, useState } from "react";
import { toast } from "react-hot-toast";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useChangePasswordMutation } from "../../../redux/features/Account/accountApi";

const ResetPasswordModal = ({ visible, setVisible, handleClosed }) => {
  const [password, setPassword] = useState("");
  const [old_password, setOldPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  const type1 = show1 ? "text" : "password";
  const type2 = show2 ? "text" : "password";
  const type3 = show3 ? "text" : "password";

  const auth = useSelector((state) => state.auth);

  const [changePassword, { isLoading, isError, isSuccess, error }] =
    useChangePasswordMutation();

  const resetpassRef = useRef();

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (
        visible &&
        resetpassRef.current &&
        !resetpassRef.current.contains(e.target)
      ) {
        setVisible(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [visible, setVisible]);

  const changeType1 = () => {
    setShow1(!show1);
  };
  const changeType2 = () => {
    setShow2(!show2);
  };
  const changeType3 = () => {
    setShow3(!show3);
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (old_password === "") {
      toast.error("Please enter your current password.");
      return;
    }

    if (password === "") {
      toast.error("Please enter a new password.");
      return;
    }
    if (confirmPassword === "") {
      toast.error("Please confirm your new password.");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("New password and confirm password do not match.");

      return;
    }

    changePassword({ old_password, password });
  };
  // // console.log("error", error)

  useEffect(() => {
    if (isSuccess) {
      toast.success("Password changed successfully");
      setOldPassword("");
      setPassword("");
      setConfirmPassword("");
      handleClosed();
    }

    if (isError) {
      if (error.data.old_password) {
        toast.error("Your current password is incorrect.");
      }
      if (error.data.password) {
        error.data.password.map((err) => {
          toast.error(err);
        });
      }
    }
  }, [error, isError, isSuccess]);

  return (
    <div
      className={`fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  ${
        visible
          ? "w-full justify-center items-center flex backdrop-blur bg-black/20 h-screen z-10"
          : "z-[-10]"
      }`}
    >
      <div
        ref={resetpassRef}
        className={` transition-all duration-300 ${
          visible ? "scale-100" : "scale-0"
        }`}
      >
        <form
          className="p-4  bg-white shadow-md rounded-lg w-[50vh]"
          onSubmit={handlePasswordChange}
        >
          <h2 className="text-2xl my-2 text-center">Change your password</h2>
          <hr className="boder border-black" />
          <div className="p-2 relative">
            <label htmlFor="oldPassword" className="block mb-2 font-medium">
              Current Password
            </label>
            <input
              type={type1}
              id="oldPassword"
              className="border border-black py-1 w-full rounded-md outline-none px-2"
              placeholder="Enter your current password"
              value={old_password}
              onChange={(e) => setOldPassword(e.target.value)}
            />
            <span
              className="absolute right-5 top-[57px] transform -translate-y-1/2 cursor-pointer"
              onClick={() => changeType1()}
            >
              {show1 ? <BsEye className="" /> : <BsEyeSlash className="" />}
            </span>
          </div>
          <div className="p-2 relative">
            <label htmlFor="newPassword" className="block mb-2 font-medium ">
              New Password
            </label>
            <input
              type={type2}
              id="newPassword"
              className="border border-black py-1 w-full rounded-md outline-none px-2"
              placeholder="Enter your new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="absolute right-5 top-[57px] transform -translate-y-1/2 cursor-pointer"
              onClick={() => changeType2()}
            >
              {show2 ? <BsEye className="" /> : <BsEyeSlash className="" />}
            </span>
          </div>
          <div className="p-2 relative">
            <label
              htmlFor="confirmPassword"
              className="block mb-2 font-medium "
            >
              Confirm Password
            </label>
            <input
              type={type3}
              id="confirmPassword"
              className="border border-black py-1 w-full rounded-md outline-none px-2"
              placeholder="Confirm your new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <span
              className="absolute right-5 top-[57px] transform -translate-y-1/2 cursor-pointer"
              onClick={() => changeType3()}
            >
              {show3 ? <BsEye className="" /> : <BsEyeSlash className="" />}
            </span>
          </div>
          <div className="flex  py-3">
            <button
              disabled={isLoading}
              type={"submit"}
              className="flex w-full justify-center text-white bg-[#1363DF] p-2 rounded-lg"
            >
              Confirm New password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordModal;
