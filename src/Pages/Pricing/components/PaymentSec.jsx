import payimg1 from "../PricingPageImages/visa.png"
import payimg2 from "../PricingPageImages/card.png"
import payimg3 from "../PricingPageImages/discover.png"
import payimg4 from "../PricingPageImages/american-express.png"
import payimg5 from "../PricingPageImages/apple-pay.png"
const PaymentSec = () => {
  return (
<div className="max-w-screen-xl mx-auto rounded-xl p-4 md:p-10 border-2">
  <div className="text-center text-2xl md:text-3xl mb-5 font-bold">
    Payment Processing
  </div>
  <div className="text-center max-w-fit p-2 text-md md:text-lg mx-auto border-8 rounded-xl border-gray-700 border-dotted">
    Powered by Stripe
  </div>
  <div className="text-center text-md md:text-lg p-3 md:p-5 mt-3">
    Flat 2.90% + 30¢ rate on all accepted cards. Additional fees required for international cards.
  </div>
  <div className="flex flex-row flex-wrap items-center justify-center gap-2 md:gap-5">
    <img className="h-[40px] md:h-[75px]" alt="visa"
      src={payimg1} />
    <img className="h-[30px] md:h-[50px]" alt="card"
      src={payimg2} />
    <img className="h-[40px] md:h-[75px]" alt="discover"
      src={payimg3} />
    <img className="h-[40px] md:h-[75px]" alt="american-express"
      src={payimg4} />
    <img className="h-[40px] md:h-[75px]" alt="apple-pay"
      src={payimg5} />
  </div>
</div>

  );
};                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
export default PaymentSec;

