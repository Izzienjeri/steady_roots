import React from "react";
import { useFormik } from "formik";
import { toast } from "react-toastify";

const Membership = () => {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      amount: "",
      mpesa_number: "",
      user_id: "", // Assuming you have some way to get the user ID
    },
    onSubmit: async (values) => {
      try {
        const response = await fetch("http://127.0.0.1:5555/apply_membership", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: values.amount,
            mpesa_number: values.mpesa_number,
            user_id: values.user_id,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to apply for membership");
        }

        const data = await response.json();
        toast.success(`Dear ${values.firstName}, ${data.message}`);
      } catch (error) {
        toast.error(error.message || "Failed to apply for membership");
      }
    },
  });

  return (
    <div>
      <h2>Apply for Membership</h2>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            placeholder="Enter your first name"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            placeholder="Enter your last name"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email Address:</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email address"
            value={formik.values.email}
            onChange={formik.handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            id="amount"
            name="amount"
            placeholder="Enter the membership amount"
            value={formik.values.amount}
            onChange={formik.handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="mpesa_number">MPESA Number:</label>
          <input
            type="text"
            id="mpesa_number"
            name="mpesa_number"
            placeholder="Enter your MPESA number"
            value={formik.values.mpesa_number}
            onChange={formik.handleChange}
            required
          />
        </div>
        <button type="submit">Apply</button>
      </form>
    </div>
  );
};

export default Membership;
