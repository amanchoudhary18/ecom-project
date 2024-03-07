import React from "react";
import "../styles/product-card.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import isUserLoggedIn from "../utils/isUserLoggedIn";
import { anonymousAddToCart } from "../utils/cartFunctions";

import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

const ProductCard = ({ product, showFilters }) => {
  const navigate = useNavigate();

  const [isHovered, setIsHovered] = useState(false);

  const navigateToPDP = () => {
    navigate(`/products/${product.id}`);
  };

  const addToCart = async (token) => {
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };

      const addToCartBody = {
        productId: product.id,
        quantity: 1,
      };

      const response = await axios.post(
        `http://localhost:8090/cart/addToCart`,
        addToCartBody,
        config
      );

      toast.success(response.data.message);
    } catch (error) {
      if (error.response) {
        toast.error(error.data.response.message);
      } else {
        toast.error(error.message);
      }
    }
  };
  return (
    <div
      className={`card product-card border-0 ${
        product.quantity === 0 ? "out-of-stock-full" : ""
      }`}
      onClick={navigateToPDP}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="cart-icon"
        role="button"
        onClick={(e) => {
          e.stopPropagation();

          if (isUserLoggedIn()) addToCart(isUserLoggedIn());
          else anonymousAddToCart();
        }}
      >
        <i class="bi bi-cart"></i>
      </div>

      <div className={`product-card-img`} role="button">
        <img
          src={
            product.imgLinks[0] ||
            "https://nayemdevs.com/wp-content/uploads/2020/03/default-product-image.png"
          }
          alt="product-card"
        />
      </div>

      <div className="card-body">
        <p className="product-card-title">{product.name}</p>
        <p className="product-card-data">
          <i className="bi bi-star-fill"></i> <span>4.9</span>
          <span className="dot"></span>
          <span className="text-muted">
            {product.category.gender === "Unisex"
              ? product.category.gender
              : product.category.gender + "'s category"}
          </span>
        </p>

        <p className="product-card-price">
          {product.quantity === 0 ? (
            <span className="out-of-stock">Out of Stock</span>
          ) : (
            `₹ ${product.price.toLocaleString("en-IN")}`
          )}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
