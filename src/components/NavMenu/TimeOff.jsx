import React from "react";
import Nav from "../AfterLoginNav/Nav";
import moment from "moment";
import DeleteModal from "../Modal/DeleteModal";


const Upcoming_Time_Off_data = [
  {
    id: 1,
    StartDate: "03/08/24",
    EndDate: "10/08/24",
    Days: "3",
    Reason: "Vacation",
    status: "Approved",
  },
  {
    id: 2,
    StartDate: "03/08/24",
    EndDate: "10/08/24",
    Days: "2",
    Reason: "Vacation",
    status: "Pending",
  },
  {
    id: 3,
    StartDate: "03/08/24",
    EndDate: "10/08/24",
    Days: "1",
    Reason: "Vacation",
    status: "Approved",
  },
  {
    id: 4,
    StartDate: "03/08/24",
    EndDate: "10/08/24",
    Days: "4",
    Reason: "Vacation",
    status: "Approved",
  },
];
const Reccuring_Time_Off_data = [
  {
    id: 1,
    StartDate: "03/08/24",
    EndDate: "10/08/24",
    Days: "3",
    StartTime: "05:00 AM",
    EndTime: "08:00 PM",
  },
  {
    id: 2,
    StartDate: "03/08/24",
    EndDate: "10/08/24",
    Days: "2",
    StartTime: "05:00 AM",
    EndTime: "08:00 PM",
  },
  {
    id: 3,
    StartDate: "03/08/24",
    EndDate: "10/08/24",
    Days: "1",
    StartTime: "05:00 AM",
    EndTime: "08:00 PM",
  },
  {
    id: 4,
    StartDate: "03/08/24",
    EndDate: "10/08/24",
    Days: "4",
    StartTime: "05:00 AM",
    EndTime: "08:00 PM",
  },
];

const Past_Time_Off_data = [
  {
    id: 1,
    StartDate: "03/08/24",
    EndDate: "10/08/24",
    Days: "3",
    Reason: "Vacation",
  },
  {
    id: 2,
    StartDate: "03/08/24",
    EndDate: "10/08/24",
    Days: "2",
    Reason: "Vacation",
  },
  {
    id: 3,
    StartDate: "03/08/24",
    EndDate: "10/08/24",
    Days: "1",
    Reason: "Vacation",
  },
  {
    id: 4,
    StartDate: "03/08/24",
    EndDate: "10/08/24",
    Days: "4",
    Reason: "Vacation",
  },
];

