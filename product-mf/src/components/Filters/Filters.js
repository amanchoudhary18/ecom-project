import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./Filters.module.css";

const Filters = ({ filterState, setFilterState }) => {
  const [categories, setCategories] = useState([]);
  const fetchAllCategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8060/products/categories"
      );

      console.log(categories);

      setCategories(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllCategories();
  }, []);

  return (
    <div className="ms-3 container-fluid">
      {/* Categories */}
      <div>
        <div>
          <p
            className={`${styles["filter-categories"]} ${
              filterState.categoryId === "" ? styles.selected : ""
            }`}
            onClick={() => {
              setFilterState({ ...filterState, categoryId: "" });
            }}
          >
            All Categories
          </p>
        </div>
        {categories.map((category) => (
          <div
            key={category.id}
            onClick={() => {
              setFilterState({ ...filterState, categoryId: category.id });
            }}
          >
            <p
              className={`${styles["filter-categories"]} ${
                filterState.categoryId === category.id ? styles.selected : ""
              }`}
            >
              {category.name}
            </p>
          </div>
        ))}
      </div>

      {/* Gender */}
      <div className="mt-5">
        <div>
          <p className={`${styles["filter-genders"]}`}>Gender</p>
        </div>
        <div>
          {["Men", "Women", "Unisex"].map((gender, index) => (
            <div className="my-2 form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckChecked"
              />
              <label className={`${styles["filter-gender"]} form-check-label`}>
                {gender}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filters;
