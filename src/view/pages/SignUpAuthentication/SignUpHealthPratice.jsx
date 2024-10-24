import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import axios from "../../../api/axios";
import regImg from "../../../assets/images/signup-authentication-bg.jpg";
import { REGISTER_URL } from "../../../api/Service";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import ProgressStep from "../../../components/ProgressStep";
import { useNavigate } from "react-router-dom";

import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import moment from "moment";
import dayjs, { Dayjs } from "dayjs";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

// Health practice Signup Validation start//
const validationSchema = Yup.object().shape({
  firstname: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("This field is required"),
  lastname: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("This field is required"),
  address: Yup.string().required("This field is required"),
  address2: Yup.string().required("This field is required"),
  // town: Yup.string().required("This field is required"),
  // city: Yup.string().required("This field is required"),
  county: Yup.string(),
  // .required("This field is required"),
  tandc: Yup.boolean().oneOf([true], "You must accept"),
  country: Yup.string().required("This field is required"),
  // eircode: Yup.string().required("This field is required"),
  mobileNum: Yup.string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("Mobile number is required"),
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
// Health practice Signup Validation end//

const formatDob = (dob) => {
  const cleanedValue = dob.replace(/[^\d]/g, ""); // Remove non-numeric characters

  if (cleanedValue.length <= 2) {
    return cleanedValue;
  } else if (cleanedValue.length <= 4) {
    return cleanedValue.replace(/^(\d{2})(\d{0,2})/, "$1/$2");
  } else {
    return cleanedValue.replace(/^(\d{2})(\d{2})(\d{0,4}).*/, "$1/$2/$3");
  }
};

const SignUp = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showString, setShowString] = useState(true);
  // Initial Values Register Form //
  const initialValues = {
    email: "",
    firstname: "",
    lastname: "",
    mobileNum: "",
    password: "",
    tandc: false,
    address: "",
    address2: "",
    town: "",
    city: "",
    country: "",
    eircode: "",
    passwordConfirmation: "",
  };
  // Initial Values Register Form //

  // const [value, setValue] = useState(dayjs(new Date().setMinutes(0)));
  const [value, setValue] = useState();

  const [dob, setDob] = useState(
    moment(new Date(dayjs(value))).format("DD/MM/YYYY")
  );
  const [calendarDate, setCalendarDate] = useState(null);

  // Register form submit handler start//

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    //dateOfBirth: dob ? moment(dob, 'DD/MM/YYYY').format("YYYY-MM-DD") : undefined,

    try {
      const { email, password, firstname, lastname, mobile } = values;
      const response = await axios.post(
        REGISTER_URL,
        {
          email,
          password,
          firstname,
          lastname,
          mobile,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
        }
      );
      resetForm();
      console.log(response?.data);
      console.log(response?.access_token);
      navigate("/");
    } catch (err) {
      console.log(err);
    } finally {
      setSubmitting(false);
    }
  };
  const navigate = useNavigate();
  // const handleSubmit =(value)=>{
  //   console.log(value);
  //   navigate("/signup_two")
  // }
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
  const handleDateChange = (date) => {
    setCalendarDate(date);
    const formattedDate = `${date.getDate()}/${
      date.getMonth() + 1
    }/${date.getFullYear()}`;
    setDob(formattedDate);
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    const formattedInputValue = formatDob(inputValue); // Use the formatDob function
    setDob(formattedInputValue);

    // Parse the formatted input value to create a date object
    const parts = formattedInputValue.split("/");
    if (parts.length === 3) {
      const year = parseInt(parts[2], 10);
      const month = parseInt(parts[1], 10) - 1;
      const day = parseInt(parts[0], 10);
      const date = new Date(year, month, day);

      if (!isNaN(date.getTime())) {
        setCalendarDate(date);
      } else {
        setCalendarDate(null);
      }
    } else {
      setCalendarDate(null);
    }
  };

  return (
    <>
      <section className="signup_section">
        <div className="container containarwhite">
          <div className="row">
            <ProgressStep activeStep={1} />
            <div className="col-md-12">
              <h2 className="d_name mb38">Kinesin My Health</h2>
            </div>
            <div className="col-md-6 ">
              <div className="log_wrap">
                <Formik
                  initialValues={initialValues}
                  onSubmit={handleSubmit}
                  validationSchema={validationSchema}
                >
                  {({ errors, touched, isSubmitting }) => (
                    <Form>
                      <p className="head_para">MyDetails</p>
                      {/* Email */}
                      <div className="form-floating mb-3">
                        <Field
                          type="email"
                          name="email"
                          className="form-control"
                          placeholder="Email"
                          id="floatingInput9"
                        />
                        <label htmlFor="floatingInput9">Email</label>
                        {errors.email && touched.email && (
                          <div className="errorstext">{errors.email}</div>
                        )}
                      </div>
                      {/* Email */}

                      {/* Firstname */}
                      <div className="form-floating mb-3">
                        <Field
                          type="text"
                          name="firstname"
                          className="form-control"
                          placeholder="Firstname"
                          id="floatingInput6"
                        />
                        <label htmlFor="floatingInput9">Firstname</label>
                        {errors.firstname && touched.firstname && (
                          <div className="errorstext">{errors.firstname}</div>
                        )}
                      </div>
                      {/* Firstname */}

                      {/* lastname */}
                      <div className="form-floating mb-3">
                        <Field
                          type="text"
                          name="lastname"
                          className="form-control"
                          placeholder="Lastname"
                          id="floatingInput7"
                        />
                        <label htmlFor="floatingInput9">Lastname</label>
                        {errors.lastname && touched.lastname && (
                          <div className="errorstext">{errors.lastname}</div>
                        )}
                      </div>
                      {/* lastname */}

                      {/* <label htmlFor="">Birthdate</label> */}
                      <div className="form-floating mb-3">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                          <DemoContainer
                            components={["DatePicker", "DatePicker"]}
                            // placeholder="BirthDate"
                          >
                            <DatePicker
                              format="DD/MM/YYYY"
                              label="DOB"
                              value={value}
                              // onChange={(newValue) => setValue(newValue)}
                              sx={{ width: "100%" }}
                              // class="form-control"
                              onChange={(newValue) => {
                                setValue(newValue);
                                var d = new Date(dayjs(newValue));
                                setDob(moment(d).format("DD/MM/YYYY"));
                              }}
                            />
                          </DemoContainer>
                        </LocalizationProvider>
                      </div>

                      {/* DOB  */}
                      {/* vvv : {dob} */}
                      {/* <div className="form-floating mb38">
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
                                <input className="datinput"
                                  type="text"
                                  placeholder="DD/MM/YYYY"
                                  value={dob}
                                  onChange={handleInputChange}
                                />
                              </button>
                            </h2>
                            <div
                              id="collapseOne"
                              className=" collapse"
                              data-bs-parent="#accordionExample"
                            >
                              <div className="accordion-body">
                                <Calendar
                                  value={calendarDate} onChange={handleDateChange}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div> */}
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
                        <label htmlFor="floatingInput4">Address 1</label>
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
                        <label htmlFor="floatingInput5">Adddess 2</label>
                        {errors.address2 && touched.address2 && (
                          <div className="errorstext">{errors.address2}</div>
                        )}
                      </div>

                      {/* Town */}
                      <div className="form-floating mb-3">
                        <Field
                          type="text"
                          name="town"
                          className="form-control"
                          placeholder="Town"
                          id="floatingInput5"
                        />
                        <label htmlFor="floatingInput5">Town</label>
                        {errors.town && (
                          // && touched.town
                          <div className="errorstext">{errors.town}</div>
                        )}
                      </div>

                      {/* City */}
                      <div className="form-floating mb-3">
                        <Field
                          type="text"
                          name="city"
                          className="form-control"
                          placeholder="City"
                          id="floatingInput5"
                        />
                        <label htmlFor="floatingInput5">City</label>
                        {errors.city && (
                          // && touched.city
                          <div className="errorstext">{errors.city}</div>
                        )}
                      </div>

                      {/* County */}
                      <div className="form-floating mb-3">
                        <Field
                          type="text"
                          name="county"
                          className="form-control"
                          placeholder="County"
                          id="floatingInput5"
                        />
                        <label htmlFor="floatingInput5">County</label>
                        {errors.county && (
                          // && touched.county
                          <div className="errorstext">{errors.county}</div>
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
                        <label htmlFor="floatingInput6">Country</label>
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
                        <label htmlFor="floatingInput7">EirCode</label>
                        {errors.eircode && (
                          // && touched.eircode
                          <div className="errorstext">{errors.eircode}</div>
                        )}
                      </div>
                      {/* EIR Code */}

                      {/* mobile */}
                      <div className="form-floating mb-3 mobile-input">
                        <Field
                          type="tel"
                          name="mobileNum"
                          className="form-control"
                          placeholder="+44 0203 0484377"
                          id="floatingInput7"
                        />
                        <label htmlFor="floatingInput9">Mobile Number</label>
                        {errors.mobileNum && touched.mobileNum && (
                          <div className="errorstext">{errors.mobileNum}</div>
                        )}
                      </div>

                      {/* Mobile */}

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

                      {/* Email */}
                      <p className="head_para">MyAccount</p>
                      <div className="form-floating mb-3">
                        <Field
                          type="email"
                          name="email"
                          className="form-control"
                          placeholder="Email"
                          id="floatingInput9"
                        />
                        <label htmlFor="floatingInput9">Email</label>
                        {errors.email && touched.email && (
                          <div className="errorstext">{errors.email}</div>
                        )}
                      </div>
                      {/* Email */}

                      {/* Password */}
                      <div className="form-floating mb-3">
                        <Field
                          type="password"
                          name="password"
                          className="form-control"
                          placeholder="Password"
                          id="floatingInput10"
                        />
                        <label htmlFor="floatingInput10">Password</label>
                        {errors.password && touched.password && (
                          <div className="errorstext">{errors.password}</div>
                        )}
                      </div>
                      {/* Password */}

                      {/* Confirm Password */}
                      <div className="form-floating mb38">
                        <Field
                          type="password"
                          name="passwordConfirmation"
                          className="form-control"
                          placeholder="Confirm password"
                          id="floatingInput11"
                        />

                        <label htmlFor="floatingInput11">
                          Confirm password
                        </label>
                        {errors.passwordConfirmation &&
                          touched.passwordConfirmation && (
                            <div className="errorstext">
                              {errors.passwordConfirmation}
                            </div>
                          )}
                      </div>
                      {/* Confirm Password */}

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
            <div className="col-md-6 preletiv">
              <div className="signup-authimg-wrapper">
                <img src={regImg} className="regImg2" alt="" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignUp;
