import React, { useEffect, useRef, useState } from "react";
import { Button, Form, Image, Modal } from "react-bootstrap";
import Avatar1 from "../../../assets/images/avatar6.png";
import avatar from "../../../assets/images/avatar.svg";
import Nav from "../../../components/AfterLoginNav/Nav";
import AvatarIcon from "../../../assets/images/avatar8.png";
import { Link, useNavigate } from "react-router-dom";
import { SVGIcons } from "../../../components/Data/SVGIcons.js";
import SwiperCore from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { createAxiosInstance } from "../../../api/axiosConfig.js";
import { Navigation } from "swiper/modules";
import { useDispatch, useSelector } from "react-redux";
import { logoutFromHelper } from "../../../api/Helper.js";
import { logout } from "../../../redux/auth/AuthSlice.js";
import { removeuser } from "../../../redux/user/userSlice.js";
import toast, { Toaster } from "react-hot-toast";
import "swiper/css";
import "./Appointment.css";
import {
  GET_APPOINTMENTS,
  DELETE_APPOINTMENT,
  GET_ALL_STAFF,
  WHO_AM_I,
} from "../../../api/Service.js";
// import { GET_ALL_STAFF } from "../../../api/Service.js";
import AddAppointmentModal from "../../../components/Modal/AddAppointmentModal.jsx";
import { PRACTICE_SERVICE_CONTROLER_URL } from "../../../api/Service.js";
import moment from "moment";
import $ from "jquery";
import HorizontalCalendarNew1 from "../../../components/HorizontalCalendarNew1.js";
import {
  addPatientFullName,
  addPatientId,
  clearPatient,
  clearPatientId,
} from "../../../redux/patient/PatientSlice";
import { Dropdown, Menu } from "antd";
import { DownOutlined, SmileOutlined, CloseOutlined } from "@ant-design/icons";
import Dots from "../../../assets/images/dots.svg";
import RecurringModal from "../../../components/Modal/RecurringModal/RecurringModal.js";
let cssClasses = ["blue-bg", "yellow-bg", "pink-bg", "green-bg", "purple-bg"];

SwiperCore.use([Navigation]);

