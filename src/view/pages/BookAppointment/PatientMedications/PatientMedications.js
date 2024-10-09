import React, { useState } from "react";
import {
  Table,
  Checkbox,
  Form,
  Select,
  Modal,
  Input,
  DatePicker,
  TimePicker,
} from "antd";
import { Image, Button, Accordion } from "react-bootstrap";
import Male from "../../../../assets/images/icons/male.svg";
import Diabeties from "../../../../assets/images/icons/diabeties.svg";
import PatientImg from "../../../../assets/images/cover/patient.jpg";
import Expand from "../../../../assets/images/icons/expand.svg";
import Stop from "../../../../assets/images/icons/stop.png";
import FilterImg from "../../../../assets/images/icons/filter.svg";
import PlusIcon from "../../../../assets/images/icons/PlusIcon.svg";
import Checkmark from "../../../../assets/images/icons/checkmark.svg";
import { SVGIcons } from "../../../../components/Data/SVGIcons";
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import "./PatientMedications.css";

export const PatientMedications = () => {
  // const [selectionType, setSelectionType] = useState("checkbox");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPrescriptionModalOpen, setIsPrescriptionModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const showModalNew = () => {
    setIsPrescriptionModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleOkNew = () => {
    setIsPrescriptionModalOpen(false);
  };
  const handleCancelNew = () => {
    setIsPrescriptionModalOpen(false);
  };

  // const rowSelection = {
  //   onChange: (selectedRowKeys, selectedRows) => {
  //     console.log(
  //       `selectedRowKeys: ${selectedRowKeys}`,
  //       "selectedRows: ",
  //       selectedRows
  //     );
  //   },
  // };
  const columns = [
    {
      title: "Drug Name",
      dataIndex: "drugname",
    },
    {
      title: "Dose",
      dataIndex: "dose",
    },
    {
      title: "Form",
      dataIndex: "form",
    },
    {
      title: "Route",
      dataIndex: "route",
    },
    {
      title: "Frequency",
      dataIndex: "frequency",
    },
    {
      title: "Repeat",
      dataIndex: "repeat",
    },
    {
      title: "Start Date",
      dataIndex: "startdate",
    },
    {
      title: "Last Prescribed",
      dataIndex: "lastprescribed",
    },
    {
      title: "Next Renewal Date",
      dataIndex: "nextrenewaldate",
    },
    {
      title: (
        <div className=" custom-checkbox-wrap">
          <Checkbox />
        </div>
      ),
      dataIndex: "checkbox1",
    },
    {
      title: (
        <div className=" custom-checkbox-wrap">
          <Checkbox />
        </div>
      ),
      dataIndex: "checkbox2",
    },
    {
      title: (
        <>
          <div className="btn-wrap p-0">
            <Button className="custom_btn">Re-Issue All</Button>
          </div>
        </>
      ),
      dataIndex: "action",
    },
  ];
  const data = [
    {
      key: "1",
      drugname: (
        <div className="d-flex align-items-center details-label-wrap me-2">
          <span className="icon-wrap">
            <Image src={Checkmark} />
          </span>
          <span className="mb-0 text-ellipsis text-break">Atorvastatin</span>
        </div>
      ),
      dose: "20mg",
      form: "Tablet",
      route: "PO",
      frequency: "Daily",
      repeat: "2 times",
      startdate: "22/4/2023",
      lastprescribed: "22/4/2023",
      nextrenewaldate: "22/4/2023",
      checkbox1: (
        <Image src={Stop} onClick={showModal} className="warning-img" />
      ),
      checkbox2: (
        <div className=" custom-checkbox-wrap">
          <Checkbox />
        </div>
      ),
      action: (
        <div className="btn-wrap p-0">
          <Button className="transparent-link">Re-Issue</Button>
        </div>
      ),
    },
    {
      key: "2",
      drugname: (
        <div className="d-flex align-items-center details-label-wrap me-2">
          <span className="icon-wrap">
            <Image src={Checkmark} />
          </span>
          <span className="mb-0 text-ellipsis text-break">Atorvastatin</span>
        </div>
      ),
      dose: "20mg",
      form: "Tablet",
      route: "PO",
      frequency: "Daily",
      repeat: "2 times",
      startdate: "22/4/2023",
      lastprescribed: "22/4/2023",
      nextrenewaldate: "22/4/2023",
      checkbox1: (
        <Image src={Stop} onClick={showModal} className="warning-img" />
      ),

      checkbox2: (
        <div className=" custom-checkbox-wrap">
          <Checkbox />
        </div>
      ),
      action: (
        <div className="btn-wrap p-0">
          <Button className="transparent-link">Re-Issue</Button>
        </div>
      ),
    },
    {
      key: "3",
      drugname: (
        <div className="d-flex align-items-center details-label-wrap me-2">
          <span className="icon-wrap">
            <Image src={Checkmark} />
          </span>
          <span className="mb-0 text-ellipsis text-break">Atorvastatin</span>
        </div>
      ),
      dose: "20mg",
      form: "Tablet",
      route: "PO",
      frequency: "Daily",
      repeat: "2 times",
      startdate: "22/4/2023",
      lastprescribed: "22/4/2023",
      nextrenewaldate: "22/4/2023",
      checkbox1: (
        <Image src={Stop} onClick={showModal} className="warning-img" />
      ),

      checkbox2: (
        <div className=" custom-checkbox-wrap">
          <Checkbox />
        </div>
      ),
      action: (
        <div className="btn-wrap p-0">
          <Button className="transparent-link">Re-Issue</Button>
        </div>
      ),
    },
    {
      key: "4",
      drugname: (
        <div className="d-flex align-items-center details-label-wrap me-2">
          <span className="icon-wrap">
            <Image src={Checkmark} />
          </span>
          <span className="mb-0 text-ellipsis text-break">Atorvastatin</span>
        </div>
      ),
      dose: "20mg",
      form: "Tablet",
      route: "PO",
      frequency: "Daily",
      repeat: "2 times",
      startdate: "22/4/2023",
      lastprescribed: "22/4/2023",
      nextrenewaldate: "22/4/2023",
      checkbox1: (
        <Image src={Stop} onClick={showModal} className="warning-img" />
      ),

      checkbox2: (
        <div className=" custom-checkbox-wrap">
          <Checkbox />
        </div>
      ),
      action: (
        <div className="btn-wrap p-0">
          <Button className="transparent-link">Re-Issue</Button>
        </div>
      ),
    },
  ];
  return (
    <>
      <div className="patient-detail medications">
        <div className="medications-cardbox1-wrapper">
          <div className="patient-detail-cardbox-item1 d-flex flex-column ">
            <div className="card-spacing patient-detail-card-profile">
              <div className="d-inline-flex align-items-center justify-content-between page-title">
                <h2 className="h2 fw-600 text-stratos  mb-0 me-2">
                  Patient Detail Summary
                </h2>
                <Button className="custom_btn" onClick={showModalNew}>
                  Add New
                </Button>
              </div>
              <div className="patient-detail-card bg patient-detail-summary-wrap">
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
              </div>
            </div>
          </div>
          <div className="patient-detail-card bg">
            <div className="documents-title-wrap">
              <div className="d-flex align-items-center justify-content-between ">
                <h4 className="h4 fw-600 text-stratos mb-0 text-ellipsis text-break">
                  Recent Acute Prescriptions
                </h4>
                <Button className="transaparent-btn d-flex align-items-center justify-content-end">
                  <span className="d-inline-block me-3">Expand</span>
                  <Image src={Expand} />
                </Button>
              </div>
              <Link to="" className="link fw-600">
                History/Audit
              </Link>
            </div>
            <div className="recent-prescriptions-body">
              <div className="documents-link-wrap">
                <div className="d-flex justify-content-between align-items-center recent-prescriptions-item">
                  <div className="d-inline-flex align-items-center me-3 documents-link-items-wrap">
                    <span className="icon-wrap">
                      <Image src={Checkmark} />
                    </span>
                    <div className="recent-prescriptions-title-wrap">
                      <span className="fw-500 text-ellipsis text-break h6 mb-0">
                        Calvapen, 666mg, QDS x5/7
                      </span>
                    </div>
                  </div>
                  <div className="flex-shrink-0 date-label">
                    <span className="text-manatee">12/1/23</span>
                  </div>
                </div>
                <div className="d-inline-flex align-items-center btn-wrap">
                  <Button className="custom_btn">Open</Button>
                  <Button className="transparent-link">Re-Issue</Button>
                </div>
              </div>
              <div className="documents-link-wrap">
                <div className="d-flex justify-content-between align-items-center recent-prescriptions-item">
                  <div className="d-inline-flex align-items-center me-3 documents-link-items-wrap">
                    <span className="icon-wrap">
                      <Image src={Checkmark} />
                    </span>
                    <div className="recent-prescriptions-title-wrap">
                      <span className="fw-500 text-ellipsis text-break h6 mb-0">
                        Calvapen, 666mg, QDS x5/7
                      </span>
                    </div>
                  </div>
                  <div className="flex-shrink-0 date-label">
                    <span className="text-manatee">12/1/23</span>
                  </div>
                </div>
                <div className="d-inline-flex align-items-center btn-wrap">
                  <Button className="custom_btn">Open</Button>
                  <Button className="transparent-link">Re-Issue</Button>
                </div>
              </div>
              <div className="documents-link-wrap">
                <div className="d-flex justify-content-between align-items-center recent-prescriptions-item">
                  <div className="d-inline-flex align-items-center me-3 documents-link-items-wrap">
                    <span className="icon-wrap">
                      <Image src={Checkmark} />
                    </span>
                    <div className="recent-prescriptions-title-wrap">
                      <span className="fw-500 text-ellipsis text-break h6 mb-0">
                        Calvapen, 666mg, QDS x5/7
                      </span>
                    </div>
                  </div>
                  <div className="flex-shrink-0 date-label">
                    <span className="text-manatee">12/1/23</span>
                  </div>
                </div>
                <div className="d-inline-flex align-items-center btn-wrap">
                  <Button className="custom_btn">Open</Button>
                  <Button className="transparent-link">Re-Issue</Button>
                </div>
              </div>
            </div>
          </div>
          <div className="patient-detail-card bg">
            <div className="documents-title-wrap">
              <div className="d-flex flex-wrap  align-items-center justify-content-between">
                <h4 className="h4 fw-600 text-stratos mb-0 text-ellipsis text-break">
                  Medical History
                </h4>
                <div className="d-inline-flex align-items-center btn-wrap flex-shrink-0 flex-wrap">
                  <Button className="custom_btn pink small-btn">
                    Click To Register For CDM
                  </Button>
                  <Button className="custom_btn  small-btn">
                    Click To Claim OCF
                  </Button>
                </div>
              </div>
            </div>
            <div className="documents-link-wrap medical-history-wrap">
              <div className="d-flex align-items-center">
                <span className="icon-wrap">
                  <Image src={Checkmark} />
                </span>
                <span className="mb-0 text-ellipsis text-break">
                  I25: Chronic ischaemic heart disease.
                </span>
              </div>
              <div className="d-flex align-items-center">
                <span className="icon-wrap">
                  <Image src={Checkmark} />
                </span>
                <span className="mb-0 text-ellipsis text-break">
                  G45: Transient cerebral ischaemic attacks.
                </span>
              </div>
              <div className="d-flex align-items-center">
                <span className="icon-wrap">
                  <Image src={Checkmark} />
                </span>
                <span className="mb-0 text-ellipsis text-break">
                  I50: Heart failure Asthma.
                </span>
              </div>
              <div className="d-flex align-items-center">
                <span className="icon-wrap">
                  <Image src={Checkmark} />
                </span>
                <span className="mb-0 text-ellipsis text-break">
                  I64: Stroke, not specified as haemorrhage or infarction.
                </span>
              </div>
              <div className="d-flex align-items-center">
                <span className="icon-wrap">
                  <Image src={Checkmark} />
                </span>
                <span className="mb-0 text-ellipsis text-break">
                  G45: Transient cerebral ischaemic attacks.
                </span>
              </div>
              <div className="d-flex align-items-center">
                <span className="icon-wrap">
                  <Image src={Checkmark} />
                </span>
                <span className="mb-0 text-ellipsis text-break">
                  I50: Heart failure Asthma.
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="medications-cardbox2-wrapper">
          <div className="patient-detail-card bg">
            <div className="documents-title-wrap">
              <div className="d-flex align-items-center justify-content-between ">
                <h4 className="h4 fw-600 text-stratos mb-0 text-ellipsis text-break">
                  Send SMS
                </h4>
              </div>
            </div>
            <Form className="send-sms-form">
              <div className="d-flex flex-wrap align-items-center justify-content-between">
                <h6 className="h6 mb-0 text-stratos fw-500 primary-font me-3">
                  New Message
                </h6>
                <div className="flex-shrink-0 select-wrap">
                  <Select
                    defaultValue="SMS Templates"
                    suffixIcon={SVGIcons.DownArrow}
                    options={[
                      {
                        value: "SMS Templates",
                        label: "SMS Templates",
                      },
                      {
                        value: "SMS Templates1",
                        label: "SMS Templates1",
                      },
                    ]}
                  />
                  <Select
                    defaultValue="Recipient: James Targyan "
                    suffixIcon={SVGIcons.DownArrow}
                    options={[
                      {
                        value: "Recipient: James Targyan ",
                        label: "Recipient: James Targyan ",
                      },
                      {
                        value: "Recipient:",
                        label: "Recipient:",
                      },
                    ]}
                  />
                </div>
              </div>
              <TextArea rows={4} />
              <Button className="custom_btn w-100">Send SMS</Button>
            </Form>
          </div>
          <div className="patient-detail-card bg">
            <div className="documents-title-wrap title-wrap">
              <div className="d-flex align-items-center justify-content-between ">
                <h4 className="h4 fw-600 text-stratos mb-0 text-ellipsis text-break">
                  Long Term Prescriptions
                </h4>
                <div className="search_bar">
                  <input
                    type="search"
                    className="form-control"
                    placeholder="Search here..."
                  />
                </div>
              </div>
            </div>
            <div className="patient-table-wrap long-term-prescriptions-wrap">
              <Table
                pagination={false}
                // rowSelection={{}}
                columns={columns}
                dataSource={data}
                // scroll={{
                //   y: 220,
                // }}
              />
            </div>
          </div>
        </div>
        <div className="medications-cardbox3-wrapper">
          <div className="patient-detail-card bg visit-history">
            <div className="d-flex align-items-center justify-content-between documents-title-wrap">
              <h4 className="h4 fw-600 text-stratos mb-0">Visit History</h4>
              <Button className="transaparent-btn d-flex align-items-center justify-content-end">
                <span className="d-inline-block me-3">Add note</span>
                <Image src={PlusIcon} />
              </Button>
            </div>
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
                    <div className="d-flex align-items-center mb-3">
                      <span className="header-title">
                        {" "}
                        Consultation - Physio Paul
                      </span>
                      <div className="d-none d-sm-block">
                        <span className="label-wrap">Dec 2022</span>
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
                    <div className="d-flex align-items-center mb-3">
                      <span className="header-title">
                        {" "}
                        Consultation - Physio Paul
                      </span>
                      <div className="d-none d-sm-block">
                        <span className="label-wrap">Dec 2022</span>
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
                    <div className="d-flex align-items-center mb-3">
                      <span className="header-title">
                        {" "}
                        Consultation - Physio Paul
                      </span>
                      <div className="d-none d-sm-block">
                        <span className="label-wrap">Dec 2022</span>
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
          <div className="patient-detail-cardbox-item2 d-flex flex-column justify-content-between">
            <div className="patient-detail-card bg">
              <div className="documents-title-wrap">
                <div className="d-flex align-items-center justify-content-between ">
                  <h4 className="h4 fw-600 text-stratos mb-0 text-ellipsis text-break">
                    Antibiotic Prescribing.ie
                  </h4>
                </div>
              </div>
              <div className="documents-link-wrap antibiotic-content-wrap">
                <div className="d-flex align-items-center">
                  <span className="icon-wrap">
                    <Image src={Checkmark} />
                  </span>
                  <span className="mb-0 text-ellipsis text-break">
                    List of Conditions and Treatments Antibiotic Prescribing
                  </span>
                </div>
                <div className="d-flex conditions-list-items-wrap">
                  <ul className="list-unstyled list-items-wrap">
                    <li>
                      <Link to="">Eye and Ear</Link>
                    </li>
                    <li>
                      <Link to="">Upper Respiratory</Link>
                    </li>
                    <li>
                      <Link to="">Lower Respiratory</Link>
                    </li>
                    <li>
                      <Link to="">Influenza</Link>
                    </li>
                    <li>
                      <Link to="">Meningitis</Link>
                    </li>
                    <li>
                      <Link to="">Pregnancy and Postpartum</Link>
                    </li>
                    <li>
                      <Link to="">Infections</Link>
                    </li>
                  </ul>
                  <ul className="list-unstyled list-items-wrap">
                    <li>
                      <Link to="">Urinary</Link>
                    </li>
                    <li>
                      <Link to="">Gastro</Link>
                    </li>
                    <li>
                      <Link to="">Genital</Link>
                    </li>
                    <li>
                      <Link to="">Skin/Soft Tissue</Link>
                    </li>
                    <li>
                      <Link to="">Oral/Dental</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="patient-detail-card bg">
              <div className="d-flex justify-content-between">
                <h4 className="h4 text-stratos mb-0 me-2 fw-600">BNF Online</h4>
                <Link to="" className=" d-inline-block link purple">
                  View
                </Link>
              </div>
            </div>
            <div className="patient-detail-card bg">
              <div className="d-flex justify-content-between">
                <h4 className="h4 text-stratos mb-0 me-2 fw-600">
                  Exercise Prescriptions
                </h4>
                <Link to="" className=" d-inline-block link purple">
                  View
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Reason for Stopping The Drug Modal Start */}
      <Modal
        title="Reason for Stopping The Drug"
        centered
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Save"
        className="baseline-modal prescription-modal"
      >
        <Form>
          <div className="grid-item">
            <div className="form-content-wrap flex-column align-items-start">
              <div className="custom-label-wrap">
                <span className="h6 small mb-0 text-black fw-500 primary-font text-break">
                  Doctor
                </span>
              </div>
              <div className="custom-input-wrap ">
                <Input placeholder="Dr John Doe" />
              </div>
            </div>
            <div className="form-content-wrap flex-column align-items-start">
              <div className="custom-label-wrap">
                <span className="h6 small mb-0 text-black fw-500 primary-font text-break">
                  Date/Time
                </span>
              </div>
              <div className="custom-input-wrap d-flex align-items-center custom-rangepicker-wrapper">
                <DatePicker
                  placeholder="17, May 2023"
                  suffixIcon={SVGIcons.DownArrow}
                />
                <TimePicker
                  placeholder="12:00 PM"
                  use12Hours
                  format="h:mm A"
                  suffixIcon={SVGIcons.DownArrow}
                />
              </div>
            </div>
          </div>
          <div className="form-content-wrap flex-column align-items-start">
            <div className="custom-label-wrap">
              <span className="h6 small mb-0 text-black fw-500 primary-font text-break">
                Write reason below
              </span>
            </div>
            <div className="custom-input-wrap ">
              <TextArea rows={5} placeholder="Write here..." />
            </div>
          </div>
        </Form>
      </Modal>
      {/* Reason for Stopping The Drug Modal End */}

      {/* Add New Prescription Modal Start */}
      <Modal
        title="Add New Prescription"
        centered
        open={isPrescriptionModalOpen}
        onOk={handleOkNew}
        onCancel={handleCancelNew}
        okText="Save"
        className="baseline-modal prescription-modal add-new"
      >
        <Form>
          <div className="filter-wrap grid-item">
            <div className="form-content-wrap flex-column align-items-start">
              <div className="custom-label-wrap d-flex align-items-center justify-content-between w-100 mb-2">
                <span className="h6 small mb-0 text-black fw-500 primary-font text-break d-inline-block">
                  Drug
                </span>
                <div className="custom-checkbox-wrap finish-date-checkbox">
                  <Link to="" className="link underline">
                    Expand search
                  </Link>
                </div>
              </div>
              <div className="custom-input-wrap search-fliter-wrap position-relative">
                <Select
                  suffixIcon={null}
                  showSearch
                  placeholder="Search here..."
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option?.label ?? "").toLowerCase().includes(input)
                  }
                  filterSort={(optionA, optionB) =>
                    (optionA?.label ?? "")
                      .toLowerCase()
                      .localeCompare((optionB?.label ?? "").toLowerCase())
                  }
                  options={[
                    {
                      value: "1",
                      label: "Not Identified",
                    },
                    {
                      value: "2",
                      label: "Closed",
                    },
                    {
                      value: "3",
                      label: "Communicated",
                    },
                    {
                      value: "4",
                      label: "Identified",
                    },
                    {
                      value: "5",
                      label: "Resolved",
                    },
                    {
                      value: "6",
                      label: "Cancelled",
                    },
                  ]}
                />
                <div className="filter-text-wrap d-flex">
                  <h6 className="small mb-0 text-manatee fw-500 me-5 primary-font">
                    Filter
                  </h6>
                  <Image src={FilterImg} />
                </div>
              </div>
            </div>
            <div className="form-content-wrap flex-column align-items-start justify-content-between">
              <div className="custom-label-wrap">
                <span className="h6 small mb-0 text-black fw-500 primary-font text-break">
                  Dosage
                </span>
              </div>
              <div className="custom-input-wrap d-flex align-items-center custom-rangepicker-wrapper dosage-input-wrapper">
                <Input placeholder="7" />
                <Select
                  defaultValue="mg"
                  suffixIcon={SVGIcons.DownArrow}
                  options={[
                    {
                      value: "mg",
                      label: "mg",
                    },
                    {
                      value: "kg",
                      label: "kg",
                    },
                  ]}
                />
              </div>
            </div>
          </div>
          <div className="grid-item">
            <div className="form-content-wrap flex-column align-items-start">
              <div className="custom-label-wrap d-flex align-items-center justify-content-between w-100 mb-2">
                <span className="h6 small mb-0 text-black fw-500 primary-font text-break d-inline-block">
                  Start date
                </span>
                <div className="custom-checkbox-wrap finish-date-checkbox">
                  <Checkbox>Finish date</Checkbox>
                </div>
              </div>
              <div className="custom-input-wrap">
                <Select
                  defaultValue="24 March 2023"
                  suffixIcon={SVGIcons.DownArrow}
                  options={[
                    {
                      value: "24 March 2023",
                      label: "24 March 2023",
                    },
                    {
                      value: "23 March 2023",
                      label: "23 March 2023",
                    },
                  ]}
                />
              </div>
            </div>
            <div className="form-content-wrap flex-column align-items-start justify-content-between">
              <div className="custom-label-wrap">
                <span className="h6 small text-black fw-500 primary-font text-break d-inline-block">
                  Frequency
                </span>
              </div>
              <div className="custom-input-wrap">
                <Select
                  defaultValue="Once daily"
                  suffixIcon={SVGIcons.DownArrow}
                  options={[
                    {
                      value: "Once daily",
                      label: "Once daily",
                    },
                    {
                      value: "Daily",
                      label: "Daily",
                    },
                  ]}
                />
              </div>
            </div>
          </div>
          <div className="grid-item">
            <div className="form-content-wrap flex-column align-items-start">
              <div className="custom-label-wrap d-flex align-items-center justify-content-between">
                <span className="h6 small  text-black fw-500 primary-font text-break d-inline-block">
                  Duration
                </span>
              </div>
              <div className="d-flex align-items-center justify-content-between w-100">
                <div className="custom-checkbox-wrap duration-type-checkbox-wrap">
                  <Checkbox>Days</Checkbox>
                </div>
                <div className="custom-checkbox-wrap duration-type-checkbox-wrap">
                  <Checkbox>Weeks</Checkbox>
                </div>
                <div className="custom-checkbox-wrap duration-type-checkbox-wrap">
                  <Checkbox>Months</Checkbox>
                </div>
              </div>
            </div>
            <div className="form-content-wrap flex-column align-items-start">
              <div className="custom-label-wrap d-flex align-items-center justify-content-between">
                <span className="h6 small  text-black fw-500 primary-font text-break d-inline-block">
                  Duration
                </span>
              </div>
              <div className="custom-input-wrap">
                <Input placeholder="7 Days" />
              </div>
            </div>
          </div>
          <div className="grid-item">
            <div className="form-content-wrap flex-column align-items-start">
              <div className="custom-label-wrap d-flex align-items-center justify-content-between">
                <span className="h6 small  text-black fw-500 primary-font text-break d-inline-block">
                  Type
                </span>
              </div>
              <div className="d-flex align-items-center justify-content-between w-100">
                <div className="custom-checkbox-wrap duration-type-checkbox-wrap">
                  <Checkbox>Long term</Checkbox>
                </div>
                <div className="custom-checkbox-wrap duration-type-checkbox-wrap">
                  <Checkbox>PRN</Checkbox>
                </div>
                <div className="custom-checkbox-wrap duration-type-checkbox-wrap">
                  <Checkbox>Acute</Checkbox>
                </div>
              </div>
            </div>
            <div className="form-content-wrap flex-column align-items-start">
              <div className="custom-label-wrap d-flex align-items-center justify-content-between">
                <span className="h6 small  text-black fw-500 primary-font text-break d-inline-block">
                  Repeat
                </span>
              </div>
              <div className="custom-input-wrap">
                <Input placeholder="How many times?" />
              </div>
            </div>
          </div>
          <div className="grid-item">
            <div className="form-content-wrap flex-column align-items-start">
              <div className="custom-label-wrap d-flex align-items-center justify-content-between w-100">
                <span className="h6 small text-black fw-500 primary-font text-break d-inline-block">
                  Prescription templates
                </span>
              </div>
              <div className="custom-input-wrap">
                <Select
                  defaultValue="templates"
                  suffixIcon={SVGIcons.DownArrow}
                  options={[
                    {
                      value: "templates",
                      label: "templates",
                    },
                    {
                      value: "templates1",
                      label: "templates1",
                    },
                  ]}
                />
              </div>
            </div>
            <div className="form-content-wrap flex-column align-items-start">
              <div className="custom-label-wrap d-flex align-items-center justify-content-between w-100">
                <span className="h6 small  text-black fw-500 primary-font text-break d-inline-block">
                  Prescription
                </span>
              </div>
              <div className="custom-input-wrap">
                <Select
                  defaultValue="Private"
                  suffixIcon={SVGIcons.DownArrow}
                  options={[
                    {
                      value: "Private",
                      label: "Private",
                    },
                    {
                      value: "Public",
                      label: "Public",
                    },
                  ]}
                />
              </div>
            </div>
          </div>
          <div className="form-content-wrap flex-column align-items-start">
            <div className="custom-label-wrap">
              <span className="h6 small mb-0 text-black fw-500 primary-font text-break">
                Instructions
              </span>
            </div>
            <div className="custom-input-wrap ">
              <TextArea rows={3} placeholder="Write here..." />
            </div>
          </div>
        </Form>
      </Modal>
      {/* Add New Prescription Modal End */}
    </>
  );
};
