import React, { useState } from "react";
import ProgressStep from "../../../components/ProgressStep";
import { useNavigate } from "react-router-dom";

const SignUp_stepthree = () => {
  const option = [
    {
      id: 1,
      title: "Monday",
    },
    {
      id: 2,
      title: "Tuesday",
    },
    {
      id: 3,
      title: "Wednesday",
    },
    {
      id: 4,
      title: "Thursday",
    },
    {
      id: 5,
      title: "Friday",
    },
    {
      id: 6,
      title: "Saturday",
    },
    {
      id: 7,
      title: "Sunday",
    },
  ];

  const [active, setActive] = useState([]);
  const handleChange = (itemId) => {
    setActive((prevActive) => {
      const updatedActive = [...prevActive];
      const index = updatedActive.indexOf(itemId);
      if (index === -1) {
        updatedActive.push(itemId);
      } else {
        updatedActive.splice(index, 1);
      }
      return updatedActive;
    });
  };

  const navigate = useNavigate()
  return (
    <>
      <section className="signup_section">
        <div className="container containarwhite">
          <div className="row">
            <ProgressStep activeStep={3} />
            <div className="col-md-12">
              <h2 className="d_name mb38">Opening hours</h2>
              <div className="weeklyopening_box">
                <div className="wekliheading">
                  <div className="wekliheadingbox">
                    <h3>Weekly opening Days</h3>
                  </div>
                  <div className="wekliheadingbox">
                    <h3>Weekly opening Days</h3>
                  </div>
                </div>
                {option.map((item, i) => (
                  <>
                    <ul key={item.id}>
                      <li>
                        <h6>{item.title}</h6>
                      </li>
                      <li>
                        <div className="form-check form-switch onoff_area">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            role="switch"
                            id={`flexSwitchCheckDefault${item.id}`}
                            onChange={() => handleChange(item.id)}
                          />
                          <label
                            className="form-check-label"
                            htmlFor={`flexSwitchCheckDefault${item.id}`}
                          >
                            {!active.includes(item.id) ? "Disable" : "Enable"}
                          </label>
                        </div>
                      </li>
                      <li>
                        <div className="formflex">
                          <div className="input-group">
                            <span className="input-group-text">from</span>
                            <input type="time" className="form-control" />
                          </div>
                          <div className="input-group">
                            <span className="input-group-text">to</span>
                            <input type="time" className="form-control" />
                          </div>
                        </div>
                      </li>
                    </ul>
                  </>
                ))}
              </div>
            </div>
                <div className="btnxscenter">
                  <button className="custom_btn login_btn" type="submit" style={{width:"236px",marginTop:"31px"}} onClick={()=>navigate("/signup_four")}>
                    Save
                  </button>
                </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SignUp_stepthree;
