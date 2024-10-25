import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import { createAxiosInstance } from "../../api/axiosConfig";
import {
  PATIENT_SEARCH_AUTOCOMPLETE_URL,
  STAFF_MEMBERS_CONTROLER_URL,
  STAFF_MEMBERS_CONTROLER_URL_ID,
} from "../../api/Service";
import { useSelector } from "react-redux";
import { TaskPriority, Taskstatus } from "../../Utils/Constant";
import $ from "jquery";
import { Autocomplete, TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { logoutFromHelper } from "../../api/Helper";
import { logout } from "../../redux/auth/AuthSlice";
import { useDispatch } from "react-redux";
import { removeuser } from "../../redux/user/userSlice";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import dayjs, { Dayjs } from 'dayjs';

const TaskModal = ({
  headerTitle,
  handleSaveTask,
  showModal,
  setShowModal,
  editTaskId,
  task,
  createNewTask,
  selectedTaskForEdit
}) => {
  const [value, setValue] = useState(dayjs(new Date()).add(1, 'day'));
  const [selectedDate, setSelectedDate] = useState(moment().add(1, 'day').format("DD/MM/YYYY"));
  const [showCalendar, setShowCalendar] = useState(false);
  const [patientName, setPatientName] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [from, setFrom] = useState("");
  const [priority, setPriority] = useState("1");
  const [status, setStatus] = useState("Open");
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [isPatientAutoCompleteDisabled, setIsPatientAutoCompleteDisabled] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let nameState = useSelector((state) => state.auth.user?.name);
  if (!nameState) {
    nameState = localStorage.getItem('kinesin-name')
  }
  let tenantVal = useSelector((state) => state.auth.user?.tenant);
  if (!tenantVal)
    tenantVal = localStorage.getItem('kinesin-tenant');
  const taskCreatedBy = useSelector((state) => state.user);
  //select calender date
  const fetchUser = async () => {
    try {
      const axiosInstance = createAxiosInstance();
      const response = await axiosInstance.get(
        `${tenantVal}${STAFF_MEMBERS_CONTROLER_URL}`
      );

      setStaffMember(response.data);
    } catch (error) {
      errorHandling(error)
    }
  };
  useEffect(() => {
    fetchUser();
  }, [tenantVal]);

  // Condionaly render add and edit//
  useEffect(() => {
    if (selectedTaskForEdit) {
      if (selectedTaskForEdit.dueDate) {
        var d = new Date(dayjs(selectedTaskForEdit.dueDate));
        setSelectedDate(moment(d).format("DD/MM/YYYY"));
        setValue(dayjs(new Date(selectedTaskForEdit.dueDate).setMinutes(0)));
      } else {
        setValue(dayjs(new Date()).add(1, 'day'));
        setSelectedDate(moment().add(1, 'day').format("DD/MM/YYYY"));
      }

      if (selectedTaskForEdit.patient) {
        setFullName((selectedTaskForEdit?.patient?.firstName + ' ' + (selectedTaskForEdit.patient.surname || '')));
        setPatientId(selectedTaskForEdit.patient.id);
        setPatient(selectedTaskForEdit.patient)
      } else {
        setFullName('');
        setPatientId('');
        setPatient({})
      }

      setStaffMemberId(selectedTaskForEdit.assignedToStaffId);
      setAssignedTo(selectedTaskForEdit.assignedToStaffId);
      setFrom(selectedTaskForEdit.from);
      setPriority(selectedTaskForEdit.priority);
      setStatus(selectedTaskForEdit.status);
      setTaskTitle(selectedTaskForEdit.title);
      setTaskDescription(selectedTaskForEdit.description);
    } else {
      setSelectedDate(moment().add(1, 'day').format("DD/MM/YYYY"));
      setValue(dayjs(new Date()).add(1, 'day'));
      setPatientName("");
      setAssignedTo("");
      setFrom("");
      setPriority("1");
      setStatus("Open");
      setTaskTitle("");
      setTaskDescription("");
      setFullName(task && task.patient_name ? task.patient_name : '');
      setPatientId(task && task.patient_id ? task.patient_id : '');
      setIsPatientAutoCompleteDisabled(task && task.patient_disabled ? task.patient_disabled : false);
    }
  }, [editTaskId, task, selectedTaskForEdit]);

  // modal save handler//
  const handleSave = () => {

    formParam.submitted = true;
    if (validateForm()) {
      formParam.submitted = true;
    } else
      return;

    const formattedDate = selectedDate ? moment(selectedDate, 'DD/MM/YYYY').format("YYYY-MM-DD HH:mm") : undefined;

    const newTask = {
      id: editTaskId || Date.now(),
      created: moment().format("DD/MM/YY"),
      time: moment().format("hh:mmA"),
      patient_name: patientName,
      assigned_to: assignedTo,
      from: from,
      priority: priority,
      due_date: formattedDate,
      task: taskTitle,
      status: status,
      description: taskDescription,
      title: taskTitle,
    };
    const formatDateString = (inputDate) => {
      const date = new Date(inputDate);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      const hours = String(date.getUTCHours()).padStart(2, "0");
      const minutes = String(date.getUTCMinutes()).padStart(2, "0");

      return `${year}-${month}-${day} ${hours}:${minutes}`;
    };

    const dueDate = selectedDate ? formatDateString(moment(selectedDate, 'DD/MM/YYYY').format("YYYY-MM-DD HH:mm")) : "";

    const selectedPriorityNumber = priority;
    const assignedStaff = {
      id: staffMemberId,
      tenant: tenantVal,
    };

    const taskBy = {
      id: taskCreatedBy.id,
      tenant: tenantVal,
    };

    const patient = {
      id: patientId ? patientId : '',
      tenant: tenantVal,
    }

    let modifiedTask = {
      tenant: tenantVal,
      dueDate: dueDate,
      status: newTask.status,
      title: newTask.title,
      description: newTask.description,
      priority: selectedPriorityNumber,
      assignedToStaff: assignedStaff,
      assignedToStaffId: staffMemberId,
      taskCreatedBy: taskBy,
      patientId: patientId ? patientId : '',
      patient: patient
    };
    createNewTask(modifiedTask);
    setStaffMemberId("");
    setPatient({});
    setPatientName("");
    setFullName(task && task.patient_name ? task.patient_name : '');
    setPatientId(task && task.patient_id ? task.patient_id : '');

    setAssignedTo("");
    setFrom("");
    setPriority("");

    setValue(dayjs(new Date().setMinutes(0)));
    setSelectedDate(moment(new Date(dayjs(value))).format("DD/MM/YYYY"));
    setTaskTitle("");
    setStatus("Open");
    setShowModal(false);
    setTaskDescription("");

    $('#idClosePopupTask').trigger("click");
  };

  // Staff memebers data
  const [staffMember, setStaffMember] = useState("");
  const [staffMemberId, setStaffMemberId] = useState("");
  const [selectedStaffMember, setSelectedStaffMember] = useState();
  const handleChangeSelect = (event) => {
    setStaffMemberId(event.target.value);
    handleEditTask(event.target.value);
  };
  const handleEditTask = async (id) => {
    try {
      const axiosInstance = createAxiosInstance();
      const url = `${tenantVal}${STAFF_MEMBERS_CONTROLER_URL_ID}${id}`;
      const response = await axiosInstance.get(url);
      setSelectedStaffMember(response.data);
    } catch (error) {
    errorHandling(error)
    }
  };

  const [formParam, setFormParam] = useState(
    {
      errors: {
        email: '',
      },
      submitted: false
    }
  );

  const validateForm = () => {
    let formIsValid = true;
    let f = Object.assign({}, formParam);
    f.errors.staffMemberId = '';
    f.errors.taskTitle = '';
    if (!staffMemberId || staffMemberId.toString().toLowerCase() == 'select') {
      formIsValid = false;
      f.errors.staffMemberId = "*Please select assign to.";
    }
    if (!taskTitle) {
      formIsValid = false;
      f.errors.taskTitle = "*Please enter the task description.";
    }

    setFormParam(f);
    return formIsValid;
  };

  const resetFormParam = () => {
    setFormParam({
      errors: {
        email: '',
      },
      submitted: false
    });
  }

  useEffect(() => {
    validateForm();
  }, [staffMemberId, priority, status, selectedDate, taskTitle]);

  const [options, setOptions] = useState([]);
  const getData = async (searchTerm) => {
    if (!searchTerm)
      setOptions([]);
    const axiosInstance = createAxiosInstance();
    const response = await axiosInstance.get(
      `${tenantVal}${PATIENT_SEARCH_AUTOCOMPLETE_URL}` + '/' + searchTerm
    );
    if (response && response.data && response.data.length > 0) {
      const updatedOptions = response.data.map((p) => {
        return {
          id: p.id,
          title: (p.firstName + (p.surname ? " " + p.surname : "") + (p.dateOfBirth ? (' (' + moment(p.dateOfBirth).format("DD-MM-YYYY") + ')') : '')),
        };
      });
      setOptions(updatedOptions);
    } else
      setOptions([]);
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
  const [patient, setPatient] = useState({});
  const [fullName, setFullName] = useState('');
  const [patientId, setPatientId] = useState('');
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
  return (
    <div className={`modal smamodal addTaskmodal custom-modal-wrap`} id="addTask_modal">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">{headerTitle}</h4>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              id='idClosePopupTask'
              aria-label="Close"
              onClick={resetFormParam}
            ></button>
          </div>

          <div className="modal-body">
            <form>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label>Patient name</label>
                  <Autocomplete

                    disablePortal
                    id="combo-box-demo"
                    value={fullName || null}
                    options={options}
                    getOptionLabel={(option) => (option && option.title ? option.title : fullName)}
                    onInputChange={onInputChange}
                    onChange={(event, newValue) => {
                      setFullName(newValue ? newValue.title : '');
                      setPatientId(newValue ? newValue.id : '');
                      setPatient(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} label="" placeholder="Search here..." />}
                    disabled={isPatientAutoCompleteDisabled}
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="requiredValidator">Assigned To </label>
                  <select
                    as="select"
                    className="form-select form-control custom-select"
                    onChange={handleChangeSelect}
                    value={staffMemberId}
                  >
                    <option value=''>Select</option>
                    {staffMember
                      ? staffMember.map((Staff) => (
                        <option value={Staff.id} key={Staff.id}>
                          {Staff.firstName} {Staff.lastName}
                        </option>
                      ))
                      : ""}
                  </select>
                  {formParam.submitted && (
                    <div className="errorMsg text-start">{formParam.errors.staffMemberId}</div>
                  )}
                </div>
                <div className="col-md-6 mb-3">
                  <label>From</label>

                  <input
                    type="text"
                    placeholder="Mathew"
                    className="form-control"
                    value={nameState}
                    disabled
                  />
                </div>
                <div className="col-md-6 mb-3">
                  <label
                  >Priority</label>
                  <div className="priorityform">
                    <div className={
                      priority == 0 ? "pridot" :
                        priority == 1 ? "pridotYellow" :
                          priority == 2 ? "pridotGreen" :
                            priority == -1 ? "pridotYellow" : ""
                    }></div>


                    <select
                      className="form-select form-control"
                      name="vat"
                      value={priority != -1 ? priority : 1}
                      onChange={(e) => setPriority(e.target.value)}
                    >
                      <option value={-1}>Select</option>
                      {TaskPriority.map((Priority, id) => (
                        <option value={Priority.value} key={id}>
                          {Priority.name}
                        </option>
                      ))}
                    </select>
                    {formParam.submitted && (
                      <div className="errorMsg text-start">{formParam.errors.priority}</div>
                    )}
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <label>Due date</label>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DatePicker', 'DatePicker']}>
                      <DatePicker
                        format="DD/MM/YYYY"
                        value={value ? value : dayjs().add(1, 'day')
                        }
                        sx={{ width: '100%' }}
                        onChange={(newValue) => {
                          setValue(newValue);
                          var d = new Date(dayjs(newValue));
                          setSelectedDate(moment(d).format("DD/MM/YYYY"));
                        }}

                      />
                    </DemoContainer>
                  </LocalizationProvider>
                  {formParam.submitted && (
                    <div className="errorMsg text-start">{formParam.errors.selectedDate}</div>
                  )}
                </div>
                <div className="col-md-6 mb-3">
                  <label>Status</label>
                  <select
                    className="form-select form-control"
                    name="vat"
                    value={status}
                    onChange={(e) => {
                      setStatus(e.target.value)
                    }}
                  >
                    <option>Select</option>
                    {Taskstatus.map((Status, id) => (
                      <option value={Status.value} key={id}>
                        {Status.name}
                      </option>
                    ))}
                  </select>
                  {formParam.submitted && (
                    <div className="errorMsg text-start">{formParam.errors.status}</div>
                  )}
                </div>
                <div className="col-md-12 mb-3">
                  <label className="requiredValidator">Task</label>
                  <textarea
                    className="form-control textareaform-control"
                    rows="3"
                    id="comment"
                    name="text"
                    placeholder="Write here..."
                    value={taskTitle}
                    onChange={(e) => setTaskTitle(e.target.value)}
                  ></textarea>
                  {formParam.submitted && (
                    <div className="errorMsg text-start">{formParam.errors.taskTitle}</div>
                  )}
                </div>
              </div>
            </form>
          </div>

          <div className="modal-footer">
            <button
              className="custom_btn savwidth"
              type="submit"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </div>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
    </div>
  );
};

export default TaskModal;
