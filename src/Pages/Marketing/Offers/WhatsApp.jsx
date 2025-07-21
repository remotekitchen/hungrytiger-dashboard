import React, { useEffect, useState } from "react";
import { Collapse } from "react-collapse";
import toast from "react-hot-toast";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { useGetRestaurentsQuery } from "../../../redux/features/menuCreation/menuCreationApi";
import { useAddWhatsAppMutation } from "../../../redux/features/whatsapp/whatsappApi";

const WhatsApp = () => {
  const [open, setOpen] = useState([1]);
  const [selectedTab, setSelectedTab] = useState("template");
  const [selectedRestaurants, setSelectedRestaurants] = useState([]);
  const [selectedRestaurantId, setSelectedRestaurantId] = useState(null);
  const [header, setHeader] = useState("");
  const [body, setBody] = useState("");
  const [url, setUrl] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [whatsappNumber, setWhatsappNumber] = useState("");
  const [img, setImg] = useState("");
  // // console.log("img", img);

  const [imgUrl, setImgUrl] = useState("");

  // const handleImgUpload = (e) => {
  //     const img = e.target.files[0];
  //     // console.log("img", img);

  //     if(e.target.imgUrl.files[0]){
  //         setImgUrl(e.target.imgUrl.files[0])
  //     }else if (imgUrl instanceof File){
  //         setImgUrl(imgUrl)
  //     }
  // };

  // // console.log("url", imgUrl);

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [concatenatedDateTime, setConcatenatedDateTime] = useState("");

  const handleDateChange = (event) => {
    const dateValue = event.target.value;
    setDate(dateValue);

    // Concatenate date and time if both are selected
    if (dateValue && time) {
      setConcatenatedDateTime(`${dateValue} ${time}`);
    }
  };

  const handleTimeChange = (event) => {
    const timeValue = event.target.value;
    setTime(timeValue);

    // Concatenate date and time if both are selected
    if (date && timeValue) {
      setConcatenatedDateTime(`${date} ${timeValue}`);
    }
  };

  // // console.log(
  //   selectedRestaurantId,
  //   selectedTab,
  //   header,
  //   body,
  //   url,
  //   concatenatedDateTime
  // );

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  const toggle = (index) => {
    if (open.includes(index)) {
      setOpen(open.filter((item) => item !== index));
    } else {
      setOpen([...open, index]);
    }
  };

  const {
    data: restaurantList,
    isLoading: isRestaurantLoading,
    isError: isRestaurantError,
    error: restaurantError,
  } = useGetRestaurentsQuery();

  const handleRestaurantChange = (e) => {
    const selectedId = e.target.value;
    setSelectedRestaurants([...selectedRestaurants, selectedId]);

    // Update the selected restaurant ID
    setSelectedRestaurantId(selectedId);
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value); // Update the selected option when a radio button is clicked
  };

  const [createWhatsapp, { isSuccess, isError, isLoading }] =
    useAddWhatsAppMutation();

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const img = e.target.files ? e.target.files[0] : null;

    if (img) {
      // // console.log("img", img);

      // Handle file upload
      setImgUrl(img);
    } else if (img instanceof File) {
      // Handle direct file
      setImgUrl(img);
    } else if (typeof img === "string") {
      // Handle image URL
      fetch(img)
        .then((response) => {
          // // console.log("response", response);
          return response.blob();
        })
        .then((blob) => {
          // // console.log("blob", blob);
          setImgUrl(blob);
        })
        .catch((error) => {
          console.error("Error fetching image:", error);
        });
    }

    const data = {
      Restaurant: selectedRestaurantId,
      img_link: imgUrl,
      msg_header: header,
      audience: selectedOption,
      msg_to: whatsappNumber,
      msg_type: selectedTab,
      body: body,
      url: url,
      time: concatenatedDateTime,
    };

    createWhatsapp(data);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("WhatsApp created successfully!");
    }
    if (isError) {
      toast.error("Something went wrong!");
    }
  }, [isSuccess]);

  return (
    <div className="overflow-x-auto">
      <div>
        <div
          className="flex justify-between items-center text-left shadow rounded border bg-[#F2F4F8] p-2 cursor-pointer mb-2"
          onClick={() => toggle(1)}
        >
          <div className="">WhatsApp</div>

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
            <form onSubmit={handleFormSubmit}>
              <h1 className="font-bold mb-2">Program</h1>
              <label>
                <input
                  type="text"
                  className="border border-[#DDE1E6] rounded-lg w-full p-2"
                  placeholder="Enter the name of the Program"
                />
              </label>
              <h1 className="my-4 font-bold">Restaurant</h1>
              <label>
                <select
                  onChange={handleRestaurantChange}
                  name="restaurant"
                  id=""
                  className="border border-[#DDE1E6] rounded-lg w-full p-2"
                >
                  <option selected>Select Restaurant</option>
                  {restaurantList?.results?.map((item, index) => (
                    <option key={index} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </label>
              {/* different tab */}
              <div>
                <div className="flex gap-3">
                  <div
                    className={` cursor-pointer ${
                      selectedTab === "template"
                        ? "bg-[#42C2FF] text-white"
                        : "border border-[#42C2FF] text-[#42C2FF]"
                    }  px-4 py-2 rounded-lg mt-4 flex items-center gap-2`}
                    onClick={() => handleTabClick("template")}
                  >
                    Template
                  </div>
                  <div
                    className={` cursor-pointer ${
                      selectedTab === "text"
                        ? "bg-[#42C2FF] text-white"
                        : "border border-[#42C2FF] text-[#42C2FF]"
                    }  px-4 py-2 rounded-lg mt-4 flex items-center gap-2`}
                    onClick={() => handleTabClick("text")}
                  >
                    Text
                  </div>
                  <div
                    className={` cursor-pointer ${
                      selectedTab === "image"
                        ? "bg-[#42C2FF] text-white"
                        : "border border-[#42C2FF] text-[#42C2FF]"
                    }  px-4 py-2 rounded-lg mt-4 flex items-center gap-2`}
                    onClick={() => handleTabClick("image")}
                  >
                    Image
                  </div>
                </div>

                <div>
                  {selectedTab === "template" && (
                    <div>
                      <label className="mt-4">
                        <h1 className="my-4 font-bold">Header</h1>
                        <input
                          type="text"
                          onChange={(e) => setHeader(e.target.value)}
                          className="border border-[#DDE1E6] rounded-lg w-full p-2"
                          placeholder="Header Text"
                        />
                      </label>
                      <label className="mt-4">
                        <h1 className="my-4 font-bold">Body text</h1>
                        <input
                          type="text"
                          onChange={(e) => setBody(e.target.value)}
                          className="border border-[#DDE1E6] rounded-lg w-full p-2"
                          placeholder="Body Text"
                        />
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
                          <label
                            htmlFor="default-radio-1"
                            className="ml-2 font-medium"
                          >
                            All customers
                          </label>
                        </div>

                        <div className="flex items-center">
                          <input
                            id="default-radio-2"
                            type="radio"
                            value="members"
                            name="default-radio"
                            className="w-4 h-4 text-[#42C2FF]"
                            onChange={handleOptionChange}
                            checked={selectedOption === "members"}
                          />
                          <label
                            htmlFor="default-radio-2"
                            className="ml-2 font-medium"
                          >
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
                          <label
                            htmlFor="default-radio-3"
                            className="ml-2 font-medium"
                          >
                            Custom
                          </label>
                        </div>
                      </label>
                      {selectedOption === "custom" && (
                        <label className="mt-4">
                          <h1 className="my-4 font-bold">WhatsApp Numner</h1>
                          <input
                            type="text"
                            onChange={(e) => setWhatsappNumber(e.target.value)}
                            className="border border-[#DDE1E6] rounded-lg w-full p-2"
                            placeholder="whatsapp number"
                          />
                        </label>
                      )}
                      <label className="mt-4">
                        <h1 className="my-4 font-bold">URL</h1>
                        <input
                          type="text"
                          onChange={(e) => setUrl(e.target.value)}
                          className="border border-[#DDE1E6] rounded-lg w-full p-2"
                          placeholder="Example URL"
                        />
                      </label>
                      <h1 className="my-4 font-bold">Distribution</h1>
                      <label>
                        <div className="flex">
                          <input
                            type="date"
                            className="border border-[#DDE1E6] rounded-lg w-full p-2 mt-2 mr-4"
                            onChange={handleDateChange}
                          />
                          <input
                            type="time"
                            className="border border-[#DDE1E6] rounded-lg w-full p-2 mt-2"
                            onChange={handleTimeChange}
                          />
                        </div>
                        <button className="bg-[#42C2FF] text-white px-4 py-2 rounded-lg mt-4 flex items-center gap-2">
                          {" "}
                          +{" "}
                        </button>
                      </label>
                    </div>
                  )}
                  {selectedTab === "text" && (
                    <div>
                      <label className="mt-4">
                        <h1 className="my-4 font-bold">Body text</h1>
                        <input
                          type="text"
                          onChange={(e) => setBody(e.target.value)}
                          className="border border-[#DDE1E6] rounded-lg w-full p-2"
                          placeholder="Body Text"
                        />
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
                          <label
                            htmlFor="default-radio-1"
                            className="ml-2 font-medium"
                          >
                            All customers
                          </label>
                        </div>

                        <div className="flex items-center">
                          <input
                            id="default-radio-2"
                            type="radio"
                            value="members"
                            name="default-radio"
                            className="w-4 h-4 text-[#42C2FF]"
                            onChange={handleOptionChange}
                            checked={selectedOption === "members"}
                          />
                          <label
                            htmlFor="default-radio-2"
                            className="ml-2 font-medium"
                          >
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
                          <label
                            htmlFor="default-radio-3"
                            className="ml-2 font-medium"
                          >
                            Custom
                          </label>
                        </div>
                      </label>
                      {selectedOption === "custom" && (
                        <label className="mt-4">
                          <h1 className="my-4 font-bold">WhatsApp Numner</h1>
                          <input
                            type="text"
                            onChange={(e) => setWhatsappNumber(e.target.value)}
                            className="border border-[#DDE1E6] rounded-lg w-full p-2"
                            placeholder="whatsapp number"
                          />
                        </label>
                      )}
                      <label className="mt-4">
                        <h1 className="my-4 font-bold">URL</h1>
                        <input
                          type="text"
                          onChange={(e) => setUrl(e.target.value)}
                          className="border border-[#DDE1E6] rounded-lg w-full p-2"
                          placeholder="Example URL"
                        />
                      </label>
                      <h1 className="my-4 font-bold">Distribution</h1>
                      <label>
                        <div className="flex">
                          <input
                            type="date"
                            className="border border-[#DDE1E6] rounded-lg w-full p-2 mt-2 mr-4"
                            onChange={handleDateChange}
                          />
                          <input
                            type="time"
                            className="border border-[#DDE1E6] rounded-lg w-full p-2 mt-2"
                            onChange={handleTimeChange}
                          />
                        </div>
                        <button className="bg-[#42C2FF] text-white px-4 py-2 rounded-lg mt-4 flex items-center gap-2">
                          {" "}
                          +{" "}
                        </button>
                      </label>
                    </div>
                  )}
                  {selectedTab === "image" && (
                    <div>
                      <label className="mt-4">
                        <h1 className="my-4 font-bold">URL</h1>
                        <input
                          type="text"
                          onChange={(e) => setUrl(e.target.value)}
                          className="border border-[#DDE1E6] rounded-lg w-full p-2"
                          placeholder="Example URL"
                        />
                      </label>
                      <label className="mt-4">
                        <h1 className="my-4 font-bold">Image</h1>
                        <div className="flex items-center gap-2">
                          <input
                            type="file"
                            onChange={(e) => setImg(e.target.files[0])}
                            // onChange={handleImgUpload}
                            className="border border-[#DDE1E6] rounded-lg w-full p-2"
                          />
                        </div>
                      </label>
                      {imgUrl && (
                        <div>
                          <h1>Preview</h1>
                          <div className="flex items-center gap-2">
                            <img src={imgUrl} alt="" className="w-60 h-40" />
                          </div>
                        </div>
                      )}
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
                          <label
                            htmlFor="default-radio-1"
                            className="ml-2 font-medium"
                          >
                            All customers
                          </label>
                        </div>

                        <div className="flex items-center">
                          <input
                            id="default-radio-2"
                            type="radio"
                            value="members"
                            name="default-radio"
                            className="w-4 h-4 text-[#42C2FF]"
                            onChange={handleOptionChange}
                            checked={selectedOption === "members"}
                          />
                          <label
                            htmlFor="default-radio-2"
                            className="ml-2 font-medium"
                          >
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
                          <label
                            htmlFor="default-radio-3"
                            className="ml-2 font-medium"
                          >
                            Custom
                          </label>
                        </div>
                      </label>
                      {selectedOption === "custom" && (
                        <label className="mt-4">
                          <h1 className="my-4 font-bold">WhatsApp Numner</h1>
                          <input
                            type="text"
                            onChange={(e) => setWhatsappNumber(e.target.value)}
                            className="border border-[#DDE1E6] rounded-lg w-full p-2"
                            placeholder="whatsapp number"
                          />
                        </label>
                      )}
                      <h1 className="my-4 font-bold">Distribution</h1>
                      <label>
                        <div className="flex">
                          <input
                            type="date"
                            className="border border-[#DDE1E6] rounded-lg w-full p-2 mt-2 mr-4"
                            onChange={handleDateChange}
                          />
                          <input
                            type="time"
                            className="border border-[#DDE1E6] rounded-lg w-full p-2 mt-2"
                            onChange={handleTimeChange}
                          />
                        </div>
                        <button className="bg-[#42C2FF] text-white px-4 py-2 rounded-lg mt-4 flex items-center gap-2">
                          {" "}
                          +{" "}
                        </button>
                      </label>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex my-4">
                <p className="text-[#42C2FF]">View Activity History</p>
              </div>
              <div className="flex gap-4">
                <button className="bg-[#42C2FF] text-white px-4 py-2 rounded-lg mt-4 flex items-center gap-2">
                  Save & Send
                </button>
                <button className="bg-[#42C2FF] text-white px-4 py-2 rounded-lg mt-4 flex items-center gap-2">
                  Schedule
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

export default WhatsApp;
