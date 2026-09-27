import React, { useEffect, useState } from "react";
import { NavLink, useHistory, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import Mobile from "./LoginSignup";

function SignUp() {
  const history = useHistory();
  window.scroll(0, 0);
  const { no } = useParams();
  useEffect(() => {
    document.getElementById("footer").style.display = "none";
    document.body.style.background = "rgb(255 192 203 / 30%)";
    // document.getElementById("loginProfileIcon").style.display = "none";
  }, []);
  // const setupAcc = () => {
  //   PostData();
  //   document.getElementById("setupProfile").style.display = "block";
  //   document.getElementById("toLogin").style.display = "none";
  //   history.push("/");
  // };

  const [user, setUser] = useState({
    name: "",
    email: "",
    // number: "",
    number1: "",
    password: "",
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
    const { name, email, number1, password } = user;
    const res = await fetch("/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        number1,
        password,
        no,
      }),
    });
    const data = await res.json();
    if (res.status === 201) {
      Swal.fire("", "SignUp Successful", "success", {
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
    <section id="signup">
      <div className="backdrop" id="backdrop">
        .
      </div>
      <div className="justify-content-center mt-lg-5 mt-md-4 mt-sm-4 align-items-center d-flex">
        <div
          id="mobileView"
          className="bg-white p-3 mx-lg-3 mx-md-3 mx-sm-3"
          style={{ height: "fit-content", width: "500px" }}
        >
          <div className="mb-3" style={{ fontWeight: "600", fontSize: "18px" }}>
            Complete your sign up
          </div>
          <form method="POST">
            <div>
              <div className="d-flex align-items-center">
                <div style={{ color: "grey" }}>Mobile Number</div>
                <div className="fa fa-check-circle text-success ml-auto"></div>
              </div>
              <div>{no}</div>

              <input
                className="form-control shadow-none mt-4 rounded-0"
                type="text"
                placeholder="Create Password"
                pattern="(?=.\d)(?=.[a-z])(?=.*[A-Z]).{8,}"
                name="password"
                value={user.password}
                onChange={handleInputs}
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
                name="name"
                value={user.name}
                onChange={handleInputs}
                style={{ height: "40px" }}
              />
              <input
                className="form-control shadow-none mt-4 mb-2 rounded-0"
                type="email"
                placeholder="Email (Optional)"
                name="email"
                value={user.email}
                onChange={handleInputs}
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
                  name="number"
                  // value={user.number}
                  // onChange={handleInputs}
                  style={{ height: "40px", paddingLeft: "54px" }}
                />
              </div>
              <label style={{ color: "#A9ABB3", fontSize: "14px" }}>
                This will help recover your account if needed
              </label>
            </div>
            <div>
              <input
                className="form-control shadow-none mt-3 rounded-0"
                type="text"
                name="number1"
                value={user.number1}
                onChange={handleInputs}
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
            <NavLink
              to="/"
              className="btn btn-danger border-0 w-100 rounded-0 mt-4 py-2 mb-2"
              style={{ background: "rgb(255, 63, 108)", fontWeight: "700" }}
              onClick={PostData}
            >
              CREATE ACCOUNT
            </NavLink>
          </form>
        </div>
      </div>
    </section>
  );
}

export default SignUp;