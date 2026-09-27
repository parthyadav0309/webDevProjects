import React, { useEffect } from "react";

function ResetPassword() {
  useEffect(() => {
    document.getElementById("footer").style.display = "none";
    document.body.style.background = "rgb(255 192 203 / 30%)";
  }, []);
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
              Reset Password
            </div>
            <div
              className="mt-2"
              style={{ fontSize: "14px", color: "#A9ABB3" }}
            >
              Enter your email or mobile number and we’ll send a link on your
              email to reset your password.
            </div>
            <form>
              <input
                className="form-control shadow-none mt-4 rounded-0"
                type="text"
                placeholder="Email or Mobile Number"
                style={{ height: "40px" }}
              />
              <button
                type="submit"
                className="btn btn-danger border-0 w-100 rounded-0 my-4 py-2"
                style={{ background: "rgb(255, 63, 108)", fontWeight: "700" }}
              >
                SEND LINK
              </button>
            </form>
            <div className="" style={{ fontSize: "12px" }}>
              Unable to reset password?&nbsp;
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

export default ResetPassword;
