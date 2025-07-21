import React from "react";
import line from "../PerformanceImages/line.png";
import line_red from "../PerformanceImages/line_red.png";
import ExportButton from "./ExportButton";

const TableComponent = () => {
  return (
    <div className="w-full h-[332px] mt-4 p-2 border boder-[#DDE1E6] rounded-2xl">
      <div className="w-full h-[56px] flex justify-between">
        <h1 className="text-lg font-bold leading-5 text-[#121619] py-5 px-3">
          Summary
        </h1>

        <ExportButton />
      </div>

      <div className="w-full h-48 mt-4 border border-[#DDE1E6] rounded-3xl relative overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className=" h-12 p-3">
            <tr>
              <th className="font-medium text-[#121619] text-start pl-5 flex flex-row gap-3 items-center mt-[15px]">
                Restaurants
                <svg
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  height="30px"
                  width="30px"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a.5.5 0 01.5.5v5.793l2.146-2.147a.5.5 0 01.708.708l-3 3a.5.5 0 01-.708 0l-3-3a.5.5 0 11.708-.708L7.5 10.293V4.5A.5.5 0 018 4z"
                  />
                </svg>
              </th>

              <th className="font-medium text-[#121619]  border-b-4">
                Aug 31, 2023
              </th>
              <th className="font-medium text-[#121619]  border-b-4">
                Order Count
              </th>
              <th className="font-medium text-[#121619] border-b-4">
                Gross Sales
              </th>
              <th className="font-medium text-[#121619] border-b-4">
                Net Sales
              </th>
            </tr>
          </thead>

          <tbody>
            <tr className=" border-b-4">
              <td className="font-medium text-[#121619] text-start pl-5 border-t-4 p-2">
                Restrurent Name 1
              </td>
              <td className="flex flex-row gap-4 justify-center">
                <img src={line} />
                <span className="text-[#25A249] text-sm font-normal">
                  +100%
                </span>
              </td>
              <td className="text-center text-sm font-normal">24</td>
              <td className="text-center text-sm font-normal">CA$1275.45</td>
              <td className="text-center text-sm font-normal">CA$808.25</td>
            </tr>

            <tr className="border-b-4">
              <td className="font-medium text-[#121619] text-start pl-5 p-2">
                Restrurent Name 2
              </td>
              <td className="flex flex-row gap-4 justify-center">
                <img src={line_red} />
                <span className="text-[#ff4343] text-sm font-normal">
                  -100%
                </span>
              </td>
              <td className="text-center text-sm font-normal">24</td>
              <td className="text-center text-sm font-normal">CA$1275.45</td>
              <td className="text-center text-sm font-normal">CA$808.25</td>
            </tr>

            <tr className="border-b-4">
              <td className="font-medium text-[#121619] text-start pl-5 p-2">
                Restrurent Name 3
              </td>
              <td className="flex flex-row gap-4 justify-center">
                <img src={line} />
                <span className="text-[#25A249] text-sm font-normal">
                  +100%
                </span>
              </td>
              <td className="text-center text-sm font-normal">24</td>
              <td className="text-center text-sm font-normal">CA$1275.45</td>
              <td className="text-center text-sm font-normal">CA$808.25</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableComponent;
