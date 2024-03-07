import React from "react";
import "./ErrorComponent.css";
import serviceUnavailable from "../../assets/ServiceUnavailable.png";
import notFound from "../../assets/not-found.png";

const ErrorComponent = ({ status }) => {
  return (
    <>
      {status / 100 === 4 ? (
        <div className="not-found mt-5">
          <div className="d-flex justify-content-center pt-5">
            <img src={notFound} alt="Not Found" />
          </div>

          <p className="mt-5 text-center">
            “Your input has <span>caught our shoes offside</span>. Retry!”
          </p>
        </div>
      ) : (
        <div className="not-found mt-5">
          <div className="d-flex justify-content-center pt-5">
            <img src={serviceUnavailable} alt="Service Unavailable" />
          </div>

          <p className="mt-5 text-center">
            “Our service <span>seems injured</span>. Please give us time to fix
            it :( ”
          </p>
        </div>
      )}
    </>
  );
};

export default ErrorComponent;
