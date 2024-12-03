# EthioChicken ERP Demo Web Application

This is a README file for a standard MERN stack web application to simulate the business workflow for EthioChicken ERP.

## Description

This application provides a platform for users(agents) to browse, purchase, and manage products online.  Users can create accounts, add items to their carts, proceed to checkout, and view their order history.  Administrators have access to manage products, orders, and users.
## Demo
1.  **Home page:**
![image](https://github.com/user-attachments/assets/b5ac1c4f-ce3e-4412-91f4-8077c347486d)
2.  **Products page:**
![image](https://github.com/user-attachments/assets/979c30d2-7544-4662-9687-0978ea88242c)
3.   **Dashboard:**
![image](https://github.com/user-attachments/assets/4918e44b-7552-4803-844f-c448fcf7aff4)
4.   **Product Details:**
![image](https://github.com/user-attachments/assets/99137e43-cdd6-4b98-98a2-72f531bd51d0)

## Technologies

* **Frontend:** React, Redux, JavaScript, HTML, CSS
* **Backend:** Node.js, Express.js, MongoDB
* **Database:** MongoDB

## VS Code Setup

### Backend Setup

1.  **Clone the repository:**
```
git clone https://github.com/TeddyMeg/EthioChicken-ERP  
```
2.  **Navigate to the project directory for front-end:**
```
cd backend 
```
3.  **Install dependencies:**
```
npm install   
```
4.  **Set up environment variables (see below).**
5.  **Start the development server:**
```
npm run server  
```
**The server runs at: http://localhost:5000/**

**But you need to update BASE_URL in ./frontend/services/api.ts to http://localhost:5000/ when running on VSCODE**

### Frontend Setup

1.  **Clone the repository:**
```
git clone https://github.com/TeddyMeg/EthioChicken-ERP   
```
2.  **Navigate to the project directory for front-end:**
```
cd frontend   
```
3.  **Install dependencies:**
```
npm install 
```
4.  **Set up environment variables (see below).**
5.  **Start the development server:**
```
npm run dev  
```
**The server runs at:  http://localhost:5173/**

## Environment Variables

*   **MONGODB_URI:**  MongoDB connection string.
*   **PORT:** Port number for the backend server (default: 5000).
*   **JWT_SECRET:** Secret key for JSON Web Tokens (JWT).  **Generate a strong secret key.**


## Project Directory Structure
```
ethiochicken-app/
├── frontend/             # Frontend (React)
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── ...
│   └── ...
├── backend/             # Backend (Node.js, Express.js)
│   ├── routes/
│   ├── models/
│   ├── controllers/
│   ├── middleware/
│   └── ...
├── .env                # Environment variables
└── ...
```
## API Documentation

**Base URL:** `/api`

**Authentication:** JWT required for protected routes.

**Users:**

*   **POST /users/register** Register a new user.
*   **POST /users/login** Log in an existing user.
*   **GET /users/profile** Get the current user's profile (protected).
*   **PUT /users/profile** Update an existing user (protected).

**Products:**

*   **GET /products** Get all products.
*   **POST /products** Create a new product (protected).
*   **GET /products/:id** Get a single product by ID.
*   **PUT products/:id** Update an existing product (status, etc.) (protected).
*   **DELETE products/:id** Delete a product (protected).

**Cart:**

*   **POST /cart/** Add a product to the cart (protected).
*   **GET /cart/:productId** Get the current user's cart (protected).
*   **DELETE /cart/:productId** Remove a product from the cart (protected). and more

**Orders:**
*   **GET /orders** Get all orders. (protected).
*   **POST /orders** Create a new order (protected).
*   **GET /orders:id** Get the current user's orders (protected).
*   **PUT /orders:id** Update an existing order (status, etc.) (protected).
*   **DELETE /orders:id** Delete an order (protected). and more


## Contributing

1.  Fork the repository.
2.  Create a new branch for your feature.
3.  Commit your changes.
4.  Push to the branch.
5.  Create a pull request.

## Future Work

*   **Return Orders:** Implement functionality for users to return orders.
*   **Shipments:** Integrate with a shipping API to track shipments.
*   **Reviews:** Allow users to leave product reviews.
