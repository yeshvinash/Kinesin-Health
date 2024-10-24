import React, { useEffect, useState } from "react";
import "../../../assets/css/allied_settings.css";
import Nav from "../../../components/AfterLoginNav/Nav";
import editicon from "../../../assets/images/editicon.svg";
import removicon from "../../../assets/images/removicon.svg";
import Tab from "../../../components/SettingsTab/Tab";
import DeleteModal from "../../../components/Modal/DeleteModal";
import UserModal from "../../../components/Modal/UserModal";
import worning from "../../../assets/images/worning.svg";
import SmsModal from "../../../components/Modal/SmsModal";

import {
  STAFF_MEMBERS_CONTROLER_URL,
  STAFF_MEMBERS_CONTROLER_URL_ID,
  STAFF_MEMBERS_CONTROLER_URL_ID_DISABLE,
  STAFF_MEMBERS_DELETE_URL,
} from "../../../api/Service";
import { createAxiosInstance } from "../../../api/axiosConfig";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { logoutFromHelper } from "../../../api/Helper";
import { useNavigate } from "react-router-dom";
import { logout } from "../../../redux/auth/AuthSlice";
import { removeuser } from "../../../redux/user/userSlice";
import { Empty, Table } from "antd";

const user_option = [

];
const UserDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [active, setActive] = useState([]); //  For toggle switch enable/disable State//
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState([]);
  const [modalHeaderTitle, setModalHeaderTitle] = useState(""); // State for modal header title
  const [selectedTaskId, setSelectedTaskId] = useState(null); //State for selected task id
  const [selectedTask, setSelectedTask] = useState({});
  const [selectAllChecked, setSelectAllChecked] = useState(false);
  const [selectedUsersForSMS, setSelectedUsersForSMS] = useState([]);
  const [accessUser, setAccessUser] = useState([]);
  const [dataFetching, setDataFetching] = useState(true);


  let tenantVal = useSelector((state) => state.auth.user?.tenant);
  if (!tenantVal) tenantVal = localStorage.getItem("kinesin-tenant");

  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [dynamicDataSource, setDynamicDataSource] = useState([]);

  //Add user handler//
  const handleAddTask = () => {
    setSelectedTask(null);
    setSelectedTaskId(null);
    setModalHeaderTitle("Add New User");
    setShowModal(true);
  };
  //Add user handler//

  const createNewUser = async (userData) => {
    try {
      const axiosInstance = createAxiosInstance();
      let response;
      if (selectedTaskId) {
        // If selectedTaskId is not null, it means we are editing an existing task
        const editedData = { ...userData, id: selectedTaskId };
        console.log("below editedData");
        console.log(editedData);
        response = await axiosInstance.post(
          // `${tenantVal}${STAFF_MEMBERS_CONTROLER_URL}/${selectedTaskId}`,

          `${tenantVal}${STAFF_MEMBERS_CONTROLER_URL}`,
          editedData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        // toast.success("User updated successfully");
      } else {
        response = await axiosInstance.post(
          `${tenantVal}${STAFF_MEMBERS_CONTROLER_URL}`,
          userData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        // toast.success("New User created successfully");
      }
      console.log(response.data);
      if (selectedTaskId) {
        const updatedTasks = user.map((item) =>
          item.id === selectedTaskId ? { ...item, ...response.data } : item
        );
        setUser(updatedTasks);
        toast.success("User updated successfully");
      } else {
        setUser((prevService) => [...prevService, response.data]);
        toast.success("New User created successfully");
      }
      setShowModal(false);
      fetchUser();
      //fetchUser();
    } catch (error) {
      errorHandling(error);
    }
  };

  const saveAccessUser = async () => {
    const modifiedUser = {
      title: accessUser.title,
      firstName: accessUser.firstName,
      lastName: accessUser.lastName,
      mainRole: accessUser.mainRole,
      disabled: !accessUser.disabled,
      middleNames: "",
      qualification: "",
      qualificationLetters: accessUser.qualifications,
      specialism: accessUser.specialisation,
      bio: accessUser.bio,
      mobile: accessUser.mobile,
      email: accessUser.email,
      homeNumber: accessUser.homeNumber,
      profilePic: accessUser.selectedImage,
      tenant: tenantVal,
      systemAccess: accessUser.systemAccess,
      showOnTeam: accessUser.showOnTeam,
      id: accessUser.id,
    };

    try {
      const axiosInstance = createAxiosInstance();
      const response = await axiosInstance.post(
        `${tenantVal}${STAFF_MEMBERS_CONTROLER_URL_ID_DISABLE}`,
        modifiedUser,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response.data);
      fetchUser();
    } catch (error) {
      errorHandling(error);
    }
  };

  //Save task handler//

  const handleSaveTask = (newTask) => {
    let updatedStatus = newTask.status; // Declare a variable to hold the updated status

    if (selectedTaskId) {
      // Edit existing task
      const updatedTasks = user.map((item) =>
        item.id === selectedTaskId
          ? { ...newTask, status: updatedStatus }
          : item
      );
      setUser(updatedTasks);
    } else {
      // Add new task
      const updatedTasks = [...user, newTask];
      setUser(updatedTasks);
    }

    setShowModal(false);
  };
  //Save task handler//

  // Edit task handler//

  const handleEditTask = async (datas, id) => {
    console.log("handleEditTask called..  ");
    const selectedTask = datas.find((item) => item.id === id);
    if (selectedTask) {
      setSelectedTaskId(id);
      setSelectedTask(selectedTask);
      setModalHeaderTitle("Edit User");
      setShowModal(true);
      try {
        const axiosInstance = createAxiosInstance();
        const url = `${tenantVal}${STAFF_MEMBERS_CONTROLER_URL_ID}${id}`;
        const response = await axiosInstance.get(url);
        console.log(
          "handleEditTask response :  " + JSON.stringify(response.data)
        );
        setAccessUser(response.data);
        // console.log(response.data);
      } catch (error) {
        errorHandling(error);
      }
    }
  };
  console.log(accessUser, "==>225");
  // Edit task handler//

  // Delete task handler//

  const handleDeleteuser = (id) => {
    const selectedUser = user.find((item) => item.id === id);
    console.log("dddddddddd : " + id);
    if (selectedUser) {
      setSelectedTaskId(id);
      setSelectedTask(selectedUser);
      setSelectedTaskId(id);
      setShowModal(true); // Show the modal when delete button is clicked
    }
  };

  const deleteTask = async () => {
    console.log("deleteTask called vishvas.." + selectedTaskId);
    if (selectedTaskId) {
      try {
        const axiosInstance = createAxiosInstance();
        const url = `${tenantVal}${STAFF_MEMBERS_DELETE_URL}`;
        await axiosInstance.delete(url, {
          data: {
            id: selectedTaskId,
            tenant: tenantVal,
          },
        });

        // Filter the task array to remove the selected task
        const updatedTasks = user.filter((item) => item.id !== selectedTaskId);
        // Update the task state with the updatedTasks array
        setUser(updatedTasks);

        toast.success("User deleted successfully.");
      } catch (error) {
        errorHandling(error);
      }
      fetchUser();
    }

    setShowModal(false); // Hide the modal after deletion
  };
  // Delete task handler//

  // Checkbox Change Handler
  const handleCheckboxChange = (itemId) => {
    const updatedUser = user.map((item) =>
      item.id === itemId ? { ...item, checked: !item.checked } : item
    );
    setUser(updatedUser);

    // Update selectedUsersForSMS based on checked checkboxes
    const selectedForSMS = updatedUser
      .filter((item) => item.checked)
      .map((item) => item.id);
    setSelectedUsersForSMS(selectedForSMS);

    const allChecked = updatedUser.every((item) => item.checked);
    setSelectAllChecked(allChecked);
  };

  // Close Button Click Handler for SMS modal
  const handleSMSModalClose = (userId) => {
    const updatedUser = user.map((item) =>
      item.id === userId ? { ...item, checked: false } : item
    );
    setUser(updatedUser);

    // Update selectedUsersForSMS based on checked checkboxes
    const selectedForSMS = updatedUser
      .filter((item) => item.checked)
      .map((item) => item.id);
    setSelectedUsersForSMS(selectedForSMS);
  };

  const handleSelectAllCheckboxChange = () => {
    const updatedUser = user.map((item) => ({
      ...item,
      checked: !selectAllChecked,
    }));
    setUser(updatedUser);
    setSelectAllChecked(!selectAllChecked);
  };

  useEffect(() => {
    fetchUser();
  }, [tenantVal]);

  const fetchUser = async () => {
    try {
      let ar = [];
      const axiosInstance = createAxiosInstance();
      const response = await axiosInstance.get(
        `${tenantVal}${STAFF_MEMBERS_CONTROLER_URL}`
      );
      // console.log(response.data);
      // alert("hii")
      if (response && response.data) {
        setDataFetching(false)
        setUser(response.data);

        response.data.forEach((element) => {
          ar.push(
            {
              id: element.id,
              key: element.id,
              firstName: element.firstName + (element.lastName ? (' ' + element.lastName) : ''),
              mainRole: element.mainRole,
              access: (
                <div className="form-check form-switch onoff_area">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    data-bs-toggle="modal"
                    data-bs-target="#warningmodal"
                    onClick={() => handleEditTask(response.data, element.id)}
                    checked={!element.disabled}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`flexSwitchCheckDefault${element.id}`}
                  >
                    {!element.disabled ? "Enable" : "Disable"}
                  </label>
                </div>
              ),
              edit: (
                <>
                  <div className="action-icon-wrap edt_rmviconbox">
                    <button
                      type="submit"
                      className="deletebtn"
                      data-bs-toggle="modal"
                      data-bs-target="#userModal"
                      onClick={() => handleEditTask(response.data, element.id)}
                    >
                      <img src={editicon} alt="" />
                    </button>
                    <button
                      type="button"
                      className="deletebtn"
                      data-bs-toggle="modal"
                      data-bs-target="#myModal"
                      onClick={() => handleDeleteuser(element.id)}
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

  const dataSource = [
    {
      key: "1",
      name: "Appointment",
      role: "doctor",
      access: (
        <div className="form-check form-switch onoff_area">
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
          />
          <label className="form-check-label">Enabled</label>
        </div>
      ),
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
      name: "John Doe",
      role: "receptionist",
      access: (
        <div className="form-check form-switch onoff_area">
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
          />
          <label className="form-check-label">Enabled</label>
        </div>
      ),
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
      title: "Name",
      dataIndex: "firstName",
      key: "firstName",
      sorter: (a, b) => a.firstName.length - b.firstName.length,
      sortDirections: ["ascend", "descend"],
      onFilter: (value, record) => record.firstName.startsWith(value),
      filterSearch: true,
    },
    {
      title: "Role",
      dataIndex: "mainRole",
      key: "mainRole",
      // sorter: (a, b) => a.mainRole.length - b.mainRole.length,
      // sortDirections: ["ascend", "descend"],
      onFilter: (value, record) => record.mainRole.startsWith(value),
      filterSearch: true,
    },
    {
      title: "Access",
      dataIndex: "access",
      key: "access",
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
        <div className="patientsheading">
          <div className="patientsearchbar">
            <h3 className="name">Settings - User Details</h3>
            <div className="btnxscenter ml-auto">
              {/* <button
                className="custom_btn addform_btn rmargin"
                type="button"
                data-bs-toggle="modal"
                // data-bs-target="#warningmodal"
                data-bs-target="#sendSma_modal"
              >
                Send SMS
              </button> */}
              <button
                className="custom_btn addform_btn"
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#userModal"
                onClick={handleAddTask}
              >
                + Add New Users
              </button>
            </div>
          </div>
        </div>

        {/* start user_details section */}
        <div className="signup_threebox practice_detailssect mt-0 table-header-wrap">
          <Tab />
          <div
            className="tab-content ptdetalistabcont user_detailsboxtab"
            id="pills-tabContent"
          >
            {/* start User Details */}
            <div className="show active">
              <div className="addpatientlist">
                <div className="user_detailsbox">
             
                  {/* Disable Modal */}
                  <div className="modal warningmodal_box" id="warningmodal">
                    <div className="modal-dialog modal-dialog-centered">
                      <div className="modal-content">
                        <div className="modal-header">
                          <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>

                        <div className="modal-body">
                          <div className="worningimg">
                            <img src={worning} alt="" />
                          </div>
                          <h5>Warning</h5>
                          <p>
                            {
                              user.find((item) => item.id === selectedTaskId)
                                ?.firstName
                            }
                            {user.find(
                              (item) =>
                                item.id === selectedTaskId && !item.disabled
                            )
                              ? " Do you want to Disable ?"
                              : " Do you want to Enable ?"}
                          </p>
                        </div>

                        <div className="modal-footer justify-content-center">
                          <button
                            data-bs-dismiss="modal"
                            aria-label="Close"
                            className="cancelbtnlink"
                            type="submit"
                            onClick={() => setShowModal(false)}
                          >
                            Cancel
                          </button>
                          <button
                            className="yesbtn"
                            data-bs-dismiss="modal"
                            type="submit"
                            onClick={() => {
                              setShowModal(false);
                              // if (modalHeaderTitle === "Disable User") {
                              //   // Perform the desired action, such as disabling the user
                              //   const updatedUser = user.map((item) =>
                              //     item.id === selectedTaskId
                              //       ? { ...item, enabled: false }
                              //       : item
                              //   );
                              //   setUser(updatedUser);
                              // }

                              // const updatedData = user.map((item) => {
                              //   if (item.id === selectedTaskId) {
                              //     return { ...item, disabled: !item.disabled };
                              //   }
                              //   return item;
                              // });

                              // // Update the state with the modified array
                              // setUser(updatedData);
                              // alert("Hii")
                              saveAccessUser();
                            }}
                          >
                            Yes
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* Disable Modal */}

                  {/* Table Start  */}
                  <div className="custom-table-wrapper service-table">
                    <Table
                      dataSource={filterTable && filterTable.length > 0 ? filterTable : dynamicDataSource}
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
                  {/* Table End */}
                </div>
              </div>
              <SmsModal
                tenantVal={tenantVal}
                selectedUsers={selectedUsersForSMS}
                user_option={user_option}
                handleSMSModalClose={handleSMSModalClose}
                selectAllChecked={selectAllChecked}
              />
              <DeleteModal
                deleteService={deleteTask}
                context="user"
                itemName={selectedTask?.firstName}
              />
              {/* User modal for add/edit */}
              <UserModal
                headerTitle={modalHeaderTitle}
                handleSaveTask={handleSaveTask}
                editTaskId={selectedTaskId}
                task={user}
                setShowModal={setShowModal}
                createNewUser={createNewUser}
              />
              {/* User modal for add/edit */}
              <Toaster position="top-center" reverseOrder={false} />
            </div>
            {/* end User Details */}
          </div>
        </div>
        {/* end user_details section */}
      </div>
    </div>
  );
};

export default UserDetails;
