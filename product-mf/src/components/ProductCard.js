import React from "react";
import "../styles/product-card.css";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const navigateToPDP = () => {
    navigate(`/products/${product.id}`);
  };

  return (
    <div className="card product-card border-0" onClick={navigateToPDP}>
      <div className="product-card-img">
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
          ₹ {product.price.toLocaleString("en-IN")}
        </p>
      </div>
    </div>
  );
};

export default ProductCard;
