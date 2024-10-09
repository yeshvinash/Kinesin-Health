import React, { useState } from "react";
import { Col, Row, Form, FloatingLabel, Image, Button } from "react-bootstrap";
import { Checkbox, DatePicker } from "antd";
import deleteIcon from "../../../assets/images/icons/delete.svg";
import CustomDatepicker from "../../../components/CustomDatepicker/CustomDatepicker";
import "./Family.css";

const onChange = (e) => {
  console.log(`checked = ${e.target.checked}`);
};
export const Family = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [focused, setFocused] = useState(false);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const onFocusChange = () => {
    setFocused(true);
  };

  const onBlurChange = () => {
    if (!selectedDate) {
      setFocused(false);
    }
  };

  return (
    <>
      <section>
        <div className="page-title-wrap d-flex align-items-center justify-content-between">
          <h2 className="name h2 fw-600 mb-0">My Family</h2>
          <div>
            <Button className="custom_btn danger_btn">
              <Image src={deleteIcon} className="me-2" /> Delete Dependants
            </Button>
          </div>
        </div>
        <div className="profile-box-wrap dashboard-bg">
          <Form className="profile-form">
            <div className="profile-form-wrap">
              <h3 className="h3 fw-600 text-stratos mb-4 pb-2">
                Personal Information
              </h3>
              <div className="personal-info-grid-box">
                <div>
                  <FloatingLabel controlId="floatingSelect" label="Title">
                    <Form.Select aria-label="Floating label select example">
                      <option value="1">Mr</option>
                      <option value="2">Mrs.</option>
                    </Form.Select>
                  </FloatingLabel>
                </div>
                <div>
                  <FloatingLabel controlId="floatingInput" label="First Name">
                    <Form.Control type="text" placeholder="James" />
                  </FloatingLabel>
                </div>
                <div>
                  <FloatingLabel controlId="floatingInput" label="Surname">
                    <Form.Control type="text" placeholder="James" />
                  </FloatingLabel>
                </div>

                <div>
                  <FloatingLabel
                    controlId="floatingSelect"
                    label="Relationship"
                  >
                    <Form.Select aria-label="Floating label select example">
                      <option value="1">Child</option>
                      <option value="2">Mother</option>
                      <option value="3">Spouse</option>
                    </Form.Select>
                  </FloatingLabel>
                </div>
                <div>
                  <FloatingLabel controlId="floatingSelect" label="Gender">
                    <Form.Select aria-label="Floating label select example">
                      <option value="1">Male</option>
                      <option value="2">Female</option>
                      <option value="3">Other</option>
                    </Form.Select>
                  </FloatingLabel>
                </div>
                <div>
                  <CustomDatepicker />
                </div>
                <div>
                  <FloatingLabel controlId="floatingInput" label="Email">
                    <Form.Control
                      type="text"
                      placeholder="jamestargaryen@gmail.com"
                    />
                  </FloatingLabel>
                </div>
                <div>
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Mobile Number"
                  >
                    <Form.Control
                      type="number"
                      placeholder="jamestargaryen@gmail.com"
                    />
                  </FloatingLabel>
                </div>
              </div>
            </div>
            <div className="profile-form-wrap ">
              <h3 className="h3 fw-600 text-stratos mb-4 pb-2">
                Location Details
              </h3>
              <div className="form-grid-box locationbox-wrap">
                <div className="position-relative">
                  <FloatingLabel
                    controlId="floatingInput"
                    label="Quick Add by Eircode"
                  >
                    <Form.Control type="text" placeholder="James" />
                  </FloatingLabel>
                  <span className="form-text-label">or</span>
                </div>
              </div>
              <div>
                <div className="mb-4 pb-3 d-flex justify-content-between align-items-center ">
                  <p className="fw-600 h5 mb-0">Add your address manually</p>
                  <div className="custom-checkbox-wrap">
                    <Checkbox onChange={onChange}>
                      Same as Patient Address
                    </Checkbox>
                  </div>
                </div>
                <div className="form-grid-box">
                  <div>
                    <FloatingLabel controlId="floatingInput" label="First Line">
                      <Form.Control type="text" placeholder="James" />
                    </FloatingLabel>
                  </div>
                  <div>
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Second Line"
                    >
                      <Form.Control type="text" placeholder="Cozway Marina" />
                    </FloatingLabel>
                  </div>
                  <div>
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Third Line "
                    >
                      <Form.Control type="text" placeholder="James" />
                    </FloatingLabel>
                  </div>

                  <div>
                    <FloatingLabel
                      controlId="floatingInput"
                      label="County State"
                    >
                      <Form.Control type="text" placeholder="Ireland" />
                    </FloatingLabel>
                  </div>
                  <div>
                    <FloatingLabel controlId="floatingInput" label="Country">
                      <Form.Control type="text" placeholder="Ireland" />
                    </FloatingLabel>
                  </div>
                  <div>
                    <FloatingLabel controlId="floatingInput" label="Eircode">
                      <Form.Control type="text" placeholder="AB00012" />
                    </FloatingLabel>
                  </div>
                </div>
              </div>
            </div>
            <div class="mt-5 dashboard-btn-wrap">
              <button
                className="custom_btn"
                onClick={(e) => e.preventDefault()}
              >
                Save
              </button>
              <button
                className="custom_btn gray_btn"
                onClick={(e) => e.preventDefault()}
              >
                Cancel
              </button>
            </div>
          </Form>
        </div>
      </section>
    </>
  );
};
