import React, { useEffect, useState } from "react";
import "../../../assets/css/allied_settings.css";
import Nav from "../../../components/AfterLoginNav/Nav";
import Tab from "../../../components/SettingsTab/Tab";
import editicon from "../../../assets/images/editicon.svg";
import removicon from "../../../assets/images/removicon.svg";
import smsIcon from "../../../assets/images/viewSms.svg";
import DeleteModal from "../../../components/Modal/DeleteModal";
import TemplateModal from "../../../components/Modal/TemplateModal";
import { createAxiosInstance } from "../../../api/axiosConfig";
import { useDispatch, useSelector } from "react-redux";
import {
  SMS_TEMPLATE_CONTROLLER,
  SMS_TEMPLATE_CONTROLLER_ID,
  SMS_TEMPLATE_CONTROLLER_ID_REMOVE,
} from "../../../api/Service";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { logoutFromHelper } from "../../../api/Helper";
import { logout } from "../../../redux/auth/AuthSlice";
import { removeuser } from "../../../redux/user/userSlice";
import { Empty, Table } from "antd";

const smsDetails = [];
const SmsSettngs = () => {
  const [template, setTemplate] = useState([]);
  const [modalHeaderTitle, setModalHeaderTitle] = useState(""); // State for modal header title
  const [selectedTemplate, setSelectedTemplate] = useState({});
  const [selectedTemplateId, setSelectedTemplateId] = useState(null); //State for selected task id
  const [dataFetching, setDataFetching] = useState(true);

  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [dynamicDataSource, setDynamicDataSource] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  let tenantVal = useSelector((state) => state.auth.user?.tenant);
  if (!tenantVal) tenantVal = localStorage.getItem("kinesin-tenant");

  const fetchSms = async () => {
    try {
      let ar = [];
      const axiosInstance = createAxiosInstance();
      const response = await axiosInstance.get(
        `${tenantVal}${SMS_TEMPLATE_CONTROLLER}`
      );
      if (response && response.data) {
        setDataFetching(false)
        setTemplate(response.data);

        response.data.forEach((element) => {
          ar.push(
            {
              id:  element.id,
              key: element.id,
              name: element.name,
              template: element.template,
              edit: (
                <>
                  <div className="action-icon-wrap edt_rmviconbox">
                    <button
                      type="submit"
                      className="deletebtn"
                      data-bs-toggle="modal"
                      data-bs-target="#addTemplate"
                      onClick={() => handleEditTemplate(response.data,element.id)}
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

  useEffect(() => {
    fetchSms();
  }, [tenantVal]);

  const createNewTemplate = async (userData) => {
    try {
      const axiosInstance = createAxiosInstance();
      let response;
      if (selectedTemplateId) {
        const editedData = { ...userData, id: selectedTemplateId };
        response = await axiosInstance.post(
          `${tenantVal}${SMS_TEMPLATE_CONTROLLER}`,
          editedData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        toast.success("Template updated successfully.");
      } else {
        response = await axiosInstance.post(
          `${tenantVal}${SMS_TEMPLATE_CONTROLLER}`,
          userData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        toast.success("Template saved successfully.");
      }
      if (selectedTemplateId) {
        const updatedTasks = template.map((item) =>
          item.id === selectedTemplateId ? { ...item, ...response.data } : item
        );
        setTemplate(updatedTasks);
      } else {
        setTemplate((prevService) => [...prevService, response.data]);
      }
      fetchSms();
    } catch (error) {
      errorHandling(error);
    }
  };

  const handleAddTemplate = () => {
    setSelectedTemplate(null);
    setSelectedTemplateId(null);
    setModalHeaderTitle("Add New Template");
  };

  //Save template handler//
  const handleSaveTemplate = (newTemplate) => {
    let updatedStatus = newTemplate.status; // Declare a variable to hold the updated status
    if (selectedTemplateId) {
      // Edit existing template
      const updatedTasks = template.map((item) =>
        item.id === selectedTemplateId
          ? { ...newTemplate, status: updatedStatus }
          : item
      );
      setTemplate(updatedTasks);
    } else {
      // Add new template
      const updatedTemplate = [...template, newTemplate];
      setTemplate(updatedTemplate);
    }
  };
  //Save template handler//

  // Edit template handler//
  const handleEditTemplate = async (datas, id) => {
    const selectedTemplate = datas.find((item) => item.id === id);
    if (selectedTemplate) {
      setSelectedTemplateId(id);
      setSelectedTemplate(selectedTemplate);
      setModalHeaderTitle("Edit Template");
      try {
        const axiosInstance = createAxiosInstance();
        const url = `${tenantVal}/${SMS_TEMPLATE_CONTROLLER_ID}${id}`;
        const response = await axiosInstance.get(url);
      } catch (error) {
        errorHandling(error);
      }
    }
  };
  // Edit template handler//

  // For delete template//
  const handleDeleteuser = (id) => {
    setSelectedTemplateId(id);
  };
  const deleteTemplate = async () => {
    // Filter the template array to remove the selected template
    try {
      const axiosInstance = createAxiosInstance();
      if (selectedTemplateId) {
        const url = `${tenantVal}${SMS_TEMPLATE_CONTROLLER_ID_REMOVE}`;
        await axiosInstance.delete(url, {
          data: {
            id: selectedTemplateId,
            tenant: tenantVal,
          },
        });
        const updatedTemplate = template.filter(
          (item) => item.id !== selectedTemplateId
        );
        // Update the template state with the updatedTemplates array
        setTemplate(updatedTemplate);
        toast.success("Template deleted successfully.");
      }
    } catch (error) {
      errorHandling(error);
    }
    fetchSms();
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
      title: "Template Text",
      dataIndex: "template",
      key: "template",
      sorter: (a, b) => a.template.length - b.template.length,
      sortDirections: ["ascend", "descend"],
      onFilter: (value, record) => record.template.startsWith(value),
      filterSearch: true,
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
      <Toaster position="top-center" reverseOrder={false} />
      <div className="dashBcontbody">
        <div className="patientsheading dpblock">
          <div className="patientsearchbar">
            <h3 className="name">Settings - SMS Settings</h3>
            <div className="btnxscenter ml-auto">
              <button
                className="custom_btn addform_btn"
                type="button"
                data-bs-toggle="modal"
                data-bs-target="#addTemplate"
                onClick={handleAddTemplate}
              >
                <i
                  className="fa-solid fa-plus"
                  style={{ marginRight: "7px" }}
                ></i>{" "}
                Add New Template
              </button>
            </div>
          </div>
        </div>

        {/* start sms_settingstabnav */}
        <div className="sms_settingstabnav smsmodsk">
          <ul className="nav nav-tabs" id="myTab" role="tablist">
            <li className="nav-item" role="presentation">
              <button
                className="nav-link active"
                id="home-tab"
                data-bs-toggle="tab"
                data-bs-target="#home"
                type="button"
                role="tab"
                aria-controls="home"
                aria-selected="true"
              >
                <span className="tmpbtnicon">
                  <img src={smsIcon} alt="" />
                </span>{" "}
                SMS Templates
              </button>
            </li>
          </ul>
        </div>
        {/* end sms_settingstabnav */}
        <div className="signup_threebox practice_detailssect smsthreebox mt-0 table-header-wrap">
          <Tab />
          <div className="sms_settingstabnav smsmobile">
            <ul className="nav nav-tabs" id="myTab" role="tablist">
              <li className="nav-item" role="presentation">
                <button
                  className="nav-link active"
                  id="home-tab"
                  data-bs-toggle="tab"
                  data-bs-target="#home"
                  type="button"
                  role="tab"
                  aria-controls="home"
                  aria-selected="true"
                >
                  <span className="tmpbtnicon">
                    <img src={smsIcon} alt="" />
                  </span>{" "}
                  SMS Templates
                </button>
              </li>
            </ul>
          </div>
          <div
            className="tab-content ptdetalistabcont user_detailsboxtab"
            id="pills-tabContent"
          >
            <div className="show active">
              <div className="addpatientlist">
                <div className="user_detailsbox">
                  <div className="tab-content smssetab">
                    <div
                      className="tab-pane active"
                      id="home"
                      role="tabpanel"
                      aria-labelledby="home-tab"
                    >
                      <div className="custom-table-wrapper sms-table">
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

                    <div
                      className="tab-pane"
                      id="profile"
                      role="tabpanel"
                      aria-labelledby="profile-tab"
                    >
                      <h1>SMS Setting Tab 2</h1>
                    </div>

                    <div
                      className="tab-pane"
                      id="messages"
                      role="tabpanel"
                      aria-labelledby="messages-tab"
                    >
                      <h1>SMS Setting Tab 3</h1>
                    </div>

                    <div
                      className="tab-pane"
                      id="settings"
                      role="tabpanel"
                      aria-labelledby="settings-tab"
                    >
                      <h1>SMS Setting Tab 4</h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <DeleteModal deleteService={deleteTemplate} context="smsTemplate" />
      <TemplateModal
        modalHeaderTitle={modalHeaderTitle}
        handleSaveTemplate={handleSaveTemplate}
        createNewTemplate={createNewTemplate}
        editTemplateId={selectedTemplateId}
        template={template}
      />
    </div>
  );
};

export default SmsSettngs;
