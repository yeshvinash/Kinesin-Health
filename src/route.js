import { Routes, Route } from "react-router-dom";
import { Header } from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import { Home } from "./view/pages/Home/Home";
import { Family } from "./view/pages/Family/Family";
import { YourAppointments } from "./view/pages/YourAppointments/YourAppointments";
import { RescheduleAppointment } from "./view/pages/RescheduleAppointment/RescheduleAppointment";
import { BookAppointment } from "./view/pages/BookAppointment/BookAppointment";
import { YourAppointmentsList } from "./view/pages/YourAppointments/YourAppointmentsList";
import PatientDetail from "./view/pages/PatientDetail/PatientDetail";
import { Document } from "./view/pages/Document/Document";
import { DocumentPatient } from "./view/pages/DocumentPatient/DocumentPatient";
import { Protocols } from "./view/pages/Protocols/Protocols";
import { PostNatalVisit } from "./view/pages/PostNatalVisit/PostNatalVisit";
import { PracticeManager } from "./view/pages/PracticeManager/PracticeManager";
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
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="*" element={<Home />} />
              <Route path="/patient-detail" element={<PatientDetail />} />
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
              <Route path="/book-appointment" element={<BookAppointment />} />
              <Route path="/document" element={<Document />} />
              <Route path="/document-patient" element={<DocumentPatient />} />
              <Route path="/protocols" element={<Protocols />} />
              <Route path="/post-natal-visit" element={<PostNatalVisit />} />
              <Route path="/practice-manager" element={<PracticeManager />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RouteView;
