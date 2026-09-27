import React, { useEffect, useState } from "react";
import { userProfile } from "../Data/Data";
import address from "./images/profile-address.png";
import cards from "./images/profile-cards.png";
import collections from "./images/profile-collections.png";
import coupons from "./images/profile-coupons.png";
import edit from "./images/profile-edit.png";
import credit from "./images/profile-myntra-credit.png";
import orders from "./images/profile-orders.png";
import upiIcon from "./images/upiIcon.png";
import points from "./images/profile-myntrapoints.png";
import creditImg from "./images/creditImg.png";
import upi from "./images/upi.png";
import StarsRating from "stars-rating";
import Accordion from "react-bootstrap/Accordion";
import { NavLink } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Swal from "sweetalert2";
import axios from 'axios'

function Profile() {
  window.scroll(0, 0);

  useEffect(() => {
    getData();
  },[]);
  const [userData, setUserData] = useState([]);
  const getData = () => {
    axios
      .get("/profile")
      .then((e) => {
        setUserData(e.data.data);
        console.log(e.data.data);
      })
      .catch((err) => console.log(err));
  };

  const [isActive, setActive] = useState(false);

  const setAddress = () => {
    var a = document.getElementById("default");
    var b = document.getElementById("other");
    if (a.style.display === "block") {
      a.style.display = "none";
      b.style.display = "block";
    } else {
      a.style.display = "block";
      b.style.display = "none";
    }
  };

  const [user, setUser] = useState({
    name: "",
    email: "",
    gender: "",
    number: "",
    password: "",
    dob: "",
    location: "",
    alternateNumber: "",
    hint: "",
  });

  let name, value;
  const handleInputs = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value });
  };

  const PostData = async (e) => {
    e.preventDefault();
    const {
      name,
      email,
      gender,
      number,
      password,
      dob,
      location,
      alternateNumber,
      hint,
    } = user;
    const birth = dob.split('-') //[dd, mm, yyyy]
    const birthDate = `${birth[2]}-${birth[1]}-${birth[0]}}`
    const res = await fetch("/edit-profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        gender,
        number,
        password,
        birthDate,
        location,
        alternateNumber,
        hint,
      }),
    });
    const data = await res.json();
    if (res.status === 200) {
      Swal.fire("", "Profile Updated", "success", {
        timer: 2200,
        buttons: false,
      });
      console.log("SignUp Successful");
    } else {
      Swal.fire("", "Invalid Credentials!", "error", {
        timer: 2200,
        buttons: false,
      });
      console.log("Invalid Credentials");
    }
  };
  return (
    <section id="userProfile">
      <div className="backdrop" id="backdrop">
        .
      </div>
      <div
        className="container-lg mt-5 container-fluid"
        id="profile"
        style={{ maxWidth: "1000px" }}
      >
        <div className="mt-3" style={{ borderBottom: "1px solid #8080804d" }}>
          <div style={{ fontWeight: "700", fontSize: "19px" }}>Account</div>
          <div className="mb-3" style={{ fontSize: "12px" }}>
            User
          </div>
        </div>
        <div className="d-flex">
          <div
            className="nav nav-tabs list-unstyled d-block pt-4"
            style={{ width: "250px", borderRight: "1px solid #8080804d" }}
          >
            <li
              className="active tab"
              href="#overview"
              data-toggle="tab"
              type="button"
            >
              Overview
            </li>
            <hr className="my-4 mr-5"></hr>
            <div
              className="my-3"
              style={{ color: "#7e818c", fontSize: "12px" }}
            >
              ORDERS
            </div>
            <li className="tab" href="#orders" data-toggle="tab" type="button">
              Orders & Returns
            </li>
            <hr className="my-4 mr-5"></hr>
            <div
              className="my-3"
              style={{ color: "#7e818c", fontSize: "12px" }}
            >
              CREDITS
            </div>
            <li className="tab" href="#coupons" data-toggle="tab" type="button">
              Coupons
            </li>
            <li
              className="tab py-1"
              href="#credit"
              data-toggle="tab"
              type="button"
            >
              Myntra Credit
            </li>
            <li className="tab" href="#myncash" data-toggle="tab" type="button">
              MynCash
            </li>
            <hr className="my-4 mr-5"></hr>
            <div
              className="my-3"
              style={{ color: "#7e818c", fontSize: "12px" }}
            >
              ACCOUNT
            </div>
            <li
              className="tab py-1"
              href="#profile1"
              data-toggle="tab"
              type="button"
            >
              Profile
            </li>
            <li className="tab" href="#cards" data-toggle="tab" type="button">
              Saved Cards
            </li>
            <li
              className="tab py-1"
              href="#vpa"
              data-toggle="tab"
              type="button"
            >
              Saved VPA
            </li>
            <li
              className="tab"
              href="#address"
              data-toggle="tab"
              type="button"
              onClick={setAddress}
            >
              Addresses
            </li>
            <li
              className="tab pt-1"
              href="#insider"
              data-toggle="tab"
              type="button"
            >
              Myntra Insider
            </li>
            <hr className="my-4 mr-5"></hr>
            <div
              className="my-3"
              style={{ color: "#7e818c", fontSize: "12px" }}
            >
              LEGAL
            </div>
            <li className="tab" href="#address" data-toggle="tab" type="button">
              Terms of Use
            </li>
            <li
              className="tab pt-1"
              href="#insider"
              data-toggle="tab"
              type="button"
            >
              Privacy Policy
            </li>
          </div>

          <div className="m-4 w-100">
            <div className="tab-content">
              <div id="overview" className="active tab-pane w-100">
                <div
                  className="d-flex"
                  style={{ padding: "35px", background: "#eee" }}
                >
                  <div
                    className="fa fa-user bg-dark justify-content-center d-flex align-items-end"
                    style={{
                      fontSize: "110px",
                      color: "#eee",
                      height: "130px",
                      width: "130px",
                    }}
                  ></div>
                  <div
                    className="btn btn-transparent ml-auto"
                    style={{
                      fontSize: "12px",
                      border: "1px solid black",
                      height: "fit-content",
                      fontWeight: "500",
                    }}
                  >
                    EDIT PROFILE
                  </div>
                </div>
                <div className="row gx-0">
                  <div className="col-lg-4 col-md-4 col-6 align-items-center d-flex justify-content-center pr-lg-2 pr-md-2 pt-3">
                    <div
                      className="text-center py-5 overviewCards"
                      style={{ border: "1px solid #8080804d", width: "100%" }}
                    >
                      <img
                        src={orders}
                        className="img-fluid mb-4"
                        style={{ width: "40px" }}
                      />
                      <div style={{ fontSize: "15px", fontWeight: "500" }}>
                        Orders
                      </div>
                      <div style={{ fontSize: "12px", color: "#94969F" }}>
                        Check your order status
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-6 align-items-center d-flex justify-content-center px-lg-2 px-md-2 pt-3">
                    <div
                      className="text-center py-5 overviewCards"
                      style={{ border: "1px solid #8080804d", width: "100%" }}
                    >
                      <img
                        src={collections}
                        className="img-fluid mb-4"
                        style={{ width: "40px" }}
                      />
                      <div style={{ fontSize: "15px", fontWeight: "500" }}>
                        Collections & Wishlist
                      </div>
                      <div style={{ fontSize: "12px", color: "#94969F" }}>
                        All your curated products collections
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-6 align-items-center d-flex justify-content-center pl-lg-2 pl-md-2 pt-3">
                    <div
                      className="text-center py-5 overviewCards"
                      style={{ border: "1px solid #8080804d", width: "100%" }}
                    >
                      <img
                        src={credit}
                        className="img-fluid mb-4"
                        style={{ width: "40px" }}
                      />
                      <div style={{ fontSize: "15px", fontWeight: "500" }}>
                        Myntra Credit
                      </div>
                      <div style={{ fontSize: "12px", color: "#94969F" }}>
                        Manage aur your refunds & gift cards
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-6 align-items-center d-flex justify-content-center pr-lg-2 pr-md-2 pt-3">
                    <div
                      className="text-center py-5 overviewCards"
                      style={{ border: "1px solid #8080804d", width: "100%" }}
                    >
                      <img
                        src={points}
                        className="img-fluid mb-4"
                        style={{ width: "40px" }}
                      />
                      <div style={{ fontSize: "15px", fontWeight: "500" }}>
                        MynCash
                      </div>
                      <div style={{ fontSize: "12px", color: "#94969F" }}>
                        Earn MynCash as you shop and use them in checkout
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-6 align-items-center d-flex justify-content-center px-lg-2 px-md-2 pt-3">
                    <div
                      className="text-center py-5 overviewCards"
                      style={{ border: "1px solid #8080804d", width: "100%" }}
                    >
                      <img
                        src={cards}
                        className="img-fluid mb-4"
                        style={{ width: "40px" }}
                      />
                      <div style={{ fontSize: "15px", fontWeight: "500" }}>
                        Saved Cards
                      </div>
                      <div style={{ fontSize: "12px", color: "#94969F" }}>
                        Save your card for faster checkout
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-6 align-items-center d-flex justify-content-center pl-lg-2 pl-md-2 pt-3">
                    <div
                      className="text-center py-5 overviewCards"
                      style={{ border: "1px solid #8080804d", width: "100%" }}
                    >
                      <img
                        src={upiIcon}
                        className="img-fluid mb-4"
                        style={{ width: "40px" }}
                      />
                      <div style={{ fontSize: "15px", fontWeight: "500" }}>
                        Saved VPA
                      </div>
                      <div style={{ fontSize: "12px", color: "#94969F" }}>
                        View your saved VPA
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-6 align-items-center d-flex justify-content-center pr-lg-2 pr-md-2 pt-3">
                    <div
                      className="text-center py-5 overviewCards"
                      style={{ border: "1px solid #8080804d", width: "100%" }}
                    >
                      <img
                        src={address}
                        className="img-fluid mb-4"
                        style={{ width: "40px" }}
                      />
                      <div style={{ fontSize: "15px", fontWeight: "500" }}>
                        Addresses
                      </div>
                      <div style={{ fontSize: "12px", color: "#94969F" }}>
                        Save addresses for a hassle-free checkout
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-6 align-items-center d-flex justify-content-center px-lg-2 px-md-2 pt-3">
                    <div
                      className="text-center py-5 overviewCards"
                      style={{ border: "1px solid #8080804d", width: "100%" }}
                    >
                      <img
                        src={coupons}
                        className="img-fluid mb-4"
                        style={{ width: "40px" }}
                      />
                      <div style={{ fontSize: "15px", fontWeight: "500" }}>
                        Coupons
                      </div>
                      <div style={{ fontSize: "12px", color: "#94969F" }}>
                        Manage coupons for additional discounts
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-6 align-items-center d-flex justify-content-center pl-lg-2 pl-md-2 pt-3">
                    <div
                      className="text-center py-5 overviewCards"
                      style={{ border: "1px solid #8080804d", width: "100%" }}
                    >
                      <img
                        src={edit}
                        className="img-fluid mb-4"
                        style={{ width: "40px" }}
                      />
                      <div style={{ fontSize: "15px", fontWeight: "500" }}>
                        Profile Details
                      </div>
                      <div style={{ fontSize: "12px", color: "#94969F" }}>
                        Change your profile details & passwords
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-5">
                  <div
                    className="btn btn-danger border-0 w-25 my-2 py-3"
                    style={{ background: "rgb(255, 63, 108)" }}
                  >
                    <b>LOGOUT</b>
                  </div>
                </div>
              </div>
              <div id="orders" className="tab-pane fade">
                <div
                  className="d-flex p-3 align-items-center"
                  style={{
                    backgroundImage: "linear-gradient(270deg,#f9daff,#dfefff)",
                  }}
                >
                  <div className="">
                    <div style={{ fontWeight: "500" }}>MYNTRA INSIDER</div>
                    <div style={{ fontSize: "12px" }}>
                      Earn 10 insider points for every ₹ 100 purchase
                    </div>
                  </div>
                  <div
                    className="btn btn-danger p-0 align-items-center d-flex px-2 ml-auto"
                    style={{
                      height: "28px",
                      fontWeight: "500",
                      fontSize: "12px",
                      lineHeight: "0",
                    }}
                  >
                    Enroll Now
                  </div>
                </div>
                <div className="d-flex p-3">
                  <div>
                    <div style={{ fontSize: "18px", fontWeight: "600" }}>
                      All Orders
                    </div>
                    <div style={{ fontSize: "14px" }}>from anytime</div>
                  </div>
                  <div className="d-flex align-items-center mr-3 position-relative ml-auto">
                    <div
                      className="fa fa-search pl-3"
                      style={{
                        zIndex: "1",
                        color: "#808080d4",
                        position: "absolute",
                      }}
                    ></div>
                    <input
                      className="form-control pl-5 shadow-none position-relative w-100"
                      type="search"
                      style={{ height: "45px" }}
                      placeholder="Search in orders"
                      aria-label="Search"
                    />
                    <div
                      className="btn btn-dark bg-transparent text-dark align-items-center ml-3 d-flex"
                      style={{ height: "45px", borderColor: "#ced4da" }}
                    >
                      <span className="fa fa-sliders fa-lg pr-2"></span>
                      <span style={{ fontWeight: "500" }}>Filter</span>
                    </div>
                  </div>
                </div>
                <div className="px-3 pb-3" style={{ background: "#f5f5f5" }}>
                  <div className="pt-3">
                    <div className="bg-white p-3">
                      <div className="d-flex align-items-center">
                        <div
                          className="fa fa-dropbox text-white align-items-center d-flex justify-content-center bg-dark fa-lg"
                          style={{
                            borderRadius: "50%",
                            height: "50px",
                            width: "50px",
                          }}
                        ></div>
                        <div className="pl-3">
                          <div
                            className="text-info"
                            style={{ fontWeight: "500" }}
                          >
                            Delivered
                          </div>
                          <div className="" style={{ fontSize: "14px" }}>
                            On Tue, 15 Nov |{" "}
                            <img src="https://myntraweb.blob.core.windows.net/selfserveui/assets/svg/mexpress-tag.svg" />
                          </div>
                        </div>
                      </div>

                      <div
                        className="mt-4 deliveredCard"
                        style={{ background: "#f5f5f5", transition: "0.3s" }}
                      >
                        <div className="d-flex p-3 align-items-center">
                          <img
                            src={collections}
                            style={{ height: "70px", width: "53px" }}
                          />
                          <div className="pl-4">
                            <div>Roadster</div>
                            <div>Men Grey Solid Padded Jacket</div>
                            <div>Size: M</div>
                          </div>
                          <div className="fa fa-angle-right fa-2x ml-auto"></div>
                        </div>
                        <div className="d-flex pb-3">
                          <div
                            className="btn btn-dark bg-white text-dark mx-3"
                            style={{ borderColor: "#ced4da", width: "100%" }}
                          >
                            EXCHANGE
                          </div>
                          <div
                            className="btn btn-dark bg-white text-dark mx-3"
                            style={{ borderColor: "#ced4da", width: "100%" }}
                          >
                            RETURN
                          </div>
                        </div>
                      </div>

                      <div
                        className="d-flex px-3 align-items-center"
                        style={{ background: "#f5f5f5", marginTop: "2px" }}
                      >
                        <div style={{ color: "#696e79" }}>Rate Product</div>
                        <StarsRating
                          className="float-lg-right pl-3 mb-1 sliderRate justify-content-center d-flex"
                          count={5}
                          onChange={(e) => console.log(e)}
                          size={35}
                          color2={"rgb(255, 63, 108)"}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div id="coupons" className="tab-pane fade">
                <div
                  className="mt-3"
                  style={{
                    boxShadow: "0 0 4px rgb(40 44 63 / 8%)",
                    border: "1px solid #EAEAEC",
                  }}
                >
                  <div
                    className="d-flex mx-3"
                    style={{ borderBottom: "1px solid #8080804d" }}
                  >
                    <div
                      className="px-5 py-4"
                      style={{
                        color: "#14cda8",
                        fontSize: "16px",
                        borderRight: "1px solid #8080804d",
                      }}
                    >
                      <div style={{ fontWeight: "500", fontSize: "18px" }}>
                        50%
                      </div>
                      <div style={{ fontSize: "20px", fontWeight: "700" }}>
                        OFF
                      </div>
                    </div>
                    <div className="p-3" style={{ color: "#696e79" }}>
                      <div>On minimum purchase of Rs. 0</div>
                      <div>
                        Code: <span style={{ color: "black" }}>BBWOFF</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 d-flex" style={{ color: "#696e79" }}>
                    <div>
                      Expiry:{" "}
                      <span style={{ fontWeight: "500" }}>NOV 27 2022</span>{" "}
                      12:05:13 P.M
                    </div>
                    <div
                      className="ml-auto"
                      style={{ fontWeight: "600", color: "#526cd0" }}
                    >
                      Details
                    </div>
                  </div>
                </div>
              </div>
              <div id="credit" className="tab-pane fade">
                <div>
                  <img
                    src={creditImg}
                    style={{
                      boxShadow: "0 1px 2px 0 rgb(0 0 0 / 25%)",
                      width: "100%",
                    }}
                  />
                  <div
                    className="p-4 mt-3"
                    style={{ boxShadow: "0 1px 2px 0 rgb(0 0 0 / 25%)" }}
                  >
                    <div
                      className="text-center"
                      style={{ fontSize: "13px", fontWeight: "500" }}
                    >
                      TOP-UP YOUR MYNTRA CREDIT NOW!
                    </div>
                    <div
                      className="text-center"
                      style={{ fontSize: "30px", fontWeight: "700" }}
                    >
                      {" "}
                      ₹0.00
                    </div>
                    <hr></hr>
                    <div className="row">
                      <div
                        className="text-center col-6"
                        style={{ borderRight: "1px solid #8080804d" }}
                      >
                        <div style={{ fontSize: "13px", color: "#A9ABB3" }}>
                          For a quick checkout
                        </div>
                        <div
                          style={{
                            color: "#526cd0",
                            fontWeight: "500",
                            fontSize: "16px",
                          }}
                        >
                          TOP UP
                        </div>
                      </div>
                      <div className="text-center col-6">
                        <div style={{ fontSize: "13px", color: "#A9ABB3" }}>
                          Have a gift card?
                        </div>
                        <div
                          style={{
                            color: "#526cd0",
                            fontWeight: "500",
                            fontSize: "16px",
                          }}
                        >
                          ADD GIFT CARD
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    className="p-3 mt-3"
                    style={{ boxShadow: "0 1px 2px 0 rgb(0 0 0 / 25%)" }}
                  >
                    <div style={{ fontWeight: "500", fontSize: "12px" }}>
                      TRANSACTION LOG
                    </div>
                  </div>
                  <div
                    className="p-3 mt-3"
                    style={{ boxShadow: "0 1px 2px 0 rgb(0 0 0 / 25%)" }}
                  >
                    <div style={{ fontWeight: "500", fontSize: "12px" }}>
                      CREDIT DETAILS
                    </div>
                  </div>
                  <div
                    className="p-3 mt-3"
                    style={{ boxShadow: "0 1px 2px 0 rgb(0 0 0 / 25%)" }}
                  >
                    <div style={{ fontSize: "13px", fontWeight: "500" }}>
                      PLEASE NOTE
                    </div>
                    <ul
                      className="mt-2"
                      style={{ fontSize: "13px", color: "#3e4152" }}
                    >
                      <li>
                        Myntra Credit can't be cancelled or transferred to
                        another account.
                      </li>
                      <li>
                        It can't be withdrawn in the form of cash or transferred
                        to any bank account.
                      </li>
                      <li>It can't be used to purchase Gift Cards.</li>
                      <li>
                        Net-banking and credit/debit cards issued in India can
                        be used for Myntra Credit top up.
                      </li>
                      <li>
                        Credits have an expiry. Check FAQs for more details.
                      </li>
                    </ul>
                    <div className="row">
                      <div
                        className="col-4 text-center"
                        style={{
                          color: "#526cd0",
                          fontWeight: "500",
                          fontSize: "14px",
                        }}
                      >
                        MYNTRA CREDIT T&C{" "}
                        <span className="fa fa-angle-right fa-lg pl-2"></span>
                      </div>
                      <div
                        className="col-4 text-center"
                        style={{
                          color: "#526cd0",
                          fontWeight: "500",
                          fontSize: "14px",
                        }}
                      >
                        GIFT CARD T&C{" "}
                        <span className="fa fa-angle-right fa-lg pl-2"></span>
                      </div>
                      <div
                        className="col-4 text-center"
                        style={{
                          color: "#526cd0",
                          fontWeight: "500",
                          fontSize: "14px",
                        }}
                      >
                        FAQS{" "}
                        <span className="fa fa-angle-right fa-lg pl-2"></span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div id="myncash" className="tab-pane fade">
                <div
                  className="justify-content-center d-flex"
                  style={{ boxShadow: "0 1px 2px 0 rgb(0 0 0 / 25%)" }}
                >
                  <div className="w-50 text-center py-5">
                    <div style={{ color: "#14cda8", fontWeight: "500" }}>
                      TOTAL AVAILABLE MYNCASH
                    </div>
                    <div
                      className="my-2"
                      style={{ fontSize: "30px", fontWeight: "700" }}
                    >
                      0
                    </div>
                    <div style={{ fontSize: "12px" }}>
                      Your total MynCash is worth ₹0.00
                    </div>
                    <div
                      className="my-3"
                      style={{ color: "#7e818c", fontSize: "12px" }}
                    >
                      You can pay upto 10% (may vary during the sale & promotion
                      events) of your order value through MynCash. Use them on
                      the Payments page during checkout.
                    </div>
                    <div style={{ fontSize: "14px" }}>
                      You have <b>0</b> referral MynCash pending
                    </div>
                  </div>
                </div>
                <div
                  className="justify-content-center d-flex mt-3"
                  style={{ boxShadow: "0 1px 2px 0 rgb(0 0 0 / 25%)" }}
                >
                  <div className="w-100">
                    <div
                      className="p-3"
                      style={{ fontWeight: "700", fontSize: "13px" }}
                    >
                      ACTIVE MYNCASH
                    </div>
                    <hr className="m-0"></hr>
                    <table className="w-100 border-0">
                      <tr>
                        <th>DESCRIPTON</th>
                        <th>CREDIT</th>
                        <th>DEBIT</th>
                        <th>BALANCE</th>
                      </tr>
                      <tr>
                        <td>Promotion</td>
                        <td>+ 200</td>
                        <td>0</td>
                        <td style={{ fontWeight: "600" }}>+ 200</td>
                      </tr>
                      <tr>
                        <td className="tt">
                          Expiry: 15 Jun 2022 | 12:00:00 A.M
                        </td>
                      </tr>
                      <tr>
                        <td>Promotion</td>
                        <td>+ 200</td>
                        <td>0</td>
                        <td style={{ fontWeight: "600" }}>+ 200</td>
                      </tr>
                      <tr>
                        <td className="tt">
                          Expiry: 14 Jun 2022 | 12:00:00 A.M
                        </td>
                      </tr>
                      <tr>
                        <td>Promotion</td>
                        <td>+ 130</td>
                        <td>0</td>
                        <td style={{ fontWeight: "600" }}>+ 130</td>
                      </tr>
                      <tr>
                        <td className="tt">
                          Expiry: 17 Jun 2022 | 11:59:59 P.M
                        </td>
                      </tr>
                      <tr>
                        <td>Promotion</td>
                        <td>+ 70</td>
                        <td>0</td>
                        <td style={{ fontWeight: "600" }}>+ 70</td>
                      </tr>
                      <tr>
                        <td className="tt">
                          Expiry: 23 Dec 2021 | 11:59:59 P.M
                        </td>
                      </tr>
                      <tr>
                        <td>Promotion</td>
                        <td>+ 200</td>
                        <td>0</td>
                        <td style={{ fontWeight: "600" }}>+ 200</td>
                      </tr>
                      <tr>
                        <td className="tt">
                          Expiry: 27 Nov 2021 | 11:59:00 P.M
                        </td>
                      </tr>
                    </table>
                  </div>
                </div>
                <div>
                  <Accordion flush>
                    <Accordion.Item
                      eventKey={0}
                      className="pb-2 mt-3"
                      style={{ boxShadow: "0 1px 2px 0 rgb(0 0 0 / 25%)" }}
                    >
                      <Accordion.Header>
                        <div
                          className="d-flex px-2 text-dark align-items-center"
                          style={{ fontWeight: "700", fontSize: "13px" }}
                        >
                          TRANSACTION LOGS
                          <div className="ml-auto">
                            <span
                              id="changeArrow"
                              className="fa fa-angle-right"
                              style={{ color: "grey" }}
                            ></span>
                          </div>
                        </div>
                      </Accordion.Header>
                      <Accordion.Body className="pt-1">
                        <hr className="mt-0"></hr>
                        <div
                          className="d-flex px-3"
                          style={{ fontSize: "13px" }}
                        >
                          <div>
                            <div>Promotion</div>
                            <div style={{ color: "#7e818c" }}>
                              Credited To MynCash
                            </div>
                          </div>
                          <div className="ml-auto">
                            <div style={{ color: "#7e818c" }}>14 Jun 2022</div>
                            <div
                              style={{ color: "#14cda8", fontWeight: "500" }}
                            >
                              +200
                            </div>
                          </div>
                        </div>
                        <hr></hr>
                        <div
                          className="d-flex px-3"
                          style={{ fontSize: "13px" }}
                        >
                          <div>
                            <div>Promotion</div>
                            <div style={{ color: "#7e818c" }}>
                              Credited To MynCash
                            </div>
                          </div>
                          <div className="ml-auto">
                            <div style={{ color: "#7e818c" }}>14 Jun 2022</div>
                            <div
                              style={{ color: "#14cda8", fontWeight: "500" }}
                            >
                              +200
                            </div>
                          </div>
                        </div>
                        <hr></hr>
                        <div
                          className="d-flex px-3"
                          style={{ fontSize: "13px" }}
                        >
                          <div>
                            <div>Promotion</div>
                            <div style={{ color: "#7e818c" }}>
                              Credited To MynCash
                            </div>
                          </div>
                          <div className="ml-auto">
                            <div style={{ color: "#7e818c" }}>14 Jun 2022</div>
                            <div
                              style={{ color: "#14cda8", fontWeight: "500" }}
                            >
                              +200
                            </div>
                          </div>
                        </div>
                        <hr></hr>
                        <div
                          className="d-flex px-3"
                          style={{ fontSize: "13px" }}
                        >
                          <div>
                            <div>Promotion</div>
                            <div style={{ color: "#7e818c" }}>
                              Credited To MynCash
                            </div>
                          </div>
                          <div className="ml-auto">
                            <div style={{ color: "#7e818c" }}>14 Jun 2022</div>
                            <div
                              style={{ color: "#14cda8", fontWeight: "500" }}
                            >
                              +200
                            </div>
                          </div>
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item
                      eventKey={1}
                      className="pb-2 mt-3"
                      style={{ boxShadow: "0 1px 2px 0 rgb(0 0 0 / 25%)" }}
                    >
                      <Accordion.Header>
                        <div
                          className="d-flex px-2 text-dark align-items-center"
                          style={{ fontWeight: "700", fontSize: "13px" }}
                        >
                          ELIGIBILITY, MEMBERSHIP, ACCRUAL
                          <div className="ml-auto">
                            <span
                              id="changeArrow"
                              className="fa fa-angle-right"
                              style={{ color: "grey" }}
                            ></span>
                          </div>
                        </div>
                      </Accordion.Header>
                      <Accordion.Body>
                        <ul
                          className="mx-4 pt-1"
                          style={{ color: "#7e818c", fontSize: "13px" }}
                        >
                          <li className="mt-2">
                            These terms and conditions are operational only in
                            India and open to participation of all the
                            registered members, resident of India of myntra,
                            over and above the age of 18 years.
                          </li>
                          <li className="mt-2">
                            My Privilege program has been converted into MynCash
                            Program. The same denomination is applicable for
                            MynCash.
                          </li>
                        </ul>
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item
                      eventKey={2}
                      className="pb-2 mt-3"
                      style={{ boxShadow: "0 1px 2px 0 rgb(0 0 0 / 25%)" }}
                    >
                      <Accordion.Header>
                        <div
                          className="d-flex px-2 text-dark align-items-center"
                          style={{ fontWeight: "700", fontSize: "13px" }}
                        >
                          GENERAL TERMS AND CONDITIONS
                          <div className="ml-auto">
                            <span
                              id="changeArrow"
                              className="fa fa-angle-right"
                              style={{ color: "grey" }}
                            ></span>
                          </div>
                        </div>
                      </Accordion.Header>
                      <Accordion.Body>
                        <ul
                          className="mx-4 pt-1"
                          style={{ color: "#7e818c", fontSize: "14px" }}
                        >
                          <li className="mt-2">
                            Each member is responsible for remaining
                            knowledgeable about the Myntra Program Terms and
                            Conditions and the MynCash in his or her account.
                          </li>
                          <li className="mt-2">
                            Myntra will send correspondence to active members to
                            advise them of matters of interest, including
                            notification of Myntra Program changes and MynCash
                            Updates.
                          </li>
                          <li className="mt-2">
                            Myntra will not be liable or responsible for
                            correspondence lost or delayed in the mail/e-mail.
                          </li>
                          <li className="mt-2">
                            Myntra reserves the right to refuse, amend, vary or
                            cancel membership of any Member without assigning
                            any reason and without prior notification.
                          </li>
                          <li className="mt-2">
                            Any change in the name, address, or other
                            information relating to the Member must be notified
                            to Myntra via the Helpdesk/email by the Member, as
                            soon as possible at support@myntra.com or call at
                            +91-80-43541999 24 Hours a Day / 7 Days a Week.
                          </li>
                          <li className="mt-2">
                            Myntra reserves the right to add,modify,delete or
                            otherwise change the Terms and Conditions without
                            any approval, prior notice or reference to the
                            Member.
                          </li>
                          <li className="mt-2">
                            In the event of dispute in connection with Myntra
                            Program and the interpretation of Terms and
                            Conditions, Myntra's decision shall be final and
                            binding.
                          </li>
                          <li className="mt-2">
                            This Policy and these terms shall be read in
                            conjunction with the standard legal policies of
                            Myntra, including its Privacy policy.
                          </li>
                        </ul>
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </div>
              </div>

              <div id="profile1" className="tab-pane fade">
                {!isActive ? (
                  <div
                    className="justify-content-center d-flex py-5"
                    style={{ border: "1px solid #8080804d", width: "100%" }}
                  >
                    <div className="w-75">
                      <div
                        className="mb-4 mx-5"
                        style={{ fontWeight: "700", fontSize: "20px" }}
                      >
                        Profile Details
                      </div>
                      <hr style={{ color: "#808080fa" }}></hr>
                      <div className="mt-5 mx-5">
                        {userProfile.map((e) => {
                          return (
                            <div style={{ fontSize: "16px" }}>
                              <div className="d-flex text-dark mb-4" key={e.id}>
                                <div>{e.Field}</div>
                                <div className="ml-auto">{userData.email}</div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      <div className="mx-5 mt-5">
                        <div
                          className="btn btn-danger border-0 rounded-0 w-100 my-2 py-3"
                          style={{ background: "rgb(255, 63, 108)" }}
                          onClick={() => setActive(true)}
                        >
                          <b>EDIT</b>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div
                    className="justify-content-center d-flex py-5"
                    style={{
                      border: "1px solid #8080804d",
                      width: "100%",
                      boxShadow: "0 1px 2px 0 rgb(0 0 0 / 25%)",
                    }}
                  >
                    <div className="w-75">
                      <div
                        className="mb-4 mx-5"
                        style={{ fontWeight: "700", fontSize: "20px" }}
                      >
                        Edit Details
                      </div>
                      <hr style={{ color: "#808080fa" }}></hr>
                      <div
                        className="p-3 mb-4"
                        style={{ border: "1px solid #8080804d" }}
                      >
                        <div className="d-flex">
                          <div className="">
                            <div style={{ color: "grey" }}>Mobile Number</div>
                            <div className="d-flex align-items-center">
                              <div>xxxxxxxxxx</div>
                              <div className="fa fa-check-circle text-success ml-3"></div>
                            </div>
                          </div>
                          <div
                            className="btn btn-dark bg-transparent w-50 justify-content-center text-dark align-items-center d-flex ml-auto"
                            style={{
                              fontWeight: "500",
                              height: "45px",
                              border: "1px solid #8080804d",
                            }}
                          >
                            CHANGE
                          </div>
                        </div>
                      </div>
                      <Box
                        component="form"
                        sx={{
                          "& > :not(style)": { width: "100%" },
                        }}
                      >
                        <div className="">
                          <TextField
                            required
                            name="fname"
                            label="Full Name"
                            type={"text"}
                            value={user.fname}
                            onChange={handleInputs}
                            variant="outlined"
                            sx={{
                              width: "100%",
                              color: "white",
                              fontSize: "14px",
                              height: "45px",
                              // border: "1px solid #8080804d",
                            }}
                            color="warning"
                          />
                          <div className="d-flex w-100 my-4">
                            <div
                              className="w-50 p-2 d-flex justify-content-center"
                              style={{ border: "1px solid #8080804d" }}
                            >
                              <input
                                className="form-check mr-2"
                                name="radio"
                                type="radio"
                                style={{ width: "20px" }}
                              />
                              <label>Male</label>
                            </div>
                            <div
                              className="w-50 p-2 d-flex justify-content-center"
                              style={{ border: "1px solid #8080804d" }}
                            >
                              <input
                                className="form-check mr-2"
                                name="radio"
                                type="radio"
                                style={{ width: "20px" }}
                              />
                              <label>Female</label>
                            </div>
                          </div>
                          <input
                            type="date"
                            className="form-control text-dark"
                            value={user.dob}
                            name="dob"
                            onChange={handleInputs}
                            style={{
                              width: "100%",
                              color: "white",
                              fontSize: "14px",
                              height: "45px",
                            }}
                          />
                          <TextField
                            className="mt-4"
                            required
                            label="Location"
                            name="location"
                            value={user.location}
                            onChange={handleInputs}
                            type={"text"}
                            variant="outlined"
                            sx={{
                              width: "100%",
                              color: "white",
                              fontSize: "14px",
                              height: "45px",
                              // border: "1px solid #8080804d",
                            }}
                            color="warning"
                          />
                          <div
                            className="my-4"
                            style={{ fontWeight: "600", fontSize: "14px" }}
                          >
                            Alternate mobile details
                          </div>

                          <div className="align-items-center d-flex">
                            <div
                              className="pl-2"
                              style={{
                                zIndex: "1",
                                color: "#808080d4",
                                position: "absolute",
                              }}
                            >
                              +91 |{" "}
                            </div>
                            <input
                              className="form-control shadow-none rounded-0 w-100"
                              type="tel"
                              placeholder="Mobile Number"
                              pattern="[0-9]{10}"
                              name="alternateNumber"
                              value={user.alternateNumber}
                              onChange={handleInputs}
                              style={{ height: "45px", paddingLeft: "54px" }}
                            />
                          </div>
                          <TextField
                            className="mt-4"
                            required
                            label="Hint name"
                            name="hint"
                            value={user.hint}
                            onChange={handleInputs}
                            type={"text"}
                            variant="outlined"
                            sx={{
                              width: "100%",
                              color: "white",
                              fontSize: "14px",
                              height: "45px",
                              // border: "1px solid #8080804d",
                            }}
                            color="warning"
                          />
                        </div>
                      </Box>
                      <div className="my-5">
                        <div
                          className="btn btn-danger border-0 rounded-0 w-100 my-2 py-3"
                          style={{ background: "rgb(255, 63, 108)" }}
                          onClick={PostData}
                        >
                          <b>SAVE DETAILS</b>
                        </div>
                      </div>
                      <div className="">
                        <div
                          className="btn btn-dark bg-transparent text-dark rounded-0 w-100 py-3"
                          style={{ border: "1px solid #8080804d" }}
                        >
                          <b>CHANGE PASSWORD</b>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div id="cards" className="tab-pane fade">
                <div className="justify-content-center d-flex">
                  <div className="text-center">
                    <img src={cards} className="py-5" />
                    <div
                      className="pb-4"
                      style={{ fontSize: "15px", fontWeight: "500" }}
                    >
                      SAVE YOUR CREDIT/DEBIT CARDS DURING PAYMENT
                    </div>
                    <div
                      className="justify-content-center d-flex"
                      style={{
                        color: "#A9ABB3",
                        fontSize: "16px",
                      }}
                    >
                      <div className="w-50">
                        It's convenient to pay with saved cards. Your card
                        information will be secure, we use 128-bit encryption
                      </div>
                    </div>
                    <div
                      className="d-flex align-items-center"
                      style={{ marginTop: "150px" }}
                    >
                      <hr style={{ color: "#A9ABB3", width: "40%" }}></hr>
                      <div
                        className="mx-3"
                        style={{ color: "#A9ABB3", fontSize: "12px" }}
                      >
                        MYNTRA SECURED
                      </div>
                      <hr style={{ color: "#A9ABB3", width: "40%" }}></hr>
                    </div>
                    <img
                      className="my-3"
                      src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/payment-method_69e7ec.svg"
                    />
                  </div>
                </div>
              </div>

              <div id="vpa" className="tab-pane fade p-4 pt-3">
                <div className="row gx-0">
                  <div
                    className="mb-5 pl-2"
                    style={{ fontWeight: "700", fontSize: "18px" }}
                  >
                    Saved VPA
                  </div>
                  <div className="col-4 px-2">
                    <div
                      className="p-3 rounded"
                      style={{ boxShadow: "0px 1px 3px rgb(40 44 63 / 30%)" }}
                    >
                      <div className="d-flex align-items-center mb-3">
                        <div
                          className="fa fa-google align-items-center d-flex justify-content-center mr-2"
                          style={{
                            height: "36px",
                            borderRadius: "50%",
                            width: "38px",
                            fontSize: "12px",
                            border: "1px solid rgb(169 171 179 / 42%)",
                          }}
                        >
                          &nbsp;Pay
                        </div>
                        <div style={{ fontWeight: "500", fontSize: "12px" }}>
                          xyz@gmail.com
                        </div>
                        <img
                          className="ml-auto"
                          style={{ height: "17px" }}
                          src={upi}
                        />
                      </div>
                      <div style={{ color: "#A9ABB3", fontSize: "11px" }}>
                        ACCOUNT HOLDER
                      </div>
                      <div style={{ fontSize: "14px" }}>Mr/Ms XYZ</div>
                      <hr></hr>
                      <div
                        className="text-center"
                        style={{ fontWeight: "600", color: "#FF3F6C" }}
                      >
                        REMOVE
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div id="address" className="tab-pane fade">
                <div className="d-flex">
                  <div
                    className="mb-5 pl-2"
                    style={{ fontWeight: "700", fontSize: "18px" }}
                  >
                    Saved Addresses
                  </div>
                  <div
                    className="btn btn-dark bg-transparent px-3 py-2 ml-auto"
                    style={{
                      color: "#526cd0",
                      border: "0.5px solid #d4d5d9",
                      fontWeight: "600",
                      height: "fit-content",
                    }}
                  >
                    + ADD NEW ADDRESS
                  </div>
                </div>
                <div style={{ fontWeight: "500", fontSize: "13px" }}>
                  DEFAULT ADDRESS
                </div>
                <div
                  className="py-3 mt-3"
                  style={{ boxShadow: "0 1px 2px 0 rgb(0 0 0 / 25%)" }}
                >
                  <div className="d-flex px-3">
                    <div style={{ fontSize: "16px", fontWeight: "600" }}>
                      UserName
                    </div>
                    <div
                      className="rounded-pill btn btn-dark border-0 text-dark p-0 px-2 ml-auto"
                      style={{
                        fontSize: "14px",
                        fontWeight: "700",
                        background: "#F5F5F6",
                      }}
                    >
                      HOME
                    </div>
                  </div>
                  <div
                    className="p-3 py-2"
                    style={{ color: "#696E79" }}
                    onClick={setAddress}
                  >
                   {}
                  </div>
                  <div id="default">
                    <div className="pl-3" style={{ color: "#696E79" }}>
                      Mobile: xxxxxxxxxx
                    </div>
                    <hr></hr>
                    <div className="row">
                      <div
                        className="text-center col-6"
                        style={{ borderRight: "1px solid #8080804d" }}
                        data-target="#mymodal"
                        data-toggle="modal"
                      >
                        <div
                          style={{
                            color: "#526cd0",
                            fontWeight: "500",
                            fontSize: "16px",
                          }}
                        >
                          EDIT
                        </div>
                      </div>
                      <div className="text-center col-6">
                        <div
                          style={{
                            color: "#526cd0",
                            fontWeight: "500",
                            fontSize: "16px",
                          }}
                        >
                          REMOVE
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="mt-4"
                  style={{ fontWeight: "500", fontSize: "13px" }}
                >
                  OTHER ADDRESSES
                </div>
                <div
                  className="py-3 mt-3"
                  style={{ boxShadow: "0 1px 2px 0 rgb(0 0 0 / 25%)" }}
                >
                  <div className="d-flex px-3">
                    <div style={{ fontSize: "16px", fontWeight: "600" }}>
                      UserName
                    </div>
                    <div
                      className="rounded-pill btn btn-dark border-0 text-dark p-0 px-2 ml-auto"
                      style={{
                        fontSize: "14px",
                        fontWeight: "700",
                        background: "#F5F5F6",
                      }}
                    >
                      HOME
                    </div>
                  </div>
                  <div
                    className="p-3 py-2"
                    style={{ color: "#696E79" }}
                    onClick={setAddress}
                  >
                    aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
                    <br></br>
                    aaaaaaaaaaaaaaaaaaaaaaaaaaaa<br></br>aaaaaaaaaaaaaaaaaaaaa
                    <br></br>aaaaaaaa
                  </div>
                  <div id="other" style={{ display: "none" }}>
                    <div className="pl-3" style={{ color: "#696E79" }}>
                      Mobile: xxxxxxxxxx
                    </div>
                    <div
                      className="pt-2 pl-3"
                      style={{
                        fontSize: "12px",
                        color: "#14cda8",
                        fontWeight: "700",
                        cursor: "pointer",
                      }}
                    >
                      MAKE THIS DEFAULT
                    </div>
                    <hr></hr>
                    <div className="row">
                      <div
                        className="text-center col-6"
                        style={{ borderRight: "1px solid #8080804d" }}
                      >
                        <div
                          style={{
                            color: "#526cd0",
                            fontWeight: "500",
                            fontSize: "16px",
                          }}
                        >
                          EDIT
                        </div>
                      </div>
                      <div className="text-center col-6">
                        <div
                          style={{
                            color: "#526cd0",
                            fontWeight: "500",
                            fontSize: "16px",
                          }}
                        >
                          REMOVE
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="modal fade" id="mymodal">
                  <div className="modal-dialog modal-md">
                    <div
                      className="modal-content"
                      style={{ background: "#eee" }}
                    >
                      <div
                        className="p-3 bg-white position-sticky"
                        style={{
                          top: "0",
                          boxShadow: "rgb(0 0 0 / 25%) 0px 1px 2px 0px",
                        }}
                      >
                        EDIT ADDRESS
                      </div>
                      <div style={{ height: "70vh", overflowY: "scroll" }}>
                        <div
                          className="bg-white p-4 mt-3"
                          style={{
                            boxShadow: "rgb(0 0 0 / 25%) 0px 1px 2px 0px",
                          }}
                        >
                          <Box
                            component="form"
                            sx={{
                              "& > :not(style)": { width: "100%" },
                            }}
                          >
                            <div className="pb-4">
                              <TextField
                                required
                                id="name"
                                label="Name"
                                type={"text"}
                                variant="standard"
                                sx={{
                                  width: "100%",
                                  color: "white",
                                  fontSize: "14px",
                                  height: "45px",
                                  // border: "1px solid #8080804d",
                                }}
                                color="warning"
                              />
                              <TextField
                                className="mt-5"
                                required
                                id="fname"
                                label="Mobile"
                                type={"text"}
                                variant="standard"
                                sx={{
                                  width: "100%",
                                  color: "white",
                                  fontSize: "14px",
                                  height: "45px",
                                  // border: "1px solid #8080804d",
                                }}
                                color="warning"
                              />
                            </div>
                          </Box>
                        </div>
                        <div
                          className="bg-white p-4 mt-3"
                          style={{
                            boxShadow: "rgb(0 0 0 / 25%) 0px 1px 2px 0px",
                          }}
                        >
                          <Box
                            component="form"
                            sx={{
                              "& > :not(style)": { width: "100%" },
                            }}
                          >
                            <div className="pb-4">
                              <div className="d-flex">
                                <TextField
                                  className="w-50 mr-5"
                                  required
                                  id="name"
                                  label="Name"
                                  type={"text"}
                                  variant="standard"
                                  sx={{
                                    width: "100%",
                                    color: "white",
                                    fontSize: "14px",
                                    height: "45px",
                                    // border: "1px solid #8080804d",
                                  }}
                                  color="warning"
                                />
                                <TextField
                                  className="w-50 ml-5 ml-auto"
                                  required
                                  id="fname"
                                  label="Mobile"
                                  type={"text"}
                                  variant="standard"
                                  sx={{
                                    width: "100%",
                                    color: "white",
                                    fontSize: "14px",
                                    height: "45px",
                                    // border: "1px solid #8080804d",
                                  }}
                                  color="warning"
                                />
                              </div>
                              <TextField
                                className="mt-5"
                                required
                                id="fname"
                                label="Address (House No, Building, Street, Area)"
                                type={"text"}
                                variant="standard"
                                sx={{
                                  width: "100%",
                                  color: "white",
                                  fontSize: "14px",
                                  height: "45px",
                                  // border: "1px solid #8080804d",
                                }}
                                color="warning"
                              />
                              <TextField
                                className="mt-5"
                                required
                                id="fname"
                                label="Locality/ Town"
                                type={"text"}
                                variant="standard"
                                sx={{
                                  width: "100%",
                                  color: "white",
                                  fontSize: "14px",
                                  height: "45px",
                                  // border: "1px solid #8080804d",
                                }}
                                color="warning"
                              />
                              <TextField
                                className="mt-5"
                                required
                                id="fname"
                                label="City/ District"
                                type={"text"}
                                variant="standard"
                                sx={{
                                  width: "100%",
                                  color: "white",
                                  fontSize: "14px",
                                  height: "45px",
                                  // border: "1px solid #8080804d",
                                }}
                                color="warning"
                              />
                            </div>
                          </Box>
                        </div>

                        <div
                          className="bg-white p-4 my-3"
                          style={{
                            boxShadow: "rgb(0 0 0 / 25%) 0px 1px 2px 0px",
                          }}
                        >
                          <div>Type of Address *</div>
                          <div className="d-flex mt-3">
                            <input
                              type="radio"
                              name="radio"
                              className="form-check mr-2"
                              style={{ width: "20px" }}
                            />
                            Home
                            <input
                              type="radio"
                              name="radio"
                              className="form-check mr-2 ml-5"
                              style={{ width: "20px" }}
                            />
                            Office
                          </div>
                          <hr></hr>
                          <div className="d-flex align-items-center">
                            <input
                              type="checkbox"
                              className="form-check mr-2"
                              style={{ width: "18px" }}
                            />
                            Make this as my default address
                          </div>
                        </div>
                      </div>
                      <div
                        className="d-flex"
                        style={{
                          boxShadow: "rgb(0 0 0 / 25%) 0px 1px 2px 0px",
                        }}
                      >
                        <div className="btn btn-dark p-3 text-dark bg-white w-50 rounded-0 border-0">
                          <b>CANCEL</b>
                        </div>
                        <div
                          className="btn btn-dark p-3 w-50 rounded-0 border-0"
                          style={{ background: "rgb(255, 63, 108)" }}
                        >
                          <b>SAVE</b>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div id="insider" className="tab-pane fade">
                adsa
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="mobileProfile" style={{ background: "#eee", display: "none" }}>
        <div className="d-flex justify-content-center">
          <div
            className="fa fa-user bg-dark justify-content-center d-flex align-items-end position-absolute"
            style={{
              fontSize: "110px",
              color: "#eee",
              top: "105px",
              height: "130px",
              width: "130px",
            }}
          ></div>
        </div>

        <div
          className="bg-white"
          style={{
            height: "10vh",
            marginTop: "150px",
            boxShadow: "0 0 4px rgb(40 44 63 / 8%)",
          }}
        ></div>

        <div
          className="my-2 bg-white"
          style={{ boxShadow: "0 0 4px rgb(40 44 63 / 8%)" }}
        >
          <NavLink to="/orders" className="text-decoration-none text-dark">
            <div className="d-flex p-2 px-3 align-items-center">
              <img
                src={orders}
                className="img-fluid"
                style={{ width: "25px" }}
              />
              <div className="ml-3">
                <div style={{ fontSize: "15px", fontWeight: "500" }}>
                  Orders
                </div>
                <div style={{ fontSize: "12px", color: "#94969F" }}>
                  Check your order status
                </div>
              </div>
              <div className="fa fa-angle-right ml-auto"></div>
            </div>
          </NavLink>
          <hr className="m-0" style={{ color: "#A9ABB3" }}></hr>
          <NavLink to="/collections" className="text-decoration-none text-dark">
            {" "}
            <div className="d-flex p-2 px-3 align-items-center">
              <img
                src={collections}
                className="img-fluid"
                style={{ width: "25px" }}
              />
              <div className="ml-3">
                <div style={{ fontSize: "15px", fontWeight: "500" }}>
                  Collections
                </div>
                <div style={{ fontSize: "12px", color: "#94969F" }}>
                  All your curated product collections
                </div>
              </div>
              <div className="fa fa-angle-right ml-auto"></div>
            </div>
          </NavLink>
        </div>

        <div
          className="my-2 bg-white"
          style={{ boxShadow: "0 0 4px rgb(40 44 63 / 8%)" }}
        >
          <NavLink to="/credit" className="text-decoration-none text-dark">
            <div className="d-flex p-2 px-3 align-items-center">
              <img
                src={credit}
                className="img-fluid"
                style={{ width: "25px" }}
              />
              <div className="ml-3">
                <div style={{ fontSize: "15px", fontWeight: "500" }}>
                  Myntra Credit
                </div>
                <div style={{ fontSize: "12px", color: "#94969F" }}>
                  Manage all your refunds & gift cards
                </div>
              </div>
              <div className="fa fa-angle-right ml-auto"></div>
            </div>
          </NavLink>
          <hr className="m-0" style={{ color: "#A9ABB3" }}></hr>
          <NavLink to="/myncash" className="text-decoration-none text-dark">
            {" "}
            <div className="d-flex p-2 px-3 align-items-center">
              <img
                src={points}
                className="img-fluid"
                style={{ width: "25px" }}
              />
              <div className="ml-3">
                <div style={{ fontSize: "15px", fontWeight: "500" }}>
                  MynCash
                </div>
                <div style={{ fontSize: "12px", color: "#94969F" }}>
                  Earn MynCash as you shop and use them in checkout
                </div>
              </div>
              <div className="fa fa-angle-right ml-auto"></div>
            </div>
          </NavLink>
          <hr className="m-0" style={{ color: "#A9ABB3" }}></hr>
          <NavLink to="/cards" className="text-decoration-none text-dark">
            {" "}
            <div className="d-flex p-2 px-3 align-items-center">
              <img
                src={cards}
                className="img-fluid"
                style={{ width: "25px" }}
              />
              <div className="ml-3">
                <div style={{ fontSize: "15px", fontWeight: "500" }}>
                  Saved Cards
                </div>
                <div style={{ fontSize: "12px", color: "#94969F" }}>
                  Save your cards for faster checkout
                </div>
              </div>
              <div className="fa fa-angle-right ml-auto"></div>
            </div>
          </NavLink>
          <hr className="m-0" style={{ color: "#A9ABB3" }}></hr>
          <NavLink to="/upi" className="text-decoration-none text-dark">
            {" "}
            <div className="d-flex p-2 px-3 align-items-center">
              <img
                src={upiIcon}
                className="img-fluid"
                style={{ width: "25px" }}
              />
              <div className="ml-3">
                <div style={{ fontSize: "15px", fontWeight: "500" }}>
                  Saved VPA
                </div>
                <div style={{ fontSize: "12px", color: "#94969F" }}>
                  View your saved VPA
                </div>
              </div>
              <div className="fa fa-angle-right ml-auto"></div>
            </div>
          </NavLink>
          <hr className="m-0" style={{ color: "#A9ABB3" }}></hr>
          <NavLink to="/address" className="text-decoration-none text-dark">
            {" "}
            <div className="d-flex p-2 px-3 align-items-center">
              <img
                src={address}
                className="img-fluid"
                style={{ width: "25px" }}
              />
              <div className="ml-3">
                <div style={{ fontSize: "15px", fontWeight: "500" }}>
                  Addresses
                </div>
                <div style={{ fontSize: "12px", color: "#94969F" }}>
                  Save addresses for a hassle-free checkout
                </div>
              </div>
              <div className="fa fa-angle-right ml-auto"></div>
            </div>
          </NavLink>
          <hr className="m-0" style={{ color: "#A9ABB3" }}></hr>
          <NavLink to="/coupons" className="text-decoration-none text-dark">
            {" "}
            <div className="d-flex p-2 px-3 align-items-center">
              <img
                src={coupons}
                className="img-fluid"
                style={{ width: "25px" }}
              />
              <div className="ml-3">
                <div style={{ fontSize: "15px", fontWeight: "500" }}>
                  Coupons
                </div>
                <div style={{ fontSize: "12px", color: "#94969F" }}>
                  Manage coupons for additional discounts
                </div>
              </div>
              <div className="fa fa-angle-right ml-auto"></div>
            </div>
          </NavLink>
        </div>

        <div
          className="my-2 bg-white"
          style={{ boxShadow: "0 0 4px rgb(40 44 63 / 8%)" }}
        >
          <NavLink to="/editProfile" className="text-decoration-none text-dark">
            {" "}
            <div className="d-flex p-2 px-3 align-items-center">
              <img src={edit} className="img-fluid" style={{ width: "25px" }} />
              <div className="ml-3">
                <div style={{ fontSize: "15px", fontWeight: "500" }}>
                  Profile Details
                </div>
                <div style={{ fontSize: "12px", color: "#94969F" }}>
                  Chnage your profile details & password
                </div>
              </div>
              <div className="fa fa-angle-right ml-auto"></div>
            </div>
          </NavLink>
        </div>

        <div
          className="my-2 bg-white"
          style={{
            boxShadow: "0 0 4px rgb(40 44 63 / 8%)",
            paddingLeft: "57px",
          }}
        >
          <div className="py-3" style={{ fontSize: "12px", fontWeight: "500" }}>
            FAQs
          </div>
          <div className="py-3" style={{ fontSize: "12px", fontWeight: "500" }}>
            ABOUT US
          </div>
          <div className="py-3" style={{ fontSize: "12px", fontWeight: "500" }}>
            TERMS OF USE
          </div>
          <div className="py-3" style={{ fontSize: "12px", fontWeight: "500" }}>
            CUSTOMER POLICIES
          </div>
          <div className="py-3" style={{ fontSize: "12px", fontWeight: "500" }}>
            USEFUL LINKS
          </div>
        </div>

        <div className="mt-5 px-3">
          <div
            className="btn w-100 btn-danger border-0 w-25 my-2 py-3"
            style={{ background: "#f91111d6" }}
          >
            <b>LOGOUT</b>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Profile;
//HUH