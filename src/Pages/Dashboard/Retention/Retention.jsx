import React from "react";
import RetentionCard from "./RetentionCard";
import RetentionChart from "./RetentionChart";
import SelectionField from "./SelectionField";
import StoreInformation from "./StoreInformation";

const Retention = () => {
  return (
    <div className="px-5 my-10">
      {/* Selection field - for retention  */}
      <SelectionField />
      {/* Retention card  */}
      <RetentionCard />
      {/* retention chart  */}
      <RetentionChart />
      {/* store information area  */}
      <StoreInformation />
    </div>
  );
};

export default Retention;
