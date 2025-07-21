import React from "react";
import Bogo from "./Bogo";
import GroupOrdering from "./GroupOrdering";
import SpendXSaveY from "./SpendXSaveY";
import Voucher from "./Voucher";

const ActivationCampaigns = () => {
  return (
    <div>
      <div className="p-5">
        <h1 className="text-4xl font-bold mb-7">Activation Campaign</h1>
        <SpendXSaveY />
        {/* <GroupOrdering /> */}
        <Bogo />
        <Voucher />
      </div>
    </div>
  );
};

export default ActivationCampaigns;
