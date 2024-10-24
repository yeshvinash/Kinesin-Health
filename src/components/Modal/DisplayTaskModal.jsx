import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import { createAxiosInstance } from "../../api/axiosConfig";
import TaskModal from "../../components/Modal/TaskModal";
import { Toaster, toast } from "react-hot-toast";
import {
  PATIENT_SEARCH_AUTOCOMPLETE_URL,
  STAFF_MEMBERS_CONTROLER_URL,
  STAFF_MEMBERS_CONTROLER_URL_ID,
  TASK_CONTROLER_CLOSE,
  TASK_CONTROLER_URL_ID,
} from "../../api/Service";
import { useDispatch, useSelector } from "react-redux";
import { TaskPriority, Taskstatus } from "../../Utils/Constant";
import $ from "jquery";
import { Autocomplete, TextField } from "@mui/material";
import {
  addPatientFullName,
  addPatientId,
} from "../../redux/patient/PatientSlice";
import { logoutFromHelper } from "../../api/Helper";
import { logout } from "../../redux/auth/AuthSlice";
import { removeuser } from "../../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
const DisplayTaskModal = ({
  headerTitle,
  showModal,
  setShowModal,
  task,
  staffMemberId,
  setStaffMemberId,
  handleCloseTask,
  handleSaveTask,
  setModalHeaderTitle,
  createNewTask,
  selectedTaskId,
  setSelectedTaskId,
}) => {
  const [selectedTask, setSelectedTask] = useState({});

  let tenantVal = useSelector((state) => state.auth.user?.tenant);
  if (!tenantVal) tenantVal = localStorage.getItem("kinesin-tenant");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let nameState = useSelector((state) => state.auth.user?.name);
  if (!nameState) {
    nameState = localStorage.getItem("kinesin-name");
  }
  const handleEditTask = async (id) => {
    if (task) {
      setSelectedTaskId(id);
      setSelectedTask(task);
      setModalHeaderTitle("Edit Task");
      setShowModal(true);
      try {
        const axiosInstance = createAxiosInstance();
        const url = `${tenantVal}${TASK_CONTROLER_URL_ID}${id}`;
        const response = await axiosInstance.get(url);
      } catch (error) {
        errorHandling(error);
      }
    }
  };

  const modalClose = async (id) => {
    handleCloseTask(id);
    if (setStaffMemberId) setStaffMemberId("");
    setShowModal(false);
    $("#idClosePopupTask").trigger("click");
  };
  const priorityLabels = {
    0: "High",
    1: "Medium",
    2: "Low",
  };

  const openPatientSummaryPage = async (patientId, patientFullName) => {
    if (!patientId) return;
    dispatch(addPatientId(patientId));
    localStorage.setItem("kinesin-patientId", patientId);
    dispatch(addPatientFullName(patientFullName));
    navigate("/patient-detail");
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
  return (
    <div
      className={`modal smamodal addTaskmodal custom-modal-wrap`}
      id="displayTask_modal"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h4 className="modal-title">{headerTitle}</h4>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              id="idClosePopup"
              aria-label="Close"
            ></button>
          </div>

          <div className="modal-body">
            <form>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label>Patient name </label>
                  <br></br>
                  <button
                    type="button"
                    data-bs-dismiss="modal"
                    id="idClosePopup"
                    aria-label="Close"
                    onClick={(e) => {
                      e.preventDefault();
                      if (task && task.patient)
                        openPatientSummaryPage(
                          task.patient.id,
                          task.patient.firstName + " " + task.patient.surname
                        );
                    }}
                    className="patient-name-wrap"
                  >
                    {task && task.patient
                      ? task.patient.firstName + " " + task.patient.surname
                      : "-"}
                  </button>
                </div>
                <div className="col-md-6 mb-3">
                  <label>Assigned To</label>
                  <p>
                    {task && task.assignedToStaff
                      ? task.assignedToStaff.firstName +
                        " " +
                        task.assignedToStaff.lastName
                      : "-"}
                  </p>
                </div>
                <div className="col-md-6 mb-3">
                  <label>From</label>
                  <p>{nameState}</p>
                </div>
                <div className="col-md-6 mb-3">
                  <label>Priority</label>
                  <div className="priorityform">
                    <p>{task ? priorityLabels[task.priority] : "-"} </p>
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <label>Due date</label>
                  <p>{task && task.dueDate ? task.dueDate : "-"}</p>
                </div>
                <div className="col-md-6 mb-3">
                  <label>Status</label>
                  <p>{task && task.status ? task.status : "-"}</p>
                </div>
                <div className="col-md-12 mb-3">
                  <label>Task</label>
                  <p>{task && task.title ? task.title : "-"}</p>
                </div>
              </div>
            </form>
          </div>
          <div className="modal-footer task-info-modal-footer">
            {task && task.status !== "Complete" && (
              <Button
                className="custom_btn  addform_btn complete-task-btn"
                data-bs-dismiss="modal"
                onClick={() => {
                  modalClose(task.id);
                }}
              >
                Complete Task
              </Button>
            )}
            <Button
              className="custom_btn"
              data-bs-toggle="modal"
              data-bs-target="#addTask_modal"
              onClick={() => handleEditTask(task.id)}
            >
              <span>Edit Task</span>
            </Button>
            <Button
              className="custom_btn red"
              data-bs-dismiss="modal"
              id="idClosePopup"
              aria-label="Close"
            >
              <span> Cancel </span>
            </Button>
          </div>
        </div>
      </div>
      <TaskModal
        headerTitle={"Edit Task"}
        handleSaveTask={handleSaveTask}
        showModal={showModal}
        setShowModal={setShowModal}
        editTaskId={selectedTaskId}
        task={task}
        createNewTask={createNewTask}
        selectedTaskForEdit={task}
      />
    </div>
  );
};

export default DisplayTaskModal;
