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
import RouteView from "./route";
import "./App.css";

function App() {
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

  if (isAuthenticated == "true") {
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
    <>
      {!isAuthenticated && <Header />}

      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
        <Route path="/auth_code" element={<AuthCode />} />
        <Route path="/auth_error" element={<AuthError />} />
        <Route path="/reset_password/" element={<ResetPasswordEmail />} />
        <Route path="/success_msg" element={<Success_msg />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signup_two" element={<SignUp_steptwo />} />
        <Route path="/signup_three" element={<SignUp_stepthree />} />
        <Route path="/signup_four" element={<SignUp_stepfour />} />
        <Route path="/signup_five" element={<SignUp_stepfive />} />
        <Route path="/signup_six" element={<SignUp_stepsix />} />
        <Route path="/patient-signup" element={<PatientRegistration />} />
        <Route path="/regestration-complete" element={<Reg_Complete />} />
        {/* <Route path="*" element={<RouteView />} /> */}
        {isAuthenticated ? <Route path="*" element={<RouteView />} /> : null}
      </Routes>
      {!isAuthenticated && <Footer />}
    </>
  );
}

export default App;
