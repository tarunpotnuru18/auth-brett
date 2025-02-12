import { Verified } from "lucide-react";
import React, { useState } from "react";
import { data } from "react-router-dom";

export const AuthContext = React.createContext();

export default function AuthContextProvider({ children }) {
  let [user, setUser] = useState(null);
  let [loggedIn, setLoggedIn] = useState(false);
  let url = "http://localhost:8080/api";
  async function signup({ email, password, username }) {
    try {
      console.log(email, password, username);
      let response = await fetch(url + "/signup", {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password, username }),
      });
      let data = await response.json();

      return data;
    } catch (error) {
      return { success: false, message: error.message };
    }
  }
  async function verifyEmail({ email, otp }) {
    try {
      let data = await fetch(url + "/verify-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          verificationToken: otp,
        }),
      });

      let response = await data.json();

      return response;
    } catch (error) {
      return { success: false, message: error.message };
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

  async function signin({ email, password }) {
    try {
      let data = await fetch(url + "/login", {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });
      let response = await data.json();
      return response;
    } catch (error) {
      console.log("iam executed");
      console.log(error, "error form context pai signup");
      return { success: false, message: error.message };
    }
  }
  return (
    <>
      <AuthContext.Provider
        value={{
          signin,
          user,
          setUser,
          loggedIn,
          setLoggedIn,
          url,
          signup,
          checkAuth,
          verifyEmail,
        }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
}
