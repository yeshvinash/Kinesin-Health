import React, { useState } from "react";
import { Link } from "react-router-dom";
import AuthenticationLogo from "../../../assets/images/logo/authentication-logo.svg";
import { Button, Col, FloatingLabel, Form, Image, Row } from "react-bootstrap";
import StarsImg from "../../../assets/images/icons/stars.svg";
import "../Authentication.css";
import "./Signup.css";
import { SVGIcons } from "../../Data/SVGIcons";

export const SignUpStep2 = () => {
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
        <section className="authentication-form  d-flex">
          <div className="authentication-form-left ">
            <div className="authentication-form-content-wrapper">
              <div className="authentication-title-wrap mb-5 pb-1">
                <h2 className="h2 fw-600 text-stratos">Create an Account</h2>
                <span className="p fw-400">
                  Give us some of your information to get started.
                </span>
              </div>
              <Form>
                <h3 className="small fw-600 text-stratos">Your Details</h3>
                <FloatingLabel controlId="floatingInput" label="First Name">
                  <Form.Control type="text" placeholder="Noelhuk" />
                </FloatingLabel>
                <FloatingLabel controlId="floatingInput" label="Surname">
                  <Form.Control type="text" placeholder="Noelhuk" />
                </FloatingLabel>
                <Form.Select aria-label="Default select example">
                  <option>Gender</option>
                  <option value="1">Male</option>
                  <option value="2">Female</option>
                  <option value="3">Other</option>
                </Form.Select>
                <FloatingLabel controlId="floatingInput" label="Date of Birth">
                  <Form.Control type="date" />
                </FloatingLabel>

                <Button className="custom_btn w-100 login_btn">Continue</Button>
                <div className="login-platform-link-wrap">
                  <a href="javascript:void(0)" className="">
                    {SVGIcons.Email}
                    <span>Continue with Email</span>
                  </a>
                  <a href="javascript:void(0)" className="">
                    {SVGIcons.MicroSoft}
                    <span>Continue with Microsoft</span>
                  </a>
                  <a href="javascript:void(0)" className="">
                    {SVGIcons.Google}
                    <span>Continue with Google</span>
                  </a>
                </div>
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
