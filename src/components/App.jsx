import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import AdminUsersPage from "./pages/auth/UsersAdmin";
import PrivateRoute from "./routing/PrivateRoute";
import ProfilePage from "./pages/auth/Profile";
import LoginPage from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Transfer from "./pages/Transfers";
import Managers from "./pages/Managers";
import Players from "./pages/Players";
import Footer from "./nav/Footer";
import NavBar from "./nav/NavBar";
import Teams from "./pages/Teams";
import Stats from "./pages/Stats";
import Home from "./pages/Home";

import { useAuthInfo } from "../context/AuthContext";

import "../styles/App.scss";

function App() {
  const { userInfo } = useAuthInfo();
  const isAdmin = userInfo?.user.role === "admin";

  return (
    <div className="App">
      <Router>
        <div className="navbar-container">
          <NavBar />
        </div>
        <div className="page-container">
          <Switch>
            <PrivateRoute exact path="/home" component={Home} />
            <Route path="/login" component={LoginPage} />
            <Route path="/signup" component={Signup} />
            <PrivateRoute path="/profile" component={ProfilePage} />
            {isAdmin && (
              <PrivateRoute path="/admin/users" component={AdminUsersPage} />
            )}
            <PrivateRoute path="/teams" component={Teams} />
            <PrivateRoute path="/managers" component={Managers} />
            <PrivateRoute path="/players" component={Players} />
            <PrivateRoute path="/transfer" component={Transfer} />
            <PrivateRoute path="/stats" component={Stats} />
            <Redirect to="/login" />
          </Switch>
        </div>
      </Router>
      <div className="footer-container">
        <Footer />
      </div>
    </div>
  );
}

export default App;
