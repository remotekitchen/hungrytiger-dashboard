import DonutChart from "../MenuPerformance/DonutChart";
import SelectModifier from "./SelectModifier";
import { FaArrowRight } from "react-icons/fa";

const Modifier = () => {
  const seriesData = [300, 300, 300];
  return (
    <section className="bg-white p-3 rounded-2xl">
      {/* top  */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Modifiers</h2>
        {/* select modifier menu  */}
        <SelectModifier />
      </div>
      {/* chart  */}
      <div className="flex w-full flex-col  h-auto pt-5">
        <div className="w-full grid grid-cols-12 justify-between">
          <div className="grid col-span-8">
            <DonutChart series={seriesData} />
          </div>
          <div className="w-full h-full grid col-span-4">
            <div className="pt-5">
              <div className="flex gap-1 items-center py-1 ">
                <span className="w-3 h-3 bg-[#FF6767] rounded-full"></span>
                <span className="font-medium">Marshmallow</span>
              </div>
              <div className="flex gap-1 items-center py-1 ">
                <span className="w-3 h-3 bg-[#73FF78] rounded-full"></span>
                <span className="font-medium">Whipped Cream</span>
              </div>
              <div className="flex gap-1 items-center py-1 ">
                <span className="w-3 h-3 bg-[#F1FF4C] rounded-full"></span>
                <span className="font-medium">Coca-Cola</span>
              </div>
            </div>
          </div>
        </div>
        {/* view more button  */}
        <div className="py-5">
          <button className="flex items-center gap-2">
            <span className="text-success">View More</span>
            <span>
              <FaArrowRight />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Modifier;
