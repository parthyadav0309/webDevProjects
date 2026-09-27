import React, { useEffect } from "react";
import StarsRating from "stars-rating";
import collections from "../images/profile-collections.png";

function Orders() {
    useEffect(() => {
        document.getElementById("footer").style.display = "none";
      }, []);
      
  return (
    <section>
      <div className="" style={{ background: "#f5f5f5" }}>
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
        <div className="d-flex p-3 mb-3 bg-white">
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
        <div className="pb-3">
          <div className="">
            <div className="bg-white p-3">
              <div
                className="d-flex align-items-center"
                style={{ fontSize: "14px" }}
              >
                <div
                  className="fa fa-dropbox text-white align-items-center d-flex justify-content-center bg-dark fa-lg"
                  style={{
                    borderRadius: "50%",
                    height: "35px",
                    width: "35px",
                  }}
                ></div>
                <div className="pl-3">
                  <div className="text-info" style={{ fontWeight: "500" }}>
                    Delivered
                  </div>
                  <div className="" style={{ fontSize: "12px" }}>
                    On Tue, 15 Nov |{" "}
                    <img src="https://myntraweb.blob.core.windows.net/selfserveui/assets/svg/mexpress-tag.svg" />
                  </div>
                </div>
              </div>

              <div
                className="mt-4 deliveredCard"
                style={{
                  background: "#f5f5f5",
                  transition: "0.3s",
                  fontSize: "14px",
                }}
              >
                <div className="d-flex p-2 align-items-center">
                  <img
                    src={collections}
                    style={{ height: "70px", width: "53px" }}
                  />
                  <div className="pl-4">
                    <div>Roadster</div>
                    <div>Men Grey Solid Padded Jacket</div>
                    <div>Size: M</div>
                  </div>
                  <div className="fa fa-angle-right fa-lg  ml-auto"></div>
                </div>
                <div className="d-flex pb-3">
                  <div
                    className="btn btn-dark bg-white text-dark mx-3 align-items-center d-flex justify-content-center"
                    style={{
                      fontSize: "14px",
                      borderColor: "#ced4da",
                      height: "30px",
                      width: "100%",
                      fontWeight: "500",
                    }}
                  >
                    EXCHANGE
                  </div>
                  <div
                    className="btn btn-dark bg-white text-dark mx-3 align-items-center d-flex justify-content-center"
                    style={{
                      fontSize: "14px",
                      borderColor: "#ced4da",
                      height: "30px",
                      width: "100%",
                      fontWeight: "500",
                    }}
                  >
                    RETURN
                  </div>
                </div>
              </div>

              <div
                className="d-flex px-3 align-items-center"
                style={{ background: "#f5f5f5", marginTop: "2px" }}
              >
                <div style={{ color: "#696e79", fontSize: "12px" }}>
                  Rate Product
                </div>
                <StarsRating
                  className="float-lg-right pl-3 mb-1 sliderRate justify-content-center d-flex"
                  count={5}
                  onChange={(e) => console.log(e)}
                  size={30}
                  color2={"rgb(255, 63, 108)"}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="pb-3">
          <div className="">
            <div className="bg-white p-3">
              <div
                className="d-flex align-items-center"
                style={{ fontSize: "14px" }}
              >
                <div
                  className="fa fa-dropbox text-white align-items-center d-flex justify-content-center bg-dark fa-lg"
                  style={{
                    borderRadius: "50%",
                    height: "35px",
                    width: "35px",
                  }}
                ></div>
                <div className="pl-3">
                  <div className="text-info" style={{ fontWeight: "500" }}>
                    Delivered
                  </div>
                  <div className="" style={{ fontSize: "12px" }}>
                    On Tue, 15 Nov |{" "}
                    <img src="https://myntraweb.blob.core.windows.net/selfserveui/assets/svg/mexpress-tag.svg" />
                  </div>
                </div>
              </div>

              <div
                className="mt-4 deliveredCard"
                style={{
                  background: "#f5f5f5",
                  transition: "0.3s",
                  fontSize: "14px",
                }}
              >
                <div className="d-flex p-2 align-items-center">
                  <img
                    src={collections}
                    style={{ height: "70px", width: "53px" }}
                  />
                  <div className="pl-4">
                    <div>Roadster</div>
                    <div>Men Grey Solid Padded Jacket</div>
                    <div>Size: M</div>
                  </div>
                  <div className="fa fa-angle-right fa-lg  ml-auto"></div>
                </div>
                <div className="d-flex pb-3">
                  <div
                    className="btn btn-dark bg-white text-dark mx-3 align-items-center d-flex justify-content-center"
                    style={{
                      fontSize: "14px",
                      borderColor: "#ced4da",
                      height: "30px",
                      width: "100%",
                      fontWeight: "500",
                    }}
                  >
                    EXCHANGE
                  </div>
                  <div
                    className="btn btn-dark bg-white text-dark mx-3 align-items-center d-flex justify-content-center"
                    style={{
                      fontSize: "14px",
                      borderColor: "#ced4da",
                      height: "30px",
                      width: "100%",
                      fontWeight: "500",
                    }}
                  >
                    RETURN
                  </div>
                </div>
              </div>

              <div
                className="d-flex px-3 align-items-center"
                style={{ background: "#f5f5f5", marginTop: "2px" }}
              >
                <div style={{ color: "#696e79", fontSize: "12px" }}>
                  Rate Product
                </div>
                <StarsRating
                  className="float-lg-right pl-3 mb-1 sliderRate justify-content-center d-flex"
                  count={5}
                  onChange={(e) => console.log(e)}
                  size={30}
                  color2={"rgb(255, 63, 108)"}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Orders;
