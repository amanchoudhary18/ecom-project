// FormComponent.js
import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";

const FormComponent = ({
  fields,
  initialValues,
  validationSchema,
  onSubmit,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => (
        <Form className="mt-3">
          {fields.map((field) => (
            <div className="form-group" key={field.name}>
              <label htmlFor={field.name}>{field.label}</label>
              <Field
                name={field.name}
                type={
                  field.type === "password"
                    ? showPassword
                      ? "text"
                      : "password"
                    : field.type
                }
                className={`form-control my-2 ${
                  formik.touched[field.name] && formik.errors[field.name]
                    ? "is-invalid"
                    : ""
                }`}
              />
              {field.type === "password" && (
                <div>
                  <input type="checkbox" onClick={handleShowPassword} />
                  <span className="ms-2">Show password</span>
                </div>
              )}
              <ErrorMessage
                name={field.name}
                component="div"
                className="invalid-feedback"
              />
            </div>
          ))}
          <button
            type="submit"
            className="btn btn-primary mt-3"
            disabled={!formik.isValid || formik.isSubmitting}
          >
            Submit
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default FormComponent;
