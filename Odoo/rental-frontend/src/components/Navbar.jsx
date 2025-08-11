import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // Import the useAuth hook

const Navbar = () => {
    const { isAuthenticated, user, logout } = useAuth(); // Get auth state and functions
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/'); // Redirect to home page after logout
    };

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-6 py-3 flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold text-gray-800 hover:text-blue-600">
                    Rentify 🚀
                </Link>
                <div className="hidden md:flex items-center space-x-6">
                    <Link to="/" className="text-gray-600 hover:text-blue-500">Home</Link>
                    <Link to="/products" className="text-gray-600 hover:text-blue-500">Products</Link>
                    {isAuthenticated && (
                         <Link to="/dashboard" className="text-gray-600 hover:text-blue-500">Dashboard</Link>
                    )}
                </div>
                <div className="flex items-center space-x-3">
                    {isAuthenticated ? (
                        <>
                            <span className="text-gray-700 hidden sm:block">Welcome, {user?.FirstName}!</span>
                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
                                Login
                            </Link>
                            <Link to="/register" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
                                Sign Up
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;