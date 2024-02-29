import React, { useState } from "react";
import { useFormik } from "formik";
import { toast, ToastContainer } from "react-toastify";
import { Container, Typography, TextField, Button, Box } from "@mui/material";

const SendEmail = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formik = useFormik({
    initialValues: {
      recipient_email: "",
      subject: "",
      body: "",
      sender_email: "",
    },
    onSubmit: async (values, { resetForm }) => {
      setIsSubmitting(true);

      try {
        const response = await fetch("http://127.0.0.1:5555/send-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });

        if (response.ok) {
          toast.success("Email sent successfully");
          resetForm();
        } else {
          const data = await response.json();
          toast.error(data.message);
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error("Failed to send email");
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
          Send Email
        </Typography>
      </Box>
      <Box
        component="form"
        onSubmit={formik.handleSubmit}
        sx={{ "& > :not(style)": { my: 1 } }}
      >
        <TextField
          fullWidth
          id="recipient_email"
          name="recipient_email"
          label="Recipient Email"
          placeholder="Enter recipient's email address"
          value={formik.values.recipient_email}
          onChange={formik.handleChange}
          required
        />
        <TextField
          fullWidth
          id="subject"
          name="subject"
          label="Subject"
          placeholder="Enter email subject"
          value={formik.values.subject}
          onChange={formik.handleChange}
          required
        />
        <TextField
          fullWidth
          id="body"
          name="body"
          multiline
          rows={4}
          label="Body"
          placeholder="Enter email body"
          value={formik.values.body}
          onChange={formik.handleChange}
          required
        />
        <Button type="submit" variant="contained" disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Send Email"}
        </Button>
      </Box>
    </Container>
  );
};

export default SendEmail;
