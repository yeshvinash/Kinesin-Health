import React, { useEffect, useState } from "react";
import "../../../assets/css/allied_settings.css";
import Nav from "../../../components/AfterLoginNav/Nav";
import Tab from "../../../components/SettingsTab/Tab";
import { createAxiosInstance } from "../../../api/axiosConfig";
import { GET_NOTIFICATION, UPDATE_NOTIFICATION } from "../../../api/Service";
import { useDispatch, useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { logoutFromHelper } from "../../../api/Helper";
import { logout } from "../../../redux/auth/AuthSlice";
import { removeuser } from "../../../redux/user/userSlice";

let settingsNotifications = [
  {
    id: 1,
    notificationsText: "Email then SMS notifications:",
    isEnable: false
  },
  {
    id: 2,
    notificationsText: "SMS notifcations:",
    isEnable: false
  },
  {
    id: 3,
    notificationsText: "Check in notifcations:",
    isEnable: false
  },
  {
    id: 4,
    notificationsText: "Appointment reminders:",
    isEnable: false
  },
  {
    id: 5,
    notificationsText: "Send Payment Notification:",
    isEnable: false
  },
  {
    id: 6,
    notificationsText: "Invoice reminder:",
    isEnable: false
  },
];



const NotificationDetails = () => {
  const [active, setActive] = useState([]);
  let tenantVal = useSelector((state) => state.auth.user?.tenant);
  if (!tenantVal)
    tenantVal = localStorage.getItem('kinesin-tenant');

  const [id, setId] = useState(null);
  const [smsEnabled, setSmsEnabled] = useState(false);
  const [checkInNotifications, setCheckInNotifications] = useState(false);
  const [smsAppointmentNotifications, setSmsAppointmentNotifications] = useState(false);
  const [paymentReminders, setPaymentReminders] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (itemId) => {
    setActive(prevActive => {
      const updatedActive = [...prevActive];
      const index = updatedActive.indexOf(itemId);
      if (index === -1) {
        updatedActive.push(itemId);
      } else {
        updatedActive.splice(index, 1);
      }
      return updatedActive;
    });
  }

  const fetchNotification = async () => {
    try {
      const axiosInstance = createAxiosInstance();
      const response = await axiosInstance.get(
        `${tenantVal}${GET_NOTIFICATION}`
      );
      console.log('response : ' + JSON.stringify(response));
      if (response && response.data && response.data.length > 0) {
        setId(response.data[0].id);
        setSmsEnabled(response.data[0].smsEnabled);
        setCheckInNotifications(response.data[0].checkInNotifications);
        setSmsAppointmentNotifications(response.data[0].smsAppointmentNotifications);
        setPaymentReminders(response.data[0].paymentReminders);
      }
    } catch (error) {
      errorHandling(error);
    }
  }

  useEffect(() => {
    fetchNotification();
  }, []);



  const handleSave = async () => {
    try {

      if (!id) {
        toast.error('Oops! id not found.');
        return;
      }

      let postData = {
        'id': id,
        "tenant": tenantVal,
        'smsEnabled': smsEnabled,
        'checkInNotifications': checkInNotifications,
        'smsAppointmentNotifications': smsAppointmentNotifications,
        'paymentReminders' : paymentReminders
      };

      const axiosInstance = createAxiosInstance();
      const response = await axiosInstance.post(
        `${tenantVal}${UPDATE_NOTIFICATION}`,
        postData
      );

      toast.success('Notification updated successfully.');
    } catch (error) {
      errorHandling(error);
    }
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
        <div className="patientsheading mb20">
          <div className="patientsearchbar responsivdisplay">
            <h3 className="name">Settings - Notifications</h3>
          </div>
        </div>
        <div className="signup_threebox practice_detailssect mt-0">
          <Tab />
          <div
            className="tab-content settingsNotificationsect"
            id="pills-tabContent"
          >
            <div className="show active">
              <ul className="settingsNotlist">

                <li>
                  <h6 
                  // className="requiredValidator"
                  > Email then SMS notifications </h6>
                  <div className="form-check form-switch onoff_area">
                  </div>
                </li>

                <li>
                  <h6 className="requiredValidator"> SMS notifications </h6>
                  <div className="form-check form-switch onoff_area">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      role="switch"
                      id={`setSmsEnabled`}
                      value={smsEnabled}
                      checked={smsEnabled}
                      onChange={(e) => {
                        setSmsEnabled(e.target.checked);
                      }}
                    />
                  </div>
                </li>

                <li>
                  <h6 className="requiredValidator"> Check in notifications </h6>
                  <div className="form-check form-switch onoff_area">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      role="switch"
                      id={`checkInNotifications`}
                      value={checkInNotifications}
                      checked={checkInNotifications}
                      onChange={(e) => {
                        setCheckInNotifications(e.target.checked);
                      }}
                    />
                  </div>
                </li>

                <li>
                  <h6 className="requiredValidator"> Appointment reminders </h6>
                  <div className="form-check form-switch onoff_area">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      role="switch"
                      id={`smsAppointmentNotifications`}
                      value={smsAppointmentNotifications}
                      checked={smsAppointmentNotifications}
                      onChange={(e) => {
                        setSmsAppointmentNotifications(e.target.checked);
                      }}
                    />
                  </div>
                </li>

                <li>
                  <h6 className="requiredValidator"> Send Payment Notification </h6>
                  <div className="form-check form-switch onoff_area">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      role="switch"
                      id={`paymentReminders`}
                      value={paymentReminders}
                      checked={paymentReminders}
                      onChange={(e) => {
                        setPaymentReminders(e.target.checked);
                      }}
                    />
                  </div>
                </li>


                <li>
                  <h6 
                  // className="requiredValidator"
                  > Invoice reminder </h6>
               <div>
                  </div>
                </li>



                {/* {settingsNotifications.map((item, i) => (
                  <>
                    <li>
                      <h6>{item.notificationsText}: {item.isEnable ? 'yes' : 'no'}</h6>
                      <div className="form-check form-switch onoff_area">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          role="switch"
                          id={`flxexSwitchCheckDefault${item.id}`}
                          value={item.isEnable}
                          checked={item.isEnable}
                          onChange={(e) => {
                            handleChange(item.id);
                            item.isEnable = e.target.checked;
                          }}

                        />
                        <label
                          className="form-check-label"
                          for="flexSwitchCheckDefault1"
                          htmlFor={`flexSwitchCheckDefault${item.id}`}
                        >
                          {!active.includes(item.id) ? "Disable" : "Enable"}
                        </label>
                      </div>
                    </li>
                  </>
                ))} */}

              </ul>
              <div className="btnxscenter">
                <button className="custom_btn savwidth" type="submit" onClick={handleSave}>
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
};

export default NotificationDetails;
