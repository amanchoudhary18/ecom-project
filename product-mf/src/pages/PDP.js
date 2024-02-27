import { useEffect, useState } from "react";
import "../styles/pdp.css";
import { useParams } from "react-router-dom";
import axios from "axios";

const PDP = () => {
  const params = useParams();

  const [product, setProduct] = useState();
  const [selectedImgLink, setSelectedImgLink] = useState();

  const handleMouseOver = (link) => {
    console.log(link);
    setSelectedImgLink(link);
  };

  const fetchProduct = async () => {
    try {
      const productId = params.id;
      const response = await axios.get(
        `http://localhost:8060/products/products/${productId}`
      );

      console.log(response.data.product);
      setProduct(response.data.product);
      setSelectedImgLink(response.data.product.imgLinks[1]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <div className="container-fluid">
      <div className="pdp row mx-5">
        <div className="col-md-7">
          <div className="row">
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
            <div className="col-md-10 px-5 py-2">
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

          <button className="mt-5 py-3 add-to-cart-btn">Add to cart</button>
        </div>
      </div>
    </div>
  );
};

export default PDP;
