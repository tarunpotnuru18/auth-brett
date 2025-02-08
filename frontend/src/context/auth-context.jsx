import { Verified } from "lucide-react";
import React, { useState } from "react";
import { data } from "react-router-dom";

export const AuthContext = React.createContext();

export default function AuthContextProvider({ children }) {
  let [user, setUser] = useState(null);
  let [loggedIn, setLoggedIn] = useState(false);
  let [isverified, setVerified] = useState(false);
  let url = "http://localhost:8080/api";
  async function signup({ email, password, username }) {
    try {
      let response = await fetch(
        url + "/signup",

        {
          method: "POST",
          headers: {
            "content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ email, password, username }),
        }
      );
      let data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
      return { success: false, message: "Signup failed", error: error.message };
    }
  }

  async function checkAuth() {
    try {
      let response = await fetch(
        url + "/check-auth",

        {
          method: "GET",
          headers: {
            "content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      let data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
      return { success: false, message: "Signup failed", error: error.message };
    }
  }
  return (
    <>
      <AuthContext.Provider
        value={{
          user,
          setUser,
          loggedIn,
          setLoggedIn,
          url,
          signup,
          checkAuth,
          Verified,
          isverified,
        }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
}
