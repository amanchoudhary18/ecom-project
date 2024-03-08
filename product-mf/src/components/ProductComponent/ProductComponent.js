import React, { useState, useEffect } from "react";
import ProductCard from "../ProductCard";
import NotFound from "../NotFound/NotFound";

const ProductComponent = ({ filterState, showFilters }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAllProducts = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(
        "http://localhost:8060/products/products",
        {
          params: {
            categoryId: filterState.categoryId,
            minPrice: filterState.priceRange.min,
            maxPrice: filterState.priceRange.max,
            keyword: filterState.keyword,
          },
        }
      );

      setProducts(response.data);
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, [filterState]);

  return (
    <>
      {loading ? (
        <div className="loader mx-auto mt-3"></div>
      ) : (
        <div className={`${showFilters ? "col-9" : "col-12"}`}>
          {products.length > 0 || loading ? (
            <div className="d-flex justify-content-start flex-wrap">
              {products.map((product) => (
                <div key={product.id} className="py-2 px-4">
                  <ProductCard product={product} showFilters={showFilters} />
                </div>
              ))}
            </div>
          ) : (
            <NotFound />
          )}
        </div>
      )}
    </>
  );
};

export default ProductComponent;
