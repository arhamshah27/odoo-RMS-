import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  // A placeholder image if your product data doesn't include one
  const placeholderImage = 'https://via.placeholder.com/400x300.png?text=No+Image';

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-1 transition-all duration-300">
      <Link to={`/products/${product.ProductID}`}>
        <img 
          className="w-full h-48 object-cover" 
          src={product.imageUrl || placeholderImage} 
          alt={product.ProductName} 
        />
      </Link>
      <div className="p-4 flex flex-col justify-between h-40">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 truncate">
            {product.ProductName}
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            Available: <span className="font-medium text-green-600">{product.AvailableStock}</span>
          </p>
        </div>
        <div className="mt-4 flex justify-between items-center">
            {/* Logic for price would go here, fetching from PriceRules */}
           <p className="text-xl font-bold text-gray-900">₹...<span className="text-sm font-normal">/{product.RentalUnit}</span></p>
           <Link 
            to={`/products/${product.ProductID}`}
            className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
           >
             Details
           </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;