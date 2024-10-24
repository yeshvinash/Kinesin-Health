import React from "react";
import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header/Header";
import LogIn from "./view/pages/LogInAuthentication/LogIn";
import SignUp from "./view/pages/SignUpAuthentication/SignUpHealthPratice";
import ForgotPassword from "./view/pages/LogInAuthentication/LostPassword";
import AuthCode from "./view/pages/LogInAuthentication/AuthCode";
import Success_msg from "./view/pages/LogInAuthentication/Success_msg";
import ResetPasswordEmail from "./view/pages/LogInAuthentication/ResetPasswordEmail";
import AuthError from "./components/AuthError";
import Registration from "./view/pages/LogInAuthentication/Registration";
import SignUp_steptwo from "./view/pages/SignUpAuthentication/SignUp_steptwo";
import Home from "./view/pages/LogInAuthentication/LogIn";
import Reg_Complete from "./view/pages/PatientSignup/Reg_Complete";
import PatientRegistration from "./view/pages/PatientSignup/PatientRegistration";
import PickService from "./view/pages/AppointmentPickService/PickService";
import AppoinmentStepFour from "./view/pages/AppointmentPickService/AppoinmentStepFour";
import PickMedicalProfessional from "./view/pages/AppointmentPickService/PickMedicalProfessional";
import PickDate from "./view/pages/AppointmentPickService/PickDate";
import Payement from "./view/pages/AppointmentPickService/Payement";
import PatientInfo from "./view/pages/AppointmentPickService/PatientInfo";
import SignUp_stepthree from "./view/pages/SignUpAuthentication/SignUp_stepthree";
import SignUp_stepfour from "./view/pages/SignUpAuthentication/SignUp_stepfour";
import SignUp_stepfive from "./view/pages/SignUpAuthentication/SignUp_stepfive";
import SignUp_stepsix from "./view/pages/SignUpAuthentication/SignUp_stepsix";
import Scheduler from "./view/app/alliedappointment/Scheduler";
import AlliedPatient from "./view/app/alliedappointment/Patient";
import "./assets/css/responsive.css";
import AlliedPatientMain from "./view/app/alliedappointment/AlliedPatient";
import AlliedSms from "./view/app/alliedappointment/AlliedSms";
import AlliedTask from "./view/app/alliedappointment/AlliedTask";
import AlliedDocuments from "./view/app/alliedappointment/AlliedDocuments";
import AddPatient from "./view/app/alliedappointment/AddPatient";
import PracticeDetails from "./view/app/alliedsettings/PracticeDetails";
import UserDetails from "./view/app/alliedsettings/UserDetails";
import ServiceDetails from "./view/app/alliedsettings/ServiceDetails";
import PracticeHoursDetails from "./view/app/alliedsettings/PracticeHoursDetails";
import StaffHoursDetails from "./view/app/alliedsettings/StaffHoursDetails";
import NotificationDetails from "./view/app/alliedsettings/NotificationDetails";
import PayementDetails from "./view/app/alliedsettings/PayementDetails";
import Profile from "./components/NavMenu/Profile";
import SettingsRoute from "./components/Route/SettingsRoute";
import TimeOff from "./components/NavMenu/TimeOff";
import AlliedHome from "./view/app/alliedhome/AlliedHome";
import Logout from "./view/pages/SampleSite/Logout";
import { useSelector } from "react-redux";
import PrivateRoute from "./route/ProtectedRoute";
import SmsSettngs from "./view/app/alliedsettings/SmsSettngs";
import PolicyDetails from "./view/app/alliedsettings/PolicyDetails";
import ProtocolDetails from "./view/app/alliedsettings/ProtocolDetails";
import PatientDetail from "./view/pages/PatientDetail/PatientDetail";
import Appointments from "./view/pages/Appointment/Appointment";
import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";

