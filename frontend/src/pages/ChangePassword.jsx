import { AuthContext } from "../context/auth-context";
import { useContext, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function ChangePassword() {
  let { token } = useParams();
  let { changePassword, user, logout } = useContext(AuthContext);
  let [password, setPassword] = useState("");
  let [newpassword, setNewPassword] = useState("");

  let navigate = useNavigate();
  async function handleClick() {
    try {
      let data = await changePassword({
        email: user.email,
        token,
        newPassword: password,
      });
      // console.log(token)
      if (!data.success) {
        return Promise.reject(new Error(data.message));
      }
      await logout();
      navigate("/login");
    } catch (error) {
      // console.log(error)
      return Promise.reject(new Error(error.message));
    }
  }
  function ToastGenerator() {
    toast.promise(handleClick(), {
      loading: "loading...",
      success: `changed password successfully, please re login to continue`,
      error: (err) => {
        return `operation failed: ${err.message}`;
      },
    });
  }
  return (
    <>
      <div className="w-screen h-screen bg-black flex justify-center items-center">
        <div className=" rounded-sm flex flex-col justify-center p-5 gap-3">
          <div className="inline-flex flex-col gap-[3px]">
            <div className="text-white text-left text-xl">changePassword</div>
            <div className="text-white text-left ">
              {"please enter your new password" + user.username}
            </div>
          </div>

          <div className="inline-flex flex-col gap-[3px]">
            <div className="text-white">password</div>
            <input
              type="text"
              placeholder="enter your password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="border-b-[1.5px] border-gray-600 p-2 outline-none bg-transparent text-white  focus:border-white"
            />
            <input
              type="text"
              placeholder="enter your password again"
              value={newpassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
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
              Change Password
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
