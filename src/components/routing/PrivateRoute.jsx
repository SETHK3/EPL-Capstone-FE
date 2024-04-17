import { useAuthInfo } from "../../context/AuthContext";
import { Redirect, Route } from "react-router-dom";

export default function PrivateRoute({ children, ...rest }) {
  const userInfo = useAuthInfo();
  return (
    <Route
      {...rest}
      render={() => {
        return userInfo ? children : <Redirect to="/login" />;
      }}
    />
  );
}
