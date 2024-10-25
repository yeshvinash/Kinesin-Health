import React, { useState, useEffect } from "react";
import srcicon from "../../assets/images/srcicon.svg";
import logo from "../../assets/images/Logo.svg";
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
import { Link, useLocation, useNavigate } from "react-router-dom";
import { createAxiosInstance } from "../../api/axiosConfig";
import { WHO_AM_I, PATIENT_SEARCH_AUTOCOMPLETE_URL } from "../../api/Service";
import { useDispatch, useSelector } from "react-redux";
import "../../components/Header/Header.css";
import { removeuser } from "../../redux/user/userSlice.js";
import { logoutFromHelper } from "../../api/Helper.js";
import { logout } from "../../redux/auth/AuthSlice.js";
import moment from "moment";
import LogOutModal from "../Modal/LogOutModal";
import toast, { Toaster } from "react-hot-toast";
import { Image } from "react-bootstrap";
import {Autocomplete} from "@mui/material";
import TextField from "@mui/material/TextField";
import {
  addPatientFullName,
  addPatientId,
  clearPatient,
  clearPatientFullName,
  clearPatientId,
} from "../../../src/redux/patient/PatientSlice";

function Header() {
  const [isDesktop, setIsDesktop] = useState(true);
  const [active, setActive] = useState("nav__menu");
  const [icon, setIcon] = useState("nav__toggler");
  const [selectedUser, setSelectedUser] = useState({});
  const [fullName, setFullName] = useState("");
  const [options, setOptions] = useState([]);
  const [patientId, setPatientId] = useState(null);
  // For navbar toogle in responsive view//
  const [selectState, setSelectState] = useState(false);
  const [activeItem, setActiveItem] = useState("");
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  let tenantVal = useSelector((state) => state.auth.user?.tenant);
  if (!tenantVal) {
    tenantVal = localStorage.getItem("kinesin-tenant");
  }
  console.log(options);
  let nameState = useSelector((state) => state.auth.user?.name);
  if (!nameState) {
    nameState = localStorage.getItem("kinesin-name");
  }
  const splittedNameState = nameState ? nameState.split(" ") : "";
  const handleMenuClick = (itemName) => {
    setActiveItem(itemName); // Update the active state when a menu item is clicked
  };

  // For navbar toogle in responsive view//

  const userState = useSelector((state) => state.user);
  const [globalSearchText, setGlobalSearchText] = useState("");
  const navToggle = () => {
    const body = document.querySelector("html");
    setSelectState(!selectState);
    body.classList.toggle("show-menu");
  };
  const getData = async (searchTerm) => {
    try {
      if (!searchTerm) setOptions([]);

      const axiosInstance = createAxiosInstance();
      const response = await axiosInstance.get(
        `${tenantVal}${PATIENT_SEARCH_AUTOCOMPLETE_URL}/${searchTerm}`
      );

      if (response && response.data && response.data.length > 0) {
        const updatedOptions = response.data.map((p) => {
          return {
            id: p.id,
            title:
              p.firstName +
              (p.surname ? " " + p.surname : "") +
              (p.dateOfBirth
                ? " (" + moment(p.dateOfBirth).format("DD-MM-YYYY") + ")"
                : ""),
          };
        });
        setOptions(updatedOptions);
      } else setOptions([]);
    } catch (error) {
      console.log(error);
    }
  };
  const onInputChange = (event, value, reason) => {
    if (value && value.length > 0) {
      getData(value);
    } else {
      setTimeout(() => {
        setOptions([]);
      }, 0);
    }
  };
  const goToPatientDetails = async (id, patientFullName) => {
    if (!id)
      return;
    dispatch(addPatientId(id));
    localStorage.setItem("kinesin-patientId", id);
    dispatch(addPatientFullName(patientFullName));
    const isPatientDetailPage = window.location.pathname === "/patient-detail";
    console.log(id);
    console.log(" same page : ", isPatientDetailPage);
   
    if (!isPatientDetailPage) {
      navigate("/patient-detail", { state: { samePage: false } });
      setTimeout(() => {
        setFullName("");
      }, 1200);
    } else {
      navigate("/patient-detail", { state: { samePage: true } });
      setTimeout(() => {
        setFullName("");
      }, 500);
    }
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
      setIsPageLoaded(true);
    } catch (error) {
      console.log(error);
      errorHandling(error);
    }
  };
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  useEffect(() => {
    fetchProfileInfo();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 992);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


  const navigate = useNavigate();
  const dispatch = useDispatch();

  const enterKeyGlobalSearch = (e) => {
    if (e.key === "Enter") {
      var isInPatientTab = false;
      if (window.location.href) {
        var c = window.location.href.split("/");
        if (c) {
          isInPatientTab = c[c.length - 1] == "patient";
        }
      }

      console.log(
        "do validate : " +
        globalSearchText +
        " , " +
        c[c.length - 1] +
        " , " +
        (isInPatientTab ? "yes" : "no")
      );
      console.log(globalSearchText);
      if (!isInPatientTab) {
        navigate("/patient", { state: { searchQuery: globalSearchText } });
      } else {
        navigate("/patient", { state: { searchQuery: globalSearchText } });
      }
      setGlobalSearchText("");
    }
  };
  const errorHandling = (error) => {
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
    <>
      {" "}
      {isDesktop ? (
        <header>
          <div className="search_bar search-wrapper">
             <Autocomplete
              disablePortal
              id="combo-box-demo"
              value={fullName || null}
              options={options}
              getOptionLabel={(option) =>
                option && option.title ? option.title : fullName
              }
              onInputChange={onInputChange}
              onChange={(event, newValue) => {
                setFullName(newValue ? newValue.title : "");
                setPatientId(newValue ? newValue.id : "");
                goToPatientDetails(newValue ? newValue.id : "");
              }}
              renderInput={(params) => (
                <TextField {...params} label="" placeholder="Search here..." />
              )}
              className="material-input"
            />
            <img src={srcicon} alt="search-icon" />
          </div>

          <div className="header-links-wrap d-flex align-items-center">
            <Link
              to="/appointments"
              className={` ${isActive("/appointments") ? "active" : ""}`}
              onClick={() => handleMenuClick("appointments")}
            >
              <span className="navicon">
                <img src={navi1} alt="" />
              </span>
              Appointments
            </Link>
            <Link to="/allied_task">
              <span className="navicon">
                <img src={navi1} alt="" />
              </span>
              Tasks
            </Link>
            <Link to={(e) => e.preventDefault()}>
              <span className="navicon">
                <img src={navi4} alt="" />
              </span>
              Payments
            </Link>
            <div
              className="hedconttoggel"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >

              {
                isPageLoaded &&
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
                        cursor: "pointer",
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
                        cursor: "pointer",
                      }}
                    >
                      {splittedNameState &&
                        splittedNameState[0] &&
                        splittedNameState[0][0]
                        ? splittedNameState[0][0]
                        : ""}
                      {splittedNameState &&
                        splittedNameState[0] &&
                        splittedNameState[0][0]
                        ? splittedNameState[1][0]
                        : ""}
                    </span>
                  )}
                </div>
              }


              <div className="dropdown">

                <button
                  className="dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton1"
                >
                  {nameState}
                </button>

                <ul
                  className="dropdown-menu profiledropdown"
                  aria-labelledby="dropdownMenuButton1"
                >
                  <li className="profilelink bdrbttom">
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
                    <Link className="profilelink" to="/profile"
                      onClick={() => navigate("/profile")
                      }
                    >
                      <div className="dropicon">
                        <img src={dropi1} alt="" />
                      </div>
                      <div className="profilelinkdetails">
                        <h6>Profile</h6>
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link className="profilelink" to="/timeoff"
                      onClick={() => navigate("/timeoff")
                      }
                    >
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
        </header>
      ) : (
        <header>
          <div className="d-flex align-items-center flex-shrink-0">
            <div onClick={navToggle} className={icon}>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
            </div>
            <Link to="/" className="header-logo">
              <Image src={logo} alt="header-logo" />
            </Link>
          </div>
          <div className="navflex">
            <div className={active}>
              <ul className="diflexmenu">
                <li className="nav__item">
                  <Link
                    to="/appointments"
                    className={`menulist ${isActive("/appointments") ? "active" : ""
                      }`}
                    onClick={() => navToggle("appointments")}
                  >
                    <span className="navicon sidebarImg">
                      <img src={navi1} alt="" />
                    </span>
                    Appointments
                  </Link>
                </li>
                <li className="nav__item">
                  <Link
                    to="/allied_task"
                    className="nav__link"
                    onClick={() => navToggle("")}
                  >
                    <span className="navicon sidebarImg">
                      <img src={navi1} alt="" />
                    </span>
                    Tasks
                  </Link>
                </li>
                <li className="nav__item">
                  <Link to={(e) => e.preventDefault()} className="nav__link">
                    <span className="navicon sidebarImg">
                      <img src={navi4} alt="" />
                    </span>
                    Payments
                  </Link>
                </li>
                <li className="nav__item itemphon">
                  <Link
                    to="/allied_home"
                    className={`nav__link ${isActive("/allied_home") ? "active" : ""
                      }`}
                    onClick={() => navToggle("home")}
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
                    className={`nav__link ${isActive("/patient") ? "active" : ""
                      }`}
                    onClick={() => navToggle("patient")}
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
                    className={`nav__link ${activeItem === "orders" ? "active" : ""
                      }`}
                    onClick={() => navToggle("orders")}
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
                    className={`nav__link ${isActive("/allied_documents") ? "active" : ""
                      }`}
                    onClick={() => navToggle("documents")}
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
                    className={`nav__link ${activeItem === "vaccine" ? "active" : ""
                      }`}
                    onClick={() => navToggle("vaccine")}
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
                    className={`nav__link ${activeItem === "opportunities" ? "active" : ""
                      }`}
                    onClick={() => navToggle("opportunities")}
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
                    className={`nav__link ${isActive("/allied_sms") ? "active" : ""
                      }`}
                    onClick={() => navToggle("communication")}
                  >
                    <span className="navicon">
                      <img className="nonactive" src={communication} alt="" />
                      <img className="imgacctive" src={communication2} alt="" />
                    </span>
                    COMMUNICATIONS
                  </Link>
                </li>
                <li className="nav__item itemphon">
                  <Link
                    className={`nav__link ${activeItem === "reports" ? "active" : ""
                      }`}
                    onClick={() => navToggle("reports")}
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
                    className={`nav__link ${activeItem === "search" ? "active" : ""
                      }`}
                    onClick={() => navToggle("search")}
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
                    className={`nav__link ${isActive("/settings") ? "active" : ""
                      }`}
                    onClick={() => navToggle("settings")}
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
          </div>
          <div className="d-flex align-items-center">
            <div
              className={`search_bar search-wrapper`}
            >
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                value={fullName || null}
                options={options}
                getOptionLabel={(option) =>
                  option && option.title ? option.title : fullName
                }
                onInputChange={onInputChange}
                onChange={(event, newValue) => {
                  setFullName(newValue ? newValue.title : "");
                  setPatientId(newValue ? newValue.id : "");
                  goToPatientDetails(newValue ? newValue.id : "");
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label=""
                    placeholder="Search here..."
                  />
                )}
              />
              <Image src={srcicon} alt="search-icon" />
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
                          <h6>{nameState}</h6>
                          <p>{userState.email}</p>
                        </>
                      )}
                    </div>
                  </li>
                  <li>
                    <Link className="profilelink" to="/profile"
                      onClick={() => navigate("/profile")
                      }
                    >
                      <div className="dropicon">
                        <img src={dropi1} alt="" />
                      </div>
                      <div className="profilelinkdetails">
                        <h6>Profile</h6>
                      </div>
                    </Link>
                  </li>
                  <li>
                    <Link className="profilelink" to="/timeoff"
                      onClick={() => navigate("/timeoff")
                      }
                    >
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
        </header>
      )}
      <LogOutModal />
    </>
  );
}

export default Header;
