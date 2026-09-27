import React, { useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import axios from 'axios'
function LoginUsingPassword() {
  const history = useHistory();

  useEffect(() => {
    document.getElementById("footer").style.display = "none";
    document.body.style.background = "rgb(255 192 203 / 30%)";
  }, []);

  // const setupAcc = () => {
  //   sendOtp();
  //   document.getElementById("setupProfile").style.display = "block";
  //   document.getElementById("toLogin").style.display = "none";
  //   history.push("/");
  // };

  const [email, setEmail] = useState(``);
  const [password, setPassword] = useState(``);
  const sendOtp = async (e) => {
    e.preventDefault();
    const res = await fetch("/password", {
      method: "POST",
      PORT: "5000",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        email,
        password,
      }),
    });

    const data = res.json();
    if (res.status === 200 || res.status === 201) {
      Swal.fire("", "Signin Successful", "success", { timer: 2200, buttons: false });
      console.log("Signin Successful");
      history.push("/");
    } else {
      Swal.fire("", "Invalid Credentials!", "error", {
        timer: 2200,
        buttons: false,
      });
      console.log("Invalid Credentials");
    }
  };

  return (
    <section id="loginUsingPassword">
      <div className="backdrop" id="backdrop">
        .
      </div>
      <div className="justify-content-center mt-lg-5 mt-md-4 mt-sm-4 align-items-center d-flex">
        <div
          id="mobileView"
          className="bg-white mx-lg-3 mx-md-3 mx-sm-3 p-4 pt-5"
          style={{ width: "400px", height: "70vh" }}
        >
          <div className="p-3 position-relative">
            <div
              style={{ fontWeight: "700", fontSize: "20px", color: "#424553" }}
            >
              Login to your account
            </div>
            <form method="POST">
              <input
                className="form-control shadow-none mt-4 rounded-0"
                type="text"
                placeholder="Email or Mobile Number"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ height: "40px" }}
                name="email"
              />
              <input
                className="form-control shadow-none mt-3 rounded-0"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ height: "40px" }}
                name="password"
              />
              <NavLink to="/"
                className="btn btn-danger border-0 w-100 rounded-0 my-4 py-2"
                style={{ background: "rgb(255, 63, 108)", fontWeight: "700" }}
                onClick={sendOtp}
              >
                LOGIN
              </NavLink>
            </form>
            <div style={{ fontSize: "12px" }}>
              Forget your password?&nbsp;
              <NavLink to="/forgot" className="text-decoration-none">
                {" "}
                <span
                  style={{
                    color: "#FF3C6F",
                    fontWeight: "600",
                  }}
                >
                  Reset here
                </span>
              </NavLink>
            </div>
            <div className="mt-4" style={{ fontSize: "12px" }}>
              Having trouble logging in?&nbsp;
              <span
                style={{
                  color: "#FF3C6F",
                  fontWeight: "600",
                }}
              >
                Get help
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginUsingPassword;