import React, { useEffect, useRef, useState } from "react";
import "../../../assets/css/allied_patient.css";

import Nav from "../../../components/AfterLoginNav/Nav";
import patient from "../../../assets/images/patient_icon.svg";
import tipIcon from "../../../assets/images/tipicon.svg";
import information from "../../../assets/images/information.svg";
import payement from "../../../assets/images/payement.svg";
import tick from "../../../assets/images/tick.svg";
import Delete from "../../../assets/images/delete.svg";
import editicon from "../../../assets/images/editicon.svg";
import removicon from "../../../assets/images/removicon.svg";
import oppurtunitiesimg from "../../../assets/images/oppurtunitiesimg.png";
import unpaidicon from "../../../assets/images/unpaid.svg";
import moment from "moment";
import SmsModal from "../../../components/Modal/SmsModal";
import DeleteModal from "../../../components/Modal/DeleteModal";
import DocumentModal from "../../../components/Modal/DocumentModal";

const accordianSummary = [
  {
    id: 1,
    name: "Physio Paul",
    head: "Pain In left hand knuckles & Thumb Blood work showed Anti-cyclic citrullinated peptidePain In left hand",
    body: "It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions.",
  },
  {
    id: 2,
    name: "Physio Paul",
    head: "Pain In left hand knuckles & Thumb Blood work showed Anti-cyclic citrullinated peptidePain In left hand",
    body: "It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions.",
  },
  {
    id: 3,
    name: "Physio Paul",
    head: "Pain In left hand knuckles & Thumb Blood work showed Anti-cyclic citrullinated peptidePain In left hand",
    body: "It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions.",
  },
  {
    id: 4,
    name: "Physio Paul",
    head: "Pain In left hand knuckles & Thumb Blood work showed Anti-cyclic citrullinated peptidePain In left hand",
    body: "It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions.",
  },
];

const templateData = [
  {
    name: "General",
    data: "Contrary to popular belief, Lorem Ipsum is not simpandom text. It has roots in a piece of classical Latin literature from 45 BC, ma king it over 2000 years oldIt has roots in a piece of classical Latin liter ature from 45 BC Neque porro quisquat qui dolorem Randomised words which don't look It has roots in a piece of classical Latin liter ature from 45 BCIt has roots in a piece of classical Latin liter ature from 45 BCIt has roots in a piece of classical Latin liter ature from 45 BCIt has roots in a piece of classical Latin liter ature from 45 BC.",
  },
  {
    name: "Leg Injury",
    data: "Contrary to popular belief, Lorem Ipsum is not simpandom text. It has roots in a piece of classical Latin literature from 45 BC, ma king it over 2000 years oldIt has roots in a piece of classical Latin liter ature from 45 BC Neque porro quisquat qui dolorem Randomised words which don't look It has roots in a piece of classical Latin liter ature from 45 BCIt has roots in a piece of classical Latin liter ature from 45 BCIt has roots in a piece of classical Latin liter ature from 45 BCIt has roots in a piece of classical Latin liter ature from 45 BC.",
  },
  {
    name: "Referral",
    data: "Contrary to popular belief, Lorem Ipsum is not simpandom text. It has roots in a piece of classical Latin literature from 45 BC, ma king it over 2000 years oldIt has roots in a piece of classical Latin liter ature from 45 BC Neque porro quisquat qui dolorem Randomised words which don't look It has roots in a piece of classical Latin liter ature from 45 BCIt has roots in a piece of classical Latin liter ature from 45 BCIt has roots in a piece of classical Latin liter ature from 45 BCIt has roots in a piece of classical Latin liter ature from 45 BC.",
  },
];

const payementOption = [
  {
    id: 1,
    serviceName: "Consultation",
    price: "65",
    status: "Paid",
  },
  {
    id: 2,
    serviceName: "Consultation",
    price: "0",
    status: "Un Paid",
  },
  {
    id: 3,
    serviceName: "Consultation",
    price: "65",
    status: "Paid",
  },
  {
    id: 4,
    serviceName: "Consultation",
    price: "0",
    status: "Un Paid",
  },
  {
    id: 5,
    serviceName: "Consultation",
    price: "65",
    status: "Paid",
  },
  {
    id: 6,
    serviceName: "Consultation",
    price: "0",
    status: "Un Paid",
  },
  {
    id: 7,
    serviceName: "Consultation",
    price: "65",
    status: "Paid",
  },
];

