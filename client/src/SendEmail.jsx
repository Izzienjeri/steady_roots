import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Formik, Form, Field } from "formik";

const SendEmail = () => {
  const initialValues = {
    recipient_email: "",
    subject: "",
    body: "",
    sender_email: "",
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (values, { resetForm }) => {
    try {
      setIsSubmitting(true);

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
  };

  return (
    <div>
      <h2>Send Email</h2>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label>Recipient Email:</label>
              <Field type="email" name="recipient_email" required />
            </div>
            <div>
              <label>Subject:</label>
              <Field type="text" name="subject" required />
            </div>
            <div>
              <label>Body:</label>
              <Field as="textarea" name="body" required />
            </div>
            <div>
              <label>Sender Email:</label>
              <Field type="email" name="sender_email" required />
            </div>
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Send Email"}
            </button>
          </Form>
        )}
      </Formik>
      <ToastContainer />
    </div>
  );
};

export default SendEmail;
