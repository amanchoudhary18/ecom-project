import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import ErrorComponent from "./components/ErrorComponent/ErrorComponent";

const ProductRouter = React.lazy(() => import("product_mf/ProductRouter"));

const ProductRouterComponent = () => {
  return (
    <ErrorBoundary fallback={<ErrorComponent />}>
      <ProductRouter />
    </ErrorBoundary>
  );
};

export default ProductRouterComponent;
