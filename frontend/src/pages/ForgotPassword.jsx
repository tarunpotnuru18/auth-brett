import { toast } from "sonner";
import { AuthContext } from "../context/auth-context";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ForgotPassword() {
  let { user, forgotPassword } = useContext(AuthContext);
  let [email, setEmail] = useState("");
  
  async function handleclick() {
    try {
      let data = await forgotPassword({ email });
      if (!data.success) {
        // console.log(data);
        return Promise.reject(new Error(data.message));
      }
      
      return data;
    } catch (error) {
      // console.log(error);
      return Promise.reject(new Error(error.message));
    }
  }
  function ToastGenerator() {
    toast.promise(handleclick(), {
      loading: "loading...",
      success: "email sucessfully sent to " + email,
      error: (err) => {
        // console.log(err);
        return "opeartion failed : " + err.message;
      },
    });
  }

  return (
    <>
      <div className="w-screen h-screen bg-black flex justify-center items-center">
        <div className=" rounded-sm flex flex-col justify-center p-5 gap-3">
          <div className="inline-flex flex-col gap-[3px]">
            <div className="text-white text-left text-xl">ForgotPassword</div>
            <div className="text-white text-left ">
              {"please enter your email"}
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

          <div className="text-center text-black">
            <button
              className="bg-white rounded py-1 px-2 text-center text-[10] hover:bg-gray-200"
              onClick={() => {
                ToastGenerator();
              }}
            >
              send reset email
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
