import React, { useEffect, useRef, useState } from "react";
import Nav from "../../../components/AfterLoginNav/Nav";
import patient from "../../../assets/images/patient_icon.svg";
import tipIcon from "../../../assets/images/tipicon.svg";
import information from "../../../assets/images/information.svg";
import tick from "../../../assets/images/tick.svg";
import Delete from "../../../assets/images/delete.svg";
import healthimage from "../../../assets/images/healthimg.svg";
import news from "../../../assets/images/healthnews.svg";
import HorizontalCalendar from "../../../components/Calender";
import DeleteModal from "../../../components/Modal/DeleteModal";
import news2 from "../../../assets/images/news.svg";
import SmsModal from "../../../components/Modal/SmsModal";
import TaskModal from "../../../components/Modal/TaskModal";
import moment from "moment";
import vaccinesimg from "../../../assets/images/vaccinesimg.svg";
import toast, { Toaster } from "react-hot-toast";
import { createAxiosInstance } from "../../../api/axiosConfig";
import Checkmark from "../../../assets/images/checkmark1.svg";
import HorizontalCalendarNew1 from "../../../components/HorizontalCalendarNew1";
import { useLocation } from "react-router-dom";
import {
  addPatientFullName,
  addPatientId,
  clearPatient,
  clearPatientId,
} from "../../../redux/patient/PatientSlice";
import {
  DELETE_TASK,
  GET_BY_PRACTICE_ID,
  GET_BY_STAFF_MEMBER,
  GET_BY_STAFF_MEMBER_ID,
  GET_APPOINTMENTS_HOME_PAGE,
  GET_CLINICAL_NOTE,
  PATIENT_CONTROLER_URL_ID,
  SAVE_CLINICAL_NOTE,
  TASK_CONTROLER_URL,
  TASK_CONTROLER_URL_ID,
  TASK_CONTROLER_URL_OPEN_USER,
  WHO_AM_I,
  PRACTICE_SERVICE_CONTROLER_URL,
  PRACTICE_HOURS_CONTROLER_URL,
  ADD_PATIENT_PAYMENT,
  START_CONSULTATION,
  TASK_CONTROLER_CLOSE,
  GET_CONSULTATION_ID,
  CHECK_PATIENT_PAYMENT,
} from "../../../api/Service";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../../../components/Pagination";
import DisplayTaskModal from "../../../components/Modal/DisplayTaskModal";
import { getTenant, logoutFromHelper } from "../../../api/Helper";
import { logout } from "../../../redux/auth/AuthSlice";
import { removeuser } from "../../../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import { pink } from "@mui/material/colors";
import no_profile_picture from "../../../assets/images/no_profile_picture.svg";
import AddAppointmentModal from "../../../components/Modal/AddAppointmentModal";
import $ from "jquery";
import { Empty, Image, Input, Select, Table } from "antd";
import { SVGIcons } from "../../../components/Data/SVGIcons";
import { Button } from "react-bootstrap";
import { Tooltip } from "react-tooltip";

