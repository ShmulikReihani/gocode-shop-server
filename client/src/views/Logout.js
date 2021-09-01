import { useContext, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { UserCtx } from "../Context/UserContext/UserContext";

function Logout() {
  const [user, setUser] = useContext(UserCtx);

  useEffect(() => {
    sessionStorage.removeItem("user");
    console.log(user);
    setUser({
      accessToken: null,
      user: null,
    });
  }, []);
  return <Redirect to="/" />;
}

export default Logout;
