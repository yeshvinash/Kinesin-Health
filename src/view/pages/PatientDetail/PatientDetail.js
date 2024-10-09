import React, { useState } from "react";
import { Tabs, Table, Modal, Form, Input, Select, Checkbox } from "antd";
import { SVGIcons } from "../../../components/Data/SVGIcons";
import { Image, Button } from "react-bootstrap";
import Male from "../../../assets/images/icons/male.svg";
import Diabeties from "../../../assets/images/icons/diabeties.svg";
import PatientImg from "../../../assets/images/cover/patient.jpg";
import hamburger from "../../../assets/images/icons/hamburger.png";
import PlusIcon from "../../../assets/images/icons/PlusIcon.svg";
import Stop from "../../../assets/images/icons/stop.png";
import EditIcon from "../../../assets/images/icons/editicon.svg";
import DeleteIcon from "../../../assets/images/icons/deleteicon.svg";
import Checkmark from "../../../assets/images/icons/checkmark.svg";
import Consent from "../../../assets/images/icons/consent.svg";
import { Link } from "react-router-dom";
import "./PatientDetail.css";
import { PatientMedications } from "../BookAppointment/PatientMedications/PatientMedications";

const PatientDetail = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const columns = [
    {
      title: "",
      dataIndex: "action",
      key: "action",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Entry",
      dataIndex: "entry",
      key: "entry",
    },
    {
      title: "Stop",
      dataIndex: "stop",
      key: "stop",
    },
  ];
  const dataSource = [
    {
      key: "1",
      action: (
        <>
          <span className="icon-wrap">
            <Image src={Checkmark} />
          </span>
        </>
      ),
      name: "Penicillin",
      type: "Rash",
      date: "12/1/23",
      entry: "Dr Jones",
      stop: (
        <>
          <Image src={Stop} />
        </>
      ),
    },
  ];
  const data = [
    {
      key: "1",
      action: (
        <>
          <span className="icon-wrap">
            <Image src={Checkmark} />
          </span>
        </>
      ),
      name: "Penicillin",
      type: "Rash",
      date: "12/1/23",
      entry: "Dr Jones",
      stop: (
        <>
          <Image src={Stop} />
        </>
      ),
    },
    {
      key: "2",
      action: (
        <>
          <span className="icon-wrap">
            <Image src={Checkmark} />
          </span>
        </>
      ),
      name: "Penicillin",
      type: "Rash",
      date: "12/1/23",
      entry: "Dr Jones",
      stop: (
        <>
          <Image src={Stop} />
        </>
      ),
    },
    {
      key: "3",
      action: (
        <>
          <span className="icon-wrap">
            <Image src={Checkmark} />
          </span>
        </>
      ),
      name: "Penicillin",
      type: "Rash",
      date: "12/1/23",
      entry: "Dr Jones",
      stop: (
        <>
          <Image src={Stop} />
        </>
      ),
    },
  ];
  const items = [
    {
      number: 1,
      text: (
        <>
          <div className="d-flex justify-content-between list-content-wrap">
            <span className="text-ellipsis text-wrap">
              Mother - died Carcinoma of the Oesophagus in 1988, age 56 years
            </span>
            <span className="flex-shrink-0">
              <Image src={EditIcon} className="me-3" />
              <Image src={DeleteIcon} />
            </span>
          </div>
        </>
      ),
    },
    {
      number: 2,
      text: (
        <>
          <div className="d-flex justify-content-between list-content-wrap">
            <span className="text-ellipsis text-wrap">
              Father - COPD, IHD, MI
            </span>
            <span className="flex-shrink-0">
              <Image src={EditIcon} className="me-3" />
              <Image src={DeleteIcon} />
            </span>
          </div>
        </>
      ),
    },
    {
      number: 3,
      text: (
        <>
          <div className="d-flex justify-content-between list-content-wrap">
            <span className="text-ellipsis text-wrap">
              Sister - No Consent to share medical history
            </span>
            <span className="flex-shrink-0">
              <Image src={EditIcon} className="me-3" />
              <Image src={DeleteIcon} />
            </span>
          </div>
        </>
      ),
    },
    {
      number: 4,
      text: (
        <>
          <div className="d-flex justify-content-between list-content-wrap">
            <span className="text-ellipsis text-wrap">
              Brother - No Consent to share medical history
            </span>
            <span className="flex-shrink-0">
              <Image src={EditIcon} className="me-3" />
              <Image src={DeleteIcon} />
            </span>
          </div>
        </>
      ),
    },
  ];
  const ConsentItems = [
    {
      number: 1,
      text: (
        <>
          <div className="d-flex justify-content-between list-content-wrap">
            <span className="text-ellipsis text-wrap">Text</span>
            <span className="flex-shrink-0">
              <Image src={EditIcon} className="me-3" />
              <Image src={Consent} />
            </span>
          </div>
        </>
      ),
    },
    {
      number: 2,
      text: (
        <>
          <div className="d-flex justify-content-between list-content-wrap">
            <span className="text-ellipsis text-wrap">Email</span>
            <span className="flex-shrink-0">
              <Image src={EditIcon} className="me-3" />
              <Image src={Consent} />
            </span>
          </div>
        </>
      ),
    },
    {
      number: 3,
      text: (
        <>
          <div className="d-flex justify-content-between list-content-wrap">
            <span className="text-ellipsis text-wrap">Phone</span>
            <span className="flex-shrink-0">
              <Image src={EditIcon} className="me-3" />
              <Image src={Consent} />
            </span>
          </div>
        </>
      ),
    },
    {
      number: 4,
      text: (
        <>
          <div className="d-flex justify-content-between list-content-wrap">
            <span className="text-ellipsis text-wrap">Post</span>
            <span className="flex-shrink-0">
              <Image src={EditIcon} className="me-3" />
              <Image src={Consent} />
            </span>
          </div>
        </>
      ),
    },
  ];
  const Socialcolumns = [
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
    },
  ];
  const SocialData = [
    {
      key: "1",
      type: (
        <span className="link-wrap">
          <Link>Smoking:</Link> Ex-smoker (50 PY)
        </span>
      ),
      date: <span className="text-manatee">12/1/23</span>,
      name: <span className="text-manatee">Dr Jones</span>,
      action: (
        <>
          <div className="d-flex align-items-center action-wrap">
            <Button className="transparent-link">Add</Button>
            <Image src={DeleteIcon} />
          </div>
        </>
      ),
    },
    {
      key: "2",
      type: (
        <span className="link-wrap">
          <Link>Home:</Link> Lives with son
        </span>
      ),
      date: <span className="text-manatee">12/1/23</span>,
      name: <span className="text-manatee">Dr Jones</span>,
      action: (
        <>
          <div className="d-flex align-items-center action-wrap">
            <Button className="transparent-link">Add</Button>
            <Image src={DeleteIcon} />
          </div>
        </>
      ),
    },
    {
      key: "3",
      type: (
        <span className="link-wrap">
          <Link>Occupation:</Link> Retired teacher
        </span>
      ),
      date: <span className="text-manatee">12/1/23</span>,
      name: <span className="text-manatee">Dr Jones</span>,
      action: (
        <>
          <div className="d-flex align-items-center action-wrap">
            <Button className="transparent-link">Add</Button>
            <Image src={DeleteIcon} />
          </div>
        </>
      ),
    },
    {
      key: "4",
      type: (
        <span className="link-wrap">
          <Link>Alcohol:</Link> Nil
        </span>
      ),
      date: <span className="text-manatee">12/1/23</span>,
      name: <span className="text-manatee">Dr Jones</span>,
      action: (
        <>
          <div className="d-flex align-items-center action-wrap">
            <Button className="transparent-link">Add</Button>
            <Image src={DeleteIcon} />
          </div>
        </>
      ),
    },
  ];
  const PreferencesData = [
    {
      key: "1",
      type: (
        <span className="link-wrap">
          <Link>Language:</Link> English
        </span>
      ),
      date: <span className="text-manatee">12/1/23</span>,
      name: <span className="text-manatee">Dr Jones</span>,
      action: (
        <>
          <div className="d-flex align-items-center action-wrap">
            <Button className="transparent-link">Add</Button>
            <Image src={DeleteIcon} />
          </div>
        </>
      ),
    },
    {
      key: "2",
      type: (
        <span className="link-wrap">
          <Link>Religion:</Link> Catholic
        </span>
      ),
      date: <span className="text-manatee">12/1/23</span>,
      name: <span className="text-manatee">Dr Jones</span>,
      action: (
        <>
          <div className="d-flex align-items-center action-wrap">
            <Button className="transparent-link">Add</Button>
            <Image src={DeleteIcon} />
          </div>
        </>
      ),
    },
    {
      key: "3",
      type: (
        <span className="link-wrap">
          <Link> Spiritual practices:</Link> Nil
        </span>
      ),
      date: <span className="text-manatee">12/1/23</span>,
      name: <span className="text-manatee">Dr Jones</span>,
      action: (
        <>
          <div className="d-flex align-items-center action-wrap">
            <Button className="transparent-link">Add</Button>
            <Image src={DeleteIcon} />
          </div>
        </>
      ),
    },
    {
      key: "4",
      type: (
        <span className="link-wrap">
          <Link>Culture:</Link> Irish
        </span>
      ),
      date: <span className="text-manatee">12/1/23</span>,
      name: <span className="text-manatee">Dr Jones</span>,
      action: (
        <>
          <div className="d-flex align-items-center action-wrap">
            <Button className="transparent-link">Add</Button>
            <Image src={DeleteIcon} />
          </div>
        </>
      ),
    },
  ];
  const documentDataItems = [
    {
      key: "1",
      label: (
        <>
          <div className="d-flex align-items-center">
            <span className="icon-wrap purple">{SVGIcons.Details}</span>
            <span>Consult</span>
          </div>
        </>
      ),
      children: (
        <>
          <h3>Consult</h3>
        </>
      ),
    },
    {
      key: "2",
      label: (
        <>
          <div className="d-flex align-items-center">
            <span className="icon-wrap pink">{SVGIcons.Details}</span>
            <span>Details</span>
          </div>
        </>
      ),
      children: (
        <>
          <div className="patient-detail">
            <div className="patient-detail-cardbox">
              <div className="patient-detail-cardbox-item1 d-flex flex-column">
                <div className="card-spacing patient-detail-card-profile">
                  <div className="d-flex align-items-center justify-content-between page-title">
                    <h2 className="h2 fw-600 text-stratos  mb-0 me-2">
                      Patient Detail Summary
                    </h2>
                    <Button className="custom_btn">Add New</Button>
                  </div>
                  <div className="patient-detail-card bg patient-detail-summary-wrap">
                    {/* <div> */}
                    <div className="patient-header-wrap">
                      <div className="d-flex align-items-center flex-sm-nowrap flex-wrap justify-content-center justify-content-sm-start">
                        <div className="patient-profile-img-wrap flex-shrink-0 ">
                          <Image src={PatientImg} />
                        </div>
                        <div className="patient-header-content-wrap">
                          <h3 className="h3 fw-600 text-ellipsis">
                            James Targaryen
                          </h3>
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
                          <h6 className="h6 text-stratos fw-500 mb-0">
                            0871234567
                          </h6>
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
                          <h6 className="h6 text-stratos fw-500 mb-0 ">
                            24 March 2023
                          </h6>
                        </div>
                      </div>
                    </div>
                    {/* </div> */}
                  </div>
                </div>
                <div className="patient-detail-card bg">
                  <div className="d-flex align-items-center justify-content-between documents-title-wrap allergies-wrap">
                    <h4 className="h4 fw-600 text-stratos mb-0 text-ellipsis text-break">Allergies</h4>
                    <Button className="transaparent-btn d-flex align-items-center justify-content-end">
                      <span className="d-inline-block me-3">Add new</span>
                      <Image src={PlusIcon} />
                    </Button>
                  </div>
                  <div className="patient-table-wrap symptoms-table-wrap">
                    <Table
                      dataSource={dataSource}
                      columns={columns}
                      pagination={false}
                    />
                  </div>
                  <div className="intolerance-wrap">
                    <h4 className="h4 fw-600 text-stratos text-ellipsis text-break">Intolerance</h4>
                    <div className="patient-table-wrap symptoms-table-wrap">
                      <Table
                        dataSource={data}
                        columns={columns}
                        pagination={false}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="patient-detail-cardbox-item2 d-flex flex-column">
                <div className="patient-detail-card bg patients-tasks-wrap">
                  <div className="d-flex align-items-center justify-content-between documents-title-wrap">
                    <h4 className="h4 fw-600 text-stratos mb-0 text-ellipsis text-break">
                      Family Medical History
                    </h4>
                    <Button className="transaparent-btn d-flex align-items-center justify-content-end">
                      <span className="d-inline-block me-3">Add new</span>
                      <Image src={PlusIcon} />
                    </Button>
                  </div>
                  <div className="documents-link-wrap">
                    <ol>
                      {items.map((item, index) => (
                        <li key={index}>
                          <span className="number-wrap">{item.number} </span>
                          <span className="w-100">{item.text}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
                <div className="patient-detail-card bg">
                  <div className="d-flex align-items-center justify-content-between documents-title-wrap">
                    <div className="h4 fw-600 text-stratos mb-0 d-flex align-items-center text-ellipsis text-break">
                      Social{SVGIcons.Pencil}
                    </div>
                    <Button className="transaparent-btn d-flex align-items-center justify-content-end">
                      <span className="d-inline-block me-3">Add new</span>
                      <Image src={PlusIcon} />
                    </Button>
                  </div>
                  <div className="patient-table-wrap documents-link-wrap">
                    <Table
                      dataSource={SocialData}
                      columns={Socialcolumns}
                      pagination={false}
                    />
                  </div>
                </div>
                <div className="patient-detail-card bg">
                  <div className="d-flex align-items-center justify-content-between documents-title-wrap">
                    <div className="h4 fw-600 text-stratos mb-0 d-flex align-items-center text-ellipsis text-break">
                      Preferences{SVGIcons.Pencil}
                    </div>
                    <Button className="transaparent-btn d-flex align-items-center justify-content-end">
                      <span className="d-inline-block me-3">Add new</span>
                      <Image src={PlusIcon} />
                    </Button>
                  </div>
                  <div className="patient-table-wrap documents-link-wrap">
                    <Table
                      dataSource={PreferencesData}
                      columns={Socialcolumns}
                      pagination={false}
                    />
                  </div>
                </div>
              </div>
              <div className="patient-detail-cardbox-item3 d-flex flex-column">
                <div className="patient-detail-card bg">
                  <div className="d-flex align-items-center justify-content-between documents-title-wrap">
                    <Link
                      to=""
                      onClick={showModal}
                      className="h4 fw-600 text-stratos mb-0 d-flex align-items-center text-ellipsis text-break"
                    >
                      Baseline Details{SVGIcons.Pencil}
                    </Link>
                  </div>
                  <div className="documents-link-wrap">
                    <div className="documents-link-items-wrap d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center details-label-wrap me-2">
                        <span className="icon-wrap">
                          <Image src={Checkmark} />
                        </span>
                        <span className="mb-0 text-ellipsis text-break">
                          Height
                        </span>
                      </div>
                      <span className="h6 text-manatee mb-0 details-value-wrap d-inline-block text-ellipsis text-break me-2">
                        193 cm
                      </span>
                      <Image src={DeleteIcon} />
                    </div>
                    <div className="documents-link-items-wrap d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center details-label-wrap me-2">
                        <span className="icon-wrap">
                          <Image src={Checkmark} />
                        </span>
                        <span className="mb-0 text-ellipsis text-break">
                          Weight
                        </span>
                      </div>
                      <span className="h6 text-manatee mb-0 details-value-wrap d-inline-block text-ellipsis text-break me-2">
                        Vomitting
                      </span>
                      <Image src={DeleteIcon} />
                    </div>
                    <div className="documents-link-items-wrap d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center details-label-wrap me-2">
                        <span className="icon-wrap">
                          <Image src={Checkmark} />
                        </span>
                        <span className="mb-0 text-ellipsis text-break">
                          Waist
                        </span>
                      </div>
                      <span className="h6 text-manatee mb-0 details-value-wrap d-inline-block text-ellipsis text-break me-2">
                        Vomitting
                      </span>
                      <Image src={DeleteIcon} />
                    </div>
                    <div className="documents-link-items-wrap d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center details-label-wrap me-2">
                        <span className="icon-wrap">
                          <Image src={Checkmark} />
                        </span>
                        <span className="mb-0 text-ellipsis text-break">
                          BP
                        </span>
                      </div>
                      <span className="h6 text-manatee mb-0 details-value-wrap d-inline-block text-ellipsis text-break me-2">
                        193 cm
                      </span>
                      <Image src={DeleteIcon} />
                    </div>
                  </div>
                </div>
                <div className="patient-detail-card bg">
                  <div className="d-flex align-items-center justify-content-between documents-title-wrap">
                    <div className="h4 fw-600 text-stratos mb-0 d-flex align-items-center">
                      Health Identifiers{SVGIcons.Pencil}
                    </div>
                  </div>
                  <div className="documents-link-wrap">
                    <div className="documents-link-items-wrap d-flex align-items-center justify-content-between">
                      <span className="d-inline-block text-ellipsis text-break health-label-wrap text-decoration-underline">
                        Private:
                      </span>
                      <span className="h6 text-manatee mb-0  d-inline-block text-ellipsis text-break">
                        VHI - 1456524
                      </span>
                    </div>
                    <div className="documents-link-items-wrap d-flex align-items-center justify-content-between">
                      <span className="d-inline-block text-ellipsis text-break health-label-wrap text-decoration-underline">
                        Medical Card No.
                      </span>
                      <span className="h6 text-manatee mb-0  d-inline-block text-ellipsis text-break">
                        4326328
                      </span>
                    </div>
                    <div className="documents-link-items-wrap d-flex align-items-center justify-content-between">
                      <span className="d-inline-block text-ellipsis text-break health-label-wrap text-decoration-underline">
                        IHI
                      </span>
                      <span className="h6 text-manatee mb-0  d-inline-block text-ellipsis text-break">
                        78563245
                      </span>
                    </div>
                    <div className="documents-link-items-wrap d-flex align-items-center justify-content-between">
                      <span className="d-inline-block text-ellipsis text-break health-label-wrap text-decoration-underline">
                        PPSN:
                      </span>
                      <span className="h6 text-manatee mb-0  d-inline-block text-ellipsis text-break">
                        8765346J
                      </span>
                    </div>
                  </div>
                </div>
                <div className="patient-detail-card bg patients-tasks-wrap">
                  <div className="d-flex align-items-center justify-content-between documents-title-wrap">
                    <div className="h4 fw-600 text-stratos mb-0 d-flex align-items-center text-ellipsis text-break">
                      Consent{SVGIcons.Pencil}
                    </div>
                    <Button className="transaparent-btn d-flex align-items-center justify-content-end">
                      <span className="d-inline-block me-3">Add new</span>
                      <Image src={PlusIcon} />
                    </Button>
                  </div>
                  <div className="documents-link-wrap">
                    <ol>
                      {ConsentItems.map((item, index) => (
                        <li key={index}>
                          <span className="number-wrap">{item.number} </span>
                          <span className="w-100">{item.text}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>
            </div>
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
            <span>Medications</span>
          </div>
        </>
      ),
      children: (
        <>
          <PatientMedications />
          {/* <h3>Medications</h3> */}
        </>
      ),
    },
    {
      key: "4",
      label: (
        <>
          <div className="d-flex align-items-center">
            <span className="icon-wrap yellow">{SVGIcons.Details}</span>
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
            <span className="icon-wrap green">{SVGIcons.Details}</span>
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
            <span className="icon-wrap red">{SVGIcons.Details}</span>
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
            <span className="icon-wrap purple">{SVGIcons.Details}</span>
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
      <div className="dashboard-bg patient-detail">
        <div className="documents-tabs-wrap">
          <Tabs
            defaultActiveKey="1"
            items={documentDataItems}
            moreIcon={<Image src={hamburger} />}
          />
        </div>
      </div>
      <Modal
        title="Baseline Details"
        centered
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Save"
        className="baseline-modal"
      >
        <Form>
          <div className="baseline-form-gridbox">
            <div className="form-grid-item1">
              <div className="physical-measurements-wrap">
                <span className="title-wrap text-black fw-700 d-inline-block primary-font mb-5">
                  Physical Measurements
                </span>
                <div className="form-content-wrap form-spacing">
                  <div className="custom-label-wrap">
                    <span className="h6 small mb-0 text-black fw-500 primary-font text-break">
                      Weight (kg)
                    </span>
                  </div>
                  <div className="custom-input-wrap grid-item">
                    <Input placeholder="0.00" />
                    <Input placeholder="0 Stone" />
                  </div>
                </div>
                <div className="form-content-wrap form-spacing">
                  <div className="custom-label-wrap">
                    <span className="h6 small mb-0 text-black fw-500 primary-font text-break">
                      Height (cm)
                    </span>
                  </div>
                  <div className="custom-input-wrap grid-item">
                    <Input placeholder="0.00" />
                    <Input placeholder="0 feet" />
                  </div>
                </div>
                <div className="form-content-wrap form-spacing">
                  <div className="custom-label-wrap">
                    <span className="h6 small mb-0 text-black fw-500 primary-font text-break">
                      Blood Group
                    </span>
                  </div>
                  <div className="custom-input-wrap">
                    <Select
                      defaultValue="A+ve"
                      suffixIcon={SVGIcons.DownArrow}
                      options={[
                        {
                          value: "A+ve",
                          label: "A+ve",
                        },
                        {
                          value: "B+ve",
                          label: "B+ve",
                        },
                        {
                          value: "O+ve",
                          label: "O+ve",
                        },
                      ]}
                    />
                  </div>
                </div>
                <div className="form-content-wrap form-spacing">
                  <div className="custom-label-wrap">
                    <span className="h6 small mb-0 text-black fw-500 primary-font text-break">
                      Abdominal Circumference (cm)
                    </span>
                  </div>
                  <div className="custom-input-wrap ">
                    <Input placeholder="" />
                  </div>
                </div>
                <div className="form-content-wrap form-spacing">
                  <div className="custom-label-wrap">
                    <span className="h6 small mb-0 text-black fw-500 primary-font text-break">
                      Head Circumference (cm)
                    </span>
                  </div>
                  <div className="custom-input-wrap ">
                    <Input placeholder="" />
                  </div>
                </div>
              </div>
              <div className="social-history-wrap">
                <span className="title-wrap text-black fw-700 d-inline-block primary-font mb-5">
                  Social History
                </span>
                <div className="form-content-wrap form-spacing">
                  <div className="custom-label-wrap">
                    <span className="h6 small mb-0 text-black fw-500 primary-font text-break">
                      Smoke Status
                    </span>
                  </div>
                  <div className="custom-input-wrap">
                    <Select
                      defaultValue="danger"
                      suffixIcon={SVGIcons.DownArrow}
                      options={[
                        {
                          value: "good",
                          label: "good",
                        },
                        {
                          value: "danger",
                          label: "danger",
                        },
                      ]}
                    />
                  </div>
                </div>
                <div className="form-content-wrap form-spacing">
                  <div className="custom-label-wrap">
                    <span className="h6 small mb-0 text-black fw-500 primary-font text-break">
                      Smoke per day
                    </span>
                  </div>
                  <div className="custom-input-wrap ">
                    <Input placeholder="" />
                  </div>
                </div>
                <div className="form-content-wrap form-spacing">
                  <div className="custom-label-wrap">
                    <span className="h6 small mb-0 text-black fw-500 primary-font text-break">
                      Ex-Smoker (Years)
                    </span>
                  </div>
                  <div className="custom-input-wrap ">
                    <Input placeholder="" />
                  </div>
                </div>
                <div className="form-content-wrap form-spacing">
                  <div className="custom-label-wrap">
                    <span className="h6 small mb-0 text-black fw-500 primary-font text-break">
                      Smoking Start Date
                    </span>
                  </div>
                  <div className="custom-input-wrap">
                    <Select
                      defaultValue="date"
                      suffixIcon={SVGIcons.DownArrow}
                      options={[
                        {
                          value: "23/02/2024",
                          label: "23/02/2024",
                        },
                        {
                          value: "20/02/2024",
                          label: "20/02/2024",
                        },
                      ]}
                    />
                  </div>
                </div>
                <div className="form-content-wrap form-spacing">
                  <div className="custom-label-wrap">
                    <span className="h6 small mb-0 text-black fw-500 primary-font text-break">
                      Drinker Status
                    </span>
                  </div>
                  <div className="custom-input-wrap">
                    <Select
                      defaultValue="danger"
                      suffixIcon={SVGIcons.DownArrow}
                      options={[
                        {
                          value: "good",
                          label: "good",
                        },
                        {
                          value: "danger",
                          label: "danger",
                        },
                      ]}
                    />
                  </div>
                </div>
                <div className="form-content-wrap form-spacing">
                  <div className="custom-label-wrap">
                    <span className="h6 small mb-0 text-black fw-500 primary-font text-break">
                      Weekly Alcohol
                    </span>
                  </div>
                  <div className="custom-input-wrap ">
                    <Input placeholder="" />
                  </div>
                </div>
                <div className="form-content-wrap form-spacing">
                  <div className="custom-label-wrap">
                    <span className="h6 small mb-0 text-black fw-500 primary-font text-break">
                      Alcohol Start Date
                    </span>
                  </div>
                  <div className="custom-input-wrap">
                    <Select
                      defaultValue="date"
                      suffixIcon={SVGIcons.DownArrow}
                      options={[
                        {
                          value: "23/02/2024",
                          label: "23/02/2024",
                        },
                        {
                          value: "20/02/2024",
                          label: "20/02/2024",
                        },
                      ]}
                    />
                  </div>
                </div>
                <div className="form-content-wrap form-spacing checkbox-wrapper">
                  <div className="custom-label-wrap">
                    <span className="h6 small mb-0 text-black fw-500 primary-font text-break">
                      Family CVD History
                    </span>
                  </div>
                  <div className="custom-input-wrap custom-checkbox-wrap d-flex align-items-center">
                    <Checkbox>LVH</Checkbox>
                    <Checkbox>LVH</Checkbox>
                  </div>
                </div>
              </div>
            </div>
            <div className="form-grid-item2">
              <div className="physical-measurements-wrap">
                <span className="title-wrap text-black fw-700 d-inline-block primary-font mb-5">
                  BP, Pulse and Other
                </span>
                <div className="form-content-wrap form-spacing">
                  <div className="custom-label-wrap">
                    <span className="h6 small mb-0 text-black fw-500 primary-font text-break">
                      Systolic
                    </span>
                  </div>
                  <div className="custom-input-wrap">
                    <Input placeholder="" />
                  </div>
                </div>
                <div className="form-content-wrap form-spacing">
                  <div className="custom-label-wrap">
                    <span className="h6 small mb-0 text-black fw-500 primary-font text-break">
                      Diastolic
                    </span>
                  </div>
                  <div className="custom-input-wrap">
                    <Input placeholder="" />
                  </div>
                </div>
                <div className="form-content-wrap form-spacing">
                  <div className="custom-label-wrap">
                    <span className="h6 small mb-0 text-black fw-500 primary-font text-break">
                      Cholesterol
                    </span>
                  </div>
                  <div className="custom-input-wrap">
                    <Input placeholder="" />
                  </div>
                </div>
                <div className="form-content-wrap form-spacing">
                  <div className="custom-label-wrap">
                    <span className="h6 small mb-0 text-black fw-500 primary-font text-break">
                      LDL
                    </span>
                  </div>
                  <div className="custom-input-wrap">
                    <Input placeholder="" />
                  </div>
                </div>
                <div className="form-content-wrap form-spacing">
                  <div className="custom-label-wrap">
                    <span className="h6 small mb-0 text-black fw-500 primary-font text-break">
                      HDL
                    </span>
                  </div>
                  <div className="custom-input-wrap">
                    <Input placeholder="" />
                  </div>
                </div>
                <div className="form-content-wrap form-spacing">
                  <div className="custom-label-wrap">
                    <span className="h6 small mb-0 text-black fw-500 primary-font text-break">
                      Pulse
                    </span>
                  </div>
                  <div className="custom-input-wrap">
                    <Input placeholder="" />
                  </div>
                </div>
                <div className="form-content-wrap form-spacing">
                  <div className="custom-label-wrap">
                    <span className="h6 small mb-0 text-black fw-500 primary-font text-break">
                      Pulse Rhythm
                    </span>
                  </div>
                  <div className="custom-input-wrap">
                    <Select
                      defaultValue="normal"
                      suffixIcon={SVGIcons.DownArrow}
                      options={[
                        {
                          value: "normal",
                          label: "normal",
                        },
                        {
                          value: "irregular",
                          label: "irregular",
                        },
                      ]}
                    />
                  </div>
                </div>
                <div className="form-content-wrap form-spacing">
                  <div className="custom-label-wrap">
                    <span className="h6 small mb-0 text-black fw-500 primary-font text-break">
                      Temp (celsius)
                    </span>
                  </div>
                  <div className="custom-input-wrap grid-item">
                    <Input placeholder="" />
                    <Input placeholder="Of" />
                  </div>
                </div>
                <div className="form-content-wrap form-spacing">
                  <div className="custom-label-wrap">
                    <span className="h6 small mb-0 text-black fw-500 primary-font text-break">
                      Peak Flow
                    </span>
                  </div>
                  <div className="custom-input-wrap ">
                    <Input placeholder="" />
                  </div>
                </div>
                <div className="form-content-wrap form-spacing">
                  <div className="custom-label-wrap">
                    <span className="h6 small mb-0 text-black fw-500 primary-font text-break">
                      Respiratory Rate
                    </span>
                  </div>
                  <div className="custom-input-wrap ">
                    <Input placeholder="" />
                  </div>
                </div>
                <div className="form-content-wrap form-spacing">
                  <div className="custom-label-wrap">
                    <span className="h6 small mb-0 text-black fw-500 primary-font text-break">
                      Ejection Fraction
                    </span>
                  </div>
                  <div className="custom-input-wrap ">
                    <Input placeholder="" />
                  </div>
                </div>
                <div className="form-content-wrap form-spacing">
                  <div className="custom-label-wrap">
                    <span className="h6 small mb-0 text-black fw-500 primary-font text-break">
                      Physical Exercise
                    </span>
                  </div>
                  <div className="custom-input-wrap">
                    <Select
                      defaultValue="strength"
                      suffixIcon={SVGIcons.DownArrow}
                      options={[
                        {
                          value: "strength",
                          label: "strength",
                        },
                        {
                          value: "balance",
                          label: "balance",
                        },
                      ]}
                    />
                  </div>
                </div>
                <div className="form-content-wrap form-spacing">
                  <div className="custom-label-wrap">
                    <span className="h6 small mb-0 text-black fw-500 primary-font text-break">
                      Current occupation
                    </span>
                  </div>
                  <div className="custom-input-wrap ">
                    <Input placeholder="" />
                  </div>
                </div>
                <div className="form-content-wrap form-spacing">
                  <div className="custom-label-wrap">
                    <span className="h6 small mb-0 text-black fw-500 primary-font text-break">
                      Substance Misuse
                    </span>
                  </div>
                  <div className="custom-input-wrap ">
                    <Input placeholder="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default PatientDetail;
