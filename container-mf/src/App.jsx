import React, { Suspense } from "react";
import ReactDOM from "react-dom";

import "./index.css";
import Header from "./components/Header/Header.js";

import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Breadcrumbs from "./components/Breadcumbs/Breadcrumbs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import Profile from "./pages/Profile/Profile.js";
import { useState } from "react";
import UserContext from "./context/UserContext.js";
import Login from "./pages/Login/Login.js";
import UserManagement from "./pages/UserManagement.js/UserManagement.js";
import ErrorComponent from "./components/ErrorComponent/ErrorComponent.js";
import { ErrorBoundary } from "react-error-boundary";

const ProductRouter = React.lazy(() => import("product_mf/ProductRouter"));
const CartRouter = React.lazy(() => import("cart_mf/CartRouter"));

const App = () => {
  const [user, setUser] = useState();

  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setIsAdmin(localStorage.getItem("isAdmin") || "false");
  }, [user]);

  const ProtectedRoute = ({ element, isAdmin, ...props }) => {
    return isAdmin ? element : <Navigate to="/" />;
  };

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ user, setUser }}>
        <div className="pb-5">
          <Header />
        </div>

        <Breadcrumbs />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route
            path="/user-management"
            element={
              <ProtectedRoute element={<UserManagement />} isAdmin={isAdmin} />
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/profile" element={<Profile />} />
          <Route
            path="/products/*"
            element={
              <ErrorBoundary fallback={<ErrorComponent />}>
                <ProductRouter />
              </ErrorBoundary>
            }
          />
          <Route
            path="/cart/*"
            element={
              <ErrorBoundary fallback={<ErrorComponent />}>
                <CartRouter />
              </ErrorBoundary>
            }
          />
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));
