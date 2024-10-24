import React, { useRef, useState } from "react";
import { Checkbox, Steps, Alert } from "antd";
import { Col, FloatingLabel, Form, Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import CheckMark from "../../../assets/images/icons/checkmark.svg";
import Avatar1 from "../../../assets/images/icons/avatar1.jpg";
import MasterCard from "../../../assets/images/icons/mastercard.png";
import EditIcon from "../../../assets/images/icons/edit_img.svg";
import Visa from "../../../assets/images/icons/visa.png";
import Amex from "../../../assets/images/icons/amex.png";
import DebitCard from "../../../assets/images/cover/debit-card.png";
import { SVGIcons } from "../../../components/Data/SVGIcons";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "./BookAppointment.css";
import CustomDatepicker from "../../../components/CustomDatepicker/CustomDatepicker";

export const BookAppointment = () => {
  const [selectedLabel, setSelectedLabel] = useState(null);
  const [selectedDiv, setSelectedDiv] = useState(null);
  const [current, setCurrent] = useState(0);
  const [isActive, setIsActive] = useState(-1);

  const onChange = (value) => {
    console.log("onChange:", value);
    setCurrent(value);
  };

  const handleDivClick = (divId) => {
    if (selectedDiv === divId) {
      setSelectedLabel(null);
    } else {
      setSelectedLabel(divId);
    }
  };

  const parentRef = useRef(null);

  const handleButtonClick = () => {
    const currentClass = parentRef.current.classList.contains("active");
    parentRef.current.classList.toggle("active", !currentClass);
  };

  const handleClick = (id) => {
    if (selectedDiv === id) {
      setSelectedDiv(null);
    } else {
      setSelectedDiv(id);
    }
  };
  const data = [
    {
      id: 1,
      Week: "Mon",
      Num: 1,
    },
    {
      id: 2,
      Week: "Tue",
      Num: 2,
    },
    {
      id: 3,
      Week: "Wed",
      Num: 3,
    },
    {
      id: 4,
      Week: "Thu",
      Num: 4,
    },
    {
      id: 5,
      Week: "Fri",
      Num: 5,
    },
    {
      id: 6,
      Week: "Sat",
      Num: 6,
    },
    {
      id: 7,
      Week: "Sun",
      Num: 7,
    },
    {
      id: 8,
      Week: "Mon",
      Num: 8,
    },
    {
      id: 9,
      Week: "Tue",
      Num: 9,
    },
    {
      id: 10,
      Week: "Wed",
      Num: 10,
    },
    {
      id: 11,
      Week: "Thu",
      Num: 11,
    },
    {
      id: 12,
      Week: "Fri",
      Num: 12,
    },
    {
      id: 13,
      Week: "Sat",
      Num: 13,
    },
    {
      id: 14,
      Week: "Sun",
      Num: 14,
    },
    {
      id: 15,
      Week: "Mon",
      Num: 15,
    },
    {
      id: 16,
      Week: "Tue",
      Num: 16,
    },
    {
      id: 17,
      Week: "Wed",
      Num: 17,
    },
    {
      id: 18,
      Week: "Thu",
      Num: 18,
    },
    {
      id: 19,
      Week: "Fri",
      Num: 19,
    },
    {
      id: 20,
      Week: "Sat",
      Num: 20,
    },
    {
      id: 21,
      Week: "Sun",
      Num: 21,
    },
    {
      id: 22,
      Week: "Mon",
      Num: 22,
    },
    {
      id: 23,
      Week: "Tue",
      Num: 23,
    },
    {
      id: 24,
      Week: "Wed",
      Num: 24,
    },
    {
      id: 25,
      Week: "Thu",
      Num: 25,
    },
    {
      id: 26,
      Week: "Fri",
      Num: 26,
    },
    {
      id: 27,
      Week: "Sat",
      Num: 27,
    },
    {
      id: 28,
      Week: "Sun",
      Num: 28,
    },
    {
      id: 29,
      Week: "Mon",
      Num: 29,
    },
    {
      id: 30,
      Week: "Tue",
      Num: 30,
    },
    {
      id: 31,
      Week: "Wed",
      Num: 31,
    },
  ];


  const steps = [
    {
      title: (
        <>
          <div className="custom-title">
            <h6>Pick Service/Doctor</h6>
            <span className="subtitle">Choose your service</span>
          </div>
        </>
      ),

      content: (
        <>
          <div className="authentication-title-wrap space-bottom">
            <h3 className="h3 fw-600 text-stratos mb-5">Pick Service</h3>
            <div className="d-flex align-items-center pick-service-wrap flex-wrap">
              <span
                className={`pickup ${
                  selectedLabel === 1 ? "selected" : "selectable"
                }`}
                onClick={() => handleDivClick(1)}
              >
                Doctor
              </span>
              <span
                className={`pickup ${
                  selectedLabel === 2 ? "selected" : "selectable"
                }`}
                onClick={() => handleDivClick(2)}
              >
                Nurse
              </span>
              <span
                className={`pickup ${
                  selectedLabel === 3 ? "selected" : "selectable"
                }`}
                onClick={() => handleDivClick(3)}
              >
                Phlebotomy (Bloods)
              </span>
            </div>
          </div>
          <div className="pick-doctor-wrap">
            <div className="authentication-title-wrap">
              <h3 className="h3 fw-600 text-stratos mb-4 pb-2">Pick Doctor</h3>
            </div>
            <div className="doctor-list-wrap">
              <div
                className={`pickup-doctor justify-content-between ${
                  selectedDiv === 1 ? "selected" : "selectable"
                }`}
                onClick={() => handleClick(1)}
              >
                <span>No Preferences</span>
                <div className="custom-checkbox-wrap">
                  <Checkbox />
                </div>
              </div>
              <div
                className={`pickup-doctor ${
                  selectedDiv === 2 ? "selected" : "selectable"
                }`}
                onClick={() => handleClick(2)}
              >
                <Image src={Avatar1} />
                <span>Dr. Noel Cassedy</span>
              </div>
              <div
                className={`pickup-doctor ${
                  selectedDiv === 3 ? "selected" : "selectable"
                }`}
                onClick={() => handleClick(3)}
              >
                <Image src={Avatar1} />
                <span>Dr. James</span>
              </div>
              <div
                className={`pickup-doctor ${
                  selectedDiv === 4 ? "selected" : "selectable"
                }`}
                onClick={() => handleClick(4)}
              >
                <Image src={Avatar1} />
                <span>Dr. Marry</span>
              </div>
            </div>
          </div>
          <Form>
            <div className="practice-details-form-step"></div>
            <div class="dashboard-btn-wrap">
              <Link className="custom_btn mb-0">Continue</Link>
            </div>
          </Form>
        </>
      ),
    },
    {
      title: (
        <>
          <div className="custom-title">
            <h6>Practice Details</h6>
            <span className="subtitle">Choose your practice</span>
          </div>
        </>
      ),
      content: (
        <>
          <div className="authentication-title-wrap">
            <h3 className="h3 fw-600 text-stratos mb-5">Practice Details</h3>
          </div>
          <Form ref={parentRef} className="practice-detail-form">
            <div className="d-flex justify-content-between flex-sm-nowrap mb-4 pb-2 practice-details-title-wrap">
              <div className="custom-checkbox-wrap">
                <Checkbox>Appointment for Dependant</Checkbox>
              </div>
              <Link
                to=""
                className="add-dependant-link"
                onClick={handleButtonClick}
              >
                {SVGIcons.PlusCircle}Add Dependant
              </Link>
            </div>
            <Row className="practice-details-form-step">
              <Col md={12} className="mb-4 dependant-input">
                <FloatingLabel
                  controlId="floatingSelect"
                  label="Choose Dependant"
                >
                  <Form.Select aria-label="Floating label select example">
                    <option value="1">Dependant</option>
                    <option value="2">Dependant1</option>
                  </Form.Select>
                </FloatingLabel>
              </Col>
              <Col md={6} className="mb-4">
                <FloatingLabel controlId="floatingSelect" label="Booking Type">
                  <Form.Select aria-label="Floating label select example">
                    <option value="1">Private</option>
                    <option value="2">Public</option>
                  </Form.Select>
                </FloatingLabel>
              </Col>
              <Col md={6} className="mb-4">
                <FloatingLabel
                  controlId="floatingSelect"
                  label="Appointment Type"
                >
                  <Form.Select aria-label="Floating label select example">
                    <option value="1">Bloods</option>
                    <option value="2">Eye Sight Test</option>
                  </Form.Select>
                </FloatingLabel>
              </Col>
              <Col md={12} className="floatingTextarea">
                <FloatingLabel
                  controlId="floatingTextarea2"
                  label="Reason for Appointment"
                >
                  <Form.Control
                    as="textarea"
                    placeholder="Type a reason"
                    style={{ height: "175px" }}
                  />
                </FloatingLabel>
              </Col>
            </Row>
            <div class="dashboard-btn-wrap">
              <Link className="custom_btn mb-0">Continue</Link>
            </div>
            <div className="custom-alert-box d-block d-lg-none">
              {current === 1 ? (
                <Alert
                  message="Important"
                  description="Attention: Closed on Friday Please Wear mask on visit"
                  type="error"
                  showIcon
                />
              ) : null}
            </div>
          </Form>
        </>
      ),
    },
    {
      title: (
        <>
          <div className="custom-title">
            <h6>Date/Time</h6>
            <span className="subtitle">Choose a date and time</span>
          </div>
        </>
      ),

      content: (
        <>
          <div className="authentication-title-wrap">
            <h3 className="h3 fw-600 text-stratos mb-4 pb-2">
              Choose Date/Time
            </h3>
          </div>
          <Form>
            <div className="practice-details-form-step">
              <div className="d-flex justify-content-between">
                <div className="d-flex choose-date-time-select-wrap">
                  <Form.Select
                    aria-label="select"
                    className="choose-date-time-select"
                  >
                    <option value="1">January</option>
                    <option value="2">February</option>
                    <option value="3">March</option>
                    <option value="4">April</option>
                    <option value="5">May</option>
                    <option value="6">June</option>
                    <option value="7">July</option>
                    <option value="8">August</option>
                    <option value="9">September</option>
                    <option value="10">October</option>
                    <option value="11">November</option>
                    <option value="12">December</option>
                  </Form.Select>
                  <Form.Select
                    aria-label="select"
                    className="choose-date-time-select"
                  >
                    <option value="1">2019</option>
                    <option value="2">2020</option>
                    <option value="3">2021</option>
                    <option value="4">2022</option>
                    <option value="5">2023</option>
                    <option value="6">2024</option>
                    <option value="7">2025</option>
                    <option value="8">2026</option>
                    <option value="9">2027</option>
                    <option value="10">2028</option>
                  </Form.Select>
                </div>
                <div>
                  <button className="swiper-button-prev swiper-btn">
                    {SVGIcons.SliderLeftArrow}
                  </button>
                  <button className="swiper-button-next swiper-btn">
                    {SVGIcons.SliderRightArrow}
                  </button>
                </div>
              </div>
              <div className="calander-slider">
                <Swiper
                  navigation={{
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                  }}
                  spaceBetween={10}
                  slidesPerView={15}
                  breakpoints={{
                    320: {
                      slidesPerView: 4,
                      spaceBetween: 10,
                    },
                    414: {
                      slidesPerView: 5,
                    },

                    576: {
                      slidesPerView: 7,
                    },
                    1200: {
                      slidesPerView: 10,
                    },
                    1600: {
                      slidesPerView: 15,
                    },
                  }}
                >
                  {data.map((item, index) => (
                    <SwiperSlide
                      key={item.id}
                      className={isActive == index ? "active" : ""}
                      onClick={() => setIsActive(index)}
                    >
                      <div className="d-flex flex-column align-items-center justify-content-center date-time-card-slider">
                        <span className="d-inline-block week fw-500">
                          {item.Week}
                        </span>
                        <span className="d-inline-block number h3 small mb-0">
                          {item.Num}
                        </span>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
              <div className="choose-time-wrapper">
                <span className="d-inline-block fw-500 text-manatee text-title">
                  Choose a time that suits you
                </span>
                <div className="time-grid-box">
                  <div
                    className={`h6 time-grid-item ${
                      selectedLabel === 1 ? "selected" : "selectable"
                    }`}
                    onClick={() => handleDivClick(1)}
                  >
                    <span> 09:30 - 09:40</span>
                  </div>
                  <div
                    className={`h6 time-grid-item ${
                      selectedLabel === 2 ? "selected" : "selectable"
                    }`}
                    onClick={() => handleDivClick(2)}
                  >
                    <span>09:40 - 09:50</span>
                  </div>
                  <div
                    className={`h6 time-grid-item ${
                      selectedLabel === 3 ? "selected" : "selectable"
                    }`}
                    onClick={() => handleDivClick(3)}
                  >
                    <span> 09:50 - 10:00</span>
                  </div>
                  <div
                    className={`h6 time-grid-item ${
                      selectedLabel === 4 ? "selected" : "selectable"
                    }`}
                    onClick={() => handleDivClick(4)}
                  >
                    <span> 10:00 - 10:10</span>
                  </div>
                  <div
                    className={`h6 time-grid-item ${
                      selectedLabel === 5 ? "selected" : "selectable"
                    }`}
                    onClick={() => handleDivClick(5)}
                  >
                    <span> 10:00 - 10:10</span>
                  </div>
                  <div
                    className={`h6 time-grid-item ${
                      selectedLabel === 6 ? "selected" : "selectable"
                    }`}
                    onClick={() => handleDivClick(6)}
                  >
                    <span> 10:20 - 10:30</span>
                  </div>
                  <div
                    className={`h6 time-grid-item ${
                      selectedLabel === 7 ? "selected" : "selectable"
                    }`}
                    onClick={() => handleDivClick(7)}
                  >
                    <span> 10:30 - 10:40</span>
                  </div>
                  <div
                    className={`h6 time-grid-item ${
                      selectedLabel === 8 ? "selected" : "selectable"
                    }`}
                    onClick={() => handleDivClick(8)}
                  >
                    <span> 10:40 - 10:50</span>
                  </div>
                  <div
                    className={`h6 time-grid-item ${
                      selectedLabel === 9 ? "selected" : "selectable"
                    }`}
                    onClick={() => handleDivClick(9)}
                  >
                    <span> 10:50 - 11:00</span>
                  </div>
                  <div
                    className={`h6 time-grid-item ${
                      selectedLabel === 10 ? "selected" : "selectable"
                    }`}
                    onClick={() => handleDivClick(10)}
                  >
                    <span> 11:00 - 11:10</span>
                  </div>
                  <div
                    className={`h6 time-grid-item ${
                      selectedLabel === 11 ? "selected" : "selectable"
                    }`}
                    onClick={() => handleDivClick(11)}
                  >
                    <span> 11:10 - 11:20</span>
                  </div>
                  <div
                    className={`h6 time-grid-item ${
                      selectedLabel === 12 ? "selected" : "selectable"
                    }`}
                    onClick={() => handleDivClick(12)}
                  >
                    <span> 11:20 - 11:30</span>
                  </div>
                  <div
                    className={`h6 time-grid-item ${
                      selectedLabel === 13 ? "selected" : "selectable"
                    }`}
                    onClick={() => handleDivClick(13)}
                  >
                    <span> 11:30 - 11:40</span>
                  </div>
                  <div
                    className={`h6 time-grid-item ${
                      selectedLabel === 14 ? "selected" : "selectable"
                    }`}
                    onClick={() => handleDivClick(14)}
                  >
                    <span> 11:40 - 11:50</span>
                  </div>
                  <div
                    className={`h6 time-grid-item ${
                      selectedLabel === 15 ? "selected" : "selectable"
                    }`}
                    onClick={() => handleDivClick(15)}
                  >
                    <span> 11:50 - 12:00</span>
                  </div>
                </div>
              </div>
            </div>
            <div class="dashboard-btn-wrap">
              <Link className="custom_btn mb-0">Continue</Link>
            </div>
          </Form>
        </>
      ),
    },
    {
      title: (
        <>
          <div className="custom-title">
            <h6>Practice</h6>
            <span className="subtitle">Confirm your details</span>
          </div>
        </>
      ),

      content: (
        <>
          <div className="authentication-title-wrap">
            <h3 className="h3 fw-600 text-stratos mb-5">Confirmation</h3>
          </div>
          <Form>
            <div className="practice-details-form-step">
              <div className="appointments-schdeule-inner mb-0">
                <div className="group-wrapper">
                  <div className="d-flex align-items-center appointments-schdeule-input">
                    <div className="checkbox-wrap">
                      <Image src={CheckMark} />
                    </div>
                    <div className="">
                      <span className="schedule-text-label">Practice</span>
                      <span className="fw-500  mb-0 text-stratos">
                        Socrated AZURE Practice
                      </span>
                    </div>
                  </div>
                  <div className="d-flex align-items-center appointments-schdeule-input">
                    <div className="checkbox-wrap">
                      <Image src={CheckMark} />
                    </div>
                    <div className="">
                      <span className="schedule-text-label">
                        Appointment Type
                      </span>
                      <span className="fw-500  mb-0 text-stratos">Bloods</span>
                    </div>
                  </div>
                  <div className="d-flex align-items-center appointments-schdeule-input">
                    <div className="checkbox-wrap">
                      <Image src={CheckMark} />
                    </div>
                    <div className="">
                      <span className="schedule-text-label">Practitioner</span>
                      <span className="fw-500   mb-0 text-royal-blue">
                        Dr. Joe Bilggs
                      </span>
                    </div>
                  </div>
                  <div className="d-flex align-items-center appointments-schdeule-input">
                    <div className="checkbox-wrap">
                      <Image src={CheckMark} />
                    </div>
                    <div className="">
                      <span className="schedule-text-label">Date & Time</span>
                      <span className="fw-500  mb-0 text-stratos">
                        Monday, 20th Mar 2023 10:40 - 10:50
                      </span>
                    </div>
                  </div>
                </div>
                <div className="amount-wrap mb-0">
                  <span className="fw-500 text-stratos mb-2">Paid Amount</span>
                  <h4 className="h4 mb-0 text-caribbean-green">€20</h4>
                </div>
              </div>
            </div>
            <div class="dashboard-btn-wrap">
              <Link className="custom_btn mb-0">Confirm</Link>
            </div>
          </Form>
        </>
      ),
    },
    {
      title: (
        <>
          <div className="custom-title">
            <h6>Payment</h6>
            <span className="subtitle">Choose your payment</span>
          </div>
        </>
      ),

      content: (
        <>
          <Row>
            <Col xl={6}>
              <div className="payment-box-wrap">
                <div className="mb-5">
                  <div className="authentication-title-wrap">
                    <h3 className="h3 fw-600 text-stratos mb-5">Payment</h3>
                  </div>
                  <div className="d-flex payments-wrap">
                    <Image src={MasterCard} />
                    <Image src={Visa} />
                    <Image src={Amex} />
                  </div>
                </div>
                <div className="payment-card-wrapper">
                  <div className="d-flex align-items-center justify-content-between mb-3 pb-2">
                    <span className="h5 mb-0 fw-400">Use Existing Card</span>
                    <Image src={EditIcon} />
                  </div>
                  <Swiper
                    slidesPerView={1}
                    spaceBetween={20}
                    pagination={{
                      clickable: true,
                    }}
                    modules={[Pagination]}
                    className="mySwiper"
                  >
                    <SwiperSlide>
                      {" "}
                      <Image src={DebitCard} />
                    </SwiperSlide>
                    <SwiperSlide>
                      {" "}
                      <Image src={DebitCard} />
                    </SwiperSlide>
                    <SwiperSlide>
                      {" "}
                      <Image src={DebitCard} />
                    </SwiperSlide>
                    <SwiperSlide>
                      {" "}
                      <Image src={DebitCard} />
                    </SwiperSlide>
                  </Swiper>
                </div>
                <div className="payment-card-details-wrapper">
                  <span className="text-stratos h5 fw-400 card-title">
                    Add New Card
                  </span>
                  <Row>
                    <Col md={12} className="mb-md-4 mb-4">
                      <FloatingLabel
                        controlId="floatingInput"
                        label="Card Holder"
                      >
                        <Form.Control
                          type="text"
                          placeholder="XXX XXX XXX"
                          defaultValue="XXX XXX XXX"
                        />
                      </FloatingLabel>
                    </Col>
                    <Col md={12} className="mb-md-4 mb-4">
                      <FloatingLabel
                        controlId="floatingInput"
                        label="Card Number"
                      >
                        <Form.Control
                          type="text"
                          placeholder="XXX XXX XXX"
                          defaultValue="XXX XXX XXX"
                        />
                      </FloatingLabel>
                    </Col>
                    <Col md={12}>
                      <Row>
                        <Col md={12} xl={6} className="mb-4 mb-xl-0">
                          {/* <FloatingLabel
                            controlId="floatingInput"
                            label="Expiration Date"
                          >
                            <Form.Control type="date" />
                            <span class="custom-icon">{SVGIcons.Calendar}</span>
                          </FloatingLabel> */}
                          <CustomDatepicker
                            name="Expiration Date"
                            format="MM/YYYY"
                          />
                        </Col>
                        <Col md={12} xl={6}>
                          <FloatingLabel controlId="floatingInput" label="CVV">
                            <Form.Control
                              type="text"
                              placeholder="477"
                              defaultValue="477"
                            />
                          </FloatingLabel>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </div>
                <Form>
                  <div class="dashboard-btn-wrap">
                    <Link className="custom_btn mb-0">Save</Link>
                  </div>
                </Form>
              </div>
            </Col>
            <Col xl={6}>
              <div className="your-summary-wrap">
                <div className="authentication-title-wrap">
                  <h3 className="h3 fw-600 text-stratos mb-4 pb-2">
                    Your Summary
                  </h3>
                </div>
                <div className="your-summary-details-wrap">
                  <div className="d-flex justify-content-between your-summary-list">
                    <span className="summary-title">Service</span>
                    <span className="fw-500 summary-info">Dentist</span>
                  </div>
                  <div className="d-flex justify-content-between your-summary-list">
                    <span className="summary-title">Doctor</span>
                    <span className="fw-500 summary-info">
                      Dr. Noel Cassidy
                    </span>
                  </div>
                  <div className="d-flex justify-content-between your-summary-list">
                    <span className="summary-title">Price</span>
                    <span className="fw-600 text-decoration-underline summary-info">
                      56 Euro
                    </span>
                  </div>
                  <div className="d-flex justify-content-between your-summary-list">
                    <span className="summary-title">Date and Time</span>
                    <span className="fw-500 summary-info">
                      Tues March 15th{" "}
                      <span className="text-decoration-underline text-caribbean-green">
                        10:15 AM
                      </span>
                    </span>
                  </div>
                  <div className="d-flex justify-content-between your-summary-list">
                    <span className="summary-title">Location</span>
                    <span className="fw-500 summary-info">
                      26 James Drive, Ogdensburg,ny, 13669 United States
                    </span>
                  </div>
                </div>
                <div class="dashboard-btn-wrap">
                  <Link className="custom_btn mb-0 w-100">
                    Book and Pay Now
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        </>
      ),
    },
  ];
  const items = steps.map((item, index) => ({
    key: item.title,
    title: item.title,
  }));
  return (
    <>
      <section className="reschedule-appointment book-an-appointment">
        <div className="page-title-wrap d-flex align-items-center justify-content-between">
          <h2 className="name h2 fw-600 mb-0">Book an Appointment </h2>
        </div>
        <div className="custom-steps-wizard authentication-form dashboard-bg">
          <div className="resapp-steps-wizard-items-wrap">
            <Steps
              current={current}
              items={items}
              onChange={onChange}
              direction="vertical"
            />
          </div>
          <div className="resapp-steps-wizard-content-wrap">
            <div className="resapp-steps-wrapper">{steps[current].content}</div>
          </div>
          <div className="custom-alert-box d-none d-lg-block">
            {current === 1 ? (
              <Alert
                message="Important"
                description="Attention: Closed on Friday Please Wear mask on visit"
                type="error"
                showIcon
              />
            ) : null}
          </div>
        </div>
      </section>
    </>
  );
};
