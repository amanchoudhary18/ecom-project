import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [user, setUser] = useState();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (values) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/users/login",
        values
      );

      setUser(response.data.user);

      localStorage.setItem("user", response.data.user);
      localStorage.setItem("token", response.data.token);

      if (response.data.token) {
        navigate("/");
      }

      toast.success(response.data.message);
    } catch (error) {
      console.log(error);

      if (error.response) toast.error(error.response.data.message);
      else toast(error.message);
    }
  };

  return (
    <div className="container-fluid row">
      <div className="login-img col-3"></div>
      <div className="col-6">
        <Formik
          initialValues={{ email: "", password: "" }}
          initialTouched={{ email: true }}
          validationSchema={Yup.object({
            email: Yup.string()
              .email("Invalid email address")
              .required("Required"),
            password: Yup.string()
              .min(8, "Password is too short - should be 8 chars minimum.")
              .matches(
                /[a-z]/,
                "Password must contain at least one lowercase char."
              )
              .matches(
                /[A-Z]/,
                "Password must contain at least one uppercase char."
              )
              .matches(
                /[a-zA-Z]+[^a-zA-Z\s]+/,
                "at least 1 number or special char (@,!,#, etc)."
              )
              .required("No password provided."),
          })}
          onSubmit={(values, { setSubmitting }) => {
            handleLogin(values);
            setSubmitting(false);
          }}
        >
          {(formik) => (
            <Form className="mt-3">
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <Field
                  name="email"
                  type="email"
                  className={`form-control ${
                    formik.touched.email && formik.errors.email
                      ? "is-invalid"
                      : ""
                  }`}
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="invalid-feedback"
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <Field
                  name="password"
                  type={showPassword ? "text" : "password"}
                  className={`form-control ${
                    formik.touched.password && formik.errors.password
                      ? "is-invalid"
                      : ""
                  }`}
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="invalid-feedback"
                />
              </div>

              <div className="form-check mt-3">
                <Field
                  type="checkbox"
                  onClick={handleShowPassword}
                  checked={showPassword}
                  className="form-check-input"
                  id="showPasswordCheck"
                />
                <label className="form-check-label" htmlFor="showPasswordCheck">
                  Show Password
                </label>
              </div>

              <button type="submit" className="btn btn-primary mt-3">
                Submit
              </button>
            </Form>
          )}
        </Formik>
      </div>
      <div className="login-img col-3"></div>
    </div>
  );
};

export default LoginForm;
