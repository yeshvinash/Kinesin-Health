import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import home from "../../assets/images/icons/home.svg";
import home2 from "../../assets/images/icons/home2.svg";
import logo from "../../assets/images/icons/Logo.svg";
import appointments from "../../assets/images/icons/appointments.svg";
import appointments1 from "../../assets/images/icons/appointments1.svg";
import messages from "../../assets/images/icons/messages.svg";
import messages1 from "../../assets/images/icons/messages1.svg";
import RepeatPrescriptions from "../../assets/images/icons/repeat-prescriptions.svg";
import RepeatPrescriptions1 from "../../assets/images/icons/repeat-prescriptions1.svg";
import HealthRecord from "../../assets/images/icons/health-record.svg";
import HealthRecord1 from "../../assets/images/icons/health-record1.svg";
import LabResults from "../../assets/images/icons/lab-results-trends.svg";
import LabResults1 from "../../assets/images/icons/lab-results-trends1.svg";
import MyProfile from "../../assets/images/icons/my-profile.svg";
import MyProfile1 from "../../assets/images/icons/my-profile1.svg";
// import  Settings from "../../assets/images/icons/settings-white.svg"
import "./Sidebar.css";

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState("");
  const handleMenuClick = (itemName) => {
    setActiveItem(itemName); // Update the active state when a menu item is clicked
  };

  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <>
      <div className="sidebar">
        <div className="sidebar-wrapper d-flex flex-column align-items-center">
          <Link className="navbar-brand mb-4" to="/">
            <img src={logo} alt="logo" />
          </Link>
          <div className="sidebar-links-wrapper">
            <Link
              to="/home"
              className={`menulist ${isActive("/home") ? "active" : ""}`}
              onClick={() => handleMenuClick("home")}
            >
              <img src={home} className="imgacctive" alt="" />
              <img src={home2} className="nonactive" alt="" />
              <span className="sidebarmenu">HOMEPAGE</span>
            </Link>
            <Link
              to="/home"
              className={`menulist ${
                isActive("/") ? "active" : ""
              }`}
              onClick={() => handleMenuClick("")}
            >
              <img className="nonactive" src={appointments} alt="" />
              <img className="imgacctive" src={appointments1} alt="" />
              <span className="sidebarmenu">Appointments</span>
            </Link>
            <Link
              to="/home"
              className={`menulist ${isActive("/") ? "active" : ""}`}
              onClick={() => handleMenuClick("")}
            >
              <img className="nonactive" src={messages} alt="" />
              <img className="imgacctive" src={messages1} alt="" />
              <span className="sidebarmenu">PATIENT/ CONSULTATION</span>
            </Link>
            <Link
              to="/document-patient"
              className={`menulist ${
                isActive("/repeat_prescriptions") ? "active" : ""
              }`}
              onClick={() => handleMenuClick("documents")}
            >
              <img className="nonactive" src={RepeatPrescriptions} alt="" />
              <img className="imgacctive" src={RepeatPrescriptions1} alt="" />
              <span className="sidebarmenu">ORDERS</span>
            </Link>
            <Link
              to="/document"
              className={`menulist ${isActive("/document") ? "active" : ""}`}
              onClick={() => handleMenuClick("document")}
            >
              <img className="nonactive" src={HealthRecord} alt="" />
              <img className="imgacctive" src={HealthRecord1} alt="" />
              <span className="sidebarmenu"> DOCUMENTS</span>
            </Link>
            <Link
              to="/home"
              className={`menulist ${isActive("/") ? "active" : ""}`}
              onClick={() => handleMenuClick("")}
            >
              <img className="nonactive" src={LabResults} alt="" />
              <img className="imgacctive" src={LabResults1} alt="" />
              <span className="sidebarmenu">OPPORTUNITIES</span>
            </Link>
            <Link
              to="/home"
              className={`menulist ${isActive("/") ? "active" : ""}`}
              onClick={() => handleMenuClick("")}
            >
              <img className="nonactive" src={MyProfile} alt="" />
              <img className="imgacctive" src={MyProfile1} alt="" />
              <span className="sidebarmenu">COMMUNICATIONS</span>
            </Link>
            <Link
              to="/home"
              className={`menulist ${isActive("/") ? "active" : ""}`}
              onClick={() => handleMenuClick("")}
            >
              <img className="nonactive" src={MyProfile} alt="" />
              <img className="imgacctive" src={MyProfile1} alt="" />
              <span className="sidebarmenu">REPORTS</span>
            </Link>
            <Link
              to="/home"
              className={`menulist ${isActive("/") ? "active" : ""}`}
              onClick={() => handleMenuClick("")}
            >
              <img className="nonactive" src={MyProfile} alt="" />
              <img className="imgacctive" src={MyProfile1} alt="" />
              <span className="sidebarmenu">REFERRALS</span>
            </Link>
            <Link
              to="/home"
              className={`menulist ${isActive("/") ? "active" : ""}`}
              onClick={() => handleMenuClick("")}
            >
              <img className="nonactive" src={MyProfile} alt="" />
              <img className="imgacctive" src={MyProfile1} alt="" />
              <span className="sidebarmenu"> VaccINE</span>
            </Link>
            <Link
              to="/home"
              className={`menulist ${isActive("/") ? "active" : ""}`}
              onClick={() => handleMenuClick("")}
            >
              <img className="nonactive" src={MyProfile} alt="" />
              <img className="imgacctive" src={MyProfile1} alt="" />
              <span className="sidebarmenu">Cycle of care</span>
            </Link>
            <Link
              to="/home"
              className={`menulist ${isActive("/") ? "active" : ""}`}
              onClick={() => handleMenuClick("")}
            >
              <img className="nonactive" src={MyProfile} alt="" />
              <img className="imgacctive" src={MyProfile1} alt="" />
              <span className="sidebarmenu">SETTINGS</span>
            </Link>
          </div>
        </div>
      </div>
      {/* <div className="sidebarbg">
        <div className="sidebarbox">
          <Link
            to="/allied_home"
            className={`menulist ${isActive("/allied_home") ? "active" : ""}`}
            onClick={() => handleMenuClick("home")}
          >
            <img src={home} className="imgacctive" alt="" />
            <img src={home2} className="nonactive" alt="" />
            <span className="sidebarmenu">Home</span>
          </Link>
          <Link
            to="/patient"
            className={`menulist ${isActive("/patient") ? "active" : ""}`}
            onClick={() => handleMenuClick("patient")}
          >
            <img className="nonactive" src={patient} alt="" />
            <img className="imgacctive" src={patient2} alt="" />
            <span className="sidebarmenu">Appointments</span>
          </Link>
          <Link
            className={`menulist ${activeItem === "orders" ? "active" : ""}`}
            onClick={() => handleMenuClick("orders")}
          >
            <img className="nonactive" src={result} alt="" />
            <img className="imgacctive" src={result2} alt="" />
            <span className="sidebarmenu">Messages</span>
          </Link>
          <Link
            to="/allied_documents"
            className={`menulist ${
              isActive("/allied_documents") ? "active" : ""
            }`}
            onClick={() => handleMenuClick("documents")}
          >
            <img className="nonactive" src={documents} alt="" />
            <img className="imgacctive" src={documents2} alt="" />
            <span className="sidebarmenu">Repeat Prescriptions</span>
          </Link>
          <Link
            className={`menulist ${activeItem === "vaccine" ? "active" : ""}`}
            onClick={() => handleMenuClick("vaccine")}
          >
            <img className="nonactive" src={vaccine} alt="" />
            <img className="imgacctive" src={vaccine2} alt="" />
            <span className="sidebarmenu"> Health Record</span>
          </Link>
          <Link
            className={`menulist ${
              activeItem === "opportunities" ? "active" : ""
            }`}
            onClick={() => handleMenuClick("opportunities")}
          >
            <img className="nonactive" src={oppor} alt="" />
            <img className="imgacctive" src={oppor2} alt="" />
            <span className="sidebarmenu">Lab results/ trends</span>
          </Link>
          <Link
            to="/allied_sms"
            className={`menulist ${isActive("/allied_sms") ? "active" : ""}`}
            onClick={() => handleMenuClick("communication")}
          >
            <img className="nonactive" src={communication} alt="" />
            <img className="imgacctive" src={communication2} alt="" />
            <span className="sidebarmenu">My profile</span>
          </Link>
        </div>
      </div> */}
    </>
  );
};

export default Sidebar;
