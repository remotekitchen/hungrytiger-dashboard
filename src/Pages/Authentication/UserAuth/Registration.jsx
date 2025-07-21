import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../../redux/features/authentication/authenticationApi";
// import sparkleStars from "../../../assets/register/sparkleStars.png"
import ChatChefBg from "../../../assets/register/ChatChefBg.jpg";

const Registration = () => {
  const countryCodes = [
    { code: "+1", name: "USA" },
    { code: "+44", name: "UK" },
    { code: "+91", name: "India" },
    { code: "+61", name: "Australia" },
    { code: "+86", name: "China" },
    { code: "+1", name: "Canada" },
  ];
  const [register, { isLoading, isError, error, isSuccess }] =
    useRegisterMutation();
  const navigate = useNavigate();
  const [isMatchedPass, setIsMatchedPass] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [referCode, setReferCode] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  useEffect(() => {
    if (password !== confirmPassword) {
      setIsMatchedPass(false);
    } else {
      setIsMatchedPass(true);
    }
  }, [password, confirmPassword]);
  const handleRegister = async (e) => {
    e.preventDefault();
    const formData = {
      first_name: e.target.first_name.value,
      last_name: e.target.last_name.value,
      email: e.target.email.value,
      password: e.target.password.value,
      phone: e.target.phone.value,
      company_name: e.target.company_name.value,
      // code: e.target.refer_code.value
    };
    await register(formData);
  };
  useEffect(() => {
    if (isSuccess && !isError) {
      // toast.success("Successfully registered");
      setIsModalOpen(true);
      setTimeout(() => {
        setIsModalOpen(false);
        window.location.href = "https://www.chatchefs.com/";
      }, 3000);
      // navigate("/");
    }
    if (isError && !isSuccess)
      toast.error("Something went wrong. Please try again");
  }, [isError, isSuccess, navigate]);

  // console.log("isERROR",isError)
  // console.log("ERROR",error)

  //   const closeModalAndNavigate = () => {
  //     setIsModalOpen(false);
  //     window.location.href = "https://www.chatchefs.com/";
  // };

  return (
    <div
      className="w-full flex flex-col-reverse md:flex-row justify-center items-start bg-gray-100 px-0 md:px-8 lg:px-16"
      style={{
        backgroundImage: `url(${ChatChefBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg ">
        <h1 className="text-4xl text-center mb-8 text-blue-600 font-bold">
          Chatchef Registration
        </h1>
        <form
          onSubmit={handleRegister}
          className="space-y-6"
          action="/signup"
          method="POST"
        >
          <div>
            <label htmlFor="first_name" className="block text-lg text-gray-700">
              First Name: <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              required
              className="w-full lg:w-80 border-gray-300 border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="last_name" className="block text-lg text-gray-700">
              Last Name: <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              required
              className="w-full lg:w-80 border-gray-300 border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-lg text-gray-700">
              Phone Number: <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center border-gray-300 border rounded-md px-4 py-2 focus-within:ring-2 focus-within:ring-blue-500">
              {/* <select
                id="country_code"
                name="country_code"
                className="mr-2 focus:outline-none"
              >
                {countryCodes.map((country) => (
                  <option key={country.code} value={country.code}>
                    {country.code} ({country.name})
                  </option>
                ))}
              </select> */}
              <input
                type="text"
                id="phone"
                name="phone"
                required
                className="w-full focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-lg text-gray-700">
              Email: <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full border-gray-300 border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {isError && error ? (
              <p className="text-md font-bold text-red-600">
                {error?.data?.email}
              </p>
            ) : (
              <></>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-lg text-gray-700">
              Password: <span className="text-red-500">*</span>
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              name="password"
              required
              className="w-full border-gray-300 border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-lg text-gray-700"
            >
              Confirm Password: <span className="text-red-500">*</span>
            </label>
            <input
              onChange={(e) => setConfirmPassword(e.target.value)}
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              required
              className="w-full border-gray-300 border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {!isMatchedPass && (
              <p className="text-error">Password didn't match</p>
            )}
          </div>

          <div>
            <label
              htmlFor="company_name"
              className="block text-lg text-gray-700"
            >
              Company Name:
            </label>
            <input
              type="text"
              id="company_name"
              name="company_name"
              className="w-full border-gray-300 border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {error?.data?.company_name && (
              <p className="text-md font-bold text-red-600">
                {error?.data?.company_name[0]}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="address" className="block text-lg text-gray-700">
              Address:
            </label>
            <textarea
              id="address"
              name="address"
              className="w-full border-gray-300 border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* <div>
            <label htmlFor="refer_code" className="block text-lg text-gray-700">
            Staff Refer Code: <span className="text-red-500">*</span>
            </label>
            <input
              onChange={(e) => setReferCode(e.target.value)}
              type="refer_code"
              id="refer_code"
              name="refer_code"
              required
              className="w-full border-gray-300 border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div> */}

          <div>
            <input
              disabled={isLoading || !isMatchedPass}
              type="submit"
              value={isLoading ? "Signing Up" : "Sign Up"}
              className={`bg-blue-500 btn hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md cursor-pointer ${
                isLoading && "loading"
              }`}
            />
          </div>
        </form>

        {/* Modal for after registering */}
        {isModalOpen && (
          <div className="modal modal-open">
            <div
              className="w-[1000px] h-[500px] bg-white flex flex-col justify-center items-center gap-16"
              style={{
                backgroundImage: `url(${ChatChefBg})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              <div>
                <h2 className="font-bold text-[80px] italic">
                  Thanks For Submission
                </h2>
                <p className="font-bold text-[60px] italic">
                  We will Contact you soon.
                </p>
              </div>

              {/* <div className="modal-action">
                <button
                  className="btn btn-primary mt-10"
                  onClick={closeModalAndNavigate}
                >
                  OK
                </button>
              </div> */}
            </div>
          </div>
        )}
        {/* end */}

        <div className="text-center mt-4">
          <p className="text-gray-700">
            Already have an account?{" "}
            <Link to="/" className="text-blue-500 font-semibold">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Registration;
