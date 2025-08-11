import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById, createOrder } from '../services/apiService';
import { useAuth } from '../contexts/AuthContext';

const ProductDetailsPage = () => {
    const { productId } = useParams();
    const { isAuthenticated } = useAuth();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await getProductById(productId);
                setProduct(response.data);
            } catch (err) {
                setError('Failed to fetch product details.');
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [productId]);

    if (loading) return <div className="text-center p-10">Loading...</div>;
    if (error) return <div className="text-center p-10 text-red-500">{error}</div>;
    if (!product) return <div className="text-center p-10">Product not found.</div>;

    // ... inside the ProductDetailsPage component, before the return statement

    const handleRentRequest = async () => {
        if (!startDate || !endDate) {
            alert("Please select both a start and end date.");
            return;
        }

        // Basic date validation
        if (new Date(startDate) >= new Date(endDate)) {
            alert("End date must be after the start date.");
            return;
        }

        const orderData = {
            product_id: product.ProductID,
            start_date: startDate,
            end_date: endDate,
            // The backend will calculate the total amount based on price rules
        };

        try {
            // You will need to add `createOrder` to your apiService
            // and a corresponding endpoint in your FastAPI backend.
            const response = await createOrder(orderData); 
            alert(`Quote created successfully! Your order ID is ${response.data.OrderID}. You will be contacted shortly.`);
            // Optionally, redirect to the dashboard
            // navigate('/dashboard');
        } catch (err) {
            alert("Failed to create rental order. The item may not be available for the selected dates.");
            console.error(err);
        }
    };
    return (
        <div className="container mx-auto p-4">
            <div className="bg-white shadow-xl rounded-lg overflow-hidden md:flex">
                <div className="md:w-1/2">
                    <img
                        className="h-64 w-full object-cover md:h-full"
                        src={product.imageUrl || 'https://via.placeholder.com/800x600.png?text=No+Image'}
                        alt={product.ProductName}
                    />
                </div>
                <div className="p-8 md:w-1/2">
                    <h1 className="text-3xl font-bold text-gray-800">{product.ProductName}</h1>
                    <p className="mt-4 text-gray-600">{product.ProductDescription}</p>
                    
                    <div className="mt-6">
                        <span className="text-sm font-semibold text-gray-500">Available Stock</span>
                        <p className="text-2xl font-bold text-green-600">{product.AvailableStock}</p>
                    </div>

                    <div className="mt-8">
                        <h3 className="text-lg font-semibold text-gray-700">Create a Rental Quote</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <div>
                                <label htmlFor="start-date" className="block text-sm font-medium text-gray-700">Start Date</label>
                                <input type="date" id="start-date" value={startDate} onChange={e => setStartDate(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"/>
                            </div>
                            <div>
                                <label htmlFor="end-date" className="block text-sm font-medium text-gray-700">End Date</label>
                                <input type="date" id="end-date" value={endDate} onChange={e => setEndDate(e.target.value)} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"/>
                            </div>
                        </div>
                    </div>
                    
                    <div className="mt-8">
                        {isAuthenticated ? (
                            <button 
                                onClick={handleRentRequest}
                                className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300"
                            >
                                Request Quote & Rent
                            </button>
                        ) : (
                            <div className="text-center p-4 border-2 border-dashed rounded-lg">
                                <p className="text-gray-700">You must be logged in to rent this item.</p>
                                <Link to="/login" className="font-bold text-blue-600 hover:underline">
                                    Login or Register
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetailsPage;