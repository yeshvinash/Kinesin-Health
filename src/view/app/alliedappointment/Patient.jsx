import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import { PATIENT_CONTROLER_URL } from "../../../api/Service";
import { createAxiosInstance } from "../../../api/axiosConfig";
import "../../../assets/css/patient.css";
import filter from "../../../assets/images/filter.svg";
import message from "../../../assets/images/message.svg";
import srcicon from "../../../assets/images/srcicon.svg";
import Nav from "../../../components/AfterLoginNav/Nav";
import SmsModal from "../../../components/Modal/SmsModal";
import Pagination from "../../../components/Pagination";
import {
  addPatientFullName,
  addPatientId,
  clearPatient,
  clearPatientId,
  clearPreviousPageForEditPatient
} from "../../../redux/patient/PatientSlice";
import toast, { Toaster } from "react-hot-toast";
import { logoutFromHelper } from "../../../api/Helper";
import { logout } from "../../../redux/auth/AuthSlice";
import { removeuser } from "../../../redux/user/userSlice";
import { addPreviousPageForEditPatient } from "../../../redux/patient/PatientSlice.js";
import { Empty, Table } from "antd";
import moment from "moment";
import { CaretUpOutlined, CaretDownOutlined } from '@ant-design/icons';

let patientList = [];
let sortedPatients = [];
let filteredPatients = [];
let currentItems = [];

const itemsPerPage = 10;

const ASCENDING = "ascending";
const DESCENDING = "descending";
const UP = "up";
const DOWN = "down";

