const categoryData = [
  { id: 1, name: "Account" },
  // { id: 3, name: "Holiday Hours" },
  // { id: 4, name: "Preparation Times" },
  { id: 5, name: "Payment Methods" },
  { id: 6, name: "Invoices" },
  { id: 7, name: "Subscription" },
  { id: 8, name: "Theme" },
  { id: 8, name: "GenerateQR" },
];
const SettingsSidebar = ({ value, onClick }) => {
  return (
    <aside className="h-[70vh] overflow-y-scroll w-[240px]">
      <ul className="list-none flex flex-col gap-2 capitalize m-0">
        {categoryData.map((item) => (
          <li
            onClick={() => onClick(item?.name)}
            className={` ${
              value === item?.name ? "bg-[#42C2FF] text-white rounded-lg" : ""
            } transition-all duration-300 h-12  flex justify-start items-center px-8 cursor-pointer hover:bg-[#42C2FF] hover:rounded-lg`}
            key={item?.id}
          >
            {item?.name}
          </li>
        ))}
      </ul>
    </aside>
  );
};
export default SettingsSidebar;
