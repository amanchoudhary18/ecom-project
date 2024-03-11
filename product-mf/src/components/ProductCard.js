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
import Modal from "../components/Modal/Modal";

const ProductCard = ({ product, showFilters }) => {
  const navigate = useNavigate();

  const [isHovered, setIsHovered] = useState(false);

  const [modalState, setModalState] = useState({
    label: "",
    data: [],
  });

  const navigateToPDP = () => {
    navigate(`/products/${product.id}`);
  };

  const [selectedSize, setSelectedSize] = useState(4);

  const addToCart = async (token, size) => {
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };

      const addToCartBody = {
        productId: product.id,
        quantity: 1,
        size: size + " UK",
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
    >
      <div className="cart-icon">
        <i
          className="bi bi-cart"
          role="button"
          data-toggle="modal"
          data-target="#size"
          onClick={(e) => {
            setModalState((prevState) => ({
              ...prevState,
              label: "Select Size",
            }));
          }}
        ></i>
      </div>

      <div className={`product-card-img`} role="button" onClick={navigateToPDP}>
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

      <Modal
        modalState={modalState}
        setModalState={setModalState}
        onSubmit={() => {}}
        id={"size"}
        hideFooter={true}
        label={"Select Size"}
      >
        <div className="product-sizes d-flex flex-row flex-wrap gap-2">
          {[4, 4.5, 5, 6, 6.5, 7, 8, 9, 10, 11].map((data) => (
            <p
              className={`border m-0 ${
                selectedSize === data ? "border-black" : ""
              }`}
              key={data}
              role="button"
              onClick={() => setSelectedSize(data)}
            >
              {data} UK
            </p>
          ))}
        </div>

        <div className="d-flex justify-content-end">
          <button
            className="btn btn-dark btn-sm"
            onClick={() => {
              document.getElementById("size").classList.toggle("show");
              document
                .getElementsByClassName("modal-backdrop")[0]
                .classList.toggle("show");

              if (isUserLoggedIn()) addToCart(isUserLoggedIn(), selectedSize);
              else anonymousAddToCart(product.id, 1, selectedSize);
            }}
          >
            Add to cart
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default ProductCard;
