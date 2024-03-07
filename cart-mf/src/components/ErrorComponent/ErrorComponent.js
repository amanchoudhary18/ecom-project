import React from "react";
import "./ErrorComponent.css";
import serviceUnavailable from "../../assets/ServiceUnavailable.png";

const ErrorComponent = () => {
  return (
    <div className="not-found mt-5">
      <div className="d-flex justify-content-center pt-5">
        <img src={serviceUnavailable} alt="Service Unavailable" />
      </div>

      <p className="mt-5 text-center">
        “Our service <span>seems injured</span>. Please give us time to fix it
        :( ”
      </p>
    </div>
  );
};

export default ErrorComponent;
