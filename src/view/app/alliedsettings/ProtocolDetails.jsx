import React from "react";
import "../../../assets/css/allied_settings.css";
import Nav from "../../../components/AfterLoginNav/Nav";
import Tab from "../../../components/SettingsTab/Tab";

const ProtocolDetails = () => {
  return (
    <div>
      {/* <Nav /> */}
      <div className="dashBcontbody">
        <div className="patientsheading dpblock">
          <div className="patientsearchbar">
            <h3 className="name">Settings - Protocol</h3>
          </div>
        </div>
        <div className="signup_threebox practice_detailssect mt-0">
          <Tab />
          <div
            className="tab-content ptdetalistabcont user_detailsboxtab"
            id="pills-tabContent"
          >
            <h1>Protocol Details</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProtocolDetails;
