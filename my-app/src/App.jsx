import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./Signin";
import SignUp from "./Signup";
import ProductCategories from "./modules/views/ProductCategories";
import ProductSmokingHero from "./modules/views/ProductSmokingHero";
import AppFooter from "./modules/views/AppFooter";
import ProductHero from "./modules/views/ProductHero";
import ProductValues from "./modules/views/ProductValues";
import ProductHowItWorks from "./modules/views/ProductHowItWorks";
import ProductCTA from "./modules/views/ProductCTA";
import AppAppBar from "./modules/views/AppAppBar";
import ApprovePosts from "./AdminDashboard/ApprovePosts";
import withRoot from "./modules/withRoot";
import ManageUsers from "./AdminDashboard/ManageUsers";
import SendEmail from "./AdminDashboard/SendEmail";
import AdminDashboard from "./AdminDashboard/AdminDashboard";
import Dashboard from "./Dashboard/Dashboard";
import CreateEvent from "./AdminDashboard/CreateEvent";
import Events from "./Dashboard/Event";
import Membership from "./Dashboard/Membership";
import Course from "./Dashboard/Course";
import CreatePosts from "./Dashboard/CreatePosts";
import Experience from "./Dashboard/Experience";
import Profile from "./AdminDashboard/Profile";
import Skill from "./Dashboard/Skill";

function App() {
  return (
    <Router>
      <React.Fragment>
        <AppAppBar />
        <Routes>
          <Route path="/" element={<ProductHero />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/events" element={<Events />} />
          <Route path="/courses" element={<Course />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/membership" element={<Membership />} />
          <Route path="/experiences" element={<Experience />} />
          <Route path="/createevents" element={<CreateEvent />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admindashboard" element={<AdminDashboard />} />
          <Route path="/sendemail" element={<SendEmail />} />
          <Route path="/manageusers" element={<ManageUsers />} />
          <Route path="/createposts" element={<CreatePosts />} />
          <Route path="/approveposts" element={<ApprovePosts />} />
          <Route path="/skills" element={<Skill />} />

        </Routes>
        <ProductValues />
        <ProductCategories />
        <ProductHowItWorks />
        <ProductCTA />
        <ProductSmokingHero />
        <AppFooter />
      </React.Fragment>
    </Router>
  );
}

export default withRoot(App);
