import React, { useState } from "react";
import "./sidebar.css";
import home from "../../assets/images/home.svg";
import patient from "../../assets/images/patient.svg";
import result from "../../assets/images/results.svg";
import documents from "../../assets/images/documents.svg";
import vaccine from "../../assets/images/vacinnations.svg";
import oppor from "../../assets/images/opportunities.svg";
import communication from "../../assets/images/communication.svg";
import reports from "../../assets/images/reports.svg";
import search from "../../assets/images/search.svg";
import settings from "../../assets/images/settings.svg";
import home2 from "../../assets/images/home2.svg";
import patient2 from "../../assets/images/patient2.svg";
import result2 from "../../assets/images/results2.svg";
import documents2 from "../../assets/images/documents2.svg";
import vaccine2 from "../../assets/images/vacinnations2.svg";
import oppor2 from "../../assets/images/opportunities2.svg";
import communication2 from "../../assets/images/communication2.svg";
import reports2 from "../../assets/images/reports2.svg";
import search2 from "../../assets/images/search2.svg";
import settings2 from "../../assets/images/settings2.svg";
import logo from "../../assets/images/Logo.svg";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const Sidebar = () => {
  const [activeItem, setActiveItem] = useState("");
  const handleMenuClick = (itemName) => {
    setActiveItem(itemName); // Update the active state when a menu item is clicked
  };

  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  let userrole = useSelector((state) => state.auth.user?.role);
  let accessToken = localStorage.getItem("kinesin-accessToken");
  if (accessToken && !userrole)
    userrole = JSON.parse(window.atob(accessToken.split(".")[1])).role;

  // console.log('Logged in user role is : ' + userrole);

  return (
    <div className="sidebar">
      <div className="sidebar-wrapper d-flex flex-column align-items-center">
        <Link className="navbar-brand mb-4" to="/allied_home">
          <img src={logo} alt="logo" />
        </Link>
        <div className="sidebar-links-wrapper">
          <Link
            to="/allied_home"
            className={`menulist ${isActive("/allied_home") ? "active" : ""}`}
            onClick={() => handleMenuClick("home")}
          >
            <img src={home} className="imgacctive" alt="" />
            <img src={home2} className="nonactive" alt="" />
            <span className="sidebarmenu">HOMEPAGE</span>
          </Link>

          {userrole && ["ALLIED", "USER"].includes(userrole.toUpperCase()) && (
            <Link
              to="/patient"
              className={`menulist ${isActive("/patient") ? "active" : ""}`}
              onClick={() => handleMenuClick("patient")}
            >
              <img className="nonactive" src={patient} alt="" />
              <img className="imgacctive" src={patient2} alt="" />
              <span className="sidebarmenu">PATIENT</span>
            </Link>
          )}

          {/* {userrole && ['ALLIED', 'USER'].includes(userrole.toUpperCase()) && (
          <Link
            to="/patient-detail"
            className={`menulist ${isActive("/patient-detail") ? "active" : ""}`}
            onClick={() => handleMenuClick("patient-detail")}
          >
            <img className="nonactive" src={patient} alt="" />
            <img className="imgacctive" src={patient2} alt="" />
            <span className="sidebarmenu">PATIENT File</span>
          </Link>
        )} */}

          {/* {userrole && ['USER'].includes(userrole.toUpperCase()) && (
          <Link
            className={`menulist ${activeItem === "orders" ? "active" : ""}`}
            onClick={() => handleMenuClick("orders")}
          >
            <img className="nonactive" src={result} alt="" />
            <img className="imgacctive" src={result2} alt="" />
            <span className="sidebarmenu">ORDERS</span>
          </Link>
        )} */}

          {userrole && ["USER"].includes(userrole.toUpperCase()) && (
            <Link
              to="/allied_documents"
              className={`menulist ${
                isActive("/allied_documents") ? "active" : ""
              }`}
              onClick={() => handleMenuClick("documents")}
            >
              <img className="nonactive" src={documents} alt="" />
              <img className="imgacctive" src={documents2} alt="" />
              <span className="sidebarmenu">DOCUMENTS</span>
            </Link>
          )}

          {/* {userrole && ['USER'].includes(userrole.toUpperCase()) && (
          <Link
            className={`menulist ${activeItem === "vaccine" ? "active" : ""}`}
            onClick={() => handleMenuClick("vaccine")}
          >
            <img className="nonactive" src={vaccine} alt="" />
            <img className="imgacctive" src={vaccine2} alt="" />
            <span className="sidebarmenu"> VACCINE</span>
          </Link>
        )} */}

          {/*userrole && ['USER'].includes(userrole.toUpperCase()) && (
          <Link
            className={`menulist ${activeItem === "opportunities" ? "active" : ""
              }`}
            onClick={() => handleMenuClick("opportunities")}
          >
            <img className="nonactive" src={oppor} alt="" />
            <img className="imgacctive" src={oppor2} alt="" />
            <span className="sidebarmenu">OPPORTUNITIES</span>
          </Link>
        )*/}

          {/*userrole && ['USER'].includes(userrole.toUpperCase()) && (
          <Link
            to="/allied_sms"
            className={`menulist ${isActive("/allied_sms") ? "active" : ""
              }`}
            onClick={() => handleMenuClick("communication")}
          >
            <img className="nonactive" src={communication} alt="" />
            <img className="imgacctive" src={communication2} alt="" />
            <span className="sidebarmenu">COMMUNICATIONS</span>
          </Link>
        )*/}

          {/*userrole && ['USER'].includes(userrole.toUpperCase()) && (
          <Link
            className={`menulist ${activeItem === "reports" ? "active" : ""}`}
            onClick={() => handleMenuClick("reports")}
          >
            <img className="nonactive" src={reports} alt="" />
            <img className="imgacctive" src={reports2} alt="" />
            <span className="sidebarmenu">REPORTS</span>
          </Link>
        )*/}

          {/* <Link
          className={`menulist ${activeItem === "search" ? "active" : ""}`}
          onClick={() => handleMenuClick("search")}
        >
          <img className="nonactive" src={search} alt="" />
          <img className="imgacctive" src={search2} alt="" />
          <span className="sidebarmenu">SEARCH</span>
        </Link> */}

          <Link
            to="/practice_details"
            className={`menulist ${
              isActive("/practice_details") ? "active" : ""
            }`}
            onClick={() => handleMenuClick("settings")}
          >
            <img className="nonactive" src={settings} alt="" />
            <img className="imgacctive" src={settings2} alt="" />
            <span className="sidebarmenu">SETTINGS</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