const Appointments = () => {
  const swiperRef = useRef(null);

  const [selectedDateForAppointment, setSelectedDateForAppointment] = useState(
    new Date()
  );
  const [startDateForAppointment, setStartDateForAppointment] = useState();

  let tenantVal = useSelector((state) => state.auth.user?.tenant);
  if (!tenantVal) tenantVal = localStorage.getItem("kinesin-tenant");
  const patientId = useSelector((state) => state.patient.patientId);
  const patientFullName = useSelector((state) => state.patient.patientFullName);
  const [appointmentData, setAppointmentData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [isActive, setIsActive] = useState(-1);
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef(null);
  const ref = useRef(null);
  const [practiceServices, setPracticeServices] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [timelineHeight, setTimelineHeight] = useState(34);
  const [staffId, setStaffId] = useState(undefined);
  const [selectedMonth, setSelectedMonth] = useState(moment().month() + 1);
  const [selectedYear, setSelectedYear] = useState(moment().year());
  const [selectedDate, setSelectedDate] = useState(moment().date());
  const [TimeSlot, setTimeSlot] = useState("8:00");
  const [timeoutId, setTimeoutId] = useState(null);
  const [Id, setId] = useState(null);
  const [headerTitle, setHeaderTitle] = useState("Add Appointment");
  const [pname, setpname] = useState("");
  const [notes, setnotes] = useState(null);
  const [serviceName, setServiceName] = useState(null);

  const [selectedAppointment, setSelectedAppointment] = useState({});
  const [visible, setVisible] = useState(false);
  const handleDropdownVisibleChange = (flag) => {
    setVisible(flag);
  };
  // Function to handle closing menu items
  const handleCloseMenuItem = () => {
    setVisible(false); // Close the dropdown menu
  };
  const openModal = () => {
    setVisible(false); // Close the dropdown menu
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };
  
  const menu = (
    <div className="custom-dropdown-menu">
      <div className="custom-close-icon" onClick={() => setVisible(false)}>
        <CloseOutlined />
      </div>
      <Menu>
        <Menu.Item key="1">
          <Link to="" onClick={openModal}> Block Timeslot</Link>
        </Menu.Item>
      </Menu>
    </div>
  );

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

  const yearData = [
    {
      id: 1,
      Year: "2019",
    },
    {
      id: 2,
      Year: "2020",
    },
    {
      id: 3,
      Year: "2021",
    },
    {
      id: 4,
      Year: "2022",
    },
    {
      id: 5,
      Year: "2023",
    },
    {
      id: 6,
      Year: "2024",
    },
    {
      id: 7,
      Year: "2025",
    },
    {
      id: 8,
      Year: "2026",
    },
    {
      id: 9,
      Year: "2027",
    },
    {
      id: 10,
      Year: "2028",
    },
  ];

  const monthData = [
    {
      id: 1,
      Num: 1,
      month: "January",
    },
    {
      id: 2,
      Num: 2,
      month: "February",
    },
    {
      id: 3,
      Num: 3,
      month: "March",
    },
    {
      id: 4,
      Num: 4,
      month: "April",
    },
    {
      id: 5,
      Num: 5,
      month: "May",
    },
    {
      id: 6,
      Num: 6,
      month: "June",
    },
    {
      id: 7,
      Num: 7,
      month: "July",
    },
    {
      id: 8,
      Num: 8,
      month: "August",
    },
    {
      id: 9,
      Num: 9,
      month: "September",
    },
    {
      id: 10,
      Num: 10,
      month: "October",
    },
    {
      id: 11,
      Num: 11,
      month: "November",
    },
    {
      id: 12,
      Num: 12,
      month: "December",
    },
  ];

  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchPracticeServices = async () => {
      try {
        const axiosInstance = createAxiosInstance();
        const response = await axiosInstance.get(
          `${tenantVal}${PRACTICE_SERVICE_CONTROLER_URL}`
        );
        let t = [{ label: "Type of Consultation*", value: "" }];
        if (response && response.data) {
          response.data.forEach((element) => {
            t.push({ label: element.name, value: element.id });
          });
        }
        setPracticeServices(t);
      } catch (error) {
        errorHandling(error);
      }
    };
    fetchPracticeServices();
    const fetchDoctors = async () => {
      try {
        const axiosInstance = createAxiosInstance();
        const response = await axiosInstance.get(
          `${tenantVal}${GET_ALL_STAFF}`
        );
        let t = [];
        if (response && response.data) {
          response.data.forEach((element) => {
            t.push({
              label: element.firstName + " " + element.lastName,
              doctorName: `${element.firstName} ${element.lastName}`,
              firstName: element.firstName,
              lastName: element.lastName,
              value: element.id,
              profilePic: element.profilePic,
            });
          });
        }
        setDoctors(t);
      } catch (error) {
        errorHandling(error);
      }
    };

    fetchDoctors();
  }, []);
  const handleModalOpen = (
    idOfStaff,
    timeSlot,
    header,
    id,
    name,
    notes,
    serviceName,
    appointment
  ) => {
    if (
      !appointment &&
      timeSlot &&
      selectedDate &&
      selectedMonth &&
      selectedYear &&
      moment(
        selectedYear +
          "-" +
          selectedMonth +
          "-" +
          selectedDate +
          " " +
          (+timeSlot.split(":")[0] > 12
            ? +timeSlot.split(":")[0] - 12 + ":" + timeSlot.split(":")[1]
            : timeSlot)
      ).isBefore(moment(new Date()))
    ) {
      toast.error(
        "Oops! you can not create an appointment for time slot that is already passed."
      );
      return;
    }
    let slot = moment(timeSlot, "hh:mm:ss").format("HH:mm");
    if (timeSlot === null) {
      // Get the current time
      let currentTime = moment();

      // Round the current time to the nearest multiple of 15 minutes
      let minutes = Math.ceil(currentTime.minutes() / 15) * 15;
      currentTime.minutes(minutes).seconds(0); // Set minutes and seconds

      // Format the current time as HH:mm
      slot = currentTime.format("HH:mm");
    }
    if (idOfStaff == null) {
      fetchProfileInfo();
      setSelectedAppointment(null);
      setServiceName(null);
      setnotes(null);
    } else {
      setServiceName(serviceName);
      setSelectedAppointment(appointment ? appointment : null);
      setnotes(notes);
    }
    setTimeSlot(slot);
    setIsModalOpen(true);
    setStaffId(idOfStaff);
    setHeaderTitle(header);

    setId(id);
    if (id === null) {
      setpname("");
      setnotes("");
    } else {
      setpname(name);
      setnotes(notes);
    }
    setStartDateForAppointment(
      moment(selectedYear + "-" + selectedMonth + "-" + selectedDate).format(
        "YYYY-MM-DD"
      )
    );
    setTimeout(() => {
      $("#idButtonAddAppointmentPopupInAppointment").trigger("click");
    }, 100);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };
  const openPatientSummaryPage = async (patientId, patientFullName) => {
    if (!patientId) return;

    dispatch(addPatientId(patientId));
    localStorage.setItem("kinesin-patientId", patientId);
    dispatch(addPatientFullName(patientFullName));
    navigate("/patient-detail");
  };
  useEffect(() => {
    getAppointmentData();
    const swiperInstance = swiperRef.current?.swiper;

    if (swiperInstance) {
      swiperInstance.slideTo(selectedDate - 1);
    }
  }, [selectedDate, selectedMonth, selectedYear]);

  const getAppointmentData = async () => {
    try {
      const axiosInstance = createAxiosInstance();
      const selectedYearVal = yearData.find(
        (data) => data.Year == selectedYear
      )?.Year;
      const selectedMonthVal = monthData.find(
        (data) => data.id == selectedMonth
      )?.Num;

      // Ensure leading zeros for month and date
      const formattedMonth = String(selectedMonthVal).padStart(2, "0");
      const formattedDate = String(selectedDate).padStart(2, "0");

      const startDate = `${selectedYearVal}-${formattedMonth}-${formattedDate}`;
      const endDate = startDate;

      const response = await axiosInstance.get(
        `${tenantVal}${GET_APPOINTMENTS}?startDate=${startDate}&endDate=${endDate}`
      );
      setAppointmentData(response.data);

      // Handle response data as needed
    } catch (error) {
      errorHandling(error);
    }
  };

  const fetchProfileInfo = async () => {
    try {
      const axiosInstance = createAxiosInstance(true);
      const response = await axiosInstance.get(`${WHO_AM_I}`);
      if (
        response &&
        response.data &&
        response.data.staffMember &&
        response.data.staffMember.id
      ) {
        setStaffId(
          response && response.data && response.data.staffMember
            ? response.data.staffMember.id
            : ""
        );
      }
    } catch (error) {
      errorHandling(error)
    }
  };
  const handleEventDelete = async (Id) => {
    try {
      const axiosInstance = createAxiosInstance();
      const url = `${tenantVal}${DELETE_APPOINTMENT}`;
      await axiosInstance.delete(url, {
        data: {
          id: Id,
          tenant: tenantVal,
        },
      });
      toast.success("Appointment deleted successfully.");

      deleteEvent(Id);
    } catch (error) {
      errorHandling(error);
    }
  };
  const deleteEvent = (eventId) => {
    getAppointmentData();
  };
  function calculateAge(birthDate) {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birth.getDate())
    ) {
      age--;
    }
    return age;
  }
  const ComponentToShow = (patient) => {
    try {
      if (!patient || !patient.patient || !patient.patient.patient) {
        return <div>No patient data available.</div>;
      }

      const {
        patient: {
          patient: {
            patient: {
              firstName,
              surname,
              address: {
                addressLine1,
                addressLine2,
                addressLine3,
                city,
                county,
                country,
                postCode,
              },
              dateOfBirth,
              gender,
            },
            practiceService,
            startTime,
            endTime,
            reasonDescription,
            durationInMins,
            id,
          },
        },
      } = patient;

      const age = dateOfBirth ? calculateAge(dateOfBirth) : "-";

      const serviceName = practiceService ? practiceService.name : "-";
      const formattedStartTime = startTime
        ? moment(startTime).format("Do MMM YYYY HH:mm")
        : "-";
      const formattedEndTime = endTime ? moment(endTime).format("HH:mm") : "-";
      const formattedAddress =
        [
          addressLine1,
          addressLine2,
          addressLine3,
          city,
          county,
          country,
          postCode,
        ]
          .filter(Boolean)
          .join(", ") || "-";
      const formattedReasonDescription = reasonDescription || "-";
      const formattedDurationInMins = durationInMins || "-";

      return (
        <div
          className="eventDetails_edit appointments-profile-header-wrap"
          onMouseLeave={toggleContentExit}
        >
          <div className="editflex">
            <div className="editfleximg">
              <span className="user-profile-image">
                {firstName && surname
                  ? firstName.trim()[0] + surname.trim()[0]
                  : (firstName.trim() ? firstName.trim().substring(0, 1) : "") +
                    (surname.trim() ? surname.trim().substring(0, 1) : "")}
              </span>
            </div>
            <div className="d-flex justify-content-between w-100">
              <div className="editflexcont">
                <h4
                  className="text-ellipsis"
                  onClick={() => {
                    if (
                      patient &&
                      patient.patient &&
                      patient.patient.patient &&
                      patient.patient.patient.patient &&
                      patient.patient.patient.patient.id
                    ) {
                      openPatientSummaryPage(
                        patient.patient.patient.patient.id,
                        patient.patient.patient.patient.firstName
                          ? patient.patient.patient.patient.firstName +
                            " " +
                            patient.patient.patient.patient.surname
                            ? patient.patient.patient.patient.surname
                            : ""
                          : ""
                      );
                    }
                  }}
                  style={{ cursor: "pointer" }}
                >
                  {firstName || ""} {surname || ""}
                </h4>
                <h6 className="text-ellipsis">
                  {age} yrs {gender}
                </h6>
              </div>
            </div>
            <ul>{/* Add buttons here */}</ul>
          </div>

          <div className="bloodgrupbox">
            <ul>
              <li>
                <h6>Scheduled Appt:</h6>
                <p>
                  {formattedStartTime} - {formattedEndTime}
                </p>
              </li>
            </ul>
          </div>

          <div className="address_box">
            <ul>
              <li>
                <h6>Address:</h6>
                <p>{formattedAddress}</p>
              </li>
              <li>
                <h6>Special Notes:</h6>
                <p>{formattedReasonDescription}</p>
              </li>
              <li>
                <h6>Type of Consultation:</h6>
                <p>{serviceName}</p>
              </li>
              <li>
                <h6>Time Duration:</h6>
                <p>{formattedDurationInMins}</p>
              </li>
            </ul>
          </div>
        </div>
      );
    } catch (error) {
      errorHandling(error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (contentRef.current && !contentRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleContent = (divId) => {
    setIsOpen(divId);
  };
  const toggleContentExit = (divId) => {
    setIsOpen(false);
  };
  const errorHandling = (error) => {
    toast.error(error.message);
    if (error && error.response && error.response.status) {
      if (error.response.status == 403) {
        logoutFromHelper();
        dispatch(logout());
        dispatch(removeuser());
        navigate("/logout");
      }
    }
  };

  const TimeLineData = [
    {
      id: 1,
      text: "8:00 am",
    },
    {
      id: 2,
      text: "8:15 am",
    },
    {
      id: 3,
      text: "8:30 am",
    },
    {
      id: 4,
      text: "8:45 am",
    },
    {
      id: 5,
      text: "9:00 am",
    },
    {
      id: 6,
      text: "9:15 am",
    },
    {
      id: 7,
      text: "9:30 am",
    },
    {
      id: 8,
      text: "9:45 am",
    },
    {
      id: 9,
      text: "10:00 am",
    },
    {
      id: 10,
      text: "10:15 am",
    },
    {
      id: 11,
      text: "10:30 am",
    },
    {
      id: 12,
      text: "10:45 am",
    },
    {
      id: 13,
      text: "11:00 am",
    },
    {
      id: 14,
      text: "11:15 am",
    },
    {
      id: 15,
      text: "11:30 am",
    },
    {
      id: 16,
      text: "11:45 am",
    },
    {
      id: 17,
      text: "12:00 pm",
    },
    {
      id: 18,
      text: "12:15 pm",
    },
    {
      id: 19,
      text: "12:30 pm",
    },
    {
      id: 20,
      text: "12:45 pm",
    },
    {
      id: 21,
      text: "1:00 pm",
    },
    {
      id: 22,
      text: "1:15 pm",
    },
    {
      id: 23,
      text: "1:30 pm",
    },
    {
      id: 24,
      text: "1:45 pm",
    },
    {
      id: 25,
      text: "2:00 pm",
    },
    {
      id: 26,
      text: "2:15 pm",
    },
    {
      id: 27,
      text: "2:30 pm",
    },
    {
      id: 28,
      text: "2:45 pm",
    },
    {
      id: 29,
      text: "3:00 pm",
    },
    {
      id: 30,
      text: "3:15 pm",
    },
    {
      id: 31,
      text: "3:30 pm",
    },
    {
      id: 32,
      text: "3:45 pm",
    },
    {
      id: 33,
      text: "4:00 pm",
    },
    {
      id: 34,
      text: "4:15 pm",
    },
    {
      id: 35,
      text: "4:30 pm",
    },
    {
      id: 36,
      text: "4:45 pm",
    },
    {
      id: 37,
      text: "5:00 pm",
    },
    {
      id: 38,
      text: "5:15 pm",
    },
    {
      id: 39,
      text: "5:30 pm",
    },
    {
      id: 40,
      text: "5:45 pm",
    },
    {
      id: 41,
      text: "6:00 pm",
    },
    {
      id: 42,
      text: "6:15 pm",
    },
    {
      id: 43,
      text: "6:30 pm",
    },
    {
      id: 44,
      text: "6:45 pm",
    },
    {
      id: 45,
      text: "7:00 pm",
    },
    {
      id: 46,
      text: "7:15 pm",
    },
    {
      id: 47,
      text: "7:30 pm",
    },
    {
      id: 48,
      text: "7:45 pm",
    },
    {
      id: 49,
      text: "8:00 pm",
    },
    {
      id: 50,
      text: "8:15 pm",
    },
    {
      id: 51,
      text: "8:30 pm",
    },
    {
      id: 52,
      text: "8:45 pm",
    },
    {
      id: 53,
      text: "9:00 pm",
    },
    {
      id: 54,
      text: "9:15 pm",
    },
    {
      id: 55,
      text: "9:30 pm",
    },
    {
      id: 56,
      text: "9:45 pm",
    },
    {
      id: 57,
      text: "10:00 pm",
    },
    {
      id: 58,
      text: "10:15 pm",
    },
    {
      id: 59,
      text: "10:30 pm",
    },
    {
      id: 60,
      text: "10:45 pm",
    },
    {
      id: 61,
      text: "11:00 pm",
    },
  ];
  const restructureData = (appointmentData, doctors) => {
    let i = -1;
    const restructuredArray = doctors.map((doctor) => {
      i++;
      if (i >= cssClasses.length - 1) i = 0;
      const doctorAppointments = appointmentData.find(
        (appointment) => appointment.staffId === doctor.value
      );
      const patientNameArray = [];
      let num = 0;
      for (let i = 0; i < TimeLineData.length; i++) {
        const timelineSlotText = moment(
          "Sat Mar 02 2024 " + TimeLineData[i].text,
          "ddd MMM DD YYYY hh:mm a"
        ).format("HH:mm A");
        const appointment = doctorAppointments
          ? doctorAppointments.staffAppointments.find(
              (appointment) =>
                appointment.startTime &&
                appointment.startTime.trim()?.substring(11, 16) ===
                  timelineSlotText.substring(0, 5)
            )
          : null;
        let p;
        let display;
        if (appointment) {
          if (appointment.durationInMins == 15) {
            num = 0;
          } else if (appointment.durationInMins == 30) {
            num = 1;
          } else if (appointment.durationInMins == 45) {
            num = 2;
          } else if (appointment.durationInMins == 60) {
            num = 3;
          }
          display = "yes";
        } else {
          if (num == 0) {
            display = "yes";
          } else {
            display = "no";
            num--;
          }
        }
        const appointmentObj = appointment
          ? {
              id: appointment.id,
              name:
                appointment.patient.firstName +
                  " " +
                  appointment.patient.surname || "",
              durationInMins: appointment.durationInMins || 15,
              timeSlot: appointment.startTime?.trim()?.substring(11, 16) || "",
              patient: appointment,
              isDisplay: display,
            }
          : {
              id: null,
              name: "",
              durationInMins: 0,
              timeSlot: timelineSlotText,
              patient: {},
              isDisplay: display,
            };

        patientNameArray.push(appointmentObj);
      }
      return {
        id: doctor.value,
        doctorImg: doctor.profilePic || null,
        doctorName: doctor.doctorName,
        firstName: doctor.firstName,
        lastName: doctor.lastName,
        patientName: patientNameArray,
        className: cssClasses[i],
        isDisplay: true,
      };
    });
    let emptyAppointments = [];
    return [...restructuredArray, ...emptyAppointments];
  };

  const tableData = restructureData(appointmentData, doctors);
  return (
    <>
      {/* <Nav /> */}
      <div className="dashBcontbody appointments-page-wrap">
        <h2 className="h2 fw-600 text-stratos page-title">Appointments</h2>
        <button
          id="idButtonAddAppointmentPopupInAppointment"
          data-bs-toggle="modal"
          data-bs-target="#addAppointment_modal"
          style={{
            height: 0,
            width: 0,
            padding: 0,
            margin: 0,
            borderRightWidth: 0,
            borderLeftWidth: 0,
            borderBottomWidth: 0,
            borderTopWidth: 0,
            border: 0,
          }}
        ></button>

        <div className="dashboard-bg appointments-page-main-wrap">
          <div className="d-flex align-items-center appointments-calendar-wrap justify-content-between">
            <HorizontalCalendarNew1
              selectedDate={selectedDate}
              selectedMonth={selectedMonth}
              selectedYear={selectedYear}
              setSelectedDate={setSelectedDate}
              setSelectedMonth={setSelectedMonth}
              setSelectedYear={setSelectedYear}
            />
            <div className="btn-wrapper">
              <Button
                className="custom_btn addform_btn"
                onClick={() => {
                  handleModalOpen(null, null, "Add Appointment", null);
                }}
              >
                Add Appointment
              </Button>
              <Dropdown
                overlay={menu}
                trigger={["click"]}
                visible={visible}
                onVisibleChange={handleDropdownVisibleChange}
              >
                <button className="custom-dropdown-button">
                  <Image src={Dots} />
                </button>
              </Dropdown>
              <RecurringModal visible={modalVisible} onClose={closeModal}/>
            </div>
          </div>
          <div className="appointments-blocks-wrap">
            <div className="position-relative main-wrap">
              <div className="doctors-list-wrap">
                <Swiper
                  navigation={{
                    nextEl: ".swiper-button-next1",
                    prevEl: ".swiper-button-prev1",
                  }}
                  clickable={true}
                  allowTouchMove={false}
                  allowSlideClick={false}
                  spaceBetween={0}
                  slidesPerView={5}
                  className="appointments-table-slider"
                  breakpoints={{
                    320: {
                      slidesPerView: 1,
                    },
                    768: {
                      slidesPerView: 2,
                    },
                    992: {
                      slidesPerView: 3,
                    },
                    1366: {
                      slidesPerView: 4,
                    },
                    1600: {
                      slidesPerView: 5,
                    },
                  }}
                >
                  {tableData.map((item, index) => (
                    <SwiperSlide key={item.id} className={item.className}>
                      <div className="appointments-table-column d-flex flex-column">
                        <div className="appointments-table-column-header-wrap">
                          <div className="d-flex align-items-center justify-content-center doctors-title-wrap">
                            <div className="profile-wrap flex-shrink-0">
                              {item.doctorImg ? (
                                <Image src={item.doctorImg} alt="avatar-img" />
                              ) : (
                                <span className="user-profile-image">
                                  {item.firstName.trim() && item.lastName.trim()
                                    ? item.firstName.trim()[0] +
                                      item.lastName.trim()[0]
                                    : (item.firstName.trim()
                                        ? item.firstName.trim().substring(0, 1)
                                        : "") +
                                      (item.lastName.trim()
                                        ? item.lastName.trim().substring(0, 1)
                                        : "")}
                                </span>
                              )}
                            </div>
                            <div className="doctor-name">
                              <span className="text-ellipsis fw-500 text-stratos mb-0">
                                {item.doctorName}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
              <div className="slider-btn-wrap">
                <button className="swiper-button-prev1 swiper-btn">
                  {SVGIcons.SliderLeftArrow}
                </button>
                <button className="swiper-button-next1 swiper-btn">
                  {SVGIcons.SliderRightArrow}
                </button>
              </div>
            </div>
            <div className="d-flex position-relative appointments-dashboard-wrap">
              <div className="timeline-wrap">
                {TimeLineData.map((value, index) => {
                  return (
                    <span className="timeline" key={index}>
                      {value.text}
                    </span>
                  );
                })}
              </div>
              <div className="appointments-table-wrap  position-relative">
                <div>
                  <Swiper
                    navigation={{
                      nextEl: ".swiper-button-next1",
                      prevEl: ".swiper-button-prev1",
                    }}
                    clickable={true}
                    allowTouchMove={false}
                    allowSlideClick={false}
                    spaceBetween={0}
                    slidesPerView={5}
                    className="appointments-table-slider"
                    breakpoints={{
                      320: {
                        slidesPerView: 1,
                      },
                      768: {
                        slidesPerView: 2,
                      },
                      992: {
                        slidesPerView: 3,
                      },
                      1366: {
                        slidesPerView: 4,
                      },
                      1600: {
                        slidesPerView: 5,
                      },
                    }}
                  >
                    {tableData.map((item, index) => (
                      <SwiperSlide key={item.id} className={item.className}>
                        <div className="appointments-table-column d-flex flex-column">
                          <div className="appointments-table-column-bottom-wrap d-flex flex-column">
                            {item.patientName?.map((ele, i) => (
                              <div
                                className="appointments-block position-relative appointments-height"
                                style={{
                                  display:
                                    ele.isDisplay === "yes" ? "block" : "none",
                                }}
                              >
                                {ele.name != "" ? (
                                  <>
                                    <div
                                      onClick={() => {
                                        handleModalOpen(
                                          item.id,
                                          ele.timeSlot,
                                          "Edit Appointment",
                                          ele.id,
                                          ele.name,
                                          ele.patient.reasonDescription,
                                          ele.patient.practiceService.name,
                                          ele.patient
                                        );
                                      }}
                                      onMouseEnter={() => {
                                        clearTimeout(timeoutId);
                                        const id = setTimeout(
                                          () => toggleContent(`${index}${i}`),
                                          600
                                        ); // Adjust the delay time as needed
                                        setTimeoutId(id);
                                      }}
                                      className={
                                        ele && ele && ele.durationInMins
                                          ? ele && ele.durationInMins == 15
                                            ? "homepage-duration-15 appointments-title-wrap"
                                            : ele.durationInMins == 30
                                            ? "homepage-duration-30 appointments-title-wrap"
                                            : ele.durationInMins == 45
                                            ? "homepage-duration-45 appointments-title-wrap"
                                            : "homepage-duration-60 appointments-title-wrap"
                                          : "homepage-duration-15 appointments-title-wrap"
                                      }
                                    >
                                      <span
                                        key={i}
                                        ref={ref}
                                        className="mb-0 text-black fw-500 title text-ellipsis child"
                                      >
                                        {ele.name}
                                      </span>
                                    </div>
                                    {isOpen === `${index}${i}` && (
                                      <div
                                        ref={contentRef}
                                        className="appointments-block-wrap"
                                      >
                                        <ComponentToShow patient={ele} />
                                      </div>
                                    )}
                                  </>
                                ) : (
                                  <>
                                    <div
                                      className="homepage-duration-15 appointments-title-wrap hideElement"
                                      onClick={() => {
                                        handleModalOpen(
                                          item.id,
                                          ele.timeSlot,
                                          "Add Appointment",
                                          null
                                        );
                                      }}
                                      style={{
                                        backgroundColor: moment(
                                          selectedYear +
                                            "-" +
                                            selectedMonth +
                                            "-" +
                                            selectedDate +
                                            " " +
                                            (+ele.timeSlot.split(":")[0] > 12
                                              ? +ele.timeSlot.split(":")[0] -
                                                12 +
                                                ":" +
                                                ele.timeSlot.split(":")[1]
                                              : ele.timeSlot)
                                        ).isBefore(moment(new Date()))
                                          ? "#F2F2FA"
                                          : "",
                                      }}
                                    >
                                      <span className="mb-0 text-black fw-500 title text-ellipsis child ">
                                        {ele.name}
                                      </span>
                                    </div>
                                  </>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modal" id="dashboardModal">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h4 className="modal-title">Are You Sure Want to Delete?</h4>
            </div>

            <div className="modal-footer">
              <button
                className="custom_btn"
                type="submit"
                onClick={() => handleEventDelete(Id)}
                data-bs-dismiss="modal"
              >
                Submit
              </button>
              <button
                type="button"
                className="custom_btn btn-danger"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
      <AddAppointmentModal
        id={Id}
        headerTitle={headerTitle}
        selectedDate={selectedDateForAppointment}
        staffId={staffId}
        setStaffId={setStaffId}
        practiceServices={practiceServices}
        startDate={startDateForAppointment}
        startTime={TimeSlot}
        selectedView="day"
        getBydatesData={getAppointmentData}
        onClose={handleModalClose}
        patientName={pname}
        notes={notes}
        serviceName={serviceName}
        selectedAppointmentForEdit={selectedAppointment}
      />
    </>
  );
};

export default Appointments;
