import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "../../../api/axios";
import logo from "../../../assets/images/mail-icon.svg";
import { LOST_PASS_URL } from "../../../api/Service";
import { useNavigate } from "react-router-dom";
import badicon from "../../../assets/images/badicon.svg";
import Common from "../../../assets/commonImages/Common";

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Must be a valid email")
    .max(255)
    .required("Email is required"),
});

const ForgotPassword = () => {
  const [errMsg, setErrMsg] = useState("");

  const [status, setStatus] = useState(undefined);


  // For navigating
  const navigate = useNavigate();

  // Lost Password submit handler//
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post(LOST_PASS_URL, values, {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      });
      console.log(response);
      if (response.status === 200) {
        navigate("/success_msg");
      }
    } catch (error) {
      setStatus({ type: "error", error });
      if (!error?.response) {
        setErrMsg("No Server Response");
      } else if (error.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
    }
    setSubmitting(false);
  };
  // Lost Password submit handler//

  return (
    <>
      <section className="log_sec">
        <h2>Kinesin My Health</h2>
        <div className="log_wrap">
          <Common />
          <Formik
            initialValues={{ email: "" }}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form>
                <span className="login100-form-title">Reset Password</span>
                {status?.type === "error" && (
                    <div className="badiconbox">
                      <div className="badiconimg">
                        <img src={badicon} alt="" />
                      </div>
                      <h6>{errMsg}</h6>
                    </div>
                  )}

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

                {/* Reset Button */}
                <div className="container-login100-form-btn">
                  <button
                    className="custom_btn login_btn"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Reset Password
                  </button>
                </div>
                {/* Reset Button */}
              </Form>
            )}
          </Formik>
        </div>
      </section>
    </>
  );
};

export default ForgotPassword;
