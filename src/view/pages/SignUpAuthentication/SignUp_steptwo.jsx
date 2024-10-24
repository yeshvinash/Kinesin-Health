import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import camera from "../../../assets/images/camera.svg";
import regImg from "../../../assets/images/image 56.png";
import ProgressStep from "../../../components/ProgressStep";
import { useNavigate } from "react-router-dom";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

// Validation schema for patient signup//
const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Must be a valid email")
    .max(255)
    .required("Email is required"),

  userName: Yup.string()
    .required("Username is required")
    .min(6, "Username must be at least 6 characters")
    .max(20, "Username must not exceed 20 characters"),

  country: Yup.string().required("This field is required"),

  eircode: Yup.string().required("This field is required"),

  address: Yup.string().required("This field is required"),

  address2: Yup.string().required("This field is required"),

  mobileNum: Yup.string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("Mobile number is required"),
});

// Initial Values patient Register Form //
const initialValues = {
  userName: "",
  address: "",
  address2: "",
  country: "",
  eircode: "",
  mobileNum: "",
  email: "",
};
const SignUp_steptwo = () => {
  const navigate = useNavigate()
  const handleSubmit =(value)=>{
  console.log(value);
  navigate("/signup_three")
  }
  return (
    <>
      <section className="signup_section">
        <div className="container containarwhite">
          <div className="row">
            <ProgressStep activeStep={2}/>
            <div className="col-md-12">
              <h2 className="d_name mb38">Kinesin My Health</h2>
            </div>
            {/* <div className="col-md-12 text-center formobil">
              <h2 className="d_name mb38">Kinesin My Health</h2>
            </div> */}
            <div className="col-md-6 mediainput">
              {/* <h2 className="d_name mb38 fordesktop">Kinesin My Health</h2> */}
              <div className="log_wrap">
                <Formik
                  initialValues={initialValues}
                  onSubmit={handleSubmit}
                  validationSchema={validationSchema}
                >
                  {({ errors, touched, isSubmitting }) => (
                    <Form>
                      <p className="head_para">Practice Details</p>

                      {/* Username */}
                      <div className="form-floating mb-3">
                        <Field
                          type="text"
                          name="userName"
                          className="form-control"
                          id="floatingInput1"
                          placeholder="Practice Name"
                        />
                        <label for="floatingInput1">Practice Name</label>
                        {errors.userName && touched.userName && (
                          <div className="errorstext">{errors.userName}</div>
                        )}
                      </div>
                      {/* Username */}

                      {/* Dropdown */}
                      <div className="form-floating mb38">
                        <select
                          className="form-select"
                          id="floatingSelect"
                          aria-label="Floating label select example"
                        >
                          <option value="1">General Practitioner</option>
                          <option value="2">Physiotherapist</option>
                          <option value="3">Psychologist</option>
                          <option value="4">Therapist</option>
                          <option value="5">Dietician</option>
                          <option value="6">Aesthetic Practitioner</option>
                        </select>
                        <label for="floatingSelect">Practice Type</label>
                      </div>
                      {/* Dropdown */}

                      <p className="head_para2">Practice Address</p>

                      {/* Address line 1 */}
                      <div className="form-floating mb-3">
                        <Field
                          type="text"
                          name="address"
                          className="form-control"
                          placeholder="First Line"
                          id="floatingInput4"
                        />
                        <label for="floatingInput4">First Line</label>
                        {errors.address && touched.address && (
                          <div className="errorstext">{errors.address}</div>
                        )}
                      </div>
                      {/* Address line 1 */}

                      {/* Address line 2 */}
                      <div className="form-floating mb-3">
                        <Field
                          type="text"
                          name="address2"
                          className="form-control"
                          placeholder="Second Line"
                          id="floatingInput5"
                        />
                        <label for="floatingInput5">Second Line</label>
                        {errors.address2 && touched.address2 && (
                          <div className="errorstext">{errors.address2}</div>
                        )}
                      </div>
                      {/* Address line 2 */}

                      {/* Counttry */}
                      <div className="form-floating mb-3">
                        <Field
                          type="text"
                          name="country"
                          className="form-control"
                          placeholder="Country"
                          id="floatingInput6"
                        />
                        <label for="floatingInput6">Country</label>
                        {errors.country && touched.country && (
                          <div className="errorstext">{errors.country}</div>
                        )}
                      </div>
                      {/* Counttry */}

                      {/* Eir code */}
                      <div className="form-floating mb-3">
                        <Field
                          type="text"
                          name="eircode"
                          className="form-control"
                          placeholder="EirCode"
                          id="floatingInput7"
                        />
                        <label for="floatingInput7">EirCode</label>
                        {errors.eircode && touched.eircode && (
                          <div className="errorstext">{errors.eircode}</div>
                        )}
                      </div>
                      {/* Eir code */}
                      <hr />

                      {/* Mobile Num */}
                      <div className="form-floating mb-3">
                        <Field
                          type="number"
                          className="form-control"
                          name="mobileNum"
                          placeholder="Practice phone"
                          id="floatingInput8"
                        />
                        <label for="floatingInput8">Practice phone</label>
                        {errors.mobileNum && touched.mobileNum && (
                          <div className="errorstext">{errors.mobileNum}</div>
                        )}
                      </div>
                      {/* Mobile Num */}

                      {/* Email */}
                      <div className="form-floating mb-3">
                        <Field
                          type="email"
                          name="email"
                          className="form-control"
                          placeholder="Practice email"
                          id="floatingInput9"
                        />
                        <label for="floatingInput9">Practice email</label>
                        {errors.email && touched.email && (
                          <div className="errorstext">{errors.email}</div>
                        )}
                      </div>
                      {/* Email */}

                      {/* website */}
                      <div className="form-floating mb38">
                        <input
                          type="text"
                          name="website"
                          className="form-control"
                          placeholder="Practice Website"
                          id="floatingInput10"
                        />
                        <label for="floatingInput10">Practice Website</label>
                      </div>
                      {/* website */}

                      {/* Sms verification Button */}
                      <div className="btnxscenter">
                        <button className="custom_btn login_btn" type="submit" disabled={isSubmitting}>
                          SMS Verification
                        </button>
                      </div>
                      {/* Sms verification Button */}
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
            {/* <div className="col-md-5 preletiv">
              <div className="log_wrap">
                <div className="goessect">
                  <div className="uploadimgsect">
                    <div className="cameraicon">
                      <img src={camera} alt />
                    </div>
                  </div>
                  <div className="goessectcontet">
                    <h4>Name goes here</h4>
                    <h6>Update information about your account.</h6>
                  </div>
                </div>
                <div className="btnxscenter m_top30">
                  <button
                    className="custom_btn login_btn add_account"
                    type="submit"
                  >
                    Add Stripe Account
                  </button>
                </div>
                <div className="media_heading">
                  <h3>Link Social Media (optional)</h3>
                </div>
                <ul className="media_list">
                  <li>
                    <a href={(e)=>e.preventDefault() }>
                      <i className="fa-brands fa-facebook-f"></i> Continue with
                      Facebook
                    </a>
                  </li>
                  <li>
                    <a href={(e)=>e.preventDefault() }>
                      <i className="fa-brands fa-twitter"></i> Continue with
                      Twitter
                    </a>
                  </li>
                  <li>
                    <a href={(e)=>e.preventDefault() }>
                      <i className="fa-brands fa-square-instagram"></i> Continue
                      with Instagram
                    </a>
                  </li>
                </ul>
              </div>
            </div> */}
            <div className="col-md-6 preletiv">
              <img src={regImg} className="regImg2" alt="" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignUp_steptwo;
