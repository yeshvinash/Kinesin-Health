import moment from "moment";
import React, { useEffect, useMemo, useState } from "react";
import { Calendar as BigCalender, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import {
  APPOINMENT_ADD_URL,
  APPOINMENT_CONTROLER_URL,
  DELETE_APPOINTMENT,
  GET_ALL_STAFF,
  GET_BY_STAFF_MEMBER_ID,
  PATIENT_SEARCH_AUTOCOMPLETE_URL,
  PRACTICE_SERVICE_CONTROLER_URL,
} from "../../../api/Service";
import axios from "../../../api/axios";
import avatar from "../../../assets/images/avatar.svg";
import calendaricon from "../../../assets/images/calendaricon.svg";
import dateic from "../../../assets/images/dateic.svg";
import downarrow from "../../../assets/images/downarrow.png";
import notice from "../../../assets/images/notice.svg";
import timeic from "../../../assets/images/timeic.svg";
import useric from "../../../assets/images/useric.svg";
import Nav from "../../../components/AfterLoginNav/Nav";

import { Autocomplete, TextField } from "@mui/material";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { createAxiosInstance } from "../../../api/axiosConfig";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import dayjs from "dayjs";
import { logoutFromHelper } from "../../../api/Helper";
import { logout } from "../../../redux/auth/AuthSlice";
import { removeuser } from "../../../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import AddAppointmentModal from "../../../components/Modal/AddAppointmentModal";

import $ from "jquery";
// const localizer = momentLocalizer(moment);

let defaultDurationInMins = "15";

moment.locale("es-es", {
  week: {
    dow: 1, //Monday is the first day of the week.
  },
});

const localizer = momentLocalizer(moment);

const CalendarComponent = () => {
  // const [value, setValue] = useState(dayjs('2022-04-17T15:30'));
  const [value, setValue] = useState(dayjs(new Date().setMinutes(0)));
  const [valueStartDate, setValueStartDate] = useState(
    dayjs(new Date().setMinutes(0))
  );

  const [isAppointmentSavedOrUpdated, setIsAppointmentSavedOrUpdated] =
    useState(false);
  const [patient, setPatient] = useState({});
  const [events, setEvents] = useState([]);
  const [staffId, setStaffId] = useState(undefined);
  const [formData, setFormData] = useState({
    id: "",
    patientId: "",
    fullName: "",
    startDate: moment(new Date(dayjs(value))).format("YYYY-MM-DD"),
    startTime: moment(new Date(dayjs(value))).format("HH:mm"),
    endDate: "",
    endTime: "",
    reasonDescription: "",
    reasonForVisit: "",
    practiceServiceId: "",
    durationInMins: defaultDurationInMins,
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [arrayDoubleClick, setArrayDoubleClick] = useState([]);

  const [formParam, setFormParam] = useState({
    errors: {
      email: "",
    },
    submitted: false,
  });

  const validateForm = () => {

    if (isAppointmentSavedOrUpdated) {
      setIsAppointmentSavedOrUpdated(false);
      return;
    }

    let fData = Object.assign({}, formData);
    let formIsValid = true;
    let f = Object.assign({}, formParam);

    f.errors.patientId = "";
    f.errors.startDate = "";
    f.errors.startTime = "";
    f.errors.staffId = "";
    f.errors.durationInMins = "";
    // f.errors.reasonForVisit = "";
    f.errors.practiceServiceId = "";

    if (!formData.patientId) {
      formIsValid = false;
      f.errors.patientId = "*Please select patient.";
    }
    if (!formData.startDate) {
      formIsValid = false;
      f.errors.startDate = "*Please select start date.";
    }
    if (!formData.startTime) {
      formIsValid = false;
      f.errors.startTime = "*Please select start time.";
    }
    if (!formData.durationInMins) {
      formIsValid = false;
      f.errors.durationInMins = "*Please select time duration.";
    }
    // if (!formData.reasonForVisit) {
    //   formIsValid = false;
    //   f.errors.reasonForVisit = "*Please select symptoms.";
    // }
    if (!formData.practiceServiceId) {
      formIsValid = false;
      f.errors.practiceServiceId = "*Please select type of consultation.";
    }
    if (!staffId) {
      formIsValid = false;
      f.errors.staffId = "*Please select staff from the top of the page.";
    }
    setFormParam(f);
    return formIsValid;
  };
  useEffect(() => {
    validateForm();
  }, [
    staffId,
    formData.patientId,
    formData.durationInMins,
    formData.reasonForVisit,
    formData.practiceServiceId,
  ]);

  let tenantVal = useSelector((state) => state.auth.user?.tenant);
  if (!tenantVal)
    tenantVal = localStorage.getItem('kinesin-tenant');
  const [selectedView, setSelectedView] = useState("week");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [popup, setPopup] = useState(false);
  const [showCard, setShowCard] = useState(false);

  useEffect(() => {
    setArrayDoubleClick([]);
  }, [selectedView]);

  const [timeDurations, setTimeDurations] = useState([10, 15, 20]);

  const [practiceServices, setPracticeServices] = useState([]);

  const [doctors, setDoctors] = useState([]);

  const openPopup = () => {
    setPopup(true);
  };

  const closeCard = () => {
    setSelectedEvent(null);
    setShowCard(false);
  };

  const closePopup = () => {
    setPopup(false);
  };

  const handleDateChange = (date) => {
    setSelectedView("day");
    setSelectedDate(date);
    getbystaffmemberidApi(selectedView, staffId, date);
  };

  const handleCalendarChange = (date) => {
    setSelectedDate(date);
  };

  const addEvent = (newEvent) => {
    const color = getColor(newEvent.gender, newEvent.age);
    newEvent = { ...newEvent, ...color };
    setEvents([...events, newEvent]);
  };

  const deleteEvent = (eventId) => {
    const updatedEvents = events.filter((event) => event.id !== eventId);
    setEvents(updatedEvents);
  };

  const updateEvent = (eventId, updatedEvent) => {
    const color = getColor(updatedEvent.gender, updatedEvent.age);
    updatedEvent = { ...updatedEvent, ...color };
    const updatedEvents = events.map((event) =>
      event.id === eventId ? { ...event, ...updatedEvent } : event
    );
    setEvents(updatedEvents);
  };
console.log(selectedEvent);
  const handleSelect = ({ start, end }) => {
    var newStateArray = arrayDoubleClick.slice();
    if (newStateArray.length == 2) {
      newStateArray.shift();
    }

    let s = moment(start).format("mm");

    if (s == "07") {
      s = "00";
      start.setMinutes(0);
      end.setMinutes(15);
    }
    else if (s == "22") {
      s = "15";
      start.setMinutes(15);
      end.setMinutes(30);
    }
    else if (s == "37") {
      s = "30";
      start.setMinutes(30);
      end.setMinutes(45);
    }
    else if (s == "52") {
      s = "45";
      start.setMinutes(45);
      end.setMinutes(60);
    };

    newStateArray.push(
      moment(start).format("YYYY-MM-DD") + " " + moment(start).format("HH:") + s
    );
    setArrayDoubleClick(newStateArray);
    setFormData({
      id: "",
      patientId: formData.patientId,
      fullName: formData.fullName,
      startDate: moment(start).format("YYYY-MM-DD"),
      startTime: moment(start).format("HH:mm"),
      // startTime: moment(start).format("HH:") + s,
      endDate: moment(end).format("YYYY-MM-DD"),
      endTime: moment(end).format("HH:mm"),
      reasonDescription: formData.reasonDescription,
      reasonForVisit: formData.reasonForVisit,
      practiceServiceId: formData.practiceServiceId,
      durationInMins: formData.durationInMins,
    });

    setValue(dayjs(start));
    closeCard();
    openAddAppointmentModal(newStateArray);
  };

  const handleEventDelete = async (event) => {
    try {
      const axiosInstance = createAxiosInstance();
      const url = `${tenantVal}${DELETE_APPOINTMENT}`;
      await axiosInstance.delete(url, {
        data: {
          id: event.id,
          tenant: tenantVal,
        },
      });
      toast.success("Appointment deleted successfully.");

      deleteEvent(event.id);
      setSelectedEvent(null);
    } catch (error) {
      errorHandling(error);
    }
  };

  const handleEventUpdate = (event) => {
    setFormData({
      id: event.id,
      fullName: event.title,
      startDate: moment(event.start).format("YYYY-MM-DD"),
      startTime: moment(event.start).format("HH:mm"),
      endDate: moment(event.end).format("YYYY-MM-DD"),
      endTime: moment(event.end).format("HH:mm"),
      reasonForVisit: event.reasonForVisit,
      practiceServiceId: event.practiceServiceId,
      durationInMins: event.durationInMins,
      reasonDescription: event.reasonDescription,
      patientId: event.patientId,
    });
    setValue(dayjs(event.start));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    formParam.submitted = true;
    if (validateForm()) {
      formParam.submitted = true;
    } else return;

    if (!staffId) {
      toast.error("please select staff..");
      return;
    }

    var startTimeApt = moment(
      formData.startDate + " " + formData.startTime
    ).format("yyyy-MM-DD HH:mm");
    var endTimeApt = moment(formData.startDate + " " + formData.startTime)
      .add(formData.durationInMins, "minutes")
      .format("yyyy-MM-DD HH:mm");

    var startAtApt = moment(startTimeApt).format("HH:mm");
    var endAtApt = moment(endTimeApt).format("HH:mm");

    var obj = {
      id: formData.id,
      tenant: tenantVal,
      patientId: formData.patientId,
      patient: {
        id: formData.patientId,
        tenant: tenantVal,
      },
      startAt: startAtApt,
      endAt: endAtApt,
      startTime: startTimeApt,
      endTime: endTimeApt,
      practiceServiceId: formData.practiceServiceId,
      practiceService: {
        id: formData.practiceServiceId,
        tenant: tenantVal,
      },
      reasonDescription: formData.reasonDescription,
      staffMemberId: staffId,
      durationInMins: formData.durationInMins,
      // reasonForVisit: formData.reasonForVisit,
    };

    try {
      const axiosInstance = createAxiosInstance();
      const response = await axiosInstance.post(
        `${tenantVal}${APPOINMENT_ADD_URL}`,
        obj
      );
      toast.success(
        "Appointment " + (formData.id ? "updated" : "saved") + " successfully"
      );
      closeCard();
      getbystaffmemberidApi(selectedView, staffId, selectedDate);
    } catch (error) {
      errorHandling(error);
    }
    setIsAppointmentSavedOrUpdated(true);
    setFormData({
      id: "",
      patientId: "",
      fullName: "",
      startDate: moment(new Date(dayjs(value))).format("YYYY-MM-DD"),
      startTime: moment(new Date(dayjs(value))).format("HH:mm"),
      endDate: "",
      endTime: "",
      reasonDescription: "",
      reasonForVisit: "",
      practiceServiceId: "",
      durationInMins: defaultDurationInMins,
    });
  };

  const formats = useMemo(
    () => ({
      weekHeaderFormat: (date, culture, localizer) =>
        localizer.format(date, "D MMMM YYYY", culture),
      dayFormat: (date, culture, localizer) =>
        localizer.format(date, "ddd", culture),
    }),
    []
  );

  const getColor = (gender, age) => {
    if (gender === "female" && age > 15) {
      return {
        backgroundColor: "#FFF1F7",
        borderLeft: "#EF0064 3px solid",
        color: "#EF0064",
      }; // Red color for female
    } else if (gender === "male" && age > 15) {
      return {
        backgroundColor: "#E7EEFA",
        borderLeft: "#458AFF 3px solid",
        color: "#458AFF",
      }; // Blue color for male
    } else if (age < 15) {
      return {
        backgroundColor: "#FFFAEA",
        borderLeft: "#F5C107 3px solid",
        color: "#F5C107",
      }; // Yellow color for age less than 15
    } else {
      return "#000000"; // Default color
    }
  };

  const getbystaffmemberidApi = async (sview, staff, date) => {
    if (!date || !staff) return;
    var startTimeApt = moment(date).format("yyyy-MM-DD");
    var endTimeApt = moment(date).format("yyyy-MM-DD");

    if (sview) {
      if (sview == "month") {
        startTimeApt = moment(date).startOf("month").format("yyyy-MM-DD");
        endTimeApt = moment(date).endOf("month").format("yyyy-MM-DD");
      } else if (sview == "week") {
        startTimeApt = moment(date).startOf("week").format("yyyy-MM-DD");
        endTimeApt = moment(date).endOf("week").format("yyyy-MM-DD");
      } else if (sview == "day") {
        startTimeApt = moment(date).startOf("day").format("yyyy-MM-DD");
        endTimeApt = moment(date).endOf("day").format("yyyy-MM-DD");
      }
    }

    try {
      const axiosInstance = createAxiosInstance();
      const response = await axiosInstance.get(
        `${tenantVal}${GET_BY_STAFF_MEMBER_ID}`.replace(
          "{staffIdValue}",
          staff
        ) +
        "?startDate=" +
        startTimeApt +
        "&endDate=" +
        endTimeApt
      );
      var ev = [];
      if (response && response.data && response.data.length > 0) {
        response.data.forEach((res) => {
          let diff = moment(res.endTime).diff(moment(res.startTime), "minutes");
          if (diff > 60) return;
          const newEvent = {
            id: res.id ? res.id : "",
            title:
              res.patient && res.patient.firstName
                ? res.patient.firstName + " " + res.patient.surname
                : "-",
            start: moment(res.startTime).toDate(),
            end: moment(res.endTime).toDate(),
            color: getColor(formData.gender, formData.age),
            reasonForVisit: res.reasonForVisit, // Set color based on gender and age
            practiceServiceId: res.practiceService
              ? res.practiceService.id
              : formData.practiceServiceId,
            practiceServiceName: res.practiceService
              ? res.practiceService.name
              : "",
            durationInMins: res.durationInMins,
            reasonDescription: res.reasonDescription,
            patientId: res.patient ? res.patient.id : "",
            address:
              res.patient && res.patient.address
                ? res.patient.address.addressLine1 +
                " " +
                res.patient.address.addressLine2 +
                " " +
                res.patient.address.addressLine3
                : "",
            age: res.patient ? calculateAge(res.patient.dateOfBirth) : [],
          };
          ev.push(newEvent);
        });
      }
      setEvents(ev);
    } catch (error) {
      errorHandling(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleViewChange = (selected) => {
    setSelectedView(selected);

    getbystaffmemberidApi(selected, staffId, selectedDate);
  };

  const eventViews = ({ event }) => (
    <div
      className={
        event.durationInMins == 15
          ? "time-duration-15 event-card"
          :
          (
            event.durationInMins == 30 ? "time-duration-30 event-card" :
              (
                event.durationInMins == 45 ? "time-duration-45 event-card" : "time-duration-60 event-card"
              )
          )
      }
    >
      <div className="d-flex align-items-center">
        <div className="eventflexbox">
          <div className="eventImage">
            <img src={avatar} alt="" />
          </div>
        </div>
        <div>
          <h4>{event.title}</h4>
          <h5>
            {moment(event.start).format("HH:mm")}-
            {moment(event.end).format("HH:mm")}
          </h5>
        </div>
      </div>
      {event && selectedEvent && event.id == selectedEvent.id
        ? renderEventCard()
        : ""}
    </div>
  );

  const calculateAge = (dob) => {
    let age;
    if (dob) {
      const dobDate = new Date(
        dob[0], // Year
        dob[1] - 1, // Month
        dob[2] // Day
      );
      const today = new Date();
      age = today.getFullYear() - dobDate.getFullYear();
      const monthDiff = today.getMonth() - dobDate.getMonth();
      if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < dobDate.getDate())
      ) {
        age--;
      }
    }
    return age;
  };

  const renderEventCard = () => {

    if (selectedEvent && showCard) {
      return (
        <div className="eventDetails_edit">
          <div className="editflex">
            <div className="editfleximg">
              <img src={avatar} alt="" />
            </div>
            <div className="editflexcont">
              <h4>{selectedEvent.title}</h4>
              <h6>
                {selectedEvent.age} yrs {selectedEvent.gender}
              </h6>
            </div>
            <ul>
              <li>
                <button
                  onClick={(event) => {
                    event.stopPropagation();
                    handleEventUpdate(selectedEvent);
                  }}
                >
                  <i className="fa-solid fa-pencil"></i>
                </button>
              </li>
              <li>
                <button
                  onClick={(event) => {
                    event.stopPropagation();
                    setShowCard(false);
                  }}
                  data-bs-toggle="modal"
                  data-bs-target="#dashboardModal"
                  className="deletebtn"
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              </li>
            </ul>
          </div>

          <div className="bloodgrupbox">
            <ul>
              <li>
                <h6>Blood Group:</h6>
                <p>B+</p>
              </li>
              <li>
                <h6>Scheduled Appt:</h6>
                <p>
                  {" "}
                  {moment(selectedEvent.start).format(
                    "Do MMM YYYY HH:mm"
                  )} - {moment(selectedEvent.end).format("HH:mm")}
                </p>
              </li>
            </ul>
          </div>

          <div className="address_box">
            <ul>
              <li>
                <h6>Address:</h6>
                <p>{selectedEvent.address ? selectedEvent.address : "-"}</p>
              </li>
              <li>
                <h6>Special Notes:</h6>
                <p>
                  {selectedEvent.reasonDescription
                    ? selectedEvent.reasonDescription
                    : "-"}
                </p>
              </li>
              <li>
                <h6>Type of Consultation:</h6>
                <p>
                  {selectedEvent.practiceServiceName
                    ? selectedEvent.practiceServiceName
                    : "-"}
                </p>
              </li>

              <li>
                <h6>Time Duration:</h6>
                <p>
                  {selectedEvent.durationInMins
                    ? selectedEvent.durationInMins
                    : "-"}
                </p>
              </li>
            </ul>
            {/* <div className="symptomsbox">
              <h6>Symptoms</h6>
              <p>{selectedEvent.reasonForVisit}</p>
            </div> */}
          </div>
        </div>
      );
    }
    return null;
  };

  const eventPropGetter = (event) => {
    const color = getColor(event.gender, event.age);

    return {
      style: {
        backgroundColor: color.backgroundColor,
        borderLeft: color.borderLeft,
        color: color.color,
      },
    };
  };
  const handleEventClick = (event) => {
    setSelectedEvent(event);
    setShowCard(true);
  };

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
              value: element.id,
            });
          });
        }
        setDoctors(t);
        if (t) handleCheck(t[0].value);
      } catch (error) {
        errorHandling(error);
      }
    };
    fetchDoctors();
  }, []);

  const [options, setOptions] = useState([]);

  const getData = async (searchTerm) => {
    try {
      if (!searchTerm) setOptions([]);
      const axiosInstance = createAxiosInstance();
      const response = await axiosInstance.get(
        `${tenantVal}${PATIENT_SEARCH_AUTOCOMPLETE_URL}` + "/" + searchTerm
      );
      if (response && response.data && response.data.length > 0) {
        const updatedOptions = response.data.map((p) => {
          return {
            id: p.id,
            title:
              p.firstName +
              (p.surname ? " " + p.surname : "") +
              (p.mobilePhone ? " (" + p.mobilePhone + ")" : ""),
            gender: p.gender,
            dateOfBirth: p.dateOfBirth,
            address: p.address,
          };
        });
        setOptions(updatedOptions);
      } else setOptions([]);
    } catch (error) {
      errorHandling(error);
    }
  };

  const onInputChange = (event, value, reason) => {
    if (value && value.length > 0) {
      getData(value);
    } else {
      setTimeout(() => {
        setOptions([]);
      }, 0);
    }
  };

  const handleCheck = (id) => {
    setStaffId(id);
    getbystaffmemberidApi(selectedView, id, selectedDate);

    let nnn = dayjs(new Date().setMinutes(0));

    closeCard();
    setValue(nnn);
    setFormData({
      id: "",
      patientId: "",
      fullName: "",
      startDate: moment(new Date(dayjs(nnn))).format("YYYY-MM-DD"),
      startTime: moment(new Date(dayjs(nnn))).format("HH:mm"),
      endDate: "",
      endTime: "",
      reasonDescription: "",
      reasonForVisit: "",
      practiceServiceId: "",
      durationInMins: defaultDurationInMins,
    });
  };

  const xxx = (event) => {
    setSelectedDate(event);
    getbystaffmemberidApi(selectedView, staffId, event);
  };
  const onShowMore = (event) => {
    if (selectedView && selectedView == "month") {
      setSelectedView("day");
    }
    closeCard();
  };

  const abcd = () => {
    if (showCard) closeCard();
  };

  const errorHandling = (error) => {
    console.log(error);
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

  const slotPropGetter = (slotDate) => {
    const format = "YYYY-MM-DD HH:mm";
    let s =
      selectedView == "day"
        ? moment(slotDate).format("YYYY-MM-DD").toString()
        : formData.startDate;
    let time = moment(slotDate, format);
    let beforeTime = moment(s + " " + formData.startTime, format);
    let afterTime = moment(s + " " + formData.endTime, format);
    let isUpperBoxHighlighted = true;
    if (
      moment(s + " " + formData.startTime).format("mm") == "00" ||
      moment(s + " " + formData.startTime).format("mm") == "15" ||
      moment(s + " " + formData.startTime).format("mm") == "30" ||
      moment(s + " " + formData.startTime).format("mm") == "45"
    ) {
      beforeTime = moment(s + " " + formData.startTime, format).subtract(
        7,
        "m"
      );
      afterTime = moment(s + " " + formData.startTime, format);
      isUpperBoxHighlighted = false;
    }

    if (time.isBetween(beforeTime, afterTime, undefined, "[]")) {
      if (isUpperBoxHighlighted)
        return {
          className: "fullBoxActive",
        };
      else
        return {
          className: "fullBoxActive",
        };
    }
  };

  const openAddAppointmentModal = (newStateArray) => {
    setArrayDoubleClick([]);
    setTimeout(() => {
      $("#idButtonAddAppointmentPopup").trigger("click");
    }, 100);
  };

  return (
    <div onClick={abcd}>
      {/* <Nav /> */}
      {/* end Practice Details */}
      <Toaster position="top-center" reverseOrder={false} />

      <div className="dashBcontbody">
        <h3>Appointments </h3>
        {/* below button is the temporary button to open add an appointment popup */}
        <button
          id="idButtonAddAppointmentPopup"
          data-bs-toggle="modal"
          data-bs-target="#addAppointment_modal"
          style={{
            height: 0,
            padding: 0,
            borderRightWidth: 0,
            borderLeftWidth: 0,
          }}
        ></button>
        <br />
        <ul id="doctorHorizontalList">
          {doctors.length > 0 &&
            doctors.map((item, i) => (
              <li
                className={
                  item.value == staffId ? "background-color-green" : ""
                }
                onClick={() => handleCheck(item.value)}
              >
                {" "}
                <span> {item.label} </span>{" "}
              </li>
            ))}
        </ul>
        <br />
        {/* <ul id="doctorHorizontalList">
          <li><span>TEST 1</span></li>
          <li><span>TEST 2</span></li>
          <li><span>TEST 3 111</span></li>
          <li><span>TEST 4</span></li>
          <li><span>Vishvas Patel</span></li>
          <li><span>TEST 4</span></li>
          <li><span>TEST 1</span></li>
          <li><span>TEST 2</span></li>
          <li><span>TEST 3 111</span></li>
          <li><span>TEST 4</span></li>
          <li><span>Vishvas Patel</span></li>
          <li><span>TEST 4</span></li>
          <li><span>TEST 1</span></li>
          <li><span>TEST 2</span></li>
          <li><span>TEST 3 111</span></li>
          <li><span>TEST 4</span></li>
          <li><span>Vishvas Patel</span></li>
          <li><span>TEST 4</span></li>
        </ul> */}

        {/* <h3>Select Date and Time</h3> */}

        <div className="cleandarmainflexbox">
          <div className="bigclander">
            <label className="dropdown_view">
              <select
                value={selectedView}
                onChange={(e) => handleViewChange(e.target.value)}
                className="formcontrol"
              >
                <option value="month">Month</option>
                <option value="week">Week</option>
                <option value="day">Day</option>
              </select>
            </label>
            <BigCalender
              localizer={localizer}
              formats={formats}
              events={events}
              selectable={true}
              onSelectSlot={handleSelect}
              onSelectEvent={(event) => handleEventClick(event)}
              onNavigate={(event) => xxx(event)}
              onShowMore={(event) => onShowMore(event)}
              // onSelectEvent={handleEventUpdate}
              date={selectedDate}
              view={selectedView}
              views={["month", "week", "day"]}
              style={{ height: 500 }}
              defaultView={selectedView}
              // min={moment().set({ hour: 9, minute: 0 }).toDate()} // Start time at 9:00 AM
              min={moment().set({ hour: 7, minute: 0 }).toDate()} // Start time at 9:00 AM
              max={moment().set({ hour: 23, minute: 59 }).toDate()}
              step={7.5} // Time slot interval of 30 minutes
              eventPropGetter={eventPropGetter}
              components={{
                event: eventViews,
              }}
              slotPropGetter={slotPropGetter}
            />
          </div>
          {/* {renderEventCard()} */}

          <div className="smallclander phondpn">
            <Calendar onChange={handleDateChange} value={selectedDate} />

            <div className="smallclanderform dskt">
              <div className="smallclanderheading">
                <div className="calendariconbox">
                  <img src={calendaricon} alt="" />
                </div>
                <h4>{selectedEvent ? "Edit Appoinment" : "Add Appointment"}</h4>
              </div>

              <form
                // onSubmit={handleSubmit}
                onSubmit={(event) => handleSubmit(event)}
                onClick={(event) => {
                  event.stopPropagation();
                }}
              >
                <div className="form-floating mb-3">
                  {/* <input
                    type="text"
                    className="form-control"
                    placeholder="Full Name"
                    id="floatingInput4"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                  /> */}
                  {/* <p>vishvas :  {formData.patientId} ,  {formData.fullName}, {formData.reasonForVisit}</p> */}

                  {formParam.submitted && (
                    <div className="errorMsg text-start">
                      {formParam.errors.staffId} <br></br>
                      <br></br>{" "}
                    </div>
                  )}

                  {/* vishvas : {formData.startDate} : {formData.startTime} */}

                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    value={formData.fullName || null}
                    options={options}
                    getOptionLabel={(option) =>
                      option && option.title ? option.title : formData.fullName
                    }
                    onInputChange={onInputChange}
                    onChange={(event, newValue) => {
                      formData.fullName = newValue ? newValue.title : "";
                      formData.patientId = newValue ? newValue.id : "";
                      setPatient(newValue);
                    }}
                    // isOptionEqualToValue={(option, value) =>
                    //   option && value ? option.title === value.title : formData.title
                    // }
                    // onChange={(event, newValue) => {
                    //   if (newValue && newValue.title)
                    //     formData.fullName = newValue.title;
                    //   else
                    //   formData.fullName = '';
                    // }}
                    // sx={{ width: 445 }}
                    renderInput={(params) => (
                      <TextField {...params} label="Full Name" />
                    )}
                  />

                  {formParam.submitted && (
                    <div className="errorMsg text-start">
                      {formParam.errors.patientId}
                    </div>
                  )}

                  {/* <label for="floatingInput4">Full Name</label> */}
                  {/* <img src={useric} alt="" /> */}
                </div>

                <div className="form-floating mb-3">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker", "DatePicker"]}>
                      <DatePicker
                        format="DD/MM/YYYY"
                        // label="DOB"
                        value={value}
                        name="startDate"
                        // onChange={(newValue) => setValue(newValue)}
                        sx={{ width: "100%" }}
                        // class="form-control"
                        onChange={(newValue) => {
                          setValueStartDate(newValue);
                          var d = new Date(dayjs(newValue));
                          setFormData({
                            ...formData,
                            ["startDate"]: moment(d).format("YYYY-MM-DD"),
                          });
                        }}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                  {formParam.submitted && (
                    <div className="errorMsg text-start">
                      {formParam.errors.startDate}
                    </div>
                  )}
                </div>

                {/* <div className="form-floating mb-3">
                  <input
                    className="form-control"
                    placeholder="Start Date"
                    id="floatingInput4"
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                  />
                  <label for="floatingInput4">Start Date</label>
                  <img src={dateic} alt="" />
                  {formParam.submitted && (
                    <div className="errorMsg text-start">
                      {formParam.errors.startDate}
                    </div>
                  )}
                </div> */}

                <div className="form-floating mb-3">
                  <select
                    className="form-control p15"
                    name="durationInMins"
                    value={formData.durationInMins}
                    onChange={(e) => {
                      handleChange(e);
                    }}
                  >
                    <option value="15">15</option>
                    <option value="30">30</option>
                    <option value="45">45</option>
                    <option value="60">1 Hour</option>
                  </select>
                  <img src={downarrow} alt="" />
                  {formParam.submitted && (
                    <div className="errorMsg text-start">
                      {formParam.errors.durationInMins}
                    </div>
                  )}
                </div>

                <div className="form-floating mb-3">

                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["TimePicker", "TimePicker"]}>
                      <TimePicker
                        // label="Start Time"
                        value={value}
                        sx={{ width: "100%" }}
                        ampm={false}
                        onChange={(newValue) => {
                          setValue(newValue);
                          var d = new Date(dayjs(newValue));
                          console.log("HHHH : " + d);
                          setFormData({
                            ...formData,
                            ["startTime"]: moment(d).format("HH:mm"),
                          });
                        }}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                  {formParam.submitted && (
                    <div className="errorMsg text-start">
                      {formParam.errors.startTime}
                    </div>
                  )}
                </div>

                <div className="form-floating mb-3">
                  <input
                    className="form-control"
                    placeholder="Notes"
                    id="floatingInput4"
                    type="text"
                    name="reasonDescription"
                    value={formData.reasonDescription}
                    onChange={handleChange}
                  />
                  <label for="floatingInput4">Notes</label>
                  <img src={notice} alt="" />
                </div>

                {/* <div className="form-floating mb-3">
                  <select
                    className="form-control p15"
                    name="reasonForVisit"
                    value={formData.reasonForVisit}
                    onChange={handleChange}
                  >
                    <option value="">Symptoms*</option>
                    <option value="Fever">Fever</option>
                    <option value="Headache">Headache</option>
                    <option value="Cough">Cough</option>
                    <option value="Sore throat">Sore throat</option>
                  </select>
                  <img src={downarrow} alt="" />
                  {formParam.submitted && (
                    <div className="errorMsg text-start">
                      {formParam.errors.reasonForVisit}
                    </div>
                  )}
                </div> */}

                <div className="form-floating mb-3">
                  <select
                    className="form-control p15"
                    name="practiceServiceId"
                    value={formData.practiceServiceId}
                    onChange={handleChange}
                  >
                    {practiceServices.map((option) => {
                      return (
                        <option label={option.label} value={option.value}>
                          {option.label}
                        </option>
                      );
                    })}
                  </select>
                  <img src={downarrow} alt="" />
                  {formParam.submitted && (
                    <div className="errorMsg text-start">
                      {formParam.errors.practiceServiceId}
                    </div>
                  )}
                </div>

                <button className="custom_btn appointmentbtn" type="submit">
                  {selectedEvent
                    ? "Update an Appointment"
                    : "Add an Appointment"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      {!popup && (
        <div className="showformbtn">
          <button type="button" onClick={openPopup}>
            +
          </button>
        </div>
      )}
      {popup && (
        <>
          <div className="smallclander">
            <div className="showformbtn">
              <button type="button" onClick={closePopup}>
                -
              </button>
            </div>
            <div className="smallclanderform show">
              <div className="smallclanderheading">
                <div className="calendariconbox">
                  <img src={calendaricon} alt="" />
                </div>
                <h4>{selectedEvent ? "Edit Appoinment" : "Add Appointment"}</h4>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Full Name"
                    id="floatingInput4"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                  />
                  <label for="floatingInput4">Full Name</label>
                  <img src={useric} alt="" />
                </div>
                <div className="form-floating mb-3">
                  <input
                    className="form-control"
                    placeholder="Start Date"
                    id="floatingInput4"
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                  />
                  <label for="floatingInput4">Start Date</label>
                  <img src={dateic} alt="" />
                </div>

                <div className="form-floating mb-3">
                  <input
                    className="form-control"
                    placeholder="Start Time"
                    id="floatingInput4"
                    type="time"
                    name="startTime"
                    value={formData.startTime}
                    onChange={handleChange}
                  />
                  <label for="floatingInput4">Start Time</label>
                  <img src={timeic} alt="" />
                </div>

                <div className="form-floating mb-3">
                  <input
                    className="form-control"
                    placeholder="End Date"
                    id="floatingInput4"
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                  />
                  <label for="floatingInput4">End Date</label>
                  <img src={dateic} alt="" />
                </div>

                <div className="form-floating mb-3">
                  <input
                    className="form-control"
                    placeholder="End Time"
                    id="floatingInput4"
                    type="time"
                    name="endTime"
                    value={formData.endTime}
                    onChange={handleChange}
                  />
                  <label for="floatingInput4">End Time</label>
                  <img src={timeic} alt="" />
                </div>

                <div className="form-floating mb-3">
                  <input
                    className="form-control"
                    placeholder="Notes"
                    id="floatingInput4"
                    type="text"
                    name="reasonDescription"
                    value={formData.reasonDescription}
                    onChange={handleChange}
                  />
                  <label for="floatingInput4">Notes</label>
                  <img src={notice} alt="" />
                </div>

                <div className="form-floating mb-3">
                  <select
                    className="form-control p15"
                    name="reasonForVisit"
                    value={formData.reasonForVisit}
                    onChange={handleChange}
                  >
                    <option value="">Symptoms*</option>
                    <option value="Fever">Fever</option>
                    <option value="Headache">Headache</option>
                    <option value="Cough">Cough</option>
                    <option value="Sore throat">Sore throat</option>
                  </select>
                  <img src={downarrow} alt="" />
                </div>

                <div className="form-floating mb-3">
                  <select
                    className="form-control p15"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                  >
                    <option value="">Gender*</option>
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                  </select>
                </div>

                <div className="form-floating mb-3">
                  <input
                    className="form-control"
                    placeholder="Age"
                    id="floatingInput4"
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                  />
                  <label for="floatingInput4">Age</label>
                </div>
                <button className="custom_btn appointmentbtn" type="submit">
                  {selectedEvent
                    ? "Update an Appointment"
                    : "Add an Appointment"}
                </button>
              </form>
            </div>
          </div>
        </>
      )}

      {/* Modal */}
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
                onClick={() => handleEventDelete(selectedEvent)}
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
        headerTitle={"Add Appointment"}
        selectedDate={selectedDate}
        staffId={staffId}
        practiceServices={practiceServices}
        startDate={formData.startDate}
        startTime={formData.startTime}
        selectedView={selectedView}
        getbystaffmemberidApi={getbystaffmemberidApi}
      />

      {/* Modal */}
    </div>
  );
};

export default CalendarComponent;
