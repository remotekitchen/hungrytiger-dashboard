import React, { useEffect, useState } from "react";
import PreviewComponent from "./Preview";
import BackPreviewCard from "./BackPreviewCard";

const BussinessCard = () => {
  /* Front Card states */

  const [text, setText] = useState("");
  const [error, setError] = useState("");
  // const [coupon, setCoupon] = useState("");
  const [customBg, setCustomBg] = useState(null);
  const [showCustomBg, setShowCustomBg] = useState(false);
  const [qrCodeLink, setQrCodeLink] = useState("");
  const [logo, setLogo] = useState(null);
  const [themeColor, setThemeColor] = useState("black");

  const [customColor, setCustomColor] = useState("#000000");

  const handleTextChange = (e) => {
    const value = e.target.value;

    // Only allow digits (numbers) to be entered and ensure max 3 digits
    if (/^\d*$/.test(value) && value.length <= 3) {
      const numericValue = parseInt(value);

      // Check if the value is within the valid range (1-100)
      if (numericValue >= 1 && numericValue <= 100) {
        setText(value);
        setError(""); // Clear error if valid
      } else if (value === "") {
        // Allow clearing the input
        setText("");
        setError("");
      } else {
        setError("Percentage must be between 1 and 100");
      }
    } else {
      setError("Please enter a valid Percentage");
    }
  };

  const createCouponCode = (value) => {
    return `FIRSTORDER${value}`;
  };

  const coupon = createCouponCode(text);

  // const handleCouponChange = (e) => {
  //   setCoupon(e.target.value);
  // };

  const handleQrCodeChange = (e) => {
    setQrCodeLink(e.target.value);
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogo(URL.createObjectURL(file));
    }
  };

  const handleBgUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCustomBg(URL.createObjectURL(file));
    }
  };

  const handleThemeChange = (color) => {
    setThemeColor(color);
  };

  const handleCustomColorChange = (color) => {
    setCustomColor(color);
    // You might want to also update the theme color in your app here.
  };

  /* Back Card handle methods */

  // const handleHeaderTextChange = (e) => setHeaderText(e.target.value);

  // const handleBulletPointChange = (index, value) => {
  //   const newPoints = [...bulletPoints];
  //   newPoints[index] = value;
  //   setBulletPoints(newPoints);
  // };

  // const addBulletPoint = () => setBulletPoints([...bulletPoints, ""]);

  // const removeBulletPoint = (index) => {
  //   const newPoints = bulletPoints.filter((_, i) => i !== index);
  //   setBulletPoints(newPoints);
  // };

  // const handleParagraphChange = (e) => setParagraphText(e.target.value);

  // const handleBackBgUpload = (e) => {
  //   const file = e.target.files[0];
  //   setBackground(URL.createObjectURL(file));
  // };
  return (
    <div className="flex flex-col justify-start items-start">
      <h1 className="text-5xl text-black font-bold mt-5 pl-8">
        Bussiness Card
      </h1>

      {/* Front of the Bussiness Card */}
      <div className="flex flex-col justify-center items-center mt-10">
        <h1 className="text-3xl text-black font-bold ">
          Front of Bussiness Card
        </h1>
        <div className="flex flex-row justify-center items-start w-full mt-10">
          <div className="p-6 w-1/2">
            {/* Text input */}
            <div className="mb-4">
              <label className="block mb-2 font-bold">
                Give Percentage amount
              </label>
              <input
                type="text"
                value={text}
                onChange={handleTextChange}
                className="input input-bordered w-full"
                placeholder="Enter text"
              />
              {error && <p className="text-red-500">{error}</p>}
            </div>

            {/* Coupon Code input
          <div className="mb-4">
            <label className="block mb-2 font-bold">Set Your Text</label>
            <input
              type="text"
              value={coupon}
              onChange={handleCouponChange}
              className="input input-bordered w-full"
              placeholder="Enter Coupon Code"
            />
          </div> */}
            {/* QR Code Input */}
            <div className="mb-4">
              <label className="block mb-2 font-bold">QR Code Link:</label>
              <input
                type="text"
                value={qrCodeLink}
                onChange={handleQrCodeChange}
                className="input input-bordered w-full"
                placeholder="Enter QR Code Link"
              />
            </div>

            {/* Logo Upload */}
            <div className="mb-4">
              <label className="block mb-2 font-bold">Upload Logo:</label>
              <input
                type="file"
                onChange={handleLogoUpload}
                className="input input-bordered w-full"
              />
            </div>
            {/* custom background */}

            {showCustomBg && (
              <div className="mb-4">
                <label className="block mb-2 font-bold">
                  Upload Background:
                </label>
                <input
                  type="file"
                  onChange={handleBgUpload}
                  className="input input-bordered w-full"
                />
              </div>
            )}

            {/* Theme Selection */}
            <div className="mb-4">
              <label className="block mb-2 font-bold">
                Select Theme Color:
              </label>
              <div className="grid grid-cols-5 gap-3">
                <button
                  className={`btn ${
                    themeColor === "Brown" ? "btn-primary" : ""
                  }`}
                  onClick={() => handleThemeChange("Brown")}
                >
                  Brown
                </button>
                <button
                  className={`btn ${themeColor === "red" ? "btn-primary" : ""}`}
                  onClick={() => handleThemeChange("red")}
                >
                  Red
                </button>
                <button
                  className={`btn ${
                    themeColor === "green" ? "btn-primary" : ""
                  }`}
                  onClick={() => handleThemeChange("green")}
                >
                  Green
                </button>

                <button
                  className={`btn ${
                    themeColor === "amber" ? "btn-primary" : ""
                  }`}
                  onClick={() => handleThemeChange("amber")}
                >
                  Yellow
                </button>

                {/* Gradient 1 Button */}
                {/* <button
                  className={`btn ${
                    themeColor === "gradient1" ? "btn-primary" : ""
                  }`}
                  onClick={() => handleThemeChange("gradient1")}
                >
                  Red Yellow
                </button> */}

                {/* Gradient 2 Button */}
                {/* <button
                  className={`btn ${
                    themeColor === "gradient2" ? "btn-primary" : ""
                  }`}
                  onClick={() => handleThemeChange("gradient2")}
                >
                  Pink Rose
                </button> */}

                <button
                  className={`btn ${
                    themeColor === "rgbColor" ? "btn-primary" : ""
                  }`}
                  onClick={() => handleThemeChange("rgbColor")}
                >
                  Gold
                </button>

                <button
                  className={`btn ${
                    themeColor === "DarkBrown" ? "btn-primary" : ""
                  }`}
                  onClick={() => handleThemeChange("DarkBrown")}
                >
                  Dark Brown
                </button>

                <button
                  className={`btn ${
                    themeColor === "White" ? "btn-primary" : ""
                  }`}
                  onClick={() => handleThemeChange("White")}
                >
                  White
                </button>

                <div className="w-[200px] flex flex-row justify-center items-center gap-2">
                <button
                  className={`btn ${
                    themeColor === "Custom" ? "btn-primary" : ""
                  }`}
                  onClick={() => handleThemeChange("Custom")}
                >
                  Custom
                </button>

                {themeColor === "Custom" && (
                
                    <input
                      type="color"
                      value={customColor}
                      onChange={(e) => handleCustomColorChange(e.target.value)}
                      className="mt-2 w-[50%] h-8 cursor-pointer"
                    />
                 
                )}
                </div>

                
              </div>
            </div>
          </div>

          <PreviewComponent
            themeColor={themeColor}
            customColor={customColor}
            text={text}
            coupon={coupon}
            qrCodeLink={qrCodeLink}
            logo={logo}
            error={error}
          />
        </div>
      </div>

      {/* Back of the Bussiness Card */}
      {/* <div className="w-full flex flex-col justify-center items-center mt-10">
        <h1 className="text-3xl text-black font-bold">
          Back of the Business Card
        </h1>
        <div className="flex flex-row justify-center items-start w-full mt-10">
          <div className="p-6 w-1/2">
      
            <div className="mb-4">
              <label className="block mb-2 font-bold">Write your Heading Text</label>
              <input
                type="text"
                value={headerText}
                onChange={handleHeaderTextChange}
                className="input input-bordered w-full"
                placeholder="Enter header text"
              />
            </div>

          
            <div className="mb-4">
              <label className="block mb-2 font-bold">Bullet Points</label>
              {bulletPoints.map((point, index) => (
                <div key={index} className="flex items-center mb-2">
                  <input
                    type="text"
                    value={point}
                    onChange={(e) =>
                      handleBulletPointChange(index, e.target.value)
                    }
                    className="input input-bordered w-full"
                    placeholder={"Write your text points"}
                  />
                  <button
                    type="button"
                    onClick={() => removeBulletPoint(index)}
                    className="ml-2 btn btn-danger"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addBulletPoint}
                className="btn btn-primary mt-2"
              >
                Add Bullet Point
              </button>
            </div>

            

           
            <div className="mb-4">
              <label className="block mb-2 font-bold">Upload Background Image:</label>
              <input
                type="file"
                onChange={handleBackBgUpload}
                className="input input-bordered w-full"
              />
            </div>

            
          </div>

         
          <BackPreviewCard
           
            headerText={headerText}
            bulletPoints={bulletPoints}
            paragraphText={paragraphText}
            background={background}
            error={error}
          />
        </div>
      </div> */}
    </div>
  );
};

export default BussinessCard;
