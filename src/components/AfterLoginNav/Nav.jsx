import React, { useState, useEffect } from "react";
import logo from "../../assets/images/Logo.svg";
import srcicon from "../../assets/images/srcicon.svg";
import logicon from "../../assets/images/logicon.svg";
import navi1 from "../../assets/images/navi1.svg";
import navi3 from "../../assets/images/navi3.svg";
import navi4 from "../../assets/images/navi4.svg";
import Sidebar from "../Sidebar/Sidebar";
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
import dropi1 from "../../assets/images/dropi1.svg";
import dropi2 from "../../assets/images/dropi2.svg";
import dropi3 from "../../assets/images/dropi3.svg";
import "./nav.css";
import { Toaster, toast } from "react-hot-toast";
import { Link, useLocation } from "react-router-dom";
import { createAxiosInstance } from "../../api/axiosConfig";
import { useDispatch } from "react-redux";
import { WHO_AM_I } from "../../api/Service";
import { useSelector } from "react-redux";
import LogOutModal from "../Modal/LogOutModal";
import { logoutFromHelper } from "../../api/Helper";
import { logout } from "../../redux/auth/AuthSlice";
import { removeuser } from "../../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import { inflate } from "pako";
function Header() {
  const [active, setActive] = useState("nav__menu");
  const [icon, setIcon] = useState("nav__toggler");
  const [selectedUser, setSelectedUser] = useState({});
  // For navbar toogle in responsive view//
  const [activeItem, setActiveItem] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.user);
  let nameState = useSelector((state) => state.auth.user?.name);
  if(!nameState){
    nameState = localStorage.getItem('kinesin-name')
  }
  const splittedNameState = nameState ? nameState.split(" ") : "";
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

  const fetchProfileInfo = async () => {
    try {
      const axiosInstance = createAxiosInstance(true);
      const response = await axiosInstance.get(`${WHO_AM_I}`);
      if (response && response.data) {
        if (response.data) {
          setSelectedUser(response.data.staffMember);
        }
      }
    } catch (error) {
      errorHandling(error)
    }
  };

  useEffect(() => {
    fetchProfileInfo();
  }, []);
  const errorHandling = (error) => {
    console.log(error);
    toast.error(error.message);
    if (error && error.response && error.response.status) {
      if (error.response.status == 403) {
        logoutFromHelper();
        dispatch(logout());
        dispatch(removeuser());
        navigate("/logout");
      }
    }
  };

  return (
    <div className="containeralart">
      <nav className="nav dashBnav">
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
                      to="/appointments"
                      className={`menulist ${
                        isActive("/appointments") ? "active" : ""
                      }`}
                      onClick={() => handleMenuClick("appointments")}
                    >
                      <span className="navicon">
                        <img src={navi1} alt="" />
                      </span>
                      Appointments : {test}
                    </Link>
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
                        <img className="nonactive" src={communication} alt="" />
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
                {/* <Sidebar /> */}
              </div>
              <div className="hedconttoggel">
                <div className="logiconbox">
                  {selectedUser?.profilePic ? (
                    <img
                      src={selectedUser?.profilePic}
                      alt=""
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: "100%",
                      }}
                    />
                  ) : (
                    <span
                      className="user-profile-image"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: "100%",
                      }}
                    >
                      {splittedNameState ? splittedNameState[0][0] : ""}
                      {splittedNameState ? splittedNameState[1][0] : ""}
                    </span>
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
                            <h6>
                              {nameState}
                            </h6>
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
              </div>
            </div>
            <div onClick={navToggle} className={icon}>
              <div className="line1"></div>
              <div className="line2"></div>
              <div className="line3"></div>
            </div>
          </div>
              <li key={result.id}>Render search result item</li>
        </div>
        <Toaster position="top-center" reverseOrder={false} />

        <LogOutModal />
      </nav>
    </div>
  );
}

export default Header;
