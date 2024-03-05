import React, { useState, Suspense } from "react";
import logo from "../../assets/swoosh.png";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import avatar from "../../assets/avatars/actor-chaplin-comedy-svgrepo-com.svg";
import isUserLoggedIn from "../../utils/isUserLoggedIn";

const CartDropdown = React.lazy(() => import("cart_mf/CartDropdown"));

const Header = ({ sticky }) => {
  const navigate = useNavigate();
  const [dropdown, setDropdown] = useState(false);

  return (
    <div className="container-fluid header">
      <div className="ps-5 row py-3 ">
        <a className="col-lg-4 header-logo mt-2">
          <img src={logo} alt="logo" />
        </a>
        <div className="col-lg-5 d-flex flex-content-start gap-4 header-links">
          <p onClick={() => navigate("/")}>Home</p>
          <p>
            <a onClick={() => navigate("/products")}>All Products</a>
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
        <div className="col-lg-3 header-profile d-flex flex-row ">
          <Suspense fallback={<div>Loading..</div>}>
            <CartDropdown dropdown={dropdown} setDropdown={setDropdown} />
          </Suspense>

          {isUserLoggedIn() ? (
            <img
              src={avatar}
              alt="avatar"
              className="avatar-img"
              onClick={() => {
                setDropdown(false);
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                localStorage.removeItem("cart");
                navigate("/");
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
