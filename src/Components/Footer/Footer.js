import React from "react";
import Image from "react-bootstrap/Image";
import { Col, Row } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, NavLink } from "react-router-dom";
import footerLogo from "../../assets/images/logo/footer-logo.svg";
import { SVGIcons } from "../Data/SVGIcons";
import FooterBg from "../../assets/images/cover/footer/footer-bg.png"
import "./Footer.css";

export const Footer = () => {
  return (
    <footer className="">
      <div className="container">
        <div className="footer-header">
          <Row className="justify-content-between">
            <Col xl={2} lg={3}>
              <div className="flex-shrink-0">
                <Link to="/" className="footer-logo-wrap">
                  <Image src={footerLogo} />
                </Link>
                <div className="social-icons">
                  <a href="javascript:void(0)" className="social-icon">
                    {SVGIcons.Facebook}
                  </a>
                  <a href="javascript:void(0)" className="social-icon">
                    {SVGIcons.LinkedIn}
                  </a>
                  <a href="javascript:void(0)" className="social-icon">
                    {SVGIcons.Instagram}
                  </a>
                  <a href="javascript:void(0)" className="social-icon">
                    {SVGIcons.Twitter}
                  </a>
                </div>
              </div>
            </Col>
            <Col xl={{ span: 7, offset: 3 }} lg={{ span: 8, offset: 0 }}>
              <div className="d-flex justify-content-between footer-links-wrap">
                <div className="footer-links">
                  <h4 className="mb-3 h4 text-black fw-600 text-capitalize">
                    Company
                  </h4>
                  <ul className="mb-0">
                    <li>
                      <NavLink to="/">Our story</NavLink>
                    </li>
                    <li>
                      <NavLink to="/">Careers</NavLink>
                    </li>
                    <li>
                      <NavLink to="/">Contact</NavLink>
                    </li>
                    <li>
                      <NavLink to="/">Privacy Notice</NavLink>
                    </li>
                    <li>
                      <NavLink to="/">Copyright</NavLink>
                    </li>
                    <li>
                      <NavLink to="/">Terms and Conditions</NavLink>
                    </li>
                    <li>
                      <NavLink to="/">Security</NavLink>
                    </li>
                  </ul>
                </div>
                <div className="footer-links">
                  <h4 className="mb-3 h4 text-black fw-600 text-capitalize">
                    Product
                  </h4>
                  <ul className="mb-0">
                    <li>
                      <NavLink to="/features">Features</NavLink>
                    </li>
                    <li>
                      <NavLink to="/pricing">Pricing</NavLink>
                    </li>
                    <li>
                      <NavLink to="/">For your Industry</NavLink>
                    </li>
                    <li>
                      <NavLink to="/">Compare</NavLink>
                    </li>
                    <li>
                      <NavLink to="/support">Support</NavLink>
                    </li>
                    <li>
                      <NavLink to="/">Download</NavLink>
                    </li>
                  </ul>
                </div>
                <div className="footer-links">
                  <h4 className="mb-3 h4 text-black fw-600 text-capitalize">
                    Community
                  </h4>
                  <ul className="mb-0">
                    <li>
                      <NavLink to="/">Podcast</NavLink>
                    </li>
                    <li>
                      <NavLink to="/">Blog</NavLink>
                    </li>
                    <li>
                      <NavLink to="/">Events</NavLink>
                    </li>
                    <li>
                      <NavLink to="/">Videos</NavLink>
                    </li>
                  </ul>
                </div>
              </div>
            </Col>
          </Row>
        </div>
        <div className="footer-bottom">
          <div className="footer-copyright">
            <div className="container">
              <p className="small footer-text mb-0">
                © 2024 <span>Kinesin Health</span>. All Right Reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Image src={FooterBg} className="footer-bg-img"/>
    </footer>
  );
};
