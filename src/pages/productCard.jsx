import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product, onEdit, onDelete }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();

  if (!product) {
    return null; 
  }

  const handleShowDetails = () => {
    navigate(`/product-details/${product.product_id}`);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 w-[300px] relative z-10">
      <img 
        src={product.Image} 
        alt={product.Name || 'Product Image'} 
        className="w-full h-72 object-cover" 
        onError={(e) => { e.target.onerror = null; e.target.src = 'path/to/default/image.jpg'; }} 
        onClick={handleShowDetails}
      />
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-800">{product.Name}</h2>
        <p className="text-lg font-semibold text-green-700"><span className='font-bold'>Price :</span>₹{product.Price}</p>
        <p className="text-gray-700 overflow-hidden whitespace-nowrap text-ellipsis">{product.Description}</p>
        <p className="text-gray-600"><span className='font-bold text-black text-xl'>Stock: </span> <span>{product.Stock}</span></p>
        
        <div className="mt-4 flex justify-between">
          <button 
            onClick={() => onEdit(product)} 
            className="bg-gray-300 text-gray-800 py-2 px-4 rounded hover:bg-gray-400 transition duration-200"
          >
            Edit
          </button>
          <button 
            onClick={() => onDelete(product.product_id)} 
            className="bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-700 transition duration-200"
          >
            Delete
          </button>
        </div>

        <div 
          className="mt-2 flex items-center cursor-pointer relative" 
          onClick={handleShowDetails}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <span className="text-gray-600 underline">Show Details</span>
          <span className="ml-2 transform transition-transform">➤</span>

          {isHovered && (
            <div className="absolute left-16  bottom-2 bg-white border border-gray-300 p-2 rounded shadow-lg z-50 mt-1">
              <p className="text-gray-700">{product.Description}</p>
            </div>
          )}
        </div>

        {isExpanded && (
          <div className="mt-4">
            <img 
              src={product.Image} 
              alt={product.Name || 'Product Image'} 
              className="w-full h-72 object-cover mb-2" 
            />
            <p className="text-gray-700">{product.Description}</p>
            <p className="text-gray-600">Stock: {product.Stock}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;