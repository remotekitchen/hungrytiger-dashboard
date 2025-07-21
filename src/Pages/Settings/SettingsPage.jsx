import { useState } from "react";
import SettingsSidebar from "./SettingsSidebar";
import Payments from "./components/Payments";
import Subscription from "./components/Subscription";
import Accounts from "./components/Accounts";
import Invoices from "./components/Invoices";
// import ThemeForm from "./components/Theme";
import { IoSettingsOutline } from "react-icons/io5";
import ThemesContainer from "./components/ThemesContainer";
import GenerateQR from "./components/GenerateQR";

const SettingsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("Account");

  const components = {
    Account: <Accounts />,
    // "Holiday Hours": <HolidayHours/>,
    // "Preparation Times": <PreparationTimes />,
    "Payment Methods": <Payments />,
    Invoices: <Invoices />,
    Subscription: <Subscription />,
    Theme: <ThemesContainer />,
    GenerateQR: <GenerateQR />,
  };

  return (
    <div className="flex overflow-auto">
      {/* Sidebar */}
      <div className="p-4">
        {/* Category content */}
        <div className="mb-4 flex gap-2">
          <IoSettingsOutline className="text-[#42C2FF] text-2xl" />
          <h2 className="text-xl capitalize">Settings</h2>
        </div>
        <SettingsSidebar
          value={selectedCategory}
          onClick={setSelectedCategory}
        />
      </div>

      <div className="flex flex-col flex-1  border-l-2 border-[#D3E7F0]">
        <div className="h-[80vh] overflow-auto p-4">
          {components[selectedCategory]}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
