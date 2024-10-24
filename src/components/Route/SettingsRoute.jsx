import React, { useEffect } from "react";
import Nav from "../AfterLoginNav/Nav";
import { Route, Routes, Outlet } from "react-router-dom";
import Tab from "../SettingsTab/Tab";
import PracticeDetails from "../../view/app/alliedsettings/PracticeDetails";
import UserDetails from "../../view/app/alliedsettings/UserDetails";
import ServiceDetails from "../../view/app/alliedsettings/ServiceDetails";
import PracticeHoursDetails from "../../view/app/alliedsettings/PracticeHoursDetails";
import StaffHoursDetails from "../../view/app/alliedsettings/StaffHoursDetails";
import NotificationDetails from "../../view/app/alliedsettings/NotificationDetails";
import PayementDetails from "../../view/app/alliedsettings/PayementDetails";
import { Toaster } from "react-hot-toast";

const SettingsRoute = ({ activeTab }) => {
  // const location = window.location.pathname;
  // console.log(location,"Location");
  useEffect(() => {
    // Update the header when the active tab changes
    const header = document.querySelector(".name");
    if (header) {
      header.textContent = `Settings - ${activeTab}`;
    }
  }, [activeTab]); // Add activeTab as a dependency

  return (
    <>
      <div>
        {/* <Nav /> */}
   
        <div className="dashBcontbody">
          <div className="patientsheading">
            <div className="patientsearchbar practice_details">
              <h3 className="name">{`Settings - ${activeTab}`}</h3>
            </div>
          </div>

          {/* start practice_details section */}
          <div className="signup_threebox practice_detailssect mt-0">
            <Tab />

            {/* <Routes>
              <Route path="/" element={<Tab />}>
                <Route path="practice_details" element={<PracticeDetails />} />
                <Route path="user_details" element={<UserDetails />} />
                <Route path="service_details" element={<ServiceDetails />} />
                <Route
                  path="practice_hours_details"
                  element={<PracticeHoursDetails />}
                />
                <Route
                  path="staff_hours_details"
                  element={<StaffHoursDetails />}
                />
                <Route
                  path="notifications_details"
                  element={<NotificationDetails />}
                />
                <Route path="payments_details" element={<PayementDetails />} />
              </Route>
            </Routes>
            <Outlet /> */}
          </div>
          {/* end practice_details section */}
        </div>
      </div>
    </>
  );
};

export default SettingsRoute;
