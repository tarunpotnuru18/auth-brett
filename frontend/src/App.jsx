import { Routes, Route } from "react-router-dom";
import Signup from "./pages/SignupPage";
import Login from "./pages/Loginpage";
import Welcome from "./pages/Welcome";
import AuthContextProvider, { AuthContext } from "./context/auth-context";
import { VerifyOtp } from "./pages/Verify-otp";
import { Toaster } from "./components/ui/sonner";
import { Private, PrivateVerifed } from "./pages/Private";
import Dashboard from "./pages/DashBoard";
import { useContext, useEffect } from "react";
import ForgotPassword from "./pages/ForgotPassword";
import ChangePassword from "./pages/ChangePassword";
function App() {
  return (
    <>
      {" "}
      <Routes>
        <Route path="/" element={<Welcome />}></Route>
        <Route path="/signup" element={<Signup></Signup>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route
          path="/verify-email"
          element={
            <PrivateVerifed>
              <VerifyOtp></VerifyOtp>
            </PrivateVerifed>
          }
        ></Route>

        <Route
          path="/dashboard"
          element={
            <Private>
              <Dashboard></Dashboard>
            </Private>
          }
        ></Route>
        <Route
          path="/forgot-password"
          element={<ForgotPassword></ForgotPassword>}
        ></Route>
        <Route
          path="/change-password/:token"
          element={<ChangePassword></ChangePassword>}
        ></Route>
      </Routes>
      <Toaster richColors closeButton />
    </>
  );
}

export default App;
