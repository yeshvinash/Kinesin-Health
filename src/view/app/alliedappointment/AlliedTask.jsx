import React, { useState, useEffect } from "react";
import Nav from "../../../components/AfterLoginNav/Nav";
import srcicon from "../../../assets/images/srcicon.svg";
import filter from "../../../assets/images/filter.svg";
import editicon from "../../../assets/images/editicon.svg";
import removicon from "../../../assets/images/removicon.svg";
import Pagination from "../../../components/Pagination";
import TaskModal from "../../../components/Modal/TaskModal";
import DeleteModal from "../../../components/Modal/DeleteModal";
import moment from "moment";
import { Toaster, toast } from "react-hot-toast";
import { createAxiosInstance } from "../../../api/axiosConfig";
import {
  DELETE_TASK,
  TASK_CONTROLER_URL,
  TASK_CONTROLER_URL_OPEN_USER,
  TASK_CONTROLER_URL_ID,
  TASK_CONTROLER_CLOSE,
  TASK_CONTROLER_URL_CLOSED_USER
} from "../../../api/Service";
import { useDispatch, useSelector } from "react-redux";
import { Taskstatus } from "../../../Utils/Constant";
import DisplayTaskModal from "../../../components/Modal/DisplayTaskModal";
import { logoutFromHelper } from "../../../api/Helper";
import { logout } from "../../../redux/auth/AuthSlice";
import { removeuser } from "../../../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import {
  addPatientFullName,
  addPatientId,
} from "../../../redux/patient/PatientSlice";
import { Empty, Table } from "antd";
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';

