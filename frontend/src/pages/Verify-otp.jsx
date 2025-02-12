import {
  InputOTP,
  InputOTPGroup,
 
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp";

import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/context/auth-context";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
export function VerifyOtp() {
  let [value, setValue] = useState("");
  let { user, setUser, verifyEmail } = useContext(AuthContext);
  let navigate = useNavigate();
  useEffect(()=>{
    if(user?.isVerified){
       navigate("/dashboard")
    }
       },[user?.isVerified])
  async function handleClick() {
      
    try {
      let response = await verifyEmail({ email: user?.email, otp: value });
      if (!response.success) {
        return Promise.reject(new Error(response.message));
      }

      setValue("");
      await setUser((user) => {
        return { ...user, isVerified: true };
      });
      navigate("/dashboard");
      return response;
    } catch (error) {
      Promise.reject(new Error(response.message));
    }
  }

  function Toastgenerator() {
    toast.promise(handleClick(), {
      // Toast options:
      loading: "verifying...",
      success: () => {
        return "verification sucessful";
      },
      error: (err) => {
        console.log(err);
        navigate("/signup");
        return `verification failed: ${err.message || "Unknown error"}`;
      },
    });
  }

  return (
    <>
      <div className=" min-h-screen flex justify-center items-center flex-col bg-black ">
        <div className="w-screen text-white font-bold text-center my-3">
          Veriy your otp here
        </div>

        <InputOTP
          maxLength={6}
          value={value}
          onChange={(value) => {
            setValue(value);
          }}
          pattern={REGEXP_ONLY_DIGITS}
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
        <div className="text-white mt-3">
          {value == ""
            ? "Enter your one-time-password"
            : `You entered: ${value}`}
        </div>
        <div className="text-gray-600 mt-1 text-[15px]">{`sent to ${user?.email}`}</div>
        <div className="text-white w-screen flex justify-center py-2">
          {" "}
          <button
            className="bg-white text-black py-1 px-2 rounded-sm hover:bg-slate-600  "
            onClick={() => {
              Toastgenerator();
            }}
          >
            Submit
          </button>{" "}
        </div>
      </div>
    </>
  );
}
