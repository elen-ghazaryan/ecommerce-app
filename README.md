# E-commerce Application

A complete e-commerce application with a **React frontend** and **Node.js/Express backend**.  
Supports product browsing, product details, shopping cart management, checkout,  order history and error boundary.

---


## 🚀 Features

### Core Functionality
- View all products
- Filter products by category
- View product details
- Add products to cart
- Modify cart quantities
- Remove items from cart
- See cart total
- Place orders
- View order history


## Setup & Installation

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/ecommerce-app.git
cd ecommerce-app

### 2. Install dependencies
```backend
cd server
npm install

```frontend
cd client
npm install


---

## 📂 Project Structure

ecommerce-app/
│
├── server/ # Backend
│ ├── controllers/ # API logic
│ ├── data/ # Data models / JSON files
│ ├── routes/ # Express routes
│ └── index.js # Entry point
│
├── client/ # Frontend
│ ├── src/
│ │ ├── components/ # UI components 
│ │ ├── styles/ # Styling for component
│ │ ├── App.jsx
│ │ └── main.jsx
│ └── public/
│
└── README.md


---

## 📌 Backend API Documentation

### Products
| Method |             Endpoint               | Description |
|--------|------------------------------------|-------------|
| GET    | `/api/products`                    | Get all products 
| GET    | `/api/products/:id`                | Get product by ID 
| GET    | `/api/products/category/:category` | Get products by category 

### Cart

Method | 	   Endpoint                      |	Description |
|------|-------------------------------------|--------------|
GET	   | /api/cart/:userId	                 | Retrieve user’s cart
POST   | /api/cart/:userId/add	             | Add item to cart
PUT	   | /api/cart/:userId/update	         | Update item quantity
DELETE | /api/cart/:userId/remove/:productId |	Remove item from cart
DELETE | /api/cart/:userId/clear	         | Clear entire cart


### Orders
Method |    	Endpoint	   Description
|------|---------------------|-------------|
POST   | /api/orders	     | Create new order
GET	   | /api/orders/:userId | Retrieve user’s order history