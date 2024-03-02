import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import "../styles/products.css";
import axios from "axios";
import Filters from "../components/Filters/Filters";
import filterGif from "../assets/filter.gif";
import filterIcon from "../assets/filter.png";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import NotFound from "../components/NotFound/NotFound";
import { useLocation } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [showGif, setShowGif] = useState(false);
  const [loading, setLoading] = useState(true);

  const location = useLocation();

  const [filterState, setFilterState] = useState({
    categoryId: "",
    gender: [],
    priceRange: {},
  });

  const fetchAllProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://localhost:8060/products/products",
        {
          params: {
            categoryId: filterState.categoryId,
            minPrice: filterState.priceRange.min,
            maxPrice: filterState.priceRange.max,
          },
        }
      );

      setProducts(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const toggleFilter = () => {
    setShowFilters((prevState) => !prevState);
    setShowGif(true);

    setTimeout(() => {
      setShowGif(false);
    }, 1000);
  };

  useEffect(() => {
    setFilterState((prevState) => ({
      ...prevState,
      gender: location.state?.gender || [],
      categoryId: location.state?.categoryId || "",
    }));

    setShowFilters(location.state?.showFilters || false);
  }, [location]);

  useEffect(() => {
    fetchAllProducts();
  }, [filterState]);

  return (
    <div className="container-fluid">
      <div className="d-flex flex-row justify-content-end gap-4 mb-5">
        <div className="pe-4">
          <button onClick={toggleFilter} className="filter-button">
            {showFilters ? "Hide" : "Show"} Filters
            {showGif ? (
              <img
                className="ms-2"
                src={filterGif}
                alt="Filtering"
                width="25px"
              />
            ) : (
              <img className="ms-2" src={filterIcon} alt="icon" width="25px" />
            )}
          </button>
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
          {loading ? (
            <div className="d-flex justify-content-start flex-wrap">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
                <div key={index} className="py-2 px-4 skeleton-img">
                  <Skeleton width="100%" height="100%" />
                </div>
              ))}
            </div>
          ) : products.length > 0 ? (
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
      </div>
    </div>
  );
};

export default Products;
