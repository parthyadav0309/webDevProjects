import React, { useEffect } from "react";

function Addresses() {
  useEffect(() => {
    document.getElementById("footer").style.display = "none";
  }, []);
  const setAddress = () => {
    var a = document.getElementById("default");
    var b = document.getElementById("other");
    if (a.style.display === "block") {
      a.style.display = "none";
      b.style.display = "block";
    } else {
      a.style.display = "block";
      b.style.display = "none";
    }
  };

  return (
    <section style={{ background: "#eee", height: "100%" }}>
      {" "}
      <div className="d-flex align-items-center mb-2">
        <div
          className="btn btn-dark bg-white w-100 px-3 py-2 ml-auto"
          style={{
            color: "#526cd0",
            border: "0.5px solid #d4d5d9",
            fontWeight: "600",
            boxShadow: "0 1px 2px 0 rgb(0 0 0 / 25%)",
            height: "fit-content",
          }}
        >
          + ADD NEW ADDRESS
        </div>
      </div>
      <div className="pl-3" style={{ fontWeight: "500", fontSize: "13px" }}>
        DEFAULT ADDRESS
      </div>
      <div
        className="py-3 mt-2 bg-white"
        style={{ boxShadow: "0 1px 2px 0 rgb(0 0 0 / 25%)" }}
      >
        <div className="d-flex px-3">
          <div style={{ fontSize: "16px", fontWeight: "600" }}>UserName</div>
          <div
            className="rounded-pill btn btn-dark border-0 text-dark p-0 px-2 ml-auto"
            style={{
              fontSize: "14px",
              fontWeight: "700",
              background: "#F5F5F6",
            }}
          >
            HOME
          </div>
        </div>
        <div
          className="p-3 py-2"
          style={{ color: "#696E79", wordBreak: "break-all" }}
          onClick={setAddress}
        >
          aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
          <br></br>
          aaaaaaaaaaaaaaaaaaaaaaaaaaaa<br></br>aaaaaaaaaaaaaaaaaaaaa
          <br></br>aaaaaaaa
        </div>
        <div id="default">
          <div className="pl-3" style={{ color: "#696E79" }}>
            Mobile: xxxxxxxxxx
          </div>
          <hr></hr>
          <div className="row">
            <div
              className="text-center col-6"
              style={{ borderRight: "1px solid #8080804d" }}
            >
              <div
                style={{
                  color: "#526cd0",
                  fontWeight: "500",
                  fontSize: "16px",
                }}
              >
                EDIT
              </div>
            </div>
            <div className="text-center col-6">
              <div
                style={{
                  color: "#526cd0",
                  fontWeight: "500",
                  fontSize: "16px",
                }}
              >
                REMOVE
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="mt-2 pl-3"
        style={{ fontWeight: "500", fontSize: "13px" }}
      >
        OTHER ADDRESSES
      </div>
      <div
        className="py-3 mt-2 bg-white"
        style={{ boxShadow: "0 1px 2px 0 rgb(0 0 0 / 25%)" }}
      >
        <div className="d-flex px-3">
          <div style={{ fontSize: "16px", fontWeight: "600" }}>UserName</div>
          <div
            className="rounded-pill btn btn-dark border-0 text-dark p-0 px-2 ml-auto"
            style={{
              fontSize: "14px",
              fontWeight: "700",
              background: "#F5F5F6",
            }}
          >
            HOME
          </div>
        </div>
        <div
          className="p-3 py-2"
          style={{ color: "#696E79", wordBreak: "break-all" }}
          onClick={setAddress}
        >
          aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
          <br></br>
          aaaaaaaaaaaaaaaaaaaaaaaaaaaa<br></br>aaaaaaaaaaaaaaaaaaaaa
          <br></br>aaaaaaaa
        </div>
        <div id="other" style={{ display: "none" }}>
          <div className="pl-3" style={{ color: "#696E79" }}>
            Mobile: xxxxxxxxxx
          </div>
          <div
            className="pt-2 pl-3"
            style={{
              fontSize: "12px",
              color: "#14cda8",
              fontWeight: "700",
              cursor: "pointer",
            }}
          >
            MAKE THIS DEFAULT
          </div>
          <hr></hr>
          <div className="row">
            <div
              className="text-center col-6"
              style={{ borderRight: "1px solid #8080804d" }}
            >
              <div
                style={{
                  color: "#526cd0",
                  fontWeight: "500",
                  fontSize: "16px",
                }}
              >
                EDIT
              </div>
            </div>
            <div className="text-center col-6">
              <div
                style={{
                  color: "#526cd0",
                  fontWeight: "500",
                  fontSize: "16px",
                }}
              >
                REMOVE
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Addresses;
