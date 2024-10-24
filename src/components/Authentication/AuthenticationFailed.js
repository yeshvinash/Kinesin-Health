import React, { useState } from "react";
import { Link } from "react-router-dom";
import AuthenticationLogo from "../../assets/images/logo/authentication-logo.svg";
import badicon from "../../assets/images/icons/badicon.svg";
import { Form, Button, Image } from "react-bootstrap";
import StarsImg from "../../assets/images/icons/stars.svg";
import failed from "../../assets/images/cover/failed.png";
import "./Authentication.css";

export const AuthenticationFailed = () => {
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
            <Link to="/signup" className="custom_btn">
              Sign Up
            </Link>
          </div>
        </div>
        <section className="authentication-form d-flex failed-authentication-form">
          <div className="authentication-form-left">
            <div className="authentication-form-content-wrapper">
              <div className="authentication-title-wrap text-center">
                <Image src={failed} className="mb-5 pb-1" />
                <h1 className="h1 fw-600 text-stratos mb-3">
                  Error 2 Factor Authentication failed
                </h1>
                <span className="h5 mb-0 fw-400">Please Sign in Again</span>
              </div>
              <Form>
                <Link to="/login" className="custom_btn w-100 login_btn">Sign In</Link>
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
