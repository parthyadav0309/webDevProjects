import React, { useEffect, useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import loginImg from "./images/loginSignUp.webp";
import Swal from "sweetalert2";

function LoginSignup(props) {
  const history = useHistory;
  useEffect(() => {
    document.getElementById("footer").style.display = "none";
    document.body.style.background = "rgb(255 192 203 / 30%)";
    // document.getElementById("loginProfileIcon").style.display = "none";
  }, []);

  const [user, setUser] = useState({
    number: "",
  });

  let name, value;
  const handleInputs = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;

    setUser({ ...user, [name]: value });
    setNo(value);
  };
  const [no, setNo] = useState("");
  const PostData = async (e) => {
    e.preventDefault();
    const { number } = user;
    console.log(number);
    const res = await fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        number,
      }),
    });
    const data = await res.json();
    if (res.status === 422 || !data) {
      Swal.fire("Oops", "All fields are mandatory", "warning", {
        timer: 2200,
        buttons: false,
      });
      console.log("All fields are mandatory");
    }
    window.location.href = `/login/${no}`;
    //  else if (res.status === 409) {
    //   Swal.fire("Oops", "Email already exists", "warning", {
    //     timer: 2200,
    //     buttons: false,
    //   });
    //   console.log("Email already exists");
    // } else if (res.status === 401) {
    //   Swal.fire("Oops", "Password Didn't Match", "error", {
    //     timer: 2200,
    //     buttons: false,
    //   });
    //   console.log("Password Didn't Match");
    // } else if (res.status === 201) {
    //   Swal.fire("", "SignUp Successful", "success", {
    //     timer: 2200,
    //     buttons: false,
    //   });
    //   console.log("SignUp Successful");
    // } else {
    //   Swal.fire("", "Invalid Credentials!", "error", {
    //     timer: 2200,
    //     buttons: false,
    //   });
    //   console.log("Invalid Credentials");
    // }
  };

  // const [number, setNumber] = useState("");
  return (
    <section id="login">
      <div className="backdrop" id="backdrop">
        .
      </div>
      <div className="justify-content-center mt-lg-5 mt-md-4 mt-sm-4 align-items-center d-flex">
        <div
          id="mobileView"
          className="bg-white mx-3"
          style={{ width: "400px", height: "70vh" }}
        >
          <img src={loginImg} className="img-fluid w-100" />
          <div className="p-3">
            <div style={{ fontSize: "16px", color: "#535766" }}>
              <b style={{ color: "#424553", fontSize: "20px" }}>Login</b> or{" "}
              <b style={{ color: "#424553", fontSize: "20px" }}>Signup</b>
            </div>
            <form
              // action={`/${no}/createAccount`}
              className="position-relative mt-4"
              // method="POST"
              // onSubmit={PostData}
            >
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
                  name="number"
                  value={user.number}
                  onChange={handleInputs}
                  style={{ height: "40px", paddingLeft: "54px" }}
                />
              </div>
              <label
                className="my-3"
                style={{ fontSize: "13px", color: "rgba(40,44,63,.8)" }}
              >
                By continuing, I agree to the{" "}
                <a
                  href=""
                  className="text-decoration-none"
                  style={{ color: "#ff3c6f", fontWeight: "600" }}
                >
                  Terms of Use
                </a>{" "}
                &{" "}
                <a
                  href=""
                  className="text-decoration-none"
                  style={{ color: "#ff3c6f", fontWeight: "600" }}
                >
                  Privacy Policy
                </a>
              </label>
              <button
                type="submit"
                className="btn btn-danger border-0 rounded-0 w-100 my-2 py-2"
                style={{ background: "rgb(255, 63, 108)", fontWeight: "700" }}
                onClick={PostData}
              >
                CONTINUE
              </button>
              <div
                className="mt-4"
                style={{ color: "rgba(40,44,63,.8)", fontSize: "13px" }}
              >
                Have trouble logging in?{" "}
                <span
                  className=""
                  style={{ color: "#ff3c6f", fontWeight: "600" }}
                >
                  Get help
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LoginSignup;