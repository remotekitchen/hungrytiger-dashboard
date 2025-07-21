import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./Components/PrivateRoute";
import SignIn from "./Pages/Authentication/UserAuth/SignIn";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Main from "./Pages/Main";
import MenuCategories from "./Pages/Menus/MenuDetails/Categories/categories";
import MenuItems from "./Pages/Menus/MenuDetails/Items/MenuItems";
import MenuDetailsContainer from "./Pages/Menus/MenuDetails/MenuDetailsContainer";
import MenuOverviews from "./Pages/Menus/MenuDetails/MenuOverviews";
import AllMenus from "./Pages/Menus/MenuModal/AllMenus";
import CreateMenuExcel from "./Pages/Menus/MenuModal/CreateMenuExcel/CreateMenuExcel";
import MenuServe from "./Pages/Menus/MenuModal/MenuServe";
import MenuSetup from "./Pages/Menus/MenuModal/MenuSetup";
import RestaurantOverview from "./Pages/Restaurent/RestaurantOverview/RestaurantOverview";
import Restaurent from "./Pages/Restaurent/Restaurent";
import ChurnedUsersTable from "./Pages/TrafficAnalytics/ChurnedCustomers";
// import Overviews from "./Pages/Dashboard/Overviews/Overviews";
import ErrorPage from "./Pages/ErrorPage";
import HelpPage from "./Pages/Help/HelpPage";
import SettingsPage from "./Pages/Settings/SettingsPage";

import ItemAvailability from "./Pages/Dashboard/DashboardPages/ItemAvailability/ItemAvailability";
import PickupAndDelivery from "./Pages/Dashboard/DashboardPages/Orders/PickupAndDelivery/PickupAndDelivery";

