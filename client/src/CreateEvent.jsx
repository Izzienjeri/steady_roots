import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateEvents = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [image, setImage] = useState("");
  const [events, setEvents] = useState([]);

  const notifySuccess = (message) => toast.success(message);
  const notifyError = (message) => toast.error(message);

  useEffect(() => {
    fetchEvents();
  }, []); // Fetch events on component mount

  const fetchEvents = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch("http://127.0.0.1:5555/events", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        setEvents(data);
      } else {
        console.error("Failed to fetch events:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch("http://127.0.0.1:5555/events", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
          date,
          image,
          user_id: "", // Set user_id as needed
          approved: false,
        }),
      });
      if (response.ok) {
        console.log("Event created successfully.");
        setName("");
        setDescription("");
        setDate("");
        setImage("");
        notifySuccess("Event created successfully!");
        // Fetch events again after successful creation
        fetchEvents();
      } else {
        console.error("Failed to create event:", response.statusText);
        notifyError("Failed to create event!");
      }
    } catch (error) {
      console.error("Error creating event:", error);
      notifyError("Error creating event!");
    }
  };

  const handleDelete = async (eventId) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(`http://127.0.0.1:5555/events/${eventId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        notifySuccess("Event deleted successfully!");
        fetchEvents();
      } else {
        console.error("Failed to delete event:", response.statusText);
        notifyError("Failed to delete event!");
      }
    } catch (error) {
      console.error("Error deleting event:", error);
      notifyError("Error deleting event!");
    }
  };

  return (
    <div>
      <h2>Create New Event</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="image">Image URL:</label>
          <input
            type="text"
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Event</button>
      </form>
      <h2>Events</h2>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            <div>
              <h3>{event.name}</h3>
              <p>{event.description}</p>
              <p>Date: {event.date}</p>
              <img src={event.image} alt={event.name} />
            </div>
            <button onClick={() => handleDelete(event.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <ToastContainer />
    </div>
  );
};
export default CreateEvents;