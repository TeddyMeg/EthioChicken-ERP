# Ethichicken ERP Web Application

This is a professional README file for a standard MERN stack web application for Ethichicken ERP.

## Description

This application provides a platform for users(agents) to browse, purchase, and manage products online.  Users can create accounts, add items to their carts, proceed to checkout, and view their order history.  Administrators have access to manage products, orders, and users.

## Technologies

* **Frontend:** React, Redux, JavaScript, HTML, CSS
* **Backend:** Node.js, Express.js, MongoDB
* **Database:** MongoDB

## VS Code Setup

### Backend Setup

1.  **Clone the repository:**
```
bash
    git clone https://github.com/TeddyMeg/EthioChicken-ERP
    
```
2.  **Navigate to the project directory for front-end:**
```
bash
    cd backend
    
```
3.  **Install dependencies:**
```
bash
    npm install
    
```
4.  **Set up environment variables (see below).**
5.  **Start the development server:**
```
bash
    npm run server
    
```
**The server runs at: http://localhost:5000/**

### Frontend Setup

1.  **Clone the repository:**
```
bash
    git clone https://github.com/TeddyMeg/EthioChicken-ERP
    
```
2.  **Navigate to the project directory for front-end:**
```
bash
    cd frontend
    
```
3.  **Install dependencies:**
```
bash
    npm install
    
```
4.  **Set up environment variables (see below).**
5.  **Start the development server:**
```
bash
    npm run dev
    
```
**The server runs at:  http://localhost:5173/**

## Environment Variables

*   **MONGODB_URI:**  MongoDB connection string (e.g., `mongodb+srv://admin:admin@cluster0.avwxy.mongodb.net/ethiochicken?retryWrites=true&w=majority&appName=Cluster0`).
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