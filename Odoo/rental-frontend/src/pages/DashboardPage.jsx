import React from 'react';
import { useAuth } from '../contexts/AuthContext';

const DashboardPage = () => {
    const { user, logout } = useAuth();

    if (!user) {
        return <div>Loading user data...</div>;
    }

    return (
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome, {user.FirstName}!</h1>
            <p className="text-gray-600 mb-6">This is your personal dashboard. Here you can track your rentals and manage your account.</p>
            
            <div className="border-t pt-6">
                <h2 className="text-xl font-semibold mb-4">Your Active Rentals</h2>
                {/* In a real app, you would fetch and map over the user's rental orders here */}
                <div className="text-center py-10 border-2 border-dashed rounded-lg">
                    <p className="text-gray-500">You have no active rentals at the moment.</p>
                </div>
            </div>

            <div className="mt-8">
                <button 
                    onClick={logout} 
                    className="w-full md:w-auto bg-red-600 text-white font-bold py-2 px-4 rounded-md hover:bg-red-700 transition duration-300">
                    Log Out
                </button>
            </div>
        </div>
    );
};

export default DashboardPage;