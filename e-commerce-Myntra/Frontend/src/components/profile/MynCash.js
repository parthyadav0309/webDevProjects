import React, { useEffect } from "react";
import Accordion from "react-bootstrap/Accordion";

function MynCash() {
  useEffect(() => {
    document.getElementById("footer").style.display = "none";
  }, []);

  return (
    <section style={{background:"#eee"}}>
      {" "}
      <div
        className="justify-content-center bg-white d-flex"
        style={{ boxShadow: "0 1px 2px 0 rgb(0 0 0 / 25%)" }}
      >
        <div className="w-75 text-center py-sm-5 py-4">
          <div style={{ color: "#14cda8", fontWeight: "500" }}>
            TOTAL AVAILABLE MYNCASH
          </div>
          <div className="my-2" style={{ fontSize: "30px", fontWeight: "700" }}>
            0
          </div>
          <div style={{ fontSize: "12px" }}>
            Your total MynCash is worth ₹0.00
          </div>
          <div className="my-3" style={{ color: "#7e818c", fontSize: "12px" }}>
            You can pay upto 10% (may vary during the sale & promotion events)
            of your order value through MynCash. Use them on the Payments page
            during checkout.
          </div>
          <div style={{ fontSize: "14px" }}>
            You have <b>0</b> referral MynCash pending
          </div>
        </div>
      </div>
      <div
        className="justify-content-center bg-white d-flex mt-2"
        style={{ boxShadow: "0 1px 2px 0 rgb(0 0 0 / 25%)" }}
      >
        <div className="w-100">
          <div className="p-3" style={{ fontWeight: "700", fontSize: "13px" }}>
            ACTIVE MYNCASH
          </div>
          <hr className="m-0"></hr>
          <table className="w-100 border-0">
            <tr>
              <th>DESCRIPTON</th>
              <th>CREDIT</th>
              <th>DEBIT</th>
              <th>BALANCE</th>
            </tr>
            <tr>
              <td>Promotion</td>
              <td>+ 200</td>
              <td>0</td>
              <td style={{ fontWeight: "600" }}>+ 200</td>
            </tr>
            <tr>
              <td className="tt">Expiry: 15 Jun 2022 | 12:00:00 A.M</td>
            </tr>
            <tr>
              <td>Promotion</td>
              <td>+ 200</td>
              <td>0</td>
              <td style={{ fontWeight: "600" }}>+ 200</td>
            </tr>
            <tr>
              <td className="tt">Expiry: 14 Jun 2022 | 12:00:00 A.M</td>
            </tr>
            <tr>
              <td>Promotion</td>
              <td>+ 130</td>
              <td>0</td>
              <td style={{ fontWeight: "600" }}>+ 130</td>
            </tr>
            <tr>
              <td className="tt">Expiry: 17 Jun 2022 | 11:59:59 P.M</td>
            </tr>
            <tr>
              <td>Promotion</td>
              <td>+ 70</td>
              <td>0</td>
              <td style={{ fontWeight: "600" }}>+ 70</td>
            </tr>
            <tr>
              <td className="tt">Expiry: 23 Dec 2021 | 11:59:59 P.M</td>
            </tr>
            <tr>
              <td>Promotion</td>
              <td>+ 200</td>
              <td>0</td>
              <td style={{ fontWeight: "600" }}>+ 200</td>
            </tr>
            <tr>
              <td className="tt">Expiry: 27 Nov 2021 | 11:59:00 P.M</td>
            </tr>
          </table>
        </div>
      </div>
      <div>
        <Accordion flush>
          <Accordion.Item
            eventKey={0}
            className="pb-2 mt-2 bg-white"
            style={{ boxShadow: "0 1px 2px 0 rgb(0 0 0 / 25%)" }}
          >
            <Accordion.Header>
              <div
                className="d-flex px-2 text-dark align-items-center"
                style={{ fontWeight: "700", fontSize: "13px" }}
              >
                TRANSACTION LOGS
                <div className="ml-auto">
                  <span
                    id="changeArrow"
                    className="fa fa-angle-right"
                    style={{ color: "grey" }}
                  ></span>
                </div>
              </div>
            </Accordion.Header>
            <Accordion.Body className="pt-1">
              <hr className="mt-0"></hr>
              <div className="d-flex px-3" style={{ fontSize: "13px" }}>
                <div>
                  <div>Promotion</div>
                  <div style={{ color: "#7e818c" }}>Credited To MynCash</div>
                </div>
                <div className="ml-auto">
                  <div style={{ color: "#7e818c" }}>14 Jun 2022</div>
                  <div style={{ color: "#14cda8", fontWeight: "500" }}>
                    +200
                  </div>
                </div>
              </div>
              <hr></hr>
              <div className="d-flex px-3" style={{ fontSize: "13px" }}>
                <div>
                  <div>Promotion</div>
                  <div style={{ color: "#7e818c" }}>Credited To MynCash</div>
                </div>
                <div className="ml-auto">
                  <div style={{ color: "#7e818c" }}>14 Jun 2022</div>
                  <div style={{ color: "#14cda8", fontWeight: "500" }}>
                    +200
                  </div>
                </div>
              </div>
              <hr></hr>
              <div className="d-flex px-3" style={{ fontSize: "13px" }}>
                <div>
                  <div>Promotion</div>
                  <div style={{ color: "#7e818c" }}>Credited To MynCash</div>
                </div>
                <div className="ml-auto">
                  <div style={{ color: "#7e818c" }}>14 Jun 2022</div>
                  <div style={{ color: "#14cda8", fontWeight: "500" }}>
                    +200
                  </div>
                </div>
              </div>
              <hr></hr>
              <div className="d-flex px-3" style={{ fontSize: "13px" }}>
                <div>
                  <div>Promotion</div>
                  <div style={{ color: "#7e818c" }}>Credited To MynCash</div>
                </div>
                <div className="ml-auto">
                  <div style={{ color: "#7e818c" }}>14 Jun 2022</div>
                  <div style={{ color: "#14cda8", fontWeight: "500" }}>
                    +200
                  </div>
                </div>
              </div>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item
            eventKey={1}
            className="pb-2 mt-2 bg-white"
            style={{ boxShadow: "0 1px 2px 0 rgb(0 0 0 / 25%)" }}
          >
            <Accordion.Header>
              <div
                className="d-flex px-2 text-dark align-items-center"
                style={{ fontWeight: "700", fontSize: "13px" }}
              >
                ELIGIBILITY, MEMBERSHIP, ACCRUAL
                <div className="ml-auto">
                  <span
                    id="changeArrow"
                    className="fa fa-angle-right"
                    style={{ color: "grey" }}
                  ></span>
                </div>
              </div>
            </Accordion.Header>
            <Accordion.Body>
              <ul
                className="mx-4 pt-1"
                style={{ color: "#7e818c", fontSize: "13px" }}
              >
                <li className="mt-2">
                  These terms and conditions are operational only in India and
                  open to participation of all the registered members, resident
                  of India of myntra, over and above the age of 18 years.
                </li>
                <li className="mt-2">
                  My Privilege program has been converted into MynCash Program.
                  The same denomination is applicable for MynCash.
                </li>
              </ul>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item
            eventKey={2}
            className="pb-2 mt-2 bg-white"
            style={{ boxShadow: "0 1px 2px 0 rgb(0 0 0 / 25%)" }}
          >
            <Accordion.Header>
              <div
                className="d-flex px-2 text-dark align-items-center"
                style={{ fontWeight: "700", fontSize: "13px" }}
              >
                GENERAL TERMS AND CONDITIONS
                <div className="ml-auto">
                  <span
                    id="changeArrow"
                    className="fa fa-angle-right"
                    style={{ color: "grey" }}
                  ></span>
                </div>
              </div>
            </Accordion.Header>
            <Accordion.Body>
              <ul
                className="mx-4 pt-1"
                style={{ color: "#7e818c", fontSize: "14px" }}
              >
                <li className="mt-2">
                  Each member is responsible for remaining knowledgeable about
                  the Myntra Program Terms and Conditions and the MynCash in his
                  or her account.
                </li>
                <li className="mt-2">
                  Myntra will send correspondence to active members to advise
                  them of matters of interest, including notification of Myntra
                  Program changes and MynCash Updates.
                </li>
                <li className="mt-2">
                  Myntra will not be liable or responsible for correspondence
                  lost or delayed in the mail/e-mail.
                </li>
                <li className="mt-2">
                  Myntra reserves the right to refuse, amend, vary or cancel
                  membership of any Member without assigning any reason and
                  without prior notification.
                </li>
                <li className="mt-2">
                  Any change in the name, address, or other information relating
                  to the Member must be notified to Myntra via the
                  Helpdesk/email by the Member, as soon as possible at
                  support@myntra.com or call at +91-80-43541999 24 Hours a Day /
                  7 Days a Week.
                </li>
                <li className="mt-2">
                  Myntra reserves the right to add,modify,delete or otherwise
                  change the Terms and Conditions without any approval, prior
                  notice or reference to the Member.
                </li>
                <li className="mt-2">
                  In the event of dispute in connection with Myntra Program and
                  the interpretation of Terms and Conditions, Myntra's decision
                  shall be final and binding.
                </li>
                <li className="mt-2">
                  This Policy and these terms shall be read in conjunction with
                  the standard legal policies of Myntra, including its Privacy
                  policy.
                </li>
              </ul>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </section>
  );
}

export default MynCash;
