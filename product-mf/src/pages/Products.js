import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import "../styles/products.css";
import Dropdown from "../components/Dropdown";
import PDP from "./PDP";
import axios from "axios";
import Filters from "../components/Filters/Filters";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [showFilters, setShowFilters] = useState(true);

  const [filterState, setFilterState] = useState({
    categoryId: "",
    gender: "",
    minPrice: 0,
    maxPrice: 100000,
  });

  const fetchAllProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8060/products/products",
        {
          params: {
            categoryId: filterState.categoryId,
          },
        }
      );

      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const toggleFilter = () => {
    setShowFilters((prevState) => !prevState);
  };

  useEffect(() => {
    fetchAllProducts();
  }, [filterState]);

  return (
    <div className="container-fluid">
      <div className="d-flex flex-row justify-content-end gap-4 my-5">
        <div className="pe-4">
          <button onClick={toggleFilter}>Filters</button>
        </div>
      </div>

      <div className="row">
        {showFilters && (
          <div className="col-3 slide-in-left">
            <Filters
              filterState={filterState}
              setFilterState={setFilterState}
            />
          </div>
        )}

        <div className={`${showFilters ? "col-9" : "col-12"}`}>
          <div className="d-flex justify-content-start flex-wrap">
            {products.map((product) => (
              <div key={product.id} className="py-2 px-4">
                <ProductCard product={product} showFilters={showFilters} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
