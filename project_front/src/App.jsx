import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import CategoriesTable from "./components/CategoriesTable";
import ProductsTable from "./components/ProductsTable";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/categories" element={<CategoriesTable />} />
        <Route path="/products" element={<ProductsTable />} />
      </Routes>
    </Router>
  );
};

export default App;
