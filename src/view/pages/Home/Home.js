import React, { useState } from "react";
import { SVGIcons } from "../../../components/Data/SVGIcons";
import { Link } from "react-router-dom";
import BookAppointmentImg from "../../../assets/images/cover/book-an-appointment.png";
import HealthPrescrptions from "../../../assets/images/cover/new-repeat-prescription.png";
import HealthRecords from "../../../assets/images/cover/health-records.png";
import UpcomingAppointments from "../../../assets/images/cover/upcoming-appontments.png";
import LabResults from "../../../assets/images/cover/lab-results.png";
import MyHealthRecords from "../../../assets/images/cover/my-health-records.png";
import NewMessages from "../../../assets/images/cover/new-messages.png";
import MyRepeatPrescription from "../../../assets/images/cover/repeat-prescription.png";
import MyHealthIndicator from "../../../assets/images/cover/my-health-records.png";
import CurveImg from "../../../assets/images/cover/curve.png";
import AvatarImg from "../../../assets/images/cover/avatar.png";
import PdfThumbnail from "../../../assets/images/cover/pdf-thumbnail.jpg";
import { Image } from "react-bootstrap";
import { Tabs } from "antd";
import { CustomTimePicker } from "../../../components/CustomTimePicker/CustomTimePicker";
import "./Home.css";

const data = [
  {
    id: 1,
    avatarImg: AvatarImg,
    msgTitle: "Blood Results",
    msgDesc: "All results Normal - No follow up required",
    msgTimeTitle: "3 mins ago",
    msgTime: "4:56 PM",
  },
  {
    id: 2,
    avatarImg: AvatarImg,
    msgTitle: "Blood Results",
    msgDesc: "All results Normal - No follow up required",
    msgTimeTitle: "3 mins ago",
    msgTime: "4:56 PM",
  },
  {
    id: 3,
    avatarImg: AvatarImg,
    msgTitle: "Blood Results",
    msgDesc: "All results Normal - No follow up required",
    msgTimeTitle: "3 mins ago",
    msgTime: "4:56 PM",
  },
  {
    id: 4,
    avatarImg: AvatarImg,
    msgTitle: "Blood Results",
    msgDesc: "All results Normal - No follow up required",
    msgTimeTitle: "3 mins ago",
    msgTime: "4:56 PM",
  },
  {
    id: 5,
    avatarImg: AvatarImg,
    msgTitle: "Blood Results",
    msgDesc: "All results Normal - No follow up required",
    msgTimeTitle: "3 mins ago",
    msgTime: "4:56 PM",
  },
  {
    id: 6,
    avatarImg: AvatarImg,
    msgTitle: "Blood Results",
    msgDesc: "All results Normal - No follow up required",
    msgTimeTitle: "3 mins ago",
    msgTime: "4:56 PM",
  },
  {
    id: 7,
    avatarImg: AvatarImg,
    msgTitle: "Blood Results",
    msgDesc: "All results Normal - No follow up required",
    msgTimeTitle: "3 mins ago",
    msgTime: "4:56 PM",
  },
  {
    id: 8,
    avatarImg: AvatarImg,
    msgTitle: "Blood Results",
    msgDesc: "All results Normal - No follow up required",
    msgTimeTitle: "3 mins ago",
    msgTime: "4:56 PM",
  },
  {
    id: 9,
    avatarImg: AvatarImg,
    msgTitle: "Blood Results",
    msgDesc: "All results Normal - No follow up required",
    msgTimeTitle: "3 mins ago",
    msgTime: "4:56 PM",
  },
  {
    id: 10,
    avatarImg: AvatarImg,
    msgTitle: "Blood Results",
    msgDesc: "All results Normal - No follow up required",
    msgTimeTitle: "3 mins ago",
    msgTime: "4:56 PM",
  },
];
const items = [
  {
    key: "1",
    label: "Primary",
    children: (
      <>
        {data.map((item) => (
          <div
            key={item.id}
            className="d-flex align-items-center custom-tabs-content-wrap"
          >
            <div className="avatar-img">
              <Image src={item.avatarImg} />
            </div>
            <div className="w-100 d-flex justify-content-between custom-tabs-details-wrap position-relative">
              <div className="position-relative me-3">
                <span className="small-text d-none d-lg-block msg-time-wrap">
                  {item.msgTimeTitle}
                </span>
                <h4 className="text-stratos fw-500 h4 mb-1 text-ellipsis ">
                  {item.msgTitle}
                </h4>
                <p className="mb-2 small text-manatee fw-500 text-ellipsis">
                  {item.msgDesc}
                </p>
                <span className="small-text d-block d-lg-none">
                  {" "}
                  {item.msgTimeTitle}
                </span>
              </div>
              <div className="flex-shrink-0 d-none d-lg-block">
                <span className="p text-stratos mb-0 fw-500">
                  {" "}
                  {item.msgTime}
                </span>
              </div>
            </div>
          </div>
        ))}
      </>
    ),
  },

  {
    key: "2",
    label: "Groups",
    children: "Groups",
  },
  {
    key: "3",
    label: "Archive",
    children: "Archive",
  },
];

