import React, { useEffect, useState } from "react";
import Nav from "../../../components/AfterLoginNav/Nav";
import Tab from "../../../components/SettingsTab/Tab";
import "../../../assets/css/allied_settings.css";
import moment from "moment";
import {
  PRACTICE_HOURS_CONTROLER_URL,
  PRACTICE_HOURS_CONTROLER_URL_ID,
  PRACTICE_HOURS_CONTROLER_URL_List,
  PRACTICE_HOURS_DISABLE_CONTROLER_URL,
} from "../../../api/Service";
import { createAxiosInstance } from "../../../api/axiosConfig";
import { useDispatch, useSelector } from "react-redux";
import { EndTime, StartTime } from "../../../Utils/Constant";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { logoutFromHelper } from "../../../api/Helper";
import { logout } from "../../../redux/auth/AuthSlice";
import { removeuser } from "../../../redux/user/userSlice";

const PracticeHoursDetails = () => {
  const [active, setActive] = useState([]);
  const [practice_hours_details, setPractice_Hours_Details] = useState([]);
  const [errors, setErrors] = useState({});
  let tenantVal = useSelector((state) => state.auth.user?.tenant);
  if (!tenantVal)
    tenantVal = localStorage.getItem('kinesin-tenant');
  const { timeZone } = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  console.log("timezone ===->", timeZone);

  console.log("practice hours", practice_hours_details);
  const trueStatusArray = practice_hours_details.filter(
    (item) => item.disabled === true
  );
  console.log("enable data", trueStatusArray);

  // For Toogle Switch Handler end//

  // Get Request //
  useEffect(() => {
    fetchHours();
  }, [tenantVal]);
  const fetchHours = async () => {
    try {
      const axiosInstance = createAxiosInstance();
      const response = await axiosInstance.get(
        `${tenantVal}${PRACTICE_HOURS_CONTROLER_URL}`
      );
      console.log("response data ==>", response.data);
      const data = response.data.sort((a, b) => a.id - b.id);

      setPractice_Hours_Details(data);
    } catch (error) {
      errorHandling(error);
    }
  };
  // Get Request //

  const fethchHoursId = async (id) => {
    try {
      const axiosInstance = createAxiosInstance();
      const url = `${tenantVal}${PRACTICE_HOURS_CONTROLER_URL_ID}${id}`;
      const response = axiosInstance.get(url);
      const givenData = (await response).data;
      // console.log("single day hours data", givenData);

      StatusChange(id, givenData);
    } catch (error) {
      console.error(error);
    }
  };
  const StatusChange = async (id, givenData) => {
    const modifiedData = {
      day: givenData.day,
      dayNo: givenData.dayNo,
      disabled: !givenData.disabled,
      endTime: givenData.endTime,
      id: id,
      startTime: givenData.startTime,
      tenant: givenData.tenant,
    };

    try {
      const axiosInstance = createAxiosInstance();

      const response = await axiosInstance.post(
        `${tenantVal}${PRACTICE_HOURS_DISABLE_CONTROLER_URL}`,
        modifiedData
      );
      console.log(response.data);
      fetchHours();
    } catch (error) {
      errorHandling(error);
    }
  };

  const handleStatusChange = (id) => {
    // const updatedData = practice_hours_details.map((item) => {
    //   if (item.id === id) {
    //     return { ...item, disabled: !item.disabled };
    //   }
    //   return item;
    // });

    // // Update the state with the modified array
    // setPractice_Hours_Details(updatedData);
    fethchHoursId(id);
  };

  const saveTime = async () => {
    const hasErrors = Object.values(errors).some(error => !!error);
    if (hasErrors) {
      toast.error('Please correct the Timings before saving.');
    } else {

      if (practice_hours_details.length > 1) {
        try {
          const axiosInstance = createAxiosInstance();

          const response = await axiosInstance.post(
            `${tenantVal}${PRACTICE_HOURS_CONTROLER_URL_List}`,
            practice_hours_details
          );
          console.log(response.data);
          toast.success('Practice hours updated successfully.');
          fetchHours();
        } catch (error) {
          errorHandling(error);
        }
      } else {
        try {
          const axiosInstance = createAxiosInstance();

          const response = await axiosInstance.post(
            `${tenantVal}${PRACTICE_HOURS_CONTROLER_URL}`,
            practice_hours_details[0]
          );
          console.log(response.data);
          fetchHours();
        } catch (error) {
          errorHandling(error);
        }
      }
    }
  };
  // Post Request//

  const handleStarttime = (id, event) => {
    const newStartTime = event.target.value;
    const correspondingEndTime = practice_hours_details.find(item => item.id === id)?.endTime;

    // Check if the new start time is greater than or equal to the corresponding end time
    if (correspondingEndTime && newStartTime >= correspondingEndTime) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [id]: "Start time must be less than the end time"
      }));
      // return
    } else {
      // Clear the error message if the input is valid
      setErrors(prevErrors => ({
        ...prevErrors,
        [id]: ""
      }));
    }

    console.log("handleStarttime", id, event.target.value);
    const newsendTime = practice_hours_details.map((i) => {
      if (id === i.id) {
        i["startTime"] = event.target.value;
      }
      return i;
    });

    setPractice_Hours_Details(newsendTime);
  };

  const handleEndtime = (id, event) => {
    const newEndTime = event.target.value;
    const correspondingStartTime = practice_hours_details.find(item => item.id === id)?.startTime;

    // Check if the new end time is less than or equal to the corresponding start time
    if (correspondingStartTime && newEndTime <= correspondingStartTime) {
      setErrors(prevErrors => ({
        ...prevErrors,
        [id]: "End time must be greater than the start time"
      }));
      // return
    } else {
      // Clear the error message if the input is valid
      setErrors(prevErrors => ({
        ...prevErrors,
        [id]: ""
      }));
    }
    console.log("handleStarttime", id, event.target.value);
    const newsendTime = practice_hours_details.map((i) => {
      if (id === i.id) {
        i["endTime"] = event.target.value;
      }
      return i;
    });
    setPractice_Hours_Details(newsendTime);
  };
  const convertString = (input) => {
    if (Array.isArray(input)) {
      // If the input is an array [9, 0], convert it to "HH:MM" format
      const hours = String(input[0]).padStart(2, "0");
      const minutes = String(input[1]).padStart(2, "0");
      return `${hours}:${minutes}`;
    } else if (typeof input === "string") {
      // If the input is already a string, check if it's in "HH:MM" format
      if (/^\d{2}:\d{2}$/.test(input)) {
        return input; // Return the input as is
      }
    }

    // If the input format is not recognized, return an empty string or handle it accordingly
    return "";
  };

  const errorHandling = (error) => {
    console.log(error);
    toast.error(error.message);
    if (error && error.response && error.response.status) {
      if (error.response.status == 403) {
        logoutFromHelper();
        dispatch(logout())
        dispatch(removeuser())
        navigate("/logout");
      }
    }
  }

  return (
    <div>
      {/* <Nav /> */}
      <Toaster position="top-center" reverseOrder={false} />
      <div className="dashBcontbody">
        <div className="patientsheading dpblock">
          <div className="patientsearchbar">
            <h3 className="name">Settings - Practice Hours</h3>
          </div>
        </div>
        <div className="signup_threebox practice_detailssect mt-0">
          <Tab />
          <div
            className="tab-content ptdetalistabcont user_detailsboxtab"
            id="pills-tabContent"
          >
            <div className="show active">
              <div className="practice_hours">
                <ul className="hours_list">
                  <li className="hours_head fordesktop">
                    <h6>Weekly opening Days</h6>
                  </li>
                  <li className="hours_head fordesktop">
                    <h6>Weekly opening hours</h6>
                  </li>
                  <li className="hours_head forphon">
                    <h6>Weekly opening Days and Hours</h6>
                  </li>
                  {practice_hours_details.map((item, i) => (
                    <>
                      <li>{item.day}</li>
                      <li>
                        <div className="form-check form-switch onoff_area">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            role="switch"
                            checked={!item.disabled}
                            onClick={() => handleStatusChange(item.id)}
                          />
                          <label
                            className="form-check-label"
                            for="flexSwitchCheckDefault1"
                          // htmlFor={`flexSwitchCheckDefault${item.id}`}
                          >
                            {!item.disabled ? "Enabled" : "Disabled"}
                            {/* {item.id} */}
                            {/* {!active.includes(item.id) ? "Disable" : "Enable"} */}
                          </label>
                        </div>
                      </li>
                      <li className="timelist">
                        <div className="input-group">
                          <span className="input-group-text">from</span>

                          <select
                            onChange={(event) => {
                              handleStarttime(item.id, event);
                            }}
                            className="form-select"
                            value={convertString(item.startTime)}
                          >
                            <option value="">Select</option>
                            {StartTime.map((starttime) => (
                              <option key={starttime} value={starttime}>
                                {starttime}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="input-group">
                          <span className="input-group-text">to</span>
                          {/* <select
className="form-select"
aria-label="Default select example"
onChange={
(e) =>
handleTimeSlotClick(
splitTime(e.target.value),
item.dayName,
item.id
) // Pass dayName and dayNo here
}
>
{endTimeslots}
</select> */}
                          <select
                            onChange={(event) => {
                              handleEndtime(item.id, event);
                            }}
                            className="form-select"
                            value={convertString(item.endTime)}
                          >
                            <option value="">Select</option>
                            {EndTime.map((endtime) => (
                              <option key={endtime} value={endtime}>
                                {endtime}
                              </option>
                            ))}
                          </select>
                        </div>
                        {
                          errors && errors[item.id] &&
                          <div style={{ color: 'red' }} className="error-msg">{errors[item.id]}</div>
                        }

                      </li>
                    </>
                  ))}
                </ul>
                <div className="btnxscenter">
                  <button
                    className="custom_btn savwidth"
                    type="submit"
                    onClick={saveTime}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PracticeHoursDetails;
