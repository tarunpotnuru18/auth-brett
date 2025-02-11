import { AuthContext } from "@/context/auth-context";
import { useContext, useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";

export function Private({ children }) {
  let { user, loggedIn } = useContext(AuthContext);
  let navigate = useNavigate();
  if (loggedIn && user?.isverified) {
    return <>{children}</>;
  } else {
    return  <Navigate to="/login"></Navigate>;
  }
}

export function PrivateVerifed({ children }) {
  let { user, loggedIn } = useContext(AuthContext);

  if (loggedIn) {
    if (user.verified) {
     return  <Navigate to="/login"></Navigate>;
    } else {
      return <>{children}</>;
    }
  } else {
    return <Navigate to="/signup"></Navigate>;
  }
}
