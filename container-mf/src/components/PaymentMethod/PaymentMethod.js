import isUserLoggedIn from "../../utils/isUserLoggedIn";
import "../Address/Address.css";
import { toast } from "react-toastify";
import axios from "axios";

const PaymentMethod = ({ paymentMethod, fetchUserData }) => {
  const deletePaymentMethod = async () => {
    const userToken = isUserLoggedIn();

    if (!userToken) {
      navigate("/login");
    }

    const config = { headers: { Authorization: `Bearer ${userToken}` } };

    try {
      const response = await axios.delete(
        `http://localhost:8080/users/paymentMethods/${paymentMethod.id}`,
        config
      );

      toast.success(response.data.message);

      fetchUserData();
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
    }
  };

  return (
    <div className={`address card my-2`}>
      <div className="card-body px-3 py-2 d-flex justify-content-between">
        <div>
          <p className="address-title m-0 py-2 ">
            {paymentMethod?.type === "CREDIT_CARD"
              ? "Credit Card"
              : paymentMethod?.type === "DEBIT_CARD"
              ? "Debit Card"
              : "UPI"}
          </p>
          <div className="address-text d-flex flex-wrap gap-2">
            <p>{paymentMethod?.accountId}</p>
          </div>
        </div>

        <button
          type="button"
          className="btn btn-sm float-right my-3"
          onMouseOver={(e) => e.currentTarget.classList.add("btn-danger")}
          onMouseOut={(e) => e.currentTarget.classList.remove("btn-danger")}
          onClick={() => deletePaymentMethod()}
        >
          <i className="bi bi-trash"></i>
        </button>
      </div>
    </div>
  );
};

export default PaymentMethod;
