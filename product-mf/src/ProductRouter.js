import React from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Products from "./pages/Products";
import PDP from "./pages/PDP";
import { ToastContainer } from "react-toastify";

const ProductRouter = () => {
  return (
    <>
      <ToastContainer />

      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/:id" element={<PDP />} />
      </Routes>
    </>
  );
};

export default ProductRouter;
