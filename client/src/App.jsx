//import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Mentee from "./components/Mentee";
import MentorshipRequestForm from "./components/MentorshipRequestForm";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/mentee" element={<Mentee />} />
        <Route path="/mentorship-request" element={<MentorshipRequestForm />} />
       
      </Routes>
    </BrowserRouter>
  );
};

export default App;

