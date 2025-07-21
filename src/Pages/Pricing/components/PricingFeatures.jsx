import img1 from "../PricingPageImages/Icon_Dark_Delivery.png";
import img2 from "../PricingPageImages/Icon_Dark_Order.png";
import img3 from "../PricingPageImages/Icon_Dark_Phone.png";
import img4 from "../PricingPageImages/Icon_Dark_PhoneLoc.png";
import img5 from "../PricingPageImages/Icon_Dark_POS.png";
import img6 from "../PricingPageImages/Icon_Dark_QR.png";

const PricingFeatures = () => {
  return (
    <div className="flex justify-center p-10">
      <div className="flex flex-wrap justify-center max-w-[1500px] gap-10 pl-0 sm:pl-0 2xl:pl-32  mb-5">
      <div className="flex flex-col items-start justify-start h-[260px] w-[350px]">
        <div className="pb-10">
        <img className="h-[75px]" alt="chatchef QR"
        src={img6} />
        </div>
        <div className="flex flex-col gap-5">
          <div className="w-fit font-bold text-xl border-t-4 border-sky-400">
          QR code ordering and payment.
          </div>
          <div className=" text-xl">
          Allow customers to order in-store from their own phones using QR codes.
          </div>
          </div>  
       </div>
       <div className="flex flex-col items-start justify-start h-[260px] w-[350px]">
        <div className="pb-10">
        <img className="h-[75px]" alt="Chatchef Allow customers to order in-store from their own phones using QR codes"
        src={img5} />
        </div>
        <div className="flex flex-col gap-5 ">
          <div className="w-fit font-bold text-xl border-t-4 border-sky-400">
          Seamless POS integration.
          </div>
          <div className=" text-xl">
          Effortlessly integrate Flipdish online ordering platform orders directly into your POS system.
          </div>
          </div>  
       </div>
       <div className="flex flex-col items-start justify-start h-[260px] w-[350px]">
        <div className="pb-10">
        <img className="h-[75px]" alt="chatchef Delivery"
        src={img1} />
        </div>
        <div className="flex flex-col gap-5">
          <div className="w-fit font-bold text-xl border-t-4 border-sky-400">
          Utilize a third-party driver fleet.
          </div>
          <div className=" text-xl">
          No need for your own delivery drivers? Our partners can handle the last-mile delivery.
          </div>
          </div>  
       </div>
       <div className="flex flex-col items-start justify-start h-[260px] w-[350px]">
        <div className="pb-10">
        <img className="h-[75px] " alt="chatchef order"
        src={img2} /> 
        </div>
        <div className="flex flex-col gap-5">
          <div className="w-fit font-bold text-xl border-t-4 border-sky-400">
          Efficient order management.
          </div>
          <div className=" text-xl">
          Streamline order management by centralizing all orders from platforms like Just Eat and Uber Eats, accessible and manageable from one system.
          </div>
          </div>  
       </div>
       <div className="flex flex-col items-start justify-start h-[260px] w-[350px]">
        <div className="pb-10">
        <img className="h-[75px]" alt="chatchef Efficient order management."
        src={img4} />
        </div>
        <div className="flex flex-col gap-5">
          <div className="w-fit font-bold text-xl border-t-4 border-sky-400">
          Real-time delivery driver tracking.
          </div>
          <div className=" text-xl">
          Delight customers with order and delivery driver tracking.
          </div>
          </div>  
       </div>
       <div className="flex flex-col items-start justify-start h-[260px] w-[350px]">
        <div className="pb-10">
        <img className="h-[75px]" alt="chatchef phone"
        src={img3} />
        </div>
        <div className="flex flex-col gap-5">
          <div className="w-fit font-bold text-xl border-t-4 border-sky-400">
          Warm and friendly phone redirection.
          </div>
          <div className=" text-xl">
          Automatically send polite SMS prompts to phone customers, encouraging online orders, streamlining processes, and easing staff workload.
          </div>
          </div>  
       </div>
       
    </div>
    </div>
  );
};

export default PricingFeatures;
