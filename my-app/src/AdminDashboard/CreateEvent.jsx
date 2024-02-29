import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  Card,
  CardContent,
  Button,
  Typography,
  TextField,
  Grid,
} from "@mui/material";
import "./CreateEvents.css"; // Import your CSS file

const CreateEvents = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [image, setImage] = useState("");
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch("http://127.0.0.1:5555/events", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setEvents(data);
      } else {
        console.error("Failed to fetch events:", response.statusText);
        notifyError("Failed to fetch events!");
      }
    } catch (error) {
      console.error("Error fetching events:", error);
      notifyError("Error fetching events!");
    }
  };

  const notifySuccess = (message) => toast.success(message);
  const notifyError = (message) => toast.error(message);

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
    <div className="create-events-container">
      <Typography variant="h2" gutterBottom style={{ textAlign: "center" }}>
        Create New Event
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="name"
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="description"
              label="Description"
              multiline
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="date"
              label="Date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              id="image"
              label="Image URL"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Create Event
            </Button>
          </Grid>
        </Grid>
      </form>
      <h2>Events</h2>
      <div className="events-container">
        {events.map((event) => (
          <Card
            key={event.id}
            className="event-card"
            style={{
              transition: "transform 0.2s",
              ":hover": { transform: "scale(1.05)" },
            }}
          >
            <CardContent>
              <Typography variant="h5" component="div">
                {event.name}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {event.description}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Date: {event.date}
              </Typography>
              <img src={event.image} alt={event.name} className="event-image" />
            </CardContent>
            <div className="card-actions">
              <Button
                onClick={() => handleDelete(event.id)}
                variant="contained"
                color="secondary"
              >
                Delete
              </Button>
            </div>
          </Card>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
};

export default CreateEvents;
