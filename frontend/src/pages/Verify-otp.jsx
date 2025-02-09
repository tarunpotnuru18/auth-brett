import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Loading } from "@/components/loading";
import { useContext, useState } from "react";
import { AuthContext } from "@/context/auth-context";
export function VerifyOtp() {
  let [value, setValue] = useState("");
  let { user } = useContext(AuthContext);
  return (
    <>
      <div className=" min-h-screen flex justify-center items-center flex-col bg-black ">
        
        <InputOTP
          maxLength={6}
          onChange={(value) => {
            setValue(value);
          }}
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
        <div className="text-white mt-3">{value==""?"Enter your one-time-password":`You entered: ${value}`}</div>
      </div>
    </>
  );
}
