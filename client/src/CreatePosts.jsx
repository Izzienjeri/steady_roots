import React from "react";
import { useFormik } from "formik";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreatePosts = () => {
  const initialValues = {
    title: "",
    description: "",
    image: "",
  };

  const onSubmit = async (values) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch("http://127.0.0.1:5555/posts", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          date_posted: new Date().toISOString(),
          approved: false,
        }),
      });
      if (response.ok) {
        console.log("Post created successfully");
        formik.resetForm();
        toast.success("Post created successfully!");
      } else {
        console.error("Failed to create post:", response.statusText);
        toast.error("Failed to create post!");
      }
    } catch (error) {
      console.error("Error creating post:", error);
      toast.error("Error creating post!");
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
  });

  return (
    <div>
      <h2>Create New Post</h2>
      <form onSubmit={formik.handleSubmit}>
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Title"
          {...formik.getFieldProps("title")}
          required
        />
        <textarea
          id="description"
          name="description"
          placeholder="Description"
          {...formik.getFieldProps("description")}
          required
        />
        <input
          type="text"
          id="image"
          name="image"
          placeholder="Image URL"
          {...formik.getFieldProps("image")}
          required
        />
        <button type="submit">Create Post</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default CreatePosts;
