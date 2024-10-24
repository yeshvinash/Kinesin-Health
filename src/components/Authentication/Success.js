import React from "react";
import { Image } from "react-bootstrap";
import StarsImg from "../../assets/images/icons/stars.svg";
import success from "../../assets/images/cover/success.png";
import AuthenticationHeader from "./AuthenticationHeader";
import "./Authentication.css";

export const Success = () => {
  return (
    <>
      <section className="authentication-wrapper">
        <AuthenticationHeader />
        <section className="authentication-form d-flex success-form">
          <div className="authentication-form-left">
            <div className="authentication-form-content-wrapper">
              <div className="authentication-title-wrap text-center">
                <Image src={success} className="mb-5 pb-1 success-img" />
                <h1 className="h1 fw-600 text-stratos mb-3">Success</h1>
                <span className="h5 mb-0 fw-400">
                  Your password has been successfully reset. you can check your
                  email for reset link.
                </span>
              </div>
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
