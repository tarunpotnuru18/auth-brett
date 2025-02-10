import { Routes, Route } from "react-router-dom";
import Signup from "./pages/SignupPage";
import Login from "./pages/Loginpage";
import Welcome from "./pages/Welcome";
import AuthContextProvider from "./context/auth-context";
import { VerifyOtp } from "./pages/Verify-otp";
import { Toaster } from "./components/ui/sonner";
import Toast from "./pages/Toast";
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
          <Route path="/toast" element={<Toast></Toast>}></Route>
        </Routes>
        <Toaster richColors closeButton />
      </AuthContextProvider>
    </>
  );
}

export default App;
