import React, { useState } from "react";
import BlogsFilter from "./BlogsFilter";
import BlogsCard from "./BlogsCard";
import Data_Driven from '../blog_images/Chatchef_Data_Driven.webp'
import digital_dining from '../blog_images/Chatchef_digital_dining.webp'
import gpt from '../blog_images/Chatchef_gpt.webp'
import food_ordering from '../blog_images/Chatchef_food_ordering.webp'
import Chatchef_digital_menu from '../blog_images/Chatchef_digital_menu.webp'
import benefits from '../blog_images/Chatchef_benefits.webp'
import Chatchef_Empower from '../blog_images/Chatchef_Empower.webp'
import proven from '../blog_images/Chatchef_proven.webp'
import restaurant from '../blog_images/Chatchef_restaurant.webp'
import bestdigital from '../blog_images/Chatchef_bestdigital.webp'
import Experience  from '../blog_images/Chatchef_Experience.webp'
import Exploring from '../blog_images/Chatchef_Exploring.webp'

const AllBlogs = () => {
  // const blogsArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

  const blogsArr = [
    {
      title:
        "How Data-Driven Marketing Strategies Are Boosting Restaurant Revenues",
      content:
        "In today's contemporary restaurant industry, maintaining a competitive edge necessitates more than simply offering delectable cuisine and a pleasant atmosphere. It entails comprehending your clientele, their inclinations",
      navigateTo: "/data-driven-market",
      img: Data_Driven
    },
    {
      title: "How to Get the Most Out of Your Ultimate Dining Card",
      content:
        "In today's digital age, dining experiences have been elevated to new heights. One such innovation that's making waves is the ultimate dining card. But do you ensure you're maximizing its potential? Let's explore.",
      navigateTo: "/ultimate-dining-card",
      img: digital_dining
    },
    {
      title: "How Online Food Ordering Software is Transforming Restaurants",
      content:
        "Before, customers had to wait in long lines or call to order food. But now, with restaurant ordering systems, customers can easily order food from home or while out and about.",
      navigateTo: "/online-food-order",
      img: food_ordering
    },
    {
      title: "How ChatGPT is Revolutionizing Restaurant Operations",
      content:
        "The restaurant industry is no stranger to innovation. From the introduction of fast food to the rise of online delivery platforms, there&#39;s always something new on the horizon. ",
      navigateTo: "/chatgpt-revolutionizing",
      img: gpt
    },
    {
      title:
        "Digital Menus, Tableside Ordering, and Beyond: Tech's Role in Enhancing Guest Experience",
      content:
        " In the modern restaurant landscape, technology plays an integral role in shaping the guest experience. From the moment diners walk in, to the time they settle their bill, digital innovations enhance their journey, making it more seamless, personalized, and memorable.",
      navigateTo: "/digital-menus",
      img: Chatchef_digital_menu
    },
    {
      title:
        " The Benefits of Integrating a Food Ordering System for Restaurants",
      content:
        "  In the ever-evolving landscape of the restaurant industry, staying updated with the latest technology is pivotal. Integrating afood ordering system can be the game-changer your establishment needs.",
      navigateTo: "/benefits-integrating",
      img: benefits
    },
    {
      title:
        "Empower Your Restaurant with a User-Friendly Food Ordering System",
      content:
        "Stepping into the digital age, 3the restaurant industry is undergoing a revolutionary change. At the heart of this change is online food ordering software, transitioning from being a mere luxury to a necessary tool for enhancing customer experiences and boosting sales.",
      navigateTo: "/food-ordering-system",
      img: Chatchef_Empower
    },
    {
      title: "10 Proven Restaurant Marketing Strategies for 2023",
      content:
        " In an era where dining preferences and habits are rapidly evolving, staying updated with the latest marketing strategies is paramount for restaurants.",
      navigateTo: "/proven-restaurant",
      img: proven
    },
    {
      title:
        "How Restaurant Online Ordering is Redefining the Dining Experience",
      content:
        "The restaurant industry has come a long way, from hand-written orders to the tap of a screen. Digital advancements are driving an era where restaurant online ordering is no longer a luxury but an expectation.",
      navigateTo: "/online-ordering",
      img: restaurant
    },
    {
      title: "2023's Best Digital Rewards Programs in Dining",
      content:
        " In the ever-competitive world of dining, retaining customers is as vital as enticing new ones. With the surge in digital dining experiences, notably through ordering apps, the landscape for rewarding diner loyalty has been transformed.",
      navigateTo: "/best-digital-rewards",
      img: bestdigital
    },
    {
      title:
        "  Experience Culinary Delights with the Ultimate Dining Card Restaurants",
      content:
        " Eating at a restaurant is not just about the food, but also the experience. The Ultimate Dining Card is changing the game by providing customers with a carefully selected culinary adventure, not just a meal. ",
      navigateTo: "/experience-culinary",
      img: Experience 
    },
    {
      title: "Exploring the Virtual Restaurant Phenomenon",
      content:
        "The restaurant industry has undergone a revolutionary transformation in recent years. With the integration of technology and culinary expertise, virtual restaurants have emerged as a game-changing phenomenon.",
      navigateTo: "/exploring-the-virtual-restaurant",
      img: Exploring
    },
  ];

  /* const initialData = 4;
const isEndOfData = false;
const totalDataLength = blogsArr.length;

 */
  const [nextPage, setNextPage] = useState(6);
  const handleNextPage = () => {
    setNextPage(nextPage + 6);
  };
  const allBlogsLoaded = nextPage >= blogsArr.length;
  return (
    <div className="my-16 px-12">
      <BlogsFilter />
      {/* cards */}
      <div className="grid justify-items-center gap-7 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {blogsArr.slice(0, nextPage).map((blog, i) => (
          <BlogsCard key={i} blog={blog} />
        ))}
      </div>
      {/* div */}
      {!allBlogsLoaded && (
        <button
          onClick={handleNextPage}
          name="read-more"
          className="block mx-auto btn btn-primary text-white hover:bg-white hover:text-primary hover:border-primary rounded-full"
        >
          Load More
        </button>
      )}
    </div>
  );
};

export default AllBlogs;
