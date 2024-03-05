import React, { Suspense } from "react";
import ReactDOM from "react-dom";

import "./index.css";
import Header from "./components/Header/Header.js";

import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Breadcrumbs from "./components/Breadcumbs/Breadcrumbs";
import Login from "./components/Login/Login";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Signup from "./components/Signup/Signup.js";
import { useEffect } from "react";

const ProductRouter = React.lazy(() => import("product_mf/ProductRouter"));
const CartRouter = React.lazy(() => import("cart_mf/CartRouter"));

const App = () => {
  return (
    <BrowserRouter>
      <div className="pb-5">
        <Header />
      </div>

      <Breadcrumbs />
      <ToastContainer />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/products/*" element={<ProductRouter />} />
          <Route path="/cart/*" element={<CartRouter />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
