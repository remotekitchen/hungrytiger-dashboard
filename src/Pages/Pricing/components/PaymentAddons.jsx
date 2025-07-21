import img1 from "../PricingPageImages/tablet.png"
import img2 from "../PricingPageImages/printer.png"



const PaymentAddons = () => {
  return (
<div className="max-w-screen-xl mx-auto rounded-xl px-4 md:px-8 py-6 md:py-10 border-2">
  <div className="text-center text-2xl md:text-3xl mb-5 font-bold">
    Add-ons
  </div>

  <div className="flex flex-col md:flex-row p-3 md:p-5 border-8 border-double items-center gap-4 md:gap-5">
    <img className="h-[40px] md:h-[50px] mb-4 md:mb-0" alt="chatchef tablet" src={img1} />
    <div className="flex flex-col gap-2 md:gap-0">
      <div className="p-2 text-md md:text-lg rounded-xl border-gray-700 font-bold">
        Tablet
      </div>
      <div className="p-2 text-md md:text-lg rounded-xl border-gray-700">
        (For stores that do not have their own tablet)
      </div>
    </div>
    <div className="flex flex-col gap-2 md:gap-0 w-full">
      <div className="p-2 text-md md:text-lg rounded-xl border-gray-700 text-end">
        $250 for purchase
      </div>
      <div className="p-2 text-md md:text-lg rounded-xl border-gray-700 text-end">
        $20 / month for lease
      </div>
    </div>
  </div>

  <div className="flex flex-col md:flex-row p-3 md:p-5 border-8 border-double items-center gap-4 md:gap-5 mt-4 md:mt-0">
    <img className="h-[40px] md:h-[50px] mb-4 md:mb-0" alt="chatchef printer" src={img2} />
    <div className="flex flex-col gap-2 md:gap-0">
      <div className="p-2 text-md md:text-lg rounded-xl border-gray-700 font-bold">
        Printer
      </div>
      <div className="p-2 text-md md:text-lg rounded-xl border-gray-700">
        (For stores that want to print order tickets)
      </div>
    </div>
    <div className="flex flex-col gap-2 md:gap-0 w-full">
      <div className="p-2 text-md md:text-lg rounded-xl border-gray-700 text-end">
        $250 for purchase
      </div>
      <div className="p-2 text-md md:text-lg rounded-xl border-gray-700 text-end">
        $20 / month for lease
      </div>
    </div>
  </div>
</div>

  );
};

export default PaymentAddons;
