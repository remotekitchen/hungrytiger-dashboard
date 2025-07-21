import Sec4Img from "../HomePageImages/Sec4image.webp";

const FSec4 = () => {
  return (
    <div className="mx-auto flex flex-col items-center justify-center lg:box-border md:flex-row md:box-border sm:flex-row sm:box-border">
      <img
        className="w-[500px] h-[453px] object-cover"
        src={Sec4Img}
        alt="revenue interactive transaction"
        height={200}
        width={200}
      />
      <div className="bg-gray rounded-xl overflow-hidden flex flex-col py-5 px-5 box-border items-start justify-start gap-[30px] max-w-[500px]">
        <b className="text-3xl">
          Elevating Revenue with Interactive Transactions
        </b>
        <div className="flex flex-col items-start justify-start gap-2">
          <div className="flex flex-row py-0 px-1 items-center justify-start gap-[10px]">
            <div className="bg-sky-400 rounded-xl w-3.5 h-3.5"></div>
            <b className="text-2xl">Driving Repeat Purchases through Interactive Deals</b>
          </div>
          <div className="text-sm leading-[20px] text-dimgray">
            <p className="m-0 text-2xl">
              Engaging customers with entertaining activities like flash sales
              and customer-assisted distribution.
            </p>
            <p className="m-0">&nbsp;</p>
            <p className="m-0 text-2xl">
              Encouraging customers to make quicker purchases.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-start justify-start gap-2">
          <div className="flex flex-row py-0 px-1 items-center justify-start gap-[10px]">
            <div className="bg-sky-400 rounded-xl w-3.5 h-3.5 text-2xl"></div>
            <b className="text-2xl">Private Domain Mini-Program</b>
          </div>
          <div className="text-sm leading-[20px] text-dimgray">
            <p className="m-0 text-2xl">
              Facilitating interactions like sharing purchase experiences,
              private domain chain purchases, and bundled sales.
            </p>
            <p className="m-0">&nbsp;</p>
            <p className="m-0 text-2xl">
              Cultivating a vibrant private domain community for the brand
            </p>
          </div>
        </div>
        <div className="flex flex-col items-start justify-start gap-2">
          <div className="flex flex-row py-0 px-1 items-center justify-start gap-[10px]">
            <div className="bg-sky-400 rounded-xl w-3.5 h-3.5"></div>
            <b className="text-2xl">Diversified Income Streams</b>
          </div>
          <div className="text-sm leading-[20px] text-dimgray">
            <p className="m-0 text-2xl">
              Integrating brand packages, shopping center benefits, and cinema
              tickets into a product library.
            </p>
            <p className="m-0 ">&nbsp;</p>
            <p className="m-0 text-2xl">
              Enhancing revenue by offering customers a wide range of purchasing
              options during every activity.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FSec4;
