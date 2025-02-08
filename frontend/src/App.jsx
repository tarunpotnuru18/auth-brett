import { Routes, Route } from "react-router-dom";
import Signup from "./pages/SignupPage";
import Login from "./pages/Loginpage";
import Welcome from "./pages/Welcome";
import AuthContextProvider from "./context/auth-context";
import { VerifyOtp } from "./pages/Verify-otp";

function App() {
  return (
    <>
      <AuthContextProvider>
        {" "}
        <Routes>
          <Route path="/" element={<Welcome />}></Route>
          <Route path="/signup" element={<Signup></Signup>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
          <Route path="/verify-email" element={<VerifyOtp></VerifyOtp>}></Route>
        </Routes>
      </AuthContextProvider>
    </>
  );
}

export default App;
