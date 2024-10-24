import React from "react";
import errorImg from "../assets/images/Group.svg";
import Common from "../assets/commonImages/Common";
import { useNavigate } from "react-router-dom";

const AuthError = () => {
  const navigate = useNavigate();
  return (
    <>
      <section className="log_sec">
        <div className="logwraper">
          <Common />
          <h2>Kinesin My Health</h2>
          <div className="log_wrap">
            <form>
              <span className="login100-form-title">
                Error <br /> 2 Auth token has expired
              </span>
              <div className="form-floating erroriconbox">
                <img src={errorImg} alt="" />
                <p>Please sign in again</p>
              </div>

              <div className="container-login100-form-btn">
                <button
                  className="custom_btn login_btn"
                  type="submit"
                  onClick={() => navigate("/")}
                >
                  SignIn
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

export default AuthError;
