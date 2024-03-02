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

const ProductRouter = React.lazy(() => import("product_mf/ProductRouter"));

const App = () => (
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
        <Route key={"product"} path="/products/*" element={<ProductRouter />} />
      </Routes>
    </Suspense>
  </BrowserRouter>
);
ReactDOM.render(<App />, document.getElementById("app"));
