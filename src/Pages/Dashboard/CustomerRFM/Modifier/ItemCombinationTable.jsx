import { FaArrowRight } from "react-icons/fa";
/* eslint-disable react/no-unescaped-entities */
const ItemCombinationTable = () => {
  return (
    <section>
      <div className="flex justify-between items-center my-4 border-t-2 border-gray-300 py-2 border-b-2 pb-4">
        <div className="flex gap-2 items-center">
          <span className="font-bold text-lg">1</span>
          <div className="pl-2">
            <h4 className="font-medium text-lg">
              Oreo Milkshake + S'mores Milkshake
            </h4>
            <p className="text-gray-500 p-0">78 combinations sold</p>
          </div>
        </div>
        <div>
          <h4 className="text-lg font-medium">$2.4k</h4>
          <p className="text-[#25A249]">-1.3%</p>
        </div>
      </div>

      {/* remove later  */}
      <div className="flex justify-between items-center my-4 border-t-2 border-gray-300 py-2 border-b-2 pb-4">
        <div className="flex gap-2 items-center">
          <span className="font-bold text-lg">2</span>
          <div className="pl-2">
            <h4 className="font-medium text-lg">
              Deep Dish Cheese Pie + Fresh Pie
            </h4>
            <p className="text-gray-500 p-0">72 combinations sold</p>
          </div>
        </div>
        <div>
          <h4 className="text-lg font-medium">$9.4k</h4>
          <p className="text-red-500">1.3%</p>
        </div>
      </div>

      {/* remove later  */}
      <div className="flex justify-between items-center my-4 border-t-2 border-gray-300 py-2 border-b-2 pb-4">
        <div className="flex gap-2 items-center">
          <span className="font-bold text-lg">3</span>
          <div className="pl-2">
            <h4 className="font-medium text-lg">
              Classic Cheese Pie + Fresh Mozzarella Pie
            </h4>
            <p className="text-gray-500 p-0">30 combinations sold</p>
          </div>
        </div>
        <div>
          <h4 className="text-lg font-medium">$6.4k</h4>
          <p className="text-[#25A249]">5.3%</p>
        </div>
      </div>

      {/* remove later  */}
      {/* <div className="flex justify-between items-center my-4 border-t-2 border-gray-300 py-2 border-b-2 pb-4">
        <div className="flex gap-2 items-center">
          <span className="font-bold text-lg">4</span>
          <div className="pl-2">
            <h4 className="font-medium text-lg">
              S'mores Milkshake + Salted Milkshake
            </h4>
            <p className="text-gray-500 p-0">42 combinations sold</p>
          </div>
        </div>
        <div>
          <h4 className="text-lg font-medium">$2.4k</h4>
          <p className="text-[#25A249]">-1.3%</p>
        </div>
      </div> */}
      {/* view more button  */}
      <div>
        <button className="flex items-center gap-2">
          <span className="text-success">View More</span>
          <span>
            <FaArrowRight />
          </span>
        </button>
      </div>
    </section>
  );
};

export default ItemCombinationTable;
