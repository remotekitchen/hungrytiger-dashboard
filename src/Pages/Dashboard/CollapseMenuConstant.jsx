import React from 'react';
import {
  AiOutlineBank,
	AiOutlineDisconnect,
	AiOutlineDollar,
	AiOutlineFileSearch,
	AiOutlineInteraction,
	AiOutlineMail,
	AiOutlineMoneyCollect,
	AiOutlineReconciliation,
} from 'react-icons/ai';
import { BiCalendarStar, BiDetail, BiFoodMenu } from 'react-icons/bi';
import {
  BsActivity,
	BsFillMenuAppFill,
	BsImages,
	BsPeople,
	BsQrCode,
} from 'react-icons/bs';
import { CgMenuRound } from 'react-icons/cg';
import { CiGift, CiTimer } from 'react-icons/ci';
import { FaPhoneAlt, FaRegIdCard, FaUserAlt } from 'react-icons/fa';
import { GiFission } from 'react-icons/gi';
import { GoHome } from 'react-icons/go';
// import { FaPhoneAlt, FaRegIdCard, FaUserAlt } from "react-icons/fa";
import { GrGroup } from 'react-icons/gr';
import { IoIosPeople } from 'react-icons/io';
import { IoAnalyticsSharp, IoShareSocialOutline } from 'react-icons/io5';
import {
	MdEventAvailable,
	MdLocalOffer,
	MdOutlineBusinessCenter,
	MdOutlineGraphicEq,
	MdOutlineSms,
	MdReviews,
} from 'react-icons/md';
import {
	RiDirectionLine,
	RiMenuAddLine,
	RiShieldUserLine,
} from 'react-icons/ri';
import { RxDashboard } from 'react-icons/rx';
import { SlSocialGoogle } from 'react-icons/sl';
import { TbReceiptTax, TbReportAnalytics } from 'react-icons/tb';
import { VscGraphLine, VscVmActive } from 'react-icons/vsc';
import { useLocation } from 'react-router-dom';
import { store } from "../../redux/store";

