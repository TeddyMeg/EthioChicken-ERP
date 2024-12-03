import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import RoleSelection from './pages/auth/RoleSelection';
import AdminRegister from './pages/auth/AdminRegister';
import Products from './pages/products/Products';
import ProductDetails from './pages/products/ProductDetails';
import Dashboard from './pages/dashboard/Dashboard';
import ManageProducts from './pages/admin/ManageProducts';
import ManageOrders from './pages/admin/ManageOrders';
import ManageReturns from './pages/admin/ManageReturns';
import Orders from './pages/orders/Orders';
import Cart from './pages/cart/Cart';
import Collections from './pages/collections/Collections';
import PrivateRoute from './components/auth/PrivateRoute';
import { AuthProvider } from './context/AuthContext';
import Footer from './components/layout/Footer';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<RoleSelection />} />
              <Route path="/register/agent" element={<Register />} />
              <Route path="/register/admin" element={<AdminRegister />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:id" element={<ProductDetails />} />
              <Route path="/dashboard" element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              } />
              <Route path="/manage-products" element={
                <PrivateRoute>
                  <ManageProducts />
                </PrivateRoute>
              } />
              <Route path="/manage-orders" element={
                <PrivateRoute>
                  <ManageOrders />
                </PrivateRoute>
              } />
              <Route path="/manage-returns" element={
                <PrivateRoute>
                  <ManageReturns />
                </PrivateRoute>
              } />
              <Route path="/orders" element={
                <PrivateRoute>
                  <Orders />
                </PrivateRoute>
              } />
              <Route path="/cart" element={
                <PrivateRoute>
                  <Cart />
                </PrivateRoute>
              } />
              <Route path="/collections" element={
                <PrivateRoute>
                  <Collections />
                </PrivateRoute>
              } />
            </Routes>
          </main>
          <ToastContainer position="top-right" autoClose={3000} />
          <Footer/>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;