import React, { useContext } from "react";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { selectedPlatform } from "../../../../redux/features/platform/platformSlice";
import { showModal } from "../../../../redux/features/modal/modalSlice";
const PlatformCard = ({
  platformName,
  platformInfo,
  platformLogo,
  platformStatusLogo,
}) => {
  const dispatch = useDispatch();
  const handleDispatchAndModal = () => {
    dispatch(selectedPlatform(platformName));
    dispatch(showModal(false));
  };
  return (
    <div
      onClick={handleDispatchAndModal}
      className="hover:scale-105 my-2 cursor-pointer hover:shadow-md transition-all flex p-4 items-center justify-between bg-white w-4/5 rounded-lg h-16"
    >
      <div className="flex items-center justify-between">
        {/* logo and info */}

        <div className="avatar m-3">
          <div className="w-8 rounded">
            <img src={platformLogo} alt="Platform" />
          </div>
        </div>
        <div>
          <h5 className="font-bold text-[1.1rem] capitalize">{platformName}</h5>
          <p className="text-gray-500">{platformInfo}</p>
        </div>
      </div>
      <div>
        {/* icon */}
        {platformStatusLogo}
      </div>
    </div>
  );
};

export default PlatformCard;
