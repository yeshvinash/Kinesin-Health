import React from "react";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { CustomTimePicker } from "../../../components/CustomTimePicker/CustomTimePicker";

export const YourAppointmentsList = () => {
  return (
    <>
      <section className="appointments-wrapper">
        <div className="page-title-wrap d-flex align-items-center justify-content-between">
          <h2 className="name h2 fw-600 mb-0">Your Appointments </h2>
        </div>
        <div className="profile-box-wrap dashboard-bg d-flex flex-wrap flex-lg-nowrap">
          <div className="appointments-timing-wrapper">
            <div className="mb-5 pb-3">
              <span className="schedule-text-label">Date</span>
              <h3 className="fw-600  mb-0 text-stratos">
                Monday, 20th Mar 2023
              </h3>
            </div>
            <div className="">
              <span className="schedule-text-label">Time</span>
              <CustomTimePicker/>
            </div>
          </div>
          <div className="appointments-schdeule-wrapper">
            <Form>
              <div className="bottom-border">
                <div className="appointments-schdeule-inner">
                  <div className="group-wrapper">
                    <div className="appointments-schdeule-input">
                      <span className="schedule-text-label">Date</span>
                      <span className="fw-500  mb-0 text-stratos">
                        James Targaryen
                      </span>
                    </div>
                    <div className="appointments-schdeule-input">
                      <span className="schedule-text-label">Practice</span>
                      <span className="fw-500  mb-0 text-stratos">
                        Socrated AZURE Practice
                      </span>
                    </div>
                    <div className="appointments-schdeule-input">
                      <span className="schedule-text-label">Practitioner</span>
                      <span className="fw-500  mb-0 text-royal-blue">
                        Dr. Joe Bilggs
                      </span>
                    </div>
                    <div className="appointments-schdeule-input">
                      <span className="schedule-text-label">
                        Appointment Type
                      </span>
                      <span className="fw-500  mb-0 text-stratos">Bloods</span>
                    </div>
                  </div>
                  <div className="amount-wrap">
                    <span className="fw-500 text-stratos mb-2">
                      Paid Amount
                    </span>
                    <h4 className="h4 mb-0 text-caribbean-green">€20</h4>
                  </div>
                  <div className="status-wrap">
                    <div className="appointments-schdeule-input">
                      <span className="schedule-text-label">Status</span>
                      <span className="status-types d-inline-block text-stratos fw-500 confirm-dot position-relative">
                        Confirmed
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="dashboard-btn-wrap">
                <Link to="/reschedule-appointment" className="custom_btn">Reschedule</Link>
                <Link className="custom_btn danger_btn">
                  Cancel Appointment
                </Link>
              </div>
            </Form>
          </div>
        </div>
      </section>
    </>
  );
};
