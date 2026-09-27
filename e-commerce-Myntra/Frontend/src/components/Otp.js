import React, { useEffect, useState } from "react";
import otpImg from "./images/mobile-verification.jpg";
import OTPInput, { ResendOTP } from "otp-input-react";
import { NavLink, useParams } from "react-router-dom";
import Swal from "sweetalert2";

function Otp() {
  const { no } = useParams();
  useEffect(() => {
    document.getElementById("footer").style.display = "none";
    document.body.style.background = "rgb(255 192 203 / 30%)";
  }, []);

  const setRender = () => {
    document.getElementById("inr").style.display = "block";
    document.getElementById("resend").style.display = "none";
    reset();
  };
  const renderTime = (e) => {
    return (
      <div className="">
        <span id="inr" style={{ fontWeight: "600", fontSize: "12px" }}>
          <span style={{ color: "#A9ABB3", fontWeight: "400" }}>
            Resend OTP in:&nbsp;
          </span>
          00:{e}
        </span>
        <span
          id="resend"
          style={{
            color: "#FF3C6F",
            fontWeight: "600",
            display: "none",
            fontSize: "12px",
          }}
        >
          RESEND OTP
        </span>
      </div>
    );
  };
  const reset = () => {
    setTimeout(() => {
      document.getElementById("inr").style.display = "none";
      document.getElementById("resend").style.display = "block";
    }, 32000);
  };
  reset();

  const [OTP, setOTP] = useState({ num1: "", num2: "", num3: "", num4: "" });

  let name, value;
  const handleInputs = (e) => {
    console.log(e);
    name = e.target.name;
    value = e.target.value;

    setOTP({ ...OTP, [name]: value });
  };
  const PostData = async (e) => {
    e.preventDefault();
    const { num1, num2, num3, num4 } = OTP;
    let otp = `${num1}${num2}${num3}${num4}`
    otp = Number(otp);
    const mobile = no;
    const res = await fetch("/login/otplogin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        mobile,
        otp
      }),
    });
    const data = await res.json();
    if (res.status === 200 || res.status === 201) {
      Swal.fire("", "OTP verified", "success", {
        timer: 2200,
        buttons: false,
      });
      document.getElementById("toLogin").style.display = "none";
      document.getElementById("setupProfile").style.display = "block";
      window.location.href = `/${no}/createAccount`;
      console.log("All fields are mandatory");
    }
    else {
      Swal.fire("Oops", "OTP not verified", "warning", {
        timer: 2200,
        buttons: false,
      });
    }
  };
  return (
    <section id="otpLogin">
      <div className="backdrop" id="backdrop">
        .
      </div>
      <div className="justify-content-center mt-lg-5 mt-md-4 mt-sm-4 align-items-center d-flex">
        <div
          id="mobileView"
          className="bg-white mx-lg-3 mx-md-3 mx-sm-3 p-5"
          style={{ width: "400px", height: "70vh" }}
        >
          <img
            src={otpImg}
            className="img-fluid"
            style={{ width: "90px", height: "90px" }}
          />
          <div className="p-3 position-relative">
            <div
              style={{ fontWeight: "700", fontSize: "20px", color: "#424553" }}
            >
              Verify with OTP
            </div>
            <div
              className="mb-5"
              style={{ fontSize: "14px", color: "#282C3F" }}
            >
              Sent to xxxxxxxxxx
            </div>
            <form>
              {/*<OTPInput
                value={OTP.number}
                onChange={handleInputs}
                autoFocus
                OTPLength={4}
                otpType="number"
                name="number"
  />*/}
              <input
                type="tel"
                pattern="[0-9]{1}"
                maxLength={1}
                className="text-center"
                value={OTP.num1}
                onChange={handleInputs}
                name="num1"
              />
              <input
                type="tel"
                pattern="[0-9]{1}"
                maxLength={1}
                className="text-center mx-3"
                value={OTP.num2}
                onChange={handleInputs}
                name="num2"
              />
              <input
                type="tel"
                pattern="[0-9]{1}"
                maxLength={1}
                className="text-center"
                value={OTP.num3}
                onChange={handleInputs}
                name="num3"
              />
              <input
                type="tel"
                pattern="[0-9]{1}"
                maxLength={1}
                className="text-center ml-3"
                value={OTP.num4}
                onChange={handleInputs}
                name="num4"
              />
              <ResendOTP
                maxTime={30}
                renderTime={renderTime}
                className="resendBtn my-4"
                onResendClick={setRender}
              />
              <button
                type="submit"
                className="text-decoration-none"
                onClick={PostData}
              >
                {" "}
                <span
                  style={{
                    color: "#FF3C6F",
                    fontWeight: "600",
                  }}
                >
                  send otp
                </span>
              </button>
            </form>
            <div style={{ fontSize: "12px" }}>
              Log in using{" "}
              <NavLink to="/password" className="text-decoration-none">
                {" "}
                <span
                  style={{
                    color: "#FF3C6F",
                    fontWeight: "600",
                  }}
                >
                  Password
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

export default Otp;