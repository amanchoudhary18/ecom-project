import React, { useState } from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Products from "./pages/Products";
import PDP from "./pages/PDP";
import { ToastContainer } from "react-toastify";
import FilterContext from "./context/FilterContext";

const ProductRouter = () => {
  const [filterState, setFilterState] = useState({
    categoryId: "",
    gender: [],
    priceRange: {},
    keyword: "",
  });

  return (
    <FilterContext.Provider value={{ filterState, setFilterState }}>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/:id" element={<PDP />} />
      </Routes>
    </FilterContext.Provider>
  );
};

export default ProductRouter;
