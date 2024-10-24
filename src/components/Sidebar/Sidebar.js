import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import home from "../../assets/images/icons/home.svg";
import patient from "../../assets/images/icons/patient.svg";
import result from "../../assets/images/icons/results.svg";
import documents from "../../assets/images/icons/documents.svg";
import vaccine from "../../assets/images/icons/vacinnations.svg";
import oppor from "../../assets/images/icons/opportunities.svg";
import communication from "../../assets/images/icons/communication.svg";
import reports from "../../assets/images/icons/reports.svg";
import search from "../../assets/images/icons/search.svg";
import settings from "../../assets/images/icons/settings.svg";
import home2 from "../../assets/images/icons/home2.svg";
import patient2 from "../../assets/images/icons/patient2.svg";
import result2 from "../../assets/images/icons/results2.svg";
import documents2 from "../../assets/images/icons/documents2.svg";
import vaccine2 from "../../assets/images/icons/vacinnations2.svg";
import oppor2 from "../../assets/images/icons/opportunities2.svg";
import communication2 from "../../assets/images/icons/communication2.svg";
import reports2 from "../../assets/images/icons/reports2.svg";
import search2 from "../../assets/images/icons/search2.svg";
import settings2 from "../../assets/images/icons/settings2.svg";
import logo from "../../assets/images/icons/Logo.svg";

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
      <div className="sidebarbg">
          {/* <Link className="navbar-brand" to="/">
            <img src={logo} alt="" />
          </Link> */}
        <div className="sidebarbox">
          <Link
            to="/allied_home"
            className={`menulist ${isActive("/allied_home") ? "active" : ""}`}
            onClick={() => handleMenuClick("home")}
          >
            <img src={home} className="imgacctive" alt="" />
            <img src={home2} className="nonactive" alt="" />
            <span className="sidebarmenu">HOMEPAGE</span>
          </Link>
          <Link
            to="/patient"
            className={`menulist ${isActive("/patient") ? "active" : ""}`}
            onClick={() => handleMenuClick("patient")}
          >
            <img className="nonactive" src={patient} alt="" />
            <img className="imgacctive" src={patient2} alt="" />
            <span className="sidebarmenu">PATIENT/ CONSULTATION</span>
          </Link>
          <Link
            className={`menulist ${activeItem === "orders" ? "active" : ""}`}
            onClick={() => handleMenuClick("orders")}
          >
            <img className="nonactive" src={result} alt="" />
            <img className="imgacctive" src={result2} alt="" />
            <span className="sidebarmenu">ORDERS</span>
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
            <span className="sidebarmenu">DOCUMENTS</span>
          </Link>
          <Link
            className={`menulist ${activeItem === "vaccine" ? "active" : ""}`}
            onClick={() => handleMenuClick("vaccine")}
          >
            <img className="nonactive" src={vaccine} alt="" />
            <img className="imgacctive" src={vaccine2} alt="" />
            <span className="sidebarmenu"> VACCINE</span>
          </Link>
          <Link
            className={`menulist ${
              activeItem === "opportunities" ? "active" : ""
            }`}
            onClick={() => handleMenuClick("opportunities")}
          >
            <img className="nonactive" src={oppor} alt="" />
            <img className="imgacctive" src={oppor2} alt="" />
            <span className="sidebarmenu">OPPORTUNITIES</span>
          </Link>
          <Link
            to="/allied_sms"
            className={`menulist ${isActive("/allied_sms") ? "active" : ""}`}
            onClick={() => handleMenuClick("communication")}
          >
            <img className="nonactive" src={communication} alt="" />
            <img className="imgacctive" src={communication2} alt="" />
            <span className="sidebarmenu">COMMUNICATIONS</span>
          </Link>
          <Link
            className={`menulist ${activeItem === "reports" ? "active" : ""}`}
            onClick={() => handleMenuClick("reports")}
          >
            <img className="nonactive" src={reports} alt="" />
            <img className="imgacctive" src={reports2} alt="" />
            <span className="sidebarmenu">REPORTS</span>
          </Link>
          <Link
            className={`menulist ${activeItem === "search" ? "active" : ""}`}
            onClick={() => handleMenuClick("search")}
          >
            <img className="nonactive" src={search} alt="" />
            <img className="imgacctive" src={search2} alt="" />
            <span className="sidebarmenu">SEARCH</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