const taskOption = [
  {
    id: 1,
    number: 1,
    data: "Send email to accountant",
  },
  {
    id: 2,
    number: 2,
    data: "Send email to accountant",
  },
  {
    id: 3,
    number: 3,
    data: "Send email to accountant",
  },
];
const AlliedPatientMain = () => {
  const [histroy, setHistroy] = useState(accordianSummary);
  const [option, setOption] = useState(null);
  const [text, setText] = useState("");
  const [accordianData, setAccordianData] = useState("");
  const [textareaVisible, setTextareaVisible] = useState(false);

  const textareaRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (textareaRef.current && !textareaRef.current.contains(event.target)) {
        setTextareaVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleTextarea = () => {
    setTextareaVisible(!textareaVisible);
  };

  const paidunpaidionColor = (status, price) => {
    if (status === "paid") {
      return {
        background: "#ECFFF8",
      };
    } else if (status === "Un Paid") {
      return {
        background: "#FFF0F6",
        backgroundImage: `url(${unpaidicon})`,
        backgroundSize: "12px",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
      };
    }
  };

  const handleChange = (event) => {
    const val = event.target.value;
    setOption(val);
    const selectedVal = templateData[val];
    if (selectedVal) {
      setText(selectedVal.data);
      setAccordianData(selectedVal.data);
    }
  };

  const handleTextareaChange = (event) => {
    setAccordianData(event.target.value);
    setText(event.target.value);
  };

  const handleSubmit = () => {
    const newAccordianItem = {
      id: accordianSummary + 1,
      name: "Physio Paul",
      head: "Pain In left hand knuckles & Thumb Blood work showed Anti-cyclic citrullinated peptidePain In left hand",
      body: accordianData,
    };
    setHistroy([...histroy, newAccordianItem]);
    setText("");
  };

  return (
    <div>
      {/* <Nav /> */}
      <div className="dashBcontbody">
        <div className="patientSummary patientSummary_new newalign">
          <div className="patentstuctherbox">
            {/* Patient Information Summary */}
            <div className="informationSummary odr0">
              <div className="summary_whitebox">
                <div className="summary_heading">
                  <div className="sum_headicon">
                    <img src={information} alt="" />
                  </div>
                  <h2>Patient Information Summary</h2>
                </div>
                <div className="summary_boddy">
                  <div className="summary_colorbg">
                    <div className="sumarysmsbtnbox">
                      <button
                        data-bs-toggle="modal"
                        data-bs-target="#sendSma_modal"
                      >
                        Send SMS
                      </button>
                      <button
                        data-bs-toggle="modal"
                        data-bs-target="#addTask_modal"
                      >
                        Add Task
                      </button>
                    </div>
                    <div className="summaryImg">
                      <img src={patient} alt="" />
                      <h5>Mary Kenny</h5>
                      <p>(17-08-1952)</p>
                    </div>
                    <div className="summaryInfo">
                      <ul>
                        <li>
                          <p>Phone no:</p>
                          <h6>0871234567</h6>
                        </li>
                        <li>
                          <p>Next of Kin:</p>
                          <h6>John Hayes</h6>
                        </li>
                        <li>
                          <p>Address:</p>
                          <h6>42 Rosemount Drive, Dublin 18</h6>
                        </li>
                        <li>
                          <p>Private:</p>
                          <h6>Medical card no. 4326328</h6>
                        </li>
                        <li>
                          <p>Opportunities:</p>
                          <h6>Vaccine, COVID-19 Booster</h6>
                        </li>
                        <li>
                          <p>Upcoming appointments:</p>
                          <h6>24 March 2023</h6>
                        </li>
                      </ul>
                    </div>
                    <div className="reason_forvisit">
                      <h3>
                        <span className="tipicon">
                          <img src={tipIcon} alt="" />
                        </span>{" "}
                        Reason for visit today:
                      </h3>
                      <p>
                        Contrary to popular belief, Lorem Ipsum is not
                        simplytext. It has roots in a piece of classical Latin
                        literature from 45 BC, making
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Patient Information Summary */}

            {/* Payments */}
            <div className="payments_box payment_box_new">
              <div className="summary_whitebox">
                <div className="summary_heading">
                  <div className="sum_headicon">
                    <img src={payement} alt="" />
                  </div>
                  <h2>Payments</h2>
                  <a href="#">See All</a>
                </div>
                <div className="summary_bdy_inr_hdng">
                  <h6>
                    Outstanding balances: <span>€675</span>
                  </h6>
                  <div className="shortbyselect">
                    <select
                      className="form-select form-control dpblock"
                      name="vat"
                    >
                      <option>Filter</option>
                      <option value="name">Name</option>
                      <option value="date">Date Received</option>
                    </select>
                  </div>
                </div>
                <div className="summary_boddy">
                  <div className="summary_bdy_inr">
                    <ul className="patientlist">
                      <li className="pl20">
                        <h6>Date</h6>
                      </li>
                      <li className="stasuawidth">
                        <h6>Type</h6>
                      </li>
                      <li>
                        <h6>Service</h6>
                      </li>
                      <li>
                        <h6>Amount</h6>
                      </li>
                      <li className="stasuawidth">
                        <h6>Status</h6>
                      </li>
                      <li className="paysms"></li>
                      <li className="pl20">
                        {/* <h6>Date</h6> */}
                        <p>12/1/22</p>
                      </li>
                      <li className="stasuawidth">
                        {/* <h6>Type</h6> */}
                        <p>Cash</p>
                      </li>
                      <li>
                        {/* <h6>Service</h6> */}
                        <p>Consultation</p>
                      </li>
                      <li>
                        {/* <h6>Amount</h6> */}
                        <p>€65</p>
                      </li>
                      <li className="stasuawidth">
                        {/* <h6>Status</h6> */}
                        <p>Unpaid</p>
                      </li>
                      <li className="paysms">
                        <div class="btn_new_wrap btn_new90">
                          <a href="#" class="red_btn">
                            Pay
                          </a>
                          <a href="#" class="custom_btn">
                            Sms Payment
                          </a>
                        </div>
                      </li>
                      <li className="pl20">
                        {/* <h6>Date</h6> */}
                        <p>12/1/22</p>
                      </li>
                      <li className="stasuawidth">
                        {/* <h6>Type</h6> */}
                        <p>Cash</p>
                      </li>
                      <li>
                        {/* <h6>Service</h6> */}
                        <p>Consultation</p>
                      </li>
                      <li>
                        {/* <h6>Amount</h6> */}
                        <p>€65</p>
                      </li>
                      <li className="stasuawidth">
                        {/* <h6>Status</h6> */}
                        <p>Unpaid</p>
                      </li>
                      <li className="paysms">
                        <div class="btn_new_wrap btn_new90">
                          <a href="#" class="red_btn receiptbtn">
                            Receipt
                          </a>
                        </div>
                      </li>
                      <li className="pl20">
                        {/* <h6>Date</h6> */}
                        <p>12/1/22</p>
                      </li>
                      <li className="stasuawidth">
                        {/* <h6>Type</h6> */}
                        <p>Cash</p>
                      </li>
                      <li>
                        {/* <h6>Service</h6> */}
                        <p>Consultation</p>
                      </li>
                      <li>
                        {/* <h6>Amount</h6> */}
                        <p>€65</p>
                      </li>
                      <li className="stasuawidth">
                        {/* <h6>Status</h6> */}
                        <p>Unpaid</p>
                      </li>
                      <li className="paysms">
                        <div class="btn_new_wrap btn_new90">
                          <a href="#" class="red_btn">
                            Pay
                          </a>
                          <a href="#" class="custom_btn">
                            Sms Payment
                          </a>
                        </div>
                      </li>
                      <li className="pl20">
                        {/* <h6>Date</h6> */}
                        <p>12/1/22</p>
                      </li>
                      <li className="stasuawidth">
                        {/* <h6>Type</h6> */}
                        <p>Cash</p>
                      </li>
                      <li>
                        {/* <h6>Service</h6> */}
                        <p>Consultation</p>
                      </li>
                      <li>
                        {/* <h6>Amount</h6> */}
                        <p>€65</p>
                      </li>
                      <li className="stasuawidth">
                        {/* <h6>Status</h6> */}
                        <p>Unpaid</p>
                      </li>
                      <li className="paysms">
                        <div class="btn_new_wrap btn_new90">
                          <a href="#" class="red_btn receiptbtn">
                            Receipt
                          </a>
                        </div>
                      </li>
                      <li className="pl20">
                        {/* <h6>Date</h6> */}
                        <p>12/1/22</p>
                      </li>
                      <li className="stasuawidth">
                        {/* <h6>Type</h6> */}
                        <p>Cash</p>
                      </li>
                      <li>
                        {/* <h6>Service</h6> */}
                        <p>Consultation</p>
                      </li>
                      <li>
                        {/* <h6>Amount</h6> */}
                        <p>€65</p>
                      </li>
                      <li className="stasuawidth">
                        {/* <h6>Status</h6> */}
                        <p>Unpaid</p>
                      </li>
                      <li className="paysms">
                        <div class="btn_new_wrap btn_new90">
                          <a href="#" class="red_btn receiptbtn">
                            Receipt
                          </a>
                        </div>
                      </li>
                      <li className="pl20">
                        {/* <h6>Date</h6> */}
                        <p>12/1/22</p>
                      </li>
                      <li className="stasuawidth">
                        {/* <h6>Type</h6> */}
                        <p>Cash</p>
                      </li>
                      <li>
                        {/* <h6>Service</h6> */}
                        <p>Consultation</p>
                      </li>
                      <li>
                        {/* <h6>Amount</h6> */}
                        <p>€65</p>
                      </li>
                      <li className="stasuawidth">
                        {/* <h6>Status</h6> */}
                        <p>Unpaid</p>
                      </li>
                      <li className="paysms">
                        <div class="btn_new_wrap btn_new90">
                          <a href="#" class="red_btn">
                            Pay
                          </a>
                          <a href="#" class="custom_btn">
                            Sms Payment
                          </a>
                        </div>
                      </li>
                      <li className="pl20">
                        {/* <h6>Date</h6> */}
                        <p>12/1/22</p>
                      </li>
                      <li className="stasuawidth">
                        {/* <h6>Type</h6> */}
                        <p>Cash</p>
                      </li>
                      <li>
                        {/* <h6>Service</h6> */}
                        <p>Consultation</p>
                      </li>
                      <li>
                        {/* <h6>Amount</h6> */}
                        <p>€65</p>
                      </li>
                      <li className="stasuawidth">
                        {/* <h6>Status</h6> */}
                        <p>Unpaid</p>
                      </li>
                      <li className="paysms">
                        <div class="btn_new_wrap btn_new90">
                          <a href="#" class="red_btn">
                            Pay
                          </a>
                          <a href="#" class="custom_btn">
                            Sms Payment
                          </a>
                        </div>
                      </li>
                      <li className="pl20">
                        {/* <h6>Date</h6> */}
                        <p>12/1/22</p>
                      </li>
                      <li className="stasuawidth">
                        {/* <h6>Type</h6> */}
                        <p>Cash</p>
                      </li>
                      <li>
                        {/* <h6>Service</h6> */}
                        <p>Consultation</p>
                      </li>
                      <li>
                        {/* <h6>Amount</h6> */}
                        <p>€65</p>
                      </li>
                      <li className="stasuawidth">
                        {/* <h6>Status</h6> */}
                        <p>Unpaid</p>
                      </li>
                      <li className="paysms">
                        <div class="btn_new_wrap btn_new90">
                          <a href="#" class="red_btn">
                            Pay
                          </a>
                          <a href="#" class="custom_btn">
                            Sms Payment
                          </a>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            {/* Payments */}

            {/* Visit History */}
            <div className="visitHistory visitHistflexfull">
              <div className="summary_whitebox">
                <div className="summary_heading">
                  <div className="sum_headicon">
                    <img src={payement} alt="" />
                  </div>
                  <h2>Visit History</h2>
                  {/* <div className="template_dropdown">
                    <select
                      className="form-select form-control"
                      value={option}
                      onChange={handleChange}
                    >
                      <option>Template</option>
                      {templateData.map((data, index) => (
                        <>
                          <option value={index} key={index}>
                            {data.name}
                          </option>
                        </>
                      ))}
                    </select>
                  </div> */}
                  {/* <div className="values_dropdown">
                    <select className="form-select form-control" name="vat">
                      <option>Values</option>
                      <option value="ascending">Consultation</option>
                      <option value="descending">Phone Call</option>
                      <option value="descending">Test</option>
                    </select>
                  </div> */}
                  {/* <div className="formbtn">
                    <button
                      type="button"
                      className="custom_btn"
                      onClick={toggleTextarea}
                    >
                      + Add Note
                    </button>
                  </div> */}
                </div>
                <div className="summary_boddy">
                  {textareaVisible && (
                    <>
                      <textarea
                        ref={textareaRef}
                        className="note_box"
                        rows="5"
                        value={text}
                        onChange={(event) => handleTextareaChange(event)}
                      />
                      <div className="sumarysmsbtnbox">
                        <button onClick={handleSubmit}>Save Note</button>
                      </div>
                    </>
                  )}
                  <div className="accordionRow accordion_scrollheight">
                    <div
                      className="accordion visitHistoryaccordion"
                      id="accordionExample"
                    >
                      {histroy.map((item, id) => (
                        <div className="accordion-item" key={id}>
                          <div
                            className="accordion-header"
                            id={`headingOne${id}`}
                          >
                            <a
                              href={`#collapse${id}`}
                              className="accordion-button collapsed"
                              type="button"
                              data-bs-toggle="collapse"
                              aria-expanded="false"
                              aria-controls={`collapse${id}`}
                            >
                              <div className="noteDatebox">
                                <h6>
                                  <span>{moment().format("MMM")}</span>{" "}
                                  <span>{moment().format("YYYY")}</span>
                                </h6>
                              </div>
                              <div className="accodianheading">
                                <h5>Consultation - {item.name}</h5>
                                <p>{item.head}</p>
                              </div>
                              <button className="histeditbtn">Edit</button>
                            </a>
                          </div>
                          <div
                            id={`collapse${id}`}
                            className="accordion-collapse collapse"
                            aria-labelledby={`heading${id}`}
                            data-bs-parent="#accordionExample"
                          >
                            <div className="accordion-body">
                              <p>{item.body}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Visit History */}

            {/* All Documents */}
            <div className="alldocumentssect">
              <div className="summary_whitebox">
                <div className="summary_heading">
                  <div className="sum_headicon">
                    <img src={information} alt="" />
                  </div>
                  <h2>All Documents</h2>
                  <div class="btnxscenter ml-auto">
                    <button
                      class="custom_btn addform_btn"
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target="#addDocumentModal"
                    >
                      Add Document
                    </button>
                  </div>
                </div>
                <div className="summary_boddy pdlr0">
                  <div className="signup_threebox mt-0">
                    <ul className="patientlist">
                      <li className="datalistpatient">
                        <h6>Date received</h6>
                      </li>
                      <li className="datalistpatient">
                        <h6>Document Type</h6>
                      </li>
                      <li className="datalistpatient">
                        <h6>Status</h6>
                      </li>
                      <li className="datalistpatient">
                        <h6>Edit</h6>
                      </li>
                      <li className="datalistpatient bdrtoppatient">
                        <p>30/07/2023</p>
                      </li>
                      <li className="datalistpatient bdrtoppatient">
                        <p>XRay</p>
                      </li>
                      <li className="datalistpatient bdrtoppatient">
                        <p>Received</p>
                      </li>
                      <li className="datalistpatient bdrtoppatient">
                        <div className="edt_rmviconbox">
                          <button
                            type="submit"
                            className="deletebtn"
                            data-bs-toggle="modal"
                            data-bs-target="#addDocumentModal"
                            // onClick={() => handleEditTask(item.id)}
                          >
                            <img src={editicon} alt="" />
                          </button>
                          <button
                            type="button"
                            className="deletebtn"
                            data-bs-toggle="modal"
                            data-bs-target="#myModal"
                            // onClick={() => handleDeleteTask(item.id)}
                          >
                            <img src={removicon} alt="" />
                          </button>
                        </div>
                      </li>

                      <li className="datalistpatient bdrtoppatient">
                        <p>30/07/2023</p>
                      </li>
                      <li className="datalistpatient bdrtoppatient">
                        <p>XRay</p>
                      </li>
                      <li className="datalistpatient bdrtoppatient">
                        <p>Received</p>
                      </li>
                      <li className="datalistpatient bdrtoppatient">
                        <div className="edt_rmviconbox">
                          <button
                            type="submit"
                            className="deletebtn"

                            // onClick={() => handleEditTask(item.id)}
                          >
                            <img src={editicon} alt="" />
                          </button>
                          <button
                            type="button"
                            className="deletebtn"

                            // onClick={() => handleDeleteTask(item.id)}
                          >
                            <img src={removicon} alt="" />
                          </button>
                        </div>
                      </li>

                      <li className="datalistpatient bdrtoppatient">
                        <p>30/07/2023</p>
                      </li>
                      <li className="datalistpatient bdrtoppatient">
                        <p>XRay</p>
                      </li>
                      <li className="datalistpatient bdrtoppatient">
                        <p>Received</p>
                      </li>
                      <li className="datalistpatient bdrtoppatient">
                        <div className="edt_rmviconbox">
                          <button
                            type="submit"
                            className="deletebtn"

                            // onClick={() => handleEditTask(item.id)}
                          >
                            <img src={editicon} alt="" />
                          </button>
                          <button
                            type="button"
                            className="deletebtn"

                            // onClick={() => handleDeleteTask(item.id)}
                          >
                            <img src={removicon} alt="" />
                          </button>
                        </div>
                      </li>
                      <li className="datalistpatient bdrtoppatient">
                        <p>30/07/2023</p>
                      </li>
                      <li className="datalistpatient bdrtoppatient">
                        <p>XRay</p>
                      </li>
                      <li className="datalistpatient bdrtoppatient">
                        <p>Received</p>
                      </li>
                      <li className="datalistpatient bdrtoppatient">
                        <div className="edt_rmviconbox">
                          <button
                            type="submit"
                            className="deletebtn"

                            // onClick={() => handleEditTask(item.id)}
                          >
                            <img src={editicon} alt="" />
                          </button>
                          <button
                            type="button"
                            className="deletebtn"

                            // onClick={() => handleDeleteTask(item.id)}
                          >
                            <img src={removicon} alt="" />
                          </button>
                        </div>
                      </li>
                      <li className="datalistpatient bdrtoppatient">
                        <p>30/07/2023</p>
                      </li>
                      <li className="datalistpatient bdrtoppatient">
                        <p>XRay</p>
                      </li>
                      <li className="datalistpatient bdrtoppatient">
                        <p>Received</p>
                      </li>
                      <li className="datalistpatient bdrtoppatient">
                        <div className="edt_rmviconbox">
                          <button
                            type="submit"
                            className="deletebtn"

                            // onClick={() => handleEditTask(item.id)}
                          >
                            <img src={editicon} alt="" />
                          </button>
                          <button
                            type="button"
                            className="deletebtn"

                            // onClick={() => handleDeleteTask(item.id)}
                          >
                            <img src={removicon} alt="" />
                          </button>
                        </div>
                      </li>
                      <li className="datalistpatient bdrtoppatient">
                        <p>30/07/2023</p>
                      </li>
                      <li className="datalistpatient bdrtoppatient">
                        <p>XRay</p>
                      </li>
                      <li className="datalistpatient bdrtoppatient">
                        <p>Received</p>
                      </li>
                      <li className="datalistpatient bdrtoppatient">
                        <div className="edt_rmviconbox">
                          <button
                            type="submit"
                            className="deletebtn"

                            // onClick={() => handleEditTask(item.id)}
                          >
                            <img src={editicon} alt="" />
                          </button>
                          <button
                            type="button"
                            className="deletebtn"

                            // onClick={() => handleDeleteTask(item.id)}
                          >
                            <img src={removicon} alt="" />
                          </button>
                        </div>
                      </li>
                      <li className="datalistpatient bdrtoppatient">
                        <p>30/07/2023</p>
                      </li>
                      <li className="datalistpatient bdrtoppatient">
                        <p>XRay</p>
                      </li>
                      <li className="datalistpatient bdrtoppatient">
                        <p>Received</p>
                      </li>
                      <li className="datalistpatient bdrtoppatient">
                        <div className="edt_rmviconbox">
                          <button
                            type="submit"
                            className="deletebtn"

                            // onClick={() => handleEditTask(item.id)}
                          >
                            <img src={editicon} alt="" />
                          </button>
                          <button
                            type="button"
                            className="deletebtn"

                            // onClick={() => handleDeleteTask(item.id)}
                          >
                            <img src={removicon} alt="" />
                          </button>
                        </div>
                      </li>
                      <li className="datalistpatient bdrtoppatient">
                        <p>30/07/2023</p>
                      </li>
                      <li className="datalistpatient bdrtoppatient">
                        <p>XRay</p>
                      </li>
                      <li className="datalistpatient bdrtoppatient">
                        <p>Received</p>
                      </li>
                      <li className="datalistpatient bdrtoppatient">
                        <div className="edt_rmviconbox">
                          <button
                            type="submit"
                            className="deletebtn"

                            // onClick={() => handleEditTask(item.id)}
                          >
                            <img src={editicon} alt="" />
                          </button>
                          <button
                            type="button"
                            className="deletebtn"

                            // onClick={() => handleDeleteTask(item.id)}
                          >
                            <img src={removicon} alt="" />
                          </button>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            {/* All Documents */}
          </div>

          <div className="documents_box document_box_new">
            {/* Consultation */}
            <div className="summary_whitebox">
              <div className="summary_heading">
                <div className="sum_headicon">
                  <img src={information} alt="" />
                </div>
                <h2>Consultation</h2>
              </div>
              <div className="summary_boddy">
                <div className="custom_drp_down mb-3">
                  <div class="dropdown">
                    <button
                      class="btn dropdown-toggle"
                      type="button"
                      id="dropdownMenu2"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <div className="drop_dwn_inr">
                        <span class="summary_activeicon"></span>
                        <h4>Appointment Date:</h4>
                        <form action="">
                          {/* <input type="text" value="23/06/2023" /> */}
                          <span>23/06/2023</span>
                        </form>
                      </div>
                    </button>
                    <ul
                      class="dropdown-menu form-select"
                      aria-labelledby="dropdownMenu2"
                    >
                      <li>
                        <button class="dropdown-item" type="button">
                          Action
                        </button>
                      </li>
                      <li>
                        <button class="dropdown-item" type="button">
                          Something else here
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="custom_drp_down mb-3">
                  <div class="dropdown">
                    <button
                      class="btn dropdown-toggle"
                      type="button"
                      id="dropdownMenu2"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <div className="drop_dwn_inr">
                        <span class="summary_activeicon"></span>
                        <h4>Consultation Type</h4>
                        <form action="">
                          {/* <input type="text" value="23/06/2023" /> */}
                          <span>Phone</span>
                        </form>
                      </div>
                    </button>
                    <ul
                      class="dropdown-menu form-select"
                      aria-labelledby="dropdownMenu2"
                    >
                      <li>
                        <button class="dropdown-item" type="button">
                          Phone
                        </button>
                      </li>
                      <li>
                        <button class="dropdown-item" type="button">
                          Email
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="custom_drp_down">
                  <div class="dropdown">
                    <button
                      class="btn dropdown-toggle"
                      type="button"
                      id="dropdownMenu2"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <div className="drop_dwn_inr">
                        <span class="summary_activeicon"></span>
                        <h4>Select Template:</h4>
                        <form action="">
                          {/* <input type="text" value="23/06/2023" /> */}
                          <span>Consultation</span>
                        </form>
                      </div>
                    </button>
                    <ul
                      class="dropdown-menu form-select"
                      aria-labelledby="dropdownMenu2"
                    >
                      <li>
                        <button class="dropdown-item" type="button">
                          Phone
                        </button>
                      </li>
                      <li>
                        <button class="dropdown-item" type="button">
                          Email
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>

                <div class="sumarysmsbtnbox autosaveBtn">
                  <button>Autosave: On</button>
                </div>
                <textarea class="note_box mb-4" rows="2"></textarea>
                <hr />

                <div className="summary_colorbg summbgnewstyl">
                  <h4>Make payment</h4>
                  <ul>
                    {taskOption.map((item, i) => (
                      <li key={i}>
                        <p>
                          <span>{item.number}</span> {item.data}
                        </p>
                        <div className="delbtnlist">
                          <p>€345</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <form>
                  <div className="row">
                    <div class="col-md-12 mb-3">
                      <label>Amount</label>
                      <input
                        type="text"
                        placeholder="Mathew"
                        class="form-select form-control"
                        value=""
                      />
                    </div>
                  </div>

                  <div class="col-md-12 mb-3">
                    <label>Payement Type</label>
                    <select
                      as="select"
                      class="form-select form-control custom-select"
                    >
                      <option>Select</option>
                    </select>
                  </div>

                  <div class="col-md-12 mb-3">
                    <label>Sent Recipient</label>
                    <select
                      as="select"
                      class="form-select form-control custom-select"
                    >
                      <option>Select</option>
                    </select>
                  </div>

                  <div class="col-md-12 mb-3">
                    <label>Note</label>
                    <textarea class="note_box" rows="2"></textarea>
                  </div>

                  <div class="btnxscenter ml-auto">
                    <button
                      class="custom_btn addform_btn rmargin"
                      type="button"
                    >
                      Save
                    </button>
                    <button class="custom_btn addform_btn" type="button">
                      Save and Pay by Sms
                    </button>
                  </div>
                </form>
              </div>
            </div>
            {/* Consultation */}

            {/* Patients Tasks */}
            {/* <div className="summary_whitebox">
              <div className="summary_heading">
                <div className="sum_headicon">
                  <img src={information} alt="" />
                </div>
                <h2>Patients Tasks</h2>
                <a href="#">See All</a>
              </div>
              <div className="summary_boddy">
                <div className="summary_colorbg">
                  <ul>
                    {taskOption.map((item, i) => (
                      <li key={i}>
                        <p>
                          <span>{item.number}</span> {item.data}
                        </p>
                        <div className="delbtnlist">
                          <button>
                            <img src={tick} alt="" />
                          </button>
                          <button
                            data-bs-toggle="modal"
                            data-bs-target="#myModal"
                          >
                            <img src={Delete} alt="" />
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div> */}
            {/* Patients Tasks */}
            {/* Oppurtunities */}
            <div className="oppurtunitiesect pd0">
              <div className="summary_whitebox">
                <div className="summary_heading">
                  <div className="sum_headicon">
                    <img src={information} alt="" />
                  </div>
                  <h2>Oppurtunities</h2>
                </div>
                <div className="summary_boddy">
                  <ul>
                    <li>
                      <span className="summary_activeicon">
                        <img src={oppurtunitiesimg} alt="" />
                      </span>
                      <span>
                        <h6>
                          Mary Kenny <i className="fa-regular fa-flag"></i>
                        </h6>
                        <p>Offer Joint Injection - Send SMS reminder</p>
                      </span>
                      <div className="sumarysmsbtnbox">
                        <button
                          data-bs-toggle="modal"
                          data-bs-target="#sendSma_modal"
                        >
                          Send SMS
                        </button>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* Oppurtunities */}

            {/* Patient Task */}
            <div className="summary_whitebox">
              <div className="summary_heading">
                <div className="sum_headicon">
                  <img src={information} alt="" />
                </div>
                <h2>General Tasks</h2>
                <div className="taskbtn ">
                  <span>Add new</span> <button>+</button>
                </div>
              </div>
              <div className="summary_boddy">
                <div className="summary_colorbg pd0">
                  <ul className="generalTaskslist">
                    <li>
                      <h6>Task Name</h6>
                    </li>
                    <li>
                      <h6>Created date</h6>
                    </li>
                    <li>
                      <h6>Due date</h6>
                    </li>
                    <li>
                      <h6>Completed date</h6>
                    </li>
                    <li className="liedit">
                      <h6>Status</h6>
                    </li>
                    <li className="bdrtoppatient">
                      <p>Send email to accountant</p>
                    </li>
                    <li className="bdrtoppatient">
                      <p>23/05/2023</p>
                    </li>
                    <li className="bdrtoppatient">
                      <p>23/05/2023</p>
                    </li>
                    <li className="bdrtoppatient">
                      <p>23/05/2023</p>
                    </li>
                    <li className="liedit bdrtoppatient">
                      <div className="delbtnlist">
                        <button>
                          <img src={tick} alt="" />
                        </button>
                        <button
                          data-bs-toggle="modal"
                          data-bs-target="#myModal"
                        >
                          <img src={Delete} alt="" />
                        </button>
                      </div>
                    </li>

                    <li>
                      <p>Send email to accountant</p>
                    </li>
                    <li>
                      <p>23/05/2023</p>
                    </li>
                    <li>
                      <p>23/05/2023</p>
                    </li>
                    <li>
                      <p>23/05/2023</p>
                    </li>
                    <li className="liedit">
                      <div className="delbtnlist">
                        <button>
                          <img src={tick} alt="" />
                        </button>
                        <button
                          data-bs-toggle="modal"
                          data-bs-target="#myModal"
                        >
                          <img src={Delete} alt="" />
                        </button>
                      </div>
                    </li>

                    <li>
                      <p>Send email to accountant</p>
                    </li>
                    <li>
                      <p>23/05/2023</p>
                    </li>
                    <li>
                      <p>23/05/2023</p>
                    </li>
                    <li>
                      <p>23/05/2023</p>
                    </li>
                    <li className="liedit">
                      <div className="delbtnlist">
                        <button>
                          <img src={tick} alt="" />
                        </button>
                        <button
                          data-bs-toggle="modal"
                          data-bs-target="#myModal"
                        >
                          <img src={Delete} alt="" />
                        </button>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {/* Patient Task */}
          </div>
        </div>
        <SmsModal />
        <DeleteModal />
        <DocumentModal 
        fromPatient = {true}
        />
        {/* Add Task Modal */}
        <div className="modal smamodal addTaskmodal custom-modal-wrap" id="addTask_modal">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h4 className="modal-title">Add Task</h4>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>

              <div className="modal-body">
                <form>
                  <div className="row">
                    <div className="col-md-12 mb-3">
                      <label>Patient name</label>
                      <input
                        type="text"
                        placeholder="Patient name"
                        className="form-select form-control"
                      />
                    </div>

                    <div className="col-md-12 mb-3">
                      <label>Description</label>
                      <textarea
                        className="form-control textareaform-control"
                        rows="3"
                        id="comment"
                        name="text"
                        placeholder="Write here..."
                      ></textarea>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label>Due date</label>
                      <select className="form-select form-control" name="vat">
                        <option>SMS Templates</option>
                        <option>SMS Templates</option>
                        <option>SMS Templates</option>
                        <option>SMS Templates</option>
                      </select>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label>Priority</label>
                      <div className="priorityform">
                        <div className="pridot"></div>
                        <select className="form-select form-control" name="vat">
                          <option>SMS Templates</option>
                          <option>SMS Templates</option>
                          <option>SMS Templates</option>
                          <option>SMS Templates</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label>Task type</label>
                      <select className="form-select form-control" name="vat">
                        <option>SMS Templates</option>
                        <option>SMS Templates</option>
                        <option>SMS Templates</option>
                        <option>SMS Templates</option>
                      </select>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label>Assign to</label>
                      <select className="form-select form-control" name="vat">
                        <option>SMS Templates</option>
                        <option>SMS Templates</option>
                        <option>SMS Templates</option>
                        <option>SMS Templates</option>
                      </select>
                    </div>
                  </div>
                </form>
              </div>

              <div className="modal-footer">
                <button className="custom_btn addform_btn" type="submit">
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Add Task Modal */}
      </div>
    </div>
  );
};

export default AlliedPatientMain;
