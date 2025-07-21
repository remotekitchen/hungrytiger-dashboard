import React, { useRef } from "react";
import jsPDF from "jspdf";
import html2CanvasPro from "html2canvas-pro";
import { Swiper, SwiperSlide } from "swiper/react";
import darkWooden from "../../assets/PreviewBussinessCard/dark_wooden.jpg";
import goldenBrown from "../../assets/PreviewBussinessCard/goldenBrown.jpg";

import "swiper/css";
import "swiper/css/effect-flip";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";

const PreviewComponent = ({
  themeColor,
  customColor,
  text,
  qrCodeLink,
  logo,
  coupon,
  error,
}) => {

  
  const firstSlideRef = useRef(null);
  const secondSlideRef = useRef(null);

  const backgroundImage =
    themeColor === "Brown"
      ? `url(${darkWooden})`
      : themeColor === "rgbColor"
      ? `url(${goldenBrown})`
      : themeColor === "DarkBrown"
      ? `url(${darkWooden})`
      : "none";

  const handleExportAsPdf = async () => {
    const pdf = new jsPDF("p", "pt", "a4");

    const options = {
      logging: true,
      useCORS: true,
      scale: 2,
      backgroundColor:
        themeColor === "Brown"
          ? "#312c26"
          : themeColor === "red"
          ? "#FF0000"
          : themeColor === "green"
          ? "#275428"
          : themeColor === "amber"
          ? "#FFBF00"
          : themeColor === "gradient1"
          ? "#FF69B4"
          : themeColor === "rgbColor"
          ? "rgb(190,172,116)"
          : themeColor === "DarkBrown"
          ? "#311212"
          : themeColor === "gradient2"
          ? "#ca1b54"
          : themeColor === "White"
          ? "#ffffff"
          : themeColor === "Custom"
          ? `${customColor}`
          : "#ffffff",
    };

    // Generate canvas for the first slide
    const firstCanvas = await html2CanvasPro(firstSlideRef.current, options);
    const firstImgData = firstCanvas.toDataURL("image/png");
    const imgWidth = pdf.internal.pageSize.getWidth();
    const imgHeight1 = (firstCanvas.height * imgWidth) / firstCanvas.width;

    pdf.addImage(firstImgData, "PNG", 0, 0, imgWidth, imgHeight1);

    // Add a new page for the second slide
    pdf.addPage();

    // Generate canvas for the second slide
    const secondCanvas = await html2CanvasPro(secondSlideRef.current, options);
    const secondImgData = secondCanvas.toDataURL("image/png");
    const imgHeight2 = (secondCanvas.height * imgWidth) / secondCanvas.width;

    pdf.addImage(secondImgData, "PNG", 0, 0, imgWidth, imgHeight2);

    // Save the PDF
    pdf.save("combined-slides.pdf");
  };

  return (
    <div>
      <div className="w-[600px]">
        <h3 className="text-xl font-bold">Preview</h3>

        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          navigation={true}
          modules={[Navigation]}
          className={`border  flex flex-col justify-between items-center rounded-lg ${
            themeColor === "Brown"
              ? "bg-[#312c26]"
              : themeColor === "red"
              ? "bg-red-600"
              : themeColor === "green"
              ? "bg-[#275428]"
              : themeColor === "amber"
              ? "bg-gradient-to-b from-orange-500 to-yellow-300"
              : themeColor === "gradient1"
              ? "bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500"
              : themeColor === "gradient2"
              ? "bg-gradient-to-r from-rose-700 to-pink-600"
              : themeColor === "rgbColor"
              ? "bg-[rgb(190,172,116)]"
              : themeColor === "DarkBrown"
              ? "bg-[#311212]"
              : themeColor === "DarkBrown"
              ? "bg-[#ffffff]"
              
             
              : ""
          }`}
          // style={{ minHeight: "300px", }}
          style={themeColor === "Custom" ? { backgroundColor: customColor, } : {}}
        >
          <SwiperSlide>
            <div
              className="flex flex-col justify-center items-center p-6 pl-12 mt-4"
              ref={firstSlideRef}
            >
              {text && (
                <div
                  className={`w-full text-6xl flex flex-row justify-center items-center font-bold ${
                    themeColor === "White" ? "text-black" : "text-white"
                  }`}
                >
                  <div className="flex items-center gap-2 mr-4">
                    <div>
                      <h1 className="text-[100px]">{text}%</h1>
                    </div>
                    <div className="flex flex-col justify-center items-start text-[50px] ml-2">
                      <span
                        className={`${
                          themeColor === "Brown"
                            ? "text-orange-500"
                            : themeColor === "DarkBrown"
                            ? "text-red-600"
                            : themeColor === "White"
                            ? "text-[#e3203e]"
                            : "text-white"
                        }`}
                      >
                        OFF
                      </span>
                      <span className="text-[26px] whitespace-nowrap">
                        Your First Order
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex flex-row justify-start items-end gap-4 ">
                {qrCodeLink ? (
                  <div>
                    <h1
                      className={`font-bold  ${
                        themeColor === "White" ? "text-black" : "text-white"
                      }`}
                    >
                      On Our Website
                    </h1>
                    {/* <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
                        qrCodeLink
                      )}&bgcolor=FF0000`}
                      alt="QR Code"
                      className="mt-4 w-32 h-32"
                    /> */}

                    <img
                      src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
                        qrCodeLink
                      )}&bgcolor=${
                        themeColor === "Brown"
                          ? "FFFFFF" // Hex without #
                          : themeColor === "red"
                          ? "FF0000" // Hex color for red
                          : themeColor === "green"
                          ? "275428"
                          : themeColor === "amber"
                          ? "FFA500" // Amber color
                          : themeColor === "rgbColor"
                          ? "BEAC74" // RGB color, without 'rgb()'
                          : themeColor === "DarkBrown"
                          ? "FFFFFF"
                          : "FFFFFF" // Default white background
                      }`}
                      alt="QR Code"
                      className="mt-4 w-32 h-32"
                    />
                  </div>
                ) : (
                  <></>
                )}

                <div className="flex flex-col justify-start items-start gap-1">
                  {logo && (
                    <img
                      src={logo}
                      alt="Logo"
                      className="w-16 h-12 object-contain"
                    />
                  )}
                  <h1 className="font-bold">
                    <span
                      className={`${
                        themeColor === "Brown"
                          ? "text-orange-500"
                          : themeColor === "DarkBrown"
                          ? "text-red-600"
                          : themeColor === "White"
                          ? "text-[#e3203e]"
                          : "text-white"
                      }`}
                    >
                      Coupon
                    </span>
                    <br />{" "}
                    <span
                      className={`${
                        themeColor === "Brown"
                          ? "text-white"
                          : themeColor === "DarkBrown"
                          ? "text-white"
                          : "text-black"
                      }`}
                    >
                      Code:
                    </span>
                  </h1>
                </div>

                <div className="flex flex-col justify-center items-start">
                  {coupon && (
                    <div
                      className={`bg-white p-2 rounded-md mb-2 ${
                        themeColor === "White" ? "border border-red-500" : ""
                      }`}
                    >
                      <h1
                        className={`
                          ${
                            themeColor === "green"
                              ? "text-green-700 font-bold"
                              : ""
                          } 
                          ${
                            themeColor === "red" ? "text-red-700 font-bold" : ""
                          } 
                          ${
                            themeColor === "black" ? "text-black font-bold" : ""
                          }
                          ${
                            themeColor === "amber"
                              ? "text-amber-500 font-bold"
                              : ""
                          }
                          ${
                            themeColor === "gradient1"
                              ? "text-red-500 font-bold"
                              : ""
                          }
                          ${
                            themeColor === "gradient2"
                              ? "text-black font-bold"
                              : ""
                          }
                          ${
                            themeColor === "rgbColor"
                              ? "text-[rgb(190,172,116)] font-bold"
                              : ""
                          }

                          
                        `}
                      >
                        {coupon}
                      </h1>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            {/* static text */}
            <div
              className={`p-6 rounded-lg ${
                themeColor === "Brown"
                  ? "text-white"
                  : themeColor === "green"
                  ? "text-white"
                  : themeColor === "DarkBrown"
                  ? "text-red-600"
                  : themeColor === "White"
                  ? "text-[#e3203e]"
                  : themeColor === "rgbColor"
                  ? "text-black"
                  : "text-white"
              }`}
              style={{
                backgroundImage: backgroundImage,

                backgroundColor:
                  themeColor === "green"
                    ? "#55a350"
                    : themeColor === "red"
                    ? "#dc2626"
                    : themeColor === "amber"
                    ? "#f5ec77"
                    : themeColor === "White"
                    ? "#e3203e"
                    : themeColor === "Custom"
                    ? `${customColor}`
                    : "none",
                // background:
                //   themeColor === "gradient1"
                //     ? "linear-gradient(to right, rgb(236, 72, 153), rgb(239, 68, 68), rgb(234, 179, 8))"
                //     : themeColor === "gradient2"
                //     ? "linear-gradient(to right, rgb(190, 18, 60), rgb(219, 39, 119))"
                //     : "",
              }}
              ref={secondSlideRef}
            >
              <h1
                className={`text-2xl font-bold text-center mb-4 ${
                  themeColor === "Brown"
                    ? "text-[#f26422]"
                    : themeColor === "green"
                    ? "text-white"
                    : themeColor === "DarkBrown"
                    ? "text-red-600"
                    : themeColor === "White"
                    ? "text-white"
                    : themeColor === "rgbColor"
                    ? "text-white"
                    : themeColor === "amber"
                    ? "text-black"
                    : "text-white"
                }`}
              >
                Why You Should Order From Our Website
              </h1>
              <ul className="space-y-4 text-md">
                <li
                  className={`flex items-center ${
                    themeColor === "Brown"
                      ? "text-white"
                      : themeColor === "green"
                      ? "text-white"
                      : themeColor === "DarkBrown"
                      ? "text-white"
                      : themeColor === "White"
                      ? "text-white"
                      : themeColor === "rgbColor"
                      ? "text-white"
                      : themeColor === "amber"
                      ? "text-black"
                      : "text-white"
                  }`}
                >
                  <span
                    className={`${
                      themeColor === "Brown"
                        ? "bg-[#f26422]"
                        : themeColor === "green"
                        ? "bg-white"
                        : themeColor === "DarkBrown"
                        ? "bg-red-600"
                        : themeColor === "White"
                        ? "bg-white"
                        : themeColor === "rgbColor"
                        ? "bg-black"
                        : "bg-white"
                    } ${
                      themeColor === "rgbColor" ? "text-white" : "text-black"
                    } font-bold rounded-full h-8 w-8 flex items-center justify-center mr-4`}
                  >
                    1
                  </span>
                  Accumulate points for every order.
                </li>
                <li
                  className={`flex items-center ${
                    themeColor === "Brown"
                      ? "text-white"
                      : themeColor === "green"
                      ? "text-white"
                      : themeColor === "DarkBrown"
                      ? "text-white"
                      : themeColor === "White"
                      ? "text-white"
                      : themeColor === "rgbColor"
                      ? "text-white"
                      : themeColor === "amber"
                      ? "text-black"
                      : "text-white"
                  }`}
                >
                  <span
                    className={`${
                      themeColor === "Brown"
                        ? "bg-[#f26422]"
                        : themeColor === "green"
                        ? "bg-white"
                        : themeColor === "DarkBrown"
                        ? "bg-red-600"
                        : themeColor === "White"
                        ? "bg-white"
                        : themeColor === "rgbColor"
                        ? "bg-black"
                        : "bg-white"
                    } ${
                      themeColor === "rgbColor" ? "text-white" : "text-black"
                    } font-bold rounded-full h-8 w-8 flex items-center justify-center mr-4`}
                  >
                    2
                  </span>
                  Use promo code when you are checking out.
                </li>
                <li
                  className={`flex items-center ${
                    themeColor === "Brown"
                      ? "text-white"
                      : themeColor === "green"
                      ? "text-white"
                      : themeColor === "DarkBrown"
                      ? "text-white"
                      : themeColor === "White"
                      ? "text-white"
                      : themeColor === "rgbColor"
                      ? "text-white"
                      : themeColor === "amber"
                      ? "text-black"
                      : "text-white"
                  }`}
                >
                  <span
                    className={`${
                      themeColor === "Brown"
                        ? "bg-[#f26422]"
                        : themeColor === "green"
                        ? "bg-white"
                        : themeColor === "DarkBrown"
                        ? "bg-red-600"
                        : themeColor === "White"
                        ? "bg-white"
                        : themeColor === "rgbColor"
                        ? "bg-black"
                        : "bg-white"
                    } ${
                      themeColor === "rgbColor" ? "text-white" : "text-black"
                    } font-bold rounded-full h-8 w-8 flex items-center justify-center mr-4`}
                  >
                    3
                  </span>
                  Our driver delivers without Tip.
                </li>
                <li
                  className={`flex items-center ${
                    themeColor === "Brown"
                      ? "text-white"
                      : themeColor === "green"
                      ? "text-white"
                      : themeColor === "DarkBrown"
                      ? "text-white"
                      : themeColor === "White"
                      ? "text-white"
                      : themeColor === "rgbColor"
                      ? "text-white"
                      : themeColor === "amber"
                      ? "text-black"
                      : "text-white"
                  }`}
                >
                  <span
                    className={`${
                      themeColor === "Brown"
                        ? "bg-[#f26422]"
                        : themeColor === "green"
                        ? "bg-white"
                        : themeColor === "DarkBrown"
                        ? "bg-red-600"
                        : themeColor === "White"
                        ? "bg-white"
                        : themeColor === "rgbColor"
                        ? "bg-black"
                        : "bg-white"
                    } ${
                      themeColor === "rgbColor" ? "text-white" : "text-black"
                    } font-bold rounded-full h-8 w-8 flex items-center justify-center mr-4`}
                  >
                    4
                  </span>
                  See the live driver location on our website.
                </li>
                <li
                  className={`flex items-center ${
                    themeColor === "Brown"
                      ? "text-white"
                      : themeColor === "green"
                      ? "text-white"
                      : themeColor === "DarkBrown"
                      ? "text-white"
                      : themeColor === "White"
                      ? "text-white"
                      : themeColor === "rgbColor"
                      ? "text-white"
                      : themeColor === "amber"
                      ? "text-black"
                      : "text-white"
                  }`}
                >
                  <span
                    className={`${
                      themeColor === "Brown"
                        ? "bg-[#f26422]"
                        : themeColor === "green"
                        ? "bg-white"
                        : themeColor === "DarkBrown"
                        ? "bg-red-600"
                        : themeColor === "White"
                        ? "bg-white"
                        : themeColor === "rgbColor"
                        ? "bg-black"
                        : "bg-white"
                    } ${
                      themeColor === "rgbColor" ? "text-white" : "text-black"
                    } font-bold rounded-full h-8 w-8 flex items-center justify-center mr-4`}
                  >
                    5
                  </span>
                  Save 20% compared with Uber even without any discount.
                </li>
              </ul>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>

      {/* Button to export as image */}
      <button onClick={handleExportAsPdf} className="btn btn-primary mt-4">
        Export as PDF
      </button>
    </div>
  );
};

export default PreviewComponent;
