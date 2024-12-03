import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Menu, ChevronDown, LogOut, User, Heart, ShoppingBag, Package } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { user, logout, isAuthenticated, isAdmin } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img
                src="https://images.squarespace-cdn.com/content/v1/6532265431cb2861a8deb911/cf3a9b68-84fd-465f-a7d8-4394c6183f04/EC_Logo_PNG-01.png"
                alt="EthioChicken Logo"
                className="h-16 w-auto" // Increased logo size
              />
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <Link to="/products" className="text-red-600 hover:text-red-700 font-medium">Products</Link>
            {isAuthenticated && (
              <>
                {isAdmin ? (
                  <>
                    <Link to="/dashboard" className="text-red-600 hover:text-red-700 font-medium">Dashboard</Link>
                    <Link to="/manage-products" className="text-red-600 hover:text-red-700 font-medium">Manage Products</Link>
                    <Link to="/manage-orders" className="text-red-600 hover:text-red-700 font-medium">Manage Orders</Link>
                  </>
                ) : (
                  <>
                    <Link to="/orders" className="text-red-600 hover:text-red-700 font-medium">Orders</Link>
                    <Link to="/collections" className="text-red-600 hover:text-red-700 font-medium">
                      <div className="flex items-center">
                        <Heart size={18} className="mr-1" />
                        Collections
                      </div>
                    </Link>
                    <Link to="/cart" className="text-red-600 hover:text-red-700 font-medium">
                      <div className="flex items-center">
                        <ShoppingBag size={18} className="mr-1" />
                        Cart
                      </div>
                    </Link>
                  </>
                )}
              </>
            )}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-red-600 bg-gray-100 px-4 py-2 rounded-full"
                >
                  <User size={20} />
                  <span>{user?.name}</span>
                  <ChevronDown size={16} />
                </button>
                <AnimatePresence>
                  {showProfileMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1"
                    >
                      <Link
                        to="/profile"
                        className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        <User size={16} className="mr-2" />
                        Profile
                      </Link>
                      <button
                        onClick={logout}
                        className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 w-full"
                      >
                        <LogOut size={16} className="mr-2" />
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="space-x-4">
                <Link
                  to="/login"
                  className="text-red-600 hover:text-red-700 font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-yellow-400 text-gray-900 px-6 py-2 rounded-full hover:bg-yellow-500 transition-colors font-medium"
                >
                  Register
                </Link>
              </div>
            )}
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-red-600"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden py-4"
            >
              <div className="flex flex-col space-y-4">
                <Link to="/products" className="text-red-600 hover:text-red-700">Products</Link>
                {isAuthenticated && (
                  <>
                    {isAdmin ? (
                      <>
                        <Link to="/dashboard" className="text-red-600 hover:text-red-700">Dashboard</Link>
                        <Link to="/manage-products" className="text-red-600 hover:text-red-700">Manage Products</Link>
                        <Link to="/manage-orders" className="text-red-600 hover:text-red-700">Manage Orders</Link>
                      </>
                    ) : (
                      <>
                        <Link to="/orders" className="text-red-600 hover:text-red-700">Orders</Link>
                        <Link to="/collections" className="text-red-600 hover:text-red-700">Collections</Link>
                        <Link to="/cart" className="text-red-600 hover:text-red-700">Cart</Link>
                      </>
                    )}
                    <Link to="/profile" className="text-red-600 hover:text-red-700">Profile</Link>
                    <button
                      onClick={logout}
                      className="text-red-600 hover:text-red-700 text-left"
                    >
                      Logout
                    </button>
                  </>
                )}
                {!isAuthenticated && (
                  <>
                    <Link to="/login" className="text-red-600 hover:text-red-700">Login</Link>
                    <Link to="/register" className="text-red-600 hover:text-red-700">Register</Link>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;