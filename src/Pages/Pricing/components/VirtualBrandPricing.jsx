import ButtonFreeDemo from "../../HomePage/components/ButtonFreeDemo";

export default () => {
  const plan = {
    name: "Virtual Brands plan",
    price: 47.95,
    isMostPop: true,
    features: [
      "Order Manager",
      "Menu Mangement",
      "Analytics",
      "Live Monitoring",
      "Promotions",
      "POS Integrations",
      "Tablet",
    ],
  };

  const features = [
    {
      name: "Order manager",
      desc: "Efficiently manage orders with automated aggregation, instant auto-acceptance and printing, and timely notifications for modified orders.",
    },
    {
      name: "Menus",
      desc: "Simplify menu tasks: manage menus with ease, streamline item 86ing, publish select items, and enhance menus with photos.",
    },
    {
      name: "Analytics Lite",
      desc: "Analytics Lite offers sales insights, promotional analysis, and easy data export for informed business decisions and growth strategies.",
    },
    {
      name: "Live Monitoring",
      desc: "Experience real-time operations with Live Monitoring, providing instant access to live data and immediate alerts for proactive actions.",
    },
  ];

  return (
    <section className="relative py-14 mb-20">
      <div className="max-w-screen-xl mx-auto text-gray-600 md:px-8">
        <div className="relative max-w-xl space-y-3 px-4 md:px-0">
          <p className="text-gray-800 text-3xl font-semibold sm:text-4xl">
            Virtual Brands
          </p>
          <div className="max-w-xl">
            <p>Designed for restaurants to increase sales, and delivery.</p>
          </div>
        </div>
        <div className="mt-16 justify-between gap-8 md:flex">
          <ul className="flex-1 max-w-md space-y-10 px-4 md:px-0">
            {features.map((item, idx) => (
              <li key={idx} className="flex gap-x-3">
                <div>
                  <h4 className="text-lg text-gray-800 font-medium">
                    {item.name}
                  </h4>
                  <p className="text-gray-600 mt-2 md:text-xl">{item.desc}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="flex-1 flex flex-col border-y mt-6 md:max-w-xl md:rounded-xl md:border md:border-x-none md:shadow-lg md:mt-0">
            <div className="p-4 py-8 border-b md:p-8">
              <div className="justify-between flex">
                <div className="max-w-xs">
                  <span className="text-2xl text-gray-800 font-semibold sm:text-3xl">
                    {plan.name}
                  </span>
                  <p className="mt-3 sm:text-sm">{plan.desc}</p>
                </div>
                <div className="flex-none text-gray-800 text-2xl font-semibold sm:text-3xl">
                  {/* ${plan.price}{" "}
                  <span className="text-xl text-gray-600 font-normal">/mo</span> */}
                </div>
              </div>
              <button name="free-demo">
                <ButtonFreeDemo />
              </button>
            </div>
            <ul className="p-4 space-y-3 sm:grid sm:grid-cols-2 md:block md:p-8 lg:grid">
              <div className="pb-2 col-span-2 text-gray-800 font-medium">
                <p>Features</p>
              </div>
              {plan.features.map((featureItem, idx) => (
                <li key={idx} className="flex items-center gap-5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-sky-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  {featureItem}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
