import React from "react";
import { Accordion, Button, Form, Image } from "react-bootstrap";
import visit from "../../../assets/images/icons/visit.svg";
import Male from "../../../assets/images/icons/male.svg";
import Diabeties from "../../../assets/images/icons/diabeties.svg";
import PatientImg from "../../../assets/images/cover/patient.jpg";
import PlusIcon from "../../../assets/images/icons/PlusIcon.svg";
import Cancel from "../../../assets/images/icons/cancel.svg";
import Checkmark from "../../../assets/images/icons/checkmark.svg";
import EditIcon from "../../../assets/images/icons/editicon.svg";
import DeleteIcon from "../../../assets/images/icons/deleteicon.svg";
import Avatar3 from "../../../assets/images/icons/avatar3.png";
import Flag from "../../../assets/images/icons/flag.svg";
import { Link } from "react-router-dom";
import hamburger from "../../../assets/images/icons/hamburger.png";
import { SVGIcons } from "../../../components/Data/SVGIcons";
import { Checkbox, Tabs } from "antd";
import "./PatientDetail.css";

const PatientDetail = () => {
  const documentDataItems = [
    {
      key: "1",
      label: (
        <>
          <div className="d-flex align-items-center">
            <span className="icon-wrap purple">{SVGIcons.Details}</span>
            <span>Notes</span>
          </div>
        </>
      ),
      children: (
        <>
          <div className="visit-history">
            <div className="d-flex mt-4 pt-3 flex-wrap flex-md-nowrap">
              <div className="visit-history-content-wrap">
                <p className=" fw-500">
                  Contrary to popular belief, Lorem Ipsum is not simpandom text.
                  It has roots in a piece of classical Latiniter nature from 45
                  BC, ma king it over 2000 years oldIt has roots in a piece of
                  classical Latin liter.
                </p>
                <ul className="p-0">
                  <li>Neque porro quisquat qui dolorem</li>
                  <li>Randomised words which don't look</li>
                </ul>
                <p className="mb-0 fw-500">
                  It has roots in a piece of classical Latin liter ature from 45
                  BCIt has roots.
                </p>
                <div className="flex-shrink-0 d-block d-md-none">
                  <Button className="custom_btn save-note">Save Note</Button>
                </div>
              </div>
              <div className="flex-shrink-0 d-none d-md-block">
                <Button className="custom_btn save-note">Save Note</Button>
              </div>
            </div>
            <div className="custom-accordion-wrapper">
              <Accordion flush>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>
                    <div className="d-flex align-items-center mb-3 accordion-header-title-wrap">
                      <span className="header-title text-ellipsis">
                        {" "}
                        Consultation - Physio Paul
                      </span>
                      <div className="d-none d-sm-block flex-shrink-0">
                        <span className="label-wrap">Dec 2022</span>
                      </div>
                      <div className="flex-shrink-0">
                        <span className="text-manatee fw-500 small-label d-inline-block ms-4 ps-2">
                          9:47 PM
                        </span>
                      </div>
                    </div>
                    <p className="short-desc fw-500 text-manatee mb-0 small">
                      Pain In left hand knuckles & Thumb Blood work showed
                      Anti-cyclic citrullinated Peptide Pain In left hand
                    </p>
                    <div className="d-block d-sm-none">
                      <span className="label-wrap">Dec 2022</span>
                    </div>
                  </Accordion.Header>

                  <Accordion.Body>
                    Pain In left hand knuckles & Thumb Blood work showed
                    Anti-cyclic citrullinated Peptide Pain In left hand knuckles
                    & Thumb Blood work showed Anti-cyclic citrullinated Peptide
                    Pain In left hand
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>
                    <div className="d-flex align-items-center mb-3 accordion-header-title-wrap">
                      <span className="header-title text-ellipsis">
                        {" "}
                        Consultation - Physio Paul
                      </span>
                      <div className="d-none d-sm-block flex-shrink-0">
                        <span className="label-wrap">Dec 2022</span>
                      </div>
                      <div className="flex-shrink-0">
                        <span className="text-manatee fw-500 small-label d-inline-block ms-4 ps-2">
                          9:47 PM
                        </span>
                      </div>
                    </div>
                    <p className="short-desc fw-500 text-manatee mb-0 small">
                      Pain In left hand knuckles & Thumb Blood work showed
                      Anti-cyclic citrullinated Peptide Pain In left hand
                    </p>
                    <div className="d-block d-sm-none">
                      <span className="label-wrap">Dec 2022</span>
                    </div>
                  </Accordion.Header>

                  <Accordion.Body>
                    {/* <p> */}
                    Pain In left hand knuckles & Thumb Blood work showed
                    Anti-cyclic citrullinated Peptide Pain In left hand Pain In
                    left hand knuckles & Thumb Blood work showed Anti-cyclic
                    citrullinated Peptide Pain In left hand
                    {/* </p> */}
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                  <Accordion.Header>
                    <div className="d-flex align-items-center mb-3 accordion-header-title-wrap">
                      <span className="header-title text-ellipsis">
                        {" "}
                        Consultation - Physio Paul
                      </span>
                      <div className="d-none d-sm-block flex-shrink-0">
                        <span className="label-wrap">Dec 2022</span>
                      </div>
                      <div className="flex-shrink-0">
                        <span className="text-manatee fw-500 small-label d-inline-block ms-4 ps-2">
                          9:47 PM
                        </span>
                      </div>
                    </div>
                    <p className="short-desc fw-500 text-manatee mb-0 small">
                      Pain In left hand knuckles & Thumb Blood work showed
                      Anti-cyclic citrullinated Peptide Pain In left hand
                    </p>
                    <div className="d-block d-sm-none">
                      <span className="label-wrap">Dec 2022</span>
                    </div>
                  </Accordion.Header>

                  <Accordion.Body>
                    {/* <p> */}
                    Pain In left hand knuckles & Thumb Blood work showed
                    Anti-cyclic citrullinated Peptide Pain In left hand Pain In
                    left hand knuckles & Thumb Blood work showed Anti-cyclic
                    citrullinated Peptide Pain In left hand
                    {/* </p> */}
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
          </div>
        </>
      ),
    },
    {
      key: "2",
      label: (
        <>
          <div className="d-flex align-items-center">
            <span className="icon-wrap pink">{SVGIcons.Details}</span>
            <span>Visit History</span>
          </div>
        </>
      ),
      children: (
        <>
          <div className="custom-accordion-wrapper ">
            <Accordion flush>
              <Accordion.Item eventKey="0">
                <Accordion.Header>
                  <div className="d-flex align-items-center mb-3 accordion-header-title-wrap">
                    <span className="header-title">
                      {" "}
                      Consultation - Physio Paul
                    </span>
                    <div className="d-none d-sm-block">
                      <span className="label-wrap">Dec 2022</span>
                    </div>
                    <div className="flex-shrink-0">
                      <span className="text-manatee fw-500 small-label d-inline-block ms-4 ps-2">
                        9:47 PM
                      </span>
                    </div>
                  </div>
                  <p className="short-desc fw-500 text-manatee mb-0 small">
                    Pain In left hand knuckles & Thumb Blood work showed
                    Anti-cyclic citrullinated Peptide Pain In left hand
                  </p>
                  <div className="d-block d-sm-none">
                    <span className="label-wrap">Dec 2022</span>
                  </div>
                </Accordion.Header>

                <Accordion.Body>
                  Pain In left hand knuckles & Thumb Blood work showed
                  Anti-cyclic citrullinated Peptide Pain In left hand knuckles &
                  Thumb Blood work showed Anti-cyclic citrullinated Peptide Pain
                  In left hand
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>
                  <div className="d-flex align-items-center mb-3 accordion-header-title-wrap">
                    <span className="header-title">
                      {" "}
                      Consultation - Physio Paul
                    </span>
                    <div className="d-none d-sm-block">
                      <span className="label-wrap">Dec 2022</span>
                    </div>
                    <div className="flex-shrink-0">
                        <span className="text-manatee fw-500 small-label d-inline-block ms-4 ps-2">
                          9:47 PM
                        </span>
                      </div>
                  </div>
                  <p className="short-desc fw-500 text-manatee mb-0 small">
                    Pain In left hand knuckles & Thumb Blood work showed
                    Anti-cyclic citrullinated Peptide Pain In left hand
                  </p>
                  <div className="d-block d-sm-none">
                    <span className="label-wrap">Dec 2022</span>
                  </div>
                </Accordion.Header>

                <Accordion.Body>
                  {/* <p> */}
                  Pain In left hand knuckles & Thumb Blood work showed
                  Anti-cyclic citrullinated Peptide Pain In left hand Pain In
                  left hand knuckles & Thumb Blood work showed Anti-cyclic
                  citrullinated Peptide Pain In left hand
                  {/* </p> */}
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2">
                <Accordion.Header>
                  <div className="d-flex align-items-center mb-3 accordion-header-title-wrap">
                    <span className="header-title">
                      {" "}
                      Consultation - Physio Paul
                    </span>
                    <div className="d-none d-sm-block">
                      <span className="label-wrap">Dec 2022</span>
                    </div>
                    <div className="flex-shrink-0">
                        <span className="text-manatee fw-500 small-label d-inline-block ms-4 ps-2">
                          9:47 PM
                        </span>
                      </div>
                  </div>
                  <p className="short-desc fw-500 text-manatee mb-0 small">
                    Pain In left hand knuckles & Thumb Blood work showed
                    Anti-cyclic citrullinated Peptide Pain In left hand
                  </p>
                  <div className="d-block d-sm-none">
                    <span className="label-wrap">Dec 2022</span>
                  </div>
                </Accordion.Header>

                <Accordion.Body>
                  {/* <p> */}
                  Pain In left hand knuckles & Thumb Blood work showed
                  Anti-cyclic citrullinated Peptide Pain In left hand Pain In
                  left hand knuckles & Thumb Blood work showed Anti-cyclic
                  citrullinated Peptide Pain In left hand
                  {/* </p> */}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </div>
        </>
      ),
    },
    {
      key: "3",
      label: (
        <>
          <div className="d-flex align-items-center">
            <span className="icon-wrap blue">{SVGIcons.Details}</span>
            <span>All Documents</span>
          </div>
        </>
      ),
      children: (
        <>
          <div className="all-documents-link-wrap">
            <div className="documents-link-wrap documents-list-items-wrap">
              <Link className="d-flex align-items-center justify-content-between">
                <span className="text-ellipsis me-3">
                  MRI Back - Mary Kenny
                </span>
                {SVGIcons.Documents}
              </Link>
              <Link className="d-flex align-items-center justify-content-between">
                <span className="text-ellipsis me-3">
                  Patient submitted photo - Mary Kenny
                </span>
                {SVGIcons.Documents}
              </Link>
              <Link className="d-flex align-items-center justify-content-between">
                <span className="text-ellipsis me-3">
                  GP Referral Letter - Mary Kenny
                </span>
                {SVGIcons.Documents}
              </Link>
              <Link className="d-flex align-items-center justify-content-between">
                <span className="text-ellipsis me-3">
                  Patient submitted photo
                </span>
                {SVGIcons.Documents}
              </Link>
            </div>
          </div>
        </>
      ),
    },
  ];

  return (
    <div className="dashboard-bg patient-detail">
      <h2 className="h2 fw-600 text-stratos page-title">
        Patient Detail Summary
      </h2>
      <div className="patient-detail-cardbox-container-1">
        <div className="patient-detail-card bg patient-detail-summary-wrap">
          <div className="patient-header-wrap">
            <div className="d-flex align-items-center flex-sm-nowrap flex-wrap justify-content-center justify-content-sm-start">
              <div className="patient-profile-img-wrap flex-shrink-0 ">
                <Image src={PatientImg} />
              </div>
              <div className="patient-header-content-wrap">
                <h3 className="h3 fw-600 text-ellipsis">James Targaryen</h3>
                <span className="d-inline-block text-manatee fw-500 p small mb-3 pb-1">
                  Check in : 21 August 2020, 12:45 PM
                </span>
                <div className="d-flex align-items-center justify-content-center justify-content-sm-start">
                  <div className="d-flex align-items-center patient-summary-wrap">
                    <span className="patient-header-icon-wrap">
                      <Image src={Male} alt="category" />
                    </span>
                    <h6 className="h6 text-stratos fw-500 mb-0 text-break">
                      Male
                    </h6>
                  </div>
                  <div className="d-flex align-items-center patient-summary-wrap">
                    <span className="patient-header-icon-wrap">
                      <Image src={Diabeties} alt="category" />
                    </span>
                    <h6 className="h6 text-stratos fw-500 mb-0 text-break">
                      Diabeties
                    </h6>
                  </div>
                </div>
              </div>
              <div className="flex-shrink-0  d-flex flex-sm-column ms-sm-auto  mt-5 mt-md-0">
                <Button className="custom_btn">Send SMS</Button>
                <Button className="custom_btn">Add To Task</Button>
              </div>
            </div>
          </div>
          <div className="patient-bottom-wrap d-flex flex-wrap">
            <div className="patient-left-description position-relative">
              <div className="patient-block-wrap">
                <span className="text-manatee fw-500 d-inline-block">
                  Phone no:
                </span>
                <h6 className="h6 text-stratos fw-500 mb-0">0871234567</h6>
              </div>
              <div className="patient-block-wrap">
                <span className="text-manatee fw-500 d-inline-block">
                  Address:
                </span>
                <h6 className="h6 text-stratos fw-500 mb-0 text-ellipsis">
                  42 Rosemount Drive, Dublin 18
                </h6>
              </div>
              <div className="patient-block-wrap">
                <span className="text-manatee fw-500 d-inline-block">
                  Private:
                </span>
                <h6 className="h6 text-stratos fw-500 mb-0 text-ellipsis">
                  Medical card no. 4326328
                </h6>
              </div>
            </div>
            <div className="patient-right-description">
              <div className="patient-block-wrap">
                <span className="text-manatee fw-500 d-inline-block">
                  Opportunities:
                </span>
                <h6 className="h6 text-stratos fw-500 mb-0 text-ellipsis">
                  Vaccine, COVID-19 Booster
                </h6>
              </div>
              <div className="patient-block-wrap">
                <span className="text-manatee fw-500 d-inline-block">
                  Upcoming appointments:
                </span>
                <h6 className="h6 text-stratos fw-500 mb-0 ">24 March 2023</h6>
              </div>
            </div>
          </div>
        </div>
        <div className="patient-detail-card bg patients-tasks-wrap">
          <div className="d-flex align-items-center justify-content-between documents-title-wrap">
            <h4 className="h4 fw-600 text-stratos mb-0">Patients Tasks</h4>
            <Button className="transaparent-btn d-flex align-items-center justify-content-end">
              <span className="d-inline-block me-3">Add new</span>
              <Image src={PlusIcon} />
            </Button>
          </div>
          <div className="documents-link-wrap">
            <Link className="d-flex align-items-center justify-content-between">
              <span className=" me-3 text-ellipsis">
                Appointment Scheduling
              </span>
              <span className="flex-shrink-0">
                <Image src={EditIcon} className="me-3" />
                <Image src={DeleteIcon} />
              </span>
            </Link>
            <Link className="d-flex align-items-center justify-content-between">
              <span className=" me-3 text-ellipsis">Medication Reminder</span>
              <span className="flex-shrink-0">
                <Image src={EditIcon} className="me-3" />
                <Image src={DeleteIcon} />
              </span>
            </Link>
            <Link className="d-flex align-items-center justify-content-between">
              <span className=" me-3 text-ellipsis">Health Tracker Input</span>
              <span className="flex-shrink-0">
                <Image src={EditIcon} className="me-3" />
                <Image src={DeleteIcon} />
              </span>
            </Link>
            <Link className="d-flex align-items-center justify-content-between">
              <span className=" me-3 text-ellipsis">
                Appointment Scheduling
              </span>
              <span className="flex-shrink-0">
                <Image src={EditIcon} className="me-3" />
                <Image src={DeleteIcon} />
              </span>
            </Link>
            <Link className="d-flex align-items-center justify-content-between">
              <span className=" me-3 text-ellipsis">Medication Reminder</span>
              <span className="flex-shrink-0">
                <Image src={EditIcon} className="me-3" />
                <Image src={DeleteIcon} />
              </span>
            </Link>
            <Link className="d-flex align-items-center justify-content-between">
              <span className=" me-3 text-ellipsis">Health Tracker Input</span>
              <span className="flex-shrink-0">
                <Image src={EditIcon} className="me-3" />
                <Image src={DeleteIcon} />
              </span>
            </Link>
            <Link className="d-flex align-items-center justify-content-between">
              <span className=" me-3 text-ellipsis">
                Appointment Scheduling
              </span>
              <span className="flex-shrink-0">
                <Image src={EditIcon} className="me-3" />
                <Image src={DeleteIcon} />
              </span>
            </Link>
            <Link className="d-flex align-items-center justify-content-between">
              <span className=" me-3 text-ellipsis">Medication Reminder</span>
              <span className="flex-shrink-0">
                <Image src={EditIcon} className="me-3" />
                <Image src={DeleteIcon} />
              </span>
            </Link>
            <Link className="d-flex align-items-center justify-content-between">
              <span className=" me-3 text-ellipsis">Health Tracker Input</span>
              <span className="flex-shrink-0">
                <Image src={EditIcon} className="me-3" />
                <Image src={DeleteIcon} />
              </span>
            </Link>
          </div>
        </div>
        <div className="patient-detail-card bg">
          <div className="d-flex align-items-center justify-content-between documents-title-wrap">
            <h4 className="h4 fw-600 text-stratos mb-0">Payments</h4>
            <Button className="transaparent-btn d-flex align-items-center justify-content-end">
              <span className="d-inline-block me-3">Add new</span>
              <Image src={PlusIcon} />
            </Button>
          </div>
          <div className="patient-payments-details-wrap">
            <div className="d-flex justify-content-between patient-payments-details-item">
              <div className="d-flex align-items-center consultation-wrap">
                <span className="icon-wrap success flex-shrink-0 me-3">
                  <Image src={Checkmark} />
                </span>
                <div>
                  <h6 className="small text-black fw-500 mb-0 text-break d-block">
                    Consultation
                  </h6>
                  <h6 className="small text-manatee mb-0 fw-500">12/1/22</h6>
                </div>
              </div>
              <div>
                <span className="number text-decoration-underline">€65</span>
              </div>
              <div className="custom-checkbox-wrap ">
                <Checkbox />
              </div>
            </div>
            <div className="d-flex justify-content-between patient-payments-details-item">
              <div className="d-flex align-items-center consultation-wrap">
                <span className="icon-wrap cancel flex-shrink-0 me-3">
                  <Image src={Cancel} />
                </span>
                <div>
                  <h6 className="small text-black fw-500 mb-0 text-break d-block">
                    Consultation
                  </h6>
                  <h6 className="small text-manatee mb-0 fw-500">12/1/22</h6>
                </div>
              </div>
              <div>
                <span className="number text-decoration-underline">€65</span>
              </div>
              <div className="custom-checkbox-wrap ">
                <Checkbox />
              </div>
            </div>
            <div className="d-flex justify-content-between patient-payments-details-item">
              <div className="d-flex align-items-center consultation-wrap">
                <span className="icon-wrap success flex-shrink-0 me-3">
                  <Image src={Checkmark} />
                </span>
                <div>
                  <h6 className="small text-black fw-500 mb-0 text-break d-block">
                    Consultation
                  </h6>
                  <h6 className="small text-manatee mb-0 fw-500">12/1/22</h6>
                </div>
              </div>
              <div>
                <span className="number text-decoration-underline">€65</span>
              </div>
              <div className="custom-checkbox-wrap ">
                <Checkbox />
              </div>
            </div>
            <div className="d-flex justify-content-between patient-payments-details-item">
              <div className="d-flex align-items-center consultation-wrap">
                <span className="icon-wrap cancel flex-shrink-0 me-3">
                  <Image src={Cancel} />
                </span>
                <div>
                  <h6 className="small text-black fw-500 mb-0 text-break d-block">
                    Consultation
                  </h6>
                  <h6 className="small text-manatee mb-0 fw-500">12/1/22</h6>
                </div>
              </div>
              <div>
                <span className="number text-decoration-underline">€65</span>
              </div>
              <div className="custom-checkbox-wrap ">
                <Checkbox />
              </div>
            </div>
            <div className="d-flex justify-content-between patient-payments-details-item">
              <div className="d-flex align-items-center consultation-wrap">
                <span className="icon-wrap success flex-shrink-0 me-3">
                  <Image src={Checkmark} />
                </span>
                <div>
                  <h6 className="small text-black fw-500 mb-0 text-break d-block">
                    Consultation
                  </h6>
                  <h6 className="small text-manatee mb-0 fw-500">12/1/22</h6>
                </div>
              </div>
              <div>
                <span className="number text-decoration-underline">€65</span>
              </div>
              <div className="custom-checkbox-wrap ">
                <Checkbox />
              </div>
            </div>
          </div>
          <div className="amount-input-wrap position-relative">
            <Form.Control type="text" placeholder="€ Enter Amount" />
            <Button className="custom_btn">Change Card</Button>
          </div>
        </div>
      </div>
      <div className="patient-detail-cardbox-container-2">
        <div className="patient-detail-card bg position-relative">
          <div className="documents-tabs-wrap">
            <Tabs
              defaultActiveKey="1"
              items={documentDataItems}
              moreIcon={<Image src={hamburger} />}
            />
          </div>
          <div className="tabs-button-wrap">
            <Button className="transaparent-btn d-flex align-items-center justify-content-end">
              <span className="d-inline-block me-3">Add new</span>
              <Image src={PlusIcon} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDetail;
