import React from "react";
import FormComponent from "../FormComponent/FormComponent";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Signup = () => {
  const navigate = useNavigate();

  const fields = [
    { name: "name", label: "Name", type: "text" },
    { name: "email", label: "Email Address", type: "email" },
    { name: "password", label: "Password", type: "password" },
  ];

  const initialValues = { name: "", email: "", password: "" };

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Name should atleast have 3 characters")
      .required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .min(8, "Password is too short - should be 8 chars minimum.")
      .matches(/[a-z]/, "Password must contain at least one lowercase char.")
      .matches(/[A-Z]/, "Password must contain at least one uppercase char.")
      .matches(/[0-9]/, "Password must contain at least one number.")
      .matches(
        /[@$!%*#?&]/,
        "Password must contain at least one special char (@,!,#, etc)."
      )
      .required("No password provided."),
  });

  const handleSignup = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/users/register",
        values
      );

      const loginResponse = await axios.post(
        "http://localhost:8080/users/login",
        { email: values.email, password: values.password }
      );

      localStorage.setItem("user", loginResponse.data.user);
      localStorage.setItem("token", loginResponse.data.token);

      if (loginResponse.data.token) {
        navigate("/");
      }
      toast.success(response.data.message);
    } catch (error) {
      console.log(error);

      if (error.response) toast.error(error.response.data.message);
      else toast.error(error.message);
    }
  };

  const onSubmit = (values, { setSubmitting }) => {
    handleSignup(values);
    setSubmitting(false);
  };

  return (
    <div className="container-fluid row">
      <div className="login-img col-6">
        <img
          src="https://content.fortune.com/wp-content/uploads/2016/08/nike_app_athletes.jpg?w=1440&q=75"
          alt="login"
          width="100%"
        />
      </div>
      <div className="col-6">
        <FormComponent
          fields={fields}
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        />
      </div>
    </div>
  );
};

export default Signup;