import OrderHistory from "./Pages/Dashboard/DashboardPages/Orders/OrderHistory";
import BankSetup from "./Pages/Finance/BankSetup/BankSetup";
import OrderManagement from "./Pages/HomePage/OrderManagement";
import AddEditMenus from "./Pages/Menus/AddEditMenus/AddEditMenus";
// import Pricing from "./Pages/HomePage/Pricing";
import Working from "./Components/Working";
import Performance from "./Pages/BussinessAnalytics/BussinessAnalytics";
import GroupInvitationPage from "./Pages/Dashboard/DashboardPages/GroupInvitationPage/GroupInvitationPage";
import BillingInvoice from "./Pages/Dashboard/DashboardPages/Orders/BillingInvoice";
import DoCustomization from "./Pages/Dashboard/DoCustomization/DoCustomization";
import Overviews from "./Pages/Dashboard/Overviews/OverViewsUpdate/Overviews";
import ActivationCampaigns from "./Pages/Marketing/ActivationCampaign/ActivationCampaigns";
import FissionCampaigns from "./Pages/Marketing/FissionCampaign/FissionCampaigns";
import GetFission from "./Pages/Marketing/FissionCampaign/GetFission";
import UpdatefissionCampaign from "./Pages/Marketing/FissionCampaign/UpdateFissionCampaign";
import LoyaltyRedeem from "./Pages/Marketing/LoyaltyRedeem/LoyaltyRedeem";
import Email from "./Pages/Marketing/Offers/Email";
import Offers from "./Pages/Marketing/Offers/Offers";
import Sms from "./Pages/Marketing/Offers/Sms";
import Rewards from "./Pages/Marketing/Rewards/Rewards";
import DeliveryFees from "./Pages/Menus/DeliveryFees/DeliveryFees";
import Ratings from "./Pages/Ratings/Ratings";
import GenerateQR from "./Pages/Settings/components/GenerateQR";
import PrintTest from "./Pages/Test/PrintTest";
// import TrafficAnalytics from "./Pages/TrafficAnalytics/TrafficAnalytics";
import StatementsPage from "./Components/Earnings/StatementsPage";
import Registration from "./Pages/Authentication/UserAuth/Registration";
import BussinessCard from "./Pages/BussinessCard/BussinessCard";
import HotelManagement from "./Pages/Dashboard/DashboardPages/HotelManagement";
import PhoneManagement from "./Pages/Dashboard/DoCustomization/PhoneManagement";
import Retention from "./Pages/Dashboard/Retention/Retention";
import FinanceMain from "./Pages/Finance/FinanceMain";
import PayoutActivity from "./Pages/Finance/Payout/PayoutActivity";
import GroupOrdering from "./Pages/Marketing/ActivationCampaign/GroupOrdering";
import CustomerEmail from "./Pages/Marketing/Offers/CustomerEmail/CustomerEmail";
import CustomerProfile from "./Pages/Marketing/Offers/CustomerProfile/CustomerProfile";
import ReviewAutoReply from "./Pages/Marketing/Offers/ReviewAutoReply";
import ReviewManagement from "./Pages/Marketing/Offers/ReviewMaagement";
import TrafficAnalytics from "./Pages/TrafficAnalytics/TrafficAnalytics";
const authToken = JSON.parse(localStorage.getItem("auth"))?.token;

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      // {
      //   path: "/",
      //   element: authToken ? <Dashboard /> : <SignIn />,
      // },
      {
        path: "/",
        element: authToken ? <Dashboard /> : <SignIn />,
      },
      {
        path: "/register",
        element: <Registration />,
      },
      /* {
				path: '/home',
				element: <Homepage />,
			},
			{
				path: '/pricing',
				element: <PricingPage />,
			}, */
      {
        path: "/order-management",
        element: <OrderManagement />,
      },
      /* {
				path: '/boost-your-sale',
				element: <ChatChefSales />,
			},
			{
				path: '/hassle-free-delivery',
				element: <ChatChefDelivery />,
			},
			{
				path: '/getademo',
				element: <DemoPage />,
			},
			{
				path: '/recap',
				element: <Recap />,
			},
			{
				path: '/survey',
				element: <Survey />,
			}, */
      {
        path: "/settings",
        element: (
          <PrivateRoute>
            <SettingsPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/help",
        element: (
          <PrivateRoute>
            <HelpPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/signin",
        element: <SignIn />,
      },
      /* {
				path: '/about-us',
				element: <AboutUs />,
			},
			{
				path: '/testimonials',
				element: <Testimonials />,
			},
			{
				path: '/customer-support',
				element: <Customersupport />,
			},
			{
				path: '/download-brochure',

				element: <Brochure />,
			},
			{
				path: '/free-digital-menu',
				element: <GetintouchDigitalMenu />,
			},
			{
				path: '/terms-and-conditions',
				element: <Terms />,
			},
			{
				path: '/privacy-policy',
				element: <Privacy />,
			},
			{
				path: '/blogs',
				element: <Blogs />,
			},
			{
				path: '/new-features',
				element: <ChatChefFeatures />,
			},
			{
				path: '/exclusive-content',
				element: <ChatChefExclusive />,
			},
			{
				path: '/success-stories',
				element: <SuccessStories />,
			},
			{
				path: '/feedback',

				element: <FeedbackPage />,
			},
			{
				path: '/blogs/:blogId',
				element: <BlogContent />,
			},
			{
				path: '/blogs/blog1',
				element: <DataDrivenMarketingStrat />,
			},
			
     
      /* {
				path: '/select-platform',
				element: <SelectPlatform />,
			},
			{
				path: '/test-qr',
				element: <Test />,
			},
			{
				path: '/careers',
				element: <Career />,
			},
			{
				path: '/menus',
				element: <Menus />,
			}, */
      {
        path: "/menus/create/excel/",
        element: (
          <PrivateRoute>
            <CreateMenuExcel />
          </PrivateRoute>
        ),
      },
      {
        path: "/print-test/",
        element: <PrintTest />,
      },
      {
        path: "/menus/brand",
        element: (
          <PrivateRoute>
            <MenuSetup />
          </PrivateRoute>
        ),
      },
      {
        path: "/menus/create/excel/",
        element: (
          <PrivateRoute>
            <CreateMenuExcel />
          </PrivateRoute>
        ),
      },
      {
        path: "/menus/serve",
        element: (
          <PrivateRoute>
            <MenuServe />
          </PrivateRoute>
        ),
      },
      {
        path: "/menus/all-menus",
        element: (
          <PrivateRoute>
            <AllMenus />
          </PrivateRoute>
        ),
      },
      {
        path: "/menus/all-menus/:menuId",
        element: (
          <PrivateRoute>
            <MenuDetailsContainer />
          </PrivateRoute>
        ),
        children: [
          {
            index: true,
            element: <MenuOverviews />,
          },
          {
            path: "/menus/all-menus/:menuId/overview",
            element: <MenuOverviews />,
          },
          {
            path: "/menus/all-menus/:menuId/categories",
            element: <MenuCategories />,
          },
          {
            path: "/menus/all-menus/:menuId/items",
            element: <MenuItems />,
          },
        ],
      },
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
        children: [
          {
            index: true,
            element: (
              <PrivateRoute>
                <Overviews />
                {/* <Working /> */}
              </PrivateRoute>
            ),
          },
          {
            path: "/dashboard/dashboard-overviews",
            element: (
              <PrivateRoute>
                <Overviews />
                {/* <Working /> */}
              </PrivateRoute>
            ),
          },
          {
            path: "/dashboard/tasks",
            element: (
              <PrivateRoute>
                <Working />
              </PrivateRoute>
            ),
          },
          {
            path: "/dashboard/delivery-Fees",
            element: (
              <PrivateRoute>
                {/* <Working /> */}
                <DeliveryFees />
              </PrivateRoute>
            ),
          },
          {
            path: "/dashboard/ratings",
            element: (
              <PrivateRoute>
                <Working />
              </PrivateRoute>
            ),
          },
          {
            path: "/dashboard/google-publishing",
            element: (
              <PrivateRoute>
                <Working />
              </PrivateRoute>
            ),
          },
          {
            path: "/dashboard/social-posts",
            element: (
              <PrivateRoute>
                <Working />
              </PrivateRoute>
            ),
          },
          {
            path: "/dashboard/customerProfile",
            element: (
              <PrivateRoute>
                <CustomerProfile />
              </PrivateRoute>
            ),
          },
          {
            path: "/dashboard/email",
            element: (
              <PrivateRoute>
                {/* <Working /> */}
                <Email />
              </PrivateRoute>
            ),
          },
          {
            path: "/dashboard/customerEmail",
            element: (
              <PrivateRoute>
                <CustomerEmail />
              </PrivateRoute>
            ),
          },
          {
            path: "/dashboard/sms",
            element: (
              <PrivateRoute>
                {/* <Working /> */}
                <Sms />
              </PrivateRoute>
            ),
          },
          // {
          //   path: "/dashboard/whatsapp",
          //   element: (
          //     <PrivateRoute>
          //       {/* <Working /> */}
          //       <WhatsApp />
          //     </PrivateRoute>
          //   ),
          // },
          {
            path: "/dashboard/operation",
            element: (
              <PrivateRoute>
                <Working />
              </PrivateRoute>
            ),
          },
          {
            path: "/dashboard/menu",
            element: (
              <PrivateRoute>
                <Working />
              </PrivateRoute>
            ),
          },
          {
            path: "/dashboard/marketing",
            element: (
              <PrivateRoute>
                <Working />
              </PrivateRoute>
            ),
          },
          {
            path: "/dashboard/reports",
            element: (
              <PrivateRoute>
                <Working />
              </PrivateRoute>
            ),
          },
          // customers-rfm - Menu Performance
          {
            path: "/dashboard/customers-rfm",
            element: (
              <PrivateRoute>
                {/* <MenuPerformance /> */}
                {/* <Working /> */}
                <TrafficAnalytics />
              </PrivateRoute>
            ),
          },
          // DO Customization
          {
            path: "/dashboard/do-customization",
            element: (
              <PrivateRoute>
                <DoCustomization />
              </PrivateRoute>
            ),
          },
          {
            path: "/dashboard/phone-management",
            element: (
              <PrivateRoute>
                <PhoneManagement />
              </PrivateRoute>
            ),
          },
          {
            path: "/dashboard/restaurants",
            element: (
              <PrivateRoute>
                <Restaurent />
              </PrivateRoute>
            ),
          },
          {
            path: "/dashboard/add-edit-menus",
            element: (
              <PrivateRoute>
                <AddEditMenus />
                {/* <Menus/> */}
              </PrivateRoute>
            ),
          },
          {
            path: "/dashboard/online-ordering",
            element: (
              <PrivateRoute>
                <Working />
                {/* <DirectOrderSettings /> */}
              </PrivateRoute>
            ),
          },
          {
            path: "/dashboard/qr-code",
            element: (
              <PrivateRoute>
                {/* <Working /> */}
                {/* <QRCode /> */}
                <GenerateQR />
              </PrivateRoute>
            ),
          },
          {
            path: "/dashboard/operating-hours",
            element: (
              <PrivateRoute>
                <Working />
                {/* <OperatingHours /> */}
              </PrivateRoute>
            ),
          },
          {
            path: "/dashboard/order-history",
            element: (
              <PrivateRoute>
                <OrderHistory />
              </PrivateRoute>
            ),
          },
          {
            path: "/dashboard/invoice-billing",
            element: (
              <PrivateRoute>
                <BillingInvoice />
              </PrivateRoute>
            ),
          },
          {
            path: "/dashboard/pos-integration",
            element: (
              <PrivateRoute>
                <Working />
                {/* <PosIntegration /> */}
              </PrivateRoute>
            ),
          },
          {
            path: "/dashboard/bank-setup",
            element: (
              <PrivateRoute>
                <BankSetup />
              </PrivateRoute>
            ),
          },
          {
            path: "/dashboard/taxes",
            element: (
              <PrivateRoute>
                <Working />
                {/* <Taxes /> */}
              </PrivateRoute>
            ),
          },
          // {
          //   path: "/dashboard/payout-settings",
          //   element: (
          //     <PrivateRoute>
          //       {/* <Working /> */}
          //       <PayoutSettings />
          //     </PrivateRoute>
          //   ),
          // },
          {
            path: "/dashboard/payout-activity",
            element: (
              <PrivateRoute>
                {/* <Working /> */}
                <PayoutActivity />
              </PrivateRoute>
            ),
          },
          {
            path: "/dashboard/reconciliation",
            element: (
              <PrivateRoute>
                {/* <Working /> */}
                <FinanceMain />
              </PrivateRoute>
            ),
          },
          {
            path: "/dashboard/item-availability",
            element: (
              <PrivateRoute>
                <ItemAvailability />
              </PrivateRoute>
            ),
          },
          {
            path: "/dashboard/bussiness-analytics",
            element: (
              <PrivateRoute>
                <Performance />
              </PrivateRoute>
            ),
          },
          {
            path: "/dashboard/earnings",
            element: (
              <PrivateRoute>
                <StatementsPage />
              </PrivateRoute>
            ),
          },
          {
            path: "/dashboard/traffic-analytics",
            element: (
              <PrivateRoute>
                <TrafficAnalytics />
              </PrivateRoute>
            ),
          },
          {
            path: "/dashboard/group-ordering",
            element: (
              <PrivateRoute>
                <GroupOrdering />
              </PrivateRoute>
            ),
          },
          {
            path: "/dashboard/review-management-remokitchen",
            element: (
              <PrivateRoute>
                <ReviewManagement />
              </PrivateRoute>
            ),
          },
          {
            path: "/dashboard/review-auto-reply",
            element: (
              <PrivateRoute>
                <ReviewAutoReply />
              </PrivateRoute>
            ),
          },
          {
            path: "/dashboard/churned-customers",
            element: (
              <PrivateRoute>
                <ChurnedUsersTable />
              </PrivateRoute>
            ),
          },
          {
            path: "/dashboard/retention-analytics",
            element: (
              <PrivateRoute>
                <Retention />
              </PrivateRoute>
            ),
          },
          {
            path: "/dashboard/ratings",
            element: (
              <PrivateRoute>
                <Ratings />
              </PrivateRoute>
            ),
          },
          {
            path: "/dashboard/businessCard",
            element: (
              <PrivateRoute>
                <BussinessCard />
              </PrivateRoute>
            ),
          },
          {
            path: "/dashboard/pickup-and-delivery",
            element: (
              <PrivateRoute>
                <PickupAndDelivery />
              </PrivateRoute>
            ),
          },
          {
            path: "/dashboard/offers",
            element: (
              <PrivateRoute>
                <Offers />
              </PrivateRoute>
            ),
          },
          {
            path: "/dashboard/rewards",
            element: (
              <PrivateRoute>
                <Rewards />
              </PrivateRoute>
            ),
          },
          {
            path: "/dashboard/fission-campaigns",
            element: (
              <PrivateRoute>
                <GetFission />
              </PrivateRoute>
            ),
          },
          {
            path: "/dashboard/loyalty-redeem",
            element: (
              <PrivateRoute>
                <LoyaltyRedeem />
              </PrivateRoute>
            ),
          },
          {
            path: "/dashboard/create-fission-campaigns",
            element: (
              <PrivateRoute>
                <FissionCampaigns />
              </PrivateRoute>
            ),
          },
          {
            path: "/dashboard/update-fission-campaigns",
            element: (
              <PrivateRoute>
                <UpdatefissionCampaign />
              </PrivateRoute>
            ),
          },

          // {
          //   path: "/dashboard/retention-campaigns",
          //   element: (
          //     <PrivateRoute>
          //       <RetentionCampaigns />
          //     </PrivateRoute>
          //   ),
          // },
          {
            path: "/dashboard/activations-campaigns",
            element: (
              <PrivateRoute>
                <ActivationCampaigns />
              </PrivateRoute>
            ),
          },
          {
            path: "/dashboard/invitation",
            element: (
              <PrivateRoute>
                <GroupInvitationPage />
              </PrivateRoute>
            ),
          },
          {
            path: "/dashboard/hotel-management/:section",
            element: (
              <PrivateRoute>
                <HotelManagement />
              </PrivateRoute>
            ),
          },
        ],
      },
      {
        path: "/restaurant/:id",
        element: (
          <PrivateRoute>
            <RestaurantOverview />
          </PrivateRoute>
        ),
      },
      {
        path: "/restaurant/:id",
        element: (
          <PrivateRoute>
            <RestaurantOverview />
          </PrivateRoute>
        ),
      },

      /* {
		path: "/image-doctor",
		element: (
		  <PrivateRoute>
			<ImageDoctor />
		  </PrivateRoute>
		),
	  }, */
      /* {
		path: "/image-doctor-updated",
		element: (
		  <PrivateRoute>
			<ImageDoctorUpdated />
		  </PrivateRoute>
		),
	  }, */
    ],
  },
]);

export default router;
