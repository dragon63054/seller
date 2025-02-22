import React, { useState, useEffect } from 'react';
import { Search, User } from 'lucide-react'; 
import ProductCard from './productCard';
import ProductForm from './productForm';
import Modal from './modal';
import productData from './product.json';

const MainPage = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    console.log(productData);
    setProducts(productData);
  }, []);

  const handleAddProduct = (product) => {
    if (editingProduct) {
      setProducts((prev) =>
        prev.map((p) => (p.product_id === product.product_id ? product : p))
      );
    } else {
      setProducts((prev) => [...prev, { ...product, product_id: Date.now() }]);
    }
    setIsModalOpen(false);
    setEditingProduct(null); 
  };

  const handleEditProduct = (product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleDeleteProduct = (id) => {
    setProducts((prev) => prev.filter((product) => product.product_id !== id));
  };

  const filteredProducts = products.filter(product =>
    product.Name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-4 h-screen">
      <div className="flex gap-4 md:flex-row justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">My Store</h1>
        <div className="relative w-full md:w-1/3 mt-4 md:mt-0">
          <input
            type="text"
            placeholder="Search Products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 p-2 rounded w-full pl-10 focus:outline-none focus:ring-2 focus:ring-gray-500"
          />
          <Search className="absolute left-3 top-2.5 text-gray-500" />
        </div>
        <button className="bg-gray-800 text-white rounded-full p-2 hover:bg-gray-700 mt-4 md:mt-0">
          <User  className="h-6 w-6" />
        </button>
      </div>
      <div className='flex flex-col md:flex-row justify-between'>
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Swetha's Seller</h2>
        <button
          onClick={() => {
            setEditingProduct(null);
            setIsModalOpen(true);
          }}
          className="bg-gray-800 text-white py-2 px-4 rounded hover:bg-gray-700 mb-4 md:mb-0"
        >
          Add Product
        </button>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ProductForm product={editingProduct} onSave={handleAddProduct} onCancel={() => setIsModalOpen(false)} />
      </Modal>
      {!isModalOpen && (
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 mt-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.product_id} product={product} onEdit={handleEditProduct} onDelete={handleDeleteProduct} />
          ))}
        </div>
      )}
    </div>
  );
};

export default MainPage;
