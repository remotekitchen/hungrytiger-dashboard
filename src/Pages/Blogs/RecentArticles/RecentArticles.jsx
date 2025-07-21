import React from "react";
import RecentArticle from "./RecentArticle";

const RecentArticles = () => {
  const recentArticleContent = [
    {
      title:
        "The Digital Dining Revolution: How Restaurant Apps are Shaping the Culinary World",
      desc: "The digital era has transformed various aspects of our lives, with dining being no exception. Today, 'restaurant apps' aren't just about home delivery.",
      navigateTo: "the-digital-dining-revolution",
    },
    {
      title:
        "Food Near Me That Deliver: A Guide to Savoring Global Flavors at Home",
      desc: "With the rapidly changing lifestyle of the 21st century, how we consume food has evolved. We are no longer restricted to the immediate vicinity or our culinary skills when hunger strikes.",
      navigateTo: "food-near-me-that-deliver",
    },
    {
      title: "Unlocking Delicious Deals: A Guide to Food Rewards Programs",
      desc: "Food Rewards Programs are an integral part of the modern dining experience. They've risen in popularity over the last few years, enticing diners with offers and rewards while ensuring repeat visits for restaurants.",
      navigateTo: "unlocking-delicious-deals",
    },
  ];
  return (
    <div className="bg-white py-12 px-12">
      <h1 className="text-5xl font-bold text-primary">Recent Articles</h1>
      <div className="my-8 grid justify-items-center gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {recentArticleContent.map((data) => (
          <RecentArticle key={Math.random().toString()} data={data} />
        ))}
        {/* <RecentArticle />
        <RecentArticle />
        <RecentArticle /> */}
      </div>
    </div>
  );
};

export default RecentArticles;
