import React from "react";
import { Link } from "react-router-dom";
import AuthenticationLogo from "../../assets/images/logo/authentication-logo.svg";

const AuthenticationHeader = () => {
  return (
    <>
      <div className="d-flex align-items-center justify-content-between authentication-header">
        <Link to="/login" className="header-logo">
          <img src={AuthenticationLogo} />
        </Link>
        <div className="d-flex align-items-center">
          <span className="text-white fw-500 me-3  d-none d-lg-block">
            Don’t have an account?{" "}
          </span>
          <Link to="/signup" className="custom_btn">
            Sign Up
          </Link>
        </div>
      </div>
    </>
  );
};

export default AuthenticationHeader;
