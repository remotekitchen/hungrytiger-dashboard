import RequestADemo from "./RequestADemo";

const CompletePackage = () => {
  return (
    <div className="flex flex-col p-10 items-center justify-between rounded-3xl gap-3 bg-gradient-to-b from-sky-300 shadow-[19px_33px_3px_rgba(0,_0,_0,_0.15)]">
      <div className="flex flex-col gap-5">
        <div>
          <header className="pricing-card__header">
            <h1 className="text-[25px] font-bold text-center">
              Complete Package
            </h1>
          </header>
          <section className="flex flex-col gap-2 items-center">
            <p className="flex flex-row items-end font-medium">
              From <p className="text-6xl font-bold">$225</p> /mo
            </p>
            <p className="text-center">(Billed Quarterly)</p>
          </section>
        </div>
        <div>
          <header className="pricing-card__header">
            <h1 className="text-[25px] font-bold text-center">
              Annual Subscription
            </h1>
          </header>
          <section className="flex flex-col gap-2 items-center">
            <p className="flex flex-row items-end font-medium">
              {/* From <p className="text-6xl font-bold">$2299</p> /yr */}
            </p>
            <p className="text-center">($191.6/month)</p>
          </section>
        </div>
        <RequestADemo />
      </div>
      <div className="border-t-4 border-green-400">
        <div className="text-gray text-[25px]">Plan Includes:</div>
        <ul className="list-disc">
          <li>Order Receiving System</li>
          <li>Analytics</li>
          <li>Marketing</li>
          <li>Loyalty Programs</li>
          <li>Calendar Automation</li>
          <li>Web-ordering</li>
          <li>Virtual Brand Creation</li>
          <li>Phone Application</li>
        </ul>
      </div>
    </div>
  );
};

export default CompletePackage;
