import React, { useContext, useEffect, useRef } from "react";
import { FiArrowLeft } from "react-icons/fi";
import PlatformCard from "./PlatformCard/PlatformCard";
import { BsFillPlusCircleFill } from "react-icons/bs";

const AuthOverlayModal = () => {
  const modalRef = useRef(null);
  const platformsArr = [
    {
      name: "doordash",
      imageUrl:
        "https://th.bing.com/th/id/R.4f5dc437a192345243885c2b78c46a40?rik=VF916YpTgqdyTw&pid=ImgRaw&r=0",
      icon: <BsFillPlusCircleFill size={28} />,
      info: "something",
    },
    {
      name: "skip the dishes",
      imageUrl:
        "https://th.bing.com/th/id/R.d31ccd40bc74a04e5f380f2cb711dad6?rik=3KthxzSXHl6XwQ&riu=http%3a%2f%2fomggrill.ca%2fwp-content%2fuploads%2f2020%2f05%2fSkip-the-Dishes-logo.png&ehk=kiDS3mNpSuWLIPiPo5LkwuGVH6qMCoMQ%2bY8h8e0pBPk%3d&risl=&pid=ImgRaw&r=0",
      icon: <BsFillPlusCircleFill size={28} />,
      info: "something",
    },
    {
      name: "uber eats",
      imageUrl:
        "data:image/png;base64,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",
      icon: <BsFillPlusCircleFill size={28} />,
      info: "something",
    },
    {
      name: "hungrypanda",
      imageUrl: "https://www.hungrypanda.co/statics/images/appicon.890ee11.png",
      icon: <BsFillPlusCircleFill size={28} />,
      info: "something",
    },
  ];

  return (
    <>
      <input type="checkbox" id="authOverlay" className="modal-toggle" />
      <div className="modal" ref={modalRef}>
        <div className="modal-box w-11/12 max-w-7xl relative p-0">
          <label
            htmlFor="authOverlay"
            className="btn btn-primary text-white btn-sm btn-circle absolute right-2 top-2 z-50"
          >
            ✕
          </label>
          {/* ============= */}
          <div className="flex flex-col md:flex-row min-h-screen">
            {/* Left Column */}
            <div className="flex flex-col justify-center items-center bg-gray-100 text-gray-700 p-8 md:w-1/2">
              {/* <div> */}
              {/* cards */}

              {platformsArr.map((item) => (
                <PlatformCard
                  key={Math.random().toString()}
                  platformInfo={item.info}
                  platformLogo={item.imageUrl}
                  platformName={item.name}
                  platformStatusLogo={item.icon}
                />
              ))}
              {/* </div> */}
            </div>

            {/* Right Column */}
            <div className="relative bg-primary text-white p-8 md:w-1/2 flex flex-col justify-center items-center">
              <h3 className="text-2xl font-bold mb-4 text-center">
                Platform Information
              </h3>
              <p className="text-sm text-center">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                consectetur risus non massa lobortis, sit amet tristique leo
                cursus. Donec volutpat lacinia velit id feugiat. Vestibulum ante
                ipsum primis in faucibus orci luctus et ultrices posuere cubilia
                Curae; Donec eleifend leo ac ligula posuere, in vestibulum leo
                viverra. Duis faucibus lacinia varius. Suspendisse at velit et
                sem eleifend convallis nec vel quam.
              </p>
              {/*  <div className="modal-action">
                <label htmlFor="authOverlay" className="btn btn-primary text-white">
                  Yay!
                </label>
              </div> */}
              {/* <label htmlFor="authOverlay" className="btn btn-primary text-white">
          open modal
        </label> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthOverlayModal;
