import React from "react";
import camera from "../../../assets/images/icons/camera.svg";
import deleteIcon from "../../../assets/images/icons/delete.svg";
import ProfileImg from "../../../assets/images/cover/profile.jpg";
import {  Form, FloatingLabel, Image, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { SVGIcons } from "../../../components/Data/SVGIcons";
import CustomDatepicker from "../../../components/CustomDatepicker/CustomDatepicker";
import { Table } from "antd";
import "../YourAppointments/YourAppointments.css";
import "./Profile.css";

export const Profile = () => {
  const dataSource = [
    {
      key: "1",
      name: (
        <>
          <span className="fw-500 text-stratos">Waren Burnish (Son)</span>
        </>
      ),

      date: (
        <>
          <span className="text-manatee fw-500">01-01-2010</span>
        </>
      ),
      gender: (
        <>
          <span className="text-manatee fw-500"> Male</span>
        </>
      ),
      email: (
        <>
          <span className="fw-500 text-manatee"> warenburnish@gmail.com</span>
        </>
      ),
      status: (
        <>
          <span className="d-inline-block text-manatee fw-500 confirm-dot position-relative">
            Confirmed
          </span>
        </>
      ),
      action: (
        <>
          <div className="d-flex action-wrap justify-content-end">
            <Link>{SVGIcons.Edit}</Link>
            <Link>{SVGIcons.Delete}</Link>
          </div>
        </>
      ),
    },
    {
      key: "2",
      name: (
        <>
          <span className="fw-500 text-stratos">Kelvi Burnish (Daughter)</span>
        </>
      ),
      date: (
        <>
          <span className="text-manatee fw-500">01-01-2010</span>
        </>
      ),
      gender: (
        <>
          <span className="text-manatee fw-500"> Female</span>
        </>
      ),
      email: (
        <>
          <span className="fw-500 text-manatee"> kelviburnish@gmail.com</span>
        </>
      ),
      status: (
        <>
          <span className="d-inline-block text-manatee fw-500 confirm-dot position-relative">
            Confirmed
          </span>
        </>
      ),
      action: (
        <>
          <div className="d-flex action-wrap justify-content-end">
            <Link>{SVGIcons.Edit}</Link>
            <Link>{SVGIcons.Delete}</Link>
          </div>
        </>
      ),
    },
  ];

  const columns = [
    { title: "Name", dataIndex: "name", key: "name", width: 300 },
    { title: "Date", dataIndex: "date", key: "date", width: 200 },
    { title: "Gender", dataIndex: "gender", key: "gender", width: 200 },
    { title: "Email", dataIndex: "email", key: "email", width: 400 },
    { title: "Status", dataIndex: "status", key: "status", width: 250 },
    { title: "Action", dataIndex: "action", key: "action" },
  ];
  return (
    <>
      <section>
        <div className="page-title-wrap d-flex align-items-center justify-content-between">
          <h2 className="h2 name fw-600 mb-0">My Profile </h2>
          <div>
            <Button className="custom_btn danger_btn">
              <Image src={deleteIcon} className="me-2" />
              <span> Delete Account</span>
            </Button>
          </div>
        </div>
        <div className="profile-box-wrap dashboard-bg d-flex flex-wrap flex-lg-nowrap">
          <div className="profile-box-img-wrap">
            <div className="upimgbox">
              <Image src={ProfileImg} className="profile-img" />
              <button type="button" className="imgbtnup">
                <img src={camera} alt="" />
              </button>
            </div>
            <h3 className="text-stratos fw-600 mb-0 d-block d-lg-none">James Targaryen</h3>
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
                    <CustomDatepicker
                      name="Date of Birth"
                      format="DD/MM/YYYY"
                    />
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
                <div className="appointments-list-wrapper family-table">
                  <Table
                    dataSource={dataSource}
                    columns={columns}
                    pagination={false}
                    responsive
                    // scroll={{
                    //   x: 1400,
                    // }}
                  />
                </div>
                <div className="add-dependant-link-wrap">
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
