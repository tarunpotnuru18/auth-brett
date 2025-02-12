import { AuthContext } from "../context/auth-context";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

export function Private({ children }) {
  let { user, loggedIn } = useContext(AuthContext);

  if (loggedIn && user?.isVerified) {
    return <>{children}</>;
  } else {
    return <Navigate to="/login"></Navigate>;
  }
}

export function PrivateVerifed({ children }) {
  let { user, loggedIn } = useContext(AuthContext);

  if (loggedIn) {
    if (user.isVerified) {
      return <Navigate to="/dashboard"></Navigate>;
    } else {
      return <>{children}</>;
    }
  } else {
    return <Navigate to="/signup"></Navigate>;
  }
}
