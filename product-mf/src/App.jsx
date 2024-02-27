import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import ProductRouter from "./ProductRouter";

const App = () => (
  <div>
    <ProductRouter />
  </div>
);

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("app")
);
