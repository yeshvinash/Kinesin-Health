import React, { useEffect, useState } from "react";
import HorizontalCalendar from "../../../components/Calender";
import regImg from "../../../assets/images/image 56.png";
import edit_img from "../../../assets/images/edit_img.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  addProfession,
  clearprofession,
  removeprofession,
} from "../../../redux/service/ProfessionSlice";
import { removetime, setTime } from "../../../redux/service/DateTimeSlice";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const options = [
  {
    id: "1",
    label: "Dr. Noel Cassidy",
    image: require("../../../assets/images/dr1.png"),
  },
  {
    id: "2",
    label: "Doctor James",
    image: require("../../../assets/images/dr2.png"),
  },
  {
    id: "3",
    label: "Doctor Mary",
    image: require("../../../assets/images/dr3.png"),
  },
  {
    id: "4",
    label: "Dublin Dental",
    image: require("../../../assets/images/dr1.png"),
  },
];
const PickDate = () => {
  const dispatch = useDispatch();

  // For navigation//
  const navigate = useNavigate();

  // Data display operator from previous page//
  const selectedServices = useSelector(
    (state) => state.service.selectedServices
  );
  const selectedProfessional = useSelector(
    (state) => state.profession.selectedProfessional
  );
  
  // Data display operator from previous page//

  // Time interval section function start//
  const startTime = moment("9:00 AM", "h:mm A");
  const endTime = moment("8:30 PM", "h:mm A");
  const timeSlots = [];

  const [selectedTime, setSelectedTime] = useState(null);

  const handleTimeSlotClick = (time) => {
    setSelectedTime(time);
    dispatch(removetime())
    dispatch(setTime(time))
    console.log(time);
  };


  while (startTime <= endTime) {
    const time = startTime.format("h:mm A");
    timeSlots.push(
      <li
        key={time}
        onClick={() => handleTimeSlotClick(time)}
        className={selectedTime === time ? "active" : ""}
      >
        {startTime.format("h:mm A")}
      </li>
    );
    startTime.add(30, "minutes");
  }
  // Time interval section function end//

  // Dropdown Section//
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option.label);
    dispatch(clearprofession());

    dispatch(
      addProfession({
        name: option.label,
        image: option.image,
      })
    );
    setIsOpen(false);
  };

  // Dropdown Section//

  return (
    <>
      <section className="signup_section">
        <div className="container">
          <div className="row">
            <div className="col-md-7 ">
              <h2 className="d_name mb38">Rathgar Dental</h2>
              <div className="log_wrap select_calendar">
                <ul className="editdoct_list">
                  <li>
                    {selectedProfessional.map((profession, i) => (
                      <>
                        <div className="editdoct_img" key={profession.name}>
                          <img src={profession.image} alt="" />
                        </div>
                        <div className="editdetails">
                          <h5>{profession.name}</h5>
                          {selectedServices.map((service, i) => (
                            <h6>{service}</h6>
                          ))}
                        </div>
                      </>
                    ))}
                    <a
                      href="#"
                      className="imgedit dropdown-toggle"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <img src={edit_img} alt="" onClick={handleButtonClick} />

                      <ul className={`dropdown-menu ${isOpen ? "show" : ""}`}>
                        {options.map((item, i) => (
                          <li key={i}>
                            <a
                              className="dropdown-item"
                              onClick={() => handleOptionClick(item)}
                            >
                              <p>{item.label}</p>
                              <img src={item.image} />
                            </a>
                          </li>
                        ))}
                      </ul>
                    </a>
                  </li>
                </ul>
                {/* Calender date */}
                <HorizontalCalendar />
                {/* Calender date */}

                {/* Time Interval */}
                <ul className="timelist_sect">{timeSlots}</ul>
                {/* Time Interval */}
                <div className="btnxscenter">
                  <button
                    className="custom_btn login_btn"
                    type="submit"
                    onClick={() => navigate("/edit-doc-info")}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-5 preletiv">
              <img src={regImg} className="regImg" alt="" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default PickDate;
