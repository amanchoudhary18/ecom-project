import React, { useState, Suspense } from "react";
import logo from "../../assets/swoosh.png";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import avatar from "../../assets/avatars/avatar (1).svg";
import isUserLoggedIn from "../../utils/isUserLoggedIn";
import { useCallback } from "react";
import { useContext } from "react";
import UserContext from "../../context/UserContext";
import axios from "axios";
import isAdmin from "../../utils/isAdmin";
import { ErrorBoundary } from "react-error-boundary";
import cart from "../../assets/cart.png";

const CartDropdown = React.lazy(() => import("cart_mf/CartDropdown"));

const Header = () => {
  const navigate = useNavigate();
  const [dropdown, setDropdown] = useState(false);

  const { user, setUser } = useContext(UserContext);

  const fetchUserData = async () => {
    const userToken = isUserLoggedIn();

    if (!userToken) {
      navigate("/login");
    }

    const config = { headers: { Authorization: `Bearer ${userToken}` } };

    try {
      const response = await axios.get(
        "http://localhost:8080/users/my-data",
        config
      );

      console.log(response.data.user);
      setUser(response.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  useState(() => {
    console.log(localStorage.getItem("isAdmin"), "headers");
    fetchUserData();
  }, []);

  return (
    <div className="container-fluid header">
      <div className="ps-5 row py-3 ">
        <a
          className={`col-lg-${isAdmin() === "true" ? 3 : 4} header-logo mt-2`}
        >
          <img src={logo} alt="logo" />
        </a>
        {isAdmin() === "true" ? (
          <div className="col-lg-6 d-flex flex-content-start gap-4 header-links">
            <p onClick={() => navigate("/")}>Home</p>
            <p>
              <a onClick={() => navigate("/products")}>All Products</a>
            </p>
            <p>
              <a onClick={() => navigate("/user-management")}>Manage Users</a>
            </p>
            <p>
              <a onClick={() => navigate("/products/product-management")}>
                Manage Products
              </a>
            </p>
          </div>
        ) : (
          <div className="col-lg-5 d-flex flex-content-start gap-4 header-links">
            <p onClick={() => navigate("/")}>Home</p>
            <p>
              <a
                onClick={() =>
                  navigate("/products", {
                    state: { showFilters: true },
                  })
                }
              >
                All Products
              </a>
            </p>
            <p
              onClick={() =>
                navigate("/products", {
                  state: { gender: ["Men"], showFilters: true },
                })
              }
            >
              Men
            </p>
            <p
              onClick={() =>
                navigate("/products", {
                  state: { gender: ["Women"], showFilters: true },
                })
              }
            >
              Women
            </p>
          </div>
        )}
        <div className="col-lg-3 header-profile d-flex flex-row ">
          <ErrorBoundary
            fallback={
              <div>
                <img src={cart} alt="cart" className="cart-img me-4" />
              </div>
            }
          >
            <CartDropdown dropdown={dropdown} setDropdown={setDropdown} />
          </ErrorBoundary>

          {isUserLoggedIn() ? (
            <img
              src={user?.imgLink}
              alt="avatar"
              className="avatar-img"
              onClick={() => {
                navigate("/profile");
              }}
            />
          ) : (
            <div
              className="col-2 header-links my-auto"
              onClick={() => navigate("/login")}
            >
              <p>Login</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
