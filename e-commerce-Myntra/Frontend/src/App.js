import React, { useEffect, useState } from "react";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "../node_modules/font-awesome/css/font-awesome.min.css";
import { Switch, Route, Redirect } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Myntra from "./components/Myntra";
import Footer from "./components/Footer";
import Products from "./components/Products";
import Bag from "./components/Bag";
import Login from "./components/LoginSignup";
import CreateAccount from "./components/CreateAcc";
import Profile from "./components/Profile";
import SignUp from "./components/SignUp";
import Orders from "./components/profile/Orders";
import MyntraCredit from "./components/profile/MyntraCredit";
import MynCash from "./components/profile/MynCash";
import Cards from "./components/profile/Cards";
import Vpa from "./components/profile/Vpa";
import Addresses from "./components/profile/Addresses";
import Coupons from "./components/profile/Coupons";
import ProfileDetails from "./components/profile/ProfileDetails";
import Otp from "./components/Otp";
import LoginUsingPassword from "./components/LoginUsingPassword";
import ResetPassword from "./components/ResetPassword";

const App = () => {
  useEffect(() => {
    document.title = `Online Shopping for Women, Men, Kids Fashion & Lifestyle - Myntra`;
  });
  return (
    <section>
      <div className="app">
        <Switch>
          <Route exact path="/myntra/:id/bag" component={Bag} />
          <div>
            <Navbar />
            <Route exact path="/" component={Home} />
            <Route exact path="/myntra" component={Myntra} />
            <Route exact path="/myntra/:id" component={Products} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/login/:no" component={Otp} />
            <Route exact path="/:no/createAccount" component={CreateAccount} />
            <Route exact path="/:no/createAccount/signup/" component={SignUp} />
            <Route exact path="/orders" component={Orders} />
            <Route exact path="/credit" component={MyntraCredit} />
            <Route exact path="/myncash" component={MynCash} />
            <Route exact path="/cards" component={Cards} />
            <Route exact path="/upi" component={Vpa} />
            <Route exact path="/address" component={Addresses} />
            <Route exact path="/coupons" component={Coupons} />
            <Route exact path="/editProfile" component={ProfileDetails} />
            <Route exact path="/password" component={LoginUsingPassword} />
            <Route exact path="/forgot" component={ResetPassword} />
          </div>
        </Switch>
        <Footer />
      </div>
    </section>
  );
};
export default App;