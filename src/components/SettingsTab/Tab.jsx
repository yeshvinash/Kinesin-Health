import React, { useRef, useState } from "react";
import resume2 from "../../assets/images/resume2.svg";
import user from "../../assets/images/user.svg";
import informationi from "../../assets/images/informationi.svg";
import clock from "../../assets/images/clock.svg";
import rules from "../../assets/images/rules.svg";
import notification from "../../assets/images/notification.svg";
import bell from "../../assets/images/bell.svg";
import importi from "../../assets/images/importi.svg";
import privacy_policy from "../../assets/images/privacy_policy.svg";
import clipboard from "../../assets/images/clipboard.svg";
import { NavLink } from "react-router-dom";
import resume from "../../assets/images/resume.svg";
import user2 from "../../assets/images/user2.svg";
import informationi2 from "../../assets/images/informationi2.svg";
import clock2 from "../../assets/images/clock2.svg";
import rules2 from "../../assets/images/rules2.svg";
import notification2 from "../../assets/images/notification2.svg";
import bell2 from "../../assets/images/bell2.svg";
import importi2 from "../../assets/images/importi2.svg";
import SettingsRoute from "../Route/SettingsRoute";

const Tab = () => {
  const [activeNavLink, setActiveNavLink] = useState("Practice Details");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeHeader, setActiveHeader] = useState("");

     

  const handleNavLinkClick = (navLinkName) => {
    setActiveNavLink(navLinkName);
    setDropdownOpen(false); // Close the dropdown after selecting a section
    switch (navLinkName) {
      case "Practice Details":
        setActiveHeader("Practice Details");
        break;
      case "User Details":
        setActiveHeader(" User Details");
        break;
      case "Services Details":
        setActiveHeader("Services Details");
        break;
      // Add more cases for other tabs as needed
      default:
        setActiveHeader("Settings");
    }
  };

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen);
  };
  

  return (
    <>
      <div className="dropdown dbflex20">
        <button
          className="btn detailsp_btn dropdown-toggle"
          type="button"
          id="dropdownMenuButton1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          onClick={handleDropdownToggle}
        >
          {activeNavLink}
        </button>
        
        <div className={`tabflex dropdown-menu ${dropdownOpen ? "show" : ""}`}>
          <ul
            className="nav nav-pills practicedetailssectlist"
            id="pills-tab"
            role="tablist"
          >
            <li className="nav-item">
              <NavLink
                to="/practice_details"
                className="nav-link"
                activeClassName="active"
                onClick={() => handleNavLinkClick("Practice Details")}
              >
                <img className="tnonactivimg" src={resume2} alt="" />
                <img className="tactivimg" src={resume} alt="" />
                Practice Details
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to={"/user_details"}
                className="nav-link"
                activeClassName="active"
                onClick={() => handleNavLinkClick("User Details")}
              >
                <img className="tnonactivimg" src={user} alt="" />
                <img className="tactivimg" src={user2} alt="" />
                User Details
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to={"/service_details"}
                className="nav-link"
                activeClassName="active"
                onClick={() => handleNavLinkClick("Services Details")}
              >
                <img className="tnonactivimg" src={informationi} alt="" />
                <img className="tactivimg" src={informationi2} alt="" />
                Services Details
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to={"/practice_hours_details"}
                activeClassName="active"
                className="nav-link"
                onClick={() => handleNavLinkClick("Practice Hours")}
              >
                <img className="tnonactivimg" src={clock} alt="" />
                <img className="tactivimg" src={clock2} alt="" />
                Practice Hours
              </NavLink>
            </li>

            <li className="nav-item" role="presentation">
              <NavLink
                to={"/sms_settings_details"}
                className="nav-link"
                activeClassName="active"
                onClick={() => handleNavLinkClick("SMS settings")}
              >
                <img className="tnonactivimg" src={notification} alt="" />
                <img className="tactivimg" src={notification2} alt="" />
                SMS settings
              </NavLink>
            </li>
            <li className="nav-item" role="presentation">
              <NavLink
                to={"/notifications_details"}
                className="nav-link"
                activeClassName="active"
                onClick={() => handleNavLinkClick("Notifications")}
              >
                <img className="tnonactivimg" src={bell} alt="" />
                <img className="tactivimg" src={bell2} alt="" />
                Notifications
              </NavLink>
            </li>
            <li className="nav-item" role="presentation">
              <NavLink
                to={"/payments_details"}
                className="nav-link"
                activeClassName="active"
                onClick={() => handleNavLinkClick("Payments")}
              >
                <img className="tnonactivimg" src={importi} alt="" />
                <img className="tactivimg" src={importi2} alt="" />
                Payments
              </NavLink>
            </li>


          </ul>
        </div>
      </div>
      {/* Pass the active tab name to SettingsRoute */}
      {/* <SettingsRoute activeTab={activeHeader} /> */}
    </>
  );
};

export default Tab;
