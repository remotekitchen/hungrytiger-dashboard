# Project Name

Chatchef

## Description

Chatchef is a comprehensive web application designed to streamline the order management process for restaurants. It offers an efficient and user-friendly platform for restaurant owners to handle their menus, items, categories, and overall restaurant operations seamlessly. The application provides robust authentication and role-based authorization, enabling merchants to create accounts and access a personalized dashboard to manage their restaurant activities effectively.

Chatchef empowers restaurant owners to create and customize menus according to their unique offerings. Each menu can be further organized into multiple categories, allowing for easy navigation and efficient management. Additionally, restaurants have the flexibility to create multiple menus, providing versatility in presenting their dishes.

With Chatchef, merchants can efficiently handle incoming orders through a feature called "Chatchef Direct Order." Once a user places an order, the merchant can promptly view and manage the orders within the system. The dashboard provides convenient filtering options to sort orders based on different criteria, such as order status, date, or customer information. This simplifies order management and enhances customer satisfaction through prompt processing and delivery.

## Live Site

Visit the live site at [https://chatchefs.com/](https://chatchefs.com/).

## Folder Structure

The project follows the following folder structure:

```
chatchef/
  ├── src/
  │   ├── assets/
  │   ├── Components/
  │   │   ├── Header/
  │   │   ├── Footer/
  │   │   ├── PrivateRoute/
  │   ├── hooks/
  │   ├── pages/
  │   │   ├── Homepage/
  │   │   ├── Dashboard/
  │   ├── redux/
  │   │   ├── store.js
  │   │   ├── features/
  │   │   │   ├── auth/
  │   │   │   ├── restaurant/
  │   │   │   ├── menu/
  │   │   │   ├── category/
  │   │   │   ├── item/
  │   ├── App.jsx
  │   ├── App.css
  │   ├── main.jsx
  │   ├── index.css
  │   ├── router.jsx
  ├── package.json
  ├── yarn.lock
  ├── README.md
```

## Dependencies

The project utilizes the following dependencies managed via Yarn:

- React
- Vite
- Redux
- Tailwind CSS
- DaisyUI (a Tailwind CSS plugin)
- react-router-dom (for routing)
- react-icons (for icons)
- react-hot-toast (for toast notifications)

## Installation

To install and set up the project locally, follow these steps:

```bash
# Clone the repository
git clone <repository_url>

# Navigate to the project folder
cd chatchef

# Install dependencies using yarn
yarn install
```

## Usage

To start the development server and access the application in the browser:

```bash
# Start the development server
yarn dev
```

Open your browser and navigate to `http://localhost:3000` to access the Chatchef application.

## Features

- Robust authentication system with signup and signin functionality.
- Role-based authorization for merchants to access their personalized dashboard.
- Intuitive dashboard with various functionalities:
  - Creation and management of menus, items, categories, and restaurants.
  - Efficient order handling through "Chatchef Direct Order."
  - Filtering and searching orders based on criteria such as order status and date.

## License

This project is licensed under the [Remote Kitchen](LICENSE).

## Contact

For any questions or feedback, you can reach out to us at [bd@remokitchen.com](mailto:bd@remokitchen.com).