const AlliedHome = () => {
  const [selectedDate, setSelectedDate] = useState([]);
  const [calenderDate, setcalenderDate] = useState(moment().date());
  const [calenderMonth, setcalenderMonth] = useState(moment().month() + 1);
  const [calenderYear, setcalenderYear] = useState(moment().year());
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [consultationLength, setConsultationLength] = useState(0);
  const [freeTime, setFreeTime] = useState(0);
  const [Idforpayment, setIdforPayment] = useState(null);
  const [consultationStarted, setConsultationStarted] = useState(false);
  const [selectedDateForAppointment, setSelectedDateForAppointment] = useState(
    new Date()
  );
  const [paymentDone, setPaymentDone] = useState(true)
  const [selectedService, setSelectedService] = useState("");
  const [valueError, setValueError] = useState("");
  const [inputAmount, setInputAmount] = useState(null);
  const [staffMemberId, setStaffMemberId] = useState();
  const [practiceServices, setPracticeServices] = useState([]);
  const [startDateForAppointment, setStartDateForAppointment] = useState();
  const [startTimeForAppointment, setStartTimeForAppointment] = useState();
  const [serviceError, setServiceError] = useState("");

  const [clinicalNote, setClinicalNote] = useState("");

  const [allDayStartTimeAndEndTime, setAllDayStartTimeAndEndTime] = useState(
    []
  );

  const [selectedClinicalNote, setSelectedClinicalNote] = useState(null);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [dynamicDataSource, setDynamicDataSource] = useState([]);
  const [filterTable, setFilterTable] = useState([]);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 2,
    },
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { state } = location;
  const [note, setNote] = useState(""); 

  const [patients, setPatients] = useState([]);
  const [indexAndPatient, setIndexAndPatient] = useState({});

  const [x, setX] = useState({
    slotInterval: 15,
    openTime: "",
    closeTime: "", 
  });
  const [allTimes, setAllTimes] = useState([]);
  const swiperRef = useRef(null);
  const [formParamForAddNote, setFormParamForAddNote] = useState({
    errors: {
      email: "",
    },
    submitted: false,
  });
  const validateFormForAddNote = () => {
    let formIsValid = true;
    let f = Object.assign({}, formParamForAddNote);
    f.errors.note = "";
    if (!clinicalNote) {
      formIsValid = false;
      f.errors.note = "*Please enter note.";
    }
    setFormParamForAddNote(f);
    return formIsValid;
  };
  const handleNoteChange = (event) => {
    if (selectedPatient) {
      const updatedPatient = { ...selectedPatient, note: event.target.value };
      setSelectedPatient(updatedPatient);
    }
  };
  const validateAmount = () => {
    if (!inputAmount) {
      setValueError("Amount is required.");
      return false;
    }
    if (isNaN(inputAmount) || inputAmount <= 0) {
      setValueError("Amount must be a valid positive number.");
      return false;
    }
    setValueError("");
    return true;
  };
  const validateService = () => {
    if (!selectedService) {
      setServiceError("Service is required.");
      return false;
    }
    setServiceError("");
    return true;
  };
  const handlePayButtonClick = async () => {
    const isAmountValid = validateAmount();
    const isServiceValid = validateService();
    if (!isAmountValid) return;
    const today = new Date();
    const paymentDate = today.toISOString();

    await addPatientPayment({
      tenant: parseInt(tenantVal),
      paidBy:
        selectedAppointment && selectedAppointment.patient
          ? selectedAppointment.patient.id
          : "",
      amountPaid: inputAmount ? parseFloat(inputAmount) : 0,
      consultationId: Idforpayment ? parseInt(Idforpayment) : "",
      chargedBy:
        selectedAppointment && selectedAppointment.assignedToStaffMember
          ? selectedAppointment.assignedToStaffMember.id
          : "",
      paymentDate: paymentDate,
    });
    getPaymentStatus(Idforpayment ?  Idforpayment : null);
    setInputAmount(null);
    setSelectedService("");
  };
  const handleStartConsultation = async () => {
    try {
      const axiosInstance = createAxiosInstance();
      let obj1 = {
        tenant: tenantVal,
        appointmentId: selectedAppointment.id,
        patientId: selectedAppointment.patient.id,
        staffMemberId: selectedAppointment.assignedToStaffMember.id,
        appointment: {
          id: selectedAppointment.id,
          tenant: tenantVal,
        },
        patient: {
          id: selectedAppointment.patient.id,
          tenant: tenantVal,
        },
        consultationStaff: {
          id: selectedAppointment.assignedToStaffMember.id,
          tenant: tenantVal,
        },
      };
      setConsultationStarted(false);
      setPaymentDone(false);
      let response1 = await axiosInstance.post(
        `${tenantVal}${START_CONSULTATION}`,
        obj1,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    } catch (error) {
      errorHandling(error);
    }
  };
  const fetchHours = async () => {
    try {
      const axiosInstance = createAxiosInstance();
      const response = await axiosInstance.get(
        `${tenantVal}${PRACTICE_HOURS_CONTROLER_URL}`
      );
      const data = response.data.sort((a, b) => a.id - b.id);
      setAllDayStartTimeAndEndTime(response.data);
    } catch (error) {
      errorHandling(error);
    }
  };
  const addPatientPayment = async (paymentData) => {
    try {
      const axiosInstance = createAxiosInstance();
      const response = await axiosInstance.post(
        `${tenantVal}${ADD_PATIENT_PAYMENT}`,
        paymentData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Payment made successfully");
    } catch (error) {
      errorHandling(error);
    }
  };
  const updateSlots = async () => {
    if (allDayStartTimeAndEndTime) {
      let ans = allDayStartTimeAndEndTime.filter(
        (f) =>
          f.day &&
          f.day.toLowerCase() ==
            moment(selectedDate).format("dddd").toLowerCase()
      )[0];

      if (ans && ans.startTime && ans.endTime) {
        let oTime = moment("Sat Mar 02 2024 " + ans.startTime).format(
          "HH:mm A"
        );
        let cTime = moment("Sat Mar 02 2024 " + ans.endTime).format("HH:mm A");
        setX({
          slotInterval: 15,
          openTime: oTime,
          closeTime: cTime,
        });
        const startTime = moment(oTime, "h:mm A");
        const endTime = moment(cTime, "h:mm A");
        let allTimesAli = [];
        while (startTime <= endTime) {
          allTimesAli.push(startTime.format("HH:mm"));
          startTime.add(x.slotInterval, "minutes");
        }
        setAllTimes(allTimesAli);
      }
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
        setStaffMemberId(
          response && response.data && response.data.staffMember
            ? response.data.staffMember.id
            : ""
        );
      }
    } catch (error) {
      errorHandling(error)
    }
  };

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
  const getConsultation = async (appointmentId) => {
    try {
      if (!appointmentId) return;
      const axiosInstance = createAxiosInstance();
      const response = await axiosInstance.get(
        `${tenantVal}${GET_CONSULTATION_ID}${appointmentId}`,
        {
          headers: {
            Accept: "*",
            "Content-Type": "application/json",
          },
        }
      );
      if (response.data && response.data.length != 0) {
        setConsultationStarted(false);
        setIdforPayment(response.data[0].id);
        await getPaymentStatus(response.data[0].id);
      } else {
        setConsultationStarted(true);
        setInputAmount(null)
      }
    } catch (error) {
      errorHandling(error);
    }
  };
  const getClinicalNotes = async (appointmentId) => {
    try {
      if (!appointmentId) return;
      const axiosInstance = createAxiosInstance();
      const response = await axiosInstance.get(
        `${tenantVal}${GET_CLINICAL_NOTE}${appointmentId}`,
        {
          headers: {
            Accept: "*",
            "Content-Type": "application/json",
          },
        }
      );
      setSelectedClinicalNote(
        response && response.data && response.data.length > 0
          ? response.data[0]
          : {}
      );
      setClinicalNote(
        response && response.data && response.data.length > 0
          ? response.data[0].note
          : ""
      );
    } catch (error) {
      errorHandling(error);
    }
  };

  const saveUpdateClinicalNote = async () => {
    formParamForAddNote.submitted = true;
    if (validateFormForAddNote()) {
      formParamForAddNote.submitted = true;
    } else return;
    var ob = {
      id:
        selectedClinicalNote && selectedClinicalNote.id
          ? selectedClinicalNote.id
          : "",
      tenant: tenantVal,
      appointmentId: selectedAppointment.id,
      patientId:
        selectedAppointment &&
        selectedAppointment.patient &&
        selectedAppointment.patient.id
          ? selectedAppointment.patient.id
          : "",
      consultationId: Idforpayment ? Idforpayment : "",

      note: clinicalNote,
    };
    try {
      const axiosInstance = createAxiosInstance();
      const response = await axiosInstance.post(
        `${tenantVal}${SAVE_CLINICAL_NOTE}`,
        ob
      );
      await getClinicalNotes(
        selectedAppointment ? selectedAppointment.id : null
      );
      await getConsultation(
        selectedAppointment ? selectedAppointment.id : null
      );
      toast.success(
        "Clinical notes " +
          (selectedClinicalNote && selectedClinicalNote.id
            ? "updated"
            : "saved") +
          " successfully"
      );
      setNote("");
    } catch (error) {
      errorHandling(error);
    }
  };

  /***
   * Tasks start
   */
  let tenantVal = useSelector((state) => state.auth.user?.tenant);
  if (!tenantVal) tenantVal = localStorage.getItem("kinesin-tenant");

  const fetchTaskNew = async () => {
    try {
      let ar = [];
      const axiosInstance = createAxiosInstance();
      const response = await axiosInstance.get(
        `${tenantVal}${TASK_CONTROLER_URL_OPEN_USER}`
      );
      if (response && response.data) {
        setDataFetching(false);

        var i = 0;
        response.data.forEach((element) => {
          i++;
          ar.push({
            id: element.id,
            key: element.id,
            name: element.name,
            no: (
              <li
                key={i}
                data-bs-toggle="modal"
                data-bs-target="#displayTask_modal"
                onClick={() => handleDisplayTask(element.id)}
              >
                <p>
                  <span className="number-wrap hello">{i}</span>{" "}
                  <span className="text-ellipsis"> {element.title}</span>
                </p>
                <div className="delbtnlist">
                  <button
                    className={element.status == "Complete" ? "green-tick" : ""}
                  >
                    <img src={tick} alt="" />
                  </button>
                  <button
                    data-bs-toggle="modal"
                    data-bs-target="#myModal"
                    onClick={() => handleDeleteTask(element.id)}
                  >
                    <img src={Delete} alt="" />
                  </button>
                </div>
              </li>
            ),
          });
        });
        setDynamicDataSource(ar);
        setIsPageLoaded(true);
      }
      const data = response.data.sort((a, b) => a.id - b.id);
      setTask(data);
    } catch (error) {
      errorHandling(error);
    }
  };
  const fetchTask = async () => {
    try {
      const axiosInstance = createAxiosInstance();
      const response = await axiosInstance.get(
        `${tenantVal}${TASK_CONTROLER_URL}`
      );
      const data = response.data.sort((a, b) => a.id - b.id);
      setTask(data);
    } catch (error) {
      errorHandling(error);
    }
  };
  const getPatientById = async (id, reasonForVisit) => {
    if (!id) return;

    try {
      const axiosInstance = createAxiosInstance();
      const response = await axiosInstance.get(
        `${tenantVal}${PATIENT_CONTROLER_URL_ID}${id}`
      );
      if (response && response.data) {
        response.data.reasonForVisit = reasonForVisit;
        setSelectedPatient(response.data);
      }
    } catch (error) {
      errorHandling(error);
    }
  };

  const getbystaffmemberid = async (date) => {
    if (!date || !x.openTime) return;

    var startTimeApt = moment(date).format("yyyy-MM-DD");
    var endTimeApt = moment(date).format("yyyy-MM-DD");
    try {
      const axiosInstance = createAxiosInstance();
      const response = await axiosInstance.get(
        `${tenantVal}${GET_APPOINTMENTS_HOME_PAGE}` +
          "?startDate=" +
          startTimeApt +
          "&endDate=" +
          endTimeApt
      );

      let dddd = new Date(date);
      dddd.setHours(moment("Sat Mar 02 2024 " + x.openTime).format("HH"));
      dddd.setMinutes(moment("Sat Mar 02 2024 " + x.openTime).format("mm"));
      dddd.setSeconds(0);
      let finalResponse = [];

      if (response.data) {
        response.data.forEach((d) => {
          if (
            d.startTime &&
            moment(moment(d.startTime).format("yyyy-MM-DD")).isSame(
              moment(moment(dddd).format("yyyy-MM-DD"))
            )
          ) {
            if (moment(d.startTime).isSameOrAfter(moment(dddd)))
              finalResponse.push(d);
          }
        });
      }

      setConsultationLength(finalResponse ? finalResponse.length : 0);

      const sTime = moment(x.openTime, "h:mm A");
      const eTime = moment(x.closeTime, "h:mm A");
      let patientArray = [];

      let num = 0;
      let indexAndPatient = {};
      let index = -1;
      while (sTime <= eTime) {
        index++;

        let p;
        if (finalResponse && finalResponse.length > 0) {
          p = finalResponse.filter(
            (pt) =>
              moment(pt.startTime).format("HH:mm") == sTime.format("HH:mm")
          );
          if (p && p[0]) {
            patientArray.push(p[0]);
            if (p[0].durationInMins == 15) num = 0;
            else if (p[0].durationInMins == 30) num = 1;
            else if (p[0].durationInMins == 45) num = 2;
            else if (p[0].durationInMins == 60) num = 3;

            p[0].isDisplay = true;
            indexAndPatient[sTime.format("HH:mm")] = p[0];
          } else {
            if (num == 0)
              indexAndPatient[sTime.format("HH:mm")] = { isDisplay: true };
            else {
              indexAndPatient[sTime.format("HH:mm")] = { isDisplay: false };
              num--;
            }
          }
        } else {
          indexAndPatient[sTime.format("HH:mm")] = { isDisplay: true };
        }
        sTime.add(x.slotInterval, "minutes");
        setStartTimeForAppointment();
      }
      setPatients(patientArray);
      setIndexAndPatient(indexAndPatient);

      let countFreeTime = 0;
      if (indexAndPatient) {
        for (const [key, value] of Object.entries(indexAndPatient)) {
          if (value && value.isDisplay && !value.durationInMins)
            countFreeTime++;
        }
      }
      setFreeTime(countFreeTime);
      if (patientArray && patientArray.length > 0) {
        let list;
        for (let i = 0; i < patientArray.length; i++) {
          if (
            patientArray[i] &&
            patientArray[i].startTime &&
            new moment(new Date()).isBefore(moment(patientArray[i].startTime))
          ) {
            list = patientArray[i];
            break;
          }
        }

        if (list && list.patient && list.patient.id) {
          getPatientById(
            list && list.patient ? list.patient.id : "",
            list && list.reasonForVisit ? list.reasonForVisit : ""
          );
          setSelectedAppointment(list);
          getClinicalNotes(list && list.id ? list.id : "");
          await getConsultation(list && list.id ? list.id : "");
        } else {
          setSelectedPatient(null);
        }
      }
    } catch (error) {
      errorHandling(error);
    }
  };
  const getPaymentStatus = async (consultationId) => {
    try {
      if(!consultationId) return;
      const axiosInstance = createAxiosInstance();
      const response = await axiosInstance.get(
        `${tenantVal}${CHECK_PATIENT_PAYMENT}`.replace(
          "{consultationId}",
          consultationId
        )
      );

      if (response && response.data && response.data.length > 0) {
        setPaymentDone(true);
        setInputAmount(response.data[0].amountPaid);
      }else{
        setInputAmount(null)
        setPaymentDone(false)
      }
    } catch (error) {
      errorHandling(error);
    }
  };
  useEffect(() => {
    if (staffMemberId) {
      fetchTaskNew();
    }
  }, [staffMemberId]);
  useEffect(() => {
    fetchHours();
    fetchProfileInfo();
    fetchPracticeServices();
  }, [tenantVal]);

  useEffect(() => {
    fetchHours();
    updateSlots();
    const swiperInstance = swiperRef.current?.swiper;

    if (swiperInstance) {
      swiperInstance.slideTo(calenderDate - 1);
    }
  }, [calenderDate, calenderMonth, calenderYear]);
  useEffect(() => {
    const formattedDate = new Date(
      calenderYear,
      calenderMonth - 1,
      calenderDate,
      18,
      30,
      0
    ).toISOString();
    // Updating the selectedDate state
    setSelectedDate(formattedDate);
  }, [calenderDate, calenderYear, calenderMonth]);
  useEffect(() => {
    if (state && state.showToast) {
      // Display toast message
      toast.success("Profile updated successfully.");
    }
  }, [state]);
  useEffect(() => {
    if (selectedDate) {
      getbystaffmemberid(selectedDate);
    }
  }, [x]);

  useEffect(() => {
    updateSlots();
  }, [allDayStartTimeAndEndTime]);

  const openPatientSummaryPage = async (patientId, patientFullName) => {
    if (!patientId) return;

    dispatch(addPatientId(patientId));
    localStorage.setItem("kinesin-patientId", patientId);
    dispatch(addPatientFullName(patientFullName));
    navigate("/patient-detail");
  };

  const [currentPage, setCurrentPage] = useState(1); // For pagination state//
  const [task, setTask] = useState([]); //State for taking static data
  const [dataFetching, setDataFetching] = useState(true);
  const itemsPerPage = 25; // Number of items to display per page
  const totalPages = Math.ceil(task.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = task.slice(indexOfFirstItem, indexOfLastItem);

  const [selectedTaskId, setSelectedTaskId] = useState(null); //State for selected task id
  const [selectedTask, setSelectedTask] = useState({});
  const [modalHeaderTitle, setModalHeaderTitle] = useState(""); // State for modal header title
  const [showModal, setShowModal] = useState(false); // State for modal visibility

  const handleAddTask = () => {
    setSelectedTask(null);
    setSelectedTaskId(null);
    setModalHeaderTitle("Add Task");
    setShowModal(true);
  };

  const handleSaveTask = (newTask) => {
    let updatedStatus = newTask.status; // Declare a variable to hold the updated status

    if (selectedTaskId) {
      // Edit existing task
      const updatedTasks = task.map((item) =>
        item.id === selectedTaskId
          ? { ...newTask, status: updatedStatus }
          : item
      );
      setTask(updatedTasks);
    } else {
      // Add new task
      const updatedTasks = [...task, newTask];
      setTask(updatedTasks);
    }
    setShowModal(false);
  };
  const handleCloseTask = async (id) => {
    try {
      if (!id) return;
      const axiosInstance = createAxiosInstance();
      const response = await axiosInstance.post(
        `${tenantVal}${TASK_CONTROLER_CLOSE}`.replace("{taskId}", id)
      );
      if (response.status == 200) {
        setStaffMemberId("");
        setShowModal(false);
        toast.success("Task completed successfully.");
      }
      fetchTaskNew();
    } catch (error) {
    errorHandling(error)
    }
  };
  const createNewTask = async (userData) => {
    try {
      const axiosInstance = createAxiosInstance();
      let response;
      if (selectedTaskId) {
        // If selectedTaskId is not null, it means we are editing an existing task
        const editedData = { ...userData, id: selectedTaskId };
        response = await axiosInstance.post(
          `${tenantVal}${TASK_CONTROLER_URL}`,
          editedData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        toast.success("Task updated successfully");
      } else {
        response = await axiosInstance.post(
          `${tenantVal}${TASK_CONTROLER_URL}`,
          userData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        toast.success("New Task created successfully");
      }
      fetchTaskNew();
    } catch (error) {
      errorHandling(error);
    }
  };

  const handleDeleteTask = (id) => {
    setSelectedTaskId(id);
    setShowModal(false);
  };

  const handleDisplayTask = async (id) => {
    const selectedTask = task.find((item) => item.id === id);
    if (selectedTask) {
      setSelectedTask(selectedTask);
    }
  };

  const deleteTask = async () => {
    if (selectedTaskId) {
      try {
        const axiosInstance = createAxiosInstance();
        const url = `${tenantVal}${DELETE_TASK}`;
        await axiosInstance.delete(url, {
          data: {
            id: selectedTaskId,
            tenant: tenantVal,
          },
        });
        // Filter the task array to remove the selected task
        const updatedTasks = task.filter((item) => item.id !== selectedTaskId);
        setTask(updatedTasks);
        setShowModal(false);
        toast.success("Task deleted successfully.");
      } catch (error) {
        errorHandling(error);
      }
    }
  };

  const errorHandling = (error) => {
    if (error && error.response) {
      if (error.response.data && error.response.data.message)
        toast.error(error.response.data.message);

      if (error.response.status && error.response.status == 403) {
        logoutFromHelper();
        dispatch(logout());
        dispatch(removeuser());
        navigate("/logout");
      }
    }
  };

  const openAddAppointmentModal = () => {
    const currentDate = moment().startOf("day");
    var iscurrentDate = moment(selectedDate).isBefore(new Date(), "day");
    if (iscurrentDate) return;

    setTimeout(() => {
      $("#idButtonAddAppointmentPopup").trigger("click");
    }, 100);
  };
  const displayAge = (dob) => {
    if (!dob) return "";

    let aa = dob.split("-");
    if (aa && aa.length == 3) {
      return aa[2] + "/" + aa[1] + "/" + aa[0];
    } else {
      return dob;
    }
  };

  // Component to count the words from notes and show remaining words or text into tooltip 
  const ParagraphWithHover = ({ text }) => {
    const [showFullText, setShowFullText] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);

    const words = text.split(" ");

    const wordLimit = 15;
    const firstTwoLinesWords = words.slice(0, wordLimit);
    const remainingWords = words.slice(wordLimit);

    // Function to handle hover and show tooltip
    const handleMouseOver = () => {
      setShowTooltip(true);
    };

    // Function to handle mouse leave and hide tooltip
    const handleMouseLeave = () => {
      setShowTooltip(false);
    };
    return (
      <h6 onMouseEnter={handleMouseOver} onMouseLeave={handleMouseLeave}>
        {showFullText ? (
          text
        ) : (
          <>
            {firstTwoLinesWords.join(" ")}
            {remainingWords.length > 0 && "..."}
            {showTooltip && <h6 className="hover-text">{text}</h6>}
          </>
        )}
      </h6>
    );
  };

  return (
    <>
      {/* <Nav /> */}

      <div className="dashBcontbody alliedhome">
        <Toaster position="top-center" reverseOrder={false} />

        <div className="patientSummary">
          {/* Date section Start */}
          <div className="payments_box">
            <div className="summary_whitebox">
              <div className="summary_heading">
                <h3 className="title-wrap">Appointments</h3>
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
              </div>
              <div className="allied-appointments-wrap">
                <div className="payments_boxbody">
                  <HorizontalCalendarNew1
                    selectedDate={calenderDate}
                    selectedMonth={calenderMonth}
                    selectedYear={calenderYear}
                    setSelectedDate={setcalenderDate}
                    setSelectedMonth={setcalenderMonth}
                    setSelectedYear={setcalenderYear}
                  />
                </div>
                <div className="timetablebox">
                  <div className="timetablebordarbox">
                    <div className="summary_heading timetablhead">
                      <h6>
                        {consultationLength}{" "}
                        {consultationLength && consultationLength > 0
                          ? "Consultations"
                          : "Consultation"}{" "}
                      </h6>
                      <h6>
                        {freeTime}{" "}
                        {freeTime && freeTime > 0 ? "Free Times" : "Free Time"}
                      </h6>
                    </div>
                    <div className="timelistbox">
                      <div className="timecount">
                        {allTimes.map((time, index) => (
                          <div className="timenumbar" key={index}>
                            {time}
                          </div>
                        ))}
                      </div>
                      <ul>
                        {allTimes.map((list, index) => (
                          <>
                            {
                              indexAndPatient &&
                              indexAndPatient[list] &&
                              indexAndPatient[list].isDisplay ? (
                                <li
                                  key={index}
                                  style={{
                                    backgroundColor:
                                      selectedAppointment &&
                                      list &&
                                      indexAndPatient &&
                                      indexAndPatient[list] &&
                                      selectedAppointment.id ==
                                        indexAndPatient[list].id
                                        ? "#05c882"
                                        : "",
                                  }}
                                  className={
                                    list &&
                                    indexAndPatient &&
                                    indexAndPatient[list] &&
                                    indexAndPatient[list].durationInMins
                                      ? indexAndPatient &&
                                        indexAndPatient[list] &&
                                        indexAndPatient[list].durationInMins ==
                                          15
                                        ? "homepage-duration-15"
                                        : indexAndPatient[list]
                                            .durationInMins == 30
                                        ? "homepage-duration-30"
                                        : indexAndPatient[list]
                                            .durationInMins == 45
                                        ? "homepage-duration-45"
                                        : "homepage-duration-60"
                                      : "homepage-duration-15"
                                  }
                                  onClick={() => {
                                    if (
                                      indexAndPatient &&
                                      indexAndPatient[list] &&
                                      indexAndPatient[list].patient &&
                                      indexAndPatient[list].patient.id
                                    ) {
                                      getPatientById(
                                        indexAndPatient &&
                                          indexAndPatient[list] &&
                                          indexAndPatient[list].patient
                                          ? indexAndPatient[list].patient.id
                                          : "",
                                        indexAndPatient &&
                                          indexAndPatient[list] &&
                                          indexAndPatient[list].reasonForVisit
                                          ? indexAndPatient[list].reasonForVisit
                                          : ""
                                      );
                                      setSelectedAppointment(
                                        indexAndPatient && indexAndPatient[list]
                                      );
                                      getClinicalNotes(
                                        indexAndPatient &&
                                          indexAndPatient[list] &&
                                          indexAndPatient[list].id
                                          ? indexAndPatient[list].id
                                          : ""
                                      );
                                      getConsultation(
                                        indexAndPatient &&
                                          indexAndPatient[list] &&
                                          indexAndPatient[list].id
                                          ? indexAndPatient[list].id
                                          : ""
                                      );
                                    } else {
                                      setStartDateForAppointment(
                                        moment(new Date(selectedDate)).format(
                                          "YYYY-MM-DD"
                                        )
                                      );
                                      setStartTimeForAppointment(
                                        allTimes[index]
                                      );
                                      setSelectedDateForAppointment(
                                        new Date(selectedDate)
                                      );

                                      if (
                                        moment(
                                          calenderYear +
                                            "-" +
                                            calenderMonth +
                                            "-" +
                                            calenderDate +
                                            " " +
                                            allTimes[index]
                                        ).isBefore(moment(new Date()))
                                      ) {
                                        toast.error(
                                          "Oops! you can not create an appointment for time slot that is already passed."
                                        );
                                      } else {
                                        openAddAppointmentModal();
                                      }
                                    }
                                  }}
                                  onDoubleClick={() => {
                                    if (
                                      list &&
                                      indexAndPatient &&
                                      indexAndPatient[list] &&
                                      indexAndPatient[list].patient &&
                                      indexAndPatient[list].patient.id
                                    )
                                      openPatientSummaryPage(
                                        list &&
                                          indexAndPatient &&
                                          indexAndPatient[list] &&
                                          indexAndPatient[list].patient &&
                                          indexAndPatient[list].patient.id
                                          ? indexAndPatient[list].patient.id
                                          : "",
                                        list &&
                                          indexAndPatient &&
                                          indexAndPatient[list] &&
                                          indexAndPatient[list].patient &&
                                          indexAndPatient[list].patient
                                            .firstName
                                          ? indexAndPatient[list].patient
                                              .firstName +
                                              " " +
                                              indexAndPatient[list].patient
                                                .surname
                                          : ""
                                      );
                                  }}
                                >
                                  <h4
                                    className={
                                      selectedAppointment &&
                                      list &&
                                      indexAndPatient &&
                                      indexAndPatient[list] &&
                                      selectedAppointment.id ==
                                        indexAndPatient[list].id
                                        ? "selected-timeline1"
                                        : ""
                                    }
                                  >
                                    {indexAndPatient &&
                                    indexAndPatient[list] &&
                                    indexAndPatient[list].patient &&
                                    indexAndPatient[list].patient.firstName
                                      ? indexAndPatient[list].patient
                                          .firstName +
                                        " " +
                                        indexAndPatient[list].patient.surname
                                      : ""}
                                  </h4>
                                  <div
                                    className={`vaccinesbox ${
                                      list && list.status
                                        ? list.status !== "completed"
                                          ? "vaccinnotdone"
                                          : ""
                                        : ""
                                    }`}
                                  >
                                    <div>
                                      <img src={vaccinesimg} alt="" />
                                    </div>
                                    <h6>
                                      {list && list.purpose ? list.purpose : ""}
                                    </h6>
                                  </div>
                                </li>
                              ) : (
                                ""
                              )
                            }
                          </>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="informationSummary patient-detail-summary">
            <div className="summary_whitebox">
              <div className="summary_heading">
                <div className="sum_headicon">
                  <img src={information} alt="" />
                </div>
                <h2>Patient Information Summary</h2>
              </div>
              {selectedPatient ? (
                <div
                  className="summary_bxoddy"
                >
                  <div className="summary_colorbg">
                    <div className="sumarysmsbtnbox">
                      <button
                        data-bs-toggle="modal"
                        data-bs-target="#sendSma_modal"
                        onClick={(e) => e.stopPropagation()}
                      >
                        Send SMS
                      </button>
                    </div>
                    <div
                      className="summaryImg"
                    >
                      <span
                        className="user-profile-image"
                        onClick={(e) => {
                          e.preventDefault();
                          openPatientSummaryPage(
                            selectedPatient.id,
                            selectedPatient.firstName
                              ? selectedPatient.firstName +
                                  " " +
                                  selectedPatient.surname
                              : ""
                          );
                        }}
                        style={{ cursor: "pointer" }}
                      >
                        {selectedPatient &&
                        selectedPatient.firstName.trim() &&
                        selectedPatient.surname.trim()
                          ? selectedPatient.firstName.trim()[0] +
                            selectedPatient.surname.trim()[0]
                          : (selectedPatient && selectedPatient.firstName.trim()
                              ? selectedPatient.firstName.trim()[0]
                              : "") +
                            (selectedPatient && selectedPatient.surname.trim()
                              ? selectedPatient.surname.trim()[0]
                              : "")}
                      </span>
                      <a
                        href=""
                        onClick={(e) => {
                          e.preventDefault();
                          openPatientSummaryPage(
                            selectedPatient.id,
                            selectedPatient.firstName
                              ? selectedPatient.firstName +
                                  " " +
                                  selectedPatient.surname
                              : ""
                          );
                        }}
                      >
                        {selectedPatient && selectedPatient.firstName
                          ? selectedPatient.firstName +
                            " " +
                            selectedPatient.surname
                          : ""}
                      </a>
                      <p>
                        {selectedPatient.dateOfBirth
                          ? displayAge(selectedPatient.dateOfBirth)
                          : ""}
                      </p>
                    </div>
                    <div className="summaryInfo patients-info-wrap">
                      <ul>
                        <li>
                          <p>Phone no:</p>
                          <h6>
                            {selectedPatient && selectedPatient.homePhone
                              ? selectedPatient.homePhone
                              : "-"}
                          </h6>
                        </li>
                        <li>
                          <p>Address:</p>
                          <h6>
                            {selectedPatient && selectedPatient.address
                              ? selectedPatient.address.addressLine1 ||
                                selectedPatient.address.addressLine2 ||
                                selectedPatient.address.addressLine3
                                ? (selectedPatient.address.addressLine1
                                    ? selectedPatient.address.addressLine1 + " "
                                    : "") +
                                  (selectedPatient.address.addressLine2
                                    ? selectedPatient.address.addressLine2 + " "
                                    : "") +
                                  (selectedPatient.address.addressLine3
                                    ? selectedPatient.address.addressLine3 + " "
                                    : "")
                                : "-"
                              : "-"}
                          </h6>
                        </li>
                        <li>
                          {/* <p>Public:</p> */}
                          <p>Medical card no.:</p>
                          <h6>
                            {/* Medical card no.{" "} */}
                            {selectedPatient.medicalCardNumber
                              ? selectedPatient.medicalCardNumber
                              : "-"}
                          </h6>
                        </li>
                        <li>
                          <p>Upcoming appointments:</p>
                          <h6>
                            {selectedPatient.nextApppointment
                              ? selectedPatient.nextApppointment
                              : "-"}
                          </h6>
                        </li>
                        <li>
                          <p>Note:</p>
                          <h6 className="note-count-wrap position-relative">
                            {selectedAppointment && selectedAppointment.reasonDescription ?

                            <ParagraphWithHover text={selectedAppointment.reasonDescription}/>
                              : "-"} 
                          </h6>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="clinicalNotesect">
                    <div className="title-wrap d-flex align-items-center justify-content-between">
                      <h3>Clinical Note: </h3>
                      {consultationStarted && (
                        <button
                          className="custom_btn"
                          onClick={handleStartConsultation}
                        >
                          Start Consultation
                        </button>
                      )}
                    </div>
                    <textarea
                      // className="form-control textariastyl"
                      className={`form-control textariastyl ${
                        !consultationStarted ? "enabled" : ""
                      }`}
                      rows="5"
                      id="comment"
                      name="text"
                      placeholder={
                        clinicalNote == "" && !consultationStarted
                          ? "Consultation started....."
                          : ""
                      }
                      value={clinicalNote}
                      onChange={(event) => setClinicalNote(event.target.value)}
                      disabled={consultationStarted}
                    ></textarea>
                    {formParamForAddNote.submitted && (
                      <div className="errorMsg text-start">
                        {formParamForAddNote.errors.note}
                      </div>
                    )}
                    <button
                      className="custom_btn"
                      type="submit"
                      onClick={saveUpdateClinicalNote}
                      disabled={consultationStarted}
                    >
                      {selectedClinicalNote && selectedClinicalNote.id
                        ? "Save Note"
                        : "Save Note"}
                    </button>
                  </div>
                  <div className="payments-tabs-wrap">
                    <div className="summary_heading">
                      <div className="sum_headicon">
                        <img
                          src="/static/media/information.178972968b0253c284178fe0b46bda95.svg"
                          alt=""
                        />
                      </div>
                      <h3>Payments</h3>
                    </div>
                    <div className="summaramount">
                      <div className="custom-input-wrap d-flex align-items-center">
                        <Input
                          placeholder="€20"
                          disabled={paymentDone}
                          value={inputAmount}
                          onChange={(e) => {
                            e.preventDefault();
                            const newValue = e.target.value;
                            const regex = /^[0-9]*\.?[0-9]*$/; // Regex to allow digits and periods
                            if (newValue === "" || regex.test(newValue)) {
                              setInputAmount(newValue);
                            }
                          }}
                        />
                        <Button
                          className="custom_btn pay_btn"
                          onClick={handlePayButtonClick}
                          disabled={paymentDone}
                        >
                          Pay
                        </Button>
                      </div>
                      {valueError && (
                        <p style={{ color: "red", fontSize: "12px" }}>
                          {valueError}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          {/* Patient information end */}

          <div className="informationSummary documents_box">
            {/* General Task start */}
            <div className="summary_whitebox">
              <div className="summary_heading">
                <div className="sum_headicon">
                  <img src={information} alt="" />
                </div>
                <h2>General Tasks</h2>
                <div
                  className="taskbtn "
                  data-bs-toggle="modal"
                  data-bs-target="#addTask_modal"
                  onClick={handleAddTask}
                  style={{ cursor: "pointer" }}
                >
                  <span>Add new</span>
                  <button>
                    +
                  </button>
                </div>
              </div>
              <div className="summary_boddy">
                <div className="summary_colorbg">
                  <ul>
                    {dataFetching ? null : currentItems.length === 0 ? (
                      <p className="no-record-text">No Records Found</p>
                    ) : (
                      currentItems.map((item, i) => {
                        return (
                          <li
                            key={i}
                            data-bs-toggle="modal"
                            data-bs-target="#displayTask_modal"
                            onClick={() => handleDisplayTask(item.id)}
                          >
                            <p>
                              <span className="number-wrap">{i + 1}</span>{" "}
                              <span className="text-ellipsis">
                                {" "}
                                {item.title}
                              </span>
                            </p>
                            <div className="delbtnlist">
                              <button
                                className={
                                  item.status == "Complete" ? "green-tick" : ""
                                }
                              >
                                <img src={tick} alt="" />
                              </button>
                              <button
                                data-bs-toggle="modal"
                                data-bs-target="#myModal"
                                onClick={() => handleDeleteTask(item.id)}
                              >
                                <img src={Delete} alt="" />
                              </button>
                            </div>
                          </li>
                        );
                      })
                    )}
                  </ul>
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    setCurrentPage={setCurrentPage}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <DeleteModal deleteService={deleteTask} context="task" />
      {selectedPatient && (
        <SmsModal
          tenantVal={tenantVal}
          patientId={selectedPatient.id}
          patientName={selectedPatient.firstName}
        />
      )}
      <TaskModal
        headerTitle={modalHeaderTitle}
        handleSaveTask={handleSaveTask}
        showModal={showModal}
        setShowModal={setShowModal}
        editTaskId={selectedTaskId}
        task={task}
        createNewTask={createNewTask}
        selectedTaskForEdit={selectedTask}
      />

      <DisplayTaskModal
        headerTitle={"Task Info"}
        showModal={showModal}
        handleCloseTask={handleCloseTask}
        setShowModal={setShowModal}
        staffMemberId={staffMemberId}
        setStaffMemberId={setStaffMemberId}
        setSelectedTaskId={setSelectedTaskId}
        setModalHeaderTitle={setModalHeaderTitle}
        task={selectedTask}
      />

      <AddAppointmentModal
        headerTitle={"Add Appointment"}
        selectedDate={selectedDateForAppointment}
        staffId={staffMemberId}
        setStaffId={setStaffMemberId}
        practiceServices={practiceServices}
        startDate={startDateForAppointment}
        startTime={startTimeForAppointment}
        selectedView="day"
        homePageRefreshAppointment={getbystaffmemberid}
      />
    </>
  );
};

export default AlliedHome;
