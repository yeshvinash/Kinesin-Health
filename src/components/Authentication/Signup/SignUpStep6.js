import React, { useState } from "react";
import { Link } from "react-router-dom";
import AuthenticationLogo from "../../../assets/images/logo/authentication-logo.svg";
import { Button, Col, FloatingLabel, Form, Image, Row } from "react-bootstrap";
import StarsImg from "../../../assets/images/icons/stars.svg";
import success from "../../../assets/images/cover/success.png";

import "../Authentication.css";
import "./Signup.css";
import { SVGIcons } from "../../Data/SVGIcons";

export const SignUpStep6 = () => {
  return (
    <>
      <section className="authentication-wrapper">
        <div className="d-flex align-items-center justify-content-between authentication-header">
          <Link to="/login">
            <img src={AuthenticationLogo} />
          </Link>
          <div className="d-flex align-items-center">
            <span className="text-white fw-500 me-3">
              Don’t have an account?{" "}
            </span>
            <Link to="/" className="custom_btn">
              Sign Up
            </Link>
          </div>
        </div>
        <section className="authentication-form d-flex failed-authentication-form">
          <div className="authentication-form-left">
            <div className="authentication-form-content-wrapper">
              <div className="authentication-title-wrap text-center">
                <Image src={success} className="mb-5 pb-1" />
                <h2 className="h2 fw-600 text-stratos mb-3">
                  Registration is complete
                </h2>
                <span className="p">Congratulation you have complete your sign up</span>
              </div>
              <Form>
                <Button className="custom_btn w-100 login_btn">Home</Button>
              </Form>
            </div>
          </div>
          <div className="authentication-form-right d-flex flex-column justify-content-end">
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