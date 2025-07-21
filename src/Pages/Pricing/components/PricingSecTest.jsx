import ButtonFreeDemo from "../../HomePage/components/ButtonFreeDemo";

const PricingSecTest = () => {
  const plans = [
    {
      name: "Basic Package",
      desc1: "(Billed Quarterly)",
      price1: 99,
      desc2: "($83.25/month)",
      price2: 999,
      isMostPop: false,
      features: [
        "Order Receiving System",
        "Analytics",
        "Marketing",
        "Calendar Automation",
        "Web-ordering",
      ],
    },
    {
      name: "Essential Package",
      desc1: "(Billed Quarterly)",
      price1: 225,
      desc2: "($191.6/month)",
      price2: 2299,
      isMostPop: true,
      features: [
        "Order Receiving System",
        "Analytics",
        "Marketing",
        "Loyalty Programs",
        "Calendar Automation",
        "Web-ordering",
        "Virtual Brand Creation",
        "Phone Application",
      ],
    },
    {
      name: "Complete Package",
      desc1: "(Billed Quarterly)",
      price1: 499,
      desc2: "($416.6/month)",
      price2: 4999,
      isMostPop: false,
      features: [
        "Order Receiving System",
        "Analytics",
        "Marketing",
        "Loyalty Programs",
        "Calendar Automation",
        "Web-ordering",
        "Virtual Brand Creation",
        "Phone Application",
        "Design Goals",
        "Solution Design",
        "Implementation Support",
        "Periodic Review",
        "CAAS (chat as a service)",
        "Branded Website",
      ],
    },
  ];

  return (
    <section className="pt-14">
      <div className="max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8">
        <div className="relative max-w-xl mx-auto sm:text-center">
          <h3 className="text-gray-800 text-3xl font-semibold sm:text-4xl">
            Pricing
          </h3>
          <div className="mt-3 max-w-xl">
            <p>Choose the plan that works for your restaurant</p>
          </div>
        </div>
        <div className="mt-16 justify-center text-white gap-6 sm:grid sm:grid-cols-2 sm:space-y-0 lg:grid-cols-3 bg-gradient-to-b rounded-2xl border-2 from-sky-300 to-sky-300 p-10">
          {plans.map((item, idx) => (
            <div
              key={idx}
              className={`relative flex-1 flex items-stretch flex-col rounded-2xl border-2 mt-6 sm:mt-0   bg-gray-600 bg-opacity-40 ${
                item.isMostPop ? "mt-10" : ""
              }`}
            >
              {item.isMostPop ? (
                <span className="w-32 absolute -top-5 left-0 right-0 mx-auto px-3 py-2 rounded-full border shadow-md bg-sky-200 text-center text-gray-700 text-sm font-semibold">
                  Most popular
                </span>
              ) : (
                ""
              )}
<div className="">
              <div className="p-8 space-y-4 border-b flex flex-col items-center">
                                <span className="text-white font-bold text-2xl">
                                    {item.name}
                                </span>
                                <div className="text-gray-800 text-3xl font-semibold">
                                    {/* ${item.price1}{" "} */}
                                    {/* <span className="text-xl text-gray-600 font-normal">/mo</span> */}
                                </div>
                                {/* <p>{item.desc1}</p> */}
                                {/* <span className="text-sky-400 font-medium ">
                                    Annual Package
                                </span> */}
                                <div className="text-gray-800 text-3xl font-semibold">
                                    {/* ${item.price2}{" "} */}
                                    {/* <span className="text-xl text-gray-600 font-normal">/yr</span> */}
                                </div>
                                {/* <p>{item.desc2}</p> */}
                                <button name="freeDemo">
                                    <ButtonFreeDemo />
                                </button>
                            </div>


              <ul className="p-8 space-y-3">
                <li className="pb-2 text-black font-medium ">
                  <p>Includes: </p>
                </li>
                {item.features.map((featureItem, idx) => (
                  <li key={idx} className="flex items-center gap-5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-black"
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
            </div></div>
          ))}
        </div>
        <div className="text-center text-xl rounded-xl border-2 mt-5 p-5 font-bold">
          Our convenience fee will be $1.99 per order for Essential and Complete
          packages, $0.99 per order for VIP package.
        </div>
      </div>
    </section>
  );
};

export default PricingSecTest;
