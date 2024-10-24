import React, { useState, useEffect } from "react";
import "../../../assets/css/patient.css";
import Nav from "../../../components/AfterLoginNav/Nav";
import Pagination from "../../../components/Pagination";
import srcicon from "../../../assets/images/srcicon.svg";
import filter from "../../../assets/images/filter.svg";
import moment from "moment";
import {
  GET_ALL_DOCUMENT_TYPES,
  PATIENT_DOCUMENTS_CONTROLER_URL,
  PATIENT_CONTROLER_URL,
  PATIENT_DOCUMENTS_CONTROLER_URL_ID,
  DOWNLOAD_DOCUMENT,
  DELETE_DOCUMENT,
} from "../../../api/Service";
import { createAxiosInstance } from "../../../api/axiosConfig";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import DocumentModal from "../../../components/Modal/DocumentModal";
import { date } from "yup";
import toast, { Toaster } from "react-hot-toast";
import { logoutFromHelper } from "../../../api/Helper";
import { logout } from "../../../redux/auth/AuthSlice";
import { removeuser } from "../../../redux/user/userSlice";
import {
  addPatientFullName,
  addPatientId,
} from "../../../redux/patient/PatientSlice";
import PreviewModal from '../../../components/Modal/previewDocumentModal'; import { Empty, Table } from "antd";
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';

