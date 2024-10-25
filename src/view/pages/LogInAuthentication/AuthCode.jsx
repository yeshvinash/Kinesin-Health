import React, { useEffect, useState } from "react";
import axios from "../../../api/axios";
import Common from "../../../assets/commonImages/Common";
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { MFA_CODE_URL } from "../../../api/Service";
import { useNavigate } from "react-router-dom";

// Validation for auth_code field//
const validationSchema = Yup.object().shape({
  auth_code: Yup.number()
    .typeError("It must be a number")
    .positive("It must be a positive number")
    .integer("It must be an integer")
    .required("This field is required"),
});

const AuthCode = () => {
  // Navigation//
  const navigate = useNavigate();
  
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/auth_error'); 
    }, 30000); // Set the timer for the given time limit (in milliseconds)

    return () => clearTimeout(timer); // Clear the timer when the component unmounts
  }, [navigate]);


  const userId = sessionStorage.getItem("userId");
  const requestId = sessionStorage.getItem("requestId");

  // Authentication code submit handler//
  const handleSubmit = async (values) => {
    try {
      const response = await axios.post(
        MFA_CODE_URL,
        { requestId: requestId, userId: userId, code: values.auth_code.toString() },
        {
          headers: {
            Accept:"*",
            "Content-Type": "application/json",
            authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
          },
        }
      );
      console.log(response.data);
      if (response.status === 200) {
        navigate("/registration");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Authentication code submit handler//

  return (
    <>
      <section className="log_sec">
        <h2>Kinesin My Health</h2>
        <div className="log_wrap">
          <Common />
          <Formik
            initialValues={{ auth_code: "" }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form>
                <span className="login100-form-title">2 Auth. Code</span>
                {/* Auth_code field */}
                <div className="form-floating mb-3">
                  <Field
                    className={"form-control"}
                    type="number"
                    name="auth_code"
                    id="floatingInput"
                    placeholder="123 456 789"
                  />
                  <label for="floatingInput">Enter Code</label>
                  {errors.auth_code && touched.auth_code && (
                    <div className="errorstext">{errors.auth_code}</div>
                  )}
                </div>
                {/* Auth_code field */}

                <div className="frm_btm">
                  <div>
                    <a className="txt1">
                      Didn’t receive any code?{" "}
                      <span className="sign_txt">Resend</span>
                    </a>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="container-login100-form-btn">
                  <button
                    className="custom_btn login_btn"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Submit
                  </button>
                </div>
                {/* Submit Button */}
              </Form>
            )}
          </Formik>
        </div>
      </section>
    </>
  );
};

export default AuthCode;
