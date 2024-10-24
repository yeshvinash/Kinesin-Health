import React, { useState } from "react";
import { Button, Image } from "react-bootstrap";
import deleteIcon from "../../../assets/images/icons/delete.svg";
import { Link } from "react-router-dom";
import { DatePicker, Checkbox, Table, TimePicker } from "antd";
import dayjs from "dayjs";
import { SVGIcons } from "../../../components/Data/SVGIcons";
import { YourAppointmentsList } from "./YourAppointmentsList";
import { CustomTimePicker } from "../../../components/CustomTimePicker/CustomTimePicker";
import "./YourAppointments.css";

const onChange = (e) => {
  console.log(`checked = ${e.target.checked}`);
};
const onTimeChange = (time, timeString) => {
  console.log(time, timeString);
};

export const YourAppointments = () => {
  const [selectedDiv, setSelectedDiv] = useState(null);
  const [selectedLabel, setSelectedLabel] = useState(null);

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const handleDivClick = (divId) => {
    if (selectedDiv === divId) {
      setSelectedLabel(null);
    } else {
      setSelectedLabel(divId);
    }
  };

  const dataSource = [
    {
      key: "1",
      date: (
        <>
          <span className="fw-600 text-stratos"> Monday, 20th Mar 2023</span>
        </>
      ),
      time: (
        <>
          <CustomTimePicker />
        </>
      ),
      patient: (
        <>
          <Link to="/appointments-list" className="fw-500 text-stratos">
            {" "}
            James Targaryen
          </Link>
        </>
      ),
      practice: (
        <>
          <span className="fw-500 text-manatee"> Socrated AZURE Practice</span>
        </>
      ),
      practitioner: (
        <>
          <span className="fw-500 text-royal-blue"> Dr. Joe Bilggs</span>
        </>
      ),
      status: (
        <>
          <div className="d-flex justify-content-between align-items-center">
            <span className="d-inline-block text-manatee fw-500 confirm-dot position-relative">
              Confirmed
            </span>
            {SVGIcons.RigthArrow}
          </div>
        </>
      ),
    },
  ];

  const columns = [
    { title: "Date", dataIndex: "date", key: "date" },
    { title: "Time", dataIndex: "time", key: "time" },
    { title: "Patient", dataIndex: "patient", key: "patient" },
    { title: "Practice", dataIndex: "practice", key: "practice" },
    { title: "Practitioner", dataIndex: "practitioner", key: "practitioner" },
    { title: "Status", dataIndex: "status", key: "status" },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys) => {
      setSelectedRowKeys(selectedRowKeys);
    },
    selectedRowKeys,
  };

  const rowEventHandlers = {
    onClick: (record) => {
      return {
        onClick: () => handleRowClick(record),
      };
    },
  };
  const handleRowClick = (record) => {
    console.log("Clicked row:", record);
  };
  return (
    <>
      <section className="appointments-wrapper">
        <div className="page-title-wrap d-flex align-items-center justify-content-between">
          <h2 className="name h2 fw-600 mb-0">Your Appointments </h2>
        </div>
        <div className="profile-box-wrap dashboard-bg">
          <div className="d-flex align-items-center">
            <div className="filter-box-wrapper">
              <div className="d-flex justify-content-between align-items-center title-wrap">
                <span className="fw-600 text-stratos">Filters</span>
                <Link className="link">Clear All</Link>
              </div>
              <div className="datepicker-wrap">
                <DatePicker />
                <DatePicker />
              </div>
              {/* <div className="custom-checkbox-wrap">
              <Checkbox onChange={onChange} className="confirm-dot">
                Confirmed
              </Checkbox>
              <Checkbox onChange={onChange} className="past-dot">
                Past
              </Checkbox>
              <Checkbox onChange={onChange} className="cancel-dot">
                Cancelled
              </Checkbox>
            </div> */}
            </div>
            <div className="appointments-tabs-wrap">
              <div
                className={`appointments-tabs ${
                  selectedLabel === 1 ? "confirm-selected" : "selectable"
                }`}
                onClick={() => handleDivClick(1)}
              >
                <span className="confirm-dot">Confirmed</span>
              </div>
              <div
                className={`appointments-tabs ${
                  selectedLabel === 2 ? "past-selected" : "selectable"
                }`}
                onClick={() => handleDivClick(2)}
              >
                <span className="past-dot">Past</span>
              </div>
              <div
                className={`appointments-tabs ${
                  selectedLabel === 3 ? "cancelled-selected" : "selectable"
                }`}
                onClick={() => handleDivClick(3)}
              >
                <span className="cancel-dot">Cancelled</span>
              </div>
            </div>
          </div>
          <div className="appointments-list-wrapper">
            <div>
              <h3 className="h3 fw-600 text-stratos">Bloods</h3>
              <Table
                dataSource={dataSource}
                columns={columns}
                pagination={false}
                // rowSelection={rowSelection}
                // onRow={rowEventHandlers}
              />
            </div>
            <div>
              <h3 className="h3 fw-600 text-stratos">Eye Sight Test</h3>
              <Table
                dataSource={dataSource}
                columns={columns}
                pagination={false}
              />
            </div>
            <div>
              <h3 className="h3 fw-600 text-stratos">Bloods</h3>
              <Table
                dataSource={dataSource}
                columns={columns}
                pagination={false}
              />
            </div>
            <div>
              <h3 className="h3 fw-600 text-stratos">Eye Sight Test</h3>
              <Table
                dataSource={dataSource}
                columns={columns}
                pagination={false}
              />
            </div>
          </div>
        </div>
      </section>
      {/* <YourAppointmentsList/> */}
    </>
  );
};