const AlliedDocuments = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [sortOption, setSortOption] = useState("");
  const [sortBy, setSortBy] = useState(""); // State for sorting option
  const [isAscending, setIsAscending] = useState(true);
  const [sortedArray, setSortedArray] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showNoResults, setShowNoResults] = useState(false);
  const [selectedDocumentId, setSelectedDocumentId] = useState(null);
  const [selectedTask, setSelectedTask] = useState({});
  const [sortOrder, setSortOrder] = useState("desc"); // State for sorting order
  const [dataFetching, setDataFetching] = useState(true);
  const [previewDocument, setPreviewDocument] = useState(null);
  const [previewImageData, setPreviewImageData] = useState(null);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  let tenantVal = useSelector((state) => state.auth.user?.tenant);
  if (!tenantVal) tenantVal = localStorage.getItem("kinesin-tenant");

  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [dynamicDataSource, setDynamicDataSource] = useState([]);

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
  const formatDate = (date) => {
    return moment(date).format("DD/MM/YY");
  };
  const filteredArray = sortedArray?.filter(
    (item) =>
      item &&
      item.name &&
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    setShowNoResults(filteredArray.length === 0);
  }, [filteredArray]);

  const handleAddDocument = () => {
    setSelectedTask(null);
    setSelectedDocumentId(null);
  };
  const openPatientSummaryPage = async (patientId, patientFullName) => {
    if (!patientId) return;
    dispatch(addPatientId(patientId));
    localStorage.setItem("kinesin-patientId", patientId);
    dispatch(addPatientFullName(patientFullName));
    navigate("/patient-detail");
  };

  const handleSaveTask = (newDocument) => {
    let updatedStatus = newDocument.status; // Declare a variable to hold the updated status

    if (selectedDocumentId) {
      const updatedTasks = sortedArray.map((item) =>
        item.id === setSelectedDocumentId
          ? { ...newDocument, status: updatedStatus }
          : item
      );
      setSortedArray(updatedTasks);
    } else {
      // Add new task
      const updatedTasks = [...sortedArray, newDocument];
      setSortedArray(updatedTasks);
    }
  };

  const downloadDocument = async (id, patientId) => {
    try {
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
    } catch (error) {
      errorHandling(error)
    }
  };
  const downloadDocument1 = async (id, patientId) => {
    try {
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
      errorHandling(error)
    }
  };
  const fetchDocuments = async () => {
    let ar = [];
    try {
      const axiosInstance = createAxiosInstance();
      const response = await axiosInstance.get(
        `${tenantVal}${PATIENT_DOCUMENTS_CONTROLER_URL}`
      );
      if (response && response.data) {
        setDataFetching(false);
        setSortedArray(response.data);

        response.data.forEach((element) => {
          ar.push(
            {
              key: element.id,
              datereceived: formatDate(element.created),
              documentname: element.name ? element.name : "",
              pname: (element.patient && element.patient.firstName ? element.patient.firstName : '') + ' ' + (element.patient && element.patient.surname ? element.patient.surname : ''),
              patientname: (
                <>
                  {
                    element.patient && element.patient.firstName && <a
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
              documenttype: element.documentTypes ? element.documentTypes.name : '',
              status: (
                <>
                  {element.status && <p className="colordark">
                    <span className="dot1"></span>
                    {element.status ? element.status : ""}
                  </p>}

                </>
              ),
              action: (<>
                {element.documentUrl !== null && (
                  <button
                    className="view_file_btn"
                    onClick={() => {
                      let ID = element ? element.id : null;
                      let patientId = element && element.patient ? element.patient.id : null;
                      openPreview(ID, patientId);
                    }
                    }
                  >
                    View File
                  </button>
                )}
              </>),
            }


          );
        });
        setDynamicDataSource(ar);
        setIsPageLoaded(true);
      }
    } catch (error) {
      errorHandling(error)
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, [tenantVal]);

  useEffect(() => {
    const fetchDocumentById = async () => {
      try {
        if (selectedDocumentId) {
          const axiosInstance = createAxiosInstance();
          const response = await axiosInstance.get(
            `${tenantVal}${PATIENT_DOCUMENTS_CONTROLER_URL_ID}${selectedDocumentId}`
          );
        }
      } catch (error) {
        errorHandling(error)
      }
    };
    fetchDocumentById();
  }, [selectedDocumentId]);

  useEffect(() => {

    let ans = dynamicDataSource.filter(
      (f) => f.documentname && f.documentname.toLowerCase().includes(searchQuery ? searchQuery.toLowerCase() : '')
    );
    setFilterTable(ans);

  }, [searchQuery]);

  // For sorting state//
  const [currentPage, setCurrentPage] = useState(1);

  // For Pagination//
  const itemsPerPage = 10; // Number of items to display per page
  // Calculate the total number of pages based on the number of items and itemsPerPage
  const totalPages = Math.ceil(filteredArray.length / itemsPerPage);
  // Get the current items to display based on the currentPage
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredArray.slice(indexOfFirstItem, indexOfLastItem);
  const customSortIcons = {
    ascend: <CaretUpOutlined />,
    descend: <CaretDownOutlined />,
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
      title: "Date received",
      dataIndex: "datereceived",
      key: "datereceived",
      sorter: (a, b) => moment(a.datereceived, "DD/MM/YY") - moment(b.datereceived, "DD/MM/YY"),
      sortDirections: ["ascend", "descend"],
      render: (text, record) => (
        <div>
          {text}
          {record.sortOrder && customSortIcons[record.sortOrder]}
        </div>
      ),
    },
    {
      title: "Document Name",
      dataIndex: "documentname",
      key: "documentname",
      sorter: (a, b) => a.documentname.length - b.documentname.length,
      sortDirections: ["ascend", "descend"],
      onFilter: (value, record) => record.documentname.startsWith(value),
      filterSearch: true,
    },
    {
      title: "Patient Name",
      dataIndex: "patientname",
      key: "patientname",
      sorter: (a, b) => a.pname.length - b.pname.length,
      sortDirections: ["ascend", "descend"],
      render: (text) => <a href="javascript:void(0)">{text}</a>,
    },
    {
      title: "Document Type",
      dataIndex: "documenttype",
      key: "documenttype",
      sorter: (a, b) => a.documenttype.length - b.documenttype.length,
      sortDirections: ["ascend", "descend"],
      onFilter: (value, record) => record.documenttype.startsWith(value),
      filterSearch: true,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "",
      dataIndex: "action",
      key: "action",
    },
  ];
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
    <div>
      <div className="dashBcontbody alliedDocument">
        <div className="patientsheading">
          <div className="patientsearchbar justify-content-between flex-wrap">
            <h3>All Documents</h3>
            <div className="d-flex align-items-center allied-documents-wrap">
              <div className="search_bar documentsearch">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search Document here..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <img src={srcicon} alt="" />
                <img className="filterIcon" src={filter} alt="" />
              </div>
              <div className="btnxscenter">
                <button
                  className="custom_btn addform_btn"
                  type="submit"
                  data-bs-toggle="modal"
                  data-bs-target="#addDocumentModal"
                  onClick={handleAddDocument}
                >
                  + Add Documents
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="signup_threebox mt-0 table-header-wrap">
          <PreviewModal
            show={showPreviewModal}
            onHide={closePreview}
            imageData={previewImageData}
            downloadDocument={downloadDocument}
          />

          <DocumentModal fromPatient={false} handleSaveTask={fetchDocuments} />
        </div>
      </div>

      {/* Table Start  */}
      <div className="custom-table-wrapper allied-documents-table">
        <Table
          dataSource={searchQuery ? filterTable : dynamicDataSource}
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

  );
};

export default AlliedDocuments;