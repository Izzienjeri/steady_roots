import React, { useState } from "react";
import { useFormik } from "formik";
import { toast, ToastContainer } from "react-toastify";
import { Container, Typography, TextField, Button, Box } from "@mui/material";

const Membership = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      amount: "",
      mpesa_number: "",
      user_id: "",
    },
    onSubmit: async (values, { resetForm }) => {
      setIsSubmitting(true); // Disable button
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

        resetForm();
        const data = await response.json();
        toast.success(
          `Dear ${values.firstName}. Please expect an Mpesa prompt soon.`
        );
      } catch (error) {
        toast.error(error.message || "Failed to apply for membership");
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  return (
    <Container maxWidth="sm">
      <ToastContainer />
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h2" gutterBottom>
          Apply for Membership
        </Typography>
      </Box>
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        sx={{ "& > :not(style)": { my: 1 } }}
      >
        <TextField
          fullWidth
          id="firstName"
          name="firstName"
          label="First Name"
          placeholder="Enter your first name"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          required
        />
        <TextField
          fullWidth
          id="lastName"
          name="lastName"
          label="Last Name"
          placeholder="Enter your last name"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          required
        />
        <TextField
          fullWidth
          id="email"
          name="email"
          type="email"
          label="Email Address"
          placeholder="Enter your email address"
          value={formik.values.email}
          onChange={formik.handleChange}
          required
        />
        <TextField
          fullWidth
          id="amount"
          name="amount"
          type="number"
          label="Amount"
          placeholder="Enter the membership amount"
          value={formik.values.amount}
          onChange={formik.handleChange}
          required
        />
        <TextField
          fullWidth
          id="mpesa_number"
          name="mpesa_number"
          label="MPESA Number"
          placeholder="254123456789"
          value={formik.values.mpesa_number}
          onChange={formik.handleChange}
          required
        />
        <Button type="submit" variant="contained" disabled={isSubmitting}>
          Apply
        </Button>
      </Box>
    </Container>
  );
};

export default Membership;