const TimeOff = () => {
  const formatDate = (date) => {
    return moment(date).format("DD MMM YYYY");
  };
  return (
    <div>
      {/* <Nav /> */}
      <div className="dashBcontbody time-off-wrap">
        <div className="patientsheading dpblock">
          <div className="patientsearchbar">
            <h3 className="name">Time Off</h3>
            <div className="btnxscenter ml-auto">
              <button
                className="custom_btn red addform_btn rmargin"
                type="button"
              >
                + Add Time Off
              </button>
              <button className="custom_btn addform_btn" type="button">
                + Add Recurring
              </button>
            </div>
          </div>
        </div>
        <div className="signup_threebox time_Offbox">
          <div className="insideboxheading">
            <h4>Upcoming Time Off</h4>
          </div>
          <ul className="patientlist">
            <li className="listvat hedoutline">
              <h6>Start Date</h6>
              <button className="sortButton"></button>
            </li>
            <li className="listvat hedoutline">
              <h6>End Date</h6>
              <button className="sortButton"></button>
            </li>
            <li className="listvat hedoutline">
              <h6>#Days</h6>
            </li>
            <li className="listvat hedoutline">
              <h6>Reason</h6>
            </li>
            <li className="listvat hedoutline">
              <h6>Status</h6>
            </li>
            <li className="listvat hedoutline">
              <h6>Edit</h6>
            </li>
            {Upcoming_Time_Off_data.map((item, i) => (
              <React.Fragment>
                <li className="listprice2 coltoutline">
                  <div className="form-group">
                    <h6>Date received</h6>
                    <p>{formatDate(item.StartDate)}</p>
                  </div>
                </li>
                <li className="listprice2 coltoutline">
                  <h6>Edit</h6>
                  <p>{formatDate(item.EndDate)}</p>
                </li>
                <li className="listprice2 coltoutline">
                  <h6>Patient DOB</h6>
                  <p>{item.Days} Days</p>
                </li>
                <li className="listprice2 coltoutline">
                  <h6>Document Type</h6>
                  <p>{item.Reason}</p>
                </li>
                <li className="listprice2 coltoutline">
                  <h6>Status</h6>
                  <p className="colordark">
                    <span
                      className="dot1"
                      style={{
                        backgroundColor:
                          item.status === "Reviewed"
                            ? "#FF2B2B"
                            : item.status === "Pending"
                            ? "#F6BA06"
                            : "#05C882",
                      }}
                    ></span>
                    {item.status}
                  </p>
                </li>
                <li className="listprice2 coltoutline">
                  <div className="edt_rmviconbox">
                    <button
                      type="submit"
                      className="deletebtn"
                      data-bs-toggle="modal"
                      data-bs-target="#myModal"
                    >
                      <img
                        src="/static/media/editicon.1c334d5c95e7c59d24dddc734bb8180f.svg"
                        alt=""
                      />
                    </button>
                    <button
                      type="button"
                      className="deletebtn"
                      data-bs-toggle="modal"
                      data-bs-target="#myModal"
                    >
                      <img
                        src="/static/media/removicon.5597cbfa0e30468865906d7b578973b0.svg"
                        alt=""
                      />
                    </button>
                  </div>
                </li>
              </React.Fragment>
            ))}
          </ul>
        </div>

        <div className="signup_threebox time_Offbox">
          <div className="insideboxheading">
            <h4>Recurring Time Off</h4>
          </div>
          <ul className="patientlist">
            <li className="listvat hedoutline">
              <h6>Start Date</h6>
              <button className="sortButton"></button>
            </li>
            <li className="listvat hedoutline">
              <h6>End Date</h6>
              <button className="sortButton"></button>
            </li>
            <li className="listvat hedoutline">
              <h6>#Days</h6>
            </li>
            <li className="listvat hedoutline">
              <h6>Start Time</h6>
            </li>
            <li className="listvat hedoutline">
              <h6>End Time</h6>
            </li>
            <li className="listvat hedoutline">
              <h6>Edit</h6>
            </li>
            {Reccuring_Time_Off_data.map((item, i) => (
              <React.Fragment>
                <li className="listprice2 coltoutline">
                  <div className="form-group">
                    <h6>Date received</h6>
                    <p>{formatDate(item.StartDate)}</p>
                  </div>
                </li>
                <li className="listprice2 coltoutline">
                  <h6>Edit</h6>
                  <p>{formatDate(item.EndDate)}</p>
                </li>
                <li className="listprice2 coltoutline">
                  <h6>Patient DOB</h6>
                  <p>{item.Days} Days</p>
                </li>
                <li className="listprice2 coltoutline">
                  <h6>Document Type</h6>
                  <p>{item.StartTime}</p>
                </li>
                <li className="listprice2 coltoutline">
                  <h6>Status</h6>
                  <p className="colordark">{item.EndTime}</p>
                </li>
                <li className="listprice2 coltoutline">
                  <div className="edt_rmviconbox">
                    <button
                      type="submit"
                      className="deletebtn"
                      data-bs-toggle="modal"
                      data-bs-target="#addTask_modal"
                    >
                      <img
                        src="/static/media/editicon.1c334d5c95e7c59d24dddc734bb8180f.svg"
                        alt=""
                      />
                    </button>
                    <button
                      type="button"
                      className="deletebtn"
                      data-bs-toggle="modal"
                      data-bs-target="#myModal"
                    >
                      <img
                        src="/static/media/removicon.5597cbfa0e30468865906d7b578973b0.svg"
                        alt=""
                      />
                    </button>
                  </div>
                </li>
              </React.Fragment>
            ))}
          </ul>
        </div>

        <div className="signup_threebox time_Offbox">
          <div className="insideboxheading">
            <h4>Past Time Off</h4>
          </div>
          <ul className="patientlist">
            <li className="listvat hedoutline past_Timelist">
              <h6>Start Date</h6>
              <button className="sortButton"></button>
            </li>
            <li className="listvat hedoutline past_Timelist">
              <h6>End Date</h6>
              <button className="sortButton"></button>
            </li>
            <li className="listvat hedoutline past_Timelist">
              <h6>#Days</h6>
            </li>
            <li className="listvat hedoutline past_Timelist">
              <h6>Reason</h6>
            </li>
            {Past_Time_Off_data.map((item, i) => (
              <React.Fragment>
                <li className="listprice2 coltoutline past_Timelist">
                  <div className="form-group">
                    <h6>Date received</h6>
                    <p>{formatDate(item.StartDate)}</p>
                  </div>
                </li>
                <li className="listprice2 coltoutline past_Timelist">
                  <h6>Edit</h6>
                  <p>{formatDate(item.EndDate)}</p>
                </li>
                <li className="listprice2 coltoutline past_Timelist">
                  <h6>Patient DOB</h6>
                  <p>{item.Days} Days</p>
                </li>
                <li className="listprice2 coltoutline past_Timelist">
                  <h6>Document Type</h6>
                  <p>{item.Reason}</p>
                </li>
              </React.Fragment>
            ))}
          </ul>
        </div>
        <DeleteModal/>
      </div>
    </div>
  );
};

export default TimeOff;
