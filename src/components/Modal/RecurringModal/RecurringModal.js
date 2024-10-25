import React from "react";
import { Modal, Select, Checkbox } from "antd";
import TextArea from "antd/es/input/TextArea";
import editicon from "../../../assets/images/editicon.svg";
import removicon from "../../../assets/images/removicon.svg";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { SVGIcons } from "../../Data/SVGIcons";
import "./RecurringModal.css";

const RecurringModal = ({ visible, onClose }) => {
  return (
    <div>
      <Modal
        title="Block Timeslot"
        visible={visible}
        onCancel={onClose}
        footer={false}
        className="custom-modal-wrap recurring-modal"
        centered
      >
        <form className="recurring-form-wrap">
          <div className="recurring-form-content-wrap">
            <div className="form-spacing">
              <div className="custom-label-wrap d-flex align-items-center justify-content-between w-100">
                <span className="h6 small text-black fw-500 primary-font text-break d-inline-block">
                  HCP
                </span>
              </div>
              <div className="custom-input-wrap">
                <Select
                  defaultValue="Dr. Darrem McCormack"
                  suffixIcon={SVGIcons.DownArrow}
                  options={[
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
                  ]}
                />
              </div>
            </div>
            <div className="grid-item-1 form-spacing">
              <div className="form-content-wrap flex-column align-items-start">
                <div className="custom-label-wrap d-flex align-items-center justify-content-between w-100">
                  <span className="h6 small text-black fw-500 primary-font text-break d-inline-block">
                    Site
                  </span>
                </div>
                <div className="custom-input-wrap">
                  <Select
                    defaultValue="Clarius Health - Camden"
                    suffixIcon={SVGIcons.DownArrow}
                    options={[
                      {
                        value: "Clarius Health - Camden",
                        label: "Clarius Health - Camden",
                      },
                    ]}
                  />
                </div>
              </div>
              <div className="form-content-wrap flex-column align-items-start">
                <div className="custom-label-wrap d-flex align-items-center justify-content-between w-100">
                  <span className="h6 small text-black fw-500 primary-font text-break d-inline-block">
                    Start Time
                  </span>
                </div>
                <div className="custom-input-wrap">
                  <Select
                    defaultValue="09:00"
                    suffixIcon={SVGIcons.DownArrow}
                    options={[
                      {
                        value: "09:00",
                        label: "09:00",
                      },
                      {
                        value: "10:00",
                        label: "10:00",
                      },
                    ]}
                  />
                </div>
              </div>
            </div>
            <div className="grid-item-1 form-spacing">
              <div className="form-content-wrap flex-column align-items-start">
                <div className="custom-label-wrap d-flex align-items-center justify-content-between w-100">
                  <span className="h6 small text-black fw-500 primary-font text-break d-inline-block">
                    Type
                  </span>
                </div>
                <div className="custom-input-wrap">
                  <Select
                    defaultValue="Unavailable"
                    suffixIcon={SVGIcons.DownArrow}
                    options={[
                      {
                        value: "Unavailable",
                        label: "Unavailable",
                      },
                      {
                        value: "available",
                        label: "available",
                      },
                    ]}
                  />
                </div>
              </div>
              <div className="form-content-wrap flex-column align-items-start">
                <div className="custom-label-wrap d-flex align-items-center justify-content-between w-100">
                  <span className="h6 small text-black fw-500 primary-font text-break d-inline-block">
                    End Time
                  </span>
                </div>
                <div className="custom-input-wrap">
                  <Select
                    defaultValue="09:00"
                    suffixIcon={SVGIcons.DownArrow}
                    options={[
                      {
                        value: "11:00",
                        label: "11:00",
                      },
                      {
                        value: "1:00",
                        label: "1:00",
                      },
                    ]}
                  />
                </div>
              </div>
            </div>
            <div className="form-spacing">
              <div className="custom-label-wrap d-flex align-items-center justify-content-between">
                <span className="h6 small  text-black fw-500 primary-font text-break d-inline-block">
                  Recurrence Type
                </span>
              </div>
              <div className="d-flex align-items-center justify-content-between checkbox-wrapper">
                <div className="custom-checkbox-wrap duration-type-checkbox-wrap">
                  <Checkbox>Daily</Checkbox>
                </div>
                <div className="custom-checkbox-wrap duration-type-checkbox-wrap">
                  <Checkbox>Weekly</Checkbox>
                </div>
                <div className="custom-checkbox-wrap duration-type-checkbox-wrap">
                  <Checkbox>Monthly</Checkbox>
                </div>
              </div>
            </div>
            <div className="form-spacing">
              <div className="custom-label-wrap d-flex align-items-center justify-content-between">
                <span className="h6 small  text-black fw-500 primary-font text-break d-inline-block">
                  Weekly
                </span>
              </div>
              <div className="weekdays-checkbox-wrapper">
                <div className="custom-checkbox-wrap duration-type-checkbox-wrap">
                  <Checkbox>Mon</Checkbox>
                </div>
                <div className="custom-checkbox-wrap duration-type-checkbox-wrap">
                  <Checkbox>Tue</Checkbox>
                </div>
                <div className="custom-checkbox-wrap duration-type-checkbox-wrap">
                  <Checkbox>Wed</Checkbox>
                </div>
                <div className="custom-checkbox-wrap duration-type-checkbox-wrap">
                  <Checkbox>Thu</Checkbox>
                </div>
                <div className="custom-checkbox-wrap duration-type-checkbox-wrap">
                  <Checkbox>Fri</Checkbox>
                </div>
                <div className="custom-checkbox-wrap duration-type-checkbox-wrap">
                  <Checkbox>Sat</Checkbox>
                </div>
                <div className="custom-checkbox-wrap duration-type-checkbox-wrap">
                  <Checkbox>Sun</Checkbox>
                </div>
              </div>
            </div>
            <div className="grid-item form-spacing">
              <div className="">
                <div className="custom-label-wrap d-flex align-items-center justify-content-between w-100">
                  <span className="h6 small text-black fw-500 primary-font text-break d-inline-block">
                    Start Date
                  </span>
                </div>
                <div className="custom-input-wrap">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker", "DatePicker"]}>
                      <DatePicker format="DD/MM/YYYY" name="startDate"  sx={{ width: "100%" }}/>
                    </DemoContainer>
                  </LocalizationProvider>
                </div>
              </div>
              <div className="">
                <div className="custom-label-wrap d-flex align-items-center justify-content-between w-100">
                  <span className="h6 small text-black fw-500 primary-font text-break d-inline-block">
                    End Date
                  </span>
                </div>
                <div className="custom-input-wrap">
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={["DatePicker", "DatePicker"]}>
                      <DatePicker format="DD/MM/YYYY" name="startDate"  sx={{ width: "100%" }}/>
                    </DemoContainer>
                  </LocalizationProvider>
                </div>
              </div>
            </div>
            <div className="form-spacing">
              <div className="custom-label-wrap d-flex align-items-center justify-content-between w-100">
                <span className="h6 small text-black fw-500 primary-font text-break d-inline-block">
                  Reason
                </span>
              </div>
              <div className="custom-input-wrap">
                <TextArea
                  rows={4}
                  placeholder="Does not work mondays  mornings every week"
                />
              </div>
            </div>
            <button className="custom_btn savwidth">save</button>
          </div>
          <div className="recurring-form-preview-wrap">
            <div className="title-wrap text-center">
              <h5 className="mb-0 fw-700 text-stratos">
                Recurring Appointment Preview
              </h5>
            </div>
            <div className="recurring-form-previewbody-wrap">
              <div className="recurring-form-itemlist">
                <div className="header-wrap d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center me-2 name-wrap">
                    <h6 className="mb-0 fw-700 text-stratos text-break text-ellipsis">
                      Dr John Doe
                    </h6>
                    <button className="custom_btn danger">Blocked</button>
                  </div>
                  <div className="action-icon-wrap edt_rmviconbox d-flex align-items-center">
                    <button className="deletebtn">
                      <img src={editicon} alt="" />
                    </button>
                    <button className="deletebtn">
                      <img src={removicon} alt="" />
                    </button>
                  </div>
                </div>
                <div className="bottom-wrap">
                  <div>
                    <span className="text-black fw-500 label-wrap">Time</span>
                    <span className="text-manatee fw-400">09:00 - 13:00</span>
                  </div>
                  <div>
                    <span className="text-black fw-500 label-wrap">HCP</span>
                    <span className="text-manatee fw-400">Dr John Doe</span>
                  </div>
                  <div>
                    <span className="text-black fw-500 label-wrap">
                      Start Date
                    </span>
                    <span className="text-manatee fw-400">22 May 2023</span>
                  </div>
                  <div>
                    <span className="text-black fw-500 label-wrap">
                      End Date
                    </span>
                    <span className="text-manatee fw-400">22 May 2027</span>
                  </div>
                  <div>
                    <span className="text-black fw-500 label-wrap">
                      Recurrence Type
                    </span>
                    <span className="text-manatee fw-400">Weekly - Mon</span>
                  </div>
                  <div>
                    <span className="text-black fw-500 label-wrap">Type</span>
                    <span className="text-manatee fw-400">Unavailable</span>
                  </div>
                  <div>
                    <span className="text-black fw-500 label-wrap">Site</span>
                    <span className="text-manatee fw-400">
                      Clarius - Camden
                    </span>
                  </div>
                  <div>
                    <span className="text-black fw-500 label-wrap">Reason</span>
                    <span className="text-manatee fw-400 text-ellipsis">
                      Clarius - Camden
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default RecurringModal;