let minLengthInOneRow = 20;
// static data //
const AlliedTask = () => {
  const [task, setTask] = useState([]); //State for taking static data
  const [closedtask, setclosedTask] = useState([]); //State for taking static data

  let nameState = useSelector((state) => state.auth.user?.name);
  if (!nameState) {
    nameState = localStorage.getItem('kinesin-name')
  }
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [sortBy, setSortBy] = useState(""); // State for sorting option
  const [sortOrder, setSortOrder] = useState("desc"); // State for sorting order

  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [modalHeaderTitle, setModalHeaderTitle] = useState(""); // State for modal header title
  const [showModal, setShowModal] = useState(false); // State for modal visibility

  const [selectedTaskId, setSelectedTaskId] = useState(null); //State for selected task id
  const [selectedTask, setSelectedTask] = useState({});
  const [showCompletedTasks, setShowCompletedTasks] = useState(false); //state for complete status

  const [currentPage, setCurrentPage] = useState(1); // For pagination state//
  const [dataFetching, setDataFetching] = useState(true);

  const [accessUser, setAccessUser] = useState([]);
  let tenantVal = useSelector((state) => state.auth.user?.tenant);
  if (!tenantVal) tenantVal = localStorage.getItem("kinesin-tenant");

  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [dynamicDataSource, setDynamicDataSource] = useState([]);

  //Add task handler//
  const handleAddTask = () => {
    setSelectedTask(null);
    setSelectedTaskId(null);
    setModalHeaderTitle("Add Task");
    setShowModal(true);
  };
  //Add task handler//
  //Save task handler//
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
  //Save task handler//

  // Edit task handler//

  const handleEditTask = async (datas, id) => {
    const selectedTask = datas.find((item) => item.id === id);
    if (selectedTask) {
      setSelectedTaskId(id);
      setSelectedTask(selectedTask);
      setModalHeaderTitle("Edit Task");
      setShowModal(true);
      try {
        const axiosInstance = createAxiosInstance();
        const url = `${tenantVal}${TASK_CONTROLER_URL_ID}${id}`;
        const response = await axiosInstance.get(url);
        setAccessUser(response.data);
      } catch (error) {
        errorHandling(error);
      }
    }
  };

  const openPatientSummaryPage = async (patientId, patientFullName) => {
    if (!patientId) return;
    dispatch(addPatientId(patientId));
    localStorage.setItem("kinesin-patientId", patientId);
    dispatch(addPatientFullName(patientFullName));
    navigate("/patient-detail");
  };

  const handleDisplayTask = async (datas, id) => {
    const selectedTask = datas.find((item) => item.id === id);
    if (selectedTask) {
      setSelectedTask(selectedTask);
    }
  };
  const handleDeleteTask = (id) => {
    setSelectedTaskId(id);
    setShowModal(false);
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
        // If showCompletedTasks is false and the deleted task is completed, show it again
        const isDeletedTaskCompleted = selectedTask?.status === "Complete";
        if (!showCompletedTasks && isDeletedTaskCompleted) {
          setShowCompletedTasks(true);
        }
        toast.success("Task deleted successfully.");
        if(showCompletedTasks){
          getClosedTasks()
        }else{

          fetchTask(); 
        }
      } catch (error) {
        errorHandling(error);
      }
    }
  };
  const fetchTask = async () => {
    try {
      let ar = [];
      const axiosInstance = createAxiosInstance();
      const response = await axiosInstance.get(
        `${tenantVal}${TASK_CONTROLER_URL_OPEN_USER}`
      );
      setTask(response.data);
      if (response && response.data) {
        setDataFetching(false);

        response.data.forEach((element) => {
          ar.push(
            {
              id: element.id,
              key: element.id,
              created: moment(element.created).format("DD/MM/YY hh:mmA"),
              pname: (element.patient && element.patient.firstName ? element.patient.firstName : '') + (element.patient && element.patient.surname ? (' ' + element.patient.surname) : ''),
              patientname: (
                <>
                  {
                    element && element.patient && element.patient.firstName && <a
                      href=""
                      onClick={(e) => {
                        e.preventDefault();
                        openPatientSummaryPage(
                          element.patient.id,
                          element.patient.firstName + (element.patient.surname ? (' ' + element.patient.surname) : '')
                        );
                      }}
                      className="patient-title-wrap"
                    >
                      {element.patient.firstName} {element.patient.surname}
                    </a>
                  }
                </>
              ),
              task: (
                <>
                  <p className="p_wrap" id={"note" + element.id}
                    data-bs-toggle="modal"
                    data-bs-target="#displayTask_modal"
                    onClick={() => handleDisplayTask(response.data, element.id)
                    }
                    style={{ cursor: 'pointer' }}

                  >
                    {" "}
                    {element && element.title
                      ? element.title
                      : "-"}
                  </p>
                </>
              ),
              assignedto: (element.assignedToStaff && element.assignedToStaff.firstName ? element.assignedToStaff.firstName : 'N/A') + (element.assignedToStaff && element.assignedToStaff.lastName ? element.assignedToStaff.lastName : ''),
              from: nameState,
              duedate: element.dueDate ? formatDate(element.dueDate) : "",
              priority: priorityLabels[element.priority],
              status: element.status,
              edit: (
                <>
                  <div className="action-icon-wrap edt_rmviconbox">
                    <button
                      type="submit"
                      className="deletebtn"
                      data-bs-toggle="modal"
                      data-bs-target="#addTask_modal"
                      onClick={() => handleEditTask(response.data, element.id)}
                    >
                      <img src={editicon} alt="" />
                    </button>
                    <button
                      type="button"
                      className="deletebtn"
                      data-bs-toggle="modal"
                      data-bs-target="#myModal"
                      onClick={() => handleDeleteTask(element.id)}
                    >
                      <img src={removicon} alt="" />
                    </button>
                  </div>
                </>
              ),
            }
          );
        });
        setDynamicDataSource(ar);
        setIsPageLoaded(true);
      }
    } catch (error) {
      errorHandling(error);
    }
  };
  const getClosedTasks = async () => {
    try {
      let ar = [];
      const axiosInstance = createAxiosInstance();
      const response = await axiosInstance.get(
        `${tenantVal}${TASK_CONTROLER_URL_CLOSED_USER}`
      );
      if (response && response.data) {
        setDataFetching(false);

        response.data.forEach((element) => {
          ar.push(
            {
              id: element.id,
              key: element.id,
              created: moment(element.created).format("DD/MM/YY hh:mmA"),
              pname: (element.patient && element.patient.firstName ? element.patient.firstName : '') + (element.patient && element.patient.surname ? (' ' + element.patient.surname) : ''),
              patientname: (
                <>
                  {
                    element && element.patient && element.patient.firstName && <a
                      href=""
                      onClick={(e) => {
                        e.preventDefault();
                        openPatientSummaryPage(
                          element.patient.id,
                          element.patient.firstName + (element.patient.surname ? (' ' + element.patient.surname) : '')
                        );
                      }}
                      className="patient-title-wrap"
                    >
                      {element.patient.firstName} {element.patient.surname}
                    </a>
                  }
                </>
              ),
              task: (
                <>
                  <p className="p_wrap" id={"note" + element.id}
                    data-bs-toggle="modal"
                    data-bs-target="#displayTask_modal"
                    onClick={() => handleDisplayTask(response.data, element.id)
                    }
                    style={{ cursor: 'pointer' }}

                  >
                    {" "}
                    {element && element.title
                      ? element.title
                      : "-"}
                  </p>
                </>
              ),
              assignedto: (element.assignedToStaff && element.assignedToStaff.firstName ? element.assignedToStaff.firstName : 'N/A') + (element.assignedToStaff && element.assignedToStaff.lastName ? element.assignedToStaff.lastName : ''),
              from: nameState,
              duedate: element.dueDate ? formatDate(element.dueDate) : "",
              priority: priorityLabels[element.priority],
              status: element.status,
              edit: (
                <>
                  <div className="action-icon-wrap edt_rmviconbox">
                    <button
                      type="submit"
                      className="deletebtn"
                      data-bs-toggle="modal"
                      data-bs-target="#addTask_modal"
                      onClick={() => handleEditTask(response.data, element.id)}
                    >
                      <img src={editicon} alt="" />
                    </button>
                    <button
                      type="button"
                      className="deletebtn"
                      data-bs-toggle="modal"
                      data-bs-target="#myModal"
                      onClick={() => handleDeleteTask(element.id)}
                    >
                      <img src={removicon} alt="" />
                    </button>
                  </div>
                </>
              ),
            }
          );
        });
        setDynamicDataSource(ar)
        setIsPageLoaded(true);
        setFilterTable(ar)

      }
      setclosedTask(response.data)
    } catch (error) {
      errorHandling(error)
    }
  }
  useEffect(() => {
    if (showCompletedTasks) {
      getClosedTasks();
    } else {
      fetchTask();
    }
  }, [tenantVal]);

  useEffect(() => {
    setCurrentPage(1);
    if (showCompletedTasks) {
      getClosedTasks();
    } else {
      fetchTask();
    }
  }, [showCompletedTasks]);

  useEffect(() => {
    setCurrentPage(1);

    let ans = dynamicDataSource.filter(
      (f) => f.pname && f.pname.toLowerCase().includes(searchKeyword ? searchKeyword.toLowerCase() : '')
    );
    setFilterTable(ans);

  }, [searchKeyword]);

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
      if (showCompletedTasks) {
        getClosedTasks();
      } else {
        fetchTask();
      }
    } catch (error) {
      errorHandling(error);
    }
  };
  // Status change handler//
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchKeyword(query);
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
      if (response.status == 200) {
        setShowModal(false)
        toast.success(
          "Task completed successfully."
        );
      }
      if (showCompletedTasks) {
        getClosedTasks();
      } else {
        fetchTask();
      }
    } catch (error) {
      errorHandling(error)
    }
  }
  const itemsPerPage = 10; // Number of items to display per page

  // Calculate the total number of pages based on the number of items and itemsPerPage
  let totalPages = Math.ceil(task.length / itemsPerPage);

  // Get the current items to display based on the currentPage
  let indexOfLastItem = currentPage * itemsPerPage;
  let indexOfFirstItem = indexOfLastItem - itemsPerPage;

  let currentItems;
  if (showCompletedTasks) {
    let ans = task.filter(
      (f) => f.status && f.status.toLowerCase() == "complete"
    );

    if (searchKeyword)
      ans = ans.filter(
        (f) =>
          f.patient &&
          f.patient.firstName &&
          f.patient.firstName
            .toLowerCase()
            .includes(searchKeyword ? searchKeyword.toLowerCase() : "")
      );

    totalPages = Math.ceil(ans.length / itemsPerPage);
    indexOfLastItem = currentPage * itemsPerPage;
    indexOfFirstItem = indexOfLastItem - itemsPerPage;

    currentItems = ans.slice(indexOfFirstItem, indexOfLastItem);
  } else {
    let ans = task;

    if (searchKeyword)
      ans = ans.filter(
        (f) =>
          f.patient &&
          f.patient.firstName &&
          f.patient.firstName
            .toLowerCase()
            .includes(searchKeyword ? searchKeyword.toLowerCase() : "")
      );

    totalPages = Math.ceil(ans.length / itemsPerPage);
    indexOfLastItem = currentPage * itemsPerPage;
    indexOfFirstItem = indexOfLastItem - itemsPerPage;

    currentItems = ans.slice(indexOfFirstItem, indexOfLastItem);
  }
  const priorityLabels = {
    0: "High",
    1: "Medium",
    2: "Low",
  };

  const formatDate = (dueDate) => {
    const formattedDueDate = moment(dueDate).format("DD/MM/YY");
    return formattedDueDate;
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


  const customSortIcons = {
    ascend: <CaretUpOutlined />,
    descend: <CaretDownOutlined />,
  };

  const dataSource = [
    {
      key: "1",
      created: "29/03/24 07:15AM",
      patientname: "Krupa Patel",
      task: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      assignedto: "Darren",
      from: "",
      duedate: "",
      priority: "High",
      status: "Performed",
      edit: (
        <>
          <div className="action-icon-wrap edt_rmviconbox">
            <button
              type="submit"
              className="deletebtn"
              data-bs-toggle="modal"
              data-bs-target="#addTask_modal"
            >
              <img src={editicon} alt="" />
            </button>
            <button
              type="button"
              className="deletebtn"
              data-bs-toggle="modal"
              data-bs-target="#myModal"
            >
              <img src={removicon} alt="" />
            </button>
          </div>
        </>
      ),
    },
    {
      key: "2",
      created: "29/03/24 07:40AM",
      patientname: "Vishwas Patel",
      task: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      assignedto: "Darren",
      from: "",
      duedate: "",
      priority: "Low",
      status: "Performed",
      edit: (
        <>
          <div className=" action-icon-wrap edt_rmviconbox ">
            <button
              type="submit"
              className="deletebtn"
              data-bs-toggle="modal"
              data-bs-target="#addTask_modal"
            >
              <img src={editicon} alt="" />
            </button>
            <button
              type="button"
              className="deletebtn"
              data-bs-toggle="modal"
              data-bs-target="#myModal"
            >
              <img src={removicon} alt="" />
            </button>
          </div>
        </>
      ),
    },
  ];


  const [filterTable, setFilterTable] = useState([]);
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });
  };

  const columns = [
    {
      title: "Created",
      dataIndex: "created",
      key: "created",
      sorter: (a, b) => moment(a.created, "DD/MM/YY hh:mm A") - moment(b.created, "DD/MM/YY hh:mm A"),
      sortDirections: ["ascend", "descend"],
      render: (text, record) => (
        <div>
          {text}
          {/* Use custom sort icons based on column sort order */}
          {record.sortOrder && customSortIcons[record.sortOrder]}
        </div>
      ),
    },
    {
      title: "Patient Name",
      dataIndex: "patientname",
      key: "patientname",
      sorter: (a, b) => a.pname.length - b.pname.length,
      sortDirections: ["ascend", "descend"],
      render: (text, record) => (
        <a href="javascript:void(0)">
          {text}
          {/* Use custom sort icons based on column sort order */}
          {record.sortOrder && customSortIcons[record.sortOrder]}
        </a>
      ),
    },
    {
      title: "Task",
      dataIndex: "task",
      key: "task",
    },
    {
      title: "Assigned To",
      dataIndex: "assignedto",
      key: "assignedto",
    },
    {
      title: "From",
      dataIndex: "from",
      key: "from",
    },
    {
      title: "Due Date",
      dataIndex: "duedate",
      key: "duedate",
      sorter: (a, b) => moment(a.duedate, "DD/MM/YY hh:mm A") - moment(b.duedate, "DD/MM/YY hh:mm A"),
      sortDirections: ["ascend", "descend"],
      render: (text, record) => (
        <div>
          {text}
          {/* Use custom sort icons based on column sort order */}
          {record.sortOrder && customSortIcons[record.sortOrder]}
        </div>
      ),
    },
    {
      title: "Priority",
      dataIndex: "priority",
      key: "priority",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Edit",
      dataIndex: "edit",
      key: "edit",
    },
  ];

  return (
    <div>
      {/* <Nav /> */}
      <div className="dashBcontbody">
        {/* Heading */}
        <div className="patientsheading">
          <div className="patientsearchbar my-task-wrap">
            <h3 className="name">My Tasks</h3>
            {/* Toogle button */}
            <div className="form-check form-switch onoff_area ml-auto">
              <input
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="flexSwitchCheckDefault2"
                onChange={() => setShowCompletedTasks(!showCompletedTasks)}
                checked={showCompletedTasks}
              />
              <label className="form-check-label" for="flexSwitchCheckDefault2">
                Show completed tasks
              </label>
            </div>
            {/* Toogle button */}

            <div className="d-flex align-items-center allied-documents-wrap">
              {/* Search Field */}
              <div className="search_bar">
                <input
                  type="search"
                  className="form-control"
                  placeholder="Search patient here..."
                  value={searchKeyword}
                  onChange={handleSearchChange}
                />
                <img src={srcicon} alt="" />
                <img className="filterIcon" src={filter} alt="" />
              </div>
              <div className="btnxscenter">
                <button
                  className="custom_btn addform_btn"
                  type="submit"
                  data-bs-toggle="modal"
                  data-bs-target="#addTask_modal"
                  onClick={handleAddTask}
                >
                  + Add New Task
                </button>
              </div>
            </div>
            {/* Add Task Button */}
          </div>
        </div>
        {/* Heading */}

        {/* Table */}
        <div className="signup_threebox my_tasks mt-0 table-header-wrap">
      
          <Toaster position="top-center" reverseOrder={false} />
        
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
            setModalHeaderTitle={setModalHeaderTitle}
            handleSaveTask={handleSaveTask}
            showModal={showModal}
            setShowModal={setShowModal}
            task={selectedTask}
            staffMemberId={null}
            setStaffMemberId={null}
            setSelectedTaskId={setSelectedTaskId}
            createNewTask={createNewTask}
            selectedTaskId={selectedTaskId}
            handleCloseTask={handleCloseTask}
          />
          {/* Delete modal */}
          <DeleteModal deleteService={deleteTask} context="task" />
          {/* Delete modal */}
        </div>
        {/* Table */}

        <div className="custom-table-wrapper task-table">
          <Table
            dataSource={showCompletedTasks || searchKeyword ? filterTable : dynamicDataSource}
            columns={columns}
            locale={{
              emptyText: isPageLoaded ? (
                <Empty description='No Records Found' />
              ) :
                <p></p>
            }}
            pagination={tableParams.pagination}
            onChange={handleTableChange}
          />
        </div>
      </div>
    </div>
  );
};

export default AlliedTask;
