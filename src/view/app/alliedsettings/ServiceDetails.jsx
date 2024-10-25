import React, { useEffect, useState } from "react";
import Nav from "../../../components/AfterLoginNav/Nav";
import Tab from "../../../components/SettingsTab/Tab";
import "../../../assets/css/allied_settings.css";
import editicon from "../../../assets/images/editicon.svg";
import removicon from "../../../assets/images/removicon.svg";
import DeleteModal from "../../../components/Modal/DeleteModal";
import ServiceModal from "../../../components/Modal/ServiceModal";
import Pagination from "../../../components/Pagination";
import {
  PRACTICE_SERVICE_CONTROLER_URL,
  PRACTICE_SERVICE_CONTROLER_URL_ID,
  PRACTICE_SERVICE_DELETE_URL,
  PRACTICE_SERVICE_DISABLE_CONTROLER_URL,
} from "../../../api/Service";
import { createAxiosInstance } from "../../../api/axiosConfig";
import { useDispatch, useSelector } from "react-redux";
import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { logoutFromHelper } from "../../../api/Helper";
import { logout } from "../../../redux/auth/AuthSlice";
import { removeuser } from "../../../redux/user/userSlice";
import { Button, ConfigProvider, Empty, Input, Result, Table } from "antd";



const ServiceDetails = () => {
  const [service, setService] = useState([]);
  const [active, setActive] = useState([]);
  const [selectedTask, setSelectedTask] = useState({});
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [modalHeaderTitle, setModalHeaderTitle] = useState("");
  const [error, setError] = useState(null);
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);

  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [dynamicDataSource, setDynamicDataSource] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  let tenantVal = useSelector((state) => state.auth.user?.tenant);
  if (!tenantVal) tenantVal = localStorage.getItem("kinesin-tenant");

  const handleAddTask = () => {
    setSelectedTask(null);
    setSelectedTaskId(null);
    setModalHeaderTitle("Add Service");
    setIsServiceModalOpen(true);
  };

  const createNewService = async (userData) => {
    try {
      const axiosInstance = createAxiosInstance();
      let response;
      if (selectedTaskId) {
        // If selectedTaskId is not null, it means we are editing an existing task
        const editedData = { ...userData, id: selectedTaskId };
        response = await axiosInstance.post(
          `${tenantVal}${PRACTICE_SERVICE_CONTROLER_URL}`,
          editedData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      } else {
        response = await axiosInstance.post(
          `${tenantVal}${PRACTICE_SERVICE_CONTROLER_URL}`,
          userData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      }
      if (selectedTaskId) {
        const updatedTasks = service.map((item) =>
          item.id === selectedTaskId ? { ...item, ...response.data } : item
        );
        setService(updatedTasks);
        toast.success("Service updated successfully");
      } else {
        setService((prevService) => [...prevService, response.data]);
        toast.success("New service created successfully");
      }

      fetchService();

    } catch (error) {
      toast.error(error.message);
      if (error && error.response && error.response.status) {
        if (error.response.status == 403) {
          logoutFromHelper();
          dispatch(logout());
          dispatch(removeuser());
          navigate("/logout");
        }
      }

      console.error("Error creating user:", error);

      // Extract the error message from the response and pass it to the ServiceModal
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("An error occurred while creating the service.");
      }
    }
  };

  const handleSaveTask = (newTask) => {
    let updatedStatus = newTask.status;
    if (selectedTaskId) {
      const updatedTasks = service.map((item) =>
        item.id === selectedTaskId
          ? { ...newTask, status: updatedStatus }
          : item
      );
      setService(updatedTasks);
    } else {
      const updatedTasks = [...service, newTask];
      setService(updatedTasks);
    }
    setIsServiceModalOpen(false);
  };

  const handleEditTask = async (datas, id) => {
    const selectedTask = datas.find((item) => item.id === id);
    if (selectedTask) {
      setSelectedTaskId(id);
      setSelectedTask(selectedTask);
      setModalHeaderTitle("Edit Service");
      try {
        const axiosInstance = createAxiosInstance();
        const url = `${tenantVal}/${PRACTICE_SERVICE_CONTROLER_URL_ID}${id}`;
        const response = await axiosInstance.get(url);
      } catch (error) {
        toast.error(error.message);
        if (error && error.response && error.response.status) {
          if (error.response.status == 403) {
            logoutFromHelper();
            dispatch(logout());
            dispatch(removeuser());
            navigate("/logout");
          }
        }
        console.log(error);
      }
      setIsServiceModalOpen(true);
    }
  };

  const handleChange = async (itemId, disabled) => {
    try {
      const axiosInstance = createAxiosInstance(); // Assuming you have an Axios instance configured
      const updatedActive = [...active];
      const index = updatedActive.indexOf(itemId);
      const requestBody = { id: itemId, disabled: !disabled }; // Invert the disabled value
      if (index === -1) {
        updatedActive.push(itemId);
      } else {
        updatedActive.splice(index, 1);
      }
      await axiosInstance.post(
        `${tenantVal}${PRACTICE_SERVICE_DISABLE_CONTROLER_URL}`, // Replace with your API endpoint
        requestBody
      );
      setActive(updatedActive);
    } catch (error) {
      console.error("Error updating service status:", error);
      toast.error("An error occurred while updating service status.");
    }
  };

  const handleDeleteuser = (id) => {
    setSelectedTaskId(id);
  };

  const deleteTask = async () => {

    if (selectedTaskId) {
      try {
        const axiosInstance = createAxiosInstance();
        const url = `${tenantVal}${PRACTICE_SERVICE_DELETE_URL}`;
        await axiosInstance.delete(url, {
          data: {
            id: selectedTaskId,
            tenant: tenantVal,
          },
        });
        const updatedTasks = service.filter(
          (item) => item.id !== selectedTaskId
        );
        setService(updatedTasks);
        toast.success("Service deleted successfully.");
      } catch (error) {
        toast.error(error.message);
        if (error && error.response && error.response.status) {
          if (error.response.status == 403) {
            logoutFromHelper();
            dispatch(logout());
            dispatch(removeuser());
            navigate("/logout");
          }
        }
        console.log(error);
        toast.error(error.message);
      }
    }
    fetchService();
  };

  const fetchService = async () => {
    let ar = [];
    try {
      const axiosInstance = createAxiosInstance();
      const response = await axiosInstance.get(
        `${tenantVal}${PRACTICE_SERVICE_CONTROLER_URL}`
      );
      if (response && response.data) {
        setService(response.data);


        response.data.forEach((element) => {
          ar.push(
            {
              key: element.id,
              name: element.name,
              price: element.price,
              duration: element.duration,
              vat: element.vatRate ? (element.vatRate + '%') : 'N/A',
              status: (
                <div className="form-check form-switch onoff_area">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    id={`flexSwitchCheckDefault${element.id}`}
                    onChange={() => handleChange(element.id, element.disabled)}
                    checked={!element.disabled}

                  />
                  <label className="form-check-label" htmlFor={`flexSwitchCheckDefault${element.id}`}>
                    {element.disabled ? "Disabled" : "Enabled"}
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
                      data-bs-target="#addService"
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
      toast.error(error.message);
      if (error && error.response && error.response.status) {
        if (error.response.status == 403) {
          logoutFromHelper();
          dispatch(logout());
          dispatch(removeuser());
          navigate("/logout");
        }
      }
      console.log(error);
    }
  };

  useEffect(() => {
    fetchService();
  }, [tenantVal, active]);

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
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ["ascend", "descend"],
      onFilter: (value, record) => record.name.startsWith(value),
      filterSearch: true,
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      sorter: (a, b) => a.price - b.price,
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "Duration",
      dataIndex: "duration",
      key: "duration",
      sorter: (a, b) => a.duration - b.duration,
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "VAT",
      dataIndex: "vat",
      key: "vat",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "",
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
            <h3 className="name">Service Details</h3>
            <div className="btnxscenter ml-auto">
              <button
                className="custom_btn addform_btn"
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#addService"
                onClick={handleAddTask}
              >
                + Add Services
              </button>
            </div>
          </div>
        </div>
        <div className="signup_threebox practice_detailssect mt-0 table-header-wrap">
          <Tab />
          <div
            className="tab-content ptdetalistabcont user_detailsboxtab"
            id="pills-tabContent"
          >
            {/* start Practice Details */}
            <div className="show active">
              <div className="addpatientlist">
                <div className="service_details">
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
            </div>

            <DeleteModal deleteService={deleteTask} context="service" />
            <ServiceModal
              headerTitle={modalHeaderTitle}
              handleSaveTask={handleSaveTask}
              editTaskId={selectedTaskId}
              task={service}
              createNewService={createNewService}
              error={error}
              setError={setError}
            />
            {/* end Practice Details */}
            <Toaster position="top-center" reverseOrder={false} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;
