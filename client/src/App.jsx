import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
<<<<<<< HEAD
import Signup from "./components/signup";
import Login from "./components/login";
import Home from "./components/home";
=======
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
import Experience from "./Experience";
>>>>>>> 1588d8dc6e7698bbb0a5b633f556ee0531950da1

function App() {
  return (
    <Router>
<<<<<<< HEAD
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
      </Routes>
=======
      <React.Fragment>
        <AppAppBar />
        <Routes>
          <Route path="/" element={<ProductHero />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/experiences" element={<Experience />} />
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
>>>>>>> 1588d8dc6e7698bbb0a5b633f556ee0531950da1
    </Router>
  );
}

export default App;
<<<<<<< HEAD

=======
>>>>>>> 1588d8dc6e7698bbb0a5b633f556ee0531950da1
