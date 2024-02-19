import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { store } from "../Encryption";

const SignIn = ({ setIsLoggedIn }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const formSchema = yup.object().shape({
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required").min(8),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: formSchema,
    onSubmit: async (values) => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch("http://127.0.0.1:5555/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        if (!response.ok) {
          throw new Error("Invalid username or password.");
        }

        const data = await response.json();
        store(data);
        setIsLoggedIn(true);
        navigate("/profile");
      } catch (error) {
        setError("Error logging in. Please try again.");
        console.error("Error while signing in:", error);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="ui centered card">
      <h1>User Sign In Form</h1>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="username">Username</label>
        <br />
        <input
          className="ui input focus"
          id="username"
          name="username"
          onChange={formik.handleChange}
          value={formik.values.username}
        />
        <p style={{ color: "red" }}>{formik.errors.username}</p>

        <label htmlFor="password">Password</label>
        <br />
        <input
          className="ui input focus"
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        <p style={{ color: "red" }}>{formik.errors.password}</p>

        <button
          type="submit"
          disabled={loading}
          className="mini ui teal button"
          style={{ marginBottom: "30px" }}
        >
          {loading ? "Loading..." : "Submit"}
        </button>

        {error && <p style={{ color: "red" }}>{error}</p>}
      </form>

      <Link className="Back" to="/">
        Back to HomePage
      </Link>
    </div>
  );
};

export default SignIn;
