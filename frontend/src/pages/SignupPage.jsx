import { useContext, useState } from "react";
import { AuthContext } from "@/context/auth-context";
import { useNavigate } from "react-router-dom";
export default function Signup() {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [username, setUsername] = useState("");
  let { signup, checkAuth } = useContext(AuthContext);
  let navigate = useNavigate();

  async function handleClick() {
    let data = await signup({ email, password, username }= {email:"tarun@gmail.com",password:"12345678",username:"tarun"});
    if (data.success) {
      let validation = await checkAuth();
      if (validation.success) {
        navigate("/login");
        return;
      }
      console.log("error occured in token",validation);
      return;
    }
    console.log("error occured", { email, username, password },data);
  }
  return (
    <>
      <div className="w-screen h-screen bg-black flex justify-center items-center">
        <div className=" rounded-sm flex flex-col justify-center p-5 gap-3">
          <div className="inline-flex flex-col gap-[3px]">
            <div className="text-white text-left text-xl">Sign up</div>
            <div className="text-gray-400 text-left">
              experience the secure authentication
            </div>
          </div>

          <div className="inline-flex flex-col gap-[3px]">
            <div className="text-white">username</div>
            <input
              type="text"
              placeholder="enter your username"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              className="border-b-[1.5px] border-gray-600 p-2 outline-none bg-transparent text-white  focus:border-white"
            />
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
                handleClick();
              }}
            >
              signup
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
