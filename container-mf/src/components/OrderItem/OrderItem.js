import axios from "axios";
import React, { useState, useEffect } from "react";
import "./OrderItem.css";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../utils/formatDate";

const OrderItem = ({ orderItem, orderDate }) => {
  const navigate = useNavigate();

  const deliveryDate = new Date(
    new Date(orderDate).setDate(new Date(orderDate).getDate() + 7)
  );

  return (
    <div className="row order-item my-3">
      <div className="row">
        <div className="col-2">
          <img
            src={orderItem?.img}
            className="order-item-img"
            onClick={() => {
              navigate(`/products/${orderItem?.productId}`);
            }}
          />
        </div>

        <div className="col-8">
          <p className="order-item-name m-0 p-0">
            {deliveryDate < new Date() ? "Delivered on " : "Expected by "}
            <span className="order-delivery">{formatDate(deliveryDate)}</span>
          </p>
          <p className="order-item-quantity m-0 my-1 p-0 text-muted">
            {orderItem?.productName}
          </p>

          <p className="order-item-quantity m-0 my-1 mt-2 p-0 text-muted">
            Quantity : {orderItem?.quantity}
          </p>
        </div>

        <div className="col-2"></div>
      </div>
    </div>
  );
};

export default OrderItem;
