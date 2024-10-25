import React from "react";
import Nav from "../../../components/AfterLoginNav/Nav";
import Tab from "../../../components/SettingsTab/Tab";

const StaffHoursDetails = () => {
  return (
    <div>
      {/* <Nav /> */}
      <div className="dashBcontbody">
        <div className="patientsheading dpblock">
          <div className="patientsearchbar">
            <h3 className="name">Settings - Practice Hours</h3>
          </div>
        </div>
        <div className="signup_threebox practice_detailssect mt-0">
          <Tab />
          <div
            className="tab-content ptdetalistabcont user_detailsboxtab"
            id="pills-tabContent"
          >
            <div className="show active">
              <div className="practice_hours"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffHoursDetails;
