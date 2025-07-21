const pickupData = [
  {
    id: 1,
    received_time: "00:00 AM",
    received_date: "2021-01-01",
    delivery_time: "00:00 AM",
    delivery_date: "2021-01-01",
    customer_name: "John Doe",
    contact_number: "1234567890",
    order_type: "Pickup",
    oder_staus: "Pending",
    order_id: "123456",
    subtotal: "CA$100",
    payout: "CA$400",
    preparing: "Leo Name Example 1",
    ETA: "-1 min",
    Tag: "#2FG018"
  },
  {
    id: 2,
    received_time: "00:00 PM",
    received_date: "2021-01-01",
    delivery_time: "00:00 PM",
    delivery_date: "2021-01-01",
    customer_name: "John toe",
    contact_number: "23467890",
    order_type: "Delivery",
    oder_staus: "Active",
    order_id: "1234564334",
    subtotal: "CA$200",
    payout: "CA$100.34",
    preparing: "Leo Name Example 2",
    ETA: "1 min",
    Tag: "#2FG019"
  },
  {
    id: 3,
    received_time: "00:00 AM",
    received_date: "2021-01-01",
    delivery_time: "00:00 AM",
    delivery_date: "2021-01-01",
    customer_name: "boc joe",
    contact_number: "7890",
    order_type: "Pickup",
    oder_staus: "Completed",
    order_id: "123456",
    subtotal: "CA$300",
    payout: "CA$500.54",
    preparing: "Leo Name Example 3",
    ETA: "2 min",
    Tag: "#2FG020"
  }
]

const payoutData = [
  {
    location: 'New York',
    payoutMethod: 'Bank Transfer',
    status: 'Active',
    paymentFrequency: 'Monthly',
  },
  {
    location: 'Los Angeles',
    payoutMethod: 'PayPal',
    status: 'Inactive',
    paymentFrequency: 'Weekly',
  },
  // Add more data rows as needed
];

const payoutActivityData = [
  {
    title: 'Total Payout',
    amount: '$456.03',
  },
  {
    title: 'Customers',
    amount: '16'
  },
  {
    title: 'Orders',
    amount: '17'
  },
  {
    title: 'Customer Refunds',
    amount: '$0.00'
  }
]
const itemsData = [
  {
    itemName: 'Item 1',
    description: 'Description 1',
    menus: 'Menu 1',
    categories: 'Category 1',
    price: '$1.00',
  },
  {
    itemName: 'Item 2',
    description: 'Description 2',
    menus: 'Menu 2',
    categories: 'Category 2',
    price: '$2.00',
  }
]

const categoriesData = [
  {
    categoryName: 'Category 1',
    menus: 'Menu 1',
    items: 'Item 1',
  },
  {
    categoryName: 'Category 2',
    menus: 'Menu 2',
    items: 'Item 2',
  }
]
const restaurentsData = [
  {
    restaurentsName: 'Restaurent 1',
    locationName: 'Location 1',
    menus: 'Menu 1',
    categories: 'Category 1',
    items: 'Item 1',
  },
  {
    restaurentsName: 'Restaurent 2',
    locationName: 'Location 2',
    menus: 'Menu 2',
    categories: 'Category 2',
    items: 'Item 2',
  }
]

const overviewData = [
  {
    title: 'Main Menu',
    name: 'Location Name',
    time: 'Mon- Friday 10:00AM - 10:00PM',
    restaurentsName: 'Restaurent 1',
    locationName: 'Location 1',
    numberOfCategories: '2',
    numberOfItems: '2',
  },
  {
    title: 'Lunch Menu',
    name: 'Location Name',
    time: 'Mon- Friday 10:00AM - 10:00PM',
    restaurentsName: 'Restaurent 2',
    locationName: 'Location 2',
    numberOfCategories: '2',
    numberOfItems: '2',
  },
  {
    title: 'Dinner Menu',
    name: 'Location Name',
    time: 'Mon- Friday 10:00AM - 10:00PM',
    restaurentsName: 'Restaurent 3',
    locationName: 'Location 3',
    numberOfCategories: '2',
    numberOfItems: '2',
  }
]

const cardData = [
  {
      title: 'Template Name 1',
      imageUrl: 'https://via.placeholder.com/300',
      buttonText: 'Use This Template',
      view: 'Preview',
  },
  {
      title: 'Template Name 2',
      imageUrl: 'https://via.placeholder.com/300',
      buttonText: 'Already In Use',
      view: 'Preview',
  },
  {
      title: 'Template Name 3',
      imageUrl: 'https://via.placeholder.com/300',
      buttonText: 'Use This Template',
      view: 'Preview',
  },
];
const availabilityData = [
  {
    itemName: 'Item 1',
    category: 'Category 1',
    price: '$1.00',
    availability: 'Available',
  },
  {
    itemName: 'Item 2',
    category: 'Category 2',
    price: '$2.00',
    availability: 'Unavailable',
  },
  {
    itemName: 'Item 3',
    category: 'Category 3',
    price: '$3.00',
    availability: 'Available',
  },
]


export {
  pickupData,
  payoutData,
  payoutActivityData,
  itemsData,
  categoriesData,
  restaurentsData,
  overviewData,
  cardData,
  availabilityData
}