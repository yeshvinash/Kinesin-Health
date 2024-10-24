import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "../../../api/axios";
import { useNavigate } from "react-router-dom";
import Common from "../../../assets/commonImages/Common";
import logo from "../../../assets/images/mail-icon.svg";


// validation for registration page//
const validationSchema = Yup.object().shape({
    email: Yup.string()
    .email("Must be a valid email")
    .max(255)
    .required("Email is required"),

    password: Yup.string()
    .max(255)
    .min(6, "Password must be at least 6 characters long")
    .required("Password is required"),

  passwordConfirmation: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
});

// Form fieldsinitial value//
const initialValues = {
    email:"",
    password: "",
    passwordConfirmation: "",
  };

const Registration = () => {
// Navigation//
    const navigate = useNavigate()

    // Password show/hide state//
    const [showpassword, setshowpassword] = useState({
        password: { showPassword: false },
        passwordConfirmation: { showPassword: false },
      });
    
      // Password toogle//
      const toggleShowPassword = (name) => {
        setshowpassword((prevPasswords) => ({
          ...prevPasswords,
          [name]: {
            ...prevPasswords[name],
            showPassword: !prevPasswords[name].showPassword,
          },
        }));
      };
  return (
    <>
      <section className="log_sec">
        <div className="logwraper">
          <Common />
          <h2>Kinesin My Health</h2>
          <div className="log_wrap">
            <Formik
              initialValues={initialValues}
              onSubmit={(value)=> console.log(value)}
              validationSchema={validationSchema}
            >
              {({ errors, touched, isSubmitting }) => (
                <Form className="">
                  <span className="login100-form-title">
                    Create an account
                  </span>

                  {/* Email */}
                  <div className="form-floating mb-3">
                    <Field
                      className={"form-control"}
                      type="email"
                      name="email"
                      id="floatingInput"
                      placeholder="name@example.com"
                    />

                    <label htmlFor="floatingInput">Email</label>
                    <div className="inputicon">
                      <img src={logo} />
                    </div>
                    {errors.email && touched.email && (
                      <div className="errorstext">{errors.email}</div>
                    )}
                  </div>
                  {/* Email */}

                  {/* Password */}
                  <div className="form-floating mb-3">
                    <Field
                      className={"form-control"}
                      type={showpassword.password.showPassword ? "text" : "password"}                      name="password"
                      id="floatingPassword"
                      placeholder="Password"
                    />
                    <label htmlFor="floatingPassword">Password</label>
                    <div
                      className="inputicon"
                      onClick={() => toggleShowPassword("password")}
                    >
                      {showpassword.password.showPassword ? (
                        <i className="eye fas fa-eye-slash"></i>
                      ) : (
                        <i className="eye fa fa-eye" aria-hidden="true"></i>
                      )}
                    </div>
                    {errors.password && touched.password && (
                      <div className="errorstext">{errors.password}</div>
                    )}
                  </div>
                  {/* Password */}

                  {/* Confirm Password */}
                  <div className="form-floating mb-3">
                    <Field
                      className={"form-control"}
                      type={
                        showpassword.passwordConfirmation.showPassword
                          ? "text"
                          : "password"
                      }
                      name="passwordConfirmation"
                      id="floatingPassword"
                      placeholder="Password"
                    />
                    <label for="floatingPassword">Confirm New Password</label>
                    <div
                      className="inputicon"
                      onClick={() => toggleShowPassword("passwordConfirmation")}
                    >
                      {showpassword.passwordConfirmation.showPassword ? (
                        <i className="eye fas fa-eye-slash"></i>
                      ) : (
                        <i className="eye fa fa-eye" aria-hidden="true"></i>
                      )}
                    </div>
                    {errors.passwordConfirmation &&
                      touched.passwordConfirmation && (
                        <div className="errorstext">
                          {errors.passwordConfirmation}
                        </div>
                      )}
                  </div>
                  {/* Confirm Password */}

                  <span className="register_form">
                    <p>Already have an account?</p>
                    <a className="sign_txt" onClick={() => navigate("/")}>
                      Sign in
                    </a>
                  </span>

                   {/* Sign up Button */}
                   <div className="container-login100-form-btn">
                    <button
                      className="custom_btn login_btn"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      Sign up
                    </button>
                  </div>
                  {/* Sign up Button */}
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </section>
    </>
  );
};

export default Registration;
