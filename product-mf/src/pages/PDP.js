import { useEffect, useState } from "react";
import "../styles/pdp.css";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { toast } from "react-toastify";
import Confetti from "react-confetti";
import { anonymousAddToCart } from "../utils/cartFunctions";

const PDP = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState();
  const [selectedImgLink, setSelectedImgLink] = useState();
  const [loading, setLoading] = useState(true);

  const [confetti, setConfetti] = useState(false);

  const handleMouseOver = (link) => {
    console.log(link);
    setSelectedImgLink(link);
  };

  const fetchProduct = async (token) => {
    try {
      setLoading(true);
      const productId = params.id;

      const config = { headers: { Authorization: `Bearer ${token}` } };

      const response = await axios.get(
        `http://localhost:8060/products/products/${productId}`,
        config
      );

      console.log(response.data.product);
      setProduct(response.data.product);
      setSelectedImgLink(response.data.product.imgLinks[1]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (token) => {
    try {
      const config = { headers: { Authorization: `Bearer ${token}` } };

      const addToCartBody = {
        productId: product.id,
        quantity: 1,
      };

      const response = await axios.post(
        `http://localhost:8090/cart/addToCart`,
        addToCartBody,
        config
      );

      console.log(response);
      toast.success(response.data.message);

      // setConfetti(true);

      // setTimeout(() => {
      //   setConfetti(false);
      // }, 5000);
    } catch (error) {
      if (error.response) {
        toast.error(error.data.response.message);
      } else {
        toast.error(error.message);
      }
    }
  };

  useEffect(() => {
    fetchProduct(localStorage.getItem("token") || "");
  }, [params]);

  return (
    <div className="container-fluid">
      {confetti && (
        <Confetti
          width={window.innerWidth * 0.95}
          height={window.innerHeight}
        />
      )}

      {loading ? (
        <div className="pdp row mx-5">
          <div className="col-md-7">
            <div className="row">
              <div className="col-md-1"></div>
              <div className="col-md-1"></div>
              <div className="col-md-1">
                {[1, 2, 3, 4, 5].map(() => (
                  <div className={`pdp-side-img my-2`}>
                    <Skeleton width="100%" height="100%" />
                  </div>
                ))}
              </div>
              <div className="col-md-9 px-5 py-2">
                <div className="pdp-main-img-skeleton">
                  <Skeleton width="100%" height="100%" />
                </div>
              </div>
            </div>
          </div>
          <div className="pdp-details col-md-4 col-xl-3">
            <p className="name">
              <Skeleton width="300px" height="30px" />
            </p>
            <p className="text-muted">
              <Skeleton width="200px" height="30px" />
            </p>

            <p className="price">
              <Skeleton width="400px" height="60px" />
            </p>

            <p className="description">
              <Skeleton width="400px" height="20px" count={5} />
            </p>

            <Skeleton width="400px" height="30px" />
          </div>
        </div>
      ) : (
        <div className="pdp row mx-5">
          <div className="col-md-7">
            <div className="row">
              <div className="col-md-1"></div>
              <div className="col-md-1"></div>
              <div className="col-md-1">
                {product?.imgLinks?.map(
                  (link, index) =>
                    index >= 1 && (
                      <img
                        src={link}
                        alt="product"
                        className={`pdp-side-img my-2 ${
                          link === selectedImgLink ? "opacity-50" : ""
                        }`}
                        onMouseOver={(e) => handleMouseOver(link)}
                      />
                    )
                )}
              </div>
              <div className="col-md-9 px-5 py-2">
                <img
                  src={selectedImgLink}
                  alt="product"
                  className="pdp-main-img"
                />
              </div>
            </div>
          </div>
          <div className="pdp-details col-md-4 col-xl-3">
            <p className="name">{product?.name}</p>
            <p className="text-muted">
              {product?.category?.gender === "Unisex"
                ? product?.category?.gender
                : product?.category?.gender + "'s category"}
            </p>

            <p className="price">
              MRP : ₹ {product?.price?.toLocaleString("en-IN")}
            </p>

            <p className="description">{product?.description}</p>

            <button
              className="mt-5 py-3 add-to-cart-btn"
              onClick={() => {
                // setDropdown(true);
                if (localStorage.getItem("token"))
                  addToCart(localStorage.getItem("token"));
                else {
                  anonymousAddToCart(product.id, 1);
                }
              }}
            >
              Add to cart
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PDP;
