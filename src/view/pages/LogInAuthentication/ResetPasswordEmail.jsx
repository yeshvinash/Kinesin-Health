import React, { useState } from "react";
import Common from "../../../assets/commonImages/Common";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "../../../api/axios";
import { RESET_PASS_URL } from "../../../api/Service";
import { useNavigate, useParams } from "react-router-dom";

// Validation for reset password//
const validationSchema = Yup.object().shape({
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
  password: "",
  passwordConfirmation: "",
};

const ResetPasswordEmail = () => {
  // Get url param//
  const params = new URLSearchParams(window.location.search);
  const userCode = params.get("user_code");
  const resetId = params.get("reset_id");
  console.log("url data", userCode, resetId);
  // Get url param//

  // Navigation//
  const navigate = useNavigate();

  // Show Hide option in Password//
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

  // Api header//
  const headers = {
    Accept: "*",
    "Content-Type": "application/json",
    authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
  };

  // Reset password submit handler//
  const handleSubmit = async (values) => {
    try {
      const response = await axios.post(
        RESET_PASS_URL,
        {
          userCode: userCode,
          resetId: resetId,
          password: values.password,
          password2: values.passwordConfirmation,
        },
        { headers: headers }
      );
      console.log(response);
      if (response.status === 200) {
        navigate("/auth_code");
      }
    } catch (error) {
      console.log(error);
    }
  };
  // Reset password submit handler//
  return (
    <>
      <section className="log_sec">
        <div className="logwraper">
          <Common />
          <h2>Kinesin My Health</h2>
          <div className="log_wrap">
            <Formik
              initialValues={initialValues}
              onSubmit={handleSubmit}
              validationSchema={validationSchema}
            >
              {({ isSubmitting, errors, touched }) => (
                <Form>
                  <span className="login100-form-title">
                    Create New Password
                  </span>

                  {/* New Password */}
                  <div className="form-floating mb-3">
                    <Field
                      className={"form-control"}
                      type={
                        showpassword.password.showPassword ? "text" : "password"
                      }
                      name="password"
                      id="floatingPassword"
                      placeholder="Password"
                    />
                    <label for="floatingPassword">New Password</label>
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
                  {/* New Password */}

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

                  {/* Submit Button */}
                  <div className="container-login100-form-btn ">
                    <button
                      className="custom_btn login_btn"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      Submit
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </section>
    </>
  );
};

export default ResetPasswordEmail;
