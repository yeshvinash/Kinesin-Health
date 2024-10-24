import React, { useEffect, useRef, useState } from "react";
import {
  Accordion,
  Button,
  ButtonGroup,
  Form,
  Image,
  ListGroup,
} from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { Checkbox, DatePicker, Input, Tabs, Modal, Select, Empty, Table } from "antd";
import visit from "../../../assets/images/visit.svg";
import Male from "../../../assets/images/male.svg";
import Female from "../../../assets/images/female.svg";
import Other from "../../../assets/images/other.svg";
import Diabeties from "../../../assets/images/diabeties.svg";
import PatientImg from "../../../assets/images/patient.jpg";
import PlusIcon from "../../../assets/images/PlusIcon.svg";
import Cancel from "../../../assets/images/cancel.svg";
import Checkmark from "../../../assets/images/checkmark1.svg";
import EditIcon from "../../../assets/images/editicon1.svg";
import DeleteIcon from "../../../assets/images/deleteicon.svg";
import Avatar3 from "../../../assets/images/avatar3.png";
import Flag from "../../../assets/images/flag.svg";
import hamburger from "../../../assets/images/hamburger.png";
import Nav from "../../../components/AfterLoginNav/Nav.jsx";
import { SVGIcons } from "../../../components/Data/SVGIcons.js";
import "./PatientDetail.css";
import { logoutFromHelper } from "../../../api/Helper.js";
import { logout } from "../../../redux/auth/AuthSlice.js";
import { removeuser } from "../../../redux/user/userSlice.js";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { createAxiosInstance } from "../../../api/axiosConfig.js";
import PreviewModal from '../../../components/Modal/previewDocumentModal';
// import { Empty, Table } from "antd";
import {
  GET_VISIT_HISTORY,
  PATIENT_CONTROLER_URL_ID,
  PATIENT_DOCUMENTS_GET_BY_PATIENT_ID,
  TASK_CONTROLER_URL,
  GET_PATIENT_TASKS,
  DELETE_TASK,
  GET_PATIENT_NOTES,
  NOTE_CONTROLER_URL,
  SAVE_CLINICAL_NOTE,
  WHO_AM_I,
  CONSULTATION_NOTE_DELETE_URL,
  ADD_PATIENT_PAYMENT,
  GET_PATIENT_PAYMENT,
  PRACTICE_SERVICE_CONTROLER_URL,
  START_CONSULTATION,
  DELETE_DOCUMENT,
  GET_PATIENT_PAYMENT_ID,
  TASK_CONTROLER_CLOSE,
  DOWNLOAD_DOCUMENT
} from "../../../api/Service.js";
import SmsModal from "../../../components/Modal/SmsModal.jsx";
import TaskModal from "../../../components/Modal/TaskModal.jsx";
import no_profile_picture from "../../../assets/images/no_profile_picture.svg";
import DocumentModal from "../../../components/Modal/DocumentModal.jsx";
import moment from "moment";
import DisplayTaskModal from "../../../components/Modal/DisplayTaskModal.jsx";
import tick from "../../../assets/images/tick.svg";
import Delete from "../../../assets/images/delete.svg";
import DeleteModal from "../../../components/Modal/DeleteModal.jsx";
import NoteModal from "../../../components/Modal/NoteModal.jsx";
import $ from "jquery";
import TextArea from "antd/es/input/TextArea.js";
import PaymentModal from "../../../components/Modal/PaymentModal.jsx";
import JsonFile from "../../../assets/files/products-from-36624-to-566361.gz";
import { inflate } from "pako";
import { PaymentModalComponent } from "../../../components/Modal/PaymentModalComponent/PaymentModalComponent.js";
import editicon from "../../../assets/images/editicon.svg";
import removicon from "../../../assets/images/removicon.svg";
import {
  addPatientId,
  addPreviousPageForEditPatient,
  addPatientFullName,
} from "../../../redux/patient/PatientSlice.js";
// /api/practice/v1/{tenant}/patient
// /api/practice/v1/{tenant}/consultation/getbypatientid/{patientIdValue}
// /api/practice/v1/{tenant}/document/getbypatientid/{patientIdValue}
let minLengthInOneRow = 200;
console.log(JsonFile);
let paymentTypes = [
  {
    value: "Cash",
    label: "Cash",
  },
  {
    value: "Debit Card",
    label: "Debit Card",
  },
  {
    value: "Credit Card",
    label: "Credit Card",
  },
  {
    value: "Online Payment",
    label: "Online Payment",
  },
];
let receipts = [
  {
    value: "Yes",
    label: "Yes",
  },
  {
    value: "No",
    label: "No",
  },
];

let chargeBys = [
  {
    value: "Dr. Darrem McCormack",
    label: "Dr. Darrem McCormack",
  },
  {
    value: "Dr. Noel King",
    label: "Dr. Noel King",
  },
  {
    value: "Dr. John Travers",
    label: "Dr. John Travers",
  },
];

