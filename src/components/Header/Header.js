import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import srcicon from "../../assets/images/icons/srcicon.svg";
import home from "../../assets/images/icons/home.svg";
import home2 from "../../assets/images/icons/home2.svg";
import search2 from "../../assets/images/icons/search2.svg";
import LogOut from "../../assets/images/icons/logout1.svg";
import Logout from "../../assets/images/cover/logout-new.png";
import Profile from "../../assets/images/icons/profile.svg";
import Avatar1 from "../../assets/images/icons/avatar1.jpg";
import Logo from "../../assets/images/icons/Logo.svg";
import {  Dropdown } from "antd";
import { SVGIcons } from "../Data/SVGIcons";
import { Image, Modal, Button } from "react-bootstrap";
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

  const navToggle = () => {
    const body = document.querySelector("html");
    setUserState(!userState);
    body.classList.toggle("show-menu");
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
            <Link
              to="/book-appointment"
              className="custom_btn d-none d-lg-block"
            >
              Book an Appointment
            </Link>
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
                      isActive("/appointments") ? "active" : ""
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
                      isActive("/messages") ? "active" : ""
                    }`}
                    onClick={() => navToggle()}
                  >
                    <span className="menulist-icon-wrap">
                      <img className="nonactive" src={messages} alt="" />
                      <img className="imgacctive" src={messages1} alt="" />
                    </span>
                    <span> Messages</span>
                  </Link>
                </li>
                <li className="nav__item itemphon">
                  <Link
                    to="/home"
                    className={`menulist ${
                      isActive("/repeat_prescriptions") ? "active" : ""
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
                    <span>Repeat Prescriptions</span>
                  </Link>
                </li>
                <li className="nav__item itemphon">
                  <Link
                    to="/home"
                    className={`menulist ${
                      isActive("/health-record") ? "active" : ""
                    }`}
                    onClick={() => navToggle()}
                  >
                    <span className="menulist-icon-wrap">
                      <img className="nonactive" src={HealthRecord} alt="" />
                      <img className="imgacctive" src={HealthRecord1} alt="" />
                    </span>
                    <span>Health Record</span>
                  </Link>
                </li>
                <li className="nav__item itemphon">
                  <Link
                    to="/home"
                    className={`menulist ${
                      isActive("/lab-results") ? "active" : ""
                    }`}
                    onClick={() => navToggle()}
                  >
                    <span className="menulist-icon-wrap">
                      <img className="nonactive" src={LabResults} alt="" />
                      <img className="imgacctive" src={LabResults1} alt="" />
                    </span>
                    <span>Lab results/ trends</span>
                  </Link>
                </li>
                <li className="nav__item itemphon">
                  <Link
                    to="/home"
                    className={`menulist ${
                      isActive("/profile") ? "active" : ""
                    }`}
                    onClick={() => navToggle()}
                  >
                    <span className="menulist-icon-wrap">
                      <img className="nonactive" src={MyProfile} alt="" />
                      <img className="imgacctive" src={MyProfile1} alt="" />
                    </span>
                    <span>My profile</span>
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
