import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import logo from "../../../assets/images/mail-icon.svg";
import { useNavigate } from "react-router-dom";
import { LOG_URL,WHO_AM_I } from "../../../api/Service";
import Common from "../../../assets/commonImages/Common";
import badicon from "../../../assets/images/badicon.svg";
import axios from "../../../api/axios";
import { useDispatch } from "react-redux";
import { login } from "../../../redux/auth/AuthSlice";
import jwt_decode from "jwt-decode";
import { createAxiosInstance } from "../../../api/axiosConfig";

// Login Validation //
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Must be a valid email")
    .max(255)
    .required("Email is required"),
  password: Yup.string()
    .max(255)
    .min(6, "Password must be at least 6 characters long")
    .required("Password is required"),
});
// Login Validation //

const LogIn = () => {
  // Show Hide option in Password//
  const [showpassword, setshowpassword] = useState(false);

  const [errMsg, setErrMsg] = useState("");

  const [status, setStatus] = useState(undefined);

  const initialValues = { email: "", password: "" };

  // For Navigation
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const fetchProfileInfo = async () => {
    try {
      const axiosInstance = createAxiosInstance(true);
      // console.log('axiosInstance : ' + axiosInstance.getUri());
      const response = await axiosInstance.get(
        `${WHO_AM_I}`
      );
      if (response && response.data) {
        if (response.data) {
          console.log('response.data : ' + JSON.stringify(response.data));
          let name = response && response.data && response.data.staffMember ? response.data.staffMember.firstName + " " + response.data.staffMember.lastName : null;
          console.log(name);
          return name;
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  // Log in form submit handler start//
  const handleSubmit = async (values, { setSubmitting, setFieldError }) => {
    try {
      const response = await axios.post(LOG_URL, values, {
        headers: {
          Accept: "*",
          "Content-Type": "application/json",
        },
      });
      console.log(response.data);
      if (response.status === 200) {
        const { access_token, userId } = response.data;
        const decodetoken = () => {
          try {
            const decodedValues = jwt_decode(access_token);
            return decodedValues
          } catch (error) {
            console.error("Error decoding token:", error);
          }
        }
        const decodedToken =  await decodetoken()
        
        if (response.status === 200) {
          navigate("/allied_home");
        }
        sessionStorage.setItem("accessToken", response.data.access_token);
        sessionStorage.setItem("refreshToken", response.data.refresh_token);
        sessionStorage.setItem("userId", response.data.userId);
        sessionStorage.setItem("requestId", response.data.requestId);
        
        
        console.log('kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkinesin..');        
        
        localStorage.setItem('kinesin-accessToken', response.data.access_token);
        localStorage.setItem('kinesin-refreshToken', response.data.refresh_token);
        localStorage.setItem('kinesin-userId', response.data.userId);
        localStorage.setItem('kinesin-requestId', response.data.requestId);
        localStorage.setItem("kinesin-vishvas", decodedToken.tenant);
        localStorage.setItem("kinesin-user", JSON.stringify({
          user: {
            id: userId,
            role: decodedToken.role,
            permissions: decodedToken.permissions,
            name: decodedToken.name,
            tenant: decodedToken.tenant,
          }
        }));
        localStorage.setItem("kinesin-tenant", decodedToken.tenant);
        const KinesanName = await fetchProfileInfo();
        console.log(KinesanName);
        localStorage.setItem('kinesin-name',KinesanName)
        dispatch(
          login({
            user: {
              id: userId,
              role: decodedToken.role,
              permissions: decodedToken.permissions,
              name: decodedToken.name,
              name : KinesanName || decodedToken.name,
              tenant: decodedToken.tenant,
            }
          })
        )
        console.log('kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkinesin..' + localStorage.getItem('kinesin-accessToken'));
      } else {
        setErrMsg(response.data.errorMessage);
      }
    } catch (error) {
      setStatus({ type: "error", error });
      if (!error?.response) {
        setErrMsg("No Server Response");
      } else if (error.response?.status === 400) {
        setErrMsg("Missing Email or Password");
      } else if (error.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Bad Credentials");
      }
      console.error(error);
      const { message } = error.response.data;
      setFieldError("password", message);

      // // To Clear the error msg//
      // setTimeout(() => {
      //   setStatus(null);
      // }, 5000);

      // if (tenant) {
      //   const axiosInstance = createAxiosInstance(tenant);

      //   try {
      //     const patientResponse = await axiosInstance.get('/patient');
      //     // Handle patient data here...
      //   } catch (patientError) {
      //     console.error('Error fetching patient data:', patientError);
      //   }
      // }
    }
    setSubmitting(false);
  };
  // Log in form submit handler end//

  return (
    <>
      <section className="log_sec authentication-wrapper">
        <div className="logwraper">
          <Common />
          <h2>Kinesin My Health</h2>
          <div className="log_wrap">
            <Formik
              initialValues={initialValues}
              onSubmit={handleSubmit}
              validationSchema={validationSchema}
            >
              {({ errors, touched, isSubmitting }) => (
                <Form className="">
                  <span className="login100-form-title">
                    Welcome back, login
                  </span>
                  {status?.type === "error" && (
                    <div className="badiconbox">
                      <div className="badiconimg">
                        <img src={badicon} alt="" />
                      </div>
                      <h6>{errMsg}</h6>
                    </div>
                  )}
                  {/* Email */}
                  <div className="form-floating mb-3 auth-input-field">
                    <Field
                      className={"form-control"}
                      type="email"
                      name="email"
                      id="floatingInput"
                      placeholder="name@example.com"
                    />

                    <label htmlFor="floatingInput">Email</label>
                    <div className="inputicon">
                      <img src={logo} alt="" />
                    </div>
                    {errors.email && touched.email && (
                      <div className="errorstext">{errors.email}</div>
                    )}
                  </div>
                  {/* Email */}

                  {/* Password */}
                  <div className="form-floating auth-input-field">
                    <Field
                      className={"form-control"}
                      type={showpassword ? "text" : "password"}
                      name="password"
                      id="floatingPassword"
                      placeholder="Password"
                    />
                    <label htmlFor="floatingPassword">Password</label>
                    <div
                      className="inputicon"
                      onClick={() => setshowpassword(!showpassword)}
                    >
                      {showpassword ? (
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

                  <div className="frm_btm">
                    {/* Forgot Password Button */}
                    <div>
                      <a
                        className="txt1"
                        onClick={() => navigate("/forgotpassword")}
                      >
                        Forgot your password?
                      </a>
                    </div>
                    <div>
                      <a
                        className="text-decoration-underline txt1"
                        onClick={() => navigate("/signup")}
                      >
                        Signup
                      </a>
                    </div>

                   { /* Sign Up Button */}

                  </div>

                  {/* Login Button */}
                  <div className="container-login100-form-btn">
                    <button
                      className="custom_btn login_btn"
                      type="submit"
                      disabled={isSubmitting}
                    >
                      Login
                    </button>
                  </div>
                  {/* Login Button */}
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </section>
    </>
  );
};

export default LogIn;
