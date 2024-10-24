import { Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { LoginForm } from "./components/Authentication/LoginForm";
import { Signup } from "./components/Authentication/Signup/Signup";
import { LoginBadCredentials } from "./components/Authentication/LoginBadCredentials";
import { ResetPassword } from "./components/Authentication/ResetPassword";
import { CreatePassword } from "./components/Authentication/CreatePassword";
import { Success } from "./components/Authentication/Success";
import { FactorAuthentication } from "./components/Authentication/FactorAuthentication";
import { AuthenticationFailed } from "./components/Authentication/AuthenticationFailed";
import RouteView from "./route";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/login-bad-credentials" element={<LoginBadCredentials />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/create-password" element={<CreatePassword />} />
      <Route path="/success" element={<Success />} />
      <Route path="/authentication-failed" element={<AuthenticationFailed />} />
      <Route path="/factor-authentication" element={<FactorAuthentication />} />
      <Route path="*" element={<RouteView />} />
    </Routes>
  );
}

export default App;
