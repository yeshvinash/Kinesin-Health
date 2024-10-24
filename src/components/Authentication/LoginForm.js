import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FloatingLabel, Form, Image } from "react-bootstrap";
import StarsImg from "../../assets/images/icons/stars.svg";
import { SVGIcons } from "../Data/SVGIcons";
import AuthenticationHeader from "./AuthenticationHeader";
import "./Authentication.css";

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");

  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  return (
    <>
      <section className="authentication-wrapper">
        <AuthenticationHeader />
        <section className="authentication-form d-flex">
          <div className="authentication-form-left ">
            <div className="authentication-form-content-wrapper">
              <div className="authentication-title-wrap mb-5 pb-1">
                <h1 className="h1 fw-600 text-stratos">Welcome back!</h1>
                <span className="h5 mb-0 fw-400"> Login to your account</span>
              </div>
              <Form>
                <FloatingLabel controlId="floatingInput" label="Username">
                  <Form.Control type="email" placeholder="name@example.com" />
                  <div className="inputicon">{SVGIcons.Email}</div>
                </FloatingLabel>
                <FloatingLabel controlId="floatingPassword" label="Password">
                  <Form.Control
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={handlePasswordChange}
                    className="custom-password"
                  />
                  <div onClick={toggleShowPassword} className="inputicon">
                    {showPassword ? (
                      <>{SVGIcons.EyeOpen}</>
                    ) : (
                      <>{SVGIcons.EyeClose}</>
                    )}
                  </div>
                </FloatingLabel>
                <Link
                  to="/reset-password"
                  className="d-block text-end mt-4 pt-2 link fw-500 forgot-password-link"
                >
                  Forgot your password?
                </Link>
                <Link
                  to="/login-bad-credentials"
                  className="custom_btn w-100 login_btn"
                >
                  Login
                </Link>
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
