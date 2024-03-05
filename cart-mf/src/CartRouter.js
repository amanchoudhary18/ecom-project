import React, { useState } from "react";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import Cart from "./pages/Cart/Cart";
import Order from "./pages/Order/Order";

const CartRouter = () => {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Cart />} />
        <Route path="/buy" element={<Order />} />
      </Routes>
    </div>
  );
};

export default CartRouter;
