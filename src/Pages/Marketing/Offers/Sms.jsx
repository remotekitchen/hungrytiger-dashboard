import React, { useEffect, useState } from "react";
import { Collapse } from "react-collapse";
import toast from "react-hot-toast";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { useGetAllRestaurantQuery } from "../../../redux/features/restaurentCreation/restaurentCreationApi";
import { useAddSmsMutation } from "../../../redux/features/sms/smsApi";

const Sms = () => {
  const [open, setOpen] = useState([1]);
  const [selectedOption, setSelectedOption] = useState("all");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState("");
  const [restaurant, setRestaurant] = useState();
  // // console.log("🚀 ~ Sms ~ restaurant:", restaurant);

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const [createSms, { isSuccess, loading, isError }] = useAddSmsMutation();

  const { data: allRestaurant } = useGetAllRestaurantQuery();

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      msg_from: "+18149046396",
      msg_to: phoneNumber ? phoneNumber : "all",
      body: message,
      // restaurant: restaurant && selectedOption === "all" ? restaurant : null,
      ...(selectedOption === "all" && restaurant ? { restaurant } : {}),
    };
    createSms(data);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("SMS send successfully!");
    }
    if (isError) {
      toast.error("SMS has not been enabled for the region");
    }
  }, [isSuccess, isError]);

  const toggle = (index) => {
    if (open.includes(index)) {
      setOpen(open.filter((item) => item !== index));
    } else {
      setOpen([...open, index]);
    }
  };
  return (
    <div className="overflow-x-auto">
      <div>
        <div
          className="flex justify-between items-center text-left shadow rounded border bg-[#F2F4F8] p-2 cursor-pointer mb-2"
          onClick={() => toggle(1)}
        >
          <div className="">Sms</div>

          <div className="flex items-center gap-2">
            <div className="text-[30px]">
              {open.includes(1) ? (
                <FiChevronUp className="text-[#697077] " />
              ) : (
                <FiChevronDown className="text-[#697077] " />
              )}
            </div>
          </div>
        </div>
        <Collapse isOpened={open.includes(1)}>
          <div className="w-[50%]">
            <form onSubmit={handleSubmit}>
              <h1 className="my-4 font-bold">Offer Title</h1>
              <label>
                <input
                  type="text"
                  className="border border-[#DDE1E6] rounded-lg w-full p-2"
                  placeholder="Example Month of May 10% off"
                />
              </label>
              <h1 className="my-4 font-bold">Offer Details</h1>
              <label>
                <textarea
                  onChange={(e) => setMessage(e.target.value)}
                  name=""
                  id=""
                  cols="30"
                  rows="4"
                  className="border border-[#DDE1E6] rounded-lg w-full p-2"
                  placeholder="Example Month of May 10% off"
                ></textarea>
              </label>

              <label className="mt-4">
                <h1 className="mt-4 mb-2">
                  Select which customers will see your offer.
                </h1>
                <div className="flex items-center">
                  <input
                    id="default-radio-1"
                    type="radio"
                    value="all"
                    name="default-radio"
                    className="w-4 h-4 text-[#42C2FF]"
                    onChange={handleOptionChange}
                    checked={selectedOption === "all"}
                  />
                  <label htmlFor="default-radio-1" className="ml-2 font-medium">
                    All customers
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    id="default-radio-2"
                    type="radio"
                    value="all"
                    name="default-radio"
                    className="w-4 h-4 text-[#42C2FF]"
                    onChange={handleOptionChange}
                    checked={selectedOption === "all"}
                  />
                  <label htmlFor="default-radio-2" className="ml-2 font-medium">
                    Members Only
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    id="default-radio-3"
                    type="radio"
                    value="custom"
                    name="default-radio"
                    className="w-4 h-4 text-[#42C2FF]"
                    onChange={handleOptionChange}
                    checked={selectedOption === "custom"}
                  />
                  <label htmlFor="default-radio-3" className="ml-2 font-medium">
                    Custom
                  </label>
                </div>
              </label>

              {selectedOption === "custom" && (
                <label className="mt-4">
                  <h1 className="my-4 font-bold">Phone Numner</h1>
                  <input
                    type="text"
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="border border-[#DDE1E6] rounded-lg w-full p-2"
                    placeholder="phone number"
                  />
                </label>
              )}
              <div className="flex my-4">
                <p className="text-[#42C2FF]">View Activity History</p>
              </div>

              {/* restaurant  */}
              {selectedOption === "all" && (
                <div>
                  <select
                    className="select select-bordered w-full"
                    name="restaurant"
                    value={restaurant}
                    onChange={(e) => setRestaurant(parseFloat(e.target.value))}
                  >
                    <option disabled selected value={0}>
                      Select Restaurant
                    </option>
                    {allRestaurant?.results?.map((res) => (
                      <option key={res.id} value={res.id}>
                        {res.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="flex gap-4">
                <button className="bg-[#42C2FF] text-white px-4 py-2 rounded-lg mt-4 flex items-center gap-2">
                  Save
                </button>
                <button className="bg-[#42C2FF] text-white px-4 py-2 rounded-lg mt-4 flex items-center gap-2">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </Collapse>
      </div>
    </div>
  );
};

export default Sms;