const PatientDetail = (id) => {

  const [isPageLoadedForNotes, setIsPageLoadedForNotes] = useState(false);
  const [dynamicDataSourceForNotes, setDynamicDataSourceForNotes] = useState([]);

  const [filterTableForNotes, setFilterTableForNotes] = useState([]);
  const [tableParamsForNotes, setTableParamsForNotes] = useState({
    pagination: {
      current: 1,
      pageSize: 2,
    },
  });
  const handleTableChangeForNotes = (pagination, filters, sorter) => {
    setTableParamsForNotes({
      pagination,
      filters,
      ...sorter,
    });
  };

  const columnsForNote = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id"
    }
  ];

  ////

  const [isPageLoadedForDocuments, setIsPageLoadedForDocuments] = useState(false);
  const [dynamicDataSourceForDocuments, setDynamicDataSourceForDocuments] = useState([]);

  const [filterTableForDocuments, setFilterTableForDocuments] = useState([]);
  const [tableParamsForDocuments, setTableParamsForDocuments] = useState({
    pagination: {
      current: 1,
      pageSize: 2,
    },
  });
  const handleTableChangeForDocuments = (pagination, filters, sorter) => {
    setTableParamsForDocuments({
      pagination,
      filters,
      ...sorter,
    });
  };

  const columnsForDocuments = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      width: '20px'
    },
  ];

  /////////

  // const [test,setTest] = useState(null)
  const parse = (bin) => inflate(bin, { to: "string" });
  const fetchJSONFromGZFile = async () => {
    try {
      const response = await fetch(JsonFile);
      console.log(response);
      const blob = await response.blob();
      const arrayBuffer = await readSingleFile(blob);
      const jsonString = parse(arrayBuffer);
      const jsonData = JSON.parse(jsonString);
      console.log(jsonData[0]);

      // Measure the time it takes to loop over the JSON data
      const startTime = performance.now();

      // Loop over the JSON data
      for (let i = 0; i < jsonData.length; i++) {
        // Process each element as needed
        // For example:
        // console.log(jsonData[i]);
      }

      // Calculate the elapsed time
      const endTime = performance.now();
      const elapsedTime = endTime - startTime;
      console.log(
        `Time taken to loop over JSON data: ${elapsedTime} milliseconds`
      );

      // Now you can use jsonData for further processing
    } catch (error) {
      console.error("Error fetching or parsing JSON:", error);
    }
  };

  async function readSingleFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = function (e) {
        resolve(e.target.result);
      };
      reader.readAsArrayBuffer(file);
      reader.onabort = reject;
      reader.onerror = reject;
    });
  }

  const location = useLocation();
  const { state } = location;

  const renderAfterCalled = useRef(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [practiceServices, setPracticeServices] = useState([]);
  const [ModalPatient, setModalPatient] = useState({});
  let tenantVal = useSelector((state) => state.auth.user?.tenant);
  if (!tenantVal) tenantVal = localStorage.getItem("kinesin-tenant");
  let patientId = useSelector((state) => state.patient?.patientId);
  if (!patientId) patientId = localStorage.getItem("kinesin-patientId");
  const patientFullName = useSelector((state) => state.patient.patientFullName);

  const [deleteContext, setDeleteContext] = useState("task");
  const [noteId, setNoteId] = useState();
  const [accordionDisable, setAccordionDisable] = useState(false)
  const [noteIdForDelete, setNoteIdForDelete] = useState();
  const [noteForEdit, setNoteForEdit] = useState("")
  const [note, setNote] = useState(""); //State for selected task id
  const [selectedTaskId, setSelectedTaskId] = useState(null); //State for selected task id
  const [selectedDocumentId, setSelectedDocumentId] = useState(null);
  const [selectedTask, setSelectedTask] = useState({});
  const [modalHeaderTitle, setModalHeaderTitle] = useState(""); // State for modal header title
  const [showModal, setShowModal] = useState(false); // State for modal visibility
  const [modalHeaderTitleForNote, setModalHeaderTitleForNote] =
    useState("Add Note");

  const [patient, setPatient] = React.useState({});
  const [visitHistories, setVisitHistories] = React.useState([]);
  const [patientTasks, setPatientTasks] = React.useState([]);
  const [patientNotes, setPatientNotes] = React.useState([]);
  const [documents, setDocuments] = React.useState([]);
  const [staffMemberId, setStaffMemberId] = useState("");
  const [payments, setPayments] = React.useState([]);
  const [dataFetching, setDataFetching] = useState(true);
  const [paidPayments, setPaidPayments] = React.useState([]);
  const [defaultActiveKey, setDefaultActiveKey] = useState("2");
  const [selectedService, setSelectedService] = useState("");
  const [previewDocument, setPreviewDocument] = useState(null);
  const [previewImageData, setPreviewImageData] = useState(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [activeAccordionKey, setActiveAccordionKey] = useState(null);
  const [editData, setEditData] = useState(false);
  const [editDataId, setEditDataId] = useState(null)
  const [value, setValue] = useState(0);

  const [expandStates, setExpandStates] = useState({});

  console.log(patientId);
  console.log(staffMemberId);
  const fetchVisitHistory = async (id) => {
    try {
      if (!id) return;
      const axiosInstance = createAxiosInstance();
      const response = await axiosInstance.get(
        `${tenantVal}${GET_VISIT_HISTORY}${id}`
      );
      if (response && response.data) setVisitHistories(response.data);
    } catch (error) {
      errorHandling(error);
    }
  };

  const fetchPatientTasks = async (id) => {
    try {
      if (!id) return;
      const axiosInstance = createAxiosInstance();
      const response = await axiosInstance.get(
        `${tenantVal}${GET_PATIENT_TASKS}${id}`
      );

      if (response && response.data) setPatientTasks(response.data);
    } catch (error) {
      errorHandling(error);
    }
  };
  const handleCloseTask = async (id) => {
    try {
      if (!id) return;
      const axiosInstance = createAxiosInstance();
      const response = await axiosInstance.post(
        `${tenantVal}${TASK_CONTROLER_CLOSE}`.replace(
          "{taskId}",
          id
        ),
      )
      console.log(response);
      if (response.status == 200) {
        console.log("200", response.status);
        setStaffMemberId("");

        // setSelectedDate(moment(new Date(dayjs(value))).format("DD/MM/YYYY"));
        setShowModal(false)
        console.log(showModal);
        toast.success(
          "Task completed successfully."
        );
      }
      fetchPatientTasks(patientId)
    } catch (error) {
      console.log(error);
    }
  }
  const openPreview = async (id, patientId) => {
    try {
      const imageData = await downloadDocument1(id, patientId);
      setPreviewImageData(imageData);
      setPreviewDocument({ id, patientId });
      setShowPreviewModal(true);
    } catch (error) {
      console.error('Error fetching preview image:', error);
    }
  };
  const closePreview = () => {
    setPreviewDocument(null);
    setPreviewImageData(null);
    setShowPreviewModal(false);
  };
  const downloadDocument = async (id, patientId) => {
    try {
      console.log(id, patientId);
      if (!id || !patientId) {
        return;
      }
      const axiosInstance = createAxiosInstance();
      const response = await axiosInstance.get(
        `${tenantVal}${DOWNLOAD_DOCUMENT.replace("{documentId}", id).replace(
          "{patientId}",
          patientId
        )}`,
        {
          headers: {
            "Content-Type": "application/octet-stream",
          },
          responseType: "blob",
        }
      );
      if (response.data instanceof Blob) {
        // Create download link and trigger download
        const downloadUrl = window.URL.createObjectURL(
          new Blob([response.data])
        );
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.setAttribute("download", `document_${id}.png`); // Assuming it's a PNG image
        document.body.appendChild(link);
        link.click();
        link.remove();
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  const downloadDocument1 = async (id, patientId) => {
    try {
      console.log(id, patientId);
      if (!id || !patientId) {
        return;
      }
      const axiosInstance = createAxiosInstance();
      const response = await axiosInstance.get(
        `${tenantVal}${DOWNLOAD_DOCUMENT.replace('{documentId}', id).replace('{patientId}', patientId)}`,
        {
          headers: {
            "Content-Type": "application/octet-stream",
          },
          responseType: "blob"
        }
      );
      if (response.data instanceof Blob) {
        // Convert Blob to base64 string
        const reader = new FileReader();
        reader.readAsDataURL(response.data);
        return new Promise((resolve, reject) => {
          reader.onloadend = () => {
            resolve(reader.result);
          };
          reader.onerror = reject;
        });
      }
    } catch (error) {
      console.log(error);
      throw new Error('Error fetching preview image');
    }
  };
  const fetchPatientDues = async (id) => {
    try {
      console.log(id);
      console.log(patientId);
      if (!id && !patientId) return;
      const axiosInstance = createAxiosInstance();
      const response = await axiosInstance.get(
        `${tenantVal}${GET_PATIENT_PAYMENT_ID}`.replace(
          "{patientIdValue}",
          patientId ? patientId : id
        )
      );
      console.log(response);
      setPayments(response.data);
      setDataFetching(false); 
    } catch (error) {
      errorHandling(error);
    }
  };
  const fetchPatientNotes = async (id) => {
    try {
      if (!id) return;

      let ar = [];
      const axiosInstance = createAxiosInstance();
      const response = await axiosInstance.get(
        `${tenantVal}${GET_PATIENT_NOTES}${id}`
      );
      if (response && response.data) {
        setPatientNotes(response.data);
        response.data.forEach((list) => {
          ar.push(
            {
              id: list.id,
              key: list.id
            }
          );
        });
        setDynamicDataSourceForNotes(ar);
        setIsPageLoadedForNotes(true);
      };
    } catch (error) {
      errorHandling(error);
    }
  };

  const fetchPatientById = async (id) => {
    try {
      if (!id) return;
      const axiosInstance = createAxiosInstance();
      const response = await axiosInstance.get(
        `${tenantVal}${PATIENT_CONTROLER_URL_ID}${id}`
      );
      if (response && response.data) {
        setPatient(response.data);
        console.log(patient);
        console.log(response.data);
        setModalPatient(response.data);
        setTask({
          patient_name:
            (response.data && response.data.firstName
              ? response.data && response.data.firstName
              : "") +
            " " +
            (response.data && response.data.surname
              ? response.data.surname
              : ""),
          patient_id: id,
          patient_disabled: false,
        });
      }
    } catch (error) {
      errorHandling(error);
    }
  };

  const fetchDocumentById = async (id) => {
    if (!id) return;

    let ar = [];
    const axiosInstance = createAxiosInstance();
    const response = await axiosInstance.get(
      `${tenantVal}${PATIENT_DOCUMENTS_GET_BY_PATIENT_ID}${id}`
    );
    if (response && response.data) {
      setDocuments(response.data);
      response.data.forEach((element) => {
        ar.push(
          {
            id: (
              <Link className="d-flex align-items-center justify-content-between" >
                <div className="d-flex align-items-center   me-3">
                  <div className="me-md-4 me-2">
                    <span className="header-title  text-ellipsis text-break">
                      {" "}
                      {element && element.name ? element.name : "-"}
                    </span>
                    <span className="label-wrap text-ellipsis text-break ">
                      {element && element.created
                        ? moment(element.created).format("DD MMM YYYY")
                        : "-"}
                    </span>
                  </div>
                  <div className="flex-shrink-0 d-flex align-items-md-center align-items-md-start flex-md-row flex-column documents-list-wrap">
                    <span className="text-manatee fw-500 small-label d-inline-block me-2 text-ellipsis text-break">
                      {element && element.created
                        ? moment(element.created).format("HH:MM A")
                        : "-"}
                    </span>
                    <p className="short-desc fw-500 text-manatee mb-0 small text-ellipsis text-break">
                      {element && element.status ? element.status : "-"}
                    </p>

                    {element &&
                      element.created &&
                      moment(element.created).diff(new Date(), "days") ==
                      0 ? (
                      <Button
                        className="custom_btn danger mt-0"
                        data-bs-toggle="modal"
                        data-bs-target="#myModal"
                        onClick={() => handleDeleteDocument(element.id)}
                      >
                        Delete
                      </Button>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
                {SVGIcons.Documents}
              </Link>
            )
          }
        );
      });
      setDynamicDataSourceForDocuments(ar);
      setIsPageLoadedForDocuments(true);
    }

  };
  useEffect(() => {
    if (state && state.showToast) {
      // Display toast message
      toast.success(
        "Patient " + (patientId ? "updated" : "saved") + " successfully"
      );
    }
    if (state && state.samePage) {
      dispatch(addPatientFullName(null));
      console.log("same page", state.samePage);
      console.log(patientId);
      
    }
  }, [state]);
  useEffect(() => {
    // fetchJSONFromGZFile();
    console.log("Done");
    if (!renderAfterCalled.current) {
      fetchPatientById(patientId);
      fetchProfileInfo();
      fetchDocumentById(patientId);
      fetchVisitHistory(patientId);
      fetchPatientTasks(patientId);
      fetchPatientDues(patientId);
      fetchPatientNotes(patientId);
      fetchPracticeServices();
      getPatientPayment();
    }
    renderAfterCalled.current = true;
  }, []);
  useEffect(() => {
    // fetchJSONFromGZFile();
    console.log("Done");
    // if (!renderAfterCalled.current) {
    fetchPatientById(patientId);
    fetchProfileInfo();
    fetchDocumentById(patientId);
    fetchVisitHistory(patientId);
    fetchPatientTasks(patientId);
    fetchPatientDues(patientId);
    fetchPatientNotes(patientId);
    fetchPracticeServices();
    getPatientPayment();
    setFormData({
      amount: "",
      paymentType: paymentTypes ? paymentTypes[0].value : "",
      receipt: receipts ? receipts[0].value : "",
      practiceServiceId: "",
      chargedBy: "",
    });
    // }
    // renderAfterCalled.current = true;
  }, [patientId]);
  const [task, setTask] = useState([]); //State for taking static data
  console.log(selectedTask);
  const handleAddNote = () => {
    modalHeaderTitleForNote("Add Note");
    setShowModal(true);
  };

  const handleAddTask = () => {
    console.log("add task called");
    setSelectedTaskId(null);
    setSelectedTask(null);
    setModalHeaderTitle("Add Task");
    setShowModal(true);

    // setSelectedTask({
    //   //'patient_name': (patient && patient.firstName ? patient && patient.firstName : "") + ' ' + (patient && patient.surname ? patient.surname : ""),
    //   'patient_name': 'vishvas patel',
    //   'patient_id': id
    // });
  };

  const handleDisplayTask = async (id) => {
    const selectedTask1 = patientTasks.find((item) => item.id === id);
    console.log(selectedTask);
    if (selectedTask1) {
      setSelectedTask(selectedTask1);
    }
  };

  const handleDeleteTask = (id) => {
    console.log("handle delete called..");
    setDeleteContext("task");
    setSelectedTaskId(id);
    setShowModal(true);
  };

  const handleDeleteDocument = (id) => {
    console.log("handleDeleteDocument..");
    setDeleteContext("document");
    setSelectedDocumentId(id);
    setShowModal(true);
  };

  const handleDeleteNote = (id) => {
    setDeleteContext("note");
    setNoteIdForDelete(id);
    setShowModal(true);
  };

  const deleteCommon = async () => {
    console.log(
      "dddd L " +
      selectedTaskId +
      " , " +
      selectedDocumentId +
      " , " +
      noteIdForDelete
    );
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
        const updatedTasks = patientTasks.filter(
          (item) => item.id !== selectedTaskId
        );
        setPatientTasks(updatedTasks);
        setShowModal(false);
        setSelectedTaskId("");
        // If showCompletedTasks is false and the deleted task is completed, show it again
        toast.success("Task deleted successfully.");
      } catch (error) {
        errorHandling(error);
      }
    } else if (selectedDocumentId) {
      try {
        const axiosInstance = createAxiosInstance();
        const url = `${tenantVal}${DELETE_DOCUMENT}`;
        await axiosInstance.delete(url, {
          data: {
            id: selectedDocumentId,
            tenant: tenantVal,
          },
        });
        // Filter the task array to remove the selected task
        const updatedDocuments = documents.filter(
          (item) => item.id !== selectedDocumentId
        );
        setDocuments(updatedDocuments);
        setShowModal(false);
        setSelectedDocumentId("");
        // If showCompletedTasks is false and the deleted task is completed, show it again
        toast.success("Document deleted successfully.");
      } catch (error) {
        errorHandling(error);
      }
    } else if (noteIdForDelete) {
      try {
        const axiosInstance = createAxiosInstance();
        const url = `${tenantVal}${CONSULTATION_NOTE_DELETE_URL}`;
        await axiosInstance.delete(url, {
          data: {
            id: noteIdForDelete,
            tenant: tenantVal,
          },
        });
        // Filter the task array to remove the selected task
        const updatedDocuments = patientNotes.filter(
          (item) => item.id !== noteIdForDelete
        );
        setPatientNotes(updatedDocuments);
        setShowModal(false);
        setNoteIdForDelete("");
        //setSelectedDocumentId("");
        // If showCompletedTasks is false and the deleted task is completed, show it again
        toast.success("Note deleted successfully.");
      } catch (error) {
        errorHandling(error);
      }
    }
  };

  const deleteNote = async () => {
    if (noteIdForDelete) {
      try {
        const axiosInstance = createAxiosInstance();
        const url = `${tenantVal}${CONSULTATION_NOTE_DELETE_URL}`;
        await axiosInstance.delete(url, {
          data: {
            id: noteIdForDelete,
            tenant: tenantVal,
          },
        });
        fetchPatientNotes();
        toast.success("Note deleted successfully.");
      } catch (error) {
        errorHandling(error);
      }
    }
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
      setPatientTasks(updatedTasks);
    } else {
      // Add new task
      const updatedTasks = [...task, newTask];
      setPatientTasks(updatedTasks);
    }
    setShowModal(false);
  };

  const createNewTask = async (userData) => {
    console.log("TTTTTTTTTTTTTTT");
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
      fetchPatientTasks(patientId);
    } catch (error) {
      errorHandling(error);
    }
  };

  const fetchProfileInfo = async () => {
    try {
      const axiosInstance = createAxiosInstance(true);
      console.log("axiosInstance : " + axiosInstance.getUri());
      const response = await axiosInstance.get(`${WHO_AM_I}`);
      if (response && response.data) {
        console.log("response.data.email : " + response.data.email);
        if (response.data.staffMember) {
          setStaffMemberId(response.data.staffMember.id);
          // setId(response.data.staffMember.id);
          // setTitle(response.data.staffMember.title);
          // setFirstName(response.data.staffMember.firstName);
          // setLastName(response.data.staffMember.lastName);
          // setSpecialisation(response.data.staffMember.specialism);
          // setQualifications(response.data.staffMember.qualification);
          // setMobile(response.data.staffMember.mobile);
          // setHomeNumber(response.data.staffMember.homeNumber);
          // setEmail(response.data.staffMember.email);
          // setBio(response.data.staffMember.bio);
          // setBase64Image(response.data.staffMember.profilePic);
        }
      }
      console.log("response.data : " + JSON.stringify(response.data));
    } catch (error) {
      console.log(error);
    }
  };
  const handleAccordionClick = (key) => {
    console.log("inside accordion clicked");
    // Update the expand state for all accordion items to false

    setActiveAccordionKey(key === activeAccordionKey ? null : key);
  };

  const createNewNote = async () => {
    try {
      // if (!note) return;

      formParamForAddNote.submitted = true;
      if (validateFormForAddNote()) {
        formParamForAddNote.submitted = true;
      } else return;

      var ob = {
        tenant: tenantVal,
        //'appointmentId': selectedAppointment.id,
        patientId: patientId,
        consultationId: staffMemberId,
        note: note,
      };

      const axiosInstance = createAxiosInstance();
      let response = await axiosInstance.post(
        `${tenantVal}${SAVE_CLINICAL_NOTE}`,
        ob,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Note created successfully");
      setNote("");
      setFormParamForAddNote({
        errors: {
          email: "",
        },
        submitted: false,
      });
      console.log(response.data.id);
      // await fetchPatientNotes(patientId);
      // handleChangeTextForSave(response.data.id)
      await fetchPatientNotes(patientId);
      setActiveAccordionKey(null);
      const newExpandStates = {};
      Object.keys(expandStates).forEach((noteId) => {
        newExpandStates[noteId] = false;
      });
      setExpandStates(newExpandStates);

      // Set the active accordion key
      console.log(expandStates);

    } catch (error) {
      errorHandling(error);
    }
  };
  const saveNote = async () => {
    try {
      if (!note && !noteId) return;

      var ob = {
        id: "",
        tenant: tenantVal,
        //'appointmentId': selectedAppointment.id,
        patientId: patientId,
        // consultationId: staffMemberId,
        note: note,
      };

      const axiosInstance = createAxiosInstance();
      let response = await axiosInstance.post(
        `${tenantVal}${SAVE_CLINICAL_NOTE}`,
        ob,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Note Saved successfully");
      setNote("");
      setNoteId("");
      setEditData(false);
      setEditDataId(null)
      const newExpandStates = {};

      // Set all expand states to false
      Object.keys(expandStates).forEach((noteId) => {
        newExpandStates[noteId] = false;
      });

      setExpandStates(newExpandStates);
      // Set the expand state for the clicked note to true
      // newExpandStates[id] = !expandStates[id];

      // Update the expandStates state
      fetchPatientNotes(patientId);
      // var ob1 = {
      //   id: 57,
      //   tenant: tenantVal,
      //   patientId: patientId,
      // };
      // let response1 = await axiosInstance.post(
      //   `${tenantVal}${START_CONSULTATION}`,
      //   ob1,
      //   {
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   }
      // );
    } catch (error) {
      errorHandling(error);
    }
  };
  const editNote = async () => {
    try {
      // if (!note && !noteId) return;

      formParamForEditNote.submitted = true;
      if (validateFormForEditNote()) {
        formParamForEditNote.submitted = true;
      } else return;

      var ob = {
        id: noteId,
        tenant: tenantVal,
        //'appointmentId': selectedAppointment.id,
        patientId: patientId,
        // consultationId: staffMemberId,
        note: noteForEdit,
      };

      const axiosInstance = createAxiosInstance();
      let response = await axiosInstance.post(
        `${tenantVal}${SAVE_CLINICAL_NOTE}`,
        ob,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Note updated successfully");
      setNoteForEdit("");
      setNoteId("");
      setFormParamForEditNote({
        errors: {
          email: "",
        },
        submitted: false,
      });
      setAccordionDisable(false);

      setEditData(false);
      setEditDataId(null)
      // const newExpandStates = {};
      await fetchPatientNotes(patientId);
      setActiveAccordionKey(null);
      const newExpandStates = {};
      Object.keys(expandStates).forEach((noteId) => {
        newExpandStates[noteId] = false;
      });
      setExpandStates(newExpandStates);

      // Set the active accordion key
      console.log(expandStates);
      // await handleChangeText(-1);
      // Set all expand states to false
      // Object.keys(expandStates).forEach((noteId) => {
      //   newExpandStates[noteId] = false;
      // });
      // patientNotes.forEach((note) => {
      //   // Check if the note has an ID
      //   if (note && note.id) {
      //     // Toggle the expand state for the current note's ID
      //     newExpandStates[note.id] = !expandStates[note.id];
      //   }
      // });
      // setExpandStates(newExpandStates);
      // Set the expand state for the clicked note to true
      // newExpandStates[id] = !expandStates[id];

      // Update the expandStates state
      // fetchPatientNotes(patientId);
      // var ob1 = {
      //   id: 57,
      //   tenant: tenantVal,
      //   patientId: patientId,
      // };
      // let response1 = await axiosInstance.post(
      //   `${tenantVal}${START_CONSULTATION}`,
      //   ob1,
      //   {
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   }
      // );
    } catch (error) {
      errorHandling(error);
    }
  };

  const cancelNote = async () => {
    setNoteId();
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
      console.log(response);
      toast.success("Payment made successfully");
    } catch (error) {
      errorHandling(error);
    }
  };

  const getPatientPayment = async () => {

    if (!patientId)
      return;

    try {
      const axiosInstance = createAxiosInstance();
      const response = await axiosInstance.get(
        `${tenantVal}${GET_PATIENT_PAYMENT}`.replace("{paidByValue}", patientId)
      );
      if (response && response.data) setPaidPayments(response.data);
      // toast.success("Payment fetched successfully");

      setPaidPayments(response.data);
      console.log(paidPayments);

      //setPaidPayments(response.data);
    } catch (error) {
      errorHandling(error);
    }
  };
  // console.log(paidPayments);
  // const fetchTask = async () => {
  //   try {
  //     const axiosInstance = createAxiosInstance();
  //     const response = await axiosInstance.get(
  //       `${tenantVal}${TASK_CONTROLER_URL}`
  //     );
  //     const data = response.data.sort((a, b) => a.id - b.id);
  //     setTask(data);
  //   } catch (error) {
  //     errorHandling(error);
  //   }
  // };

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

  const onTabChange = (key) => {
    setDefaultActiveKey(key);
  };

  const handleAddDocument = () => {
    console.log(patientId);
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

  const [buttonText, setButtonText] = useState(false);
  console.log(expandStates);
  const handleChangeTextForSave = async (id) => {
    if (!id) return;

    const newExpandStates = { ...expandStates };

    // Set the expand state for the clicked note to false
    newExpandStates[id] = false;
    setExpandStates(newExpandStates);

    // Update the expandStates state
  };

  const handleChangeText = (id) => {
    console.log(expandStates);
    console.log("text change function called");
    // console.log(id);
    if (!id) return;
    console.log(id);
    // console.log("Current State of expand for ID", expandStates[id]);

    // Create a copy of the current expandStates
    const newExpandStates = {};
    // Set all expand states to false

    // Set the expand state for the clicked note to true
    Object.keys(expandStates).forEach((noteId) => {
      newExpandStates[noteId] = false;
    });

    if (id == -1) {
      patientNotes.forEach((note) => {
        // Check if the note has an ID
        if (note && note.id) {
          // Toggle the expand state for the current note's ID
          newExpandStates[note.id] = !expandStates[note.id];
        }
      });
    } else {

      newExpandStates[id] = !expandStates[id];
    }
    // Update the expandStates state
    setExpandStates(newExpandStates);
  };

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
    if (!note) {
      formIsValid = false;
      f.errors.note = "*Please enter note.";
    }
    setFormParamForAddNote(f);
    return formIsValid;
  }
  useEffect(() => {
    validateFormForAddNote();
  }, [note]);


  const [formParamForEditNote, setFormParamForEditNote] = useState({
    errors: {
      email: "",
    },
    submitted: false,
  });
  const validateFormForEditNote = () => {
    let formIsValid = true;
    let f = Object.assign({}, formParamForEditNote);
    f.errors.note = "";
    if (!noteId) {
      formIsValid = false;
      f.errors.note = "*Please select note.";
    }
    if (!noteForEdit) {
      formIsValid = false;
      f.errors.note = "*Please enter note.";
    }
    setFormParamForEditNote(f);
    return formIsValid;
  }
  useEffect(() => {
    validateFormForEditNote();
  }, [noteForEdit]);



  const documentDataItems = [
    {
      key: "1",
      label: (
        <>
          <div className="d-flex align-items-center">
            <span className="icon-wrap purple">{SVGIcons.Details}</span>
            <span>Notes</span>
          </div>
        </>
      ),
      children: (
        <>
          <div className="visit-history">
            <div className=" mt-4 pt-3 flex-wrap flex-md-nowrap">
              {/* <div className="visit-history-content-wrap">
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
              </div> */}

              <textarea
                className="form-control textareaform-control"
                rows="7"
                id="idNote"
                name="text"
                placeholder="Write here..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
              ></textarea>
              {formParamForAddNote.submitted && (
                <div className="errorMsg text-start">
                  {formParamForAddNote.errors.note}
                </div>
              )}
              <div className="flex-shrink-0 todo-btn-wrap d-flex align-items-center">
                <div className="">
                  <Button className="custom_btn save-note"
                    // onClick={editNote}
                    onClick={() => {
                      createNewNote()
                    }
                    }
                  >

                    {/* {noteId ? "Edit Note" : "Save Note"} */}
                    Save Note
                  </Button>
                </div>
                {/* <div className="">
                  {noteId && (
                    <Button
                      className="custom_btn save-note danger"
                      onClick={(e) => {
                        e.stopPropagation();
                        setNoteId("");
                        setNote("");
                      }}
                    >
                      Cancel
                    </Button>
                  )}
                </div> */}
              </div>
            </div>
            <div className="custom-accordion-wrapper">

              {/* <Accordion flush>
                <Table
                  dataSource={filterTableForNotes && filterTableForNotes.length > 0 ? filterTableForNotes : dynamicDataSourceForNotes}
                  columns={columnsForNote}
                  locale={{
                    emptyText: isPageLoadedForNotes ? (
                      <Empty description='No Records Found' />
                    ) :
                      <p></p>
                  }}
                  pagination={tableParamsForNotes.pagination}
                  onChange={handleTableChangeForNotes}
                  showHeader={false}
                />
              </Accordion> */}

              <Accordion flush activeKey={activeAccordionKey} onSelect={handleAccordionClick} >
                {(!patientNotes || patientNotes.length == 0) && (
                  <p className="no-record-text">No Records Found</p>
                )}

                {patientNotes &&
                  patientNotes.length > 0 &&
                  patientNotes.map((list, i) => (
                    <>
                      {list && (
                        <Accordion.Item eventKey={i}>
                          <Accordion.Header
                            onClick={() => handleChangeText(list.id)}
                          // disabled={accordionDisable}

                          >
                            <div className="d-flex align-items-center mb-3 accordion-header-title-wrap">
                              <span className="header-title text-ellipsis">
                                {" "}
                                {/* {list && list.createdByStaffMember ? (list.createdByStaffMember.firstName + (list.createdByStaffMember.lastName ? ' ' + list.createdByStaffMember.lastName : '')) : "-"} */}
                                {list && list.consultationId
                                  ? list.createdByStaffMember
                                    ? list.createdByStaffMember.firstName +
                                    (list.createdByStaffMember.lastName
                                      ? " " +
                                      list.createdByStaffMember.lastName
                                      : "")
                                    : "-"
                                  : list && list.createdBy
                                    ? list.createdBy
                                    : "-"}
                                {list &&
                                  list.appointment &&
                                  list.appointment.practiceService &&
                                  list.appointment.practiceService.name ? (
                                  <div className="d-none d-sm-block flex-shrink-0">
                                    <span className="text-black fw-600 small-label d-inline-block">
                                      ({list.appointment.practiceService.name})
                                    </span>
                                  </div>
                                ) : null}
                              </span>

                              <div className="d-none d-sm-block flex-shrink-0">
                                <span className="label-wrap ms-0">
                                  {list && list.created
                                    ? moment(list.created).format("DD MMM YYYY")
                                    : "-"}
                                </span>
                              </div>
                              <div className="flex-shrink-0 ms-md-3 ms-0">
                                <span className="text-manatee fw-500 small-label d-inline-block">
                                  {list && list.created
                                    ? moment(list.created).format("HH:MM A")
                                    : "-"}
                                </span>
                              </div>

                              <div className="time-wrap ms-4 ps-2 d-flex flex-shrink-0">
                                <div className="edit-btn-wrap">
                                  {list &&
                                    list.created &&
                                    moment(list.created).diff(
                                      new Date(),
                                      "days"
                                    ) == 0 ? (
                                    <Button
                                      className="custom_btn save-note mt-0"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setNoteId(list.id);
                                        setNoteForEdit(list.note);
                                        setEditData(true)
                                        setEditDataId(list ? list.id : null)
                                        setAccordionDisable(true)
                                        // $("#idNote").trigger("focus");
                                        // $("#idNote").trigger("select");
                                      }}
                                    >
                                      {" "}
                                      Edit
                                    </Button>
                                  ) : (
                                    ""
                                  )}
                                </div>

                                <div className="edit-btn-wrap">
                                  <Button
                                    className="custom_btn danger mt-0"
                                    data-bs-toggle="modal"
                                    data-bs-target="#myModal"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleDeleteNote(list.id);
                                    }}
                                  >
                                    {" "}
                                    Delete
                                  </Button>
                                </div>
                              </div>
                              <span className="accordion-text-wrap fw-500">
                                {/* {buttonText == i  ? "Expand" : "Reduce"} */}
                                {expandStates[list.id] ? "Reduce" : "Expand"}
                                {/* {console.log('hhhhh111', expand)} */}
                              </span>
                            </div>
                            <p className="short-desc fw-500 text-manatee mb-0 small">
                              {list && list.note
                                ? list.note.substring(0, minLengthInOneRow)
                                : "-"}
                            </p>
                            {/* Edit note Start AVN*/}
                            {/* {editData && editDataId == list.id ? (
                              <div className="mt-2 todo-edit-wrap w-100">
                                <textarea
                                  className="form-control textareaform-control"
                                  rows="7"
                                  id="idNote"
                                  name="text"
                                  placeholder="Write here..."
                                  value={noteForEdit}
                                  onClick={(e) => e.stopPropagation()}


                                  onKeyUp={(e) => {
                                    e.preventDefault()
                                  }}
                                  onChange={(e) => {
                                    e.stopPropagation();
                                    setNoteForEdit(e.target.value)
                                  
                                  }}
                                ></textarea>
                                <div className="flex-shrink-0 todo-btn-wrap d-flex align-items-center">
                                  <div className="">
                                    <Button
                                      className="custom_btn save-note"
                                      onClick={editNote}
                                    >
                                      {noteId ? "Edit Note" : "Save Note"}
                                    </Button>
                                  </div>
                                  <div className="">
                                    {noteId && (
                                      <Button
                                        className="custom_btn save-note danger"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          setNoteId("");
                                          // setNote("");
                                          setEditData("")
                                        }}
                                      >
                                        Cancel
                                      </Button>
                                    )}
                                  </div>
                                </div>
                              </div>
                            ) : (
                              ""
                            )} */}
                            {/* Edit note End AVN*/}
                          </Accordion.Header>

                          {/* {expandStates[list.id] && ( */}
                          <Accordion.Body>
                            <p className="p_wrap">
                              {list && list.note ? list.note : "-"}
                            </p>
                          </Accordion.Body>
                          {/* ) */}
                          {/* } */}
                          {editData && editDataId == list.id ? (
                            <div className="mt-2 todo-edit-wrap w-100">
                              <textarea
                                className="form-control textareaform-control"
                                rows="7"
                                id="idNote"
                                name="text"
                                placeholder="Write here..."
                                value={noteForEdit}
                                onClick={(e) => e.stopPropagation()}

                                onKeyUp={(e) => {
                                  e.preventDefault()
                                }}
                                onChange={(e) => {
                                  e.stopPropagation();
                                  setNoteForEdit(e.target.value)
                                }}
                              ></textarea>
                              {formParamForEditNote.submitted && (
                                <div className="errorMsg text-start">
                                  {formParamForEditNote.errors.note}
                                </div>
                              )}
                              <div className="flex-shrink-0 todo-btn-wrap d-flex align-items-center">
                                <div className="">
                                  <Button
                                    className="custom_btn save-note"
                                    onClick={() => {
                                      editNote()

                                    }}
                                  >
                                    {noteId ? "Save Edit" : "Save Note"}
                                  </Button>
                                </div>
                                <div className="">
                                  {noteId && (
                                    <Button
                                      className="custom_btn save-note danger"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setNoteId("");
                                        // setNote("");
                                        setEditData("");
                                        setFormParamForEditNote({
                                          errors: {
                                            email: "",
                                          },
                                          submitted: false,
                                        });
                                      }}
                                    >
                                      Cancel
                                    </Button>
                                  )}
                                </div>
                              </div>
                            </div>
                          ) : (
                            ""
                          )}
                        </Accordion.Item>
                      )}
                    </>
                  ))}

                {/* <Accordion.Item eventKey="1">
                  <Accordion.Header>
                    <div className="d-flex align-items-center mb-3 accordion-header-title-wrap">
                      <span className="header-title text-ellipsis">
                        {" "}
                        Consultation - Physio Paul
                      </span>
                      <div className="d-none d-sm-block flex-shrink-0">
                        <span className="label-wrap">Dec 2022</span>
                      </div>
                      <div className="flex-shrink-0">
                        <span className="text-manatee fw-500 small-label d-inline-block ms-4 ps-2">
                          9:47 PM
                        </span>
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
                    Anti-cyclic citrullinated Peptide Pain In left hand Pain In
                    left hand knuckles & Thumb Blood work showed Anti-cyclic
                    citrullinated Peptide Pain In left hand
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="2">
                  <Accordion.Header>
                    <div className="d-flex align-items-center mb-3 accordion-header-title-wrap">
                      <span className="header-title text-ellipsis">
                        {" "}
                        Consultation - Physio Paul
                      </span>
                      <div className="d-none d-sm-block flex-shrink-0">
                        <span className="label-wrap">Dec 2022</span>
                      </div>
                      <div className="flex-shrink-0">
                        <span className="text-manatee fw-500 small-label d-inline-block ms-4 ps-2">
                          9:47 PM
                        </span>
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
                    Anti-cyclic citrullinated Peptide Pain In left hand Pain In
                    left hand knuckles & Thumb Blood work showed Anti-cyclic
                    citrullinated Peptide Pain In left hand
                  </Accordion.Body>
                </Accordion.Item> */}
              </Accordion>
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
            <span>Documents</span>
          </div>
        </>
      ),
      children: (
        <>
          <div className="all-documents-link-wrap">

            {/* <Table
              dataSource={filterTableForDocuments && filterTableForDocuments.length > 0 ? filterTableForDocuments : dynamicDataSourceForDocuments}
              columns={columnsForDocuments}
              locale={{
                emptyText: isPageLoadedForDocuments ? (
                  <Empty description='No Records Found' />
                ) :
                  <p></p>
              }}
              pagination={tableParamsForDocuments.pagination}
              onChange={handleTableChangeForDocuments}
              showHeader={false}
            /> */}

            <div className="documents-link-wrap documents-list-items-wrap">
              {(!documents || documents.length == 0) && (
                <p style={{ marginLeft: "30px" }} className="no-record-text">
                  {" "}
                  No Records Found
                </p>
              )}
              {documents &&
                documents.length > 0 &&
                documents.map((list, i) => (
                  <div>
                    {list && list.name && (
                      <Link className="d-flex align-items-center justify-content-between"
                        onClick={(e) => {
                          e.preventDefault();
                          if (list && list.documentUrl !== null && (!e.target || !e.target.id || (e.target.id != 'idBtnDeleteDocument'))) {
                            let ID = list ? list.id : null;
                            let patientId = list && list.patient ? list.patient.id : null;
                            console.log(ID, patientId);
                            openPreview(ID, patientId);
                          }
                        }}

                      >
                        <div className="d-flex align-items-center   me-3">
                          <div className="me-md-4 me-2">
                            <span className="header-title  text-ellipsis text-break">
                              {" "}
                              {list && list.name ? list.name : "-"}
                            </span>
                            <span className="label-wrap text-ellipsis text-break ">
                              {list && list.created
                                ? moment(list.created).format("DD MMM YYYY")
                                : "-"}
                            </span>
                          </div>
                          <div className="flex-shrink-0 d-flex align-items-md-center align-items-md-start flex-md-row flex-column documents-list-wrap">
                            <span className="text-manatee fw-500 small-label d-inline-block me-2 text-ellipsis text-break">
                              {list && list.created
                                ? moment(list.created).format("HH:MM A")
                                : "-"}
                            </span>
                            <p className="short-desc fw-500 text-manatee mb-0 small text-ellipsis text-break">
                              {list && list.status ? list.status : "-"}
                            </p>

                            {list &&
                              list.created &&
                              moment(list.created).diff(new Date(), "days") ==
                              0 ? (
                              <Button
                                id="idBtnDeleteDocument"
                                className="custom_btn danger mt-0"
                                data-bs-toggle="modal"
                                data-bs-target="#myModal"
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleDeleteDocument(list.id);
                                }}
                              >
                                Delete
                              </Button>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                        {/* {SVGIcons.Documents} */}
                        {list && list.documentUrl !== null && SVGIcons.Documents}

                      </Link>
                    )}
                  </div>
                ))}

              {/* <Link className="d-flex align-items-center justify-content-between">
                <span className="text-ellipsis me-3">
                  MRI Back - Mary Kenny
                </span>
                {SVGIcons.Documents}
              </Link>
              <Link className="d-flex align-items-center justify-content-between">
                <span className="text-ellipsis me-3">
                  Patient submitted photo - Mary Kenny
                </span>
                {SVGIcons.Documents}
              </Link>
              <Link className="d-flex align-items-center justify-content-between">
                <span className="text-ellipsis me-3">
                  GP Referral Letter - Mary Kenny
                </span>
                {SVGIcons.Documents}
              </Link>
              <Link className="d-flex align-items-center justify-content-between">
                <span className="text-ellipsis me-3">
                  Patient submitted photo
                </span>
                {SVGIcons.Documents}
              </Link> */}
            </div>
          </div>
        </>
      ),
    },
  ];
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showPaymentModal = () => {
    resetFormParam();
    setFormData({
      amount: "",
      paymentType: paymentTypes ? paymentTypes[0].value : "",
      receipt: receipts ? receipts[0].value : "",
      practiceServiceId: "",
      chargedBy: "",
    });
    setIsModalOpen(true);
  };
  const handleOk = async () => {
    formParam.submitted = true;
    if (validateForm()) {
      formParam.submitted = true;
    } else return;

    await addPatientPayment({
      tenant: tenantVal,
      paidBy: patientId,
      amountPaid: parseFloat(formData.amount),
      paymentMethod: formData.paymentType,
      consultationId: formData.practiceServiceId
        ? formData.practiceServiceId
        : "",
      chargedBy: "",
    });

    await getPatientPayment();
    await fetchPatientDues(patientId);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    setFormData({
      amount: "",
      paymentType: paymentTypes ? paymentTypes[0].value : "",
      receipt: receipts ? receipts[0].value : "",
      practiceServiceId: "",
      chargedBy: "",
    });
  }, []);

  const [formData, setFormData] = useState({
    amount: "",
    paymentType: paymentTypes ? paymentTypes[0].value : "",
    receipt: receipts ? receipts[0].value : "",
    practiceServiceId: "",
    chargedBy: "",
  });

  const [formParam, setFormParam] = useState({
    errors: {
      amount: "",
      practiceServiceId: "",
    },
    submitted: false,
  });

  const resetFormParam = () => {
    console.log("resetFormParam called..");
    setFormParam({
      errors: {
        amount: "",
        practiceServiceId: "",
      },
      submitted: false,
    });
  };

  const validateForm = () => {
    console.log("validate form called...");
    let formIsValid = true;
    let f = Object.assign({}, formParam);
    f.errors.amount = "";
    f.errors.practiceServiceId = "";
    if (!formData.amount) {
      formIsValid = false;
      f.errors.amount = "*Please enter amount.";
    }
    if (!formData.practiceServiceId) {
      formIsValid = false;
      f.errors.practiceServiceId = "*Please select service.";
    }
    setFormParam(f);
    return formIsValid;
  };

  useEffect(() => {
    validateForm();
  }, [formData]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // const calculateAge = (dob) => {
  //   let age;
  //   if (dob) {
  //     const dobDate = new Date(
  //       dob[0], // Year
  //       dob[1] - 1, // Month
  //       dob[2] // Day
  //     );
  //     const today = new Date();
  //     age = today.getFullYear() - dobDate.getFullYear();
  //     const monthDiff = today.getMonth() - dobDate.getMonth();
  //     if (
  //       monthDiff < 0 ||
  //       (monthDiff === 0 && today.getDate() < dobDate.getDate())
  //     ) {
  //       age--;
  //     }
  //   }
  //   return age;
  // };

  const calculateAge = (dob) => {
    if (!dob) return "";

    let age;
    let aa = dob.split("-");
    if (aa && aa.length == 3) {
      const dobDate = new Date(
        aa[0], // Year
        aa[1] - 1, // Month
        aa[2] // Day
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
  console.log("practice services :", practiceServices);
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = (amountDue, practiceID, staffID) => {
    console.log("here");
    console.log(amountDue);
    setValue(amountDue);
    setSelectedService(practiceID);
    console.log(practiceID);
    console.log(staffID);
    setSelectedDoctor(staffID);
    setModalVisible(true);
  };

  const closeModal = async () => {
    setModalVisible(false);
    await fetchPatientDues(patientId);
    await getPatientPayment();
  };

  const goToEditPatientPage = async () => {
    if (!patient || !patient.id) return;
    dispatch(addPatientId(patient.id));
    localStorage.setItem("kinesin-patientId", patient.id);
    dispatch(addPreviousPageForEditPatient("patient-detail"));
    navigate("/edit_patient");
  };

  const items = [
    {
      key: "1",
      label: (
        <>
          <span>Due</span>
        </>
      ),
      children: (
        <>
          {dataFetching ? (
                    null
                  ) :
          payments && payments.length > 0 ? (
            <>
              <div className="patient-payments-details-wrap">
                {payments.map((list, i) => {
                  // console.log(list);
                  return (
                    <div
                      key={i}
                      className="d-flex justify-content-between patient-payments-details-item"
                    >
                      <div className="d-flex  consultation-wrap">
                        {/* <div className="custom-checkbox-wrap spacing-wrap">
                        <Checkbox />
                      </div> */}
                        <div>
                          <h6 className="small text-black fw-500 mb-0 text-ellipsis">
                            {/* Consultation */}
                            {list &&
                              list.consultation &&
                              list.consultation.appointment &&
                              list.consultation.appointment.practiceService
                              ? list.consultation.appointment.practiceService
                                .name
                              : "Consultancy"}
                            {/* temp value, actual value should be directly availble in the item Object */}
                          </h6>
                          <h6 className="small text-manatee mb-0 fw-500">
                            {/* 12/1/22 */}
                            <h6 className="small text-manatee mb-0 fw-500">
                              {list && list.created
                                ? new Date(list.dueDate).toLocaleDateString(
                                  "en-GB",
                                  {
                                    day: "numeric",
                                    month: "numeric",
                                    year: "2-digit",
                                  }
                                )
                                : // : "No date"}
                                "-"}
                            </h6>
                          </h6>
                        </div>
                      </div>
                      <div className="d-flex align-items-center flex-shrink-0">
                        <span className="number text-decoration-underline">
                          €{list && list.amountDue ? list.amountDue : ""}
                        </span>

                        <Button
                          className="custom_btn pay_now_btn"
                          onClick={() => {
                            openModal(
                              list?.amountDue,
                              list?.consultation?.appointment
                                ?.practiceServiceId,
                              list?.consultation?.appointment
                                ?.assignedToStaffMember?.id
                            );
                          }}
                        >
                          Pay Now
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
              {/* <Button className="custom_btn pay_now_btn">Pay Now</Button> */}
            </>
          ) : (
            <p className="no-record-text">No records found</p>
            // <p className="no-record-text"></p>

          )}
        </>
      ),
    },
    {
      key: "2",
      label: (
        <>
          <span>Paid</span>
        </>
      ),
      children: (
        <>
          {paidPayments && paidPayments.length > 0 ? (
            <div className="patient-payments-details-wrap">
              {paidPayments.map((list, i) => (
                <div
                  key={i}
                  className="d-flex justify-content-between patient-payments-details-item"
                >
                  <div className="d-flex align-items-center consultation-wrap">
                    <span className="icon-wrap success flex-shrink-0 me-3">
                      <Image src={Checkmark} />
                    </span>
                    <div>
                      <h6 className="small text-black fw-500 mb-0 text-ellipsis">
                        {/* Consultation */}
                        {list &&
                          list.consultation &&
                          list.consultation.appointment &&
                          list.consultation.appointment.practiceService
                          ? list.consultation.appointment.practiceService.name
                          : "Consultancy"}
                      </h6>
                      <h6 className="small text-manatee mb-0 fw-500">
                        {/* 12/1/22 */}

                        {list && list.paymentDate
                          ? new Date(
                            list.paymentDate[0],
                            list.paymentDate[1] - 1,
                            list.paymentDate[2],
                            list.paymentDate[3],
                            list.paymentDate[4]
                          ).toLocaleDateString("en-GB", {
                            day: "numeric",
                            month: "numeric",
                            year: "2-digit",
                          })
                          : // : "No date"}
                          "-"}
                      </h6>
                    </div>
                  </div>
                  <div>
                    <span className="number text-decoration-underline">
                      €{list && list.amountPaid ? list.amountPaid : ""}
                    </span>
                  </div>
                  {/* <div className="custom-checkbox-wrap ">
                          <Checkbox />
                        </div> */}
                </div>
              ))}
            </div>
          ) : (
            <p className="no-record-text">No records found</p>
          )}
        </>
      ),
    },
  ];

  return (
    <>
      {/* <Nav /> */}
      <Toaster position="top-center" reverseOrder={false} />
      <div className="dashBcontbody">
        {Object.keys(patient).length > 0 ? (
          <>
            <div className="dashboard-bg patient-detail">
              <h2 className="h2 fw-600 text-stratos page-title">
                Patient Details
              </h2>
              <div className="patient-detail-cardbox-container-1">
                <div className="d-flex flex-column">
                  <div className="patient-detail-card bg patient-detail-summary-wrap">
                    <div className="patient-header-wrap">
                      <div className="d-flex  flex-sm-nowrap flex-wrap justify-content-center justify-content-sm-start">
                        <div className="patient-profile-img-wrap flex-shrink-0 ">
                          <span className="user-profile-image">
                            {/* {patient && patient.firstName
                              ? patient && patient.firstName[0]
                              : ""}
                            {patient && patient.surname
                              ? patient && patient.surname[0]
                              : ""} */}
                            {patient && patient.firstName && patient.surname
                              ? patient.firstName.trim()[0] +
                              patient.surname.trim()[0]
                              : (patient && patient.firstName.trim()
                                ? patient.firstName.trim()[0]
                                : "") +
                              (patient && patient.surname.trim()
                                ? patient.surname.trim()[0]
                                : "")}
                          </span>
                        </div>
                        <div className="patient-header-content-wrap">
                          <a href="" className="h3 fw-600 text-ellipsis">
                            {patient
                              ? (patient.firstName
                                ? patient.firstName + " "
                                : "") +
                              (patient.surname ? patient.surname : "")
                              : ""}
                          </a>
                          {/* <span className="d-inline-block text-manatee fw-500 p small mb-2 pb-1">
                            Check in : 21 August 2020, 12:45 PM
                          </span> */}

                        </div>
                        <div className="flex-shrink-0  d-flex flex-sm-column ms-sm-auto  mt-md-0 btn-wrap align-self-start modal-btn-wrap">
                          <Button
                            className="custom_btn"
                            data-bs-toggle="modal"
                            data-bs-target="#sendSma_modal"
                          >
                            Send SMS
                          </Button>

                          <Button
                            className="custom_btn"
                            onClick={() => goToEditPatientPage()}
                          >
                            Edit
                          </Button>

                          {/* <Button
                            className="custom_btn"
                            data-bs-toggle="modal"
                            data-bs-target="#addTask_modal"
                            onClick={handleAddTask}
                          >
                            Add Task
                          </Button> */}
                        </div>
                      </div>
                    </div>
                    <div className="patient-bottom-wrap d-flex flex-wrap">
                      <div className="patient-left-description position-relative">
                        <div className="patient-block-wrap">
                          <span className="text-manatee fw-500 d-inline-block">
                            DOB:
                          </span>
                          <h6 className="h6 text-stratos fw-500 mb-0">
                            {patient && patient.dateOfBirth
                              ? displayAge(patient.dateOfBirth) +
                              " (" +
                              calculateAge(patient.dateOfBirth) +
                              ")"
                              : ""}
                          </h6>
                        </div>
                        <div className="patient-block-wrap">
                          <span className="text-manatee fw-500 d-inline-block">
                            Address:
                          </span>
                          <h6 className="h6 text-stratos fw-500 mb-0 text-ellipsis">
                            {patient && patient.address
                              ? (patient.address.addressLine1
                                ? patient.address.addressLine1 + " "
                                : "") +
                              (patient.address.addressLine2
                                ? patient.address.addressLine2 + " "
                                : "") +
                              (patient.address.addressLine3
                                ? patient.address.addressLine3
                                : "")
                              : ""}
                          </h6>
                        </div>
                        <div className="patient-block-wrap">
                          <span className="text-manatee fw-500 d-inline-block">
                            Phone no:
                          </span>
                          <h6 className="h6 text-stratos fw-500 mb-0">
                            {patient ? patient.homePhone : ""}
                          </h6>
                        </div>
                        <div className="patient-block-wrap">
                          <span className="text-manatee fw-500 d-inline-block">
                            Public:
                          </span>
                          <h6 className="h6 text-stratos fw-500 mb-0 text-ellipsis">
                            Medical card no.{" "}
                            {patient && patient.medicalCardNumber
                              ? patient.medicalCardNumber
                              : "-"}
                          </h6>
                        </div>
                      </div>
                      <div className="patient-right-description">
                        <div className="patient-block-wrap">
                          <span className="text-manatee fw-500 d-inline-block">
                            Upcoming appointments:
                          </span>
                          <h6 className="h6 text-stratos fw-500 mb-0 ">
                            {patient && patient.nextApppointment
                              ? patient.nextApppointment
                              : ""}
                          </h6>
                        </div>

                        <div className="patient-block-wrap">
                          <span className="text-manatee fw-500 d-inline-block">
                            Gender:
                          </span>
                          <h6 className="h6 text-stratos fw-500 mb-0 ">
                            <div className="d-flex align-items-center patient-summary-wrap">
                              {
                                patient &&
                                patient.gender &&
                                <span className="patient-header-icon-wrap">
                                  {patient &&
                                    patient.gender &&
                                    patient.gender.toLowerCase() == "male" && (
                                      <Image src={Male} alt="category" />
                                    )}
                                  {patient &&
                                    patient.gender &&
                                    patient.gender.toLowerCase() == "female" && (
                                      <Image src={Female} alt="category" />
                                    )}
                                  {patient &&
                                    patient.gender &&
                                    patient.gender.toLowerCase() == "other" && (
                                      <Image src={Other} alt="category" />
                                    )}
                                </span>
                              }

                              <h6 className="h6 text-stratos fw-500 mb-0 text-break">
                                {patient ? patient.gender : ""}
                              </h6>
                            </div>
                          </h6>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="patient-detail-card bg patients-tasks-wrap">
                  <div className="d-flex align-items-center justify-content-between documents-title-wrap">
                    <h4 className="h4 fw-600 text-stratos mb-0">
                      Patient Tasks
                    </h4>
                    <Button
                      className="transaparent-btn d-flex align-items-center justify-content-end"
                      data-bs-toggle="modal"
                      data-bs-target="#addTask_modal"
                      onClick={handleAddTask}
                    >
                      <span className="d-inline-block">Add new</span>
                      <Image src={PlusIcon} />
                    </Button>
                  </div>
                  <div className="documents-link-wrap patient-payments-details-wrap">
                    {!patientTasks || patientTasks.length == 0 ? (
                      <p className="no-record-text"> No Records Found</p>
                    ) : (
                      ""
                    )}

                    {patientTasks &&
                      patientTasks.length > 0 &&
                      patientTasks.map((list, i) => (
                        <Link
                          className="d-flex align-items-center justify-content-between"
                          key={i}
                          data-bs-toggle="modal"
                          data-bs-target="#displayTask_modal"
                          onClick={() => handleDisplayTask(list.id)}
                        >
                          <span className=" me-3 text-ellipsis">
                            {list.title}
                          </span>
                          <span className="flex-shrink-0">
                            <Image src={EditIcon} className="me-3" />
                            <Image
                              src={DeleteIcon}
                              data-bs-toggle="modal"
                              data-bs-target="#myModal"
                              onClick={() => handleDeleteTask(list.id)}
                            />
                          </span>
                        </Link>
                      ))}
                  </div>
                </div>

                <div className="patient-detail-card bg">
                  <div className="d-flex align-items-center justify-content-between documents-title-wrap">
                    <h4 className="h4 fw-600 text-stratos mb-0">Payments</h4>
                  </div>
                  <div className="documents-tabs-wrap tabs-wrap">
                    {items.length === 0 ? (
                      <p className="no-record-text">No records found</p>
                    ) : (
                      <Tabs defaultActiveKey="1" items={items} />
                    )}
                  </div>
                </div>
              </div>
              <div className="patient-detail-cardbox-container-2">
                <div className="patient-detail-card bg position-relative">
                  <div className="documents-tabs-wrap">
                    <Tabs
                      defaultActiveKey={defaultActiveKey}
                      onChange={onTabChange}
                      items={documentDataItems}
                      moreIcon={<Image src={hamburger} />}
                    />
                  </div>
                  <div className="tabs-button-wrap">
                    {defaultActiveKey && defaultActiveKey == "3" ? (
                      <Button
                        className="transaparent-btn d-flex align-items-center justify-content-end"
                        data-bs-toggle="modal"
                        data-bs-target="#addDocumentModal"
                        onClick={handleAddDocument}
                      >
                        <span className="d-inline-block mr-3">Add new</span>
                        <Image src={PlusIcon} />
                      </Button>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <p>
            {(!payments || payments.length == 0) && (
              <p className="no-record-text">{/* No Records Found */}</p>
            )}
          </p>
        )}
        <PaymentModalComponent
          visible={modalVisible}
          onClose={closeModal}
          patientId={patient.id}
          patientName={patient.firstName}
          patient={patient}
          selectedDoctor={selectedDoctor}
          setSelectedDoctor={setSelectedDoctor}
          selectedService={selectedService}
          setSelectedService={setSelectedService}
          value={value}
          setValue={setValue}
        />
        <SmsModal
          tenantVal={tenantVal}
          patientId={patient.id}
          patientName={patient.firstName}
        />
        <PreviewModal
          show={showPreviewModal}
          onHide={closePreview}
          imageData={previewImageData}
          downloadDocument={downloadDocument}
        />
        <DocumentModal
          refreshByPatientIdApi={fetchDocumentById}
          patient={task}
          fetchDocumentById={fetchDocumentById}
        />
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

        <DeleteModal deleteService={deleteCommon} context={deleteContext} />

        <DisplayTaskModal
          headerTitle={"Task Info"}
          showModal={showModal}
          setShowModal={setShowModal}
          staffMemberId={staffMemberId}
          setStaffMemberId={setStaffMemberId}
          setSelectedTaskId={setSelectedTaskId}
          handleCloseTask={handleCloseTask}
          setModalHeaderTitle={setModalHeaderTitle}
          task={selectedTask}
        />

        <PaymentModal
          tenantVal={tenantVal}
          patientId={patient.id}
          patientName={patient.firstName}
        />
      </div>
    </>
  );
};

export default PatientDetail;
