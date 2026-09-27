import React, { useEffect } from "react";

function ProfileDetails() {
  useEffect(() => {
    document.getElementById("footer").style.display = "none";
  }, []);
  return (
    <section>
      <div className="justify-content-center mt-3 align-items-center d-flex">
        <div
          className="bg-white"
          style={{ height: "fit-content", width: "500px" }}
        >
          <div
            className="mb-3 px-3"
            style={{ fontWeight: "600", fontSize: "18px" }}
          >
            Edit Details
          </div>
          <hr></hr>
          <form action="/" className="">
            <div className="px-3">
              <div className="p-2" style={{ border: "1px solid #A9ABB3" }}>
                <div style={{ color: "grey" }}>Mobile Number</div>
                <div className="d-flex align-items-center">
                  <div>xxxxxxxxxxx</div>
                  <div className="fa fa-check-circle text-success pl-2"></div>
                </div>
              </div>
              <input
                className="form-control shadow-none mt-4 rounded-0"
                type="text"
                placeholder="Create Password"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
                style={{ height: "40px" }}
              />
              <div className="row gx-0">
                <div className="col-lg-3 col-md-3 col-sm-6 col-12 mt-2">
                  <div
                    className="px-3 align-items-center d-flex justify-content-center"
                    style={{
                      background: "#eee",
                      height: "30px",
                      color: "grey",
                      fontSize: "13px",
                    }}
                  >
                    8 Characters
                  </div>
                </div>
                <div className="col-lg-3 px-lg-2 px-md-2 pl-sm-2 col-md-3 col-sm-6 col-12 mt-2">
                  <div
                    className="px-3 align-items-center d-flex justify-content-center"
                    style={{
                      background: "#eee",
                      height: "30px",
                      color: "grey",
                      fontSize: "13px",
                    }}
                  >
                    1 Special
                  </div>
                </div>
                <div className="col-lg-3 col-md-3 col-sm-6 col-12 mt-2">
                  <div
                    className="px-3 align-items-center d-flex justify-content-center"
                    style={{
                      background: "#eee",
                      height: "30px",
                      color: "grey",
                      fontSize: "13px",
                    }}
                  >
                    1 Uppercase
                  </div>
                </div>
                <div className="col-lg-3 pl-lg-2 pl-md-2 pl-sm-2 col-md-3 col-sm-6 col-12 mt-2">
                  <div
                    className="px-3 align-items-center d-flex justify-content-center"
                    style={{
                      background: "#eee",
                      height: "30px",
                      color: "grey",
                      fontSize: "13px",
                    }}
                  >
                    1 Numeric
                  </div>
                </div>
              </div>
              <input
                className="form-control shadow-none mt-4 mb-2 rounded-0"
                type="text"
                placeholder="Full Name"
                style={{ height: "40px" }}
              />
              <input
                className="form-control shadow-none mt-4 mb-2 rounded-0"
                type="email"
                placeholder="Email (Optional)"
                style={{ height: "40px" }}
              />
              <div className="d-flex my-3" style={{ color: "grey" }}>
                {" "}
                <label>Select Gender:</label>
                <div className="ml-auto d-flex">
                  <input type="radio" name="btn" className="form-check mr-2" />
                  <label>Female</label>
                  <input
                    type="radio"
                    name="btn"
                    className="form-check mr-2 ml-4"
                  />
                  <label>Male</label>
                </div>
              </div>
              <input
                className="form-control shadow-none mt-4 mb-2 rounded-0"
                type="date"
                placeholder="Birthday (dd/mm/yyyy)"
                style={{ height: "40px" }}
              />
              <input
                className="form-control shadow-none mt-4 mb-2 rounded-0"
                type="text"
                placeholder="Location"
                style={{ height: "40px" }}
              />
              <div
                className="my-4"
                style={{ fontWeight: "500", fontSize: "12px" }}
              >
                Alternate moblie details
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
                  className="form-control shadow-none rounded-0"
                  type="tel"
                  placeholder="Alternate Mobile Number"
                  pattern="[0-9]{10}"
                  style={{ height: "40px", paddingLeft: "54px" }}
                />
              </div>
              <label style={{ color: "#A9ABB3", fontSize: "14px" }}>
                This will help recover your account if needed
              </label>
            </div>
            <div className="px-3">
              <input
                className="form-control shadow-none mt-3 rounded-0"
                type="text"
                placeholder="Hint name (Alternate number)"
                style={{ height: "40px" }}
              />
              <label
                className="mb-2"
                style={{ color: "#A9ABB3", fontSize: "14px" }}
              >
                This name will be a hint for your alternate number
              </label>
            </div>
            <div className="px-3 position-sticky bg-white" style={{ bottom: "0", boxShadow: "0 -1px 2px 0 rgb(0 0 0 / 14%)"}}>
              <button
                type="submit"
                className="btn btn-danger border-0 w-100 rounded-0 mt-2 mb-1 py-2"
                style={{ background: "rgb(255, 63, 108)", fontWeight: "700" }}
              >
                SAVE DETAILS
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ProfileDetails;
