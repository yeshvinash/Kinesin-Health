import React, { useState } from "react";
import regImg from "../../../assets/images/image 56.png";
import edit_img from "../../../assets/images/edit_img.svg";
import emailicon from "../../../assets/images/emailicon.svg";
import microsoft from "../../../assets/images/microsoft.svg";
import google from "../../../assets/images/google.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addProfession, removeprofession } from "../../../redux/service/ProfessionSlice";

const options = [
  {
    id: 1,
    label: "Dr. Noel Cassidy",
    image: require("../../../assets/images/dr1.png"),
  },
  {
    id: 2,
    label: "Doctor James",
    image: require("../../../assets/images/dr2.png"),
  },
  {
    id: 3,
    label: "Doctor Mary",
    image: require("../../../assets/images/dr3.png"),
  },
  {
    id: 4,
    label: "Dublin Dental",
    image: require("../../../assets/images/dr1.png"),
  },
];
const AppoinmentStepFour = () => {
  

  const navigate = useNavigate();

  const dispatch = useDispatch()
  // Data display operator from previous page//
  const selectedDate = useSelector((state) => state.dateTime.date);
  const selectedTime = useSelector((state) => state.dateTime.time);
  const selectedServices = useSelector(
    (state) => state.service.selectedServices
  );
  const selectedProfessional = useSelector(
    (state) => state.profession.selectedProfessional
  );
  // Data display operator from previous page//

  // Dropdown section start//
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option.label);
    dispatch(removeprofession());

    dispatch(
      addProfession({
        name: option.label,
        image: option.image,
      })
    );
    setIsOpen(false);
  };
   // Dropdown section end//
  return (
    <>
      <section className="signup_section">
        <div className="container">
          <div className="row">
            <div className="col-md-7 ">
              <h2 className="d_name mb38">Rathgar Dental</h2>
              <div className="log_wrap">
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

                  <li>
                    <div className="editdetails">
                      <h4>Your Scheduled date and time</h4>
                      <h3>
                        {selectedDate} {selectedTime}
                      </h3>
                    </div>
                    <a href={(e)=>e.preventDefault() } className="imgedit">
                      <img src={edit_img} alt="" />
                    </a>
                  </li>
                </ul>
                <p className="head_para">Sign in</p>
                <ul className="edit_signin">
                  <li onClick={() => navigate("/")}>
                    <a>
                      <img src={emailicon} alt="" /> Continue with Email
                    </a>
                  </li>
                  <li>
                    <a href={(e)=>e.preventDefault() }>
                      <img src={microsoft} alt="" />
                      Continue with Microsoft
                    </a>
                  </li>
                  <li>
                    <a href="https://www.gmail.com/">
                      <img src={google} alt="" />
                      Continue with Google
                    </a>
                  </li>
                </ul>
                <div className="btnxscenter text-center">
                  <button className="custom_btn login_btn" type="submit" onClick={()=> navigate("/patient-info")}>
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

export default AppoinmentStepFour;
