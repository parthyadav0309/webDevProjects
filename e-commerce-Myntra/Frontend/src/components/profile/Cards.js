import React, { useEffect } from "react";
import card from "../images/profile-cards.png";

function Cards() {
  useEffect(() => {
    document.getElementById("footer").style.display = "none";
  }, []);
  return (
    <section>
      {" "}
      <div className="justify-content-center d-flex px-2">
        <div className="text-center">
          <img src={card} className="py-5" />
          <div className="pb-4" style={{ fontSize: "15px", fontWeight: "500" }}>
            SAVE YOUR CREDIT/DEBIT CARDS DURING PAYMENT
          </div>
          <div
            className="justify-content-center d-flex"
            style={{
              color: "#A9ABB3",
              fontSize: "16px",
            }}
          >
            <div className="w-75">
              It's convenient to pay with saved cards. Your card information
              will be secure, we use 128-bit encryption
            </div>
          </div>
          <div
            className="d-flex align-items-center"
            style={{ marginTop: "150px" }}
          >
            <hr style={{ color: "#A9ABB3", width: "40%" }}></hr>
            <div
              className="mx-3"
              style={{ color: "#A9ABB3", fontSize: "12px" }}
            >
              MYNTRA SECURED
            </div>
            <hr style={{ color: "#A9ABB3", width: "40%" }}></hr>
          </div>
          <img
            className="my-3 img-fluid"
            src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/payment-method_69e7ec.svg"
          />
        </div>
      </div>
    </section>
  );
}

export default Cards;
