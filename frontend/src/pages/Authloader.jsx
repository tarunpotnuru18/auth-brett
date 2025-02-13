import { AuthContext } from "@/context/auth-context";
import { useContext, useEffect, useState } from "react";

export default function AuthLoader({ children }) {
  let { user, setUser, setLoggedIn, checkAuth } = useContext(AuthContext);
  let [loading, setLoading] = useState(true);
  async function intial() {
    try {
      let data = await checkAuth();
      let response = data;
      if (!response.success) {
        throw new Error("error in the intial request");
      }
      await setUser(response.user);
      await setLoggedIn(true);
      return;
    } catch (error) {
      // console.log("error occured while performing intial", error);
      setLoggedIn(false);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    intial();
  }, []);

  if (loading) {
    return (
      <>
        <div>Loading ...</div>
      </>
    );
  }
  return <>{children}</>;
}
