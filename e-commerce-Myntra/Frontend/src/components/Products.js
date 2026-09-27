import React, { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import StarsRating from "stars-rating";
import ImageSkeleton from "./ImageSkeleton";
import { ProgressBar } from "react-bootstrap";
function Products() {
  window.scroll(0, 0);
  const { id } = useParams();

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [isActive, setActive] = useState(false);

  const similarData = async () => {
    const res = await fetch("https://fakestoreapi.com/products");
    setData(await res.json());
  };
  const getData = async () => {
    const res = await fetch(`https://fakestoreapi.com/products/${id}`);
    setItems(await res.json());

    setLoading(false);
  };

  useEffect(() => {
    getData();
    similarData();
    document.title = `Online Shopping for Women, Men, Kids Fashion & Lifestyle - Myntra`;
  }, []);

  return (
    <div id="products">
    <div className="backdrop" id="backdrop">.</div>
      {loading ? (
        <ImageSkeleton />
      ) : (
        <div className="row gx-0" key={items.id}>
          <div className="col-lg-6 col-12 justify-content-center mt-lg-5 d-flex">
            <div className="m-5" style={{ top: "0", position: "sticky" }}>
              <img
                src={items.image}
                className="img-fluid mt-lg-5"
                style={{ maxWidth: "30vw" }}
              />
            </div>
          </div>
          <div className="col-lg-6 col-12 p-lg-5 p-3">
            <div style={{ fontSize: "24px" }}>
              <b>Fjallraven</b>
            </div>
            <div style={{ fontSize: "20px", color: "#535665" }}>
              {items.title}
            </div>
            <div
              className="px-2 mt-2"
              style={{ border: "1px solid #bfc0c6", width: "fit-content" }}
            >
              {items.rating && items.rating.rate}{" "}
              <span className="fa fa-star fa-md pr-2 text-info"></span>| 25
              Ratings
            </div>
            <div>
              <StarsRating
                className=""
                count={5}
                // onChange={ratingChanged}
                size={26}
                value={items.rating && items.rating.rate}
                edit={false}
                color2={"#ffd700"}
              />
            </div>

            <hr style={{ height: "0.1px" }}></hr>
            <div className="addtobag">
              <div className="">
                <div className="row">
                  <div className="col-lg-12 col-md-6 col-sm-6 col-12">
                    <div className="pt-1">
                      <span
                        style={{
                          fontWeight: "500",
                          fontSize: "24px",
                        }}
                      >
                        $ {items.price}
                      </span>
                      <span
                        style={{
                          fontSize: "12px",
                          fontWeight: "lighter",
                          color: "grey",
                        }}
                      >
                        &nbsp;&nbsp;₹<del>1849</del>
                      </span>
                      <span
                        style={{
                          fontSize: "12px",
                          fontWeight: "lighter",
                          color: "orange",
                        }}
                      >
                        &nbsp;&nbsp;(<b>Rs. 1150 OFF</b>)
                      </span>
                    </div>
                    <div className="text-success py-2">
                      <b>inclusive of all taxes</b>
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-6 col-sm-6 col-12">
                    <div className="d-flex py-2">
                      <div className="pr-5" style={{ fontSize: "16px" }}>
                        <b>SELECT SIZE</b>
                      </div>
                      <div style={{ fontSize: "14px", color: "#FF3E6C" }}>
                        <b>SIZE CHART</b>
                        <span className="fa fa-angle-right font-weight-bolder pl-2 fa-lg"></span>
                      </div>
                    </div>
                    <div className="d-flex">
                      <div className="align-items-center justify-content-center d-flex SelectSize">
                        S
                      </div>
                      <div className="align-items-center justify-content-center d-flex mx-3 SelectSize">
                        M
                      </div>
                      <div className="align-items-center justify-content-center d-flex SelectSize">
                        L
                      </div>
                      <div className="align-items-center justify-content-center d-flex mx-3 SelectSize">
                        XL
                      </div>
                    </div>
                  </div>
                </div>
                <div className="justify-content-lg-start justify-content-center d-flex">
                  <NavLink
                    to={`/myntra/${id}/bag`}
                    className="btn btn-danger mt-4 mb-3 px-5 py-3 addBtn"
                    style={{ width: "285px" }}
                  >
                    <span className="fa fa-shopping-bag fa-lg pr-3"></span>ADD
                    TO BAG
                  </NavLink>
                </div>
              </div>
            </div>

            <hr style={{ height: "1px" }}></hr>

            <div className="py-2" style={{ fontSize: "16px" }}>
              <b>DELIVERY OPTIONS</b>
              <div className="mt-4 mb-2 searchbox align-content-center d-flex">
                <input
                  type="search"
                  placeholder="PINCODE"
                  className="form-control px-4 position-relative bg-white"
                  style={{ maxWidth: "350px" }}
                  required
                />

                <div className="justify-content-end d-flex">
                  <div
                    className="btn font-weight-bolder text-danger position-absolute"
                    style={{ fontSize: "14px" }}
                  >
                    CHANGE
                  </div>
                </div>
              </div>

              <div className="py-4">
                <div style={{ fontWeight: "500" }}>
                  <span
                    className="fa-2x fa fa-truck pr-4"
                    style={{ color: "#696e79" }}
                  ></span>
                  Get it by{" "}
                  {new Date().toLocaleString("en-US", {
                    day: "2-digit",
                    month: "long",
                    year: "2-digit",
                  })}
                </div>
                <div className="py-3" style={{ fontWeight: "500" }}>
                  <span
                    className="fa-2x fa fa-money pr-4"
                    style={{ color: "#696e79" }}
                  ></span>
                  Pay on delivery available
                </div>
                <div>
                  <div
                    className="d-flex align-items-center"
                    style={{ fontWeight: "500" }}
                  >
                    <span
                      className="fa-2x fa fa-exchange pr-4"
                      style={{ color: "#696e79" }}
                    ></span>
                    Easy 30 days return & exchange available
                    <div
                      className="text-danger ml-auto pr-md-5"
                      style={{ fontSize: "14px", fontWeight: "bolder" }}
                    >
                      MORE INFO
                      <span className="fa fa-angle-right font-weight-bolder px-2 fa-lg"></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pb-4" style={{ fontSize: "16px" }}>
              100% Original Products
            </div>

            <div className="py-2" style={{ fontSize: "16px" }}>
              <b>BEST OFFERS</b>
              <span className="fa fa-tag fa-lg px-2"></span>
              <div className="py-3">
                This product is already at its best price
              </div>
            </div>

            <div className="py-2" style={{ fontSize: "16px" }}>
              <b>EMI option available</b>
              <li className="py-3">EMI starting from $ 2/month</li>
            </div>

            <hr style={{ height: "1px" }}></hr>

            <div className="py-2" style={{ fontSize: "16px" }}>
              <b>PRODUCT DETAILS </b>
              <span className="fa fa-file-text-o"></span>
              <div className="py-2">
                <div style={{ fontWeight: "500" }}>{items.category}</div>
                <div>{items.description}</div>
              </div>
            </div>

            <hr style={{ height: "1px" }}></hr>

            <div className="py-2" style={{ fontSize: "16px" }}>
              <b>RATINGS</b>
              <span className="fa fa-star-o fa-lg px-2"></span>

              <div className="row gx-0">
                <div
                  className="col-lg-2 col-6 align-items-center justify-content-lg-start justify-content-end pr-lg-0 pr-4 d-flex"
                  style={{ borderRight: "0.1px solid #80808075" }}
                >
                  <div className="d-flex pr-lg-0 pr-3">
                    <span style={{ fontSize: "48px", fontWeight: "500" }}>
                      {items.rating && items.rating.rate}
                    </span>
                    <span className="fa fa-star text-info fa-lg px-2 mt-auto mb-3"></span>
                  </div>
                </div>
                <div
                  className="col-lg-6 col-6 pl-5"
                  style={{ color: "#A9ABB3" }}
                >
                  <div className="d-flex align-items-center">
                    5
                    <span
                      className="fa fa-star px-2"
                      style={{ fontSize: "10px", color: "#8080806b" }}
                    ></span>
                    <ProgressBar
                      className="w-50"
                      style={{ height: "5px" }}
                      variant="success"
                      now={50}
                    />
                    <span style={{ fontSize: "12px", color: "black" }}>
                      &nbsp;662
                    </span>
                  </div>
                  <div className="d-flex align-items-center">
                    4
                    <span
                      className="fa fa-star px-2"
                      style={{ fontSize: "10px", color: "#8080806b" }}
                    ></span>
                    <ProgressBar
                      className="w-50"
                      style={{ height: "5px" }}
                      variant="info"
                      now={30}
                    />
                    <span style={{ fontSize: "12px", color: "black" }}>
                      &nbsp;239
                    </span>
                  </div>
                  <div className="d-flex align-items-center">
                    3
                    <span
                      className="fa fa-star px-2"
                      style={{ fontSize: "10px", color: "#8080806b" }}
                    ></span>
                    <ProgressBar
                      className="w-50"
                      style={{ height: "5px" }}
                      variant="blue"
                      now={10}
                    />
                    <span style={{ fontSize: "12px", color: "black" }}>
                      &nbsp;135
                    </span>
                  </div>
                  <div className="d-flex align-items-center">
                    2
                    <span
                      className="fa fa-star px-2"
                      style={{ fontSize: "10px", color: "#8080806b" }}
                    ></span>
                    <ProgressBar
                      className="w-50"
                      style={{ height: "5px" }}
                      variant="warning"
                      now={5}
                    />
                    <span style={{ fontSize: "12px", color: "black" }}>
                      &nbsp;62
                    </span>
                  </div>
                  <div className="d-flex align-items-center">
                    1
                    <span
                      className="fa fa-star px-2"
                      style={{ fontSize: "10px", color: "#8080806b" }}
                    ></span>
                    <ProgressBar
                      className="w-50"
                      style={{ height: "5px" }}
                      variant="danger"
                      now={20}
                    />
                    <span style={{ fontSize: "12px", color: "black" }}>
                      &nbsp;184
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <hr style={{ height: "1px" }}></hr>

            <div className="py-2 pb-5">
              Product Code: <b>{items.id}</b>
              <div
                className="text-danger font-weight-bold py-2"
                style={{ cursor: "pointer" }}
                onClick={() =>
                  (document.getElementById("quantity").style.display = "block")
                }
              >
                View Supplier Information
              </div>
              <div id="quantity" style={{ display: "none", fontWeight: "500" }}>
                Available Stock (in numbers) -{" "}
                {items.rating && items.rating.count}
              </div>
            </div>
          </div>

          <div className="px-lg-3 ">
            <div className="pb-3 pl-3" style={{ fontSize: "16px" }}>
              <b>SIMILAR PRODUCTS </b>
            </div>
            <div className="row gx-0">
              {data.map((e) => {
                return (
                  <div className="col-lg-3 col-md-4 col-sm-6 col-12" key={e.id}>
                    <div
                      className="card carscard text-decoration-none mx-3 mt-1"
                      data-bs-toggle="tooltip"
                      title={e.title}
                    >
                      <NavLink
                        target="_blank"
                        to={`/myntra/${e.id}`}
                        className="justify-content-center d-flex"
                      >
                        <div>
                          <img
                            src={e.image}
                            alt="menuPic"
                            height="250px"
                            className="card-img-top p-3"
                          />
                        </div>
                      </NavLink>

                      <div className="details text-dark bg-white py-2 pt-3 px-2">
                        <div className="justify-content-center d-flex align-items-center wishlist">
                          <div
                            className={
                              !isActive
                                ? "fa fa-heart-o py-2"
                                : "fa fa-heart text-danger py-2"
                            }
                            onClick={() => setActive(true)}
                          >
                            &nbsp;&nbsp;WISHLIST
                          </div>
                        </div>
                        <div
                          className="pt-2"
                          style={{
                            fontWeight: "lighter",
                            fontSize: "14px",
                          }}
                        >
                          Sizes:&nbsp;
                          <span
                            style={{
                              fontSize: "14px",
                              fontWeight: "lighter",
                              color: "grey",
                            }}
                          >
                            38, 40, 42, 44, 46
                          </span>
                        </div>
                        <div className="pt-1">
                          <span
                            style={{
                              fontWeight: "500",
                            }}
                          >
                            $ {e.price}
                          </span>
                          <span
                            style={{
                              fontSize: "12px",
                              fontWeight: "lighter",
                              color: "grey",
                            }}
                          >
                            &nbsp;&nbsp;₹<del>1849</del>
                          </span>
                          <span
                            style={{
                              fontSize: "12px",
                              fontWeight: "lighter",
                              color: "orange",
                            }}
                          >
                            &nbsp;&nbsp;(Rs. 1150 OFF)
                          </span>
                        </div>
                      </div>
                      <div className="px-2">
                        <div className="font-weight-bolder my-2">
                          <span style={{ fontWeight: "500" }}>{e.title}</span>
                          <div
                            style={{
                              fontSize: "14px",
                              fontWeight: "lighter",
                              color: "grey",
                            }}
                          >
                            {e.category}
                          </div>
                          <div className="pt-1">
                            <span
                              style={{
                                fontWeight: "500",
                              }}
                            >
                              $ {e.price}
                            </span>
                            <span
                              style={{
                                fontSize: "12px",
                                fontWeight: "lighter",
                                color: "grey",
                              }}
                            >
                              &nbsp;&nbsp;₹<del>1849</del>
                            </span>
                            <span
                              style={{
                                fontSize: "12px",
                                fontWeight: "lighter",
                                color: "orange",
                              }}
                            >
                              &nbsp;&nbsp;(Rs. 1150 OFF)
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Products;
