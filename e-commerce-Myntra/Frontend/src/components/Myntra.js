import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import CardSkeleton from "./CardSkeleton";

function Myntra() {
  window.scroll(0, 0);

  const params = useParams();
  const [isActive, setActive] = useState(false);
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);
  const [data, setData] = useState(items);
  const getData = async () => {
    const res = await fetch("https://fakestoreapi.com/products");
    setItems(await res.json());
    setTimeout(() => {
      document.getElementById("click").click();
    }, 100);
    setLoading(false);
  };

  useEffect(() => {
    getData();
    document.title = `Online Shopping for Women, Men, Kids Fashion & Lifestyle - Myntra`;
  }, []);

  const filterData = (categ) => {
    const updatedItems = items.filter((e) => {
      return e.category === categ;
    });
    console.log(updatedItems);
    setData(updatedItems);
  };

  return (
    <section id="products">
      <div className="backdrop" id="backdrop">
        .
      </div>
      <div className="pl-3 pb-lg-0 pb-3 pt-2">
        <div>
          Home {params.pa}
          <span style={{ fontWeight: "700", fontSize: "14px", color: "black" }}>
            &nbsp;/&nbsp;Myntra
          </span>
        </div>
        <div>Myntra - 20 items</div>
      </div>
      <div className="bundles">
        <div className="row gx-0">
          <div className="col-2 pt-4 font-weight-bold pb-3 pl-4">
            &nbsp;FILTERS
          </div>
          <div className="col-10">
            <div className="d-flex mt-3">
              <div
                className="px-3 align-items-center d-flex"
                style={{
                  outline: "none",
                  background: "rgb(212 213 217 / 43%)",
                  fontWeight: "500",
                  borderRadius: "30px",
                }}
              >
                Bundles
              </div>
              <div
                className="px-3 align-items-center d-flex mx-2"
                style={{
                  outline: "none",
                  background: "rgb(212 213 217 / 43%)",
                  fontWeight: "500",
                  borderRadius: "30px",
                }}
              >
                Country of Origin
              </div>
              <div
                className="px-3 align-items-center d-flex"
                style={{
                  outline: "none",
                  background: "rgb(212 213 217 / 43%)",
                  fontWeight: "500",
                  borderRadius: "30px",
                }}
              >
                Size
              </div>
              <select
                className="w-25 py-1 px-2 ml-auto mr-4"
                style={{ outline: "none" }}
              >
                <option disabled selected hidden>
                  Sort by&nbsp;:
                  <span style={{ fontSize: "12px", fontWeight: "bold" }}>
                    &nbsp;Recommended
                  </span>
                </option>
                <option className="py-5">What's New</option>
                <option className="py-5">Popularity</option>
                <option className="py-5">Better Discounts</option>
                <option className="py-5">Price: High to Low</option>
                <option className="py-5">Price: Low to High</option>
                <option className="py-5">Customer Rating</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <div
        className="row gx-0"
        style={{ borderTop: "1px solid rgb(105 110 121 / 33%)" }}
      >
        <div
          className="col-lg-2 gx-0 pt-3 sidebar"
          style={{ borderRight: "1px solid rgb(105 110 121 / 33%)" }}
        >
          <div style={{ top: "0", position: "sticky" }}>
            <div className="pl-4">
              <div>
                <input
                  type="radio"
                  id="click"
                  name="radio"
                  onClick={() => setData(items)}
                />
                <label className="pl-2">All</label>
              </div>
              <div>
                <input
                  type="radio"
                  name="radio"
                  onClick={() => filterData("men's clothing")}
                />
                <label className="pl-2">Men's Clothing</label>
              </div>
              <div>
                <input
                  type="radio"
                  name="radio"
                  onClick={() => filterData("women's clothing")}
                />
                <label className="pl-2">Women's Clothing</label>
              </div>
              <div>
                <input
                  type="radio"
                  name="radio"
                  onClick={() => filterData("jewelery")}
                />
                <label className="pl-2">Jwellery</label>
              </div>
              <div>
                <input
                  type="radio"
                  name="radio"
                  onClick={() => filterData("electronics")}
                />
                <label className="pl-2">Electronics</label>
              </div>
            </div>

            <hr></hr>

            <div className="pl-4">
              <span
                style={{ fontWeight: "700", fontSize: "14px", color: "black" }}
              >
                CATEGORIES
              </span>
              <div className="pt-2">
                <input type="checkbox" name="radio" />
                <label className="pl-2">Tshirts</label>
              </div>
              <div>
                <input type="checkbox" name="radio" />
                <label className="pl-2">Shirts</label>
              </div>
              <div>
                <input type="checkbox" name="radio" />
                <label className="pl-2">Tops</label>
              </div>
              <div>
                <input type="checkbox" name="radio" />
                <label className="pl-2">Dresses</label>
              </div>
              <div>
                <input type="checkbox" name="radio" />
                <label className="pl-2">Jeans</label>
              </div>
              <div>
                <input type="checkbox" name="radio" />
                <label className="pl-2">Sweatshirts</label>
              </div>
              <div>
                <input type="checkbox" name="radio" />
                <label className="pl-2">Trousers</label>
              </div>
              <div>
                <input type="checkbox" name="radio" />
                <label className="pl-2">Casual Shoes</label>
              </div>
            </div>

            <hr></hr>

            <div className="pl-4">
              <span
                style={{ fontWeight: "700", fontSize: "14px", color: "black" }}
              >
                BRAND
              </span>
              <div className="pt-2">
                <input type="checkbox" name="radio" />
                <label className="pl-2">Roadster</label>
              </div>
              <div>
                <input type="checkbox" name="radio" />
                <label className="pl-2">max</label>
              </div>
              <div>
                <input type="checkbox" name="radio" />
                <label className="pl-2">Mast & Harbour</label>
              </div>
              <div>
                <input type="checkbox" name="radio" />
                <label className="pl-2">DressBerry</label>
              </div>
              <div>
                <input type="checkbox" name="radio" />
                <label className="pl-2">URBANIC</label>
              </div>
              <div>
                <input type="checkbox" name="radio" />
                <label className="pl-2">HERE&NOW</label>
              </div>
              <div>
                <input type="checkbox" name="radio" />
                <label className="pl-2">Allen Solly</label>
              </div>
              <div>
                <input type="checkbox" name="radio" />
                <label className="pl-2">H&M</label>
              </div>
            </div>

            <hr></hr>

            <div className="pl-4">
              <span
                style={{ fontWeight: "700", fontSize: "14px", color: "black" }}
              >
                PRICE
              </span>
              <div className="pt-2">
                <input type="checkbox" name="radio" />
                <label className="pl-2">Rs. 23 to Rs. 16768</label>
              </div>
              <div>
                <input type="checkbox" name="radio" />
                <label className="pl-2">Rs. 23 to Rs. 16768</label>
              </div>
              <div>
                <input type="checkbox" name="radio" />
                <label className="pl-2">Rs. 23 to Rs. 16768</label>
              </div>
              <div>
                <input type="checkbox" name="radio" />
                <label className="pl-2">Rs. 23 to Rs. 16768</label>
              </div>
            </div>

            <hr></hr>

            <div className="pl-4">
              <span
                style={{ fontWeight: "700", fontSize: "14px", color: "black" }}
              >
                COLOR
              </span>
              <div className="pt-2">
                <input type="checkbox" name="radio" />
                <label className="pl-2">Tshirts</label>
              </div>
              <div>
                <input type="checkbox" name="radio" />
                <label className="pl-2">Tshirts</label>
              </div>
              <div>
                <input type="checkbox" name="radio" />
                <label className="pl-2">Tshirts</label>
              </div>
              <div>
                <input type="checkbox" name="radio" />
                <label className="pl-2">Tshirts</label>
              </div>
              <div>
                <input type="checkbox" name="radio" />
                <label className="pl-2">Tshirts</label>
              </div>
              <div>
                <input type="checkbox" name="radio" />
                <label className="pl-2">Tshirts</label>
              </div>
            </div>

            <hr></hr>

            <div className="pl-4">
              <span
                style={{ fontWeight: "700", fontSize: "14px", color: "black" }}
              >
                DISCOUNT RANGE
              </span>
              <div className="pt-2">
                <input type="checkbox" name="radio" />
                <label className="pl-2">10% and above</label>
              </div>
              <div>
                <input type="checkbox" name="radio" />
                <label className="pl-2">20% and above</label>
              </div>
              <div>
                <input type="checkbox" name="radio" />
                <label className="pl-2">30% and above</label>
              </div>
              <div>
                <input type="checkbox" name="radio" />
                <label className="pl-2">40% and above</label>
              </div>
              <div>
                <input type="checkbox" name="radio" />
                <label className="pl-2">50% and above</label>
              </div>
              <div>
                <input type="checkbox" name="radio" />
                <label className="pl-2">60% and above</label>
              </div>
              <div>
                <input type="checkbox" name="radio" />
                <label className="pl-2">70% and above</label>
              </div>
              <div>
                <input type="checkbox" name="radio" />
                <label className="pl-2">80% and above</label>
              </div>
              <div>
                <input type="checkbox" name="radio" />
                <label className="pl-2">90% and above</label>
              </div>
            </div>
          </div>
        </div>

        <div id="homeFilter" className="pt-3 pt-md-4">
          <div
            className="nav nav-tabs justify-content-center d-flex"
            style={{ boxShadow: "0px 5px 7px -3px #80808075" }}
          >
            <div
              className="btn btn-danger mb-lg-0 mb-2 active mx-2 filterbtn"
              id="click"
              type="button"
              data-toggle="tab"
              onClick={() => setData(items)}
            >
              All
            </div>
            <div
              className="btn btn-danger mb-lg-0 mb-2 mx-2 filterbtn"
              type="button"
              data-toggle="tab"
              onClick={() => filterData("men's clothing")}
            >
              Men's Clothing
            </div>
            <div
              className="btn btn-danger mb-lg-0 mb-2 mx-2 filterbtn"
              type="button"
              data-toggle="tab"
              onClick={() => filterData("women's clothing")}
            >
              Women's Clothing
            </div>
            <div
              className="btn btn-danger mb-lg-0 mb-2 mx-2 filterbtn"
              type="button"
              data-toggle="tab"
              onClick={() => filterData("jewelery")}
            >
              Jwellery
            </div>
            <div
              className="btn btn-danger mb-lg-0 mb-2 mx-2 filterbtn"
              type="button"
              data-toggle="tab"
              onClick={() => filterData("electronics")}
            >
              Electronics
            </div>
          </div>
        </div>

        <div className="col-lg-10 col-md-12 mt-4 gx-0">
          <div className="content">
            {loading ? (
              <div>
                <CardSkeleton />
                <CardSkeleton />
                <CardSkeleton />
              </div>
            ) : (
              <div className="row gx-0">
                {data.map((e) => {
                  return (
                    <div
                      className="col-lg-3 col-md-4 col-sm-6 col-12"
                      key={e.id}
                    >
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
                            style={{ fontWeight: "lighter", fontSize: "14px" }}
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
            )}
          </div>
        </div>

        <div
          className="bg-white position-fixed"
          id="footerFilter"
          style={{ width: "100%", bottom: "0" }}
        >
          <div className="row" style={{ border: "1px solid #d4d5d9" }}>
            <div
              className="col-6 text-center p-2"
              data-target="#mymodal"
              data-toggle="modal"
              style={{ borderRight: "1px solid #d4d5d9" }}
            >
              <div className="fa fa-exchange pr-2"></div>SORT
            </div>
            <div
              className="col-6 text-center p-2"
              onClick={() =>
                (document.getElementById("slider").style.display = "block")
              }
            >
              <div className="fa fa-sliders pr-2"></div>
              FILTER
            </div>
          </div>
        </div>

        <div className="modal fade " id="mymodal">
          <div className="modal-dialog modal-xl">
            <div className="modal-content">
              <div className="card border-0">
                <div className="modal-header">
                  <h4>
                    Sort by&nbsp;:
                    <span style={{ fontSize: "12px", fontWeight: "bold" }}>
                      &nbsp;
                    </span>
                  </h4>
                  <div className="close pt-4" data-dismiss="modal">
                    &times;
                  </div>
                </div>
                <div className="" style={{ outline: "none" }}>
                  <div
                    style={{ borderBottom: "1px solid #d4d5d9" }}
                    className="py-2 px-3"
                    data-dismiss="modal"
                  >
                    What's New
                  </div>
                  <div
                    style={{ borderBottom: "1px solid #d4d5d9" }}
                    className="py-2 px-3"
                    data-dismiss="modal"
                  >
                    Popularity
                  </div>
                  <div
                    style={{ borderBottom: "1px solid #d4d5d9" }}
                    className="py-2 px-3"
                    data-dismiss="modal"
                  >
                    Better Discounts
                  </div>
                  <div
                    style={{ borderBottom: "1px solid #d4d5d9" }}
                    className="py-2 px-3"
                    data-dismiss="modal"
                  >
                    Price: High to Low
                  </div>
                  <div
                    style={{ borderBottom: "1px solid #d4d5d9" }}
                    className="py-2 px-3"
                    data-dismiss="modal"
                  >
                    Price: Low to High
                  </div>
                  <div className="py-2 px-3" data-dismiss="modal">
                    Customer Rating
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="slider bg-white"
          id="slider"
          style={{ boxShadow: "-1px 0px 7px -2px " }}
        >
          <div
            className=""
            style={{ borderRight: "1px solid rgb(105 110 121 / 33%)" }}
          >
            <div>
              <div
                className="d-flex align-items-center bg-white"
                style={{
                  top: "0",
                  position: "sticky",
                  boxShadow: "0px 0px 8px -3px",
                  zIndex: "1",
                }}
              >
                <div className="p-4" style={{ fontWeight: "500" }}>
                  FILTERS
                </div>
                <div
                  className="fa-2x ml-auto pr-3"
                  style={{ cursor: "pointer" }}
                  onClick={() =>
                    (document.getElementById("slider").style.display = "none")
                  }
                >
                  &times;
                </div>
              </div>
              <div className="pl-4 pt-3">
                <div>
                  <input
                    type="radio"
                    id="click"
                    name="radio"
                    onClick={() => setData(items)}
                  />
                  <label className="pl-2">All</label>
                </div>
                <div>
                  <input
                    type="radio"
                    name="radio"
                    onClick={() => filterData("men's clothing")}
                  />
                  <label className="pl-2">Men's Clothing</label>
                </div>
                <div>
                  <input
                    type="radio"
                    name="radio"
                    onClick={() => filterData("women's clothing")}
                  />
                  <label className="pl-2">Women's Clothing</label>
                </div>
                <div>
                  <input
                    type="radio"
                    name="radio"
                    onClick={() => filterData("jewelery")}
                  />
                  <label className="pl-2">Jwellery</label>
                </div>
                <div>
                  <input
                    type="radio"
                    name="radio"
                    onClick={() => filterData("electronics")}
                  />
                  <label className="pl-2">Electronics</label>
                </div>
              </div>

              <hr></hr>

              <div className="pl-4">
                <span
                  style={{
                    fontWeight: "700",
                    fontSize: "14px",
                    color: "black",
                  }}
                >
                  CATEGORIES
                </span>
                <div className="pt-2">
                  <input type="checkbox" name="radio" />
                  <label className="pl-2">Tshirts</label>
                </div>
                <div>
                  <input type="checkbox" name="radio" />
                  <label className="pl-2">Shirts</label>
                </div>
                <div>
                  <input type="checkbox" name="radio" />
                  <label className="pl-2">Tops</label>
                </div>
                <div>
                  <input type="checkbox" name="radio" />
                  <label className="pl-2">Dresses</label>
                </div>
                <div>
                  <input type="checkbox" name="radio" />
                  <label className="pl-2">Jeans</label>
                </div>
                <div>
                  <input type="checkbox" name="radio" />
                  <label className="pl-2">Sweatshirts</label>
                </div>
                <div>
                  <input type="checkbox" name="radio" />
                  <label className="pl-2">Trousers</label>
                </div>
                <div>
                  <input type="checkbox" name="radio" />
                  <label className="pl-2">Casual Shoes</label>
                </div>
              </div>

              <hr></hr>

              <div className="pl-4">
                <span
                  style={{
                    fontWeight: "700",
                    fontSize: "14px",
                    color: "black",
                  }}
                >
                  BRAND
                </span>
                <div className="pt-2">
                  <input type="checkbox" name="radio" />
                  <label className="pl-2">Roadster</label>
                </div>
                <div>
                  <input type="checkbox" name="radio" />
                  <label className="pl-2">max</label>
                </div>
                <div>
                  <input type="checkbox" name="radio" />
                  <label className="pl-2">Mast & Harbour</label>
                </div>
                <div>
                  <input type="checkbox" name="radio" />
                  <label className="pl-2">DressBerry</label>
                </div>
                <div>
                  <input type="checkbox" name="radio" />
                  <label className="pl-2">URBANIC</label>
                </div>
                <div>
                  <input type="checkbox" name="radio" />
                  <label className="pl-2">HERE&NOW</label>
                </div>
                <div>
                  <input type="checkbox" name="radio" />
                  <label className="pl-2">Allen Solly</label>
                </div>
                <div>
                  <input type="checkbox" name="radio" />
                  <label className="pl-2">H&M</label>
                </div>
              </div>

              <hr></hr>

              <div className="pl-4">
                <span
                  style={{
                    fontWeight: "700",
                    fontSize: "14px",
                    color: "black",
                  }}
                >
                  PRICE
                </span>
                <div className="pt-2">
                  <input type="checkbox" name="radio" />
                  <label className="pl-2">Rs. 23 to Rs. 16768</label>
                </div>
                <div>
                  <input type="checkbox" name="radio" />
                  <label className="pl-2">Rs. 23 to Rs. 16768</label>
                </div>
                <div>
                  <input type="checkbox" name="radio" />
                  <label className="pl-2">Rs. 23 to Rs. 16768</label>
                </div>
                <div>
                  <input type="checkbox" name="radio" />
                  <label className="pl-2">Rs. 23 to Rs. 16768</label>
                </div>
              </div>

              <hr></hr>

              <div className="pl-4">
                <span
                  style={{
                    fontWeight: "700",
                    fontSize: "14px",
                    color: "black",
                  }}
                >
                  COLOR
                </span>
                <div className="pt-2">
                  <input type="checkbox" name="radio" />
                  <label className="pl-2">Tshirts</label>
                </div>
                <div>
                  <input type="checkbox" name="radio" />
                  <label className="pl-2">Tshirts</label>
                </div>
                <div>
                  <input type="checkbox" name="radio" />
                  <label className="pl-2">Tshirts</label>
                </div>
                <div>
                  <input type="checkbox" name="radio" />
                  <label className="pl-2">Tshirts</label>
                </div>
                <div>
                  <input type="checkbox" name="radio" />
                  <label className="pl-2">Tshirts</label>
                </div>
                <div>
                  <input type="checkbox" name="radio" />
                  <label className="pl-2">Tshirts</label>
                </div>
              </div>

              <hr></hr>

              <div className="pl-4">
                <span
                  style={{
                    fontWeight: "700",
                    fontSize: "14px",
                    color: "black",
                  }}
                >
                  DISCOUNT RANGE
                </span>
                <div className="pt-2">
                  <input type="checkbox" name="radio" />
                  <label className="pl-2">10% and above</label>
                </div>
                <div>
                  <input type="checkbox" name="radio" />
                  <label className="pl-2">20% and above</label>
                </div>
                <div>
                  <input type="checkbox" name="radio" />
                  <label className="pl-2">30% and above</label>
                </div>
                <div>
                  <input type="checkbox" name="radio" />
                  <label className="pl-2">40% and above</label>
                </div>
                <div>
                  <input type="checkbox" name="radio" />
                  <label className="pl-2">50% and above</label>
                </div>
                <div>
                  <input type="checkbox" name="radio" />
                  <label className="pl-2">60% and above</label>
                </div>
                <div>
                  <input type="checkbox" name="radio" />
                  <label className="pl-2">70% and above</label>
                </div>
                <div>
                  <input type="checkbox" name="radio" />
                  <label className="pl-2">80% and above</label>
                </div>
                <div>
                  <input type="checkbox" name="radio" />
                  <label className="pl-2">90% and above</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Myntra;
