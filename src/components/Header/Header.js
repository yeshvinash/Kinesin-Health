import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/images/icons/Logo.svg";
import srcicon from "../../assets/images/icons/srcicon.svg";
import logicon from "../../assets/images/icons/logicon.svg";
import navi1 from "../../assets/images/icons/navi1.svg";
import navi3 from "../../assets/images/icons/navi3.svg";
import navi4 from "../../assets/images/icons/navi4.svg";
import Sidebar from "../Sidebar/Sidebar";
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
import dropi1 from "../../assets/images/icons/dropi1.svg";
import dropi2 from "../../assets/images/icons/dropi2.svg";
import dropi3 from "../../assets/images/icons/dropi3.svg";
import "./Header.css";

export const Header = () => {
  const [active, setActive] = useState("nav__menu");
  const [icon, setIcon] = useState("nav__toggler");
  // For navbar toogle in responsive view//
  const [activeItem, setActiveItem] = useState("");

  //   const nameState = useSelector((state) => state.auth.user?.name);
  const handleMenuClick = (itemName) => {
    setActiveItem(itemName); // Update the active state when a menu item is clicked
  };

  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  // For navbar toogle in responsive view//

  const navToggle = () => {
    if (active === "nav__menu") {
      setActive("nav__menu nav__active");
    } else setActive("nav__menu");

    // Icon Toggler
    if (icon === "nav__toggler") {
      setIcon("nav__toggler toggle");
    } else setIcon("nav__toggler");
  };
  return (
    <>
      <div className="containeralart">
        <nav className="nav dashBnav">
            <Link className="navbar-brand" to="/">
              <img src={logo} alt="" />
            </Link>
          <div className="navebg">
            <div className="headarstyle">
              <div className="search_bar">
                <input
                  type="search"
                  className="form-control"
                  placeholder="Search here..."
                />
                <img src={srcicon} alt="" />
              </div>
              <div className="navflex">
                <div className={active}>
                  <ul className="diflexmenu">
                    <li className="nav__item">
                      <Link
                        to="/appointment"
                        className={`menulist ${
                          isActive("/appointment") ? "active" : ""
                        }`}
                        onClick={() => handleMenuClick("appointment")}
                      >
                        <span className="navicon">
                          <img src={navi1} alt="" />
                        </span>
                        Appointments
                      </Link>
                    </li>
                    {/* <li className="nav__item">
                    <a href={(e) => e.preventDefault()} className="nav__link">
                      <span className="navicon">
                        <img src={navi1} alt="" />
                      </span>
                      Appointments
                    </a>
                  </li> */}
                    <li className="nav__item">
                      <a href={(e) => e.preventDefault()} className="nav__link">
                        <span className="navicon">
                          <img src={navi3} alt="" />
                        </span>
                        Patients
                      </a>
                    </li>
                    <li className="nav__item">
                      <Link to="/allied_task" className="nav__link">
                        <span className="navicon">
                          <img src={navi1} alt="" />
                        </span>
                        Tasks
                      </Link>
                    </li>
                    <li className="nav__item">
                      <a href={(e) => e.preventDefault()} className="nav__link">
                        <span className="navicon">
                          <img src={navi4} alt="" />
                        </span>
                        Payments
                      </a>
                    </li>
                    <li className="nav__item itemphon">
                      <Link
                        to="/allied_home"
                        className={`nav__link ${
                          isActive("/allied_home") ? "active" : ""
                        }`}
                        onClick={() => handleMenuClick("home")}
                      >
                        <span className="navicon">
                          <img src={home} className="imgacctive" alt="" />
                          <img src={home2} className="nonactive" alt="" />
                        </span>
                        Home
                      </Link>
                    </li>
                    <li className="nav__item itemphon">
                      <Link
                        to="/patient"
                        className={`nav__link ${
                          isActive("/patient") ? "active" : ""
                        }`}
                        onClick={() => handleMenuClick("patient")}
                      >
                        <span className="navicon">
                          <img className="nonactive" src={patient} alt="" />
                          <img className="imgacctive" src={patient2} alt="" />
                        </span>
                        PATIENT/ CONSULTATION
                      </Link>
                    </li>
                    <li className="nav__item itemphon">
                      <Link
                        className={`nav__link ${
                          activeItem === "orders" ? "active" : ""
                        }`}
                        onClick={() => handleMenuClick("orders")}
                      >
                        <span className="navicon">
                          <img className="nonactive" src={result} alt="" />
                          <img className="imgacctive" src={result2} alt="" />
                        </span>
                        ORDERS
                      </Link>
                    </li>
                    <li className="nav__item itemphon">
                      <Link
                        to="/allied_documents"
                        className={`nav__link ${
                          isActive("/allied_documents") ? "active" : ""
                        }`}
                        onClick={() => handleMenuClick("documents")}
                      >
                        <span className="navicon">
                          <img className="nonactive" src={documents} alt="" />
                          <img className="imgacctive" src={documents2} alt="" />
                        </span>
                        DOCUMENTS
                      </Link>
                    </li>
                    <li className="nav__item itemphon">
                      <Link
                        className={`nav__link ${
                          activeItem === "vaccine" ? "active" : ""
                        }`}
                        onClick={() => handleMenuClick("vaccine")}
                      >
                        <span className="navicon">
                          <img className="nonactive" src={vaccine} alt="" />
                          <img className="imgacctive" src={vaccine2} alt="" />
                        </span>
                        VACCINE
                      </Link>
                    </li>
                    <li className="nav__item itemphon">
                      <Link
                        className={`nav__link ${
                          activeItem === "opportunities" ? "active" : ""
                        }`}
                        onClick={() => handleMenuClick("opportunities")}
                      >
                        <span className="navicon">
                          <img className="nonactive" src={oppor} alt="" />
                          <img className="imgacctive" src={oppor2} alt="" />
                        </span>
                        OPPORTUNITIES
                      </Link>
                    </li>
                    <li className="nav__item itemphon">
                      <Link
                        to="/allied_sms"
                        className={`nav__link ${
                          isActive("/allied_sms") ? "active" : ""
                        }`}
                        onClick={() => handleMenuClick("communication")}
                      >
                        <span className="navicon">
                          <img
                            className="nonactive"
                            src={communication}
                            alt=""
                          />
                          <img
                            className="imgacctive"
                            src={communication2}
                            alt=""
                          />
                        </span>
                        COMMUNICATIONS
                      </Link>
                    </li>
                    <li className="nav__item itemphon">
                      <Link
                        className={`nav__link ${
                          activeItem === "reports" ? "active" : ""
                        }`}
                        onClick={() => handleMenuClick("reports")}
                      >
                        <span className="navicon">
                          <img className="nonactive" src={reports} alt="" />
                          <img className="imgacctive" src={reports2} alt="" />
                        </span>
                        REPORTS
                      </Link>
                    </li>
                    <li className="nav__item itemphon">
                      <Link
                        className={`nav__link ${
                          activeItem === "search" ? "active" : ""
                        }`}
                        onClick={() => handleMenuClick("search")}
                      >
                        <span className="navicon">
                          <img className="nonactive" src={search} alt="" />
                          <img className="imgacctive" src={search2} alt="" />
                        </span>
                        SEARCH
                      </Link>
                    </li>
                    <li className="nav__item itemphon">
                      <Link
                        to="/settings"
                        className={`nav__link ${
                          isActive("/settings") ? "active" : ""
                        }`}
                        onClick={() => handleMenuClick("settings")}
                      >
                        <span className="navicon">
                          <img className="nonactive" src={settings} alt="" />
                          <img className="imgacctive" src={settings2} alt="" />
                        </span>
                        SETTINGS
                      </Link>
                    </li>
                  </ul>
                  <Sidebar />
                </div>

                {/* <div className="hedconttoggel">
                  <div className="logiconbox">
                    {userState.base64Image ? (
                      <img
                        src={userState.base64Image}
                        alt=""
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          borderRadius: "100%",
                        }}
                      />
                    ) : (
                      <img src={logicon} alt="" />
                    )}
                  </div>
                  <div className="dropdown">
                    <button
                      className="dropdown-toggle"
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {nameState}
                    </button>

                    <ul
                      className="dropdown-menu profiledropdown"
                      aria-labelledby="dropdownMenuButton1"
                    >
                      <li className="profilelink bdrbttom">
                        <div className="profilelinkimg">
                          {userState.base64Image && (
                            <img src={userState.base64Image} alt="" />
                          )}
                        </div>
                        <div className="profilelinkdetails">
                          {userState && (
                            <>
                              <h6>{nameState}</h6>
                              <p>{userState.email}</p>
                            </>
                          )}
                        </div>
                      </li>
                      <li>
                        <Link className="profilelink" to="/profile">
                          <div className="dropicon">
                            <img src={dropi1} alt="" />
                          </div>
                          <div className="profilelinkdetails">
                            <h6>Profile</h6>
                          </div>
                        </Link>
                      </li>
                      <li>
                        <Link className="profilelink" to="/timeoff">
                          <div className="dropicon">
                            <img src={dropi2} alt="" />
                          </div>
                          <div className="profilelinkdetails">
                            <h6>Time off</h6>
                          </div>
                        </Link>
                      </li>
                      <li>
                        <button
                          type="button"
                          className="deletebtn profilelink"
                          data-bs-toggle="modal"
                          data-bs-target="#logoutModal"
                        >
                          <div className="dropicon">
                            <img src={dropi3} alt="" />
                          </div>
                          <div className="profilelinkdetails">
                            <h6>Logout</h6>
                          </div>
                        </button>
                      </li>
                    </ul>
                  </div>
                </div> */}
              </div>
              <div onClick={navToggle} className={icon}>
                <div className="line1"></div>
                <div className="line2"></div>
                <div className="line3"></div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
};
