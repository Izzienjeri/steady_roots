import React, { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";

const Events = () => {
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

  return (
    <div style={{ padding: "20px" }}>
      <Typography variant="h2" gutterBottom style={{ textAlign: "center" }}>
        Events
      </Typography>

      <Grid container spacing={2}>
        {events.map((event) => (
          <Grid item key={event.id} xs={12} sm={6} md={4}>
            <Card
              style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                backgroundColor: "rgb(238, 236, 246)",
                transition: "background-color 0.3s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <CardContent style={{ flexGrow: 1 }}>
                <Typography
                  variant="h5"
                  component="h2"
                  style={{ fontSize: "24px", marginBottom: "10px" }}
                >
                  {event.name}
                </Typography>
                <Typography variant="body2" component="p">
                  {event.description}
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  Date: {event.date}
                </Typography>
                <img
                  src={event.image}
                  alt={event.name}
                  style={{ width: "100%", height: "auto" }}
                />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <ToastContainer />
    </div>
  );
};

export default Events;
