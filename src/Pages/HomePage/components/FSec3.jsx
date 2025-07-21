import Sec3Img from "../HomePageImages/Sec3image.webp";

const FSec3 = () => {
  return (
    <div className="mx-auto flex flex-col items-center justify-center lg:box-border md:flex-row md:box-border sm:flex-row sm:box-border">
      <img
        className="w-[500px] h-[387px] object-cover"
        src={Sec3Img}
        alt="empowring store operation"
        height={200}
        width={200}
      />
      <div className="bg-gray rounded-xl overflow-hidden flex flex-col py-5 px-5 box-border items-start justify-start gap-[30px] max-w-[500px]">
        <b className="text-3xl">
          <h2>Empower Store Operations</h2>
        </b>
        <div className="flex flex-col items-start justify-start gap-2">
          <div className="flex flex-row py-0 px-1 items-center justify-start gap-[10px]">
            <div className="bg-sky-400 rounded-xl w-3.5 h-3.5"></div>
            <b className="text-2xl">Operational Plan Repository</b>
          </div>
          <div className="text-sm leading-[20px] text-dimgray">
            <p className="m-0 text-2xl">
              Access to 30+ experts' operational plans from various industries,
              simplifying the process for all, including novices.
            </p>
            <p className="m-0">&nbsp;</p>
            <p className="m-0 text-2xl">
              Implementing ready-to-use strategies, even for individuals with
              limited experience.
            </p>
          </div>
        </div>
        <div className="flex flex-col items-start justify-start gap-2">
          <div className="flex flex-row py-0 px-1 items-center justify-start gap-[10px]">
            <div className="bg-sky-400 rounded-xl w-3.5 h-3.5"></div>
            <b className="text-2xl">Customer Engagement SOPs</b>
          </div>
          <div className="text-sm leading-[20px] text-dimgray">
            <p className="m-0 text-2xl">
              Creating a pre-planned operational schedule for each cycle,
              automatically reaching out to customers on schedule.
            </p>
            <p className="m-0">&nbsp;</p>
            <p className="m-0 text-2xl">
              Managing progress through a calendar-based system.
            </p>
          </div>
        </div>
        <div className="flex flex-col items-start justify-start gap-2">
          <div className="flex flex-row py-0 px-1 items-center justify-start gap-[10px]">
            <div className="bg-sky-400 rounded-xl w-3.5 h-3.5"></div>
            <b className="text-2xl">Data-Driven Insights for Every Activity</b>
          </div>
          <div className="text-sm leading-[20px] text-dimgray">
            <p className="m-0 text-2xl">
              Monitoring metrics such as market exposure, participation levels,
              and conversion rates.
            </p>
            <p className="m-0">&nbsp;</p>
            <p className="m-0 text-2xl">
              Providing direct data feedback from a value-centric perspective.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FSec3;
