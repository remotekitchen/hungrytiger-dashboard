import Sec1Img from "../HomePageImages/imagechatchef@2x.webp";

const FSec1 = () => {
  return (
    <section className="mx-auto flex flex-col items-center justify-center lg:box-border md:flex-row md:box-border sm:flex-row sm:box-border">
      <img
        className="w-[500px] h-[500px] object-cover"
        src={Sec1Img}
        alt="community"
        height={200}
        width={200}
      />
      <div className="bg-gray rounded-xl overflow-hidden flex flex-col py-5 px-5 box-border items-start justify-start gap-[30px] max-w-[500px]">
        <b className="text-3xl">
          <h2>Building Excitement with Community Marketing</h2>
        </b>
        <div className="flex flex-col items-start justify-start gap-2">
          <div className="flex flex-row py-0 px-1 items-center justify-start gap-[10px]">
            <div className="bg-sky-400 rounded-xl w-3.5 h-3.5"></div>
            <b className="text-2xl">Massively Trendy Events</b>
          </div>
          <div className="text-sm leading-[20px] text-dimgray">
            <p className="m-0 text-2xl">
              Zero-Cost Card Collection, Lucky Big Wheel, Free Bargain Hunt,
              etc.
            </p>
            <p className="m-0 ">&nbsp;</p>
            <p className="m-0 text-2xl">
              Utilizing updated activity tools for enhanced customer
              experiences.
            </p>
          </div>
        </div>
        <div className="flex flex-col items-start justify-start gap-2">
          <div className="flex flex-row py-0 px-1 items-center justify-start gap-[10px]">
            <div className="bg-sky-400 rounded-xl w-3.5 h-3.5"></div>
            <b className="text-2xl">Fun and Engaging Activities</b>
          </div>
          <div className="text-sm leading-[20px] text-dimgray">
            <p className="m-0 text-2xl">
              Group discussions, shared check-ins, product chain purchases,
              team-based raffles, group couponing, etc.
            </p>
            <p className="m-0">&nbsp;</p>
            <p className="m-0 text-2xl">
              Transforming the community into a thriving private domain.
            </p>
          </div>
        </div>
        <div className="flex flex-col items-start justify-start gap-2">
          <div className="flex flex-row py-0 px-1 items-center justify-start gap-[10px]">
            <div className="bg-sky-400 rounded-xl w-3.5 h-3.5"></div>
            <b className="text-2xl">Leveraging Social Fission</b>
          </div>
          <div className="text-sm leading-[20px] text-dimgray">
            <p className="m-0 text-2xl">
              Activities with inherent social sharing capabilities to bring in
              new customers through referrals.
            </p>
            <p className="m-0">&nbsp;</p>
            <p className="m-0 text-2xl">
              Encouraging existing customers to bring in even more new
              customers, ensuring a continuous flow of foot traffic to the
              store.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FSec1;
