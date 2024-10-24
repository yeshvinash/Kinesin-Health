import { Routes, Route } from "react-router-dom";
import { Header } from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
// import { LoginBadCredentials } from "./components/Authentication/LoginBadCredentials";
// import { ResetPassword } from "./components/Authentication/ResetPassword";
// import { CreatePassword } from "./components/Authentication/CreatePassword";
// import { Success } from "./components/Authentication/Success";
// import { FactorAuthentication } from "./components/Authentication/FactorAuthentication";
// import { AuthenticationFailed } from "./components/Authentication/AuthenticationFailed";
// import { Home } from "./view/pages/Home/Home";
// import { Profile } from "./view/pages/Profile/Profile";
// import { Family } from "./view/pages/Family/Family";
// import { YourAppointments } from "./view/pages/YourAppointments/YourAppointments";
// import { RescheduleAppointment } from "./view/pages/RescheduleAppointment/RescheduleAppointment";
// import { BookAppointment } from "./view/pages/BookAppointment/BookAppointment";
// import { YourAppointmentsList } from "./view/pages/YourAppointments/YourAppointmentsList";
import PatientDetail from "./view/pages/PatientDetail/PatientDetail";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function RouteView() {
  return (
    <div className="App">
      <div className="dashboard"> 
        <Sidebar />
        <div className="main-content">
        <Header />
          <div className="main-content-wrapper">
            {/* <Header /> */}
            <Routes>
              <Route exact path="/*" element={<PatientDetail />} />
              {/* <Route path="*" element={<Home />} /> */}
              {/* <Route path="/patient-detail" element={<PatientDetail />} /> */}
              {/* <Route path="/profile" element={<Profile />} />
              <Route path="/family" element={<Family />} />
              <Route path="/appointments" element={<YourAppointments />} />
              <Route
                path="/appointments-list"
                element={<YourAppointmentsList />}
              />
              <Route
                path="/reschedule-appointment"
                element={<RescheduleAppointment />}
              />
              <Route path="/book-appointment" element={<BookAppointment />} /> */}
            </Routes>
          </div>
        </div>
      </div>

      {/* <Styleguide /> */}
    </div>
  );
}

export default RouteView;
