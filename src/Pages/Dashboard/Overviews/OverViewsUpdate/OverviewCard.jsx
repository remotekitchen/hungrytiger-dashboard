const OverviewCard = ({ text, count, percentage }) => {
  const bgColorClass = percentage.startsWith("+")
    ? "bg-[#25A249]"
    : "bg-[#DA1E28]";
  return (
    <div className="w-full p-2 border border-gray-300 rounded-2xl">
      <h3 className="text-gray-500">{text}</h3>
      <div className="flex items-center justify-between w-full">
        <span className="text-xl font-bold">{count}</span>
        <span className={`px-3 rounded-xl text-white ${bgColorClass}`}>
          {percentage}
        </span>
      </div>
    </div>
  );
};

export default OverviewCard;
