import axios from "axios";
import React, { useState, useEffect } from "react";
import "./CartItemDropdown.css";
import { useNavigate } from "react-router-dom";

const CartItemDropdown = ({ cartItem }) => {
  const [product, setProduct] = useState();
  const navigate = useNavigate();

  const fetchCartItem = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8060/products/products/${cartItem.productId}`
      );

      setProduct(response.data.product);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCartItem();
  }, [cartItem]);

  return (
    <div className="row">
      <div className="col-4">
        <img
          src={product?.imgLinks[0]}
          className="cart-item-dropdown-img"
          onClick={() => {
            navigate(`/products/${product.id}`);
          }}
        />
      </div>
      <div className="col-7">
        <p className="cart-item-dropdown-name m-0 p-0">{product?.name}</p>
        <p className="cart-item-dropdown-quantity m-0 p-0 my-1">
          Quantity : {cartItem?.quantity}
        </p>
        <p className="cart-item-dropdown-price">
          MRP : ₹ {product?.price?.toLocaleString("en-IN")}
        </p>
      </div>
    </div>
  );
};

export default CartItemDropdown;
