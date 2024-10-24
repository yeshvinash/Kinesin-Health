import React, { useEffect, useState } from "react";
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
import LogOut from "../../assets/images/icons/logout1.svg";
import Logout from "../../assets/images/icons/logout-green.svg";
import Profile from "../../assets/images/icons/profile.svg";
import Avatar1 from "../../assets/images/icons/avatar1.jpg";
import Logo from "../../assets/images/icons/Logo.svg";
import { DownOutlined, SmileOutlined } from "@ant-design/icons";
import { Avatar, Dropdown, Space } from "antd";
import { SVGIcons } from "../Data/SVGIcons";
import { Image, Modal, Button, DropdownButton } from "react-bootstrap";
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
import Payments from "../../assets/images/icons/Payments.svg";
import Patients from "../../assets/images/icons/Patients.svg";
import Instant from "../../assets/images/icons/Instant.svg";
import Tasks from "../../assets/images/icons/Tasks.svg";
import Results_h from "../../assets/images/icons/Results-h.svg";
import "./Header.css";

export const Header = () => {
  const [userState, setUserState] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [active, setActive] = useState("nav__menu");
  const [icon, setIcon] = useState("nav__toggler");
  // For navbar toogle in responsive view//
  const [activeItem, setActiveItem] = useState("");
  const [isDesktop, setIsDesktop] = useState(true);

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

  //   const nameState = useSelector((state) => state.auth.user?.name);
  const handleMenuClick = (itemName) => {
    setActiveItem(itemName); // Update the active state when a menu item is clicked
  };

  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  // For navbar toogle in responsive view//

  const items = [
    {
      key: "1",
      label: <a href="javascript:void(0)">Profile</a>,
      icon: (
        <>
          <Image src={Profile} />
        </>
      ),
    },
    {
      key: "2",
      label: <Link onClick={handleShow}>Logout</Link>,
      icon: (
        <>
          <Image src={LogOut} />
        </>
      ),
    },
  ];

  // const navToggle = () => {
  //   if (active === "nav__menu") {
  //     setActive("nav__menu nav__active");
  //   } else setActive("nav__menu");

  //   // Icon Toggler
  //   if (icon === "nav__toggler") {
  //     setIcon("nav__toggler toggle");
  //   } else setIcon("nav__toggler");
  // };

  const navToggle = () => {
    const body = document.querySelector("html");
    body.classList.toggle("show-menu");
    setUserState(!userState);
  };

  return (
    <>
      {isDesktop ? (
        <header>
          <div className="search_bar">
            <input
              type="search"
              className="form-control"
              placeholder="Search here..."
            />
            <img src={srcicon} alt="" />
          </div>
          <div className="header-links-wrap d-flex align-items-center">
            <Link to="#" className="header-link header-link-inage">
              <Image src={Tasks} />
              Appointments
            </Link>
            <Link to="#" className="header-link1 header-link-inage">
              <Image src={Patients} />
              Patients
            </Link>
            <Link to="#" className="header-link2 header-link-inage">
              <Image src={Tasks} />
              Tasks
            </Link>
            <Link to="#" className="header-link3 header-link-inage">
              <Image src={Payments} />
              Payments
            </Link>
            {
              <Link
                to="/book-appointment"
                className="custom_btn d-none d-lg-block"
              >
                Book an Appointment
              </Link>
            }
            <Dropdown
              menu={{
                items,
              }}
              trigger={["click"]}
              className="custom-dropdown"
            >
              <a onClick={(e) => e.preventDefault()}>
                <Image src={Avatar1} className="avatar-img" />
                <span>James Targaryen</span>
                {SVGIcons.DownArrow}
              </a>
            </Dropdown>
          </div>
        </header>
      ) : (
        <header>
          <div className="d-flex align-items-center">
            <div onClick={navToggle} className={icon}>
              <div className="line"></div>
              <div className="line"></div>
              <div className="line"></div>
            </div>
            <Link to="/" className="header-logo">
              <Image src={Logo} alt="header-logo" />
            </Link>
          </div>
          <div className="navflex">
            <div className={active}>
              <ul className="diflexmenu">
                <li className="nav__item itemphon">
                  <Link
                    to="/home"
                    className={`menulist ${isActive("/home") ? "active" : ""}`}
                    onClick={() => navToggle()}
                  >
                    <span className="menulist-icon-wrap">
                      <img src={home} className="imgacctive" alt="" />
                      <img src={home2} className="nonactive" alt="" />
                    </span>
                    <span>Home</span>
                  </Link>
                </li>
                <li className="nav__item itemphon">
                  <Link
                    to="/home"
                    className={`menulist ${
                      isActive("/") ? "active" : ""
                    }`}
                    onClick={() => navToggle()}
                  >
                    <span className="menulist-icon-wrap">
                      <img className="nonactive" src={appointments} alt="" />
                      <img className="imgacctive" src={appointments1} alt="" />
                    </span>
                    <span>Appointments</span>
                  </Link>
                </li>
                <li className="nav__item itemphon">
                  <Link
                    to="/home"
                    className={`menulist ${
                      isActive("/") ? "active" : ""
                    }`}
                    onClick={() => navToggle()}
                  >
                    <span className="menulist-icon-wrap">
                      <img className="nonactive" src={messages} alt="" />
                      <img className="imgacctive" src={messages1} alt="" />
                    </span>
                    <span> PATIENT/ CONSULTATION</span>
                  </Link>
                </li>
                <li className="nav__item itemphon">
                  <Link
                    to="/document-patient"
                    className={`menulist ${
                      isActive("/document-patient") ? "active" : ""
                    }`}
                    onClick={() => navToggle()}
                  >
                    <span className="menulist-icon-wrap">
                      <img
                        className="nonactive"
                        src={RepeatPrescriptions}
                        alt=""
                      />
                      <img
                        className="imgacctive"
                        src={RepeatPrescriptions1}
                        alt=""
                      />
                    </span>
                    <span>ORDERS</span>
                  </Link>
                </li>
                <li className="nav__item itemphon">
                  <Link
                    to="/documents"
                    className={`menulist ${
                      isActive("/documents") ? "active" : ""
                    }`}
                    onClick={() => navToggle()}
                  >
                    <span className="menulist-icon-wrap">
                      <img className="nonactive" src={HealthRecord} alt="" />
                      <img className="imgacctive" src={HealthRecord1} alt="" />
                    </span>
                    <span>DOCUMENTS</span>
                  </Link>
                </li>
                <li className="nav__item itemphon">
                  <Link
                    to="/home"
                    className={`menulist ${
                      isActive("/") ? "active" : ""
                    }`}
                    onClick={() => navToggle()}
                  >
                    <span className="menulist-icon-wrap">
                      <img className="nonactive" src={LabResults} alt="" />
                      <img className="imgacctive" src={LabResults1} alt="" />
                    </span>
                    <span>OPPORTUNITIES</span>
                  </Link>
                </li>
                <li className="nav__item itemphon">
                  <Link
                    to="/home"
                    className={`menulist ${
                      isActive("/") ? "active" : ""
                    }`}
                    onClick={() => navToggle()}
                  >
                    <span className="menulist-icon-wrap">
                      <img className="nonactive" src={MyProfile} alt="" />
                      <img className="imgacctive" src={MyProfile1} alt="" />
                    </span>
                    <span>COMMUNICATIONS</span>
                  </Link>
                </li>
                <li className="nav__item itemphon">
                  <Link
                    to="/home"
                    className={`menulist ${
                      isActive("/") ? "active" : ""
                    }`}
                    onClick={() => navToggle()}
                  >
                    <span className="menulist-icon-wrap">
                      <img className="nonactive" src={MyProfile} alt="" />
                      <img className="imgacctive" src={MyProfile1} alt="" />
                    </span>
                    <span>REPORTS</span>
                  </Link>
                </li>
                <li className="nav__item itemphon">
                  <Link
                    to="/home"
                    className={`menulist ${
                      isActive("/") ? "active" : ""
                    }`}
                    onClick={() => navToggle()}
                  >
                    <span className="menulist-icon-wrap">
                      <img className="nonactive" src={MyProfile} alt="" />
                      <img className="imgacctive" src={MyProfile1} alt="" />
                    </span>
                    <span>REFERRALS</span>
                  </Link>
                </li>
                <li className="nav__item itemphon">
                  <Link
                    to="/home"
                    className={`menulist ${
                      isActive("/") ? "active" : ""
                    }`}
                    onClick={() => navToggle()}
                  >
                    <span className="menulist-icon-wrap">
                      <img className="nonactive" src={MyProfile} alt="" />
                      <img className="imgacctive" src={MyProfile1} alt="" />
                    </span>
                    <span> VaccINE</span>
                  </Link>
                </li>
                <li className="nav__item itemphon">
                  <Link
                    to="/home"
                    className={`menulist ${
                      isActive("/") ? "active" : ""
                    }`}
                    onClick={() => navToggle()}
                  >
                    <span className="menulist-icon-wrap">
                      <img className="nonactive" src={MyProfile} alt="" />
                      <img className="imgacctive" src={MyProfile1} alt="" />
                    </span>
                    <span>Cycle of care</span>
                  </Link>
                </li>
                <li className="nav__item itemphon">
                  <Link
                    to="/home"
                    className={`menulist ${
                      isActive("/") ? "active" : ""
                    }`}
                    onClick={() => navToggle()}
                  >
                    <span className="menulist-icon-wrap">
                      <img className="nonactive" src={MyProfile} alt="" />
                      <img className="imgacctive" src={MyProfile1} alt="" />
                    </span>
                    <span>SETTINGS</span>
                  </Link>
                </li>
                <li className="nav__item itemphon">
                  <Link
                    to=""
                    className={`menulist ${isActive("") ? "active" : ""}`}
                    onClick={() => navToggle()}
                  >
                    <span className="menulist-icon-wrap">
                      <img className="nonactive" src={MyProfile} alt="" />
                      <img className="imgacctive" src={MyProfile1} alt="" />
                    </span>
                    <span>Patients</span>
                  </Link>
                </li>
                <li className="nav__item itemphon">
                  <Link
                    to=""
                    className={`menulist ${isActive("") ? "active" : ""}`}
                    onClick={() => navToggle()}
                  >
                    <span className="menulist-icon-wrap">
                      <img className="nonactive" src={MyProfile} alt="" />
                      <img className="imgacctive" src={MyProfile1} alt="" />
                    </span>
                    <span>Tasks</span>
                  </Link>
                </li>
                <li className="nav__item itemphon">
                  <Link
                    to=""
                    className={`menulist ${isActive("") ? "active" : ""}`}
                    onClick={() => navToggle()}
                  >
                    <span className="menulist-icon-wrap">
                      <img className="nonactive" src={MyProfile} alt="" />
                      <img className="imgacctive" src={MyProfile1} alt="" />
                    </span>
                    <span>Payments</span>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="d-flex align-items-center">
              <div className="search_bar">
                <input
                  type="search"
                  className="form-control"
                  placeholder="Search here..."
                />
                <Image src={search2} />
              </div>
              <Dropdown
                menu={{
                  items,
                }}
                trigger={["click"]}
                className="custom-dropdown"
              >
                <a onClick={(e) => e.preventDefault()}>
                  <div className="profile-shortname text-center">
                    <span className="mb-0 h2 text-black fw-600">JT</span>
                  </div>
                </a>
              </Dropdown>
            </div>
          </div>
        </header>
      )}

      <Modal
        show={show}
        onHide={handleClose}
        centered
        className="logoutmodal_box"
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div className="modal-body-content-wrap">
            <div className="worningimg">
              <Image src={Logout} alt="" />
            </div>
            <div className="deletext">
              <h1 className="h1 fw-600 text-stratos mb-0">
                Are you sure you want to logout?
              </h1>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="dashboard-btn-wrap">
          <Button className="custom_btn gray_btn" onClick={handleClose}>
            Cancel
          </Button>
          <Button className="custom_btn " onClick={handleClose}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
