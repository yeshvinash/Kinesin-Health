import React, { useState } from "react";
import Expand from "../../../assets/images/icons/expand1.svg";
import Male from "../../../assets/images/icons/male.svg";
import PatientImg from "../../../assets/images/cover/patient.jpg";
import Diabeties from "../../../assets/images/icons/diabeties.svg";
import hamburger from "../../../assets/images/icons/hamburger.png";
import { Accordion, Image, Form, FloatingLabel } from "react-bootstrap";
import { Tabs, Button, Input, Checkbox, Select, Upload } from "antd";
import { SVGIcons } from "../../../components/Data/SVGIcons";
import Pregnancy from "../../../assets/images/icons/pregnancy.svg";
import AccordionIcon from "../../../assets/images/icons/accordion-icon.svg";
import AnteNatal from "../../../assets/images/icons/ante-natal.svg";
import Cancel from "../../../assets/images/icons/cancel1.svg";
import UploadImg from "../../../assets/images/icons/upload1.svg";
import Printer from "../../../assets/images/icons/printer1.svg";
import PostNatal from "../../../assets/images/icons/post-natal.svg";
import { Link } from "react-router-dom";
import TextArea from "antd/es/input/TextArea";
import "./PostNatalVisit.css";

export const PostNatalVisit = () => {
  const [tab, setTab] = useState(1);

  const handleClick = (id) => {
    setTab(id);
  };

  const documentDataItems = [
    {
      key: "1",
      label: (
        <>
          <div className="d-flex align-items-center">
            <span className="icon-wrap">{SVGIcons.Details}</span>
            <span>Consult</span>
          </div>
        </>
      ),
      children: (
        <>
          <div className="protocols-content-wrap d-flex">
            <div className="protocols-wrapper">
              <div className="protocols-items-wrap">
                <div className="d-flex align-items-center justify-content-between documents-title-wrap">
                  <h6 className="h6 fw-600 text-stratos mb-0 text-ellipsis text-break">
                    Patient Profile
                  </h6>
                  <Button className="transaparent-btn d-flex align-items-center justify-content-end">
                    <Image src={Expand} />
                  </Button>
                </div>
                <div className="patient-header-wrap">
                  <div className="d-flex align-items-center flex-sm-nowrap flex-wrap justify-content-center justify-content-sm-start">
                    <div className="patient-profile-img-wrap flex-shrink-0 ">
                      <Image src={PatientImg} />
                    </div>
                    <div className="patient-header-content-wrap">
                      <h6 className="h6 fw-600 text-ellipsis">
                        James Targaryen
                      </h6>
                      <div className="d-flex align-items-center justify-content-center justify-content-sm-start">
                        <div className="d-flex align-items-center patient-summary-wrap">
                          <span className="patient-header-icon-wrap">
                            <Image src={Male} alt="category" />
                          </span>
                          <span className="small-text text-stratos fw-500 mb-0 text-break">
                            Male
                          </span>
                        </div>
                        <div className="d-flex align-items-center patient-summary-wrap">
                          <span className="patient-header-icon-wrap">
                            <Image src={Diabeties} alt="category" />
                          </span>
                          <span className="text-stratos small-text fw-500 mb-0 text-break">
                            Diabeties
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="patient-bottom-wrap d-flex align-items-center">
                  <div>
                    <div className="patient-block-wrap">
                      <span className="text-manatee fw-500 d-inline-block small-text mb-2">
                        Phone no:
                      </span>
                      <span className="small-label text-stratos fw-500 mb-0 d-block">
                        0871234567
                      </span>
                    </div>
                    <div className="patient-block-wrap">
                      <span className="text-manatee fw-500 d-inline-block small-text mb-2">
                        Address:
                      </span>
                      <span className="small-label text-stratos fw-500 mb-0 d-block">
                        42 Rosemount Drive, Dublin 18
                      </span>
                    </div>
                  </div>
                  <div className="flex-shrink-0 btn-wrapper">
                    <Button className="custom_btn">Send SMS</Button>
                    <Button className="custom_btn">Add To Task</Button>
                  </div>
                </div>
              </div>
              <div className="protocols-accordion-wrapper">
                <Accordion defaultActiveKey="0" flush>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>
                      <div className="d-flex align-items-center">
                        <div className="accordion-icon-wrap">
                          <Image src={Pregnancy} alt="accordion-img" />
                        </div>
                        <span className="d-inline-block fw-500 text-break text-ellipsis">
                          Pregnancy
                        </span>
                      </div>
                    </Accordion.Header>
                    <Accordion.Body>
                      <div>
                        <Link
                          className="accordion-links-wrap"
                          onClick={() => handleClick(1)}
                        >
                          <Image src={AccordionIcon} />
                          <span className="d-inline-block text-break text-ellipsis">Pregnancy1</span>
                        </Link>
                        <Link
                          className="accordion-links-wrap"
                          onClick={() => handleClick(2)}
                        >
                          <Image src={AccordionIcon} />
                          <span className="d-inline-block text-break text-ellipsis">Pregnancy2</span>
                        </Link>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="1">
                    <Accordion.Header>
                      <div className="d-flex align-items-center">
                        <div className="accordion-icon-wrap">
                          <Image src={AnteNatal} alt="accordion-img" />
                        </div>
                        <span className="d-inline-block fw-500 text-break text-ellipsis">
                          Ante Natal
                        </span>
                      </div>
                    </Accordion.Header>
                    <Accordion.Body>
                      <div>
                        <Link
                          className="accordion-links-wrap"
                          onClick={() => handleClick(3)}
                        >
                          <Image src={AccordionIcon} />
                          <span className="d-inline-block text-break text-ellipsis">Antenatal Visit 1</span>
                        </Link>
                        <Link
                          className="accordion-links-wrap"
                          onClick={() => handleClick(4)}
                        >
                          <Image src={AccordionIcon} />
                          <span className="d-inline-block text-break text-ellipsis">Antenatal Visit 2</span>
                        </Link>
                        <Link
                          className="accordion-links-wrap"
                          onClick={() => handleClick(5)}
                        >
                          <Image src={AccordionIcon} />
                          <span className="d-inline-block text-break text-ellipsis">Antenatal Visit 3</span>
                        </Link>
                        <Link
                          className="accordion-links-wrap"
                          onClick={() => handleClick(6)}
                        >
                          <Image src={AccordionIcon} />
                          <span className="d-inline-block text-break text-ellipsis">Antenatal Visit 4</span>
                        </Link>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="2">
                    <Accordion.Header>
                      <div className="d-flex align-items-center">
                        <div className="accordion-icon-wrap">
                          <Image src={PostNatal} alt="accordion-img" />
                        </div>
                        <span className="d-inline-block fw-500 text-break text-ellipsis">
                          Post Natal
                        </span>
                      </div>
                    </Accordion.Header>
                    <Accordion.Body>
                      <div>
                        <Link
                          className="accordion-links-wrap"
                          onClick={() => handleClick(7)}
                        >
                          <Image src={AccordionIcon} />
                          <span className="d-inline-block text-break text-ellipsis">2 Week Check</span>
                        </Link>
                        <Link
                          className="accordion-links-wrap"
                          onClick={() => handleClick(8)}
                        >
                          <Image src={AccordionIcon} />
                          <span className="d-inline-block text-break text-ellipsis">6 Week Check</span>
                        </Link>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </div>
            </div>
            <div className="protocols-page-wrap pregnancy-content-wrap">
              {tab === 1 ? (
                <div className="pregnancy-detail-dashobard">
                  <h2 className="small fw-600 text-stratos page-title primary-font">
                    New Pregnancy
                  </h2>
                  <Form className="pregnancy-form">
                    <div className="pregnancy-blocks-wrap form-blocks-wrap space-top">
                      <div className="form-spacing">
                        <div className="custom-label-wrap">
                          <h3 className="h3 d-inline-flex align-items-center text-stratos fw-600 primary-font text-break label-wrap">
                            History{SVGIcons.Pencil}
                          </h3>
                        </div>
                        <div className="form-grid-item">
                          <div className="custom-input-wrap">
                            <TextArea
                              rows={2}
                              placeholder="Took positive home pregnancy test. Happy with same. Well, no complaints  No Abdo pain No PV bleeding."
                            />
                          </div>
                          <div className="select-grid-item">
                            <div className="form-content-wrap">
                              <div className="custom-label-wrap flex-shrink-0">
                                <h6 className="h6  mb-0  text-stratos fw-600 primary-font text-break label-wrap">
                                  Gravida
                                </h6>
                              </div>
                              <div className="custom-input-wrap">
                                <Select
                                  defaultValue="1"
                                  suffixIcon={SVGIcons.DownArrowGray}
                                  options={[
                                    {
                                      value: "1",
                                      label: "1",
                                    },
                                    {
                                      value: "2",
                                      label: "2",
                                    },
                                  ]}
                                />
                              </div>
                            </div>
                            <div className="form-content-wrap">
                              <div className="custom-label-wrap flex-shrink-0">
                                <h6 className="h6  mb-0  text-stratos fw-600 primary-font text-break label-wrap">
                                  Para
                                </h6>
                              </div>
                              <div className="custom-input-wrap">
                                <Select
                                  defaultValue="1"
                                  suffixIcon={SVGIcons.DownArrowGray}
                                  options={[
                                    {
                                      value: "1",
                                      label: "1",
                                    },
                                    {
                                      value: "2",
                                      label: "2",
                                    },
                                  ]}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="form-spacing">
                        <div className="custom-label-wrap">
                          <h5 className="h5 text-stratos fw-600 primary-font text-break label-wrap">
                            Meds
                          </h5>
                        </div>
                        <div className="custom-checkbox-wrap d-flex flex-column meds-wrap">
                          <Checkbox>Smoker/Non Smoker</Checkbox>
                          <Checkbox>
                            No family History Of Congenital Abnormality
                          </Checkbox>
                          <Checkbox>Has had Chicken Pox</Checkbox>
                        </div>
                      </div>
                    </div>
                    <div className="pregnancy-blocks-wrap form-blocks-wrap">
                      <div className="form-spacing">
                        <div className="custom-label-wrap">
                          <h3 className="h3 d-inline-flex align-items-center text-stratos fw-600 primary-font text-break label-wrap">
                            Exam
                          </h3>
                        </div>
                        <div className="custom-checkbox-wrap d-flex flex-column meds-wrap">
                          <Checkbox>Clinic HCG Positive</Checkbox>
                        </div>
                      </div>
                    </div>
                    <div className="pregnancy-blocks-wrap form-blocks-wrap">
                      <div className="form-spacing">
                        <div className="custom-label-wrap">
                          <h3 className="h3 d-inline-flex align-items-center text-stratos fw-600 primary-font text-break label-wrap">
                            Impression
                          </h3>
                        </div>
                        <div className="form-grid-item item-3">
                          <FloatingLabel
                            controlId="floatingInput"
                            label="New Pregnency"
                          >
                            <Form.Control type="text" placeholder="N/A" />
                          </FloatingLabel>
                        </div>
                      </div>
                    </div>
                    <div className="pregnancy-blocks-wrap form-blocks-wrap plan-wrap">
                      <div className="form-spacing">
                        <div className="custom-label-wrap d-flex align-items-center justify-content-between">
                          <h3 className="h3 mb-0 d-inline-flex align-items-center text-stratos fw-600 primary-font text-break label-wrap">
                            Plan
                          </h3>
                          <div className="d-flex align-items-center btn-wrap">
                            <Button className="custom_btn">
                              <Image src={Cancel} /> Add to File
                            </Button>
                            <Button className="custom_btn">
                              <Image src={UploadImg} />
                              Info Leaflet
                            </Button>
                            <Button className="custom_btn">
                              <Image src={Printer} />
                              Print
                            </Button>
                          </div>
                        </div>
                        <div className="custom-input-wrap">
                          <TextArea
                            rows={4}
                            placeholder="Mother and infant form signed
Maternity Bloods (FBC/Blood Group) & Hold/HIV/Hepatitis C/Syphilis/Rubella IgG/VZV IgG) and MSU to screen for asymptomatic bacteriuria.
400mcg folic acid for upto 12 weeks (5mg folic acid if if coeliac/DM/BMI over 30 or on anticonvulsants), or else take pregnacare.
Vitamin D 10mcg daily throughout pregnancy and breast feeding."
                          />
                        </div>
                      </div>
                    </div>
                    <div className="print-prescription-btn">
                      <Button className="custom_btn">Print Prescription</Button>
                    </div>
                  </Form>
                </div>
              ) : tab === 2 ? (
                <div className="pregnancy-detail-dashobard">
                  <Form className="pregnancy-form">
                    <div className="pregnancy-blocks-wrap form-blocks-wrap">
                      <div className="pregnancy-grid-itembox">
                        <div>
                          <div className="custom-label-wrap">
                            <h6 className="h6 text-stratos fw-500 primary-font text-break label-wrap">
                              Family Doctor
                            </h6>
                          </div>
                          <div className="custom-input-wrap">
                            <Select
                              defaultValue="Yes"
                              suffixIcon={SVGIcons.DownArrowGray}
                              options={[
                                {
                                  value: "Yes",
                                  label: "Yes",
                                },
                                {
                                  value: "No",
                                  label: "No",
                                },
                              ]}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="custom-label-wrap">
                            <h6 className="h6 text-stratos fw-500 primary-font text-break label-wrap">
                              Doctor Address
                            </h6>
                          </div>
                          <div className="custom-input-wrap">
                            <Select
                              defaultValue="Yes"
                              suffixIcon={SVGIcons.DownArrowGray}
                              options={[
                                {
                                  value: "Yes",
                                  label: "Yes",
                                },
                                {
                                  value: "No",
                                  label: "No",
                                },
                              ]}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="custom-label-wrap">
                            <h6 className="h6 text-stratos fw-500 primary-font text-break label-wrap">
                              Doctor Phone
                            </h6>
                          </div>
                          <div className="custom-input-wrap">
                            <Select
                              defaultValue="Yes"
                              suffixIcon={SVGIcons.DownArrowGray}
                              options={[
                                {
                                  value: "Yes",
                                  label: "Yes",
                                },
                                {
                                  value: "No",
                                  label: "No",
                                },
                              ]}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="custom-label-wrap">
                            <h6 className="h6 text-stratos fw-500 primary-font text-break label-wrap">
                              Obstetrician
                            </h6>
                          </div>
                          <div className="custom-input-wrap">
                            <Select
                              defaultValue="Yes"
                              suffixIcon={SVGIcons.DownArrowGray}
                              options={[
                                {
                                  value: "Yes",
                                  label: "Yes",
                                },
                                {
                                  value: "No",
                                  label: "No",
                                },
                              ]}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="custom-label-wrap">
                            <h6 className="h6 text-stratos fw-500 primary-font text-break label-wrap">
                              Obstetrician Address
                            </h6>
                          </div>
                          <div className="custom-input-wrap">
                            <Select
                              defaultValue="Yes"
                              suffixIcon={SVGIcons.DownArrowGray}
                              options={[
                                {
                                  value: "Yes",
                                  label: "Yes",
                                },
                                {
                                  value: "No",
                                  label: "No",
                                },
                              ]}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="custom-label-wrap">
                            <h6 className="h6 text-stratos fw-500 primary-font text-break label-wrap">
                              Obstetrician Phone
                            </h6>
                          </div>
                          <div className="custom-input-wrap">
                            <Select
                              defaultValue="Yes"
                              suffixIcon={SVGIcons.DownArrowGray}
                              options={[
                                {
                                  value: "Yes",
                                  label: "Yes",
                                },
                                {
                                  value: "No",
                                  label: "No",
                                },
                              ]}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="custom-label-wrap">
                            <h6 className="h6 text-stratos fw-500 primary-font text-break label-wrap">
                              Obstetrician Email
                            </h6>
                          </div>
                          <div className="custom-input-wrap">
                            <Select
                              defaultValue="Yes"
                              suffixIcon={SVGIcons.DownArrowGray}
                              options={[
                                {
                                  value: "Yes",
                                  label: "Yes",
                                },
                                {
                                  value: "No",
                                  label: "No",
                                },
                              ]}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="custom-label-wrap">
                            <h6 className="h6 text-stratos fw-500 primary-font text-break label-wrap">
                              Obstetrician History
                            </h6>
                          </div>
                          <div className="custom-input-wrap">
                            <Select
                              defaultValue="Yes"
                              suffixIcon={SVGIcons.DownArrowGray}
                              options={[
                                {
                                  value: "Yes",
                                  label: "Yes",
                                },
                                {
                                  value: "No",
                                  label: "No",
                                },
                              ]}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="custom-label-wrap">
                            <h6 className="h6 text-stratos fw-500 primary-font text-break label-wrap">
                              Reference Number
                            </h6>
                          </div>
                          <div className="custom-input-wrap">
                            <Select
                              defaultValue="Yes"
                              suffixIcon={SVGIcons.DownArrowGray}
                              options={[
                                {
                                  value: "Yes",
                                  label: "Yes",
                                },
                                {
                                  value: "No",
                                  label: "No",
                                },
                              ]}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="custom-label-wrap">
                            <h6 className="h6 text-stratos fw-500 primary-font text-break label-wrap">
                              MCA Number
                            </h6>
                          </div>
                          <div className="custom-input-wrap">
                            <Select
                              defaultValue="Yes"
                              suffixIcon={SVGIcons.DownArrowGray}
                              options={[
                                {
                                  value: "Yes",
                                  label: "Yes",
                                },
                                {
                                  value: "No",
                                  label: "No",
                                },
                              ]}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="custom-label-wrap">
                            <h6 className="h6 text-stratos fw-500 primary-font text-break label-wrap">
                              MCA Received
                            </h6>
                          </div>
                          <div className="custom-input-wrap d-flex align-items-center">
                            <div className="custom-checkbox-wrapper">
                              <Checkbox />
                            </div>
                            <Select
                              defaultValue="Yes"
                              suffixIcon={SVGIcons.DownArrowGray}
                              options={[
                                {
                                  value: "Yes",
                                  label: "Yes",
                                },
                                {
                                  value: "No",
                                  label: "No",
                                },
                              ]}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="custom-label-wrap">
                            <h6 className="h6 text-stratos fw-500 primary-font text-break label-wrap">
                              Approval Received
                            </h6>
                          </div>
                          <div className="custom-input-wrap d-flex align-items-center">
                            <div className="custom-checkbox-wrapper">
                              <Checkbox />
                            </div>
                            <Select
                              defaultValue="Yes"
                              suffixIcon={SVGIcons.DownArrowGray}
                              options={[
                                {
                                  value: "Yes",
                                  label: "Yes",
                                },
                                {
                                  value: "No",
                                  label: "No",
                                },
                              ]}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="custom-label-wrap">
                            <h6 className="h6 text-stratos fw-500 primary-font text-break label-wrap">
                              Claim Set In
                            </h6>
                          </div>
                          <div className="custom-input-wrap d-flex align-items-center">
                            <div className="custom-checkbox-wrapper">
                              <Checkbox />
                            </div>
                            <Select
                              defaultValue="Yes"
                              suffixIcon={SVGIcons.DownArrowGray}
                              options={[
                                {
                                  value: "Yes",
                                  label: "Yes",
                                },
                                {
                                  value: "No",
                                  label: "No",
                                },
                              ]}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="custom-label-wrap">
                            <h6 className="h6 text-stratos fw-500 primary-font text-break label-wrap">
                              Payment Recieved
                            </h6>
                          </div>
                          <div className="custom-input-wrap d-flex align-items-center">
                            <div className="custom-checkbox-wrapper">
                              <Checkbox />
                            </div>
                            <Select
                              defaultValue="Yes"
                              suffixIcon={SVGIcons.DownArrowGray}
                              options={[
                                {
                                  value: "Yes",
                                  label: "Yes",
                                },
                                {
                                  value: "No",
                                  label: "No",
                                },
                              ]}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="custom-label-wrap">
                            <h6 className="h6 text-stratos fw-500 primary-font text-break label-wrap">
                              Paid Amount
                            </h6>
                          </div>
                          <div className="custom-input-wrap d-flex align-items-center">
                            <div className="custom-checkbox-wrapper">
                              <Checkbox />
                            </div>
                            <Select
                              defaultValue="Yes"
                              suffixIcon={SVGIcons.DownArrowGray}
                              options={[
                                {
                                  value: "Yes",
                                  label: "Yes",
                                },
                                {
                                  value: "No",
                                  label: "No",
                                },
                              ]}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="pregnancy-blocks-wrap form-blocks-wrap chart-information">
                      <div className="custom-label-wrap">
                        <h3 className="h3  text-stratos fw-600 primary-font text-break label-wrap">
                          Chart Information
                        </h3>
                      </div>
                      <div className="form-grid-item  form-spacing">
                        <div>
                          <div className="custom-label-wrap">
                            <h6 className="h6 text-black fw-500 primary-font text-break label-wrap">
                              Substance Misuse
                            </h6>
                          </div>
                          <div className="custom-input-wrap ">
                            <Input placeholder="N/A" />
                          </div>
                        </div>
                        <div>
                          <div className="custom-label-wrap">
                            <h6 className="h6  text-black fw-500 primary-font text-break label-wrap">
                              Medical History ICPC + Description
                            </h6>
                          </div>
                          <div className="custom-input-wrap ">
                            <Input placeholder="Yes" />
                          </div>
                        </div>
                      </div>
                      <div className="form-grid-item  form-spacing">
                        <div>
                          <div className="custom-label-wrap">
                            <h6 className="h6  text-black fw-500 primary-font text-break label-wrap">
                              Family History ICPC + Description
                            </h6>
                          </div>
                          <div className="custom-input-wrap ">
                            <Input placeholder="N/A" />
                          </div>
                        </div>
                        <div>
                          <div className="custom-label-wrap">
                            <h6 className="h6  text-black fw-500 primary-font text-break label-wrap">
                              Currents Meds
                            </h6>
                          </div>
                          <div className="custom-input-wrap ">
                            <Input placeholder="Yes" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="print-prescription-btn">
                      <Button className="custom_btn">Update Pregnency</Button>
                    </div>
                  </Form>
                </div>
              ) : tab === 3 ? (
                <div className="pregnancy-detail-dashobard">
                  <h2 className="small fw-600 text-stratos page-title primary-font">
                    Routine Antenatal Visit
                  </h2>
                  <Form className="pregnancy-form">
                    <div className="pregnancy-blocks-wrap form-blocks-wrap space-top">
                      <div className="form-spacing">
                        <div className="custom-label-wrap">
                          <h3 className="h3 d-inline-flex align-items-center text-stratos fw-600 primary-font text-break label-wrap">
                            History{SVGIcons.Pencil}
                          </h3>
                        </div>
                        <div className="custom-input-wrap">
                          <TextArea
                            rows={4}
                            placeholder="Bloods reviewed and within normal limits
Very well, no concerns, nil ankle oedema, nil headache or abdominal pain
Good foetal movement
Questions answered"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="pregnancy-blocks-wrap form-blocks-wrap">
                      <div className="custom-label-wrap">
                        <h3 className="h3 d-inline-flex align-items-center text-stratos fw-600 primary-font text-break label-wrap">
                          Exam{SVGIcons.Pencil}
                        </h3>
                      </div>
                      <div className="form-grid-item item-3 form-spacing">
                        <FloatingLabel controlId="floatingInput" label="BP">
                          <Form.Control type="text" placeholder="N/A"  value="110/170"/>
                        </FloatingLabel>
                        <FloatingLabel
                          controlId="floatingInput"
                          label="Urinalysis"
                        >
                          <Form.Control type="text" placeholder="NAD - No Proteinuria" value="NAD - No Proteinuria"/>
                        </FloatingLabel>
                        <FloatingLabel
                          controlId="floatingInput"
                          label="Ankle oedema:"
                        >
                          <Form.Control type="text" placeholder="N/A" value="N/A"/>
                        </FloatingLabel>
                        <FloatingLabel
                          controlId="floatingInput"
                          className="measurements-label-wrap"
                          label="Foetal movement present as per palpation"
                        >
                          <Form.Control type="text" placeholder="N/A"  value="N/A"/>
                        </FloatingLabel>
                        <FloatingLabel
                          controlId="floatingInput"
                          className="measurements-label-wrap"
                          label="Symphysis - fundal height (from 24 weeks)"
                        >
                          <Form.Control type="text" placeholder="N/A" value="N/A"/>
                        </FloatingLabel>
                        <FloatingLabel
                          controlId="floatingInput"
                          className="measurements-label-wrap"
                          label="Symphysis - fundal height (from 24 weeks)"
                        >
                          <Form.Control type="text" placeholder="N/A" value="N/A"/>
                        </FloatingLabel>
                      </div>
                    </div>
                    <div className="pregnancy-blocks-wrap form-blocks-wrap">
                      <div className="form-grid-item form-spacing">
                        <div>
                          <div className="custom-label-wrap">
                            <h3 className="h3 d-inline-flex align-items-center text-stratos fw-600 primary-font text-break label-wrap">
                              Impression{SVGIcons.Pencil}
                            </h3>
                          </div>
                          <FloatingLabel
                            controlId="floatingInput"
                            label="Patient well"
                          >
                            <Form.Control type="text" placeholder="N/A" />
                          </FloatingLabel>
                        </div>
                        <div>
                          <div className="custom-label-wrap">
                            <h3 className="h3 d-inline-flex align-items-center text-stratos fw-600 primary-font text-break label-wrap">
                              Plan{SVGIcons.Pencil}
                            </h3>
                          </div>
                          <FloatingLabel
                            controlId="floatingInput"
                            label="Patient well"
                          >
                            <Form.Control type="text" placeholder="N/A" />
                          </FloatingLabel>
                        </div>
                      </div>
                    </div>
                    <div className="pregnancy-blocks-wrap form-blocks-wrap space-top">
                      <div className="form-spacing">
                        <div className="custom-label-wrap">
                          <h3 className="h3 d-inline-flex align-items-center text-stratos fw-600 primary-font text-break label-wrap">
                            Additional Info{SVGIcons.Pencil}
                          </h3>
                        </div>
                        <div className="custom-input-wrap">
                          <TextArea
                            rows={4}
                            placeholder="Bloods reviewed and within normal limits
Very well, no concerns, nil ankle oedema, nil headache or abdominal pain
Good foetal movement
Questions answered"
                          />
                        </div>
                      </div>
                    </div>
                  </Form>
                </div>
              ) : tab === 4 ? (
                <h3>Antenatal Visit 2</h3>
              ) : tab === 5 ? (
                <h3>Antenatal Visit 3</h3>
              ) : tab === 6 ? (
                <h3>Antenatal Visit 4</h3>
              ) : tab === 7 ? (
                <div className="pregnancy-detail-dashobard">
                  <h2 className="small fw-600 text-stratos page-title primary-font">
                    Two Week Mother And Baby Check
                  </h2>
                  <Form className="pregnancy-form">
                    <div className="pregnancy-blocks-wrap form-blocks-wrap space-top">
                      <div className="form-spacing">
                        <div className="custom-label-wrap">
                          <h3 className="h3 d-inline-flex align-items-center text-stratos fw-600 primary-font text-break label-wrap">
                            Subject{SVGIcons.Pencil}
                          </h3>
                        </div>
                        <FloatingLabel
                          controlId="floatingInput"
                          label="Born at"
                        >
                          <Form.Control type="text" placeholder="110/170" />
                        </FloatingLabel>
                      </div>
                      <div className="form-grid-item form-spacing">
                        <div className="form-content-wrap flex-column align-items-start">
                          <div className="custom-label-wrap">
                            <h5 className="h5 text-stratos fw-600 primary-font text-break label-wrap">
                              Issue of note
                            </h5>
                          </div>
                          <div className="custom-input-wrap">
                            <TextArea rows={4} placeholder="N/A" />
                          </div>
                        </div>
                        <div className="form-content-wrap flex-column align-items-start">
                          <div className="custom-label-wrap">
                            <h5 className="h5  text-stratos fw-600 primary-font text-break label-wrap">
                              Delivery Method
                            </h5>
                          </div>
                          <div className="custom-input-wrap">
                            <TextArea rows={4} placeholder="N/A" />
                          </div>
                        </div>
                      </div>
                      <div className="form-grid-item form-spacing">
                        <FloatingLabel
                          controlId="floatingInput"
                          label="Weight at birth"
                        >
                          <Form.Control type="text" placeholder="110/170" />
                        </FloatingLabel>
                        <FloatingLabel
                          controlId="floatingInput"
                          label="Jaundice"
                        >
                          <Form.Control type="text" placeholder="N/A" />
                        </FloatingLabel>
                      </div>
                      <div className="form-spacing">
                        <div className="custom-label-wrap">
                          <h5 className="h5 text-stratos fw-600 primary-font label-wrap">
                            Feeding
                          </h5>
                        </div>
                        <div className="custom-checkbox-wrap d-flex flex-wrap">
                          <Checkbox>Breast</Checkbox>
                          <Checkbox>Formula</Checkbox>
                          <Checkbox>Combination</Checkbox>
                        </div>
                      </div>
                      <div className="form-spacing">
                        <div className="custom-label-wrap">
                          <h5 className="h5 text-stratos fw-600 primary-font text-break label-wrap">
                            PHN Visit
                          </h5>
                        </div>
                        <div className="custom-input-wrap">
                          <TextArea rows={4} placeholder="N/A" />
                        </div>
                      </div>
                    </div>
                    <div className="form-blocks-wrap pregnancy-blocks-wrap">
                      <div className="form-spacing">
                        <div className="custom-label-wrap">
                          <h3 className="h3 d-inline-flex align-items-center text-stratos fw-600 primary-font text-break label-wrap">
                            Objectives{SVGIcons.Pencil}
                          </h3>
                        </div>
                        <div className="form-grid-item">
                          <FloatingLabel
                            controlId="floatingInput"
                            label="Weight"
                          >
                            <Form.Control type="text" placeholder="55" />
                          </FloatingLabel>
                          <FloatingLabel
                            controlId="floatingInput"
                            label="Length"
                          >
                            <Form.Control type="text" placeholder="167" />
                          </FloatingLabel>
                        </div>
                      </div>
                      <div className="form-spacing">
                        <div className="custom-label-wrap">
                          <h5 className="h5 text-stratos fw-600 primary-font text-break label-wrap">
                            PHN Visit
                          </h5>
                        </div>
                        <div className="custom-input-wrap">
                          <TextArea rows={4} placeholder="N/A" />
                        </div>
                      </div>
                      <div className="form-spacing">
                        <FloatingLabel
                          controlId="floatingInput"
                          label="CRT <2s"
                        >
                          <Form.Control type="text" placeholder="yes" />
                        </FloatingLabel>
                      </div>
                      <div className="form-spacing">
                        <div className="custom-label-wrap">
                          <h5 className="h5 text-stratos fw-600 primary-font text-break label-wrap">
                            Head Circumference (Largest of Three Measurement)
                          </h5>
                        </div>
                        <div className="custom-input-wrap">
                          <TextArea rows={4} placeholder="N/A" />
                        </div>
                      </div>
                      <div className="form-grid-item form-spacing">
                        <div>
                          <div className="custom-label-wrap">
                            <h5 className="h5 text-stratos fw-600 primary-font text-break label-wrap">
                              Heart
                            </h5>
                          </div>
                          <div className="custom-input-wrap">
                            <TextArea rows={4} placeholder="N/A" />
                          </div>
                        </div>
                        <div>
                          <div className="custom-label-wrap">
                            <h5 className="h5 text-stratos fw-600 primary-font text-break label-wrap">
                              Fonantelles
                            </h5>
                          </div>
                          <div className="custom-input-wrap">
                            <TextArea rows={4} placeholder="N/A" />
                          </div>
                        </div>
                      </div>
                      <div className="form-grid-item form-spacing">
                        <div>
                          <div className="custom-label-wrap">
                            <h5 className="h5 text-stratos fw-600 primary-font text-break label-wrap">
                              Buccal Muscosa
                            </h5>
                          </div>
                          <div className="custom-input-wrap">
                            <TextArea rows={4} placeholder="N/A" />
                          </div>
                        </div>
                        <div>
                          <div className="custom-label-wrap">
                            <h5 className="h5 text-stratos fw-600 primary-font text-break label-wrap">
                              Feet?
                            </h5>
                          </div>
                          <div className="custom-input-wrap">
                            <TextArea rows={4} placeholder="N/A" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="form-blocks-wrap pregnancy-blocks-wrap">
                      <div className="form-spacing">
                        <div className="custom-label-wrap">
                          <h3 className="h3 text-stratos fw-600 primary-font text-break label-wrap">
                            Assessment
                          </h3>
                        </div>
                        <div className="custom-input-wrap">
                          <TextArea
                            rows={4}
                            placeholder="Baby is Currently Well With Nil Acute."
                          />
                        </div>
                      </div>
                      <div className="form-spacing">
                        <div className="custom-label-wrap">
                          <h3 className="h3 text-stratos fw-600 primary-font text-break label-wrap">
                            Plan
                          </h3>
                        </div>
                        <div className="custom-input-wrap">
                          <TextArea
                            rows={4}
                            placeholder="Will return for 6 weeks check
                                        5mcg (200 IU) vitamin D drops PO, once daily unitl one year old if breast fed.
                                        Complete application for children’s medical card
                                        Call or attend if any concerns or questions"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="form-blocks-wrap pregnancy-blocks-wrap">
                      <div className="form-spacing">
                        <div className="custom-label-wrap">
                          <h3 className="h3 d-inline-flex align-items-center text-stratos fw-600 primary-font text-break label-wrap">
                            Mother{SVGIcons.Pencil}
                          </h3>
                        </div>
                        <div className="form-grid-item">
                          <div>
                            <div className="custom-label-wrap">
                              <h5 className="h5 text-stratos fw-600 primary-font text-break label-wrap">
                                Gravida/Number Of Pregnancies
                              </h5>
                            </div>
                            <div className="custom-input-wrap">
                              <TextArea rows={4} placeholder="N/A" />
                            </div>
                          </div>
                          <div>
                            <div className="custom-label-wrap">
                              <h5 className="h5 text-stratos fw-600 primary-font text-break label-wrap">
                                Para/Number Of Birth
                              </h5>
                            </div>
                            <div className="custom-input-wrap">
                              <TextArea rows={4} placeholder="N/A" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="form-grid-item form-spacing">
                        <div>
                          <div className="custom-label-wrap">
                            <h5 className="h5 text-stratos fw-600 primary-font text-break label-wrap">
                              Issue During Or Since Pregnancy
                            </h5>
                          </div>
                          <div className="custom-input-wrap">
                            <TextArea rows={4} placeholder="N/A" />
                          </div>
                        </div>
                        <div>
                          <div className="custom-label-wrap">
                            <h5 className="h5 text-stratos fw-600 primary-font text-break label-wrap">
                              Delivery Method
                            </h5>
                          </div>
                          <div className="custom-input-wrap">
                            <TextArea rows={4} placeholder="N/A" />
                          </div>
                        </div>
                      </div>
                      <div className="form-grid-item form-spacing">
                        <div>
                          <div className="custom-label-wrap">
                            <h5 className="h5 text-stratos fw-600 primary-font text-break label-wrap">
                              Post-Natal Mood
                            </h5>
                          </div>
                          <div className="custom-input-wrap">
                            <TextArea rows={4} placeholder="N/A" />
                          </div>
                        </div>
                        <div>
                          <div className="custom-label-wrap">
                            <h5 className="h5 text-stratos fw-600 primary-font text-break label-wrap">
                              Supports
                            </h5>
                          </div>
                          <div className="custom-input-wrap">
                            <TextArea rows={4} placeholder="N/A" />
                          </div>
                        </div>
                      </div>
                      <div className="form-grid-item form-spacing">
                        <div>
                          <div className="custom-label-wrap">
                            <h5 className="h5 text-stratos fw-600 primary-font text-break label-wrap">
                              Conception
                            </h5>
                          </div>
                          <div className="custom-input-wrap">
                            <TextArea rows={4} placeholder="N/A" />
                          </div>
                        </div>
                        <div>
                          <div className="custom-label-wrap">
                            <h5 className="h5 text-stratos fw-600 primary-font text-break label-wrap">
                              Mirena
                            </h5>
                          </div>
                          <div className="custom-input-wrap">
                            <TextArea rows={4} placeholder="N/A" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </Form>
                </div>
              ) : (
                <div className="pregnancy-detail-dashobard">
                  <h2 className="small fw-600 text-stratos page-title primary-font">
                    Baby Exam - 6 Week Boy
                  </h2>
                  <Form className="pregnancy-form">
                    <div className="pregnancy-blocks-wrap form-blocks-wrap space-top">
                      <div className="form-spacing">
                        <div className="custom-label-wrap">
                          <h3 className="h3  text-stratos fw-600 primary-font text-break label-wrap">
                            Subjective
                          </h3>
                        </div>
                        <FloatingLabel
                          controlId="floatingInput"
                          className="measurements-label-wrap"
                          label="No issues Or Concerns Reported"
                        >
                          <Form.Control
                            type="text"
                            placeholder="No issues Or Concerns Reported"
                          />
                        </FloatingLabel>
                      </div>
                      <div className="form-grid-item form-spacing">
                        <FloatingLabel
                          controlId="floatingInput"
                          label="Baby Feeding"
                        >
                          <Form.Control type="text" placeholder="N/A" />
                        </FloatingLabel>

                        <FloatingLabel
                          controlId="floatingInput"
                          label="Early Development"
                        >
                          <Form.Control
                            type="text"
                            placeholder="Fixing and following"
                          />
                        </FloatingLabel>
                      </div>
                    </div>
                    <div className="pregnancy-blocks-wrap form-blocks-wrap">
                      <div className="custom-label-wrap">
                        <h3 className="h3  text-stratos fw-600 primary-font text-break label-wrap">
                          Objective
                        </h3>
                      </div>
                      <div className="form-grid-item item-3 form-spacing">
                        <FloatingLabel controlId="floatingInput" label="Weight">
                          <Form.Control type="text" placeholder="N/A" />
                        </FloatingLabel>
                        <FloatingLabel
                          controlId="floatingInput"
                          className="measurements-label-wrap"
                          label="Head Circumferences (largest of three measurements)"
                        >
                          <Form.Control type="text" placeholder="N/A" />
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingInput" label="Length">
                          <Form.Control type="text" placeholder="N/A" />
                        </FloatingLabel>
                        <FloatingLabel
                          controlId="floatingInput"
                          label="Frontanelles"
                        >
                          <Form.Control type="text" placeholder="N/A" />
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingInput" label="Ears">
                          <Form.Control type="text" placeholder="N/A" />
                        </FloatingLabel>
                        <FloatingLabel
                          controlId="floatingInput"
                          label="Mouth Including Cleft"
                        >
                          <Form.Control type="text" placeholder="N/A" />
                        </FloatingLabel>
                        <FloatingLabel
                          controlId="floatingInput"
                          label="Eyes Including Iris"
                        >
                          <Form.Control type="text" placeholder="N/A" />
                        </FloatingLabel>
                        <FloatingLabel
                          controlId="floatingInput"
                          label="Cardiovascular"
                        >
                          <Form.Control type="text" placeholder="N/A" />
                        </FloatingLabel>
                        <FloatingLabel
                          controlId="floatingInput"
                          label="Respiratory"
                        >
                          <Form.Control type="text" placeholder="N/A" />
                        </FloatingLabel>
                        <FloatingLabel
                          controlId="floatingInput"
                          label="Abdominial"
                        >
                          <Form.Control type="text" placeholder="N/A" />
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingInput" label="Hands">
                          <Form.Control type="text" placeholder="N/A" />
                        </FloatingLabel>
                        <FloatingLabel
                          controlId="floatingInput"
                          label="Barlow’s and Ortalani’s Tests"
                        >
                          <Form.Control type="text" placeholder="N/A" />
                        </FloatingLabel>
                        <FloatingLabel
                          controlId="floatingInput"
                          label="Testes Descended Bilaterally"
                        >
                          <Form.Control type="text" placeholder="N/A" />
                        </FloatingLabel>
                        <FloatingLabel
                          controlId="floatingInput"
                          label="Anus Patent"
                        >
                          <Form.Control type="text" placeholder="N/A" />
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingInput" label="Back">
                          <Form.Control type="text" placeholder="N/A" />
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingInput" label="Tone">
                          <Form.Control type="text" placeholder="N/A" />
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingInput" label="Hips">
                          <Form.Control type="text" placeholder="N/A" />
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingInput" label="Feet">
                          <Form.Control type="text" placeholder="N/A" />
                        </FloatingLabel>
                      </div>
                      <FloatingLabel controlId="floatingInput" label="Refleses">
                        <Form.Control type="text" placeholder="N/A" />
                      </FloatingLabel>
                    </div>
                    <div className="pregnancy-blocks-wrap form-blocks-wrap">
                      <div className="form-spacing">
                        <div className="custom-label-wrap">
                          <h3 className="h3  text-stratos fw-600 primary-font text-break label-wrap">
                            Assesments
                          </h3>
                        </div>
                        <FloatingLabel
                          controlId="floatingInput"
                          label="Baby Is Currently Well"
                        >
                          <Form.Control
                            type="text"
                            placeholder="Baby Is Currently Well"
                          />
                        </FloatingLabel>
                      </div>
                    </div>
                    <div className="pregnancy-blocks-wrap form-blocks-wrap">
                      <div className="form-spacing">
                        <div className="custom-label-wrap">
                          <h3 className="h3  text-stratos fw-600 primary-font text-break label-wrap">
                            Plan
                          </h3>
                        </div>
                        <div className="custom-input-wrap">
                          <TextArea
                            rows={5}
                            placeholder="Will return for first vaccinations at two months old
                                        5mcg (200 IU) vitamin D drops PO, once daily until one year old if breast fed.
                                        Refer to orthopaedics if signs of hip dysplasia (US up to six months old or x-ray thereafter)
                                        Contraception options discussed with Mum
                                        Wait for three months after delivery before next smear if due"
                          />
                        </div>
                      </div>
                    </div>
                  </Form>
                </div>
              )}
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
            <span className="icon-wrap">{SVGIcons.Details}</span>
            <span>Details</span>
          </div>
        </>
      ),
      children: (
        <>
          <h3>Details</h3>
        </>
      ),
    },
    {
      key: "3",
      label: (
        <>
          <div className="d-flex align-items-center">
            <span className="icon-wrap">{SVGIcons.Details}</span>
            <span>Medications</span>
          </div>
        </>
      ),
      children: (
        <>
          <h3>Medications</h3>
        </>
      ),
    },
    {
      key: "4",
      label: (
        <>
          <div className="d-flex align-items-center">
            <span className="icon-wrap">{SVGIcons.Details}</span>
            <span>Documents</span>
          </div>
        </>
      ),
      children: (
        <>
          <h3>Documents</h3>
        </>
      ),
    },
    {
      key: "5",
      label: (
        <>
          <div className="d-flex align-items-center">
            <span className="icon-wrap">{SVGIcons.Details}</span>
            <span>Results</span>
          </div>
        </>
      ),
      children: (
        <>
          <h3>Results</h3>
        </>
      ),
    },
    {
      key: "6",
      label: (
        <>
          <div className="d-flex align-items-center">
            <span className="icon-wrap">{SVGIcons.Details}</span>
            <span>Protocols</span>
          </div>
        </>
      ),
      children: (
        <>
          <h3>Protocols</h3>
        </>
      ),
    },
    {
      key: "7",
      label: (
        <>
          <div className="d-flex align-items-center">
            <span className="icon-wrap">{SVGIcons.Details}</span>
            <span>Private Referrals</span>
          </div>
        </>
      ),
      children: (
        <>
          <h3>Private Referrals</h3>
        </>
      ),
    },
  ];
  return (
    <>
      <section className="dashboard-wrap">
        <h2 class="h2 text-stratos fw-600 page-title"> Pregnancy Detail </h2>
        <div className="dashboard-bg">
          <div className="documents-tabs-wrap">
            <Tabs
              defaultActiveKey="1"
              items={documentDataItems}
              moreIcon={<Image src={hamburger} />}
            />
          </div>
        </div>
      </section>
    </>
  );
};
