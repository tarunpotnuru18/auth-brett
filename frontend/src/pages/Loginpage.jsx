import { useState, useContext, useEffect } from "react";

import { toast } from "sonner";
import { AuthContext } from "../context/auth-context";
import { useNavigate } from "react-router-dom";
export default function Login() {
  let navigate = useNavigate();
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let { user, setUser, loggedIn, setLoggedIn, signin } =
    useContext(AuthContext);

  async function handleClick() {
    try {
      let data = await signin({ email, password });
      if (!data.success) {
        console.log("data.message", data);
        return Promise.reject(new Error(data.message));
      }
      await setUser({ ...data.user });
      setLoggedIn(true)
     navigate("/dashboard")
      return "signin sucesssful from handleclick";
    } catch (error) {
      console.log(error);
      return Promise.reject(new Error(error.message));
    }
  }

  async function ToastGenerator() {
    toast.promise(handleClick(), {
      loading: "logging in",
      success: () => {
        return "login successful";
      },
      error: (err) => {
        return err.message;
      },
    });
  }

  return (
    <>
      <div className="w-screen h-screen bg-black flex justify-center items-center">
        <div className=" rounded-sm flex flex-col justify-center p-5 gap-3">
          <div className="inline-flex flex-col gap-[3px]">
            <div className="text-white text-left text-xl">Sign in</div>
            <div className="text-gray-400 text-left">
              we are waiting to see you back
            </div>
          </div>

          <div className="inline-flex flex-col gap-[3px]">
            <div className="text-white">email</div>
            <input
              type="text"
              placeholder="enter your email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="border-b-[1.5px] border-gray-600 p-2 outline-none bg-transparent text-white  focus:border-white"
            />
          </div>

          <div className="inline-flex flex-col gap-[3px]">
            <div className="text-white">Password</div>
            <input
              type="text"
              placeholder="enter your password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="border-b-[1.5px] border-gray-600 p-2 outline-none bg-transparent text-white  focus:border-white"
            />
          </div>

          <div className="text-center text-black">
            <button
              className="bg-white rounded py-1 px-2 text-center text-[10] hover:bg-gray-200"
              onClick={() => {
                ToastGenerator();
              }}
            >
              signin
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
