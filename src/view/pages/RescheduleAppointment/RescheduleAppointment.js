import React, { useEffect, useRef, useState } from "react";
import { Steps } from "antd";
import { Col, FloatingLabel, Form, Image, Row } from "react-bootstrap";
import Note from "../../../assets/images/icons/info-button.svg";
import { Link } from "react-router-dom";
import CheckMark from "../../../assets/images/icons/checkmark.svg";
import SwiperCore from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
// import "swiper/css/navigation";
import "./RescheduleAppointment.css";
import { SVGIcons } from "../../../components/Data/SVGIcons";

SwiperCore.use([Navigation]);
export const RescheduleAppointment = () => {
  const [current, setCurrent] = useState(0);
  const [selectedLabel, setSelectedLabel] = useState(null);
  const [selectedDiv, setSelectedDiv] = useState(null);
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

  const swiperRef = useRef(null);
  const handleNext = () => {
    if (swiperRef && swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };

  const handlePrev = () => {
    if (swiperRef && swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  const steps = [
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
            <h3 className="h3 fw-600 text-stratos mb-4 pb-2">
              Practice Details
            </h3>
          </div>
          <Form>
            <Row className="practice-details-form-step">
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
              <Col md={6} className="mb-4">
                <FloatingLabel controlId="floatingSelect" label="Practitioner">
                  <Form.Select aria-label="Floating label select example">
                    <option value="1">Dr. Joe Bilggs</option>
                    <option value="2">Dr. John</option>
                  </Form.Select>
                </FloatingLabel>
              </Col>
              <Col md={6} className="mb-4">
                <div className="note-wrap">
                  <div className="d-flex align-items-center">
                    <Image src={Note} className="me-2" />
                    <span className="text-royal-blue fw-500">Note:</span>
                  </div>
                  <span className="text-label fw-500">
                    A custom note can be placed here when editing an appointment
                    type
                  </span>
                </div>
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
                  <button
                    className="swiper-button-prev swiper-btn"
                    // onClick={handlePrev}
                  >
                    {SVGIcons.SliderLeftArrow}
                  </button>
                  <button
                    className="swiper-button-next swiper-btn"
                    // onClick={handleNext}
                  >
                    {SVGIcons.SliderRightArrow}
                  </button>
                </div>
              </div>
              <div className="calander-slider">
                <Swiper
                  clickable ={true}
                  navigation={{
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                  }}
                  
                  spaceBetween={10}
                  slidesPerView={15}
                >
                  {data.map((item) => (
                    <SwiperSlide key={item.id}>
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
            <h6>Confirmation</h6>
            <span className="subtitle">Confirm your details</span>
          </div>
        </>
      ),

      content: (
        <>
          <div className="authentication-title-wrap">
            <h3 className="h3  fw-600 text-stratos mb-4 pb-2">Confirmation</h3>
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
  ];
  const items = steps.map((item, index) => ({
    key: item.title,
    title: item.title,
  }));
  return (
    <>
      <section className="reschedule-appointment">
        <div className="page-title-wrap d-flex align-items-center justify-content-between">
          <h3 className="name fw-600 mb-0">Reschedule Appointment </h3>
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
        </div>
      </section>
    </>
  );
};
