import { useState } from "react";
import isUserLoggedIn from "../../utils/isUserLoggedIn";
import "./Address.css";
import axios from "axios";
import { toast } from "react-toastify";
import Modal from "../Modal/Modal";

const Address = ({ address, fetchUserData }) => {
  const [modalState, setModalState] = useState({
    label: "",
    data: [],
  });

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
          data-toggle="modal"
          data-target="#deleteModal"
          onMouseOver={(e) => e.currentTarget.classList.add("btn-danger")}
          onMouseOut={(e) => e.currentTarget.classList.remove("btn-danger")}
          onClick={() =>
            setModalState((prevState) => ({
              ...prevState,
              label: "Delete address",
            }))
          }
        >
          <i className="bi bi-trash"></i>
        </button>
      </div>

      <Modal
        modalState={modalState}
        setModalState={setModalState}
        onSubmit={() => {}}
        id={"deleteModal"}
        hideFooter={true}
        label={"Delete Address"}
      >
        <div>
          <p>Are you really sure you want to delete this address ?</p>
        </div>

        <div className="d-flex flex-row justify-content-end gap-2">
          <button
            className="btn btn-sm btn-light px-3"
            onClick={() => {
              document.getElementById("deleteModal").classList.toggle("show");
              document
                .getElementsByClassName("modal-backdrop")[0]
                .classList.toggle("show");
            }}
          >
            Cancel
          </button>
          <button
            className="btn btn-sm btn-dark px-3"
            onClick={() => {
              document.getElementById("deleteModal").classList.toggle("show");
              document
                .getElementsByClassName("modal-backdrop")[0]
                .classList.toggle("show");
              deleteAddress();
            }}
          >
            Confirm
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Address;
