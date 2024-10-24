import React from "react";
import { Link } from "react-router-dom";
import {  Col,  Form, Image, Row } from "react-bootstrap";
import StarsImg from "../../assets/images/icons/stars.svg";
import AuthenticationHeader from "./AuthenticationHeader";
import "./Authentication.css";

export const FactorAuthentication = () => {
  
  return (
    <>
      <section className="authentication-wrapper">
        <AuthenticationHeader />
        <section className="authentication-form factor-authentication-form d-flex">
          <div className="authentication-form-left ">
            <div className="authentication-form-content-wrapper">
              <div className="authentication-title-wrap mb-5 pb-1">
                <h1 className="h1 fw-600 text-stratos">
                  2 Factor Authentication
                </h1>
                <span className="h5 mb-0 fw-400">
                  Verification code has been sent to your email.
                </span>
              </div>
              <Form>
                <Form.Label>Verification Code</Form.Label>
                <Row className="verification-code-wrap">
                  <Col>
                    <Form.Control type="number" />
                  </Col>
                  <Col>
                    <Form.Control type="number" />
                  </Col>
                  <Col>
                    <Form.Control type="number" />
                  </Col>
                  <Col>
                    <Form.Control type="number" />
                  </Col>
                  <Col>
                    <Form.Control type="number" />
                  </Col>
                  <Col>
                    <Form.Control type="number" />
                  </Col>
                </Row>

                <div className="d-flex align-items-center">
                  <span className="text-manatee fw-500 me-3">
                    Didn’t recieve any code?
                  </span>
                  <Link className="d-block text-end m-0 link fw-500 forgot-password-link ">
                    Resend
                  </Link>
                </div>
                <Link
                  to="/authentication-failed"
                  className="custom_btn w-100 login_btn"
                >
                  Submit
                </Link>
              </Form>
            </div>
          </div>
          <div className="authentication-form-right d-none d-xl-flex flex-column justify-content-end">
            <div className="authentication-form-right-content-wrap">
              <Image src={StarsImg} className="mb-3" />
              <p className="text-white mb-3 pb-2">
                “Lorem ipsum dolor sit amet, consect adipiscing elit, sed diam
                nonummy nibh euismod tincidunt ut laore dolore magna aliquam
                era.”
              </p>
              <div>
                <h6 className="mb-0 p small text-caribbean-green fw-700">
                  Diam Nonumy{" "}
                </h6>
                <span className=" text-white fw-400 small-label">
                  {" "}
                  Lorem ipsum{" "}
                </span>
              </div>
            </div>
          </div>
        </section>
      </section>
    </>
  );
};
