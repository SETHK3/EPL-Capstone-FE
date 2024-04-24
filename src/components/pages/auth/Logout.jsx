import { useEffect } from "react";
import { useAuthInfo } from "../../../context/AuthContext";
import { useHistory } from "react-router-dom";

export default function Logout() {
  const { logout, userInfo } = useAuthInfo();
  const history = useHistory();

  useEffect(() => {
    const handleLogout = async () => {
      if (userInfo) {
        await logout();
        history.push("/login");
      }
    };
    handleLogout();
  }, [logout, userInfo, history]);

  return null;
}
