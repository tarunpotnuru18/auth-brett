import { AuthContext } from "@/context/auth-context";
import { useContext } from "react";

export default function Dashboard() {
  let { user } = useContext(AuthContext);
  return (
    <>
      <div className="w-screen h-screen bg-black flex justify-center text-white">
        <div>hello {user?.username} !</div>
        <div>{user?.email}</div>
      </div>
    </>
  );
}
