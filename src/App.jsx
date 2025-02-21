import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductForm from './pages/productForm';
import MainPage from './pages/main_page'; 

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} /> 
        <Route path="/product-form" element={<ProductForm />} />
      </Routes>
    </Router>
  );
};

export default App;