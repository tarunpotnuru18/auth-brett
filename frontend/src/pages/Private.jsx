import { AuthContext } from "@/context/auth-context";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export function Private({ children }) {
  let { user } = useContext(AuthContext);
  let navigate = useNavigate();
  return <></>;
}

export function privateVerifed({ children }) {
  let { user } = useContext(AuthContext);
  let navigate = useNavigate();
  if (user.verified) {
    navigate("/login");
  } else {
    return <>{children}</>;
  }
}
