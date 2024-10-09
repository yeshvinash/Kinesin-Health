import React from "react";
import camera from "../../../assets/images/icons/camera.svg";
import deleteIcon from "../../../assets/images/icons/delete.svg";
import ProfileImg from "../../../assets/images/cover/profile.jpg";
import { Col, Row, Form, FloatingLabel, Image, Button } from "react-bootstrap";
import "./Profile.css";
import { Link } from "react-router-dom";
import { SVGIcons } from "../../../components/Data/SVGIcons";
import CustomDatepicker from "../../../components/CustomDatepicker/CustomDatepicker";

export const Profile = () => {
  return (
    <>
      <section>
        <div className="page-title-wrap d-flex align-items-center justify-content-between">
          <h2 className="h2 name fw-600 mb-0">My Profile </h2>
          <div>
            <Button className="custom_btn danger_btn">
              <Image src={deleteIcon} className="me-2" /> Delete Account
            </Button>
          </div>
        </div>
        <div className="profile-box-wrap dashboard-bg d-flex">
          <div className="profile-box-img-wrap">
            <div className="upimgbox">
              <Image src={ProfileImg} />
              <button type="button" className="imgbtnup">
                <img src={camera} alt="" />
              </button>
            </div>
          </div>
          <div className="profile-form-content-wrap">
            <Form className="profile-form">
              <div className="profile-form-wrap">
                <h3 className=" h3 fw-600 text-stratos mb-4 pb-2">
                  Your Details
                </h3>
                <div className="form-grid-box">
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
                    <Form.Select aria-label="Default select example">
                      <option>Gender</option>
                      <option value="1">Male</option>
                      <option value="2">Female</option>
                      <option value="3">Other</option>
                    </Form.Select>
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
              <div className="profile-form-wrap">
                <h3 className="h3 fw-600 text-stratos mb-4 pb-2">
                  Your Address
                </h3>
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
                      <Form.Control type="text" placeholder="James" />
                    </FloatingLabel>
                  </div>
                  <div>
                    <FloatingLabel controlId="floatingInput" label="Country">
                      <Form.Control type="text" placeholder="James" />
                    </FloatingLabel>
                  </div>
                  <div>
                    <FloatingLabel controlId="floatingInput" label="Eircode">
                      <Form.Control type="text" placeholder="Eircode" />
                    </FloatingLabel>
                  </div>
                </div>
              </div>
              <div className="profile-form-wrap">
                <h3 className="h3 fw-600 text-stratos mb-4 pb-2">
                  Your Practice
                </h3>
                <div className="form-grid-box">
                  <div>
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Current Practice"
                    >
                      <Form.Control
                        type="text"
                        placeholder="Clarius Health - Camden Street, Dublin, Ireland  "
                      />
                    </FloatingLabel>
                  </div>
                </div>
              </div>

              <div className="profile-form-wrap">
                <h3 className="h3 fw-600 text-stratos mb-4 pb-2">My Family</h3>
                <div>
                  <Link to="/family" className="add-dependant-link">
                    {SVGIcons.PlusCircle}Add Family Member
                  </Link>
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
        </div>
      </section>
    </>
  );
};
