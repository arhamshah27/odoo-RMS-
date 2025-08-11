import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <div>
            {/* Hero Section */}
            <div className="relative text-center bg-gray-800 text-white py-20 px-6 rounded-lg shadow-2xl overflow-hidden">
                <div className="absolute inset-0">
                    <img src="https://images.unsplash.com/photo-1593349480504-80351a44a7d0?q=80&w=2070" alt="Background Tools" className="w-full h-full object-cover opacity-30" />
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-transparent"></div>
                </div>
                <div className="relative z-10">
                    <h1 className="text-5xl font-extrabold tracking-tight">
                        Rent Anything, Anytime
                    </h1>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-300">
                        From professional cameras to heavy-duty tools, find exactly what you need for your next project. High-quality equipment at your fingertips.
                    </p>
                    <Link
                        to="/products"
                        className="mt-8 inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-lg transition duration-300 transform hover:scale-105"
                    >
                        Browse All Products
                    </Link>
                </div>
            </div>

            {/* Features Section */}
            <div className="py-16">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">How It Works</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
                    <div className="p-6">
                        <div className="text-5xl mb-4">🔍</div>
                        <h3 className="text-xl font-semibold mb-2">1. Find Your Item</h3>
                        <p className="text-gray-600">Browse our extensive catalog to find the perfect item for your needs.</p>
                    </div>
                    <div className="p-6">
                        <div className="text-5xl mb-4">📅</div>
                        <h3 className="text-xl font-semibold mb-2">2. Book Your Dates</h3>
                        <p className="text-gray-600">Select your rental period and confirm availability in just a few clicks.</p>
                    </div>
                    <div className="p-6">
                        <div className="text-5xl mb-4">🚚</div>
                        <h3 className="text-xl font-semibold mb-2">3. Pick Up & Go</h3>
                        <p className="text-gray-600">Pick up your item from our convenient location and start your project!</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;