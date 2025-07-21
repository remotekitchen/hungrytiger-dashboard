import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import '../components/Styles/Carousel.css';
import { EffectCoverflow, Pagination } from 'swiper/modules';
import w1 from '../HomePageImages/w1.webp'
import w2 from '../HomePageImages/w2.webp'
import w3 from '../HomePageImages/w3.webp'
import m1 from '../HomePageImages/m1.webp'
import m2 from '../HomePageImages/m2.webp'
const Carousel = () => {
  const cards = [
    { title: 'Sophia, Restaurant Owner', description: "ChatChef's loyalty program transformed our customer retention rates. We've seen a 25% increase in repeat customers in just three months. Their platform is user-friendly and the support team is always there to help. Highly recommended!", img: w1, alt:'Chatchef Client 1' },
    { title: 'Michael, Franchise Manager', description: "We switched to ChatChef's loyalty program and the results have been astounding. The data-driven insights allowed us to target our customers more effectively, boosting our sales by 15%. The ROI has been incredible!", img: m2 , alt:'Chatchef Client 2'},
    { title: 'Emily, Marketing Director', description: "ChatChef's loyalty program is a game-changer. The fully white-labeled app seamlessly integrated with our existing systems, providing a consistent and branded experience for our customers. It's been a win-win for us and our loyal patrons.", img: w3 , alt:'Chatchef Client 3'},
    { title: 'Aisha, Small Business Owner', description: "As a small restaurant, we didn't think a loyalty program would make a big difference, but ChatChef proved us wrong. Their affordable solutions have not only increased customer loyalty but also made our operations more efficient. We're getting more done with less effort.", img: w2 , alt:'Chatchef Client 4'},
    { title: 'Carlos, Operations Manager', description: "ChatChef's loyalty program is incredibly flexible and customizable. We were able to set it up to match our unique needs, and the geographically targeted operations have been a boon for our multiple locations. Customer engagement has never been this high!", img: m1 , alt:'Chatchef Client 5'},
  ];
  const middleIndex = Math.floor(cards.length / 2);

  return (
    <>
      <h2 className="font-bold text-center text-2xl sm:text-2xl xl:text-3xl 2xl:text-3xl mb-8">
        What Our Clients Say
      </h2>
<Swiper
  effect={'coverflow'}
  grabCursor={true}
  centeredSlides={true}
  slidesPerView={'auto'}
  coverflowEffect={{
    rotate: 50,
    stretch: 0,
    depth: 100,
    modifier: 1,
    slideShadows: true,
  }}
  pagination={true}
  modules={[EffectCoverflow, Pagination]}
  className="mySwiper"
  initialSlide={middleIndex} // Set the initial slide to the middle card
>
  {cards.map((card, index) => (
   <SwiperSlide key={index}>
   <div key={index} className="w-full flex-none transform transition-all duration-300">
     <div className="card  bg-gradient-to-br from-gray-100 to-gray-200 border border-gray-300 rounded-lg shadow-sm p-6 hover:shadow-lg">
       <div className="card-body sky-500">
         {/* Optional: Add an icon or image here */}
         <div className="avatar justify-center">
           <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
             <img alt={card.alt} src={card.img} />
           </div>
         </div>
         <h2 className="card-title text-gray-800 text-xl font-bold mb-2">{card.title}</h2>
         <hr className=" bg-sky-500 h-1" />

         <p className="text-gray-600">{card.description}</p>
       </div>
     </div>
   </div>


 </SwiperSlide>
  ))}
</Swiper>

    </>
  );
};

export default Carousel;
