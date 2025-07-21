import { useParams } from "react-router-dom";
import DigiDiningRevo from "../EachBlog/DigiDiningRevo";
import FoodNearMeDelivery from "../EachBlog/FoodNearMeDelivery";
import GhostKitchens from "../EachBlog/GhostKitchens";
import UnLockingDeliMeals from "../EachBlog/UnLockingDeliMeals";
import DataDrivenMarketingStrat from "../EachBlog/DataDrivenMarketingStrat";
import UltimateDiningCard from "../EachBlog/UltimateDiningCard";
import VirtualRestaurant from "../EachBlog/VirtualRestaurants";
import RewardProgram from "../EachBlog/RewardProgram";
import RestaurantOnlineOrdering from "../EachBlog/RestaurantOnlineOrdering";
import OrderingApps from "../EachBlog/OrderingApps";
import IntegrateFoodOrdering from "../EachBlog/IntegrateFoodOrdering";
import GuestExperience from "../EachBlog/GuestExperience";
import GPTForRestaurant from "../EachBlog/GPTForRestaurant";
import FoodOrderingSystem from "../EachBlog/FoodOrderingSystem";
import FoodOrderingSoftware from "../EachBlog/FoodOrderingSoftware";
import DiningCard from "../EachBlog/DiningCard";
import RestaurantMarketing from "../EachBlog/RestaurantMarketing";

const BlogContent = () => {
  const { blogId } = useParams();
  // let selectedCompo;
  const dynamicRoute = {
    "the-digital-dining-revolution": () => <DigiDiningRevo />,
    "food-near-me-that-deliver": () => <FoodNearMeDelivery />,
    "unlocking-delicious-deals": () => <UnLockingDeliMeals />,
    "ghost-kitchens": () => <GhostKitchens />,
    "data-driven-market": () => <DataDrivenMarketingStrat />,
    "ultimate-dining-card": () => <DiningCard />,
    "experience-culinary": () => <UltimateDiningCard />,
    "exploring-the-virtual-restaurant": () => <VirtualRestaurant />,
    "best-digital-rewards": () => <RewardProgram />,
    "online-ordering": () => <RestaurantOnlineOrdering />,
    "ordering-apps": () => <OrderingApps />,
    "benefits-integrating": () => <IntegrateFoodOrdering />,
    "digital-menus": () => <GuestExperience />,
    "chatgpt-revolutionizing": () => <GPTForRestaurant />,
    "food-ordering-system": () => <FoodOrderingSystem />,
    "online-food-order": () => <FoodOrderingSoftware />,
    "dining-card": () => <DiningCard />,
    "proven-restaurant": () => <RestaurantMarketing />,
  };
  const selectedCompo = dynamicRoute[blogId] ? dynamicRoute[blogId]() : null;
  return <>{selectedCompo}</>;
};

export default BlogContent;
