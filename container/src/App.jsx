import React, { Suspense } from "react";
import ReactDOM from "react-dom";

import "./index.css";
import Header from "./components/Header";

import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";

const ProductRouter = React.lazy(() => import("product_mf/ProductRouter"));

const App = () => (
  <BrowserRouter>
    <Header />
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route key={"product"} path="/products/*" element={<ProductRouter />} />
      </Routes>
    </Suspense>
  </BrowserRouter>
);
ReactDOM.render(<App />, document.getElementById("app"));
