import FreeDigitalMenuButton from "./FreeDigitalMenuButton";
import HeroImage1 from "../HomePageImages/herosection@3x.webp";

const HeroSection = () => {
  return (
    <div
      className="h-[700px] flex flex-col items-start justify-center overflow-hidden bg-cover bg-no-repeat bg-center p-10 sm:pl-10 md:pl-20 lg:pl-40 xl:pl-80 2xl:pl-160"
      style={{ backgroundImage: `url(${HeroImage1})` }}
    >
      <div className="rounded-xl gap-1 [backdrop-filter:blur(1px)] flex flex-col">
      <h1>        
        <b className="flex text-2xl text-center 2xl:text-left">
        Transforming your restaurant into a digital powerhouse
        </b>
      </h1>
        <div className="flex text-4xl text-center 2xl:text-left font-bold sm:text-5xl 2xl:text-7xl">
          <h1>
          <span className="text-sky-400">Chatchef</span> - Specializing in <br></br>
    Restaurant <span className="text-sky-400">Loyalty</span> Programs
          </h1>
        </div>
        <div className="py-10 flex justify-center 2xl:justify-start">
          <FreeDigitalMenuButton />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
