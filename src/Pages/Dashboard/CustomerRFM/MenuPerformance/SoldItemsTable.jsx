const SoldItemsTable = () => {
  return (
    <div className="overflow-x-auto my-5 rounded-2xl">
      <table className="w-full border-collapse border border-gray-300">
        <thead className="bg-white text-white">
          <tr className="text-black text-[12px] text-left">
            <th className="py-2 pl-2 font-bold">Menu Items</th>
            <th className="py-2 font-bold">Items Price</th>
            <th className="py-2 font-bold">Items Sold</th>
            <th className="py-2 font-bold">Weekly Growth</th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-gray-100 font-medium">
            <td className="py-2 pl-2">Salad</td>
            <td className="py-2">$20.56</td>
            <td className="py-2">421</td>
            <td className="py-2 pr-2 text-[#25A249]">+1.2%</td>
          </tr>
          <tr className="bg-gray-100 font-medium">
            <td className="py-2 pl-2">Burger</td>
            <td className="py-2">$25.85</td>
            <td className="py-2">840</td>
            <td className="py-2 pr-2 text-red-500">-2.1%</td>
          </tr>
          <tr className="bg-gray-100 font-medium">
            <td className="py-2 pl-2">Pizza</td>
            <td className="py-2">$85.56</td>
            <td className="py-2">520</td>
            <td className="py-2 pr-2 text-[#25A249]">+4.2%</td>
          </tr>
          <tr className="bg-gray-100 font-medium">
            <td className="py-2 pl-2">Lemon Drink</td>
            <td className="py-2">$20.56</td>
            <td className="py-2">421</td>
            <td className="py-2 pr-2 text-[#25A249]">+1.2%</td>
          </tr>
          <tr className="bg-gray-100 font-medium">
            <td className="py-2 pl-2">Coffee</td>
            <td className="py-2">$20.56</td>
            <td className="py-2">421</td>
            <td className="py-2 pr-2 text-[#25A249]">+9.2%</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default SoldItemsTable;
