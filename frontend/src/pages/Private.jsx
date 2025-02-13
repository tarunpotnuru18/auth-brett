import { AuthContext } from "../context/auth-context";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { toast } from "sonner";
export function Private({ children }) {
  let { user, loggedIn } = useContext(AuthContext);
  // console.log("user from the private", loggedIn, user);
  if (loggedIn && user?.isVerified) {
    return <>{children}</>;
  } else {
    return <Navigate to="/login"></Navigate>;
  }
}

export function PrivateVerifed({ children }) {
  let { user, loggedIn } = useContext(AuthContext);
  // console.log("user from the privateVerified", loggedIn, user);
  if (loggedIn) {
    if (user?.isVerified) {
      return <Navigate to="/dashboard"></Navigate>;
    } else {
      return <>{children}</>;
    }
  } else {
    // console.log("user from the privateVerified", loggedIn, user);
    toast.error("please login and verify to continue");
    return <Navigate to="/signup"></Navigate>;
  }
}

// export function onlyLoginHaveToVerify({ children }) {
//   if (loggedIn) {
//     return <>{children}</>;
//   } else {
//     return <Navigate to="/login"></Navigate>;
//   }
// }