const baseUrl = import.meta.env.VITE_API_ROOT;
const data = store.getState();
// console.log(data?.auth?.user_info?.hotel_admin, "get-userrrrrrinfoooo");
export const sidebarCollapseMenus = [
  // {
  //   menuName: "Bussiness",
  //   menuIcon: <GoHome size={20} />,
  //   subMenus: [
  //     {
  //       subMenuName: "Dashboard",
  //       subMenuLink: "/dashboard-overviews",
  //       subMenuIcon: <RxDashboard size={20} />,
  //     },
  //   ],
  // },
  {
    menuName: "Overview",
    menuIcon: <GoHome size={20} />,
    subMenus: [
      {
        subMenuName: "Dashboard",
        subMenuLink: "/dashboard-overviews",
        subMenuIcon: <RxDashboard size={20} />,
      },

      ...(baseUrl === "https://test.api.chatchefs.com/"
        ? [
            {
              subMenuName: "Operating Hours",
              subMenuLink: "/operating-hours",
              subMenuIcon: <CiTimer size={20} />,
            },
          ]
        : []),

      // {
      //   subMenuName: "Online Ordering",
      //   subMenuLink: "/online-ordering",
      //   subMenuIcon: <RiDirectionLine size={20} />,
      // },
      ...(baseUrl === "https://test.api.chatchefs.com/"
        ? [
            {
              subMenuName: "Online Ordering",
              subMenuLink: "/online-ordering",
              subMenuIcon: <RiDirectionLine size={20} />,
            },
          ]
        : []),

      // {
      //   subMenuName: "QR Code",
      //   subMenuLink: "/qr-code",
      //   subMenuIcon: <BsQrCode size={20} />,
      // },
      // {
      //   subMenuName: "Delivery Fees",
      //   subMenuLink: "/delivery-fees",
      //   subMenuIcon: <AiOutlineMoneyCollect size={20} />,
      // },
      // {
      //   subMenuName: "Item Availability",
      //   subMenuLink: "/item-availability",
      //   subMenuIcon: <MdEventAvailable size={20} />,
      // },
    ],
  },
  {
		menuName: 'Menu',
		menuIcon: <BsFillMenuAppFill size={20} />,
		subMenus: [
			{
				subMenuName: 'Add/Edit Menus',
				subMenuLink: '/add-edit-menus',
				subMenuIcon: <RiMenuAddLine size={20} />,
			},
			// {
			//   subMenuName: "All Menus",
			//   subMenuLink: "/menus",
			//   subMenuIcon: "dashboard icon",
			// },
			// {
			//   subMenuName: "Add Menu",
			//   subMenuLink: "/add-menu",
			//   subMenuIcon: "dashboard icon",
			// },
			// {
			//   subMenuName: "Edit Menu",
			//   subMenuLink: "/edit-menu",
			//   subMenuIcon: "dashboard icon",
			// },
			// {
			//   subMenuName: "Restaurants",
			//   subMenuLink: "/restaurants",
			//   subMenuIcon: <IoRestaurantOutline size={20} />,
			// },

			// {
			//   subMenuName: "Operating Hours",
			//   subMenuLink: "/operating-hours",
			//   subMenuIcon: <CiTimer size={20} />,
			// },

			...(baseUrl === 'https://test.api.chatchefs.com/'
				? [
						{
							subMenuName: 'Operating Hours',
							subMenuLink: '/operating-hours',
							subMenuIcon: <CiTimer size={20} />,
						},
					]
				: []),

			// {
			//   subMenuName: "Online Ordering",
			//   subMenuLink: "/online-ordering",
			//   subMenuIcon: <RiDirectionLine size={20} />,
			// },
			...(baseUrl === 'https://test.api.chatchefs.com/'
				? [
						{
							subMenuName: 'Online Ordering',
							subMenuLink: '/online-ordering',
							subMenuIcon: <RiDirectionLine size={20} />,
						},
					]
				: []),

			{
				subMenuName: 'QR Code',
				subMenuLink: '/qr-code',
				subMenuIcon: <BsQrCode size={20} />,
			},
			{
				subMenuName: 'Delivery Fees',
				subMenuLink: '/delivery-fees',
				subMenuIcon: <AiOutlineMoneyCollect size={20} />,
			},
			{
				subMenuName: 'Item Availability',
				subMenuLink: '/item-availability',
				subMenuIcon: <MdEventAvailable size={20} />,
			},
		],
	},
  {
    menuName: "Order",
    menuIcon: <CgMenuRound size={20} />,
    subMenus: [
      // {
      //   subMenuName: "Pickup and Delivery",
      //   subMenuLink: "/pickup-and-delivery",
      //   subMenuIcon: <TbTruckDelivery size={20} />,
      // },
      {
        subMenuName: "Invoicing and Billing",
        subMenuLink: "/invoice-billing",
        subMenuIcon: <BiDetail size={20} />,
      },
      {
        subMenuName: "Order History",
        subMenuLink: "/order-history",
        subMenuIcon: <BiDetail size={20} />,
      },
      // {
      //   subMenuName: "Holiday Schedule",
      //   subMenuLink: "/holiday-schedule",
      //   subMenuIcon: "dashboard icon",
      // },
      // {
      //   subMenuName: "Item Availability",
      //   subMenuLink: "/item-availability",
      //   subMenuIcon: <MdEventAvailable size={20} />,
      // },
      // {
      //   subMenuName: "Delivery Fees",
      //   subMenuLink: "/Delivery-Fees",
      //   subMenuIcon: <AiOutlineMoneyCollect size={20} />,
      // },
      // ...(baseUrl === "https://test.api.chatchefs.com/"
      //   ? [
      //       {
      //         subMenuName: "Delivery Fees",
      //         subMenuLink: "/Delivery-Fees",
      //         subMenuIcon: <AiOutlineMoneyCollect size={20} />,
      //       },
      //     ]
      //   : []),

      // {
      //   subMenuName: "POS Integration",
      //   subMenuLink: "/pos-integration",
      //   subMenuIcon: <AiOutlineInteraction size={20} />,
      // },

      ...(baseUrl === "https://test.api.chatchefs.com/"
        ? [
            {
              subMenuName: "POS Integration",
              subMenuLink: "/pos-integration",
              subMenuIcon: <AiOutlineInteraction size={20} />,
            },
          ]
        : []),
    ],
  },
  {
    menuName: "Marketing",
    menuIcon: <BsImages size={20} />,
    subMenus: [
      {
        subMenuName: "Offers",
        subMenuLink: "/offers",
        subMenuIcon: <MdLocalOffer size={20} />,
      },
      {
        subMenuName: "Rewards",
        subMenuLink: "/rewards",
        subMenuIcon: <CiGift size={20} />,
      },
      {
        subMenuName: "Fission Campaigns",
        subMenuLink: "/fission-campaigns",
        subMenuIcon: <GiFission size={20} />,
      },
      {
        subMenuName: "Loyalty Redeem",
        subMenuLink: "/loyalty-redeem",
        subMenuIcon: <VscVmActive size={20} />,
      },
      // {
      //   subMenuName: "Retention Campaigns",
      //   subMenuLink: "/retention-campaigns",
      //   subMenuIcon: <TbPictureInPictureTop size={20} />,
      // },
      {
        subMenuName: "Activation Campaigns",
        subMenuLink: "/activations-campaigns",
        subMenuIcon: <VscVmActive size={20} />,
      },

      ...(baseUrl === "https://test.api.chatchefs.com/"
        ? [
            {
              subMenuName: "Ratings",
              subMenuLink: "/ratings",
              subMenuIcon: <BiCalendarStar size={20} />,
            },
          ]
        : []),

      {
        subMenuName: "Business Card",
        subMenuLink: "/businessCard",
        subMenuIcon: <FaRegIdCard size={20} />,
      },

      ...(baseUrl === "https://test.api.chatchefs.com/"
        ? [
            {
              subMenuName: "Google Publishing",
              subMenuLink: "/google-publishing",
              subMenuIcon: <SlSocialGoogle size={20} />,
            },
          ]
        : []),
      ...(baseUrl === "https://test.api.chatchefs.com/"
        ? [
            {
              subMenuName: "Social Posts",
              subMenuLink: "/social-posts",
              subMenuIcon: <IoShareSocialOutline size={20} />,
            },
          ]
        : []),
    ],
  },
  {
    menuName: "Earnings",
    menuIcon: <BsPeople size={20} />,
    subMenus: [
      {
        subMenuName: "Earnings",
        subMenuLink: "/earnings",
        subMenuIcon: <FaUserAlt size={20} />,
      },
    ],
  },
  {
    menuName: "Communication",
    menuIcon: <BsPeople size={20} />,
    subMenus: [
      {
        subMenuName: "Customer Profile",
        subMenuLink: "/customerProfile",
        subMenuIcon: <FaUserAlt size={20} />,
      },
      {
        subMenuName: "Email",
        subMenuLink: "/email",
        subMenuIcon: <AiOutlineMail size={20} />,
      },
      {
        subMenuName: "Customer Email",
        subMenuLink: "/customerEmail",
        subMenuIcon: <RiShieldUserLine size={20} />,
      },
      {
        subMenuName: "SMS",
        subMenuLink: "/sms",
        subMenuIcon: <MdOutlineSms size={20} />,
      },
      // {
      //   subMenuName: "Whatsapp",
      //   subMenuLink: "/whatsapp",
      //   subMenuIcon: <BsWhatsapp size={20} />,
      // },
      {
        subMenuName: "Invitation",
        subMenuLink: "/invitation",
        subMenuIcon: <AiOutlineDisconnect size={20} />,
      },
    ],
  },
  {
    menuName: "Review",
    menuIcon: <BsPeople size={20} />,
    subMenus: [
      {
        subMenuName: "Review Management",
        subMenuLink: "/review-management-remokitchen",
        subMenuIcon: <MdReviews size={20} />,
      },
      {
        subMenuName: "Review Auto reply and coupon",
        subMenuLink: "/review-auto-reply",
        subMenuIcon: <MdReviews size={20} />,
      },
    ],
  },
  {
    menuName: "Finance",
    menuIcon: <AiOutlineDollar size={20} />,
    subMenus: [
      {
        subMenuName: "Bank Setup",
        subMenuLink: "/bank-setup",
        subMenuIcon: <AiOutlineBank size={20} />,
      },

      ...(baseUrl === "https://test.api.chatchefs.com/"
        ? [
            // {
            //   subMenuName: "Payout Settings",
            //   subMenuLink: "/payout-settings",
            //   subMenuIcon: <RiWechatPayLine size={20} />,
            // },
          ]
        : []),

      ...(baseUrl === "https://test.api.chatchefs.com/"
        ? [
            {
              subMenuName: "Google Publishing",
              subMenuLink: "/google-publishing",
              subMenuIcon: <SlSocialGoogle size={20} />,
            },
          ]
        : []),
      ...(baseUrl === "https://test.api.chatchefs.com/"
        ? [
            {
              subMenuName: "Social Posts",
              subMenuLink: "/social-posts",
              subMenuIcon: <IoShareSocialOutline size={20} />,
            },
          ]
        : []),
    ],
  },

  {
    menuName: "Hotel Management",
    menuIcon: <MdOutlineBusinessCenter size={20} />,
    subMenus: [
      {
        subMenuName: "Users",
        subMenuLink: "/hotel-management/users",
        subMenuIcon: <FaUserAlt size={20} />,
      },
      {
        subMenuName: "Hotels",
        subMenuLink: "/hotel-management/hotels",
        subMenuIcon: <FaRegIdCard size={20} />,
      },
    ],
  },
  {
    menuName: "Earnings",
    menuIcon: <BsPeople size={20} />,
    subMenus: [
      {
        subMenuName: "Earnings",
        subMenuLink: "/earnings",
        subMenuIcon: <FaUserAlt size={20} />,
      },
    ],
  },
  {
    menuName: "Communication",
    menuIcon: <BsPeople size={20} />,
    subMenus: [
      {
        subMenuName: "Customer Profile",
        subMenuLink: "/customerProfile",
        subMenuIcon: <FaUserAlt size={20} />,
      },
      {
        subMenuName: "Email",
        subMenuLink: "/email",
        subMenuIcon: <AiOutlineMail size={20} />,
      },
      {
        subMenuName: "Customer Email",
        subMenuLink: "/customerEmail",
        subMenuIcon: <RiShieldUserLine size={20} />,
      },
      {
        subMenuName: "SMS",
        subMenuLink: "/sms",
        subMenuIcon: <MdOutlineSms size={20} />,
      },
      // {
      //   subMenuName: "Whatsapp",
      //   subMenuLink: "/whatsapp",
      //   subMenuIcon: <BsWhatsapp size={20} />,
      // },
      {
        subMenuName: "Invitation",
        subMenuLink: "/invitation",
        subMenuIcon: <AiOutlineDisconnect size={20} />,
      },
    ],
  },
  {
    menuName: "Finance",
    menuIcon: <AiOutlineDollar size={20} />,
    subMenus: [
      {
        subMenuName: "Bank Setup",
        subMenuLink: "/bank-setup",
        subMenuIcon: <AiOutlineBank size={20} />,
      },

      ...(baseUrl === "https://test.api.chatchefs.com/"
        ? [
            {
              subMenuName: "Taxes",
              subMenuLink: "/taxes",
              subMenuIcon: <TbReceiptTax size={20} />,
            },
          ]
        : []),

      ...(baseUrl === "https://test.api.chatchefs.com/"
        ? [
            {
              subMenuName: "Reconciliation",
              subMenuLink: "/reconciliation",
              subMenuIcon: <AiOutlineReconciliation size={20} />,
            },
          ]
        : []),
    ],
  },
  {
    menuName: "Analytics",
    menuIcon: <AiOutlineFileSearch size={20} />,
    subMenus: [
      {
        subMenuName: "Traffic Analytics",
        subMenuLink: "/traffic-analytics",
        subMenuIcon: <MdOutlineBusinessCenter size={20} />,
      },
      ...(baseUrl === "https://test.api.chatchefs.com/"
        ? [
            {
              subMenuName: "Retention Analytics",
              subMenuLink: "/retention-analytics",
              subMenuIcon: <IoAnalyticsSharp size={20} />,
            },
          ]
        : []),

      ...(baseUrl === "https://test.api.chatchefs.com/"
        ? [
            {
              subMenuName: "Ratings",
              subMenuLink: "/ratings",
              subMenuIcon: <MdOutlineBusinessCenter size={20} />,
            },
          ]
        : []),

      ...(baseUrl === "https://test.api.chatchefs.com/"
        ? [
            {
              subMenuName: "Operation",
              subMenuLink: "/operation",
              subMenuIcon: <MdOutlineGraphicEq size={20} />,
            },
          ]
        : []),

      ...(baseUrl === "https://test.api.chatchefs.com/"
        ? [
            {
              subMenuName: "Menu",
              subMenuLink: "/menu",
              subMenuIcon: <BiFoodMenu size={20} />,
            },
          ]
        : []),

      ...(baseUrl === "https://test.api.chatchefs.com/"
        ? [
            {
              subMenuName: "Marketing",
              subMenuLink: "/marketing",
              subMenuIcon: <VscGraphLine size={20} />,
            },
          ]
        : []),

      ...(baseUrl === "https://test.api.chatchefs.com/"
        ? [
            {
              subMenuName: "Customers (RFM)",
              subMenuLink: "/customers-rfm",
              subMenuIcon: <IoIosPeople size={20} />,
            },
          ]
        : []),
      {
        subMenuName: "Do Customization",
        subMenuLink: "/do-customization",
        subMenuIcon: <RiMenuAddLine size={20} />,
      },
      {
        subMenuName: "Restaurant Phone Management",
        subMenuLink: "/phone-management",
        subMenuIcon: <FaPhoneAlt size={20} />,
      },

      ...(baseUrl === "https://test.api.chatchefs.com/"
        ? [
            {
              subMenuName: "Reports",
              subMenuLink: "/reports",
              subMenuIcon: <TbReportAnalytics size={20} />,
            },
          ]
        : []),
    ],
  },
  {
    menuName: "Group Ordering",
    menuIcon: <GrGroup size={20} />,
    subMenus: [
      {
        subMenuName: "Group Ordering",
        subMenuLink: "/group-ordering",
        subMenuIcon: <GrGroup size={20} />,
      },
    ],
  },
];
