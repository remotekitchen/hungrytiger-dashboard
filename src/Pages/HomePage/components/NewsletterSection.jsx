import ButtonSubscribe from "./ButtonSubscribe";
import NewsletterImg1 from "../HomePageImages/newslettersection@3x.webp";

const NewsletterSection = () => {
  return (
    <div className="mx-auto overflow-hidden rounded-full flex flex-col p-10 box-border items-start justify-start gap-[20px] bg-cover bg-no-repeat bg-sky-200 max-w-[1500px] md:pl-20 md:box-border sm:pl-5 sm:box-border"
    >
      <b className="[text-shadow:0px_4px_5px_rgba(0,_0,_0,_0.25)] text-2xl lg:text-3xl sm:text-2xl">
        Get Timely Updates and Fresh ideas delivered to you inbox
      </b>
      <ButtonSubscribe />
    </div>
  );
};

export default NewsletterSection;
