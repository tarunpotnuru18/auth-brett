import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
  
} from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS} from "input-otp"
import { Loading } from "@/components/loading";
import { useContext, useState } from "react";
import { AuthContext } from "@/context/auth-context";
export function VerifyOtp() {
  let [value, setValue] = useState("");
  let { user,setUser } = useContext(AuthContext);

  return (
    <>
      <div className=" min-h-screen flex justify-center items-center flex-col bg-black ">
        <div className="w-screen text-white font-bold text-center my-3">Veriy your otp here</div>

        <InputOTP
          maxLength={6}
          onChange={(value) => {
            setValue(value);
          }}
          pattern={ REGEXP_ONLY_DIGITS}
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
        <div className="text-gray-600 mt-2">
           {`sent to ${user.email}`}
        </div>
      </div>
    </>
  );
}
