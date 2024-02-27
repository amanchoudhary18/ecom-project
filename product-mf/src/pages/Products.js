import React, { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import "../styles/products.css";
import Dropdown from "../components/Dropdown";
import PDP from "./PDP";
import axios from "axios";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const [genders, setGenders] = useState([
    { name: "Men" },
    { name: "Women" },
    { name: "Unisex" },
  ]);

  const [selectedCategory, setSelectedCategory] = useState();
  const [selectedGender, setSelectedGender] = useState();

  const fetchAllCategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8060/products/categories"
      );

      setCategories(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAllProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8060/products/products"
      );

      setProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllCategories();
    fetchAllProducts();
  }, []);

  return (
    <div className="container-fluid">
      <div className="hero">
        <p className="title display-5 text-center mt-4">
          Step Up Your Style, discover your perfect pair
        </p>
        <p className="mt-0 text-center text-muted">
          Crafted for confidence. Experience superior comfort and effortless
          style, one step at a time.
        </p>
      </div>

      <div className="d-flex flex-row justify-content-center gap-4 my-5">
        {/* Category filter */}
        <Dropdown
          values={categories}
          setFilterValue={setSelectedCategory}
          filterValue={selectedCategory}
        />

        {/* Gender filter */}
        <Dropdown
          values={genders}
          setFilterValue={setSelectedGender}
          filterValue={selectedGender}
        />
      </div>

      <div className="d-flex justify-content-center flex-wrap">
        {products.map((product) => (
          <div key={product.id} className="py-2 px-4">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
