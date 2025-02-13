import { AuthContext } from "@/context/auth-context";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
export default function Dashboard() {
  let navigate = useNavigate();
  let { user, logout, setLoggedIn, setUser } = useContext(AuthContext);

  async function handleClick() {
    try {
      let response = await logout();
      if (!response.success) {
        return Promise.reject(new Error(response.message));
      }
      navigate("/login");
      setLoggedIn(false);
      setUser("");
    } catch (error) {
      // console.log(error,"kiusdgcv")
      return Promise.reject(new Error(error.message));
    }
  }

  function ToastGenerator() {
    toast.promise(handleClick(), {
      loading: "logging out",
      success: () => {
        return "logged out successfully";
      },
      error: (err) => {
        return "logout failed " + err.message;
      },
    });
  }
  return (
    <>
      <div className="w-screen h-screen bg-black flex flex-col justify-center text-white items-center ">
        <div>hello {user?.username} </div>
        <div>{user?.email}</div>
        <button
          className="bg-white text-black p-2"
          onClick={() => {
            ToastGenerator();
          }}
        >
          logout
        </button>
      </div>
    </>
  );
}
