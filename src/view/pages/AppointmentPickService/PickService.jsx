import React, { useEffect, useState } from "react";
import regImg from "../../../assets/images/image 56.png";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addService, removeService} from "../../../redux/service/ServiceSlice";
const PickService = () => {
  const [activeCheckboxes, setActiveCheckboxes] = useState([]);

  //For passing data tonext page//
  const dispatch = useDispatch();

  // For navigation//
  const navigate = useNavigate();

  const serviceSelected = useSelector((state)=>state.service.selectedServices )


  // Select checkbox value//
  function handleCheckboxChange(event) {
    const value = event.target.value;
    const isChecked = event.target.checked;

    if (isChecked) {
      const updatedCheckboxes = [...activeCheckboxes, value];
      setActiveCheckboxes(updatedCheckboxes);
      dispatch(addService(value));
    } else {
      const updatedCheckboxes = activeCheckboxes.filter((item) => item !== value);
      setActiveCheckboxes(updatedCheckboxes);
      dispatch(removeService(value));
    }
  }
  // Select checkbox value//

  useEffect(() => {
    // Update activeCheckboxes state with selected services from Redux store
    setActiveCheckboxes(serviceSelected);
  }, [serviceSelected]);
 

  return (
    <>
      <section className="signup_section">
        <div className="container">
          <div className="row">
            <div className="col-md-7 ">
              <h2 className="d_name mb38">Rathgar Dental</h2>
              <div className="log_wrap">
                <form>
                  <p className="head_para">Pick Service</p>
                  <ul className="pick_service_list">
                    <li>
                      <label
                        className={`agree_check ${
                          activeCheckboxes.includes("Dentist") ? "active" : ""
                        }`}
                      >
                        <input
                          name="tandc"
                          type="checkbox"
                          value="Dentist"
                          onChange={handleCheckboxChange}
                          checked={activeCheckboxes.includes("Dentist")}
                        />
                        <span className="agree_check_txt">Dentist</span>
                        <span className="checkmark"></span>
                      </label>
                      <h6>58 Euro</h6>
                    </li>

                    <li>
                      <label
                        className={`agree_check ${
                          activeCheckboxes.includes("Dental Nurse")
                            ? "active"
                            : ""
                        }`}
                      >
                        <input
                          name="tandc"
                          type="checkbox"
                          value="Dental Nurse"
                          onChange={handleCheckboxChange}
                          checked={activeCheckboxes.includes("Dental Nurse")}
                        />
                        <span className="agree_check_txt">Dental Nurse</span>
                        <span className="checkmark"></span>
                      </label>
                      <h6>58 Euro</h6>
                    </li>

                    <li>
                      <label
                        className={`agree_check ${
                          activeCheckboxes.includes("Dental Hygienist")
                            ? "active"
                            : ""
                        }`}
                      >
                        <input
                          name="tandc"
                          type="checkbox"
                          value="Dental Hygienist"
                          onChange={handleCheckboxChange}
                          checked={activeCheckboxes.includes("Dental Hygienist")}
                        />
                        <span className="agree_check_txt">
                          Dental Hygienist
                        </span>
                        <span className="checkmark"></span>
                      </label>
                      <h6>58 Euro</h6>
                    </li>
                  </ul>
                  <div className="btnxscenter">
                    <button
                      className="custom_btn login_btn"
                      type="submit"
                      onClick={() => navigate("/pick-professional")}
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

export default PickService;