const AlliedPatient = (props) => {
  const location = useLocation();
  const { state } = location;
  // console.log(state.searchQuery);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  /***
   * Values from Redux.
   */
  let tenantVal = useSelector((state) => state.auth.user?.tenant);
  if (!tenantVal) tenantVal = localStorage.getItem("kinesin-tenant");
  const patients = useSelector((state) => state.patient.patients);

  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [dynamicDataSource, setDynamicDataSource] = useState([]);

  /***
   * Local Variables.
   */
  const [services, setServices] = useState([...patientList, ...patients]); // It Combines patientList and Redux data
  const [sortOrder, setSortOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [showNoResults, setShowNoResults] = useState(false);

  const [dataFetching, setDataFetching] = useState(true);

  const [patientName, setPatientName] = useState({});

  // console.log(searchQuery);
  const fetchPatient = async () => {
    let ar = [];
    try {
      const axiosInstance = createAxiosInstance();
      const response = await axiosInstance.get(
        `${tenantVal}${PATIENT_CONTROLER_URL}`
      );

      patientList = [];
      if (response && response.data) {
        patientList = response.data.filter(
          (patient) => patient && patient.firstName
        );

        setDataFetching(false)
      }

      if (patientList.length == 0) setShowNoResults(true);
      else setShowNoResults(false);

      clearPatient();
      setServices(patientList);
      if (response.data && response.data.length > 0) setCurrentPage(1);

      response.data.forEach((element) => {

        if (element.firstName) {
          ar.push(
            {
              key: element.id,
              patientname: element.firstName + (element.surname ? (' ' + element.surname) : ''),
              name: (
                <>
                  {
                    element && element.firstName && <a
                      href=""
                      onClick={(e) => {
                        e.preventDefault();
                        goToPatientDetails(
                          element.id,
                          element.firstName + (element.surname ? (' ' + element.surname) : '')
                        );
                      }}
                      className="patient-title-wrap"
                    >
                      {element.firstName} {element.surname}
                    </a>
                  }
                </>
              ),
              dob: displayAge(element.dateOfBirth) + ' (' + calculateAge(element.dateOfBirth) + ')',
              addressline: element.address && element.address.addressLine1 ? element.address.addressLine1 : "",
              sex: element.gender,
              telephone: element.homePhone,
              lastvisit: element.lastVisit,
              action: (
                <div className="d-flex align-items-center action-wrap">
                  <p className="icon-spacing">
                    <span>
                      <button
                        id="my-tooltip-anchor"
                        type="button"
                        className="deletebtn"
                        data-bs-toggle="modal"
                        data-bs-target="#sendSma_modal"
                        onClick={() => { xxx(element.id, element.firstName); }}
                      >
                        <span className="smsicon">
                          <img src={message} alt="" />
                        </span>
                      </button>
                    </span>
                  </p>
                  <Tooltip
                    className="sendsmstooltip"
                    anchorSelect="#my-tooltip-anchor"
                    content="Click to send SMS Reminder"
                    place="bottom"
                  />
                  <button className="view_file_btn" onClick={() => fetchPatientById(element.id)}>Edit</button>
                </div>
              ),
            }
          );
        }
      });
      setDynamicDataSource(ar);
      setIsPageLoaded(true);
    } catch (error) {
      errorHandling(error);
    }
  };

  useEffect(() => {
    fetchPatient();
    // setSearchQuery("")
  }, []);
  useEffect(() => {
    if (state && state.searchQuery) {
      console.log("inside state change");
      console.log(state.searchQuery);
      setSearchQuery(state.searchQuery);
    }
    if (state && state.showToast) {
      // Display toast message
      toast.success("Patient updated successfully");
    }
  }, [state]);
  useEffect(() => {
    setServices([...patientList, ...patients]); // Update services when patients data changes
  }, [patients]);

  const sortPatients = (order, sortColumn) => {
    const sortedList = [...services];
    sortedList.sort((a, b) => {
      const nameA = `${a.firstName || ""} ${a.lastName || ""}`.toLowerCase();
      const nameB = `${b.firstName || ""} ${b.lastName || ""}`.toLowerCase();
      if (order === ASCENDING) {
        if (nameA < nameB) return -1;
        if (nameA > nameB) return 1;
      } else {
        if (nameA > nameB) return -1;
        if (nameA < nameB) return 1;
      }
      return 0;
    });
    return sortedList;
  };

  let totalPages = 0;
  if (currentPage > 0) {
    sortedPatients = sortPatients(sortOrder);
    filteredPatients = sortedPatients.filter(
      (patient) =>
        patient &&
        patient.firstName &&
        patient.firstName
          .toLowerCase()
          .includes(searchQuery ? searchQuery.toLowerCase() : "")
    );

    if (filteredPatients && filteredPatients.length)
      totalPages = Math.ceil(filteredPatients.length / itemsPerPage);

    let indexOfLastItem = currentPage * itemsPerPage;
    let indexOfFirstItem = indexOfLastItem - itemsPerPage;

    currentItems = filteredPatients.slice(indexOfFirstItem, indexOfLastItem);
  }

  useEffect(() => {
    if (currentPage > 0) {
      if (currentPage > totalPages) setCurrentPage(totalPages);
    }
  }, [filteredPatients, currentPage, totalPages]);

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);
    setCurrentPage(1); // Reset currentPage when search query changes
    if (query === "") {
      setShowNoResults(false);
      setServices([...patientList, ...patients]); // Reset the services array to include all data
    } else {
      const filtered = (
        sortedPatients && sortedPatients.length > 0
          ? sortedPatients
          : patientList
      ).filter(
        (patient) =>
          patient &&
          patient.firstName &&
          patient.firstName
            .toLowerCase()
            .includes(query ? query.toLowerCase() : "")
      );
      setServices(filtered);
    }
  };

  useEffect(() => {
    setShowNoResults(currentItems.length === 0 && searchQuery !== "");
  }, [currentItems, searchQuery]);


  useEffect(() => {
    let ans = dynamicDataSource.filter(
      (f) => f.patientname && f.patientname.toLowerCase().includes(searchQuery ? searchQuery.toLowerCase() : '')
    );
    setFilterTable(ans);

  }, [searchQuery]);

  const [sortedColumn, setSortedColumn] = useState("");
  useEffect(() => {
    if (sortOrder && sortedColumn) {
      const sortedPatients = sortPatients(sortOrder, sortedColumn);
      setServices(sortedPatients);
    }
  }, [sortedColumn]);

  const handleSortOrderChange = (column) => {
    setSortOrder(
      column && column.target && column.target.value
        ? column.target.value
        : sortOrder === ASCENDING
          ? DESCENDING
          : ASCENDING
    );
    if (sortedColumn !== column) setSortedColumn(column);
  };

  /**
   * Used to display date of birth.
   * @param {*} dob indicates array which contains year, month and date.
   * @returns return date of birth.
   */
  const displayAge = (dob) => {
    // let age;
    // if (dob) {
    //   if (dob[2])
    //     age = dob[2];
    //   if (dob[1])
    //     age = age + '/' + dob[1];
    //   if (dob[0])
    //     age = age + '/' + dob[0];
    // }
    // return age;

    if (!dob) return "";

    let aa = dob.split("-");
    if (aa && aa.length == 3) {
      return aa[2] + "/" + aa[1] + "/" + aa[0];
    } else {
      return dob;
    }
  };
  /**
   * Used to calculate age by date of birth.
   * @param {*} dob indicates date of birth.
   * @returns returns age.
   */
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

  const xxx = (id, firstName) => {
    console.log("xxx : " + firstName);
    setPatientName({ id: id, firstName: firstName });
  };

  /**
   * Used to redirect you to edit patient information page.
   * @param {*} id indicates id of patient.
   */
  const fetchPatientById = async (id) => {
    dispatch(addPatientId(id));
    localStorage.setItem("kinesin-patientId", id);
    dispatch(addPreviousPageForEditPatient("patient"));
    navigate("/patient");
    navigate("/edit_patient");
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

  const goToPatientDetails = async (id, patientFullName) => {
    dispatch(addPatientId(id));
    localStorage.setItem("kinesin-patientId", id);
    dispatch(addPatientFullName(patientFullName));
    navigate("/patient-detail");
  };

  const dataSource = [
    {
      key: "1",
      name: "Vishwas Patel",
      dob: "27/12/1988 (35)",
      addressline: "56 Shaktivijay Society, Near Saru Nagar",
      sex: "male",
      telephone: "09879109407",
      lastvisit: "",
      action: (
        <div className="d-flex align-items-center action-wrap">
          <p className="icon-spacing">
            <span>
              <button
                id="my-tooltip-anchor"
                type="button"
                className="deletebtn"
                data-bs-toggle="modal"
                data-bs-target="#sendSma_modal"
              >
                <span className="smsicon">
                  <img src={message} alt="" />
                </span>
              </button>
            </span>
          </p>
          <Tooltip
            className="sendsmstooltip"
            anchorSelect="#my-tooltip-anchor"
            content="Click to send SMS Reminder"
            place="bottom"
          />

          <button className="view_file_btn">Edit</button>
        </div>
      ),
    },
    {
      key: "2",
      name: "Darren",
      dob: "27/12/1988 (35)",
      addressline: "56 Shaktivijay Society",
      sex: "male",
      telephone: "09879109407",
      lastvisit: "",
      action: (
        <div className="d-flex align-items-center action-wrap">
          <p className="icon-spacing">
            <span>
              <button
                id="my-tooltip-anchor"
                type="button"
                className="deletebtn"
                data-bs-toggle="modal"
                data-bs-target="#sendSma_modal"
              >
                <span className="smsicon">
                  <img src={message} alt="" />
                </span>
              </button>
            </span>
          </p>
          <Tooltip
            className="sendsmstooltip"
            anchorSelect="#my-tooltip-anchor"
            content="Click to send SMS Reminder"
            place="bottom"
          />

          <button className="view_file_btn">Edit</button>
        </div>
      ),
    },
  ];

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
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.patientname.length - b.patientname.length,
      sortDirections: ["ascend", "descend"],
      render: (text) => <a href="javascript:void(0)">{text}</a>,
    },
    {
      title: "DOB",
      dataIndex: "dob",
      key: "dob",
    },
    {
      title: "Address Line 1",
      dataIndex: "addressline",
      key: "addressline",
    },
    {
      title: "Sex",
      dataIndex: "sex",
      key: "sex",
    },
    {
      title: "Telephone",
      dataIndex: "telephone",
      key: "telephone",
    },
    {
      title: "Last Visit",
      dataIndex: "lastvisit",
      key: "lastvisit",
    },
    {
      title: "",
      dataIndex: "action",
      key: "action",
    },
  ];

  return (
    <div>
      {/* <Nav /> */}
      <Toaster position="top-center" reverseOrder={false} />
      <div className="dashBcontbody">
        <div className="patientsheading">
          <div className="patientsearchbar flex-wrap justify-content-between">
            {/* <h6>patientList : {patientList.length}</h6>
            <h6>sortedPatients : {sortedPatients.length}</h6>
            <h6>filteredPatients : {filteredPatients.length}</h6>
            <h6>currentItems : {currentItems.length}</h6>
            <br></br> */}

            <h3>All Patients</h3>
            <div className="d-flex align-items-center allied-documents-wrap">


              <div className="search_bar">
                <input
                  type="search"
                  className="form-control"
                  placeholder="Search patient here..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                <img src={srcicon} alt="" />
                <img
                  className="filterIcon"
                  src={filter}
                  alt=""
                  onClick={() =>
                    setSortOrder(
                      sortOrder === ASCENDING ? DESCENDING : ASCENDING
                    )
                  }
                />
              </div>
              {/* <div className="shortbyselect">
                <select
                  className="form-select form-control dpblock"
                  name="vat"
                  value={sortOrder}
                  onChange={handleSortOrderChange}
                >
                  <option>Sort By</option>
                  <option value="ascending">A-Z (Name)</option>
                  <option value="descending">Z-A - (Name)</option>
                </select>
              </div> */}
              <div className="btnxscenter">
                <button
                  className="custom_btn addform_btn"
                  type="submit"
                  onClick={() => { dispatch(clearPatientId()); dispatch(clearPreviousPageForEditPatient()); localStorage.removeItem('kinesin-patientId'); navigate("/add_patient") }}
                >
                  + Add Patients
                </button>
              </div>
            </div>
          </div>
        </div>


        <div className="custom-table-wrapper patients-table">
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

        {/* Modal */}
        <SmsModal
          tenantVal={tenantVal}
          patientId={patientName.id}
          patientName={patientName.firstName}
        />
        {/* Modal */}
      </div>
    </div>
  );
};

export default AlliedPatient;
