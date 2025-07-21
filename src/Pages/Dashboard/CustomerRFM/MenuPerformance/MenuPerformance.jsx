import { FaArrowUp } from "react-icons/fa";
import ItemCombinations from "../Modifier/ItemCombinations";
import Modifier from "../Modifier/Modifier";
import DonutChartSmartAgent from "../SmartAgent/DonutChartSmartAgent";
import SmartAgentCard from "../SmartAgent/SmartAgentCard";
import LineChart from "./LineChart";
import RFMHeader from "./RFMHeader";
import SoldItemsTable from "./SoldItemsTable";
import TopMenuHeader from "./TopMenuHeader";

const MenuPerformance = () => {
  const seriesData = [500, 300, 200, 150];
  return (
    <section className="w-full">
      {/* RFM-Header  */}
      <div>
        <RFMHeader />
      </div>
      {/* Top-Menu Items  */}
      <div className="grid grid-cols-12 my-5 px-5 gap-5">
        <div className="grid col-span-12 md:col-span-7">
          <div className="flex justify-between px-5">
            <h3 className="text-lg md:text-xl font-bold">Top menu items</h3>
            {/* select menu  */}
            <TopMenuHeader />
          </div>
          <div className="flex justify-center w-full">
            <LineChart />
          </div>
        </div>
        <div className="grid col-span-12 md:col-span-5">
          {/* sold items count  */}
          <div className="w-full">
            <div className="w-full bg-primary rounded-2xl p-3 text-white">
              <h3 className="font-medium text-lg">Menu Performance</h3>
              <h1 className="py-2 text-3xl font-bold">4609 items sold</h1>
              <div className="flex items-center gap-2">
                <p className="flex items-center gap-2 rounded-lg bg-[#25A249] px-2">
                  <span>
                    <FaArrowUp />
                  </span>
                  <span>+2.5%</span>
                </p>
                <p className="font-bold py-2">From previous 7 days</p>
              </div>
            </div>
          </div>
          {/* sold count table  */}
          <div>
            <SoldItemsTable />
          </div>
        </div>
      </div>

      {/* Modifiers  */}
      <div className="">
        <div className="grid grid-cols-12 gap-4 pr-2">
          <div className="grid col-span-5 border border-gray-300 rounded-2xl">
            <Modifier />
          </div>
          <div className="grid col-span-7 border border-gray-300 rounded-2xl">
            <ItemCombinations />
          </div>
        </div>
      </div>

      {/* Smart Agent  */}
      <div className="my-5 w-full border border-gray-300 rounded-2xl p-3">
        <div className="w-full grid grid-cols-12 gap-3">
          <div className="grid col-span-4">
            <DonutChartSmartAgent series={seriesData} />
          </div>
          <div className="grid col-span-8">
            <SmartAgentCard />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MenuPerformance;