const PdfDownload = () => {
  const pdfUrl = "https://www.africau.edu/images/default/sample.pdf";
  const link = document.createElement("a");
  link.href = pdfUrl;
  link.target = "_blank";
  link.download = "document.pdf";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// const format = "HH:mm";
export const Home = () => {
  return (
    <>
      <section className="dashboard-wrap">
        <div className="py-4 d-flex justify-content-between patient-header-title-wrap">
          <div className="d-flex  align-items-center home-patient-title">
            <div className="profile-shortname text-center">
              <span className="mb-0 h2 text-black fw-600">JT</span>
            </div>
            <div className="me-3">
              <h3 className="small fw-600 mb-2 text-break">
                Welcome, James Targaryen
              </h3>
              <div className="d-flex">
                <h6 className="me-4 mb-0 fw-500">
                  <span className="me-2">Age</span>
                  <span className="profile-value">28</span>
                </h6>
                <h6 className="mb-0 fw-500">
                  <span className="me-2">Gender</span>
                  <span className="profile-value">Male</span>
                </h6>
              </div>
            </div>
          </div>
          <Link className="message-box-wrap d-flex align-items-center">
            <span className="me-4 msg-icon">{SVGIcons.Email}</span>
            <span className="p  mb-0">Message</span>
          </Link>
        </div>
        <div className="dashboard-bg">
          <div>
            <h2 className="small fw-600 text-stratos mb-5 title-wrap">
              Start Managing your health, Today{" "}
            </h2>
            <div className="health-grid-box">
              <Link
                to="/book-appointment"
                className="health-grid-item d-flex justify-content-between align-items-center first-item"
              >
                <h3 className="h3 text-stratos fw-600 mb-0">
                  Book an Appointment
                </h3>
                <Image src={BookAppointmentImg} />
              </Link>
              <Link
                to=""
                className="health-grid-item d-flex justify-content-between align-items-center second-item"
              >
                <h3 className="h3 text-stratos fw-600 mb-0">
                  New Repeat Prescriptions{" "}
                </h3>
                <Image src={HealthPrescrptions} />
              </Link>
              <Link
                to=""
                className="health-grid-item d-flex justify-content-between align-items-center third-item"
              >
                <h3 className="h3 text-stratos fw-600 mb-0">Health Records</h3>
                <Image src={HealthRecords} />
              </Link>
              <Link
                to=""
                className="health-grid-item d-flex justify-content-between align-items-center fourth-item"
              >
                <h3 className="h3 text-stratos fw-600 mb-0">Lab Results</h3>
                <Image src={LabResults} />
              </Link>
            </div>
            <div className="patient-cardbox-wrap">
              <div className="patient-card">
                <div className="d-flex align-items-center card-header position-relative">
                  <div className="card-box-img appointment-bg">
                    <Image src={UpcomingAppointments} />
                  </div>
                  <h2 className="mid fw-600 text-stratos mb-0">
                    Upcoming Appontments
                  </h2>
                  <Image src={CurveImg} className="curve-img" />
                </div>
                <div className="patient-card-content">
                  <Link
                    to="/appointments"
                    className="d-flex justify-content-between upcoming-appointments"
                  >
                    <div className="me-4 ">
                      <h4 className="fw-500 confirm-dot text-stratos text-break">
                        Doctor Consultation
                      </h4>
                      <span className="fw-500 text-manatee mb-2 h6">
                        Monday, 23th Mar 2023
                      </span>
                      <CustomTimePicker />
                    </div>
                    <div className="flex-shrink-0">
                      <span className="d-block mb-2 text-royal-blue fw-500 text-break h6">
                        Dr. John Doe
                      </span>
                      <span className="h6 mb-0 d-block text-manatee fw-500">
                        Test Practice
                      </span>
                    </div>
                  </Link>
                  <Link
                    to="/appointments"
                    className="d-flex justify-content-between upcoming-appointments"
                  >
                    <div className="me-4 ">
                      <h4 className="fw-500 past-dot text-stratos text-break">
                        Blood Test
                      </h4>
                      <span className="fw-500 text-manatee mb-2 h6">
                        Monday, 23th Mar 2023
                      </span>
                      <CustomTimePicker />
                    </div>
                    <div className="flex-shrink-0">
                      <span className="d-block mb-2 h6 text-royal-blue fw-500 text-break">
                        Nurse Mary
                      </span>
                      <span className="d-block text-manatee h6 mb-0 fw-500">
                        Test Practice
                      </span>
                    </div>
                  </Link>
                  <Link
                    to="/appointments"
                    className="d-flex justify-content-between upcoming-appointments"
                  >
                    <div className="me-4 ">
                      <h4 className="fw-500 past-dot opacity text-stratos text-break">
                        Nurse Appointment
                      </h4>
                      <span className="fw-500 text-manatee mb-2 h6">
                        Monday, 23th Mar 2023
                      </span>
                      <CustomTimePicker />
                    </div>
                    <div className="flex-shrink-0">
                      <span className="d-block mb-2 text-royal-blue fw-500 text-break h6">
                        Nurse Mary
                      </span>
                      <span className="d-block text-manatee fw-500 h6 mb-0">
                        Test Practice
                      </span>
                    </div>
                  </Link>
                </div>
              </div>
              <div className="patient-card">
                <div className="d-flex align-items-center card-header position-relative">
                  <div className="card-box-img health-records-bg">
                    <Image src={MyHealthRecords} />
                  </div>
                  <h2 className="mid fw-600 text-stratos mb-0">
                    My Health Records
                  </h2>
                  <Image src={CurveImg} className="curve-img" />
                </div>
                <div className="patient-card-content health-records-content">
                  <div
                    role="button"
                    className="d-flex align-items-center"
                    onClick={PdfDownload}
                  >
                    <div className="pdf-thumbnail-img flex-shrink-0">
                      <Image src={PdfThumbnail} alt="pdf" />
                    </div>
                    <div className="pdf-content-wrap">
                      <h4 className="h4 fw-500 text-stratos text-ellipsis">
                        Cardiology Letter
                      </h4>
                      <span className="p text-royal-blue fw-500 text-ellipsis mb-1">
                        By: Dr. James
                      </span>
                      <span className="mb-0 h6 fw-500 text-manatee d-block d-lg-none date-label">
                        20th Mar 2023
                      </span>
                    </div>
                    <div className="">
                      <span className="mb-0 fw-500 h6 text-manatee d-none d-lg-block">
                        20th Mar 2023
                      </span>
                    </div>
                  </div>
                  <div
                    role="button"
                    className="d-flex align-items-center"
                    onClick={PdfDownload}
                  >
                    <div className="pdf-thumbnail-img flex-shrink-0">
                      <Image src={PdfThumbnail} alt="pdf" />
                    </div>
                    <div className="pdf-content-wrap">
                      <h4 className="h4 fw-500 text-stratos text-ellipsis">
                        Cardiology Letter
                      </h4>
                      <span className="p text-royal-blue fw-500 text-ellipsis mb-1">
                        By: Dr. James
                      </span>
                      <span className="mb-0 h6 fw-500 text-manatee d-block d-lg-none date-label">
                        20th Mar 2023
                      </span>
                    </div>
                    <div className="">
                      <span className="mb-0 h6 fw-500 d-none d-lg-block text-manatee">
                        20th Mar 2023
                      </span>
                    </div>
                  </div>
                  <div
                    role="button"
                    className="d-flex align-items-center"
                    onClick={PdfDownload}
                  >
                    <div className="pdf-thumbnail-img flex-shrink-0">
                      <Image src={PdfThumbnail} alt="pdf" />
                    </div>
                    <div className="pdf-content-wrap">
                      <h4 className="h4 fw-500 text-stratos text-ellipsis">
                        Cardiology Letter
                      </h4>
                      <span className="p text-royal-blue fw-500 text-ellipsis mb-1">
                        By: Dr. James
                      </span>
                      <span className="mb-0 h6 fw-500 text-manatee d-block d-lg-none date-label">
                        20th Mar 2023
                      </span>
                    </div>
                    <div className="">
                      <span className="mb-0 h6 fw-500 text-manatee d-none d-lg-block">
                        20th Mar 2023
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="patient-card item-3">
                <div className="d-flex align-items-center card-header position-relative">
                  <div className="card-box-img new-messages-bg position-relative">
                    <Image src={NewMessages} />
                  </div>
                  <h2 className="mid fw-600 text-stratos mb-0">New Messages</h2>
                  <Image src={CurveImg} className="curve-img" />
                </div>
                <div className="new-message-card-content">
                  <div className="custom-tabs-wrap">
                    <Tabs defaultActiveKey="1" items={items} />
                  </div>
                </div>
              </div>
              <div className="patient-card">
                <div className="d-flex align-items-center card-header position-relative">
                  <div className="card-box-img repeat-prescription-bg">
                    <Image src={MyRepeatPrescription} />
                  </div>
                  <h2 className="mid fw-600 text-stratos mb-0">
                    My Repeat Prescription
                  </h2>
                  <Image src={CurveImg} className="curve-img" />
                </div>
                <div className="patient-card-content d-flex">
                  <div className="d-flex flex-column justify-content-between">
                    <h4 className="fw-500 confirm-dot text-stratos text-break">
                      No Request Available
                    </h4>
                    <div className="btn-wrap">
                      <Link to="" className="custom_btn">
                        New Repeat Prescriptions
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="patient-card">
                <div className="d-flex align-items-center card-header position-relative">
                  <div className="card-box-img appointment-bg">
                    <Image src={MyHealthIndicator} />
                  </div>
                  <h2 className="mid fw-600 text-stratos mb-0">
                    My Health Indicator
                  </h2>
                  <Image src={CurveImg} className="curve-img" />
                </div>
                <div className="patient-card-content helth-card-content">
                  <div className="d-flex justify-content-between upcoming-appointments flex-wrap">
                    <div className="me-4 ">
                      <h4 className="fw-500 confirm-dot text-stratos text-break">
                        Blood Preasure
                      </h4>
                      <span className="fw-500 text-manatee mb-0 h6">
                        113/73 mm Hg
                      </span>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between upcoming-appointments flex-wrap">
                    <div className="me-4 ">
                      <h4 className="fw-500 confirm-dot text-stratos text-break">
                        Smoking
                      </h4>
                      <span className="fw-500 text-manatee mb-0 h6">
                        Non Smoker
                      </span>
                    </div>
                  </div>
                  <div className="d-flex justify-content-between upcoming-appointments flex-wrap">
                    <div className="me-4 ">
                      <h4 className="fw-500 confirm-dot opacity text-stratos text-break">
                        BMI
                      </h4>
                      <span className="fw-500 text-manatee mb-0 h6">31</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
