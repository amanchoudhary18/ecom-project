import React, { useState, useEffect } from "react";
import axios from "axios";
import isUserLoggedIn from "../../utils/isUserLoggedIn";
import "./Order.css";
import { useNavigate } from "react-router-dom";
import OrderItem from "../../components/OrderItem/OrderItem";
import Address from "../../components/Address/Address";
import PaymentMethod from "../../components/PaymentMethod/PaymentMethod";
import { toast } from "react-toastify";

const Order = () => {
  const navigate = useNavigate();

  const [orderState, setOrderState] = useState({
    initCardData: [],
    cartData: [],
    addresses: [],
    paymentMethods: [],
    addressDropdown: false,
    paymentMethodDropdown: false,
  });

  const [selectedAddress, setSelectedAddress] = useState();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState();

  const fetchCartData = async () => {
    const userToken = isUserLoggedIn();
    if (!userToken) {
      const cart = localStorage.getItem("cart");
      if (!cart) {
        localStorage.setItem("cart", JSON.stringify([]));
      } else {
        const cartItems = JSON.parse(cart);

        if (cartItems.length < 0) {
          navigate("/cart");
        }

        setOrderState((prevState) => ({
          ...prevState,
          initCardData: cartItems,
        }));

        const products = await Promise.all(
          cartItems.map(async (item) => {
            const productResponse = await axios.get(
              `http://localhost:8060/products/products/${item.productId}`
            );
            return { ...productResponse.data.product, quantity: item.quantity };
          })
        );

        setOrderState((prevState) => ({ ...prevState, cartData: products }));
      }
    } else {
      try {
        const config = { headers: { Authorization: `Bearer ${userToken}` } };

        const response = await axios.get("http://localhost:8090/cart", config);
        const cartItems = response.data.cart.cartItems;
        if (cartItems.length == 0) {
          navigate("/cart");
        }

        setOrderState((prevState) => ({
          ...prevState,
          initCardData: cartItems,
        }));

        const products = await Promise.all(
          cartItems.map(async (item) => {
            const productResponse = await axios.get(
              `http://localhost:8060/products/products/${item.productId}`
            );
            return { ...productResponse.data.product, quantity: item.quantity };
          })
        );

        setOrderState((prevState) => ({ ...prevState, cartData: products }));
      } catch (error) {
        console.log(error);
      }
    }
  };

  //   function formatDate(date) {
  //     const options = { day: "numeric", month: "short" };
  //     return new Intl.DateTimeFormat("en-IN", options).format(date);
  //   }

  const fetchAddress = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${isUserLoggedIn()}` },
      };

      const response = await axios.get(
        "http://localhost:8080/users/addresses",
        config
      );

      setOrderState((prevState) => ({
        ...prevState,
        addresses: response.data.addresses,
      }));

      setSelectedAddress(
        response.data.addresses.length > 0 ? response.data.addresses[0] : null
      );
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPaymentMethods = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${isUserLoggedIn()}` },
      };

      const response = await axios.get(
        "http://localhost:8080/users/paymentMethods",
        config
      );

      setOrderState((prevState) => ({
        ...prevState,
        paymentMethods: response.data.paymentMethods,
      }));

      setSelectedPaymentMethod(
        response.data.paymentMethods.length > 0
          ? response.data.paymentMethods[0]
          : {}
      );
    } catch (error) {
      console.log(error);
    }
  };

  const createOrder = async () => {
    try {
      const config = {
        headers: { Authorization: `Bearer ${isUserLoggedIn()}` },
      };

      const createOrderBody = {
        orderItemList: orderState.initCardData,
        addressId: selectedAddress.id,
        paymentMethodId: selectedPaymentMethod.id,
      };

      const response = await axios.post(
        "http://localhost:8070/order/createOrder",
        createOrderBody,
        config
      );

      await axios.get("http://localhost:8090/cart/clearCart", config);

      toast.success(response.data.message);
      navigate("/profile");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (!isUserLoggedIn()) navigate("/login");

    fetchCartData();
    fetchAddress();
    fetchPaymentMethods();
  }, []);

  return (
    <div className="container-fluid mt-5 px-0">
      <div className="row mx-5">
        <div className="col-8 order-items">
          <div className="mb-5 me-3">
            <div className="d-flex flex-row justify-content-between">
              <p className="title m-0 p-0">Select your address</p>
              <i
                class={`bi bi-chevron-${
                  orderState.addressDropdown ? "up" : "down"
                }`}
                role="button"
                onClick={() =>
                  setOrderState((prevState) => ({
                    ...prevState,
                    addressDropdown: !orderState.addressDropdown,
                  }))
                }
              ></i>
            </div>
            <div className="order-address ">
              {!orderState.addressDropdown ? (
                <Address address={selectedAddress} selected={true} />
              ) : (
                orderState.addresses.map((address) => (
                  <div
                    onClick={() => {
                      setSelectedAddress(address);
                      setOrderState((prevState) => ({
                        ...prevState,
                        addressDropdown: !orderState.addressDropdown,
                      }));
                    }}
                  >
                    <Address
                      address={address}
                      selected={selectedAddress?.id === address.id}
                    />
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="mb-5">
            <div className="d-flex flex-row justify-content-between">
              <p className="title m-0 p-0">Select your payment method</p>
              <i
                class={`bi bi-chevron-${
                  orderState.paymentMethodDropdown ? "up" : "down"
                }`}
                role="button"
                onClick={() =>
                  setOrderState((prevState) => ({
                    ...prevState,
                    paymentMethodDropdown: !orderState.paymentMethodDropdown,
                  }))
                }
              ></i>
            </div>
            <div className="order-address ">
              {!orderState.paymentMethodDropdown ? (
                <PaymentMethod
                  paymentMethod={selectedPaymentMethod}
                  selected={true}
                />
              ) : (
                orderState.paymentMethods.map((paymentMethod) => (
                  <div
                    onClick={() => {
                      setSelectedPaymentMethod(paymentMethod);
                      setOrderState((prevState) => ({
                        ...prevState,
                        paymentMethodDropdown:
                          !orderState.paymentMethodDropdown,
                      }));
                    }}
                  >
                    <PaymentMethod
                      paymentMethod={paymentMethod}
                      selected={selectedPaymentMethod?.id === paymentMethod.id}
                    />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
        {orderState.cartData.length > 0 && (
          <div className="order-summary col-4">
            <p className="title">Order Summary</p>
            {[
              {
                name: "Subtotal Price",
                value: orderState.cartData?.reduce((total, item) => {
                  return total + item.price * item.quantity;
                }, 0),
              },

              {
                name: "Tax + Handling Charges",
                value:
                  orderState.cartData?.reduce((total, item) => {
                    return total + item.price * item.quantity;
                  }, 0) * 0.1,
              },
            ].map((data) => (
              <div className="d-flex flex-row justify-content-between order-summary-items">
                <p>{data.name}</p>
                <p>
                  ₹ {parseFloat(data.value.toFixed(2)).toLocaleString("en-IN")}
                </p>
              </div>
            ))}

            <hr />
            {[
              {
                name: "Total Price",
                value:
                  orderState.cartData?.reduce((total, item) => {
                    return total + item.price * item.quantity;
                  }, 0) * 1.1,
              },
            ].map((data) => (
              <div className="d-flex flex-row justify-content-between pt-2">
                <p className="order-summary-final">{data.name}</p>
                <p className="order-summary-final">
                  ₹ {parseFloat(data.value.toFixed(2)).toLocaleString("en-IN")}
                </p>
              </div>
            ))}
            <hr />

            <div className="order-item-list">
              {orderState.cartData?.length > 0 ? (
                orderState.cartData.map((orderItem) => (
                  <div className="my-3">
                    <OrderItem orderItem={orderItem} />
                  </div>
                ))
              ) : (
                <div className="d-flex justify-content-center font-bold">
                  Your cart seems empty :(
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="checkout py-3 d-flex flex-row justify-content-end border border-top pe-5">
        <button className="btn btn-dark btn-md" onClick={createOrder}>
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Order;
