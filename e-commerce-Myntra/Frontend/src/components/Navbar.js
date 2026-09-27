import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import logo from "./images/myntra.png";
import app from "./images/downloadApp.jpeg";
import Accordion from "react-bootstrap/Accordion";
import { search, sidebar, Deals } from "../Data/Data";
import loginImg from "./images/loginSignUp.webp";

function Navbar() {
  const [isactive, setActive] = useState(false);
  const [show, setShow] = useState(false);
  const [heading, setHeading] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchBar, setSearchBar] = useState(false);

  const slideNav = () => {
    var x = document.getElementById("navbar");
    if (window.scrollY >= 100) {
      if (x.classList == "active") {
        x.classList.remove("active");
      } else {
        x.classList.add("active");
      }
    } else {
      x.classList.remove("active");
    }
  };
  window.addEventListener("scroll", slideNav);

  useEffect(() => {
    const changeNav = () => {
      if (window.innerWidth >= 575) {
        setActive(false);
      } else {
        setActive(true);
        document.getElementById("backdrop").style.display = "none";
        document.body.style.overflowY = "auto";
        setShow(false);
      }
    };
    window.addEventListener("resize", changeNav);
    changeNav();
  }, []);

  const openDrawer = () => {
    window.scroll(0, 0);
    document.getElementById("backdrop").style.display = "block";
    document.getElementById("backdrop").style.zIndex = "7";
    document.getElementById("header").style.position = "unset";
    document.body.style.overflowY = "hidden";
    setShow(true);
  };
  const closeDrawer = () => {
    document.getElementById("backdrop").style.display = "none";
    document.getElementById("header").style.position = "sticky";
    document.body.style.overflowY = "auto";
    setShow(false);
  };

  const changeHeading = (e) => {
    setHeading(e.target.value);
    setSearchTerm(e.target.value);
  };
  return (
    <section
      className=""
      id="header"
      style={{ zIndex: "6", top: "0", position: "sticky" }}
    >
      {!isactive ? (
        <nav
          id="navbar"
          className="navbar navbar-expand-lg bg-white p-0 m-0 px-lg-5 px-md-4"
          style={{ boxShadow: "0 4px 12px 0 rgb(0 0 0 / 5%)" }}
        >
          <div className="navbar-nav w-100 px-3">
            <div className="align-items-center d-flex">
              <NavLink to="/">
                <img
                  src={logo}
                  className="img-fluid"
                  style={{ width: "65px", height: "48px" }}
                  // style={{ width: "80px", height: "50px" }}
                />
              </NavLink>

              <button
                className="navbar-toggler ml-auto border-0"
                style={{ outline: "none" }}
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
              >
                <span className="fa fa-bars fa-lg text-dark"></span>
              </button>
            </div>

            <div
              className="collapse navbar-collapse pl-lg-3"
              id="navbarSupportedContent"
            >
              <ul
                className="navbar-nav align-items-center d-flex mb-2 mb-lg-0 pl-3 position-relative"
                style={{ width: "100%" }}
              >
                <li
                  style={{ width: "fit-content", fontSize: "15px" }}
                  className="nav-item px-2 py-lg-0 py-2 align-items-center d-lg-flex"
                  id="men"
                  onMouseOver={() =>
                    (document.getElementById("backdrop").style.display =
                      "block")
                  }
                  onMouseLeave={() =>
                    (document.getElementById("backdrop").style.display = "none")
                  }
                >
                  <NavLink
                    to="/"
                    className="nav-link text-dark"
                    onMouseOver={() =>
                      (document.getElementById("men").style.borderBottom =
                        "4px solid #ee5f73")
                    }
                    onMouseLeave={() =>
                      (document.getElementById("men").style.borderBottom =
                        "none")
                    }
                    style={{ fontWeight: "600" }}
                  >
                    MEN
                  </NavLink>

                  <div className="dropdown-menu rounded-0 border-0">
                    <div className="justify-content-center d-flex">
                      <div className="row gx-0 bg-white">
                        <div className="col-lg-3 col-6 pb-5 px-4 pt-2">
                          <div className="text-danger">
                            <div style={{ fontWeight: "500" }}>Topwear</div>
                          </div>
                          <ul className="list-unstyled">
                            <li>T-Shirts</li>
                            <li>Casual Shirts</li>
                            <li>Formal Shirts</li>
                            <li>SweatShirts</li>
                            <li>Sweaters</li>
                            <li>Jackets</li>
                            <li>Blazers & Coats</li>
                            <li>Suits</li>
                            <li>Rain Jackets</li>
                          </ul>
                          <div className="text-danger">
                            <div style={{ fontWeight: "500" }}>
                              Indian & festive Wear
                            </div>
                          </div>
                          <ul className="list-unstyled">
                            <li>Kurtas & Kurta Sets</li>
                            <li>Sherwanis</li>
                            <li>Nehru Jackets</li>
                            <li>Dhotis</li>
                          </ul>
                        </div>
                        <div
                          className="col-lg-3 col-6 pb-5 px-4 pt-2"
                          style={{
                            backgroundColor: "#f9f9f9",
                            backgroundSize: "cover",
                          }}
                        >
                          <div className="text-danger">
                            <div style={{ fontWeight: "500" }}>Bottomwear</div>
                          </div>
                          <ul className="list-unstyled">
                            <li>Jeans</li>
                            <li>Casual Trouser</li>
                            <li>Formal Trouser</li>
                            <li>Shorts</li>
                            <li>Track Pants & Joggers</li>
                          </ul>
                          <hr style={{ color: "grey" }}></hr>
                          <div className="text-danger">
                            <div style={{ fontWeight: "500" }}>
                              Innerwear & Sleepwear
                            </div>
                          </div>
                          <ul className="list-unstyled">
                            <li>Briefs & Trunks</li>
                            <li>Boxers</li>
                            <li>Vests</li>
                            <li>Sleepwear & Loungewear</li>
                            <li>Thermals</li>
                          </ul>
                          <div className="text-danger py-3">
                            <div style={{ fontWeight: "500" }}>Plus Size</div>
                          </div>
                        </div>
                        <div className="col-lg-3 col-6 pb-5 px-4 pt-2 pb-3">
                          <div className="text-danger">
                            <div style={{ fontWeight: "500" }}>Footwear</div>
                          </div>
                          <ul className="list-unstyled">
                            <li>Casual Shoes</li>
                            <li>Sports Shoes</li>
                            <li>Formal Shoes</li>
                            <li>Sneakers</li>
                            <li>Sandals & Floaters</li>
                            <li>Flip Flops</li>
                            <li>Socks</li>
                          </ul>
                          <hr style={{ color: "grey" }}></hr>
                          <div className="text-danger">
                            <div style={{ fontWeight: "500" }}>
                              Personal Care & Grooming
                            </div>
                          </div>
                          <div className="text-danger py-3">
                            <div style={{ fontWeight: "500" }}>
                              Sunglasses & Frames
                            </div>
                          </div>
                          <div className="text-danger">
                            <div style={{ fontWeight: "500" }}>Watches</div>
                          </div>
                        </div>
                        <div className="col-lg-3 col-6 pb-5 px-4 pt-2">
                          <div className="text-danger">
                            <div style={{ fontWeight: "500" }}>
                              Fashion Accessories
                            </div>
                          </div>
                          <ul className="list-unstyled">
                            <li>Wallets</li>
                            <li>Belts</li>
                            <li>Perfumes & Body Mists</li>
                            <li>Trimmers</li>
                            <li>Deodrants</li>
                            <li>Ties, Cufflinks & Pocket Squares</li>
                            <li>Accessory Gift Sets</li>
                            <li>Caps & Hats</li>
                            <li>Mufflers, Scarves & Gloves</li>
                            <li>Phone Cases</li>
                            <li>Rings & Wristwear</li>
                            <li>Helmets</li>
                          </ul>
                          <hr style={{ color: "grey" }}></hr>
                          <div className="text-danger">
                            <div style={{ fontWeight: "500" }}>
                              Bags & backpacks
                            </div>
                          </div>
                          <div className="text-danger py-3">
                            <div style={{ fontWeight: "500" }}>
                              Luggages & Trolleys
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>

                <li
                  style={{ width: "fit-content", fontSize: "15px" }}
                  className="nav-item px-2 py-lg-0 py-2 align-items-center d-lg-flex"
                  id="women"
                  onMouseOver={() =>
                    (document.getElementById("backdrop").style.display =
                      "block")
                  }
                  onMouseLeave={() =>
                    (document.getElementById("backdrop").style.display = "none")
                  }
                >
                  <NavLink
                    to="/"
                    className="nav-link text-dark"
                    style={{ fontWeight: "600" }}
                    onMouseOver={() =>
                      (document.getElementById("women").style.borderBottom =
                        "4px solid #fb56c1")
                    }
                    onMouseLeave={() =>
                      (document.getElementById("women").style.borderBottom =
                        "none")
                    }
                  >
                    WOMEN
                  </NavLink>
                  <div className="dropdown-menu rounded-0 border-0">
                    <div className="justify-content-center d-flex">
                      <div className="row gx-0 bg-white">
                        <div className="col px-4 pt-2 pb-5">
                          <div className="" style={{ color: "magenta" }}>
                            <div style={{ fontWeight: "500" }}>
                              Indian & Fusion Wear
                            </div>
                          </div>
                          <ul className="list-unstyled">
                            <li>Kurtas & Suits</li>
                            <li>Kurtis, Tunics & Tops</li>
                            <li>Sarees</li>
                            <li>Ethnic Wear</li>
                            <li>Leggings, Salwars & Churidars</li>
                            <li>Skirts & Palazzos</li>
                            <li>Dress Materials</li>
                            <li>Lehenga Cholis</li>
                            <li>Dupattas & Shawls</li>
                            <li>Jackets</li>
                          </ul>
                          <hr style={{ color: "grey" }}></hr>
                          <div className="" style={{ color: "magenta" }}>
                            <div style={{ fontWeight: "500" }}>
                              Belts, Scarves & More
                            </div>
                          </div>
                          <div className="py-3" style={{ color: "magenta" }}>
                            <div style={{ fontWeight: "500" }}>
                              Watches & Wearables
                            </div>
                          </div>
                        </div>
                        <div
                          className="col px-4 pt-2 pb-5"
                          style={{
                            backgroundColor: "#f9f9f9",
                            backgroundSize: "cover",
                          }}
                        >
                          <div className="" style={{ color: "magenta" }}>
                            <div style={{ fontWeight: "500" }}>
                              Western Wear
                            </div>
                          </div>
                          <ul className="list-unstyled">
                            <li>Dresses</li>
                            <li>Tops</li>
                            <li>Tshirts</li>
                            <li>Trousers & Capris</li>
                            <li>Shorts & Skirts</li>
                            <li>Co-ords</li>
                            <li>Playsuits</li>
                            <li>Jumpsuits</li>
                            <li>Shrugs</li>
                            <li>Sweaters & SweatShirts</li>
                            <li>Jackets & Coats</li>
                            <li>Blazers & Waistcoats</li>
                          </ul>
                          <div className="py-3" style={{ color: "magenta" }}>
                            <div style={{ fontWeight: "500" }}>Plus Size</div>
                          </div>
                        </div>
                        <div className="col px-4 pt-2 pb-5 pb-3">
                          <div className="" style={{ color: "magenta" }}>
                            <div style={{ fontWeight: "500" }}>Maternity</div>
                          </div>
                          <div className=" py-3" style={{ color: "magenta" }}>
                            <div style={{ fontWeight: "500" }}>
                              Sunglasses & Frames
                            </div>
                          </div>
                          <div className="" style={{ color: "magenta" }}>
                            <div style={{ fontWeight: "500" }}>Footwear</div>
                          </div>

                          <ul className="list-unstyled">
                            <li>Flats</li>
                            <li>Casual Shoes</li>
                            <li>Heels</li>
                            <li>Boots</li>
                            <li>Sports Shoes & Floaters</li>
                          </ul>
                          <hr style={{ color: "grey" }}></hr>
                          <div className="" style={{ color: "magenta" }}>
                            <div style={{ fontWeight: "500" }}>
                              Sports & Active Wear
                            </div>
                          </div>
                          <ul className="list-unstyled">
                            <li>Clothing</li>
                            <li>Footwear</li>
                            <li>Sports Accessories</li>
                            <li>Sports Equipment</li>
                          </ul>
                        </div>
                        <div className="col px-4 pt-2 pb-5">
                          <div className="" style={{ color: "magenta" }}>
                            <div style={{ fontWeight: "500" }}>
                              Lingerie & Sleepwear
                            </div>
                          </div>
                          <ul className="list-unstyled">
                            <li>Bra</li>
                            <li>Briefs</li>
                            <li>Shapewear</li>
                            <li>Shapewear & Loungewear</li>
                            <li>Swimwear</li>
                            <li>Camisoles & Thermals</li>
                          </ul>
                          <hr style={{ color: "grey" }}></hr>
                          <div className="" style={{ color: "magenta" }}>
                            <div style={{ fontWeight: "500" }}>
                              Beauty & Personal Care
                            </div>
                          </div>
                          <ul className="list-unstyled">
                            <li>Makeup</li>
                            <li>Skincare</li>
                            <li>Premium Beauty</li>
                            <li>Lipsticks</li>
                            <li>Fragrances</li>
                          </ul>
                        </div>
                        <div className="col px-4 pt-2 pb-5">
                          <div className="" style={{ color: "magenta" }}>
                            <div style={{ fontWeight: "500" }}>Gadgets</div>
                          </div>
                          <ul className="list-unstyled">
                            <li>Smart Wearables</li>
                            <li>Fitness Gadgets</li>
                            <li>Headphones</li>
                            <li>Speakers</li>
                          </ul>
                          <hr style={{ color: "grey" }}></hr>
                          <div className="" style={{ color: "magenta" }}>
                            <div style={{ fontWeight: "500" }}>Jewellery</div>
                          </div>
                          <ul className="list-unstyled">
                            <li>Fashion Jewellery</li>
                            <li>Fine Jewellery</li>
                            <li>Earings</li>
                          </ul>
                          <div className=" pt-3" style={{ color: "magenta" }}>
                            <div style={{ fontWeight: "500" }}>Backpacks</div>
                          </div>
                          <div className=" py-3" style={{ color: "magenta" }}>
                            <div style={{ fontWeight: "500" }}>
                              Handbags, Bags & Wallets
                            </div>
                          </div>
                          <div className="" style={{ color: "magenta" }}>
                            <div style={{ fontWeight: "500" }}>
                              Luggages & Trolleys
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>

                <li
                  style={{ width: "fit-content", fontSize: "15px" }}
                  className="nav-item px-2 py-lg-0 py-2 align-items-center d-lg-flex"
                  id="kids"
                  onMouseOver={() =>
                    (document.getElementById("backdrop").style.display =
                      "block")
                  }
                  onMouseLeave={() =>
                    (document.getElementById("backdrop").style.display = "none")
                  }
                >
                  <NavLink
                    to="/"
                    className="nav-link text-dark"
                    style={{ fontWeight: "600" }}
                    onMouseOver={() =>
                      (document.getElementById("kids").style.borderBottom =
                        "4px solid #f26a10")
                    }
                    onMouseLeave={() =>
                      (document.getElementById("kids").style.borderBottom =
                        "none")
                    }
                  >
                    KIDS
                  </NavLink>
                  <div className="dropdown-menu rounded-0 border-0">
                    <div className="justify-content-center d-flex">
                      <div className="row gx-0 bg-white">
                        <div className="col px-4 pt-2 pb-5">
                          <div className="" style={{ color: "orangered" }}>
                            <div style={{ fontWeight: "500" }}>
                              Boys Clothing
                            </div>
                          </div>
                          <ul className="list-unstyled">
                            <li>T-Shirts</li>
                            <li>Shirts</li>
                            <li>Shorts</li>
                            <li>Jeans</li>
                            <li>Trousers</li>
                            <li>Clothing Sets</li>
                            <li>Ethnic Wear</li>
                            <li>Track Pants & Pyjamas</li>
                            <li>Jacket, Sweater & SweatShirts</li>
                            <li>Party Wear</li>
                            <li>Innerwear & Thermals</li>
                            <li>Nightwear & Loungewear</li>
                            <li>Value Packs</li>
                          </ul>
                        </div>
                        <div
                          className="col px-4 pt-2 pb-5"
                          style={{
                            backgroundColor: "#f9f9f9",
                            backgroundSize: "cover",
                          }}
                        >
                          <div className="" style={{ color: "orangered" }}>
                            <div style={{ fontWeight: "500" }}>
                              Girls Clothing
                            </div>
                          </div>
                          <ul className="list-unstyled">
                            <li>Dresses</li>
                            <li>Tops</li>
                            <li>Tshirts</li>
                            <li>Clothing Sets</li>
                            <li>Lehenga Cholis</li>
                            <li>Kurta Sets</li>
                            <li>Party Wear</li>
                            <li>Dungarees & Jumpsuits</li>
                            <li>Skirts & Shorts</li>
                            <li>Tights & Leggings</li>
                            <li>Jeans, Trousers & Capris</li>
                            <li>Jacket, Sweater & SweatShirts</li>
                            <li>Innerwear & Thermals</li>
                            <li>Nightwear & Loungewear</li>
                            <li>Value Packs</li>
                          </ul>
                        </div>
                        <div className="col px-4 pt-2 pb-5 pb-3">
                          <div className="" style={{ color: "orangered" }}>
                            <div style={{ fontWeight: "500" }}>Footwear</div>
                          </div>

                          <ul className="list-unstyled">
                            <li>Casual Shoes</li>
                            <li>FlipFlops</li>
                            <li>Sports Shoes</li>
                            <li>Flats</li>
                            <li>Sandals</li>
                            <li>Heels</li>
                            <li>School Shoes</li>
                            <li>Socks</li>
                          </ul>
                          <hr style={{ color: "grey" }}></hr>
                          <div className="" style={{ color: "orangered" }}>
                            <div style={{ fontWeight: "500" }}>Toys</div>
                          </div>
                          <ul className="list-unstyled">
                            <li>Learning & Development</li>
                            <li>Activity Toys</li>
                            <li>Soft Toys</li>
                            <li>Action Figure / Play set</li>
                          </ul>
                        </div>
                        <div className="col px-4 pt-2 pb-5">
                          <div className="" style={{ color: "orangered" }}>
                            <div style={{ fontWeight: "500" }}>Infants</div>
                          </div>
                          <ul className="list-unstyled">
                            <li>Bodysuits</li>
                            <li>Rompers & Sleepsuits</li>
                            <li>Clothing Sets</li>
                            <li>Tshirts & Tops</li>
                            <li>Dresses</li>
                            <li>Bottom wear</li>
                            <li>Winter wear</li>
                            <li>Innerwear & Sleepwear</li>
                            <li>Infant Care</li>
                          </ul>
                          <div className="py-3" style={{ color: "orangered" }}>
                            <div style={{ fontWeight: "500" }}>Home & Bath</div>
                          </div>
                          <div className="" style={{ color: "orangered" }}>
                            <div style={{ fontWeight: "500" }}>
                              Personal care
                            </div>
                          </div>
                        </div>
                        <div className="col px-4 pt-2 pb-5">
                          <div className="" style={{ color: "orangered" }}>
                            <div style={{ fontWeight: "500" }}>
                              Kids Accessories
                            </div>
                          </div>
                          <ul className="list-unstyled">
                            <li>Bags & Backpacks</li>
                            <li>Watches</li>
                            <li>Jewellery & Hair Accessory</li>
                            <li>Sunglasses</li>
                            <li>Masks & Protective Gears</li>
                            <li>Caps & Hats</li>
                          </ul>
                          <hr style={{ color: "grey" }}></hr>
                          <div className="" style={{ color: "orangered" }}>
                            <div style={{ fontWeight: "500" }}>Brands</div>
                          </div>
                          <ul className="list-unstyled">
                            <li>H&M</li>
                            <li>Max Kids</li>
                            <li>Pantaloons</li>
                            <li>United Colors Of Benetton Kids</li>
                            <li>YK</li>
                            <li>U.S Polo Assn. Kids</li>
                            <li>Mothercare</li>
                            <li>HRX</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>

                <li
                  style={{ width: "fit-content", fontSize: "15px" }}
                  className="nav-item px-2 py-lg-0 py-2 align-items-center d-lg-flex"
                  id="h&l"
                  onMouseOver={() =>
                    (document.getElementById("backdrop").style.display =
                      "block")
                  }
                  onMouseLeave={() =>
                    (document.getElementById("backdrop").style.display = "none")
                  }
                >
                  <NavLink
                    to="/"
                    className="nav-link text-dark homeLiving"
                    style={{ fontWeight: "600", width: "130px" }}
                    onMouseOver={() =>
                      (document.getElementById("h&l").style.borderBottom =
                        "4px solid #f2c210")
                    }
                    onMouseLeave={() =>
                      (document.getElementById("h&l").style.borderBottom =
                        "none")
                    }
                  >
                    HOME & LIVING
                  </NavLink>

                  <div className="dropdown-menu rounded-0 border-0">
                    <div className="justify-content-center d-flex">
                      <div className="row gx-0 bg-white">
                        <div className="col px-4 pt-2 pb-5">
                          <div className="" style={{ color: "#e7bc00" }}>
                            <div style={{ fontWeight: "500" }}>
                              Bed Linen & Furnishing
                            </div>
                          </div>
                          <ul className="list-unstyled">
                            <li>Bed Runners</li>
                            <li>Mattress Protectors</li>
                            <li>Bedsheets</li>
                            <li>Bedding Sets</li>
                            <li>Blankets, Quilts & Dohars</li>
                            <li>Pillows & Pillow Covers</li>
                            <li>Bed Covers</li>
                            <li>Diwan Sets</li>
                            <li>Chair Pads & Covers</li>
                            <li>Sofa Covers</li>
                          </ul>
                          <div className="" style={{ color: "#e7bc00" }}>
                            <div style={{ fontWeight: "500" }}>Flooring</div>
                          </div>
                          <ul className="list-unstyled">
                            <li>Floor Runner</li>
                            <li>Carpets</li>
                            <li>Floor Mats & Dhurries</li>
                            <li>Door Maths</li>
                          </ul>
                        </div>
                        <div
                          className="col px-4 pt-2 pb-5"
                          style={{
                            backgroundColor: "#f9f9f9",
                            backgroundSize: "cover",
                          }}
                        >
                          <div className="" style={{ color: "#e7bc00" }}>
                            <div style={{ fontWeight: "500" }}>Bath</div>
                          </div>
                          <ul className="list-unstyled">
                            <li>Bath Towels</li>
                            <li>Hand & Face Towels</li>
                            <li>Beach Towels</li>
                            <li>Towels Set</li>
                            <li>Bath Rugs</li>
                            <li>Bath Robes</li>
                            <li>Bathroom Accessories</li>
                            <li>Shower Curtains</li>
                          </ul>
                          <div className="" style={{ color: "#e7bc00" }}>
                            <div style={{ fontWeight: "500" }}>
                              Lamps & Lighting
                            </div>
                          </div>
                          <ul className="list-unstyled">
                            <li>Floor Lamps</li>
                            <li>Ceiling Lamps</li>
                            <li>Table Lamps</li>
                            <li>Wall Lamps</li>
                            <li>Outdoor Lamps</li>
                            <li>String Lights</li>
                          </ul>
                        </div>
                        <div className="col px-4 pt-2 pb-5 pb-3">
                          <div className="" style={{ color: "#e7bc00" }}>
                            <div style={{ fontWeight: "500" }}>Home Decor</div>
                          </div>

                          <ul className="list-unstyled">
                            <li>Plants & Planters</li>
                            <li>Aromas & Candles</li>
                            <li>Clocks</li>
                            <li>Mirrors</li>
                            <li>Wall Decor</li>
                            <li>Festive Decor</li>
                            <li>Pooja Essentials</li>
                            <li>Wall Shelves</li>
                            <li>Fountains</li>
                            <li>Showpieces & Vases</li>
                            <li>Ottoman</li>
                          </ul>
                          <hr style={{ color: "grey" }}></hr>
                          <div className="" style={{ color: "#e7bc00" }}>
                            <div style={{ fontWeight: "500" }}>
                              Cushions & Cushion Covers
                            </div>
                          </div>
                          <div className="py-3" style={{ color: "#e7bc00" }}>
                            <div style={{ fontWeight: "500" }}>Curtains</div>
                          </div>
                        </div>
                        <div className="col px-4 pt-2 pb-5">
                          <div className="" style={{ color: "#e7bc00" }}>
                            <div style={{ fontWeight: "500" }}>
                              Home Gift Sets
                            </div>
                          </div>
                          <ul className="list-unstyled">
                            <li>Kitchen & Table</li>
                            <li>Dinnerware & Serveware</li>
                            <li>Cups and Mugs</li>
                            <li>Bakeware & Cookware</li>
                            <li>Kitchen Storage & Tools</li>
                            <li>Bar & Drinkware</li>
                            <li>Table Covers & Furnishings</li>
                          </ul>
                          <div className="py-3" style={{ color: "#e7bc00" }}>
                            <div style={{ fontWeight: "500" }}>Storage</div>
                          </div>
                          <ul className="list-unstyled">
                            <li>Bins</li>
                            <li>Hangers</li>
                            <li>Organisers</li>
                            <li>Hooks & Holders</li>
                            <li>Laundry Bags</li>
                          </ul>
                        </div>
                        <div className="col px-4 pt-2 pb-5">
                          <div className="" style={{ color: "#e7bc00" }}>
                            <div style={{ fontWeight: "500" }}>Brands</div>
                          </div>
                          <ul className="list-unstyled">
                            <li>H&M</li>
                            <li>Marks & Spencer</li>
                            <li>Home Center</li>
                            <li>Spaces</li>
                            <li>D' Decor</li>
                            <li>Story@Home</li>
                            <li>Pure Home & Living</li>
                            <li>Raymond Home</li>
                            <li>Maspar</li>
                            <li>Trident</li>
                            <li>Cortina</li>
                            <li>Random</li>
                            <li>Ellementry</li>
                            <li>ROMEE</li>
                            <li>SEJ by Nisha Gupta</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>

                <li
                  style={{ width: "fit-content", fontSize: "15px" }}
                  className="nav-item px-2 py-lg-0 py-2 align-items-center d-lg-flex"
                  id="beauty"
                  onMouseOver={() =>
                    (document.getElementById("backdrop").style.display =
                      "block")
                  }
                  onMouseLeave={() =>
                    (document.getElementById("backdrop").style.display = "none")
                  }
                >
                  <NavLink
                    to="/"
                    className="nav-link text-dark"
                    style={{ fontWeight: "600" }}
                    onMouseOver={() =>
                      (document.getElementById("beauty").style.borderBottom =
                        "4px solid #0db7af")
                    }
                    onMouseLeave={() =>
                      (document.getElementById("beauty").style.borderBottom =
                        "none")
                    }
                  >
                    BEAUTY
                  </NavLink>

                  <div className="dropdown-menu rounded-0 border-0">
                    <div className="justify-content-center d-flex">
                      <div className="row gx-0 bg-white">
                        <div className="col px-4 pt-2 pb-5">
                          <div className="" style={{ color: "#069ebf" }}>
                            <div style={{ fontWeight: "500" }}>Makeup</div>
                          </div>
                          <ul className="list-unstyled">
                            <li>Lipstick</li>
                            <li>Lip Gloss</li>
                            <li>Lip Liner</li>
                            <li>Mascara</li>
                            <li>Eyeliner</li>
                            <li>Kajal</li>
                            <li>Eyeshadow</li>
                            <li>Foundation</li>
                            <li>Primer</li>
                            <li>Concealer</li>
                            <li>Compact</li>
                            <li>Nail Polish</li>
                          </ul>
                        </div>
                        <div
                          className="col px-4 pt-2 pb-5"
                          style={{
                            backgroundColor: "#f9f9f9",
                            backgroundSize: "cover",
                          }}
                        >
                          <div className="" style={{ color: "#069ebf" }}>
                            <div style={{ fontWeight: "500" }}>
                              Skincare, Bath & Body
                            </div>
                          </div>
                          <ul className="list-unstyled">
                            <li>Face Moisturiser</li>
                            <li>Cleanser</li>
                            <li>Masks & Peel</li>
                            <li>Sunscreen</li>
                            <li>Serum</li>
                            <li>Face Wash</li>
                            <li>Eye Cream</li>
                            <li>Lip Balm</li>
                            <li>Body Lotion</li>
                            <li>Body Wash</li>
                            <li>Body Scrub</li>
                            <li>Hand Cream</li>
                          </ul>
                          <div className="py-3" style={{ color: "#069ebf" }}>
                            <div style={{ fontWeight: "500" }}>Baby Care</div>
                          </div>
                          <div className="" style={{ color: "#069ebf" }}>
                            <div style={{ fontWeight: "500" }}>Masks</div>
                          </div>
                        </div>
                        <div className="col px-4 pt-2 pb-5 pb-3">
                          <div className="" style={{ color: "#069ebf" }}>
                            <div style={{ fontWeight: "500" }}>Haircare</div>
                          </div>

                          <ul className="list-unstyled">
                            <li>Shampoo</li>
                            <li>Conditioner</li>
                            <li>Hair Cream</li>
                            <li>Hair Oil</li>
                            <li>Hair Gel</li>
                            <li>Hair Color</li>
                            <li>Hair Serum</li>
                            <li>Hair Accessory</li>
                          </ul>
                          <hr style={{ color: "grey" }}></hr>
                          <div className="" style={{ color: "#069ebf" }}>
                            <div style={{ fontWeight: "500" }}>Fragrances</div>
                          </div>
                          <ul className="list-unstyled">
                            <li>Perfume</li>
                            <li>Deodrants</li>
                            <li>Body Mist</li>
                          </ul>
                        </div>
                        <div className="col px-4 pt-2 pb-5">
                          <div className="" style={{ color: "#069ebf" }}>
                            <div style={{ fontWeight: "500" }}>Appliances</div>
                          </div>
                          <ul className="list-unstyled">
                            <li>Hair Straightener</li>
                            <li>Hair Dryer</li>
                            <li>Epilator</li>
                          </ul>
                          <hr style={{ color: "grey" }}></hr>
                          <div className="py-3" style={{ color: "#069ebf" }}>
                            <div style={{ fontWeight: "500" }}>
                              Men's Grooming
                            </div>
                          </div>
                          <ul className="list-unstyled">
                            <li>Trimmers</li>
                            <li>Beard Oil</li>
                            <li>Hair Wax</li>
                          </ul>
                          <hr style={{ color: "grey" }}></hr>
                          <div className="" style={{ color: "#069ebf" }}>
                            <div style={{ fontWeight: "500" }}>
                              Beauty Gift & Makeup Set
                            </div>
                          </div>
                          <ul className="list-unstyled">
                            <li>Beauty Gift</li>
                            <li>Makeup Kit</li>
                          </ul>
                          <div className="py-3" style={{ color: "#069ebf" }}>
                            <div style={{ fontWeight: "500" }}>
                              Premium Beauty
                            </div>
                          </div>
                          <div className="" style={{ color: "#069ebf" }}>
                            <div style={{ fontWeight: "500" }}>
                              Wellness & Hygiene
                            </div>
                          </div>
                        </div>
                        <div className="col px-4 pt-2 pb-5">
                          <div className="" style={{ color: "#069ebf" }}>
                            <div style={{ fontWeight: "500" }}>Top Brands</div>
                          </div>
                          <ul className="list-unstyled">
                            <li>Lakme</li>
                            <li>Maybeline</li>
                            <li>LOreal</li>
                            <li>Philips</li>
                            <li>Bath & Body Works</li>
                            <li>THE BODY SHOP</li>
                            <li>Biotique</li>
                            <li>Mamaearth</li>
                            <li>MCaffeine</li>
                            <li>Nivea</li>
                            <li>Lotus Herbals</li>
                            <li>LOreal Professionnel</li>
                            <li>KAMA AYURVEDA</li>
                            <li>M.A.C</li>
                            <li>Forest Essentials</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>

                <li
                  style={{ width: "fit-content", fontSize: "15px" }}
                  className="nav-item px-2 py-lg-0 py-2 align-items-center d-lg-flex"
                  id="studio"
                >
                  <NavLink
                    to="/"
                    className="nav-link text-dark position-relative"
                    style={{ fontWeight: "600" }}
                    onMouseOver={() =>
                      (document.getElementById("studio").style.borderBottom =
                        "4px solid #ff3f6c")
                    }
                    onMouseLeave={() =>
                      (document.getElementById("studio").style.borderBottom =
                        "none")
                    }
                  >
                    STUDIO
                    <span className="position-absolute top-0 start-100 translate-middle badge text-danger">
                      NEW
                    </span>
                  </NavLink>
                </li>

                <li className="searchbar w-50 pl-lg-5 pt-lg-0 pt-3">
                  {" "}
                  <form className="d-flex align-items-center mr-3 position-relative">
                    <div
                      className="fa fa-search pl-3"
                      style={{
                        zIndex: "1",
                        color: "#808080d4",
                        position: "absolute",
                      }}
                    ></div>
                    <input
                      className="form-control pl-5 me-2 shadow-none position-relative w-100 border-0"
                      type="search"
                      placeholder="Search for products, brands and more"
                      aria-label="Search"
                      onChange={changeHeading}
                      style={{ background: "rgb(241 241 241)" }}
                    />
                    <div
                      className="bg-white search position-absolute"
                      style={{
                        boxShadow: "0px 1px 0px 1px #c0c0c042",
                        height: "fit-content",
                        maxHeight: "60vh",
                        overflowY: "scroll",
                        top: "38px",
                        width: "100%",
                        zIndex: 6,
                      }}
                    >
                      {search
                        .filter((e) => {
                          if (searchTerm === "") {
                            return;
                          } else if (
                            e.toLowerCase().includes(searchTerm.toLowerCase())
                          ) {
                            return e;
                          }
                        })
                        .map((e) => {
                          return (
                            <NavLink to="/" className="text-decoration-none ">
                              <div
                                className="py-2 pl-3 item"
                                style={{ color: "#343a40b0" }}
                              >
                                {e}
                              </div>
                            </NavLink>
                          );
                        })}
                    </div>
                  </form>
                </li>
              </ul>

              <div className="list-unstyled align-items-center justify-content-center py-lg-0 py-4 d-flex ml-lg-auto mb-2 mb-lg-0 d-flex">
                <div
                  className="px-2 navbar-nav"
                  id="loginProfileIcon"
                  style={{ width: "fit-content" }}
                >
                  <div className="text-center nav-item align-items-center d-lg-flex">
                    <NavLink
                      to="/"
                      className="nav-link text-dark"
                      style={{ fontWeight: "600" }}
                    >
                      <div>
                        <div
                          className="fa fa-user-o"
                          style={{ fontSize: "17px" }}
                        ></div>
                        <div style={{ fontSize: "12px", fontWeight: "500" }}>
                          Profile
                        </div>
                      </div>
                    </NavLink>
                    <div
                      className="dropdown-menu rounded-0 border-0"
                      style={{ left: "76%" }}
                    >
                      <div
                        className="p-3 bg-white"
                        style={{
                          width: "20vw",
                          boxShadow: "0 1px 10px rgb(0 0 0 / 8%)",
                        }}
                      >
                        <ul
                          className="list-unstyled m-0"
                          style={{ fontSize: "14px", color: "#3e4152" }}
                        >
                          <NavLink
                            to="/profile"
                            id="setupProfile"
                            style={{ display: "none" }}
                            className="text-decoration-none"
                          >
                            <div style={{ ottom: "1px solid #8080804d" }}>
                              <div
                                className="text-dark"
                                style={{ fontWeight: "600" }}
                              >
                                Hello User
                              </div>
                              <div
                                className="mb-1"
                                style={{ color: "#3e4152" }}
                              >
                                73xxxxxxxx
                              </div>
                            </div>
                          </NavLink>
                          <div id="toLogin" style={{ color: "black" }}>
                            <div style={{ fontWeight: "600" }}>Welcome</div>
                            <div>to access account & manage orders</div>
                            <NavLink to="/login">
                              <div
                                className="btn btn-danger mt-3 mb-2 bg-transparent loginBtn"
                                style={{
                                  color: "#ff3f6c",
                                  transition: "0.5s",
                                  fontWeight: "600",
                                  border: "1px solid #eaeaec",
                                }}
                              >
                                LOGIN / SIGNUP
                              </div>
                            </NavLink>
                          </div>
                          <hr style={{ color: "#A9ABB3" }}></hr>
                          <li style={{ marginTop: "12px" }}>Orders</li>
                          <li>Whishlist</li>
                          <li>Gift Cards</li>
                          <li>Contact Us</li>
                          <li>
                            Myntra Insider
                            <span
                              className="bg-danger rounded-pill text-white ml-3"
                              style={{ fontSize: "10px", padding: "2px 5px" }}
                            >
                              New
                            </span>
                          </li>
                          <hr style={{ color: "#A9ABB3" }}></hr>
                          <li>Myntra Credit</li>
                          <li>Coupons</li>
                          <li>Saved Cards</li>
                          <li>Saved VPA</li>
                          <li>Saved Addresses</li>
                          <hr style={{ color: "#A9ABB3" }}></hr>
                          <li>Edit Profile</li>
                          <li>Logout</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="px-3" style={{ width: "fit-content" }}>
                  <div className=" text-center">
                    <div
                      className="fa fa-heart-o"
                      style={{ fontSize: "17px" }}
                    ></div>
                    <div style={{ fontSize: "12px" }}>
                      <div style={{ fontWeight: "500" }}>WhishList</div>
                    </div>
                  </div>
                </div>
                <div
                  className="px-3 d-flex position-relative"
                  style={{ width: "fit-content" }}
                >
                  <NavLink
                    to={`/myntra/${1}/bag`}
                    className="fa fa-shopping-bag text-decoration-none text-dark"
                  >
                    <div className="text-center font-weight-bold pt-2">
                      <div style={{ fontSize: "12px" }}>
                        <div style={{ fontWeight: "500" }}>Bag</div>
                      </div>
                    </div>
                  </NavLink>
                  <span
                    className="badge bg-danger position-absolute ml-3 mb-2"
                    style={{
                      fontSize: "10px",
                      height: "fit-content",
                      borderRadius: "50px",
                      top: "-5px",
                      left: "11px",
                    }}
                  >
                    1
                  </span>
                </div>
              </div>
            </div>
          </div>
        </nav>
      ) : (
        <nav
          id="navbar"
          className="navbar navbar-expand-lg bg-white p-0 m-0 px-lg-5"
          style={{ boxShadow: "0 4px 12px 0 rgb(0 0 0 / 5%)", zIndex: "6" }}
        >
          <div className="navbar-nav w-100 py-lg-3 px-3">
            <div className="align-items-center d-flex">
              <div
                className="fa fa-bars fa-md pr-3"
                style={{ fontSize: "18px" }}
                onClick={openDrawer}
              ></div>
              <NavLink to="/" className="text-decoration-none">
                <div
                  style={{
                    color: "black",
                    fontWeight: "500",
                    fontSize: "18px",
                  }}
                >
                  Myntra
                </div>
              </NavLink>
              <div className="list-unstyled ml-auto align-items-center justify-content-center d-flex">
                <div className="px-2" style={{ width: "fit-content" }}>
                  <div className=" text-center">
                    <div
                      className="fa fa-bookmark-o"
                      style={{ fontSize: "18px" }}
                    ></div>
                  </div>
                </div>
                <div className="px-2" style={{ width: "fit-content" }}>
                  <div className="">
                    {searchBar ? (
                      <li
                        className="position-absolute"
                        style={{
                          overflowY: "scroll",
                          height: "100vh",
                          width: "100%",
                          left: 0,
                          background: "#eee",
                          top: 0,
                          zIndex: 9,
                        }}
                      >
                        <form
                          className="d-flex align-items-center position-relative"
                          style={{ boxShadow: "0px 0px 0px 1px #c0c0c094" }}
                        >
                          <div
                            className="fa fa-arrow-left position-absolute fa-lg pl-2"
                            onClick={() => setSearchBar(false)}
                            style={{
                              zIndex: "8",
                              color: "black",
                            }}
                          ></div>
                          <input
                            className="form-control bg-white rounded-0 shadow-none w-100 border-0"
                            type="search"
                            placeholder="Search for brands & products"
                            onChange={changeHeading}
                            style={{
                              height: "45px",
                              paddingLeft: "40px",
                              zIndex: 7,
                            }}
                          />
                          <div className="justify-content-end d-flex">
                            <div
                              className="fa fa-search text-danger align-items-center d-flex bg-white fa-lg px-3"
                              style={{
                                zIndex: "7",
                                height: "45px",
                              }}
                            ></div>
                          </div>
                          <div
                            className="bg-white search position-absolute"
                            style={{
                              boxShadow: "0px 1px 0px 1px #c0c0c042",
                              height: "fit-content",
                              maxHeight: "60vh",
                              overflowY: "scroll",
                              top: "38px",
                              width: "100%",
                              zIndex: 6,
                            }}
                          >
                            {search
                              .filter((e) => {
                                if (searchTerm === "") {
                                  return;
                                } else if (
                                  e
                                    .toLowerCase()
                                    .includes(searchTerm.toLowerCase())
                                ) {
                                  return e;
                                }
                              })
                              .map((e) => {
                                return (
                                  <NavLink
                                    to="/"
                                    className="text-decoration-none "
                                  >
                                    <div
                                      className="py-2 pl-3 item"
                                      style={{ color: "#343a40b0" }}
                                    >
                                      {e}
                                    </div>
                                  </NavLink>
                                );
                              })}
                          </div>
                        </form>

                        <div
                          className="bg-white my-3 p-2"
                          style={{ boxShadow: "0px 0px 0px 1px #c0c0c094" }}
                        >
                          <h2
                            className="py-1"
                            style={{ fontSize: "12px", fontWeight: "500" }}
                          >
                            RECENT SEARCHES
                          </h2>
                          <div className="dealsRow">
                            <div className="d-flex">
                              {Deals.map((image) => (
                                <div className="pr-3" style={{ padding: "0" }}>
                                  <NavLink to="/myntra">
                                    <img
                                      src={image}
                                      style={{
                                        width: "70px",
                                        height: "70px",
                                        borderRadius: "50px",
                                      }}
                                      alt="Deals of the day"
                                    />
                                  </NavLink>
                                  <div
                                    className="text-center pt-2"
                                    style={{ fontSize: "12px" }}
                                  >
                                    Name
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div
                          className="bg-white my-3 p-2"
                          style={{ boxShadow: "0px 0px 0px 1px #c0c0c094" }}
                        >
                          <h2 className="py-1" style={{ fontSize: "12px" }}>
                            TRENDING ON MYNTRA
                          </h2>
                          <div className="dealsRow">
                            <div className="d-flex">
                              {Deals.map((image) => (
                                <div className="" style={{ padding: "0" }}>
                                  <NavLink to="/myntra">
                                    <img
                                      src={image}
                                      style={{
                                        width: "20vh",
                                        height: "30vh",
                                      }}
                                      alt="Deals of the day"
                                    />
                                  </NavLink>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </li>
                    ) : (
                      <div></div>
                    )}
                  </div>

                  <div className=" text-center">
                    <div
                      className="fa fa-search"
                      onClick={() => setSearchBar(true)}
                      style={{ fontSize: "18px" }}
                    ></div>
                  </div>
                </div>
                <div className="px-2" style={{ width: "fit-content" }}>
                  <div className=" text-center">
                    <div
                      className="fa fa-heart-o"
                      style={{ fontSize: "18px" }}
                    ></div>
                  </div>
                </div>
                <div
                  className="px-2 d-flex position-relative"
                  style={{ width: "fit-content" }}
                >
                  <NavLink
                    to={`/myntra/${1}/bag`}
                    className="fa fa-shopping-bag text-decoration-none text-dark"
                    style={{ fontSize: "18px" }}
                  ></NavLink>
                  <span
                    className="badge bg-danger position-absolute ml-3 mb-2"
                    style={{
                      fontSize: "8px",
                      height: "fit-content",
                      borderRadius: "50px",
                      top: "-3px",
                      left: "3px",
                    }}
                  >
                    1
                  </span>
                </div>
              </div>
            </div>
          </div>
        </nav>
      )}
      <div>
        {show ? (
          <div className="" style={{ height: "100%" }}>
            <div
              className="drawer bg-white position-absolute"
              id="drawer"
              style={{
                height: "100vh",
                width: "80vw",
                top: 0,
                zIndex: 8,
                overflowY: "scroll",
              }}
            >
              <div
                className="p-3"
                id="userLoggedIn"
                style={{ background: "#272027fa", display: "none" }}
              >
                <div className="d-flex">
                  <div
                    className="fa fa-user-o fa-lg rounded bg-white shadow-lg"
                    style={{ height: "fit-content", padding: "12px" }}
                  ></div>
                  <div
                    className="ml-auto fa-2x pt-2 text-white"
                    onClick={closeDrawer}
                    style={{ lineHeight: "0", marginRight: "-4px" }}
                  >
                    &times;
                  </div>
                </div>
                <div className="d-flex align-items-center pt-2">
                  <div className="text-white shadow-lg">user</div>
                  <div className="ml-auto fa fa-angle-right text-white"></div>
                </div>
              </div>

              <div
                className="position-relative"
                id="userNotLoggedIn"
                style={{ display: "block" }}
              >
                <div
                  className="ml-auto m-2 position-absolute text-center"
                  style={{
                    background: "rgb(0,0,0,0.6)",
                    borderRadius: "50px",
                    border:"2px solid black",
                    right: 0,
                    fontSize: "24px",
                    width: "30px",
                    height: "30px",
                    cursor: "pointer",
                    lineHeight: "0",
                    zIndex: "1",
                    color: "white",
                    paddingTop: "11px",
                  }}
                  onClick={closeDrawer}
                >
                  &times;
                </div>
                <NavLink to="/login" onClick={closeDrawer}>
                  <img src={loginImg} className="img-fluid" />
                  <div
                    className="pl-3 position-absolute align-items-center d-flex"
                    style={{
                      width: "calc(57%)",
                      background: "rgb(255 241 243)",
                      color: "red",
                      bottom: "0",
                      height: "100%",
                      left: "0",
                    }}
                  >
                    <div>
                      <div className="Off">
                        <div
                          style={{ fontWeight: "700", fontSize: "18px" }}
                          className="text-dark"
                        >
                          Flat ₹200 OFF
                        </div>
                        <div
                          style={{ fontWeight: "700", fontSize: "18px" }}
                          className="text-dark"
                        >
                          + Free Shiping
                        </div>
                        <div
                          className="mt-1"
                          style={{ color: "grey", fontSize: "14px" }}
                        >
                          On First Order
                        </div>
                      </div>
                      <div
                        className="mt-2"
                        style={{ fontWeight: "500", fontSize: "14px" }}
                      >
                        {" "}
                        SIGN UP. LOGIN
                      </div>
                    </div>
                  </div>
                </NavLink>
              </div>

              <div className="" style={{ fontSize: "15px" }}>
                <div className="px-3 pt-2 pb-1">
                  {sidebar.map((e) => {
                    return (
                      <div key={e.id} style={{ paddingBottom: "5px" }}>
                        <Accordion flush>
                          <Accordion.Item eventKey={e.id}>
                            <Accordion.Header>
                              <div
                                className="d-flex text-dark align-items-center"
                                style={{ fontWeight: "500", fontSize: "1rem" }}
                              >
                                {e.name}
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
                              {e.subField.map((e1) => {
                                return (
                                  <Accordion
                                    flush
                                    key={e1.id}
                                    id="alignInnerMenu"
                                    style={{ paddingBottom: "5px" }}
                                  >
                                    <Accordion.Item eventKey="0">
                                      <Accordion.Header>
                                        <div className="d-flex align-items-center">
                                          {e1.name1}
                                          <div
                                            className="ml-auto"
                                            style={{ display: e1.display }}
                                          >
                                            <span
                                              id="changeArrow"
                                              className="fa fa-angle-right"
                                              style={{ color: "grey" }}
                                            ></span>
                                          </div>
                                        </div>
                                      </Accordion.Header>

                                      <Accordion.Body
                                        style={{ display: e1.display }}
                                      >
                                        <ul
                                          className="list-unstyled"
                                          style={{ color: "black" }}
                                        >
                                          {" "}
                                          {e1.subField1.map((e2) => {
                                            return <li>{e2.name2}</li>;
                                          })}
                                        </ul>
                                      </Accordion.Body>
                                    </Accordion.Item>
                                  </Accordion>
                                );
                              })}
                            </Accordion.Body>
                          </Accordion.Item>
                        </Accordion>
                      </div>
                    );
                  })}
                </div>
              </div>
              <hr className="m-0 my-2"></hr>
              <div className="px-3" style={{ color: "black" }}>
                <div className="py-2">Account</div>
                <div className="py-2">Orders</div>
                <div className="py-2">
                  Myntra Studio{" "}
                  <span
                    className="rounded-pill bg-transparent btn btn-danger text-danger px-2 p-0"
                    style={{ fontSize: "8px" }}
                  >
                    <div style={{ fontWeight: "500" }}>NEW</div>
                  </span>
                </div>
                <div className="py-2">
                  Myntra Mall{" "}
                  <span
                    className="rounded-pill bg-transparent btn btn-danger text-danger px-2 p-0"
                    style={{ fontSize: "8px" }}
                  >
                    <div style={{ fontWeight: "500" }}>NEW</div>
                  </span>
                </div>
                <div className="py-2">Myntra Insider</div>
                <div className="py-2">Gift Cards</div>
                <div className="py-2">Contact Us</div>
                <div className="py-2">FAQs</div>
                <div className="pt-2 pb-3">Legal</div>
              </div>
              <img src={app} className="img-fluid w-100" />
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </section>
  );
}
export default Navbar;
