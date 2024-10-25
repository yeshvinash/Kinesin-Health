import React from "react";
import "../../../assets/css/allied_settings.css";
import Nav from "../../../components/AfterLoginNav/Nav";
import Tab from "../../../components/SettingsTab/Tab";

const PayementDetails = () => {
  return (
    <div>
      {/* <Nav /> */}
      <div className="dashBcontbody">
        <div className="payments_settingsbox">
          <h3>Payments Settings</h3>
          <button className="stripe_set_upbtn" type="submit">
            Stripe Set Up/ Log In
          </button>
        </div>
        <div className="patientsheading dpblock">
          <div className="patientsearchbar">
            <h3 className="name">Settings - Payements</h3>
          </div>
        </div>
        <div className="signup_threebox practice_detailssect mt-0">
          <Tab />
          <div
            className="tab-content ptdetalistabcont user_detailsboxtab"
            id="pills-tabContent"
          >
            <div className="show active">
              <div className="paymentsdetailsec">
                <h5>Stripe Setup</h5>
                <p>Connect to Stripe</p>
                <div className="btnxscenter">
                  <button className="custom_btn savwidth" type="submit">
                    Connect
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayementDetails;
