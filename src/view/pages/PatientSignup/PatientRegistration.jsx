import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "../../../api/axios";
import regImg from "../../../assets/images/image 56.png";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useNavigate } from "react-router-dom";
import Select from "react-select";
export const PATIENT_SIGN_UP = "/api/auth/v1/authenticate";

const options = [
  { value: "Ranelagh Dental", label: "Ranelagh Dental" },
  { value: "Rathgar Dental", label: "Rathgar Dental" },
  { value: "Glesnevin Dental", label: "Glesnevin Dental" },
  { value: "Dublin Dental", label: "Dublin Dental" },
];
// Health practice Signup Validation start//
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const validationSchema = Yup.object().shape({
  fullname: Yup.string()
    .min(2, "Too Short!")
    .max(150, "Too Long!")
    .required("This field is required"),
  tandc: Yup.boolean().oneOf([true], "You must accept"),
  country: Yup.string().required("This field is required"),
  eircode: Yup.string().required("This field is required"),
  address: Yup.string().required("This field is required"),
  address2: Yup.string().required("This field is required"),
  mobileNum: Yup.string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("Mobile number is required"),
  dateOfBirth: Yup.date().required("Date of Birth is required"),
});
// Health practice Signup Validation end//

const PatientRegistration = () => {
  const navigate = useNavigate();
  const [selectedOption, setSelectedOption] = useState(null);
  // For accordian in DOB//
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showString, setShowString] = useState(true);

  // Initial Values Register Form //
  const initialValues = {
    fullname: "",
    tandc: false,
    address: "",
    address2: "",
    country: "",
    eircode: "",
    mobileNum: "",
    dateOfBirth: selectedDate,
  };

  // Register form submit handler start//
  // const handleSubmit = async (values, { setSubmitting, resetForm }) => {
  //   try {
  //     const { fullname, email, password } = values;
  //     const response = await axios.post(
  //       { fullname, email, password },
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           "Access-Control-Allow-Origin": "*",
  //         },
  //       }
  //     );
  //     resetForm();
  //     console.log(response?.data);
  //     console.log(response?.accessToken);
  //     console.log(JSON.stringify(response));
  //   } catch (err) {
  //     console.log(err);
  //   } finally {
  //     setSubmitting(false);
  //   }
  // };

  const handleSubmit = async (value) => {
    console.log(value);

    // const article = { title: 'React POST Request Example' };

    // const response = await axios.post(PATIENT_SIGN_UP,
    //   article,
    //   {
    //     headers: {
    //       "Content-Type": "application/json",
    //       "Access-Control-Allow-Origin": "*",
    //     },
    //   }
    // );
    //     resetForm();
    //     console.log(response?.data);
    //     console.log(response?.accessToken);
    //     console.log(JSON.stringify(response));




    navigate("/regestration-complete");
  };
  // Register form submit handler end//

  //  Dob change handler accordion//
  const handleCalendarChange = (date) => {
    setSelectedDate(date);
  };
  const toggleShowString = () => {
    setShowString(!showString);
    setShowString(false);
  };
  //  Dob change handler accordion//

  return (
    <>
      <section className="signup_section">
        <div className="container">
          <div className="row">
            <div className="col-md-7 ">
              <h2 className="d_name mb38">Kinesin My Health</h2>
              <div className="log_wrap">
                <Formik
                  initialValues={initialValues}
                  onSubmit={handleSubmit}
                  validationSchema={validationSchema}
                >
                  {({ errors, touched, isSubmitting }) => (
                    <Form>
                      <p className="head_para">Patient Details</p>
                      <div className="nameflex">
                        {/* Full Name */}
                        <div className="form-floating mb-3">
                          <Field
                            type="text"
                            name="fullname"
                            className="form-control"
                            id="floatingInput1"
                            placeholder="First Name"
                          />
                          <label for="floatingInput1">Full Name</label>
                          {errors.fullname && touched.fullname && (
                            <div className="errorstext">{errors.fullname}</div>
                          )}
                        </div>
                        {/* Full Name */}
                      </div>

                      {/* DOB  */}
                      <div className="form-floating mb38">
                        {/* Accordion */}
                        <div className="accordion" id="accordionExample">
                          <div className="accordion-item">
                            <h2 className="accordion-header">
                              <button
                                className="accordion-button"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseOne"
                                aria-expanded="true"
                                aria-controls="collapseOne"
                                onClick={toggleShowString}
                              >
                                {showString
                                  ? "Date of Birth"
                                  : selectedDate.toDateString()}
                              </button>
                            </h2>
                            <div
                              id="collapseOne"
                              className=" collapse"
                              data-bs-parent="#accordionExample"
                            >
                              <div className="accordion-body">
                                <Field
                                  name="dateOfBirth"
                                  render={({ field }) => (
                                    <Calendar
                                      {...field}
                                      onChange={handleCalendarChange}
                                      value={selectedDate}
                                    />
                                  )}
                                />
                                {/* <Calendar
                                  onChange={handleCalendarChange}
                                  value={selectedDate}
                                /> */}
                                {errors.dateOfBirth && touched.dateOfBirth && (
                                  <div className="errorstext">
                                    {errors.dateOfBirth}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* Accordion */}
                      </div>
                      {/* DOB  */}

                      <p className="head_para">Address</p>
                      {/* Address Line 1 */}
                      <div className="form-floating mb-3">
                        <Field
                          type="text"
                          name="address"
                          className="form-control"
                          placeholder="First Line"
                          id="floatingInput4"
                        />
                        <label htmlFor="floatingInput4">First Line</label>
                        {errors.address && touched.address && (
                          <div className="errorstext">{errors.address}</div>
                        )}
                      </div>
                      {/* Address Line 1 */}

                      {/* Address Line 2 */}
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
                      {/* Address Line 2 */}

                      {/* Country */}
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
                      {/* Country */}

                      {/* EIR Code */}
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
                      {/* EIR Code */}

                      {/* Clinic */}
                      <div className="form-floating mb38">
                        {/* Accordion */}
                        {/* <div className="accordion" id="accordionExample">
                          <div className="accordion-item">
                            <h2 className="accordion-header">
                              <button
                                className="accordion-button"
                                type="button"
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseTwo"
                                aria-expanded="false"
                                aria-controls="collapseOne"
                              >
                                Select Clinic
                              </button>
                            </h2>
                            <div
                              id="collapseTwo"
                              className=" collapse"
                              data-bs-parent="#accordionExample"
                            >
                              <div className="accordion-body"></div>
                            </div>
                          </div>
                        </div> */}
                        {/* Accordion */}
                        <Select
                          defaultValue={selectedOption}
                          onChange={setSelectedOption}
                          options={options}
                        />


                      </div>
                      {/* Clinic */}

                      {/* Mobile Number */}
                      <div className="form-floating mb-3">
                        <Field
                          type="number"
                          className="form-control"
                          name="mobileNum"
                          placeholder="Mobile Number"
                          id="floatingInput8"
                        />
                        <label for="floatingInput8">Mobile Number</label>
                        {errors.mobileNum && touched.mobileNum && (
                          <div className="errorstext">{errors.mobileNum}</div>
                        )}
                      </div>
                      {/* Mobile Number */}

                      {/* Checkbox */}
                      <div className="form-floating mb38">
                        <div className="form-group">
                          <label className="agree_check">
                            <Field type="checkbox" name="tandc" />
                            <span className="checkmark"></span>
                            <span className="agree_check_txt">
                              Consent to receieve text messages
                            </span>
                          </label>
                          {errors.tandc && touched.tandc && (
                            <div className="errorstext">{errors.tandc}</div>
                          )}
                        </div>
                      </div>
                      {/* Checkbox */}

                      {/* Register Button */}
                      <div className="btnxscenter">
                        <button
                          className="custom_btn login_btn"
                          type="submit"
                          disabled={isSubmitting}
                        >
                          Register
                        </button>
                      </div>
                      {/* Register Button */}
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
            <div className="col-md-5 preletiv">
              <img src={regImg} className="regImg" alt="" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PatientRegistration;
