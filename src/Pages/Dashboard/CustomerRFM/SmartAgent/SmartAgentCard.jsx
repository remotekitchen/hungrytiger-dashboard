import { IoIosInformationCircle } from "react-icons/io";
import { ImCancelCircle } from "react-icons/im";

const SmartAgentCard = () => {
  return (
    <section>
      <div className="my-3 flex justify-between gap-3 bg-[#FBE8E9] p-3 border-l-4 rounded-2xl border-[#DA1E28]">
        <div className="flex gap-2">
          <div>
            <IoIosInformationCircle className="text-xl text-[#DA1E28]" />
          </div>
          <div>
            <h4 className="font-bold">Menu Dish Description Missing</h4>
            <p className="font-medium">
              Some items are missing description. Adding it will make <br />
              customers know more about the item.
            </p>
            <button className="mt-5 mb-3 px-5 py-1 bg-transparent border-[3px] border-[#42C2FF] rounded text-[#42C2FF] font-medium">
              Fixed Now
            </button>
          </div>
        </div>
        <div className="">
          <div className="flex items-center gap-5">
            <span className="text-[#42C2FF] font-medium cursor-pointer">See Details</span>
            <span className="cursor-pointer">
              <ImCancelCircle />
            </span>
          </div>
        </div>
      </div>
      {/* section will remove later // this is temporary  */}
      <div className="my-3 flex justify-between gap-3 bg-[#FEF9E8] p-3 border-l-4 rounded-2xl border-[#F1C21B]">
        <div className="flex gap-2">
          <div>
            <IoIosInformationCircle className="text-xl text-[#F1C21B]" />
          </div>
          <div>
            <h4 className="font-bold">Menu Item Image Missing</h4>
            <p className="font-medium">
              Some items are missing image. It might hurt your sales.
            </p>
            <button className="mt-5 mb-3 px-5 py-1 bg-transparent border-[3px] border-[#42C2FF] rounded text-[#42C2FF] font-medium">
              Fixed Now
            </button>
          </div>
        </div>
        <div className="">
          <div className="flex items-center gap-5">
            <span className="text-[#42C2FF] font-medium cursor-pointer">See Details</span>
            <span className="cursor-pointer">
              <ImCancelCircle />
            </span>
          </div>
        </div>
      </div>
      {/* section will remove later // this is temporary  */}
      <div className="my-3 flex justify-between gap-3 bg-[#E6ECFA] p-3 border-l-4 rounded-2xl border-[#42C2FF]">
        <div className="flex gap-2">
          <div>
            <IoIosInformationCircle className="text-xl text-[#42C2FF]" />
          </div>
          <div>
            <h4 className="font-bold">Menu Dish Description Missing</h4>
            <p className="font-medium">
              Some items are missing description. Adding it will make <br />
              customers know more about the item.
            </p>
            <button className="mt-5 mb-3 px-5 py-1 bg-transparent border-[3px] border-[#42C2FF] rounded text-[#42C2FF] font-medium">
              Fixed Now
            </button>
          </div>
        </div>
        <div className="">
          <div className="flex items-center gap-5">
            <span className="text-[#42C2FF] font-medium cursor-pointer">See Details</span>
            <span className="cursor-pointer">
              <ImCancelCircle />
            </span>
          </div>
        </div>
      </div>
      {/* section will remove later // this is temporary  */}
    </section>
  );
};

export default SmartAgentCard;
