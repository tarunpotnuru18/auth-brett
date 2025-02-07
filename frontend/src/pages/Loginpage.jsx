import { useState, useRef } from "react";
export default function Login() {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
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
            <button className="bg-white rounded py-1 px-2 text-center text-[10] hover:bg-gray-200">
              signin
            </button>
          </div>

        </div>
      </div>
    </>
  );
}
