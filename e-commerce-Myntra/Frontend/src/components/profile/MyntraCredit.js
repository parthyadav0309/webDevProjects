import React, { useEffect } from "react";
import creditImg from "../images/creditImg.png";

function MyntraCredit() {
  useEffect(() => {
    document.getElementById("footer").style.display = "none";
  }, []);
  return (
    <section style={{background:"#eee"}}>
      {" "}
      <div>
        <img
          src={creditImg}
          style={{
            boxShadow: "0 1px 2px 0 rgb(0 0 0 / 25%)",
            width: "100%",
          }}
        />
        <div
          className="p-3 mt-2 bg-white"
          style={{ boxShadow: "0 1px 2px 0 rgb(0 0 0 / 25%)" }}
        >
          <div className="text-center" style={{ fontSize: "13px", fontWeight: "500" }}>
            TOP-UP YOUR MYNTRA CREDIT NOW!
          </div>
          <div className="text-center" style={{ fontSize: "30px", fontWeight: "700" }}> ₹0.00</div>
          <hr></hr>
          <div className="row">
            <div
              className="text-center col-6"
              style={{ borderRight: "1px solid #8080804d" }}
            >
              <div style={{ fontSize: "13px", color: "#A9ABB3" }}>
                For a quick checkout
              </div>
              <div
                style={{
                  color: "#526cd0",
                  fontWeight: "500",
                  fontSize: "14px",
                }}
              >
                TOP UP
              </div>
            </div>
            <div className="text-center col-6">
              <div style={{ fontSize: "13px", color: "#A9ABB3" }}>
                Have a gift card?
              </div>
              <div
                style={{
                  color: "#526cd0",
                  fontWeight: "500",
                  fontSize: "14px",
                }}
              >
                ADD GIFT CARD
              </div>
            </div>
          </div>
        </div>
        <div
          className="p-3 mt-2 bg-white"
          style={{ boxShadow: "0 1px 2px 0 rgb(0 0 0 / 25%)" }}
        >
          <div style={{ fontWeight: "500", fontSize: "12px" }}>
            TRANSACTION LOG
          </div>
        </div>
        <div
          className="p-3 mt-2 bg-white"
          style={{ boxShadow: "0 1px 2px 0 rgb(0 0 0 / 25%)" }}
        >
          <div style={{ fontWeight: "500", fontSize: "12px" }}>
            CREDIT DETAILS
          </div>
        </div>
        <div
          className="p-3 mt-2 bg-white"
          style={{ boxShadow: "0 1px 2px 0 rgb(0 0 0 / 25%)" }}
        >
          <div style={{ fontSize: "13px", fontWeight: "500" }}>PLEASE NOTE</div>
          <ul className="mt-2" style={{ fontSize: "13px", color: "#3e4152" }}>
            <li>
              Myntra Credit can't be cancelled or transferred to another
              account.
            </li>
            <li>
              It can't be withdrawn in the form of cash or transferred to any
              bank account.
            </li>
            <li>It can't be used to purchase Gift Cards.</li>
            <li>
              Net-banking and credit/debit cards issued in India can be used for
              Myntra Credit top up.
            </li>
            <li>Credits have an expiry. Check FAQs for more details.</li>
          </ul>
          <div className="d-flex">
            <div
              className="d-flex align-items-center"
              style={{
                color: "#526cd0",
                fontWeight: "500",
                fontSize: "12px",
              }}
            >
              MYNTRA CREDIT T&C{" "}
              &nbsp;<span className="fa fa-angle-right fa-lg"></span>
            </div>
            <div
              className="d-flex align-items-center mx-sm-5 mx-4"
              style={{
                color: "#526cd0",
                fontWeight: "500",
                fontSize: "12px",
              }}
            >
              GIFT CARD T&C{" "}
              &nbsp;<span className="fa fa-angle-right fa-lg"></span>
            </div>
            <div
              className="d-flex align-items-center"
              style={{
                color: "#526cd0",
                fontWeight: "500",
                fontSize: "12px",
              }}
            >
            FAQS &nbsp; <span className="fa fa-angle-right fa-lg"></span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MyntraCredit;
