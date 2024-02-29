import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateProfile = () => {
  const initialValues = {
    first_name: "",
    last_name: "",
    photo_url: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    first_name: Yup.string().required("First Name is required"),
    last_name: Yup.string().required("Last Name is required"),
    photo_url: Yup.string().required("Photo URL is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch("http://127.0.0.1:5555/profiles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(values),
      });
      if (response.ok) {
        toast.success("Profile created successfully");
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message);
      }
    } catch (error) {
      toast.error(error.message || "Failed to create profile");
    }
    setSubmitting(false);
  };

  return (
    <div>
      <h2>Create Profile</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor="first_name">First Name:</label>
              <Field type="text" name="first_name" />
              <ErrorMessage
                name="first_name"
                component="div"
                className="error"
              />
            </div>
            <div>
              <label htmlFor="last_name">Last Name:</label>
              <Field type="text" name="last_name" />
              <ErrorMessage
                name="last_name"
                component="div"
                className="error"
              />
            </div>
            <div>
              <label htmlFor="photo_url">Photo URL:</label>
              <Field type="text" name="photo_url" />
              <ErrorMessage
                name="photo_url"
                component="div"
                className="error"
              />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <Field type="password" name="password" />
              <ErrorMessage name="password" component="div" className="error" />
            </div>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating Profile..." : "Create Profile"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateProfile;
