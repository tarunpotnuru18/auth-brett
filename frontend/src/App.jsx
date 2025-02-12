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
function App() {
  let {checkAuth, setUser} = useContext(AuthContext);

  async function intial() {
    try {
      let data = await checkAuth();
      let response = data
      if (!response.success) {
        throw new Error("error in the intialpai request");
      }
      console.log(response);
      setUser(response.user);
    } catch (error) {
      console.log("error occured while performing intial", error);
    }
  }
  useEffect(() => {
    intial();
  }, []);
  return (
    <>
      <AuthContextProvider>
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
        </Routes>
        <Toaster richColors closeButton />
      </AuthContextProvider>
    </>
  );
}

export default App;
