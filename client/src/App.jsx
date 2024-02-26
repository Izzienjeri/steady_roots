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
import ApprovePosts from "./ApprovePosts";
import CreatePosts from "./CreatePosts";
import withRoot from "./modules/withRoot";
import ManageUsers from "./ManageUsers";
import SendEmail from "./SendEmail";
import AdminDashboard from "./AdminDashboard";
import Experience from "./Experience";

function App() {
  return (
    <Router>
      <React.Fragment>
        <AppAppBar />
        <Routes>
          <Route path="/" element={<ProductHero />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="experiences" element={<Experience />} />
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
