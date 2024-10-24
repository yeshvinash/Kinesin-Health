import React, { useState } from "react";
import regImg from "../../../assets/images/image 56.png";
import edit_img from "../../../assets/images/edit_img.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addProfession,
  removeprofession,
} from "../../../redux/service/ProfessionSlice";
import Select from "react-select";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { setAddress, setCity, setCountry, setZip } from "../../../redux/service/AddressSlice";

const options = [
  {
    id: 1,
    label: "Dr. Noel Cassidy",
    image: require("../../../assets/images/dr1.png"),
  },
  {
    id: 2,
    label: "Doctor James",
    image: require("../../../assets/images/dr2.png"),
  },
  {
    id: 3,
    label: "Doctor Mary",
    image: require("../../../assets/images/dr3.png"),
  },
  {
    id: 4,
    label: "Dublin Dental",
    image: require("../../../assets/images/dr1.png"),
  },
];

const validationSchema = Yup.object().shape({
  fullname: Yup.string()
    .min(2, "Too Short!")
    .max(150, "Too Long!")
    .required("This field is required"),
  country: Yup.string().required("This field is required"),
  city: Yup.string().required("This field is required"),
  zipcode: Yup.string().required("This field is required"),
  address: Yup.string().required("This field is required"),
  dateOfBirth: Yup.date().required("Date of Birth is required"),
  textareaValue: Yup.string().required("This field is required"),
});

const PatientInfo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Data display operator from previous page//
  const selectedDate = useSelector((state) => state.dateTime.date);
  const selectedTime = useSelector((state) => state.dateTime.time);
  const selectedServices = useSelector(
    (state) => state.service.selectedServices
  );
  const selectedProfessional = useSelector(
    (state) => state.profession.selectedProfessional
  );
  
  // Data display operator from previous page//

  // Dropdown section//
  const [isOpen, setIsOpen] = useState(false);
  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };
  const [selectedOption, setSelectedOption] = useState(null);
  const handleOptionClick = (option) => {
    setSelectedOption(option.label);
    dispatch(removeprofession());

    dispatch(
      addProfession({
        name: option.label,
        image: option.image,
      })
    );
    setIsOpen(false);
  };
  // Dropdown section//
  const [selectedDateDob, setSelectedDateDob] = useState(new Date());

  const initialValues = {
    fullname: "",
    address: "",
    country: "",
    city: "",
    zipcode: "",
    dateOfBirth: selectedDateDob,
    textareaValue: "",
  };

  const handleSubmit = (value) => {
    dispatch(setAddress(value.address))
    dispatch(setCity(value.city))
    dispatch(setZip(value.zipcode))
    dispatch(setCountry(value.country))
    console.log(value);
    navigate("/payement");
  };
  // Register form submit handler end//
  // For accordian in DOB//
  const [showString, setShowString] = useState(true);

  //  Dob change handler accordion//
  const handleCalendarChange = (date) => {
    setSelectedDateDob(date);
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
              <h2 className="d_name mb38">Rathgar Dental</h2>
              <div className="log_wrap">
                <ul className="editdoct_list">
                  <li>
                    {selectedProfessional.map((profession, i) => (
                      <>
                        <div className="editdoct_img" key={profession.name}>
                          <img src={profession.image} alt="" />
                        </div>
                        <div className="editdetails">
                          <h5>{profession.name}</h5>
                          {selectedServices.map((service, i) => (
                            <h6>{service}</h6>
                          ))}
                        </div>
                      </>
                    ))}
                    <a
                      href="#"
                      className="imgedit dropdown-toggle"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <img src={edit_img} alt="" onClick={handleButtonClick} />

                      <ul className={`dropdown-menu ${isOpen ? "show" : ""}`}>
                        {options.map((item, i) => (
                          <li key={i}>
                            <a
                              className="dropdown-item"
                              onClick={() => handleOptionClick(item)}
                            >
                              <p>{item.label}</p>
                              <img src={item.image} />
                            </a>
                          </li>
                        ))}
                      </ul>
                    </a>
                  </li>

                  <li>
                    <div className="editdetails">
                      <h4>Your Scheduled date and time</h4>
                      <h3>
                        {selectedDate} {selectedTime}
                      </h3>
                    </div>
                    <a href={(e)=>e.preventDefault() } className="imgedit">
                      <img src={edit_img} alt="" />
                    </a>
                  </li>
                </ul>
                <p className="head_para">Patient Info</p>
                <div className="add_new_form">
                  <Formik
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                    validationSchema={validationSchema}
                  >
                    {({ errors, touched, isSubmitting }) => (
                      <Form>
                        {/* Full name */}
                        <div className="form-floating mb-3">
                          <Field
                            type="text"
                            name="fullname"
                            className="form-control"
                            id="floatingInput1"
                            placeholder="Cardholder"
                          />
                          <label for="floatingInput1">Full Name</label>
                          {errors.fullname && touched.fullname && (
                            <div className="errorstext">{errors.fullname}</div>
                          )}
                        </div>
                         {/* Full name */}

                         {/* Member */}
                        <div className="form-floating mb-3">
                          <Select
                            defaultValue={selectedOption}
                            onChange={setSelectedOption}
                            options={options}
                          />
                        </div>
                        {/* Member */}
                        
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
                                    : selectedDateDob.toDateString()}
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
                                        value={selectedDateDob}
                                      />
                                    )}
                                  />
                                  {/* <Calendar
                                  onChange={handleCalendarChange}
                                  value={selectedDate}
                                /> */}
                                  {/* {errors.dateOfBirth && touched.dateOfBirth && (
                                  <div className="errorstext">
                                    {errors.dateOfBirth}
                                  </div>
                                )} */}
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* Accordion */}
                        </div>

                        {/* Address */}
                        <div className="form-floating mb-3">
                          <Field
                            type="text"
                            name="address"
                            className="form-control"
                            placeholder="First Line"
                            id="floatingInput4"
                          />
                          <label htmlFor="floatingInput4">Address</label>
                          {errors.address && touched.address && (
                            <div className="errorstext">{errors.address}</div>
                          )}
                        </div>
                        {/* Address */}

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

                        {/* City */}
                        <div className="form-floating mb-3">
                          <Field
                            type="text"
                            name="city"
                            className="form-control"
                            placeholder="Country"
                            id="floatingInput6"
                          />
                          <label for="floatingInput6">City</label>
                          {errors.city && touched.city && (
                            <div className="errorstext">{errors.city}</div>
                          )}
                        </div>
                        {/* City */}

                        {/* Textarea  */}
                        <div className="form-floating mb-3">
                          <Field
                            type="text"
                            name="zipcode"
                            className="form-control"
                            placeholder="EirCode"
                            id="floatingInput7"
                          />
                          <label for="floatingInput7">Zip code</label>
                          {errors.zipcode && touched.zipcode && (
                            <div className="errorstext">{errors.zipcode}</div>
                          )}
                        </div>
                        <div className="form-floating mb-3">
                          <Field
                            as="textarea"
                            type="text"
                            name="textareaValue"
                            className="form-control heaighttextaria"
                            placeholder="EirCode"
                            id="floatingInput7"
                          />
                          <label for="floatingInput7">Reason for appontment</label>
                          {errors.textareaValue && touched.textareaValue && (
                            <div className="errorstext">{errors.textareaValue}</div>
                          )}
                        </div>
                        {/* Textarea */}
                        
                        <div className="btnxscenter">
                          <button
                            className="custom_btn login_btn"
                            type="submit"
                            disabled={isSubmitting}
                          >
                            Save
                          </button>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
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

export default PatientInfo;
