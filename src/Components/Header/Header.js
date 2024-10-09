import React, { useEffect, useState, useRef } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import Image from "react-bootstrap/Image";
import Logo from "../../assets/images/logo/header-logo.svg";
import { CustomButton } from "../CustomButton/CustomButton";
import "./Header.css";
import clsx from "clsx";

const Header = () => {
  const ref = useRef(null);
  const [userState, setUserState] = useState(false);
  const [path, setPath] = useState();
  const [headerHeight, setHeaderHeight] = useState(null);
  const [headerScroll, setHeaderScroll] = useState(false);
  const [isScrollled, setIsScrollled] = useState(false);
  const [isTransparent, setIsTransparent] = useState(false);
  const { pathname } = useLocation();

  let urlPath = useLocation();

  useEffect(() => {
    const paths = ["/"];
    paths.includes(pathname) ? setIsTransparent(true) : setIsTransparent(false);
  }, [pathname]);

  useEffect(() => {
    const handleResize = () => {
      let headerElement = document.getElementById("header");
      let spaceTop = document.querySelector(".header-space");
      spaceTop.style.paddingTop = headerElement.offsetHeight.toString() + "px";
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("load", handleResize);
  }, [headerHeight]);

  // useEffect(() => {
  //   const handleResize = () => {
  //     setHeaderHeight(ref.current.offsetHeight.toString() + "px");
  //   };
  //   handleResize();
  //   window.addEventListener("resize", handleResize);

  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, [headerHeight]);

  const body = document.getElementsByTagName("body");
  const handleToggle = () => {
    body[0].classList.toggle("show");
  };

  useEffect(() => {
    // const width = screen.width;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      scrollPosition > 15 ? setIsScrollled(true) : setIsScrollled(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <header
        id="header"
        className={clsx("main-header", {
          "header-transparent": isTransparent,
          scrolled: isScrollled,
        })}
        ref={ref}
      >
        <div className="container">
          <div className="header-navbar">
            <div className="header-logo flex-shrink-0">
              <Link to="/">
                <Image src={Logo} />
              </Link>
            </div>
            <div className="header-navigation ms-auto" id="navigation">
              <ul className="header-navitem d-flex mb-0 flex-wrap" id="myDIV">
                <li>
                  <NavLink
                    to="/"
                    className="header-nav  header-nav-links"
                    onClick={handleToggle}
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/why-kinesin"
                    className="header-nav  header-nav-links"
                    onClick={handleToggle}
                  >
                    Why Kinesin?
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/features"
                    className="header-nav header-nav-links"
                    onClick={handleToggle}
                  >
                    Features
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/solutions"
                    className="header-nav header-nav-links"
                    onClick={handleToggle}
                  >
                    Solutions
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/pricing"
                    className="header-nav header-nav-links"
                    onClick={handleToggle}
                  >
                    Pricing
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/support"
                    className="header-nav header-nav-links"
                    onClick={handleToggle}
                  >
                    Support
                  </NavLink>
                </li>
                <div className="btn-wrap d-block d-xl-none">
                  <CustomButton link="/" variant={"dark"}>
                    Book Demo
                  </CustomButton>
                  <CustomButton link="/" variant={"bordered"}>
                    Request Quote
                  </CustomButton>
                </div>
              </ul>
            </div>
            <div className="btn-wrap d-xl-block d-none">
              <CustomButton link="/" variant={"dark"}>
                Book Demo
              </CustomButton>
              <CustomButton link="/" variant={"bordered"}>
                Request Quote
              </CustomButton>
            </div>
            <div className="d-xl-none d-flex position-relative navbar-toggler-wrapper">
              <button
                className="navbar-toggler"
                type="button"
                onClick={handleToggle}
              >
                <span className="navbar-toggler-icon"></span>
              </button>
            </div>
          </div>
        </div>
      </header>
      {/* {!isTransparent && (
        <div className="header-space" style={{ height: headerHeight }}></div>
      )} */}
      <div className="header-space"></div>
    </>
  );
};

export default Header;