const RouteView = () => {
  let accessToken;
  /**
   * Below is from session storage. (Not working in multiple tabs.)
   */
  // const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  // console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA app.js: ' + isAuthenticated);
  // if (isAuthenticated) {
  //   accessToken = sessionStorage.getItem("accessToken");
  //   console.log('access token (app.js, session storage) : ' + accessToken);
  // }

  /**
   * Below is from local storage. (working in multiple tabs.)
   */
  const isAuthenticated = localStorage.getItem("kinesin-isAuthenticated");
  console.log(
    "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA app.js: " +
      isAuthenticated
  );
  if (isAuthenticated) {
    accessToken = localStorage.getItem("kinesin-accessToken");
    console.log("access token (app.js, local storage) : " + accessToken);

    sessionStorage.setItem(
      "accessToken",
      localStorage.getItem("kinesin-accessToken")
    );
    sessionStorage.setItem(
      "refreshToken",
      localStorage.getItem("kinesin-refreshToken")
    );
    sessionStorage.setItem("userId", localStorage.getItem("kinesin-userId"));
    sessionStorage.setItem(
      "requestId",
      localStorage.getItem("kinesin-requestId")
    );
  }

  /**
   *
   */
  let role;
  if (accessToken) {
    role = JSON.parse(window.atob(accessToken.split(".")[1])).role;
    console.log("role (app.js) : " + role);
  }

  return (
    <div className="App">
      {!isAuthenticated && <Header />}

      <div className="dashboard">
        <Sidebar />
        <div className="main-content">
          <Header />
          <div className="main-content-wrapper">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/pick-service" element={<PickService />} />
              <Route
                path="/pick-professional"
                element={<PickMedicalProfessional />}
              />
              <Route path="/edit-doc-info" element={<AppoinmentStepFour />} />
              <Route path="/pick-date" element={<PickDate />} />
              <Route path="/patient-info" element={<PatientInfo />} />
              <Route path="/payement" element={<Payement />} />

              <Route
                path="/appointment"
                element={
                  <PrivateRoute>
                    <Scheduler />
                  </PrivateRoute>
                }
              />
              <Route
                path="/patient"
                element={
                  <PrivateRoute>
                    <AlliedPatient />
                  </PrivateRoute>
                }
              />

              <Route
                path="/allied_home"
                element={
                  <PrivateRoute>
                    <AlliedHome />
                  </PrivateRoute>
                }
              />
              <Route
                path="/allied_patient"
                element={
                  <PrivateRoute>
                    <AlliedPatientMain />
                  </PrivateRoute>
                }
              />
              <Route
                path="/allied_sms"
                element={
                  <PrivateRoute>
                    <AlliedSms />
                  </PrivateRoute>
                }
              />
              <Route
                path="/allied_task"
                element={
                  <PrivateRoute>
                    <AlliedTask />
                  </PrivateRoute>
                }
              />
              <Route path="/allied_documents" element={<AlliedDocuments />} />
              <Route path="/add_patient" element={<AddPatient />} />
              <Route path="/edit_patient" element={<AddPatient />} />
              <Route
                path="/settings"
                element={
                  <PrivateRoute>
                    <SettingsRoute />
                  </PrivateRoute>
                }
              />
              <Route
                path="/practice_details"
                element={
                  <PrivateRoute>
                    <PracticeDetails />
                  </PrivateRoute>
                }
              />
              <Route
                path="/protocols_details"
                element={
                  <PrivateRoute>
                    <ProtocolDetails />
                  </PrivateRoute>
                }
              />
              <Route
                path="/user_details"
                element={
                  <PrivateRoute>
                    <UserDetails />
                  </PrivateRoute>
                }
              />
              {/* <Route
          element={
            <PrivateRoute>
              <Suspense>
                <userDetailsPrev/>
              </Suspense>
            </PrivateRoute>
          }
        /> */}
              <Route path="/service_details" element={<ServiceDetails />} />
              <Route
                path="/practice_hours_details"
                element={<PracticeHoursDetails />}
              />
              <Route
                path="/staff_hours_details"
                element={
                  <PrivateRoute>
                    <StaffHoursDetails />
                  </PrivateRoute>
                }
              />
              <Route
                path="/sms_settings_details"
                element={
                  <PrivateRoute>
                    <SmsSettngs />
                  </PrivateRoute>
                }
              />
              <Route
                path="/notifications_details"
                element={
                  <PrivateRoute>
                    <NotificationDetails />
                  </PrivateRoute>
                }
              />
              <Route
                path="/payments_details"
                element={
                  <PrivateRoute>
                    <PayementDetails />
                  </PrivateRoute>
                }
              />
              <Route
                path="/policy_details"
                element={
                  <PrivateRoute>
                    <PolicyDetails />
                  </PrivateRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <PrivateRoute>
                    <Profile />
                  </PrivateRoute>
                }
              />
              <Route
                path="/timeoff"
                element={
                  <PrivateRoute>
                    <TimeOff />
                  </PrivateRoute>
                }
              />
              <Route
                path="/patient-detail"
                element={
                  <PrivateRoute>
                    <PatientDetail />
                  </PrivateRoute>
                }
              />
              <Route
                path="/appointments"
                element={
                  <PrivateRoute>
                    <Appointments />
                  </PrivateRoute>
                }
              />
            </Routes>
          </div>
        </div>
      </div>
      {!isAuthenticated && <Footer />}

      {/* <Styleguide /> */}
    </div>
  );
};

export default RouteView;
