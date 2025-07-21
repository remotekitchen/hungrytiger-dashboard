import Sec2Img from "../HomePageImages/sec2image.webp";

const FSec2 = () => {
  return (
    <div className="mx-auto flex flex-col items-center justify-center lg:box-border md:flex-row md:box-border sm:flex-row sm:box-border">
      <img
        className="w-[500px] h-[387px] object-cover"
        src={Sec2Img}
        alt="customers"
        height={200}
        width={200}
      />
      <div className="bg-gray rounded-xl overflow-hidden flex flex-col py-5 px-5 box-border items-start justify-start gap-[30px] max-w-[500px]">
        <h2>
          <b className="text-3xl">Retain Valuable Customers</b>
        </h2>
        <div className="flex flex-col items-start justify-start gap-2">
          <div className="flex flex-row py-0 px-1 items-center justify-start gap-[10px]">
            <div className="bg-sky-400 rounded-xl w-3.5 h-3.5"></div>
            <b className="text-2xl">Scene-Based Retention</b>
          </div>
          <div className="text-sm leading-[20px] text-dimgray">
            <p className="m-0 text-2xl">
              Retaining customers acquired through various scenes like viral
              activities, QR code ordering, discount coupon claims, and
              advertisement promotions.
            </p>
            <p className="m-0">&nbsp;</p>
            <p className="m-0 text-2xl">
              Ensuring customer retention through channels like WhatsApp, acting
              as a hub for communication.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-start justify-start gap-2">
          <div className="flex flex-row py-0 px-1 items-center justify-start gap-[10px]">
            <div className="bg-sky-400 rounded-xl w-3.5 h-3.5"></div>
            <b className="text-2xl">Geographically Targeted Operations</b>
          </div>
          <div className="text-sm leading-[20px] text-dimgray">
            <p className="m-0 text-2xl">
              Automatically assigning nearby store managers or store groups to
              customers scanning QR codes, enabling effective service within a 3
              to 5-kilometer radius.
            </p>
            <p className="m-0">&nbsp;</p>
            <p className="m-0 text-2xl">
              Optimizing customer engagement by segmenting them based on labels,
              behaviors, and value, tailoring specific operational strategies
              for each group.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FSec2;
