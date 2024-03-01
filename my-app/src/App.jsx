import React, { useState } from "react";
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
import CreateProfile from "./AdminDashboard/CreateProfile";
import EditProfile from "./AdminDashboard/EditProfile";
import Profile from "./AdminDashboard/Profile";
import ProfilePage from "./AdminDashboard/ProfilePage";
import CreateProfile2 from "./Dashboard/CreateProfile2";
import EditProfile2 from "./Dashboard/EditProfile2";
import Profile2 from "./Dashboard/Profile2";
import ProfilePage2 from "./Dashboard/ProfilePage2";
import Logout from "./Logout";
import AppAppBar from "./modules/views/AppAppBar";
import Mentorship from "./Dashboard/Mentorship";

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false);

  return (
    <Router>
      <React.Fragment>
        {!isSignedIn && <AppAppBar />}
        <Routes>
          <Route path="/" element={<ProductHero />} />
          <Route
            path="/signin"
            element={<SignIn onSignIn={() => setIsSignedIn(true)} />}
          />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/events" element={<Events />} />
          <Route path="/courses" element={<Course />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/profilepage" element={<ProfilePage />} />
          <Route path="/createprofile" element={<CreateProfile />} />
          <Route path="/editprofile" element={<EditProfile />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profilepage2" element={<ProfilePage2 />} />
          <Route path="/createprofile2" element={<CreateProfile2 />} />
          <Route path="/editprofile2" element={<EditProfile2 />} />
          <Route path="/profile2" element={<Profile2 />} />
          <Route path="/mentorship" element={<Mentorship />} />
          <Route path="/membership" element={<Membership />} />
          <Route path="/experiences" element={<Experience />} />
          <Route path="/createevents" element={<CreateEvent />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admindashboard" element={<AdminDashboard />} />
          <Route path="/sendemail" element={<SendEmail />} />
          <Route path="/manageusers" element={<ManageUsers />} />
          <Route path="/createposts" element={<CreatePosts />} />
          <Route path="/approveposts" element={<ApprovePosts />} />
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
