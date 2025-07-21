import ItemCombinationTable from "./ItemCombinationTable";
import SelectCombination from "./SelectCombination";

const ItemCombinations = () => {
  return (
    <section className="p-3 rounded-2xl bg-white">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-bold">Item Combinations</h3>
        {/* select combinations menu  */}
        <div>
          <SelectCombination />
        </div>
      </div>
      {/* combination table  */}
      <div>
        <ItemCombinationTable />
      </div>
    </section>
  );
};

export default ItemCombinations;
