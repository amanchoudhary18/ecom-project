import React, { useState, useEffect } from "react";
import axios from "axios";
import isUserLoggedIn from "../../utils/isUserLoggedIn";
import CartItem from "../../components/CartItem/CartItem";
import "./Cart.css";
import { useNavigate } from "react-router-dom";

import emptyCart from "../../assets/Empty Cart.jpg";
import ErrorComponent from "../../components/ErrorComponent/ErrorComponent";

const Cart = () => {
  const navigate = useNavigate();
  const [cartData, setCartData] = useState([]);

  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);

  const [disableCheckout, setDisableCheckout] = useState(false);

  const fetchCartData = async () => {
    setLoading(true);
    setDisableCheckout(false);
    const userToken = isUserLoggedIn();
    if (!userToken) {
      try {
        const cart = localStorage.getItem("cart");
        if (!cart) {
          localStorage.setItem("cart", JSON.stringify([]));
        } else {
          const cartItems = JSON.parse(cart);

          const products = await Promise.all(
            cartItems.map(async (item) => {
              const productResponse = await axios.get(
                `http://localhost:8060/products/products/${item.productId}`
              );

              if (productResponse.data.product.quantity === 0) {
                setDisableCheckout(true);
              }

              return {
                ...productResponse.data.product,
                cartQuantity: item.quantity,
              };
            })
          );

          setCartData(products);
        }
        console.log(JSON.parse(cart));
      } catch (error) {
        console.log(error);
        setError(error);
      }
    } else {
      const config = { headers: { Authorization: `Bearer ${userToken}` } };

      try {
        const response = await axios.get("http://localhost:8090/cart", config);
        const cartItems = response.data.cart.cartItems;

        const products = await Promise.all(
          cartItems.map(async (item) => {
            const productResponse = await axios.get(
              `http://localhost:8060/products/products/${item.productId}`
            );

            if (productResponse.data.product.quantity === 0) {
              setDisableCheckout(true);
            }
            return {
              ...productResponse.data.product,
              cartQuantity: item.quantity,
            };
          })
        );

        setCartData(products);
      } catch (error) {
        console.log(error);
        setError(error);
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchCartData();
  }, []);

  return (
    <>
      {error ? (
        <ErrorComponent status={error.response?.status} />
      ) : (
        <>
          {loading ? (
            <div className="mt-5 mx-auto loader"></div>
          ) : (
            <div className="container-fluid mt-5">
              {cartData.length > 0 ? (
                <div className="row mx-5">
                  <div className="col-8 cart-items">
                    {cartData.map((cartItem) => (
                      <div className="my-3">
                        <CartItem
                          cartItem={cartItem}
                          fetchCartData={fetchCartData}
                        />
                      </div>
                    ))}
                  </div>
                  {cartData.length > 0 && (
                    <div className="cart-summary col-4">
                      <p className="title">Cart Summary</p>
                      {[
                        {
                          name: "Subtotal Price",
                          value: cartData?.reduce((total, item) => {
                            return total + item.price * item.cartQuantity;
                          }, 0),
                        },

                        {
                          name: "Tax + Handling Charges",
                          value:
                            cartData?.reduce((total, item) => {
                              return total + item.price * item.cartQuantity;
                            }, 0) * 0.1,
                        },
                      ].map((data) => (
                        <div className="d-flex flex-row justify-content-between cart-summary-items">
                          <p>{data.name}</p>
                          <p>
                            ₹{" "}
                            {parseFloat(data.value.toFixed(2)).toLocaleString(
                              "en-IN"
                            )}
                          </p>
                        </div>
                      ))}

                      <hr />
                      {[
                        {
                          name: "Total Price",
                          value:
                            cartData?.reduce((total, item) => {
                              return total + item.price * item.cartQuantity;
                            }, 0) * 1.1,
                        },
                      ].map((data) => (
                        <div className="d-flex flex-row justify-content-between pt-2">
                          <p className="cart-summary-final">{data.name}</p>
                          <p className="cart-summary-final">
                            ₹{" "}
                            {parseFloat(data.value.toFixed(2)).toLocaleString(
                              "en-IN"
                            )}
                          </p>
                        </div>
                      ))}
                      <hr />

                      <button
                        className={`mt-5 py-3 cart-checkout-btn ${
                          disableCheckout ? "out-of-stock-btn" : ""
                        }`}
                        onClick={() => {
                          if (!isUserLoggedIn()) {
                            navigate("/login");
                          }

                          navigate("/cart/buy");
                        }}
                        disabled={disableCheckout}
                      >
                        Checkout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <div className="d-flex justify-content-center">
                    <img
                      src={emptyCart}
                      alt="empty"
                      width="300px"
                      className="my-auto"
                    />
                  </div>
                  <div className="d-flex justify-content-center">
                    <p>Your cart looks empty</p>
                  </div>
                  <div className="d-flex justify-content-center">
                    <button
                      className="py-2 px-4 btn btn-sm btn-dark"
                      onClick={() => {
                        navigate("/products");
                      }}
                    >
                      Let's go shopping
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Cart;
