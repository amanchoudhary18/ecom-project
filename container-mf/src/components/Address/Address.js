import isUserLoggedIn from "../../utils/isUserLoggedIn";
import "./Address.css";
import axios from "axios";
import { toast } from "react-toastify";

const Address = ({ address, fetchUserData }) => {
  const deleteAddress = async () => {
    const userToken = isUserLoggedIn();

    if (!userToken) {
      navigate("/login");
    }

    const config = { headers: { Authorization: `Bearer ${userToken}` } };

    try {
      const response = await axios.delete(
        `http://localhost:8080/users/addresses/${address.id}`,
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
    <div className={`address card my-2 `}>
      <div className="card-body px-3 py-2 d-flex justify-content-between">
        <div>
          <p className="address-title m-0 py-2 ">{address?.addressName}</p>
          <div className="address-text d-flex flex-wrap gap-2">
            <p>{address?.apartment},</p>
            <p>{address?.area ? address?.area + "," : ""}</p>
            <p>{address?.landmark ? address?.landmark + "," : ""}</p>
            <p>{address?.city ? address?.city + "," : ""}</p>
            <p>{address?.state ? address?.state : ""} - </p>
            <p>{address?.pincode}</p>
          </div>
        </div>

        <button
          type="button"
          className="btn btn-sm float-right my-3"
          onMouseOver={(e) => e.currentTarget.classList.add("btn-danger")}
          onMouseOut={(e) => e.currentTarget.classList.remove("btn-danger")}
          onClick={() => deleteAddress()}
        >
          <i className="bi bi-trash"></i>
        </button>
      </div>
    </div>
  );
};

export default Address;
