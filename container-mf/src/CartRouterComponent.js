import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import ErrorComponent from "./components/ErrorComponent/ErrorComponent";

const CartRouter = React.lazy(() => import("cart_mf/CartRouter"));

const CartRouterComponent = () => {
  return (
    <ErrorBoundary fallback={<ErrorComponent />}>
      <CartRouter />
    </ErrorBoundary>
  );
};

export default CartRouterComponent;
