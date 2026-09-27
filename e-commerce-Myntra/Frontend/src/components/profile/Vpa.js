import React, { useEffect } from "react";
import upi from "../images/upi.png";
function Vpa() {
  useEffect(() => {
    document.getElementById("footer").style.display = "none";
  }, []);
  return (
    <section>
      {" "}
      <div className="row gx-0">
        <div
          className="mb-4 mt-3 pl-2"
          style={{ fontWeight: "700", fontSize: "18px" }}
        >
          Saved VPA
        </div>
        <div className="col-12 px-2">
          <div
            className="p-3 rounded"
            style={{ boxShadow: "0px 1px 3px rgb(40 44 63 / 30%)" }}
          >
            <div className="d-flex align-items-center mb-3">
              <div
                className="fa fa-google align-items-center d-flex justify-content-center mr-2"
                style={{
                  height: "36px",
                  borderRadius: "50%",
                  width: "38px",
                  fontSize: "12px",
                  border: "1px solid rgb(169 171 179 / 42%)",
                }}
              >
                &nbsp;Pay
              </div>
              <div style={{ fontWeight: "500", fontSize: "12px" }}>
                xyz@gmail.com
              </div>
              <img className="ml-auto" style={{ height: "17px" }} src={upi} />
            </div>
            <div style={{ color: "#A9ABB3", fontSize: "11px" }}>
              ACCOUNT HOLDER
            </div>
            <div style={{ fontSize: "14px" }}>Mr/Ms XYZ</div>
            <hr></hr>
            <div
              className="text-center"
              style={{ fontWeight: "600", color: "#FF3F6C" }}
            >
              REMOVE
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Vpa;
