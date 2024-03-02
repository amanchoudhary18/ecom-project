import React, { Suspense } from "react";
import logo from "../../assets/swoosh.png";
import "./Header.css";
import { useNavigate } from "react-router-dom";
import avatar from "../../assets/avatars/actor-chaplin-comedy-svgrepo-com.svg";

const Header = () => {
  const navigate = useNavigate();
  return (
    <div className="container-fluid header">
      <div className="ps-5 row py-3 ">
        <a className="col-lg-4 header-logo mt-2">
          <img src={logo} alt="logo" />
        </a>
        <div className="col-lg-6 d-flex flex-content-start gap-4 header-links">
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

        {localStorage.getItem("token") ? (
          <div className="col-lg-2 header-profile">
            <img
              src={avatar}
              alt="avatar"
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/");
              }}
            />
          </div>
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
  );
};

export default Header;
