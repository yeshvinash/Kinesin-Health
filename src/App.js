import { Routes, Route, Navigate } from "react-router-dom";
import { Header } from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import { LoginForm } from "./components/Authentication/LoginForm";
import "bootstrap/dist/css/bootstrap.min.css";
import { StyledEngineProvider } from "@mui/material/styles";
import { LoginBadCredentials } from "./components/Authentication/LoginBadCredentials";
import { ResetPassword } from "./components/Authentication/ResetPassword";
import { CreatePassword } from "./components/Authentication/CreatePassword";
import { Success } from "./components/Authentication/Success";
import { FactorAuthentication } from "./components/Authentication/FactorAuthentication";
import { AuthenticationFailed } from "./components/Authentication/AuthenticationFailed";
import { SignUpStep1 } from "./components/Authentication/Signup/SignUpStep1";
import { SignUpStep2 } from "./components/Authentication/Signup/SignUpStep2";
import { SignUpStep3 } from "./components/Authentication/Signup/SignUpStep3";
import { SignUpStep4 } from "./components/Authentication/Signup/SignUpStep4";
import { SignUpStep5 } from "./components/Authentication/Signup/SignUpStep5";
import { SignUpStep6 } from "./components/Authentication/Signup/SignUpStep6";
import "./App.css";
import { Styleguide } from "./components/Styleguide";
// import { Signup } from "./components/Authentication/Signup/SignUpStep1";

function App() {
  return (
    <div className="App">
      {/* <Header/> */}
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/*" element={<LoginForm />} />
        <Route
          path="/login-bad-credentials"
          element={<LoginBadCredentials />}
        />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/create-password" element={<CreatePassword />} />
        <Route path="/success" element={<Success />} />
        <Route
          path="/authentication-failed"
          element={<AuthenticationFailed />}
        />
        <Route
          path="/factor-authentication"
          element={<FactorAuthentication />}
        />
        <Route path="/signup-step1" element={<SignUpStep1 />} />
        <Route path="/signup-step2" element={<SignUpStep2 />} />
        <Route path="/signup-step3" element={<SignUpStep3 />} />
        <Route path="/signup-step4" element={<SignUpStep4 />} />
        <Route path="/signup-step5" element={<SignUpStep5 />} />
        <Route path="/signup-step6" element={<SignUpStep6 />} />
      </Routes>
      {/* <Styleguide /> */}
      {/* <Sidebar/> */}
    </div>
  );
}

export default App;
