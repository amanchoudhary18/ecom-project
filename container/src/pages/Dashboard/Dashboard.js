import React, { useEffect, useState } from "react";
import styles from "./Dashboard.module.css";

import { useNavigate } from "react-router-dom";

// shoes
import shoe1 from "../../assets/shoe-1.png";
import shoe2 from "../../assets/shoe-2.png";
import shoe3 from "../../assets/shoe-3.png";

// famous-people
import famous1 from "../../assets/famous-1.jpg";
import famous2 from "../../assets/famous-2.jpeg";
import famous3 from "../../assets/famous-3.png";

import about from "../../assets/nike-cartoon.png";

import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  const shoes = [
    { name: "COMFORT", color: "#8f1ca3", img: shoe1 },
    { name: "STYLE", color: "#00FFFF", img: shoe3 },
    { name: "DURABLITY", color: "#FF69B4", img: shoe2 },
  ];

  const [selectedShoe, setSelectedShoe] = useState(shoes[0]);

  const fetchAllCategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8060/products/categories"
      );
      console.log(response.data);
      setCategories(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const navigateToProducts = () => {
    navigate(`/products`);
  };

  useEffect(() => {
    fetchAllCategories();

    const interval = setInterval(() => {
      setSelectedShoe((prevShoe) => {
        const currentIndex = shoes.indexOf(prevShoe);
        const nextIndex = (currentIndex + 1) % shoes.length;
        return shoes[nextIndex];
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Hero */}
      <div
        className={`${styles.bg} ${styles["shoe-container"]} ${
          styles[selectedShoe.name]
        } py-3`}
      >
        <div className={` ${styles.content} mx-5`}>
          <div>
            <div className="text-center" style={{ marginTop: "160px" }}>
              <img
                src={selectedShoe.img}
                alt="shoe"
                className={`mt-5 ${styles.shoe}`}
              />
            </div>
          </div>
        </div>
      </div>

      {/* About */}

      <div className="py-5 container-fluid">
        <div className={`pt-5 mx-5 ${styles.players}`}>
          <p>You are what you wear</p>
        </div>
        <div className="py-5 row">
          <div className="py-5 col-7 text-center">
            <img src={about} className={`${styles["about-img"]}`} />
          </div>
          <div className={`${styles["about-description"]} col-4`}>
            <p>
              Welcome to a world where style meets comfort. Our curated
              collection of footwear spans from trendy sneakers to elegant
              heels, ensuring that you find the perfect pair for every occasion.
              We prioritize quality, affordability, and an easy shopping
              experience. Step into fashion with confidence, because we believe
              that the right shoes can elevate your entire day! Whether you’re
              conquering the urban jungle, hitting the gym, or stepping out for
              a special occasion, we’ve got you covered. Our commitment to
              excellence ensures that you not only look good but also feel great
              in every step. Explore our range and discover the perfect fit for
              your unique style. Happy shoe shopping!
            </p>
          </div>
        </div>
      </div>

      {/* Collection */}
      <div className="pt-5container-fluid ">
        <div className={`pt-5 mx-5 ${styles.players}`}>
          <p>Our Collections</p>
        </div>
        <div className="d-flex flex-wrap justify-content-around py-5">
          {categories.map((category, index) => (
            <div key={category.id} className={`py-3`}>
              <div className={`${styles["category-card"]}`}>
                <img
                  src={category.imgLink}
                  alt="category"
                  className={`${styles["category-card-img"]} rounded`}
                />
                <p className={`${styles["category-card-title"]}`}>
                  {category.name}
                </p>
                <div className={`${styles["category-card-overlay"]}`}></div>
                <div className={`${styles["category-card-button"]}`}>
                  <button onClick={navigateToProducts}>
                    Explore <i className="ps-2 bi bi-arrow-right"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Athletes */}
      <div className="my-5 pt-5">
        <div className={`pt-5 mx-5 ${styles.players}`}>
          <p>Athletes</p>
        </div>
        <div className="my-5 d-flex flex-row justify-content-around">
          <div className="w-25">
            <img
              src={famous1}
              alt="famous"
              className={`${styles["players-img"]} rounded`}
            />
            <p className="mt-2 text-muted ">Nike x Neymar</p>
            <p className={`${styles["player-title"]}`}>The WONDER-kid</p>
            <p className={`${styles["player-description"]}`}>
              Neymar signed with Nike in 2005, when he was only 13 years old,
              and became one of the most prominent faces of the brand. He wore
              Nike boots, jerseys, and accessories, and starred in several Nike
              campaigns and commercials. He also had his own signature line of
              Nike products.
            </p>
          </div>

          <div className="w-25">
            <img
              src={famous2}
              alt="famous"
              className={`${styles["players-img"]} rounded`}
            />
            <p className="mt-2 text-muted ">Nike x LeBron</p>
            <p className={`${styles["player-title"]}`}>The Chosen One</p>
            <p className={`${styles["player-description"]}`}>
              LeBron James has been with Nike since 2003, when he signed a
              seven-year, $90 million deal as a rookie. Since then, he has
              become one of the most influential and lucrative athletes for
              Nike, earning an estimated $32 million per year from the brand
            </p>
          </div>

          <div className="w-25">
            <img
              src={famous3}
              alt="famous"
              className={`${styles["players-img"]} rounded`}
            />
            <p className="mt-2 text-muted ">Nike x Woods</p>
            <p className={`${styles["player-title"]}`}>The Silent Tiger</p>
            <p className={`${styles["player-description"]}`}>
              Tiger Woods signed with Nike in 1996, when he turned pro, and
              became the first golfer to have a major endorsement deal with the
              brand. He helped Nike establish its presence and reputation in the
              golf industry, wearing Nike golf shoes, apparel, and equipment,
              and promoting Nike Golf products and services.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
