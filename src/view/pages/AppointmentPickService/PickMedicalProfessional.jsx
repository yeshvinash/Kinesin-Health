import React, { useEffect, useState } from "react";
import regImg from "../../../assets/images/image 56.png";
import dr1 from "../../../assets/images/dr1.png";
import dr2 from "../../../assets/images/dr2.png";
import dr3 from "../../../assets/images/dr3.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addProfession,
  removeprofession,
} from "../../../redux/service/ProfessionSlice";

const PickMedicalProfessional = () => {
  const [activeCheckboxes, setActiveCheckboxes] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const professionalSelected = useSelector(
    (state)=> state.profession.selectedProfessional
  )
  
  function getImage(name) {
    switch (name) {
      case "No Preference":
        return null;
      case "Dr. Noel Cassidy":
        return dr1;
      case "Doctor James":
        return dr2;
      case "Doctor Mary":
        return dr3;
      default:
        return null;
    }
  }

  function handleCheckboxChange(event) {
    const value = event.target.value;
    const isChecked = event.target.checked;

    const profession = {
      name: value,
      image: getImage(value),
    };
    if (isChecked) {
      const updatedCheckboxes = [...activeCheckboxes, value];
      setActiveCheckboxes(updatedCheckboxes);
      dispatch(
        addProfession(profession)
      );
    } else {
      const updatedCheckboxes = activeCheckboxes.filter(
        (item) => item.name !== profession.name
      );
      setActiveCheckboxes(updatedCheckboxes);
      dispatch(removeprofession(profession));
    }

  }
  
 

  return (
    <>
      <section className="signup_section">
        <div className="container">
          <div className="row">
            <div className="col-md-7 ">
              <h2 className="d_name mb38">Rathgar Dental</h2>
              <div className="log_wrap">
                <form>
                  <p className="head_para">Select Provider</p>
                  <ul className="pick_service_list">
                    <li>
                      <label
                        className={`agree_check basisfull ${
                          activeCheckboxes.includes("No Preference")
                            ? "active"
                            : ""
                        }`}
                      >
                        <input
                          name="tandc"
                          type="checkbox"
                          value="No Preference"
                          onClick={handleCheckboxChange}
                        />
                        <span className="agree_check_txt">No Preference</span>
                        <span className="checkmark"></span>
                      </label>
                    </li>

                    <li>
                      <label
                        className={`agree_check basisfull ${
                          activeCheckboxes.includes("Dr. Noel Cassidy")
                            ? "active"
                            : ""
                        }`}
                      >
                        <input
                          name="tandc"
                          type="checkbox"
                          value="Dr. Noel Cassidy"
                          onClick={handleCheckboxChange}
                        />
                        <span className="drimg">
                          <img src={dr1} alt="" />
                        </span>
                        <span className="agree_check_txt">
                          Dr. Noel Cassidy
                        </span>
                        <span className="checkmark"></span>
                      </label>
                    </li>

                    <li>
                      <label
                        className={`agree_check basisfull ${
                          activeCheckboxes.includes("Doctor James")
                            ? "active"
                            : ""
                        }`}
                      >
                        <input
                          name="tandc"
                          type="checkbox"
                          value="Doctor James"
                          onClick={handleCheckboxChange}
                        />
                        <span className="drimg">
                          <img src={dr2} alt="" />
                        </span>
                        <span className="agree_check_txt">Doctor James</span>
                        <span className="checkmark"></span>
                      </label>
                    </li>

                    <li>
                      <label
                        className={`agree_check basisfull ${
                          activeCheckboxes.includes("Doctor Mary")
                            ? "active"
                            : ""
                        }`}
                      >
                        <input
                          name="tandc"
                          type="checkbox"
                          value="Doctor Mary"
                          onClick={handleCheckboxChange}
                        />
                        <span className="drimg">
                          <img src={dr3} alt="" />
                        </span>
                        <span className="agree_check_txt">Doctor Mary</span>
                        <span className="checkmark"></span>
                      </label>
                    </li>
                  </ul>
                  <div className="btnxscenter">
                    <button
                      className="custom_btn login_btn"
                      type="submit"
                      onClick={() => navigate("/pick-date")}
                    >
                      Next
                    </button>
                  </div>
                </form>
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

export default PickMedicalProfessional;
